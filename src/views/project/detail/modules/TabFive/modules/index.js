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
        dataIndex: 'workerTypeDesc'
      }, {
        title: '工种',
        align: 'center',
        dataIndex: 'workTypeDesc'
      }, {
        title: '所属分包项目',
        align: 'center',
        dataIndex: 'projectName'
      }, {
        title: '班组',
        align: 'center',
        dataIndex: 'teamName'
      }, {
        title: '进入项目时间',
        align: 'center',
        dataIndex: 'entryTime'
      }, {
        title: '在职状态',
        align: 'center',
        dataIndex: 'postTypeDesc'
      }, {
        title: '合同',
        align: 'center',
        dataIndex: 'modifyTime'
      }],
      Urls: {
        listUrl: '/ida/api/person/post/page'
      },
      listQuery: {
        condition: {
          projectId: this.projectId,
          workerType: '01'
        }
      },
      teamTypeList: [],
      postTypeList: [{
        name: '在职',
        value: 'EMPLOY'
      }, {
        name: '离职',
        value: 'QUIT'
      }],
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