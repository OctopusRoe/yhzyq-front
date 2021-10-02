<template>
  <div class="index-container">
    <div id="bigmap"></div>
    <div class="content-left">
      <div>
        <div class="box">
          <div class="title">质量情况</div>
          <div class="chart-box" style="margin-top: 39px">
            <div id="chart1"></div>
          </div>
          <div class="chart-unit"><i></i><span>完成比例</span></div>
          <div class="num-box">
            <div>
              <div class="status">施工完成</div>
              <div class="num">4358</div>
            </div>
            <div>
              <div class="status">已交工</div>
              <div class="num">4358</div>
            </div>
            <div>
              <div class="status">已评定</div>
              <div class="num">4358</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">隐患分析</div>
          <div class="timetype">
            <span>日</span><span class="active">月</span><span>年</span>
          </div>
          <div class="chart-box" style="height: 380px">
            <div id="chart2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div>
        <div class="box">
          <div class="title">质量动态</div>
          <div class="construction-progress">
            <div>
              <div class="title-progress">
                服务区右幅拌合站便道临边无安全防护设施
              </div>
              <div class="date">2020年12月15日</div>
              <span class="level">一级</span>
            </div>
            <div>
              <div class="title-progress">边梁未及时支撑</div>
              <div class="date">2020年12月15日</div>
              <span class="level1">一级</span>
            </div>
            <div>
              <div class="title-progress">
                服务区右幅拌合站便道临边无安全防护设施
              </div>
              <div class="date">2020年12月15日</div>
              <span class="level2">一级</span>
            </div>
            <div>
              <div class="title-progress">边梁未及时支撑</div>
              <div class="date">2020年12月15日</div>
              <span class="level">一级</span>
            </div>
            <div>
              <div class="title-progress">
                服务区右幅拌合站便道临边无安全防护设施
              </div>
              <div class="date">2020年12月15日</div>
              <span class="level">一级</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">质量检查</div>
          <div class="timetype">
            <span>日</span><span class="active">月</span><span>年</span>
          </div>
          <div class="chart-box-zljc" >
            <div class="chart-box-left" >
              <div id="chart66"></div>
            </div>
            <div class="chart-box-right" >
               <div class="chart-box">
                   <div id="chart67"></div>
               </div>
               <div class="chart-box">
                  <div id="chart68"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map-tip">
      <div class="item nj">28</div>
      <div class="item zj">7</div>
      <div class="item wg">12</div>
    </div>
    <div class="map-select">
      <el-select v-model="value1">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="map-pointer">
      <div>
        <img src="../../../assets/image/style1/p1.png" alt="" /><span
          >桥梁</span
        >
      </div>
      <div>
        <img src="../../../assets/image/style1/p2.png" alt="" /><span
          >隧道</span
        >
      </div>
      <div>
        <img src="../../../assets/image/style1/p3.png" alt="" /><span
          >互通</span
        >
      </div>
      <div>
        <img src="../../../assets/image/style1/p4.png" alt="" /><span
          >驻地</span
        >
      </div>
      <div>
        <img src="../../../assets/image/style1/p5.png" alt="" /><span
          >拌合站</span
        >
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
    this.chart1();
    this.chart2();
    this.chart3();

    this.chart5();

    this.chart4();
    this.chart66();
    this.chart67();
    this.chart68();
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
    async chart1() {
      let chart = echarts.init(document.getElementById("chart1"));

      var dataAll = [
        ["加工线1良品率", 99],
        ["加工线1良品率", 28],
        ["加工线1良品率", 37],
      ];
      var position = [
        ["18%", "center"],
        ["49.8%", "center"],
        ["82%", "center"],
      ];
      var getStyle = function (value) {
        if (value <= 30) {
          return {
            splitNumber: 3, //刻度数量
            min: 0,
            max: 30,
            startAngle: 225,
            endAngle: 144,
            color: [[1, "#FF0000"]],
          };
        } else if (value >= 90) {
          return {
            splitNumber: 1, //刻度数量
            min: 90,
            max: 100,
            startAngle: -18,
            endAngle: -45,
            color: [[1, "#60b044"]],
          };
        } else {
          return {
            splitNumber: 6, //刻度数量
            min: 30,
            max: 90,
            startAngle: 144,
            endAngle: -18,
            color: [[1, "#ffce00"]],
          };
        }
      };
      var makeSeries = function () {
        var series = [];
        dataAll.forEach(function (item, index) {
          let style = getStyle(item[1]);
          series.push({
            name: item[0],
            left: 0,
            center: position[index],
            type: "gauge",
            splitNumber: 10, //刻度数量
            min: 0,
            max: 100,
            radius: "80%", //图表尺寸
            axisLine: {
              show: true,
              lineStyle: {
                width: 5,
                shadowBlur: 0,
                color: [[1, "#0088fe"]],
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#b8ccfd",
                width: 1,
              },
              length: 8,
              splitNumber: 5,
            },
            splitLine: {
              show: true,
              length: 12,
              lineStyle: {
                color: "#b8ccfd",
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: true,
              length: "60%",
              width: 4,
              itemStyle: {
                color: "red",
              },
            },
            title: {
              offsetCenter: [0, "0%"],
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: item[1],
              },
            ],
          });
          series.push({
            name: item[0],
            type: "gauge",
            center: position[index],
            splitNumber: style.splitNumber, //刻度数量
            min: style.min,
            max: style.max,
            startAngle: style.startAngle,
            endAngle: style.endAngle,
            radius: "70%", //图表尺寸
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                shadowBlur: 0,
                color: "#b8ccfd",
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#b8ccfd",
                width: 2,
              },
              length: 7,
              splitNumber: 5,
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              //仪表盘指针
              show: true,
              length: "50%",
              width: 2,
              itemStyle: {
                color: "#333",
              },
            },
            detail: {
              borderColor: "#ccc",
              shadowColor: "#ccc", //默认透明
              shadowBlur: 5,
              offsetCenter: [0, "70%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                color: "#0088fe",
                fontSize: 20,
              },
              formatter: "{value}%",
            },
            data: [
              {
                name: "",
                value: item[1],
              },
            ],
          });
        });
        return series;
      };
      var list = makeSeries();
      let option = {
        series: list,
      };

      chart.setOption(option);
    },
    async chart2() {
      let chart = echarts.init(document.getElementById("chart2"));
      const colorList = [
        "#29b6f6",
        "#3988fb",
        "#5c6bc0",
        "#26a69a",
        "#67bb6a",
        "#00db98",
        "#efdc5e",
        "#efa25e",
      ];

      let option = {
        title: {
          text: "场站建设",
          subtext: "23%",
          textStyle: {
            fontSize: 16,
            color: "#575757",
            lineHeight: 20,
          },
          subtextStyle: {
            fontSize: 28,
            color: "#1f78b4",
          },
          textAlign: "center",
          left: "29%",
          top: "42%",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: "10%",
          top: "10%",
          itemGap: 20,
          selectedMode: false,
          icon: "pin",
          data: [
            "场站建设",
            "钢筋加工",
            "涵洞工程",
            "梁板预制",
            "钻孔灌注桩",
            "桥梁、互通立交",
            "施工便道",
            "其他",
          ],
          textStyle: {
            color: "#77899c",
            rich: {
              uname: {
                width: 100,
              },
              unum: {
                color: "#575757",
                width: 40,
                align: "right",
              },
            },
          },
          formatter(name) {
            return `{uname|${name}}{unum|1132}`;
          },
        },
        color: colorList,
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: ["32%", "56%"],
            center: ["30%", "50%"],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: "#fff",
            },
            data: [
              { name: "场站建设", value: 100 },
              { name: "钢筋加工", value: 100 },
              { name: "涵洞工程", value: 100 },
              { name: "梁板预制", value: 100 },
              { name: "钻孔灌注桩", value: 100 },
              { name: "桥梁、互通立交", value: 100 },
              { name: "施工便道", value: 100 },
              { name: "其他", value: 100 },
            ],
          },
        ],
      };

      chart.setOption(option);
    },
    async chart3() {
      let chart = echarts.init(document.getElementById("chart3"));

      var xName = ["大广高速", "吉康高速", "祁婺高速", "宜隧高速", "寻龙高速"];
      var data1 = [826, 673, 588, 782, 779];
      var data2 = [686, 703, 788, 882, 779];

      var legendName = ["完成产值(亿元)", "总产值(亿元)"];
      let option = {
        color: ["#0088fe", "#fa9d4d"],
        grid: {
          top: "15%",
          left: "5%",
          right: "5%",
          bottom: "12%",
          containLabel: true,
        },
        legend: {
          data: legendName,
          top: "90%",
          itemGap: 60,
          icon: "circle",
          textStyle: {
            color: "#333",
            fontSize: 12,
          },
        },
        xAxis: [
          {
            data: xName,
            axisLabel: {
              margin: 10,
              color: "#333",
              textStyle: {
                fontSize: 12,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(70, 196, 255, 1)",
              },
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
              color: "#333",
              textStyle: {
                fontSize: 12,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "#e9ecf3",
              },
            },
          },
        ],
        series: [
          {
            name: "完成产值(亿元)",
            type: "bar",
            data: data1,
            barWidth: 16,
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
              },
            },
          },
          {
            name: "总产值(亿元)",
            type: "bar",
            data: data2,
            barWidth: 16,
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
              },
            },
          },
        ],
      };
      chart.setOption(option);
    },
    async chart4() {
      let chart = echarts.init(document.getElementById("chart4"));

      let option = {
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "90%", //大小调整
            center: ["50%", "55%"], //图表位置调整，第一个数是左右，第二个是上下
            detail: {
              //仪表盘详情，用于显示数据
              formatter: "{value}%",
              color: "#0088fe",
              fontSize: 26,
              fontWeight: "bolder",
            },

            data: [
              {
                value: 50,
                name: "",
              },
            ],
            axisLine: {
              //表盘样式
              show: true,
              lineStyle: {
                width: 10, //表盘粗细
                color: [[1, "#2d82ff"]],
                shadowBlur: 10,
                shadowColor: "rgba(0, 103, 255, 0.2)",
                shadowOffsetX: 0,
                shadowOffsetY: 8,
              },
            },

            axisTick: {
              show: false, // 是否显示坐标轴小标记，这里不显示
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "#fff",
              },
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "rgba(255, 255, 255, 0.2)",
              },
            },
            pointer: {
              //指针样式
              width: 5,
            },
            itemStyle: {
              //指针阴影
              shadowBlur: 10,
              shadowColor: "rgba(0, 103, 255, 0.2)",
              shadowOffsetX: 0,
              shadowOffsetY: 8,
            },
            markPoint: {
              //指针中心加一个小白点
              symbol: "circle",
              symbolSize: 5,
              data: [
                //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                {
                  x: "center",
                  y: "center",
                  itemStyle: {
                    color: "#FFF",
                  },
                },
              ],
            },
          },
        ],
      };

      chart.setOption(option);
    },

    async chart67() {
      let chart = echarts.init(document.getElementById("chart67"));
      var datas = {
        title: "整改率",
        dataArr: [
          {
            value: "22",
          },
        ],
      };
      var fontColor = "#000";
      var seriesName = "";
      let noramlSize = 16;
      //   let myChart = echarts.init(dom);
      var value = datas.dataArr[0].value;
      var min = value.split(".");
      var max = 30;
      var degrees = 180 - (180 * value) / max; //蓝色刻度尺计算
      // 蓝色背景
      var num = value / max;
      var colorSet = [
        [num, "#0088fe"],
        [1, "#e6e6e6"],
      ];
      var centerArr = ["50%", "68%"];
      let option = {
        series: [
          {
            name: "白色圈刻度",
            type: "gauge",
            radius: "100%",
            splitNumber: 6,
            center: centerArr,
            startAngle: 180, //刻度起始
            endAngle: 0, //刻度结束
            z: 4,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 20, //刻度节点线长度
              lineStyle: {
                width: 5,
                color: "#fff",
              }, //刻度节点线
            },
            axisLabel: {
              show: false,
              color: "#",
              fontSize: 12,
            }, //刻度节点文字颜色
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
              },
            ],
          },
          {
            name: "紫色外圈", //刻度背景
            type: "gauge",
            z: 2,
            radius: "100%",
            splitNumber: 6,
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: max,
            center: centerArr, //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: colorSet,
                width: 12,
                opacity: 1, //刻度背景宽度
              },
            },
            splitLine: {
              show: false,
            },
            data: [
              {
                show: false,
                value: "80",
              },
            ],
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            detail: {
              show: 0,
            },
          },
          {
            name: "紫色刻度尺", //刻度背景
            type: "gauge",
            z: 4,
            radius: "80%",
            splitNumber: 4,
            startAngle: 180,
            endAngle: degrees,
            center: centerArr, //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.8, "#00B3FE"],
                  [1, "#212D43"],
                ],
                width: 10,
                opacity: 0, //刻度背景宽度
              },
            },
            data: datas.dataArr,
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#0088fe",
                width:2,
              },
              length: 4,
              splitNumber: 6,
            },
            detail: {
              formatter: function (params) {
                //图表中间文字数据展示
                return (
                  "{white|" +
                  value +
                  "%" +
                  "\n\n" +
                  "}{gray|" +
                  datas.title +
                  "}"
                );
              },
              rich: {
                gray: {
                  fontSize: 14,
                  color: "#000",
                  padding: 0,
                },
                white: {
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0088fe",
                }
              },
              offsetCenter: ["0", "3%"],
            },
            splitLine: {
              length: 8, //刻度节点线长度
              lineStyle: {
                width: 1,
                color: "#0088fe",
              }, //刻度节点线
            },
          },
        ],
      };
      chart.setOption(option);
    },
    async chart68() {
      let chart = echarts.init(document.getElementById("chart68"));
      var datas = {
        title: "隐患率",
        dataArr: [
          {
            value: "22",
          },
        ],
      };
      var fontColor = "#000";
      var seriesName = "";
      let noramlSize = 16;
      //   let myChart = echarts.init(dom);
      var value = datas.dataArr[0].value;
      var min = value.split(".");
      var max = 30;
      var degrees = 180 - (180 * value) / max; //蓝色刻度尺计算
      // 蓝色背景
      var num = value / max;
      var colorSet = [
        [num, "#0088fe"],
        [1, "#e6e6e6"],
      ];
      var centerArr = ["50%", "68%"];
      let option = {
        series: [
          {
            name: "白色圈刻度",
            type: "gauge",
            radius: "100%",
            splitNumber: 6,
            center: centerArr,
            startAngle: 180, //刻度起始
            endAngle: 0, //刻度结束
            z: 4,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 20, //刻度节点线长度
              lineStyle: {
                width: 5,
                color: "#fff",
              }, //刻度节点线
            },
            axisLabel: {
              show: false,
              color: "#",
              fontSize: 12,
            }, //刻度节点文字颜色
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
              },
            ],
          },
          {
            name: "紫色外圈", //刻度背景
            type: "gauge",
            z: 2,
            radius: "100%",
            splitNumber: 6,
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: max,
            center: centerArr, //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: colorSet,
                width: 12,
                opacity: 1, //刻度背景宽度
              },
            },
            splitLine: {
              show: false,
            },
            data: [
              {
                show: false,
                value: "80",
              },
            ],
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            detail: {
              show: 0,
            },
          },
          {
            name: "紫色刻度尺", //刻度背景
            type: "gauge",
            z: 4,
            radius: "80%",
            splitNumber: 4,
            startAngle: 180,
            endAngle: degrees,
            center: centerArr, //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.8, "#00B3FE"],
                  [1, "#212D43"],
                ],
                width: 10,
                opacity: 0, //刻度背景宽度
              },
            },
            data: datas.dataArr,
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#0088fe",
                width:2,
              },
              length: 4,
              splitNumber: 6,
            },
            detail: {
              formatter: function (params) {
                //图表中间文字数据展示
                return (
                  "{white|" +
                  value +
                  "%" +
                  "\n\n" +
                  "}{gray|" +
                  datas.title +
                  "}"
                );
              },
              rich: {
                gray: {
                  fontSize: 14,
                  color: "#000",
                  padding: 0,
                },
                white: {
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0088fe",
                }
              },
              offsetCenter: ["0", "3%"],
            },
            splitLine: {
              length: 8, //刻度节点线长度
              lineStyle: {
                width: 1,
                color: "#0088fe",
              }, //刻度节点线
            },
          },
        ],
      };

      chart.setOption(option);
    },
    async chart5() {
      let chart = echarts.init(document.getElementById("chart5"));
      let option = {
        color: ["#3788fd", "#f0a766"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "6%",
          bottom: "3%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "祁婺项目",
            "大广项目",
            "宜隧项目",
            "寻龙项目",
            "吉康项目",
            "梨温项目",
          ],
          axisLabel: {
            margin: 20,
            textStyle: {
              fontSize: 12,
              color: "#666",
            },
          },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              color: "#e9e9e9",
            },
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#999",
            },
          },
        },
        series: [
          {
            name: "公益服务",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230],
          },
          {
            name: "服务中心工作",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330],
          },
        ],
      };
      chart.setOption(option);
    },
    async chart6() {
      let chart = echarts.init(document.getElementById("chart6"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#ddd",
            },
          },
          padding: [5, 10],
          textStyle: {
            color: "#7588E4",
          },
          extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "祁婺项目",
            "大广项目",
            "宜隧项目",
            "寻龙项目",
            "吉康项目",
            "梨温项目",
          ],
          boundaryGap: false,
          splitLine: {
            show: true,
            interval: "auto",
            lineStyle: {
              color: ["#D4DFF5"],
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#609ee9",
            },
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14,
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ["#D4DFF5"],
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#609ee9",
            },
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14,
            },
          },
        },
        series: [
          {
            name: "今日",
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle",
            symbolSize: 6,
            data: ["1200", "1400", "1008", "1411", "1026", "1026"],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(199, 237, 250,0.5)",
                    },
                    {
                      offset: 1,
                      color: "rgba(199, 237, 250,0.2)",
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: "#f7b851",
              },
            },
            lineStyle: {
              normal: {
                width: 3,
              },
            },
          },
          {
            name: "昨日",
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle",
            symbolSize: 6,
            data: ["1200", "1400", "808", "811", "626", "866"],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(216, 244, 247,1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(216, 244, 247,1)",
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: "#58c8da",
              },
            },
            lineStyle: {
              normal: {
                width: 3,
              },
            },
          },
        ],
      };
      chart.setOption(option);
    },
    async chart66() {
      let chart = echarts.init(document.getElementById("chart66"));
      var dataLine = [25, 33, 66, 50];
      var myColor = ["#0088fe", "#0088fe", "#0088fe", "#0088fe"];
      let option = {
        grid: [
          {
            left: "5%",
            top: "5%",
            right: "5%",
            bottom: "5%",
          },
        ],
        xAxis: [
          {
            max: 100,
            show: false,
          },
        ],
        yAxis: [
          {
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              inside: true,
              verticalAlign: "top",
              lineHeight: -60,
              textStyle: {
                color: "#000",
                fontSize: 14,
              },
            },
            data: ["质量检查次数", "隐患个数", "安全隐患个数", "整改个数"],
          },
          {
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: 16,
              },
            },
            data: [1, 1, 1, 1],
          },
          {
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)",
              },
            },
            data: [],
          },
        ],
        series: [
          {
            name: "条",
            type: "bar",
            stack: "b",
            yAxisIndex: 0,
            data: dataLine,
            label: {
              normal: {
                show: false,
                position: "right",
                distance: 10,
                formatter: function (param) {
                  return param.value;
                },
                textStyle: {
                  color: "#2F6781",
                  fontSize: 16,
                },
              },
            },
            barWidth: 20,
            itemStyle: {
              normal: {
                color: function (params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex];
                },
              },
            },
            z: 2,
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [100, 100, 100, 100],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: "#d9e3e7",
              },
            },
            z: 1,
            label: {
              // offset:[100,100],
              normal: {
                position: ["80%", "140%"],
                show: true,
                lineHeight: -90,
                formatter: function (data) {
                  return dataLine[data.dataIndex];
                },
                textStyle: {
                  color: "#0088fe",
                  fontSize: 16,
                },
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
        margin-top: 20px;
        > div {
          width: 33.33%;
          text-align: center;
          .status {
            color: #575757;
            font-size: 16;
          }
          .num {
            margin-top: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #0088fe;
          }
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
      .chart-unit {
        text-align: center;
        color: #575757;
        i {
          vertical-align: middle;
          width: 14px;
          height: 14px;
          background-color: #3289fa;
          display: inline-block;
          margin-right: 10px;
        }
        span {
          vertical-align: middle;
          font-size: 16px;
        }
      }
    }
    .timetype {
      float: right;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      border-radius: 3px;
      margin-right: 40px;
      span {
        width: 60px;
        height: 30px;
        background-color: #d9e3e7;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
      }
      span.active {
        background-color: #3289fa;
        color: #fff;
      }
    }
    .chart-box {
      clear: both;
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

      .timetype {
        float: right;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        border-radius: 3px;
        margin-right: 40px;
        span {
          width: 60px;
          height: 30px;
          background-color: #d9e3e7;
          text-align: center;
          line-height: 30px;
          font-size: 16px;
        }
        span.active {
          background-color: #3289fa;
          color: #fff;
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

.map-tip {
  position: absolute;
  bottom: 44px;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  .item {
    width: 207px;
    margin: 0 16px;
    height: 72px;
    text-align: right;
    padding-right: 60px;
    padding-top: 20px;
  }
  .nj {
    background: url("../../../assets/image/style1/img1.png") no-repeat;
    background-size: 100% 100%;
    font-size: 30px;
    color: #c0c0c0;
  }
  .zj {
    background: url("../../../assets/image/style1/img2.png") no-repeat;
    background-size: 100% 100%;
    font-size: 30px;
    color: #333;
  }
  .wg {
    background: url("../../../assets/image/style1/img3.png") no-repeat;
    background-size: 100% 100%;
    font-size: 30px;
    color: #333;
  }
}
.map-select {
  position: absolute;
  right: 28%;
  top: 20px;
}
.map-pointer {
  position: absolute;
  right: 0;
  right: 28%;
  top: 70px;
  background-color: #fff;
  border-radius: 5px;
  width: 120px;
  padding: 7px 10px;
  div {
    text-align: left;
    margin: 5px 0;
  }
  * {
    vertical-align: middle;
    font-size: 14px;
  }
  img {
    cursor: pointer;
    margin-right: 4px;
  }
}
.construction-progress {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 80%;
  width: 90%;
  .title-progress {
    font-size: 16px;
    font-weight: bold;
  }
  .date {
    font-size: 14px;
    color: #666;
  }
  float: right;
  margin-top: 20px;
  border-left: 2px solid #3788fd;
  padding-left: 30px;
  > div {
    position: relative;
  }
  > div::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #3788fd;
    position: absolute;
    left: -36px;
    background-color: #fff;
    top: 10px;
    z-index: 9;
  }
  .level {
    position: absolute;
    right: 20px;
    background-color: #fc9d4d;
    text-align: center;
    color: #fff;
    top: 10px;
    width: 60px;
    font-size: 12px;
    padding: 2px 0;
  }
  .level1 {
    position: absolute;
    right: 20px;
    background-color: #01d998;
    text-align: center;
    color: #fff;
    top: 10px;
    width: 60px;
    font-size: 12px;
    padding: 2px 0;
  }
  .level2 {
    position: absolute;
    right: 20px;
    background-color: #0088fe;
    text-align: center;
    color: #fff;
    top: 10px;
    width: 60px;
    font-size: 12px;
    padding: 2px 0;
  }
}
.progress-layout {
  height: 390px;
  .progress-layout-top {
    padding-top: 20px;
    display: flex;
    height: 200px;
    align-items: center;
    > div {
      height: 100%;
    }
    .progress-chart-box {
      width: 50%;
      > div {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      width: 50%;
      height: 95%;
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
        > img {
          margin-right: 20px;
          width: 30px;
          height: 30px;
        }
        .detail-title {
          color: #707070;
          font-size: 14px;
        }
        .num {
          font-size: 18px;
          color: #000;
        }
      }
    }
  }
  .progress-layout-bottom {
    display: flex;
    width: 100%;
    height: 160px;
    align-items: center;
    padding-left: 26px;
    .datenum {
      display: flex;
      > div {
        width: 130px;
        border-radius: 26px;
        height: 60px;
        background-color: #e1edff;
        text-align: center;
        display: flex;
        align-items: center;
        padding: 5px 0;
        padding-left: 19px;
        .svg-icon {
          font-size: 20px;
          color: #0088fe;
          fill: currentColor;
          margin-right: 10px;
        }
        .daynum {
          margin-top: 5px;
          font-size: 16px;
          color: #000;
          span {
            font-size: 12px;
            color: #666;
            margin-left: 3px;
          }
        }
      }
      > div:first-child {
        margin-right: 7px;
      }
      > div:last-child {
        margin-left: 7px;
      }
      .progress-title {
        font-size: 14px;
        color: #707070;
      }
    }
    .progress-chart-box {
      width: 50%;
      > div {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.chart-box-zljc{
  width: 100%; height: 350px; clear: both;
  display: flex;
  >div{
    width: 50%; height: 100%;
    >div{
      width: 100%;
      height: 100%;
    }
  }
  .chart-box-left{
    padding-left: 20px;
  }
}
</style>
