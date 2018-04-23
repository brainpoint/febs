/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 171);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(8);
var hide = __webpack_require__(9);
var has = __webpack_require__(10);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(45)('wks');
var uid = __webpack_require__(30);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(59);
var toPrimitive = __webpack_require__(48);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(14);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(19);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(60);
var defined = __webpack_require__(37);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(57);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(34);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2['default'] === "function" && typeof _iterator2['default'] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = typeof _symbol2['default'] === "function" && _typeof(_iterator2['default']) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var call = __webpack_require__(63);
var isArrayIter = __webpack_require__(61);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(29);
var getIterFn = __webpack_require__(51);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(13);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(10);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(37);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(142)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(40)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(30)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(10);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(13)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(139);
var enumBugKeys = __webpack_require__(39);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(38)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(58).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(71);
var enumBugKeys = __webpack_require__(39);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(47);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(146);
var global = __webpack_require__(2);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(17);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(122), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(15);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(74);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(17);
var $iterCreate = __webpack_require__(137);
var setToStringTag = __webpack_require__(20);
var getPrototypeOf = __webpack_require__(70);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(14);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys');
var uid = __webpack_require__(30);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var invoke = __webpack_require__(135);
var html = __webpack_require__(58);
var cel = __webpack_require__(38);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(15)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(25);
var wksExt = __webpack_require__(50);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(36);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(17);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {



/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var _Number$MAX_SAFE_INTEGER = __webpack_require__(94)['default'];

var utils = __webpack_require__(170);

/**
 * @desc: 模拟sleep.
 * @return: Promise.
 *     在ms时间后执行.
 * @e.g.
 *     febs.utils.sleep(1000).then(()=>{
          //1000ms之后resolve.
       });
 */
exports.sleep = utils.sleep;

/**
 * @desc: the browser is mobile.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsMobile = utils.browserIsMobile;

/**
 * @desc: the browser is ios.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsIOS = utils.browserIsIOS;

/**
 * @desc: the browser is phone.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsPhone = utils.browserIsPhone;

/**
 * @desc: the browser is weixin.
 */
exports.browserIsWeixin = utils.browserIsWeixin;

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
exports.getTimeString = utils.getTimeString;

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
exports.getTimeStringFromNow = utils.getTimeStringFromNow;

/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */
exports.getDate = utils.getDate;

/**
 * @desc: getDate2('20120509')
 * @return: Date.
 */
exports.getDate2 = utils.getDate2;

/**
 * @desc: 合并多个map.
 * @return: {}
 */
exports.mergeMap = utils.mergeMap;

/**
* @desc: 判断参数是否是null,undefined,NaN
* @return: boolean
*/
exports.isNull = utils.isNull;

/**
 * @desc: 判断是否是bigint.
 */
exports.bigint_check = utils.bigint_check;

/**
* @desc: calc bigint
* @return: bigint.
*/
exports.bigint_add = utils.bigint_add;

exports.bigint_minus = utils.bigint_minus;

exports.bigint_dividedBy = utils.bigint_dividedBy;

exports.bigint_mul = utils.bigint_mul;

/**
* @desc: compare with bigint.
* @return: boolean.
*/
exports.bigint_equal = utils.bigint_equal;

exports.bigint_more_than = utils.bigint_more_than;

exports.bigint_more_than_e = utils.bigint_more_than_e;

exports.bigint_less_than = utils.bigint_less_than;

exports.bigint_less_than_e = utils.bigint_less_than_e;

/**
* @desc: 转换bigint->string.
* @param fixed: 小数位个数, 默认为0.
* @return: string.
*/
exports.bigint_toFixed = utils.bigint_toFixed;

/**
* @desc: 判断是否是ie.
*/
exports.browserIsIE = function () {
  if (!!window.ActiveXObject || "ActiveXObject" in window) return true;else return false;
};

/**
* @desc: 判断ie版本号.
* @return number. 非ie返回Number.MAX_SAFE_INTEGER.
*/
exports.browserIEVer = function () {
  if (!exports.browserIsIE()) return _Number$MAX_SAFE_INTEGER;

  var b_version = navigator.appVersion;
  var version = b_version.split(";");
  var trim_Version = version[1].replace(/[ ]/g, "");
  if (!trim_Version || trim_Version.length < 5) {
    var userAgent = navigator.userAgent;
    userAgent = userAgent.toLowerCase();
    if (userAgent.indexOf('rv:11.') > 0) return 11;
    if (userAgent.indexOf('rv:12.') > 0) return 12;
    return _Number$MAX_SAFE_INTEGER;
  }

  return parseInt(trim_Version[4]);
};

/**
 * @desc: the browser is support html5.
 */
exports.browserIsSupportHtml5 = function () {
  if (typeof Worker !== "undefined") {
    return true;
  } else {
    return false;
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(123), __esModule: true };

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(38)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(15);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(17);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(15);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(42);
var createDesc = __webpack_require__(19);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(48);
var has = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(59);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(68).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(71);
var hiddenKeys = __webpack_require__(39).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(10);
var toObject = __webpack_require__(21);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(10);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(126)(false);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(41);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var dP = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(14);
var SPECIES = __webpack_require__(3)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 78 */
/***/ (function(module, exports) {

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(global) {
  'use strict';
  if (!global.console) {
    global.console = {};
  }
  var con = global.console;
  var prop, method;
  var dummy = function() {};
  var properties = ['memory'];
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
  // Using `this` for web workers & supports Browserify / Webpack.
})(typeof window === 'undefined' ? this : window);


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(12)["default"];

// window.requestAnimationFrame / window.cancelAnimationFrame

(function (global, factory) {

	"use strict";

	if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("febs requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	var animationFrame = {};

	var lastTime = 0;
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function (callback) {
			var currTime = Date.now();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
	}

	animationFrame.requestAnimationFrame = window.requestAnimationFrame;
	animationFrame.cancelAnimationFrame = window.cancelAnimationFrame;

	return animationFrame;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module)))

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 *  crc32(str, crc=null);
 *  crc32_file(file, function(crc32Value) {})
 */

var crypt = __webpack_require__(168);
var sha1 = __webpack_require__(87);
var md5 = __webpack_require__(86);

/**
 * @desc: 计算字符串的crc32值
 * @param crc: 可以在这个值得基础上继续计算
 * @return: number.
 */
function crc32( /* String */str, /* Number */crc) {
    if (!crc) crc = 0;
    crc = crc ^ -1;

    for (var i = 0, iTop = str.length; i < iTop; i++) {
        crc = crc >>> 8 ^ crypt.crc32_table[(crc ^ str.charCodeAt(i)) & 0xFF];
    }
    return crc ^ -1;
}
exports.crc32 = crc32;

/**
 * @desc:
 * @param cb: cb(crc32)
 * @return:
 */
exports.crc32_file = function (file, cb) {
    if (!file && !cb) {
        if (cb) cb(0);
        return;
    }

    var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
    var fileReader = new FileReader();

    var chunkSize = 1024 * 1024 * 2;
    var chunks = Math.ceil(file.size / chunkSize);
    var currentChunk = 0;

    var loadNext = function loadNext() {
        var start = currentChunk * chunkSize,
            end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileReader.readAsBinaryString(blobSlice.call(file, start, end));
    };

    var crc = 0;

    //每块文件读取完毕之后的处理.
    fileReader.onload = function (e) {
        crc = crc32(e.target.result, crc);
        // append binary string
        currentChunk++;

        if (currentChunk < chunks) {
            loadNext();
        } else {
            cb(crc);
        }
    };

    loadNext();
};

exports.sha1 = sha1;

exports.md5 = md5;

/**
* @desc: base64编码.
* @param arrByte: 字节数组.
* @return: string.
*/
exports.base64_encode = crypt.base64_encode;

/**
* @desc: base64解码.
* @return: 字节数组.
*/
exports.base64_decode = function (strBase64) {
    var c1, c2, c3, c4;
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var i = 0,
        len = strBase64.length,
        out = [];

    while (i < len) {
        do {
            c1 = base64DecodeChars[strBase64.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);

        if (c1 == -1) break;

        do {
            c2 = base64DecodeChars[strBase64.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);

        if (c2 == -1) break;

        out.push(c1 << 2 | (c2 & 0x30) >> 4);

        do {
            c3 = strBase64.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;

            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);

        if (c3 == -1) break;

        out.push((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);

        do {
            c4 = strBase64.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);

        if (c4 == -1) break;

        out.push((c3 & 0x03) << 6 | c4);
    }
    return out;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _Object$getPrototypeOf = __webpack_require__(56)["default"];

var _classCallCheck = __webpack_require__(101)["default"];

var _typeof = __webpack_require__(12)["default"];

(function (global, factory) {

  "use strict";

  if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

    // For CommonJS and CommonJS-like environments where a proper `window`
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("febs requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

  // - parentNodes 父节点 (HTMLNode)
  // - name 子节点selector.
  // - notAllChildren 仅查询一层子节点.
  // 返回匹配到的元素集合.
  function _matchElement(parentNodes, name, notAllChildren) {
    var elems;
    var tag = 0; // 0-tag, 1-id, 2-class.

    if (name[0] == '.') {
      tag = 2;
      name = name.substr(1);
    } else if (name[0] == '#') {
      tag = 1;
      name = name.substr(1);
    } else {
      name = name.toUpperCase();
    }

    if (!parentNodes || parentNodes.length == 0) {
      if (2 == tag) {
        elems = window.document.getElementsByClassName(name);
      } else if (1 == tag) {
        elems = window.document.getElementById(name);
        if (elems) elems = [elems];else elems = [];
      } else {
        elems = window.document.getElementsByTagName(name);
      }
    } else {
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
          } else if (1 == tag) {
            if (node[j].id == name) {
              elems.push(node[j]);
              continue;
            }
          } else {
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
                node = node.slice(j + 1);
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
        } else {
          _elem = _elem.childNodes;
          _isarr = true;
        }
      } else {
        if (name.indexOf('<') > 0 || name.indexOf('>') > 0) throw new Error('Syntax error, unrecognized');

        var names = name.split(' ');
        var nodes = parentNode ? [parentNode] : null;
        for (var i = 0; i < names.length; i++) {
          if (names[i] != '') nodes = _matchElement(nodes, names[i], !!parentNode);
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
    return { _elem: _elem, _isarr: _isarr };
  }

  /**
   * hasClass
   */
  function _hasClass(element, cName) {
    if (!element || !element.className) return false;
    return !!element.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断  
  }

  /**
   * addClass
   */
  function _addClass(element, cName) {
    if (!_hasClass(element, cName)) {
      element.className += " " + cName;
    };
  }

  /**
   * removeClass
   */
  function _removeClass(element, cName) {
    if (_hasClass(element, cName)) {
      element.className = element.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换  
    };
  }
  /**
   * removeElement
   */
  function _removeElement(element) {
    var _parentElement = element.parentNode;
    if (_parentElement) {
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
    } else {
      element.appendChild(node);
    }
  }

  function _prependChild(element, node) {
    if (element.hasChildNodes()) {
      if (node instanceof Dom) {
        if (!node._isArray()) {
          element.insertBefore(node[0], element.firstChild);
        } else {
          for (var i = node.length - 1; i >= 0; i--) {
            element.insertBefore(node[i], element.firstChild);
          }
        }
      } else {
        element.insertBefore(node, element.firstChild);
      }
    } else {
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

  var Dom = function () {
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
    function Dom(name) {
      _classCallCheck(this, Dom);

      //
      // save in '_elem', '_isArr' 
      //
      if (name === window.document || name == window) {
        this._elem = name;
        this._isArr = false;
      } else if (name instanceof Dom) {
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
        this.ready = function (f) {
          if (f) {
            window.document.addEventListener('DOMContentLoaded', f);return _this;
          }
        };
        this.unload = function (f) {
          if (f) {
            window.document.addEventListener('unload', f);return _this;
          }
        };
        this.context = window.document;
      } else if (name === window) {
        this.unload = function (f) {
          if (f) {
            window.addEventListener('unload', f);return _this;
          }
        };
      } else {
        this.context = window.document;
      }

      if (typeof name === 'function') {
        window.document.addEventListener('DOMContentLoaded', name);
      } else {
        var ttt = function ttt(event, f) {
          if (f) {
            return _this.on(event, f);
          } else {
            return _this.trigger(event);
          }
        };

        this.blur = function (f) {
          return ttt('blur', f);
        };
        this.change = function (f) {
          return ttt('change', f);
        };
        this.click = function (f) {
          return ttt('click', f);
        };
        this.dblclick = function (f) {
          return ttt('dblclick', f);
        };
        this.error = function (f) {
          return ttt('error', f);
        };
        this.keydown = function (f) {
          return ttt('keydown', f);
        };
        this.keypress = function (f) {
          return ttt('keypress', f);
        };
        this.keyup = function (f) {
          return ttt('keyup', f);
        };
        this.load = function (f) {
          return ttt('load', f);
        };
        this.mousedown = function (f) {
          return ttt('mousedown', f);
        };
        this.mouseenter = function (f) {
          return ttt('mouseenter', f);
        };
        this.mouseleave = function (f) {
          return ttt('mouseleave', f);
        };
        this.mousemove = function (f) {
          return ttt('mousemove', f);
        };
        this.mouseout = function (f) {
          return ttt('mouseout', f);
        };
        this.mouseover = function (f) {
          return ttt('mouseover', f);
        };
        this.mouseup = function (f) {
          return ttt('mouseup', f);
        };
        this.scroll = function (f) {
          return ttt('scroll', f);
        };
        this.select = function (f) {
          return ttt('select', f);
        };
        this.submit = function (f) {
          return ttt('submit', f);
        };
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


    Dom.prototype.hasClass = function hasClass(cName) {
      if (!this._elem) {
        return false;
      }
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          if (_hasClass(this._elem[i], cName)) return true;
        }
        return false;
      } else {
        return _hasClass(this._elem, cName);
      }
    };

    /**
     * @desc: addClass
     */


    Dom.prototype.addClass = function addClass(cName) {
      if (!this._elem) {
        return this;
      }
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          _addClass(this._elem[i], cName);
        }
      } else {
        _addClass(this._elem, cName);
      }
      return this;
    };

    /**
     * @desc: removeClass
     */


    Dom.prototype.removeClass = function removeClass(cName) {
      if (!this._elem) {
        return this;
      }
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          _removeClass(this._elem[i], cName);
        }
      } else {
        _removeClass(this._elem, cName);
      }
      return this;
    };

    /**
     * @desc: toggleClass
     */


    Dom.prototype.toggleClass = function toggleClass(cName) {
      if (!this._elem) {
        return this;
      }
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          if (_hasClass(this._elem[i], cName)) _removeClass(this._elem[i], cName);else _addClass(this._elem[i], cName);
        }
      } else {
        if (_hasClass(this._elem, cName)) _removeClass(this._elem, cName);else _addClass(this._elem, cName);
      }
      return this;
    };

    /**
     * @desc: remove
     */


    Dom.prototype.remove = function remove() {
      if (!this._elem) {
        return this;
      }
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          _removeElement(this._elem[i]);
        }
      } else {
        _removeElement(this._elem);
      }
      return this;
    };

    /**
     * @desc: append
     */


    Dom.prototype.append = function append(node) {
      if (!this._elem) {
        return this;
      }
      node = new Dom(node);
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          _appendChild(this._elem[i], node);
        }
      } else {
        _appendChild(this._elem, node);
      }
      return this;
    };

    /**
     * appendTo
     */


    Dom.prototype.appendTo = function appendTo(node) {
      if (!this._elem) {
        return this;
      }
      if (!this._isArray()) {
        var dom = new Dom(node);
        dom.append(this);
      }
      return this;
    };

    /**
     * @desc: prepend
     */


    Dom.prototype.prepend = function prepend(node) {
      if (!this._elem) {
        return this;
      }
      node = new Dom(node);
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          _prependChild(this._elem[i], node);
        }
      } else {
        _prependChild(this._elem, node);
      }
      return this;
    };

    /**
     * @desc: prependTo
     */


    Dom.prototype.prependTo = function prependTo(node) {
      if (!this._elem) {
        return this;
      }
      if (!this._isArray()) {
        var dom = new Dom(node);
        dom.prepend(this);
      }
      return this;
    };

    /**
     * @desc: before
     */


    Dom.prototype.before = function before(node) {
      if (!this._elem) {
        return this;
      }
      node = new Dom(node);
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          node.insertBefore(this._elem[i]);
        }
      } else {
        node.insertBefore(this._elem);
      }
      return this;
    };

    /**
     * insertBefore
     */


    Dom.prototype.insertBefore = function insertBefore(node) {
      if (!this._elem) {
        return this;
      }
      var dom = new Dom(node);
      if (!dom._isArray()) {
        var elem = this._elem;
        if (!this._isArray()) elem = [elem];
        for (var i = 0; i < elem.length; i++) {
          dom[0].parentNode.insertBefore(elem[i], dom[0]);
        }
      }
      return this;
    };

    /**
     * @desc: after
     */


    Dom.prototype.after = function after(node) {
      if (!this._elem) {
        return this;
      }
      node = new Dom(node);
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          node.insertAfter(this._elem[i]);
        }
      } else {
        node.insertAfter(this._elem);
      }
      return this;
    };

    /**
     * @desc: insertAfter
     */


    Dom.prototype.insertAfter = function insertAfter(node) {
      if (!this._elem) {
        return this;
      }
      var dom = new Dom(node);
      if (!dom._isArray()) {
        var elem = this._elem;
        if (!this._isArray()) elem = [elem];
        for (var i = 0; i < elem.length; i++) {
          dom[0].parentNode.insertBefore(elem[i], dom[0].nextSibling);
        }
      }
      return this;
    };

    /**
     * @desc: attr.
     */


    Dom.prototype.attr = function attr(attrName, value) {
      if (!this._elem) {
        if (typeof value !== 'undefined') return this;
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
        } else {
          this._elem.setAttribute(attrName, value);
        }
        return this;
      }
    };

    /**
     * @desc: removeAttr
     */


    Dom.prototype.removeAttr = function removeAttr(name) {
      if (!this._elem) {
        return this;
      }
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          this._elem[i].removeAttribute(name);
        }
      } else {
        this._elem.removeAttribute(name);
      }
      return this;
    };

    /**
    * @desc: detach.
    */


    Dom.prototype.detach = function detach() {
      throw new Error('unimplement');
    };

    /**
    * @desc: clone.
    */


    Dom.prototype.clone = function clone() {
      throw new Error('unimplement');
    };

    /**
    * @desc: replaceAll.
    */


    Dom.prototype.replaceAll = function replaceAll() {
      throw new Error('unimplement');
    };

    /**
    * @desc: replaceWith.
    */


    Dom.prototype.unwrap = function unwrap() {
      throw new Error('unimplement');
    };
    /**
    * @desc: replaceWith.
    */


    Dom.prototype.wrap = function wrap() {
      throw new Error('unimplement');
    };
    /**
    * @desc: replaceWith.
    */


    Dom.prototype.wrapAll = function wrapAll() {
      throw new Error('unimplement');
    };
    /**
    * @desc: replaceWith.
    */


    Dom.prototype.wrapinner = function wrapinner() {
      throw new Error('unimplement');
    };

    /**
    * @desc: empty.
    */


    Dom.prototype.empty = function empty() {
      if (!this._elem) {
        return this;
      }
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          this._elem[i].innerHTML = '';
        }
      } else {
        this._elem.innerHTML = '';
      }
      return this;
    };

    /**
    * @desc: html.
    */


    Dom.prototype.html = function html(v) {
      if (!this._elem) {
        if (typeof v !== 'undefined') return this;
        return;
      }
      if (typeof v === 'undefined') {
        if (this._isArray()) {
          if (this._elem.length > 0) return this._elem[0].innerHTML;
        } else {
          return this._elem.innerHTML;
        }
      } else {
        if (this._isArray()) {
          for (var i = 0; i < this._elem.length; i++) {
            this._elem[i].innerHTML = v;
          }
        } else {
          this._elem.innerHTML = v;
        }
        return this;
      }
    };

    /**
    * @desc: text.
    */


    Dom.prototype.text = function text(v) {
      if (!this._elem) {
        if (typeof v !== 'undefined') return this;
        return;
      }
      if (typeof v === 'undefined') {
        if (this._isArray()) {
          if (this._elem.length > 0) return this._elem[0].textContent;
        } else {
          return this._elem.textContent;
        }
      } else {
        if (this._isArray()) {
          for (var i = 0; i < this._elem.length; i++) {
            this._elem[i].textContent = v;
          }
        } else {
          this._elem.textContent = v;
        }
        return this;
      }
    };

    /**
    * @desc: val.
    */


    Dom.prototype.val = function val(v) {
      if (!this._elem) {
        if (typeof v !== 'undefined') return this;
        return;
      }
      if (typeof v === 'undefined') {
        if (this._isArray()) {
          if (this._elem.length > 0) return this._elem[0].value;
        } else {
          return this._elem.value;
        }
      } else {
        if (this._isArray()) {
          for (var i = 0; i < this._elem.length; i++) {
            this._elem[i].value = v;
          }
        } else {
          this._elem.value = v;
        }
        return this;
      }
    };

    /**
    * @desc: css.
    */


    Dom.prototype.css = function css(name, value) {
      if (!this._elem) {
        if (typeof value !== 'undefined') return this;
        return;
      }
      if (typeof value === 'undefined') {
        if (!this._isArray()) {
          return this._elem.style[name];
        }
      } else {
        if (this._isArray()) {
          for (var i = 0; i < this._elem.length; i++) {
            if (value == '') this._elem[i].style[name] = '';else this._elem[i].style[name] = value;
          }
        } else {
          if (value == '') this._elem.style[name] = '';else this._elem.style[name] = value;
        }
        return this;
      }
    };

    /**
    * @desc: on.
    */


    Dom.prototype.on = function on(eventname, foo) {
      if (!eventname) throw new Error('need event name');

      if (typeof foo !== 'function') throw new Error('on need function params');

      if (!this._elem) {
        return this;
      }
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
      } else {
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
    };

    /**
    * @desc: one.
    */


    Dom.prototype.one = function one(event, f) {
      if (!event) throw new Error('need event name');

      var _this = this;
      var tt = function tt(e) {
        _this.off(event, tt);f(e);
      };
      _this.on(event, tt);
      return this;
    };

    /**
    * @desc: off.
    */


    Dom.prototype.off = function off(eventname, foo) {
      if (!eventname) throw new Error('need event name');

      if (!this._elem) {
        return this;
      }
      if (!foo) {
        if (this._isArray()) {
          for (var i = 0; i < this._elem.length; i++) {
            if (this._elem[i].__events && this._elem[i].__events[eventname]) {
              var env = this._elem[i].__events[eventname];
              var j;
              for (j = 0; j < env.length; j++) {
                this._elem[i].removeEventListener(eventname, env[j]);
              }
              this._elem[i].__events[eventname] = [];
            }
          }
        } else {
          if (this._elem.__events && this._elem.__events[eventname]) {
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

      if (typeof foo !== 'function') throw new Error('off need function params');

      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          if (this._elem[i].__events && this._elem[i].__events[eventname]) {
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
      } else {
        if (this._elem.__events && this._elem.__events[eventname]) {
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
    };

    /**
    * @desc: trigger.
    */


    Dom.prototype.trigger = function trigger(eventname) {
      if (!eventname) throw new Error('need event name');

      if (!this._elem) {
        return this;
      }

      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          if (this._elem[i][eventname] && typeof this._elem[i][eventname] === 'function') {
            this._elem[i][eventname]();
          }
        }
      } else {
        if (this._elem[eventname] && typeof this._elem[eventname] === 'function') {
          this._elem[eventname]();
        }
      }
      return this;
    };

    /**
    * @desc: parent
    * @return: 
    */


    Dom.prototype.parent = function parent(selector) {
      if (!this._elem) {
        return new Dom();
      }
      var sel;
      if (selector) sel = new Dom(selector);
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
    };

    /**
    * @desc: parents
    * @return: 
    */


    Dom.prototype.parents = function parents(selector) {
      if (!this._elem) {
        return new Dom();
      }
      var sel;
      if (selector) sel = new Dom(selector);

      if (this._isArray()) {
        var nodes = [];
        for (var i = 0; i < this._elem.length; i++) {
          if (!this._elem[i].parentNode) continue;
          var elem = this._elem[i];
          while (elem.parentNode) {
            if (elem.parentNode == window || elem.parentNode == window.document) break;

            if (!sel || sel._isElementIn(elem.parentNode)) {
              var j;
              for (j = 0; j < nodes.length; j++) {
                if (nodes[j].isSameNode(elem.parentNode)) {
                  break;
                }
              }
              if (j >= nodes.length) nodes.push(elem.parentNode);
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
      } else {
        if (!this._elem.parentNode) return new Dom();
        var nodes = [];
        var elem = this._elem;
        while (elem.parentNode) {
          if (elem.parentNode == window || elem.parentNode == window.document) break;

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
    };

    /**
     * children
     * @param {*} selector 
     */


    Dom.prototype.children = function children(selector) {
      if (!this._elem) {
        return new Dom();
      }

      if (this._isArray()) {
        var nodes = [];
        for (var i = 0; i < this._elem.length; i++) {
          var sel;
          if (selector) sel = _getElement(selector, this._elem[i]);else {
            sel = { _elem: [], _isarr: true };
            for (var j = 0; j < this._elem[i].childNodes.length; j++) {
              sel._elem.push(this._elem[i].childNodes[j]);
            }
          }

          if (!sel._elem) continue;

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
      } else {
        var sel;
        if (selector) sel = _getElement(selector, this._elem);else {
          sel = { _elem: [], _isarr: true };
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
    };

    /**
     * next
     * @param {*} selector 
     */


    Dom.prototype.next = function next(selector) {
      if (!this._elem) {
        return new Dom();
      }

      var dom;
      if (selector) {
        dom = this.parent();
        dom = dom.children(selector);
      }

      if (this._isArray()) {
        var nodes = [];
        for (var i = 0; i < this._elem.length; i++) {
          if (!dom || dom._isElementIn(this._elem[i].nextSibling)) {
            if (this._elem[i].nextSibling) nodes.push(this._elem[i].nextSibling);
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
      } else {
        var nodes;
        if (!dom || dom._isElementIn(this._elem.nextSibling)) {
          if (this._elem.nextSibling) nodes = this._elem.nextSibling;
        }

        var dom1 = new Dom();
        dom1._elem = nodes;
        dom1[0] = nodes;
        dom1._isArr = false;
        dom1.length = nodes ? 1 : 0;
        return dom1;
      } // if..else
    };

    /**
     * prev
     * @param {*} selector 
     */


    Dom.prototype.prev = function prev(selector) {
      if (!this._elem) {
        return new Dom();
      }

      var dom;
      if (selector) {
        dom = this.parent();
        dom = dom.children(selector);
      }

      if (this._isArray()) {
        var nodes = [];
        for (var i = 0; i < this._elem.length; i++) {
          if (!dom || dom._isElementIn(this._elem[i].previousSibling)) {
            if (this._elem[i].previousSibling) nodes.push(this._elem[i].previousSibling);
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
      } else {
        var nodes;
        if (!dom || dom._isElementIn(this._elem.previousSibling)) {
          if (this._elem.previousSibling) nodes = this._elem.previousSibling;
        }

        var dom1 = new Dom();
        dom1._elem = nodes;
        dom1[0] = nodes;
        dom1._isArr = false;
        dom1.length = nodes ? 1 : 0;
        return dom1;
      } // if..else
    };

    // 将普通节点设置为Dom对象.


    Dom.prototype._domtify = function _domtify(node) {
      if (node instanceof Dom) return;
      if (node._domtify) return;

      var _proto = _Object$getPrototypeOf(this);
      for (var key in _proto) {
        if (key != '__proto__' && key != 'constructor') {
          // 不覆盖native方法.
          if (!node[key]) {
            node[key] = _proto[key].bind(node);
          }
        }
      }
      for (var _key in this) {
        if (_key != '__proto__' && _key != 'constructor' && typeof this[_key] === 'function') {
          // 不覆盖native方法.
          if (!node[_key]) {
            node[_key] = this[_key].bind(node);
          }
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
    };

    // 当前是否是数组.


    Dom.prototype._isArray = function _isArray() {
      return this._isArr;
    };

    // 指定节点是否存在于本对象中.


    Dom.prototype._isElementIn = function _isElementIn(node) {
      if (!this._elem) return false;
      if (!this._isArray()) {
        if (this._elem.isSameNode(node)) {
          return true;
        }
      } else {
        for (var i = 0; i < this._elem.length; i++) {
          if (this._elem[i].isSameNode(node)) return true;
        }
      }

      return false;
    };

    return Dom;
  }();

  ;

  return Dom;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module)))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _Object$getOwnPropertyNames = __webpack_require__(55)["default"];

var _Promise = __webpack_require__(33)["default"];

var _Symbol = __webpack_require__(34)["default"];

var _typeof = __webpack_require__(12)["default"];

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = __webpack_require__(53);

(function (global, factory) {

  "use strict";

  if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

    // For CommonJS and CommonJS-like environments where a proper `window`
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("febs requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

  'use strict';

  var Ajaxmark = _Symbol('ajaxmark');
  var DefaultTimeout = 5000;
  var febsnet = {};
  var net = {};

  // //--------------------------------------------------------
  // // ajax
  // //--------------------------------------------------------

  // /**
  //  * @desc: ajax 跳转.
  //  * @return:
  //  */
  // net.ajax=
  // function( ctx )
  // {
  //   //if (!!window.ActiveXObject || "ActiveXObject" in window) // ie11.
  //   {
  //     if (ctx.url)
  //     {
  //       if (!global[Ajaxmark]) global[Ajaxmark] = 1;
  //       var i = ctx.url.indexOf('?');
  //       if (i < 0) {
  //         ctx.url += "?ajaxmark="+global[Ajaxmark];
  //       } else {
  //         if (i == ctx.url.length-1) {
  //           ctx.url += "ajaxmark="+global[Ajaxmark];
  //         } else {
  //           ctx.url += "&ajaxmark="+global[Ajaxmark];
  //         }
  //       }
  //     }
  //     global[Ajaxmark]++;
  //   } // if.

  //   if (!ctx.timeout)
  //     ctx.timeout = DefaultTimeout;

  //   $.ajax(ctx);
  // }

  //--------------------------------------------------------
  // fetch.
  //--------------------------------------------------------
  if (false) {
    //febsnet.fetch=window.fetch;
  } else {
    if (!_Promise) {
      throw new Error('unsupported Promise');
    }

    // https://github.com/github/fetch
    febsnet.fetch_normalizeName = function (name) {
      if (typeof name !== 'string') {
        name = String(name);
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }
      return name.toLowerCase();
    };

    febsnet.fetch_normalizeValue = function (value) {
      if (typeof value !== 'string') {
        value = String(value);
      }
      return value;
    };

    febsnet.fetch_Headers = function (headers) {
      this.map = {};

      if (headers instanceof febsnet.fetch_Headers) {
        headers.forEach(function (value, name) {
          this.append(name, value);
        }, this);
      } else if (headers) {
        _Object$getOwnPropertyNames(headers).forEach(function (name) {
          this.append(name, headers[name]);
        }, this);
      }
    };

    febsnet.fetch_Headers.prototype.append = function (name, value) {
      name = febsnet.fetch_normalizeName(name);
      value = febsnet.fetch_normalizeValue(value);
      var list = this.map[name];
      if (!list) {
        list = [];
        this.map[name] = list;
      }
      list.push(value);
    };

    febsnet.fetch_Headers.prototype['delete'] = function (name) {
      delete this.map[febsnet.fetch_normalizeName(name)];
    };

    febsnet.fetch_Headers.prototype.get = function (name) {
      var values = this.map[febsnet.fetch_normalizeName(name)];
      return values ? values[0] : null;
    };

    febsnet.fetch_Headers.prototype.getAll = function (name) {
      return this.map[febsnet.fetch_normalizeName(name)] || [];
    };

    febsnet.fetch_Headers.prototype.has = function (name) {
      return this.map.hasOwnProperty(febsnet.fetch_normalizeName(name));
    };

    febsnet.fetch_Headers.prototype.set = function (name, value) {
      this.map[febsnet.fetch_normalizeName(name)] = [febsnet.fetch_normalizeValue(value)];
    };

    febsnet.fetch_Headers.prototype.forEach = function (callback, thisArg) {
      _Object$getOwnPropertyNames(this.map).forEach(function (name) {
        this.map[name].forEach(function (value) {
          callback.call(thisArg, value, name, this);
        }, this);
      }, this);
    };

    febsnet.fetch_consumed = function (body) {
      if (body.bodyUsed) {
        return _Promise.reject(new TypeError('Already read'));
      }
      body.bodyUsed = true;
    };

    febsnet.fetch_fileReaderReady = function (reader) {
      return new _Promise(function (resolve, reject) {
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(reader.error);
        };
      });
    };

    febsnet.fetch_readBlobAsArrayBuffer = function (blob) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      return febsnet.fetch_fileReaderReady(reader);
    };

    febsnet.fetch_readBlobAsText = function (blob) {
      var reader = new FileReader();
      reader.readAsText(blob);
      return febsnet.fetch_fileReaderReady(reader);
    };

    febsnet.fetch_support = {
      blob: 'FileReader' in window.self && 'Blob' in window.self && function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      }(),
      formData: 'FormData' in window.self,
      arrayBuffer: 'ArrayBuffer' in window.self
    };

    febsnet.fetch_Body = function () {
      this.bodyUsed = false;

      this._initBody = function (body) {
        this._bodyInit = body;
        if (typeof body === 'string') {
          this._bodyText = body;
        } else if (febsnet.fetch_support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (febsnet.fetch_support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (!body) {
          this._bodyText = '';
        } else if (febsnet.fetch_support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
          // Only febsnet.fetch_support ArrayBuffers for POST method.
          // Receiving ArrayBuffers happens via Blobs, instead.
        } else {
          throw new Error('unsupported BodyInit type');
        }
      };

      if (febsnet.fetch_support.blob) {
        this.blob = function () {
          var rejected = febsnet.fetch_consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return _Promise.resolve(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return _Promise.resolve(new Blob([this._bodyText]));
          }
        };

        this.arrayBuffer = function () {
          return this.blob().then(febsnet.fetch_readBlobAsArrayBuffer);
        };

        this.text = function () {
          var rejected = febsnet.fetch_consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return febsnet.fetch_readBlobAsText(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text');
          } else {
            return _Promise.resolve(this._bodyText);
          }
        };
      } else {
        this.text = function () {
          var rejected = febsnet.fetch_consumed(this);
          return rejected ? rejected : _Promise.resolve(this._bodyText);
        };
      }

      if (febsnet.fetch_support.formData) {
        this.formData = function () {
          return this.text().then(febsnet.fetch_decode);
        };
      }

      this.json = function () {
        return this.text().then(JSON.parse);
      };

      return this;
    };

    // HTTP methods whose capitalization should be normalized
    febsnet.fetch_normalizeMethod = function (method) {
      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    };

    febsnet.fetch_Request = function (input, options) {
      options = options || {};
      var body = options.body;
      if (febsnet.fetch_Request.prototype.isPrototypeOf(input)) {
        if (input.bodyUsed) {
          throw new TypeError('Already read');
        }
        this.url = input.url;
        this.credentials = input.credentials;
        if (!options.headers) {
          this.headers = new febsnet.fetch_Headers(input.headers);
        }
        this.method = input.method;
        this.mode = input.mode;
        if (!body) {
          body = input._bodyInit;
          input.bodyUsed = true;
        }
      } else {
        this.url = input;
      }

      this.credentials = options.credentials || this.credentials || 'omit';
      if (options.headers || !this.headers) {
        this.headers = new febsnet.fetch_Headers(options.headers);
      }
      this.method = febsnet.fetch_normalizeMethod(options.method || this.method || 'GET');
      this.mode = options.mode || this.mode || null;
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('febsnet.fetch_Body not allowed for GET or HEAD requests');
      }
      this._initBody(body);
    };

    febsnet.fetch_Request.prototype.clone = function () {
      return new febsnet.fetch_Request(this);
    };

    febsnet.fetch_decode = function (body) {
      var form = new FormData();
      body.trim().split('&').forEach(function (bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    };

    febsnet.fetch_headers = function (xhr) {
      var head = new febsnet.fetch_Headers();
      var pairs = xhr.getAllResponseHeaders().trim().split('\n');
      pairs.forEach(function (header) {
        var split = header.trim().split(':');
        var key = split.shift().trim();
        var value = split.join(':').trim();
        head.append(key, value);
      });
      return head;
    };

    febsnet.fetch_Body.call(febsnet.fetch_Request.prototype);

    febsnet.fetch_Response = function (bodyInit, options) {
      if (!options) {
        options = {};
      }

      this._initBody(bodyInit);
      this.type = 'default';
      this.status = options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = options.statusText;
      this.headers = options.headers instanceof febsnet.fetch_Headers ? options.headers : new febsnet.fetch_Headers(options.headers);
      this.url = options.url || '';
    };

    febsnet.fetch_Body.call(febsnet.fetch_Response.prototype);

    febsnet.fetch_Response.prototype.clone = function () {
      return new febsnet.fetch_Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new febsnet.fetch_Headers(this.headers),
        url: this.url
      });
    };

    febsnet.fetch_Response.error = function () {
      var response = new febsnet.fetch_Response(null, { status: 0, statusText: '' });
      response.type = 'error';
      return response;
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    febsnet.fetch_Response.redirect = function (url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code');
      }

      return new febsnet.fetch_Response(null, { status: status, headers: { location: url } });
    };

    window.Headers = febsnet.fetch_Headers;
    window.Request = febsnet.fetch_Request;
    window.Response = febsnet.fetch_Response;

    window.fetch = febsnet.fetch = function (input, init) {

      // <= IE9. need jquery.ajax or zepto.ajax 
      if (febsUtils.browserIEVer() <= 9) {
        var url;
        var option;
        if (febsnet.fetch_Request.prototype.isPrototypeOf(input) && !init) {
          url = input.url;
          option = input;
        } else {
          url = input;
          option = init;
        }

        return new _Promise(function (resolve, reject) {
          if (!window["$"] && !window["$"].ajax) {
            throw new Error('need jquery.ajax in ie9<= browsers.');
          }
          window["$"].ajax({
            url: url,
            beforeSend: function beforeSend(xhr) {
              var header = option.headers || {};
              for (var key in header) {
                var element = header[key];
                xhr.setRequestHeader(key, element);
              }
            },
            withCredentials: option.credentials === 'include' ? true : false,
            crossDomain: option.mode == 'cors' ? true : false,
            timeout: option.timeout || DefaultTimeout,
            type: option.method && option.method.toLowerCase() == 'post' ? 'POST' : 'GET',
            data: option.body,
            complete: function complete(xhr, ts) {
              var status = xhr.status === 1223 ? 204 : xhr.status;
              if (status < 100 || status > 599) {
                reject(new TypeError('Network request failed'));
                return;
              }
              function responseURL() {
                if ('responseURL' in xhr) {
                  return xhr.responseURL;
                }

                // Avoid security warnings on getResponseHeader when not allowed by CORS
                if (/^X-febsnet.fetch_Request-URL:/m.test(xhr.getAllResponseHeaders())) {
                  return xhr.getResponseHeader('X-febsnet.fetch_Request-URL');
                }

                return;
              }
              var options = {
                status: status,
                statusText: xhr.statusText,
                headers: febsnet.fetch_headers(xhr),
                url: responseURL()
              };
              var body = 'response' in xhr ? xhr.response : xhr.responseText;
              resolve(new febsnet.fetch_Response(body, options));
            },
            error: function error(xhr, msg) {
              if (msg == 'timeout') {
                reject('timeout');
              } else {
                reject(new TypeError('Network request failed'));
              }
            }
          });
        });
      } // if.

      // other.
      return new _Promise(function (resolve, reject) {
        var request;
        if (febsnet.fetch_Request.prototype.isPrototypeOf(input) && !init) {
          request = input;
        } else {
          request = new febsnet.fetch_Request(input, init);
        }

        var xhr;
        if (window.XDomainRequest) xhr = new XDomainRequest();else if (window.XMLHttpRequest) xhr = new XMLHttpRequest();else xhr = new ActiveXObject("Microsoft.XMLHTTP");

        if (init && init.timeout) {
          xhr.timeout = init.timeout;
        } else {
          xhr.timeout = DefaultTimeout;
        }

        function responseURL() {
          if ('responseURL' in xhr) {
            return xhr.responseURL;
          }

          // Avoid security warnings on getResponseHeader when not allowed by CORS
          if (/^X-febsnet.fetch_Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-febsnet.fetch_Request-URL');
          }

          return;
        }

        // xhr.onload = function() {
        //   var status = (xhr.status === 1223) ? 204 : xhr.status
        //   if (status < 100 || status > 599) {
        //     reject(new TypeError('Network request failed'))
        //     return
        //   }
        //   var options = {
        //     status: status,
        //     statusText: xhr.statusText,
        //     headers: febsnet.fetch_headers(xhr),
        //     url: responseURL()
        //   }
        //   var body = 'response' in xhr ? xhr.response : xhr.responseText;
        //   resolve(new febsnet.fetch_Response(body, options))
        // }

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            var status = xhr.status === 1223 ? 204 : xhr.status;
            if (status < 100 || status > 599) {
              reject(new TypeError('Network request failed'));
              return;
            }
            var options = {
              status: status,
              statusText: xhr.statusText,
              headers: febsnet.fetch_headers(xhr),
              url: responseURL()
            };
            var body = 'response' in xhr ? xhr.response : xhr.responseText;
            resolve(new febsnet.fetch_Response(body, options));
          }
        };

        xhr.ontimeout = function () {
          reject('timeout');
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        } else {
          xhr.withCredentials = false;
        }

        if ('responseType' in xhr && febsnet.fetch_support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    };

    febsnet.fetch.polyfill = true;

    net.fetch = febsnet.fetch;
  } // if..else.


  //--------------------------------------------------------
  // jsonp
  //--------------------------------------------------------

  // From https://github.com/camsong/fetch-jsonp
  febsnet.jsonp_defaultOptions = {
    timeout: DefaultTimeout,
    jsonpCallback: 'callback'
  };

  febsnet.jsonp_generateCallbackFunction = function () {
    return 'jsonp_' + Date.now().toString() + '_' + Math.ceil(Math.random() * 100000);
  };

  // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
  febsnet.jsonp_clearFunction = function (functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {}
  };

  febsnet.jsonp_removeScript = function (scriptId) {
    var script = document.getElementById(scriptId);
    document.getElementsByTagName("head")[0].removeChild(script);
  };

  febsnet.jsonp = function (url, options) {
    options = options || {};
    var timeout = options.timeout != null ? options.timeout : febsnet.jsonp_defaultOptions.timeout;
    var jsonpCallback = !!options.jsonpCallback ? options.jsonpCallback : febsnet.jsonp_defaultOptions.jsonpCallback;

    var timeoutId;

    return new _Promise(function (resolve, reject) {
      var callbackFunction = febsnet.jsonp_generateCallbackFunction();

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return _Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        febsnet.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);

        febsnet.jsonp_clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute("src", url + jsonpCallback + '=' + callbackFunction);
      jsonpScript.id = jsonpCallback + '_' + callbackFunction;
      document.getElementsByTagName("head")[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject('timeout');

        febsnet.jsonp_clearFunction(callbackFunction);
        febsnet.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);
      }, timeout);
    });
  };

  net.jsonp = febsnet.jsonp;

  return net;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module)))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var string = __webpack_require__(169);

/**
* @desc: 判断是否是手机号码.
* @return: boolean.
*/
exports.isPhoneMobile = string.isPhoneMobile;

/**
 * @desc: 是否为空串.
 * @return: boolean.
 */
exports.isEmpty = string.isEmpty;

/**
 * @desc: 获得字符串utf8编码后的字节长度.
 * @return: u32.
 */
exports.getByteSize = string.getByteSize;

/**
 * @desc: 替换字符串中所有的strSrc->strDest.
 * @return: string.
 */
exports.replace = string.replace;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _getIterator = __webpack_require__(89)["default"];

var _Array$from = __webpack_require__(88)["default"];

var _Symbol$iterator = __webpack_require__(57)["default"];

var _Symbol = __webpack_require__(34)["default"];

var _setImmediate = __webpack_require__(100)["default"];

var _Map = __webpack_require__(91)["default"];

var _Object$getPrototypeOf = __webpack_require__(56)["default"];

var _Object$getOwnPropertyNames = __webpack_require__(55)["default"];

var _Object$keys = __webpack_require__(99)["default"];

var _Object$getOwnPropertyDescriptor = __webpack_require__(98)["default"];

var _Object$defineProperty = __webpack_require__(96)["default"];

var _Object$freeze = __webpack_require__(97)["default"];

var _JSON$stringify = __webpack_require__(90)["default"];

var _Object$create = __webpack_require__(95)["default"];

var _Promise = __webpack_require__(33)["default"];

var _typeof = __webpack_require__(12)["default"];

/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2017 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.5.0
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function (t) {
  if ("object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
    var e;"undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.Promise = t();
  }
}(function () {
  var t, e, n;return function r(t, e, n) {
    function i(s, a) {
      if (!e[s]) {
        if (!t[s]) {
          var c = "function" == typeof _dereq_ && _dereq_;if (!a && c) return c(s, !0);if (o) return o(s, !0);var l = new Error("Cannot find module '" + s + "'");throw l.code = "MODULE_NOT_FOUND", l;
        }var u = e[s] = { exports: {} };t[s][0].call(u.exports, function (e) {
          var n = t[s][1][e];return i(n ? n : e);
        }, u, u.exports, r, t, e, n);
      }return e[s].exports;
    }for (var o = "function" == typeof _dereq_ && _dereq_, s = 0; s < n.length; s++) {
      i(n[s]);
    }return i;
  }({ 1: [function (t, e, n) {
      "use strict";
      e.exports = function (t) {
        function e(t) {
          var e = new n(t),
              r = e.promise();return e.setHowMany(1), e.setUnwrap(), e.init(), r;
        }var n = t._SomePromiseArray;t.any = function (t) {
          return e(t);
        }, t.prototype.any = function () {
          return e(this);
        };
      };
    }, {}], 2: [function (t, e, n) {
      "use strict";
      function r() {
        this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new u(16), this._normalQueue = new u(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;var t = this;this.drainQueues = function () {
          t._drainQueues();
        }, this._schedule = l;
      }function i(t, e, n) {
        this._lateQueue.push(t, e, n), this._queueTick();
      }function o(t, e, n) {
        this._normalQueue.push(t, e, n), this._queueTick();
      }function s(t) {
        this._normalQueue._pushOne(t), this._queueTick();
      }var a;try {
        throw new Error();
      } catch (c) {
        a = c;
      }var l = t("./schedule"),
          u = t("./queue"),
          p = t("./util");r.prototype.setScheduler = function (t) {
        var e = this._schedule;return this._schedule = t, this._customScheduler = !0, e;
      }, r.prototype.hasCustomScheduler = function () {
        return this._customScheduler;
      }, r.prototype.enableTrampoline = function () {
        this._trampolineEnabled = !0;
      }, r.prototype.disableTrampolineIfNecessary = function () {
        p.hasDevTools && (this._trampolineEnabled = !1);
      }, r.prototype.haveItemsQueued = function () {
        return this._isTickUsed || this._haveDrainedQueues;
      }, r.prototype.fatalError = function (t, e) {
        e ? (process.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"), process.exit(2)) : this.throwLater(t);
      }, r.prototype.throwLater = function (t, e) {
        if (1 === arguments.length && (e = t, t = function t() {
          throw e;
        }), "undefined" != typeof setTimeout) setTimeout(function () {
          t(e);
        }, 0);else try {
          this._schedule(function () {
            t(e);
          });
        } catch (n) {
          throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
        }
      }, p.hasDevTools ? (r.prototype.invokeLater = function (t, e, n) {
        this._trampolineEnabled ? i.call(this, t, e, n) : this._schedule(function () {
          setTimeout(function () {
            t.call(e, n);
          }, 100);
        });
      }, r.prototype.invoke = function (t, e, n) {
        this._trampolineEnabled ? o.call(this, t, e, n) : this._schedule(function () {
          t.call(e, n);
        });
      }, r.prototype.settlePromises = function (t) {
        this._trampolineEnabled ? s.call(this, t) : this._schedule(function () {
          t._settlePromises();
        });
      }) : (r.prototype.invokeLater = i, r.prototype.invoke = o, r.prototype.settlePromises = s), r.prototype._drainQueue = function (t) {
        for (; t.length() > 0;) {
          var e = t.shift();if ("function" == typeof e) {
            var n = t.shift(),
                r = t.shift();e.call(n, r);
          } else e._settlePromises();
        }
      }, r.prototype._drainQueues = function () {
        this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, this._drainQueue(this._lateQueue);
      }, r.prototype._queueTick = function () {
        this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues));
      }, r.prototype._reset = function () {
        this._isTickUsed = !1;
      }, e.exports = r, e.exports.firstLineError = a;
    }, { "./queue": 26, "./schedule": 29, "./util": 36 }], 3: [function (t, e, n) {
      "use strict";
      e.exports = function (t, e, n, r) {
        var i = !1,
            o = function o(t, e) {
          this._reject(e);
        },
            s = function s(t, e) {
          e.promiseRejectionQueued = !0, e.bindingPromise._then(o, o, null, this, t);
        },
            a = function a(t, e) {
          0 === (50397184 & this._bitField) && this._resolveCallback(e.target);
        },
            c = function c(t, e) {
          e.promiseRejectionQueued || this._reject(t);
        };t.prototype.bind = function (o) {
          i || (i = !0, t.prototype._propagateFrom = r.propagateFromFunction(), t.prototype._boundValue = r.boundValueFunction());var l = n(o),
              u = new t(e);u._propagateFrom(this, 1);var p = this._target();if (u._setBoundTo(l), l instanceof t) {
            var h = { promiseRejectionQueued: !1, promise: u, target: p, bindingPromise: l };p._then(e, s, void 0, u, h), l._then(a, c, void 0, u, h), u._setOnCancel(l);
          } else u._resolveCallback(p);return u;
        }, t.prototype._setBoundTo = function (t) {
          void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField;
        }, t.prototype._isBound = function () {
          return 2097152 === (2097152 & this._bitField);
        }, t.bind = function (e, n) {
          return t.resolve(n).bind(e);
        };
      };
    }, {}], 4: [function (t, e, n) {
      "use strict";
      function r() {
        try {
          _Promise === o && (Promise = i);
        } catch (t) {}return o;
      }var i;"undefined" != typeof _Promise && (i = _Promise);var o = t("./promise")();o.noConflict = r, e.exports = o;
    }, { "./promise": 22 }], 5: [function (t, e, n) {
      "use strict";
      var r = _Object$create;if (r) {
        var i = r(null),
            o = r(null);i[" size"] = o[" size"] = 0;
      }e.exports = function (e) {
        function n(t, n) {
          var r;if (null != t && (r = t[n]), "function" != typeof r) {
            var i = "Object " + a.classString(t) + " has no method '" + a.toString(n) + "'";throw new e.TypeError(i);
          }return r;
        }function r(t) {
          var e = this.pop(),
              r = n(t, e);return r.apply(t, this);
        }function i(t) {
          return t[this];
        }function o(t) {
          var e = +this;return 0 > e && (e = Math.max(0, e + t.length)), t[e];
        }var s,
            a = t("./util"),
            c = a.canEvaluate;a.isIdentifier;e.prototype.call = function (t) {
          var e = [].slice.call(arguments, 1);return e.push(t), this._then(r, void 0, void 0, e, void 0);
        }, e.prototype.get = function (t) {
          var e,
              n = "number" == typeof t;if (n) e = o;else if (c) {
            var r = s(t);e = null !== r ? r : i;
          } else e = i;return this._then(e, void 0, void 0, t, void 0);
        };
      };
    }, { "./util": 36 }], 6: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i) {
        var o = t("./util"),
            s = o.tryCatch,
            a = o.errorObj,
            c = e._async;e.prototype["break"] = e.prototype.cancel = function () {
          if (!i.cancellation()) return this._warn("cancellation is disabled");for (var t = this, e = t; t._isCancellable();) {
            if (!t._cancelBy(e)) {
              e._isFollowing() ? e._followee().cancel() : e._cancelBranched();break;
            }var n = t._cancellationParent;if (null == n || !n._isCancellable()) {
              t._isFollowing() ? t._followee().cancel() : t._cancelBranched();break;
            }t._isFollowing() && t._followee().cancel(), t._setWillBeCancelled(), e = t, t = n;
          }
        }, e.prototype._branchHasCancelled = function () {
          this._branchesRemainingToCancel--;
        }, e.prototype._enoughBranchesHaveCancelled = function () {
          return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
        }, e.prototype._cancelBy = function (t) {
          return t === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), !0) : (this._branchHasCancelled(), this._enoughBranchesHaveCancelled() ? (this._invokeOnCancel(), !0) : !1);
        }, e.prototype._cancelBranched = function () {
          this._enoughBranchesHaveCancelled() && this._cancel();
        }, e.prototype._cancel = function () {
          this._isCancellable() && (this._setCancelled(), c.invoke(this._cancelPromises, this, void 0));
        }, e.prototype._cancelPromises = function () {
          this._length() > 0 && this._settlePromises();
        }, e.prototype._unsetOnCancel = function () {
          this._onCancelField = void 0;
        }, e.prototype._isCancellable = function () {
          return this.isPending() && !this._isCancelled();
        }, e.prototype.isCancellable = function () {
          return this.isPending() && !this.isCancelled();
        }, e.prototype._doInvokeOnCancel = function (t, e) {
          if (o.isArray(t)) for (var n = 0; n < t.length; ++n) {
            this._doInvokeOnCancel(t[n], e);
          } else if (void 0 !== t) if ("function" == typeof t) {
            if (!e) {
              var r = s(t).call(this._boundValue());r === a && (this._attachExtraTrace(r.e), c.throwLater(r.e));
            }
          } else t._resultCancelled(this);
        }, e.prototype._invokeOnCancel = function () {
          var t = this._onCancel();this._unsetOnCancel(), c.invoke(this._doInvokeOnCancel, this, t);
        }, e.prototype._invokeInternalOnCancel = function () {
          this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
        }, e.prototype._resultCancelled = function () {
          this.cancel();
        };
      };
    }, { "./util": 36 }], 7: [function (t, e, n) {
      "use strict";
      e.exports = function (e) {
        function n(t, n, a) {
          return function (c) {
            var l = a._boundValue();t: for (var u = 0; u < t.length; ++u) {
              var p = t[u];if (p === Error || null != p && p.prototype instanceof Error) {
                if (c instanceof p) return o(n).call(l, c);
              } else if ("function" == typeof p) {
                var h = o(p).call(l, c);if (h === s) return h;if (h) return o(n).call(l, c);
              } else if (r.isObject(c)) {
                for (var f = i(p), _ = 0; _ < f.length; ++_) {
                  var d = f[_];if (p[d] != c[d]) continue t;
                }return o(n).call(l, c);
              }
            }return e;
          };
        }var r = t("./util"),
            i = t("./es5").keys,
            o = r.tryCatch,
            s = r.errorObj;return n;
      };
    }, { "./es5": 13, "./util": 36 }], 8: [function (t, e, n) {
      "use strict";
      e.exports = function (t) {
        function e() {
          this._trace = new e.CapturedTrace(r());
        }function n() {
          return i ? new e() : void 0;
        }function r() {
          var t = o.length - 1;return t >= 0 ? o[t] : void 0;
        }var i = !1,
            o = [];return t.prototype._promiseCreated = function () {}, t.prototype._pushContext = function () {}, t.prototype._popContext = function () {
          return null;
        }, t._peekContext = t.prototype._peekContext = function () {}, e.prototype._pushContext = function () {
          void 0 !== this._trace && (this._trace._promiseCreated = null, o.push(this._trace));
        }, e.prototype._popContext = function () {
          if (void 0 !== this._trace) {
            var t = o.pop(),
                e = t._promiseCreated;return t._promiseCreated = null, e;
          }return null;
        }, e.CapturedTrace = null, e.create = n, e.deactivateLongStackTraces = function () {}, e.activateLongStackTraces = function () {
          var n = t.prototype._pushContext,
              o = t.prototype._popContext,
              s = t._peekContext,
              a = t.prototype._peekContext,
              c = t.prototype._promiseCreated;e.deactivateLongStackTraces = function () {
            t.prototype._pushContext = n, t.prototype._popContext = o, t._peekContext = s, t.prototype._peekContext = a, t.prototype._promiseCreated = c, i = !1;
          }, i = !0, t.prototype._pushContext = e.prototype._pushContext, t.prototype._popContext = e.prototype._popContext, t._peekContext = t.prototype._peekContext = r, t.prototype._promiseCreated = function () {
            var t = this._peekContext();t && null == t._promiseCreated && (t._promiseCreated = this);
          };
        }, e;
      };
    }, {}], 9: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n) {
        function r(t, e) {
          return { promise: e };
        }function i() {
          return !1;
        }function o(t, e, n) {
          var r = this;try {
            t(e, n, function (t) {
              if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + H.toString(t));r._attachCancellationCallback(t);
            });
          } catch (i) {
            return i;
          }
        }function s(t) {
          if (!this._isCancellable()) return this;var e = this._onCancel();void 0 !== e ? H.isArray(e) ? e.push(t) : this._setOnCancel([e, t]) : this._setOnCancel(t);
        }function a() {
          return this._onCancelField;
        }function c(t) {
          this._onCancelField = t;
        }function l() {
          this._cancellationParent = void 0, this._onCancelField = void 0;
        }function u(t, e) {
          if (0 !== (1 & e)) {
            this._cancellationParent = t;var n = t._branchesRemainingToCancel;void 0 === n && (n = 0), t._branchesRemainingToCancel = n + 1;
          }0 !== (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
        }function p(t, e) {
          0 !== (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
        }function h() {
          var t = this._boundTo;return void 0 !== t && t instanceof e ? t.isFulfilled() ? t.value() : void 0 : t;
        }function f() {
          this._trace = new S(this._peekContext());
        }function _(t, e) {
          if (N(t)) {
            var n = this._trace;if (void 0 !== n && e && (n = n._parent), void 0 !== n) n.attachExtraTrace(t);else if (!t.__stackCleaned__) {
              var r = j(t);H.notEnumerableProp(t, "stack", r.message + "\n" + r.stack.join("\n")), H.notEnumerableProp(t, "__stackCleaned__", !0);
            }
          }
        }function d(t, e, n, r, i) {
          if (void 0 === t && null !== e && W) {
            if (void 0 !== i && i._returnedNonUndefined()) return;if (0 === (65535 & r._bitField)) return;n && (n += " ");var o = "",
                s = "";if (e._trace) {
              for (var a = e._trace.stack.split("\n"), c = w(a), l = c.length - 1; l >= 0; --l) {
                var u = c[l];if (!U.test(u)) {
                  var p = u.match(M);p && (o = "at " + p[1] + ":" + p[2] + ":" + p[3] + " ");break;
                }
              }if (c.length > 0) for (var h = c[0], l = 0; l < a.length; ++l) {
                if (a[l] === h) {
                  l > 0 && (s = "\n" + a[l - 1]);break;
                }
              }
            }var f = "a promise was created in a " + n + "handler " + o + "but was not returned from it, see http://goo.gl/rRqMUw" + s;r._warn(f, !0, e);
          }
        }function v(t, e) {
          var n = t + " is deprecated and will be removed in a future version.";return e && (n += " Use " + e + " instead."), y(n);
        }function y(t, n, r) {
          if (ot.warnings) {
            var i,
                o = new L(t);if (n) r._attachExtraTrace(o);else if (ot.longStackTraces && (i = e._peekContext())) i.attachExtraTrace(o);else {
              var s = j(o);o.stack = s.message + "\n" + s.stack.join("\n");
            }tt("warning", o) || E(o, "", !0);
          }
        }function m(t, e) {
          for (var n = 0; n < e.length - 1; ++n) {
            e[n].push("From previous event:"), e[n] = e[n].join("\n");
          }return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n");
        }function g(t) {
          for (var e = 0; e < t.length; ++e) {
            (0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), e--);
          }
        }function b(t) {
          for (var e = t[0], n = 1; n < t.length; ++n) {
            for (var r = t[n], i = e.length - 1, o = e[i], s = -1, a = r.length - 1; a >= 0; --a) {
              if (r[a] === o) {
                s = a;break;
              }
            }for (var a = s; a >= 0; --a) {
              var c = r[a];if (e[i] !== c) break;e.pop(), i--;
            }e = r;
          }
        }function w(t) {
          for (var e = [], n = 0; n < t.length; ++n) {
            var r = t[n],
                i = "    (No stack trace)" === r || q.test(r),
                o = i && nt(r);i && !o && ($ && " " !== r.charAt(0) && (r = "    " + r), e.push(r));
          }return e;
        }function C(t) {
          for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
            var r = e[n];if ("    (No stack trace)" === r || q.test(r)) break;
          }return n > 0 && "SyntaxError" != t.name && (e = e.slice(n)), e;
        }function j(t) {
          var e = t.stack,
              n = t.toString();return e = "string" == typeof e && e.length > 0 ? C(t) : ["    (No stack trace)"], { message: n, stack: "SyntaxError" == t.name ? e : w(e) };
        }function E(t, e, n) {
          if ("undefined" != typeof console) {
            var r;if (H.isObject(t)) {
              var i = t.stack;r = e + Q(i, t);
            } else r = e + String(t);"function" == typeof D ? D(r, n) : ("function" == typeof console.log || "object" == _typeof(console.log)) && console.log(r);
          }
        }function k(t, e, n, r) {
          var i = !1;try {
            "function" == typeof e && (i = !0, "rejectionHandled" === t ? e(r) : e(n, r));
          } catch (o) {
            I.throwLater(o);
          }"unhandledRejection" === t ? tt(t, n, r) || i || E(n, "Unhandled rejection ") : tt(t, r);
        }function F(t) {
          var e;if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]";else {
            e = t && "function" == typeof t.toString ? t.toString() : H.toString(t);var n = /\[object [a-zA-Z0-9$_]+\]/;if (n.test(e)) try {
              var r = _JSON$stringify(t);e = r;
            } catch (i) {}0 === e.length && (e = "(empty array)");
          }return "(<" + x(e) + ">, no stack trace)";
        }function x(t) {
          var e = 41;return t.length < e ? t : t.substr(0, e - 3) + "...";
        }function T() {
          return "function" == typeof it;
        }function P(t) {
          var e = t.match(rt);return e ? { fileName: e[1], line: parseInt(e[2], 10) } : void 0;
        }function R(t, e) {
          if (T()) {
            for (var n, r, i = t.stack.split("\n"), o = e.stack.split("\n"), s = -1, a = -1, c = 0; c < i.length; ++c) {
              var l = P(i[c]);if (l) {
                n = l.fileName, s = l.line;break;
              }
            }for (var c = 0; c < o.length; ++c) {
              var l = P(o[c]);if (l) {
                r = l.fileName, a = l.line;break;
              }
            }0 > s || 0 > a || !n || !r || n !== r || s >= a || (nt = function nt(t) {
              if (B.test(t)) return !0;var e = P(t);return e && e.fileName === n && s <= e.line && e.line <= a ? !0 : !1;
            });
          }
        }function S(t) {
          this._parent = t, this._promisesCreated = 0;var e = this._length = 1 + (void 0 === t ? 0 : t._length);it(this, S), e > 32 && this.uncycle();
        }var O,
            A,
            D,
            V = e._getDomain,
            I = e._async,
            L = t("./errors").Warning,
            H = t("./util"),
            N = H.canAttachTrace,
            B = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
            U = /\((?:timers\.js):\d+:\d+\)/,
            M = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,
            q = null,
            Q = null,
            $ = !1,
            G = !(0 == H.env("BLUEBIRD_DEBUG") || !H.env("BLUEBIRD_DEBUG") && "development" !== H.env("NODE_ENV")),
            z = !(0 == H.env("BLUEBIRD_WARNINGS") || !G && !H.env("BLUEBIRD_WARNINGS")),
            X = !(0 == H.env("BLUEBIRD_LONG_STACK_TRACES") || !G && !H.env("BLUEBIRD_LONG_STACK_TRACES")),
            W = 0 != H.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (z || !!H.env("BLUEBIRD_W_FORGOTTEN_RETURN"));e.prototype.suppressUnhandledRejections = function () {
          var t = this._target();t._bitField = -1048577 & t._bitField | 524288;
        }, e.prototype._ensurePossibleRejectionHandled = function () {
          0 === (524288 & this._bitField) && (this._setRejectionIsUnhandled(), I.invokeLater(this._notifyUnhandledRejection, this, void 0));
        }, e.prototype._notifyUnhandledRejectionIsHandled = function () {
          k("rejectionHandled", O, void 0, this);
        }, e.prototype._setReturnedNonUndefined = function () {
          this._bitField = 268435456 | this._bitField;
        }, e.prototype._returnedNonUndefined = function () {
          return 0 !== (268435456 & this._bitField);
        }, e.prototype._notifyUnhandledRejection = function () {
          if (this._isRejectionUnhandled()) {
            var t = this._settledValue();this._setUnhandledRejectionIsNotified(), k("unhandledRejection", A, t, this);
          }
        }, e.prototype._setUnhandledRejectionIsNotified = function () {
          this._bitField = 262144 | this._bitField;
        }, e.prototype._unsetUnhandledRejectionIsNotified = function () {
          this._bitField = -262145 & this._bitField;
        }, e.prototype._isUnhandledRejectionNotified = function () {
          return (262144 & this._bitField) > 0;
        }, e.prototype._setRejectionIsUnhandled = function () {
          this._bitField = 1048576 | this._bitField;
        }, e.prototype._unsetRejectionIsUnhandled = function () {
          this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled());
        }, e.prototype._isRejectionUnhandled = function () {
          return (1048576 & this._bitField) > 0;
        }, e.prototype._warn = function (t, e, n) {
          return y(t, e, n || this);
        }, e.onPossiblyUnhandledRejection = function (t) {
          var e = V();A = "function" == typeof t ? null === e ? t : H.domainBind(e, t) : void 0;
        }, e.onUnhandledRejectionHandled = function (t) {
          var e = V();O = "function" == typeof t ? null === e ? t : H.domainBind(e, t) : void 0;
        };var K = function K() {};e.longStackTraces = function () {
          if (I.haveItemsQueued() && !ot.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");if (!ot.longStackTraces && T()) {
            var t = e.prototype._captureStackTrace,
                r = e.prototype._attachExtraTrace;ot.longStackTraces = !0, K = function K() {
              if (I.haveItemsQueued() && !ot.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");e.prototype._captureStackTrace = t, e.prototype._attachExtraTrace = r, n.deactivateLongStackTraces(), I.enableTrampoline(), ot.longStackTraces = !1;
            }, e.prototype._captureStackTrace = f, e.prototype._attachExtraTrace = _, n.activateLongStackTraces(), I.disableTrampolineIfNecessary();
          }
        }, e.hasLongStackTraces = function () {
          return ot.longStackTraces && T();
        };var J = function () {
          try {
            if ("function" == typeof CustomEvent) {
              var t = new CustomEvent("CustomEvent");return H.global.dispatchEvent(t), function (t, e) {
                var n = new CustomEvent(t.toLowerCase(), { detail: e, cancelable: !0 });return !H.global.dispatchEvent(n);
              };
            }if ("function" == typeof Event) {
              var t = new Event("CustomEvent");return H.global.dispatchEvent(t), function (t, e) {
                var n = new Event(t.toLowerCase(), { cancelable: !0 });return n.detail = e, !H.global.dispatchEvent(n);
              };
            }var t = document.createEvent("CustomEvent");return t.initCustomEvent("testingtheevent", !1, !0, {}), H.global.dispatchEvent(t), function (t, e) {
              var n = document.createEvent("CustomEvent");return n.initCustomEvent(t.toLowerCase(), !1, !0, e), !H.global.dispatchEvent(n);
            };
          } catch (e) {}return function () {
            return !1;
          };
        }(),
            Y = function () {
          return H.isNode ? function () {
            return process.emit.apply(process, arguments);
          } : H.global ? function (t) {
            var e = "on" + t.toLowerCase(),
                n = H.global[e];return n ? (n.apply(H.global, [].slice.call(arguments, 1)), !0) : !1;
          } : function () {
            return !1;
          };
        }(),
            Z = { promiseCreated: r, promiseFulfilled: r, promiseRejected: r, promiseResolved: r, promiseCancelled: r, promiseChained: function promiseChained(t, e, n) {
            return { promise: e, child: n };
          }, warning: function warning(t, e) {
            return { warning: e };
          }, unhandledRejection: function unhandledRejection(t, e, n) {
            return { reason: e, promise: n };
          }, rejectionHandled: r },
            tt = function tt(t) {
          var e = !1;try {
            e = Y.apply(null, arguments);
          } catch (n) {
            I.throwLater(n), e = !0;
          }var r = !1;try {
            r = J(t, Z[t].apply(null, arguments));
          } catch (n) {
            I.throwLater(n), r = !0;
          }return r || e;
        };e.config = function (t) {
          if (t = Object(t), "longStackTraces" in t && (t.longStackTraces ? e.longStackTraces() : !t.longStackTraces && e.hasLongStackTraces() && K()), "warnings" in t) {
            var n = t.warnings;ot.warnings = !!n, W = ot.warnings, H.isObject(n) && "wForgottenReturn" in n && (W = !!n.wForgottenReturn);
          }if ("cancellation" in t && t.cancellation && !ot.cancellation) {
            if (I.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");e.prototype._clearCancellationData = l, e.prototype._propagateFrom = u, e.prototype._onCancel = a, e.prototype._setOnCancel = c, e.prototype._attachCancellationCallback = s, e.prototype._execute = o, et = u, ot.cancellation = !0;
          }return "monitoring" in t && (t.monitoring && !ot.monitoring ? (ot.monitoring = !0, e.prototype._fireEvent = tt) : !t.monitoring && ot.monitoring && (ot.monitoring = !1, e.prototype._fireEvent = i)), e;
        }, e.prototype._fireEvent = i, e.prototype._execute = function (t, e, n) {
          try {
            t(e, n);
          } catch (r) {
            return r;
          }
        }, e.prototype._onCancel = function () {}, e.prototype._setOnCancel = function (t) {}, e.prototype._attachCancellationCallback = function (t) {}, e.prototype._captureStackTrace = function () {}, e.prototype._attachExtraTrace = function () {}, e.prototype._clearCancellationData = function () {}, e.prototype._propagateFrom = function (t, e) {};var et = p,
            nt = function nt() {
          return !1;
        },
            rt = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;H.inherits(S, Error), n.CapturedTrace = S, S.prototype.uncycle = function () {
          var t = this._length;if (!(2 > t)) {
            for (var e = [], n = {}, r = 0, i = this; void 0 !== i; ++r) {
              e.push(i), i = i._parent;
            }t = this._length = r;for (var r = t - 1; r >= 0; --r) {
              var o = e[r].stack;void 0 === n[o] && (n[o] = r);
            }for (var r = 0; t > r; ++r) {
              var s = e[r].stack,
                  a = n[s];if (void 0 !== a && a !== r) {
                a > 0 && (e[a - 1]._parent = void 0, e[a - 1]._length = 1), e[r]._parent = void 0, e[r]._length = 1;var c = r > 0 ? e[r - 1] : this;t - 1 > a ? (c._parent = e[a + 1], c._parent.uncycle(), c._length = c._parent._length + 1) : (c._parent = void 0, c._length = 1);for (var l = c._length + 1, u = r - 2; u >= 0; --u) {
                  e[u]._length = l, l++;
                }return;
              }
            }
          }
        }, S.prototype.attachExtraTrace = function (t) {
          if (!t.__stackCleaned__) {
            this.uncycle();for (var e = j(t), n = e.message, r = [e.stack], i = this; void 0 !== i;) {
              r.push(w(i.stack.split("\n"))), i = i._parent;
            }b(r), g(r), H.notEnumerableProp(t, "stack", m(n, r)), H.notEnumerableProp(t, "__stackCleaned__", !0);
          }
        };var it = function () {
          var t = /^\s*at\s*/,
              e = function e(t, _e) {
            return "string" == typeof t ? t : void 0 !== _e.name && void 0 !== _e.message ? _e.toString() : F(_e);
          };if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
            Error.stackTraceLimit += 6, q = t, Q = e;var n = Error.captureStackTrace;return nt = function nt(t) {
              return B.test(t);
            }, function (t, e) {
              Error.stackTraceLimit += 6, n(t, e), Error.stackTraceLimit -= 6;
            };
          }var r = new Error();if ("string" == typeof r.stack && r.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return q = /@/, Q = e, $ = !0, function (t) {
            t.stack = new Error().stack;
          };var i;try {
            throw new Error();
          } catch (o) {
            i = "stack" in o;
          }return "stack" in r || !i || "number" != typeof Error.stackTraceLimit ? (Q = function Q(t, e) {
            return "string" == typeof t ? t : "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e || void 0 === e.name || void 0 === e.message ? F(e) : e.toString();
          }, null) : (q = t, Q = e, function (t) {
            Error.stackTraceLimit += 6;try {
              throw new Error();
            } catch (e) {
              t.stack = e.stack;
            }Error.stackTraceLimit -= 6;
          });
        }([]);"undefined" != typeof console && "undefined" != typeof console.warn && (D = function D(t) {
          console.warn(t);
        }, H.isNode && process.stderr.isTTY ? D = function D(t, e) {
          var n = e ? "[33m" : "[31m";console.warn(n + t + "[0m\n");
        } : H.isNode || "string" != typeof new Error().stack || (D = function D(t, e) {
          console.warn("%c" + t, e ? "color: darkorange" : "color: red");
        }));var ot = { warnings: z, longStackTraces: !1, cancellation: !1, monitoring: !1 };return X && e.longStackTraces(), { longStackTraces: function longStackTraces() {
            return ot.longStackTraces;
          }, warnings: function warnings() {
            return ot.warnings;
          }, cancellation: function cancellation() {
            return ot.cancellation;
          }, monitoring: function monitoring() {
            return ot.monitoring;
          }, propagateFromFunction: function propagateFromFunction() {
            return et;
          }, boundValueFunction: function boundValueFunction() {
            return h;
          }, checkForgottenReturns: d, setBounds: R, warn: y, deprecated: v, CapturedTrace: S, fireDomEvent: J, fireGlobalEvent: Y };
      };
    }, { "./errors": 12, "./util": 36 }], 10: [function (t, e, n) {
      "use strict";
      e.exports = function (t) {
        function e() {
          return this.value;
        }function n() {
          throw this.reason;
        }t.prototype["return"] = t.prototype.thenReturn = function (n) {
          return n instanceof t && n.suppressUnhandledRejections(), this._then(e, void 0, void 0, { value: n }, void 0);
        }, t.prototype["throw"] = t.prototype.thenThrow = function (t) {
          return this._then(n, void 0, void 0, { reason: t }, void 0);
        }, t.prototype.catchThrow = function (t) {
          if (arguments.length <= 1) return this._then(void 0, n, void 0, { reason: t }, void 0);var e = arguments[1],
              r = function r() {
            throw e;
          };return this.caught(t, r);
        }, t.prototype.catchReturn = function (n) {
          if (arguments.length <= 1) return n instanceof t && n.suppressUnhandledRejections(), this._then(void 0, e, void 0, { value: n }, void 0);var r = arguments[1];r instanceof t && r.suppressUnhandledRejections();var i = function i() {
            return r;
          };return this.caught(n, i);
        };
      };
    }, {}], 11: [function (t, e, n) {
      "use strict";
      e.exports = function (t, e) {
        function n() {
          return o(this);
        }function r(t, n) {
          return i(t, n, e, e);
        }var i = t.reduce,
            o = t.all;t.prototype.each = function (t) {
          return i(this, t, e, 0)._then(n, void 0, void 0, this, void 0);
        }, t.prototype.mapSeries = function (t) {
          return i(this, t, e, e);
        }, t.each = function (t, r) {
          return i(t, r, e, 0)._then(n, void 0, void 0, t, void 0);
        }, t.mapSeries = r;
      };
    }, {}], 12: [function (t, e, n) {
      "use strict";
      function r(t, e) {
        function n(r) {
          return this instanceof n ? (p(this, "message", "string" == typeof r ? r : e), p(this, "name", t), void (Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this))) : new n(r);
        }return u(n, Error), n;
      }function i(t) {
        return this instanceof i ? (p(this, "name", "OperationalError"), p(this, "message", t), this.cause = t, this.isOperational = !0, void (t instanceof Error ? (p(this, "message", t.message), p(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor))) : new i(t);
      }var o,
          s,
          a = t("./es5"),
          c = a.freeze,
          l = t("./util"),
          u = l.inherits,
          p = l.notEnumerableProp,
          h = r("Warning", "warning"),
          f = r("CancellationError", "cancellation error"),
          _ = r("TimeoutError", "timeout error"),
          d = r("AggregateError", "aggregate error");try {
        o = TypeError, s = RangeError;
      } catch (v) {
        o = r("TypeError", "type error"), s = r("RangeError", "range error");
      }for (var y = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), m = 0; m < y.length; ++m) {
        "function" == typeof Array.prototype[y[m]] && (d.prototype[y[m]] = Array.prototype[y[m]]);
      }a.defineProperty(d.prototype, "length", { value: 0, configurable: !1, writable: !0, enumerable: !0 }), d.prototype.isOperational = !0;var g = 0;d.prototype.toString = function () {
        var t = Array(4 * g + 1).join(" "),
            e = "\n" + t + "AggregateError of:\n";g++, t = Array(4 * g + 1).join(" ");for (var n = 0; n < this.length; ++n) {
          for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", i = r.split("\n"), o = 0; o < i.length; ++o) {
            i[o] = t + i[o];
          }r = i.join("\n"), e += r + "\n";
        }return g--, e;
      }, u(i, Error);var b = Error.__BluebirdErrorTypes__;b || (b = c({ CancellationError: f, TimeoutError: _, OperationalError: i, RejectionError: i, AggregateError: d }), a.defineProperty(Error, "__BluebirdErrorTypes__", { value: b, writable: !1, enumerable: !1, configurable: !1 })), e.exports = { Error: Error, TypeError: o, RangeError: s, CancellationError: b.CancellationError, OperationalError: b.OperationalError, TimeoutError: b.TimeoutError, AggregateError: b.AggregateError, Warning: h };
    }, { "./es5": 13, "./util": 36 }], 13: [function (t, e, n) {
      var r = function () {
        "use strict";
        return void 0 === this;
      }();if (r) e.exports = { freeze: _Object$freeze, defineProperty: _Object$defineProperty, getDescriptor: _Object$getOwnPropertyDescriptor, keys: _Object$keys, names: _Object$getOwnPropertyNames, getPrototypeOf: _Object$getPrototypeOf, isArray: Array.isArray, isES5: r, propertyIsWritable: function propertyIsWritable(t, e) {
          var n = _Object$getOwnPropertyDescriptor(t, e);return !(n && !n.writable && !n.set);
        } };else {
        var i = {}.hasOwnProperty,
            o = {}.toString,
            s = {}.constructor.prototype,
            a = function a(t) {
          var e = [];for (var n in t) {
            i.call(t, n) && e.push(n);
          }return e;
        },
            c = function c(t, e) {
          return { value: t[e] };
        },
            l = function l(t, e, n) {
          return t[e] = n.value, t;
        },
            u = function u(t) {
          return t;
        },
            p = function p(t) {
          try {
            return Object(t).constructor.prototype;
          } catch (e) {
            return s;
          }
        },
            h = function h(t) {
          try {
            return "[object Array]" === o.call(t);
          } catch (e) {
            return !1;
          }
        };e.exports = { isArray: h, keys: a, names: a, defineProperty: l, getDescriptor: c, freeze: u, getPrototypeOf: p, isES5: r, propertyIsWritable: function propertyIsWritable() {
            return !0;
          } };
      }
    }, {}], 14: [function (t, e, n) {
      "use strict";
      e.exports = function (t, e) {
        var n = t.map;t.prototype.filter = function (t, r) {
          return n(this, t, r, e);
        }, t.filter = function (t, r, i) {
          return n(t, r, i, e);
        };
      };
    }, {}], 15: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r) {
        function i(t, e, n) {
          this.promise = t, this.type = e, this.handler = n, this.called = !1, this.cancelPromise = null;
        }function o(t) {
          this.finallyHandler = t;
        }function s(t, e) {
          return null != t.cancelPromise ? (arguments.length > 1 ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), t.cancelPromise = null, !0) : !1;
        }function a() {
          return l.call(this, this.promise._target()._settledValue());
        }function c(t) {
          return s(this, t) ? void 0 : (h.e = t, h);
        }function l(t) {
          var i = this.promise,
              l = this.handler;if (!this.called) {
            this.called = !0;var u = this.isFinallyHandler() ? l.call(i._boundValue()) : l.call(i._boundValue(), t);if (u === r) return u;if (void 0 !== u) {
              i._setReturnedNonUndefined();var f = n(u, i);if (f instanceof e) {
                if (null != this.cancelPromise) {
                  if (f._isCancelled()) {
                    var _ = new p("late cancellation observer");return i._attachExtraTrace(_), h.e = _, h;
                  }f.isPending() && f._attachCancellationCallback(new o(this));
                }return f._then(a, c, void 0, this, void 0);
              }
            }
          }return i.isRejected() ? (s(this), h.e = t, h) : (s(this), t);
        }var u = t("./util"),
            p = e.CancellationError,
            h = u.errorObj,
            f = t("./catch_filter")(r);return i.prototype.isFinallyHandler = function () {
          return 0 === this.type;
        }, o.prototype._resultCancelled = function () {
          s(this.finallyHandler);
        }, e.prototype._passThrough = function (t, e, n, r) {
          return "function" != typeof t ? this.then() : this._then(n, r, void 0, new i(this, e, t), void 0);
        }, e.prototype.lastly = e.prototype["finally"] = function (t) {
          return this._passThrough(t, 0, l, l);
        }, e.prototype.tap = function (t) {
          return this._passThrough(t, 1, l);
        }, e.prototype.tapCatch = function (t) {
          var n = arguments.length;if (1 === n) return this._passThrough(t, 1, void 0, l);var r,
              i = new Array(n - 1),
              o = 0;for (r = 0; n - 1 > r; ++r) {
            var s = arguments[r];if (!u.isObject(s)) return e.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + u.classString(s)));i[o++] = s;
          }i.length = o;var a = arguments[r];return this._passThrough(f(i, a, this), 1, void 0, l);
        }, i;
      };
    }, { "./catch_filter": 7, "./util": 36 }], 16: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i, o, s) {
        function a(t, n, r) {
          for (var o = 0; o < n.length; ++o) {
            r._pushContext();var s = f(n[o])(t);if (r._popContext(), s === h) {
              r._pushContext();var a = e.reject(h.e);return r._popContext(), a;
            }var c = i(s, r);if (c instanceof e) return c;
          }return null;
        }function c(t, n, i, o) {
          if (s.cancellation()) {
            var a = new e(r),
                c = this._finallyPromise = new e(r);this._promise = a.lastly(function () {
              return c;
            }), a._captureStackTrace(), a._setOnCancel(this);
          } else {
            var l = this._promise = new e(r);l._captureStackTrace();
          }this._stack = o, this._generatorFunction = t, this._receiver = n, this._generator = void 0, this._yieldHandlers = "function" == typeof i ? [i].concat(_) : _, this._yieldedPromise = null, this._cancellationPhase = !1;
        }var l = t("./errors"),
            u = l.TypeError,
            p = t("./util"),
            h = p.errorObj,
            f = p.tryCatch,
            _ = [];p.inherits(c, o), c.prototype._isResolved = function () {
          return null === this._promise;
        }, c.prototype._cleanup = function () {
          this._promise = this._generator = null, s.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), this._finallyPromise = null);
        }, c.prototype._promiseCancelled = function () {
          if (!this._isResolved()) {
            var t,
                n = "undefined" != typeof this._generator["return"];if (n) this._promise._pushContext(), t = f(this._generator["return"]).call(this._generator, void 0), this._promise._popContext();else {
              var r = new e.CancellationError("generator .return() sentinel");e.coroutine.returnSentinel = r, this._promise._attachExtraTrace(r), this._promise._pushContext(), t = f(this._generator["throw"]).call(this._generator, r), this._promise._popContext();
            }this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(t);
          }
        }, c.prototype._promiseFulfilled = function (t) {
          this._yieldedPromise = null, this._promise._pushContext();var e = f(this._generator.next).call(this._generator, t);this._promise._popContext(), this._continue(e);
        }, c.prototype._promiseRejected = function (t) {
          this._yieldedPromise = null, this._promise._attachExtraTrace(t), this._promise._pushContext();var e = f(this._generator["throw"]).call(this._generator, t);this._promise._popContext(), this._continue(e);
        }, c.prototype._resultCancelled = function () {
          if (this._yieldedPromise instanceof e) {
            var t = this._yieldedPromise;this._yieldedPromise = null, t.cancel();
          }
        }, c.prototype.promise = function () {
          return this._promise;
        }, c.prototype._run = function () {
          this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0);
        }, c.prototype._continue = function (t) {
          var n = this._promise;if (t === h) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._rejectCallback(t.e, !1);var r = t.value;if (t.done === !0) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._resolveCallback(r);var o = i(r, this._promise);if (!(o instanceof e) && (o = a(o, this._yieldHandlers, this._promise), null === o)) return void this._promiseRejected(new u("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(r)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));o = o._target();var s = o._bitField;0 === (50397184 & s) ? (this._yieldedPromise = o, o._proxy(this, null)) : 0 !== (33554432 & s) ? e._async.invoke(this._promiseFulfilled, this, o._value()) : 0 !== (16777216 & s) ? e._async.invoke(this._promiseRejected, this, o._reason()) : this._promiseCancelled();
        }, e.coroutine = function (t, e) {
          if ("function" != typeof t) throw new u("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var n = Object(e).yieldHandler,
              r = c,
              i = new Error().stack;return function () {
            var e = t.apply(this, arguments),
                o = new r(void 0, void 0, n, i),
                s = o.promise();return o._generator = e, o._promiseFulfilled(void 0), s;
          };
        }, e.coroutine.addYieldHandler = function (t) {
          if ("function" != typeof t) throw new u("expecting a function but got " + p.classString(t));_.push(t);
        }, e.spawn = function (t) {
          if (s.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t) return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var r = new c(t, this),
              i = r.promise();return r._run(e.spawn), i;
        };
      };
    }, { "./errors": 12, "./util": 36 }], 17: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i, o, s) {
        var a = t("./util");a.canEvaluate, a.tryCatch, a.errorObj;e.join = function () {
          var t,
              e = arguments.length - 1;if (e > 0 && "function" == typeof arguments[e]) {
            t = arguments[e];var r;
          }var i = [].slice.call(arguments);t && i.pop();var r = new n(i).promise();return void 0 !== t ? r.spread(t) : r;
        };
      };
    }, { "./util": 36 }], 18: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i, o, s) {
        function a(t, e, n, r) {
          this.constructor$(t), this._promise._captureStackTrace();var i = l();this._callback = null === i ? e : u.domainBind(i, e), this._preservedValues = r === o ? new Array(this.length()) : null, this._limit = n, this._inFlight = 0, this._queue = [], f.invoke(this._asyncInit, this, void 0);
        }function c(t, n, i, o) {
          if ("function" != typeof n) return r("expecting a function but got " + u.classString(n));var s = 0;if (void 0 !== i) {
            if ("object" != (typeof i === "undefined" ? "undefined" : _typeof(i)) || null === i) return e.reject(new TypeError("options argument must be an object but it is " + u.classString(i)));if ("number" != typeof i.concurrency) return e.reject(new TypeError("'concurrency' must be a number but it is " + u.classString(i.concurrency)));s = i.concurrency;
          }return s = "number" == typeof s && isFinite(s) && s >= 1 ? s : 0, new a(t, n, s, o).promise();
        }var l = e._getDomain,
            u = t("./util"),
            p = u.tryCatch,
            h = u.errorObj,
            f = e._async;u.inherits(a, n), a.prototype._asyncInit = function () {
          this._init$(void 0, -2);
        }, a.prototype._init = function () {}, a.prototype._promiseFulfilled = function (t, n) {
          var r = this._values,
              o = this.length(),
              a = this._preservedValues,
              c = this._limit;if (0 > n) {
            if (n = -1 * n - 1, r[n] = t, c >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return !0;
          } else {
            if (c >= 1 && this._inFlight >= c) return r[n] = t, this._queue.push(n), !1;null !== a && (a[n] = t);var l = this._promise,
                u = this._callback,
                f = l._boundValue();l._pushContext();var _ = p(u).call(f, t, n, o),
                d = l._popContext();if (s.checkForgottenReturns(_, d, null !== a ? "Promise.filter" : "Promise.map", l), _ === h) return this._reject(_.e), !0;var v = i(_, this._promise);if (v instanceof e) {
              v = v._target();var y = v._bitField;if (0 === (50397184 & y)) return c >= 1 && this._inFlight++, r[n] = v, v._proxy(this, -1 * (n + 1)), !1;if (0 === (33554432 & y)) return 0 !== (16777216 & y) ? (this._reject(v._reason()), !0) : (this._cancel(), !0);_ = v._value();
            }r[n] = _;
          }var m = ++this._totalResolved;return m >= o ? (null !== a ? this._filter(r, a) : this._resolve(r), !0) : !1;
        }, a.prototype._drainQueue = function () {
          for (var t = this._queue, e = this._limit, n = this._values; t.length > 0 && this._inFlight < e;) {
            if (this._isResolved()) return;var r = t.pop();this._promiseFulfilled(n[r], r);
          }
        }, a.prototype._filter = function (t, e) {
          for (var n = e.length, r = new Array(n), i = 0, o = 0; n > o; ++o) {
            t[o] && (r[i++] = e[o]);
          }r.length = i, this._resolve(r);
        }, a.prototype.preservedValues = function () {
          return this._preservedValues;
        }, e.prototype.map = function (t, e) {
          return c(this, t, e, null);
        }, e.map = function (t, e, n, r) {
          return c(t, e, n, r);
        };
      };
    }, { "./util": 36 }], 19: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i, o) {
        var s = t("./util"),
            a = s.tryCatch;e.method = function (t) {
          if ("function" != typeof t) throw new e.TypeError("expecting a function but got " + s.classString(t));return function () {
            var r = new e(n);r._captureStackTrace(), r._pushContext();var i = a(t).apply(this, arguments),
                s = r._popContext();return o.checkForgottenReturns(i, s, "Promise.method", r), r._resolveFromSyncValue(i), r;
          };
        }, e.attempt = e["try"] = function (t) {
          if ("function" != typeof t) return i("expecting a function but got " + s.classString(t));var r = new e(n);r._captureStackTrace(), r._pushContext();var c;if (arguments.length > 1) {
            o.deprecated("calling Promise.try with more than 1 argument");var l = arguments[1],
                u = arguments[2];c = s.isArray(l) ? a(t).apply(u, l) : a(t).call(u, l);
          } else c = a(t)();var p = r._popContext();return o.checkForgottenReturns(c, p, "Promise.try", r), r._resolveFromSyncValue(c), r;
        }, e.prototype._resolveFromSyncValue = function (t) {
          t === s.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0);
        };
      };
    }, { "./util": 36 }], 20: [function (t, e, n) {
      "use strict";
      function r(t) {
        return t instanceof Error && u.getPrototypeOf(t) === Error.prototype;
      }function i(t) {
        var e;if (r(t)) {
          e = new l(t), e.name = t.name, e.message = t.message, e.stack = t.stack;for (var n = u.keys(t), i = 0; i < n.length; ++i) {
            var o = n[i];p.test(o) || (e[o] = t[o]);
          }return e;
        }return s.markAsOriginatingFromRejection(t), t;
      }function o(t, e) {
        return function (n, r) {
          if (null !== t) {
            if (n) {
              var o = i(a(n));t._attachExtraTrace(o), t._reject(o);
            } else if (e) {
              var s = [].slice.call(arguments, 1);t._fulfill(s);
            } else t._fulfill(r);t = null;
          }
        };
      }var s = t("./util"),
          a = s.maybeWrapAsError,
          c = t("./errors"),
          l = c.OperationalError,
          u = t("./es5"),
          p = /^(?:name|message|stack|cause)$/;e.exports = o;
    }, { "./errors": 12, "./es5": 13, "./util": 36 }], 21: [function (t, e, n) {
      "use strict";
      e.exports = function (e) {
        function n(t, e) {
          var n = this;if (!o.isArray(t)) return r.call(n, t, e);var i = a(e).apply(n._boundValue(), [null].concat(t));i === c && s.throwLater(i.e);
        }function r(t, e) {
          var n = this,
              r = n._boundValue(),
              i = void 0 === t ? a(e).call(r, null) : a(e).call(r, null, t);i === c && s.throwLater(i.e);
        }function i(t, e) {
          var n = this;if (!t) {
            var r = new Error(t + "");r.cause = t, t = r;
          }var i = a(e).call(n._boundValue(), t);i === c && s.throwLater(i.e);
        }var o = t("./util"),
            s = e._async,
            a = o.tryCatch,
            c = o.errorObj;e.prototype.asCallback = e.prototype.nodeify = function (t, e) {
          if ("function" == typeof t) {
            var o = r;void 0 !== e && Object(e).spread && (o = n), this._then(o, i, void 0, this, t);
          }return this;
        };
      };
    }, { "./util": 36 }], 22: [function (t, e, n) {
      "use strict";
      e.exports = function () {
        function n() {}function r(t, e) {
          if (null == t || t.constructor !== i) throw new m("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");if ("function" != typeof e) throw new m("expecting a function but got " + f.classString(e));
        }function i(t) {
          t !== b && r(this, t), this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, this._resolveFromExecutor(t), this._promiseCreated(), this._fireEvent("promiseCreated", this);
        }function o(t) {
          this.promise._resolveCallback(t);
        }function s(t) {
          this.promise._rejectCallback(t, !1);
        }function a(t) {
          var e = new i(b);e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._promise0 = t, e._receiver0 = t;
        }var c,
            l = function l() {
          return new m("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
        },
            u = function u() {
          return new i.PromiseInspection(this._target());
        },
            p = function p(t) {
          return i.reject(new m(t));
        },
            h = {},
            f = t("./util");c = f.isNode ? function () {
          var t = process.domain;return void 0 === t && (t = null), t;
        } : function () {
          return null;
        }, f.notEnumerableProp(i, "_getDomain", c);var _ = t("./es5"),
            d = t("./async"),
            v = new d();_.defineProperty(i, "_async", { value: v });var y = t("./errors"),
            m = i.TypeError = y.TypeError;i.RangeError = y.RangeError;var g = i.CancellationError = y.CancellationError;i.TimeoutError = y.TimeoutError, i.OperationalError = y.OperationalError, i.RejectionError = y.OperationalError, i.AggregateError = y.AggregateError;var b = function b() {},
            w = {},
            C = {},
            j = t("./thenables")(i, b),
            E = t("./promise_array")(i, b, j, p, n),
            k = t("./context")(i),
            F = k.create,
            x = t("./debuggability")(i, k),
            T = (x.CapturedTrace, t("./finally")(i, j, C)),
            P = t("./catch_filter")(C),
            R = t("./nodeback"),
            S = f.errorObj,
            O = f.tryCatch;return i.prototype.toString = function () {
          return "[object Promise]";
        }, i.prototype.caught = i.prototype["catch"] = function (t) {
          var e = arguments.length;if (e > 1) {
            var n,
                r = new Array(e - 1),
                i = 0;for (n = 0; e - 1 > n; ++n) {
              var o = arguments[n];if (!f.isObject(o)) return p("Catch statement predicate: expecting an object but got " + f.classString(o));r[i++] = o;
            }return r.length = i, t = arguments[n], this.then(void 0, P(r, t, this));
          }return this.then(void 0, t);
        }, i.prototype.reflect = function () {
          return this._then(u, u, void 0, this, void 0);
        }, i.prototype.then = function (t, e) {
          if (x.warnings() && arguments.length > 0 && "function" != typeof t && "function" != typeof e) {
            var n = ".then() only accepts functions but was passed: " + f.classString(t);arguments.length > 1 && (n += ", " + f.classString(e)), this._warn(n);
          }return this._then(t, e, void 0, void 0, void 0);
        }, i.prototype.done = function (t, e) {
          var n = this._then(t, e, void 0, void 0, void 0);n._setIsFinal();
        }, i.prototype.spread = function (t) {
          return "function" != typeof t ? p("expecting a function but got " + f.classString(t)) : this.all()._then(t, void 0, void 0, w, void 0);
        }, i.prototype.toJSON = function () {
          var t = { isFulfilled: !1, isRejected: !1, fulfillmentValue: void 0, rejectionReason: void 0 };return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), t.isRejected = !0), t;
        }, i.prototype.all = function () {
          return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new E(this).promise();
        }, i.prototype.error = function (t) {
          return this.caught(f.originatesFromRejection, t);
        }, i.getNewLibraryCopy = e.exports, i.is = function (t) {
          return t instanceof i;
        }, i.fromNode = i.fromCallback = function (t) {
          var e = new i(b);e._captureStackTrace();var n = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : !1,
              r = O(t)(R(e, n));return r === S && e._rejectCallback(r.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), e;
        }, i.all = function (t) {
          return new E(t).promise();
        }, i.cast = function (t) {
          var e = j(t);return e instanceof i || (e = new i(b), e._captureStackTrace(), e._setFulfilled(), e._rejectionHandler0 = t), e;
        }, i.resolve = i.fulfilled = i.cast, i.reject = i.rejected = function (t) {
          var e = new i(b);return e._captureStackTrace(), e._rejectCallback(t, !0), e;
        }, i.setScheduler = function (t) {
          if ("function" != typeof t) throw new m("expecting a function but got " + f.classString(t));return v.setScheduler(t);
        }, i.prototype._then = function (t, e, n, r, o) {
          var s = void 0 !== o,
              a = s ? o : new i(b),
              l = this._target(),
              u = l._bitField;s || (a._propagateFrom(this, 3), a._captureStackTrace(), void 0 === r && 0 !== (2097152 & this._bitField) && (r = 0 !== (50397184 & u) ? this._boundValue() : l === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, a));var p = c();if (0 !== (50397184 & u)) {
            var h,
                _,
                d = l._settlePromiseCtx;0 !== (33554432 & u) ? (_ = l._rejectionHandler0, h = t) : 0 !== (16777216 & u) ? (_ = l._fulfillmentHandler0, h = e, l._unsetRejectionIsUnhandled()) : (d = l._settlePromiseLateCancellationObserver, _ = new g("late cancellation observer"), l._attachExtraTrace(_), h = e), v.invoke(d, l, { handler: null === p ? h : "function" == typeof h && f.domainBind(p, h), promise: a, receiver: r, value: _ });
          } else l._addCallbacks(t, e, a, r, p);return a;
        }, i.prototype._length = function () {
          return 65535 & this._bitField;
        }, i.prototype._isFateSealed = function () {
          return 0 !== (117506048 & this._bitField);
        }, i.prototype._isFollowing = function () {
          return 67108864 === (67108864 & this._bitField);
        }, i.prototype._setLength = function (t) {
          this._bitField = -65536 & this._bitField | 65535 & t;
        }, i.prototype._setFulfilled = function () {
          this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this);
        }, i.prototype._setRejected = function () {
          this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this);
        }, i.prototype._setFollowing = function () {
          this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this);
        }, i.prototype._setIsFinal = function () {
          this._bitField = 4194304 | this._bitField;
        }, i.prototype._isFinal = function () {
          return (4194304 & this._bitField) > 0;
        }, i.prototype._unsetCancelled = function () {
          this._bitField = -65537 & this._bitField;
        }, i.prototype._setCancelled = function () {
          this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this);
        }, i.prototype._setWillBeCancelled = function () {
          this._bitField = 8388608 | this._bitField;
        }, i.prototype._setAsyncGuaranteed = function () {
          v.hasCustomScheduler() || (this._bitField = 134217728 | this._bitField);
        }, i.prototype._receiverAt = function (t) {
          var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];return e === h ? void 0 : void 0 === e && this._isBound() ? this._boundValue() : e;
        }, i.prototype._promiseAt = function (t) {
          return this[4 * t - 4 + 2];
        }, i.prototype._fulfillmentHandlerAt = function (t) {
          return this[4 * t - 4 + 0];
        }, i.prototype._rejectionHandlerAt = function (t) {
          return this[4 * t - 4 + 1];
        }, i.prototype._boundValue = function () {}, i.prototype._migrateCallback0 = function (t) {
          var e = (t._bitField, t._fulfillmentHandler0),
              n = t._rejectionHandler0,
              r = t._promise0,
              i = t._receiverAt(0);void 0 === i && (i = h), this._addCallbacks(e, n, r, i, null);
        }, i.prototype._migrateCallbackAt = function (t, e) {
          var n = t._fulfillmentHandlerAt(e),
              r = t._rejectionHandlerAt(e),
              i = t._promiseAt(e),
              o = t._receiverAt(e);void 0 === o && (o = h), this._addCallbacks(n, r, i, o, null);
        }, i.prototype._addCallbacks = function (t, e, n, r, i) {
          var o = this._length();if (o >= 65531 && (o = 0, this._setLength(0)), 0 === o) this._promise0 = n, this._receiver0 = r, "function" == typeof t && (this._fulfillmentHandler0 = null === i ? t : f.domainBind(i, t)), "function" == typeof e && (this._rejectionHandler0 = null === i ? e : f.domainBind(i, e));else {
            var s = 4 * o - 4;this[s + 2] = n, this[s + 3] = r, "function" == typeof t && (this[s + 0] = null === i ? t : f.domainBind(i, t)), "function" == typeof e && (this[s + 1] = null === i ? e : f.domainBind(i, e));
          }return this._setLength(o + 1), o;
        }, i.prototype._proxy = function (t, e) {
          this._addCallbacks(void 0, void 0, e, t, null);
        }, i.prototype._resolveCallback = function (t, e) {
          if (0 === (117506048 & this._bitField)) {
            if (t === this) return this._rejectCallback(l(), !1);var n = j(t, this);if (!(n instanceof i)) return this._fulfill(t);e && this._propagateFrom(n, 2);var r = n._target();if (r === this) return void this._reject(l());var o = r._bitField;if (0 === (50397184 & o)) {
              var s = this._length();s > 0 && r._migrateCallback0(this);for (var a = 1; s > a; ++a) {
                r._migrateCallbackAt(this, a);
              }this._setFollowing(), this._setLength(0), this._setFollowee(r);
            } else if (0 !== (33554432 & o)) this._fulfill(r._value());else if (0 !== (16777216 & o)) this._reject(r._reason());else {
              var c = new g("late cancellation observer");r._attachExtraTrace(c), this._reject(c);
            }
          }
        }, i.prototype._rejectCallback = function (t, e, n) {
          var r = f.ensureErrorObject(t),
              i = r === t;if (!i && !n && x.warnings()) {
            var o = "a promise was rejected with a non-error: " + f.classString(t);this._warn(o, !0);
          }this._attachExtraTrace(r, e ? i : !1), this._reject(t);
        }, i.prototype._resolveFromExecutor = function (t) {
          if (t !== b) {
            var e = this;this._captureStackTrace(), this._pushContext();var n = !0,
                r = this._execute(t, function (t) {
              e._resolveCallback(t);
            }, function (t) {
              e._rejectCallback(t, n);
            });n = !1, this._popContext(), void 0 !== r && e._rejectCallback(r, !0);
          }
        }, i.prototype._settlePromiseFromHandler = function (t, e, n, r) {
          var i = r._bitField;if (0 === (65536 & i)) {
            r._pushContext();var o;e === w ? n && "number" == typeof n.length ? o = O(t).apply(this._boundValue(), n) : (o = S, o.e = new m("cannot .spread() a non-array: " + f.classString(n))) : o = O(t).call(e, n);var s = r._popContext();i = r._bitField, 0 === (65536 & i) && (o === C ? r._reject(n) : o === S ? r._rejectCallback(o.e, !1) : (x.checkForgottenReturns(o, s, "", r, this), r._resolveCallback(o)));
          }
        }, i.prototype._target = function () {
          for (var t = this; t._isFollowing();) {
            t = t._followee();
          }return t;
        }, i.prototype._followee = function () {
          return this._rejectionHandler0;
        }, i.prototype._setFollowee = function (t) {
          this._rejectionHandler0 = t;
        }, i.prototype._settlePromise = function (t, e, r, o) {
          var s = t instanceof i,
              a = this._bitField,
              c = 0 !== (134217728 & a);0 !== (65536 & a) ? (s && t._invokeInternalOnCancel(), r instanceof T && r.isFinallyHandler() ? (r.cancelPromise = t, O(e).call(r, o) === S && t._reject(S.e)) : e === u ? t._fulfill(u.call(r)) : r instanceof n ? r._promiseCancelled(t) : s || t instanceof E ? t._cancel() : r.cancel()) : "function" == typeof e ? s ? (c && t._setAsyncGuaranteed(), this._settlePromiseFromHandler(e, r, o, t)) : e.call(r, o, t) : r instanceof n ? r._isResolved() || (0 !== (33554432 & a) ? r._promiseFulfilled(o, t) : r._promiseRejected(o, t)) : s && (c && t._setAsyncGuaranteed(), 0 !== (33554432 & a) ? t._fulfill(o) : t._reject(o));
        }, i.prototype._settlePromiseLateCancellationObserver = function (t) {
          var e = t.handler,
              n = t.promise,
              r = t.receiver,
              o = t.value;"function" == typeof e ? n instanceof i ? this._settlePromiseFromHandler(e, r, o, n) : e.call(r, o, n) : n instanceof i && n._reject(o);
        }, i.prototype._settlePromiseCtx = function (t) {
          this._settlePromise(t.promise, t.handler, t.receiver, t.value);
        }, i.prototype._settlePromise0 = function (t, e, n) {
          var r = this._promise0,
              i = this._receiverAt(0);this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(r, t, i, e);
        }, i.prototype._clearCallbackDataAtIndex = function (t) {
          var e = 4 * t - 4;this[e + 2] = this[e + 3] = this[e + 0] = this[e + 1] = void 0;
        }, i.prototype._fulfill = function (t) {
          var e = this._bitField;if (!((117506048 & e) >>> 16)) {
            if (t === this) {
              var n = l();return this._attachExtraTrace(n), this._reject(n);
            }this._setFulfilled(), this._rejectionHandler0 = t, (65535 & e) > 0 && (0 !== (134217728 & e) ? this._settlePromises() : v.settlePromises(this));
          }
        }, i.prototype._reject = function (t) {
          var e = this._bitField;if (!((117506048 & e) >>> 16)) return this._setRejected(), this._fulfillmentHandler0 = t, this._isFinal() ? v.fatalError(t, f.isNode) : void ((65535 & e) > 0 ? v.settlePromises(this) : this._ensurePossibleRejectionHandled());
        }, i.prototype._fulfillPromises = function (t, e) {
          for (var n = 1; t > n; n++) {
            var r = this._fulfillmentHandlerAt(n),
                i = this._promiseAt(n),
                o = this._receiverAt(n);this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
          }
        }, i.prototype._rejectPromises = function (t, e) {
          for (var n = 1; t > n; n++) {
            var r = this._rejectionHandlerAt(n),
                i = this._promiseAt(n),
                o = this._receiverAt(n);this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
          }
        }, i.prototype._settlePromises = function () {
          var t = this._bitField,
              e = 65535 & t;if (e > 0) {
            if (0 !== (16842752 & t)) {
              var n = this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0, n, t), this._rejectPromises(e, n);
            } else {
              var r = this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0, r, t), this._fulfillPromises(e, r);
            }this._setLength(0);
          }this._clearCancellationData();
        }, i.prototype._settledValue = function () {
          var t = this._bitField;return 0 !== (33554432 & t) ? this._rejectionHandler0 : 0 !== (16777216 & t) ? this._fulfillmentHandler0 : void 0;
        }, i.defer = i.pending = function () {
          x.deprecated("Promise.defer", "new Promise");var t = new i(b);return { promise: t, resolve: o, reject: s };
        }, f.notEnumerableProp(i, "_makeSelfResolutionError", l), t("./method")(i, b, j, p, x), t("./bind")(i, b, j, x), t("./cancel")(i, E, p, x), t("./direct_resolve")(i), t("./synchronous_inspection")(i), t("./join")(i, E, j, b, v, c), i.Promise = i, i.version = "3.5.0", t("./map.js")(i, E, p, j, b, x), t("./call_get.js")(i), t("./using.js")(i, p, j, F, b, x), t("./timers.js")(i, b, x), t("./generators.js")(i, p, b, j, n, x), t("./nodeify.js")(i), t("./promisify.js")(i, b), t("./props.js")(i, E, j, p), t("./race.js")(i, b, j, p), t("./reduce.js")(i, E, p, j, b, x), t("./settle.js")(i, E, x), t("./some.js")(i, E, p), t("./filter.js")(i, b), t("./each.js")(i, b), t("./any.js")(i), f.toFastProperties(i), f.toFastProperties(i.prototype), a({ a: 1 }), a({ b: 2 }), a({ c: 3 }), a(1), a(function () {}), a(void 0), a(!1), a(new i(b)), x.setBounds(d.firstLineError, f.lastLineError), i;
      };
    }, { "./any.js": 1, "./async": 2, "./bind": 3, "./call_get.js": 5, "./cancel": 6, "./catch_filter": 7, "./context": 8, "./debuggability": 9, "./direct_resolve": 10, "./each.js": 11, "./errors": 12, "./es5": 13, "./filter.js": 14, "./finally": 15, "./generators.js": 16, "./join": 17, "./map.js": 18, "./method": 19, "./nodeback": 20, "./nodeify.js": 21, "./promise_array": 23, "./promisify.js": 24, "./props.js": 25, "./race.js": 27, "./reduce.js": 28, "./settle.js": 30, "./some.js": 31, "./synchronous_inspection": 32, "./thenables": 33, "./timers.js": 34, "./using.js": 35, "./util": 36 }], 23: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i, o) {
        function s(t) {
          switch (t) {case -2:
              return [];case -3:
              return {};case -6:
              return new _Map();}
        }function a(t) {
          var r = this._promise = new e(n);t instanceof e && r._propagateFrom(t, 3), r._setOnCancel(this), this._values = t, this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
        }var c = t("./util");c.isArray;return c.inherits(a, o), a.prototype.length = function () {
          return this._length;
        }, a.prototype.promise = function () {
          return this._promise;
        }, a.prototype._init = function l(t, n) {
          var o = r(this._values, this._promise);if (o instanceof e) {
            o = o._target();var a = o._bitField;if (this._values = o, 0 === (50397184 & a)) return this._promise._setAsyncGuaranteed(), o._then(l, this._reject, void 0, this, n);if (0 === (33554432 & a)) return 0 !== (16777216 & a) ? this._reject(o._reason()) : this._cancel();o = o._value();
          }if (o = c.asArray(o), null === o) {
            var u = i("expecting an array or an iterable object but got " + c.classString(o)).reason();return void this._promise._rejectCallback(u, !1);
          }return 0 === o.length ? void (-5 === n ? this._resolveEmptyArray() : this._resolve(s(n))) : void this._iterate(o);
        }, a.prototype._iterate = function (t) {
          var n = this.getActualLength(t.length);this._length = n, this._values = this.shouldCopyValues() ? new Array(n) : this._values;for (var i = this._promise, o = !1, s = null, a = 0; n > a; ++a) {
            var c = r(t[a], i);c instanceof e ? (c = c._target(), s = c._bitField) : s = null, o ? null !== s && c.suppressUnhandledRejections() : null !== s ? 0 === (50397184 & s) ? (c._proxy(this, a), this._values[a] = c) : o = 0 !== (33554432 & s) ? this._promiseFulfilled(c._value(), a) : 0 !== (16777216 & s) ? this._promiseRejected(c._reason(), a) : this._promiseCancelled(a) : o = this._promiseFulfilled(c, a);
          }o || i._setAsyncGuaranteed();
        }, a.prototype._isResolved = function () {
          return null === this._values;
        }, a.prototype._resolve = function (t) {
          this._values = null, this._promise._fulfill(t);
        }, a.prototype._cancel = function () {
          !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel());
        }, a.prototype._reject = function (t) {
          this._values = null, this._promise._rejectCallback(t, !1);
        }, a.prototype._promiseFulfilled = function (t, e) {
          this._values[e] = t;var n = ++this._totalResolved;return n >= this._length ? (this._resolve(this._values), !0) : !1;
        }, a.prototype._promiseCancelled = function () {
          return this._cancel(), !0;
        }, a.prototype._promiseRejected = function (t) {
          return this._totalResolved++, this._reject(t), !0;
        }, a.prototype._resultCancelled = function () {
          if (!this._isResolved()) {
            var t = this._values;if (this._cancel(), t instanceof e) t.cancel();else for (var n = 0; n < t.length; ++n) {
              t[n] instanceof e && t[n].cancel();
            }
          }
        }, a.prototype.shouldCopyValues = function () {
          return !0;
        }, a.prototype.getActualLength = function (t) {
          return t;
        }, a;
      };
    }, { "./util": 36 }], 24: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n) {
        function r(t) {
          return !C.test(t);
        }function i(t) {
          try {
            return t.__isPromisified__ === !0;
          } catch (e) {
            return !1;
          }
        }function o(t, e, n) {
          var r = f.getDataPropertyOrDefault(t, e + n, b);return r ? i(r) : !1;
        }function s(t, e, n) {
          for (var r = 0; r < t.length; r += 2) {
            var i = t[r];if (n.test(i)) for (var o = i.replace(n, ""), s = 0; s < t.length; s += 2) {
              if (t[s] === o) throw new m("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e));
            }
          }
        }function a(t, e, n, r) {
          for (var a = f.inheritedDataKeys(t), c = [], l = 0; l < a.length; ++l) {
            var u = a[l],
                p = t[u],
                h = r === j ? !0 : j(u, p, t);"function" != typeof p || i(p) || o(t, u, e) || !r(u, p, t, h) || c.push(u, p);
          }return s(c, e, n), c;
        }function c(t, r, i, o, s, a) {
          function c() {
            var i = r;r === h && (i = this);var o = new e(n);o._captureStackTrace();var s = "string" == typeof u && this !== l ? this[u] : t,
                c = _(o, a);try {
              s.apply(i, d(arguments, c));
            } catch (p) {
              o._rejectCallback(v(p), !0, !0);
            }return o._isFateSealed() || o._setAsyncGuaranteed(), o;
          }var l = function () {
            return this;
          }(),
              u = t;return "string" == typeof u && (t = o), f.notEnumerableProp(c, "__isPromisified__", !0), c;
        }function l(t, e, n, r, i) {
          for (var o = new RegExp(E(e) + "$"), s = a(t, e, o, n), c = 0, l = s.length; l > c; c += 2) {
            var u = s[c],
                p = s[c + 1],
                _ = u + e;if (r === k) t[_] = k(u, h, u, p, e, i);else {
              var d = r(p, function () {
                return k(u, h, u, p, e, i);
              });f.notEnumerableProp(d, "__isPromisified__", !0), t[_] = d;
            }
          }return f.toFastProperties(t), t;
        }function u(t, e, n) {
          return k(t, e, void 0, t, null, n);
        }var p,
            h = {},
            f = t("./util"),
            _ = t("./nodeback"),
            d = f.withAppended,
            v = f.maybeWrapAsError,
            y = f.canEvaluate,
            m = t("./errors").TypeError,
            g = "Async",
            b = { __isPromisified__: !0 },
            w = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"],
            C = new RegExp("^(?:" + w.join("|") + ")$"),
            j = function j(t) {
          return f.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t;
        },
            E = function E(t) {
          return t.replace(/([$])/, "\\$");
        },
            k = y ? p : c;e.promisify = function (t, e) {
          if ("function" != typeof t) throw new m("expecting a function but got " + f.classString(t));if (i(t)) return t;e = Object(e);var n = void 0 === e.context ? h : e.context,
              o = !!e.multiArgs,
              s = u(t, n, o);return f.copyDescriptors(t, s, r), s;
        }, e.promisifyAll = function (t, e) {
          if ("function" != typeof t && "object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) throw new m("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");e = Object(e);var n = !!e.multiArgs,
              r = e.suffix;"string" != typeof r && (r = g);var i = e.filter;"function" != typeof i && (i = j);var o = e.promisifier;if ("function" != typeof o && (o = k), !f.isIdentifier(r)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");for (var s = f.inheritedDataKeys(t), a = 0; a < s.length; ++a) {
            var c = t[s[a]];"constructor" !== s[a] && f.isClass(c) && (l(c.prototype, r, i, o, n), l(c, r, i, o, n));
          }return l(t, r, i, o, n);
        };
      };
    }, { "./errors": 12, "./nodeback": 20, "./util": 36 }], 25: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i) {
        function o(t) {
          var e,
              n = !1;if (void 0 !== a && t instanceof a) e = p(t), n = !0;else {
            var r = u.keys(t),
                i = r.length;e = new Array(2 * i);for (var o = 0; i > o; ++o) {
              var s = r[o];e[o] = t[s], e[o + i] = s;
            }
          }this.constructor$(e), this._isMap = n, this._init$(void 0, n ? -6 : -3);
        }function s(t) {
          var n,
              s = r(t);return l(s) ? (n = s instanceof e ? s._then(e.props, void 0, void 0, void 0, void 0) : new o(s).promise(), s instanceof e && n._propagateFrom(s, 2), n) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
        }var a,
            c = t("./util"),
            l = c.isObject,
            u = t("./es5");"function" == typeof _Map && (a = _Map);var p = function () {
          function t(t, r) {
            this[e] = t, this[e + n] = r, e++;
          }var e = 0,
              n = 0;return function (r) {
            n = r.size, e = 0;var i = new Array(2 * r.size);return r.forEach(t, i), i;
          };
        }(),
            h = function h(t) {
          for (var e = new a(), n = t.length / 2 | 0, r = 0; n > r; ++r) {
            var i = t[n + r],
                o = t[r];e.set(i, o);
          }return e;
        };c.inherits(o, n), o.prototype._init = function () {}, o.prototype._promiseFulfilled = function (t, e) {
          this._values[e] = t;var n = ++this._totalResolved;if (n >= this._length) {
            var r;if (this._isMap) r = h(this._values);else {
              r = {};for (var i = this.length(), o = 0, s = this.length(); s > o; ++o) {
                r[this._values[o + i]] = this._values[o];
              }
            }return this._resolve(r), !0;
          }return !1;
        }, o.prototype.shouldCopyValues = function () {
          return !1;
        }, o.prototype.getActualLength = function (t) {
          return t >> 1;
        }, e.prototype.props = function () {
          return s(this);
        }, e.props = function (t) {
          return s(t);
        };
      };
    }, { "./es5": 13, "./util": 36 }], 26: [function (t, e, n) {
      "use strict";
      function r(t, e, n, r, i) {
        for (var o = 0; i > o; ++o) {
          n[o + r] = t[o + e], t[o + e] = void 0;
        }
      }function i(t) {
        this._capacity = t, this._length = 0, this._front = 0;
      }i.prototype._willBeOverCapacity = function (t) {
        return this._capacity < t;
      }, i.prototype._pushOne = function (t) {
        var e = this.length();this._checkCapacity(e + 1);var n = this._front + e & this._capacity - 1;this[n] = t, this._length = e + 1;
      }, i.prototype.push = function (t, e, n) {
        var r = this.length() + 3;if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);var i = this._front + r - 3;this._checkCapacity(r);var o = this._capacity - 1;this[i + 0 & o] = t, this[i + 1 & o] = e, this[i + 2 & o] = n, this._length = r;
      }, i.prototype.shift = function () {
        var t = this._front,
            e = this[t];return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, e;
      }, i.prototype.length = function () {
        return this._length;
      }, i.prototype._checkCapacity = function (t) {
        this._capacity < t && this._resizeTo(this._capacity << 1);
      }, i.prototype._resizeTo = function (t) {
        var e = this._capacity;this._capacity = t;var n = this._front,
            i = this._length,
            o = n + i & e - 1;r(this, 0, this, e, o);
      }, e.exports = i;
    }, {}], 27: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i) {
        function o(t, o) {
          var c = r(t);if (c instanceof e) return a(c);if (t = s.asArray(t), null === t) return i("expecting an array or an iterable object but got " + s.classString(t));var l = new e(n);void 0 !== o && l._propagateFrom(o, 3);for (var u = l._fulfill, p = l._reject, h = 0, f = t.length; f > h; ++h) {
            var _ = t[h];(void 0 !== _ || h in t) && e.cast(_)._then(u, p, void 0, l, null);
          }return l;
        }var s = t("./util"),
            a = function a(t) {
          return t.then(function (e) {
            return o(e, t);
          });
        };e.race = function (t) {
          return o(t, void 0);
        }, e.prototype.race = function () {
          return o(this, void 0);
        };
      };
    }, { "./util": 36 }], 28: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i, o, s) {
        function a(t, n, r, i) {
          this.constructor$(t);var s = h();this._fn = null === s ? n : f.domainBind(s, n), void 0 !== r && (r = e.resolve(r), r._attachCancellationCallback(this)), this._initialValue = r, this._currentCancellable = null, i === o ? this._eachValues = Array(this._length) : 0 === i ? this._eachValues = null : this._eachValues = void 0, this._promise._captureStackTrace(), this._init$(void 0, -5);
        }function c(t, e) {
          this.isFulfilled() ? e._resolve(t) : e._reject(t);
        }function l(t, e, n, i) {
          if ("function" != typeof e) return r("expecting a function but got " + f.classString(e));var o = new a(t, e, n, i);return o.promise();
        }function u(t) {
          this.accum = t, this.array._gotAccum(t);var n = i(this.value, this.array._promise);return n instanceof e ? (this.array._currentCancellable = n, n._then(p, void 0, void 0, this, void 0)) : p.call(this, n);
        }function p(t) {
          var n = this.array,
              r = n._promise,
              i = _(n._fn);r._pushContext();var o;o = void 0 !== n._eachValues ? i.call(r._boundValue(), t, this.index, this.length) : i.call(r._boundValue(), this.accum, t, this.index, this.length), o instanceof e && (n._currentCancellable = o);var a = r._popContext();return s.checkForgottenReturns(o, a, void 0 !== n._eachValues ? "Promise.each" : "Promise.reduce", r), o;
        }var h = e._getDomain,
            f = t("./util"),
            _ = f.tryCatch;f.inherits(a, n), a.prototype._gotAccum = function (t) {
          void 0 !== this._eachValues && null !== this._eachValues && t !== o && this._eachValues.push(t);
        }, a.prototype._eachComplete = function (t) {
          return null !== this._eachValues && this._eachValues.push(t), this._eachValues;
        }, a.prototype._init = function () {}, a.prototype._resolveEmptyArray = function () {
          this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue);
        }, a.prototype.shouldCopyValues = function () {
          return !1;
        }, a.prototype._resolve = function (t) {
          this._promise._resolveCallback(t), this._values = null;
        }, a.prototype._resultCancelled = function (t) {
          return t === this._initialValue ? this._cancel() : void (this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e && this._currentCancellable.cancel(), this._initialValue instanceof e && this._initialValue.cancel()));
        }, a.prototype._iterate = function (t) {
          this._values = t;var n,
              r,
              i = t.length;if (void 0 !== this._initialValue ? (n = this._initialValue, r = 0) : (n = e.resolve(t[0]), r = 1), this._currentCancellable = n, !n.isRejected()) for (; i > r; ++r) {
            var o = { accum: null, value: t[r], index: r, length: i, array: this };n = n._then(u, void 0, void 0, o, void 0);
          }void 0 !== this._eachValues && (n = n._then(this._eachComplete, void 0, void 0, this, void 0)), n._then(c, c, void 0, n, this);
        }, e.prototype.reduce = function (t, e) {
          return l(this, t, e, null);
        }, e.reduce = function (t, e, n, r) {
          return l(t, e, n, r);
        };
      };
    }, { "./util": 36 }], 29: [function (t, e, n) {
      "use strict";
      var r,
          i = t("./util"),
          o = function o() {
        throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
      },
          s = i.getNativePromise();if (i.isNode && "undefined" == typeof MutationObserver) {
        var a = global.setImmediate,
            c = process.nextTick;r = i.isRecentNode ? function (t) {
          a.call(global, t);
        } : function (t) {
          c.call(process, t);
        };
      } else if ("function" == typeof s && "function" == typeof s.resolve) {
        var l = s.resolve();r = function r(t) {
          l.then(t);
        };
      } else r = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? "undefined" != typeof _setImmediate ? function (t) {
        _setImmediate(t);
      } : "undefined" != typeof setTimeout ? function (t) {
        setTimeout(t, 0);
      } : o : function () {
        var t = document.createElement("div"),
            e = { attributes: !0 },
            n = !1,
            r = document.createElement("div"),
            i = new MutationObserver(function () {
          t.classList.toggle("foo"), n = !1;
        });i.observe(r, e);var o = function o() {
          n || (n = !0, r.classList.toggle("foo"));
        };return function (n) {
          var r = new MutationObserver(function () {
            r.disconnect(), n();
          });r.observe(t, e), o();
        };
      }();e.exports = r;
    }, { "./util": 36 }], 30: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r) {
        function i(t) {
          this.constructor$(t);
        }var o = e.PromiseInspection,
            s = t("./util");s.inherits(i, n), i.prototype._promiseResolved = function (t, e) {
          this._values[t] = e;var n = ++this._totalResolved;return n >= this._length ? (this._resolve(this._values), !0) : !1;
        }, i.prototype._promiseFulfilled = function (t, e) {
          var n = new o();return n._bitField = 33554432, n._settledValueField = t, this._promiseResolved(e, n);
        }, i.prototype._promiseRejected = function (t, e) {
          var n = new o();return n._bitField = 16777216, n._settledValueField = t, this._promiseResolved(e, n);
        }, e.settle = function (t) {
          return r.deprecated(".settle()", ".reflect()"), new i(t).promise();
        }, e.prototype.settle = function () {
          return e.settle(this);
        };
      };
    }, { "./util": 36 }], 31: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r) {
        function i(t) {
          this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
        }function o(t, e) {
          if ((0 | e) !== e || 0 > e) return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");var n = new i(t),
              o = n.promise();return n.setHowMany(e), n.init(), o;
        }var s = t("./util"),
            a = t("./errors").RangeError,
            c = t("./errors").AggregateError,
            l = s.isArray,
            u = {};s.inherits(i, n), i.prototype._init = function () {
          if (this._initialized) {
            if (0 === this._howMany) return void this._resolve([]);this._init$(void 0, -5);var t = l(this._values);!this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
          }
        }, i.prototype.init = function () {
          this._initialized = !0, this._init();
        }, i.prototype.setUnwrap = function () {
          this._unwrap = !0;
        }, i.prototype.howMany = function () {
          return this._howMany;
        }, i.prototype.setHowMany = function (t) {
          this._howMany = t;
        }, i.prototype._promiseFulfilled = function (t) {
          return this._addFulfilled(t), this._fulfilled() === this.howMany() ? (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), !0) : !1;
        }, i.prototype._promiseRejected = function (t) {
          return this._addRejected(t), this._checkOutcome();
        }, i.prototype._promiseCancelled = function () {
          return this._values instanceof e || null == this._values ? this._cancel() : (this._addRejected(u), this._checkOutcome());
        }, i.prototype._checkOutcome = function () {
          if (this.howMany() > this._canPossiblyFulfill()) {
            for (var t = new c(), e = this.length(); e < this._values.length; ++e) {
              this._values[e] !== u && t.push(this._values[e]);
            }return t.length > 0 ? this._reject(t) : this._cancel(), !0;
          }return !1;
        }, i.prototype._fulfilled = function () {
          return this._totalResolved;
        }, i.prototype._rejected = function () {
          return this._values.length - this.length();
        }, i.prototype._addRejected = function (t) {
          this._values.push(t);
        }, i.prototype._addFulfilled = function (t) {
          this._values[this._totalResolved++] = t;
        }, i.prototype._canPossiblyFulfill = function () {
          return this.length() - this._rejected();
        }, i.prototype._getRangeError = function (t) {
          var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";return new a(e);
        }, i.prototype._resolveEmptyArray = function () {
          this._reject(this._getRangeError(0));
        }, e.some = function (t, e) {
          return o(t, e);
        }, e.prototype.some = function (t) {
          return o(this, t);
        }, e._SomePromiseArray = i;
      };
    }, { "./errors": 12, "./util": 36 }], 32: [function (t, e, n) {
      "use strict";
      e.exports = function (t) {
        function e(t) {
          void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0);
        }e.prototype._settledValue = function () {
          return this._settledValueField;
        };var n = e.prototype.value = function () {
          if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue();
        },
            r = e.prototype.error = e.prototype.reason = function () {
          if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue();
        },
            i = e.prototype.isFulfilled = function () {
          return 0 !== (33554432 & this._bitField);
        },
            o = e.prototype.isRejected = function () {
          return 0 !== (16777216 & this._bitField);
        },
            s = e.prototype.isPending = function () {
          return 0 === (50397184 & this._bitField);
        },
            a = e.prototype.isResolved = function () {
          return 0 !== (50331648 & this._bitField);
        };e.prototype.isCancelled = function () {
          return 0 !== (8454144 & this._bitField);
        }, t.prototype.__isCancelled = function () {
          return 65536 === (65536 & this._bitField);
        }, t.prototype._isCancelled = function () {
          return this._target().__isCancelled();
        }, t.prototype.isCancelled = function () {
          return 0 !== (8454144 & this._target()._bitField);
        }, t.prototype.isPending = function () {
          return s.call(this._target());
        }, t.prototype.isRejected = function () {
          return o.call(this._target());
        }, t.prototype.isFulfilled = function () {
          return i.call(this._target());
        }, t.prototype.isResolved = function () {
          return a.call(this._target());
        }, t.prototype.value = function () {
          return n.call(this._target());
        }, t.prototype.reason = function () {
          var t = this._target();return t._unsetRejectionIsUnhandled(), r.call(t);
        }, t.prototype._value = function () {
          return this._settledValue();
        }, t.prototype._reason = function () {
          return this._unsetRejectionIsUnhandled(), this._settledValue();
        }, t.PromiseInspection = e;
      };
    }, {}], 33: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n) {
        function r(t, r) {
          if (u(t)) {
            if (t instanceof e) return t;var i = o(t);if (i === l) {
              r && r._pushContext();var c = e.reject(i.e);return r && r._popContext(), c;
            }if ("function" == typeof i) {
              if (s(t)) {
                var c = new e(n);return t._then(c._fulfill, c._reject, void 0, c, null), c;
              }return a(t, i, r);
            }
          }return t;
        }function i(t) {
          return t.then;
        }function o(t) {
          try {
            return i(t);
          } catch (e) {
            return l.e = e, l;
          }
        }function s(t) {
          try {
            return p.call(t, "_promise0");
          } catch (e) {
            return !1;
          }
        }function a(t, r, i) {
          function o(t) {
            a && (a._resolveCallback(t), a = null);
          }function s(t) {
            a && (a._rejectCallback(t, p, !0), a = null);
          }var a = new e(n),
              u = a;i && i._pushContext(), a._captureStackTrace(), i && i._popContext();var p = !0,
              h = c.tryCatch(r).call(t, o, s);return p = !1, a && h === l && (a._rejectCallback(h.e, !0, !0), a = null), u;
        }var c = t("./util"),
            l = c.errorObj,
            u = c.isObject,
            p = {}.hasOwnProperty;return r;
      };
    }, { "./util": 36 }], 34: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r) {
        function i(t) {
          this.handle = t;
        }function o(t) {
          return clearTimeout(this.handle), t;
        }function s(t) {
          throw clearTimeout(this.handle), t;
        }var a = t("./util"),
            c = e.TimeoutError;i.prototype._resultCancelled = function () {
          clearTimeout(this.handle);
        };var l = function l(t) {
          return u(+this).thenReturn(t);
        },
            u = e.delay = function (t, o) {
          var s, a;return void 0 !== o ? (s = e.resolve(o)._then(l, null, null, t, void 0), r.cancellation() && o instanceof e && s._setOnCancel(o)) : (s = new e(n), a = setTimeout(function () {
            s._fulfill();
          }, +t), r.cancellation() && s._setOnCancel(new i(a)), s._captureStackTrace()), s._setAsyncGuaranteed(), s;
        };e.prototype.delay = function (t) {
          return u(t, this);
        };var p = function p(t, e, n) {
          var r;r = "string" != typeof e ? e instanceof Error ? e : new c("operation timed out") : new c(e), a.markAsOriginatingFromRejection(r), t._attachExtraTrace(r), t._reject(r), null != n && n.cancel();
        };e.prototype.timeout = function (t, e) {
          t = +t;var n,
              a,
              c = new i(setTimeout(function () {
            n.isPending() && p(n, e, a);
          }, t));return r.cancellation() ? (a = this.then(), n = a._then(o, s, void 0, c, void 0), n._setOnCancel(c)) : n = this._then(o, s, void 0, c, void 0), n;
        };
      };
    }, { "./util": 36 }], 35: [function (t, e, n) {
      "use strict";
      e.exports = function (e, n, r, i, o, s) {
        function a(t) {
          setTimeout(function () {
            throw t;
          }, 0);
        }function c(t) {
          var e = r(t);return e !== t && "function" == typeof t._isDisposable && "function" == typeof t._getDisposer && t._isDisposable() && e._setDisposable(t._getDisposer()), e;
        }function l(t, n) {
          function i() {
            if (s >= l) return u._fulfill();var o = c(t[s++]);if (o instanceof e && o._isDisposable()) {
              try {
                o = r(o._getDisposer().tryDispose(n), t.promise);
              } catch (p) {
                return a(p);
              }if (o instanceof e) return o._then(i, a, null, null, null);
            }i();
          }var s = 0,
              l = t.length,
              u = new e(o);return i(), u;
        }function u(t, e, n) {
          this._data = t, this._promise = e, this._context = n;
        }function p(t, e, n) {
          this.constructor$(t, e, n);
        }function h(t) {
          return u.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t;
        }function f(t) {
          this.length = t, this.promise = null, this[t - 1] = null;
        }var _ = t("./util"),
            d = t("./errors").TypeError,
            v = t("./util").inherits,
            y = _.errorObj,
            m = _.tryCatch,
            g = {};u.prototype.data = function () {
          return this._data;
        }, u.prototype.promise = function () {
          return this._promise;
        }, u.prototype.resource = function () {
          return this.promise().isFulfilled() ? this.promise().value() : g;
        }, u.prototype.tryDispose = function (t) {
          var e = this.resource(),
              n = this._context;void 0 !== n && n._pushContext();var r = e !== g ? this.doDispose(e, t) : null;return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, r;
        }, u.isDisposer = function (t) {
          return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose;
        }, v(p, u), p.prototype.doDispose = function (t, e) {
          var n = this.data();return n.call(t, t, e);
        }, f.prototype._resultCancelled = function () {
          for (var t = this.length, n = 0; t > n; ++n) {
            var r = this[n];r instanceof e && r.cancel();
          }
        }, e.using = function () {
          var t = arguments.length;if (2 > t) return n("you must pass at least 2 arguments to Promise.using");var i = arguments[t - 1];if ("function" != typeof i) return n("expecting a function but got " + _.classString(i));var o,
              a = !0;2 === t && Array.isArray(arguments[0]) ? (o = arguments[0], t = o.length, a = !1) : (o = arguments, t--);for (var c = new f(t), p = 0; t > p; ++p) {
            var d = o[p];if (u.isDisposer(d)) {
              var v = d;d = d.promise(), d._setDisposable(v);
            } else {
              var g = r(d);g instanceof e && (d = g._then(h, null, null, { resources: c, index: p }, void 0));
            }c[p] = d;
          }for (var b = new Array(c.length), p = 0; p < b.length; ++p) {
            b[p] = e.resolve(c[p]).reflect();
          }var w = e.all(b).then(function (t) {
            for (var e = 0; e < t.length; ++e) {
              var n = t[e];if (n.isRejected()) return y.e = n.error(), y;if (!n.isFulfilled()) return void w.cancel();t[e] = n.value();
            }C._pushContext(), i = m(i);var r = a ? i.apply(void 0, t) : i(t),
                o = C._popContext();return s.checkForgottenReturns(r, o, "Promise.using", C), r;
          }),
              C = w.lastly(function () {
            var t = new e.PromiseInspection(w);return l(c, t);
          });return c.promise = C, C._setOnCancel(c), C;
        }, e.prototype._setDisposable = function (t) {
          this._bitField = 131072 | this._bitField, this._disposer = t;
        }, e.prototype._isDisposable = function () {
          return (131072 & this._bitField) > 0;
        }, e.prototype._getDisposer = function () {
          return this._disposer;
        }, e.prototype._unsetDisposable = function () {
          this._bitField = -131073 & this._bitField, this._disposer = void 0;
        }, e.prototype.disposer = function (t) {
          if ("function" == typeof t) return new p(t, this, i());throw new d();
        };
      };
    }, { "./errors": 12, "./util": 36 }], 36: [function (t, e, n) {
      "use strict";
      function r() {
        try {
          var t = P;return P = null, t.apply(this, arguments);
        } catch (e) {
          return T.e = e, T;
        }
      }function i(t) {
        return P = t, r;
      }function o(t) {
        return null == t || t === !0 || t === !1 || "string" == typeof t || "number" == typeof t;
      }function s(t) {
        return "function" == typeof t || "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && null !== t;
      }function a(t) {
        return o(t) ? new Error(v(t)) : t;
      }function c(t, e) {
        var n,
            r = t.length,
            i = new Array(r + 1);for (n = 0; r > n; ++n) {
          i[n] = t[n];
        }return i[n] = e, i;
      }function l(t, e, n) {
        if (!F.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;var r = _Object$getOwnPropertyDescriptor(t, e);return null != r ? null == r.get && null == r.set ? r.value : n : void 0;
      }function u(t, e, n) {
        if (o(t)) return t;var r = { value: n, configurable: !0, enumerable: !1, writable: !0 };return F.defineProperty(t, e, r), t;
      }function p(t) {
        throw t;
      }function h(t) {
        try {
          if ("function" == typeof t) {
            var e = F.names(t.prototype),
                n = F.isES5 && e.length > 1,
                r = e.length > 0 && !(1 === e.length && "constructor" === e[0]),
                i = A.test(t + "") && F.names(t).length > 0;if (n || r || i) return !0;
          }return !1;
        } catch (o) {
          return !1;
        }
      }function f(t) {
        function e() {}e.prototype = t;for (var n = 8; n--;) {
          new e();
        }return t;
      }function _(t) {
        return D.test(t);
      }function d(t, e, n) {
        for (var r = new Array(t), i = 0; t > i; ++i) {
          r[i] = e + i + n;
        }return r;
      }function v(t) {
        try {
          return t + "";
        } catch (e) {
          return "[no string representation]";
        }
      }function y(t) {
        return null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && "string" == typeof t.message && "string" == typeof t.name;
      }function m(t) {
        try {
          u(t, "isOperational", !0);
        } catch (e) {}
      }function g(t) {
        return null == t ? !1 : t instanceof Error.__BluebirdErrorTypes__.OperationalError || t.isOperational === !0;
      }function b(t) {
        return y(t) && F.propertyIsWritable(t, "stack");
      }function w(t) {
        return {}.toString.call(t);
      }function C(t, e, n) {
        for (var r = F.names(t), i = 0; i < r.length; ++i) {
          var o = r[i];if (n(o)) try {
            F.defineProperty(e, o, F.getDescriptor(t, o));
          } catch (s) {}
        }
      }function j(t) {
        return N ? production[t] : void 0;
      }function E() {
        if ("function" == typeof _Promise) try {
          var t = new _Promise(function () {});if ("[object Promise]" === {}.toString.call(t)) return _Promise;
        } catch (e) {}
      }function k(t, e) {
        return t.bind(e);
      }var F = t("./es5"),
          x = "undefined" == typeof navigator,
          T = { e: {} },
          P,
          R = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0 !== this ? this : null,
          S = function S(t, e) {
        function n() {
          this.constructor = t, this.constructor$ = e;for (var n in e.prototype) {
            r.call(e.prototype, n) && "$" !== n.charAt(n.length - 1) && (this[n + "$"] = e.prototype[n]);
          }
        }var r = {}.hasOwnProperty;return n.prototype = e.prototype, t.prototype = new n(), t.prototype;
      },
          O = function () {
        var t = [Array.prototype, Object.prototype, Function.prototype],
            e = function e(_e2) {
          for (var n = 0; n < t.length; ++n) {
            if (t[n] === _e2) return !0;
          }return !1;
        };if (F.isES5) {
          var n = _Object$getOwnPropertyNames;return function (t) {
            for (var r = [], i = _Object$create(null); null != t && !e(t);) {
              var o;try {
                o = n(t);
              } catch (s) {
                return r;
              }for (var a = 0; a < o.length; ++a) {
                var c = o[a];if (!i[c]) {
                  i[c] = !0;var l = _Object$getOwnPropertyDescriptor(t, c);null != l && null == l.get && null == l.set && r.push(c);
                }
              }t = F.getPrototypeOf(t);
            }return r;
          };
        }var r = {}.hasOwnProperty;return function (n) {
          if (e(n)) return [];var i = [];t: for (var o in n) {
            if (r.call(n, o)) i.push(o);else {
              for (var s = 0; s < t.length; ++s) {
                if (r.call(t[s], o)) continue t;
              }i.push(o);
            }
          }return i;
        };
      }(),
          A = /this\s*\.\s*\S+\s*=/,
          D = /^[a-z$_][a-z$_0-9]*$/i,
          V = function () {
        return "stack" in new Error() ? function (t) {
          return b(t) ? t : new Error(v(t));
        } : function (t) {
          if (b(t)) return t;try {
            throw new Error(v(t));
          } catch (e) {
            return e;
          }
        };
      }(),
          I = function I(t) {
        return F.isArray(t) ? t : null;
      };if ("undefined" != typeof _Symbol && _Symbol$iterator) {
        var L = "function" == typeof _Array$from ? function (t) {
          return _Array$from(t);
        } : function (t) {
          for (var e, n = [], r = _getIterator(t); !(e = r.next()).done;) {
            n.push(e.value);
          }return n;
        };I = function I(t) {
          return F.isArray(t) ? t : null != t && "function" == typeof t[_Symbol$iterator] ? L(t) : null;
        };
      }var H = "undefined" != typeof process && "[object process]" === w(process).toLowerCase(),
          N = "undefined" != typeof process && "undefined" != typeof production,
          B = { isClass: h, isIdentifier: _, inheritedDataKeys: O, getDataPropertyOrDefault: l, thrower: p, isArray: F.isArray, asArray: I, notEnumerableProp: u, isPrimitive: o, isObject: s, isError: y, canEvaluate: x, errorObj: T, tryCatch: i, inherits: S, withAppended: c, maybeWrapAsError: a, toFastProperties: f, filledRange: d, toString: v, canAttachTrace: b, ensureErrorObject: V, originatesFromRejection: g, markAsOriginatingFromRejection: m, classString: w, copyDescriptors: C, hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes, isNode: H, hasEnvVariables: N, env: j, global: R, getNativePromise: E, domainBind: k };B.isRecentNode = B.isNode && function () {
        var t = process.versions.node.split(".").map(Number);return 0 === t[0] && t[1] > 10 || t[0] > 0;
      }(), B.isNode && B.toFastProperties(process);try {
        throw new Error();
      } catch (U) {
        B.lastLineError = U;
      }e.exports = B;
    }, { "./es5": 13 }] }, {}, [4])(4);
}), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(173), __webpack_require__(32)))

