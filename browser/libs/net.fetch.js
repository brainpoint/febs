/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = require('./utils');

'use strict';

var transfer = require('./net.transfer');

var febsnet = {};
var net = {};

//--------------------------------------------------------
// fetch.
//--------------------------------------------------------
if (false) {
  //febsnet.fetch=window.fetch;
}
else {
  if (!Promise) {
    throw new Error('unsupported Promise')
  }

  // https://github.com/github/fetch
  febsnet.normalizeName = function(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  febsnet.normalizeValue = function(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  febsnet.Headers = function(headers) {
    this.map = {}

    if (headers instanceof febsnet.Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  febsnet.Headers.prototype.append = function(name, value) {
    name = febsnet.normalizeName(name)
    value = febsnet.normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  febsnet.Headers.prototype['delete'] = function(name) {
    delete this.map[febsnet.normalizeName(name)]
  }

  febsnet.Headers.prototype.get = function(name) {
    var values = this.map[febsnet.normalizeName(name)]
    return values ? values[0] : null
  }

  febsnet.Headers.prototype.getAll = function(name) {
    return this.map[febsnet.normalizeName(name)] || []
  }

  febsnet.Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(febsnet.normalizeName(name))
  }

  febsnet.Headers.prototype.set = function(name, value) {
    this.map[febsnet.normalizeName(name)] = [febsnet.normalizeValue(value)]
  }

  febsnet.Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  febsnet.consumed = function(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  febsnet.fileReaderReady = function (reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  febsnet.readBlobAsArrayBuffer = function (blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return febsnet.fileReaderReady(reader)
  }

  febsnet.readBlobAsText = function (blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return febsnet.fileReaderReady(reader)
  }

  febsnet.support = {
    blob: 'FileReader' in window.self && 'Blob' in window.self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in window.self,
    arrayBuffer: 'ArrayBuffer' in window.self
  }

  febsnet.Body = function () {
    this.bodyUsed = false


    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (febsnet.support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (febsnet.support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else if (febsnet.support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only febsnet.support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (febsnet.support.blob) {
      this.blob = function() {
        var rejected = febsnet.consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(febsnet.readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = febsnet.consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return febsnet.readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = febsnet.consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (febsnet.support.formData) {
      this.formData = function() {
        return this.text().then(febsnet.decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  febsnet.normalizeMethod = function (method) {
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  febsnet.Request = function (input, options) {
    options = options || {}
    var body = options.body
    if (febsnet.Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new febsnet.Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new febsnet.Headers(options.headers)
    }
    this.method = febsnet.normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('febsnet.Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  febsnet.Request.prototype.clone = function() {
    return new febsnet.Request(this)
  }

  febsnet.decode = function (body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  febsnet.headers = function (xhr) {
    var head = new febsnet.Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  febsnet.Body.call(febsnet.Request.prototype)

  febsnet.Response = function (bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit)
    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof febsnet.Headers ? options.headers : new febsnet.Headers(options.headers)
    this.url = options.url || ''
  }

  febsnet.Body.call(febsnet.Response.prototype)

  febsnet.Response.prototype.clone = function() {
    return new febsnet.Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new febsnet.Headers(this.headers),
      url: this.url
    })
  }

  febsnet.Response.error = function() {
    var response = new febsnet.Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  febsnet.Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new febsnet.Response(null, {status: status, headers: {location: url}})
  }

  window.Headers = febsnet.Headers;
  window.Request = febsnet.Request;
  window.Response = febsnet.Response;

  window.fetch = febsnet.fetch = function(input, init) {

    // other.
    return new Promise(function(resolve, reject) {
      var request
      if (febsnet.Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new febsnet.Request(input, init)
      }

      var xhr = transfer.transfer(window, init?init.timeout:0);

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      // xhr.onload = function() {
      //   var status = (xhr.status === 1223) ? 204 : xhr.status
      //   if (status < 100 || status > 599) {
      //     reject(new TypeError('Network request failed'))
      //     return
      //   }
      //   var options = {
      //     status: status,
      //     statusText: xhr.statusText,
      //     headers: febsnet.headers(xhr),
      //     url: responseURL()
      //   }
      //   var body = 'response' in xhr ? xhr.response : xhr.responseText;
      //   resolve(new febsnet.Response(body, options))
      // }

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var status = (xhr.status === 1223) ? 204 : xhr.status
          if (status < 100 || status > 599) {
            reject(new TypeError('Network request failed'))
            return
          }
          var options = {
            status: status,
            statusText: xhr.statusText,
            headers: febsnet.headers(xhr),
            url: responseURL()
          }
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new febsnet.Response(body, options))
        }
      }

      xhr.ontimeout = function() {
        reject('timeout')
      }
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      if (init.progress) {
        xhr.onprogress = function(event){
          if(event.lengthComputable){
            init.progress(event.position/event.totalSize);
          }
        }
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else {
        xhr.withCredentials = false  
      }

      if ('responseType' in xhr && febsnet.support.blob) {
        xhr.responseType = 'blob'
      }

      if (xhr.setRequestHeader) {
        request.headers.forEach(function(value, name) {
          xhr.setRequestHeader(name, value)
        })
      }
      else if (request.headers) {
        console.log('can\'t set headers');
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }

  febsnet.fetch.polyfill = true;

  net.fetch = febsnet.fetch;
} // if..else.
 
module.exports = net;