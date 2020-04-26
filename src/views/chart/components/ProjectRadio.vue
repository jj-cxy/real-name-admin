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
      default: '355px'
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
    setOptions({ seriesData } = {}) {
      this.chart.setOption({
        title: {
          text: '项目总数',
          subtext: '590个',
          x: 'center',
          y: '40%',
          textStyle: {
            fontSize: 14,
            color: '#777',
            lineHeight: 18
          },
          subtextStyle: {
            fontSize: 22,
            color: '#222'
          }
        },
        color: [
          '#37a2da',
          '#32c5e9',
          '#9fe6b8',
          '#ffdb5c',
          '#ff9f7f',
          '#fb7293',
          '#e7bcf3',
          '#8378ea',
          '#8d7fec',
          '#5085f2',
          '#e75fc3',
          '#f87be2',
          '#f2719a',
          '#fca4bb',
          '#f59a8f',
          '#fdb301',
          '#57e7ec',
          '#cf9ef1'
        ],
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            selectedMode: 'single',
            radius: ['40%', '75%'],
            label: {
              normal: {
                position: 'inner',
                formatter: '{d}%',
                textStyle: {
                  color: '#fff',
                  fontSize: 10
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: seriesData
          },
          {
            type: 'pie',
            radius: ['75%', '100%'],
            itemStyle: {
              normal: {
                color: '#f7fbff'
              },
              emphasis: {
                color: '#e9f1f9'
              }
            },
            label: {
              normal: {
                position: 'inner',
                formatter: '{c}个',
                textStyle: {
                  color: '#222',
                  fontSize: 12
                }
              }
            },
            data: seriesData
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
