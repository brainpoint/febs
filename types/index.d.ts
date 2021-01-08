// Type definitions for febs

/// <reference types="node" />

import { Fetch } from './fetch.d';

declare global {
  /**
  * @desc: 是否是开发模式.
  */
  var __debug: boolean;
  /**
  * @desc: 当前所在行.
  */
  var __line: number;
  /**
  * @desc: 当前所在列
  */
  var __column: number;
}

export interface WeekFmt {
  '0'?: string;
  '1'?: string;
  '2'?: string;
  '3'?: string;
  '4'?: string;
  '5'?: string;
  '6'?: string;
}

export interface StrFmt {
  now?: string;
  second?: string;
  minute?: string;
  hour?: string;
  day_yesterday?: string;
  day?: string;
  month?: string;
  time?: string;  // 超过6个月将使用此格式格式化时间
}

/**
* @desc: big number type
*/
export class BigNumber {
  constructor(v:any);

  /**
   * Returns a BigNumber whose value is the absolute value, i.e. the magnitude, of the value of this BigNumber. The
   * return value is always exact and unrounded.
   * ```ts
   * x = new BigNumber(-0.8)
   * y = x.absoluteValue()           // '0.8'
   * z = y.abs()                     // '0.8'
   * ```
   */
  abs(): BigNumber;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber plus `n`.
   *
   * The return value is always exact and unrounded.
   */
  add(n: number | string | BigNumber): BigNumber;


  /**
   * Returns a BigNumber whose value is the value of this BigNumber minus `n`.
   *
   * The return value is always exact and unrounded.
   */
  minus(n: number | string | BigNumber): BigNumber;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber times n.
   *
   * The return value is always exact and unrounded.
   */
  mul(n: number | string | BigNumber, base?: number): BigNumber;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber divided by n, rounded according to the current
   * DECIMAL_PLACES and ROUNDING_MODE configuration.
   *
   * ```ts
   * x = new BigNumber(355)
   * y = new BigNumber(113)
   * x.dividedBy(y)                  // '3.14159292035398230088'
   * x.dividedBy(5)                        // '71'
   * x.dividedBy(47, 16)                   // '5'
   * ```
   */
  dividedBy(n: number | string | BigNumber): BigNumber;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber modulo n, i.e. the integer remainder of dividing
   * this BigNumber by n.
   *
   * The value returned, and in particular its sign, is dependent on the value of the [[Configuration.MODULO_MODE]]
   * setting of this BigNumber constructor. If it is `1` (default value), the result will have the same sign as this
   * BigNumber, and it will match that of Javascript's `%` operator (within the limits of double precision) and
   * BigDecimal's remainder method.
   *
   * The return value is always exact and unrounded.
   *
   * ```ts
   * 1 % 0.9                         // 0.09999999999999998
   * x = new BigNumber(1)
   * x.modulo(0.9)                   // '0.1'
   * y = new BigNumber(33)
   * y.mod('a', 33)                  // '3'
   * ```
   **/
  mod(n: number | string | BigNumber): BigNumber;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber rounded to a whole number in the direction of
   * positive `Infinity`.
   *
   * ```ts
   * x = new BigNumber(1.3)
   * x.ceil()                        // '2'
   * y = new BigNumber(-1.8)
   * y.ceil()                        // '-1'
   * ```
   */
  ceil(): BigNumber;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber rounded to a whole number in the direction of
   * negative `Infinity`.
   *
   * ```ts
   * x = new BigNumber(1.8)
   * x.floor()                       // '1'
   * y = new BigNumber(-1.3)
   * y.floor()                       // '-2'
   * ```
   */
  floor(): BigNumber;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber rounded by rounding mode rm to a maximum of dp
   * decimal places.
   *
   *  - if dp is omitted, or is null or undefined, the return value is n rounded to a whole number.
   *  - if rm is omitted, or is null or undefined, ROUNDING_MODE is used.
   *
   * ```ts
   * x = 1234.56
   * Math.round(x)                             // 1235
   * y = new BigNumber(x)
   * y.round()                                 // '1235'
   * y.round(1)                                // '1234.6'
   * y.round(2)                                // '1234.56'
   * y.round(10)                               // '1234.56'
   * y.round(0, 1)                             // '1234'
   * y.round(0, 6)                             // '1235'
   * y.round(1, 1)                             // '1234.5'
   * y.round(1, BigNumber.ROUND_HALF_EVEN)     // '1234.6'
   * y                                         // '1234.56'
   * ```
   *
   * @param dp integer, 0 to 1e+9 inclusive
   * @param rm integer, 0 to 8 inclusive
   */
  round(dp?: number, rm?: number): BigNumber;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber truncated to a whole number.
   *
   * ```ts
   * x = new BigNumber(123.456)
   * x.truncated()                   // '123'
   * y = new BigNumber(-12.3)
   * y.trunc()                       // '-12'
   * ```
   */
  truncated(): BigNumber;
  
  /**
   * Returns true if the value of this BigNumber equals the value of `n`, otherwise returns `false`. As with JavaScript,
   * `NaN` does not equal `NaN`.
   *
   * Note: This method uses the [[comparedTo]] internally.
   *
   * ```ts
   * 0 === 1e-324                    // true
   * x = new BigNumber(0)
   * x.equals('1e-324')              // false
   * BigNumber(-0).eq(x)             // true  ( -0 === 0 )
   * BigNumber(255).eq('ff', 16)     // true
   *
   * y = new BigNumber(NaN)
   * y.equals(NaN)                   // false
   * ```
   */
  equals(n: number | string | BigNumber): boolean;

