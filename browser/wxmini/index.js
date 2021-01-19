

if (!global.__line) {
  global.__line = undefined;
  global.__column = undefined;
}

// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
require('../common/promise-finally-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

// var utilsBig  = require('../common/utils.bigint.native');
var febsutils  = require('./libs/utils');
var febscrypt  = require('../libs/crypt');
var cryptMd5  = require('../libs/crypt.md5');
var cryptSha1  = require('../libs/crypt.sha1');
var fetch  = require('./libs/fetch');
var date  = require('../libs/date');
var string = require('../libs/string');
var exception  = require('../common/exception');

const __debug = false;
const crypt = febsutils.mergeMap(febscrypt, cryptMd5, cryptSha1);
const utils = febsutils.mergeMap(febsutils);
const net = {
    fetch: fetch.fetch,
};

// const BigNumber = BigInt;

export {
  __debug,
  crypt,
  utils,
  net,
  date,
  string,
  exception,
  // BigNumber
}
