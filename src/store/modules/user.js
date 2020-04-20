import Vue from 'vue'
import {
  login,
  logout
} from '@/api/login'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  welcome
} from '@/utils/util'
import moment from 'moment'


const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {
      name,
      welcome
    }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if (res.code == 0) {
            const result = res.data;
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
            commit('SET_TOKEN', result.token);
            localStorage.setItem('in-trueName', result.user.name || "未知")
            localStorage.setItem('in-userId', result.user.userId)
            localStorage.setItem('in-areaId', result.user.areaId)
            localStorage.setItem('in-orgId', result.user.orgId)
            if (result.user.roles && result.user.roles.length > 0) {
              localStorage.setItem('in-mark', result.user.roleMarks)
            }
            resolve(res);
          } else {
            reject(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
          localStorage.removeItem('in-trueName');
          localStorage.removeItem('in-userId');
          localStorage.removeItem('in-mark');
          localStorage.removeItem('in-areaId')
          localStorage.removeItem('in-orgId')
        })
      })
    }

  }
}

export default user