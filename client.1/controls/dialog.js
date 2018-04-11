var stringUtils = require('../string');

exports.hide = hide;
exports.showAlert = showAlert;
exports.showToast = showToast;
exports.showConfirm = showConfirm;
exports.showConfirmEdit = showConfirmEdit;

function escape_string(ctx) {
  // 转义.
  if (ctx.title) {
    ctx.title = stringUtils.replace(ctx.title, '<', '&lt;');
    ctx.title = stringUtils.replace(ctx.title, '>', '&gt;');
  }
  if (ctx.content) {
    ctx.content = stringUtils.replace(ctx.content, '<', '&lt;');
    ctx.content = stringUtils.replace(ctx.content, '>', '&gt;');
  }
  if (ctx.msg) {
    ctx.msg = stringUtils.replace(ctx.msg, '<', '&lt;');
    ctx.msg = stringUtils.replace(ctx.msg, '>', '&gt;');
  }
  if (ctx.editText) {
    ctx.editText = stringUtils.replace(ctx.editText, '<', '&lt;');
    ctx.editText = stringUtils.replace(ctx.editText, '>', '&gt;');
  }
  if (ctx.okText) {
    ctx.okText = stringUtils.replace(ctx.okText, '<', '&lt;');
    ctx.okText = stringUtils.replace(ctx.okText, '>', '&gt;');
  }
  if (ctx.cancelText) {
    ctx.cancelText = stringUtils.replace(ctx.cancelText, '<', '&lt;');
    ctx.cancelText = stringUtils.replace(ctx.cancelText, '>', '&gt;');
  }
}

function hide() {
	$('.control_cd-popup').removeClass('control_cd-is-visible');
  if ($('.control_cd-popup').length > 0) {
    if (typeof $(".control_cd-popup").fadeOut !== 'function') {
      console.log('febs controls need function fadeIn/fadeOut');
      $('.control_cd-popup').remove();
    } else {
      $(".control_cd-popup").fadeOut(200);
    }
  }
}

