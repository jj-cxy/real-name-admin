import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'

var indexMixin = {
  data() {
    return {
      textMap: {
        add: '新增角色',
        edit: '编辑角色'
      },
      // 表头
      columns: [{
          title: '角色名称',
          dataIndex: 'name',
        },
        {
          title: '角色描述',
          dataIndex: 'remark',
        },
        {
          title: '角色标识',
          align: 'center',
          dataIndex: 'mark',
        },
        {
          title: '成员数量',
          align: 'center',
          dataIndex: 'userCount',
          customRender: (text, record, index) => `${text}人`
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: '170px',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
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
        listUrl: '/auth/api/role/page',
        addUrl: '/auth/api/role/insert',
        editUrl: '/auth/api/role/update/',
        getByIdUrl: '/auth/api/role/get/',
        delUrl: '/auth/api/role/remove/',
        downloadExcelUrl: '/auth/api/role/export/ids',
        lockRoleUrl: '/auth/api/role/changeStatus',
        batchLockRoleUrl: '/auth/api/role/changeStatus',
        setMenuUrl: '/auth/api/role/update/',
        batchDelUrl: '/auth/api/role/removes',
        outputTempUrl: '/auth/api/role/template',
        importExcelUrl: '/auth/api/role/import'

      },
      downloadFileName: '角色列表',
      dataRoleList: [{
        key: "NONE",
        name: "无"
      }, {
        key: "CREATE",
        name: "创建者"
      }, {
        key: "ORG",
        name: "平级(机构)"
      }, {
        key: "ORG_S",
        name: "平级及子集(机构)"
      }, {
        key: "AREA",
        name: "平级(区域)"
      }, {
        key: "AREA_S",
        name: "平级和子集(区域)"
      }, {
        key: "ALL",
        name: "所有"
      }]
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    resetForm() {},
    // 设置权限
    handleSetMenu(record) {
      this.$refs.menuModal.detail(record)
    },

    // 禁启部门
    handleLock(record) {
      var _this = this;
      let tip = record.roleStatus == 'DISABLE' ? "启用" : '禁用'
      this.$confirm({
        title: "确定要" + tip + record.name + "么",
        centered: true,
        okType: 'danger',
        class: 'test',
        onOk() {
          axios({
            url: _this.Urls.lockRoleUrl,
            method: 'post',
            params: {
              status: record.roleStatus == 'DISABLE' ? "ENABLED" : 'DISABLE'
            },
            data: {
              ids: record.id.split()
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

    // 批量禁启职务
    handleBatchLock(status) {
      var _this = this;
      let tip = status == 'DISABLE' ? "禁用" : '启用'
      this.$confirm({
        title: "确定要" + tip + "您选择的职务么",
        centered: true,
        okType: 'danger',
        class: 'test',
        onOk() {
          axios({
            url: _this.Urls.batchLockRoleUrl,
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
        this.form.setFieldsValue(pick(data, 'name', 'mark', 'dataRole', 'remark'))
      })
    }
  }
}
export default indexMixin