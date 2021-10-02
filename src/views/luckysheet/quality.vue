<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" :xs="24">


        <input style="font-size:16px;" type="file" @change="uploadExcel"/>

        <button @click="middlePay" style="margin: 0 20px">中期支付证书汇总</button>
        <button @click="middleApply" style="margin: 0 20px">监理服务费中期支付清单</button>

        <button @click="saveConfig" style="margin: 0 20px">保存数据</button>
        <button @click="printExcel" style="margin: 0 20px">点击打印</button>

        <div id="luckysheet" style="height: 90vh"></div>

        <div v-show="isMaskShow"
             style="position: absolute;z-index: 1000000;left: 0px;top: 0px;bottom: 0px;right: 0px; background: rgba(255, 255, 255, 0.8); text-align: center;font-size: 40px;align-items:center;justify-content: center;display:flex;">
          Downloading
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import LuckyExcel from 'luckyexcel'
  import { download2, getConfigData, saveData } from '@/api/luckysheet'
  import { exportExcel } from '@/utils/export'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'luckyexcel',
    props: {
      msg: String
    },
    data() {
      return {
        selected: '',
        dialogOpen: false,
        form: {},
        options: [
          {
            text: '中期支付证书汇总.xlsx',
            value: 'http://172.30.1.62:8030/middlePay.xlsx'
          }, {
            text: '监理服务费中期支付清单.xlsx',
            value: 'http://172.30.1.62:8030/middleApply.xlsx'
          }
        ],
        isMaskShow: false,
        toMergeRowLength: 0,
        toMergeColumnLength: 0
      }

    },
    mounted() {
      //在public/index.html中的resize方法，设定了transform 导致luckysheet异常
      document.getElementById('app').style.transform = ''
      window.onresize = () => {
        document.getElementById('app').style.transform = ''
      }

    },
    created() {
      this.showExcelFromUrl('http://172.30.1.62:8030/middlePay.xlsx', '中期支付证书汇总.xlsx')

    },
    methods: {
      uploadExcel(evt) {
        const files = evt.target.files
        if (files == null || files.length == 0) {
          alert('No files wait for import')
          return
        }
        let name = files[0].name
        let suffixArr = name.split('.'), suffix = suffixArr[suffixArr.length - 1]
        if (suffix != 'xlsx') {
          alert('Currently only supports the import of xlsx files')
          return
        }
        let that=this
        LuckyExcel.transformExcelToLucky(files[0], function(exportJson, luckysheetfile) {
          console.log(exportJson)
          console.log(name)
          that.showExcel(exportJson,name)
        })
      },
      middlePay() {
        this.showExcelFromUrl('http://172.30.1.62:8030/middlePay.xlsx', '中期支付证书汇总.xlsx')
      },
      middleApply() {
        this.showExcelFromUrl('http://172.30.1.62:8030/middleApply.xlsx', '监理服务费中期支付清单.xlsx')
      },
      showExcelFromUrl(url, name) {
        this.isMaskShow = true
        LuckyExcel.transformExcelToLuckyByUrl(url, name, (exportJson, luckysheetfile) => {
          if (exportJson.sheets == null || exportJson.sheets.length == 0) {
            alert('Failed to read the content of the excel file, currently does not support xls files!')
            return
          }
          this.showExcel(exportJson,name)

        })
      },
      showExcel(exportJson,name){
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert('Failed to read the content of the excel file, currently does not support xls files!')
          return
        }
        this.isMaskShow = false
        window.luckysheet.destroy()
        window.luckysheet.create({
          hook: {
            workbookCreateAfter: name==='中期支付证书汇总.xlsx'?this.createAfter:this.createAfter2,
            cellEditBefore: this.cellEditBefore,
            cellMousedown: this.cellMousedown,
            cellMousedownBefore: this.cellMousedownBefore
          },
          container: 'luckysheet',
          allowCopy: false, // 是否允许拷贝
          showtoolbar: false, // 是否显示工具栏
          showinfobar: false, // 是否显示顶部信息栏
          showsheetbar: false, // 是否显示底部sheet页按钮
          showstatisticBar: false, // 是否显示底部计数栏
          sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
          enableAddRow: false, // 允许增加行
          enableAddCol: false, // 允许增加列
          showRowBar: false, // 是否显示行号区域
          showColumnBar: false, // 是否显示列号区域
          sheetFormulaBar: false, // 是否显示公式栏
          enableAddBackTop: false,//返回头部按钮
          rowHeaderWidth: 0,//纵坐标
          columnHeaderHeight: 0,//横坐标
          showstatisticBarConfig: {
            count: false,
            view: false,
            zoom: false
          },
          showsheetbarConfig: {
            add: false, //新增sheet
            menu: false, //sheet管理菜单
            sheet: false //sheet页显示
          },
          column: 17,
          row: 50,
          allowEdit: true,
          lang: 'zh', //language
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator
        })
      },
      createAfter(options) {
        getConfigData('fe1fd47b1a684c2daa5954dc7e3346bd').then((res) => {
          let arr = res.data
          for (let i = 0; i < arr.length; i++) {
            window.luckysheet.setCellValue(9 + i, 0, arr[i].id)
            window.luckysheet.setCellValue(9 + i, 1, arr[i].chapter)
            window.luckysheet.setCellValue(9 + i, 2, arr[i].projectName)
            window.luckysheet.setCellValue(9 + i, 4, arr[i].concactAmount)
            window.luckysheet.setCellValue(9 + i, 5, arr[i].checkAmount)
            window.luckysheet.setCellValue(9 + i, 8, arr[i].changeAmount)
            window.luckysheet.setCellValue(9 + i, 9, arr[i].thispayMoney)
            window.luckysheet.setCellValue(9 + i, 12, arr[i].lastPayMoney)
            window.luckysheet.setCellValue(9 + i, 15, arr[i].payMoney)
          }
          this.toMergeRowLength = 20
          this.toMergeColumnLength = 5
          this.autoMerge()
        })

      },
      createAfter2(options) {
        this.toMergeRowLength = 40
        this.toMergeColumnLength = 5
        this.autoMerge()
      },
      cellEditBefore(range) {
        /*return false*/
      },
      //单元格点击后的事件，return false则终止之后的点击操作
      cellMousedown(cell, position, sheet, ctx) {
        //通过该方式，给某些单元格加入自定义方法
        if (position.r === 9 && position.c === 8) {
          this.dialogOpen = true
        }
      }
      , autoMerge() {
        this.mergeRow()
        this.mergeColumn()
      }
      , mergeColumn() {
        //合并列
        let rangeArray = []
        for (let rowNo = 0; rowNo <= this.toMergeRowLength; rowNo++) {
          this.recursiveColumn(rowNo, 0, rangeArray, 0)
        }
        console.log(rangeArray)
        let setting = {}
        setting.range = rangeArray
        window.luckysheet.cancelRangeMerge(setting)
        window.luckysheet.setRangeMerge('all', setting)
      },
      recursiveColumn(rowNo, columnNo, rangeArray, lastSameCellColumnNo) {
        if (columnNo < this.toMergeColumnLength) {
          let cell = window.luckysheet.getSheetData(0)[rowNo][columnNo]
          if (!cell || !cell.v || cell.v.trim() === '') {
            //如果为空值，则跳过，进行下一个单元格
            this.recursiveColumn(rowNo, columnNo + 1, rangeArray, columnNo + 1)
          } else {
            let cell2 = window.luckysheet.getSheetData(0)[rowNo][lastSameCellColumnNo + 1]
            if (cell2 && cell.v && cell.v === cell2.v) {
              lastSameCellColumnNo = lastSameCellColumnNo + 1
              //判断如果是合并的单元格
              if (cell2.mc && cell2.mc.cs) {
                lastSameCellColumnNo = columnNo + cell2.mc.cs
              }
            } else {
              //出现不同的值,将临时的选区数据 提交到集合中，将cell2的值作为临时选区数据
              //再判断这个选区是否只有一个格子
              if (columnNo !== lastSameCellColumnNo) {

                let lastSameCellRowNo = rowNo
                if (cell.mc && cell.mc.rs) {
                  lastSameCellRowNo = rowNo + cell2.mc.rs - 1
                }
                let range = { 'row': [rowNo, lastSameCellRowNo], 'column': [columnNo, lastSameCellColumnNo] }
                rangeArray.push(range)
              }
              lastSameCellColumnNo = lastSameCellColumnNo + 1
              columnNo = lastSameCellColumnNo
            }
            this.recursiveColumn(rowNo, columnNo, rangeArray, lastSameCellColumnNo)
          }
        }
      },
      mergeRow() {
        let rangeArray = []
        for (let columnNo = 0; columnNo <= this.toMergeColumnLength; columnNo++) {
          this.recursiveRow(0, columnNo, rangeArray, 0)
        }
        let setting = {}
        setting.range = rangeArray
        window.luckysheet.cancelRangeMerge(setting)
        window.luckysheet.setRangeMerge('all', setting)
      },
      recursiveRow(rowNo, columnNo, rangeArray, lastSameCellRowNo) {
        if (rowNo < this.toMergeRowLength) {
          let cell = window.luckysheet.getSheetData(0)[lastSameCellRowNo][columnNo]
          if (!cell || !cell.v || cell.v.trim() === '') {
            //如果为空值，则跳过，进行下一个单元格
            this.recursiveRow(rowNo + 1, columnNo, rangeArray, rowNo + 1)
          } else {
            let cell2 = window.luckysheet.getSheetData(0)[lastSameCellRowNo + 1][columnNo]
            if (cell2 && cell.v && cell.v === cell2.v) {
              lastSameCellRowNo = lastSameCellRowNo + 1
              //判断如果是合并的单元格
              if (cell2.mc && cell2.mc.rs) {
                lastSameCellRowNo = rowNo + cell2.mc.rs
              }
            } else {
              //出现不同的值,将临时的选区数据 提交到集合中，将cell2的值作为临时选区数据
              //再判断这个选区是否只有一个格子
              if (rowNo !== lastSameCellRowNo) {
                let lastSameCellColumnNo = columnNo
                if (cell2.mc) {
                  lastSameCellColumnNo = columnNo + cell2.mc.cs - 1
                }
                let range = { 'row': [rowNo, lastSameCellRowNo], 'column': [columnNo, lastSameCellColumnNo] }
                rangeArray.push(range)
              }
              lastSameCellRowNo = lastSameCellRowNo + 1
              rowNo = lastSameCellRowNo
            }
            this.recursiveRow(rowNo, columnNo, rangeArray, lastSameCellRowNo)
          }
        }
      },
      cellMousedownBefore(cell, position, sheet, ctx) {
        //通过该方式，指定某些单元格禁用
        /*if(position.r===9 && position.c===4){
          return false
        }*/
      },
      addFormula() {
        let token = getToken()
        let cell = window.luckysheet.getSheetData(0)[9][7]
        cell.f = '=REMOTE_INTF("http://172.30.1.62:8030/meterage/luckysheet/intf?token=' + token + '","a,b",H13,I14)'
        window.luckysheet.setCellValue(9, 7, cell)
        //exportExcel(window.luckysheet.getAllSheets())
      },
      downloadExcel() {
        exportExcel(window.luckysheet.getAllSheets())
      },
      downloadExcel2() {
        console.log(window.luckysheet.getAllSheets())
        let obj = { excelData: JSON.stringify(window.luckysheet.getAllSheets()) }
        download2(obj).then((res) => {
          let blob = res
          let filename = 'test.xlsx'
          filename = decodeURI(filename)
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename)
          } else {
            let a = document.createElement('a')
            document.body.appendChild(a)
            a.style = 'display: none'
            let url = window.URL.createObjectURL(blob)
            a.href = url
            a.download = filename
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
          }
        })

      },
      saveConfig() {
        let obj = {}
        obj.id = window.luckysheet.getCellValue(9, 0)
        obj.contractFormula = window.luckysheet.getCellValue(9, 4)
        saveData(obj).then((res) => {
          alert('操作成功')
        })
      },
      // 打印实现
      printExcel() {
        //  找到需要隐藏的DOM节点
        //$(".header").addClass("printHideCss");
        window.print()
        //$(".header").removeClass("printHideCss");
        //  window.location.reload();
      },
      //
      submitForm() {
        window.luckysheet.setCellValue(9, 8, this.form.remark)
        this.dialogOpen = false
      }
    }
  }
</script>