/***/ }),
/* 85 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(54),
      utf8 = __webpack_require__(24).utf8,
      isBuffer = __webpack_require__(85),
      bin = __webpack_require__(24).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {(function() {
  var crypt = __webpack_require__(54),
      utf8 = __webpack_require__(24).utf8,
      bin = __webpack_require__(24).bin,

  // The core
  sha1 = function (message) {
    // Convert to byte array
    if (message.constructor == String)
      message = utf8.stringToBytes(message);
    else if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();

    // otherwise assume byte array

    var m  = crypt.bytesToWords(message),
        l  = message.length * 8,
        w  = [],
        H0 =  1732584193,
        H1 = -271733879,
        H2 = -1732584194,
        H3 =  271733878,
        H4 = -1009589776;

    // Padding
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >>> 9) << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {
      var a = H0,
          b = H1,
          c = H2,
          d = H3,
          e = H4;

      for (var j = 0; j < 80; j++) {

        if (j < 16)
          w[j] = m[i + j];
        else {
          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
          w[j] = (n << 1) | (n >>> 31);
        }

        var t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
                j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
                j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
                j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
                         (H1 ^ H2 ^ H3) - 899497514);

        H4 = H3;
        H3 = H2;
        H2 = (H1 << 30) | (H1 >>> 2);
        H1 = H0;
        H0 = t;
      }

      H0 += a;
      H1 += b;
      H2 += c;
      H3 += d;
      H4 += e;
    }

    return [H0, H1, H2, H3, H4];
  },

  // Public API
  api = function (message, options) {
    var digestbytes = crypt.wordsToBytes(sha1(message));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

  api._blocksize = 16;
  api._digestsize = 20;

  module.exports = api;
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104).Buffer))

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(119), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = ((uint8[i] << 16) & 0xFF0000) + ((uint8[i + 1] << 8) & 0xFF00) + (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! bignumber.js v4.1.0 https://github.com/MikeMcl/bignumber.js/LICENCE */

