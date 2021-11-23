<template>
  <v-chart
    style="width: 100%; height: 100%"
    :option="options"
  />
</template>

<script>

export default {
  name: 'App',
  props: {
    nameList: {
      type: Array,
      default: () => []
    },
    valueList: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  computed: {
    options () {
      return {
        title: {
          subtext: "km",
          left: 15,// 距离左边位置
          top: -10,// 距离上面位置
          subtextStyle: { // 设置二级标题的样式
            color: "#B4D1D3"
          }
        },
        grid: {
          left: 15,
          top: 30,
          right: 15,
          bottom: 15,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.nameList,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 45,
            color: '#ACC6CE'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#086091'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#086091'
            }
          },
          axisLabel: {
            show: true,
            color: '#ACC6CE'
          }
        },
        series: [
          {
            data: this.valueList,
            type: 'bar',
            barWidth: 25,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#05F5FF', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#020D20', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }
          }
        ]
      }
    }
  }
}

</script>

<style>
</style>