  /**
   * Returns `true` if the value of this BigNumber is greater than the value of `n`, otherwise returns `false`.
   *
   * Note: This method uses the comparedTo method internally.
   *
   * ```ts
   * 0.1 > (0.3 - 0.2)                           // true
   * x = new BigNumber(0.1)
   * x.greaterThan(BigNumber(0.3).minus(0.2))    // false
   * BigNumber(0).gt(x)                          // false
   * BigNumber(11, 3).gt(11.1, 2)                // true
   * ```
   */
  greaterThan(n: number | string | BigNumber): boolean;

  /**
   * Returns `true` if the value of this BigNumber is greater than or equal to the value of `n`, otherwise returns `false`.
   *
   * Note: This method uses the comparedTo method internally.
   */
  greaterThanOrEqualTo(n: number | string | BigNumber): boolean;

  /**
   * Returns true if the value of this BigNumber is less than the value of n, otherwise returns false.
   *
   * Note: This method uses [[comparedTo]] internally.
   *
   * @alias [[lt]]
   */
  lessThan(n: number | string | BigNumber): boolean;

  /**
   * Returns true if the value of this BigNumber is less than or equal the value of n, otherwise returns false.
   *
   * Note: This method uses [[comparedTo]] internally.
   */
  lessThanOrEqualTo(n: number | string | BigNumber): boolean;

  /**
   * Returns true if the value of this BigNumber is a whole number, otherwise returns false.
   */
  isInteger(): boolean;

  /**
   * Returns `true` if the value of this BigNumber is `NaN`, otherwise returns `false`.
   *
   * Note: The native method isNaN() can also be used.
   */
  isNaN(): boolean;

  /**
   * Returns true if the value of this BigNumber is negative, otherwise returns false.
   *
   * Note: `n < 0` can be used if `n <= * -Number.MIN_VALUE`.
   */
  isNegative(): boolean;

  /**
   * Returns true if the value of this BigNumber is zero or minus zero, otherwise returns false.
   *
   * Note: `n == 0` can be used if `n >= Number.MIN_VALUE`.
   */
  isZero(): boolean;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber negated, i.e. multiplied by -1.
   *
   * ```ts
   * x = new BigNumber(1.8)
   * x.negated()                     // '-1.8'
   * y = new BigNumber(-1.3)
   * y.neg()                         // '1.3'
   * ```
   */
  negated(): BigNumber;

  /**
   * Returns a BigNumber whose value is the square root of the value of this BigNumber, rounded according to the
   * current DECIMAL_PLACES and ROUNDING_MODE configuration.
   *
   * The return value will be correctly rounded, i.e. rounded
   * as if the result was first calculated to an infinite number of correct digits before rounding.
   */
  sqrt(): BigNumber;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber rounded to sd significant digits using rounding mode rm.
   *
   * If sd is omitted or is null or undefined, the return value will not be rounded.
   *
   * If rm is omitted or is null or undefined, ROUNDING_MODE will be used.
   *
   * ```ts
   * BigNumber.config({ precision: 5, rounding: 4 })
   * x = new BigNumber(9876.54321)
   *
   * x.toDigits()                          // '9876.5'
   * x.toDigits(6)                         // '9876.54'
   * x.toDigits(6, BigNumber.ROUND_UP)     // '9876.55'
   * x.toDigits(2)                         // '9900'
   * x.toDigits(2, 1)                      // '9800'
   * x                                     // '9876.54321'
   * ```
   *
   * @param sd integer, 1 to 1e+9 inclusive
   * @param rm integer, 0 to 8 inclusive
   */
  toDigits(sd?: number, rm?: number): BigNumber;

  /**
   * Returns a string representing the value of this BigNumber in normal (fixed-point) notation rounded to dp decimal
   * places using rounding mode `rm`.
   *
   * If the value of this BigNumber in normal notation has fewer than `dp` fraction digits, the return value will be
   * appended with zeros accordingly.
   *
   * Unlike `Number.prototype.toFixed`, which returns exponential notation if a number is greater or equal to 10<sup>21</sup>, this
   * method will always return normal notation.
   *
   * If dp is omitted or is `null` or `undefined`, the return value will be unrounded and in normal notation. This is also
   * unlike `Number.prototype.toFixed`, which returns the value to zero decimal places.
   *
   * It is useful when fixed-point notation is required and the current `EXPONENTIAL_AT` setting causes toString to
   * return exponential notation.
   *
   * If `rm` is omitted or is `null` or `undefined`, `ROUNDING_MODE` is used.
   *
   * ```ts
   * x = 3.456
   * y = new BigNumber(x)
   * x.toFixed()                     // '3'
   * y.toFixed()                     // '3.456'
   * y.toFixed(0)                    // '3'
   * x.toFixed(2)                    // '3.46'
   * y.toFixed(2)                    // '3.46'
   * y.toFixed(2, 1)                 // '3.45'  (ROUND_DOWN)
   * x.toFixed(5)                    // '3.45600'
   * y.toFixed(5)                    // '3.45600'
   * ```
   *
   * @param dp integer, 0 to 1e+9 inclusive
   * @param rm integer, 0 to 8 inclusive
   */
  toFixed(dp?: number, rm?: number): string;

  /**
   * Same as [[valueOf]]
   *
   * ```ts
   * x = new BigNumber('177.7e+457')
   * y = new BigNumber(235.4325)
   * z = new BigNumber('0.0098074')
   *
   * // Serialize an array of three BigNumbers
   * str = JSON.stringify( [x, y, z] )
   * // "["1.777e+459","235.4325","0.0098074"]"
   *
   * // Return an array of three BigNumbers
   * JSON.parse(str, function (key, val) {
   *     return key === '' ? val : new BigNumber(val)
   * })
   * ```
   */
  toJSON(): string;

