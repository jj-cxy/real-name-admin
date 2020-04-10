// ie polyfill
import '@babel/polyfill'
import promise from 'es6-promise';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import bootstrap from './core/bootstrap'
import './core/use'
import './assets/iconfont/iconfont.css'
import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false

Vue.prototype.validateMobile = (rule, value, callback) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback('请输入正确的手机号码');
  }
}

Vue.prototype.validateIdCard = (rule, value, callback) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(value)) {
    callback();
  } else {
    callback('身份证输入不合法');
  }
}

Vue.prototype.validateNumber = (rule, value, callback) => {
  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
    callback();
  } else {
    callback('请输入数字');
  }
}

promise.polyfill();

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')