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
      projectTypeList: {
        legendData: ['公建项目', '市政项目', '民建项目', '其他工程'],
        seriesData: [{
            name: '公建项目',
            value: 80
          },
          {
            name: '市政项目',
            value: 80
          },
          {
            name: '民建项目',
            value: 80
          },
          {
            name: '其他工程',
            value: 80
          }
        ]
      },
      projectRadioList: {
        seriesData: [{
            value: 101,
            name: '云岩区'
          },
          {
            value: 79,
            name: '南明区'
          },
          {
            value: 136,
            name: '观山湖'
          },
          {
            value: 123,
            name: '白云区'
          },
          {
            value: 99,
            name: '乌当区'
          },
          {
            value: 101,
            name: '花溪区'
          },
          {
            value: 79,
            name: '双龙镇'
          },
          {
            value: 136,
            name: '经开区'
          },
          {
            value: 123,
            name: '综保区'
          },
          {
            value: 99,
            name: '高新区'
          },
          {
            value: 101,
            name: '清镇市'
          },
          {
            value: 79,
            name: '息烽县'
          },
          {
            value: 136,
            name: '开阳县'
          },
          {
            value: 123,
            name: '修文县'
          }
        ]
      },
      inOutRadioList: {
        innerData: [{
            value: 100,
            unit: '个',
            name: '行业大类1'
          },
          {
            value: 100,
            unit: '个',
            name: '行业大类2'
          },
          {
            value: 250,
            unit: '个',
            name: '行业大类3'
          },
          {
            value: 250,
            unit: '个',
            name: '行业大类4'
          }
        ],
        outerData: [{
            value: 200,
            unit: '个',
            name: '谷歌'
          },
          {
            value: 500,
            unit: '个',
            name: '必应'
          }
        ]
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