/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */


class FetchResponse {
  constructor(data, headers, status) {
    this.data = data;
    this.headers = headers;
    this.status = status;
  }
  get statusText() { return this.status.toString(); }
  blob() {
    return new Promise((resolve, reject)=>{
      reject(new Error('unsupport fetch.blob'));
    });
  }

  json() {
    return new Promise((resolve, reject)=>{
      try {
        let data = JSON.parse(this.data);
      } catch (e) {
        reject(e);
        return;
      }
      resolve(data);
    });
  }

  text() {
    return new Promise((resolve, reject)=>{
      resolve(this.data);
    });
  }
}

export function fetch(url, option/*: {
    method?: string, // 请求方法 get, post, delete 等.
    mode?: string | 'no-cors' | 'cors' | 'same-origin',   // 'no-cors', 'same-origin'等; (可忽略)
    headers?: any, // 请求header, 例如:
    // {
    //   "Content-Type": "application/json",
    //   "Accept": 'application/json',
    // }
    body?: string,    // 请求内容.
    timeout?: number, // 超时 (ms), 默认为5000,
    credentials?: 'include' | null | undefined,  // 携带了credentials='include'则服务器需设置Access-Control-Allow-Credentials
  }*/) /*: Promise<any>*/ {
  
  option = option||{};

  return new Promise((resolve, reject)=>{
    wx.request({
      url,
      header: option.headers,
      timeout: option.timeout,
      data: option.body,
      method: option.method?option.method.toUpperCase():undefined,
      success: (res)=>{
        resolve( new FetchResponse(res.data, res.header, res.status) );
      }
    })
  });
}