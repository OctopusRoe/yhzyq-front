<template>
  <div>
    <v-chart style="width: 375px; height: 223px;" :option="options"></v-chart>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  computed: {
    options() {
      return  {
        title: {
          subtext: "km",
          left: 15,// 距离左边位置
          top: -10,// 距离上面位置
          subtextStyle:{ // 设置二级标题的样式
            color:"#B4D1D3"
          }
        },
        grid: {
          left: 15,
          top: 15,
          right: 15,
          bottom: 15,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['抚州管理中心', '赣州管理中心', '萍乡管理中心', '南昌西管理中心', '九江管理中心', '上饶管理中心', '南昌东管理中心'],
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
            data: [120, 200, 150, 80, 70, 110, 130],
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
