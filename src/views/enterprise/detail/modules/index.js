import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'
import moment from 'moment'

var indexMixin = {
  data() {
    return {
      Urls: {
        getByIdUrl: '/ida/api/enterprise/get/'
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
      }
    }
  },
  created() {
    let params = this.$route.query
    this.fillForm(params)
  },
  methods: {
    setForm(data) {
      this.model = data
    },
  }
}
export default indexMixin