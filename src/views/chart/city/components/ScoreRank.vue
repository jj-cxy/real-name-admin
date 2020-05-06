<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions({ xAxisData, scoreData, totalData, todayData, delayData } = {}) {
      this.chart.setOption({
        color: ['#f2637b', '#fbd437', '#4ecb73', '#36cbcb', '#3aa1ff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#e8e8e8'
            }
          }
        },
        legend: {
          top: '8%',
          data: ['预警总计', '最新预警', '超期预警']
        },
        grid: {
          //图表的位置
          top: '30%',
          left: '3%',
          right: '4%',
          bottom: 0,
          containLabel: true
        },
        yAxis: [
          {
            type: 'value',
            position: 'right',
            name: '数量',
            nameTextStyle: {
              color: '#222'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: '{value}',
              textStyle: {
                color: '#222'
              }
            }
          }
        ],
        xAxis: [
          {
            type: 'category',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#e8e8e8'
              }
            },
            axisLabel: {
              interval: 0,
              show: true,
              splitNumber: 15,
              textStyle: {
                fontSize: 12,
                color: '#222'
              }
            },
            data: xAxisData
          }
        ],
        series: [
          {
            name: '预警总计',
            type: 'bar',
            barWidth: 15,
            data: totalData
          },
          {
            name: '最新预警',
            type: 'bar',
            stack: 'sum',
            barWidth: 15,
            data: todayData
          },
          {
            name: '超期预警',
            type: 'bar',
            stack: 'sum',
            barWidth: 15,
            data: delayData
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
