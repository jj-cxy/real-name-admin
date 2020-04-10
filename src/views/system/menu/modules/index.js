import {
  axios
} from '@/utils/request'
import moment from 'moment'

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
          dataIndex: 'typeDesc',
          align: 'center'
        },
        {
          title: '前端路径',
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
      provinceList: [],
      cityList: [],
      districtList: [],
      treeData: [],
      isDisabledd: false,
      typeArr: [{
        value: 'MENU',
        name: '菜单'
      }, {
        value: 'BUTTON',
        name: '按钮'
      }, {
        value: 'PATH',
        name: '访问路径'
      }, {
        value: 'TAB',
        name: '标签页'
      }, {
        value: 'PAGE',
        name: '页面'
      }, {
        value: 'FUNCTION',
        name: '功能'
      }, {
        value: 'SERVER',
        name: '服务'
      }]
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    resetForm() {
      this.getResource()
      this.isDisabledd = false
    },
    beforeSubmit(form) {
      form.mark = form.mark.join()
      return form
    },
    setForm(res) {
      this.mdl.id = res.data.id
      this.$nextTick(() => {
        this.form.setFieldsValue({
          parentId: res.data.parentId,
          type: res.data.type.toString(),
          name: res.data.name,
          path: res.data.path,
          url: res.data.url,
          icon: res.data.icon,
          mark: res.data.mark.split(),
          sort: res.data.sort,
          remark: res.data.remark
        })
      })
    },
    handleSub(record) {
      this.mdl = {}
      this.form.resetFields()
      this.resetForm()
      this.getResource()
      this.visible = true
      this.dialogStatus = 'add'
      this.isDisabledd = true
      this.mdl.parentId = record.id
      this.$nextTick(() => {
        this.form.setFieldsValue({
          parentId: record.id
        })
      })
    },
    getResource() {
      axios({
        url: this.Urls.resourceListUrl,
        method: 'get'
      }).then(res => {
        let resData = res.data.records || []
        this.treeData = resData.map(item => this.mapTree(item))
      })
    }
  }
}
export default indexMixin