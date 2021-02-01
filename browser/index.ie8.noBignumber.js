var febs = require('./index.ie8.base');
var _utilsBig  = require('./common/utils.bigint.native');

const __debug = febs.__debug;
const BigNumber = _BigNumber;
const date = febs.date;
const utils = febs.utils.mergeMap(febs.utils, _utilsBig);
const string = febs.string;
const crypt = febs.crypt;
const net = febs.net;
const $ = febs['$'];
const dom = febs.dom;
const exception = febs.exception;

export {
  __debug,
  date,
  utils,
  string,
  crypt,
  net,
  $,
  dom,
  exception
};
