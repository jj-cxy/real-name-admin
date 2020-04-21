import {
  axios
} from '@/utils/request'

var indexMixin = {
  data() {
    return {
      Urls: {
        getByIdUrl: '/ida/api/project/get/'
      },
      model: {},
      activeKey: '0',
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