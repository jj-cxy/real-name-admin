import {
  axios
} from '@/utils/request'

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
        dataIndex: 'projectName',
      }, {
        title: '工单类型',
        align: 'center',
        dataIndex: 'taskTypeDesc'
      }, {
        title: '办理时间',
        align: 'center',
        dataIndex: 'completeTime'
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '70px',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      Urls: {
        listUrl: '/biz/oaTask/historyPage',
        taskTypeUrl: '/biz/oaTask/taskType'
      },
      taskTypeList: []
    }
  },
  filters: {},
  mounted() {
    this.getList()
    this.getTaskType()
    if (this.mark == 'business') {
      this.columns = [{
        title: '项目编号/企业编号',
        dataIndex: 'projectNo'
      }, {
        title: '项目名称/企业名称',
        dataIndex: 'projectName',
      }, {
        title: '工单类型',
        align: 'center',
        dataIndex: 'taskTypeDesc'
      }, {
        title: '办理时间',
        align: 'center',
        dataIndex: 'completeTime'
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '70px',
        scopedSlots: {
          customRender: 'action'
        }
      }]
    } else {
      this.columns = [{
        title: '项目编号/企业编号',
        dataIndex: 'projectNo'
      }, {
        title: '项目名称/企业名称',
        dataIndex: 'projectName',
      }, {
        title: '工单类型',
        align: 'center',
        dataIndex: 'taskTypeDesc'
      }, {
        title: '办理时间',
        align: 'center',
        dataIndex: 'completeTime'
      }]
    }
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
    handleStartTime(date) {
      this.listQuery.condition.beginTime = date
    },
  }
}
export default indexMixin