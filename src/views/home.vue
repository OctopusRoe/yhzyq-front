<template>
  <div class="container">
    <div class="top">
      <div class="logowrap">
        <div><img src="../assets/image/logo.png" alt="" /></div>
        <h1 title="项目建设数字化管控平台">项目建设数字化管控平台</h1>
      </div>
      <div class="rmenu">
        <div class="menu">
          <div class="active">公司平台</div>
          <div @click="goto">项目平台</div>
          <div>智慧工地</div>
          <div>BIM中心</div>
          <div>OA协同</div>
          <div>管理后台</div>
        </div>
        <ul class="child-menu">
          <li class="active"><div>主页</div></li>
          <li><div>基本信息</div></li>
          <li><div>权限管理</div></li>
          <li><div>数据标准库</div></li>
          <li><div>审批流</div></li>
          <li><div>系统</div></li>
        </ul>
      </div>
      <div class="right">
        <div class="msgcenter">
          <div>
            <img src="../assets/image/icon-msg.png" alt="" />
          </div>
          <div>
            <img src="../assets/image/avatar.png" alt="" />
          </div>
          <div>
            <span @click="set">张三</span>
            <div v-show="setShowFlag">
              <ul class="select-box">
                <li
                  @click="
                    updatePassDialog = true;
                    setShowFlag = false;
                  "
                >
                  修改密码
                </li>
                <li
                  @click="
                    photoSetDialog = true;
                    setShowFlag = false;
                  "
                >
                  基本设置
                </li>
                <li>退出登录</li>
              </ul>
              <div class="select-bg" @click="hideSet"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="m">
        <div class="leftbox">
          <div>
            <div class="title">
              <img src="../assets/image/right.png" alt="" /><span
                >项目概况统计</span
              ><img src="../assets/image/left.png" alt="" />
            </div>
            <div class="xmgk-content">
              <div class="xmgk-detailBox">
                <div class="cpnum">
                  <span>已完成 220 个</span>
                </div>
                <div class="sub">项目总数</div>
                <div class="mapbox-xmgk">
                  <div id="xmzs"></div>
                </div>
                <div class="progress-info">
                  <span>环比去年增长</span><span>10%</span>
                </div>
                <div class="xmgk-progressBar">
                  <div id="xmzsProgressBar"></div>
                </div>
              </div>
              <div class="xmgk-detailBox">
                <div class="cpnum">
                  <span>已完成 220 个</span>
                </div>
                <div class="sub">投资目录</div>
                <div class="mapbox-xmgk">
                  <div id="tzml"></div>
                </div>
                <div class="progress-info">
                  <span>环比去年增长</span><span>10%</span>
                </div>
                <div class="xmgk-progressBar">
                  <div id="tzmlProgressBar"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="title">
              <img src="../assets/image/right.png" alt="" /><span
                >投资管理概况</span
              ><img src="../assets/image/left.png" alt="" />
            </div>
            <div class="tzgl-detail">
              <div>
                <div>
                  <span>25898</span><img src="../assets/image/up.png" alt="" />
                </div>
                <div>年度计划投资</div>
              </div>
              <div>
                <div>
                  <span>25898</span
                  ><img src="../assets/image/down.png" alt="" />
                </div>
                <div>年度实际投资计划</div>
              </div>
            </div>
            <div class="tzglChart-box">
              <div id="tzglChart"></div>
            </div>
          </div>
          <div>
            <div class="title">
              <img src="../assets/image/right.png" alt="" /><span>任务列表</span
              ><img src="../assets/image/left.png" alt="" />
            </div>
            <div class="rflb-list">
              <div>
                <div>
                  <img src="../assets/image/icon1.png" alt="" />
                </div>
                <div>
                  <div class="title">江西大厂高速: 项目质量验收单</div>
                  <div class="time">10分钟前</div>
                </div>
              </div>
              <div>
                <div>
                  <img src="../assets/image/icon2.png" alt="" />
                </div>
                <div>
                  <div class="title">江西大厂高速: 项目质量验收单</div>
                  <div class="time">10分钟前</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mapbox">
          <div id="bigmap"></div>
        </div>
        <div class="rightbox">
          <div class="anglbox">
            <div class="title">
              <img src="../assets/image/right.png" alt="" /><span>安全管理</span
              ><img src="../assets/image/left.png" alt="" />
            </div>
            <div class="info"><span>重大风险源:</span><span>36个</span></div>
            <div class="chart-box">
              <div id="aqglChart"></div>
              <div id="zglChart"></div>
            </div>
          </div>
          <div class="zjglbox">
            <div class="title">
              <img src="../assets/image/right.png" alt="" /><span>质检管理</span
              ><img src="../assets/image/left.png" alt="" />
            </div>
            <div class="info"><span>重大风险源:</span><span>36个</span></div>
            <div class="chart-box">
              <div class="info">
                <div>
                  <div class="label"><span>问题总数</span></div>
                  <span class="num">214</span>个
                </div>
                <div>
                  <div class="label"><i></i><span>已整改</span></div>
                  <span class="num">198</span>个
                </div>
                <div>
                  <div class="label"><i></i><span>待整改</span></div>
                  <span class="num">10</span>个
                </div>
                <div>
                  <div class="label"><i></i><span>未整改</span></div>
                  <span class="num">6</span>个
                </div>
              </div>
              <div class="chart">
                <div id="zdfxChart"></div>
              </div>
            </div>
          </div>
          <div class="jdglbox">
            <div class="title">
              <img src="../assets/image/right.png" alt="" /><span>进度管理</span
              ><img src="../assets/image/left.png" alt="" />
            </div>
            <div class="chart-box">
              <div id="jdglChart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
