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
    setOptions({ xAxisData, inSeriesData, outSeriesData, totalSeriesData } = {}) {
      this.chart.setOption({
        backgroundColor: '#ffffff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            color: '#fafafa'
          }
        },
        grid: {
          top: 40,
          bottom: 35
        },
        title: {
          text: '',
          subtext: ''
        },
        legend: {
          data: ['本省企业', '外省企业']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#e8e8e8'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#222'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#e8e8e8'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#222'
              }
            }
          }
        ],
        series: [
          {
            name: '本省企业',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside'
                },
                color: '#05BFF1'
              }
            },
            data: inSeriesData
          },
          {
            name: '外省企业',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside'
                },
                color: '#FF6347'
              }
            },
            data: outSeriesData
          },
          {
            name: '总数',
            type: 'line',
            stack: '总量',
            symbolSize: 6,
            symbol: 'circle',
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top'
                }
              }
            },
            data: totalSeriesData
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
