import {
  axios
} from '@/utils/request';
import Vue from 'vue'
import echarts from 'echarts'

var indexMixin = {
  data() {
    return {
      loading: false,
      Urls: {
        listUrl: ''
      },
      lineChartData: {
        xAxisData: [],
        seriesOneData: [],
        seriesTwoData: []
      },
      leftBarChartData: {
        seriesOneData: [],
        seriesTwoData: [],
        seriesThreeData: [],
        seriesFourData: [],
      },
      rightBarChartData: {
        seriesOneData: [],
        seriesTwoData: [],
        seriesThreeData: [],
        seriesFourData: [],
        serieFiveData: [],
      },
      perject: {
        count: 0,
        amount: 0,
        percent: 0
      }
    }
  },
  filters: {},
  created() {},
  mounted() {},
  methods: {
    // 项目类型
  }
};
export default indexMixin;