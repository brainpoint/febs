citong 库是一些常用的工具的合集;

citong web库分为客户端与服务器端;
- [客户端](#client)
- [服务端](#server)

##### 1. 网页模板在前端库中:
  citong/client/partials
##### 2. 各个控件使用说明请参看后台库
  citong/server/controls
##### 3. 服务端库分为
  exception,
  utils,
  controls,
  file,
  string,
  crypt


# client
***
浏览器前端库在位置citong/client中, 可以在浏览器中如下使用; 在使用前需引入jquery的两个库
```js
<script src="jquery.min.js"></script>
<script src="jquery.form.min.js"></script>
<script src="citong/client/citong.js"></script>
```
提供如下功能:
  - [utils](#utils)
  - [crypt](#crypt)
  - [ajax](#ajax)
  - [controls](#controls)

***
### utils
```js
/**
* @return 生成一个uuid字符串.
*/
uuid()
/**
* @desc: 判断是否是手机号码.
* @return: boolean.
*/
isPhoneMobile(str)
/**
 * @desc: the browser is mobile.
 */
browserIsMobile()
/**
 * @desc: the browser is ios.
 */
browserIsIOS()
/**
 * @desc: the browser is phone.
 */
browserIsPhone()
/**
 * @desc: the browser is weixin.
 */
browserIsWeixin()
/**
 * @desc: the browser is support html5.
 */
browserIsSupportHtml5()

/**
 * @desc: 获取时间的string.
 * @param time: 秒数.
 * @return: string. xxxx-xx-xx / xx:xx:xx
 */
getTimeString(time)
/**
 * @desc: 获取日期的string.
 * @param time: 秒数.
 * @return: string. xxxx-xx-xx
 */
getDateString(time)
/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */
getDate(strDate)
/**
 * @desc: 合并多个map.
 * @return: {}
 */
mergeMap()
/**
* @desc: 判断参数是否是null,undefined,NaN
* @return: boolean
*/
isEmpty(e)
```

### crypt
```js
/**
 * @desc: 计算字符串的crc32值
 * @param crc 可以在这个值得基础上继续计算
 * @return: number.
 */
crc32( /* String */ str, /* Number */ crc )
/**
 * @desc:
 * @param cb: cb(crc32)
 * @return:
 */
crc32_file(file, cb)
```
### ajax
```js
/**
 * @desc: 使用跳转函数初始化.
 *          navCallback(object)
 *          urlObjEquelCallback(obj1, obj2) : bool
 * @return:
 */
nav_init(navCallback, urlObjEquelCallback)
/**
 * @desc: 跳转至指定位置.
 * @param urlObject: null则当前页面刷新.
 * @return:
 */
nav_go(urlObject)
/**
 * @desc: 刷新页面.
 */
nav_refresh()
/**
 * @desc 刷新指定元素.
 */
nav_refresh_elem(elem, url);
/**
 * @desc: ajax 跳转.
 * @param ctx:例如: (详见jquery.ajax)
    {
     type: "GET",
     url: url,
     data: null,
     success: cb
   }
 * @return:
 */
nav_ajax( ctx )
```

# server
***
  - [exception](#exception)
  - [utils](#utils-1)
  - [string](#string)
  - [crypt](#crypt-1)
  - [file](#file-1)
  - [controls](#controls)

定义了一些全局变量

| name           | description |
|----------------|-------------|
| global.__line  | 当前所在行, 可以配合 global.__filename 定位错误日志   |
| console.debug  | development 环境下输出日志  |

### file

# 服务端exception
定义了常用的错误类型.
```js

// @desc: 一般错误.
ERROR
// @desc: 参数错误.
PARAM
// @desc: 越界
OUT_OF_RANGE
```

#  服务端utils库
```js
/**
 * @desc: the browser is mobile.
 * @param userAgent: the browser user agent string.
 */
browserIsMobile(userAgent)
/**
 * @desc: the browser is ios.
 * @param userAgent: the browser user agent string.
 */
browserIsIOS(userAgent)
/**
 * @desc: the browser is phone.
 * @param userAgent: the browser user agent string.
 */
browserIsPhone(userAgent)
/**
 * @desc: the browser is weixin.
 * @param userAgent: the browser user agent string.
 */
browserIsWeixin(userAgent)
/**
* @desc 无符big整型.
*/
isBigint_u()
/**
* @desc 比较两个unsign-big整型的大小(假设两个都是合法的unsign-big整型).
* @return a>b(>0); a==b(=0); a<b(<0).
*/
bigint_u_cmp(a,b)
/**
 * @desc: 获取时间的string.
 * @param time: 秒数.
 * @return: string. xxxx-xx-xx / xx:xx:xx
 */
getTimeString(time)
/**
 * @desc: 获取日期的string.
 * @param time: 秒数.
 * @return: string. xxxx-xx-xx
 */
getDateString(time)
/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */
getDate(strDate)
/**
 * @desc: 合并多个map.
 * @return: {}
 */
mergeMap()
/**
* @return 生成一个uuid字符串.
*/
uuid()
/**
* @desc: 判断参数是否是null,undefined,NaN
* @return: boolean
*/
isEmpty(e)
/**
* @desc: 创建promise，但函数中的this可以为指定值.
*         例如: yield denodeify(fs.exists)(path);
* @param self: 指定的对象.s
* @return: promise.
*/
denodeify(fn, self, argumentCount)
```

#  服务端string库
```js
/**
* @desc: 判断是否是手机号码.
* @return: boolean.
*/
isPhoneMobile(str)
/**
 * @desc: 是否为空串.
 * @return: boolean.
 */
isEmpty(s)
/**
 * @desc: 获得字符串utf8编码后的字节长度.
 * @return: u32.
 */
getByteSize(s)
/**
 * @desc: 替换字符串中所有的strSrc->strDest.
 * @return: string.
 */
replace(str, strSrc, strDest)
```

#  服务端crypt库
```js
/**
 * @desc: 计算crc32值.
 * @param str: string, buffer.
 * @return: crc32.
 */
crc32( str, crc )
/**
 * @desc: 计算文件的crc32
 * @return:u32. crc32
 */
crc32_file( filename )
```

#  服务端file库
```js
/**
 * @desc: 判断文件夹是否存在.
 * @return: boolean.
 */
dirIsExist(dir)
/**
 * @desc: 保证文件夹存在.
 * @return: bool. 若不存在新建; 文件夹存在返回true.
 */
dirAssure(dir)
/**
 * @desc: 删除文件夹.
 * @return:bool.指明是否删除.
 */
dirRemoveRecursive(dir)
/**
 * @desc: 获得文件的字节大小.
 * @return: number.-1表示错误.
 */
fileSize(file)
/**
 * @desc: 判断文件是否存在.
 * @return: boolean.
 */
fileIsExist(file)
/**
 * @desc: 复制文件.
 * @return: bool.
 */
fileCopy(src, dest)
/**
 * @desc: 移除文件.
 * @return: bool.指明是否删除.
 */
fileRemove(file)
```


# 服务端controls库

### loading
```js
/**
 * Example:
 *      前台引入:
 *          1. control_loading.hbs页面
 *          2. 使用脚本
 *              // 使用延时显示加载框.
 *              control_loading_show(text, timeout);
 *
 *              // 通过文本改变方式显示加载框.
 *              // changeTextCB: 设置文本的函数. elemFunc(text)
 *              // textArray: 变化的文本数组.
 *              // hideCB:  隐藏加载框时的设置文本的函数. hideCB().
 *              control_loading_show_text(textArray, changeTextCB, hideCB);
 *            
 *              // 隐藏加载框.
 *              control_loading_hide();
 */
 ```

### page
```js
/**
* Example:
*      前台引入:
*          1. 在需要page的页面上引入 control_page.hbs页面
*          2. 实现脚本: control_page_to(page); 当分页按钮被点击时将执行此函数.
*      后台:
*          1. var ctx = require('citong').controls.page.renderCtx(curPage, pageCount, totalCount);
*          2. 将ctx加入到render ctx中即可.
*/
```

### upload
```js
/**
 * Desc:
 *      upload控件使用一个接口来上传文件, 使用multpart/form-data方式传输:
 *          1. uploadUrl: 上传文件.
 * Example:
 *      前台引入:
 *          1. 在需要upload的页面上引入 control_upload.hbs页面; 或者使用如下语句:
 *                <form method="post" role="form" enctype="multipart/form-data" id="fileForm">
 *                  <input type="file" class="form-control" name="file" onchange="control_upload(cfg)" multiple>
 *                </form>
 *          2. 调用脚本进行初始化设置: control_upload_init(uploadUrl, finishCB, progressCB);
 *                        其中 uploadUrl为上传地址, 不能带参数.
 *      后台:
 *          1. 在uploadUrl中调用  yield require('citong').controls.upload.accept(app, conditionCB); 当满足条件时将存储, 并返回true表示成功.
 *
 *
 *
 * 客户端.
 ** 需要 jquery,jquery.form 库支持.
  * 并且 <input type="file" name="file"... 中, 必须存在name属性.
  * 使用post方式上传文件.
  * @param cfg:  object, 其中
  *              {
  *                formObj:    , // 含有enctype="multipart/form-data"的form
  *                fileObj:    , // form中的file对象
  *                uploadUrl:  , // 上传文件内容的url. 系统将自动使用 uploadUrl?crc32=&size=的方式来上传.
  *                maxFileSize:    , // 允许上传的最大文件.0表示无限制.默认为0
  *                fileType:     , // 允许的文件类型.  如: image/gif,image/jpeg,image/x-png
  *                finishCB:    , // 上传完成后的回调. function(err, fileObj, serverData)
  *                               //                   err:  - 'no file'      未选择文件.
  *                               //                         - 'size too big' 文件太大.
  *                               //                         - 'check crc32 err' 计算本地文件hash值时错误.
  *                               //                         - 'ajax err'     ajax上传时出错.
  *                               //                   serverData: 服务器返回的数据.
  *                progressCB:  , // 上传进度的回调. function(fileObj, percent)
  *              }
  * function control_upload(cfg)
  *
 * 服务端.
  ***
  * 接收上传文件内容.
  * @param conditionCB: function*(filesize, filename, filemimeType):string.
  *                      - filesize: 将要存储的文件大小.
  *                      - filename: 上传的文件名.
  *                      - filemimeType: 文件类型, 例如: 'image/jpeg'.
  *                      - return: 存储的文件路径, 返回null表示不存储.
  * @return boolean.
  *
  * function *accept(app, conditionCB)
  */
```
完整例子
后台:
```js
exports.upload = function*(next)
{
  var r = yield require('citong').controls.upload.accept(this, function*(filesize, filename, filemimeType){
    console.log(filesize);
    console.log(filename);
    console.log(filemimeType);

    return 'tempPath/temp.filename';
  });
};

```
前台:
```js
<script type="text/javascript" charset="utf-8" src="/jquery/jquery.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/jquery/jquery.form.min.js"></script>

<script type="text/javascript">
function upload() {
  control_upload({
    formObj:  $('#fileForm'),
    fileObj:  $("#filec"),
    uploadUrl:  '/uploadFile',
    finishCB: function(err, fileObj, serverData){
      console.log(serverData);
    },
    progressCB: function(fileObj, percent){
      console.log(percent);
    })
  });

}
</script>

<form method="post" role="form" enctype="multipart/form-data" id="fileForm">
  <input id="filec" type="file" name="file" onchange="javascript:upload()" multiple>
</form>
```
