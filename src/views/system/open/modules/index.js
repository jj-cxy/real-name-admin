import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'

var indexMixin = {
  data() {
    return {
      textMap: {
        add: '新增第三方授权',
        edit: '编辑第三方授权'
      },
      // 查询参数
      listQuery: {
        condition: {}
      },
      // 表头
      columns: [{
        title: '秘钥',
        dataIndex: 'name'
      }, {
        title: '第三方名称',
        dataIndex: 'areaName'
      }, {
        title: '过期时间',
        dataIndex: 'userCount'
      }, {
        title: '创建时间',
        dataIndex: 'createTime'
      }, {
        title: '状态',
        dataIndex: 'keyStatus'
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '140px',
        fixed: 'right',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 4
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 20
        }
      },
      Urls: {
        listUrl: '/ida/api/open/auth/page',
        addUrl: '/ida/api/open/auth/insert',
        editUrl: '/ida/api/open/auth/update/',
        getByIdUrl: '/ida/api/open/auth/get/',
        delUrl: '/ida/api/open/auth/remove/',
        lockPartUrl: '/ida/api/open/auth/changeStatus',
        batchLockPartUrl: '/ida/api/open/auth/changeStatus',
        downloadExcelUrl: '/ida/api/open/auth/export/ids',
        batchDelUrl: '/ida/api/open/auth/removes',
        outputTempUrl: '/ida/api/open/auth/template',
        importExcelUrl: '/ida/api/open/auth/import',
        enterpriseListUrl: '/ida/api/enterprise/list'
      },
      provinceList: [],
      cityList: [],
      districtList: [],
      orgTypeList: [],
      treeData: [],
      isDisabledd: false,
      downloadFileName: '第三方列表',
      enterpriseList: []
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    resetForm() {
      this.getEnterpriseList()
    },
    dateChange(date, dateString) {
      console.log(date, dateString)
    },
    // 第三方列表
    getEnterpriseList() {
      axios({
        url: this.Urls.enterpriseListUrl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.orgList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    // 禁启部门
    handleLock(record) {
      var _this = this;
      let tip = record.orgStatus == 'DISABLE' ? "启用" : '禁用'
      this.$confirm({
        title: "确定要" + tip + record.name + "么",
        centered: true,
        okType: 'danger',
        class: 'test',
        onOk() {
          axios({
            url: _this.Urls.lockPartUrl,
            method: 'post',
            params: {
              status: record.orgStatus == 'DISABLE' ? "ENABLED" : 'DISABLE'
            },
            data: {
              ids: record.id.split(),
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

    // 更多操作
    selfMenuClick(e) {
      switch (e.key) {
        case '2':
          this.handleBatchLock('DISABLE')
          break;
        case '3':
          this.handleBatchLock('ENABLED')
      }
    },

    // 批量禁启部门
    handleBatchLock(status) {
      var _this = this;
      let tip = status == 'DISABLE' ? "禁用" : '启用'
      this.$confirm({
        title: "确定要" + tip + "您选择的部门么",
        centered: true,
        okType: 'danger',
        class: 'test',
        onOk() {
          axios({
            url: _this.Urls.batchLockPartUrl,
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
    setForm(data) {
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'enterpriseId', 'expiredTime', 'keyStatus'))
      })
    }
  }
}
export default indexMixin