  /**
   * Returns a BigNumber whose value is the value of this BigNumber raised to the power `n`, and optionally modulo `a`
   * modulus `m`.
   *
   * If `n` is negative the result is rounded according to the current [[Configuration.DECIMAL_PLACES]] and
   * [[Configuration.ROUNDING_MODE]] configuration.
   *
   * If `n` is not an integer or is out of range:
   *  - If `ERRORS` is `true` a BigNumber Error is thrown,
   *  - else if `n` is greater than `9007199254740991`, it is interpreted as `Infinity`;
   *  - else if n is less than `-9007199254740991`, it is interpreted as `-Infinity`;
   *  - else if `n` is otherwise a number, it is truncated to an integer;
   *  - else it is interpreted as `NaN`.
   *
   * As the number of digits of the result of the power operation can grow so large so quickly, e.g.
   * 123.456<sup>10000</sup> has over 50000 digits, the number of significant digits calculated is limited to the
   * value of the [[Configuration.POW_PRECISION]] setting (default value: `100`) unless a modulus `m` is specified.
   *
   * Set [[Configuration.POW_PRECISION]] to `0` for an unlimited number of significant digits to be calculated (this
   * will cause the method to slow dramatically for larger exponents).
   *
   * Negative exponents will be calculated to the number of decimal places specified by
   * [[Configuration.DECIMAL_PLACES]] (but not to more than [[Configuration.POW_PRECISION]] significant digits).
   *
   * If `m` is specified and the value of `m`, `n` and this BigNumber are positive integers, then a fast modular
   * exponentiation algorithm is used, otherwise if any of the values is not a positive integer the operation will
   * simply be performed as `x.toPower(n).modulo(m)` with a `POW_PRECISION` of `0`.
   *
   * ```ts
   * Math.pow(0.7, 2)                // 0.48999999999999994
   * x = new BigNumber(0.7)
   * x.toPower(2)                    // '0.49'
   * BigNumber(3).pow(-2)            // '0.11111111111111111111'
   * ```
   *
   * @param n integer, -9007199254740991 to 9007199254740991 inclusive
   */
  pow(n: number, m?: number | string | BigNumber): BigNumber;

  /**
   * Returns a string representing the value of this BigNumber in the specified base, or base 10 if base is omitted or
   * is `null` or `undefined`.
   *
   * For bases above 10, values from 10 to 35 are represented by a-z (as with `Number.prototype.toString`), 36 to 61 by
   * A-Z, and 62 and 63 by `$` and `_` respectively.
   *
   * If a base is specified the value is rounded according to the current `DECIMAL_PLACES` and `ROUNDING_MODE`
   * configuration.
   *
   * If a base is not specified, and this BigNumber has a positive exponent that is equal to or greater than the
   * positive component of the current `EXPONENTIAL_AT` setting, or a negative exponent equal to or less than the
   * negative component of the setting, then exponential notation is returned.
   *
   * If base is `null` or `undefined` it is ignored.
   *
   * ```ts
   * x = new BigNumber(750000)
   * x.toString()                    // '750000'
   * BigNumber.config({ EXPONENTIAL_AT: 5 })
   * x.toString()                    // '7.5e+5'
   *
   * y = new BigNumber(362.875)
   * y.toString(2)                   // '101101010.111'
   * y.toString(9)                   // '442.77777777777777777778'
   * y.toString(32)                  // 'ba.s'
   *
   * BigNumber.config({ DECIMAL_PLACES: 4 });
   * z = new BigNumber('1.23456789')
   * z.toString()                    // '1.23456789'
   * z.toString(10)                  // '1.2346'
   * ```
   *
   * @param base integer, 2 to 64 inclusive
   */
  toString(base?: number): string;

  /**
   * As [[toString]], but does not accept a base argument and includes the minus sign for negative zero.`
   *
   * ```ts
   * x = new BigNumber('-0')
   * x.toString()                    // '0'
   * x.valueOf()                     // '-0'
   * y = new BigNumber('1.777e+457')
   * y.valueOf()                     // '1.777e+457'
   * ```
   */
  valueOf(): string;
}

//
// date.
export namespace date {

  /**
  * @desc: 判断是否是有效时间.
  */
  function isValidate(date: Date): boolean;

  /**
   * @desc: 获取时间的string.
   * @param localtime: ms.
   * @param fmt: 格式化, 默认为 'HH:mm:ss'
   *             年(y)、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
   *              'yyyy-MM-dd hh:mm:ss.S' ==> 2006-07-02 08:09:04.423
   *              'yyyy-MM-dd E HH:mm:ss' ==> 2009-03-10 星期二 20:09:04
   *              'yyyy-M-d h:m:s.S'      ==> 2006-7-2 8:9:4.18
   * @param weekFmt: 星期的文字格式, 默认为 {'0':'星期天', '1': '星期一', ..., '6':'星期六'}
   * @return: string.
   */
  function getTimeString(localtime: number, fmt: string, weekFmt: WeekFmt): string;


  /**
   * @desc: 获取指定时间距离现在的时间描述.
   *        例如, 昨天, 1小时前等.
   * @param localtime: ms. 小于当前时间, 大于当前时间将显示为 '刚刚';
   * @param strFmt: 需要显示的文字. 
   *                默认为 {
   *                        now:    '刚刚',           // 3秒钟以内将显示此信息.
   *                        second: '秒前',
   *                        minute: '分钟前',
   *                        hour:   '小时前',
   *                        day_yesterday: '昨天',
   *                        day:    '天前',
   *                        month:  '个月前',          // 6个月内将显示此信息.
   *                        time:   'yyyy-M-d h:m:s'  // 超过6个月将使用此格式格式化时间
   *                       }
   * @return: string.
   */
  function getTimeStringFromNow(localtime: number, strFmt: string): string;

