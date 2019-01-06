febs 库是一些常用的工具的合集;

febs实现了jquery的常用方法(dom操作/事件/css/遍历等), 当页面引入febs前如果未引入jquery, 会自动设置全局变量 `$` 为内部实现的jquery相关方法.

大多数场景下可以使用febs库代替jquery, 而解决jquery臃肿的问题.

> 兼容ie9及以上浏览器

febs按功能分为如下的js包.

| name |  require path  |  feature     |
|----|--------|-------|
| febs.js  |  require('febs-browser')  |  all feature |
| febs.base.js  |  require('febs-browser/base')  |  base feature |
| febs.bigint.js  |  require('febs-browser/bigint')  |  bigint feature: febs.utils.bigint_xxx |
| febs.md5.js  |  require('febs-browser/md5')  |  md5 crypto feature: febs.crypt.md5() |
| febs.sha1.js  |  require('febs-browser/sha1')  |  sha1 crypto feature: febs.crypt.sha1() |



# Install

Use npm to install:

```js
npm install febs-browser --save
```

# nodejs

以下列方式使用

```js
var febs = require('febs-browser');

//
febs.string.replace();
```

# browser

以下列方式使用 (将不同的功能分解到不同的包中)

> copy directory `node_modules/febs/dist/febs` to client

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />  <!-- 如ie9等早期浏览器提示使用最新渲染器 -->
<link rel="stylesheet" type="text/css" href="path/febs/febs.css" />
<script charset='UTF-8' type="text/javascript" src="path/febs/febs.base.js"></script>
<script charset='UTF-8' type="text/javascript" src="path/febs/febs.sha1.js"></script> <!-- febs.crypt.sha1()方法 -->
<script charset='UTF-8' type="text/javascript" src="path/febs/febs.md5.js"></script> <!-- febs.crypt.md5()方法 -->
<script charset='UTF-8' type="text/javascript" src="path/febs/febs.bigint.js"></script> <!-- febs.utils.bigint_xxx()方法 -->

<script>
febs.string.replace();
</script>
```

# babel

以下列方式使用

```js
import febs from 'febs-browser'; // 使用febs的客户端部分代码.

//
febs.string.replace();
```

# framework

![](../doc/framework.png)

  - [dom](#dom)
  - [date](#date)
  - [utils](#utils)
  - [string](#string)
  - [crypt](#crypt)
  - [animationFrame](#animationFrame)
  - [net](#net)
  - [jquery $](#jquery)

# 说明

客户端中已将旧版本中的jquery依赖的相关内容抽出到 [febs-ui](https://www.npmjs.com/package/febs-ui) 库中, `febs`将不再依赖 `jquery`. (ie9以下浏览器需要jquery/zepto).


* 定义了如下一些全局变量

| name           | description |
|----------------|-------------|
| __line  | 当前所在行, 可以配合 __filename 定位错误日志   |
| __debug  |  判断当前的环境process.env.NODE_ENV是否为development, 如对此值设置后, 使用设置后的值.  |
| console.debug  | development 环境下输出日志  |

> 其他
* 函数调用使用 `类名.xxx` 的方式调用, 例如: `febs.utils.browserIsMobile()` 
* 对早期的浏览器定义了`window.requestAnimationFrame`和`window.cancelAnimationFrame`方法,可进行动画帧操作.
* 对早期的浏览器添加了`Promise`支持.

# dom

```js
  /**
  * @desc: 获得视口大小.
  * @return: {width, height}
  */
  febs.dom.getViewPort():{width:number, height:number};

  /**
  * @desc: 获得文档大小.
  * @return: {width, height}
  */
  febs.dom.getDocumentPort():{width:number, height:number};

  /**
  * @desc: 获得document scroll offset.
  * @return: {top, left}
  */
  febs.dom..getDocumentOffset():{top:number, left:number};

  /**
  * @desc: 获取指定元素相对于视口的的offset
  * @return: 
  */
  febs.dom.getElementOffset(e:any):{left:number, top:number};
  /**
  * @desc: 判断是否是dom对象.
  * @return: boolean.
  */
  febs.dom.isDom(e: any): boolean;
  /**
  * @desc: 统一处理 addEventListener, attachEvent; 并提供useCapture参数问题.
  */
  febs.dom.addEventListener(domElement:any, event:string, func:any, useCapture?:boolean):null;
  /**
  * @desc: 统一处理 removeEventListener, detachEvent; 并提供useCapture参数问题.
  */
  febs.dom.removeEventListener(domElement:any, event:string, func:any, useCapture?:boolean):null;
