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
      this.chart.setOption({
        color: ['#975fe5', '#f2637b', '#fbd437', '#4ecb73', '#36cbcb', '#3aa1ff'],
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vartical',
          top: 'center',
          right: '20',
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 16,
          data: ['IDS', 'VPN', '交换机', '防火墙', 'WAF', '堡垒机']
        },
        polar: {},
        angleAxis: {
          interval: 1,
          type: 'category',
          data: [],
          z: 10,
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        radiusAxis: {
          min: 40,
          max: 120,
          interval: 20,
          axisLine: {
            show: false
          },
          axisLabel: {
            formatter: '{value} %',
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#e8e8e8',
              width: 1,
              type: 'solid'
            }
          }
        },
        calculable: true,
        series: [
          {
            type: 'pie',
            radius: ['90%', '91%'],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              {
                value: 0,
                itemStyle: {
                  normal: {
                    color: '#e8e8e8'
                  }
                }
              }
            ]
          },
          {
            type: 'pie',
            roseType: 'area',
            zlevel: 10,
            label: {
              normal: {
                show: true,
                formatter: '{c}',
                textStyle: {
                  fontSize: 12
                },
                position: 'outside'
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              {
                value: 10,
                name: 'IDS'
              },
              {
                value: 5,
                name: 'VPN'
              },
              {
                value: 15,
                name: '交换机'
              },
              {
                value: 25,
                name: '防火墙'
              },
              {
                value: 20,
                name: 'WAF'
              },
              {
                value: 35,
                name: '堡垒机'
              }
            ]
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
