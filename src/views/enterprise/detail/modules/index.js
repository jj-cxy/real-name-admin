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
        getByIdUrl: '/ida/api/project/get/',
        assetByIdUrl: '/biz/oaAssets/get/'
      },
      fileList: [],
      model: {},
      singleFile: true
    }
  },
  created() {
    let params = this.$route.query
    this.fillForm(params)
  },
  methods: {
    setForm(data) {
      this.model = data
      this.$refs.infoTab.setValue(data)
    },
  }
}
export default indexMixin