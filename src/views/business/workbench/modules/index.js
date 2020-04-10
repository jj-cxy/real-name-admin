import {
  axios
} from '@/utils/request';
import moment from 'moment'
var indexMixin = {
  data() {
    return {
      Urls: {
        noticeCountUrl: '/biz/oaTask/noticeCount'
      },
      count: {}
    }
  },
  filters: {},
  created() {
    this.getNoticeCount();
  },
  methods: {
    // 获取角标数
    getNoticeCount() {
      axios({
        url: this.Urls.noticeCountUrl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.count = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    }
  }
};
export default indexMixin;