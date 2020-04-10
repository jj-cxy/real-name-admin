import {
  axios
} from '@/utils/request';
import moment from 'moment'
var indexMixin = {
  data() {
    return {
      textMap: {
        add: '新增',
        edit: '编辑'
      },
      // 查询参数
      listQuery: {
        condition: {}
      },
      // 表头
      columns: [{
          title: '操作编号',
          dataIndex: 'logNo'
        },
        {
          title: '操作时间',
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: '操作人员',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '所属模块',
          dataIndex: 'module',
        },
        {
          title: '操作类型',
          dataIndex: 'operateType',
          align: 'center',
        }
      ],
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 6
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 18
        }
      },
      labelRowCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 3
        }
      },
      wrapperRowCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 21
        }
      },
      Urls: {
        listUrl: '/auth/api/log/page',
        delUrl: '/auth/remove/',
        downloadExcelUrl: '/auth/api/log/export/ids',
      },
      treeData: [],
      selectedKeys: [],
      expandedKeys: [],
      downloadFileName: '操作日志列表'
    }
  },
  filters: {},
  created() {
    this.getList();
  },
  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    onDateTimeChange(value, dateString) {
      this.listQuery.condition.startTime = dateString[0];
      this.listQuery.condition.endTime = dateString[1];
    },
    // 查询条件 时间
    handleStartTime(date) {
      this.listQuery.condition.startTime = date
    },
    handleEndTime(date) {
      this.listQuery.condition.endTime = date
    }
  }
};
export default indexMixin;