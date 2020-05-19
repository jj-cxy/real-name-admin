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
        projectTotalUrl: '/ida/api/project/cityStatistics/',
        areaWarningUrl: '/ida/api/warning/history/statistics/',
        personTotalUrl: '/ida/api/person/city/statistics/',
        warnNumModalUrl: '/ida/api/warning/history/query',
        projectContractUrl: '/ida/api/person/city/statistics/contract/'
      },
      projectCount: {
        total: 0,
        construct: 0,
        complete: 0
      },
      punchCount: {
        today: 0,
        out: 0,
        in: 0
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
        districtIds: []
      },
      warnColumns: [{
        title: '预警区县',
        dataIndex: 'name',
        align: 'center'
      }, {
        title: '最新预警',
        dataIndex: 'today',
        align: 'center',
        scopedSlots: {
          customRender: 'today'
        }
      }, {
        title: '超期预警',
        dataIndex: 'delay',
        align: 'center',
        scopedSlots: {
          customRender: 'delay'
        }
      }, {
        title: '预警总计',
        dataIndex: 'all',
        align: 'center',
        scopedSlots: {
          customRender: 'all'
        }
      }],
      warnData: [],
      warnTotal: 0,
      warnVisible: false,
      warnModal: [],
      warnTitle: '',
      warnScoreData: {
        xAxisData: [],
        scoreData: [],
        totalData: [],
        todayData: [],
        delayData: []
      },
      contractColumns: [{
        title: '劳务合同',
        dataIndex: 'name',
        align: 'center',
        customRender: (text, record, index) => `合同情况`
      }, {
        title: '完成项目',
        dataIndex: 'complete',
        align: 'center'
      }, {
        title: '未完成项目',
        dataIndex: 'Uncomplete',
        align: 'center'
      }, {
        title: '已签人数',
        dataIndex: 'signed',
        align: 'center'
      }, {
        title: '未签人数',
        dataIndex: 'noSigned',
        align: 'center'
      }],
      contractData: [{
        name: '合同情况',
        complete: '0',
        Uncomplete: '0',
        signed: '0',
        noSigned: '0'
      }],

      // person
      personCount: {
        total: 0,
        manager: 0,
        worker: 0
      },
      qaCount: {
        handleManager: 0,
        noHandleManager: 0,
        handleWorker: 0,
        noHandleWorker: 0
      },

      inOutRadioList: {
        innerData: [{
            value: 0,
            name: '流出劳务人员'
          },
          {
            value: 0,
            name: '流出管理人员'
          },
          {
            value: 0,
            name: '稳定劳务人员'
          },
          {
            value: 0,
            name: '稳定管理人员'
          }
        ],
        outerData: [{
            value: 0,
            unit: '人',
            name: '流出'
          },
          {
            value: 0,
            unit: '人',
            name: '稳定'
          }
        ]
      },
      outNumData: {
        axiosData: [],
        localData: [],
        increaseData: [],
        descreaseData: []
      },
      workerTypeList: {
        total: 0,
        seriesData: []
      },
      wagesColumns: [{
        title: '工资表',
        dataIndex: 'month',
        align: 'center'
      }, {
        title: '完成项目',
        dataIndex: 'complete',
        align: 'center'
      }, {
        title: '未完成项目',
        dataIndex: 'Uncomplete',
        align: 'center'
      }],
      wagesData: [],
      websock: null
    }
  },
  filters: {
    percentFilter: function (value, total) {
      if (!total) return 0
      return ((value / total) * 100).toFixed(1)
    }
  },
  created() {
    this.getArea(this.areaId, 'districtList')
    this.getAreaWarning(this.areaId)

    this.getProjectTotal(this.areaId);
    this.getPersonTotal(this.areaId);
    this.getProjectContract(this.areaId);
    this.initPunchSocket();
  },
  mounted() {},
  destroyed() {
    this.websock.close() //离开路由之后断开websocket连接
  },
  methods: {
    afterGetArea() {
      this.projectPaceList.districtNames = this.districtList.map((item, index) => {
        this.projectPaceList.districtIds[index] = item.id
        return item.name
      })
    },
    // 项目数据
    getProjectTotal(cityId) {
      this.loading = true
      axios({
        url: this.Urls.projectTotalUrl + cityId,
        method: 'get'
      }).then(res => {
        this.loading = false
        if (res.code == 0) {
          // 项目统计
          this.projectCount = {
            total: res.data.projectCount,
            construct: res.data.constructCount,
            complete: res.data.completeCount,
          }
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
          if (res.data.length > 0) {
            this.warnTotal = res.data.reduce((pre, cur, index) => {
              return pre + cur.all
            }, 0)

            // 得分排名
            let scoreArr = res.data
            scoreArr.sort(function (a, b) {
              return a.score - b.score;
            })
            scoreArr.map((item, index) => {
              this.warnScoreData.xAxisData[index] = item.name
              this.warnScoreData.scoreData[index] = item.score
              this.warnScoreData.totalData[index] = item.all
              this.warnScoreData.todayData[index] = item.today
              this.warnScoreData.delayData[index] = item.delay
            })
          }
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {})
    },

    // 人员数据
    getPersonTotal(cityId) {
      axios({
        url: this.Urls.personTotalUrl + cityId,
        method: 'post'
      }).then(res => {
        if (res.code == 0) {
          let resData = res.data
          // 总数
          this.personCount = {
            total: resData.total,
            manager: resData.managerCount,
            worker: resData.workerCount
          }
          this.qaCount = {
            handleManager: resData.managerQaCount,
            noHandleManager: resData.managerNoneQaCount,
            handleWorker: resData.workerQaCount,
            noHandleWorker: resData.workerNoneQaCount
          }
          // 工种
          this.workerTypeList.total = resData.workTypeCount
          let workTypeData = res.data.workTypeCounts
          if (workTypeData.length > 0) {
            workTypeData.map((item, index) => {
              this.workerTypeList.seriesData[index] = {
                name: item.name,
                value: item.count
              }
            })
          }

          // 从业人员流动占比
          this.inOutRadioList.innerData[0].value = resData.workerMigrantCount
          this.inOutRadioList.innerData[1].value = resData.managerMigrantCount
          this.inOutRadioList.innerData[2].value = resData.workerLocalCount
          this.inOutRadioList.innerData[3].value = resData.managerLocalCount
          this.inOutRadioList.outerData[0].value = resData.workerMigrantCount + resData.managerMigrantCount
          this.inOutRadioList.outerData[1].value = resData.workerLocalCount + resData.managerLocalCount

          // 从业人员数量
          if (resData.personByYearCounts.length > 0) {
            resData.personByYearCounts.map((item, index) => {
              this.outNumData.axiosData[index] = item.year
              this.outNumData.localData[index] = item.count
            })
            resData.personIncreasedCounts.map((item, index) => {
              this.outNumData.increaseData[index] = item.count
            })
            resData.personDecreasedCounts.map((item, index) => {
              this.outNumData.descreaseData[index] = item.count
            })
          }
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {})
    },

    // 劳务合同
    getProjectContract(cityId) {
      axios({
        url: this.Urls.projectContractUrl + cityId,
        method: 'post'
      }).then(res => {
        if (res.code == 0) {
          this.contractData = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {})
    },
    // 警告弹框
    handleWarnModal(record, title, cur) {
      console.log(title, cur)
      if (!cur) {
        return
      }
      this.getWarnModalNum(record.id, title)
    },
    onWarnClose() {
      this.warnVisible = false
    },
    getWarnModalNum(id, title) {
      axios({
        url: this.Urls.warnNumModalUrl,
        method: 'post',
        data: {
          districtId: id
        }
      }).then(res => {
        if (res.code == 0) {
          this.warnVisible = true
          this.warnModal = res.data.records
          this.warnTitle = `${title}${res.data.records.length}条`
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {
        this.warnVisible = true
      })
    },
    // 考勤数据 websocket
    initPunchSocket() {
      const wsuri = this.wsHost + "/ida/ws/punch/" + this.userId;
      this.websock = new WebSocket(wsuri);

      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() { //连接建立之后执行send方法发送数据
      console.log('连接完成')
      let actions = {
        "areaId": this.areaId
      };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() { //连接建立失败重连
      this.initPunchSocket();
    },
    websocketonmessage(e) { //数据接收
      const resData = JSON.parse(e.data);
      this.punchCount = {
        today: resData[0].present,
        out: resData[0].exit,
        in: resData[0].entry
      }
    },
    websocketsend(Data) { //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) { //关闭
      console.log('断开连接');
    },
  }
};
export default indexMixin;