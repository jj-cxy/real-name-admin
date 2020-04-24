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
    setOptions({} = {}) {
      this.chart.setOption({
        backgroundColor:'#ffffff',
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                color: '#fafafa'
            }

        },
        grid: {
            top: 40,
            bottom: 35,
        },
        title: {
            text: '',
            subtext: ''
        },
        legend: {
            data: ['本省企业' , '外省企业']
        },

        calculable: true,
        xAxis: [{
            type: 'category',
            data: ['建设单位', '施工单位', '监理单位', '设计单位', '勘察单位']
        }],
        yAxis: [{
            type: 'value'
        }],

        series: [
            {
                name: '本省企业',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        color: '#05BFF1'
                    }
                },
                data: [127, 73, 70, 22, 17]
            },
            {
                name: '外省企业',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        color: '#FF6347'
                    }
                },
                data: [85, 67, 84, 30, 30]
            },{
                "name": "总数",
                "type": "line",
                "stack": "总量",
                symbolSize:10,
                symbol:'circle',
                "itemStyle": {
                    "normal": {
                        "barBorderRadius": 0,
                        "label": {
                            "show": true,
                            "position": "top",
                        }
                    }
                },
                "data": [212, 140, 154, 52, 47]
            },


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
