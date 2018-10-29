
import axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile';


axios.interceptors.request.use(config => {
  // 发送请求之前做什么
  //如果有token给所有的headers加入token参数
  if (localStorage.getItem('token') && localStorage.getItem('userID')) {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200) && (response.data.code === 200)) {
    return response
  }
  else if (response && (response.status === 401)) {
    //token过期或不合法,跳转登录
    //清除token缓存
    localStorage.removeItem('token');
    Toast.fail('会话已过期，请重新登陆');
    setTimeout(function () { window.location.href = "/"; }, 500);
  }
  else if (response && (response.status === 200) && (response.data.code === 401)) {
    //token过期或不合法,跳转登录
    //清除token缓存
    localStorage.removeItem('token');
    Toast.fail('会话已过期，请重新登陆');
    setTimeout(function () { window.location.href = "/"; }, 500);
  }
  else {
    Toast.fail('网络异常');
    setTimeout(function () { Toast.hide() }, 1000);

  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkStatusb(response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

export default {
  post(url, data, adata) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 50000,
    }).then(
      (response) => {
        return response;
      }
    )
  },
  get(url, data, adata) {
    return axios({
      method: 'get',
      url,
      timeout: 50000,
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  },
  getcon(url, data, adata) {
    return axios({
      method: 'get',
      url,
      data: qs.stringify(data),
      timeout: 50000,
    }).then(
      (response) => {
        return response;
      }
    )
  },
}
