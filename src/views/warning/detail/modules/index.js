import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'
import moment from 'moment'

var indexMixin = {
  data() {
    return {
      Urls: {
        getByIdUrl: '/ida/api/warning/history/get/',
        projectByIdUrl: '/ida/api/project/get/'
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
      model: {
        qualifications: []
      }
    }
  },
  created() {
    let params = this.$route.query
    this.fillForm(params)
  },
  methods: {
    getProjectById(id) {
      axios({
        url: this.Urls.projectByIdUrl + id,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.model = Object.assign(res.data, this.model)
          console.log('values...', this.model)
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    setForm(data) {
      this.getProjectById(data.projectId)
      this.model = data
    },
  }
}
export default indexMixin