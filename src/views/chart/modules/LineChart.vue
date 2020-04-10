<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
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
      default: '245px'
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
    this.initChart()
    if (this.chart) {
      this.chart.resize()
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions({ xAxisData, seriesOneData, seriesTwoData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        legend: {
          right: '6%',
          textStyle: {
            color: '#222',
            fontSize: 12
          },
          icon: 'circle',
          data: ['交易金额(万)', '交易项目(个)']
        },
        grid: {
          top: '15%',
          left: 0,
          right: '6%',
          bottom: 0,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            name: '季度',
            nameTextStyle: {
              color: '#222'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#222',
                fontSize: 12
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '交易数据',
            nameTextStyle: {
              color: '#222'
            },
            position: 'left',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#e8e8e8'
              }
            },
            axisLabel: {
              color: '#222',
              fontSize: 12
            }
          }
        ],
        series: [
          {
            name: '交易金额(万)',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#fcb400',
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(255,255,255,0.1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(251,179,0,0.6)'
                    }
                  ])
                }
              }
            },
            data: seriesOneData
          },
          {
            name: '交易项目(个)',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#31aafc',
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(255,255,255,0.1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(48,169,251,0.6)'
                    }
                  ])
                }
              }
            },
            data: seriesTwoData
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
