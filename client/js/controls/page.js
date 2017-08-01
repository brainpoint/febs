/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

febs.controls.page_map = {};

/**
* @desc: 初始化page控件.
* @param elem: 将控件插入到elem中, elem是一个jquery的对象.
* @param curPage: 当前页
* @param pageCount: 总页数
* @param totalCount: 总条数
* @param pageCallback: 页面跳转函数, function(page) {}
* @return: 
*/
febs.controls.page_init = 
function(elem, curPage, pageCount, totalCount, pageCallback) {

  var foo = 'page'+febs.crypt.uuid();
  febs.controls.page_map[foo] = pageCallback;
  foo = 'javascript:febs.controls.page_map[\''+foo+'\']';

  var pagePre = '';
  if (curPage > 0)
  {
    var stp = Math.min(curPage, 5);
    for (var i = 1; i < 5 && curPage > i; i++)
    {
      pagePre += '<li class="control_paginItem"><a href="'+foo+'('+(i+curPage-stp)+')">'+(i+curPage-stp)+'</a></li>';
    }
  }

  var pageNext = '';
  if (pageCount > curPage)
  {
    var i = 1+curPage;
    for (; i < 5+curPage && i <= pageCount; i++)
    {
      pageNext += '<li class="control_paginItem"><a href="'+foo+'('+i+')">'+i+'</a></li>';
    }
    if (i < pageCount)
    {
      pageNext += '<li class="control_paginItem"><a href="'+foo+'('+i+')">...</a></li>';
    }
  }

  var urlPrePage = curPage > 1 ? foo+'(' + (curPage-1) + ')' : 'javascript:;';
  var urlPrePageClass = curPage > 1 ? 'control_pagepre' : 'control_pagepre_no';
  var urlNextPage = curPage < pageCount ? foo+'(' + (curPage+1) + ')' : 'javascript:;';
  var urlNextPageClass = curPage < pageCount ? 'control_pagenxt' : 'control_pagenxt_no';

  var e = elem.children('.control_pagin');
  if (e && e.length > 0) {
    e[0].remove();
  }

  elem.append(('<div class="control_pagin">\
  <div class="message">\
    共<i class="blue">'
      + totalCount +
    '</i>条记录，当前显示第&nbsp;<i class="blue">'+curPage+'&nbsp;</i>页\
  </div>\
  <ul class="control_paginList">\
    <li class="control_paginItem">\
      <a href="'+urlPrePage+'">\
        <span style="display: block" class='+urlPrePageClass+'></span>\
      </a>\
    </li>'
    + pagePre +
    '<li class="control_paginItem control_current">\
      <a href="javascript:;">'+curPage+'</a>\
    </li>'
    + pageNext +
    '<li class="control_paginItem">\
      <a href="'+urlNextPage+'">\
        <span style="display: block" class='+urlNextPageClass+'></span>\
      </a>\
    </li>\
  </ul>\
</div>'));

}