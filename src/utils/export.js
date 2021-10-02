const Excel = require('exceljs')

import FileSaver from 'file-saver'
export var exportExcel = function(luckysheet ) {
  // 参数为luckysheet.getluckysheetfile()获取的对象
  // 1.创建工作簿，可以为工作簿添加属性
  const workbook = new Excel.Workbook()
  // 2.创建表格，第二个参数可以配置创建什么样的工作表

  luckysheet.forEach(function(table) {
    if (table.data.length === 0) return true
    const worksheet = workbook.addWorksheet(table.name)
    const merge = (table.config && table.config.merge) || {}
    const borderInfo = (table.config && table.config.borderInfo) || {}
    let columnlen = (table.config && table.config.columnlen) || {}
    let rowlen = (table.config && table.config.rowlen) || {}
    // 3.设置单元格合并,设置单元格边框,设置单元格样式,设置值
    setStyleAndValue(table.data, worksheet)
    setMerge(merge, worksheet)
    setBorder(borderInfo, worksheet)
    for (let key in columnlen) {
      worksheet.getColumn(Number(key) + 1).width = (columnlen[key] + 2) / 8
    }
    for (let key in rowlen) {
      worksheet.getRow(Number(key) + 1).height = rowlen[key] * 0.75
    }
    return true
  })

  // return
  // 4.写入 buffer
  const buffer = workbook.xlsx.writeBuffer().then(data => {
    const blob = new Blob([data], {
      type: 'application/vnd.ms-excel;charset=utf-8'
    })
    FileSaver.saveAs(blob, `${new Date().getTime()}.xlsx`)
  })
  return buffer
}

var setMerge = function(luckyMerge = {}, worksheet) {
  const mergearr = Object.values(luckyMerge)
  mergearr.forEach(function(elem) {
    // elem格式：{r: 0, c: 0, rs: 1, cs: 2}
    // 按开始行，开始列，结束行，结束列合并（相当于 K10:M12）
    worksheet.mergeCells(
      elem.r + 1,
      elem.c + 1,
      elem.r + elem.rs,
      elem.c + elem.cs
    )
  })
}

var setBorder = function(luckyBorderInfo, worksheet) {
  if (!Array.isArray(luckyBorderInfo)) return
  luckyBorderInfo.forEach(function(elem) {
    // 现在只兼容到borderType 为range的情况
    if (elem.rangeType === 'range') {
      let border = borderConvert(elem.borderType, elem.style, elem.color)
      elem.range.forEach(rang => {
        let row = rang.row
        let column = rang.column
        for (let i = row[0] + 1; i < row[1] + 2; i++) {
          for (let y = column[0] + 1; y < column[1] + 2; y++) {
            worksheet.getCell(i, y).border = border
          }
        }
      })
    }
    if (elem.rangeType === 'cell') {
      const { col_index, row_index } = elem.value
      const borderData = Object.assign({}, elem.value)
      delete borderData.col_index
      delete borderData.row_index
      let border = addborderToCell(borderData, row_index, col_index)
      worksheet.getCell(row_index + 1, col_index + 1).border = border
    }
  })
}
var setStyleAndValue = function(cellArr, worksheet) {
  if (!Array.isArray(cellArr)) return
  cellArr.forEach(function(row, rowid) {
    row.every(function(cell, columnid) {
      if (!cell) return true
      let fill = fillConvert(cell.bg)

      let font = fontConvert(
        cell.ff,
        cell.fc,
        cell.bl,
        cell.it,
        cell.fs,
        cell.un,
        cell.cl
      )
      let alignment = alignmentConvert(cell.vt, cell.ht, cell.tb, cell.tr)
      let numFmt = ''
      let value = ''

      if (!cell.qp & cell.v) {
        if (Number(cell.v) !== NaN) {
          cell.v = Number(cell.v)
        }
      }

      if (cell.f) {
        let f = cell.f.substr(1, cell.f.length - 1)
        let m = cell.m ? cell.m : cell.v
        value = { formula: f, result: cell.v }
      } else if (!cell.v && cell.ct && cell.ct.s) {
        // xls转为xlsx之后，内部存在不同的格式，都会进到富文本里，即值不存在与cell.v，而是存在于cell.ct.s之后
        // value = cell.ct.s[0].v
        cell.ct.s.forEach(arr => {
          value += arr.v
        })
      } else {
        value = cell.v
      }
      //  style 填入到_value中可以实现填充色
      let letter = createCellPos(columnid)
      let target = worksheet.getCell(letter + (rowid + 1))
      for (const key in fill) {
        target.fill = fill
        break
      }
      target.font = font
      target.alignment = alignment

      target.value = value
      numFmt = setNumFmt(cell.ct)
      target.numFmt = numFmt

      return true
    })
  })
}

var fillConvert = function(bg) {
  if (!bg) {
    return {}
  }
  // const bgc = bg.replace('#', '')
  let fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: bg.replace('#', '') }
  }
  return fill
}

