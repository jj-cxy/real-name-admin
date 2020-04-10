import Vue from 'vue'
import Router from 'vue-router'
import {
  constantRouterMap,
  asyncRouterMap
} from '@/config/router.config'

try {
  const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
} catch (e) {}

Vue.use(Router)

export default new Router({
  mode: 'hash', // history or hash
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap.concat(asyncRouterMap)
})