;(function (globalObj) {
    'use strict';

    /*
      bignumber.js v4.1.0
      A JavaScript library for arbitrary-precision arithmetic.
      https://github.com/MikeMcl/bignumber.js
      Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
      MIT Expat Licence
    */


    var BigNumber,
        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        mathceil = Math.ceil,
        mathfloor = Math.floor,
        notBool = ' not a boolean or binary digit',
        roundingMode = 'rounding mode',
        tooManyDigits = 'number type has more than 15 significant digits',
        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
        BASE = 1e14,
        LOG_BASE = 14,
        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
        SQRT_BASE = 1e7,

        /*
         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
         * exception is thrown (if ERRORS is true).
         */
        MAX = 1E9;                                   // 0 to MAX_INT32


    /*
     * Create and return a BigNumber constructor.
     */
    function constructorFactory(config) {
        var div, parseNumeric,

            // id tracks the caller function, so its name can be included in error messages.
            id = 0,
            P = BigNumber.prototype,
            ONE = new BigNumber(1),


            /********************************* EDITABLE DEFAULTS **********************************/


            /*
             * The default values below must be integers within the inclusive ranges stated.
             * The values can also be changed at run-time using BigNumber.config.
             */

            // The maximum number of decimal places for operations involving division.
            DECIMAL_PLACES = 20,                     // 0 to MAX

            /*
             * The rounding mode used when rounding to the above decimal places, and when using
             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
             * UP         0 Away from zero.
             * DOWN       1 Towards zero.
             * CEIL       2 Towards +Infinity.
             * FLOOR      3 Towards -Infinity.
             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
             */
            ROUNDING_MODE = 4,                       // 0 to 8

            // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

            // The exponent value at and beneath which toString returns exponential notation.
            // Number type: -7
            TO_EXP_NEG = -7,                         // 0 to -MAX

            // The exponent value at and above which toString returns exponential notation.
            // Number type: 21
            TO_EXP_POS = 21,                         // 0 to MAX

            // RANGE : [MIN_EXP, MAX_EXP]

            // The minimum exponent value, beneath which underflow to zero occurs.
            // Number type: -324  (5e-324)
            MIN_EXP = -1e7,                          // -1 to -MAX

            // The maximum exponent value, above which overflow to Infinity occurs.
            // Number type:  308  (1.7976931348623157e+308)
            // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
            MAX_EXP = 1e7,                           // 1 to MAX

            // Whether BigNumber Errors are ever thrown.
            ERRORS = true,                           // true or false

            // Change to intValidatorNoErrors if ERRORS is false.
            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors

            // Whether to use cryptographically-secure random number generation, if available.
            CRYPTO = false,                          // true or false

            /*
             * The modulo mode used when calculating the modulus: a mod n.
             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
             * The remainder (r) is calculated as: r = a - n * q.
             *
             * UP        0 The remainder is positive if the dividend is negative, else is negative.
             * DOWN      1 The remainder has the same sign as the dividend.
             *             This modulo mode is commonly known as 'truncated division' and is
             *             equivalent to (a % n) in JavaScript.
             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
             *             The remainder is always positive.
             *
             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
             * modes are commonly used for the modulus operation.
             * Although the other rounding modes can also be used, they may not give useful results.
             */
            MODULO_MODE = 1,                         // 0 to 9

            // The maximum number of significant digits of the result of the toPower operation.
            // If POW_PRECISION is 0, there will be unlimited significant digits.
            POW_PRECISION = 0,                       // 0 to MAX

            // The format specification used by the BigNumber.prototype.toFormat method.
            FORMAT = {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
                secondaryGroupSize: 0,
                fractionGroupSeparator: '\xA0',      // non-breaking space
                fractionGroupSize: 0
            };


        /******************************************************************************************/


        // CONSTRUCTOR


        /*
         * The BigNumber constructor and exported function.
         * Create and return a new instance of a BigNumber object.
         *
         * n {number|string|BigNumber} A numeric value.
         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
         */
        function BigNumber( n, b ) {
            var c, e, i, num, len, str,
                x = this;

            // Enable constructor usage without new.
            if ( !( x instanceof BigNumber ) ) {

                // 'BigNumber() constructor call without new: {n}'
                if (ERRORS) raise( 26, 'constructor call without new', n );
                return new BigNumber( n, b );
            }

            // 'new BigNumber() base not an integer: {b}'
            // 'new BigNumber() base out of range: {b}'
            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {

                // Duplicate.
                if ( n instanceof BigNumber ) {
                    x.s = n.s;
                    x.e = n.e;
                    x.c = ( n = n.c ) ? n.slice() : n;
                    id = 0;
                    return;
                }

                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;

                    // Fast path for integers.
                    if ( n === ~~n ) {
                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
                        x.e = e;
                        x.c = [n];
                        id = 0;
                        return;
                    }

                    str = n + '';
                } else {
                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }
            } else {
                b = b | 0;
                str = n + '';

                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
                // Allow exponential notation to be used with base 10 argument.
                if ( b == 10 ) {
                    x = new BigNumber( n instanceof BigNumber ? n : str );
                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
                }

                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
                // Any number in exponential form will fail due to the [Ee][+-].
                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
                    return parseNumeric( x, str, num, b );
                }

                if (num) {
                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;

                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {

                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
                        raise( id, tooManyDigits, n );
                    }

                    // Prevent later check for length on converted number.
                    num = false;
                } else {
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }

                str = convertBase( str, 10, b, x.s );
            }

            // Decimal point?
            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );

            // Exponential form?
            if ( ( i = str.search( /e/i ) ) > 0 ) {

                // Determine exponent.
                if ( e < 0 ) e = i;
                e += +str.slice( i + 1 );
                str = str.substring( 0, i );
            } else if ( e < 0 ) {

                // Integer.
                e = str.length;
            }

            // Determine leading zeros.
            for ( i = 0; str.charCodeAt(i) === 48; i++ );

            // Determine trailing zeros.
            for ( len = str.length; str.charCodeAt(--len) === 48; );
            str = str.slice( i, len + 1 );

            if (str) {
                len = str.length;

                // Disallow numbers with over 15 significant digits if number type.
                // 'new BigNumber() number type has more than 15 significant digits: {n}'
                if ( num && ERRORS && len > 15 && ( n > MAX_SAFE_INTEGER || n !== mathfloor(n) ) ) {
                    raise( id, tooManyDigits, x.s * n );
                }

                e = e - i - 1;

                 // Overflow?
                if ( e > MAX_EXP ) {

                    // Infinity.
                    x.c = x.e = null;

                // Underflow?
                } else if ( e < MIN_EXP ) {

                    // Zero.
                    x.c = [ x.e = 0 ];
                } else {
                    x.e = e;
                    x.c = [];

                    // Transform base

                    // e is the base 10 exponent.
                    // i is where to slice str to get the first element of the coefficient array.
                    i = ( e + 1 ) % LOG_BASE;
                    if ( e < 0 ) i += LOG_BASE;

                    if ( i < len ) {
                        if (i) x.c.push( +str.slice( 0, i ) );

                        for ( len -= LOG_BASE; i < len; ) {
                            x.c.push( +str.slice( i, i += LOG_BASE ) );
                        }

                        str = str.slice(i);
                        i = LOG_BASE - str.length;
                    } else {
                        i -= len;
                    }

                    for ( ; i--; str += '0' );
                    x.c.push( +str );
                }
            } else {

                // Zero.
                x.c = [ x.e = 0 ];
            }

            id = 0;
        }


        // CONSTRUCTOR PROPERTIES


        BigNumber.another = constructorFactory;

        BigNumber.ROUND_UP = 0;
        BigNumber.ROUND_DOWN = 1;
        BigNumber.ROUND_CEIL = 2;
        BigNumber.ROUND_FLOOR = 3;
        BigNumber.ROUND_HALF_UP = 4;
        BigNumber.ROUND_HALF_DOWN = 5;
        BigNumber.ROUND_HALF_EVEN = 6;
        BigNumber.ROUND_HALF_CEIL = 7;
        BigNumber.ROUND_HALF_FLOOR = 8;
        BigNumber.EUCLID = 9;


        /*
         * Configure infrequently-changing library-wide settings.
         *
         * Accept an object or an argument list, with one or many of the following properties or
         * parameters respectively:
         *
         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
         *   ERRORS          {boolean|number}   true, false, 1 or 0
         *   CRYPTO          {boolean|number}   true, false, 1 or 0
         *   MODULO_MODE     {number}           0 to 9 inclusive
         *   POW_PRECISION   {number}           0 to MAX inclusive
         *   FORMAT          {object}           See BigNumber.prototype.toFormat
         *      decimalSeparator       {string}
         *      groupSeparator         {string}
         *      groupSize              {number}
         *      secondaryGroupSize     {number}
         *      fractionGroupSeparator {string}
         *      fractionGroupSize      {number}
         *
         * (The values assigned to the above FORMAT object properties are not checked for validity.)
         *
         * E.g.
         * BigNumber.config(20, 4) is equivalent to
         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
         *
         * Ignore properties/parameters set to null or undefined.
         * Return an object with the properties current values.
         */
        BigNumber.config = BigNumber.set = function () {
            var v, p,
                i = 0,
                r = {},
                a = arguments,
                o = a[0],
                has = o && typeof o == 'object'
                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };

            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
            // 'config() DECIMAL_PLACES not an integer: {v}'
            // 'config() DECIMAL_PLACES out of range: {v}'
            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                DECIMAL_PLACES = v | 0;
            }
            r[p] = DECIMAL_PLACES;

            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
            // 'config() ROUNDING_MODE not an integer: {v}'
            // 'config() ROUNDING_MODE out of range: {v}'
            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
                ROUNDING_MODE = v | 0;
            }
            r[p] = ROUNDING_MODE;

            // EXPONENTIAL_AT {number|number[]}
            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
            // 'config() EXPONENTIAL_AT not an integer: {v}'
            // 'config() EXPONENTIAL_AT out of range: {v}'
            if ( has( p = 'EXPONENTIAL_AT' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
                        TO_EXP_NEG = v[0] | 0;
                        TO_EXP_POS = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
                }
            }
            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
            // 'config() RANGE not an integer: {v}'
            // 'config() RANGE cannot be zero: {v}'
            // 'config() RANGE out of range: {v}'
            if ( has( p = 'RANGE' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
                        MIN_EXP = v[0] | 0;
                        MAX_EXP = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
                }
            }
            r[p] = [ MIN_EXP, MAX_EXP ];

            // ERRORS {boolean|number} true, false, 1 or 0.
            // 'config() ERRORS not a boolean or binary digit: {v}'
            if ( has( p = 'ERRORS' ) ) {

                if ( v === !!v || v === 1 || v === 0 ) {
                    id = 0;
                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = ERRORS;

            // CRYPTO {boolean|number} true, false, 1 or 0.
            // 'config() CRYPTO not a boolean or binary digit: {v}'
            // 'config() crypto unavailable: {crypto}'
            if ( has( p = 'CRYPTO' ) ) {

                if ( v === true || v === false || v === 1 || v === 0 ) {
                    if (v) {
                        v = typeof crypto == 'undefined';
                        if ( !v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                            CRYPTO = true;
                        } else if (ERRORS) {
                            raise( 2, 'crypto unavailable', v ? void 0 : crypto );
                        } else {
                            CRYPTO = false;
                        }
                    } else {
                        CRYPTO = false;
                    }
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = CRYPTO;

            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
            // 'config() MODULO_MODE not an integer: {v}'
            // 'config() MODULO_MODE out of range: {v}'
            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
                MODULO_MODE = v | 0;
            }
            r[p] = MODULO_MODE;

            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
            // 'config() POW_PRECISION not an integer: {v}'
            // 'config() POW_PRECISION out of range: {v}'
            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                POW_PRECISION = v | 0;
            }
            r[p] = POW_PRECISION;

            // FORMAT {object}
            // 'config() FORMAT not an object: {v}'
            if ( has( p = 'FORMAT' ) ) {

                if ( typeof v == 'object' ) {
                    FORMAT = v;
                } else if (ERRORS) {
                    raise( 2, p + ' not an object', v );
                }
            }
            r[p] = FORMAT;

            return r;
        };


        /*
         * Return a new BigNumber whose value is the maximum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };


        /*
         * Return a new BigNumber whose value is the minimum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };


        /*
         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
         * zeros are produced).
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         *
         * 'random() decimal places not an integer: {dp}'
         * 'random() decimal places out of range: {dp}'
         * 'random() crypto unavailable: {crypto}'
         */
        BigNumber.random = (function () {
            var pow2_53 = 0x20000000000000;

            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
            // Check if Math.random() produces more than 32 bits of randomness.
            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
              ? function () { return mathfloor( Math.random() * pow2_53 ); }
              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
                  (Math.random() * 0x800000 | 0); };

            return function (dp) {
                var a, b, e, k, v,
                    i = 0,
                    c = [],
                    rand = new BigNumber(ONE);

                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
                k = mathceil( dp / LOG_BASE );

                if (CRYPTO) {

                    // Browsers supporting crypto.getRandomValues.
                    if (crypto.getRandomValues) {

                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );

                        for ( ; i < k; ) {

                            // 53 bits:
                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                            //                                     11111 11111111 11111111
                            // 0x20000 is 2^21.
                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

                            // Rejection sampling:
                            // 0 <= v < 9007199254740992
                            // Probability that v >= 9e15, is
                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
                            if ( v >= 9e15 ) {
                                b = crypto.getRandomValues( new Uint32Array(2) );
                                a[i] = b[0];
                                a[i + 1] = b[1];
                            } else {

                                // 0 <= v <= 8999999999999999
                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 2;
                            }
                        }
                        i = k / 2;

                    // Node.js supporting crypto.randomBytes.
                    } else if (crypto.randomBytes) {

                        // buffer
                        a = crypto.randomBytes( k *= 7 );

                        for ( ; i < k; ) {

                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                            // 0x100000000 is 2^32, 0x1000000 is 2^24
                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                            // 0 <= v < 9007199254740992
                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];

                            if ( v >= 9e15 ) {
                                crypto.randomBytes(7).copy( a, i );
                            } else {

                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 7;
                            }
                        }
                        i = k / 7;
                    } else {
                        CRYPTO = false;
                        if (ERRORS) raise( 14, 'crypto unavailable', crypto );
                    }
                }

                // Use Math.random.
                if (!CRYPTO) {

                    for ( ; i < k; ) {
                        v = random53bitInt();
                        if ( v < 9e15 ) c[i++] = v % 1e14;
                    }
                }

                k = c[--i];
                dp %= LOG_BASE;

                // Convert trailing digits to zeros according to dp.
                if ( k && dp ) {
                    v = POWS_TEN[LOG_BASE - dp];
                    c[i] = mathfloor( k / v ) * v;
                }

                // Remove trailing elements which are zero.
                for ( ; c[i] === 0; c.pop(), i-- );

                // Zero?
                if ( i < 0 ) {
                    c = [ e = 0 ];
                } else {

                    // Remove leading elements which are zero and adjust exponent accordingly.
                    for ( e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

                    // Count the digits of the first element of c to determine leading zeros, and...
                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);

                    // adjust the exponent accordingly.
                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
                }

                rand.e = e;
                rand.c = c;
                return rand;
            };
        })();


        // PRIVATE FUNCTIONS


        // Convert a numeric string of baseIn to a numeric string of baseOut.
        function convertBase( str, baseOut, baseIn, sign ) {
            var d, e, k, r, x, xc, y,
                i = str.indexOf( '.' ),
                dp = DECIMAL_PLACES,
                rm = ROUNDING_MODE;

            if ( baseIn < 37 ) str = str.toLowerCase();

            // Non-integer.
            if ( i >= 0 ) {
                k = POW_PRECISION;

                // Unlimited precision.
                POW_PRECISION = 0;
                str = str.replace( '.', '' );
                y = new BigNumber(baseIn);
                x = y.pow( str.length - i );
                POW_PRECISION = k;

                // Convert str as if an integer, then restore the fraction part by dividing the
                // result by its base raised to a power.
                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
                y.e = y.c.length;
            }

            // Convert the number as integer.
            xc = toBaseOut( str, baseIn, baseOut );
            e = k = xc.length;

            // Remove trailing zeros.
            for ( ; xc[--k] == 0; xc.pop() );
            if ( !xc[0] ) return '0';

            if ( i < 0 ) {
                --e;
            } else {
                x.c = xc;
                x.e = e;

                // sign is needed for correct rounding.
                x.s = sign;
                x = div( x, y, dp, rm, baseOut );
                xc = x.c;
                r = x.r;
                e = x.e;
            }

            d = e + dp + 1;

            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;

            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
                         rm == ( x.s < 0 ? 8 : 7 ) );

            if ( d < 1 || !xc[0] ) {

                // 1^-dp or 0.
                str = r ? toFixedPoint( '1', -dp ) : '0';
            } else {
                xc.length = d;

                if (r) {

                    // Rounding up may mean the previous digit has to be rounded up and so on.
                    for ( --baseOut; ++xc[--d] > baseOut; ) {
                        xc[d] = 0;

                        if ( !d ) {
                            ++e;
                            xc = [1].concat(xc);
                        }
                    }
                }

                // Determine trailing zeros.
                for ( k = xc.length; !xc[--k]; );

                // E.g. [4, 11, 15] becomes 4bf.
                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
                str = toFixedPoint( str, e );
            }

            // The caller will add the sign.
            return str;
        }


        // Perform division in the specified base. Called by div and convertBase.
        div = (function () {

            // Assume non-zero x and k.
            function multiply( x, k, base ) {
                var m, temp, xlo, xhi,
                    carry = 0,
                    i = x.length,
                    klo = k % SQRT_BASE,
                    khi = k / SQRT_BASE | 0;

                for ( x = x.slice(); i--; ) {
                    xlo = x[i] % SQRT_BASE;
                    xhi = x[i] / SQRT_BASE | 0;
                    m = khi * xlo + xhi * klo;
                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
                    x[i] = temp % base;
                }

                if (carry) x = [carry].concat(x);

                return x;
            }

            function compare( a, b, aL, bL ) {
                var i, cmp;

                if ( aL != bL ) {
                    cmp = aL > bL ? 1 : -1;
                } else {

                    for ( i = cmp = 0; i < aL; i++ ) {

                        if ( a[i] != b[i] ) {
                            cmp = a[i] > b[i] ? 1 : -1;
                            break;
                        }
                    }
                }
                return cmp;
            }

            function subtract( a, b, aL, base ) {
                var i = 0;

                // Subtract b from a.
                for ( ; aL--; ) {
                    a[aL] -= i;
                    i = a[aL] < b[aL] ? 1 : 0;
                    a[aL] = i * base + a[aL] - b[aL];
                }

                // Remove leading zeros.
                for ( ; !a[0] && a.length > 1; a.splice(0, 1) );
            }

            // x: dividend, y: divisor.
            return function ( x, y, dp, rm, base ) {
                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
                    yL, yz,
                    s = x.s == y.s ? 1 : -1,
                    xc = x.c,
                    yc = y.c;

                // Either NaN, Infinity or 0?
                if ( !xc || !xc[0] || !yc || !yc[0] ) {

                    return new BigNumber(

                      // Return NaN if either NaN, or both Infinity or 0.
                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                    );
                }

                q = new BigNumber(s);
                qc = q.c = [];
                e = x.e - y.e;
                s = dp + e + 1;

                if ( !base ) {
                    base = BASE;
                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
                    s = s / LOG_BASE | 0;
                }

                // Result exponent may be one less then the current value of e.
                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
                if ( yc[i] > ( xc[i] || 0 ) ) e--;

                if ( s < 0 ) {
                    qc.push(1);
                    more = true;
                } else {
                    xL = xc.length;
                    yL = yc.length;
                    i = 0;
                    s += 2;

                    // Normalise xc and yc so highest order digit of yc is >= base / 2.

                    n = mathfloor( base / ( yc[0] + 1 ) );

                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
                    if ( n > 1 ) {
                        yc = multiply( yc, n, base );
                        xc = multiply( xc, n, base );
                        yL = yc.length;
                        xL = xc.length;
                    }

                    xi = yL;
                    rem = xc.slice( 0, yL );
                    remL = rem.length;

                    // Add zeros to make remainder as long as divisor.
                    for ( ; remL < yL; rem[remL++] = 0 );
                    yz = yc.slice();
                    yz = [0].concat(yz);
                    yc0 = yc[0];
                    if ( yc[1] >= base / 2 ) yc0++;
                    // Not necessary, but to prevent trial digit n > base, when using base 3.
                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

                    do {
                        n = 0;

                        // Compare divisor and remainder.
                        cmp = compare( yc, rem, yL, remL );

                        // If divisor < remainder.
                        if ( cmp < 0 ) {

                            // Calculate trial digit, n.

                            rem0 = rem[0];
                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );

                            // n is how many times the divisor goes into the current remainder.
                            n = mathfloor( rem0 / yc0 );

                            //  Algorithm:
                            //  1. product = divisor * trial digit (n)
                            //  2. if product > remainder: product -= divisor, n--
                            //  3. remainder -= product
                            //  4. if product was < remainder at 2:
                            //    5. compare new remainder and divisor
                            //    6. If remainder > divisor: remainder -= divisor, n++

                            if ( n > 1 ) {

                                // n may be > base only when base is 3.
                                if (n >= base) n = base - 1;

                                // product = divisor * trial digit.
                                prod = multiply( yc, n, base );
                                prodL = prod.length;
                                remL = rem.length;

                                // Compare product and remainder.
                                // If product > remainder.
                                // Trial digit n too high.
                                // n is 1 too high about 5% of the time, and is not known to have
                                // ever been more than 1 too high.
                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
                                    n--;

                                    // Subtract divisor from product.
                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
                                    prodL = prod.length;
                                    cmp = 1;
                                }
                            } else {

                                // n is 0 or 1, cmp is -1.
                                // If n is 0, there is no need to compare yc and rem again below,
                                // so change cmp to 1 to avoid it.
                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                                if ( n == 0 ) {

                                    // divisor < remainder, so n must be at least 1.
                                    cmp = n = 1;
                                }

                                // product = divisor
                                prod = yc.slice();
                                prodL = prod.length;
                            }

                            if ( prodL < remL ) prod = [0].concat(prod);

                            // Subtract product from remainder.
                            subtract( rem, prod, remL, base );
                            remL = rem.length;

                             // If product was < remainder.
                            if ( cmp == -1 ) {

                                // Compare divisor and new remainder.
                                // If divisor < new remainder, subtract divisor from remainder.
                                // Trial digit n too low.
                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                                while ( compare( yc, rem, yL, remL ) < 1 ) {
                                    n++;

                                    // Subtract divisor from remainder.
                                    subtract( rem, yL < remL ? yz : yc, remL, base );
                                    remL = rem.length;
                                }
                            }
                        } else if ( cmp === 0 ) {
                            n++;
                            rem = [0];
                        } // else cmp === 1 and n will be 0

                        // Add the next digit, n, to the result array.
                        qc[i++] = n;

                        // Update the remainder.
                        if ( rem[0] ) {
                            rem[remL++] = xc[xi] || 0;
                        } else {
                            rem = [ xc[xi] ];
                            remL = 1;
                        }
                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );

                    more = rem[0] != null;

                    // Leading zero?
                    if ( !qc[0] ) qc.splice(0, 1);
                }

                if ( base == BASE ) {

                    // To calculate q.e, first get the number of digits of qc[0].
                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );

                // Caller is convertBase.
                } else {
                    q.e = e;
                    q.r = +more;
                }

                return q;
            };
        })();


        /*
         * Return a string representing the value of BigNumber n in fixed-point or exponential
         * notation rounded to the specified decimal places or significant digits.
         *
         * n is a BigNumber.
         * i is the index of the last digit required (i.e. the digit that may be rounded up).
         * rm is the rounding mode.
         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
         */
        function format( n, i, rm, caller ) {
            var c0, e, ne, len, str;

            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
              ? rm | 0 : ROUNDING_MODE;

            if ( !n.c ) return n.toString();
            c0 = n.c[0];
            ne = n.e;

            if ( i == null ) {
                str = coeffToString( n.c );
                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
                  ? toExponential( str, ne )
                  : toFixedPoint( str, ne );
            } else {
                n = round( new BigNumber(n), i, rm );

                // n.e may have changed if the value was rounded up.
                e = n.e;

                str = coeffToString( n.c );
                len = str.length;

                // toPrecision returns exponential notation if the number of significant digits
                // specified is less than the number of digits necessary to represent the integer
                // part of the value in fixed-point notation.

                // Exponential notation.
                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {

                    // Append zeros?
                    for ( ; len < i; str += '0', len++ );
                    str = toExponential( str, e );

                // Fixed-point notation.
                } else {
                    i -= ne;
                    str = toFixedPoint( str, e );

                    // Append zeros?
                    if ( e + 1 > len ) {
                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
                    } else {
                        i += e - len;
                        if ( i > 0 ) {
                            if ( e + 1 == len ) str += '.';
                            for ( ; i--; str += '0' );
                        }
                    }
                }
            }

            return n.s < 0 && c0 ? '-' + str : str;
        }


        // Handle BigNumber.max and BigNumber.min.
        function maxOrMin( args, method ) {
            var m, n,
                i = 0;

            if ( isArray( args[0] ) ) args = args[0];
            m = new BigNumber( args[0] );

            for ( ; ++i < args.length; ) {
                n = new BigNumber( args[i] );

                // If any number is NaN, return NaN.
                if ( !n.s ) {
                    m = n;
                    break;
                } else if ( method.call( m, n ) ) {
                    m = n;
                }
            }

            return m;
        }


        /*
         * Return true if n is an integer in range, otherwise throw.
         * Use for argument validation when ERRORS is true.
         */
        function intValidatorWithErrors( n, min, max, caller, name ) {
            if ( n < min || n > max || n != truncate(n) ) {
                raise( caller, ( name || 'decimal places' ) +
                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
            }

            return true;
        }


        /*
         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
         * Called by minus, plus and times.
         */
        function normalise( n, c, e ) {
            var i = 1,
                j = c.length;

             // Remove trailing zeros.
            for ( ; !c[--j]; c.pop() );

            // Calculate the base 10 exponent. First get the number of digits of c[0].
            for ( j = c[0]; j >= 10; j /= 10, i++ );

            // Overflow?
            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {

                // Infinity.
                n.c = n.e = null;

            // Underflow?
            } else if ( e < MIN_EXP ) {

                // Zero.
                n.c = [ n.e = 0 ];
            } else {
                n.e = e;
                n.c = c;
            }

            return n;
        }


        // Handle values that fail the validity test in BigNumber.
        parseNumeric = (function () {
            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
                dotAfter = /^([^.]+)\.$/,
                dotBefore = /^\.([^.]+)$/,
                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
                whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

            return function ( x, str, num, b ) {
                var base,
                    s = num ? str : str.replace( whitespaceOrPlus, '' );

                // No exception on ±Infinity or NaN.
                if ( isInfinityOrNaN.test(s) ) {
                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
                } else {
                    if ( !num ) {

                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                            return !b || b == base ? p1 : m;
                        });

                        if (b) {
                            base = b;

                            // E.g. '1.' to '1', '.1' to '0.1'
                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
                        }

                        if ( str != s ) return new BigNumber( s, base );
                    }

                    // 'new BigNumber() not a number: {n}'
                    // 'new BigNumber() not a base {b} number: {n}'
                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
                    x.s = null;
                }

                x.c = x.e = null;
                id = 0;
            }
        })();


        // Throw a BigNumber Error.
        function raise( caller, msg, val ) {
            var error = new Error( [
                'new BigNumber',     // 0
                'cmp',               // 1
                'config',            // 2
                'div',               // 3
                'divToInt',          // 4
                'eq',                // 5
                'gt',                // 6
                'gte',               // 7
                'lt',                // 8
                'lte',               // 9
                'minus',             // 10
                'mod',               // 11
                'plus',              // 12
                'precision',         // 13
                'random',            // 14
                'round',             // 15
                'shift',             // 16
                'times',             // 17
                'toDigits',          // 18
                'toExponential',     // 19
                'toFixed',           // 20
                'toFormat',          // 21
                'toFraction',        // 22
                'pow',               // 23
                'toPrecision',       // 24
                'toString',          // 25
                'BigNumber'          // 26
            ][caller] + '() ' + msg + ': ' + val );

            error.name = 'BigNumber Error';
            id = 0;
            throw error;
        }


        /*
         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
         * If r is truthy, it is known that there are more digits after the rounding digit.
         */
        function round( x, sd, rm, r ) {
            var d, i, j, k, n, ni, rd,
                xc = x.c,
                pows10 = POWS_TEN;

            // if x is not Infinity or NaN...
            if (xc) {

                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
                // n is a base 1e14 number, the value of the element of array x.c containing rd.
                // ni is the index of n within x.c.
                // d is the number of digits of n.
                // i is the index of rd within n including leading zeros.
                // j is the actual index of rd within n (if < 0, rd is a leading zero).
                out: {

                    // Get the number of digits of the first element of xc.
                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
                    i = sd - d;

                    // If the rounding digit is in the first element of xc...
                    if ( i < 0 ) {
                        i += LOG_BASE;
                        j = sd;
                        n = xc[ ni = 0 ];

                        // Get the rounding digit at index j of n.
                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
                    } else {
                        ni = mathceil( ( i + 1 ) / LOG_BASE );

                        if ( ni >= xc.length ) {

                            if (r) {

                                // Needed by sqrt.
                                for ( ; xc.length <= ni; xc.push(0) );
                                n = rd = 0;
                                d = 1;
                                i %= LOG_BASE;
                                j = i - LOG_BASE + 1;
                            } else {
                                break out;
                            }
                        } else {
                            n = k = xc[ni];

                            // Get the number of digits of n.
                            for ( d = 1; k >= 10; k /= 10, d++ );

                            // Get the index of rd within n.
                            i %= LOG_BASE;

                            // Get the index of rd within n, adjusted for leading zeros.
                            // The number of leading zeros of n is given by LOG_BASE - d.
                            j = i - LOG_BASE + d;

                            // Get the rounding digit at index j of n.
                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
                        }
                    }

                    r = r || sd < 0 ||

                    // Are there any non-zero digits after the rounding digit?
                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );

                    r = rm < 4
                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&

                        // Check whether the digit to the left of the rounding digit is odd.
                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
                          rm == ( x.s < 0 ? 8 : 7 ) );

                    if ( sd < 1 || !xc[0] ) {
                        xc.length = 0;

                        if (r) {

                            // Convert sd to decimal places.
                            sd -= x.e + 1;

                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                            xc[0] = pows10[ ( LOG_BASE - sd % LOG_BASE ) % LOG_BASE ];
                            x.e = -sd || 0;
                        } else {

                            // Zero.
                            xc[0] = x.e = 0;
                        }

                        return x;
                    }

                    // Remove excess digits.
                    if ( i == 0 ) {
                        xc.length = ni;
                        k = 1;
                        ni--;
                    } else {
                        xc.length = ni + 1;
                        k = pows10[ LOG_BASE - i ];

                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                        // j > 0 means i > number of leading zeros of n.
                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
                    }

                    // Round up?
                    if (r) {

                        for ( ; ; ) {

                            // If the digit to be rounded up is in the first element of xc...
                            if ( ni == 0 ) {

                                // i will be the length of xc[0] before k is added.
                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
                                j = xc[0] += k;
                                for ( k = 1; j >= 10; j /= 10, k++ );

                                // if i != k the length has increased.
                                if ( i != k ) {
                                    x.e++;
                                    if ( xc[0] == BASE ) xc[0] = 1;
                                }

                                break;
                            } else {
                                xc[ni] += k;
                                if ( xc[ni] != BASE ) break;
                                xc[ni--] = 0;
                                k = 1;
                            }
                        }
                    }

                    // Remove trailing zeros.
                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
                }

                // Overflow? Infinity.
                if ( x.e > MAX_EXP ) {
                    x.c = x.e = null;

                // Underflow? Zero.
                } else if ( x.e < MIN_EXP ) {
                    x.c = [ x.e = 0 ];
                }
            }

            return x;
        }


        // PROTOTYPE/INSTANCE METHODS


        /*
         * Return a new BigNumber whose value is the absolute value of this BigNumber.
         */
        P.absoluteValue = P.abs = function () {
            var x = new BigNumber(this);
            if ( x.s < 0 ) x.s = 1;
            return x;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of Infinity.
         */
        P.ceil = function () {
            return round( new BigNumber(this), this.e + 1, 2 );
        };


        /*
         * Return
         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
         * 0 if they have the same value,
         * or null if the value of either is NaN.
         */
        P.comparedTo = P.cmp = function ( y, b ) {
            id = 1;
            return compare( this, new BigNumber( y, b ) );
        };


        /*
         * Return the number of decimal places of the value of this BigNumber, or null if the value
         * of this BigNumber is ±Infinity or NaN.
         */
        P.decimalPlaces = P.dp = function () {
            var n, v,
                c = this.c;

            if ( !c ) return null;
            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;

            // Subtract the number of trailing zeros of the last number.
            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
            if ( n < 0 ) n = 0;

            return n;
        };


        /*
         *  n / 0 = I
         *  n / N = N
         *  n / I = 0
         *  0 / n = 0
         *  0 / 0 = N
         *  0 / N = N
         *  0 / I = 0
         *  N / n = N
         *  N / 0 = N
         *  N / N = N
         *  N / I = N
         *  I / n = I
         *  I / 0 = I
         *  I / N = N
         *  I / I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.dividedBy = P.div = function ( y, b ) {
            id = 3;
            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
        };


        /*
         * Return a new BigNumber whose value is the integer part of dividing the value of this
         * BigNumber by the value of BigNumber(y, b).
         */
        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
            id = 4;
            return div( this, new BigNumber( y, b ), 0, 1 );
        };


        /*
         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.equals = P.eq = function ( y, b ) {
            id = 5;
            return compare( this, new BigNumber( y, b ) ) === 0;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of -Infinity.
         */
        P.floor = function () {
            return round( new BigNumber(this), this.e + 1, 3 );
        };


        /*
         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.greaterThan = P.gt = function ( y, b ) {
            id = 6;
            return compare( this, new BigNumber( y, b ) ) > 0;
        };


        /*
         * Return true if the value of this BigNumber is greater than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
            id = 7;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;

        };


        /*
         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
         */
        P.isFinite = function () {
            return !!this.c;
        };


        /*
         * Return true if the value of this BigNumber is an integer, otherwise return false.
         */
        P.isInteger = P.isInt = function () {
            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
        };


        /*
         * Return true if the value of this BigNumber is NaN, otherwise returns false.
         */
        P.isNaN = function () {
            return !this.s;
        };


        /*
         * Return true if the value of this BigNumber is negative, otherwise returns false.
         */
        P.isNegative = P.isNeg = function () {
            return this.s < 0;
        };


        /*
         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
         */
        P.isZero = function () {
            return !!this.c && this.c[0] == 0;
        };


        /*
         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.lessThan = P.lt = function ( y, b ) {
            id = 8;
            return compare( this, new BigNumber( y, b ) ) < 0;
        };


        /*
         * Return true if the value of this BigNumber is less than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
            id = 9;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
        };


        /*
         *  n - 0 = n
         *  n - N = N
         *  n - I = -I
         *  0 - n = -n
         *  0 - 0 = 0
         *  0 - N = N
         *  0 - I = -I
         *  N - n = N
         *  N - 0 = N
         *  N - N = N
         *  N - I = N
         *  I - n = I
         *  I - 0 = I
         *  I - N = N
         *  I - I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
         * BigNumber(y, b).
         */
        P.minus = P.sub = function ( y, b ) {
            var i, j, t, xLTy,
                x = this,
                a = x.s;

            id = 10;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
            if ( a != b ) {
                y.s = -b;
                return x.plus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Either Infinity?
                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );

                // Either zero?
                if ( !xc[0] || !yc[0] ) {

                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :

                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                      ROUNDING_MODE == 3 ? -0 : 0 );
                }
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Determine which is the bigger number.
            if ( a = xe - ye ) {

                if ( xLTy = a < 0 ) {
                    a = -a;
                    t = xc;
                } else {
                    ye = xe;
                    t = yc;
                }

                t.reverse();

                // Prepend zeros to equalise exponents.
                for ( b = a; b--; t.push(0) );
                t.reverse();
            } else {

                // Exponents equal. Check digit by digit.
                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;

                for ( a = b = 0; b < j; b++ ) {

                    if ( xc[b] != yc[b] ) {
                        xLTy = xc[b] < yc[b];
                        break;
                    }
                }
            }

            // x < y? Point xc to the array of the bigger number.
            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

            b = ( j = yc.length ) - ( i = xc.length );

            // Append zeros to xc if shorter.
            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
            b = BASE - 1;

            // Subtract yc from xc.
            for ( ; j > a; ) {

                if ( xc[--j] < yc[j] ) {
                    for ( i = j; i && !xc[--i]; xc[i] = b );
                    --xc[i];
                    xc[j] += BASE;
                }

                xc[j] -= yc[j];
            }

            // Remove leading zeros and adjust exponent accordingly.
            for ( ; xc[0] == 0; xc.splice(0, 1), --ye );

            // Zero?
            if ( !xc[0] ) {

                // Following IEEE 754 (2008) 6.3,
                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
                y.s = ROUNDING_MODE == 3 ? -1 : 1;
                y.c = [ y.e = 0 ];
                return y;
            }

            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
            // for finite x and y.
            return normalise( y, xc, ye );
        };


        /*
         *   n % 0 =  N
         *   n % N =  N
         *   n % I =  n
         *   0 % n =  0
         *  -0 % n = -0
         *   0 % 0 =  N
         *   0 % N =  N
         *   0 % I =  0
         *   N % n =  N
         *   N % 0 =  N
         *   N % N =  N
         *   N % I =  N
         *   I % n =  N
         *   I % 0 =  N
         *   I % N =  N
         *   I % I =  N
         *
         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
         */
        P.modulo = P.mod = function ( y, b ) {
            var q, s,
                x = this;

            id = 11;
            y = new BigNumber( y, b );

            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
            if ( !x.c || !y.s || y.c && !y.c[0] ) {
                return new BigNumber(NaN);

            // Return x if y is Infinity or x is zero.
            } else if ( !y.c || x.c && !x.c[0] ) {
                return new BigNumber(x);
            }

            if ( MODULO_MODE == 9 ) {

                // Euclidian division: q = sign(y) * floor(x / abs(y))
                // r = x - qy    where  0 <= r < abs(y)
                s = y.s;
                y.s = 1;
                q = div( x, y, 0, 3 );
                y.s = s;
                q.s *= s;
            } else {
                q = div( x, y, 0, MODULO_MODE );
            }

            return x.minus( q.times(y) );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber negated,
         * i.e. multiplied by -1.
         */
        P.negated = P.neg = function () {
            var x = new BigNumber(this);
            x.s = -x.s || null;
            return x;
        };


        /*
         *  n + 0 = n
         *  n + N = N
         *  n + I = I
         *  0 + n = n
         *  0 + 0 = 0
         *  0 + N = N
         *  0 + I = I
         *  N + n = N
         *  N + 0 = N
         *  N + N = N
         *  N + I = N
         *  I + n = I
         *  I + 0 = I
         *  I + N = N
         *  I + I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
         * BigNumber(y, b).
         */
        P.plus = P.add = function ( y, b ) {
            var t,
                x = this,
                a = x.s;

            id = 12;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
             if ( a != b ) {
                y.s = -b;
                return x.minus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Return ±Infinity if either ±Infinity.
                if ( !xc || !yc ) return new BigNumber( a / 0 );

                // Either zero?
                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
            if ( a = xe - ye ) {
                if ( a > 0 ) {
                    ye = xe;
                    t = yc;
                } else {
                    a = -a;
                    t = xc;
                }

                t.reverse();
                for ( ; a--; t.push(0) );
                t.reverse();
            }

            a = xc.length;
            b = yc.length;

            // Point xc to the longer array, and b to the shorter length.
            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;

            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
            for ( a = 0; b; ) {
                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
                xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
            }

            if (a) {
                xc = [a].concat(xc);
                ++ye;
            }

            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
            // ye = MAX_EXP + 1 possible
            return normalise( y, xc, ye );
        };


        /*
         * Return the number of significant digits of the value of this BigNumber.
         *
         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
         */
        P.precision = P.sd = function (z) {
            var n, v,
                x = this,
                c = x.c;

            // 'precision() argument not a boolean or binary digit: {z}'
            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
                if (ERRORS) raise( 13, 'argument' + notBool, z );
                if ( z != !!z ) z = null;
            }

            if ( !c ) return null;
            v = c.length - 1;
            n = v * LOG_BASE + 1;

            if ( v = c[v] ) {

                // Subtract the number of trailing zeros of the last element.
                for ( ; v % 10 == 0; v /= 10, n-- );

                // Add the number of digits of the first element.
                for ( v = c[0]; v >= 10; v /= 10, n++ );
            }

            if ( z && x.e + 1 > n ) n = x.e + 1;

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
         * omitted.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'round() decimal places out of range: {dp}'
         * 'round() decimal places not an integer: {dp}'
         * 'round() rounding mode not an integer: {rm}'
         * 'round() rounding mode out of range: {rm}'
         */
        P.round = function ( dp, rm ) {
            var n = new BigNumber(this);

            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
                round( n, ~~dp + this.e + 1, rm == null ||
                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
            }

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
         *
         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         *
         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
         * otherwise.
         *
         * 'shift() argument not an integer: {k}'
         * 'shift() argument out of range: {k}'
         */
        P.shift = function (k) {
            var n = this;
            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )

              // k < 1e+21, or truncate(k) will produce exponential notation.
              ? n.times( '1e' + truncate(k) )
              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
                ? n.s * ( k < 0 ? 0 : 1 / 0 )
                : n );
        };


        /*
         *  sqrt(-n) =  N
         *  sqrt( N) =  N
         *  sqrt(-I) =  N
         *  sqrt( I) =  I
         *  sqrt( 0) =  0
         *  sqrt(-0) = -0
         *
         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.squareRoot = P.sqrt = function () {
            var m, n, r, rep, t,
                x = this,
                c = x.c,
                s = x.s,
                e = x.e,
                dp = DECIMAL_PLACES + 4,
                half = new BigNumber('0.5');

            // Negative/NaN/Infinity/zero?
            if ( s !== 1 || !c || !c[0] ) {
                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
            }

            // Initial estimate.
            s = Math.sqrt( +x );

            // Math.sqrt underflow/overflow?
            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
            if ( s == 0 || s == 1 / 0 ) {
                n = coeffToString(c);
                if ( ( n.length + e ) % 2 == 0 ) n += '0';
                s = Math.sqrt(n);
                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );

                if ( s == 1 / 0 ) {
                    n = '1e' + e;
                } else {
                    n = s.toExponential();
                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
                }

                r = new BigNumber(n);
            } else {
                r = new BigNumber( s + '' );
            }

            // Check for zero.
            // r could be zero if MIN_EXP is changed after the this value was created.
            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
            // coeffToString to throw.
            if ( r.c[0] ) {
                e = r.e;
                s = e + dp;
                if ( s < 3 ) s = 0;

                // Newton-Raphson iteration.
                for ( ; ; ) {
                    t = r;
                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );

                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
                         coeffToString( r.c ) ).slice( 0, s ) ) {

                        // The exponent of r may here be one less than the final result exponent,
                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
                        // are indexed correctly.
                        if ( r.e < e ) --s;
                        n = n.slice( s - 3, s + 1 );

                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
                        // iteration.
                        if ( n == '9999' || !rep && n == '4999' ) {

                            // On the first iteration only, check to see if rounding up gives the
                            // exact result as the nines may infinitely repeat.
                            if ( !rep ) {
                                round( t, t.e + DECIMAL_PLACES + 2, 0 );

                                if ( t.times(t).eq(x) ) {
                                    r = t;
                                    break;
                                }
                            }

                            dp += 4;
                            s += 4;
                            rep = 1;
                        } else {

                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
                            // result. If not, then there are further digits and m will be truthy.
                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {

                                // Truncate to the first rounding digit.
                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
                                m = !r.times(r).eq(x);
                            }

                            break;
                        }
                    }
                }
            }

            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
        };


        /*
         *  n * 0 = 0
         *  n * N = N
         *  n * I = I
         *  0 * n = 0
         *  0 * 0 = 0
         *  0 * N = N
         *  0 * I = N
         *  N * n = N
         *  N * 0 = N
         *  N * N = N
         *  N * I = N
         *  I * n = I
         *  I * 0 = N
         *  I * N = N
         *  I * I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber times the value of
         * BigNumber(y, b).
         */
        P.times = P.mul = function ( y, b ) {
            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
                base, sqrtBase,
                x = this,
                xc = x.c,
                yc = ( id = 17, y = new BigNumber( y, b ) ).c;

            // Either NaN, ±Infinity or ±0?
            if ( !xc || !yc || !xc[0] || !yc[0] ) {

                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
                    y.c = y.e = y.s = null;
                } else {
                    y.s *= x.s;

                    // Return ±Infinity if either is ±Infinity.
                    if ( !xc || !yc ) {
                        y.c = y.e = null;

                    // Return ±0 if either is ±0.
                    } else {
                        y.c = [0];
                        y.e = 0;
                    }
                }

                return y;
            }

            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
            y.s *= x.s;
            xcL = xc.length;
            ycL = yc.length;

            // Ensure xc points to longer array and xcL to its length.
            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

            // Initialise the result array with zeros.
            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );

            base = BASE;
            sqrtBase = SQRT_BASE;

            for ( i = ycL; --i >= 0; ) {
                c = 0;
                ylo = yc[i] % sqrtBase;
                yhi = yc[i] / sqrtBase | 0;

                for ( k = xcL, j = i + k; j > i; ) {
                    xlo = xc[--k] % sqrtBase;
                    xhi = xc[k] / sqrtBase | 0;
                    m = yhi * xlo + xhi * ylo;
                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
                    zc[j--] = xlo % base;
                }

                zc[j] = c;
            }

            if (c) {
                ++e;
            } else {
                zc.splice(0, 1);
            }

            return normalise( y, zc, e );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toDigits() precision out of range: {sd}'
         * 'toDigits() precision not an integer: {sd}'
         * 'toDigits() rounding mode not an integer: {rm}'
         * 'toDigits() rounding mode out of range: {rm}'
         */
        P.toDigits = function ( sd, rm ) {
            var n = new BigNumber(this);
            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
            return sd ? round( n, sd, rm ) : n;
        };


        /*
         * Return a string representing the value of this BigNumber in exponential notation and
         * rounded using ROUNDING_MODE to dp fixed decimal places.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toExponential() decimal places not an integer: {dp}'
         * 'toExponential() decimal places out of range: {dp}'
         * 'toExponential() rounding mode not an integer: {rm}'
         * 'toExponential() rounding mode out of range: {rm}'
         */
        P.toExponential = function ( dp, rm ) {
            return format( this,
              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounding
         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
         * but e.g. (-0.00001).toFixed(0) is '-0'.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFixed() decimal places not an integer: {dp}'
         * 'toFixed() decimal places out of range: {dp}'
         * 'toFixed() rounding mode not an integer: {rm}'
         * 'toFixed() rounding mode out of range: {rm}'
         */
        P.toFixed = function ( dp, rm ) {
            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
              ? ~~dp + this.e + 1 : null, rm, 20 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounded
         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
         * of the FORMAT object (see BigNumber.config).
         *
         * FORMAT = {
         *      decimalSeparator : '.',
         *      groupSeparator : ',',
         *      groupSize : 3,
         *      secondaryGroupSize : 0,
         *      fractionGroupSeparator : '\xA0',    // non-breaking space
         *      fractionGroupSize : 0
         * };
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFormat() decimal places not an integer: {dp}'
         * 'toFormat() decimal places out of range: {dp}'
         * 'toFormat() rounding mode not an integer: {rm}'
         * 'toFormat() rounding mode out of range: {rm}'
         */
        P.toFormat = function ( dp, rm ) {
            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
              ? ~~dp + this.e + 1 : null, rm, 21 );

            if ( this.c ) {
                var i,
                    arr = str.split('.'),
                    g1 = +FORMAT.groupSize,
                    g2 = +FORMAT.secondaryGroupSize,
                    groupSeparator = FORMAT.groupSeparator,
                    intPart = arr[0],
                    fractionPart = arr[1],
                    isNeg = this.s < 0,
                    intDigits = isNeg ? intPart.slice(1) : intPart,
                    len = intDigits.length;

                if (g2) i = g1, g1 = g2, g2 = i, len -= i;

                if ( g1 > 0 && len > 0 ) {
                    i = len % g1 || g1;
                    intPart = intDigits.substr( 0, i );

                    for ( ; i < len; i += g1 ) {
                        intPart += groupSeparator + intDigits.substr( i, g1 );
                    }

                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
                    if (isNeg) intPart = '-' + intPart;
                }

                str = fractionPart
                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
                      '$&' + FORMAT.fractionGroupSeparator )
                    : fractionPart )
                  : intPart;
            }

            return str;
        };


        /*
         * Return a string array representing the value of this BigNumber as a simple fraction with
         * an integer numerator and an integer denominator. The denominator will be a positive
         * non-zero value less than or equal to the specified maximum denominator. If a maximum
         * denominator is not specified, the denominator will be the lowest value necessary to
         * represent the number exactly.
         *
         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
         *
         * 'toFraction() max denominator not an integer: {md}'
         * 'toFraction() max denominator out of range: {md}'
         */
        P.toFraction = function (md) {
            var arr, d0, d2, e, exp, n, n0, q, s,
                k = ERRORS,
                x = this,
                xc = x.c,
                d = new BigNumber(ONE),
                n1 = d0 = new BigNumber(ONE),
                d1 = n0 = new BigNumber(ONE);

            if ( md != null ) {
                ERRORS = false;
                n = new BigNumber(md);
                ERRORS = k;

                if ( !( k = n.isInt() ) || n.lt(ONE) ) {

                    if (ERRORS) {
                        raise( 22,
                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
                    }

                    // ERRORS is false:
                    // If md is a finite non-integer >= 1, round it to an integer and use it.
                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
                }
            }

            if ( !xc ) return x.toString();
            s = coeffToString(xc);

            // Determine initial denominator.
            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
            e = d.e = s.length - x.e - 1;
            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;

            exp = MAX_EXP;
            MAX_EXP = 1 / 0;
            n = new BigNumber(s);

            // n0 = d1 = 0
            n0.c[0] = 0;

            for ( ; ; )  {
                q = div( n, d, 0, 1 );
                d2 = d0.plus( q.times(d1) );
                if ( d2.cmp(md) == 1 ) break;
                d0 = d1;
                d1 = d2;
                n1 = n0.plus( q.times( d2 = n1 ) );
                n0 = d2;
                d = n.minus( q.times( d2 = d ) );
                n = d2;
            }

            d2 = div( md.minus(d0), d1, 0, 1 );
            n0 = n0.plus( d2.times(n1) );
            d0 = d0.plus( d2.times(d1) );
            n0.s = n1.s = x.s;
            e *= 2;

            // Determine which fraction is closer to x, n0/d0 or n1/d1
            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
                    ? [ n1.toString(), d1.toString() ]
                    : [ n0.toString(), d0.toString() ];

            MAX_EXP = exp;
            return arr;
        };


        /*
         * Return the value of this BigNumber converted to a number primitive.
         */
        P.toNumber = function () {
            return +this;
        };


        /*
         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
         * If m is present, return the result modulo m.
         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
         * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using
         * ROUNDING_MODE.
         *
         * The modular power operation works efficiently when x, n, and m are positive integers,
         * otherwise it is equivalent to calculating x.toPower(n).modulo(m) (with POW_PRECISION 0).
         *
         * n {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         * [m] {number|string|BigNumber} The modulus.
         *
         * 'pow() exponent not an integer: {n}'
         * 'pow() exponent out of range: {n}'
         *
         * Performs 54 loop iterations for n of 9007199254740991.
         */
        P.toPower = P.pow = function ( n, m ) {
            var k, y, z,
                i = mathfloor( n < 0 ? -n : +n ),
                x = this;

            if ( m != null ) {
                id = 23;
                m = new BigNumber(m);
            }

            // Pass ±Infinity to Math.pow if exponent is out of range.
            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
                parseFloat(n) != n && !( n = NaN ) ) || n == 0 ) {
                k = Math.pow( +x, n );
                return new BigNumber( m ? k % m : k );
            }

            if (m) {
                if ( n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt() ) {
                    x = x.mod(m);
                } else {
                    z = m;

                    // Nullify m so only a single mod operation is performed at the end.
                    m = null;
                }
            } else if (POW_PRECISION) {

                // Truncating each coefficient array to a length of k after each multiplication
                // equates to truncating significant digits to POW_PRECISION + [28, 41],
                // i.e. there will be a minimum of 28 guard digits retained.
                // (Using + 1.5 would give [9, 21] guard digits.)
                k = mathceil( POW_PRECISION / LOG_BASE + 2 );
            }

            y = new BigNumber(ONE);

            for ( ; ; ) {
                if ( i % 2 ) {
                    y = y.times(x);
                    if ( !y.c ) break;
                    if (k) {
                        if ( y.c.length > k ) y.c.length = k;
                    } else if (m) {
                        y = y.mod(m);
                    }
                }

                i = mathfloor( i / 2 );
                if ( !i ) break;
                x = x.times(x);
                if (k) {
                    if ( x.c && x.c.length > k ) x.c.length = k;
                } else if (m) {
                    x = x.mod(m);
                }
            }

            if (m) return y;
            if ( n < 0 ) y = ONE.div(y);

            return z ? y.mod(z) : k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
        };


        /*
         * Return a string representing the value of this BigNumber rounded to sd significant digits
         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
         * necessary to represent the integer part of the value in fixed-point notation, then use
         * exponential notation.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toPrecision() precision not an integer: {sd}'
         * 'toPrecision() precision out of range: {sd}'
         * 'toPrecision() rounding mode not an integer: {rm}'
         * 'toPrecision() rounding mode out of range: {rm}'
         */
        P.toPrecision = function ( sd, rm ) {
            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
              ? sd | 0 : null, rm, 24 );
        };


        /*
         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
         * TO_EXP_NEG, return exponential notation.
         *
         * [b] {number} Integer, 2 to 64 inclusive.
         *
         * 'toString() base not an integer: {b}'
         * 'toString() base out of range: {b}'
         */
        P.toString = function (b) {
            var str,
                n = this,
                s = n.s,
                e = n.e;

            // Infinity or NaN?
            if ( e === null ) {

                if (s) {
                    str = 'Infinity';
                    if ( s < 0 ) str = '-' + str;
                } else {
                    str = 'NaN';
                }
            } else {
                str = coeffToString( n.c );

                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                      ? toExponential( str, e )
                      : toFixedPoint( str, e );
                } else {
                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
                }

                if ( s < 0 && n.c[0] ) str = '-' + str;
            }

            return str;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
         * number.
         */
        P.truncated = P.trunc = function () {
            return round( new BigNumber(this), this.e + 1, 1 );
        };


        /*
         * Return as toString, but do not accept a base argument, and include the minus sign for
         * negative zero.
         */
        P.valueOf = P.toJSON = function () {
            var str,
                n = this,
                e = n.e;

            if ( e === null ) return n.toString();

            str = coeffToString( n.c );

            str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                ? toExponential( str, e )
                : toFixedPoint( str, e );

            return n.s < 0 ? '-' + str : str;
        };


        P.isBigNumber = true;

        if ( config != null ) BigNumber.config(config);

        return BigNumber;
    }


    // PRIVATE HELPER FUNCTIONS


    function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
    }


    // Return a coefficient array as a string of base 10 digits.
    function coeffToString(a) {
        var s, z,
            i = 1,
            j = a.length,
            r = a[0] + '';

        for ( ; i < j; ) {
            s = a[i++] + '';
            z = LOG_BASE - s.length;
            for ( ; z--; s = '0' + s );
            r += s;
        }

        // Determine trailing zeros.
        for ( j = r.length; r.charCodeAt(--j) === 48; );
        return r.slice( 0, j + 1 || 1 );
    }


    // Compare the value of BigNumbers x and y.
    function compare( x, y ) {
        var a, b,
            xc = x.c,
            yc = y.c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e;

        // Either NaN?
        if ( !i || !j ) return null;

        a = xc && !xc[0];
        b = yc && !yc[0];

        // Either zero?
        if ( a || b ) return a ? b ? 0 : -j : i;

        // Signs differ?
        if ( i != j ) return i;

        a = i < 0;
        b = k == l;

        // Either Infinity?
        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;

        // Compare exponents.
        if ( !b ) return k > l ^ a ? 1 : -1;

        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;

        // Compare digit by digit.
        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;

        // Compare lengths.
        return k == l ? 0 : k > l ^ a ? 1 : -1;
    }


    /*
     * Return true if n is a valid number in range, otherwise false.
     * Use for argument validation when ERRORS is false.
     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
     */
    function intValidatorNoErrors( n, min, max ) {
        return ( n = truncate(n) ) >= min && n <= max;
    }


    function isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    }


    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. convertBase('255', 10, 16) returns [15, 15].
     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut( str, baseIn, baseOut ) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for ( ; i < len; ) {
            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );

            for ( ; j < arr.length; j++ ) {

                if ( arr[j] > baseOut - 1 ) {
                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
                    arr[j + 1] += arr[j] / baseOut | 0;
                    arr[j] %= baseOut;
                }
            }
        }

        return arr.reverse();
    }


    function toExponential( str, e ) {
        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
          ( e < 0 ? 'e' : 'e+' ) + e;
    }


    function toFixedPoint( str, e ) {
        var len, z;

        // Negative exponent?
        if ( e < 0 ) {

            // Prepend zeros.
            for ( z = '0.'; ++e; z += '0' );
            str = z + str;

        // Positive exponent
        } else {
            len = str.length;

            // Append zeros.
            if ( ++e > len ) {
                for ( z = '0', e -= len; --e; z += '0' );
                str += z;
            } else if ( e < len ) {
                str = str.slice( 0, e ) + '.' + str.slice(e);
            }
        }

        return str;
    }


    function truncate(n) {
        n = parseFloat(n);
        return n < 0 ? mathceil(n) : mathfloor(n);
    }


    // EXPORT


    BigNumber = constructorFactory();
    BigNumber['default'] = BigNumber.BigNumber = BigNumber;


    // AMD.
    if ( true ) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return BigNumber; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    // Node.js and other environments that support module.exports.
    } else if ( typeof module != 'undefined' && module.exports ) {
        module.exports = BigNumber;

    // Browser.
    } else {
        if ( !globalObj ) globalObj = typeof self != 'undefined' ? self : Function('return this')();
        globalObj.BigNumber = BigNumber;
    }
})(this);


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(102)
var ieee754 = __webpack_require__(172)
var isArray = __webpack_require__(105)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 105 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
__webpack_require__(145);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(22);
module.exports = __webpack_require__(144);


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
__webpack_require__(22);
__webpack_require__(31);
__webpack_require__(147);
__webpack_require__(162);
__webpack_require__(161);
__webpack_require__(160);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
module.exports = __webpack_require__(0).Number.isInteger;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
module.exports = __webpack_require__(0).Number.isNaN;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
module.exports = 0x1fffffffffffff;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(151);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(152);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(153);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(154);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(155);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyNames(it) {
  return $Object.getOwnPropertyNames(it);
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(157);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
__webpack_require__(22);
__webpack_require__(31);
__webpack_require__(158);
__webpack_require__(163);
__webpack_require__(164);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(167);
module.exports = __webpack_require__(0).setImmediate;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(159);
__webpack_require__(52);
__webpack_require__(165);
__webpack_require__(166);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
__webpack_require__(31);
module.exports = __webpack_require__(50).f('iterator');


/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(16);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(29);
var toAbsoluteIndex = __webpack_require__(143);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(8);
var IObject = __webpack_require__(60);
var toObject = __webpack_require__(21);
var toLength = __webpack_require__(29);
var asc = __webpack_require__(129);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(62);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(128);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(5).f;
var create = __webpack_require__(27);
var redefineAll = __webpack_require__(43);
var ctx = __webpack_require__(8);
var anInstance = __webpack_require__(35);
var forOf = __webpack_require__(16);
var $iterDefine = __webpack_require__(40);
var step = __webpack_require__(65);
var setSpecies = __webpack_require__(75);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(26).fastKey;
var validate = __webpack_require__(77);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(36);
var from = __webpack_require__(125);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(1);
var meta = __webpack_require__(26);
var fails = __webpack_require__(13);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(43);
var forOf = __webpack_require__(16);
var anInstance = __webpack_require__(35);
var isObject = __webpack_require__(4);
var setToStringTag = __webpack_require__(20);
var dP = __webpack_require__(5).f;
var each = __webpack_require__(127)(0);
var DESCRIPTORS = __webpack_require__(6);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5);
var createDesc = __webpack_require__(19);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(28);
var gOPS = __webpack_require__(69);
var pIE = __webpack_require__(42);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 135 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(27);
var descriptor = __webpack_require__(19);
var setToStringTag = __webpack_require__(20);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(46).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(15)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(28);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(14);
var ctx = __webpack_require__(8);
var forOf = __webpack_require__(16);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(47);
var defined = __webpack_require__(37);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(47);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var get = __webpack_require__(51);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(8);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(21);
var call = __webpack_require__(63);
var isArrayIter = __webpack_require__(61);
var toLength = __webpack_require__(29);
var createProperty = __webpack_require__(133);
var getIterFn = __webpack_require__(51);

