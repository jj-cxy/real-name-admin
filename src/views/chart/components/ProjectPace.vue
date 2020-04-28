<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { axios } from '@/utils/request'

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
      default: '625px'
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
      chart: null,
      Urls: {
        byIdUrl: '/ida/api/project/progressStatistics/'
      }
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
    setOptions({ districtNames, districtIds } = {}) {
      let optionsData = [],
        pieAxisData = [],
        pieSeriesData = [],
        barSeriesData = []
      districtIds.map((item, index) => {
        optionsData[index] = {
          series: [{ data: pieSeriesData }, { data: barSeriesData }]
        }
      })
      let option = {
        baseOption: {
          timeline: {
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 6000,
            controlStyle: {
              position: 'left'
            },
            symbolSize: 8,
            lineStyle: {
              color: '#666'
            },
            checkpointStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            controlStyle: {
              showNextBtn: true,
              showPrevBtn: true,
              normal: {
                color: '#666',
                borderColor: '#666'
              },
              emphasis: {
                color: '#aaa',
                borderColor: '#aaa'
              }
            },
            bottom: 20,
            left: 20,
            right: 20,
            data: districtNames,
            label: {
              interval: 0
            }
          },
          title: [
            {
              text: `本地区项目进度`,
              left: 'center',
              top: '20%',
              padding: [24, 0],
              textStyle: {
                fontSize: 16,
                align: 'center',
                color: '#222'
              }
            }
          ],
          calculable: true,
          grid: {
            top: '50%',
            bottom: 80,
            left: 20,
            right: 20,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: ['#975fe5', '#f2637b', '#fbd437', '#4ecb73', '#36cbcb', '#3aa1ff'],
          xAxis: [
            {
              type: 'value',
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#e8e8e8'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#222'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: pieAxisData,
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#e8e8e8'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#222'
                }
              }
            }
          ],
          series: [
            {
              name: '项目',
              type: 'bar',
              barMaxWidth: 15,
              barGap: 0,
              itemStyle: {
                normal: {
                  color: function(params) {
                    //展示正值的柱子，负数设为透明
                    let colorArr = params.value > 0 ? ['#FFD119', '#FFAC4C'] : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']
                    return new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: colorArr[0] // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: colorArr[1] // 100% 处的颜色
                        }
                      ],
                      false
                    )
                  },
                  barBorderRadius: 30
                }
              }
            },
            {
              type: 'pie',
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  formatter: '{b} : {c} ({d}%)'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '15',
                    fontWeight: 'normal'
                  }
                }
              },
              radius: ['30%', '40%'],
              center: ['50%', '25%']
            }
          ]
        },
        options: optionsData
      }

      let _this = this
      function getTimeLineData(index) {
        option.baseOption.title[0].text = districtNames[index] + '项目进度'
        axios({
          url: _this.Urls.byIdUrl + districtIds[index],
          method: 'get'
        })
          .then(res => {
            if (res.code == 0) {
              let resData = res.data
              if (resData.length > 0) {
                resData.map((item, index) => {
                  pieAxisData[index] = item.name
                  pieSeriesData[index] = item.num
                  barSeriesData[index] = {
                    name: item.name,
                    value: item.num
                  }
                })
              }
              _this.chart.setOption(option)
            } else {
              _this.$notification.error({
                message: res.msg
              })
            }
          })
          .catch(() => {})
      }

      getTimeLineData(0)
      this.chart.on('timelinechanged', (params, param) => {
        getTimeLineData(params.currentIndex)
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
