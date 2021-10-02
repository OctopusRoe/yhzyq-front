<template>
  <div class="index-container">
    <div id="bigmap"></div>
    <div class="content-left">
      <div>
        <div class="box">
          <div class="title">施工状态</div>
          <div class="construction-progress">
            <div>
              <div class="title-progress">下方钢筋笼</div>
              <div class="date">2020年12月15日</div>
            </div>
            <div>
              <div class="title-progress">开始K11 247-k22 321混泥土浇筑</div>
              <div class="date">2020年12月15日</div>
            </div>
            <div>
              <div class="title-progress">开始K11 247-k22 321混泥土浇筑</div>
              <div class="date">2020年12月15日</div>
            </div>
            <div>
              <div class="title-progress">开始K11 247-k22 321混泥土浇筑</div>
              <div class="date">2020年12月15日</div>
            </div>
            <div>
              <div class="title-progress">下方钢筋笼</div>
              <div class="date">2020年12月15日</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">产值统计</div>
          <div class="chart-box" style="height: 380px">
            <div id="chart3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div>
        <div class="box">
          <div class="title">进度概况</div>
          <div class="progress-layout">
            <div class="progress-layout-top">
              <div class="progress-chart-box">
                <div id="chart4"></div>
              </div>
              <div class="detail">
                <div>
                  <img src="../../../assets/image/style1/icon-sx.png" alt="" />
                  <div>
                    <div class="detail-title">本月完成</div>
                    <div class="num">56%</div>
                  </div>
                </div>
                <div>
                  <img
                    src="../../../assets/image/style1/icon-money.png"
                    alt=""
                  />
                  <div>
                    <div class="detail-title">本月完成产值</div>
                    <div class="num">3766<span>万元</span></div>
                  </div>
                </div>
                <div>
                  <img
                    src="../../../assets/image/style1/icon-money.png"
                    alt=""
                  />
                  <div>
                    <div class="detail-title">当日完成产值</div>
                    <div class="num">3766<span>万元</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="progress-layout-bottom">
              <div class="datenum">
                <div>
                  <svg-icon icon-class="icon-date" />
                  <div>
                    <div class="progress-title">项目工程</div>
                    <div class="daynum">5679<span class="unit">天</span></div>
                  </div>
                </div>
                <div>
                  <svg-icon icon-class="prodate" />
                  <div>
                    <div class="progress-title">已执行</div>
                    <div class="daynum">5679<span class="unit">天</span></div>
                  </div>
                </div>
              </div>
              <div class="progress-chart-box">
                <div id="chart66"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">进度计划</div>
          <div class="chart-box" style="height: 390px">
            <div id="chart68" ></div>
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
        color: ["#fa9d4d", "#0c8dfe"],
        legend: {
          top: "5%",
          data: ["完成产值(亿元)", "总产值(亿元)"],
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "16%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: {
          axisTick: { show: false },
          axisLabel: {
            interval:0,
            textStyle: { color: "#707070", fontSize: 14 },
          },
          axisLine: {
            // onZero: false, // X轴脱离Y轴0刻度
            lineStyle: { color: "#cccccc", type: "dashed" },
          },
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月","12月"],
        },
        yAxis: {
          nameTextStyle: {
            color: "#707070",
            fontSize: 14,
          },
          axisLabel: {
            textStyle: { color: "#707070", fontSize: 14 },
            // showMaxLabel: false,
          },
           axisLine: {
              show:false
          },
           axisTick: { show: false },
          splitLine: { show: true },
        },
        series: [
          {
            name: "完成产值(亿元)",
            type: "line",
            symbolSize: 10,
            z: 12,
            data: [15, 6, 12, 3, 8,6,10,8,12,6,7,3],
          },
          {
            name: "总产值(亿元)",
            type: "line",
            symbolSize: 10,
            data: [12, 5, 9, 3, 8,3,12,5,6,7,8,9,2],
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
      var datas = {
        title: "进度完成",
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
  width: 85%;
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
  padding-left: 48px;
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
    left: -54px;
    background-color: #fff;
    top: 10px;
    z-index: 9;
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
</style>
