/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var stringUtils = require('../common/string');

function binb2rstr(input) {
  var i,
    l = input.length * 32,
    output = ''
  for (i = 0; i < l; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> (24 - (i % 32))) & 0xff)
  }
  return output
}

function bit_rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
}

function safe_add(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff),
    msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xffff)
}

function sha1_ft(t, b, c, d) {
  if (t < 20) {
    return (b & c) | (~b & d)
  }
  if (t < 40) {
    return b ^ c ^ d
  }
  if (t < 60) {
    return (b & c) | (b & d) | (c & d)
  }
  return b ^ c ^ d
}

function sha1_kt(t) {
  return t < 20
    ? 1518500249
    : t < 40
    ? 1859775393
    : t < 60
    ? -1894007588
    : -899497514
}

function rstr2binb(input) {
  var i, l = input.length * 8,
    output = Array(input.length >> 2),
    lo = output.length;
  for (i = 0; i < lo; i += 1) {
    output[i] = 0;
  }
  for (i = 0; i < l; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  }
  return output;
}

function hex(s) {
  var input = binb2rstr(binb(rstr2binb(s), s.length * 8))
  var hex_tab = '0123456789abcdef',
    output = '',
    x,
    i = 0,
    l = input.length
  for (; i < l; i += 1) {
    x = input.charCodeAt(i)
    output += hex_tab.charAt((x >>> 4) & 0x0f) + hex_tab.charAt(x & 0x0f)
  }
  return output
}

function binb(x, len) {
  var i,
    j,
    t,
    olda,
    oldb,
    oldc,
    oldd,
    olde,
    w = Array(80),
    a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878,
    e = -1009589776

  /* append padding */
  x[len >> 5] |= 0x80 << (24 - (len % 32))
  x[(((len + 64) >> 9) << 4) + 15] = len

  for (i = 0; i < x.length; i += 16) {
    olda = a
    oldb = b
    oldc = c
    oldd = d
    olde = e

    for (j = 0; j < 80; j += 1) {
      if (j < 16) {
        w[j] = x[i + j]
      } else {
        w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1)
      }
      t = safe_add(
        safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
        safe_add(safe_add(e, w[j]), sha1_kt(j))
      )
      e = d
      d = c
      c = bit_rol(b, 30)
      b = a
      a = t
    }

    a = safe_add(a, olda)
    b = safe_add(b, oldb)
    c = safe_add(c, oldc)
    d = safe_add(d, oldd)
    e = safe_add(e, olde)
  }
  return Array(a, b, c, d, e)
}


exports.sha1 = function (str) {
  return hex(stringUtils.utf8Encode(str))
}
