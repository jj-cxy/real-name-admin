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
        projectTotalUrl: '/ida/api/project/districtStatistics/',
        areaWarningUrl: '/ida/api/warning/history/statistics/',
        personTotalUrl: '/ida/api/person/district/statistics/',
        warnNumModalUrl: '/ida/api/warning/history/query',
        projectContractUrl: '/ida/api/person/district/statistics/contract/'
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
      handleData: {
        seriesData: 0
      },
      nohandleData: {
        seriesData: 0
      },
      paceDistrictNames: [],
      paceDistrictIds: [],
      projectPaceList: {
        districtId: ""
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
      workerTypeList: {
        seriesData: [],
        total: 0
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
      workerTypeShow: true,
      websock: null
    }
  },
  filters: {
    percentFilter: function (value, total) {
      if (!total) return 0
      return (value / total) * 100
    }
  },
  created() {
    this.getAreaWarning('520100')
    this.projectPaceList.districtId = this.areaId
    this.getProjectTotal(this.areaId);
    this.getPersonTotal(this.areaId)
    this.initPunchSocket();
    this.getProjectContract(this.areaId);
    console.log('区域', this.areaId)
  },
  mounted() {},
  destroyed() {
    this.websock.close() //离开路由之后断开websocket连接
  },
  methods: {
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
            construct: res.data.constructCount || 0,
            complete: res.data.completeCount || 0,
          }
          // 项目类型分布
          let projectTypeData = res.data.typeList || []
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
          // 手续办理情况
          if (res.data.projectCount && res.data.projectCount > 0) {
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
          // 持证
          this.qaCount = {
            handleManager: resData.managerQaCount,
            noHandleManager: resData.managerNoneQaCount,
            handleWorker: resData.workerQaCount,
            noHandleWorker: resData.workerNoneQaCount
          }
          // 工种
          this.workerTypeList.total = resData.workTypeCount || 0
          let workTypeData = res.data.workTypeCounts || []
          if (workTypeData.length > 0) {
            workTypeData.map((item, index) => {
              this.workerTypeList.seriesData[index] = {
                name: item.name,
                value: item.count
              }
            })
            this.workerTypeShow = false
            this.$nextTick(() => {
              this.workerTypeShow = true
            })
          }
          // 劳务合同

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