/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var DefaultTimeout = 5000;

exports.transfer = function(window, timeout) {
  var xhr;
  if (window.XDomainRequest) xhr = new XDomainRequest();
  else if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
  else {
    var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP");
    for (var i = 0; i < XmlHttpVersions.length && !xmlHttp; i++) {
      try {
        xhr = new ActiveXObject(XmlHttpVersions[i]);
      } 
      catch (e) {
      }
    }
  }

  xhr.timeout = timeout ? timeout : DefaultTimeout;
  
  return xhr;
}