```

# date

date库包含了一些常用的时间操作库, 如验证时间对象是否有效等.

```js

  /**
  * @desc: 判断是否是有效时间.
  */
  febs.date.isValidate(date: Date): boolean;

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
  febs.date.getTimeString(localtime: number, fmt: string, weekFmt: WeekFmt): string;

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
   febs.date.getUTCTimeString(localtime: number, fmt: string, weekFmt: WeekFmt): string;

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
  febs.date.getTimeStringFromNow(localtime: number, strFmt: string): string;

  /**
   * @desc: getDate('2012-05-09')
   * @return: Date.
   */
  febs.date.getDate(strDate: string): Date

  /**
   * @desc: 通过世界时间获取date. getDateFromUTC('2012-05-09')
   * @param strDateUTC: 世界日期字符串. '2012-05-09' 
   * @return: Date.
   */
  febs.date.getDateFromUTC(strDateUTC: string): Date;

  /**
   * @desc: getDate2('20120509')
   * @return: Date.
   */
  febs.date.getDate2(strDate: string): Date;


  /**
   * @desc: 通过世界时间获取date. getDate2FromUTC('20120509')
   * @param strDateUTC: 世界日期字符串. '20120509' 
   * @return: Date.
   */
  febs.date.getDate2FromUTC(strDateUTC: string): Date;

  /**
   * @desc: 通过字符串获取date. getTime('2012-05-09 11:10:12')
   * @param strTime: 时间字符串. '2012-05-09 11:10:12' 
   * @return: Date.
   */
  febs.date.getTime(strTime:string): Date;

  /**
   * @desc: 通过时间获取date. getTime2('20120509111012')
   * @param strTime: 时间字符串. '20120509111012' 
   * @return: Date.
   */
  febs.date.getTime2(strTime:string): Date;

  /**
   * @desc: 通过世界时间获取date. getTimeFromUTC('2012-05-09 11:10:12')
   * @param strTimeUTC: 世界时间字符串. '2012-05-09 11:10:12' 
   * @return: Date.
   */
  febs.date.getTimeFromUTC(strTimeUTC: string): Date;

  /**
   * @desc: 通过世界时间获取date. getTime2FromUTC('20120509111012')
   * @param strTimeUTC: 世界日期字符串. '20120509111012' 
   * @return: Date.
   */
  febs.date.getTime2FromUTC(strTimeUTC: string): Date;
```

# utils

utils库包含了一些常用的函数, 如判断浏览器是否是手机/时间字符串格式化等.
```js
/**
 * @desc: 模拟sleep.
 * @return: Promise.
 *     在ms时间后执行.
 * @e.g.
 *     febs.utils.sleep(1000).then(()=>{
          //1000ms之后resolve.
       });
 */
febs.utils.sleep(ms)
```

```js
/**
 * @desc: the browser is mobile.
 * @param userAgent: 在服务器调用时需传入客户端的userAgent
 */
febs.utils.browserIsMobile()
/**
 * @desc: the browser is ios.
 * @param userAgent: 在服务器调用时需传入客户端的userAgent
 */
febs.utils.browserIsIOS()
/**
 * @desc: the browser is phone.
 * @param userAgent: 在服务器调用时需传入客户端的userAgent
 */
febs.utils.browserIsPhone()
/**
 * @desc: the browser is weixin.
 * @param userAgent: 在服务器调用时需传入客户端的userAgent
 */
