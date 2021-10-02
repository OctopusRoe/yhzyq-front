<template>
<div class="content" >
      <div class="m">
        <div class="leftbox">
          <div>
            <div class="iTitle">
              <div>
                <img src="../assets/image/gaikuang.png" alt="" /><span
                  >项目概况</span
                >
              </div>
              <div>
                <div>离竣工</div>
                <div class="dateTime">0</div>
                <div class="dateTime">0</div>
                <div class="dateTime">0</div>
                <div class="dateTime">0</div>
                <div>天</div>
              </div>
            </div>
            <div class="iList">
              <div>项目名称：测试建成高速</div>
              <div>项目工期： ***</div>
              <div>当前进度： ***</div>
              <div>项目状态：建成</div>
              <div>标段数量：0个</div>
            </div>
            <div class="picbox">
              <img src="../assets/image/resources1.png" alt="" />
              <img src="../assets/image/resources2.png" alt="" />
              <img src="../assets/image/resources3.png" alt="" />
              <img src="../assets/image/resources4.png" alt="" />
              <img src="../assets/image/resources5.png" alt="" />
            </div>
          </div>
          <div class="tzglBox">
            <div class="iTitle1">
              <div>
                <img src="../assets/image/investment.png" alt="" /><span
                  >投资管理</span
                >
              </div>
              <div>单位:亿元</div>
            </div>
            <div class="chart-box">
              <div id="tzglChart"></div>
            </div>
          </div>
          <div class="wdrwBox">
            <div class="iTitle1">
              <div>
                <span>我的任务</span>
              </div>
            </div>
            <div class="wdrw-listbox">
              <div class="listWrap" id="listWrap">
                <div class="list">
                  <div>
                    <img src="../assets/image/icon3.png" />
                    <div>大广-现场质量验收评定表单</div>
                    <div>2020-11-01</div>
                  </div>
                  <div>
                    <img src="../assets/image/icon3.png" />
                    <div>大广-现场质量验收评定表单</div>
                    <div>2020-11-01</div>
                  </div>
                  <div>
                    <img src="../assets/image/icon3.png" />
                    <div>大广-现场质量验收评定表单</div>
                    <div>2020-11-01</div>
                  </div>
                  <div>
                    <img src="../assets/image/icon3.png" />
                    <div>大广-现场质量验收评定表单</div>
                    <div>2020-11-01</div>
                  </div>
                  <div>
                    <img src="../assets/image/icon3.png" />
                    <div>大广-现场质量验收评定表单</div>
                    <div>2020-11-01</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mapbox">
          <div id="bigmap"></div>
        </div>
        <div class="rightbox">
          <div class="zjbdtjBox">
            <div class="iTitle1">
              <div>
                <span>质检表单统计</span>
              </div>
            </div>
            <div class="chart-box">
              <div id="zjbdtjChart"></div>
            </div>
          </div>
          <div class="jltjzfBox">
            <div class="iTitle1">
              <div>
                <span>计量统计支付</span>
              </div>
              <div>单位:亿元</div>
            </div>
            <div class="chart-box">
              <div id="jltjzfChart"></div>
            </div>
          </div>
          <div class="sjbgpfBox">
            <div class="iTitle1">
              <div>
                <span>设计变更批复</span>
              </div>
            </div>
            <div class="chart-box">
              <div id="sjbgpfChart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}


.leftbox,
.rightbox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25%;
  box-shadow: 0 0 5px 5px #fff;
  > div {
    height: 27vh;
    padding-left: 1vw;
    background-color: #fff;
  }
}
.container {
  height: 100%;
}
.content {
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #fafaff;
  .m {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 2vh;
    > div {
      height: 100%;
    }
  }
}
.iTitle {
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
  padding-top: 2vh;
  > div:first-child {
    img {
      width: 1vw;
      margin-right: 5px;
    }
    > * {
      vertical-align: middle;
    }
    span {
      font-weight: bold;
      font-size: 14px;
    }
  }
  > div:last-child {
    margin-left: 20%;
    display: flex;
    align-items: flex-end;
    .dateTime {
      width: 2vw;
      height: 2vw;
      border: 1px solid #6460f8;
      margin: 0 3px 0;
      font-size: 22px;
      text-align: center;
    }
  }
}
.iTitle1 {
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
  padding-top: 2vh;
  justify-content: space-between;
  padding-right: 3vh;
  > div:first-child {
    img {
      width: 1vw;
      margin-right: 5px;
    }
    > * {
      vertical-align: middle;
    }
    span {
      font-weight: bold;
      font-size: 14px;
    }
  }
}
.iList {
  text-align: left;
  margin-top: 1vh;
  > div {
    line-height: 3vh;
  }
  * {
    font-size: 14px;
  }
}
.picbox {
  display: flex;
  justify-content: space-between;
  padding: 1vh 2vw;
  border-top: 1px solid #ccc;
  margin: 1vh 1vh 0 1vh;
  img {
    width: 2vh;
    height: auto;
  }
}
.tzglBox {
  .chart-box {
    height: 20vh;
    > div {
      width: 100%;
      height: 100%;
    }
  }
}
.wdrwBox {
  .wdrw-listbox {
    height: 20vh;
    overflow: hidden;
    position: relative;
  }
  .listWrap {
    position: absolute;
    width: 100%;
    > div > div {
      display: flex;
      align-items: center;
      padding-right: 20px;
      line-height: 4vh;
      img {
        width: 1.6vh;
      }
      > div:nth-child(2) {
        flex-grow: 1;
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
}
.zjbdtjBox {
  .chart-box {
    height: 20vh;
    > div {
      height: 100%;
      width: 100%;
    }
  }
}
.jltjzfBox {
  .chart-box {
    height: 20vh;
    > div {
      height: 100%;
      width: 100%;
    }
  }
}
.sjbgpfBox {
  .chart-box {
    height: 20vh;
    > div {
      height: 100%;
      width: 100%;
    }
  }
}
.mapbox {
  height: 100%;
  flex-grow: 0.97;
  > div {
    width: 100%;
    height: 100%;
  }
}
.style-chooser {
  width: 200px;
}

</style>
