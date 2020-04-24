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
      default: '316px'
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
      let colorList = ['#975fe5', '#f2637b', '#fbd437', '#4ecb73', '#36cbcb', '#3aa1ff']
      // let colorList = ['#FF8700', '#ffc300', '#00e473', '#009DFF']
      let labelSereies = []
      seriesData.map((item, index) => {
        labelSereies[index] = {
          value: item.value,
          itemStyle: {
            normal: {
              color: colorList[index]
            }
          }
        }
      })
      this.chart.setOption({
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        angleAxis: {
          data: legendData,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ddd',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: '#333',
            fontSize: 14
          }
        },
        radiusAxis: {
          min: 0,
          max: 100,
          interval: 20,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#e8e8e8',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            formatter: '{value} %',
            show: true,
            padding: [0, 0, 20, 0],
            color: '#333',
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              color: '#e8e8e8',
              width: 1,
              type: 'solid'
            }
          }
        },
        polar: {},
        series: [
          {
            name: '项目类型分布',
            type: 'bar',
            data: labelSereies,
            coordinateSystem: 'polar'
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
