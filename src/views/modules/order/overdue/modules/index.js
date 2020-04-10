import {
  axios
} from '@/utils/request'
import {
  Recorded
} from 'rx'

var indexMixin = {
  props: {
    paging: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 表头
      columns: [{
        title: '项目编号/企业编号',
        dataIndex: 'projectNo'
      }, {
        title: '项目名称/企业名称',
        dataIndex: 'projectName'
      }, {
        title: '工单类型',
        align: 'center',
        dataIndex: 'taskTypeDesc'
      }, {
        title: '工单发起时间',
        align: 'center',
        dataIndex: 'startTime'
      }, {
        title: '超期时长',
        align: 'center',
        dataIndex: 'timeDelay',
        scopedSlots: {
          customRender: 'timeDelay'
        },
        sorter: true
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '110px',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      Urls: {
        // listUrl: '/biz/oaProject/overDueListEnterpriseAndProject',
        listUrl: '/biz/oaTask/delayPage',
        taskTypeUrl: '/biz/oaTask/taskType'
      },
      taskTypeList: [],
      oderTimeList: [],
      turnArr: {
        "OA_REG_AUDIT": '/account/audit', //账户审核
        "OA_ENTRUST": '/contract/todo', //上传委托协议
        "OA_DISCLOSURE_INFO": '/disclosure/sheet', //披露表制作 
        "OA_LESSEE": '/lessee/audit', //承租人审核
        "OA_CHOOSETRADETYPE": '/trade/mode', // 交易方式
        "OA_TRADE_NOTICE": '/trade/result', //交易结果
        "OA_CONTRACT_PROCESS": '/contract/deal', //上传租赁合同
        "OA_CHARGES": '/charge/list', //收费通知
        "OA_SUSPEND": '/stop/break', //终止中断
        "disclosureExtend": '/disclosure/extend', //延长披露期
        "relist": '/re/join', //重新挂牌
        "OA_ERROR_ORDER": '/order/abnormal', //异常订单
      }
    }
  },
  filters: {},
  mounted() {
    this.getList()
    this.getTaskType()
  },
  methods: {
    getTaskType() {
      axios({
        url: this.Urls.taskTypeUrl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.taskTypeList = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    handleDeal(record) {
      let keys = Object.keys(this.turnArr)
      let path = ""
      keys.filter((item, index) => {
        if (record.taskType == "OA_DISCLOSURE_INFO") {
          if (item == record.task.taskDefKey) {
            return path = this.turnArr[record.task.taskDefKey]
          }
        } else {
          if (item == record.taskType) {
            return path = this.turnArr[record.taskType]
          }
        }
      })
      this.$router.push({
        path: path,
        query: {
          name: record.projectName
        }
      })
    }
  }
}
export default indexMixin