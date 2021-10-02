<template>
  <div class="container">
    <div class="top">
      <div class="logowrap">
        <div><img src="@/assets/image/logo.png" alt="" /></div>
        <h1 title="项目建设数字化管控平台">项目建设数字化管控平台</h1>
      </div>
      <div class="rmenu">
        <div class="menu">
          <div @click="goto">公司平台</div>
          <div class="active">项目平台</div>
          <div>智慧工地</div>
          <div>BIM中心</div>
          <div>OA协同</div>
        </div>
        <ul class="child-menu">
          <li class="active"><div>主页</div></li>
          <li><div>投资控制</div></li>
          <li><div>进度控制</div></li>
          <li><div>质量管控</div></li>
          <li><div>安全管控</div></li>
          <li><div>综合管理</div></li>
        </ul>
      </div>
      <div class="right">
        <span>当前项目</span>
        <v-select
          class="style-chooser"
          :options="[
            { type: '在建', title: '吉康高速项目' },
            { type: '完成', title: '吉康高速项目1' },
            { type: '拟建', title: '吉康高速项目2' },
          ]"
          label="title"
        >
          <template v-slot:option="option">
            <span
              v-if="option.type === '在建'"
              style="
                padding: 2px 3px;
                background: rgba(174, 63, 201, 0.2);
                color: rgb(174, 63, 201);
              "
              >{{ option.type }}</span
            >
            <span
              v-else-if="option.type === '完成'"
              style="
                padding: 2px 3px;
                background: rgba(69, 203, 151, 0.2);
                color: rgb(69, 203, 151);
              "
              >{{ option.type }}</span
            >
            <span
              v-else-if="option.type === '拟建'"
              style="
                padding: 2px 3px;
                background: rgba(240, 169, 58, 0.2);
                color: rgb(240, 169, 58);
              "
              >{{ option.type }}</span
            >
            {{ option.title }}
          </template>
        </v-select>
        <div class="msgcenter">
          <div>
            <img src="@/assets/image/icon-msg.png" alt="" />
          </div>
          <div>
            <img src="@/assets/image/avatar.png" alt="" />
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
            <div class="iTitle">
              <div>
                <img src="@/assets/image/gaikuang.png" alt="" /><span
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
              <img src="@/assets/image/resources1.png" alt="" />
              <img src="@/assets/image/resources2.png" alt="" />
              <img src="@/assets/image/resources3.png" alt="" />
              <img src="@/assets/image/resources4.png" alt="" />
              <img src="@/assets/image/resources5.png" alt="" />
            </div>
          </div>
          <div class="tzglBox">
            <div class="iTitle1">
              <div>
                <img src="@/assets/image/investment.png" alt="" /><span
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
                    <img src="@/assets/image/icon3.png" />
                    <div>大广-现场质量验收评定表单</div>
                    <div>2020-11-01</div>
                  </div>
                  <div>
                    <img src="@/assets/image/icon3.png" />
                    <div>大广-现场质量验收评定表单</div>
                    <div>2020-11-01</div>
                  </div>
                  <div>
                    <img src="@/assets/image/icon3.png" />
                    <div>大广-现场质量验收评定表单</div>
                    <div>2020-11-01</div>
                  </div>
                  <div>
                    <img src="@/assets/image/icon3.png" />
                    <div>大广-现场质量验收评定表单</div>
                    <div>2020-11-01</div>
                  </div>
                  <div>
                    <img src="@/assets/image/icon3.png" />
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
    <el-dialog title="修改密码" :visible.sync="updatePassDialog" width="30%">
      <div class="password-box">
        <div>
          <i>*</i><span>原密码:</span
          ><el-input
            v-model="oldPass"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </div>
        <div>
          <i>*</i><span>新密码:</span
          ><el-input
            v-model="newPass"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatePassDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="设置头像" :visible.sync="photoSetDialog" width="26%">
      <el-upload
        class="upload"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
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
      updatePassDialog: false,
      setShowFlag: false,
      oldPass: "",
      newPass: "",
      photoSetDialog: false,
    };
  },
  mounted() {
    this.tzglChart();
    this.zjbdtjChart();
    this.jltjzfChart();
    this.sjbgpfChart();
    this.autoScroll();
  },
  methods: {
    goto() {
      this.$router.push({ name: "home" });
    },
    autoScroll() {
      let mtop = 0;
      let pdom=document.getElementById("listWrap");
      let cdom=pdom.children[0];
      let fdom=cdom.cloneNode(true);
      let itemHeight=cdom.offsetHeight;
      console.log(itemHeight);
      pdom.appendChild(fdom);
      let flag=true;
      setInterval(function () {
        if(!flag)return;
        mtop--;
        if(Math.abs(mtop)>=itemHeight)mtop=0;
        pdom.style.marginTop = mtop + "px";
      }, 50);
      pdom.onmouseover=function(){
          flag=false;
      }
      pdom.onmouseout=function(){
          flag=true;
      }
    },
    tzglChart() {
      let chart = echarts.init(document.getElementById("tzglChart"));
      var myColor = ["#006af1", "#01a9f0", "#3fa967"];
      var colorList = ["#d6e6fd", "#d6f0fd", "#e0f1e7"];
      let option = {
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "5%",
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: true,
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
            data: ["概算", "建安", "计量"],
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
            show: true,
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
            xAxisIndex: 1,
            animation: false,
            itemStyle: {
              normal: {
                show: true,
                color: function (params) {
                  return colorList[params.dataIndex];
                },
                barBorderRadius: 0,
                borderWidth: 0,
                borderColor: "#333",
              },
            },
            barWidth: "30%",
            data: [33, 33, 33],
          },
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
            data: [8, 15, 10],
          },
        ],
      };
      chart.setOption(option);
    },
    zjbdtjChart() {
      let chart = echarts.init(document.getElementById("zjbdtjChart"));
      var data = [
        {
          name: "审批中",
          value: 335,
          icon: "rect",
        },
        {
          name: "已退回",
          value: 310,
          icon: "rect",
        },
        {
          name: "已通过",
          value: 234,
          icon: "rect",
        },
        {
          name: "未发起",
          value: 234,
          icon: "rect",
        },
      ];

      let getVlue = function (name) {
        var curData = null;
        curData = data.filter(function (item) {
          return item.name === name;
        });
        return curData && curData[0].value;
      };
      let option = {
        color: ["#3E84FF", "#3ED3FE", "#FFBA27", "#FF7BC3"],
        grid: {
          containLabel: true,
          left: "2%",
          right: "2%",
          bottom: "2%",
          top: "2%",
        },
        legend: {
          show: true,
          orient: "vertical",
          top: "30%",
          left: "75%",
          itemWidth: 8,
          itemHeight: 8,
          data: data,
          formatter: function (param) {
            return param + "{cusStyle|" + getVlue(param) + "}";
          },
          textStyle: {
            rich: {
              cusStyle: {
                fontSize: 12,
                padding: [0, 0, 0, 20],
              },
            },
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            symbol: "rect",
            symbolSize: [8, 8],

            data: data,
          },
        ],
      };
      chart.setOption(option);
    },
    jltjzfChart() {
      let chart = echarts.init(document.getElementById("jltjzfChart"));
      let option = {
        backgroundColor: "#fff",
        color: ["#298DFF", " #33CA66"],
        barWidth: 14,
        title: {
          // text: '世界人口总量',
          // subtext: '数据来自网络'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          // left: '0%',
          top: "-1%",
          x: "right", //可设定图例在左、右、居中
          icon: "circle",
          textStyle: {
            //图例文字的样式
            color: "#8C8C8C",
            fontSize: 12,
          },
          data: ["计量", "支付"],
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "0%",
          top: "12%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          splitLine: {
            show: false, // 去除网格线
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#BFBFBF", // 坐标线的颜色
              width: "1",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#595959", //坐标值的颜色
            },
            formatter: function (params) {
              var newParamsName = "";
              var paramsNameNumber = params.length; //总字数
              var provideNumber = 5; //一行显示几个字
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
          },
          boundaryGap: [0, 0.01],
          data: ["1月", "2月", "3月", "4月", "5月"],
        },
        yAxis: {
          type: "value",
          splitLine: {
            // show: false // 去除网格线
            lineStyle: {
              color: "#E8E8E8",
              type: "dashed", //设置间隔线为虚线
            },
          },
          axisTick: {
            show: false, //小横线
          },
          splitArea: {
            // show: true // 保留网格区域
          },
          axisLine: {
            show: false, // 去除纵向边框线
            lineStyle: {
              type: "solid",
              color: "#BFBFBF", // 坐标线的颜色
              width: "1",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#595959", //坐标值的颜色
            },
          },
        },
        series: [
          {
            name: "计量",
            type: "bar",
            barWidth: "30",
            label: {
              show: false,
              position: "right", // 位置
              color: "#298DFF",
              fontSize: 12,
              fontWeight: "normal", // 加粗
              distance: 5, // 距离
              offset: [0, 1], // 偏移距离[横向，纵向]
            }, // 柱子上方的数值
            data: [30, 40, 30, 22, 60],
          },
          {
            name: "支付",
            type: "bar",
            barWidth: "30",
            label: {
              show: false,
              position: "right", // 位置
              color: "#33CA66",
              fontSize: 12,
              fontWeight: "normal", // 加粗
              distance: 5, // 距离
              offset: [0, 2], // 偏移距离[横向，纵向]
            }, // 柱子右方的数值
            data: [20, 20, 20, 20, 10],
          },
        ],
      };
      chart.setOption(option);
    },
    sjbgpfChart() {
      let chart = echarts.init(document.getElementById("sjbgpfChart"));
      let option = {
        legend: {
          orient: "vertical",
          x: "right",
          left: "85%",
          top: "30%",
          data: ["已批复", "未批复"],
          textStyle: {
            color: "#000",
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "0%",
          top: "2%",
          containLabel: true,
        },
        series: [
          {
            type: "pie",
            radius: ["0", "80%"],
            center: ["50%", "50%"],
            color: ["#ed400b", "#55a4ee"],

            label: {
              normal: {
                formatter: "{b}:{c}次\n{d}%",
              },
            },
            data: [
              { value: 350, name: "已批复" },
              { value: 200, name: "未批复", selected: true },
            ],
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
@import "~@/assets/styles/index.scss";
* {
  font-size: 12px;
  box-sizing: border-box;
}
.top {
  background: url(~@/assets/image/headerBg.png);
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
  height: calc(100% - 94px);
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
<style  lang="scss" scoped>
.top {
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
}
.password-box {
  i {
    color: red;
  }
  span {
    color: #000;
  }
  > div {
    margin-bottom: 10px;
    > div {
      margin-left: 10px;
    }
    display: flex;
    white-space: nowrap;
    align-items: center;
  }
}
* {
  margin: 0;
  padding: 0;
}
.upload {
  text-align: center;
  > div {
    margin: 0 auto;
  }
}
</style>
