<template>
  <div :class="className" :style="{height:height,width:width,float:'right'}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import echartsLiquidfill from 'echarts-liquidfill'
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
      default: '50%'
    },
    height: {
      type: String,
      default: '350px'
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
    setOptions({ seriesData } = {}) {
      let data = [seriesData, seriesData, seriesData, seriesData]
      this.chart.setOption({
        title: {
          text: '未办理',
          left: 'center',
          top: '85%',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#222'
          }
        },
        series: [
          {
            type: 'liquidFill',
            radius: '80%',
            data: data,
            outline: {
              // show: false
              borderDistance: 5,
              itemStyle: {
                borderWidth: 8
              }
            },
            label: {
              normal: {
                color: '#41b7f9',
                insideColor: '#ffffff',
                fontSize: 50
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
