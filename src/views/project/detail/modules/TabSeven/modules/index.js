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
        dataIndex: 'teamName'
      }, {
        title: '工种',
        align: 'center',
        dataIndex: 'workTypeDesc'
      }, {
        title: '所属分包项目',
        align: 'center',
        dataIndex: 'projectName'
      }, {
        title: '讨薪方式',
        align: 'center',
        dataIndex: 'salaryMethod'
      }, {
        title: '发放年月',
        align: 'center',
        dataIndex: 'salaryNo'
      }, {
        title: '应发工资（元）',
        align: 'center',
        dataIndex: 'payAbleAmount'
      }, {
        title: '实发工资（元）',
        align: 'center',
        dataIndex: 'actualAmount'
      }],
      Urls: {
        listUrl: '/ida/api/salary/page'
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
    this.getList()
    this.getDictData('work_type', 'teamTypeList')
  },
  methods: {}
}
export default indexMixin