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
      default: '280px'
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
    setOptions({ axiosData, localData, increaseData, descreaseData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#e8e8e8'
            }
          },
          backgroundColor: 'rgba(255,255,255,1)',
          padding: [5, 10],
          textStyle: {
            color: '#555'
          },
          extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        legend: {
          data: ['本市从业人员', '新增从业人员', '流出从业人员']
        },
        xAxis: {
          type: 'category',
          data: ['2017', '2018', '2019', '2020'],
          boundaryGap: false,
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
            margin: 10,
            textStyle: {
              color: '#222'
            }
          }
        },
        yAxis: {
          type: 'value',
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
            margin: 10,
            textStyle: {
              color: '#222'
            }
          }
        },
        series: [
          {
            name: '本市从业人员',
            type: 'line',
            smooth: false,
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            data: localData,
            itemStyle: {
              normal: {
                color: '#3aa1ff'
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            }
          },
          {
            name: '新增从业人员',
            type: 'line',
            smooth: false,
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            data: increaseData,
            itemStyle: {
              normal: {
                color: '#f2637b'
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            }
          },
          {
            name: '流出从业人员',
            type: 'line',
            smooth: false,
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            data: descreaseData,
            itemStyle: {
              normal: {
                color: '#975fe5'
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            }
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
