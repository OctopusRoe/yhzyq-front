<template>
  <div>
    <el-col :span="12">
      <el-form-item label="围栏所在地区" prop="adcode">
        <el-input :disabled="datFromDisabled" v-model="form.adcode" placeholder="请输入围栏所在地区" />
      </el-form-item>
    </el-col>

    <div id="gdmap" class="map-class-home"></div>
  </div>
</template>
<script>

export default {
  components: {
  },
  created() {
  },
  mounted() {
    this.initMap()
  },
  data() {
    return {
      form: {
        adcode: null,
        vhcName: null,
        remark: null,
        checkValidTime: null,
      },
      map: null,
      polyEditor: null,
      dbxpath: null,
      polygon: null,
      str: '',//存储围栏顶点坐标
      obj: {//创建电子围栏参数
        key: 'b2a611d75ef46c09636cb4ffe0be68ca',
        sid: 411497,//猎鹰服务获取唯一sid
        name: '',
        desc: '',
        points: ''
      },
      editobj: {//修改电子围栏参数
        key: 'b2a611d75ef46c09636cb4ffe0be68ca',
        sid: 411497,//猎鹰服务获取唯一sid
        name: '',
        desc: '',
        points: '',
        gfid: ''
      },
    }
  },
  methods: {
    initMap() {
      var _this = this
      var path = []
      _this.map = new AMap.Map('gdmap', {
        center: [115.903908, 28.672869],
        zoom: 15, //初始地图中心点
        showIndoorMap: false, //关闭室内地图
      });
      if (!_this.edit) {
        _this.map.on('click', function showInfoClick1(e) {
          if (_this.polygon) {
            // _this.polyEditor.close();
            _this.map.remove(_this.polygon)
          }
          var marker = new AMap.Marker({
            position: [e.lnglat.getLng(), e.lnglat.getLat()]
          });
          _this.map.add(marker);
          var positionx = e.lnglat.getLng()
          var positiony = e.lnglat.getLat()
          path.push([positionx, positiony])
          _this.polygon = new AMap.Polygon({
            path: path,
            strokeColor: "#FF33FF",
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            fillColor: '#1791fc',
            zIndex: 50,
          })
          _this.map.add(_this.polygon)

        });
      }
    },

    // 修改时回显数据
    getData(id) {

    }
  },
}
</script>

<style lang='scss'>
.map-class-home {
  height: 100%;
  width: 100%;
}
</style>
