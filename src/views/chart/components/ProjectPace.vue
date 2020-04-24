<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils/debounce.js'

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
      default: '220px'
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
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sider')[0]
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }
    const sidebarElm = document.getElementsByClassName('sider')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)
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
    setOptions({ legendData, seriesData } = {}) {
      let bgColor = '#fff'
      let title = '总量'
      let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0']
      let echartData = [
        {
          name: 'A类',
          value: '3720'
        },
        {
          name: 'B类',
          value: '2920'
        },
        {
          name: 'C类',
          value: '2200'
        },
        {
          name: 'D类',
          value: '1420'
        }
      ]

      let formatNumber = function(num) {
        let reg = /(?=(\B)(\d{3})+$)/g
        return num.toString().replace(reg, ',')
      }
      let total = echartData.reduce((a, b) => {
        return a + b.value * 1
      }, 0)
      this.chart.setOption({
        backgroundColor: bgColor,
        color: color,
        tooltip: {
            trigger: 'item'
        },
        title: [
          {
            text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
            top: 'center',
            left: 'center',
            textStyle: {
              rich: {
                name: {
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: '#666666',
                  padding: [10, 0]
                },
                val: {
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#333333'
                }
              }
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['75%', '90%'],
            center: ['50%', '50%'],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: bgColor,
                borderWidth: 2
              }
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 20,
                lineStyle: {
                  color: '#e6e6e6'
                }
              }
            },
            label: {
              normal: {
                formatter: params => {
                  return '{icon|●}{name|' + params.name + '}{value|' + formatNumber(params.value) + '}'
                },
                rich: {
                  icon: {
                    fontSize: 16
                  },
                  name: {
                    fontSize: 14,
                    padding: [0, 10, 0, 4],
                    color: '#666666'
                  },
                  value: {
                    fontSize: 14,
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
