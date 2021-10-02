<template>
  <div class="index-container">
    <div id="bigmap"></div>
    <div class="content-left">
      <div>
        <div class="box">
          <div class="title">累计支付</div>
          <div class="num-box">
            <div>
              <div>
                <span class="num">20.91</span><span class="unit">亿元</span>
              </div>
              <div class="num-title">项目已支付</div>
            </div>
            <div>
              <div><span class="num1">35.68%</span></div>
              <div class="num-title">占总体金额</div>
            </div>
          </div>
          <div class="chart-box">
            <div id="chart1"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">合同执行</div>
          <div class="num1-box">合同总额<span>20.91</span>亿元</div>
          <div class="chart-box">
            <div id="chart2"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">变更数量</div>
          <div class="num2-box">
            <div><span>7,365</span>个</div>
            <div class="tip">总变更数量</div>
          </div>
          <div class="chart-box" style="height: 260px">
            <div id="chart3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div>
        <div class="box">
          <div class="title">完成产值与进度款对比</div>
          <div class="layout-twoColumn">
            <div class="chart-box" style="height: 240px; width: 60%">
              <div id="chart4"></div>
            </div>
            <div class="detail">
              <div>
                <div><span>1320.91</span>万元</div>
                <div class="sub">总完成金额</div>
              </div>
              <div>
                <div><span>1320.91</span>万元</div>
                <div class="sub">总进度款</div>
              </div>
              <div>
                <div><span>49.36%</span></div>
                <div class="sub">占比</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">变更金额</div>
          <div class="num-box">
            <div>
              <div>
                <span class="num">20.91</span><span class="unit">万元</span>
              </div>
              <div class="num-title">变更总金额</div>
            </div>
            <div>
              <div>
                <span class="num1">35.68</span><span class="unit">万元</span>
              </div>
              <div class="num-title">累计变更计量金额</div>
            </div>
          </div>
          <div class="chart-box">
            <div id="chart5"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="title">变更金额</div>
          <div class="num-box">
            <div>
              <div>
                <span class="num">20.91</span><span class="unit">万元</span>
              </div>
              <div class="num-title">变更总金额</div>
            </div>
            <div>
              <div>
                <span class="num1">35.68</span><span class="unit">万元</span>
              </div>
              <div class="num-title">累计变更计量金额</div>
            </div>
          </div>
          <div class="chart-box">
            <div id="chart6"></div>
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
  name: "proIndex",
  components: {},
  data() {
    return {
      wordFlag: false,
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
              rotate: 30,
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
            name: "合格率 (%)",
            position: "right",
            axisLabel: {
              formatter: "{value} %",
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
                    color: "#499ef4",
                  },
                  {
                    offset: 1,
                    color: "#3eb5dd",
                  },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3eb5dd",
                  },
                  {
                    offset: 1,
                    color: "#499ef4",
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
    },
    async chart2() {
      let chart = echarts.init(document.getElementById("chart2"));

      var echartData = [
        { name: "建筑安装类", data: [36] },
        { name: "土地征用拆迁", data: [19] },
        { name: "工程建设其他", data: [11] },
      ];

      let option = {
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          top: "0%",
          bottom: "5%",
        },
        xAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          data: ["sss"],
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        color: ["#5292FD", "#3DBB33 ", "#FCAD2C"],
        series: [],
      };

      echartData.forEach((item, index) => {
        option.series.push({
          type: "bar",
          name: item.name,
          stack: "1",
          label: {
            normal: {
              show: true,
              position: [5, 40],
              formatter: `{value|${item.data}%}\n\n{name|${item.name}}`,
              align: "left",
              textStyle: {
                rich: {
                  name: {
                    fontSize: "14",
                    fontWeight: 500,
                    color: "#333",
                  },
                  value: {
                    fontSize: "20",
                    fontWeight: 500,
                  },
                },
              },
              rich: {
                d: {
                  color: "#3CDDCF",
                },
                a: {
                  color: "#fff",
                  align: "center",
                },
                b: {
                  width: 1,
                  height: 30,
                  borderWidth: 1,
                  borderColor: "#234e6c",
                  align: "left",
                },
              },
            },
          },
          labelLine: {
            show: true,
            length: 12,
            lineStyle: { width: 10 },
          },
          barWidth: 30,
          data: item.data,
          itemStyle: {
            normal: {
              barBorderRadius: [0],
            },
          },
        });
        if (index === 0) {
          option.series[index].itemStyle.normal.barBorderRadius = [5, 0, 0, 5];
        } else if (index === echartData.length - 1) {
          option.series[index].itemStyle.normal.barBorderRadius = [0, 5, 5, 0];
        } else {
          return;
        }
      });
      chart.setOption(option);
    },
    async chart3() {
      let chart = echarts.init(document.getElementById("chart3"));
      const data = [
        {
          name: "祁婺",
          value: 36,
          rate: 12,
        },
        {
          name: "大广",
          value: 20,
          rate: 20,
        },
        {
          name: "宜隧",
          value: 16,
          rate: -40,
        },
        {
          name: "寻龙",
          value: 10,
          rate: -15,
        },
        {
          name: "吉康",
          value: 9,
          rate: 12,
        },
      ];
      let option = {
        color: ["#51a6ff", "#00d998", "#79debd", "#fc9d4d", "#0089ff"],
        title: {
          text: "  婺源",
          subtext: "59%",
          textStyle: {
            fontSize: 20,
            align: "center",
          },
          subtextStyle: {
            fontSize: 32,
            color: ["#0089ff"],
          },
          x: "39%",
          y: "38%",
        },
        legend: {
          // selectedMode: false, // 取消图例上的点击事件
          type: "plain",
          icon: "circle",
          orient: "vertical",
          right: "2%",
          top: "23%",
          align: "left",
          itemGap: 15,
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          symbolKeepAspect: false,
          textStyle: {
            color: "#000",
            rich: {
              name: {
                verticalAlign: "right",
                align: "left",
                width: 35,
                fontSize: 14,
              },
              value: {
                align: "left",
                width: 60,
                fontSize: 14,
              },
              count: {
                align: "left",
                width: 80,
                fontSize: 14,
              },
              upRate: {
                align: "left",
                fontSize: 14,
                color: "#00cf90",
              },
              downRate: {
                align: "left",
                fontSize: 14,
                color: "#ff5722",
              },
            },
          },
          data: data.map((item) => item.name),
          formatter: function (name) {
            let className = "upRate";
            let rateIcon = "▲";
            if (data && data.length) {
              for (var i = 0; i < data.length; i++) {
                if (name === data[i].name) {
                  if (data[i].rate < 0) {
                    className = "downRate";
                    rateIcon = "▼";
                  }
                  return (
                    "{name| " +
                    name +
                    "}  | " +
                    "{value| " +
                    data[i].value +
                    "}"
                  );
                }
              }
            }
          },
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["46%", "50%"],
            data: data,
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: "{text|{c}}\n{b}",
                rich: {
                  text: {
                    align: "center",
                    verticalAlign: "middle",
                    padding: 8,
                    fontSize: 30,
                  },
                  value: {
                    align: "center",
                    verticalAlign: "middle",
                    fontSize: 20,
                  },
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "12",
                },
              },
            },
            labelLine: {
              normal: {
                show: true,
              },
            },
          },
        ],
      };

      chart.setOption(option);
    },
    async chart4() {
      let chart = echarts.init(document.getElementById("chart4"));
      var oData = {
        thisyear: [30, 20, 10, 40, 20, 60],
        lastyear: [90, 60, 60, 80, 70, 50],
        yz: [
          "祁婺项目",
          "大广项目",
          "宜隧项目",
          "寻龙项目",
          "吉康项目",
          "梨温项目",
        ],
        legend: ["完成产值", "进度款"],
      };
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        color: ["#3788fd", "#43d59c"],
        grid: {
          top: "10%",
          left: "10%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          show: false,
        },
        yAxis: {
          type: "category",
          data: oData.yz,
          inverse: true,
          axisLabel: {
            color: "#333",
            fontSize: 12,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: oData.legend[0],
            data: oData.lastyear,
            type: "bar",
            barWidth: 12,
            barGap: "12%",
            barCategoryGap: "10",
            itemStyle: {
              // barBorderRadius: 9,
            },
          },
          {
            name: oData.legend[1],
            data: oData.thisyear,
            type: "bar",
            barWidth: 12,
            barGap: "12%",
            barCategoryGap: "10",
            itemStyle: {
              // barBorderRadius: 9,
            },
            label: {
              show: true,
              offset: [10, 0],
              position: "right",
              textStyle: {
                color: "#333",
                fontSize: 12,
              },
              formatter: function (oItem) {
                var nIdx = oItem.dataIndex; //获取索引求各项的百分比
                return (
                  ((oItem.value / oData.lastyear[nIdx]) * 100).toFixed(2) + "%"
                );
              },
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
    border-left: 1px solid #d7d6d6;
    padding-left: 40px;
    font-size: 14px;
    display: flex;
    height: 75%;
    position: absolute;
    right: 0;
    padding-right: 25px;

    flex-direction: column;
    justify-content: space-between;
    > div:first-child {
      span {
        color: #3788fd;
      }
    }
    > div:nth-child(2) {
      span {
        color: #efa25d;
      }
    }
    > div:nth-child(3) {
      span {
        color: #333;
      }
    }
    .sub {
      margin-top: 6px;
    }
    span {
      font-size: 26px;
      font-weight: bold;
    }
    * {
      line-height: 1;
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
</style>
