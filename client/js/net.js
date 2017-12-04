
/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

febs.net = function() {}

//--------------------------------------------------------
// ajax
//--------------------------------------------------------
febs.net.ajax = febs.nav.ajax;

//--------------------------------------------------------
// fetch.
//--------------------------------------------------------
if (false) {
  //febs.net.fetch=window.fetch;
}
else {
  if (!Promise) {
    throw new Error('unsupported Promise')
  }

  // https://github.com/github/fetch
  febs.net.fetch_normalizeName = function(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  febs.net.fetch_normalizeValue = function(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  febs.net.fetch_Headers = function(headers) {
    this.map = {}

    if (headers instanceof febs.net.fetch_Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  febs.net.fetch_Headers.prototype.append = function(name, value) {
    name = febs.net.fetch_normalizeName(name)
    value = febs.net.fetch_normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  febs.net.fetch_Headers.prototype['delete'] = function(name) {
    delete this.map[febs.net.fetch_normalizeName(name)]
  }

  febs.net.fetch_Headers.prototype.get = function(name) {
    var values = this.map[febs.net.fetch_normalizeName(name)]
    return values ? values[0] : null
  }

  febs.net.fetch_Headers.prototype.getAll = function(name) {
    return this.map[febs.net.fetch_normalizeName(name)] || []
  }

  febs.net.fetch_Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(febs.net.fetch_normalizeName(name))
  }

  febs.net.fetch_Headers.prototype.set = function(name, value) {
    this.map[febs.net.fetch_normalizeName(name)] = [febs.net.fetch_normalizeValue(value)]
  }

  febs.net.fetch_Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  febs.net.fetch_consumed = function(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  febs.net.fetch_fileReaderReady = function (reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  febs.net.fetch_readBlobAsArrayBuffer = function (blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return febs.net.fetch_fileReaderReady(reader)
  }

  febs.net.fetch_readBlobAsText = function (blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return febs.net.fetch_fileReaderReady(reader)
  }

  febs.net.fetch_support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  febs.net.fetch_Body = function () {
    this.bodyUsed = false


    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (febs.net.fetch_support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (febs.net.fetch_support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else if (febs.net.fetch_support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only febs.net.fetch_support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (febs.net.fetch_support.blob) {
      this.blob = function() {
        var rejected = febs.net.fetch_consumed(this)
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
        return this.blob().then(febs.net.fetch_readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = febs.net.fetch_consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return febs.net.fetch_readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = febs.net.fetch_consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (febs.net.fetch_support.formData) {
      this.formData = function() {
        return this.text().then(febs.net.fetch_decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  febs.net.fetch_normalizeMethod = function (method) {
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  febs.net.fetch_Request = function (input, options) {
    options = options || {}
    var body = options.body
    if (febs.net.fetch_Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new febs.net.fetch_Headers(input.headers)
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
      this.headers = new febs.net.fetch_Headers(options.headers)
    }
    this.method = febs.net.fetch_normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('febs.net.fetch_Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  febs.net.fetch_Request.prototype.clone = function() {
    return new febs.net.fetch_Request(this)
  }

  febs.net.fetch_decode = function (body) {
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

  febs.net.fetch_headers = function (xhr) {
    var head = new febs.net.fetch_Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  febs.net.fetch_Body.call(febs.net.fetch_Request.prototype)

  febs.net.fetch_Response = function (bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit)
    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof febs.net.fetch_Headers ? options.headers : new febs.net.fetch_Headers(options.headers)
    this.url = options.url || ''
  }

  febs.net.fetch_Body.call(febs.net.fetch_Response.prototype)

  febs.net.fetch_Response.prototype.clone = function() {
    return new febs.net.fetch_Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new febs.net.fetch_Headers(this.headers),
      url: this.url
    })
  }

  febs.net.fetch_Response.error = function() {
    var response = new febs.net.fetch_Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  febs.net.fetch_Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new febs.net.fetch_Response(null, {status: status, headers: {location: url}})
  }

  window.Headers = febs.net.fetch_Headers;
  window.Request = febs.net.fetch_Request;
  window.Response = febs.net.fetch_Response;

  window.fetch = febs.net.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (febs.net.fetch_Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new febs.net.fetch_Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      if (init && init.timeout) {
        xhr.timeout = init.timeout;
      } else {
        xhr.timeout = 5000;
      }

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-febs.net.fetch_Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-febs.net.fetch_Request-URL')
        }

        return;
      }

      xhr.onload = function() {
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: febs.net.fetch_headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new febs.net.fetch_Response(body, options))
      }

      xhr.ontimeout = function() {
        reject('timeout')
      }
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else {
        xhr.withCredentials = false  
      }

      if ('responseType' in xhr && febs.net.fetch_support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }

  febs.net.fetch.polyfill = true;
} // if..else.
 

//--------------------------------------------------------
// jsonp
//--------------------------------------------------------

// From https://github.com/camsong/fetch-jsonp
febs.net.jsonp_defaultOptions = {
  timeout: 5000,
  jsonpCallback: 'callback'
};

febs.net.jsonp_generateCallbackFunction = function () {
  return 'jsonp_' + Date.now().toString() + '_' + Math.ceil(Math.random() * 100000);
}

// Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
febs.net.jsonp_clearFunction = function (functionName) {
  // IE8 throws an exception when you try to delete a property on window
  // http://stackoverflow.com/a/1824228/751089
  try {
    delete window[functionName];
  } catch(e) {
  }
}

febs.net.jsonp_removeScript = function (scriptId) {
  var script = document.getElementById(scriptId);
  document.getElementsByTagName("head")[0].removeChild(script);
}

febs.net.jsonp = function(url, options) {
  options = options || {};
  var timeout = options.timeout != null ? options.timeout : febs.net.jsonp_defaultOptions.timeout;
  var jsonpCallback = (!!options.jsonpCallback) ? options.jsonpCallback : febs.net.jsonp_defaultOptions.jsonpCallback;

  var timeoutId;

  return new Promise(function(resolve, reject) {
    var callbackFunction = febs.net.jsonp_generateCallbackFunction();

    window[callbackFunction] = function(response) {
      resolve({
        ok: true,
        // keep consistent with fetch API
        json: function() {
          return Promise.resolve(response);
        }
      });

      if (timeoutId) clearTimeout(timeoutId);

      febs.net.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);

      febs.net.jsonp_clearFunction(callbackFunction);
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    url += (url.indexOf('?') === -1) ? '?' : '&';

    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute("src", url + jsonpCallback + '=' + callbackFunction);
    jsonpScript.id = jsonpCallback + '_' + callbackFunction;
    document.getElementsByTagName("head")[0].appendChild(jsonpScript);

    timeoutId = setTimeout(function() {
      reject('timeout');

      febs.net.jsonp_clearFunction(callbackFunction);
      febs.net.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);
    }, timeout);
  });
};
