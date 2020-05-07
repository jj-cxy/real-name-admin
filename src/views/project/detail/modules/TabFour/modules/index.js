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
        dataIndex: 'personTypeDesc'
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
      personTypeList: [{
        name: '管理员',
        value: 'ADMIN'
      }, {
        name: '负责人',
        value: 'PRINCIPAL'
      }, {
        name: '监督员',
        value: 'SUPERVISOR'
      }, {
        name: '专管员',
        value: 'OFFICER'
      }, {
        name: '人事专员',
        value: 'HR'
      }, {
        name: '劳务员',
        value: 'LABOUR'
      }, {
        name: '施工员',
        value: 'CONSTRUCTION'
      }, {
        name: '质量员',
        value: 'QUALITY'
      }, {
        name: '安全员',
        value: 'SAFETY'
      }, {
        name: '标准员',
        value: 'STANDARD'
      }, {
        name: '材料员',
        value: 'MATERIAL'
      }, {
        name: '机械员',
        value: 'MECHANICS'
      }, {
        name: '资料员',
        value: 'MEANS'
      }, {
        name: '设计员',
        value: 'DESIGNER'
      }, {
        name: '技术员',
        value: 'TECHNICAL'
      }, {
        name: '监理总监',
        value: 'INSPECT'
      }, {
        name: '技术总工',
        value: 'ENGINEER'
      }, {
        name: '项目经理',
        value: 'MANAGER'
      }, {
        name: '项目总监',
        value: 'DIRECTOR'
      }, {
        name: '其它',
        value: 'OTHERS'
      }],
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {}
}
export default indexMixin