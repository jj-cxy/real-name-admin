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
    setOptions({ seriesOneData, seriesTwoData, seriesThreeData, seriesFourData, seriesFiveData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          right: '10px',
          y: 'center',
          orient: 'vertical',
          textStyle: {
            color: '#222' // 图例文字颜色
          },
          data: ['一次性支付', '按年支付', '按半年支付', '按季度支付', '其他方式']
        },
        grid: {
          left: '2px',
          right: '150px',
          top: '20px',
          bottom: '20px'
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false,
          data: ['企业法人', '自 然 人']
        },
        series: [
          {
            name: '一次性支付',
            type: 'bar',
            stack: '总量',
            barWidth: 40,
            itemStyle: {
              normal: {
                color: '#f2637b',
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 16,
                position: 'insideRight'
              }
            },
            z: 20,
            data: seriesOneData
          },
          {
            name: '按年支付',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#975fe5',
                shadowBlur: [0, 0, 0, 5],
                shadowColor: '#975fe5',
                barBorderRadius: [10, 10, 10, 10],
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 16,
                position: 'insideRight'
              }
            },
            z: 15,
            data: seriesTwoData
          },
          {
            name: '按半年支付',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10],
                color: '#3aa1ff',
                shadowBlur: [0, 0, 0, 5],
                shadowColor: '#3aa1ff',
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 16,
                position: 'insideRight'
              }
            },
            z: 10,
            data: seriesThreeData
          },
          {
            name: '按季度支付',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#36cbcb',
                shadowBlur: [0, 0, 0, 5],
                shadowColor: '#36cbcb',
                barBorderRadius: [10, 10, 10, 10],
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 16,
                position: 'insideRight'
              }
            },
            z: 5,
            data: seriesFourData
          },
          {
            name: '其他方式',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10],
                color: '#4ecb73',
                shadowBlur: [0, 0, 0, 5],
                shadowColor: '#4ecb73',
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 16,
                position: 'insideRight'
              }
            },
            data: seriesFiveData
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
