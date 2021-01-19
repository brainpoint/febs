var _BigNumber = require('./third-party/bignumber.js');
var febs = require('./index.ie8.noBignumber');

const __debug = febs.__debug;
const BigNumber = _BigNumber;
const date = febs.date;
const utils = febs.utils;
const string = febs.string;
const crypt = febs.crypt;
const net = febs.net;
const $ = febs['$'];
const dom = febs.dom;
const exception = febs.exception;

export {
  __debug,
  BigNumber,
  date,
  utils,
  string,
  crypt,
  net,
  $,
  dom,
  exception
};