febs.utils.browserIsWeixin()
/**
* @desc: 判断是否是ie.
*/
febs.utils.browserIsIE()
/**
* @desc: 判断ie版本号.
* @return number. 非ie返回Number.MAX_SAFE_INTEGER.
*/
febs.utils.browserIEVer()
/**
 * @desc: the browser is support html5.
 */
febs.utils.browserIsSupportHtml5()  `服务端不支持`
```
```js
/**
 * @desc: 合并多个map.
 * @return: {}
 */
febs.utils.mergeMap(...)
```
```js
/**
* @desc: 判断参数是否是null,undefined,NaN
* @return: boolean
*/
febs.utils.isNull(e)
/**
* @desc: 将异步回调方式的方法转换成promise, 函数中的this可以为指定值.
*         例如: yield denodeify(fs.exists)(path);
* @param self: 指定的调用对象
* @return: promise.
*/
febs.utils.denodeify(fn, self, argumentCount)
```

```js
// 大数运算.

大数类型: febs.BigNumber

/**
 * @desc: 进行bigint类型转换. 如果数值超过15位,等同于 new BigNumber(v)
 */
febs.utils.bigint(v: any): number|BigNumber;

/**
 * @desc: 判断是否是bigint.
 */
febs.utils.bigint_check(v)

/**
* @desc: calc bigint
* @return: bignumber.
*/
febs.utils.bigint_add(a, b)
febs.utils.bigint_minus(a, b)
febs.utils.bigint_dividedBy(a, b)
febs.utils.bigint_mul(a, b)
/**
* @desc: compare with bigint.
* @return: boolean.
*/
febs.utils.bigint_equal(a, b)
febs.utils.bigint_more_than(a, b)
febs.utils.bigint_more_than_e(a, b)   // more than or equal.
febs.utils.bigint_less_than(a, b)
febs.utils.bigint_less_than_e(a, b)   // less than or equal.
/**
* @desc: 转换bigint->string.
* @param fixed: 小数位个数, 默认为0.
* @return: string.
*/
febs.utils.bigint_toFixed(a, fixed)
```

# string
string 提供了一些js string对象缺少且较常使用的函数.
```js
/**
* @desc: 判断是否是手机号码.
* @return: boolean.
*/
febs.string.isPhoneMobile(str)
/**
 * @desc: 是否为空串.
 * @return: boolean.
 */
febs.string.isEmpty(s)
/**
 * @desc: 获得字符串utf8编码后的字节长度.
 * @return: u32.
 */
febs.string.getByteSize(s)
/**
 * @desc: 替换字符串中所有的strSrc->strDest.
 * @return: string.
 */
febs.string.replace(str, strSrc, strDest)
/**
 * @desc: 去除两端空格.
 * @return: string.
 */
febs.string.trim(str)
/**
* @desc: 对字符串中的 <>空格"& 标签进行转义为 & lt;, & gt;
* @return: string.
*/
febs.string.escapeHtml(str); 
```

# crypt
目前提供了uuid,crc32,base64.

客户端独有.
```js
/**
 * @desc: 通过文件表单控件进行文件的crc32计算.
 * @param fileObj: 表单文件对象, 例如表单为:
 *                  <form enctype="multipart/form-data">
 *                    <input id="file" type="file" name="file" multiple>
 *                  </form>
 *             $('#file')[0].files[0] 即为第一个文件对象.
 * @param cb: function(crc32) {}; 计算出来的crc32通过回调函数返回
 */
febs.crypt.crc32_file(fileObj, cb)

/**
* @desc: base64解码.
* @return: 字节数组.
*/
febs.crypt.base64_decode(strBase64)
```

通用.
```js
/**
 * @desc: 计算字符串的crc32值
 * @param crc 可以在这个值得基础上继续计算
 * @return: number.
 */
febs.crypt.crc32( str, crc )
/**
* @desc: base64编码.
* @param arrByte: 字节数组.
* @return: string.
*/
febs.crypt.base64_encode(arrByte)
/**
 * @desc: 计算md5.
 * @return: string
 */
febs.crypt.md5( strOrBuffer )
/**
 * @desc: 计算sh1.
 * @return: string
 */
