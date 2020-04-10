import {
  axios
} from '@/utils/request'

var indexMixin = {
  props: {
    activeKey: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      // 表头
      columns: [{
        title: '客户名称',
        dataIndex: 'name'
      }, {
        title: '客户账号',
        align: 'center',
        dataIndex: 'username'
      }, {
        title: '客户证件号',
        align: 'center',
        dataIndex: 'credentialsNo'
      }, {
        title: '客户角色',
        align: 'center',
        dataIndex: 'roleDesc'
      }, {
        title: '客户类型',
        align: 'center',
        dataIndex: 'typeDesc'
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
        listUrl: '/auth/api/customer/page',
        downloadExcelUrl: '/auth/api/customer/export/ids',
        importExcelUrl: '/auth/api/customer/import',
        outputTempUrl: '/auth/api/customer/template'
      },
      roleList: [{
        name: '招租方',
        value: 'ZZF'
      }, {
        name: '承租方',
        value: 'CZF'
      }],
      customerTypeList: [{
        name: '集团',
        value: 'JT'
      }, {
        name: '企业',
        value: 'QY'
      }, {
        name: '个人',
        value: 'GR'
      }],
      downloadFileName: '客户列表'
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {}
}
export default indexMixin