// Type definitions for febs

/// <reference types="node" />


declare global {
  const __line: number;
  let __debug: boolean;
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
  * @desc: 将异步回调方式的方法转换成promise, 函数中的this可以为指定值.
  *         例如: yield denodeify(fs.exists)(path);
  * @param self: 指定的调用对象
  * @return: promise.
  */
  function denodeify(fn: any, self: any, argumentCount?: number): Promise<any>;

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
   * @desc: [服务端调用] 直接对文件进行计算.
   * @param filename: 文件路径
   * @return: number
   */
  function crc32_file(filename: string): number;

  /**
   * @desc: 计算字符串的md5值
   * @return: string.
   */
  function md5(str: string|Buffer): string;
  /**
   * @desc: [服务端调用] 直接对文件进行计算.
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
   * @desc: [服务端调用] 直接对文件进行计算.
   * @param filename: 文件路径
   * @return: string
   */
  function sha1_file(filename: string): string;
  /**
  * @desc: base64编码.
  * @return: string.
  */
  function base64_encode(arrByte: Buffer): string;
  /**
  * @desc: [服务端端调用] 使用上次的解码的数据继续进行base64解码.
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
  function fetch(url: string, option: object): Promise<any>;
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
  function jsonp(url: string, option: object): Promise<any>;
}

//
// exception.
export class exception {
  constructor(msg: string, code: string, filename: string, line: number);

  /** @desc: 错误代码 */
  code: string;
  /** @desc: 错误消息 */
  msg: string;
  /** @desc: 错误文件 */
  filename: string;
  /** @desc: 错误所在行 */
  line: string;
}

export interface DirExplorerRet {
  files: Array<string>;
  dirs: Array<string>;
}

//
// file.
export namespace file {
  /**
   * @desc: 判断文件夹是否存在.
   * @return: boolean.
   */
  function dirIsExist(dir: string): boolean;
  /**
   * @desc: 保证文件夹存在.
   * @return: bool. 若不存在新建; 文件夹存在返回true.
   */
  function dirAssure(dir: string): boolean;
  /**
   * @desc: 复制文件夹.
   * @param callback: (err) => {}, 执行此函数时表示复制完成.
   * @return: bool.
   */
  function dirCopy(src: string, dest: string, callback: (err: any) => void): void;
  /**
   * @desc: 删除文件夹.
   * @return:bool.指明是否删除.
   */
  function dirRemoveRecursive(dir: string): boolean;
  /**
  * @desc: 获取当前目录下的子文件与子目录.
  * @param dir: 要搜索的目录路径.
  * @param pattern: 子文件或子目录名称,匹配的正则表达式
  *                 仅从名称的第一个字符开始匹配, 例如: / a.* /, 匹配 a开头的文件名.
  * @return: {files:[], dirs:[]}; 发生错误返回null.
  */
  function dirExplorer(dir: string): DirExplorerRet | null;
  /**
  * @desc: 递归获取当前目录下的所有子文件.
  * @param dir: 要搜索的目录路径.
  * @param pattern: 子文件或子目录名称,匹配的正则表达式
  *                 仅从名称的第一个字符开始匹配, 例如: / a.* /, 匹配 a开头的文件名.
  * @return: Array; 发生错误返回null.
  */
  function dirExplorerFilesRecursive(dir: string, pattern: RegExp): Array<string> | null;
  /**
  * @desc: 递归获取当前目录下的所有子目录.
  * @param dir: 要搜索的目录路径.
  * @param pattern: 子文件或子目录名称,匹配的正则表达式
  *                 仅从名称的第一个字符开始匹配, 例如: / a.* /, 匹配 a开头的文件名.
  * @return: Array; 发生错误返回null.
  */
  function dirExplorerDirsRecursive(dir: string, pattern: RegExp): Array<string> | null;
  /**
   * @desc: 获得文件的字节大小.
   * @return: number.-1表示错误.
   */
  function fileSize(file: string): number;
  /**
   * @desc: 判断文件是否存在.
   * @return: boolean.
   */
  function fileIsExist(file: string): boolean;
  /**
   * @desc: 复制文件.
   * @param callback: (err) => {}, 执行此函数时表示复制完成.
   * @return: bool.
   */
  function fileCopy(src: string, dest: string, callback: (err: any) => void): boolean;
  /**
   * @desc: 移除文件.
   * @return: bool.指明是否删除.
   */
  function fileRemove(file: string): boolean;
}


export namespace upload {
  /**
   * [服务端调用] 接收上传文件内容.
   * @param conditionCB: async function(data, filesize, filename, filemimeType):string.
   *                      - data: 用户上传的数据.
   *                      - filesize: 将要存储的文件大小.
   *                      - filename: 上传的文件名.
   *                      - filemimeType: 文件类型, 例如: 'image/jpeg'.
   *                      - return: 存储的文件路径, 返回null表示不存储.
   * @return Promise.
   * @resolve
   *     - bool. 指明是否存储成功.
   */
  function accept(app: any, conditionCB: (data: any, filesize: number, filename: string, filemimeType: string) => Promise<string>): Promise<boolean>;

  /**
   * 准备接收上传文件.
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
   * 上传文件内容.
   *  发生错误会自动调用 cleanup
   * @param finishCB: async function(filename):object.
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
  * @desc: 在用户登出或其他中断传输中清除上传的数据.
  * @param sessionGet:  function() {} 用于获取存储在session中的临时文件信息;
  * @param sessionClear: function() {} 用于清除存储在session中的临时信息
  * @return: 
  */
  function base64_cleanup(sessionGet: () => any, sessionClear: () => void, cleanFile?: boolean): void;
}

export namespace exception {

  /** @desc: 一般错误. */
  const ERROR: string;
  /** @desc: 参数错误. */
  const PARAM: string;
  /** @desc: 越界 */
  const OUT_OF_RANGE: string;
}