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
      default: '400px'
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
  watch: {},
  methods: {
    setOptions({ totalNum, seriesData } = {}) {
      this.chart.setOption({
        title: {
          text: '项目总数',
          subtext: `${totalNum}个`,
          x: 'center',
          y: '44%',
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
            radius: ['35%', '65%'],
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
            radius: ['65%', '90%'],
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

      // 自动高亮切换
      let seriesLength = seriesData.length
      if (seriesLength > 0) {
        this.timerAuto(this.chart, seriesLength)
      }
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
