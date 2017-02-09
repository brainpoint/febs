'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 * Example:
 *      前台引入:
 *          1. 在需要page的页面上引入 control_page.hbs页面
 *          2. 实现脚本: control_page_to(page);
 *      后台:
 *          1. var ctx = require('febs').controls.page.renderCtx(curPage, pageCount, totalCount);
 *          2. 将ctx加入到render ctx中即可.
 */


/**
 * @desc: 返回render的ctx map
 * @param curPage: 当前页
 * @param pageCount: 总页数
 * @param totalCount: 总条数
 * @return: {}
 */
exports.renderCtx = function(curPage, pageCount, totalCount){
  var ret = {};
  ret.totalNum = totalCount;
  ret.page     = curPage;

  var pagePre = new Array();
  if (curPage > 0)
  {
    var stp = Math.min(curPage, 5);
    for (var i = 1; i < 5 && curPage > i; i++)
    {
      pagePre.push({ID:i+curPage-stp});
    }
  }
  ret.pagePre = pagePre;

  var pageNext = new Array();
  if (pageCount > curPage)
  {
    var i = 1+curPage;
    for (; i < 5+curPage && i <= pageCount; i++)
    {
      pageNext.push({ID:i, Page:i});
    }
    if (i < pageCount)
    {
      pageNext.push({ID:'...', Page:i});
    }
  }
  ret.pageNext = pageNext;

  var urlPrePage = curPage > 1 ? 'javascript:control_page_to(' + (curPage-1) + ')' : 'javascript:;';
  var urlPrePageClass = curPage > 1 ? 'pagepre' : 'pagepre_no';
  var urlNextPage = curPage < pageCount ? 'javascript:control_page_to(' + (curPage+1) + ')' : 'javascript:;';
  var urlNextPageClass = curPage < pageCount ? 'pagenxt' : 'pagenxt_no';

  ret.urlPrePage = urlPrePage;
  ret.urlPrePageClass = urlPrePageClass;
  ret.urlNextPage = urlNextPage;
  ret.urlNextPageClass = urlNextPageClass;
  return ret;
};
