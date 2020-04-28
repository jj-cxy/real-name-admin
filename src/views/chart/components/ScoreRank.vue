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
    setOptions({} = {}) {
      var data1 = [20, 30, 20, 30, 20, 30, 20, 30, 20, 30]
      var data2 = [9, 30, 9, 60, 70, 20, 59, 20, 49, 20]
      var data3 = [20, 30, 20, 30, 20, 30, 20, 30, 20, 30]
      var data4 = [9, 30, 9, 60, 70, 20, 59, 20, 49, 20]
      var datacity = ['济南市', '青岛市', '淄博市', '枣庄', '东营', '烟台市', '潍坊市', '济宁市', '威海市', '泰安市']
      this.chart.setOption({
        color: ['#388BFF', '#05C3FA', '#F6931C', '#FFD52E'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '8%',
          data: ['存量', '新增', '拆除', '整改']
        },
        grid: {
          //图表的位置
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} '
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            show: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
              show: true,
              splitNumber: 15,
              textStyle: {
                fontSize: 12,
                color: '#000'
              }
            },
            data: datacity
          }
        ],
        series: [
          {
            name: '存量',
            type: 'bar',
            stack: 'sum',
            barWidth: '20px',
            data: data1
          },
          {
            name: '新增',
            type: 'bar',
            barWidth: '20px',
            stack: 'sum',
            data: data2
          },
          {
            name: '拆除',
            type: 'bar',
            color: '#F6931C',
            stack: 'sum1',
            barWidth: '20px',
            data: data3
          },
          {
            name: '整改',
            type: 'bar',
            color: '#FFD52E',
            stack: 'sum1',
            barWidth: '20px',
            data: data3
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
