import {
  axios
} from '@/utils/request';
import Vue from 'vue'
import echarts from 'echarts'

var indexMixin = {
  data() {
    return {
      loading: false,
      Urls: {
        listUrl: '',
        projectTotalUrl: '/ida/api/project/cityStatistics/',
        projectPaceUrl: '/ida/api/project/progressStatistics/',
        areaWarningUrl: '/ida/api/warning/history/statistics/'
      },
      projectTypeList: {
        angleData: [],
        seriesData: []
      },
      projectRadioList: {
        totalNum: 0,
        seriesData: []
      },
      unitTypeList: {
        xAxisData: [],
        inSeriesData: [],
        outSeriesData: [],
        totalSeriesData: []
      },
      handleData: {
        seriesData: 0
      },
      nohandleData: {
        seriesData: 0
      },
      paceDistrictNames: [],
      paceDistrictIds: [],
      projectPaceList: {
        districtNames: [],
        districtIds: [],
        pieAxisData: [],
        pieSeriesData: [],
        barSeriesData: []
      },
      inOutRadioList: {
        innerData: [{
            value: 100,
            unit: '个',
            name: '行业大类1'
          },
          {
            value: 100,
            unit: '个',
            name: '行业大类2'
          },
          {
            value: 250,
            unit: '个',
            name: '行业大类3'
          },
          {
            value: 250,
            unit: '个',
            name: '行业大类4'
          }
        ],
        outerData: [{
            value: 200,
            unit: '个',
            name: '谷歌'
          },
          {
            value: 500,
            unit: '个',
            name: '必应'
          }
        ]
      },
      warnColumns: [{
        title: '预警区县',
        dataIndex: 'name',
        align: 'center'
      }, {
        title: '最新预警',
        dataIndex: 'today',
        align: 'center'
      }, {
        title: '超期预警',
        dataIndex: 'delay',
        align: 'center'
      }, {
        title: '预警总计',
        dataIndex: 'all',
        align: 'center'
      }],
      warnData: [],

      contractColumns: [{
        title: '劳务合同',
        dataIndex: 'name',
        align: 'center'
      }, {
        title: '完成项目',
        dataIndex: 'finish',
        align: 'center'
      }, {
        title: '未完成项目',
        dataIndex: 'unFinish',
        align: 'center'
      }, {
        title: '已签人数',
        dataIndex: 'signed',
        align: 'center'
      }, {
        title: '未签人数',
        dataIndex: 'unSign',
        align: 'center'
      }],
      contractData: [{
        name: '合同情况',
        finish: '200',
        unFinish: '76',
        signed: '3471',
        unSign: '221'
      }],

      wagesColumns: [{
        title: '工资表',
        dataIndex: 'month',
        align: 'center'
      }, {
        title: '完成项目',
        dataIndex: 'finish',
        align: 'center'
      }, {
        title: '未完成项目',
        dataIndex: 'unFinish',
        align: 'center'
      }],
      wagesData: [{
        month: '1月份',
        newWarn: '2',
        overWarn: '5'
      }]
    }
  },
  filters: {},
  created() {
    this.getArea('520100', 'districtList')
    this.getAreaWarning('520100')
  },
  mounted() {
    this.$nextTick(() => {
      this.getProjectTotal('520100');
    })
  },
  methods: {
    afterGetArea() {
      this.projectPaceList.districtNames = this.districtList.map((item, index) => {
        this.projectPaceList.districtIds[index] = item.id
        return item.name
      })
      console.log('...', this.projectPaceList.districtNames, this.projectPaceList.districtIds)
    },
    getProjectTotal(cityId) {
      this.loading = true
      axios({
        url: this.Urls.projectTotalUrl + cityId,
        method: 'get'
      }).then(res => {
        this.loading = false
        if (res.code == 0) {
          // 项目类型分布
          let projectTypeData = res.data.typeList
          if (projectTypeData.length > 0) {
            let total = projectTypeData.reduce((sum, item, index) => {
              return sum + item.num
            }, 0)
            if (total > 0) {
              projectTypeData.map((item, index) => {
                this.projectTypeList.angleData[index] = item.name
                this.projectTypeList.seriesData[index] = {
                  name: item.name,
                  value: ((item.num) / total) * 100
                }
              })
            }
          }
          // 项目占比
          let projectRadioData = res.data.districtList
          if (projectRadioData.length > 0) {
            this.projectRadioList.totalNum = res.data.projectCount
            projectRadioData.map((item, index) => {
              this.projectRadioList.seriesData[index] = {
                name: item.name,
                value: item.num
              }
            })
          }
          // 企业类型分布
          let inUnitTypeData = res.data.inEnterpriseList
          let outUnitTypeData = res.data.outEnterpriseList
          if (inUnitTypeData.length > 0) {
            if (inUnitTypeData.length == outUnitTypeData.length) {
              inUnitTypeData.map((item, index) => {
                this.unitTypeList.xAxisData[index] = item.name
                this.unitTypeList.inSeriesData[index] = item.value
                this.unitTypeList.totalSeriesData[index] = item.value + outUnitTypeData[index].value
              })
            }
            outUnitTypeData.map((item, index) => {
              this.unitTypeList.outSeriesData[index] = item.value
            })
          }

          // 手续办理情况
          if (res.data.projectCount > 0) {
            this.handleData.seriesData = (res.data.handled) / (res.data.projectCount)
            this.nohandleData.seriesData = 1 - (this.handleData.seriesData)
          }
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },

    // 各区预警情况
    getAreaWarning(cityId) {
      axios({
        url: this.Urls.areaWarningUrl + cityId,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.warnData = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {})
    },
  }
};
export default indexMixin;