  /**
   * @desc: getDate('2012-05-09')
   * @return: Date.
   */
  function getDate(strDate: string): Date


  /**
   * @desc: getDate2('20120509')
   * @return: Date.
   */
  function getDate2(strDate: string): Date;

  /**
   * @desc: 获取时间的协调世界时间 string.
   * @param localtime: ms. (本地时间)
   * @param fmt: 格式化, 默认为 'HH:mm:ss'
   *             年(y)、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
   *              'yyyy-MM-dd hh:mm:ss.S' ==> 2006-07-02 08:09:04.423
   *              'yyyy-MM-dd E HH:mm:ss' ==> 2009-03-10 星期二 20:09:04
   *              'yyyy-M-d h:m:s.S'      ==> 2006-7-2 8:9:4.18
   * @param weekFmt: 星期的文字格式, 默认为 {'0':'星期天', '1': '星期一', ..., '6':'星期六'}
   * @return: string.
   */
  function getUTCTimeString(localtime: number, fmt: string, weekFmt: WeekFmt): string;

  /**
   * @desc: 通过世界时间获取date. getDateFromUTC('2012-05-09')
   * @param strDateUTC: 世界日期字符串. '2012-05-09' 
   * @return: Date.
   */
  function getDateFromUTC(strDateUTC: string): Date;

  /**
   * @desc: 通过世界时间获取date. getDate2FromUTC('20120509')
   * @param strDateUTC: 世界日期字符串. '20120509' 
   * @return: Date.
   */
  function getDate2FromUTC(strDateUTC: string): Date;

  /**
   * @desc: 通过字符串获取date. getTime('2012-05-09 11:10:12')
   * @param strTime: 时间字符串. '2012-05-09 11:10:12' 
   * @return: Date.
   */
  function getTime(strTime:string): Date;

  /**
   * @desc: 通过时间获取date. getTime2('20120509111012')
   * @param strTime: 时间字符串. '20120509111012' 
   * @return: Date.
   */
  function getTime2(strTime:string): Date;
  
  /**
   * @desc: 通过世界时间获取date. getTimeFromUTC('2012-05-09 11:10:12')
   * @param strTimeUTC: 世界时间字符串. '2012-05-09 11:10:12' 
   * @return: Date.
   */
  function getTimeFromUTC(strTimeUTC: string): Date;

  /**
   * @desc: 通过世界时间获取date. getTime2FromUTC('20120509111012')
   * @param strTimeUTC: 世界日期字符串. '20120509111012' 
   * @return: Date.
   */
  function getTime2FromUTC(strTimeUTC: string): Date;
}
//
// utils.
export namespace utils {
  /**
   * @desc: 模拟sleep.
   * @return: Promise.
   *     在ms时间后执行.
   * @e.g.
   *     febs.utils.sleep(1000).then(()=>{
            //1000ms之后resolve.
        });
  */
  function sleep(ms: number): Promise<void>;
  function browserIsMobile(agent?: string): boolean;
  function browserIsIOS(agent?: string): boolean;
  function browserIsPhone(agent?: string): boolean;
  function browserIsWeixin(agent?: string): boolean;

  /**
   * [only in browser]
   */
  function browserIsIE(): boolean;
  /**
   * [only in browser]
   */
  function browserIEVer(): boolean;

  /**
   * @desc: the platform is Windows.
   */
  function platformIsWin(userAgent?:string):boolean;

  /**
   * @desc: the platform is Mac.
   */
  function platformIsMac(userAgent?:string):boolean;
  
  /**
   * [only in browser]
   */
  function browserIsSupportHtml5(): boolean;

  /**
   * @desc: 获取时间的string.
   * @param time: ms.
   * @param fmt: 格式化, 默认为 'HH:mm:ss'
   *             年(y)、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
   *              'yyyy-MM-dd hh:mm:ss.S' ==> 2006-07-02 08:09:04.423
   *              'yyyy-MM-dd E HH:mm:ss' ==> 2009-03-10 星期二 20:09:04
   *              'yyyy-M-d h:m:s.S'      ==> 2006-7-2 8:9:4.18
   * @param weekFmt: 星期的文字格式, 默认为 {'0':'星期天', '1': '星期一', ..., '6':'星期六'}
   * @return: string.
   */
  function getTimeString(time: number, fmt?: string, weekFmt?: WeekFmt): string;
  /**
   * @desc: 获取指定时间距离现在的时间描述.
   *        例如, 昨天, 1小时前等.
   * @param time: ms. 小于当前时间, 大于当前时间将显示为 '刚刚';
   * @param strFmt: 需要显示的文字. 
   *                默认为 {
   *                        now:    '刚刚',           // 3秒钟以内将显示此信息.
   *                        second: '秒前',
   *                        minute: '分钟前',
   *                        hour:   '小时前',
   *                        day_yesterday: '昨天',
   *                        day:    '天前',
   *                        month:  '个月前',          // 6个月内将显示此信息.
   *                        time:   'yyyy-M-d h:m:s'  // 超过6个月将使用此格式格式化时间
   *                       }
   * @return: string.
   */
  function getTimeStringFromNow(time: number, strFmt?: StrFmt): string;
  /**
   * @desc: getDate('2012-05-09')
   * @return: Date.
   */
  function getDate(strDate: string): Date;
  /**
   * @desc: getDate2('20120509')
   * @return: Date.
   */
  function getDate2(strDate: string): Date;
  /**
   * @desc: 合并多个map.
   * @return: {}
   */
  function mergeMap(...map: any[]): any;

