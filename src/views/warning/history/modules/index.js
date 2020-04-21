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
        dataIndex: 'projectName'
      }, {
        title: '管理机构',
        align: 'center',
        dataIndex: 'managerOrgName'
      }, {
        title: '项目类型',
        align: 'center',
        dataIndex: 'projectTypeDesc'
      }, {
        title: '异常类型',
        align: 'center',
        dataIndex: 'projectStatusDesc'
      },{
        title: '预警时间',
        align: 'center',
        dataIndex: 'createTime'
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
        listUrl: '/ida/api/project/page',
        delUrl: '/ida/api/project/remove/',
        downloadExcelUrl: '/ida/api/project/export/ids',
        orgListurl: '/auth/api/org/tree',
        softEnterpriseUrl: '/ida/api/enterprise/page'
      },
      downloadFileName: '预警列表',
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