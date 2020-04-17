import {
  axios
} from '@/utils/request'

var indexMixin = {
  data() {
    return {
      // 表头
      columns: [{
        title: '单位名称',
        dataIndex: 'unitName'
      }, {
        title: '统一社会信用代码',
        align: 'center',
        dataIndex: 'unitCode'
      }, {
        title: '所属地区',
        dataIndex: 'address',
        customRender: (text, record) => `${record.province || ""} ${record.city || ""}  ${record.district || ""}`
      }, {
        title: '主要业务类型',
        dataIndex: 'unitTypeDesc'
      }, {
        title: '参与项目数量',
        align: 'center',
        dataIndex: 'projectCount'
      }, {
        title: '备案审核状态',
        align: 'center',
        dataIndex: 'auditStatusDesc'
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
        listUrl: '/ida/api/enterprise/page',
        delUrl: '/ida/api/enterprise/remove/',
        downloadExcelUrl: '/ida/api/enterprise/export/ids'
      },
      districtList: [],
      projectStatusList: [{
        name: '项目审核阶段',
        value: 'OA_EXAMINE'
      }, {
        name: '项目披露期',
        value: 'DISCLOSURE'
      }, {
        name: '组织交易阶段',
        value: '3'
      }, {
        name: '租赁合同签订阶段',
        value: '4'
      }, {
        name: '项目完成',
        value: 'FINISH'
      }],
      downloadFileName: '单位列表',
    }
  },
  filters: {},
  created() {
    this.getList()
    this.getArea('520100', 'districtList')
  },
  methods: {
    handleDetail(record) {
      this.$router.push({
        path: "/enterprise/detail",
        query: {
          id: record.id
        }
      })
    },
  }
}
export default indexMixin