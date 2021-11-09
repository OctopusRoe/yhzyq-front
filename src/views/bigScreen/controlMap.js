export default {
  data () {
    return {
      domMarker: null,
      viewMarker: null,
      line: null,
      imgList: {
        DEVICE_TYPE_TACHOMETER: require('./assets/images/b3.png'),
        DEVICE_TYPE_POSITIONER: require('./assets/images/b4.png'),
        DEVICE_TYPE_VIDEO_CAMERA: require('./assets/images/b2.png'),
        DEVICE_TYPE_LEI_DA: require('./assets/images/b1.png')
      },
      titleList: {
        DEVICE_TYPE_TACHOMETER: '雷达',
        DEVICE_TYPE_POSITIONER: '智能标识牌',
        DEVICE_TYPE_VIDEO_CAMERA: '摄像机',
        DEVICE_TYPE_LEI_DA: '智能锥桶'
      }
    }
  },

  mounted () {
  },
  methods: {
    createMark (data) {
      this.map.removeOverlay(this.map.overlays)

      this.domMarker = this.map.DomMarker({
        offset: [0, 0],
        useTitle: false
      })

      data.forEach(item => {
        const lonlat = [item.longitude, item.latitude]

        this.domMarker.create({
          data: item,
          name: 'marker',
          id: item.id,
          point: lonlat,
          positioning: 'bottom-center',
          innerHTML: `<img src='${this.imgList[item.deviceType]}' style='width: 44px; height: 56px'>`
        })
      })
      const lonlat = [data[0].longitude, data[0].latitude]

      this.map.setCenter(lonlat)
      this.map.setZoom(12)

      this.domMarker.addClick(this.createDomMarker)
      this.map.addOverlay(this.domMarker.overlays)
    },

    createLine (options) {
      this.map.removeLayer(this.map.searchLayers('line'))
      this.line = this.map.Line({ name: 'line', style: { color: 'red', width: 3 } })
      this.map.addLayer(this.line.layer)

      if (Array.isArray(options)) {
        options.forEach(item => {
          this.line.create({ point: item.point })
        })
      } else {
        this.line.create({ point: options.point })
      }
    },

    createDomMarker (data) {
      const lonlat = data.item.point
      const item = data.item.data

      this.viewMarker = this.map.DomMarker({
        offset: [50, 0],
        useTitle: false
      })

      this.map.removeOverlay(this.map.searchOverlays('viewMarker'))

      this.viewMarker.create({
        name: 'viewMarker',
        id: data.item.id,
        point: lonlat,
        positioning: 'center-left',
        innerHTML: this.createElement(item),
        className: 'one-zindex'
      })

      this.map.addOverlay(this.viewMarker.overlays)

      document.getElementById('closeOverlayer').addEventListener('click', this.clsoeOverlayer)
    },

    // 关闭弹框模组
    clsoeOverlayer () {
      console.log(1)
      this.map.removeOverlay(this.map.searchOverlays('viewMarker'))
    },

    // 创建dom节点
    createElement (data) {
      const titleList = this.titleList
      return `
        <div class="overlayer-box">
          <div class="title-box">
            <div class="title">
              ${titleList[data.deviceType]}
            </div>
            <div
              class="close"
              id="closeOverlayer"
            >
              <i class="el-icon-circle-close" ></i>
            </div>
          </div>
          <div class="center-box-box">
            <div class="item-box">
              <div class="content-box line-box">
                <div class="center-title">路段名称</div>
                <div class="center-center">${data['address']}</div>
              </div>
            </div>
            <div class="item-box">
              <div class="content-box line-box">
                <div class="center-title">桩 号</div>
                <div class="center-center">${data['pileNumber']}</div>
              </div>
            </div>
            <div class="item-box">
              <div class="content-box line-box">
                <div class="center-title">设备归属</div>
                <div class="center-center">${data['centerName']}</div>
              </div>
            </div>
            <div class="item-box">
              <div class="content-box line-box">
                <div class="center-title">摆放时间</div>
                <div class="center-center">${data['createTime']}</div>
              </div>
            </div>
            <div class="item-box">
              <div class="content-box" >
                <div class="center-title">违规情况</div>
                <div class="center-center"> </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      `
    }
  }
}