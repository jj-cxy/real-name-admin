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
      default: '576px'
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
    setOptions({ legendData, seriesData } = {}) {
      var dataMap = {}
      function dataFormatter(obj) {
        var pList = ['在建', '停工', '完工', '竣工']
        var temp
        for (var year = 1; year <= 5; year++) {
          var max = 0
          var sum = 0
          temp = obj[year]
          for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i])
            sum += temp[i]
            obj[year][i] = {
              name: pList[i],
              value: temp[i]
            }
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100
          obj[year + 'sum'] = sum
        }
        return obj
      }
      dataMap.data = dataFormatter({
        1: [55, 25, 15, 30],
        2: [30, 55, 25, 15],
        3: [15, 30, 55, 25],
        4: [25, 15, 30, 55],
        5: [25, 30, 55, 15]
      })
      dataMap.dataGD = dataFormatter({
        1: [55],
        2: [30],
        3: [15],
        4: [25],
        5: [25]
      })
      dataMap.dataHN = dataFormatter({
        1: [25],
        2: [55],
        3: [30],
        4: [15],
        5: [30]
      })
      dataMap.dataHB = dataFormatter({
        1: [15],
        2: [25],
        3: [55],
        4: [30],
        5: [55]
      })
      dataMap.dataSX = dataFormatter({
        1: [30],
        2: [15],
        3: [25],
        4: [55],
        5: [15]
      })
      this.chart.setOption({
        baseOption: {
          timeline: {
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 1000,
            controlStyle: {
              position: 'left'
            },
            symbolSize: 8,
            lineStyle: {
              color: '#666'
            },
            bottom: 0,
            left: 20,
            right: 20,
            data: [
              '贵阳市',
              '云岩区',
              '南明区',
              '观山湖',
              '白云区',
              '乌当区',
              '花溪区',
              '双龙镇',
              '经开区',
              '综保区',
              '高新区',
              '清镇市',
              '息烽县',
              '开阳县',
              '修文县'
            ]
          },
          title: [
            {
              text: '本地区项目进度',
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
            bottom: 60,
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
              data: ['在建', '停工', '完工', '竣工'],
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
        options: [
          {
            series: [
              {
                data: dataMap.data['1']
              },
              {
                data: [
                  {
                    name: '在建',
                    value: dataMap.dataGD['1sum']
                  },
                  {
                    name: '停工',
                    value: dataMap.dataHN['1sum']
                  },
                  {
                    name: '完工',
                    value: dataMap.dataHB['1sum']
                  },
                  {
                    name: '竣工',
                    value: dataMap.dataSX['1sum']
                  }
                ]
              }
            ]
          },
          {
            series: [
              {
                data: dataMap.data['2']
              },
              {
                data: [
                  {
                    name: '在建',
                    value: dataMap.dataGD['2sum']
                  },
                  {
                    name: '停工',
                    value: dataMap.dataHN['2sum']
                  },
                  {
                    name: '完工',
                    value: dataMap.dataHB['2sum']
                  },
                  {
                    name: '竣工',
                    value: dataMap.dataSX['2sum']
                  }
                ]
              }
            ]
          },
          {
            series: [
              {
                data: dataMap.data['3']
              },
              {
                data: [
                  {
                    name: '在建',
                    value: dataMap.dataGD['3sum']
                  },
                  {
                    name: '停工',
                    value: dataMap.dataHN['3sum']
                  },
                  {
                    name: '完工',
                    value: dataMap.dataHB['3sum']
                  },
                  {
                    name: '竣工',
                    value: dataMap.dataSX['3sum']
                  }
                ]
              }
            ]
          },
          {
            series: [
              {
                data: dataMap.data['4']
              },
              {
                data: [
                  {
                    name: '在建',
                    value: dataMap.dataGD['4sum']
                  },
                  {
                    name: '停工',
                    value: dataMap.dataHN['4sum']
                  },
                  {
                    name: '完工',
                    value: dataMap.dataHB['4sum']
                  },
                  {
                    name: '竣工',
                    value: dataMap.dataSX['4sum']
                  }
                ]
              }
            ]
          },
          {
            series: [
              {
                data: dataMap.data['5']
              },
              {
                data: [
                  {
                    name: '在建',
                    value: dataMap.dataGD['5sum']
                  },
                  {
                    name: '停工',
                    value: dataMap.dataHN['5sum']
                  },
                  {
                    name: '完工',
                    value: dataMap.dataHB['5sum']
                  },
                  {
                    name: '竣工',
                    value: dataMap.dataSX['5sum']
                  }
                ]
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
