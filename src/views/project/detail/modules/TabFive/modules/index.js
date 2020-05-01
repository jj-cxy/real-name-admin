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
        title: '手机号',
        align: 'center',
        dataIndex: 'personPhone'
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
        title: '班组',
        align: 'center',
        dataIndex: 'workType'
      }, {
        title: '进入项目时间',
        align: 'center',
        dataIndex: 'createTime'
      }, {
        title: '在职状态',
        align: 'center',
        dataIndex: 'statusDesc'
      }, {
        title: '合同',
        align: 'center',
        dataIndex: 'modifyTime'
      }],
      Urls: {
        listUrl: '/ida/api/project/person/page'
      },
      listQuery: {
        condition: {
          projectId: this.projectId
        }
      },
      teamTypeList: [],
      roleTypeList: [],
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