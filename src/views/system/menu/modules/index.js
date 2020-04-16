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
          dataIndex: 'title'
        },
        {
          title: '类型',
          dataIndex: 'type',
          align: 'center',
          customRender: (text, record) => `${text=="MENU"?"菜单":""}`
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
          customRender(mark) {
            return mark == 'NONE' ? '无需认证' : mark == 'LOGIN' ? '登录' : mark == 'USER' ? '平台用户' : mark == 'AUTH' ? '第三方' : mark == 'ADMIN' ? '管理员' : ''
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
      typeArr: [{
        value: 'MENU',
        name: '菜单'
      }, {
        value: 'BUTTON',
        name: '按钮'
      }],
      mdl: {
        icon: ''
      },
      iconChooseVisible: false
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
      console.log('lala', this.mdl)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'parentId', 'title', 'type', 'name', 'path', 'url', 'mark', 'sort', 'remark'))
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
        title: item.title,
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
  }
}
export default indexMixin