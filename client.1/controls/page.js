/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var crypt = require('../crypt');

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "febs requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

'use strict';

window['febscontrolspage_map'] = {};

var controls = {};

/**
* @desc: 初始化page控件.
* @param elem: 将控件插入到elem中, elem是一个jquery的对象.
* @param curPage: 当前页
* @param pageCount: 总页数
* @param totalCount: 总条数
* @param pageCallback: 页面跳转函数, function(page) {}
* @return: 
*/
function page_init(elem, curPage, pageCount, totalCount, pageCallback) {

  var foo = 'page'+crypt.uuid();
  window['febscontrolspage_map'][foo] = pageCallback;
  foo = 'javascript:window[\'febscontrolspage_map\'][\''+foo+'\']';

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
controls.page_init  = page_init;

return controls;
}
);