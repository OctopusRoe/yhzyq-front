<template>
  <div class="index-container">
    <div id="bigmap"></div>
    <div class="content-left">
      <div>
        <div class="box">
          <div class="title">安全得分</div>
          <div class="chart-box" style="height: 385px">
            <div id="chart66"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">整改情况</div>
          <div class="num-box" style="margin-top: 20px">
            <div>
              <div>
                <span class="num">20.91</span>
              </div>
              <div class="num-title">待整改</div>
            </div>
            <div>
              <div>
                <span class="num2">20.91</span>
              </div>
              <div class="num-title">已整改</div>
            </div>
            <div>
              <div>
                <span class="num1">35.68</span>
              </div>
              <div class="num-title">逾期整改</div>
            </div>
          </div>
          <div class="chart-box" style="height: 300px">
            <div id="chart3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div>
        <div class="box">
          <div class="title">问题分类</div>
          <div class="chart-box" style="height: 360px">
            <div id="chart7"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">视频监控</div>
          <div class="video-box">
            <img src="@/assets/image/style1/temp1.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="map-tip">
      <div class="title">大广高速公路南康至龙南段扩容</div>
      <div class="word" :class="wordFlag ? 'active' : ''">
        大广高速公路黑龙江省段全线位于大庆市境内，起点位于大庆市萨尔图机场，途经萨尔图区、龙凤区、红岗区、大同区、肇州县、肇源县，终于肇源县松花江大桥（黑吉界）途经萨尔图区、龙凤区、红岗区、大同区、肇州县、肇源县，终于肇源县松花江大桥（黑吉界）途经萨尔图区、龙凤区、红岗区、大同区、肇州县、肇源县，终于肇源县松花江大桥（黑吉界）
        <div class="toggle" @click="showWord">
          {{ wordFlag ? "展开详情" : "收缩详情" }}
          <img src="@/assets/image/style1/icon-down.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons");