require("echarts/theme/macarons");
export default {
  name: "home",
  components: { vSelect },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("xmzs"), "macarons");
      this.setOptionsXmzs(this.chartData);
      this.chart = echarts.init(document.getElementById("tzml"), "macarons");
      this.setOptionsTzml(this.chartData);
      this.tzmlProgressChart();
      this.xmzsProgressChart();
      this.tzglChart();
      this.aqglChart();
      this.zglChart();
      this.zdfxChart();
      this.jdglChart();
    },
    setOptionsXmzs({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: "240",
          x: "center",
          y: "39%",
          textStyle: {
            color: "#000",
            fontSize: "16",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["60%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            data: [
              {
                value: 20,
                itemStyle: {
                  color: "#D8E3FD",
                },
              },
              {
                value: 310,
                itemStyle: {
                  color: "#3A78FF",
                },
              },
            ],
          },
        ],
      });
    },
    setOptionsTzml({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: "240",
          x: "center",
          y: "39%",
          textStyle: {
            color: "#000",
            fontSize: "16",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["60%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            data: [
              {
                value: 20,
                itemStyle: {
                  color: "#D8E3FD",
                },
              },
              {
                value: 310,
                itemStyle: {
                  color: "#5ACBFF",
                },
              },
            ],
          },
        ],
      });
    },
    xmzsProgressChart({ expectedData, actualData } = {}) {
      let chart = echarts.init(
        document.getElementById("xmzsProgressBar"),
        "macarons"
      );

      var data = [70];
      var titlename = ["作业帮"];
      var valdata = [1283]; //这是干吗用的不清楚
      let option = {
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              color: "red",
            },
          },
          {
            show: false,
            inverse: true,
            data: valdata,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff",
              },
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "bar",
            yAxisIndex: 0,
            zlevel: 2,
            data: data,
            barWidth: 30,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: "#3A78FF",
              },
            },
          },
          {
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [100, 100, 100, 100, 100],
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "#D8E3FD",
                barBorderRadius: 30,
              },
            },
          },
        ],
      };
      chart.setOption(option);
    },
    tzmlProgressChart({ expectedData, actualData } = {}) {
      let chart = echarts.init(
        document.getElementById("tzmlProgressBar"),
        "macarons"
      );
      var data = [70];
      var titlename = ["dd"];
      var valdata = [1283]; //这是干吗用的不清楚
      let option = {
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          {
            show: false,
            inverse: true,
            data: valdata,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff",
              },
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "bar",
            yAxisIndex: 0,
            zlevel: 2,
            data: data,
            barWidth: 30,
            itemStyle: {
              normal: {
                barBorderRadius: 100,
                color: "#5ACBFF",
              },
            },
          },
          {
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [100, 100, 100, 100, 100],
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "#D8E3FD",
                barBorderRadius: 30,
              },
            },
          },
        ],
      };
      chart.setOption(option);
    },
    tzglChart({ expectedData, actualData } = {}) {
      let chart = echarts.init(document.getElementById("tzglChart"));
      let option = {
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: 10,
        },
        xAxis: {
          type: "category",
          data: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ],
          axisLine: {
            //  改变x轴颜色
            lineStyle: {
              color: "#26D9FF",
            },
          },
          axisLabel: {
            //  改变x轴字体颜色和大小
            textStyle: {
              color: "#000",
              fontSize: 12,
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ["#fff"],
              width: 1,
              type: "solid",
            },
          },
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          axisLine: {
            //  改变y轴颜色
            show: false,
            lineStyle: {
              color: "#26D9FF",
            },
          },
          axisLabel: {
            //  改变y轴字体颜色和大小
            show: false,
            formatter: "{value}%", //  给y轴添加单位
            textStyle: {
              color: "#000",
              fontSize: 16,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ["#fff"],
              width: 1,
              type: "solid",
            },
          },
        },
        series: [
          {
            type: "line",
            smooth: false,
            symbol: "square",
            symbolSize: 0,
            markPoint: {
              symbol: "circle",
            },
            data: [80, 82, 75, 73, 88, 93, 80, 60, 70, 30, 120, 90],
            name: "项目3",
            itemStyle: {
              normal: {
                color: "#9C7E0A",
                borderColor: "#F4C907",
                borderWidth: 0,
              },
            },
            lineStyle: {
              normal: {
                width: 0,
                color: "#F4C907",
                shadowColor: "#F4C907",
                shadowBlur: 0,
              },
            },
            areaStyle: {
              color: "#F7B763",
            },
          },

          {
            type: "line",
            smooth: false,
            symbol: "square",
            symbolSize: 0,
            markPoint: {
              symbol: "circle",
            },
            data: [50, 62, 50, 55, 59, 57, 60, 30, 40, 33, 66, 50],
            name: "项目2",
            itemStyle: {
              normal: {
                color: "#0C7E5C",
                borderColor: "#17D8A1",
                borderWidth: 0,
              },
            },
            lineStyle: {
              normal: {
                width: 0,
                color: "#17D8A1",
                shadowColor: "#17D8A1",
                shadowBlur: 0,
              },
            },
            areaStyle: {
              color: "#1ED487",
            },
          },
        ],
      };

      chart.setOption(option);
    },
    aqglChart() {
      let chart = echarts.init(document.getElementById("aqglChart"));
      var myColor = [
        "#006af1",
        "#01a9f0",
        "#3fa967",
        "#ffb310",
        "#ff7611",
        "#f55555",
      ];
      var colorList = [
        "#d6e6fd",
        "#d6f0fd",
        "#e0f1e7",
        "#fff3d9",
        "#ffead9",
        "#fee4e5",
      ];
      let option = {
        grid: {
          containLabel: true,
          left: "0%",
          right: "0%",
          bottom: "15%",
          top: 10,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#e9e9e9",
              },
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#333",
                fontWeight: "normal",
                fontSize: 12,
              },
            },
            data: ["巡检总数", "需整改", "已整改", "未整改"],
          },
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            data: [],
          },
        ],
        yAxis: {
          type: "value",
          name: "",
          splitNumber: 6,
          axisLabel: {
            textStyle: {
              color: "#333",
            },
          },
          nameTextStyle: {
            color: "#fff",
            fontSize: 12,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#e9e9e9",
            },
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                show: true,
                color: function (params) {
                  return myColor[params.dataIndex];
                },
                borderWidth: 0,
                borderColor: "#333",
              },
            },
            label: {
              normal: {
                show: false,
              },
            },
            barWidth: "30%",
            data: [60, 50, 30, 40],
          },
        ],
      };

      chart.setOption(option);
    },
    zglChart() {
      let chart = echarts.init(document.getElementById("zglChart"));
      var xAxisData = ["整改率"];
      var seriesData = [120];
      let option = {
        color: "#1785ef",
        xAxis: {
          type: "category",
          data: xAxisData,
          nameTextStyle: {
            color: "#8f8f9b",
            fontSize: 14,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            rotate: 0,
            interval: 0,
            fontSize: 14,
            textStyle: {
              color: "#8f8f9b",
            },
          },
        },
        grid: {
          containLabel: true,
          left: "0%",
          right: "0%",
          bottom: "15%",
          top: "15%",
        },
        yAxis: {
          nameTextStyle: {
            color: "#8f8f9b",
            fontSize: 14,
          },
          type: "value",
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              type: "solid",
              color: "#8f8f9b",
            },
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            data: seriesData,
            type: "bar",
            barWidth: "20px",
            itemStyle: {
              normal: {
                color: "#1AD385",
                barBorderRadius: [6, 6, 0, 0],
              },
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#1969C3",
                },
                position: "top",
                formatter: function (params) {
                  console.log(params);
                },
              },
            },
          },
        ],
      };

      chart.setOption(option);
    },
    zdfxChart() {
      let chart = echarts.init(document.getElementById("zdfxChart"));
      let option = {
        title: [
          {
            text: "76%",
            subtext: "合格率",
            left: "center",
            top: "35%",
            textStyle: {
              fontSize: 17,
              fontWeight: "normal",
              fontStyle: "normal",
              color: "#2BBCFF",
            },
            subtextStyle: {
              fontWeight: "normal",
              color: "#000",
              fontSize: 13,
            },
          },
        ],
        color: ["#FFA42B", "#FF5454", "#2BBCFF"],
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["50%", "70%"],
            startAngle: 360,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 2,
                name: "严重",
              },
              {
                value: 2,
                name: "主要",
              },
              {
                value: 2,
                name: "次要",
              },
            ],
          },
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["49%", "70%"],
            startAngle: 360,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 2,
                name: "严重",
                itemStyle: {},
              },
              {
                value: 2,
                name: "主要",
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                },
              },
              {
                value: 2,
                name: "次要",
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                },
              },
            ],
          },
        ],
        animation: false,
      };
      chart.setOption(option);
    },
    jdglChart() {
      let chart = echarts.init(document.getElementById("jdglChart"));
      var chartData = [60, 52, 45, 50];
      var colorList = ["#7b8ef1", "#586fe6", "#3a56e6", "#1dd7f8"];

      let option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "0%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false, //取消坐标轴刻度线
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#9ea8bc",
            },
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          axisTick: "none",
          axisLine: "none",
          offset: "10",
          axisLabel: {
            textStyle: {
              color: "#000",
              fontSize: "12",
            },
          },
          data: ["宜隧高速", "大广高速", "吉安高速", "昌九高速"],
        },
        series: [
          {
            //百分比
            show: true,
            type: "bar",
            barGap: "-100%",
            barWidth: "30%",
            z: 2,
            itemStyle: {
              //柱子颜色
              normal: {
                color: function (data) {
                  return colorList[data.dataIndex];
                },
                barBorderRadius: [100, 100, 100, 100],
              },
            },

            data: chartData,
          },
          {
            name: "外框",
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: "rgba(0, 0, 0, 0.14)", //rgba设置透明度0.14
              },
            },
            barGap: "-100%",
            z: 0,
            barWidth: "30%",
            data: [100, 100, 100, 100],
          },
        ],
      };

      chart.setOption(option);
    },
    goto() {
      this.$router.push({ name: "home1" });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/index.scss";
* {
  margin: 0;
  padding: 0;
  font-size: 12px;
  box-sizing: border-box;
}
body {
  overflow: hidden;
}
.top {
  background: url(../assets/image/headerBg.png);
  display: flex;
  box-shadow: 2px 3px 10px 0px rgba(48, 57, 125, 0.6);
  width: 100%;
  background-size: 100% 100%;
}
.logowrap {
  display: flex;
  align-items: center;
  color: #fff;
  > div {
    height: 70%;
  }
  h1 {
    font-size: 21px;
    font-weight: bold;
    white-space: nowrap;
    margin-right: 36px;
  }
  img {
    margin-right: 14px;
    height: 100%;
    width: auto;
    margin-left: 20px;
  }
}
.rmenu {
  flex: 1;
}
.menu {
  display: flex;
  height: 54px;
  padding: 0 20px 0 0;
  background: rgba(201, 197, 255, 0.25);
  box-sizing: border-box;
  align-items: center;
  align-items: flex-end;
  > div {
    padding: 0 10px 0;
    font-size: 16px;
    box-sizing: border-box;
    text-align: center;
    line-height: 43px;
    border-radius: 10px 10px 0 0;
    color: #fff;
    margin: 2px 5px;
    cursor: pointer;
  }
  > div.active {
    background: #1867be;
  }
}
.child-menu {
  display: flex;
  li {
    list-style-type: none;
    border: none;
    margin: 0 15px;
    height: 39px;
    color: #fff;
    > div {
      line-height: 39px;
      font-size: 14px;
      opacity: 0.65;
    }
  }
  li.active,
  li:hover {
    > div {
      border-bottom: 1px solid #fff;
      opacity: 1;
      cursor: pointer;
    }
  }
}
.leftbox {
  top: 20px;
  left: 30px;
  z-index: 10;
  width: 21%;
  position: absolute;

  .title {
    span {
      margin: 0 10px;
      color: #333;
      font-size: 16px;
      font-size: 1vw;
    }
  }
  > div {
    background: url(../assets/image/boxbg.png) no-repeat center center;
    background-size: 100% 100%;
    padding: 1.6vh 2vh;
    width: 100%;
    text-align: center;
    margin-top: 0.5vh;
    height: 27vh;
  }
}
.rightbox {
  top: 20px;
  right: 30px;
  z-index: 10;
  width: 20%;
  position: absolute;
  .title {
    span {
      margin: 0 10px;
      color: #333;
      font-size: 16px;
      font-size: 1vw;
    }
  }
  > div {
    background: url(../assets/image/boxbg.png) no-repeat center center;
    background-size: 100% 100%;
    padding: 16px 20px;
    width: 100%;
    text-align: center;
    margin-top: 0.5vh;
    height: 27vh;
  }
  > div > .info {
    font-size: 14px;
    text-align: right;
    margin-top: 8px;
    .label {
      display: inline-block;
    }
    span {
      font-size: 14px;
      font-size: 1.4vh;
    }
    span:last-child {
      color: rgb(255, 97, 97);
    }
  }
  .anglbox {
    .chart-box {
      height: 19vh;
      display: flex;
      > div {
        height: 100%;
      }
      > div:first-child {
        width: 75%;
      }
      > div:last-child {
        width: 25%;
      }
    }
  }
  .zjglbox {
    .chart-box {
      height: 18vh;
      display: flex;
      justify-content: space-between;

      .info {
        > div:nth-child(2) {
          i {
            border: 2px solid #2bbcff;
          }
        }
        > div:nth-child(3) {
          i {
            border: 2px solid #ffa42b;
          }
        }
        > div:nth-child(4) {
          i {
            border: 2px solid #ffa42b;
          }
        }
        .label {
          display: inline-block;
          width: 70px;
          text-align: right;
          * {
            vertical-align: middle;
          }
        }
        > div {
          text-align: left;
          line-height: 3vh;
        }
        span {
          font-size: 1.6vh;
        }
        .num {
          width: 60px;
          display: inline-block;
          text-align: center;
        }
        * {
          font-size: 14px;
        }
        > div:first-child {
          margin-bottom: 1.6vh;
        }
        i {
          width: 7px;
          height: 7px;
          margin-right: 2px;
          border-radius: 100%;
          display: inline-block;
          margin-right: 2px;
        }
        > div:first-child {
          .num {
            color: #1867be;
          }
        }
        > div:nth-child(2) {
          .num {
            color: #2bbcff;
          }
        }
        > div:nth-child(3) {
          .num {
            color: #ffa42b;
          }
        }
        > div:nth-child(4) {
          .num {
            color: #ff5454;
          }
        }
      }
      .chart {
        width: 45%;
        > div {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.content {
  flex: 1;
  width: 100%;
  height: calc(100% - 110px)!important;
  .m {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
.container {
  align-items: baseline;
  flex-direction: column;
  
  min-width: 1400px;
  display: flex;
  width: 100%;
}
.xmgk-detailBox {
  box-sizing: border-box;
  text-align: center;
  flex: 0 0 50%;
  padding: 0 10px;
  .sub {
    font-size: 12px;
    font-size: 1.4vh;
  }
  .progress-info {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: 0 0.8vw;
    span {
      font-size: 1.4vh;
    }
  }
  .mapbox-xmgk {
    width: 100%;
    height: 10vh;
    > div {
      width: 100%;
      height: 100%;
    }
  }
}
.xmgk-detailBox:last-child {
  .cpnum {
    span {
      background-color: rgb(219, 242, 253);
      color: rgb(90, 203, 255);
    }
  }
}
.xmgk-content {
  display: flex;
  flex-flow: row;
}
.xmgk-progressBar {
  height: 1vh;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  * {
    width: 100%;
  }
  > div {
    width: 100%;
    height: 100%;
  }
}
// .cpnum {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   span {
//     background-color: rgb(216, 227, 253);
//     color: rgb(58, 120, 255);
//     margin: 0.8vh 0px 0.4vh;
//     padding: 0.3vh 0.6vh;
//     position: relative;
//     border-radius: 4px;
//     font-size: 12px;
//     font-size: 1.4vh;
//   }
// }
.tzgl-detail {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1.2vh;
  > div {
    width: 47%;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.4vh;
    }
    span {
      font-size: 20px;
      color: rgb(246, 173, 80);
    }
  }
  > div:last-child {
    span {
      color: rgb(31, 212, 135);
    }
  }
}
.tzglChart-box {
  height: 14vh;
  margin-top: 0.2vh;
  > div {
    width: 100%;
    height: 100%;
  }
}
.rflb-list {
  > div {
    display: flex;
    align-items: center;
    img {
      height: 10vh;
    }
    .title {
      font-size: 18px;
      font-size: 0.9vw;
      text-align: left;
    }
    .time {
      text-align: left;
      color: #999;
      font-size: 12px;
      font-size: 1.4vh;
    }
  }
}
.jdglbox {
  .chart-box {
    height: 19vh;
    > div {
      width: 100%;
      height: 100%;
    }
  }
}
.mapbox {
  width: 100%;
  height: 100%;
  > div {
    width: 100%;
    height: 100%;
  }
}
body {
  overflow: hidden;
}
</style>
<style lang="scss">
.right {
  position: absolute;
  padding-right: 20px;
  right: 0;
  height: 53px;
  display: flex;
  align-items: center;
  #vs2__combobox {
    border: 1px solid #fff !important;
  }
  > span {
    color: #fff;
    display: inline-block;
    background-color: #1867be;
    padding: 3px 5px;
    margin-right: 10px;
    border: 0;
  }
  > div {
    display: inline-block;
    span {
      color: #fff;
    }
    .vs__clear {
      display: none;
    }
  }
  .vs__dropdown-toggle {
    border: 1px solid #fff;
  }
  .vs__open-indicator {
    fill: rgba(255, 255, 255, 0.9);
  }
  .msgcenter {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 60px;
    margin-right: 10px;
    > div {
      img {
        display: block;
      }
      margin-left: 10px;
    }
    > div:first-child {
      img {
        height: 2.6vh;
        width: auto;
      }
    }
    > div:nth-child(2) {
      img {
        height: 5vh;
        width: auto;
      }
    }
    > div:nth-child(3) {
      margin-left: 10px;
      font-size: 16px;
      cursor: pointer;
      color: #fff;
      position: relative;
      > span {
        font-size: 14px;
      }
      .select-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 98;
      }
      .select-box {
        position: absolute;
        list-style-type: none;
        background: #fff;
        z-index: 99;
        right: 0;
        top: 158%;
        color: #333;
        white-space: nowrap;
        padding: 5px 0;
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
          0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
        li {
          padding: 5px 10px;
          font-size: 14px;
        }
        li:hover {
          background: #e8e8ee;
        }
      }
    }
  }
}
</style>