  /**
  * @desc: 判断参数是否是null,undefined,NaN
  * @return: boolean
  */
  function isNull(e: any): boolean;
  /**
  * @desc: 将异步回调方式的方法转换成promise, 函数中的this可以为指定值.
  *         例如: yield denodeify(fs.exists)(path);
  * @param self: 指定的调用对象
  * @return: promise.
  */
  function denodeify(fn: any, self?: any, argumentCount?: number): (...args:any[])=>Promise<any>;
  /**
  * @desc: 将异步回调方式的方法转换成promise, 函数中的this可以为指定值.
  *         例如: yield denodeify(fs.exists)(path);
  * @param self: 指定的调用对象
  * @return: promise.
  */
  function promisify(fn: any, self?: any, argumentCount?: number): (...args:any[])=>Promise<any>;

  /**
   * @desc: 进行bigint类型转换. 如果数值超过15位,等同于 new BigNumber(v)
   */
  function bigint(v: any): number|BigNumber;
  /**
  * @desc: a%b.
  */
  function bigint_mod(a:any, b:any): BigNumber|number;
  /**
   * @desc: 判断是否是bigint.
   */
  function bigint_check(v: any): boolean;
  /**
   * @desc: a+b.
   */
  function bigint_add(a: any, b: any): BigNumber;
  /**
   * @desc: a-b.
   */
  function bigint_minus(a: any, b: any): BigNumber;
  /**
   * @desc: a/b.
   */
  function bigint_dividedBy(a: any, b: any): BigNumber;
  /**
   * @desc: a*b.
   */
  function bigint_mul(a: any, b: any): BigNumber;
  /**
   * @desc: a==b.
   */
  function bigint_equal(a: any, b: any): boolean;
  /**
   * @desc: a>b.
   */
  function bigint_more_than(a: any, b: any): boolean;
  /**
   * @desc: a>=b.
   */
  function bigint_more_than_e(a: any, b: any): boolean;
  /**
   * @desc: a<b.
   */
  function bigint_less_than(a: any, b: any): boolean;
  /**
   * @desc: a<=b.
   */
  function bigint_less_than_e(a: any, b: any): boolean;
  /**
  * @desc: 转换bigint->string.
  * @param fixed: 小数位个数, 默认为0.
  * @return: string.
  */
  function bigint_toFixed(a: any, fixed?: boolean): string;

  /**
  * @desc: 执行cmd.
  * @param cmd: 指令.
  * @param params: 输入参数数组.
  * @param cbFinish: 完成的回调.
  */
  function execCommand(cmd:string, params:string[], cbFinish:(err:any, stdout:string, stderr:string)=>void):void;
  /**
  * @desc: 执行cmd.
  * @param cmd: 指令.
  * @param params: 输入参数数组.
  * @param cbFinish: 完成的回调.
  */
  function execCommand(cmd:string, params:string[], options:{cwd?:string}, cbFinish:(err:any, stdout:string, stderr:string)=>void):void;
  /**
  * @desc: 执行cmd.
  * @param cmd: 指令.
  * @param params: 输入参数数组.
  * @param cbFinish: 完成的回调.
  */
  function execCommand(cmd:string, params:string[], options:{cwd?:string}):Promise<{stdout:string, stderr:string}>;
}

//
// string.
export namespace string {
  /**
  * @desc: 判断是否是手机号码.
  * @return: boolean.
  */
  function isPhoneMobile(str: string): boolean;

  /**
   * @desc: 判断是否是email.
   * @return: boolean.
   */
  function isEmail(str: string): boolean;

  /**
   * @desc: 判断是否是英文数字组合.
   * @return: boolean.
   */
  function isAlphaOrDigit(str: string): boolean;

  /**
   * @desc: 判断是否是中文.
   * @return: boolean.
   */
  function isChinese(str: string): boolean;
  
  /**
   * @desc: 是否为空串.
   * @return: boolean.
   */
  function isEmpty(s?: string): boolean;
  /**
   * @desc: 获得字符串utf8编码后的字节长度.
   * @return: u32.
   */
  function getByteSize(s?: string): number;
  /**
   * @desc: 替换字符串中所有的strSrc->strDest.
   * @return: string.
   */
  function replace(str: string, strSrc: string, strDest: string): string;
  /**
   * @desc: 将utf8字符串转为字节数组.
   * @return: [].
   */
  function utf8ToBytes(str:string):Array<number>;
  /**
  * @desc: 将utf8字节数组转为字符串.
  */
  function bytesToUtf8(utfBytes: Array<number>): string;
  /**
  * @desc: utf8Encode.
  */
  function utf8Encode(str: string): string;
  /**
  * @desc: utf8Decode.
  */
  function utf8Decode(str: string): string;
  /**
  * @desc: 去除两端空格.
  * @return: string.
  */
  function trim(str: string) : string;

  /**
  * @desc: 对字符串中的 <>空格 标签进行转义为 &lt;, &gt;
  * @return: string.
  */
  function escapeHtml(str: string): string;
}

export interface Base64Result {
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  data: Array<number>; // 字节数组
}

//
// crypt.
export namespace crypt {
  /**
   * @desc 
  * @return 生成一个uuid字符串. (uuid v1)
  */
  function uuid(): string;
  /**
   * @desc: 计算字符串的crc32值
   * @param crc 可以在这个值得基础上继续计算
   * @return: number.
   */
  function crc32(str: string, crc?: number): number;
  /**
   * @desc: [only in server] 直接对文件进行计算.
   * @param filename: 文件路径
   * @return: number
   */
  function crc32_file(filename: string): number;
  /**
   * @desc: [only in server] 直接对文件进行计算.
   * @param filename: 文件路径
   * @param length: 如果<0, 将会计算到文件的末尾.
   * @return: number
   */
  function crc32_fileSegment(filename: string, offset:number, length:number): number;

