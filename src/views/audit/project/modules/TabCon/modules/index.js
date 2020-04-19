import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'
import moment from 'moment'

var indexMixin = {
  props: {
    unitData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      Urls: {
        addUrl: '/biz/oaDisclosure/disclosureInsert',
        editUrl: '/biz/oaDisclosure/disclosureUpdate/',
        getByIdUrl: '/biz/oaDisclosure/get/',
        assetByIdUrl: '/biz/oaAssets/get/'
      },
      labelCol: {
        xl: {
          span: 3
        },
        lg: {
          span: 5
        },
        md: {
          span: 24
        }
      },
      wrapperCol: {
        xl: {
          span: 19
        },

        lg: {
          span: 17
        },
        md: {
          span: 24
        }
      },
      validatorRules: {
        must: {
          rules: [{
            required: true,
            message: '此字段为必填!'
          }]
        }
      },
      fileList: [],
      model: {},
      singleFile: true,
      personInfoList: [{
          title: '项目经理',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '人事负责人',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '专管员',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '技术总工',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '施工员（测量员）',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '质量员',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '安全员',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '标准员',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '材料员',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '机械员',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '劳务员(预算员)',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        },
        {
          title: '资料员',
          name: '王某某',
          phone: '136xxxx8927',
          idCard: '522xxxxxxxxxxx1258'
        }
      ]
    }
  },
  created() {},
  methods: {}
}
export default indexMixin