export default {
  name: "progress",
  components: {},
  data() {
    return {
      wordFlag: false,
      value1: "大广高速公路南康至龙南段扩容",
      options: [
        {
          value: "1",
          label: "大广高速公路南康至龙南段扩容",
        },
        {
          value: "2",
          label: "大广高速公路南康至龙南段扩容",
        },
        {
          value: "3",
          label: "大广高速公路南康至龙南段扩容",
        },
        {
          value: "4",
          label: "大广高速公路南康至龙南段扩容",
        },
        {
          value: "5",
          label: "大广高速公路南康至龙南段扩容",
        },
      ],
    };
  },
  mounted() {
    this.mapInit();
    this.chart3();
    this.chart66();
    this.chart7();
  },
  methods: {
    showWord() {
      if (this.wordFlag) {
        this.wordFlag = false;
      } else {
        this.wordFlag = true;
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
      try {
        const res = await axios.post("/api/CheckTollJamsToJonsService.ashx", {
          body: {},
          head: {
            MethodName: "QueryTollJamsEquipmentsList",
          },
        });
        if (res.status === 200) {
          let pointList = res.data.body.EquipmentList;
          console.log(pointList);
          for (let i = 0; i < markerList3.length; i++) {
            mapTool.map.remove(markerList3[i]);
          }
          for (let i = 0; i < markerList4.length; i++) {
            mapTool.map.remove(markerList4[i]);
          }
          for (let i = 0; i < markerList.length; i++) {
            mapTool.map.remove(markerList[i]);
          }

          markerList3 = [];
          markerList = [];
          markerList4 = [];
          for (let i = 0; i < pointList.length; i++) {
            let SiteId = pointList[i].SiteId;
            let SiteName = pointList[i].SiteName;
            let icon = "";
            let congestion = pointList[i].congestion + "  ";
            if (congestion.indexOf("2") >= 0) {
              icon = mapTool.iconMap.get("zj3");
            } else if (congestion.indexOf("3") >= 0) {
              icon = mapTool.iconMap.get("zj2");
            } else {
              icon = mapTool.iconMap.get("zj1");
            }
            let lng = pointList[i].Amap_Logitude;
            let lat = pointList[i].Amap_Latitude;
            let marker = new AMap.Marker({
              position: new AMap.LngLat(lng, lat),
              icon: icon,
              offset: new AMap.Pixel(0, 0),
              extData: pointList[i],
            });
            marker.on("click", markerClick); //地图上的图标点 添加事件
            if (congestion.indexOf("2") >= 0) {
              markerList.push(marker);
            } else if (congestion.indexOf("3") >= 0) {
              markerList6.push(marker);
            } else if (congestion.indexOf("4") >= 0) {
              markerList4.push(marker);
            } else {
              markerList3.push(marker);
            }
            mapTool.map.add(marker);
          }

          function markerClick(e) {}
        } else {
          console.log("404");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async chart3() {
      let chart = echarts.init(document.getElementById("chart3"));

      let dataList = [
        {
          name: "祁婺项目",
          value: "56",
        },
        {
          name: "大广项目",
          value: "75",
        },
        {
          name: "宜隧项目",
          value: "85",
        },
        {
          name: "寻龙项目",
          value: "78",
        },
        {
          name: "吉康项目",
          value: "76",
        },
        {
          name: "梨温项目",
          value: "45",
        },
      ];

      chart.setOption({
        grid: {
          left: "10%",
          right: "10%",
          bottom: "20%",
          top: "5%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            crossStyle: {
              color: "#999",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            data: [
              "祁婺项目",
              "大广项目",
              "宜隧项目",
              "寻龙项目",
              "吉康项目",
              "梨温项目",
            ],
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#333",
                fontSize: 10,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#999",
                fontSize: 12,
                fontFamily: "Microsoft YaHei",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#eee",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            type: "value",
            position: "right",
            axisLabel: {
              show: false,
              color: "#999",
            },
            max: 100,
            splitLine: {
              show: false,
            },

            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#c2c3c6",
              },
            },
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: dataList.length > 15 ? 35 : 100,
          },
        ],
        series: [
          {
            type: "bar",
            data: dataList,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3788fd",
                  },
                  {
                    offset: 1,
                    color: "#3788fd",
                  },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3788fd",
                  },
                  {
                    offset: 1,
                    color: "#699ce6",
                  },
                ]),
              },
            },
          },
          {
            type: "bar",
            barMaxWidth: 60,
            // itemStyle:{
            //     color: {
            //         type: 'linear',
            //         x: 0,
            //         y: 0,
            //         x2: 0,
            //         y2: 1,
            //         colorStops: [{
            //             offset: 0, color: '#3D8BF0' // 0% 处的颜色
            //         }, {
            //             offset: 1, color: '#CCE2FF' // 100% 处的颜色
            //         }]
            //     }
            // },
            itemStyle: {
              color: "#4CD698",
            },
            data: [10, 20, 30, 20, 20, 20],
          },
          {
            type: "line",
            yAxisIndex: 1,
            data: dataList,
            itemStyle: {
              normal: {
                color: "#ff7f50",
              },
            },
          },
        ],
      });

      chart.setOption(option);
    },
    async chart66() {
      let chart = echarts.init(document.getElementById("chart66"));
      let option = {
        tooltip: {
          trigger: "axis",
          confine: true,
          position: function ([x, y]) {
            var newX = x + 200;
            //console.log(newX)
            return [newX, y];
          },
          formatter: function (params) {
            console.log(params);
          },
          padding: [
            11, // 上
            19, // 右
            13, // 下
            13, // 左
          ],
          extraCssText:
            "box-shadow:0px 1px 2px 0px rgba(134,134,134,0.45),0px -1px 2px 0px rgba(0,0,0,0.03);",
        },
        radar: {
          center: ["45%", "50%"],
          radius: "85%",
          name: {
            textStyle: {
              color: "#3D4D65",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#DEDEDE",
              width: 1,
              type: "dotted",
            },
          },
          splitLine: {
            lineStyle: {
              color: ["#DEDEDE"],
              width: 1,
            },
          },
          splitArea: {
            areaStyle: {
              color: [
                "rgba(255, 255, 255, 0)",
                "rgba(255, 255, 255, 0)",
                "rgba(255, 255, 255, 0)",
                "rgba(255, 255, 255, 0)",
              ],
              shadowColor: "#fff",
            },
          },
          name: {
            color: "#333",
            fontSize: 12,
            formatter: function (value, indicator) {
              return indicator.name;
            },
          },
          nameGap: "10",
          indicator: [
            {
              name: "大广",
              max: 1000,
              value: 800,
            },
            {
              name: "梨温",
              max: 1000,
              value: 800,
            },
            {
              name: "吉康",
              max: 1000,
            },
            {
              name: "祁隧",
              max: 1000,
              value: 800,
            },
            {
              name: "宜隧",
              max: 1000,
              value: 800,
            },
          ],
        },
        series: [
          {
            type: "radar",

            data: [
              {
                value: [800, 700, 600, 900, 500],
                name: "数据",
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    color: "#26A0FF",
                  },
                },
                areaStyle: {
                  normal: {
                    color: "rgba(64,159,223,0.4)",
                  },
                },
              },
            ],
            label: {
              normal: {
                show: true,
                // position: ["-20", "-20"],
                color: "#3788fd",
                fontSize: 12,
                fontWeight: 200,
                formatter: (params) => {
                  return params.value;
                },
              },
            },
          },
        ],
      };

      chart.setOption(option);
    },
    async chart7() {
      let chart = echarts.init(document.getElementById("chart7"));
      let option = {
        title: {
          text: "666",
          left: "center",
          top: "39%",
          textStyle: {
            fontSize: 20,
            color: "#3C4353",
            fontStyle: "normal",
            fontWeight: "400",
          },
          subtext: "问题总数",
          subtextStyle: {
            fontSize: 12,
            color: "#3C4353",
            fontStyle: "normal",
            fontWeight: "400",
          },
        },
        color: ["#8b75f5", "#4198fc", "#4ad49d", "#eba164"],
        series: [
          {
            name: "统计",
            type: "pie",
            radius: [50, 100],
            center: ["50%", "50%"],
            roseType: "radius",
            label: {
              show: true,
              formatter: "{d}%",
              fontSize: 16,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              {
                value: 25,
                name: "rose1",
              },
              {
                value: 20,
                name: "rose2",
              },
              {
                value: 15,
                name: "rose3",
              },
              {
                value: 10,
                name: "rose4",
              },
            ],
          },
          {
            name: "占位",
            type: "pie",
            silent: true,
            center: ["50%", "50%"],
            radius: 50,
            hoverAnimation: false,
            label: {
              show: false,
              position: "center",
            },
            data: [
              {
                value: 1,
                name: "占位2",
              },
            ],
            itemStyle: {
              normal: {
                color: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur: 10,
              },
            },
          },
        ],
      };

      chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.index-container {
  height: calc(100% - 53px);
  position: relative;
  > #bigmap {
    width: 100%;
    height: 100%;
  }
  .content-left {
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .box {
      position: relative;
    }
    > div {
      flex-grow: 1;
      margin: 10px;
      height: 33%;
      background: url("../../../assets/image/style1/pro-box-bg.png") no-repeat
        center center;
      background-size: 100% 100%;
      .title {
        font-size: 18px;
        font-weight: bold;
        border-left: 5px solid #3788fd;
        margin-top: 15px;
        line-height: 1;
        margin-left: 15px;
        padding-left: 8px;
      }
      .num-box {
        display: flex;
        > div {
          flex-grow: 1;
          text-align: center;
        }
        .num {
          color: #3289fa;
          font-size: 24px;
          font-weight: bold;
        }
        .unit {
          font-size: 16px;
          color: #999;
        }
        .num-title {
          font-size: 14px;
          color: #333;
        }
        .num1 {
          color: #efa25d;
          font-size: 24px;
        }
        .num2 {
          color: #00d998;
          font-size: 24px;
        }
      }
      .num1-box {
        font-size: 14px;
        text-align: center;
        span {
          font-size: 28px;
          margin: 0 5px 0 12px;
          font-weight: bold;
        }
      }
      .num2-box {
        position: absolute;
        left: 40px;
        text-align: center;
        top: 120px;
        font-size: 14px;
        color: #999;
        span {
          font-size: 24px;
          color: #000;
        }
        .tip {
          font-size: 14px;
          color: #333;
        }
      }
      .chart-box {
        width: 100%;
        height: 170px;
        > div {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .content-right {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .box {
      position: relative;
    }
    > div {
      flex-grow: 1;
      margin: 10px;
      height: 33%;
      background: url("../../../assets/image/style1/pro-box-bg.png") no-repeat
        center center;
      background-size: 100% 100%;
      .title {
        font-size: 18px;
        font-weight: bold;
        border-left: 5px solid #3788fd;
        margin-top: 15px;
        line-height: 1;
        margin-left: 15px;
        padding-left: 8px;
      }
      .num-box {
        display: flex;
        > div {
          flex-grow: 1;
          text-align: center;
        }
        .num {
          color: #3289fa;
          font-size: 24px;
          font-weight: bold;
        }
        .unit {
          font-size: 16px;
          color: #999;
        }
        .num-title {
          font-size: 14px;
          color: #333;
        }
        .num1 {
          color: #efa25d;
          font-size: 24px;
        }
      }
      .num1-box {
        font-size: 14px;
        text-align: center;
        span {
          font-size: 28px;
          margin: 0 5px 0 12px;
          font-weight: bold;
        }
      }
      .num2-box {
        position: absolute;
        left: 40px;
        text-align: center;
        top: 120px;
        font-size: 14px;
        color: #999;
        span {
          font-size: 24px;
          color: #000;
        }
        .tip {
          font-size: 14px;
          color: #333;
        }
      }
      .num3-box {
        display: flex;
        margin: 10px auto;
        width: 70%;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        span {
          font-size: 28px;
          color: #efa25d;
          margin: 0 5px 0 10px;
        }
      }
      .pie-chart {
        display: flex;
        width: 80%;
        margin: 0 auto;
        padding-bottom: 10px;
        align-items: center;
        justify-content: space-between;
        > div {
          width: 50%;
        }
        > div.detail-box {
          line-height: 36px;
          font-size: 14px;
          > div:nth-child(1) {
            i {
              background-color: #0089ff;
            }
            > span:nth-child(4) {
              color: #0089ff;
            }
          }
          > div:nth-child(2) {
            i {
              background-color: #00d998;
            }
            > span:nth-child(4) {
              color: #00d998;
            }
          }
          > div:nth-child(3) {
            i {
              background-color: #fc9d4d;
            }
            > span:nth-child(4) {
              color: #fc9d4d;
            }
          }
          > div {
            > span:nth-child(2) {
              color: #999;
              margin-right: 25px;
            }
            > span:nth-child(3) {
              font-size: 16px;
              margin-right: 30px;
            }
            > span:nth-child(4) {
              font-size: 16px;
            }
          }
          i {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            margin-right: 10px;
            display: inline-block;
          }
        }
        .chart-box {
          padding-left: 24px;
        }
      }
      .chart-box {
        width: 100%;
        height: 170px;
        > div {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.content-left {
  position: absolute;
  width: 539px;
  left: 0;
  bottom: 0;
  top: 0;
}
.content-right {
  position: absolute;
  width: 539px;
  right: 0;
  bottom: 0;
  top: 0;
}
.layout-twoColumn {
  display: flex;
  align-items: center;
  .detail {
    flex-grow: 1;
  }
  .rchart-box {
    width: 100%;
    > div {
      width: 100%;
      height: 100%;
    }
  }
  .rtitle {
    font-size: 14px;
    color: #333;
    span {
      color: #efa25d;
      font-size: 28px;
      margin: 0 5px 0 20px;
    }
  }
}

.con-gktj {
  display: flex;
  align-items: center;
  .l {
    padding-left: 10px;
    .item {
      width: 258px;
      height: 89px;
      margin-top: 10px;
      background: url("../../../assets/image/style1/1.png") no-repeat;
      background-size: 100% 100%;
      padding-left: 80px;
      padding-top: 36px;
      span {
        margin: 0 10px;
        vertical-align: middle;
      }
      b {
        font-size: 26px;
        vertical-align: middle;
      }
      .color1 {
        color: #3788fd;
      }
      .color2 {
        color: #43d59c;
      }
      .color3 {
        color: #efa25d;
      }
    }
  }
  .r {
    flex-grow: 1;
    padding-top: 16px;
    padding-left: 20px;
    .item:last-child {
      margin-top: 30px;
    }
    .item {
      .item-title {
        font-size: 14px;
        color: #333;
        margin-left: 10px;
        span {
          font-size: 23px;
          font-weight: bold;
          margin: 0 3px 0 6px;
        }
      }
      .b {
        display: flex;
        align-items: center;
        .chart-box {
          width: 50%;
          height: 120px;
        }
        .detail {
          padding-left: 20px;
          .num {
            color: #e52434;
            font-size: 18px;
          }
          .unit {
            font-size: 14px;
            color: #999;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
.map-tip {
  position: absolute;
  left: 50%;
  background: url("../../../assets/image/style1/tipmap-bg.png") no-repeat;
  transform: translate(-50%);
  bottom: 20px;
  width: 720px;
  // height: 140px;
  background-size: 100% 100%;
  .title {
    position: absolute;
    top: -10px;
    background: url("../../../assets/image/style1/tipmap-title.png") no-repeat;
    background-size: 100% 100%;
    width: 360px;
    height: 41px;
    font-size: 20px;
    text-align: left;
    padding-left: 20px;
    color: #fff;
    line-height: 41px;
  }
  .word {
    color: #fff;
    font-size: 14px;
    height: 45px;
    margin: 60px 30px 20px 30px;
    overflow: hidden;
    position: relative;
    transition: all 0.6s;
  }
  .word.active {
    height: 100px;
  }
  .toggle {
    display: inline-block;
    cursor: pointer;
    color: #3289fa;
    position: absolute;
    right: 0;
    bottom: 3px;
    background-color: #1f67b6;
  }
}
.video-box{
    margin: 20px;
    height: 80%;
    >img{
        width: 100%;
        height: 100%;
    }
}
</style>
