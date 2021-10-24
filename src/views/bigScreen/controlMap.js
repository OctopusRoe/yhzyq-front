export default {
  data () {
    return {
      domMarker: null,
      imgList: {
        DEVICE_TYPE_TACHOMETER: require('./assets/images/3.png'),
        DEVICE_TYPE_POSITIONER: require('./assets/images/4.png'),
        DEVICE_TYPE_VIDEO_CAMERA: require('./assets/images/2.png'),
        DEVICE_TYPE_LEI_DA: require('./assets/images/1.png')
      },
      viewMarker: null
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

      // this.domMarker.addClick(this.createDomMarker)
      this.map.addOverlay(this.domMarker.overlays)
    },

    createDomMarker (data) {
      const lonlat = data.item.point

      this.viewMarker = this.map.DomMarker({
        offset: [50, 0],
        useTitle: false
      })

      // this.map.removeOverlay(this.map.searchOverlays('viewMarker'))
      // document.getElementById('viewDomMarker').cssText = 'display: none'

      this.viewMarker.create({
        name: 'viewMarker',
        id: data.item.id,
        point: lonlat,
        positioning: 'center-left',
        innerHTML: document.getElementById('viewDomMarker')
      })

      this.viewMarker.addClick(this.closeOverlayer)

      this.map.addOverlay(this.viewMarker.overlays)
    }
  }
}