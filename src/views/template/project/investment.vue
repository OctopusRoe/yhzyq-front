<template>
  <div class="index-container">
    <div class="con-wrap">
      <div class="l">
        <div class="t">
          <div>
            <div class="title">累积支付</div>
            <div class="money">
              <div>项目已支付<span>20</span><span>.91</span>亿元</div>
              <div>占总体金额<span>30</span><span>.32</span>%</div>
            </div>
            <div class="chart-box">
              <div id="chart1"></div>
            </div>
          </div>
          <div>
            <div class="title">完成产值与进度款对比</div>
            <div class="chart-box">
              <div id="chart2"></div>
            </div>
          </div>
        </div>
        <div class="b">
          <div>
            <div class="title">合同执行</div>
            <div class="chart-box">
              <div id="chart3"></div>
            </div>
          </div>
          <div>
            <div class="title">变更金额</div>
            <div class="chart-box">
              <div id="chart4"></div>
            </div>
          </div>
          <div>
            <div class="title">变更数量</div>
            <div class="chart-box">
              <div id="chart5"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="r">
        <div class="t">
          <div>
            <div>
              <div class="name">我的任务</div>
              <div class="num">111</div>
            </div>
          </div>
          <div>
            <div>
              <div class="name">我的代办</div>
              <div class="num">26</div>
            </div>
          </div>
          <div>
            <div>
              <div class="name">我的通知</div>
              <div class="num blue">20</div>
            </div>
          </div>
          <div>
            <div>
              <div class="name">我的消息</div>
              <div class="num blue">333</div>
            </div>
          </div>
        </div>
        <div class="b">
          <div>
            <div class="title">
              <span>项目概览</span>
              <div @click="showSwitchProject">
                <i>●</i>
                <div>
                  <span>大广高速公路南康至龙南段扩容工程</span
                  ><svg-icon icon-class="icon-xjt" />
                </div>
                <ul v-show="showSwitchProFlag">
                  <li @click.stop="swtchProject">
                    大广高速公路南康至龙南段扩容工程
                  </li>
                  <li @click.stop="swtchProject">
                    婺源高速公路南康至龙南段扩容工程
                  </li>
                  <li @click.stop="swtchProject">
                    萍莲高速公路南康至龙南段扩容工程
                  </li>
                </ul>
                <div
                  class="select-bg"
                  v-show="showSwitchProFlag"
                  @click.stop="showSwitchProFlag = false"
                ></div>
              </div>
            </div>
            <div>
              <div class="map-box">
                <div id="bigmap"></div>
                <div class="info">
                  <div>
                    <div>
                      <img src="@/assets/image/style1/way.png" alt="" />
                    </div>
                    <div class="detail">
                      <div>144<i>.1</i></div>
                      <div>全长（公里）</div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="@/assets/image/style1/amount.png" alt="" />
                    </div>
                    <div class="detail">
                      <div>144<i>.9</i></div>
                      <div>总投资（亿元）</div>
                    </div>
                  </div>
                </div>
                <div class="type-list">
                  <div>
                    <img
                      src="@/assets/image/style1/icon1-map.png"
                      v-if="mapTypeFlag.type1"
                      @click="checkPoint('type1')"
                    />
                    <img
                      src="@/assets/image/style1/icon1-gray-map.png"
                      v-else
                      @click="checkPoint('type1')"
                    /><span>特大桥</span>
                  </div>
                  <div>
                    <img
                      src="@/assets/image/style1/icon2-map.png"
                      v-if="mapTypeFlag.type2"
                      @click="checkPoint('type2')"
                    />
                    <img
                      src="@/assets/image/style1/icon2-gray-map.png"
                      v-else
                      @click="checkPoint('type2')"
                    /><span>隧道</span>
                  </div>
                  <div>
                    <img
                      src="@/assets/image/style1/icon3-map.png"
                      v-if="mapTypeFlag.type3"
                      @click="checkPoint('type3')"
                    />
                    <img
                      src="@/assets/image/style1/icon3-gray-map.png"
                      v-else
                      @click="checkPoint('type3')"
                    /><span>互通</span>
                  </div>
                  <div>
                    <img
                      src="@/assets/image/style1/icon4-map.png"
                      v-if="mapTypeFlag.type4"
                      @click="checkPoint('type4')"
                    />
                    <img
                      src="@/assets/image/style1/icon4-gray-map.png"
                      v-else
                      @click="checkPoint('type4')"
                    /><span>服务区</span>
                  </div>
                </div>
              </div>
              <div class="map-sub" :class="showAllFlag ? 'active' : ''">
                该项目起于赣州市南康区十八塘，接已建成的大广高速公路吉安至南康段，止于龙南杉龙南至杨树段，全长132.676南杉树下，接已建成的大广高速龙南，全长132.676该项目起于赣州市南康区十八塘，接已建成的大广高速公路吉安至南康段，止于龙南杉龙南至杨树段，全长132.676南杉树下，接已建成的大广高速龙南，全长132.676该项目起于赣州市南康区十八塘，接已建成的大广高速公路吉安至南康段，止于龙南杉龙南至杨树段，全长132.676南杉树下，接已建成的大广高速龙南，全长132.676
                <span @click="showAll"
                  >[{{ showAllFlag ? "收缩" : "展开" }}]</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
