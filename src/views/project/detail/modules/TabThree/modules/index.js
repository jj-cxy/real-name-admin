import {
  axios
} from '@/utils/request'

var indexMixin = {
  props: {
    projectId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 表头
      columns: [{
        title: '班组名称',
        dataIndex: 'teamName'
      }, {
        title: '所属分包项目',
        align: 'center',
        dataIndex: 'projectName'
      }, {
        title: '班组类型',
        align: 'center',
        dataIndex: 'teamTypeDesc'
      }, {
        title: '所属单位',
        align: 'center',
        dataIndex: 'enterpriseName'
      }],
      Urls: {
        listUrl: '/ida/api/team/page'
      },
      roleTypeList: [],
      listQuery: {
        condition: {
          projectId: this.projectId
        }
      }
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {}
}
export default indexMixin