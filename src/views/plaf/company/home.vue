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
import { saveData, getById } from "@/api/postment/vhcRegion";
import { createdzwl, updatedzwl, cxdzwl } from "@/api/postment/gdapi";
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
      getById(id).then(response => {
        this.form = response.data;
        this.obj.gfid = response.data.gid//添加gfid，用于修改电子围栏
        var obj = {
          key: 'b2a611d75ef46c09636cb4ffe0be68ca',
          sid: 411497,//猎鹰服务获取唯一sid
          outputshape: 1,
          gfids: response.data.gid
        }
        cxdzwl(obj).then(res => {
          var str = res.data.results[0].shape.points.split(';')
          var arr = []
          for (let i = 0; i < str.length; i++) {
            arr.push(str[i].split(','))
          }//将数组里面的字符转换成数组试试
          // console.log(arr);
          for (let k = 0; k < arr.length; k++) {
            for (let h = 0; h < arr[k].length; h++) {
              arr[k][h] = arr[k][h] * 1
            }
          }
          this.polygon = new AMap.Polygon({
            path: arr,
            strokeColor: "#FF33FF",
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            fillColor: '#1791fc',
            zIndex: 50,
          })
          this.map.add(this.polygon);
          this.map.setFitView();
          this.polyEditor = new AMap.PolyEditor(this.map, this.polygon);
          var _this = this
          _this.polyEditor.on('end', function (event) {
            var array = event.target.w.path
            console.log(array);
            for (let i = 0; i < array.length; i++) {
              if (!array[i][0]) {
                _this.obj.points += array[i].lng + ',' + array[i].lat + ';'
              } else {
                _this.obj.points += array[i][0] + ',' + array[i][1] + ';'
              }
            }
          })
          if (this.edit) {
            this.polyEditor.open()
          }
        })
      })
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
