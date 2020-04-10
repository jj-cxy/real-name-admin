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

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next({
        path: defaultRoutePath
      })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        const roles = {
          permissionList: ['home', 'table', 'form', 'order', 'permission', 'user']
        }
        store.dispatch('GenerateRoutes', {
          roles
        }).then(() => {})
        // 请求带有 redirect 重定向时，登录自动重定向到该地址
        /* const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) {
          console.log(redirect, to.path)
          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          // next({ ...to, replace: true })
        } else {
          // 跳转到目的路由
          next({ path: redirect })
        } */
        next()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/user/login'
      })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})