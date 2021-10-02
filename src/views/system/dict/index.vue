<template>
  <!-- <img class="pic-404__parent" src="@/assets/image/kaifa.png" alt="404"> -->
  <div class="app-container">
    <div class="app-wrap">
      <div class="money-chart-list">
        <div>
          <div>
            <div class="title">全部项目</div>
            <div class="sub">合同金额(亿元)</div>
            <div class="money">2546</div>
          </div>
          <div class="chart-box">
            <div id="chart1"></div>
          </div>
        </div>
        <div>
          <div>
            <div class="title">全部项目</div>
            <div class="sub">合同金额(亿元)</div>
            <div class="money">2546</div>
          </div>
          <div class="chart-box">
            <div id="chart2"></div>
          </div>
        </div>
        <div>
          <div>
            <div class="title">全部项目</div>
            <div class="sub">合同金额(亿元)</div>
            <div class="money">2546</div>
          </div>
          <div class="chart-box">
            <div id="chart3"></div>
          </div>
        </div>
        <div>
          <div>
            <div class="title">全部项目</div>
            <div class="sub">合同金额(亿元)</div>
            <div class="money">2546</div>
          </div>
          <div class="chart-box">
            <div id="chart4"></div>
          </div>
        </div>
        <div>
          <div>
            <div class="title">全部项目</div>
            <div class="sub">合同金额(亿元)</div>
            <div class="money">2546</div>
          </div>
          <div class="chart-box">
            <div id="chart5"></div>
          </div>
        </div>
      </div>
      <div class="report-chart-list">
        <div>
          <div id="chart6"></div>
          <span>项目概况统计</span>
          <div>
            <span class="active">月</span><span>季</span><span>年</span>
          </div>
        </div>
        <div>
          <div id="chart7"></div>
          <span>项目概况统计</span>
          <div>
            <span class="active">月</span><span>季</span><span>年</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "Page404",
  computed: {
    message() {
      return "找不到网页！";
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let chart = echarts.init(document.getElementById("chart1"));

      const handred = 100;
      let point = 66;

      let option = {
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "5%",
        },
        title: [
          {
            text: point + "%",
            x: "center",
            y: "center",
            textStyle: {
              fontWeight: "bold",
              color: "#13a3ff",
              fontSize: "24",
            },
          },
          {
            text: "已完成",
            x: "center",
            y: "58%",
            textStyle: {
              color: "#13a3ff",
              fontSize: "14",
            },
          },
        ],
        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["70%", "86%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },

            hoverAnimation: false,
            data: [
              {
                value: point,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#13a3ff",
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "剩余",
                value: handred - point,
                itemStyle: {
                  normal: {
                    color: "#E1E8EE",
                  },
                },
              },
            ],
          },
        ],
      };

      chart.setOption(option);

      let chart2 = echarts.init(document.getElementById("chart2"));

      const handred2 = 100;
      let point2 = 66;

      let option2 = {
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "5%",
        },
        title: [
          {
            text: point + "%",
            x: "center",
            y: "center",
            textStyle: {
              fontWeight: "bold",
              color: "#47e1bd",
              fontSize: "24",
            },
          },
          {
            text: "已完成",
            x: "center",
            y: "58%",
            textStyle: {
              color: "#47e1bd",
              fontSize: "14",
            },
          },
        ],
        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["70%", "86%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },

            hoverAnimation: false,
            data: [
              {
                value: point,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#ddf9f1",
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "剩余",
                value: handred2 - point2,
                itemStyle: {
                  normal: {
                    color: "#47e1bd",
                  },
                },
              },
            ],
          },
        ],
      };

      chart2.setOption(option2);

      let chart3 = echarts.init(document.getElementById("chart3"));

      const handred3 = 100;
      let point3 = 66;

      let option3 = {
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "5%",
        },
        title: [
          {
            text: point + "%",
            x: "center",
            y: "center",
            textStyle: {
              fontWeight: "bold",
              color: "#fdc532",
              fontSize: "24",
            },
          },
          {
            text: "已完成",
            x: "center",
            y: "58%",
            textStyle: {
              color: "#fdc532",
              fontSize: "14",
            },
          },
        ],
        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["70%", "86%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },

            hoverAnimation: false,
            data: [
              {
                value: point,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#fdc532",
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "剩余",
                value: handred3 - point3,
                itemStyle: {
                  normal: {
                    color: "#ffedb9",
                  },
                },
              },
            ],
          },
        ],
      };

      chart3.setOption(option3);

      let chart4 = echarts.init(document.getElementById("chart4"));

      const handred4 = 100;
      let point4 = 66;

      let option4 = {
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "5%",
        },
        title: [
          {
            text: point + "%",
            x: "center",
            y: "center",
            textStyle: {
              fontWeight: "bold",
              color: "#a69aa6",
              fontSize: "24",
            },
          },
          {
            text: "已完成",
            x: "center",
            y: "58%",
            textStyle: {
              color: "#a69aa6",
              fontSize: "14",
            },
          },
        ],
        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["70%", "86%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },

            hoverAnimation: false,
            data: [
              {
                value: point4,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#a69aa6",
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "剩余",
                value: handred4 - point4,
                itemStyle: {
                  normal: {
                    color: "#e9e4eb",
                  },
                },
              },
            ],
          },
        ],
      };

      chart4.setOption(option4);

      let chart5 = echarts.init(document.getElementById("chart5"));

      const handred5 = 100;
      let point5 = 66;

      let option5 = {
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "5%",
        },
        title: [
          {
            text: point + "%",
            x: "center",
            y: "center",
            textStyle: {
              fontWeight: "bold",
              color: "#f37674",
              fontSize: "24",
            },
          },
          {
            text: "已完成",
            x: "center",
            y: "58%",
            textStyle: {
              color: "#f37674",
              fontSize: "14",
            },
          },
        ],
        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["70%", "86%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },

            hoverAnimation: false,
            data: [
              {
                value: point5,
                name: "占比",
                itemStyle: {
                  normal: {
                    color: "#f37674",
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "剩余",
                value: handred5 - point5,
                itemStyle: {
                  normal: {
                    color: "#fcdedc",
                  },
                },
              },
            ],
          },
        ],
      };

      chart5.setOption(option5);

      let chart6 = echarts.init(document.getElementById("chart6"));

      let option6 = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: "20%",
          top: "0.5%",
          data: ["资金计划", "计量支付"],
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "12%",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false, //坐标轴两边留白
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            //	margin:15,
            textStyle: {
              color: "#1B253A",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 12,
            },
            formatter: function (params) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 4; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            },
            //rotate:50,
          },
          axisTick: {
            //坐标轴刻度相关设置。
            show: false,
          },
          axisLine: {
            //坐标轴轴线相关设置
            lineStyle: {
              color: "#E5E9ED",
              // opacity:0.2
            },
          },
          splitLine: {
            //坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: "#E5E9ED",
              // 	opacity:0.1
            },
          },
        },
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            name: "亿元",
            axisLabel: {
              textStyle: {
                color: "#a8aab0",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
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
              show: true,
              lineStyle: {
                color: "#E5E9ED",
                // 	opacity:0.1
              },
            },
          },
        ],
        series: [
          {
            name: "资金计划",
            type: "line",
            itemStyle: {
              normal: {
                color: "#00ffff",
                lineStyle: {
                  color: "#00ffff",
                  width: 1,
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(231,249,255,0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(33,253,179,1)",
                    },
                  ]),
                },
              },
            },
            data: [9, 5, 7, 8, 6, 7, 8, 7, 7, 6, 8, 6],
          },
          {
            name: "计量支付",
            type: "line",
            itemStyle: {
              normal: {
                color: "#62d7ff",
                lineStyle: {
                  color: "#62d7ff",
                  width: 1,
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(231,249,255,0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(98,215,255,1)",
                    },
                  ]),
                },
              },
            },
            data: [1, 2, 3, 3, 5, 6, 5, 3, 6, 5, 5, 4],
          },
        ],
      };

      chart6.setOption(option6);

      let chart7 = echarts.init(document.getElementById("chart7"));

      let emptyColor = "#2C3136";

      let option7 = {
        legend: {
          left: "20%",
          top: "0.5%",
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 30,
          textStyle: {
            color: "#000",
            fontSize: 12,
          },
          data: ["合同金额", "完成金额", "计量支付"],
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "12%",
          containLabel: true,
        },
        tooltip: {
          show: "true",
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            let res = "";
            params.forEach((v, i) => {
              if (i <= 2) {
                res += `<div>${v.marker} ${v.seriesName}：${v.data}</div>`;
              }
            });
            return res;
          },
        },
        yAxis: [
          {
            type: "value",
            name: "亿元",
            splitNumber: 6,
            axisLabel: {
              textStyle: {
                color: "#000",
              },
            },
            nameTextStyle: {
              color: "#000",
              fontSize: 12,
            },
            splitLine: {
              lineStyle: {
                color: "#bbbbbb",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#5A717A",
              },
            },
            axisTick: {
              show: true,
            },
          },
        ],
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#bbbbbb",
              },
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff",
                fontWeight: "normal",
                fontSize: 12,
              },
            },
            data: [
              "吉康高速",
              "大广高速",
              "沪昆高速",
              "福银高速",
              "厦蓉高速",
              "祁雾高速",
              "宜遂高速",
            ],
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
            data: [
              "吉康高速",
              "大广高速",
              "沪昆高速",
              "福银高速",
              "厦蓉高速",
              "祁雾高速",
              "宜遂高速",
            ],
          },
        ],
        series: [
          {
            name: "合同金额",
            type: "bar",
            itemStyle: {
              normal: {
                show: true,
                color: "#68f5f9",
                barBorderRadius: 4,
              },
            },
            zlevel: 2,
            barWidth: 20,
            data: [8, 15, 10, 12, 13, 16, 12],
          },
          {
            name: "完成金额",
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                show: true,
                color: "#20f9a7",
                barBorderRadius: 4,
              },
            },
            zlevel: 2,
            barGap: "50%",
            data: [22, 17, 24, 23, 26, 28, 38],
          },
          {
            name: "计量支付",
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                show: true,
                color: "#f94f4f",
                barBorderRadius: 4,
              },
            },
            zlevel: 2,
            barGap: "50%",
            data: [16, 17, 26, 26, 38, 21, 36],
          },
        ],
      };

      chart7.setOption(option7);
    },
  },
};
</script>
<style lang="scss">
.money-chart-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1%;
  height: 26%;
  > div {
    background-color: #fff;
    border-radius: 5px;
    height: 100%;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 19%;
    padding: 10px 20px;
    > div:first-child {
      text-align: center;
    }
    .title {
      font-size: 22px;
      color: #666;
    }
    .sub {
      color: #999;
      font-size: 15px;
      margin-top: 26%;
    }
    .money {
      font-weight: bold;
      color: #13a3ff;
      font-size: 38px;
    }
  }
  .chart-box {
    width: 48%;
    height: 90%;
    > div {
      height: 100%;
      width: 100%;
    }
  }
}
.report-chart-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1%;
  height: 68%;
  > div {
    background-color: #fff;
    height: 100%;
    border-radius: 7px;
    width: 49.3%;
    padding-top: 20px;
    position: relative;
    > div:first-child {
      width: 100%;
      height: 100%;
    }
    > span:nth-child(2) {
      position: absolute;
      left: 28px;
      font-size: 20px;
      top: 17px;
    }
    > div:last-child {
      position: absolute;
      right: 30px;
      top: 20px;
      border: 1px solid #eee;
      border-radius: 5px;
      > span {
        padding: 5px 18px;
        display: inline-block;
        cursor: pointer;
      }
      > span.active {
        background-color: #2e79ee;
        color: #fff;
        border-radius: 8px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.app-wrap{
  background-color: #f3f3f4;
}
.app-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.app-wrapper>div{
  height: 100%;
}
</style>