febs.crypt.sha1( strOrBuffer )


/**
* @desc: 生成一个uuid (客户端为v4 random, 服务端为v1 timestamp).
* @return: 
*/
febs.crypt.uuid()
```

# animationFrame

各浏览器兼容的 `requestAnimationFrame`, `cancelAnimationFrame` 动画方法.

```js

var total = 0;
var timer;
var now = Date.now();

function foo(tm) {
  var now2 = Date.now();
  total += now2-now;
  now = now2;
  if (total > 10000) {
    cancelAnimationFrame(timer);
  } else {
    timer = requestAnimationFrame(foo);
  }
}

timer = requestAnimationFrame(foo);

```

# net
net封装了浏览器通信方法: ajax, fetch, jsonp
```js
/**
* @desc: 使用jquery.ajax类似参数调用.
* @param cfg: 允许额外传递一个 progress:function(percent) {} 的参数来获取上传进度.
* @return: 
*/
febs.net.ajax(cfg:any):{abort:()=>void}
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
              progress, // 允许设置进度cb. function(percent) {}
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
febs.net.fetch(url, option)
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
febs.net.jsonp(url, option)
```

# jquery

febs库模拟了jquery的常用方法(dom操作/事件/css等), 当页面引入febs前如果未引入jquery, 会自动设置全局变量 `$` 为内部实现的jquery相关方法.

目前已经实现的方法如下:

### 常用

```js

  /**
   * 支持 
   *    - .name 使用类名构建.
   *    - #name 使用id名构建.
   *    - name  使用tag名构建.
   *    - input[name="xxx"] 这样的选择器.
   *    - input[name="xxx"]:checked 这样的选择器.
   *    - input[name="xxx"]:disabled 这样的选择器.
   *    - <div...>...</div> 使用内容构建.
   *    - node.
   */
  $(selector?:string|dom|HTMLElement);

  get(index:number): any;

  hasClass( cName:string ): boolean;
  addClass( cName:string ): $;
  removeClass( cName:string ): $;
  toggleClass( cName:string ): $;

  remove(): void;
  append(selector?:string|dom|HTMLElement): $;
  appendTo(selector?:string|dom|HTMLElement): $;
  prepend(selector?:string|dom|HTMLElement): $;
  prependTo(selector?:string|dom|HTMLElement): $;
  before(selector?:string|dom|HTMLElement): $;
  insertBefore(selector?:string|dom|HTMLElement): $;
  after(selector?:string|dom|HTMLElement): $;
  insertAfter(selector?:string|dom|HTMLElement): $;

  attr(attrName:any, value:any): string;
  removeAttr(name:any): $;
  
  empty(): $;
  html(v:string): string;
  text(v:string): string;
  val(v:string): string;
  css(name:string, value:string): string;
```

### 事件.

```js

  on(eventname:string, foo:any): $;
  one(event:string, f:any): $;
  off(eventname:string, foo?:any): $;
  trigger(eventname:string, extraParameters?:any): $; // extraParameters仅支持自定义事件.
  ready(f?:any):$;
  unload(f?:any):$;
  blur(f?:any):$;
  change(f?:any):$;
  click(f?:any):$;
  dblclick(f?:any):$;
  error(f?:any):$;
  keydown(f?:any):$;
  keypress(f?:any):$;
  keyup(f?:any):$;
  load(f?:any):$;
  mousedown(f?:any):$;
  mouseenter(f?:any):$;
  mouseleave(f?:any):$;
  mousemove(f?:any):$;
  mouseout(f?:any):$;
  mouseover(f?:any):$;
  mouseup(f?:any):$;
  scroll(f?:any):$;
  select(f?:any):$;
  submit(f?:any):$;
```

### 遍历

```js
  parent(selector?:string|dom|HTMLElement) : $;
  parents(selector?:string|dom|HTMLElement) : $;
  children(selector?:string|dom|HTMLElement) : $;
  prev(selector?:string|dom|HTMLElement) : $;
  next(selector?:string|dom|HTMLElement) : $;
  each((e)=>{});
```