require("echarts/theme/macarons");
export default {
  name: "home",
  components: {},
  data() {
    return {
      mapTypeFlag: { type1: true, type2: true, type3: true, type4: true },
      dddd: true,
      showSwitchProFlag: false,
      showAllFlag: false,
      options: [
        {
          value: "1",
          label: "大广高速公路南康至龙南段扩容工程",
        },
        {
          value: "2",
          label: "大广高速公路南康至龙南段扩容工程",
        },
        {
          value: "3",
          label: "大广高速公路南康至龙南段扩容工程",
        },
      ],
      value: "",
    };
  },
  mounted() {
    this.tzglChart();
    this.zjbdtjChart();
    this.sjbgpfChart();
    this.bgjdChart();
    this.bgslChart();
    this.mapInit();
  },
  methods: {
    checkPoint(type) {
      if (this.mapTypeFlag[type]) {
        this.mapTypeFlag[type] = false;
      } else {
        this.mapTypeFlag[type] = true;
      }
    },
    swtchProject() {
      this.showSwitchProFlag = false;
    },
    showSwitchProject() {
      this.showSwitchProFlag = true;
    },
    showAll() {
      if (this.showAllFlag) {
        this.showAllFlag = false;
      } else {
        this.showAllFlag = true;
      }
    },
    async mapInit() {
      function MapTool() {

        this.map;
        this.polyline;
        this.allStakeMarkArray = new Array();
        //etc支架状态1
        this.zj1 = new AMap.Icon({
          image: "/icon1.png",
          size: new AMap.Size(43, 62),
        });
        //etc支架状态2
        this.zj2 = new AMap.Icon({
          image: "/icon2.png",
          size: new AMap.Size(43, 62),
        });
        //etc支架状态3
        this.zj3 = new AMap.Icon({
          image: "/icon3.png",
          size: new AMap.Size(43, 62),
        });

        this.iconMap = new Map();
        this.initMapTool = function () {
          this.iconMap.set("zj1", this.zj1);
          this.iconMap.set("zj2", this.zj2);
          this.iconMap.set("zj3", this.zj3);
        };


      }

      let mapTool = new MapTool();
      mapTool.map = new AMap.Map("bigmap", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        mapStyle: "amap://styles/afb5d3dc9aeb8fdae89baa9a9ca8833d",

      });
      mapTool.initMapTool();
      let markerList3 = [];
      let markerList = [];
      let markerList4 = [];




      //**********************2021*************************
      mapTool.map.setZoomAndCenter(13,new AMap.LngLat(115.791871,28.730255));
      let pathList = [
        [
          [115.831782,28.774801],
          [115.822341,28.769234],
          [115.815045,28.755653],
          [115.812127,28.750762],
          [115.799381,28.739549]
        ],
        [
          [115.799381,28.739549],
          [115.791871,28.730255],
          [115.788437,28.727583]
        ],
        [
          [115.788437,28.727583],
          [115.779683,28.722427],
          [115.773245,28.714373]
        ]
      ];
      let colorList = ['#FFB6C1','#00FA9A','#FF4500'];
      let textList=['SJJS标段','FZS标段','HZS标段'];



      for(let i = 0; i < pathList.length; i++) {
        let path=pathList[i];
        let j=parseInt(path.length/2);
        let centerPath=JSON.parse( JSON.stringify( path[j]) );
        let color=colorList[i];
        let polyline = new AMap.Polyline({
          path: path,
          isOutline: true,
          cursor:'pointer',
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 12,
          // 折线样式还支持 'dashed'
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50
        });
        polyline.on('click',function (e){
          console.log("点击了222");

        });
        let te=textList[i];
        // 创建纯文本标记
        let text = new AMap.Text({
          text:te,
          anchor:'center', // 设置文本标记锚点
          cursor:'pointer',
          angle:0,
          style:{
            'padding': '.75rem 1.25rem',
            'margin-bottom': '1rem',
            'border-radius': '.25rem',
            'background-color': 'white',
            'width': '6rem',
            'border-width': 0,
            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '8px',
            'color': 'blue'
          },
          position: centerPath
        });

        text.on('click',function (e){
          console.log("点击了111");

        });
        mapTool.map.add(polyline);
        mapTool.map.add(text);
      }

      //*************************2021********************************






      // try {
      //   const res = await axios.post("/api/CheckTollJamsToJonsService.ashx", {
      //     body: {},
      //     head: {
      //       MethodName: "QueryTollJamsEquipmentsList",
      //     },
      //   });
      //   if (res.status === 200) {
      //     let pointList = res.data.body.EquipmentList;
      //     console.log(pointList);
      //     for (let i = 0; i < markerList3.length; i++) {
      //       mapTool.map.remove(markerList3[i]);
      //     }
      //     for (let i = 0; i < markerList4.length; i++) {
      //       mapTool.map.remove(markerList4[i]);
      //     }
      //     for (let i = 0; i < markerList.length; i++) {
      //       mapTool.map.remove(markerList[i]);
      //     }
      //
      //     markerList3 = [];
      //     markerList = [];
      //     markerList4 = [];
      //     for (let i = 0; i < pointList.length; i++) {
      //       let SiteId = pointList[i].SiteId;
      //       let SiteName = pointList[i].SiteName;
      //       let icon = "";
      //       let congestion = pointList[i].congestion + "  ";
      //       if (congestion.indexOf("2") >= 0) {
      //         icon = mapTool.iconMap.get("zj3");
      //       } else if (congestion.indexOf("3") >= 0) {
      //         icon = mapTool.iconMap.get("zj2");
      //       } else {
      //         icon = mapTool.iconMap.get("zj1");
      //       }
      //       let lng = pointList[i].Amap_Logitude;
      //       let lat = pointList[i].Amap_Latitude;
      //       let marker = new AMap.Marker({
      //         position: new AMap.LngLat(lng, lat),
      //         icon: icon,
      //         offset: new AMap.Pixel(0, 0),
      //         extData: pointList[i],
      //       });
      //       marker.on("click", markerClick); //地图上的图标点 添加事件
      //       if (congestion.indexOf("2") >= 0) {
      //         markerList.push(marker);
      //       } else if (congestion.indexOf("3") >= 0) {
      //         markerList6.push(marker);
      //       } else if (congestion.indexOf("4") >= 0) {
      //         markerList4.push(marker);
      //       } else {
      //         markerList3.push(marker);
      //       }
      //       mapTool.map.add(marker);
      //     }
      //
      //     function markerClick(e) {}
      //
      //   } else {
      //     console.log("404");
      //   }
      //
      // } catch (e) {
      //   console.log(e);
      // }
    },
    tzglChart() {
      let chart = echarts.init(document.getElementById("chart1"));
      var dataIPSxAxis = [
        "婺源项目",
        "大广项目",
        "宜隧项目",
        "寻龙项目",
        "吉康项目",
        "梨温项目",
      ];
      var dataIPS = [50, 67, 53, 66, 46, 85];
      var dataIPS2 = [56, 62, 63, 78, 86, 65];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        color: ["#0080ff", "#4cd5ce"],
        grid: {
          left: "3%",
          right: "5%",
          top: "12%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: dataIPSxAxis,
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#333",
                fontSize: 10,
              },
            },
            axisLine: {
              lineStyle: {
                color: "#0a2b52",
                width: 0.5,
              },
            },
          },
        ],
        yAxis: [
          {
            name: "万元     ",
            type: "value",
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#333",
                width: 1,
              },
            },

            axisLabel: {
              formatter: function (val) {
                return val + "";
              },
              show: true,
              textStyle: {
                color: "#333", //字体颜色
                fontSize: 12,
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "支付",
            type: "line",
            smooth: true,
            //  symbol: "none", //去掉折线点
            stack: 100,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0FDE88", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#c7f8e4", // 100% 处的颜色
                  },
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: "solid",
                  color: "#039339",
                },
              },
              emphasis: {
                color: "#02675f",
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: "dotted",
                  color: "#02675f", //折线的颜色
                },
              },
            }, //线条样式
            symbolSize: 9, //折线点的大小
            areaStyle: {
              normal: {},
            },
            data: dataIPS,
          },

          {
            name: "百分比",
            type: "line",
            smooth: true,
            //  symbol: "none", //去掉折线点
            stack: 100,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#68d0f5", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#f3fcff", // 100% 处的颜色
                  },
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: "solid",
                  color: "#0078D7",
                },
              },
              emphasis: {
                color: "#02675f",
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: "dotted",
                  color: "#02675f", //折线的颜色
                },
              },
            }, //线条样式
            symbolSize: 9, //折线点的大小
            areaStyle: {
              normal: {},
            },
            data: dataIPS2,
          },
        ],
      };
      chart.setOption(option);
    },
    zjbdtjChart() {
      let chart = echarts.init(document.getElementById("chart2"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "4%",
          top: "8%",
          containLabel: true,
        },
        legend: {
          right: "10%",
          top: "-1%",
          data: ["完成值", "进度值"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "婺源项目",
              "大广项目",
              "宜隧项目",
              "寻龙项目",
              "吉康项目",
              "梨温项目",
            ],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#333",
                fontSize: 10,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "完成值",
            type: "bar",
            data: [10, 52, 200, 334, 390, 330],
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#60F5FF",
                  },
                  {
                    offset: 1,
                    color: "#3FA4FF",
                  },
                ]),
                borderWidth: 0,
              },
            },
            barWidth: 20,
          },
          {
            name: "进度值",
            type: "bar",
            data: [10, 52, 200, 334, 390, 330],
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#FF72A6",
                  },
                  {
                    offset: 1,
                    color: "#FF3657",
                  },
                ]),
                borderWidth: 0,
              },
            },
          },
        ],
      };

      chart.setOption(option);
    },
    sjbgpfChart() {
      let chart = echarts.init(document.getElementById("chart3"));
      let option = {
        title: {
          text: "合同总额",
          textStyle: {
            color: "#666",
            fontSize: 19,
          },
          itemGap: 20,
          left: "center",
          top: "39%",
        },
        color: ["#ffc770", "#47d6ff", "#479eff", "rgba(255,255,255,.5)"],
        legend: {
          left: "center",
          bottom: "16%",
          data: ["建筑安装类", "土地征用拆迁", "工程建设其他"],
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["30%", "52%"],
            center: ["50%", "42%"],
            label: {
              fontSize: 14,
              formatter: function (param) {
                return param.name + "\n" + param.percent.toFixed(0) + "%";
              },
              rich: {
                per0: {
                  padding: [0, 0, 0, 5],
                  fontSize: 16,
                  fontWeight: "bold",
                },
                per1: {
                  padding: [0, 0, 0, 5],
                  fontSize: 16,
                  fontWeight: "bold",
                },
                per2: {
                  padding: [0, 0, 0, 5],
                  fontSize: 16,
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              show: true,
              length: 6,
              length2: 8,
            },
            data: [
              {
                name: "建筑安装类",
                value: "300",
              },
              {
                name: "土地征用拆迁",
                value: "120",
              },
              {
                name: "工程建设其他",
                value: "556",
              },
            ],
          },
          {
            type: "pie",
            radius: ["30%", "37%"],
            center: ["50%", "42%"],
            silent: true,
            data: [
              {
                name: "",
                value: 1,
              },
            ],
          },
        ],
      };
      chart.setOption(option);
    },
    bgjdChart() {
      let chart = echarts.init(document.getElementById("chart4"));
      var getname = ["婺源", "大广", "宜隧", "寻龙", "吉康", "梨温"]; //数据点名称
      var getvalue = [230, 193, 155, 132, 300, 200];
      var getvalue1 = [123, 250, 128, 100, 201, 210];
      var seriescolor = ["#4B96F3", "#03C9AC"];

      let option = {
        grid: {
          top: "15%",
          right: "5%",
          left: "12%",
          bottom: "10%",
        },
        tooltip: {
          trigger: "axis",
          extraCssText:
            "padding-left:8px;line-height:30px;width:210px;height:110px;background:rgba(255,255,255,1);box-shadow:1px 5px 20px 0px rgba(1,11,19,0.2);border-radius:6px;",
          axisPointer: {
            type: "none",
          },
          textStyle: {
            fontSize: "14",
            color: "#666",
          },
        },
        legend: {
          data: ["变更总金额", "累计变更计量金额"],
          type: "scroll",
          left: "center",
          top: "10",
          itemGap: 25,
          itemWidth: 13,
          itemHeight: 13,
          textStyle: {
            fontSize: "13",
            color: "#666",
          },
        },
        xAxis: [
          {
            data: getname,
            axisLabel: {
              margin: 10,
              color: "#333333",
              textStyle: {
                fontSize: 13,
              },
            },
            axisLine: {
              lineStyle: {
                color: "#eee",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            name: "万元     ",
            nameTextStyle: {
              color: "#333333",
              fontSize: 13,
            },
            axisLabel: {
              color: "#333333",
              textStyle: {
                fontSize: 13,
              },
            },
            axisLine: {
              lineStyle: {
                color: "#eeee",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "#eeee",
              },
            },
          },
        ],
        animation: false,
        series: [
          {
            name: "变更总金额",
            type: "bar",
            data: getvalue,
            barWidth: "13",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#ee6666",
                    },
                    {
                      offset: 1,
                      color: "#d03636",
                    },
                  ],
                  false
                ),
              },
            },
          },
          {
            name: "累计变更计量金额",
            type: "bar",
            data: getvalue1,
            barWidth: "13",
            barGap: "70%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#92cc75",
                    },
                    {
                      offset: 1,
                      color: "#5eac37",
                    },
                  ],
                  false
                ),
              },
            },
          },
        ],
      };
      chart.setOption(option);
    },
    bgslChart() {
      let chart = echarts.init(document.getElementById("chart5"));

      //x轴-时间
      var date = [];
      //y轴-数据
      var data = [];
      //下标
      var index = 0;
      var getname = ["婺源", "大广", "宜隧", "寻龙", "吉康", "梨温"];
      var allData = [
        { time: "婺源", num: 73 },
        { time: "大广", num: 42 },
        { time: "宜隧", num: 88 },
        { time: "寻龙", num: 50 },
        { time: "吉康", num: 36 },
        { time: "梨温", num: 81 },
      ];
      allData.map((val, idx) => {
        data.push(val.num);
        date.push(val.time);
      });

      let option = {
        grid: {
          left: "3%",
          right: "5%",
          top: "12%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 120,
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: "#333",
              fontSize: 12,
            },
          },
          splitLine: {
            lineStyle: {
              color: "#eeee",
            },
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#eee",
              width: 1,
            },
          },
        },
        series: [
          {
            type: "line",
            smooth: false, //拐弯处变锋利
            symbol: "none", //去除圆角
            sampling: "average",
            // animationDurationUpdate: 1000, //数据更新时的动画时长
            // animationEasing: "bounceIn",
            // animationDelayUpdate: function (idx) {
            //   // 越往后的数据延迟越大
            //   return idx * 10;
            // },
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: data,
          },
        ],
      };

      chart.setOption(option);
    },
    set() {
      this.setShowFlag = true;
    },
    hideSet() {
      this.setShowFlag = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.index-container {
  height: calc(100% - 53px);
  .con-wrap {
    display: flex;
    padding: 10px;
    height: calc(100% - 40px);
    background-color: #f5f5f5;
    .l {
      .t {
        display: flex;
        > div {
          width: 594px;
          margin: 10px;
          height: 370px;
          background-color: #fff;
          border-radius: 5px;
          position: relative;
          .title {
            color: #333;
            font-size: 18px;
            padding-top: 10px;
            padding-left: 20px;
          }
          .money {
            position: absolute;
            right: 30px;
            top: 0;
            > div {
              color: #3788fd;
              font-size: 14px;
              span:first-child {
                margin-left: 5px;
                font-size: 30px;
                font-weight: bold;
              }
              span:last-child {
                margin-right: 5px;
                font-weight: bold;
                font-size: 16px;
              }
            }
            > div:first-child {
              span {
                color: #ff7200;
              }
            }
            > div:last-child {
              margin-top: -15px;
            }
          }
          .chart-box {
            //   background-color: black;
            height: 330px;
            width: 100%;
            > div {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .b {
        display: flex;
        justify-content: space-between;
        > div {
          border-radius: 5px;
          background-color: #fff;
          width: 390px;
          margin: 10px;
          height: 440px;
          .title {
            color: #333;
            font-size: 18px;
            padding-top: 10px;
            padding-left: 20px;
          }
          .chart-box {
            width: 100%;
            height: 400px;
            > div {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .r {
      flex-grow: 1;
      .t {
        margin: 10px;
        height: 138px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        > div {
          border-right: 2px solid #e5e5e5;
          flex-grow: 1;
          text-align: center;
          height: 80%;
          align-items: center;
          display: flex;
          justify-content: center;
          .name {
            font-size: 18px;
            color: #6b6b6b;
          }
          .num {
            color: #ff8686;
            font-size: 30px;
            margin-top: 10px;
          }
          .num.blue {
            color: #3788fd;
          }
        }
        > div:last-child {
          border-right: 0;
        }
      }
      .b {
        height: 672px;
        float: left;
        width: 100%;
        > div {
          position: relative;
          border-radius: 5px;
          margin: 10px;
          height: 100%;
          background-color: #fff;
          padding: 10px;
          .title {
            display: flex;
            justify-content: space-between;
            span {
              font-size: 18px;
              align-items: center;
            }
            > div {
              display: flex;
              align-items: center;
              position: relative;
              i {
                color: #f99200;
                font-size: 16px;
                margin-right: 10px;
                font-style: normal;
              }
              .select-bg {
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 6;
              }
              ul {
                position: absolute;
                border-radius: 3px;
                top: 42px;
                right: 0;
                width: auto;
                z-index: 1000;
                padding-bottom: 5px;
                background-color: #fff;
                -webkit-box-shadow: 0 0 5px 2px #a4a5a7;
                box-shadow: 0 0 5px 2px #a4a5a7;
                // display: none;
                > li {
                  padding: 9px 10px;
                  list-style-type: none;
                  font-size: 14px;
                  cursor: pointer;
                }
                > li:hover {
                  background-color: #ebf3fe;
                  color: #3289fa;
                }
              }
              > div {
                display: flex;
                align-items: center;
                color: #999;
                cursor: pointer;
                span {
                  font-size: 16px;
                  line-height: 1;
                  padding-top: 2px;
                }
                .svg-icon {
                  color: #999;
                  line-height: 1;
                  font-size: 20px;
                }
              }
            }
          }
        }
        .map-box {
          margin-top: 10px;
          width: 100%;
          height: 560px;
          position: relative;
          .info {
            display: flex;
            align-items: center;
            > div {
              display: flex;
              align-items: center;
            }
            > div {
              color: #3289fa;
              margin-right: 30px;
              .detail {
                > div:first-child {
                  font-size: 42px;
                  font-weight: bold;
                  line-height: 1;
                  i {
                    font-size: 30px;
                    font-style: normal;
                  }
                }
                > div:last-child {
                  font-size: 16px;
                }
              }
            }
            > div:last-child {
              color: #00aabd;
            }
          }
          > div#bigmap {
            width: 100%;
            height: 100%;
          }
          > div.info {
            bottom: 30px;
            left: 30px;
            position: absolute;
          }
          .type-list {
            position: absolute;
            right: 10px;
            bottom: 15px;
            background-color: #fff;
            border: 1px solid #cdcdcd;
            padding: 6px 20px 6px 10px;
            border-radius: 5px;
            > div {
              text-align: left;
              margin: 3px 0;
              * {
                vertical-align: middle;
              }
              img {
                margin-right: 5px;
                cursor: pointer;
              }
              span {
                font-size: 14px;
              }
            }
          }
        }
        .map-sub {
          font-size: 14px;
          padding: 10px 15px 15px;
          position: absolute;
          left: 0;
          bottom: 0;
          background-color: #fff;
          transition: all 0.3s;
          overflow: hidden;
          height: 70px;
          line-height: 28px;
          z-index: 9999;
          span {
            color: #ff0000;
            cursor: pointer;
            position: absolute;
            right: 18px;
            bottom: 4px;
            background-color: #fff;
          }
        }
        .map-sub.active {
          height: 210px;
        }
      }
    }
  }
}
</style>