  /**
   * @desc: [only in browser] 通过文件表单控件进行文件的crc32计算.
   * @param fileObj: 表单文件对象, 例如表单为:
   *                  <form enctype="multipart/form-data">
   *                    <input id="file" type="file" name="file" multiple>
   *                  </form>
   *             $('#file')[0].files[0] 即为第一个文件对象.
   * @param cb: function(crc32) {}; 计算出来的crc32通过回调函数返回
   */
  function crc32_file(fileObj: any, cb: (crc32: number) => void): void;

  /**
   * @desc: 计算字符串的md5值
   * @return: string.
   */
  function md5(str: string|Buffer): string;
  /**
   * @desc: [only in server] 直接对文件进行计算.
   * @param filename: 文件路径
   * @return: string
   */
  function md5_file(filename: string): string;
  /**
   * @desc: 计算字符串的sha1值
   * @return: string.
   */
  function sha1(str: string|Buffer): string;
  /**
   * @desc: [only in server] 直接对文件进行计算.
   * @param filename: 文件路径
   * @return: string
   */
  function sha1_file(filename: string): string;
    /**
   * @desc: 分段计算方式.
   *  var hash = md5_begin();
   *  md5_update(hash, 'xxx');
   *  var hex = md5_finish(hash);
   */
  function md5_begin():any;
  function md5_update(hash:any, str: string|Buffer):void;
  function md5_finish(hash:any):string;

  /**
   * @desc: 分段计算方式.
   *  var hash = sha1_begin();
   *  sha1_update(hash, 'xxx');
   *  var hex = sha1_finish(hash);
   */
  function sha1_begin():any;
  function sha1_update(hash:any, str: string|Buffer):void;
  function sha1_finish(hash:any):string;
  /**
  * @desc: base64编码.
  * @return: string.
  */
  function base64_encode(arrByte:  Array<number>|Buffer|string): string;
  /**
  * @desc: [only in server]  使用上次的解码的数据继续进行base64解码.
  * @return: 
          {
              c1,
              c2,
              c3,
              c4,
              data, // 字节数组
          }.
  */
  function base64_decode(strBase64: string, c2?: number, c3?: number, c4?: number): Base64Result;

  /**
  * @desc: [only in browser] base64解码.
  * @return: 字节数组.
  */
  function base64_decode(strBase64: string): Array<number>;
}

//
// net.
export namespace net {
  /**
   * @desc: 使用fetch方式进行数据请求.
   *        如果超時, 可以catch到 'timeout'
   * @param option: 请求选项.
   *          {
                method, // 请求方法 get, post, delete 等.
                mode,   // 'no-cors', 'same-origin'等; (可忽略)
                headers, // 请求header, 例如:
                              {
                                "Content-Type": "application/json",
                                "Accept": 'application/json',
                              }
                body,    // 请求内容.
                timeout, // 超时 (ms), 默认为5000,
                credentials,  // 携带了credentials='include'则服务器需设置Access-Control-Allow-Credentials
              }
  * @return: 返回 Promise;
  * @e.g.
        febs.net.fetch(url, {})
        .then(response=>response.json())
        .then(data=>{})
        .catch(err=>{
          if (err === 'timeout)  // 超时.
        });
  */
  const fetch: Fetch;

  /**
  * @desc: [only in browser] 使用jquery.ajax类似参数调用.
  * @param cfg: 允许额外传递一个 progress:function(percent) {} 的参数来获取进度.
  * @return: 
  */
  function ajax(cfg: any): { abort: () => void }

  /**
   * @desc: [only in browser] jsonp方式获取数据.
   *        如果超時, 可以catch到 'timeout'
   * @param option: 请求选项同fetch. 可以附带如下的更多属性. jsonp只能使用`get`方式.
   *          {
                jsonpCallback, // jsonp请求时附带到地址中的callback参数, 默认为 'callback';
                              // 服务端需将查询字符串中的此参数作为返回数据中 `callback`([data])的 callback值
              }
  * @return: 返回 Promise;
  * @e.g.
        febs.net.jsonp(url, {})
        .then(response=>response.json())
        .then(data=>{})
        .catch(err=>{
          if (err === 'timeout)  // 超时.
        });
  */
  function jsonp(url: string, option: {
    method?:string, // 请求方法 get, post, delete 等.
    mode?:string|'no-cors'|'cors'|'same-origin',   // 'no-cors', 'same-origin'等; (可忽略)
    headers?:any, // 请求header, 例如:
                  // {
                  //   "Content-Type": "application/json",
                  //   "Accept": 'application/json',
                  // }
    body?:string,    // 请求内容.
    timeout?:number, // 超时 (ms), 默认为5000,
    credentials?:'include'|null|undefined,  // 携带了credentials='include'则服务器需设置Access-Control-Allow-Credentials
  }): Promise<any>;
}

//
// exception.
export class exception extends Error {
  constructor(msg: string, code: string, filename: string, line: number, column?: number);

  /** @desc: 错误代码 */
  code: string;
  /** @desc: 错误消息 */
  msg: string;
  /** @desc: 错误文件 */
  filename: string;
  /** @desc: 错误所在行 */
  line: number;
  /** @desc: 错误所在列 */
  column: number;
}

export namespace exception {

  /** @desc: 一般错误. */
  const ERROR: string;
  /** @desc: 参数错误. */
  const PARAM: string;
  /** @desc: 越界 */
  const OUT_OF_RANGE: string;
}

export interface DirExplorerRet {
  files: Array<string>;
  dirs: Array<string>;
}

