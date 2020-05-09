import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'

var indexMixin = {
  data() {
    return {
      textMap: {
        add: '新增菜单',
        edit: '编辑菜单'
      },
      // 查询参数
      listQuery: {
        condition: {
          parentId: '0'
        }
      },
      // 表头
      columns: [{
          title: '菜单名称',
          dataIndex: 'name'
        },
        {
          title: '类型',
          dataIndex: 'type',
          align: 'center',
          scopedSlots: {
            customRender: 'type'
          }
        },
        {
          title: '菜单路径',
          dataIndex: 'url',
          align: 'center'
        },
        {
          title: '后端路径',
          dataIndex: 'path',
          align: 'center'
        },
        {
          title: '权限标识',
          dataIndex: 'mark',
          align: 'center',
          scopedSlots: {
            customRender: 'mark'
          }
        },
        {
          title: '图标',
          dataIndex: 'icon',
          align: 'center',
          scopedSlots: {
            customRender: 'iconBox'
          }
        },
        {
          title: '排序',
          dataIndex: 'sort',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: '140px',
          fixed: 'right',
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
        listUrl: '/auth/api/resource/page',
        addUrl: '/auth/api/resource/insert',
        editUrl: '/auth/api/resource/update/',
        getByIdUrl: '/auth/api/resource/get/',
        delUrl: '/auth/api/resource/remove/',
        resourceListUrl: '/auth/api/resource/tree',
        subListUrl: '/auth/api/resource/children/'
      },
      treeData: [{
        title: '根节点',
        key: '0',
        value: '0',
        children: []
      }],
      mdl: {
        icon: ''
      },
      iconChooseVisible: false,
      typeList: [{
        name: '菜单',
        value: 'MENU'
      }, {
        name: '按钮',
        value: 'BUTTON'
      }, {
        name: '访问路径',
        value: 'PATH'
      }, {
        name: '标签页',
        value: 'TAB'
      }, {
        name: '页面',
        value: 'PAGE'
      }, {
        name: '功能',
        value: 'FUNCTION'
      }, {
        name: '服务',
        value: 'SERVER'
      }],
      markList: [{
        name: '所有用户',
        value: 'NONE'
      }, {
        name: '临时用户',
        value: 'TEMP'
      }, {
        name: '登录用户',
        value: 'LOGIN'
      }, {
        name: '平台用户',
        value: 'USER'
      }, {
        name: '内部用户',
        value: 'INSIDE'
      }, {
        name: '外部用户',
        value: 'OUTSIDE'
      }, {
        name: '第三方用户',
        value: 'AUTH'
      }, {
        name: '管理员用户',
        value: 'ADMIN'
      }],
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    resetForm() {
      this.getTreeData()
      this.isDisabled = false
    },
    beforeSubmit(form) {
      form.mark = form.mark.join()
      form.icon = this.mdl.icon
      if (!form.parentId || form.parentId == '') {
        form.parentId = 0
      }
      return form
    },
    setForm(data) {
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'parentId', 'title', 'type', 'name', 'path', 'url', 'sort', 'remark'))
        this.form.setFieldsValue({
          mark: data.mark.split(',')
        })
      })
    },
    getTreeData() {
      axios({
        url: this.Urls.resourceListUrl,
        method: 'get'
      }).then(res => {
        let resData = res.data.records || []
        this.treeData = resData.map(item => this.mapTree(item))
        this.treeData.unshift({
          title: '根节点',
          key: '0',
          value: '0',
          children: []
        })
      })
    },
    mapTree(item) {
      const haveChildren = Array.isArray(item.children) && item.children.length > 0
      return {
        title: item.name,
        key: item.id,
        value: item.id,
        children: haveChildren ? item.children.map(i => this.mapTree(i)) : []
      }
    },
    selectIcons() {
      this.iconChooseVisible = true
    },
    handleIconCancel() {
      this.iconChooseVisible = false
    },
    handleIconChoose(value) {
      this.mdl.icon = value
      this.iconChooseVisible = false
    },
    filterName(array, text) {
      let obj = array.find((item, index) => {
        if (item.value == text) {
          return item.name
        }
      })
      return obj.name
    },
  }
}
export default indexMixin