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
    data: parameter
  })
}

export function getSmsCaptcha() {
  return axios({
    url: '/auth/api/sms/send',
    method: 'get'
  })
}

export function getImgCaptcha() {
  return axios({
    url: '/auth/api/captcha/get',
    method: 'get'
  })
}

export function logout() {
  return axios({
    url: '/auth/api/auth/logout',
    method: 'post'
  })
}