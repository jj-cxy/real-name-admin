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
        title: '姓名',
        dataIndex: 'personName'
      }, {
        title: '所属班组',
        align: 'center',
        dataIndex: 'personPhone'
      }, {
        title: '工种',
        align: 'center',
        dataIndex: 'personTypeDesc'
      }, {
        title: '所属分包项目',
        align: 'center',
        dataIndex: 'createTime'
      }, {
        title: '讨薪方式',
        align: 'center',
        dataIndex: 'createTime'
      }, {
        title: '发放年月',
        align: 'center',
        dataIndex: 'createTime'
      }, {
        title: '应发工资',
        align: 'center',
        dataIndex: 'statusDesc'
      }, {
        title: '实发工资',
        align: 'center',
        dataIndex: 'modifyTime'
      }],
      Urls: {
        listUrl: '/ida/api/project/person/page'
      },
      roleTypeList: [],
      listQuery: {
        condition: {
          projectId: this.projectId
        }
      },
      teamTypeList: [],
    }
  },
  filters: {},
  created() {
    // this.getList()
    this.getArea('work_type', 'teamTypeList')
  },
  methods: {}
}
export default indexMixin