//
// file.
export namespace file {
  /**
   * @desc: [only in server]  判断文件夹是否存在.
   * @return: boolean.
   */
  function dirIsExist(dir: string): boolean;
  /**
   * @desc: [only in server]  保证文件夹存在.
   * @return: bool. 若不存在新建; 文件夹存在返回true.
   */
  function dirAssure(dir: string): boolean;
  /**
   * @desc: [only in server]  复制文件夹.
   * @param callback: (err) => {}, 执行此函数时表示复制完成.
   * @return: bool.
   */
  function dirCopy(src: string, dest: string, callback: (err: any) => void): void;
  /**
   * @desc: [only in server]  复制文件夹 返回promise.
   * @return: Promise(()=>{}).
   */
  function dirCopyAsync(src: string, dest: string): Promise<()=>{}>;
  /**
  * @desc: copy dir exclude specify path.
  * @param excludePath: regex.
  * @return: Promise(()=>{})
  */
  function dirCopyExcludeAsync(src: string, dest: string): Promise<()=>{}>;
  function dirCopyExcludeAsync(src: string, dest: string, excludePath:RegExp): Promise<()=>{}>;
  /**
   * @desc: [only in server]  删除文件夹.
   * @return:bool.指明是否删除.
   */
  function dirRemoveRecursive(dir: string): boolean;
  /**
  * @desc: [only in server]  获取当前目录下的子文件与子目录.
  * @param dir: 要搜索的目录路径.
  * @param pattern: 子文件或子目录名称,匹配的正则表达式
  *                 仅从名称的第一个字符开始匹配, 例如: / a.* /, 匹配 a开头的文件名.
  * @return: {files:[], dirs:[]}; 发生错误返回null.
  */
  function dirExplorer(dir: string, pattern?: RegExp): DirExplorerRet | null;
  /**
  * @desc: [only in server]  递归获取当前目录下的所有子文件.
  * @param dir: 要搜索的目录路径.
  * @param pattern: 子文件或子目录名称,匹配的正则表达式
  *                 仅从名称的第一个字符开始匹配, 例如: / a.* /, 匹配 a开头的文件名.
  * @return: Array; 发生错误返回null.
  */
  function dirExplorerFilesRecursive(dir: string, pattern: RegExp): Array<string> | null;
  /**
  * @desc: [only in server]  递归获取当前目录下的所有子目录.
  * @param dir: 要搜索的目录路径.
  * @param pattern: 子文件或子目录名称,匹配的正则表达式
  *                 仅从名称的第一个字符开始匹配, 例如: / a.* /, 匹配 a开头的文件名.
  * @return: Array; 发生错误返回null.
  */
  function dirExplorerDirsRecursive(dir: string, pattern: RegExp): Array<string> | null;
  /**
   * @desc: [only in server]  获得文件的字节大小.
   * @return: number.-1表示错误.
   */
  function fileSize(file: string): number;
  /**
   * @desc: [only in server]  判断文件是否存在.
   * @return: boolean.
   */
  function fileIsExist(file: string): boolean;
  /**
   * @desc: [only in server]  复制文件.
   * @param callback: (err) => {}, 执行此函数时表示复制完成.
   * @return: bool.
   */
  function fileCopy(src: string, dest: string, callback: (err: any) => void): boolean;
  /**
   * @desc: [only in server]  复制文件 返回promise.
   * @return: Promise(()=>{}).
   */
  function fileCopyAsync(src: string, dest: string): Promise<()=>{}>;
  /**
   * @desc: [only in server]  移除文件.
   * @return: bool.指明是否删除.
   */
  function fileRemove(file: string): boolean;
  /**
   * @desc: [only in server]  移除文件 返回promise.
   * @return: Promise(()=>{}).
   */
  function fileRemoveAsync(file: string): Promise<()=>{}>;
}


export namespace upload {
  /**
   * @desc: [only in server]  接收上传文件内容.
   * @param conditionCB: async function(data, filesize, filename, filemimeType):string.
   *                      - data: 用户上传的数据.
   *                      - filesize: 将要存储的文件大小.
   *                      - filename: 上传的文件名.
   *                      - filemimeType: 文件类型, 例如: 'image/jpeg'.
   *                      - return: 存储的文件路径, 返回null表示不存储.
   * @param checkCrc32: 是否检测crc32值, 如果为true则, 请求时需附带crc32参数.
   * @param append: 是否追加存储.
   * @return Promise.
   * @resolve
   *     - bool. 指明是否存储成功.
   */
  function accept(app: any, conditionCB: (data: any, filesize: number, filename: string, filemimeType: string) => Promise<string>, checkCrc32?:boolean, append?:boolean): Promise<boolean>;

  /**
   * @desc: [only in server]  准备接收上传文件.
   * @param conditionCB: async function(data, filesize):string.
   *                      - filesize: 将要存储的文件大小(base64大小)
   *                      - data: 用户上传的数据.
   *                      - return: 本地存储的文件路径, 返回null表示不存储. 存储的文件必须不存在.
   * @param sessionSet:  function(data){} 用于设置存储在session中的临时文件信息;
   * @return Promise.
   * @resolve
   *     - bool. 指明是否开始接收文件流.
   */
  function base64_acceptHeader(app: any, conditionCB: (data: any, filesize: number) => Promise<string>, sessionSet: (data: any) => void): Promise<boolean>;
  /**
   * @desc: [only in server]  上传文件内容.
   *  发生错误会自动调用 cleanup
   * @param finishCB: async function(filename):any.
   *                      - filename: 本地存储的文件名.
   *                      - return: 返回给客户端的数据. 不能包含err数据.
   *
   * @param sessionGet:  function() {} 用于获取存储在session中的临时文件信息;
   * @param sessionSet:  function(data){} 用于设置存储在session中的临时文件信息;
   * @param sessionClear: function() {} 用于清除存储在session中的临时信息
   * @return Promise
   * @resolve
   */
  function base64_accept(app: any, finishCB: (filename: string) => Promise<any>, sessionGet: () => any, sessionSet: (data: any) => void, sessionClear: () => void): Promise<any>;
  /**
  * @desc: [only in server]  在用户登出或其他中断传输中清除上传的数据.
  * @param sessionGet:  function() {} 用于获取存储在session中的临时文件信息;
  * @param sessionClear: function() {} 用于清除存储在session中的临时信息
  * @return: 
  */
  function base64_cleanup(sessionGet: () => any, sessionClear: () => void, cleanFile?: boolean): void;
}


