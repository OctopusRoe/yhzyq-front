<template>
  <div id="line">
    <v-chart :option="options" />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
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
  mounted () {
    const div = document.getElementById('line')
    console.log('%c 🍒 div.preatend: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', div.parentNode.clientWidth);
    console.log('%c 🥃 div.parentNode: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', div.parentNode.clientHeight);
    div.style.width = div.parentNode.clientWidth
    div.style.height = div.parentNode.clientHeight
  },
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
        backgroundColor: '#0a243D',
        grid: {
          left: 15,
          top: 30,
          right: 15,
          bottom: 15,
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#086091'
            }
          },
          axisLabel: {
            color: '#d1e6eb',
            margin: 15,
          },
          axisTick: {
            show: false,
          },
          data: this.nameList
        }],
        yAxis: [{
          type: 'value',
          min: 0,
          splitNumber: 7,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0a3256',
              type: 'dashed'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#0a3256'
            }
          },
          axisLabel: {
            margin: 20,
            color: '#d1e6eb'
          },
          axisTick: {
            show: false,
          },
        }],
        series: [{
          type: 'line',
          smooth: false,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 6,
          lineStyle: {
            color: "#28ffb3", // 线条颜色
            borderColor: '#f0f'
          },
          label: {
            show: true,
            position: 'top',
            color: '#fff'
          },
          itemStyle: {
            color: "#28ffb3",
          },
          tooltip: {
            show: false
          },
          areaStyle: { //区域填充样式
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0,154,120,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0,0,0, 0)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
          data: this.valueList
        }
        ]
      }
    }
  }
}

</script>

<style>
</style>