// 设置字体样式
var fontConvert = function(
  ff = 0, // 字体
  fc = '#000000', // 字体颜色
  bl = 0, // 加粗
  it = 0, // 斜体
  fs = 10, // 字体大小
  un = 0, // 下划线
  cl = 0 // 删除线
) {
  // luckysheet：ff(样式), fc(颜色), bl(粗体), it(斜体), fs(大小), cl(删除线), un(下划线)
  const luckyToExcel = {
    0: 'Times New Roman',
    1: 'Arial',
    2: 'Tahoma' ,
    3: 'Verdana',
    4: '微软雅黑',
    5: '宋体（Song）',
    6: '黑体（ST Heiti）',
    7: '楷体（ST Kaiti）',
    8: '仿宋（ST FangSong）',
    9: '新宋体（ST Song）',
    10: '华文新魏',
    11: '华文行楷',
    12: '华文隶书',
    num2bl: function(num) {
      return num === 0 ? false : true
    }
  }
  // 出现Bug，导入的时候ff为luckyToExcel的val

  let font = {
    name: typeof ff === 'number' ? luckyToExcel[ff] : ff,
    family: 1,
    size: fs,
    color: { argb: fc.replace('#', '') },
    bold: luckyToExcel.num2bl(bl),
    italic: luckyToExcel.num2bl(it),
    underline: luckyToExcel.num2bl(un),
    strike: luckyToExcel.num2bl(cl)
  }

  return font
}

// 设置文字样式
var alignmentConvert = function(
  vt = 'default',
  ht = 'default',
  tb = 'default',
  tr = 'default'
) {
  // luckysheet:vt(垂直), ht(水平), tb(换行), tr(旋转)
  const luckyToExcel = {
    vertical: {
      0: 'middle',
      1: 'top',
      2: 'bottom',
      default: 'top'
    },
    horizontal: {
      0: 'center',
      1: 'left',
      2: 'right',
      default: 'left'
    },
    wrapText: {
      0: false,
      1: false,
      2: true,
      default: false
    },
    textRotation: {
      0: 0,
      1: 45,
      2: -45,
      3: 'vertical',
      4: 90,
      5: -90,
      default: 0
    }
  }

  let alignment = {
    vertical: luckyToExcel.vertical[vt],
    horizontal: luckyToExcel.horizontal[ht],
    wrapText: luckyToExcel.wrapText[tb],
    textRotation: luckyToExcel.textRotation[tr]
  }
  return alignment
}

// 设置数字类型
var setNumFmt = function(ct) {
  if (!(ct && ct.fa)) return ''
  let fa = ct.fa
  const format = {

  }
  if (format[fa]) fa = format[fa]
  return fa
}

var borderConvert = function(borderType, style = 1, color = '#000') {
  // 对应luckysheet的config中borderinfo的的参数
  if (!borderType) {
    return {}
  }
  const luckyToExcel = {
    type: {
      'border-all': 'all',
      'border-top': 'top',
      'border-right': 'right',
      'border-bottom': 'bottom',
      'border-left': 'left'
    },
    style: {
      0: 'none',
      1: 'thin',
      2: 'hair',
      3: 'dotted',
      4: 'dashDot', // 'Dashed',
      5: 'dashDot',
      6: 'dashDotDot',
      7: 'double',
      8: 'medium',
      9: 'mediumDashed',
      10: 'mediumDashDot',
      11: 'mediumDashDotDot',
      12: 'slantDashDot',
      13: 'thick'
    }
  }
  let template = {
    style: luckyToExcel.style[style],
    color: { argb: color.replace('#', '') }
  }
  let border = {}
  if (luckyToExcel.type[borderType] === 'all') {
    border['top'] = template
    border['right'] = template
    border['bottom'] = template
    border['left'] = template
  } else {
    border[luckyToExcel.type[borderType]] = template
  }
  return border
}

function addborderToCell(borders, row_index, col_index) {
  let border = {}
  const luckyExcel = {
    type: {
      l: 'left',
      r: 'right',
      b: 'bottom',
      t: 'top'
    },
    style: {
      0: 'none',
      1: 'thin',
      2: 'hair',
      3: 'dotted',
      4: 'dashDot', // 'Dashed',
      5: 'dashDot',
      6: 'dashDotDot',
      7: 'double',
      8: 'medium',
      9: 'mediumDashed',
      10: 'mediumDashDot',
      11: 'mediumDashDotDot',
      12: 'slantDashDot',
      13: 'thick'
    }
  }
  for (const bor in borders) {
    if (borders[bor].color.indexOf('rgb') === -1) {
      border[luckyExcel.type[bor]] = {
        style: luckyExcel.style[borders[bor].style],
        color: { argb: borders[bor].color.replace('#', '') }
      }
    } else {
      border[luckyExcel.type[bor]] = {
        style: luckyExcel.style[borders[bor].style],
        color: { argb: borders[bor].color }
      }
    }
  }

  return border
}

function createCellPos(n) {
  let ordA = 'A'.charCodeAt(0)

  let ordZ = 'Z'.charCodeAt(0)
  let len = ordZ - ordA + 1
  let s = ''
  while (n >= 0) {
    s = String.fromCharCode((n % len) + ordA) + s

    n = Math.floor(n / len) - 1
  }
  return s
}
