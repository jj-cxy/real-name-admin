import {
  axios
} from '@/utils/request'
import moment from 'moment'

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
        title: '项目名称',
        dataIndex: 'projectName'
      }, {
        title: '工单类型',
        align: 'center',
        dataIndex: 'taskTypeDesc'
      },{
        title: '涉及金额(元)',
        align: 'center',
        dataIndex: 'amount'
      },{
        title: '缴费方',
        dataIndex: 'userName'
      },{
        title: '发起时间',
        align: 'center',
        dataIndex: 'startTime'
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '60px',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      Urls: {
        listUrl: '/biz/oaTask/todoPage',
        auditUrl: '/biz/oaTask/complete',
        auditBatchUrl: '/biz/oaTask/batchAudit',
        taskTypeUrl: '/biz/oaTask/taskType'
      },
      taskTypeList: []
    }
  },
  filters: {},
  created() {
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
    // 通过
    handlePass(record) {
      var _this = this
      _this.$confirm({
        title: '确认是否审核通过该财务事项？',
        content: record.projectName,
        centered: true,
        width: 500,
        onOk() {
          axios({
            url: _this.Urls.auditUrl,
            method: 'post',
            data:{
              flag: true,
              comment: '',
              ins: {
                procInsId: record.ins.procInsId
              }
            }
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: '审核成功'
              })
              _this.getList()
            } else {
              _this.$notification.error({
                message: res.msg
              })
            }
          })
        },
        class: 'test',
      })
    },
    // 不通过
    handleNoPass(record) {
      var _this = this
      _this.$confirm({
        title: '确认是否审核不通过该财务事项？',
        centered: true,
        width: 500,
        content: (
          <div>
            <p>{record.projectName}</p>
            <a-textarea rows="4" ref="textarea" placeholder="请输入原因"></a-textarea>
          </div>
        ),
        onOk() {
          if(!_this.$refs.textarea.stateValue){
            _this.$message.warning('请输入不通过的原因');
            return true;
          }
          axios({
            url: _this.Urls.auditUrl,
            method: 'post',
            data:{
              flag: false,
              comment: _this.$refs.textarea.stateValue,
              ins: {
                procInsId: record.ins.procInsId
              }
            }
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: '审核成功'
              })
              _this.getList()
            } else {
              _this.$notification.error({
                message: res.msg
              })
            }
          })
        },
        class: 'test',
      })
    },
    // 更多操作
    selfMenuClick(e) {
      switch (e.key) {
        case '1':
          this.handleBatchInitPass()
      }
    },
    // 批量审核通过
    auditBatchOk(){
      var _this = this
      _this.$confirm({
        title: '确认是否审核通过选择的财务事项？',
        centered: true,
        onOk() {
          axios({
            url: _this.Urls.auditBatchUrl,
            method: 'post',
            params: {flag:true},
            data:{
              ids: _this.selectedRowKeys,
            }
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: '审核成功'
              })
            } else {
              _this.$notification.error({
                message: res.msg
              })
            }
          })
        },
        class: 'test',
      })
    },
    handleStartTime(date) {
      this.listQuery.condition.beginTime = date
    },
  }
}
export default indexMixin