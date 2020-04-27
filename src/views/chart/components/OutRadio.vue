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
    setOptions({ innerData, outerData } = {}) {
      let innerFontColor = '#FFFFFF'
      let outerFontColor = '#666666'
      let scale = 1
      let echartData = {
        inner: innerData,
        outer: outerData
      }

      let legend1 = echartData.inner.map(v => v.name)
      let legend2 = echartData.outer.map(v => v.name)
      let legendData = [...legend1, ...legend2]
      this.chart.setOption({
        color: ['#ff9f7f', '#fb7293', '#5085f2', '#32c5e9', '#ef5656', '#1890FF'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '从业人员',
            type: 'pie',
            radius: [0, '65%'],
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            label: {
              normal: {
                position: 'inner',
                formatter: params => {
                  return params.value
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: echartData.inner
          },
          {
            name: '从业人员',
            type: 'pie',
            radius: ['75%', '90%'],
            data: echartData.outer,
            labelLine: {
              normal: {
                length: 20,
                length2: 140,
                lineStyle: {
                  color: '#e6e6e6'
                }
              }
            },
            label: {
              normal: {
                formatter: params => {
                  return (
                    '{icon|●}{name|' +
                    params.name +
                    '}{percent|' +
                    params.percent.toFixed(1) +
                    '%}{value|' +
                    params.value +
                    '}'
                  )
                },
                padding: [0, -130, 25, -130],
                rich: {
                  color: '#333',
                  icon: {
                    fontSize: 16
                  },
                  name: {
                    fontSize: 14,
                    padding: [0, 5, 0, 5],
                    color: '#666666'
                  },
                  percent: {
                    color: '#333',
                    padding: [0, 5, 0, 0]
                  },
                  value: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#333333'
                  }
                }
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
