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
    setOptions({ total, seriesData } = {}) {
      this.chart.setOption({
        title: {
          text: '工种',
          subtext: `共${total}个`,
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
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
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
        series: [
          {
            type: 'pie',
            selectedMode: 'single',
            radius: ['50%', '85%'],

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
          }
        ]
      })

      // 自动高亮切换
      let seriesLength = seriesData.length
      this.timerAuto(this.chart, seriesLength)
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    timerAuto(chart, length) {
      let _this = this
      let index = 0
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0
      })
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 0
      })
      _this.timer = setInterval(() => {
        chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        })
        index = (index + 1) % length
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
      }, 6000)
    }
  }
}
</script>
