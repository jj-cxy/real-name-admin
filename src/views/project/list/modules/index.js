import {
  axios
} from '@/utils/request'

var indexMixin = {
  data() {
    return {
      // 表头
      columns: [{
        title: '项目编码',
        dataIndex: 'projectId'
      }, {
        title: '项目名称',
        dataIndex: 'projectName'
      }, {
        title: '管理机构',
        dataIndex: 'orgCodeDesc'
      }, {
        title: '项目地区',
        dataIndex: 'district'
      }, {
        title: '项目类型',
        dataIndex: 'projectType'
      }, {
        title: '项目状态',
        align: 'center',
        dataIndex: 'projectStatusDesc'
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
      downloadFileName: '项目列表',
      orgList: []
    }
  },
  filters: {},
  created() {
    this.getList()
    this.getArea('520100', 'districtList')
    this.getOrgList();
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
  }
}
export default indexMixin