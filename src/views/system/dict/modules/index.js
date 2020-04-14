import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'

var indexMixin = {
  data() {
    return {
      textMap: {
        add: '新增字典',
        edit: '编辑字典'
      },
      // 查询参数
      listQuery: {
        condition: {
          parentId: '0'
        }
      },
      // 表头
      columns: [{
          title: '字典名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '键名',
          dataIndex: 'key',
          key: 'key',
          align: 'center'
        },
        {
          title: '键值',
          dataIndex: 'value',
          key: 'value',
          align: 'center'
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          align: 'center'
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: '140px',
          scopedSlots: {
            customRender: 'action'
          }
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
        listUrl: '/ida/api/dict/page',
        addUrl: '/ida/api/dict/insert',
        editUrl: '/ida/api/dict/update/',
        getByIdUrl: '/ida/api/dict/get/',
        delUrl: '/ida/api/dict/delete/',
        typeListUrl: '/ida/api/dict/typeList/',
        subListUrl: '/ida/api/dict/children/',
        dictTreeUrl: '/ida/api/dict/typeTree'
      },
      expandedKeys: [],
      selectedKeys: [],
      dictTypeData: [],
      treeData: [{
        title: '根节点',
        key: '0',
        value: '0',
        children: []
      }]
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    resetForm() {
      this.isDisabled = false
      this.getTreeData()
    },
    getTreeData() {
      axios({
        url: this.Urls.dictTreeUrl,
        method: 'get'
      }).then(res => {
        let resData = res.data.records
        this.treeData = resData.map(item => this.mapTree(item))
        this.treeData.unshift({
          title: '根节点',
          key: '0',
          value: '0',
          children: []
        })
      })
    },
    // 格式化树结构
    mapTree(item) {
      const haveChildren = Array.isArray(item.children) && item.children.length > 0
      return {
        title: item.name,
        key: item.key,
        value: item.id,
        children: haveChildren ? item.children.map(i => this.mapTree(i)) : []
      }
    },
    setForm(data) {
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'parentId', 'key', 'value', 'name', 'type', 'sort', 'category', 'remark'))
      })
    },
    beforeSubmit(form) {
      return form
    },
    // 增加子节点
    handleSub(record) {
      this.mdl = {}
      this.form.resetFields()
      this.visible = true
      this.resetForm()
      this.isDisabled = true
      this.dialogStatus = 'add'
      this.form.resetFields()
      this.$nextTick(() => {
        this.form.setFieldsValue({
          parentId: record.id,
          type: record.type
        })
      })
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    }
  }
}
export default indexMixin