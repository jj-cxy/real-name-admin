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
      count: {},
      noticeData: [{
          title: '武汉解封后第一个周末',
        },
        {
          title: '印度5000节车厢改为隔离病房',
        },
        {
          title: '鲍某明姐姐:弟弟和女孩非养父女',
        },
        {
          title: '武汉的哥说最头疼的堵车成了幸福',
        },
      ]
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