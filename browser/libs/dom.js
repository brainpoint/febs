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

  // - parentNodes 父节点 (HTMLNode)
  // - name 子节点selector.
  // - notAllChildren 仅查询一层子节点.
  // 返回匹配到的元素集合.
  function _matchElement(parentNodes, name, notAllChildren) {
    var elems;
    var tag = 0;  // 0-tag, 1-id, 2-class.

    if (name[0] == '.') {
      tag = 2;
      name = name.substr(1);
    }
    else if (name[0] == '#') {
      tag = 1;
      name = name.substr(1);
    } else {
      name = name.toUpperCase();
    }

    if (!parentNodes || parentNodes.length == 0) {
      if (2 == tag) {
        elems = window.document.getElementsByClassName(name);
      }
      else if (1 == tag) {
        elems = window.document.getElementById(name);
        if (elems) elems = [elems];
        else elems = [];
      }
      else {
        elems = window.document.getElementsByTagName(name);
      }
    }
    else {
      elems = [];
      for (var i = 0; i < parentNodes.length; i++) {
        var node1 = parentNodes[i].childNodes;
        if (!node1) continue;
        var node = [];
        for (var j = 0; j < node1.length; j++) {
          node.push(node1[j]);
        }

        for (var j = 0; j < node.length; j++) {
          if (2 == tag) {
            if (_hasClass(node[j], name)) {
              elems.push(node[j]);
              continue;
            }
          }
          else if (1 == tag) {
            if (node[j].id == name) {
              elems.push(node[j]);
              continue;
            }
          }
          else {
            if (node[j].nodeName.toUpperCase() == name) {
              elems.push(node[j]);
              continue;
            }
          }

          if (!notAllChildren) {
            var nn = node[j].childNodes;
            if (nn && nn.length > 0) {
              for (var k = 0; k < nn.length; k++) {
                node.push(nn[k]);
              }
              if (j > 20) {
                node = node.slice(j+1);
                j = 0;
              }
            }
          }
        } // for.
      } // for.
    } // if..else.

    return elems;
  }

  // - parentNode 仅筛选此节点下的节点.
  function _getElement(name, parentNode) {
    if (name == '') name = null;
    var _elem;
    var _isarr = false;
    if (typeof name === 'string') {
      if (name[0] == '<') {
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
        if (name.indexOf('<') > 0 || name.indexOf('>') > 0)
          throw new Error('Syntax error, unrecognized');

        var names = name.split(' ');
        var nodes = parentNode ? [parentNode] : null;
        for (var i = 0; i < names.length; i++) {
          if (names[i] != '')
            nodes = _matchElement(nodes, names[i], !!parentNode);
        }
        if (nodes.length <= 1) {
          _elem = nodes[0];
          _isarr = false;
        } else {
          _elem = nodes;
          _isarr = true;
        }
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
    if (!element || !element.className)
      return false;
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

  var CreateDom;

  /**
   * @desc 类jquery dom操作.
   */
  class Dom {
    // _elem;
    // _isArr;

    /**
     * 支持 
     *    - .name 使用类名构建.
     *    - #name 使用id名构建.
     *    - name  使用tag名构建.
     *    - <div...>...</div> 使用内容构建.
     *    - node.
     */
    constructor(name) {
      //
      // save in '_elem', '_isArr' 
      //
      if (name === window.document || name == window) {
        this._elem = name;
        this._isArr = false;
      }
      else if (name instanceof Dom) {
        this._elem = name._elem;
        this._isArr = name._isArr;
      } else {
        this._elem = _getElement(name);
        this._isArr = this._elem._isarr;
        this._elem = this._elem._elem;
      }

      if (!this._isArray()) {
        this[0] = this._elem;
        this.length = this._elem ? 1 : 0;
      } else {
        for (var i = 0; i < this._elem.length; i++) {
          this[i] = this._elem[i];
        }
        this.length = this._elem.length;
      }

      var _this = this;
      
      this.bind = this.on;
      this.unbind = this.off;
      this.live = this.on;
      this.die = this.off;

      if (name === window.document) {
        this.ready = function(f) { if (f) { window.document.addEventListener('DOMContentLoaded', f); return _this; } }
        this.unload = function(f) { if (f) { window.document.addEventListener('unload', f); return _this; } }
        this.context = window.document;
      }
      else if (name === window) {
        this.unload = function(f) { if (f) { window.addEventListener('unload', f); return _this; } }
      }
      else {
        this.context = window.document;
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

      // plugin.
      for (const key in CreateDom.fn) {
        if (key == 'extend' || key == 'fn') continue;
        if (typeof CreateDom.fn[key] === 'function') {
          this[key] = CreateDom.fn[key].bind(this);
        }
      }

      if (this._elem) {
        if (this._isArray()) {
          for (var i = 0; i < this._elem.length; i++) {
            this._domtify(this._elem[i]);
          }
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
      if (!this._elem) { return this; }
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
      if (!this._elem) { return this; }
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
      if (!this._elem) { return this; }
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
      if (!this._elem) { return this; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          _removeElement(this._elem[i]);
        }
      }
      else {
        _removeElement(this._elem);
      }
      return this;
    } 

    /**
     * @desc: append
     */
    append(node) {
      if (!this._elem) { return this; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          _appendChild(this._elem[i], new Dom(node));
        }
      }
      else {
        _appendChild(this._elem, new Dom(node));
      }
      return this;
    }

    /**
     * appendTo
     */
    appendTo(node) {
      if (!this._elem) { return this; }
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
      if (!this._elem) { return this; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          _prependChild(this._elem[i], new Dom(node));
        }
      }
      else {
        _prependChild(this._elem, new Dom(node));
      }
      return this;
    }

    /**
     * @desc: prependTo
     */
    prependTo(node) {
      if (!this._elem) { return this; }
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
      if (!this._elem) { return this; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          (new Dom(node)).insertBefore(this._elem[i]);
        }
      }
      else {
        (new Dom(node)).insertBefore(this._elem);
      }
      return this;
    }

    /**
     * insertBefore
     */
    insertBefore(node) {
      if (!this._elem) { return this; }
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
      if (!this._elem) { return this; }
      if (this._isArray()) { 
        for (var i = 0; i < this._elem.length; i++) {
          (new Dom(node)).insertAfter(this._elem[i]);
        }
      }
      else {
        (new Dom(node)).insertAfter(this._elem);
      }
      return this;
    }

    /**
     * @desc: insertAfter
     */
    insertAfter(node) {
      if (!this._elem) { return this; }
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
      if (!this._elem) { 
        if (typeof value !== 'undefined')
          return this;
        return;
      }
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
        return this;
      }
    }

    /**
     * @desc: removeAttr
     */
    removeAttr(name) {
      if (!this._elem) { return this; }
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
      throw new Error('unimplement');
    }

    /**
    * @desc: clone.
    */
    clone() {
      throw new Error('unimplement');
    }

    /**
    * @desc: replaceAll.
    */
    replaceAll() {
      throw new Error('unimplement');
    }

    /**
    * @desc: replaceWith.
    */
    unwrap() {
      throw new Error('unimplement');
    }
    /**
    * @desc: replaceWith.
    */
    wrap() {
      throw new Error('unimplement');
    }
    /**
    * @desc: replaceWith.
    */
    wrapAll() {
      throw new Error('unimplement');
    }
    /**
    * @desc: replaceWith.
    */
    wrapinner() {
      throw new Error('unimplement');
    }

    /**
    * @desc: empty.
    */
    empty() {
      if (!this._elem) { return this; }
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
      if (!this._elem) { 
        if (typeof v !== 'undefined')
          return this;
        return;
      }
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
        return this;
      }
    }


    /**
    * @desc: text.
    */
    text(v) {
      if (!this._elem) { 
        if (typeof v !== 'undefined')
          return this;
        return;
      }
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
        return this;
      }
    }

    /**
    * @desc: val.
    */
    val(v) {
      if (!this._elem) { 
        if (typeof v !== 'undefined')
          return this;
        return;
      }
      if (typeof v === 'undefined') {
        if (this._isArray()) { 
          if (this._elem.length > 0)
            return this._elem[0].value;
        }
        else {
          return this._elem.value;
        }
      } else {
        if (this._isArray()) { 
          for (var i = 0; i < this._elem.length; i++) {
            this._elem[i].value = v;
          }
        }
        else {
          this._elem.value = v;
        }
        return this;
      }
    }


    /**
    * @desc: css.
    */
    css(name, value) {
      if (!this._elem) { 
        if (typeof value !== 'undefined')
          return this;
        return; 
      }
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
        return this;
      }
    }

    /**
    * @desc: on.
    */
    on(eventname, foo) {
      if (!eventname) 
        throw new Error('need event name');

      if (typeof foo !== 'function')
        throw new Error('on need function params');
      
      if (!this._elem) { return this; }
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
        throw new Error('need event name');

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
        throw new Error('need event name');

      if (!this._elem) { return this; }
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
        throw new Error('off need function params');
      
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
        throw new Error('need event name');
      
      if (!this._elem) { return this; }
      
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

    /**
    * @desc: parent
    * @return: 
    */
    parent(selector) {
      if (!this._elem) { return new Dom(); }
      var sel;
      if (selector)
        sel = new Dom(selector);
      if (this._isArray()) {
        var dom = new Dom();
        dom._elem = [];
        dom._isArr = true;
        dom.length = 0;
        for (var i = 0; i < this._elem.length; i++) {
          if (this._elem[i].parentNode) {
            if (!sel || sel._isElementIn(this._elem[i].parentNode)) {
              this._domtify(this._elem[i].parentNode);
              dom._elem.push(this._elem[i].parentNode);
              dom[dom.length] = this._elem[i].parentNode;
              dom.length++;
            }
          }
        }
        if (dom._elem.length == 0) dom._elem = null;
        return dom;
      } else {
        if (!this._elem.parentNode) return new Dom();
        if (!sel || sel._isElementIn(this._elem.parentNode)) {
          return new Dom(this._elem.parentNode); 
        }
        return new Dom();
      } // if.
    }

    /**
    * @desc: parents
    * @return: 
    */
    parents(selector) {
      if (!this._elem) { return new Dom(); }
      var sel;
      if (selector)
        sel = new Dom(selector);

      if (this._isArray()) {
        var nodes = [];
        for (var i = 0; i < this._elem.length; i++) {
          if (!this._elem[i].parentNode) continue;
          var elem = this._elem[i];
          while (elem.parentNode) {
            if (elem.parentNode == window || elem.parentNode == window.document)
              break;

            if (!sel || sel._isElementIn(elem.parentNode)) {
              var j;
              for (j = 0; j < nodes.length; j++) {
                if (nodes[j].isSameNode(elem.parentNode)) {
                  break;
                }
              }
              if (j >= nodes.length)
                nodes.push(elem.parentNode);
            }
            elem = elem.parentNode;
          }
        } // for.

        var dom = new Dom();
        if (nodes.length > 0) {
          dom._elem = nodes;
          dom._isArr = true;
          dom.length = nodes.length;
          for (var i = 0; i < nodes.length; i++) {
            dom._domtify(nodes[i]);
            dom[i] = nodes[i];
          }
        }
        return dom;
      }
      else {
        if (!this._elem.parentNode) return new Dom();
        var nodes = [];
        var elem = this._elem;
        while (elem.parentNode) {
          if (elem.parentNode == window || elem.parentNode == window.document)
            break;

          if (!sel || sel._isElementIn(elem.parentNode)) {
            nodes.push(elem.parentNode);
          }
          elem = elem.parentNode;
        }

        var dom = new Dom();
        if (nodes.length > 0) {
          dom._elem = nodes;
          dom._isArr = true;
          dom.length = nodes.length;
          for (var i = 0; i < nodes.length; i++) {
            dom._domtify(nodes[i]);
            dom[i] = nodes[i];
          }
        }
        return dom;
      } // if.
    }

    /**
     * children
     * @param {*} selector 
     */
    children(selector) {
      if (!this._elem) { return new Dom(); }

      if (this._isArray()) {
        var nodes = [];
        for (var i = 0; i < this._elem.length; i++) {
          var sel;
          if (selector)
            sel = _getElement(selector, this._elem[i]);
          else {
            sel = {_elem: [], _isarr: true};
            for (var j = 0; j < this._elem[i].childNodes.length; j++) {
              sel._elem.push(this._elem[i].childNodes[j]);
            }
          }
          
          if (!sel._elem)
            continue;
          
          if (sel._isarr) {
            nodes = nodes.concat(sel._elem);
          } else {
            nodes.push(sel._elem);
          }
        }

        var dom = new Dom();
        dom._elem = nodes;
        dom._isArr = true;
        dom.length = nodes.length;
        for (var i = 0; i < nodes.length; i++) {
          this._domtify(nodes[i]);
          dom[i] = nodes[i];
        }
        return dom;
      }
      else {
        var sel;
        if (selector)
          sel = _getElement(selector, this._elem);
        else {
          sel = {_elem: [], _isarr: true};
          for (var j = 0; j < this._elem.childNodes.length; j++) {
            sel._elem.push(this._elem.childNodes[j]);
          }
        }
        
        var dom = new Dom();
        dom._elem = sel._elem;
        dom[0] = sel._elem;
        dom._isArr = sel._isarr;
        dom.length = sel._elem ? 1 : 0;

        if (sel._isarr && sel._elem) {
          for (var i = 0; i < sel._elem.length; i++) {
            this._domtify(sel._elem[i]);
            dom[i] = sel._elem[i];
          }
          dom.length = sel._elem.length;
        }
        return dom;
      } // if..else.      
    }

    /**
     * next
     * @param {*} selector 
     */
    next(selector) {
      if (!this._elem) { return new Dom(); }

      var dom;
      if (selector) {
        dom = this.parent();
        dom = dom.children(selector);
      }

      if (this._isArray()) {
        var nodes = [];
        for (var i = 0; i < this._elem.length; i++) {
          if (!dom || dom._isElementIn(this._elem[i].nextSibling)) {
            if (this._elem[i].nextSibling)
              nodes.push(this._elem[i].nextSibling);
          }
        }

        var dom1 = new Dom();
        dom1._elem = nodes;
        dom1._isArr = true;
        dom1.length = nodes.length;
        for (var i = 0; i < nodes.length; i++) {
          this._domtify(nodes[i]);
          dom1[i] = nodes[i];
        }
        return dom1;
      }
      else {
        var nodes;
        if (!dom || dom._isElementIn(this._elem.nextSibling)) {
          if (this._elem.nextSibling)
            nodes = this._elem.nextSibling;
        }

        var dom1 = new Dom();
        dom1._elem = nodes;
        dom1[0] = nodes;
        dom1._isArr = false;
        dom1.length = nodes ? 1 : 0;
        return dom1;
      } // if..else
    }


    /**
     * prev
     * @param {*} selector 
     */
    prev(selector) {
      if (!this._elem) { return new Dom(); }

      var dom;
      if (selector) {
        dom = this.parent();
        dom = dom.children(selector);
      }

      if (this._isArray()) {
        var nodes = [];
        for (var i = 0; i < this._elem.length; i++) {
          if (!dom || dom._isElementIn(this._elem[i].previousSibling)) {
            if (this._elem[i].previousSibling)
              nodes.push(this._elem[i].previousSibling);
          }
        }

        var dom1 = new Dom();
        dom1._elem = nodes;
        dom1._isArr = true;
        dom1.length = nodes.length;
        for (var i = 0; i < nodes.length; i++) {
          this._domtify(nodes[i]);
          dom1[i] = nodes[i];
        }
        return dom1;
      }
      else {
        var nodes;
        if (!dom || dom._isElementIn(this._elem.previousSibling)) {
          if (this._elem.previousSibling)
            nodes = this._elem.previousSibling;
        }

        var dom1 = new Dom();
        dom1._elem = nodes;
        dom1[0] = nodes;
        dom1._isArr = false;
        dom1.length = nodes ? 1 : 0;
        return dom1;
      } // if..else
    }

    // 将普通节点设置为Dom对象.
    _domtify(node) {
      if (node instanceof Dom)
        return;
      if (node._domtify)
        return;

      var _proto = Object.getPrototypeOf(this);
      for (const key in _proto) {
        if (key != '__proto__' && key != 'constructor') {
          // 不覆盖native方法.
          if (!node[key]) {
            node[key] = _proto[key].bind(node);
          }
        }
      }
      for (const key in this) {
        if (key != '__proto__' && key != 'constructor' && typeof this[key] === 'function') {
          // 不覆盖native方法.
          if (!node[key]) {
            node[key] = this[key].bind(node);
          }
        }
      }

      // plugin.
      for (const key in CreateDom.fn) {
        if (key == 'extend' || key == 'fn') continue;
        if (typeof CreateDom.fn[key] === 'function') {
          node[key] = CreateDom.fn[key].bind(node);
        }
      }

      delete node.length;
      node._isArr = false;
      node._elem = node;
      // node[0] = node;
      node.__domtify = true;

      if (node != window) {
        node.context = window.document;
      }
    }

    // 当前是否是数组.
    _isArray() {
      return this._isArr;
    }

    // 指定节点是否存在于本对象中.
    _isElementIn(node) {
      if (!this._elem)  return false;
      if (!this._isArray()) {
        if (this._elem.isSameNode(node)) {
          return true;
        }
      } else {
        for (var i = 0; i < this._elem.length; i++) {
          if (this._elem[i].isSameNode(node))
            return true;
        }
      }

      return false;
    }
  };

  CreateDom = function(n) {
    return new Dom(n);
  }
  // plugin.
  CreateDom.fn = {};
  CreateDom.extend = function(plugin) {
    if (plugin) {
      for (const key in plugin) {
        if (key == 'extend' || key == 'fn') continue;
        if (typeof plugin[key] === 'function') {
          CreateDom[key] = plugin[key];
        }
      }
    }
  }

  return {Dom, CreateDom};
}
);