$export($export.S + $export.F * !__webpack_require__(64)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(124);
var step = __webpack_require__(65);
var Iterators = __webpack_require__(17);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(40)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(130);
var validate = __webpack_require__(77);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(132)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(1);

$export($export.S, 'Number', { isInteger: __webpack_require__(136) });


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(1);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(1);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(27) });


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(26).onFreeze;

__webpack_require__(18)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(11);
var $getOwnPropertyDescriptor = __webpack_require__(66).f;

__webpack_require__(18)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(18)('getOwnPropertyNames', function () {
  return __webpack_require__(67).f;
});


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(21);
var $getPrototypeOf = __webpack_require__(70);

__webpack_require__(18)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(21);
var $keys = __webpack_require__(28);

__webpack_require__(18)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var global = __webpack_require__(2);
var ctx = __webpack_require__(8);
var classof = __webpack_require__(36);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(14);
var anInstance = __webpack_require__(35);
var forOf = __webpack_require__(16);
var speciesConstructor = __webpack_require__(76);
var task = __webpack_require__(46).set;
var microtask = __webpack_require__(138)();
var newPromiseCapabilityModule = __webpack_require__(41);
var perform = __webpack_require__(72);
var promiseResolve = __webpack_require__(73);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(43)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype['catch'](onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(20)($Promise, PROMISE);
__webpack_require__(75)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(64)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(74);
var META = __webpack_require__(26).KEY;
var $fails = __webpack_require__(13);
var shared = __webpack_require__(45);
var setToStringTag = __webpack_require__(20);
var uid = __webpack_require__(30);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(50);
var wksDefine = __webpack_require__(49);
var enumKeys = __webpack_require__(134);
var isArray = __webpack_require__(62);
var anObject = __webpack_require__(7);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(48);
var createDesc = __webpack_require__(19);
var _create = __webpack_require__(27);
var gOPNExt = __webpack_require__(67);
var $GOPD = __webpack_require__(66);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(28);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(68).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(42).f = $propertyIsEnumerable;
  __webpack_require__(69).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(25)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(140)('Map');


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(141)('Map');


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(131)('Map') });


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(76);
var promiseResolve = __webpack_require__(73);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(41);
var perform = __webpack_require__(72);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49)('asyncIterator');


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49)('observable');


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var $task = __webpack_require__(46);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var crc32_table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
exports.crc32_table = crc32_table;

