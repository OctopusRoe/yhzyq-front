<template>
  <div class="index-container">
    <div id="bigmap"></div>
    <div class="content-left">
      <div>
        <div class="box">
          <div class="title">项目概况统计</div>
          <div class="con-gktj">
            <div class="l">
              <div class="item">
                <span>总里程(KM)</span><b class="color1">520</b>
              </div>
              <div class="item">
                <span>累计项目数</span><b class="color2">28</b>
              </div>
              <div class="item">
                <span>在建项目数</span><b class="color3">9</b>
              </div>
            </div>
            <div class="r">
              <div class="item">
                <div class="item-title">项目总数<span>287</span>个</div>
                <div class="b">
                  <div class="chart-box">
                    <div id="chart1"></div>
                  </div>
                  <div class="detail">
                    <div class="num">
                      <svg-icon icon-class="icon-up"></svg-icon> 76%
                    </div>
                    <div class="unit">环比去年</div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-title">投资目录<span>2287</span>万元</div>
                <div class="b">
                  <div class="chart-box">
                    <div id="chart2"></div>
                  </div>
                  <div class="detail">
                    <div class="num">
                      <svg-icon icon-class="icon-up"></svg-icon> 76%
                    </div>
                    <div class="unit">环比去年</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">投资管理概况</div>
          <div class="num-box" style="margin-top: 20px">
            <div>
              <div>
                <span class="num">20.91</span><span class="unit">万元</span>
              </div>
              <div class="num-title">年度计划投资</div>
            </div>
            <div>
              <div>
                <span class="num1">35.68</span><span class="unit">万元</span>
              </div>
              <div class="num-title">年度实际投资</div>
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
          <div class="title">安全管理</div>
          <div class="layout-twoColumn">
            <div class="chart-box" style="height: 240px; width: 50%">
              <div id="chart4"></div>
            </div>
            <div class="detail">
              <div class="rtitle">重大风险源<span>36</span>个</div>
              <div
                class="rchart-box"
                style="height: 220px; padding-right: 10px"
              >
                <div id="chart66"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">质检管理</div>
          <div class="num3-box">
            <div>问题总数 <span>187</span>个</div>
            <div>重大风险源<span>25</span>个</div>
          </div>
          <div class="pie-chart">
            <div class="detail-box">
              <div>
                <i></i><span>已整改</span><span>45</span><span>45%</span>
              </div>
              <div>
                <i></i><span>待整改</span><span>45</span><span>35%</span>
              </div>
              <div>
                <i></i><span>未整改</span><span>45</span><span>20%</span>
              </div>
            </div>
            <div class="chart-box">
              <div id="chart67"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">进度管理</div>
          <div class="chart-box" style="height: 230px">
            <div id="chart68"></div>
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
      <el-select v-model="value1"  >
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
            <img src="../../../assets/image/style1/p1.png" alt=""><span>桥梁</span>
         </div>
          <div>
            <img src="../../../assets/image/style1/p2.png" alt=""><span>隧道</span>
         </div>
          <div>
            <img src="../../../assets/image/style1/p3.png" alt=""><span>互通</span>
         </div>
          <div>
            <img src="../../../assets/image/style1/p4.png" alt=""><span>驻地</span>
         </div>
          <div>
            <img src="../../../assets/image/style1/p5.png" alt=""><span>拌合站</span>
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
      value1:"大广高速公路南康至龙南段扩容",
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
    this.chart4();
    this.chart5();
    this.chart6();
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
      var chartData = 78;
      var getvalue = 1123;
      var gradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "#1890FF",
        },
        {
          offset: 1,
          color: "#53ACFF",
        },
      ]);

      let option = {
        grid: {
          top: "0%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        legend: {
          show: false,
        },
        title: [
          {
            text: chartData + "个",
            subtext: "已完成",
            x: "47%",
            y: "30%",
            textAlign: "center",
            textStyle: {
              fontSize: "20",
              fontWeight: "400",
              color: "#333",
              textAlign: "center",
            },
            subtextStyle: {
              fontSize: 12,
              color: "#999",
            },
          },
        ],
        series: [
          {
            type: "pie",
            clockwise: false,
            radius: ["80%", "85%"],
            center: ["50%", "50%"],
            zlevel: 3,
            hoverAnimation: false,
            label: {
              show: false,
            },
            data: [
              {
                value: 100 - chartData,
                itemStyle: {
                  color: "transparent",
                },
              },
              {
                value: chartData,
                itemStyle: {
                  normal: {
                    borderWidth: 7,
                    borderColor: "#3788fd",
                    color: gradient,
                  },
                },
              },
            ],
          },
          {
            type: "pie",
            clockwise: false,
            radius: ["80%", "85%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            zlevel: 2,
            label: {
              show: false,
            },
            itemStyle: {
              color: "#DBE9F6",
              borderWidth: 7,
              borderColor: "#DBE9F6",
            },
            emphasis: {
              itemStyle: {
                color: "#DBE9F6",
                borderWidth: 7,
                borderColor: "#DBE9F6",
              },
            },
            data: [100],
          },
        ],
      };
      chart.setOption(option);
    },
    async chart2() {
      let chart = echarts.init(document.getElementById("chart2"));
      var chartData = 78;
      var getvalue = 1123;
      var gradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "#1890FF",
        },
        {
          offset: 1,
          color: "#53ACFF",
        },
      ]);

      let option = {
        grid: {
          top: "0%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        legend: {
          show: false,
        },
        title: [
          {
            text: chartData + "万",
            subtext: "已完成",
            x: "47%",
            y: "30%",
            textAlign: "center",
            textStyle: {
              fontSize: "20",
              fontWeight: "400",
              color: "#333",
              textAlign: "center",
            },
            subtextStyle: {
              fontSize: 12,
              color: "#999",
            },
          },
        ],
        series: [
          {
            type: "pie",
            clockwise: false,
            radius: ["80%", "85%"],
            center: ["50%", "50%"],
            zlevel: 3,
            hoverAnimation: false,
            label: {
              show: false,
            },
            data: [
              {
                value: 100 - chartData,
                itemStyle: {
                  color: "transparent",
                },
              },
              {
                value: chartData,
                itemStyle: {
                  normal: {
                    borderWidth: 7,
                    borderColor: "#43d59c",
                    color: gradient,
                  },
                },
              },
            ],
          },
          {
            type: "pie",
            clockwise: false,
            radius: ["80%", "85%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            zlevel: 2,
            label: {
              show: false,
            },
            itemStyle: {
              color: "#DBE9F6",
              borderWidth: 7,
              borderColor: "#DBE9F6",
            },
            emphasis: {
              itemStyle: {
                color: "#DBE9F6",
                borderWidth: 7,
                borderColor: "#DBE9F6",
              },
            },
            data: [100],
          },
        ],
      };
      chart.setOption(option);
    },
    async chart3() {
      let chart = echarts.init(document.getElementById("chart3"));

      let dataList = [
        {
          name: "1月",
          value: "56",
        },
        {
          name: "2月",
          value: "75",
        },
        {
          name: "3月",
          value: "85",
        },
        {
          name: "4月",
          value: "78",
        },
        {
          name: "5月",
          value: "76",
        },
        {
          name: "6月",
          value: "45",
        },
        {
          name: "7月",
          value: "45",
        },
        {
          name: "8月",
          value: "80",
        },
        {
          name: "9月",
          value: "23",
        },
        {
          name: "10月",
          value: "75",
        },
        {
          name: "11月",
          value: "35",
        },
        {
          name: "12月",
          value: "95",
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
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
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
            barGap: "-100%",
            barCategoryGap: "60%",
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
    async chart4() {
      let chart = echarts.init(document.getElementById("chart4"));
      let option = {
        title: {
          show: false,
          x: "center",
          text: "",
        },
        series: [
          {
            name: "",
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            radius: "90%",
            center: ["50%", "60%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 16,
                shadowBlur: 0,
                color: [
                  [0.3, "#efa25d"],
                  [0.7, "#43d59c"],
                  [1, "#3788fd"],
                ],
              },
            },
            axisTick: {
              show: true,
              splitNumber: 1,
            },
            splitLine: {
              show: true,
              length: 16,
              lineStyle: {
                //color:'black'
              },
            },
            axisLabel: {
              formatter: function (e) {
                switch (e + "") {
                  case "30":
                    return "警告";
                  default:
                    return e;
                }
              },
              textStyle: {
                fontSize: 12,
                fontWeight: "",
              },
            },

            pointer: {
              show: true,
              width: 10,
              length: "60%",
            },
            detail: {
              offsetCenter: [0, 45],
              formatter: function (param) {
                return param + `%\n{a|整改率}`;
              },
              rich: {
                a: {
                  color: "#999",
                  fontSize: 14,
                },
              },
              textStyle: {
                fontSize: 24,
              },
            },
            data: [
              {
                name: "",
                value: 45,
              },
            ],
          },
        ],
      };
      chart.setOption(option);
    },
    async chart66() {
      let chart = echarts.init(document.getElementById("chart66"));
      let option = {
        grid: {
          left: "0%",
          right: "16%",
          bottom: "0%",
          top: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            splitLine: {
              show: false,
            },
            type: "value",
            show: false,
          },
        ],
        yAxis: [
          {
            splitLine: {
              show: false,
            },
            axisLine: {
              //y轴
              show: false,
            },
            type: "category",
            axisTick: {
              show: false,
            },
            data: ["巡检总数", "需整改", "已整改", "未整改"],
            axisLabel: {},
          },
        ],
        series: [
          {
            color: ["#5470c6", "#91cc75", "#fac858", "#ee6666"],
            name: "标准化",
            type: "bar",
            barWidth: 20, // 柱子宽度
            label: {
              show: true,
              position: "right", // 位置
              color: "#999",
              fontSize: 14,
              fontWeight: "bold", // 加粗
              distance: 5, // 距离
            }, // 柱子上方的数值
            data: [
              {
                value: 300,
                itemStyle: {
                  color: "#66ccff",
                },
              },
              {
                value: 200,
                itemStyle: {
                  color: "#cc9900",
                },
              },
              {
                value: 150,
                itemStyle: {
                  color: "#ffcc00",
                },
              },
              {
                value: 240,
                itemStyle: {
                  color: "#00cccc",
                },
              },
            ],
          },
        ],
      };
      chart.setOption(option);
    },
    async chart67() {
      let chart = echarts.init(document.getElementById("chart67"));
      let option = {
        title: {
          text: "80%",
          left: "center",
          top: "36%",
          textStyle: {
            fontSize: 26,
          },
          subtext: "合格率",
          subtextStyle: {
            color: "#999",
            fontSize: 14,
          },
        },
        grid: {
          top: "0",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: false,
        },
        series: [
          {
            name: "项目金额",
            type: "pie",
            radius: ["60%", "90%"],
            color: ["#fc9d4d", "#0089ff", "#00d998"],
            avoidLabelOverlap: false,
            // radius以半径不同来表示数据大小
            roseType: "radius",
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 335,
                name: "党政",
              },
              {
                value: 310,
                name: "教育",
              },
              {
                value: 234,
                name: "医疗",
              },
            ],
          },
        ],
      };
      chart.setOption(option);
    },
    async chart68() {
      let chart = echarts.init(document.getElementById("chart68"));
      let option = {
        grid: {
          left: "6%",
          right: "10%",
          bottom: "0%",
          top: "10%",
          containLabel: true,
        },
        xAxis: [
          {
            splitLine: {
              show: false,
            },
            type: "value",
            show: false,
          },
        ],
        yAxis: [
          {
            splitLine: {
              show: false,
            },
            axisLine: {
              //y轴
              show: false,
            },
            type: "category",
            axisTick: {
              show: false,
            },
            data: ["巡检总数", "需整改", "已整改", "未整改"],
            axisLabel: {
              backgroundColor: "#e4eefe",
              borderRadius: 5,
              padding: [7, 10, 5, 10],
            },
          },
        ],
        series: [
          {
            color: ["#5470c6", "#91cc75", "#fac858", "#ee6666"],
            name: "标准化",
            type: "bar",
            barWidth: 20, // 柱子宽度
            label: {
              show: true,
              position: "right", // 位置
              color: "#999",
              fontSize: 14,
              fontWeight: "bold", // 加粗
              distance: 5, // 距离
            }, // 柱子上方的数值
            data: [
              {
                value: 300,
                itemStyle: {
                  color: "#3788fd",
                },
              },
              {
                value: 200,
                itemStyle: {
                  color: "#3788fd",
                },
              },
              {
                value: 150,
                itemStyle: {
                  color: "#3788fd",
                },
              },
              {
                value: 240,
                itemStyle: {
                  color: "#3788fd",
                },
              },
            ],
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
.map-select{
  position: absolute;
  right: 28%;
  top: 20px;
}
.map-pointer{
  position: absolute;
  right: 0;
   right: 28%;
  top: 70px;
  background-color: #fff;
  border-radius: 5px;
  width: 120px;
  padding: 7px 10px;
  div{
    text-align: left;
    margin: 5px 0;
  }
  *{
    vertical-align: middle;
    font-size: 14px;
  }
  img{
    cursor: pointer;
    margin-right: 4px;
  }

}
</style>
