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
      model: {},
      
      activeKey: '1'
    }
  },
  created() {
    let params = this.$route.query
    this.fillForm(params)
  },
  methods: {
    // tab change
    handleTabChange(key) {
      console.log('lalal', key)
      this.activeKey = key
    },
    setForm(data) {
      this.model = data
      this.$refs.infoTab.setValue(data)
    },
  }
}
export default indexMixin