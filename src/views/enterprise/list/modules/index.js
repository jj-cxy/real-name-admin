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
      downloadFileName: '单位列表',
      unitTypeList: [{
        name: '建设单位（房开）',
        value: 'ROOT_UNIT_FK'
      }, {
        name: '建设单位（政府）',
        value: 'ROOT_UNIT_ZF'
      }, {
        name: '建设单位（企业）',
        value: 'ROOT_UNIT_QY'
      }, {
        name: '建设单位（个人）',
        value: 'ROOT_UNIT_GR'
      }, {
        name: '建设单位（其它）',
        value: 'ROOT_UNIT_QT'
      }, {
        name: '设计单位',
        value: 'DESIGN_UNIT'
      }, {
        name: '监理单位',
        value: 'MANAGE_UNIT'
      }, {
        name: '检测单位',
        value: 'CHECK_UNIT'
      }, {
        name: '施工单位',
        value: 'CONSTRUCTION_UNIT'
      }, {
        name: '勘察单位',
        value: 'SURVEY_UNIT'
      }, {
        name: '前端软件',
        value: 'SOFT_SUPPORT'
      }, {
        name: '设备分包',
        value: 'DEVICE_SUB'
      }, {
        name: '材料分包',
        value: 'MATERIAL_SUB'
      }, {
        name: '劳务分包',
        value: 'LABOR_SUB'
      }, {
        name: '专业分包',
        value: 'PROFESSIONAL_SUB'
      }, {
        name: '后勤服务',
        value: 'LOGISTICS_SERVICES_SUB'
      }, {
        name: '其它',
        value: 'OTHERS'
      }],
      auditStatusList: [{
        name: '待审核',
        value: 'AUDIT'
      }, {
        name: '未通过',
        value: 'REFUSE'
      }, {
        name: '已通过',
        value: 'PASS'
      }],
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