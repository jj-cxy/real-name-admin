import {
  axios
} from '@/utils/request';
import moment from 'moment'
var indexMixin = {
  data() {
    return {
      mdl: {},
      textMap: {
        add: '新增用户',
        edit: '编辑用户'
      },
      // 表头
      columns: [{
          title: '真实姓名',
          dataIndex: 'name'
        },
        {
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '手机号码',
          dataIndex: 'phone',
          align: 'center',
        },
        {
          title: '所属机构',
          dataIndex: 'orgName'
        },
        {
          title: '所属角色',
          dataIndex: 'roleName'
        },
        {
          title: '状态',
          dataIndex: 'accountStatusDesc',
          align: 'center'
        },
        {
          title: '最后登录时间',
          dataIndex: 'lastLoginTime',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: '180px',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      Urls: {
        listUrl: '/auth/api/user/page',
        delUrl: '/auth/api/user/remove/',
        initPassUrl: '/auth/api/account/resetPwd/',
        batchInitPassUrl: '/auth/api/account/resetPwds',
        lockUserUrl: '/auth/api/account/change/',
        batchLockUserUrl: '/auth/api/account/changeStatus',
        roleListurl: '/auth/api/role/list',
        orgListurl: '/auth/api/org/tree',
        downloadExcelUrl: '/auth/api/user/export/ids',
        batchDelUrl: '/auth/api/user/removes',
        defaultPassUrl: '/auth/api/account/defaultPwd',
        outputTempUrl: '/auth/api/user/template',
        importExcelUrl: '/auth/api/user/import'
      },
      roleList: [],
      orgList: [],
      downloadFileName: '用户列表',
      defaultPass: '123456'
    }
  },
  filters: {},
  created() {
    this.getList();
    this.getRoleList();
    this.getOrgList();
    this.getDefaultPass();
  },
  methods: {

    // 职务列表
    getRoleList() {
      axios({
        url: this.Urls.roleListurl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.roleList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },

    // 机构列表
    getOrgList() {
      axios({
        url: this.Urls.orgListurl,
        method: 'get'
      }).then(res => {
        let resData = res.data.records
        this.orgList = resData.map(item => this.mapTree(item))
      })
    },

    // 禁启用户
    handleLock(record) {
      var _this = this;
      let tip = record.accountStatus == 'DISABLE' ? "启用" : '禁用'
      this.$confirm({
        title: "确定要" + tip + record.name + "么",
        centered: true,
        okType: 'danger',
        class: 'test',
        onOk() {
          axios({
            url: _this.Urls.lockUserUrl + record.id,
            method: 'get'
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: tip + '成功',
                duration: 4
              })
              _this.getList();
            } else {
              _this.$notification.error({
                message: res.msg,
                duration: 4
              })
            }
          })
        }
      })
    },

    // 重置密码
    handleInitPass(record) {
      var _this = this;
      this.$confirm({
        title: "确定要重置" + record.name + "的密码么",
        content: h => `初始密码：${_this.defaultPass}`,
        centered: true,
        okType: 'danger',
        class: 'test',
        onOk() {
          axios({
            url: _this.Urls.initPassUrl + record.id,
            method: 'get'
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: '重置成功',
                duration: 4
              })
              _this.getList();
            } else {
              _this.$notification.error({
                message: res.msg,
                duration: 4
              })
            }
          })
        }
      })
    },
    // 获取初始密码
    getDefaultPass() {
      axios({
        url: this.Urls.defaultPassUrl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.defaultPass = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },

    // 更多操作
    selfMenuClick(e) {
      switch (e.key) {
        case '1':
          this.handleBatchInitPass()
          break;
        case '2':
          this.handleBatchLock('DISABLE')
          break;
        case '3':
          this.handleBatchLock('ENABLED')
      }
    },
    // 批量重置密码
    handleBatchInitPass() {
      var _this = this;
      this.$confirm({
        title: "确定要重置您选择账户的密码么",
        content: h => `初始密码：${_this.defaultPass}`,
        centered: true,
        okType: 'danger',
        class: 'test',
        onOk() {
          axios({
            url: _this.Urls.batchInitPassUrl,
            method: 'post',
            data: {
              ids: this.selectedRowKeys
            }
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: '重置成功',
                duration: 4
              })
              _this.getList();
            } else {
              _this.$notification.error({
                message: res.msg,
                duration: 4
              })
            }
          })
        }
      })
    },

    // 批量禁启用户
    handleBatchLock(status) {
      var _this = this;
      let tip = status == 'DISABLE' ? "禁用" : '启用'
      this.$confirm({
        title: "确定要" + tip + "您选择的账户么",
        centered: true,
        okType: 'danger',
        class: 'test',
        onOk() {
          axios({
            url: _this.Urls.batchLockUserUrl,
            method: 'post',
            params: {
              status: status
            },
            data: {
              ids: _this.selectedRowKeys
            }
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: tip + '成功',
                duration: 4
              })
              _this.getList();
            } else {
              _this.$notification.error({
                message: res.msg,
                duration: 4
              })
            }
          })
        }
      })
    },
  }
};
export default indexMixin;