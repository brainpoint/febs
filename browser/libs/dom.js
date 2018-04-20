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

  function _getElement(name) {
    var _elem;
    var _isarr = false;
    if (typeof name === 'string') {
      if (name[0] == '.') {
        if(name.indexOf(' ') >= 0) {
          throw 'Don\'t allow dom have wordspace'; 
        }
        _elem = window.document.getElementsByClassName(name.substr(1));
        _isarr = true;
      }
      else if (name[0] == '#') {
        if(name.indexOf(' ') >= 0) {
          throw 'Don\'t allow dom have wordspace'; 
        }
        _elem = window.document.getElementById(name.substr(1));
        _isarr = false;
      }
      else if (name[0] == '<') {
        _elem = window.document.createElement('div');
        _elem.innerHTML = name;
        if (_elem.childNodes.length == 1) {
          _elem = _elem.childNodes[0];
          _isarr = false;
        }
        else {
          _elem = _elem.childNodes;
          _isarr = true;
        }
      }
      else {
        if(name.indexOf(' ') >= 0) {
          throw 'Don\'t allow dom have wordspace'; 
        }
        _elem = window.document.getElementsByTagName(name);
        _isarr = true;
      }
    } else {
      _elem = name;
    }
    return {_elem, _isarr};
  }


  /**
   * hasClass
   */
  function _hasClass( element, cName ){  
    return !!element.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断  
  }

  /**
   * addClass
   */
  function _addClass( element,cName ){  
    if( !_hasClass( element,cName ) ){  
      element.className += " " + cName;  
    };  
  } 

  /**
   * removeClass
   */
  function _removeClass( element, cName ){  
    if( _hasClass( element,cName ) ){  
      element.className = element.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换  
    };  
  }
  /**
   * removeElement
   */
  function _removeElement(element){
    var _parentElement = element.parentNode;
    if(_parentElement){
        _parentElement.removeChild(element);  
    }
  }

  /**
   * appendChild
   */
  function _appendChild(element, node) {
    if (node instanceof Dom) {
      if (!node._isArray()) {
        element.appendChild(node[0]);
      } else {
        for (var i = 0; i < node.length; i++) {
          element.appendChild(node[i]);
        }
      }
    }
    else {
      element.appendChild(node);
    }
  }

  function _prependChild(element,node){ 
    if(element.hasChildNodes()){ 
      if (node instanceof Dom) {
        if (!node._isArray()) {
          element.insertBefore(node[0], element.firstChild); 
        } else {
          for (var i = node.length-1; i >= 0; i--) {
            element.insertBefore(node[i], element.firstChild);
          }
        }
      } else {
        element.insertBefore(node, element.firstChild); 
      }
    } else{ 
      if (node instanceof Dom) {
        if (!node._isArray()) {
          element.appendChild(node[0]); 
        } else {
          for (var i = 0; i < node.length; i++) {
            element.appendChild(node[i]);
          }
        }
      } else {
        element.appendChild(node); 
      }
    } 
  }

  /**
   * @desc 类jquery dom操作.
   */
  class Dom {
    /**
     * 支持 
     *    - .name 使用类名构建.
     *    - #name 使用id名构建.
     *    - name  使用tag名构建.
     *    - <div...>...</div> 使用内容构建.
     *    - node.
     * 不支持带空格多层结构的情况.
     */
    constructor(name) {
      if (name instanceof Dom) {
        this._elem = name._elem;
        this._isArr = name._isArr;
      } else {
        this._elem = _getElement(name);
        this._isArr = this._elem._isarr;
        this._elem = this._elem._elem;
      }

      if (!this._isArray()) {
        this[0] = this._elem;
      } else {
        for (var i = 0; i < this._elem.length; i++) {
          this[i] = this._elem[i];
        }
        this.length = this._elem.length;
      }

      var _this = this;
      this.bind = this.on;

      if (name === window.document) {
        this.ready = function(f) { if (f) { window.document.addEventListener('DOMContentLoaded', f); return _this; } }
        this.unload = function(f) { if (f) { window.document.addEventListener('unload', f); return _this; } }
      }
      else if (name === window) {
        this.unload = function(f) { if (f) { window.addEventListener('unload', f); return _this; } }
      }

      if (typeof name === 'function') {
        window.document.addEventListener('DOMContentLoaded', name);
      }
      else {
        function ttt(event, f) {
          if (f) {
            return _this.on(event, f);
          } else {
            return _this.trigger(event);
          }
        }

        this.blur     = function(f) { return ttt('blur', f); }
        this.change   = function(f) { return ttt('change', f); }
        this.click    = function(f) { return ttt('click', f); }
        this.dblclick = function(f) { return ttt('dblclick', f); }
        this.error    = function(f) { return ttt('error', f); }
        this.keydown = function(f) { return ttt('keydown', f); }
        this.keypress = function(f) { return ttt('keypress', f); }
        this.keyup = function(f) { return ttt('keyup', f); }
        this.load = function(f) { return ttt('load', f); }
        this.mousedown = function(f) { return ttt('mousedown', f); }
        this.mouseenter = function(f) { return ttt('mouseenter', f); }
        this.mouseleave = function(f) { return ttt('mouseleave', f); }
        this.mousemove = function(f) { return ttt('mousemove', f); }
        this.mouseout = function(f) { return ttt('mouseout', f); }
        this.mouseover = function(f) { return ttt('mouseover', f); }
        this.mouseup = function(f) { return ttt('mouseup', f); }
        this.scroll = function(f) { return ttt('scroll', f); }
        this.select = function(f) { return ttt('select', f); }
        this.submit = function(f) { return ttt('submit', f); }
      }

      if (this._isArray()) {
        var _proto = Object.getPrototypeOf(this);
        for (var i = 0; i < this._elem.length; i++) {
          
          for (const key in _proto) {
            if (key != '__proto__' && key != 'constructor') {
              // 不覆盖native方法.
              if (!this._elem[i][key]) {
                this._elem[i][key] = _proto[key].bind(this._elem[i]);
              }
            }
          }

          delete this._elem[i].length;
          this._elem[i]._isArr = false;
          this._elem[i]._elem = this._elem[i];
          this._elem[i][0] = this._elem[i];
        }
      }
    }

    /**
     * @desc: hasClass
     */
    hasClass( cName ){
      if (!this._elem) { return false; }
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          if (_hasClass(this._elem[i], cName))  return true;
        }
        return false;
      }
      else {
        return _hasClass(this._elem, cName);
      }
    }

    /**
     * @desc: addClass
     */
    addClass( cName ){
      if (!this._elem) { return; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          _addClass(this._elem[i], cName);
        }
      }
      else {
        _addClass(this._elem, cName);
      }
      return this;
    } 

    /**
     * @desc: removeClass
     */
    removeClass( cName ){
      if (!this._elem) { return; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          _removeClass(this._elem[i], cName);
        }
      }
      else {
        _removeClass(this._elem, cName);
      }
      return this;
    } 

    /**
     * @desc: toggleClass
     */
    toggleClass( cName ){
      if (!this._elem) { return; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          if (_hasClass(this._elem[i], cName))
            _removeClass(this._elem[i], cName);
          else
            _addClass(this._elem[i], cName);
        }
      }
      else {
        if (_hasClass(this._elem, cName))
          _removeClass(this._elem, cName);
        else
          _addClass(this._elem, cName);
      }
      return this;
    } 

    /**
     * @desc: remove
     */
    remove(){
      if (!this._elem) { return; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          _removeElement(this._elem[i]);
        }
      }
      else {
        _removeElement(this._elem);
      }
    } 

    /**
     * @desc: append
     */
    append(node) {
      if (!this._elem) { return; }
      node = new Dom(node);
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          _appendChild(this._elem[i], node);
        }
      }
      else {
        _appendChild(this._elem, node);
      }
      return this;
    }

    /**
     * appendTo
     */
    appendTo(node) {
      if (!this._elem) { return; }
      if (!this._isArray()) {
        var dom = new Dom(node);
        dom.append(this);
      } 
      return this;
    }

    /**
     * @desc: prepend
     */
    prepend(node) {
      if (!this._elem) { return; }
      node = new Dom(node);
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          _prependChild(this._elem[i], node);
        }
      }
      else {
        _prependChild(this._elem, node);
      }
      return this;
    }

    /**
     * @desc: prependTo
     */
    prependTo(node) {
      if (!this._elem) { return; }
      if (!this._isArray()) {
        var dom = new Dom(node);
        dom.prepend(this);
      } 
      return this;
    }

    /**
     * @desc: before
     */
    before(node) {
      if (!this._elem) { return; }
      node = new Dom(node);
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          node.insertBefore(this._elem[i]);
        }
      }
      else {
        node.insertBefore(this._elem);
      }
      return this;
    }

    /**
     * insertBefore
     */
    insertBefore(node) {
      if (!this._elem) { return; }
      var dom = new Dom(node);
      if (!dom._isArray()) {
        var elem = this._elem;
        if (!this._isArray()) elem = [elem];
        for (var i = 0; i < elem.length; i++) {
          dom[0].parentNode.insertBefore(elem[i], dom[0]);
        }
      }
      return this;
    }

    /**
     * @desc: after
     */
    after(node) {
      if (!this._elem) { return; }
      node = new Dom(node);
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          node.insertAfter(this._elem[i]);
        }
      }
      else {
        node.insertAfter(this._elem);
      }
      return this;
    }

    /**
     * @desc: insertAfter
     */
    insertAfter(node) {
      if (!this._elem) { return; }
      var dom = new Dom(node);
      if (!dom._isArray()) {
        var elem = this._elem;
        if (!this._isArray()) elem = [elem];
        for (var i = 0; i < elem.length; i++) {
          dom[0].parentNode.insertBefore(elem[i], dom[0].nextSibling);
        }
      }
      return this;
    }

    /**
     * @desc: attr.
     */
    attr(attrName, value) {
      if (!this._elem) { return; }
      if (typeof value === 'undefined') {
        if (!this._isArray()) { 
          return this._elem.getAttribute(attrName);
        }
      } else {
        if (this._isArray()) { 
          for (var i = 0; i < this._elem.length; i++) {
            this._elem[i].setAttribute(attrName, value);
          }
        }
        else {
          this._elem.setAttribute(attrName, value);
        }
      }
    }

    /**
     * @desc: removeAttr
     */
    removeAttr(name) {
      if (!this._elem) { return; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          this._elem[i].removeAttribute(name);
        }
      }
      else {
        this._elem.removeAttribute(name);
      }
      return this;
    }

    /**
    * @desc: detach.
    */
    detach() {
      throw 'unimplement';
    }

    /**
    * @desc: clone.
    */
    clone() {
      throw 'unimplement';
    }

    /**
    * @desc: replaceAll.
    */
    replaceAll() {
      throw 'unimplement';
    }

    /**
    * @desc: replaceWith.
    */
    unwrap() {
      throw 'unimplement';
    }
    /**
    * @desc: replaceWith.
    */
    wrap() {
      throw 'unimplement';
    }
    /**
    * @desc: replaceWith.
    */
    wrapAll() {
      throw 'unimplement';
    }
    /**
    * @desc: replaceWith.
    */
    wrapinner() {
      throw 'unimplement';
    }

    /**
    * @desc: empty.
    */
    empty() {
      if (!this._elem) { return; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          this._elem[i].innerHTML = '';
        }
      }
      else {
        this._elem.innerHTML = '';
      }
      return this;
    }

    /**
    * @desc: html.
    */
    html(v) {
      if (!this._elem) { return; }
      if (typeof v === 'undefined') {
        if (this._isArray()) { 
          if (this._elem.length > 0)
            return this._elem[0].innerHTML;
        }
        else {
          return this._elem.innerHTML;
        }
      } else {
        if (this._isArray()) { 
          for (var i = 0; i < this._elem.length; i++) {
            this._elem[i].innerHTML = v;
          }
        }
        else {
          this._elem.innerHTML = v;
        }
      }
    }


    /**
    * @desc: text.
    */
    text(v) {
      if (!this._elem) { return; }
      if (typeof v === 'undefined') {
        if (this._isArray()) { 
          if (this._elem.length > 0)
            return this._elem[0].textContent;
        }
        else {
          return this._elem.textContent;
        }
      } else {
        if (this._isArray()) { 
          for (var i = 0; i < this._elem.length; i++) {
            this._elem[i].textContent = v;
          }
        }
        else {
          this._elem.textContent = v;
        }
      }
    }

    /**
    * @desc: val.
    */
    val(v) {
      if (!this._elem) { return; }
      if (typeof v === 'undefined') {
        if (this._isArray()) { 
          if (this._elem.length > 0)
            return this._elem[0].getAttribute('value');
        }
        else {
          return this._elem.getAttribute('value');
        }
      } else {
        if (this._isArray()) { 
          for (var i = 0; i < this._elem.length; i++) {
            this._elem[i].setAttribute('value', v);
          }
        }
        else {
          this._elem.setAttribute('value', v);
        }
      }
    }


    /**
    * @desc: css.
    */
    css(name, value) {
      if (!this._elem) { return; }
      if (typeof value === 'undefined') {
        if (!this._isArray()) { 
          return this._elem.style[name];
        }
      } else {
        if (this._isArray()) { 
          for (var i = 0; i < this._elem.length; i++) {
            if (value == '')
              this._elem[i].style[name] = '';
            else
              this._elem[i].style[name] = value;
          }
        }
        else {
          if (value == '')
            this._elem.style[name] = '';
          else
            this._elem.style[name] = value;
        }
      }
    }

    /**
    * @desc: on.
    */
    on(eventname, foo) {
      if (!eventname) 
        throw 'need event name';

      if (typeof foo !== 'function')
        throw 'on need function params';
      
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          if (!this._elem[i].__events) this._elem[i].__events = {};
          if (!this._elem[i].__events[eventname]) this._elem[i].__events[eventname] = [];
          var env = this._elem[i].__events[eventname];
          var j;
          for (j = 0; j < env.length; j++) {
            if (env[j] === foo) {
              break;
            }
          }
          if (j >= env.length) {
            env.push(foo);
          }
          this._elem[i].addEventListener(eventname, foo);
        }
      }
      else {
        if (!this._elem.__events) this._elem.__events = {};
        if (!this._elem.__events[eventname]) this._elem.__events[eventname] = [];
        var env = this._elem.__events[eventname];
        var j;
        for (j = 0; j < env.length; j++) {
          if (env[j] === foo) {
            break;
          }
        }
        if (j >= env.length) {
          env.push(foo);
        }
        this._elem.addEventListener(eventname, foo);
      }
      return this;
    }

    /**
    * @desc: one.
    */
    one(event, f) { 
      if (!event) 
        throw 'need event name';

      var _this = this;
      var tt = function(e) { _this.off(event, tt); f(e); };
      _this.on(event, tt);
      return this;
    }

    /**
    * @desc: off.
    */
    off(eventname, foo) {
      if (!eventname) 
        throw 'need event name';

      if (!foo) {
        if (this._isArray()) { 
          for (var i = 0; i < this._elem.length; i++) {
            if (this._elem[i].__events && this._elem[i].__events[eventname])
            {
              var env = this._elem[i].__events[eventname];
              var j;
              for (j = 0; j < env.length; j++) {
                this._elem[i].removeEventListener(eventname, env[j]);
              }
              this._elem[i].__events[eventname] = [];
            }
          }
        }
        else {
          if (this._elem.__events && this._elem.__events[eventname])
          {
            var env = this._elem.__events[eventname];
            var j;
            for (j = 0; j < env.length; j++) {
              this._elem.removeEventListener(eventname, env[j]);
            }
            this._elem.__events[eventname] = [];
          }
        }
        return this;
      }

      if (typeof foo !== 'function')
        throw 'off need function params';
      
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          if (this._elem[i].__events && this._elem[i].__events[eventname])
          {
            var env = this._elem[i].__events[eventname];
            var j;
            for (j = 0; j < env.length; j++) {
              if (env[j] === foo) {
                env.splice(j, 1);
                break;
              }
            }
          }
          this._elem[i].removeEventListener(eventname, foo);
        }
      }
      else {
        if (this._elem.__events && this._elem.__events[eventname])
        {
          var env = this._elem.__events[eventname];
          var j;
          for (j = 0; j < env.length; j++) {
            if (env[j] === foo) {
              env.splice(j, 1);
              break;
            }
          }
        }
        this._elem.removeEventListener(eventname, foo);
      }
      return this;
    }

    /**
    * @desc: trigger.
    */
    trigger(eventname) {
      if (!eventname) 
        throw 'need event name';

      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          if (this._elem[i][eventname] && typeof this._elem[i][eventname] === 'function') {
            this._elem[i][eventname]();
          }
        }
      }
      else {
        if (this._elem[eventname] && typeof this._elem[eventname] === 'function') {
          this._elem[eventname]();
        }
      }
      return this;
    }

    _isArray() {
      return this._isArr;
    }
  };

  return Dom;
}
);