export type SELECTOR = any; /*string|dom|HTMLElement; */

/**
* @desc: [only browser]
*/
export interface dom {

  /**
   * 支持 
   *    - .name 使用类名构建.
   *    - #name 使用id名构建.
   *    - name  使用tag名构建.
   *    - <div...>...</div> 使用内容构建.
   *    - node.
   * 不支持带空格多层结构的情况.
   */
  new(selector?: SELECTOR):dom;

  get(index: number): any;

  /**
   * @desc: hasClass
   */
  hasClass(cName: string): boolean;

  /**
   * @desc: addClass
   */
  addClass(cName: string): dom;

  /**
   * @desc: removeClass
   */
  removeClass(cName: string): dom;

  /**
   * @desc: toggleClass
   */
  toggleClass(cName: string): dom;

  /**
   * @desc: remove
   */
  remove(): void;

  /**
   * @desc: append
   */
  append(selector?: SELECTOR): dom;

  /**
   * appendTo
   */
  appendTo(selector?: SELECTOR): dom;

  /**
   * @desc: prepend
   */
  prepend(selector?: SELECTOR): dom;

  /**
   * @desc: prependTo
   */
  prependTo(selector?: SELECTOR): dom;

  /**
   * @desc: before
   */
  before(selector?: SELECTOR): dom;

  /**
   * insertBefore
   */
  insertBefore(selector?: SELECTOR): dom;

  /**
   * @desc: after
   */
  after(selector?: SELECTOR): dom;

  /**
   * @desc: insertAfter
   */
  insertAfter(selector?: SELECTOR): dom;

  /**
   * @desc: attr.
   */
  attr(attrName: any, value: any): string;

  /**
   * @desc: removeAttr
   */
  removeAttr(name: any): dom;

  /**
  * @desc: empty.
  */
  empty(): dom;

  /**
  * @desc: html.
  */
  html(v: string): string;


  /**
  * @desc: text.
  */
  text(v: string): string;

  /**
  * @desc: val.
  */
  val(v: string): string;


  /**
  * @desc: css.
  */
  css(name: string, value: string): string;

  /**
   * html.
   */
  parent(selector?: SELECTOR): dom;
  parents(selector?: SELECTOR): dom;
  children(selector?: SELECTOR): dom;
  prev(selector?: SELECTOR): dom;
  next(selector?: SELECTOR): dom;


  /**
  * @desc: on.
  */
  on(eventname: string, foo: any): dom;
  bind(eventname: string, foo: any): dom;
  live(eventname: string, foo: any): dom;

  /**
  * @desc: off.
  */
  off(eventname: string, foo?: any): dom;
  unbind(eventname: string, foo?: any): dom;
  die(eventname: string, foo?: any): dom;

  /**
  * @desc: one.
  */
  one(event: string, f: any): dom;

  /**
  * @desc: trigger.
  */
  trigger(eventname: string, extraParameters?: any): dom;

  ready(f?: any): dom;
  unload(f?: any): dom;
  blur(f?: any): dom;
  change(f?: any): dom;
  click(f?: any): dom;
  dblclick(f?: any): dom;
  error(f?: any): dom;
  keydown(f?: any): dom;
  keypress(f?: any): dom;
  keyup(f?: any): dom;
  load(f?: any): dom;
  mousedown(f?: any): dom;
  mouseenter(f?: any): dom;
  mouseleave(f?: any): dom;
  mousemove(f?: any): dom;
  mouseout(f?: any): dom;
  mouseover(f?: any): dom;
  mouseup(f?: any): dom;
  scroll(f?: any): dom;
  select(f?: any): dom;
  submit(f?: any): dom;

  [index: number]: dom;
}

/**
* @desc: [only browser]
*/
export namespace dom {

  /**
  * @desc: 获得视口大小.
  * @return: {width, height}
  */
  function getViewPort(): { width: number, height: number };

  /**
  * @desc: 获得文档大小.
  * @return: {width, height}
  */
  function getDocumentPort(): { width: number, height: number };

  /**
  * @desc: 获得document scroll offset.
  * @return: {top, left}
  */
  function getDocumentOffset(): { top: number, left: number };

  /**
  * @desc: 获取指定元素相对于视口的的offset
  * @return: 
  */
  function getElementOffset(e: any): { left: number, top: number };

  /**
  * @desc: 判断是否是dom对象.
  * @return: boolean.
  */
  function isDom(e: any): boolean;

  /**
  * @desc: 统一处理 addEventListener, attachEvent; 并提供useCapture参数问题.
  */
  function addEventListener(domElement:any, event:string, func:any, useCapture?:boolean):null;

  /**
  * @desc: 统一处理 removeEventListener, detachEvent; 并提供useCapture参数问题.
  */
  function removeEventListener(domElement:any, event:string, func:any, useCapture?:boolean):null;
}

export function $(select: SELECTOR): dom;