/**
* @desc: base64编码.
* @param arrByte: 字节数组.
* @return: string.
*/
exports.base64_encode = function (arrByte) {
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out, i, len;
  var c1, c2, c3;
  len = arrByte.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = arrByte[i++] & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = arrByte[i++];
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = arrByte[i++];
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
    out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

/**
* @desc: 判断是否是手机号码.
* @return: boolean.
*/

exports.isPhoneMobile = function (str) {
  if (!str) return false;
  if (/^0?1[2|3|4|5|6|7|8][0-9]\d{8}$/.test(str)) {
    return true;
  }
  return false;
};

/**
 * @desc: 是否为空串.
 * @return: boolean.
 */
exports.isEmpty = function (s) {

  if (!s) {
    return true;
  }

  if (typeof s !== 'string') {
    return true;
  }

  if (s.length == 0) return true;

  return false;
};

/**
 * @desc: 获得字符串utf8编码后的字节长度.
 * @return: u32.
 */
exports.getByteSize = function (s) {
  if (!s) return 0;

  var totalLength = 0;
  var i;
  var charCode;
  for (i = 0; i < s.length; i++) {
    charCode = s.charCodeAt(i);
    if (charCode < 0x007f) {
      totalLength = totalLength + 1;
    } else if (0x0080 <= charCode && charCode <= 0x07ff) {
      totalLength += 2;
    } else if (0x0800 <= charCode && charCode <= 0xffff) {
      totalLength += 3;
    } else if (0x10000 <= charCode) {
      totalLength += 4;
    }
  }
  //alert(totalLength);
  return totalLength;
};

/**
 * @desc: 替换字符串中所有的strSrc->strDest.
 * @return: string.
 */
exports.replace = function (str, strSrc, strDest) {
  if (!str || !strSrc) return str;

  if (str.length == 0) return str;

  var s = '';

  var endPos = str.length;
  var i = 0;
  var j = 0;
  do {
    i = str.indexOf(strSrc, j);
    if (-1 != i && i < endPos) {
      if (i != j) s += str.slice(j, i);

      s += strDest;
      j = i + strSrc.length;
    } else {
      s += str.slice(j);
      break;
    }
  } while (i < endPos); // while

  return s;
};

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var _Number$isInteger = __webpack_require__(92)['default'];

var _Number$isNaN = __webpack_require__(93)['default'];

var _typeof = __webpack_require__(12)['default'];

var _Promise = __webpack_require__(33)['default'];

var PromiseLib = _Promise;
// var BigNumber = require('../third-party/bignumber.min.js');
var BigNumber = __webpack_require__(103);

/**
 * @desc: 模拟sleep.
 * @return: Promise.
 *     在ms时间后执行.
 * @e.g.
 *     febs.utils.sleep(1000).then(()=>{
          //1000ms之后resolve.
       });
 */
exports.sleep = function (ms) {
  return new PromiseLib(function (resolve, reject) {
    try {
      setTimeout(function () {
        resolve();
      }, ms);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @desc: the browser is mobile.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsMobile = function (userAgent) {

  if (!userAgent) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
      userAgent = window.navigator.userAgent;
    }
  }

  var agent = userAgent;
  var platforms = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'Blackberry', 'Windows Phone'];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
};

/**
 * @desc: the browser is ios.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsIOS = function (userAgent) {
  if (!userAgent) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
      userAgent = window.navigator.userAgent;
    }
  }

  var agent = userAgent;
  var platforms = ['iPhone', 'iPad', 'iPod'];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
};

/**
 * @desc: the browser is phone.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsPhone = function (userAgent) {
  if (!userAgent) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
      userAgent = window.navigator.userAgent;
    }
  }

  var agent = userAgent;
  var platforms = ['Android', 'iPhone', 'iPod', 'Blackberry', 'Windows Phone'];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
};

/**
 * @desc: the browser is weixin.
 */
exports.browserIsWeixin = function (userAgent) {
  if (!userAgent) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
      userAgent = window.navigator.userAgent;
    }
  }

  var agent = userAgent;
  if (agent.match(/MicroMessenger/i) == "MicroMessenger") {
    return true;
  } else {
    return false;
  }
};

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
function getTimeString(time, fmt, weekFmt) {
  if (typeof time !== "number") return "";

  fmt = fmt || 'HH:mm:ss';

  var t = new Date(time);
  var o = {
    "M+": t.getMonth() + 1, //月份         
    "d+": t.getDate(), //日         
    "h+": t.getHours() % 12 == 0 ? 12 : t.getHours() % 12, //小时         
    "H+": t.getHours(), //小时         
    "m+": t.getMinutes(), //分         
    "s+": t.getSeconds(), //秒         
    "q+": Math.floor((t.getMonth() + 3) / 3), //季度         
    "S": t.getMilliseconds() //毫秒         
  };
  var week = weekFmt || {
    "0": "星期天",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, week[t.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
};
exports.getTimeString = getTimeString;

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
exports.getTimeStringFromNow = function (time, strFmt) {
  strFmt = strFmt || {};
  strFmt.now = strFmt.now || '刚刚';
  strFmt.second = strFmt.second || '秒前';
  strFmt.minute = strFmt.minute || '分钟前';
  strFmt.hour = strFmt.hour || '小时前';
  strFmt.day_yesterday = strFmt.day_yesterday || '昨天';
  strFmt.day = strFmt.day || '天前';
  strFmt.month = strFmt.month || '个月前';
  strFmt.time = strFmt.time || 'yyyy-M-d h:m:s';

  var now = Math.ceil(Date.now() / 1000);
  time = Math.ceil(time / 1000);

  if (now > time) {
    var s = now - time;
    if (s < 3) {
      return strFmt.now;
    }

    if (s < 60) {
      return s.toString() + strFmt.second;
    }

    if (s < 60 * 60) {
      return Math.ceil(s / 60).toString() + strFmt.minute;
    }

    if (s < 60 * 60 * 24) {
      return Math.ceil(s / 60 / 60).toString() + strFmt.hour;
    }

    if (s < 60 * 60 * 24 * 30) {
      var dNow = new Date(now * 1000);

      dNow.setHours(0, 0, 1);
      if (dNow.getTime() - time <= 60 * 60 * 24) {
        return strFmt.day_yesterday;
      }

      return Math.ceil(s / 60 / 60 / 24).toString() + strFmt.day;
    }

    if (s < 60 * 60 * 24 * 30 * 6) {
      return Math.ceil(s / 60 / 60 / 24 / 30).toString() + strFmt.month;
    }

    return getTimeString(time, strFmt.time);
  }

  return strFmt.now;
};

/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */
exports.getDate = function (strDate) {
  var date = new Date(parseInt(strDate.substr(0, 4)), parseInt(strDate.substr(5, 2), 10) - 1, parseInt(strDate.substr(8, 2)));
  return date;
};

/**
 * @desc: getDate2('20120509')
 * @return: Date.
 */
exports.getDate2 = function (strDate) {
  var date = new Date(parseInt(strDate.substr(0, 4)), parseInt(strDate.substr(4, 2), 10) - 1, parseInt(strDate.substr(6, 2)));
  return date;
};

/**
 * @desc: 合并多个map.
 * @return: {}
 */
exports.mergeMap = function () {
  var map0 = {};
  var map2;
  for (var i = 0; i < arguments.length; i++) {
    map2 = arguments[i];
    if (map2) {
      for (var k in map2) {
        map0[k] = map2[k];
      }
    }
  }

  return map0;
};

/**
* @desc: 判断参数是否是null,undefined,NaN
* @return: boolean
*/
exports.isNull = function (e) {
  return e === null || e === undefined || _Number$isNaN(e);
};

/**
 * @desc: 判断是否是bigint.
 */
exports.bigint_check = function (v) {
  if (_Number$isInteger(v)) return true;
  if (!v) return false;

  if (typeof v === 'string') {
    if (v.length > 22 || v.length < 1) return false;

    for (var j = 1; j < v.length; j++) {
      if (v[j] < '0' || v[j] > '9') return false;
    }

    if (v[0] == '-') {
      if (v.length < 2 || v[1] < '1' || v[1] > '9') return false;
    } else {
      if (v[j] < '1' || v[j] > '9') return false;
    }

    return true;
  } else {
    return false;
  }
};

/**
* @desc: calc bigint
* @return: bigint.
*/
exports.bigint_add = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.plus(b);
};

exports.bigint_minus = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.minus(b);
};

