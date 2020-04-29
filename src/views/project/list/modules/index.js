import {
  axios
} from '@/utils/request'

var indexMixin = {
  data() {
    return {
      // 表头
      columns: [{
        title: '项目编码',
        dataIndex: 'id'
      }, {
        title: '项目名称',
        dataIndex: 'projectName',
        width: 250,
        ellipsis: true
      }, {
        title: '管理机构',
        align: 'center',
        dataIndex: 'managerOrgName'
      }, {
        title: '项目地区',
        dataIndex: 'district',
        customRender: (text, record) => `${record.province}${record.city}${record.district}`
      }, {
        title: '项目类型',
        align: 'center',
        dataIndex: 'projectTypeDesc'
      }, {
        title: '项目状态',
        align: 'center',
        dataIndex: 'projectStatusDesc'
      }, {
        title: '审核状态',
        align: 'center',
        dataIndex: 'examineStatus',
        customRender: (text, record) => `${text=='PASS'?'通过':text=='REJECT'?'驳回':text=='EXAMINE'?'待审':''}`
      }, {
        title: '项目开始时间',
        align: 'center',
        dataIndex: 'createTime'
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '230px',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      Urls: {
        listUrl: '/ida/api/project/page',
        delUrl: '/ida/api/project/remove/',
        downloadExcelUrl: '/ida/api/project/export/ids',
        orgListurl: '/auth/api/org/tree',
        softEnterpriseUrl: '/ida/api/enterprise/page'
      },
      downloadFileName: '项目列表',
      orgList: [],
      districtList: [],
      projectTypeList: [],
      projectStatusList: [],
      softList: []
    }
  },
  filters: {},
  created() {
    this.getList()
    this.getArea('520100', 'districtList')
    this.getOrgList();
    this.getDictData('project_type', 'projectTypeList')
    this.getDictData('project_status', 'projectStatusList')
    this.getSoftEnterprise()
  },
  methods: {
    handleDetail(record) {
      this.$router.push({
        path: "/project/detail",
        query: {
          id: record.id
        }
      })
    },
    // 前调公司
    getSoftEnterprise() {
      axios({
        url: this.Urls.softEnterpriseUrl,
        method: 'post',
        data: {
          condition: {
            unitType: 'SOFT_SUPPORT'
          },
          pageIndex: '1',
          pageSize: '100'
        }
      }).then(res => {
        this.softList = res.data.list
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
    // 发起修改
    handleAudit(record) {
      this.$router.push({
        path: "/audit/project",
        query: {
          id: record.id,
          bizType: 'PROJECT_MODIFY'
        }
      })
    }
  }
}
export default indexMixin