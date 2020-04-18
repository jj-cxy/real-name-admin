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
        title: '事项名称',
        dataIndex: 'projectName'
      }, {
        title: '事项类型',
        align: 'center',
        dataIndex: 'taskTypeDesc'
      }, {
        title: '时间',
        align: 'center',
        dataIndex: 'startTime'
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
        listUrl: '/ida/oaTask/todoPage',
        taskTypeUrl: '/biz/oaTask/taskType'
      },
      taskTypeList: []
    }
  },
  filters: {},
  mounted() {
    this.getList()
    // this.getTaskType()
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
    handleDetail(record) {
      if (record.taskType == "ENTERPRISE_RECORD") {
        this.$router.push({
          path: '/audit/enterprise',
          query: {
            id: record.biz.businessId,
            procInsId: record.ins.procInsId
          }
        })
      } else {
        this.$router.push({
          path: '/audit/project',
          query: {
            id: record.biz.businessId,
            procInsId: record.ins.procInsId
          }
        })
      }

    },
  }
}
export default indexMixin