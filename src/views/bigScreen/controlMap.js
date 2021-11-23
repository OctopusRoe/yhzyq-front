export default {
  data () {
    return {
      domMarker: null,
      viewMarker: null,
      line: null,
      key: null,
      videoInfo: null,
      imgList: {
        DEVICE_TYPE_TACHOMETER: require('./assets/images/b1.png'),
        DEVICE_TYPE_POSITIONER: require('./assets/images/b4.png'),
        DEVICE_TYPE_VIDEO_CAMERA: require('./assets/images/b2.png'),
        DEVICE_TYPE_LEI_DA: require('./assets/images/b3.png')
      },
      titleList: {
        DEVICE_TYPE_TACHOMETER: '智能锥桶',
        DEVICE_TYPE_POSITIONER: '智能标识牌',
        DEVICE_TYPE_VIDEO_CAMERA: '摄像机',
        DEVICE_TYPE_LEI_DA: '雷达'
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
        // const lonlat = [item.longitude, item.latitude]
        const lonlat = this.map.tranForm.gcjToWgs([item.longitude, item.latitude])
        this.domMarker.create({
          data: item,
          name: 'marker',
          id: item.id,
          point: lonlat,
          positioning: 'bottom-center',
          innerHTML: `<img src='${this.imgList[item.deviceType]}' style='width: 44px; height: 56px'>`
        })
      })

      // const midItem = data[~~(data.length / 2)]
      // const midLonLat = this.map.tranForm.gcjToWgs([midItem.longitude, midItem.latitude])

      // this.map.setCenter(midLonLat)
      // this.map.setZoom(12)

      this.domMarker.addClick(this.createDomMarker)
      this.map.addOverlay(this.domMarker.overlays)
    },

    createLine (options) {
      this.map.removeLayer(this.map.searchLayers('line'))
      // 删除上个鼠标滚轮事件
      if (this.key) {
        this.map.unon(this.key)
      }
      this.line = this.map.Line({ name: 'line', style: { color: 'red', width: 3 } })
      // 添加滚轮放大线的宽度
      this.map.addLayer(this.line.layer)
      // this.key = this.line.addWheel()
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
        className: 'one-zindex',
        item: item
      })

      this.map.addOverlay(this.viewMarker.overlays)

      document.getElementById('closeOverlayer').addEventListener('click', this.clsoeOverlayer)
      document.getElementById('checkVideo').addEventListener('click', this.openVideo)

    },

    // 关闭弹框模组
    clsoeOverlayer () {
      this.map.removeOverlay(this.map.searchOverlays('viewMarker'))
    },
    // 打开实时视频窗口
    openVideo () {

      this.videoInfo = JSON.parse(document.getElementById('checkVideo').getAttribute('item'))
      console.log('videoInfo: ', this.videoInfo)
      this.$refs.videoDialogRef.open()
    },

    // 创建dom节点
    createElement (data) {
      const titleList = this.titleList
      if (data.deviceType !== 'DEVICE_TYPE_VIDEO_CAMERA') {
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
          <!-- <div class="center-box-box">
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
            </div> -->
            <div class="item-box">
              <div class="content-box line-box">
                <div class="center-title">设备名称</div>
                <div class="center-center">${data['deviceName']}</div>
              </div>
            </div>
            <div class="item-box">
              <div class="content-box line-box">
                <div class="center-title">设备编号</div>
                <div class="center-center">${data['deviceNumber']}</div>
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
      } else {
        const str = JSON.stringify(item)
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
            <!-- <div class="item-box">
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
            </div> -->
            <div class="item-box">
              <div class="content-box line-box">
                <div class="center-title">设备名称</div>
                <div class="center-center">${data['deviceName']}</div>
              </div>
            </div>
            <div class="item-box">
              <div class="content-box line-box">
                <div class="center-title">设备编号</div>
                <div class="center-center camera">${data['deviceNumber']}</div>
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
                <div class="center-title">实时视频</div>
                <div class="center-center" id='checkVideo' item=${str}>查看实时视频</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      `
      }
    }
  }
}