/**
* ctx.title:    标题.
* ctx.content:	内容文字.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.okText
*/
function showAlert(ctx) {

  if (typeof ctx === 'string') {
    ctx = {content:ctx};
  }

	if (!ctx.okText) ctx.okText = "确认";
  escape_string(ctx);

	if ($('.control_cd-popup').length > 0) {
		$('.control_cd-popup').remove();
	}

	$("body").append($('<div class="control_cd-popup" role="alert"><div class="control_cd-popup-container">' + (ctx.title?('<div class="cd-title">' + ctx.title + '</div>'):'') + '<div class="cd-content">' + ctx.content + '</div><ul class="cd-buttons"><li style="width:100%"><a href="#0" class="control_cd-popup-ok">' + ctx.okText + '</a></li></ul></div></div>'));
	setTimeout(function () {
		$('.control_cd-popup').addClass('control_cd-is-visible');
	}, 10);

	//close popup
	$('.control_cd-popup').on('click', function (event) {
		if ($(event.target).is('.control_cd-popup-ok') /*|| $(event.target).is('.control_cd-popup')*/) {
			event.preventDefault();
			hide();
			if (ctx.confirm) ctx.confirm();
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function (event) {
		if (event.which == '27') {
			hide();
		}
	});
}

/**
 * ctx.content
 * ctx.time
 * ctx.icon  // "ok" "warn" "error" 默认null, 没有图标
 * ctx.callback  function(){}	// 对话框消失后的回调.
 */
function showToast(ctx) {
  if (typeof ctx === 'string') {
    ctx = {content:ctx};
  }

  escape_string(ctx);

  ctx.msg = ctx.content;
	if ($('.control_cd-notice').length > 0) {
		$('.control_cd-notice').remove();
	}

	var html = '<div id="control_cd_dlg_cd_notice" class="control_cd-notice" style="display:none" role="alert"><div class="control_cd-notice-container">'
	if (null != ctx.icon) {
		html += "<div class='control_cd_icon control_cd_" + ctx.icon + "'></div>";
		html += '<div class="control_cd_msg" style="padding-left:30px;">' + ctx.msg + '</div></div></div>';
	}
	else{
		html += '<div class="control_cd_msg">' + ctx.msg + '</div></div></div>';
	}
	
	
  $("body").append($(html));
  
  if (typeof $("#control_cd_dlg_cd_notice").fadeIn !== 'function') {
    console.log('febs controls need function fadeIn/fadeOut');
    $("#control_cd_dlg_cd_notice").css("display", "inherit");
  } else {
    $("#control_cd_dlg_cd_notice").fadeIn(200);
  }
	
	var t = 3000;
	if (null != ctx.time) {
		t = ctx.time;
	}
	if (t > 0) {
		setTimeout(function () {
      if (typeof $("#control_cd_dlg_cd_notice").fadeOut !== 'function') {
        console.log('febs controls need function fadeIn/fadeOut');
        $("#control_cd_dlg_cd_notice").css("display", "none");
      } else {
        $("#control_cd_dlg_cd_notice").fadeOut(200);
      }

			if (null != ctx.callback) {
				ctx.callback();
			}
		}, t);
	}
}


/**
* ctx.title:    标题.
* ctx.content:		 内容文字.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirm(ctx) {
	if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";
  
  escape_string(ctx);

	if ($('.control_cd-popup').length > 0) {
		$('.control_cd-popup').remove();
	}

	$("body").append($('<div class="control_cd-popup" role="alert"><div class="control_cd-popup-container">' + (ctx.title?('<div class="cd-title">' + ctx.title + '</div>'):'') + '<div class="cd-content">' + ctx.content + '</div><ul class="cd-buttons"><li><a href="#0" class="control_cd-popup-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="control_cd-popup-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="control_cd-popup-close img-replace">Close</a></div></div>'));
	setTimeout(function () {
		$('.control_cd-popup').addClass('control_cd-is-visible');
	}, 10);

	//close popup
	$('.control_cd-popup').on('click', function (event) {
		if ($(event.target).is('.control_cd-popup-close') /*|| $(event.target).is('.control_cd-popup')*/) {
			event.preventDefault();
			hide();
			if (ctx.cancel) ctx.cancel();
		}
		else if ($(event.target).is('.control_cd-popup-ok')) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm();
		}
		else if ($(event.target).is('.control_cd-popup-cancel')) {
			event.preventDefault();
			hide();
			if (ctx.cancel) ctx.cancel();
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function (event) {
		if (event.which == '27') {
			hide();
			if (ctx.cancel) ctx.cancel();
		}
	});
}


/**
* ctx.title:    标题.
* ctx.content:		 内容文字.
* ctx.editText:		 输入框文字.
* ctx.confirm: function(text){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirmEdit(ctx) {
	if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";
  
  // 转义.
  escape_string(ctx);

	if ($('.control_cd-popup').length > 0) {
		$('.control_cd-popup').remove();
	}

  var elems = '<div class="control_cd-popup" role="alert"><div class="control_cd-popup-container">' 
  + (ctx.title?('<div class="cd-title">' + ctx.title + '</div>'):'') 
  + '<div class="cd-content">' + ctx.content + '</div>' 
  + '<div class="cd-edit"><input class="cd-input-text" type="text" value="' + (ctx.editText?ctx.editText:'') + '">' + '</div>' 
  + '<ul class="cd-buttons"><li><a href="#0" class="control_cd-popup-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="control_cd-popup-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="control_cd-popup-close img-replace">Close</a></div></div>';

	$("body").append($(elems));
	setTimeout(function () {
		$('.control_cd-popup').addClass('control_cd-is-visible');
	}, 10);

	//close popup
	$('.control_cd-popup').on('click', function (event) {
		if ($(event.target).is('.control_cd-popup-close') /*|| $(event.target).is('.control_cd-popup')*/) {
			event.preventDefault();
			hide();
			if (ctx.cancel) ctx.cancel();
		}
		else if ($(event.target).is('.control_cd-popup-ok')) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm( $('.control_cd-popup-container  .cd-edit .cd-input-text').val() );
		}
		else if ($(event.target).is('.control_cd-popup-cancel')) {
			event.preventDefault();
			hide();
			if (ctx.cancel) ctx.cancel();
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function (event) {
		if (event.which == '27') {
			hide();
			if (ctx.cancel) ctx.cancel();
		}
	});
}
