// Type definitions for febs

/// <reference types="node" />


declare global {
  let __debug: boolean;

  export function requestAnimationFrame(cb: (tm: number) => void): any;
  export function cancelAnimationFrame(timer: any): void;
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
  function browserIsMobile(): boolean;
  function browserIsIOS(): boolean;
  function browserIsPhone(): boolean;
  function browserIsWeixin(): boolean;
  function browserIsIE(): boolean;
  function browserIEVer(): boolean;

  // only in client.
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
  function mergeMap(...map: object[]): object;

  /**
  * @desc: 判断参数是否是null,undefined,NaN
  * @return: boolean
  */
  function isNull(e: any): boolean;
  /**
   * @desc: 判断是否是bigint.
   */
  function bigint_check(v: any): boolean;
  /**
   * @desc: a+b.
   */
  function bigint_add(a: any, b: any): any;
  /**
   * @desc: a-b.
   */
  function bigint_minus(a: any, b: any): any;
  /**
   * @desc: a/b.
   */
  function bigint_dividedBy(a: any, b: any): any;
  /**
   * @desc: a*b.
   */
  function bigint_mul(a: any, b: any): any;
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

  function trim(str: string): string;
  
  /**
  * @desc: 对字符串中的 <>空格"& 标签进行转义为 &lt;, &gt;
  * @return: string.
  */
  function escapeHtml(str: string): string;
}

//
// crypt.
export namespace crypt {
  /**
   * @desc: 计算字符串的crc32值
   * @param crc 可以在这个值得基础上继续计算
   * @return: number.
   */
  function crc32(str: string, crc?: number): number;
  /**
   * @desc: [客户端调用] 通过文件表单控件进行文件的crc32计算.
   * @param fileObj: 表单文件对象, 例如表单为:
   *                  <form enctype="multipart/form-data">
   *                    <input id="file" type="file" name="file" multiple>
   *                  </form>
   *             dom('#file')[0].files[0] 即为第一个文件对象.
   * @param cb: function(crc32) {}; 计算出来的crc32通过回调函数返回
   */
  function crc32_file(fileObj: object, cb: (crc32: number) => void): void;

  /**
   * @desc: 计算字符串的md5值
   * @return: string.
   */
  function md5(str: string | Buffer): string;

  /**
   * @desc: 计算字符串的sha1值
   * @return: string.
   */
  function sha1(str: string | Buffer): string;

  /**
  * @desc: base64编码.
  * @param arrByte: 字节数组.
  * @return: string.
  */
  function base64_encode(arrByte: Array<number> | Buffer): string;
  /**
  * @desc: base64解码.
  * @return: 字节数组.
  */
  function base64_decode(strBase64: string): Array<number>;
}

//
// net.
export namespace net {

  /**
  * @desc: 使用jquery.ajax类似参数调用.
  * @param cfg: 允许额外传递一个 progress:function(percent) {} 的参数来获取进度.
  * @return: 
  */
  function ajax(cfg: any): { abort: () => void }

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
  function fetch(url: string, option: {
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
  }): Promise<any>;
  /**
   * @desc: jsonp方式获取数据.
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
  }): Promise<any>;
}

export type SELECTOR = any; /*string|dom|HTMLElement; */

//
// like jquery.
export class dom {

  /**
   * 支持 
   *    - .name 使用类名构建.
   *    - #name 使用id名构建.
   *    - name  使用tag名构建.
   *    - <div...>...</div> 使用内容构建.
   *    - node.
   * 不支持带空格多层结构的情况.
   */
  constructor(selector?: SELECTOR);

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

declare global {

  export function $(n: any): dom;

  export namespace $ {
    var fn: any;

    function extend(...args: any[]): dom;
    function extend(deep: true, ...args: any[]): dom;
  }
}
