import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'

var indexMixin = {
  data() {
    return {
      Urls: {
        addUrl: '/biz/oaDisclosure/disclosureInsert',
        editUrl: '/biz/oaDisclosure/disclosureUpdate/',
        getByIdUrl: '/ida/api/project/get/'
      },
      model: {},
      activeKey: '1',
      tabShow: false
    }
  },
  mounted() {
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
      this.tabShow = true
    },
    afterFill() {
      this.tabShow = true
    },
  }
}
export default indexMixin