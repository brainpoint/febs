var _BigNumber = require('./third-party/bignumber.js');
var febs = require('./index.noBignumber');

febs.BigNumber = _BigNumber;

const __debug = febs.__debug;
const BigNumber = febs.BigNumber;
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
