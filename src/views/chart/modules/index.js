import {
  axios
} from '@/utils/request';
import echarts from 'echarts'

var indexMixin = {
  data() {
    return {
      loading: false,
      Urls: {
        perjectBidUrl: '/biz/oaBidding/getTradingTotal',
        fourQuarterBidUrl: '/biz/oaBidding/getLastFourQuartersBidTrend',
        projectRentUrl: '/biz/oaAssets/getRentSituation'
      },
      lineChartData: {
        xAxisData: [],
        seriesOneData: [],
        seriesTwoData: []
      },
      leftBarChartData: {
        seriesOneData: [],
        seriesTwoData: [],
        seriesThreeData: [],
        seriesFourData: [],
      },
      rightBarChartData: {
        seriesOneData: [],
        seriesTwoData: [],
        seriesThreeData: [],
        seriesFourData: [],
        serieFiveData: [],
      },
      perject: {
        count: 0,
        amount: 0,
        percent: 0
      }
    }
  },
  filters: {
    totalFilter: function (value) {
      if (!value) return 0
      return (value.toFixed(2)) / 10000
    },
  },
  created() {
    this.getPerjectData()
  },
  mounted() {
    this.$nextTick(() => {
      this.getFourQuartersBidData();
      this.getProjectRentData();
    })
  },
  methods: {
    getPerjectData() {
      this.loading = true
      axios({
        url: this.Urls.perjectBidUrl,
        method: 'get'
      }).then(res => {
        this.loading = false
        if (res.code == 0) {
          this.perject = {
            count: res.data.bidProjectCount,
            amount: res.data.winBidAmountCount,
            percent: res.data.winBidAmountCompareToListPrice.replace("%", ""),
          }
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 四个季度交易数
    getFourQuartersBidData() {
      this.loading = true
      axios({
        url: this.Urls.fourQuarterBidUrl,
        method: 'get',
        params: {
          city: '贵阳市'
        }
      }).then(res => {
        this.loading = false
        if (res.code == 0) {
          res.data.map((item, index) => {
            this.lineChartData.xAxisData.push(item.yearAndQuarter);
            this.lineChartData.seriesOneData.push(item.amount || 0)
            this.lineChartData.seriesTwoData.push(item.count || 0)
          })
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 出租情况
    getProjectRentData() {
      this.loading = true
      axios({
        url: this.Urls.projectRentUrl,
        method: 'get',
        params: {
          city: '贵阳市'
        }
      }).then(res => {
        this.loading = false
        if (res.code == 0) {
          let lesseeArr = []
          res.data.map((item, index) => {

            // 左边
            if (item.lesseeNature == "CZFQY") {
              if (item.rentalLimit == "1-2") {
                this.leftBarChartData.seriesOneData.push(item.totalLesseeNatureCount)
              } else if (item.rentalLimit == "3-5") {
                this.leftBarChartData.seriesTwoData.push(item.totalLesseeNatureCount)
              } else if (item.rentalLimit == "6-10") {
                this.leftBarChartData.seriesThreeData.push(item.totalLesseeNatureCount)
              } else {
                this.leftBarChartData.seriesFourData.push(item.totalLesseeNatureCount)
              }
            }
            if (item.lesseeNature == "CZFGR") {
              if (item.rentalLimit == "1-2") {
                this.leftBarChartData.seriesOneData.push(item.totalLesseeNatureCount)
              } else if (item.rentalLimit == "3-5") {
                this.leftBarChartData.seriesTwoData.push(item.totalLesseeNatureCount)
              } else if (item.rentalLimit == "6-10") {
                this.leftBarChartData.seriesThreeData.push(item.totalLesseeNatureCount)
              } else {
                this.leftBarChartData.seriesFourData.push(item.totalLesseeNatureCount)
              }
            }

            // 右边
            if (item.lesseeNature == "CZFQY") {
              if (item.paymentMethod == "一次性支付") {
                this.rightBarChartData.seriesOneData.push(item.totalLesseeNatureCount)
              } else if (item.paymentMethod == "按年支付") {
                this.rightBarChartData.seriesTwoData.push(item.totalLesseeNatureCount)
              } else if (item.paymentMethod == "按半年支付") {
                this.rightBarChartData.seriesThreeData.push(item.totalLesseeNatureCount)
              } else if (item.paymentMethod == "按季度支付") {
                this.rightBarChartData.seriesFourData.push(item.totalLesseeNatureCount)
              } else {
                this.rightBarChartData.serieFiveData.push(item.totalLesseeNatureCount)
              }
            }
            if (item.lesseeNature == "CZFGR") {
              if (item.paymentMethod == "一次性支付") {
                this.rightBarChartData.seriesOneData.push(item.totalLesseeNatureCount)
              } else if (item.paymentMethod == "按年支付") {
                this.rightBarChartData.seriesTwoData.push(item.totalLesseeNatureCount)
              } else if (item.paymentMethod == "按半年支付") {
                this.rightBarChartData.seriesThreeData.push(item.totalLesseeNatureCount)
              } else if (item.paymentMethod == "按季度支付") {
                this.rightBarChartData.seriesFourData.push(item.totalLesseeNatureCount)
              } else {
                this.rightBarChartData.serieFiveData.push(item.totalLesseeNatureCount)
              }
            }
          })
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).finally(() => {
        this.loading = false
      })
    },
  }
};
export default indexMixin;