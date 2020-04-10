import {
  axios
} from '@/utils/request'

var indexMixin = {
  data() {
    return {
      // 表头
      columns: [{
        title: '账户编号',
        dataIndex: 'credentialsNo'
      }, {
        title: '账户名称',
        dataIndex: 'name'
      }, {
        title: '发起时间',
        dataIndex: 'createTime'
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '130px',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      listData: [],
      Urls: {
        listUrl: '/auth/api/customer/auditing',
        auditCompleteUrl: 'auth/api/customer/audit',
        auditBatchUrl: '/auth/api/customer/batchAudit'
      }
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    // 通过
    handlePass(record) {
      var _this = this
      _this.$confirm({
        title: '确认通过该账户资料？',
        content: record.name,
        centered: true,
        onOk() {
          axios({
            url: _this.Urls.auditCompleteUrl,
            method: 'post',
            data:{
              id: record.id,
              flow:{
                flag: true,
                comment: ''
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
        title: '确认拒绝该账户资料？',
        centered: true,
        content: (
          <div>
            <p>{record.name}</p>
            <a-textarea rows="4" ref="textarea" placeholder="请输入原因"></a-textarea>
          </div>
        ),
        onOk() {
          if(!_this.$refs.textarea.stateValue){
            _this.$message.warning('请输入拒绝的原因');
            return true;
          }
          axios({
            url: _this.Urls.auditCompleteUrl,
            method: 'post',
            data:{
              id: record.id,
              flow:{
                flag: false,
                comment: _this.$refs.textarea.stateValue
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
        case 'ok':
          this.auditBatchOk()
      }
    },
    auditBatchOk(){
      var _this = this
      _this.$confirm({
        title: '确认审核通过选择的账户资料？',
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
                message: '批量审核成功'
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
    }
  }
}
export default indexMixin