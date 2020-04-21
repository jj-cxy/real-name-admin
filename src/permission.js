import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  setDocumentTitle,
  domTitle
} from '@/utils/domUtil'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult', 'resetPassword'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (Vue.ls.get(ACCESS_TOKEN)) {
    // has token
    if (to.path === '/login/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      /* if (store.getters.roles.length === 0) {
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) {
          console.log(1)
          next()
        } else {
          console.log(2)
          // 跳转到目的路由
          next({
            path: redirect
          })
        }
      } else {
        next()
      } */
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/login/login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done();
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})