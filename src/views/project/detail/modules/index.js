import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'
import moment from 'moment'

var indexMixin = {
  data() {
    return {
      Urls: {
        addUrl: '/biz/oaDisclosure/disclosureInsert',
        editUrl: '/biz/oaDisclosure/disclosureUpdate/',
        getByIdUrl: '/biz/oaDisclosure/get/',
        assetByIdUrl: '/biz/oaAssets/get/'
      },
      fileList: [],
      model: {},
      singleFile: true
    }
  },
  created() {},
  methods: {}
}
export default indexMixin