exports.bigint_dividedBy = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.dividedBy(b);
};

exports.bigint_mul = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.times(b);
};

/**
* @desc: compare with bigint.
* @return: boolean.
*/
exports.bigint_equal = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.equals(b);
};

exports.bigint_more_than = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.greaterThan(b);
};

exports.bigint_more_than_e = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.greaterThanOrEqualTo(b);
};

exports.bigint_less_than = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.lessThan(b);
};

exports.bigint_less_than_e = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.lessThanOrEqualTo(b);
};

/**
* @desc: 转换bigint->string.
* @param fixed: 小数位个数, 默认为0.
* @return: string.
*/
exports.bigint_toFixed = function (a, fixed) {
  fixed = fixed || 0;if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.toFixed(fixed);
};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

var _typeof = __webpack_require__(12)['default'];

// require('es5-shim');
// require('es5-shim/es5-sham');
__webpack_require__(78);
// require('babel-polyfill');
__webpack_require__(84);
// require('../third-party/bignumber.min.js');

(function (global, factory) {

  "use strict";

  if (( false ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

    // For CommonJS and CommonJS-like environments where a proper `window`
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("febs requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

  //
  // define the __debug.
  if (!global.hasOwnProperty('__debug')) {
    global.__debug = false;
  }

  //
  // define the animationFrame.
  var animationFrame = __webpack_require__(79);
  if (!global.requestAnimationFrame) global.requestAnimationFrame = animationFrame.requestAnimationFrame;
  if (!global.cancelAnimationFrame) global.cancelAnimationFrame = animationFrame.cancelAnimationFrame;

  var febs = {};

  febs.string = __webpack_require__(83);
  febs.crypt = __webpack_require__(80);
  febs.utils = __webpack_require__(53);
  febs.net = __webpack_require__(82);
  febs.dom = __webpack_require__(81);
  febs['$'] = function (n) {
    return new febs.dom(n);
  };

  window['febs'] = febs;
  if (!window['$']) window['$'] = febs['$'];

  //
  // debug.
  //
  // if (!console.debug) {
  window.console.debug = function () {
    if (global.__debug) {
      var logfoo;
      if (window.console.warn) logfoo = window.console.warn;else logfoo = window.console.log;

      for (var i = 0; i < arguments.length; i++) {
        logfoo(arguments[i]);
      }
    }
  };
  // }

  return febs;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32), __webpack_require__(23)(module)))

/***/ }),
/* 172 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 173 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
//# sourceMappingURL=febs.js.map