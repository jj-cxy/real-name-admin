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
      default: '330px'
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
    setOptions({ seriesOneData, seriesTwoData, seriesThreeData, seriesFourData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          left: '10px',
          y: 'center',
          orient: 'vertical',
          textStyle: {
            color: '#222'
          },
          data: ['1-2年', '3-5年', '6-10年', '其他租期']
        },
        grid: {
          left: '150px',
          right: '60px',
          top: '20px',
          bottom: '20px'
        },
        xAxis: {
          type: 'value',
          show: false,
          inverse: true
        },
        yAxis: {
          type: 'category',
          position: 'right',
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
          },
          data: ['企业法人', '自 然 人']
        },
        series: [
          {
            name: '1-2年',
            type: 'bar',
            stack: '总量',
            barWidth: 40,
            itemStyle: {
              normal: {
                color: '#f2637b',
                barBorderRadius: [10, 10, 10, 10],
                shadowColor: '#f2637b',
                shadowBlur: [5, 0, 0, 0],
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 16,
                position: 'insideLeft'
              }
            },
            data: seriesOneData
          },
          {
            name: '3-5年',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#975fe5',
                shadowBlur: [5, 0, 0, 0],
                shadowColor: '#975fe5',
                barBorderRadius: [10, 10, 10, 10],
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 16,
                position: 'insideLeft'
              }
            },
            z: 5,
            data: seriesTwoData
          },
          {
            name: '6-10年',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10],
                color: '#3aa1ff',
                shadowBlur: [5, 0, 0, 0],
                shadowColor: '#3aa1ff',
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 16,
                position: 'insideLeft'
              }
            },
            z: 15,
            data: seriesThreeData
          },
          {
            name: '其他租期',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#36cbcb',
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 16,
                position: 'insideLeft'
              }
            },
            z: 20,
            data: seriesFourData
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
