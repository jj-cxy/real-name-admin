import {
  axios
} from '@/utils/request'

var indexMixin = {
  data() {
    return {
      // 表头
      columns: [{
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
        dataIndex: 'warningTypeDesc'
      }, {
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
        listUrl: '/ida/api/warning/history/page',
        orgListurl: '/auth/api/org/tree'
      },
      listQuery: {
        condition: {
          warningType: this.$route.query.warningType ? this.$route.query.warningType : undefined
        }
      },
      orgList: [],
      projectTypeList: [],
      warningTypeList: [{
        name: '前端设备',
        value: 'DEVICE'
      }, {
        name: '管理人员',
        value: 'MANAGER'
      }, {
        name: '劳务人员',
        value: 'LABOR'
      }, {
        name: '考勤数据',
        value: 'PUNCH'
      }, {
        name: '工资数据',
        value: 'SALARY'
      }, {
        name: '劳务合同',
        value: 'CONTRACT'
      }]
    }
  },
  filters: {},
  created() {
    this.getList()
    this.getArea('520100', 'districtList')
    this.getOrgList();
    this.getDictData('project_type', 'projectTypeList')
    this.getDictData('project_status', 'projectStatusList')
  },
  methods: {
    handleDetail(record) {
      this.$router.push({
        path: "/warning/detail",
        query: {
          id: record.id
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
    }
  }
}
export default indexMixin