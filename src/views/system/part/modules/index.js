import {
  axios
} from '@/utils/request'
import moment from 'moment'

var indexMixin = {
  data() {
    return {
      textMap: {
        add: '新增部门',
        edit: '编辑部门'
      },
      // 查询参数
      listQuery: {
        condition: {}
      },
      // 表头
      columns: [{
        title: '部门名称',
        dataIndex: 'name'
      }, {
        title: '部门描述',
        dataIndex: 'remark'
      }, {
        title: '成员数量',
        align: 'center',
        dataIndex: 'userCount',
        customRender:(text,record,index)=> `${text}人`
      }, {
        title: '部门状态',
        align: 'center',
        dataIndex: 'orgStatusDesc'
      }, {
        title: '更新时间',
        align: 'center',
        dataIndex: 'modifyTime'
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
        listUrl: '/auth/api/org/page',
        addUrl: '/auth/api/org/insert',
        editUrl: '/auth/api/org/update/',
        getByIdUrl: '/auth/api/org/get/',
        delUrl: '/auth/api/org/remove/',
        lockPartUrl: '/auth/api/org/changeStatus',
        batchLockPartUrl: '/auth/api/org/changeStatus',
        downloadExcelUrl: '/auth/api/org/export/ids',
        batchDelUrl: '/auth/api/org/removes',
        outputTempUrl: '/auth/api/org/template',
        importExcelUrl: '/auth/api/org/import'
      },
      provinceList: [],
      cityList: [],
      districtList: [],
      orgTypeList: [],
      treeData: [],
      isDisabledd: false,
      downloadFileName: '部门列表'
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {

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
    setForm(res) {
      this.mdl.id = res.data.id
      this.$nextTick(() => {
        this.form.setFieldsValue({
          remark: res.data.remark,
          name: res.data.name,
        })
      })
    }
  }
}
export default indexMixin