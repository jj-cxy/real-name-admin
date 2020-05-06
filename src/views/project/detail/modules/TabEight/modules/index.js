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
        title: '职务',
        align: 'center',
        dataIndex: 'position'
      }, {
        title: '工种',
        align: 'center',
        dataIndex: 'personTypeDesc'
      }, {
        title: '所属分包项目',
        align: 'center',
        dataIndex: 'projectName'
      }, {
        title: '当月出勤天数',
        align: 'center',
        dataIndex: 'punchDay'
      }, {
        title: '进入项目时间',
        align: 'center',
        dataIndex: 'createTime'
      }, {
        title: '在职状态',
        align: 'center',
        dataIndex: 'statusDesc'
      }, {
        title: '考勤详情',
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
    this.getDictData('work_type', 'teamTypeList')
  },
  methods: {}
}
export default indexMixin