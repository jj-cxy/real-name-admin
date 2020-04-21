import {
  axios
} from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: ''
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: '/auth/api/auth/login',
    method: 'post',
    data: parameter,
    headers: {
      'base-captcha-key': parameter.header
    }
  })
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: '/auth/api/sms/verifyCode',
    method: 'get',
    params: parameter,
    headers: {
      'base-captcha-key': parameter.header
    }
  })
}

export function getImgCaptcha() {
  return axios({
    url: '/auth/api/captcha/get',
    method: 'get'
  })
}

export function getResetPwd(parameter) {
  return axios({
    url: '/auth/api/account/forgetPwd',
    method: 'get',
    params: parameter
  })
}

export function logout() {
  return axios({
    url: '/auth/api/auth/logout',
    method: 'post'
  })
}