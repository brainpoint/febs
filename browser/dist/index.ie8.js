/*!
 * febs v1.0.0
 * Copyright (c) 2020 bpoint.lee@gmail.com All Rights Reserved.
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.febs = {}));
}(this, (function (exports) { 'use strict';

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.6.11' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _library = false;

  var _shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode:  'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');

  var Symbol = _global.Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
  });

  // 7.2.8 IsRegExp(argument)


  var MATCH = _wks('match');
  var _isRegexp = function (it) {
    var isRegExp;
    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)


  var SPECIES = _wks('species');
  var _speciesConstructor = function (O, D) {
    var C = _anObject(O).constructor;
    var S;
    return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
  };

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt = function (TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var at = _stringAt(true);

   // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var _advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG = _wks('toStringTag');
  // ES3 wrong here
  var ARG = _cof(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  var _classof = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
      // builtinTag case
      : ARG ? _cof(O)
      // ES3 arguments fallback
      : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var builtinExec = RegExp.prototype.exec;

   // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var _regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw new TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }
    if (_classof(R) !== 'RegExp') {
      throw new TypeError('RegExp#exec called on incompatible receiver');
    }
    return builtinExec.call(R, S);
  };

  // 21.2.5.3 get RegExp.prototype.flags

  var _flags = function () {
    var that = _anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var LAST_INDEX = 'lastIndex';

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/,
        re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var _regexpExec = patchedExec;

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp = {
  	f: f
  };

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var _functionToString = _shared('native-function-to-string', Function.toString);

  var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid('src');

  var TO_STRING = 'toString';
  var TPL = ('' + _functionToString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return _functionToString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === _global) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      _hide(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      _hide(O, key, val);
    }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || _functionToString.call(this);
  });
  });

  // optional / simple context binding

  var _ctx = function (fn, that, length) {
    _aFunction(fn);
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

  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
      // extend global
      if (target) _redefine(target, key, out, type & $export.U);
      // export
      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global.core = _core;
  // type bitmap
  $export.F = 1;   // forced
  $export.G = 2;   // global
  $export.S = 4;   // static
  $export.P = 8;   // proto
  $export.B = 16;  // bind
  $export.W = 32;  // wrap
  $export.U = 64;  // safe
  $export.R = 128; // real proto method for `library`
  var _export = $export;

  _export({
    target: 'RegExp',
    proto: true,
    forced: _regexpExec !== /./.exec
  }, {
    exec: _regexpExec
  });

  var SPECIES$1 = _wks('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
  })();

  var _fixReWks = function (KEY, length, exec) {
    var SYMBOL = _wks(KEY);

    var DELEGATES_TO_SYMBOL = !_fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;
      re.exec = function () { execCalled = true; return null; };
      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$1] = function () { return re; };
      }
      re[SYMBOL]('');
      return !execCalled;
    }) : undefined;

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(
        _defined,
        SYMBOL,
        ''[KEY],
        function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === _regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        }
      );
      var strfn = fns[0];
      var rxfn = fns[1];

      _redefine(String.prototype, KEY, strfn);
      _hide(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return rxfn.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return rxfn.call(string, this); }
      );
    }
  };

  var $min = Math.min;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX$1 = 'lastIndex';
  var MAX_UINT32 = 0xffffffff;

  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
  var SUPPORTS_Y = !_fails(function () { RegExp(MAX_UINT32, 'y'); });

  // @@split logic
  _fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
      'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
      'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
      '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
      '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
      ''[$SPLIT](/.?/)[LENGTH]
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return [];
        // If `separator` is not a regex, use native split
        if (!_isRegexp(separator)) return $split.call(string, separator, limit);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = _regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy[LAST_INDEX$1];
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }
          if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
        }
        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      };
    // Chakra, V8
    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
      };
    } else {
      internalSplit = $split;
    }

    return [
      // `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = defined(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
        if (res.done) return res.value;

        var rx = _anObject(regexp);
        var S = String(this);
        var C = _speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;
          if (
            z === null ||
            (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
          ) {
            q = _advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  });

  // 20.1.2.3 Number.isInteger(number)

  var floor$1 = Math.floor;
  var _isInteger = function isInteger(it) {
    return !_isObject(it) && isFinite(it) && floor$1(it) === it;
  };

  // 20.1.2.3 Number.isInteger(number)


  _export(_export.S, 'Number', { isInteger: _isInteger });

  var f$1 = {}.propertyIsEnumerable;

  var _objectPie = {
  	f: f$1
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  var gOPD = Object.getOwnPropertyDescriptor;

  var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject(O);
    P = _toPrimitive(P, true);
    if (_ie8DomDefine) try {
      return gOPD(O, P);
    } catch (e) { /* empty */ }
    if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
  };

  var _objectGopd = {
  	f: f$2
  };

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */


  var check = function (O, proto) {
    _anObject(O);
    if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  var _setProto = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function (test, buggy, set) {
        try {
          set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
          set(test, []);
          buggy = !(test instanceof Array);
        } catch (e) { buggy = true; }
        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }({}, false) : undefined),
    check: check
  };

  var setPrototypeOf = _setProto.set;
  var _inheritIfRequired = function (that, target, C) {
    var S = target.constructor;
    var P;
    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
      setPrototypeOf(that, P);
    } return that;
  };

  var max = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
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

  var shared = _shared('keys');

  var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function (object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
  };

  var _objectGopn = {
  	f: f$3
  };

  var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var space = '[' + _stringWs + ']';
  var non = '\u200b\u0085';
  var ltrim = RegExp('^' + space + space + '*');
  var rtrim = RegExp(space + space + '*$');

  var exporter = function (KEY, exec, ALIAS) {
    var exp = {};
    var FORCE = _fails(function () {
      return !!_stringWs[KEY]() || non[KEY]() != non;
    });
    var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
    if (ALIAS) exp[ALIAS] = fn;
    _export(_export.P + _export.F * FORCE, 'String', exp);
  };

  // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim = exporter.trim = function (string, TYPE) {
    string = String(_defined(string));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };

  var _stringTrim = exporter;

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$2 = _global.document;
  var _html = document$2 && document$2.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



  var IE_PROTO$1 = _sharedKey('IE_PROTO');
  var Empty = function () { /* empty */ };
  var PROTOTYPE$1 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');
    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
    return createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
  };

  var gOPN = _objectGopn.f;
  var gOPD$1 = _objectGopd.f;
  var dP$1 = _objectDp.f;
  var $trim = _stringTrim.trim;
  var NUMBER = 'Number';
  var $Number = _global[NUMBER];
  var Base = $Number;
  var proto = $Number.prototype;
  // Opera ~12 has broken Object#toString
  var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
  var TRIM = 'trim' in String.prototype;

  // 7.1.3 ToNumber(argument)
  var toNumber = function (argument) {
    var it = _toPrimitive(argument, false);
    if (typeof it == 'string' && it.length > 2) {
      it = TRIM ? it.trim() : $trim(it, 3);
      var first = it.charCodeAt(0);
      var third, radix, maxCode;
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
          default: return +it;
        }
        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
          code = digits.charCodeAt(i);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
    $Number = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var that = this;
      return that instanceof $Number
        // check on 1..constructor(foo) case
        && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
          ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
    };
    for (var keys = _descriptors ? gOPN(Base) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), j = 0, key; keys.length > j; j++) {
      if (_has(Base, key = keys[j]) && !_has($Number, key)) {
        dP$1($Number, key, gOPD$1(Base, key));
      }
    }
    $Number.prototype = proto;
    proto.constructor = $Number;
    _redefine(_global, NUMBER, $Number);
  }

  // 20.1.2.4 Number.isNaN(number)


  _export(_export.S, 'Number', {
    isNaN: function isNaN(number) {
      // eslint-disable-next-line no-self-compare
      return number != number;
    }
  });

  var _anInstance = function (it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(name + ': incorrect invocation!');
    } return it;
  };

  // call something on iterator step with safe closing on error

  var _iterCall = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };

  var _iterators = {};

  // check on default Array iterator

  var ITERATOR = _wks('iterator');
  var ArrayProto = Array.prototype;

  var _isArrayIter = function (it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR] === it);
  };

  var ITERATOR$1 = _wks('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$1]
      || it['@@iterator']
      || _iterators[_classof(it)];
  };

  var _forOf = createCommonjsModule(function (module) {
  var BREAK = {};
  var RETURN = {};
  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
    var f = _ctx(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    // fast case for arrays with default iterator
    if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
      result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      if (result === BREAK || result === RETURN) return result;
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      result = _iterCall(iterator, f, step.value, entries);
      if (result === BREAK || result === RETURN) return result;
    }
  };
  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
  });

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  var _invoke = function (fn, args, that) {
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

  var process$1 = _global.process;
  var setTask = _global.setImmediate;
  var clearTask = _global.clearImmediate;
  var MessageChannel = _global.MessageChannel;
  var Dispatch = _global.Dispatch;
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
        _invoke(typeof fn == 'function' ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (_cof(process$1) == 'process') {
      defer = function (id) {
        process$1.nextTick(_ctx(run, id, 1));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(_ctx(run, id, 1));
      };
    // Browsers with MessageChannel, includes WebWorkers
    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = _ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
      defer = function (id) {
        _global.postMessage(id + '', '*');
      };
      _global.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in _domCreate('script')) {
      defer = function (id) {
        _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
          _html.removeChild(this);
          run.call(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(_ctx(run, id, 1), 0);
      };
    }
  }
  var _task = {
    set: setTask,
    clear: clearTask
  };

  var macrotask = _task.set;
  var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
  var process$2 = _global.process;
  var Promise$1 = _global.Promise;
  var isNode = _cof(process$2) == 'process';

  var _microtask = function () {
    var head, last, notify;

    var flush = function () {
      var parent, fn;
      if (isNode && (parent = process$2.domain)) parent.exit();
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
        process$2.nextTick(flush);
      };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
    } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
      var toggle = true;
      var node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      var promise = Promise$1.resolve(undefined);
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
        macrotask.call(_global, flush);
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

  // 25.4.1.5 NewPromiseCapability(C)


  function PromiseCapability(C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = _aFunction(resolve);
    this.reject = _aFunction(reject);
  }

  var f$4 = function (C) {
    return new PromiseCapability(C);
  };

  var _newPromiseCapability = {
  	f: f$4
  };

  var _perform = function (exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  var navigator$1 = _global.navigator;

  var _userAgent = navigator$1 && navigator$1.userAgent || '';

  var _promiseResolve = function (C, x) {
    _anObject(C);
    if (_isObject(x) && x.constructor === C) return x;
    var promiseCapability = _newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var _redefineAll = function (target, src, safe) {
    for (var key in src) _redefine(target, key, src[key], safe);
    return target;
  };

  var def = _objectDp.f;

  var TAG$1 = _wks('toStringTag');

  var _setToStringTag = function (it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
  };

  var SPECIES$2 = _wks('species');

  var _setSpecies = function (KEY) {
    var C = _global[KEY];
    if (_descriptors && C && !C[SPECIES$2]) _objectDp.f(C, SPECIES$2, {
      configurable: true,
      get: function () { return this; }
    });
  };

  var ITERATOR$2 = _wks('iterator');
  var SAFE_CLOSING = false;

  try {
    var riter = [7][ITERATOR$2]();
    riter['return'] = function () { SAFE_CLOSING = true; };
    // eslint-disable-next-line no-throw-literal
    Array.from(riter, function () { throw 2; });
  } catch (e) { /* empty */ }

  var _iterDetect = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR$2]();
      iter.next = function () { return { done: safe = true }; };
      arr[ITERATOR$2] = function () { return iter; };
      exec(arr);
    } catch (e) { /* empty */ }
    return safe;
  };

  var task = _task.set;
  var microtask = _microtask();




  var PROMISE = 'Promise';
  var TypeError$1 = _global.TypeError;
  var process$3 = _global.process;
  var versions = process$3 && process$3.versions;
  var v8 = versions && versions.v8 || '';
  var $Promise = _global[PROMISE];
  var isNode$1 = _classof(process$3) == 'process';
  var empty = function () { /* empty */ };
  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

  var USE_NATIVE = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);
      var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
        exec(empty, empty);
      };
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (isNode$1 || typeof PromiseRejectionEvent == 'function')
        && promise.then(empty) instanceof FakePromise
        // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // we can't detect it synchronously, so just check versions
        && v8.indexOf('6.6') !== 0
        && _userAgent.indexOf('Chrome/66') === -1;
    } catch (e) { /* empty */ }
  }();

  // helpers
  var isThenable = function (it) {
    var then;
    return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
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
              reject(TypeError$1('Promise-chain cycle'));
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
    task.call(_global, function () {
      var value = promise._v;
      var unhandled = isUnhandled(promise);
      var result, handler, console;
      if (unhandled) {
        result = _perform(function () {
          if (isNode$1) {
            process$3.emit('unhandledRejection', value, promise);
          } else if (handler = _global.onunhandledrejection) {
            handler({ promise: promise, reason: value });
          } else if ((console = _global.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
      } promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled = function (promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled = function (promise) {
    task.call(_global, function () {
      var handler;
      if (isNode$1) {
        process$3.emit('rejectionHandled', promise);
      } else if (handler = _global.onrejectionhandled) {
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
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      if (then = isThenable(value)) {
        microtask(function () {
          var wrapper = { _w: promise, _d: false }; // wrap
          try {
            then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
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
      _anInstance(this, $Promise, PROMISE, '_h');
      _aFunction(executor);
      Internal.call(this);
      try {
        executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
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
    Internal.prototype = _redefineAll($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = isNode$1 ? process$3.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = _ctx($resolve, promise, 1);
      this.reject = _ctx($reject, promise, 1);
    };
    _newPromiseCapability.f = newPromiseCapability = function (C) {
      return C === $Promise || C === Wrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
  _setToStringTag($Promise, PROMISE);
  _setSpecies(PROMISE);
  Wrapper = _core[PROMISE];

  // statics
  _export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });
  _export(_export.S + _export.F * ( !USE_NATIVE), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve( this, x);
    }
  });
  _export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
    $Promise.all(iter)['catch'](empty);
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = _perform(function () {
        var values = [];
        var index = 0;
        var remaining = 1;
        _forOf(iterable, false, function (promise) {
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
      var result = _perform(function () {
        _forOf(iterable, false, function (promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    }
  });

  // 19.1.3.6 Object.prototype.toString()

  var test = {};
  test[_wks('toStringTag')] = 'z';
  if (test + '' != '[object z]') {
    _redefine(Object.prototype, 'toString', function toString() {
      return '[object ' + _classof(this) + ']';
    }, true);
  }

  _export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
    var C = _speciesConstructor(this, _core.Promise || _global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return _promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return _promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  } });

  (function () {
    if (typeof Promise.prototype.finally === 'function') {
      return;
    }

    Promise.prototype.finally = function (fn) {
      return this.then(function (value) {
        return this.constructor.resolve(fn()).then(function () {
          return value;
        });
      }).catch(function (reason) {
        return this.constructor.resolve(fn()).then(function () {
          throw reason;
        });
      });
    };
  })();

  var promiseFinallyPolyfill = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

  // 7.1.13 ToObject(argument)

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  var _createProperty = function (object, index, value) {
    if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
    else object[index] = value;
  };

  _export(_export.S + _export.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = _toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = core_getIteratorMethod(O);
      var length, result, step, iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = _toLength(O.length);
        for (result = new C(length); length > index; index++) {
          _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    }
  });

  var f$5 = _wks;

  var _wksExt = {
  	f: f$5
  };

  var defineProperty = _objectDp.f;
  var _wksDefine = function (name) {
    var $Symbol = _core.Symbol || (_core.Symbol =  _global.Symbol || {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
  };

  _wksDefine('asyncIterator');

  var _meta = createCommonjsModule(function (module) {
  var META = _uid('meta');


  var setDesc = _objectDp.f;
  var id = 0;
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var FREEZE = !_fails(function () {
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
    if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!_has(it, META)) {
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
    if (!_has(it, META)) {
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
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
    return it;
  };
  var meta = module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };
  });
  var _meta_1 = _meta.KEY;
  var _meta_2 = _meta.NEED;
  var _meta_3 = _meta.fastKey;
  var _meta_4 = _meta.getWeak;
  var _meta_5 = _meta.onFreeze;

  var f$6 = Object.getOwnPropertySymbols;

  var _objectGops = {
  	f: f$6
  };

  // all enumerable object keys, includes symbols



  var _enumKeys = function (it) {
    var result = _objectKeys(it);
    var getSymbols = _objectGops.f;
    if (getSymbols) {
      var symbols = getSymbols(it);
      var isEnum = _objectPie.f;
      var i = 0;
      var key;
      while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
    } return result;
  };

  // 7.2.2 IsArray(argument)

  var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

  var gOPN$1 = _objectGopn.f;
  var toString$1 = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return gOPN$1(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  var f$7 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
  };

  var _objectGopnExt = {
  	f: f$7
  };

  // ECMAScript 6 symbols shim





  var META = _meta.KEY;





















  var gOPD$2 = _objectGopd.f;
  var dP$2 = _objectDp.f;
  var gOPN$2 = _objectGopnExt.f;
  var $Symbol = _global.Symbol;
  var $JSON = _global.JSON;
  var _stringify = $JSON && $JSON.stringify;
  var PROTOTYPE$2 = 'prototype';
  var HIDDEN = _wks('_hidden');
  var TO_PRIMITIVE = _wks('toPrimitive');
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = _shared('symbol-registry');
  var AllSymbols = _shared('symbols');
  var OPSymbols = _shared('op-symbols');
  var ObjectProto = Object[PROTOTYPE$2];
  var USE_NATIVE$1 = typeof $Symbol == 'function' && !!_objectGops.f;
  var QObject = _global.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc = _descriptors && _fails(function () {
    return _objectCreate(dP$2({}, 'a', {
      get: function () { return dP$2(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD$2(ObjectProto, key);
    if (protoDesc) delete ObjectProto[key];
    dP$2(it, key, D);
    if (protoDesc && it !== ObjectProto) dP$2(ObjectProto, key, protoDesc);
  } : dP$2;

  var wrap = function (tag) {
    var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
    _anObject(it);
    key = _toPrimitive(key, true);
    _anObject(D);
    if (_has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has(it, HIDDEN)) dP$2(it, HIDDEN, _propertyDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
      } return setSymbolDesc(it, key, D);
    } return dP$2(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    _anObject(it);
    var keys = _enumKeys(P = _toIobject(P));
    var i = 0;
    var l = keys.length;
    var key;
    while (l > i) $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = _toPrimitive(key, true));
    if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
    return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive(key, true);
    if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
    var D = gOPD$2(it, key);
    if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN$2(_toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    } return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto;
    var names = gOPN$2(IS_OP ? OPSymbols : _toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
    } return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE$1) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function (value) {
        if (this === ObjectProto) $set.call(OPSymbols, value);
        if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc(1, value));
      };
      if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
      return wrap(tag);
    };
    _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
      return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors && !_library) {
      _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    _wksExt.f = function (name) {
      return wrap(_wks(name));
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

  for (var es6Symbols = (
    // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), j$1 = 0; es6Symbols.length > j$1;)_wks(es6Symbols[j$1++]);

  for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

  _export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function (key) {
      return _has(SymbolRegistry, key += '')
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

  _export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
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

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

  _export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return _objectGops.f(_toObject(it));
    }
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
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
      if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!_isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    }
  });

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  _setToStringTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  _setToStringTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  _setToStringTag(_global.JSON, 'JSON', true);

  var dP$3 = _objectDp.f;
  var gOPN$3 = _objectGopn.f;


  var $RegExp = _global.RegExp;
  var Base$1 = $RegExp;
  var proto$1 = $RegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g;
  // "new" creates a new object, old webkit buggy here
  var CORRECT_NEW = new $RegExp(re1) !== re1;

  if (_descriptors && (!CORRECT_NEW || _fails(function () {
    re2[_wks('match')] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
  }))) {
    $RegExp = function RegExp(p, f) {
      var tiRE = this instanceof $RegExp;
      var piRE = _isRegexp(p);
      var fiU = f === undefined;
      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
        : _inheritIfRequired(CORRECT_NEW
          ? new Base$1(piRE && !fiU ? p.source : p, f)
          : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
        , tiRE ? this : proto$1, $RegExp);
    };
    var proxy = function (key) {
      key in $RegExp || dP$3($RegExp, key, {
        configurable: true,
        get: function () { return Base$1[key]; },
        set: function (it) { Base$1[key] = it; }
      });
    };
    for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) proxy(keys$1[i++]);
    proto$1.constructor = $RegExp;
    $RegExp.prototype = proto$1;
    _redefine(_global, 'RegExp', $RegExp);
  }

  _setSpecies('RegExp');

  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks('iterator'), function () { return this; });

  var _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$2 = _sharedKey('IE_PROTO');
  var ObjectProto$1 = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto$1 : null;
  };

  var ITERATOR$3 = _wks('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function () { return this; };

  var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
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
    var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if ( typeof IteratorPrototype[ITERATOR$3] != 'function') _hide(IteratorPrototype, ITERATOR$3, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ( (BUGGY || VALUES_BUG || !proto[ITERATOR$3])) {
      _hide(proto, ITERATOR$3, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  var $at = _stringAt(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine(String, 'String', function (iterated) {
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

  var _iterStep = function (done, value) {
    return { value: value, done: !!done };
  };

  var _validateCollection = function (it, TYPE) {
    if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
    return it;
  };

  var dP$4 = _objectDp.f;









  var fastKey = _meta.fastKey;

  var SIZE = _descriptors ? '_s' : 'size';

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

  var _collectionStrong = {
    getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        _anInstance(that, C, NAME, '_i');
        that._t = NAME;         // collection type
        that._i = _objectCreate(null); // index
        that._f = undefined;    // first entry
        that._l = undefined;    // last entry
        that[SIZE] = 0;         // size
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });
      _redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
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
          var that = _validateCollection(this, NAME);
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
          _validateCollection(this, NAME);
          var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
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
          return !!getEntry(_validateCollection(this, NAME), key);
        }
      });
      if (_descriptors) dP$4(C.prototype, 'size', {
        get: function () {
          return _validateCollection(this, NAME)[SIZE];
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
      _iterDefine(C, NAME, function (iterated, kind) {
        this._t = _validateCollection(iterated, NAME); // target
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
          return _iterStep(1);
        }
        // return step by kind
        if (kind == 'keys') return _iterStep(0, entry.k);
        if (kind == 'values') return _iterStep(0, entry.v);
        return _iterStep(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // add [@@species], 23.1.2.2, 23.2.2.2
      _setSpecies(NAME);
    }
  };

  var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = _global[NAME];
    var C = Base;
    var ADDER = IS_MAP ? 'set' : 'add';
    var proto = C && C.prototype;
    var O = {};
    var fixMethod = function (KEY) {
      var fn = proto[KEY];
      _redefine(proto, KEY,
        KEY == 'delete' ? function (a) {
          return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'has' ? function has(a) {
          return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'get' ? function get(a) {
          return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
          : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
      );
    };
    if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
      new C().entries().next();
    }))) {
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      _redefineAll(C.prototype, methods);
      _meta.NEED = true;
    } else {
      var instance = new C();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && _fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });
      if (!ACCEPT_ITERABLES) {
        C = wrapper(function (target, iterable) {
          _anInstance(target, C, NAME);
          var that = _inheritIfRequired(new Base(), target, C);
          if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
      // weak collections should not contains .clear method
      if (IS_WEAK && proto.clear) delete proto.clear;
    }

    _setToStringTag(C, NAME);

    O[NAME] = C;
    _export(_export.G + _export.W + _export.F * (C != Base), O);

    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

    return C;
  };

  var MAP = 'Map';

  // 23.1 Map Objects
  var es6_map = _collection(MAP, function (get) {
    return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
  }, {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key) {
      var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value) {
      return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
    }
  }, _collectionStrong, true);

  // most Object methods by ES6 should accept primitives



  var _objectSap = function (KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
  };

  // 19.1.2.14 Object.keys(O)



  _objectSap('keys', function () {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  // 19.1.2.5 Object.freeze(O)

  var meta = _meta.onFreeze;

  _objectSap('freeze', function ($freeze) {
    return function freeze(it) {
      return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
    };
  });

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var dP$5 = _objectDp.f;
  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name';

  // 19.2.4.2 name
  NAME in FProto || _descriptors && dP$5(FProto, NAME, {
    configurable: true,
    get: function () {
      try {
        return ('' + this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    }
  });

  var max$1 = Math.max;
  var min$2 = Math.min;
  var floor$2 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  _fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = defined(this);
        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined
          ? fn.call(searchValue, O, replaceValue)
          : $replace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative($replace, regexp, this, replaceValue);
        if (res.done) return res.value;

        var rx = _anObject(regexp);
        var S = String(this);
        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);
        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = _regexpExecAbstract(rx, S);
          if (result === null) break;
          results.push(result);
          if (!global) break;
          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
        }
        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];
          var matched = String(result[0]);
          var position = max$1(min$2(_toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

      // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = _toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return $replace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor$2(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  });

  // @@match logic
  _fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative($match, regexp, this);
        if (res.done) return res.value;
        var rx = _anObject(regexp);
        var S = String(this);
        if (!rx.global) return _regexpExecAbstract(rx, S);
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = _regexpExecAbstract(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = _wks('unscopables');
  var ArrayProto$1 = Array.prototype;
  if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
  var _addToUnscopables = function (key) {
    ArrayProto$1[UNSCOPABLES][key] = true;
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }
    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  _addToUnscopables('keys');
  _addToUnscopables('values');
  _addToUnscopables('entries');

  var ITERATOR$4 = _wks('iterator');
  var TO_STRING_TAG = _wks('toStringTag');
  var ArrayValues = _iterators.Array;

  var DOMIterables = {
    CSSRuleList: true, // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true, // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true, // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = _objectKeys(DOMIterables), i$1 = 0; i$1 < collections.length; i$1++) {
    var NAME$1 = collections[i$1];
    var explicit = DOMIterables[NAME$1];
    var Collection = _global[NAME$1];
    var proto$2 = Collection && Collection.prototype;
    var key$1;
    if (proto$2) {
      if (!proto$2[ITERATOR$4]) _hide(proto$2, ITERATOR$4, ArrayValues);
      if (!proto$2[TO_STRING_TAG]) _hide(proto$2, TO_STRING_TAG, NAME$1);
      _iterators[NAME$1] = ArrayValues;
      if (explicit) for (key$1 in es6_array_iterator) if (!proto$2[key$1]) _redefine(proto$2, key$1, es6_array_iterator[key$1], true);
    }
  }

  // 21.2.5.3 get RegExp.prototype.flags()
  if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: _flags
  });

  var TO_STRING = 'toString';
  var $toString = /./[TO_STRING];

  var define = function (fn) {
    _redefine(RegExp.prototype, TO_STRING, fn, true);
  };

  // 21.2.5.14 RegExp.prototype.toString()
  if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
    define(function toString() {
      var R = _anObject(this);
      return '/'.concat(R.source, '/',
        'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
    });
  // FF44- RegExp#toString has a wrong name
  } else if ($toString.name != TO_STRING) {
    define(function toString() {
      return $toString.call(this);
    });
  }

  var bluebird_min = createCommonjsModule(function (module, exports) {
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
      module.exports = t();
    }(function () {
      return function r(t, e, n) {
        function i(s, a) {
          if (!e[s]) {
            if (!t[s]) {
              var c = "function" == typeof _dereq_ && _dereq_;
              if (!a && c) return c(s, !0);
              if (o) return o(s, !0);
              var l = new Error("Cannot find module '" + s + "'");
              throw l.code = "MODULE_NOT_FOUND", l;
            }

            var u = e[s] = {
              exports: {}
            };
            t[s][0].call(u.exports, function (e) {
              var n = t[s][1][e];
              return i(n ? n : e);
            }, u, u.exports, r, t, e, n);
          }

          return e[s].exports;
        }

        for (var o = "function" == typeof _dereq_ && _dereq_, s = 0; s < n.length; s++) {
          i(n[s]);
        }

        return i;
      }({
        1: [function (t, e, n) {

          e.exports = function (t) {
            function e(t) {
              var e = new n(t),
                  r = e.promise();
              return e.setHowMany(1), e.setUnwrap(), e.init(), r;
            }

            var n = t._SomePromiseArray;
            t.any = function (t) {
              return e(t);
            }, t.prototype.any = function () {
              return e(this);
            };
          };
        }, {}],
        2: [function (t, e, n) {

          function r() {
            this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new u(16), this._normalQueue = new u(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
            var t = this;
            this.drainQueues = function () {
              t._drainQueues();
            }, this._schedule = l;
          }

          function i(t, e, n) {
            this._lateQueue.push(t, e, n), this._queueTick();
          }

          function o(t, e, n) {
            this._normalQueue.push(t, e, n), this._queueTick();
          }

          function s(t) {
            this._normalQueue._pushOne(t), this._queueTick();
          }

          var a;

          try {
            throw new Error();
          } catch (c) {
            a = c;
          }

          var l = t("./schedule"),
              u = t("./queue"),
              p = t("./util");
          r.prototype.setScheduler = function (t) {
            var e = this._schedule;
            return this._schedule = t, this._customScheduler = !0, e;
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
              var e = t.shift();

              if ("function" == typeof e) {
                var n = t.shift(),
                    r = t.shift();
                e.call(n, r);
              } else e._settlePromises();
            }
          }, r.prototype._drainQueues = function () {
            this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, this._drainQueue(this._lateQueue);
          }, r.prototype._queueTick = function () {
            this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues));
          }, r.prototype._reset = function () {
            this._isTickUsed = !1;
          }, e.exports = r, e.exports.firstLineError = a;
        }, {
          "./queue": 26,
          "./schedule": 29,
          "./util": 36
        }],
        3: [function (t, e, n) {

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
            };

            t.prototype.bind = function (o) {
              i || (i = !0, t.prototype._propagateFrom = r.propagateFromFunction(), t.prototype._boundValue = r.boundValueFunction());
              var l = n(o),
                  u = new t(e);

              u._propagateFrom(this, 1);

              var p = this._target();

              if (u._setBoundTo(l), l instanceof t) {
                var h = {
                  promiseRejectionQueued: !1,
                  promise: u,
                  target: p,
                  bindingPromise: l
                };
                p._then(e, s, void 0, u, h), l._then(a, c, void 0, u, h), u._setOnCancel(l);
              } else u._resolveCallback(p);

              return u;
            }, t.prototype._setBoundTo = function (t) {
              void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField;
            }, t.prototype._isBound = function () {
              return 2097152 === (2097152 & this._bitField);
            }, t.bind = function (e, n) {
              return t.resolve(n).bind(e);
            };
          };
        }, {}],
        4: [function (t, e, n) {

          function r() {
            try {
              Promise === o && (Promise = i);
            } catch (t) {}

            return o;
          }

          var i;
          "undefined" != typeof Promise && (i = Promise);
          var o = t("./promise")();
          o.noConflict = r, e.exports = o;
        }, {
          "./promise": 22
        }],
        5: [function (t, e, n) {

          var r = Object.create;

          if (r) {
            var i = r(null),
                o = r(null);
            i[" size"] = o[" size"] = 0;
          }

          e.exports = function (e) {
            function n(t, n) {
              var r;

              if (null != t && (r = t[n]), "function" != typeof r) {
                var i = "Object " + a.classString(t) + " has no method '" + a.toString(n) + "'";
                throw new e.TypeError(i);
              }

              return r;
            }

            function r(t) {
              var e = this.pop(),
                  r = n(t, e);
              return r.apply(t, this);
            }

            function i(t) {
              return t[this];
            }

            function o(t) {
              var e = +this;
              return 0 > e && (e = Math.max(0, e + t.length)), t[e];
            }

            var s,
                a = t("./util"),
                c = a.canEvaluate;
            a.isIdentifier;
            e.prototype.call = function (t) {
              var e = [].slice.call(arguments, 1);
              return e.push(t), this._then(r, void 0, void 0, e, void 0);
            }, e.prototype.get = function (t) {
              var e,
                  n = "number" == typeof t;
              if (n) e = o;else if (c) {
                var r = s();
                e = null !== r ? r : i;
              } else e = i;
              return this._then(e, void 0, void 0, t, void 0);
            };
          };
        }, {
          "./util": 36
        }],
        6: [function (t, e, n) {

          e.exports = function (e, n, r, i) {
            var o = t("./util"),
                s = o.tryCatch,
                a = o.errorObj,
                c = e._async;
            e.prototype["break"] = e.prototype.cancel = function () {
              if (!i.cancellation()) return this._warn("cancellation is disabled");

              for (var t = this, e = t; t._isCancellable();) {
                if (!t._cancelBy(e)) {
                  e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                  break;
                }

                var n = t._cancellationParent;

                if (null == n || !n._isCancellable()) {
                  t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                  break;
                }

                t._isFollowing() && t._followee().cancel(), t._setWillBeCancelled(), e = t, t = n;
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
                  var r = s(t).call(this._boundValue());
                  r === a && (this._attachExtraTrace(r.e), c.throwLater(r.e));
                }
              } else t._resultCancelled(this);
            }, e.prototype._invokeOnCancel = function () {
              var t = this._onCancel();

              this._unsetOnCancel(), c.invoke(this._doInvokeOnCancel, this, t);
            }, e.prototype._invokeInternalOnCancel = function () {
              this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
            }, e.prototype._resultCancelled = function () {
              this.cancel();
            };
          };
        }, {
          "./util": 36
        }],
        7: [function (t, e, n) {

          e.exports = function (e) {
            function n(t, n, a) {
              return function (c) {
                var l = a._boundValue();

                t: for (var u = 0; u < t.length; ++u) {
                  var p = t[u];

                  if (p === Error || null != p && p.prototype instanceof Error) {
                    if (c instanceof p) return o(n).call(l, c);
                  } else if ("function" == typeof p) {
                    var h = o(p).call(l, c);
                    if (h === s) return h;
                    if (h) return o(n).call(l, c);
                  } else if (r.isObject(c)) {
                    for (var f = i(p), _ = 0; _ < f.length; ++_) {
                      var d = f[_];
                      if (p[d] != c[d]) continue t;
                    }

                    return o(n).call(l, c);
                  }
                }

                return e;
              };
            }

            var r = t("./util"),
                i = t("./es5").keys,
                o = r.tryCatch,
                s = r.errorObj;
            return n;
          };
        }, {
          "./es5": 13,
          "./util": 36
        }],
        8: [function (t, e, n) {

          e.exports = function (t) {
            function e() {
              this._trace = new e.CapturedTrace(r());
            }

            function n() {
              return i ? new e() : void 0;
            }

            function r() {
              var t = o.length - 1;
              return t >= 0 ? o[t] : void 0;
            }

            var i = !1,
                o = [];
            return t.prototype._promiseCreated = function () {}, t.prototype._pushContext = function () {}, t.prototype._popContext = function () {
              return null;
            }, t._peekContext = t.prototype._peekContext = function () {}, e.prototype._pushContext = function () {
              void 0 !== this._trace && (this._trace._promiseCreated = null, o.push(this._trace));
            }, e.prototype._popContext = function () {
              if (void 0 !== this._trace) {
                var t = o.pop(),
                    e = t._promiseCreated;
                return t._promiseCreated = null, e;
              }

              return null;
            }, e.CapturedTrace = null, e.create = n, e.deactivateLongStackTraces = function () {}, e.activateLongStackTraces = function () {
              var n = t.prototype._pushContext,
                  o = t.prototype._popContext,
                  s = t._peekContext,
                  a = t.prototype._peekContext,
                  c = t.prototype._promiseCreated;
              e.deactivateLongStackTraces = function () {
                t.prototype._pushContext = n, t.prototype._popContext = o, t._peekContext = s, t.prototype._peekContext = a, t.prototype._promiseCreated = c, i = !1;
              }, i = !0, t.prototype._pushContext = e.prototype._pushContext, t.prototype._popContext = e.prototype._popContext, t._peekContext = t.prototype._peekContext = r, t.prototype._promiseCreated = function () {
                var t = this._peekContext();

                t && null == t._promiseCreated && (t._promiseCreated = this);
              };
            }, e;
          };
        }, {}],
        9: [function (t, e, n) {

          e.exports = function (e, n) {
            function r(t, e) {
              return {
                promise: e
              };
            }

            function i() {
              return !1;
            }

            function o(t, e, n) {
              var r = this;

              try {
                t(e, n, function (t) {
                  if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + H.toString(t));

                  r._attachCancellationCallback(t);
                });
              } catch (i) {
                return i;
              }
            }

            function s(t) {
              if (!this._isCancellable()) return this;

              var e = this._onCancel();

              void 0 !== e ? H.isArray(e) ? e.push(t) : this._setOnCancel([e, t]) : this._setOnCancel(t);
            }

            function a() {
              return this._onCancelField;
            }

            function c(t) {
              this._onCancelField = t;
            }

            function l() {
              this._cancellationParent = void 0, this._onCancelField = void 0;
            }

            function u(t, e) {
              if (0 !== (1 & e)) {
                this._cancellationParent = t;
                var n = t._branchesRemainingToCancel;
                void 0 === n && (n = 0), t._branchesRemainingToCancel = n + 1;
              }

              0 !== (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
            }

            function p(t, e) {
              0 !== (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
            }

            function h() {
              var t = this._boundTo;
              return void 0 !== t && t instanceof e ? t.isFulfilled() ? t.value() : void 0 : t;
            }

            function f() {
              this._trace = new S(this._peekContext());
            }

            function _(t, e) {
              if (N(t)) {
                var n = this._trace;
                if (void 0 !== n && e && (n = n._parent), void 0 !== n) n.attachExtraTrace(t);else if (!t.__stackCleaned__) {
                  var r = j(t);
                  H.notEnumerableProp(t, "stack", r.message + "\n" + r.stack.join("\n")), H.notEnumerableProp(t, "__stackCleaned__", !0);
                }
              }
            }

            function d(t, e, n, r, i) {
              if (void 0 === t && null !== e && W) {
                if (void 0 !== i && i._returnedNonUndefined()) return;
                if (0 === (65535 & r._bitField)) return;
                n && (n += " ");
                var o = "",
                    s = "";

                if (e._trace) {
                  for (var a = e._trace.stack.split("\n"), c = w(a), l = c.length - 1; l >= 0; --l) {
                    var u = c[l];

                    if (!U.test(u)) {
                      var p = u.match(M);
                      p && (o = "at " + p[1] + ":" + p[2] + ":" + p[3] + " ");
                      break;
                    }
                  }

                  if (c.length > 0) for (var h = c[0], l = 0; l < a.length; ++l) {
                    if (a[l] === h) {
                      l > 0 && (s = "\n" + a[l - 1]);
                      break;
                    }
                  }
                }

                var f = "a promise was created in a " + n + "handler " + o + "but was not returned from it, see http://goo.gl/rRqMUw" + s;

                r._warn(f, !0, e);
              }
            }

            function v(t, e) {
              var n = t + " is deprecated and will be removed in a future version.";
              return e && (n += " Use " + e + " instead."), y(n);
            }

            function y(t, n, r) {
              if (ot.warnings) {
                var i,
                    o = new L(t);
                if (n) r._attachExtraTrace(o);else if (ot.longStackTraces && (i = e._peekContext())) i.attachExtraTrace(o);else {
                  var s = j(o);
                  o.stack = s.message + "\n" + s.stack.join("\n");
                }
                tt("warning", o) || E(o, "", !0);
              }
            }

            function m(t, e) {
              for (var n = 0; n < e.length - 1; ++n) {
                e[n].push("From previous event:"), e[n] = e[n].join("\n");
              }

              return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n");
            }

            function g(t) {
              for (var e = 0; e < t.length; ++e) {
                (0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), e--);
              }
            }

            function b(t) {
              for (var e = t[0], n = 1; n < t.length; ++n) {
                for (var r = t[n], i = e.length - 1, o = e[i], s = -1, a = r.length - 1; a >= 0; --a) {
                  if (r[a] === o) {
                    s = a;
                    break;
                  }
                }

                for (var a = s; a >= 0; --a) {
                  var c = r[a];
                  if (e[i] !== c) break;
                  e.pop(), i--;
                }

                e = r;
              }
            }

            function w(t) {
              for (var e = [], n = 0; n < t.length; ++n) {
                var r = t[n],
                    i = "    (No stack trace)" === r || q.test(r),
                    o = i && nt(r);
                i && !o && ($ && " " !== r.charAt(0) && (r = "    " + r), e.push(r));
              }

              return e;
            }

            function C(t) {
              for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
                var r = e[n];
                if ("    (No stack trace)" === r || q.test(r)) break;
              }

              return n > 0 && "SyntaxError" != t.name && (e = e.slice(n)), e;
            }

            function j(t) {
              var e = t.stack,
                  n = t.toString();
              return e = "string" == typeof e && e.length > 0 ? C(t) : ["    (No stack trace)"], {
                message: n,
                stack: "SyntaxError" == t.name ? e : w(e)
              };
            }

            function E(t, e, n) {
              if ("undefined" != typeof console) {
                var r1;

                if (H.isObject(t)) {
                  var i = t.stack;
                  r1 = e + Q(i, t);
                } else r1 = e + String(t);

                "function" == typeof D ? D(r1, n) : ("function" == typeof console.log || "object" == _typeof(console.log)) && console.log(r1);
              }
            }

            function k(t, e, n, r) {
              var i = !1;

              try {
                "function" == typeof e && (i = !0, "rejectionHandled" === t ? e(r) : e(n, r));
              } catch (o) {
                I.throwLater(o);
              }

              "unhandledRejection" === t ? tt(t, n, r) || i || E(n, "Unhandled rejection ") : tt(t, r);
            }

            function F(t) {
              var e;
              if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]";else {
                e = t && "function" == typeof t.toString ? t.toString() : H.toString(t);
                var n = /\[object [a-zA-Z0-9$_]+\]/;
                if (n.test(e)) try {
                  var r = JSON.stringify(t);
                  e = r;
                } catch (i) {}
                0 === e.length && (e = "(empty array)");
              }
              return "(<" + x(e) + ">, no stack trace)";
            }

            function x(t) {
              var e = 41;
              return t.length < e ? t : t.substr(0, e - 3) + "...";
            }

            function T() {
              return "function" == typeof it;
            }

            function P(t) {
              var e = t.match(rt);
              return e ? {
                fileName: e[1],
                line: parseInt(e[2], 10)
              } : void 0;
            }

            function R(t, e) {
              if (T()) {
                for (var n, r, i = t.stack.split("\n"), o = e.stack.split("\n"), s = -1, a = -1, c = 0; c < i.length; ++c) {
                  var l = P(i[c]);

                  if (l) {
                    n = l.fileName, s = l.line;
                    break;
                  }
                }

                for (var c = 0; c < o.length; ++c) {
                  var l = P(o[c]);

                  if (l) {
                    r = l.fileName, a = l.line;
                    break;
                  }
                }

                0 > s || 0 > a || !n || !r || n !== r || s >= a || (nt = function nt(t) {
                  if (B.test(t)) return !0;
                  var e = P(t);
                  return e && e.fileName === n && s <= e.line && e.line <= a ? !0 : !1;
                });
              }
            }

            function S(t) {
              this._parent = t, this._promisesCreated = 0;
              var e = this._length = 1 + (void 0 === t ? 0 : t._length);
              it(this, S), e > 32 && this.uncycle();
            }

            var O,
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
                W = 0 != H.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (z || !!H.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
            e.prototype.suppressUnhandledRejections = function () {
              var t = this._target();

              t._bitField = -1048577 & t._bitField | 524288;
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
                var t = this._settledValue();

                this._setUnhandledRejectionIsNotified(), k("unhandledRejection", A, t, this);
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
              var e = V();
              A = "function" == typeof t ? null === e ? t : H.domainBind(e, t) : void 0;
            }, e.onUnhandledRejectionHandled = function (t) {
              var e = V();
              O = "function" == typeof t ? null === e ? t : H.domainBind(e, t) : void 0;
            };

            var K = function K() {};

            e.longStackTraces = function () {
              if (I.haveItemsQueued() && !ot.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");

              if (!ot.longStackTraces && T()) {
                var t = e.prototype._captureStackTrace,
                    r = e.prototype._attachExtraTrace;
                ot.longStackTraces = !0, K = function K() {
                  if (I.haveItemsQueued() && !ot.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                  e.prototype._captureStackTrace = t, e.prototype._attachExtraTrace = r, n.deactivateLongStackTraces(), I.enableTrampoline(), ot.longStackTraces = !1;
                }, e.prototype._captureStackTrace = f, e.prototype._attachExtraTrace = _, n.activateLongStackTraces(), I.disableTrampolineIfNecessary();
              }
            }, e.hasLongStackTraces = function () {
              return ot.longStackTraces && T();
            };

            var J = function () {
              try {
                if ("function" == typeof CustomEvent) {
                  var t = new CustomEvent("CustomEvent");
                  return H.global.dispatchEvent(t), function (t, e) {
                    var n = new CustomEvent(t.toLowerCase(), {
                      detail: e,
                      cancelable: !0
                    });
                    return !H.global.dispatchEvent(n);
                  };
                }

                if ("function" == typeof Event) {
                  var t = new Event("CustomEvent");
                  return H.global.dispatchEvent(t), function (t, e) {
                    var n = new Event(t.toLowerCase(), {
                      cancelable: !0
                    });
                    return n.detail = e, !H.global.dispatchEvent(n);
                  };
                }

                var t = document.createEvent("CustomEvent");
                return t.initCustomEvent("testingtheevent", !1, !0, {}), H.global.dispatchEvent(t), function (t, e) {
                  var n = document.createEvent("CustomEvent");
                  return n.initCustomEvent(t.toLowerCase(), !1, !0, e), !H.global.dispatchEvent(n);
                };
              } catch (e) {}

              return function () {
                return !1;
              };
            }(),
                Y = function () {
              return H.isNode ? function () {
                return process.emit.apply(process, arguments);
              } : H.global ? function (t) {
                var e = "on" + t.toLowerCase(),
                    n = H.global[e];
                return n ? (n.apply(H.global, [].slice.call(arguments, 1)), !0) : !1;
              } : function () {
                return !1;
              };
            }(),
                Z = {
              promiseCreated: r,
              promiseFulfilled: r,
              promiseRejected: r,
              promiseResolved: r,
              promiseCancelled: r,
              promiseChained: function promiseChained(t, e, n) {
                return {
                  promise: e,
                  child: n
                };
              },
              warning: function warning(t, e) {
                return {
                  warning: e
                };
              },
              unhandledRejection: function unhandledRejection(t, e, n) {
                return {
                  reason: e,
                  promise: n
                };
              },
              rejectionHandled: r
            },
                tt = function tt(t) {
              var e = !1;

              try {
                e = Y.apply(null, arguments);
              } catch (n) {
                I.throwLater(n), e = !0;
              }

              var r = !1;

              try {
                r = J(t, Z[t].apply(null, arguments));
              } catch (n) {
                I.throwLater(n), r = !0;
              }

              return r || e;
            };

            e.config = function (t) {
              if (t = Object(t), "longStackTraces" in t && (t.longStackTraces ? e.longStackTraces() : !t.longStackTraces && e.hasLongStackTraces() && K()), "warnings" in t) {
                var n = t.warnings;
                ot.warnings = !!n, W = ot.warnings, H.isObject(n) && "wForgottenReturn" in n && (W = !!n.wForgottenReturn);
              }

              if ("cancellation" in t && t.cancellation && !ot.cancellation) {
                if (I.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
                e.prototype._clearCancellationData = l, e.prototype._propagateFrom = u, e.prototype._onCancel = a, e.prototype._setOnCancel = c, e.prototype._attachCancellationCallback = s, e.prototype._execute = o, et = u, ot.cancellation = !0;
              }

              return "monitoring" in t && (t.monitoring && !ot.monitoring ? (ot.monitoring = !0, e.prototype._fireEvent = tt) : !t.monitoring && ot.monitoring && (ot.monitoring = !1, e.prototype._fireEvent = i)), e;
            }, e.prototype._fireEvent = i, e.prototype._execute = function (t, e, n) {
              try {
                t(e, n);
              } catch (r) {
                return r;
              }
            }, e.prototype._onCancel = function () {}, e.prototype._setOnCancel = function (t) {}, e.prototype._attachCancellationCallback = function (t) {}, e.prototype._captureStackTrace = function () {}, e.prototype._attachExtraTrace = function () {}, e.prototype._clearCancellationData = function () {}, e.prototype._propagateFrom = function (t, e) {};

            var et = p,
                nt = function nt() {
              return !1;
            },
                rt = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;

            H.inherits(S, Error), n.CapturedTrace = S, S.prototype.uncycle = function () {
              var t = this._length;

              if (!(2 > t)) {
                for (var e = [], n = {}, r = 0, i = this; void 0 !== i; ++r) {
                  e.push(i), i = i._parent;
                }

                t = this._length = r;

                for (var r = t - 1; r >= 0; --r) {
                  var o = e[r].stack;
                  void 0 === n[o] && (n[o] = r);
                }

                for (var r = 0; t > r; ++r) {
                  var s = e[r].stack,
                      a = n[s];

                  if (void 0 !== a && a !== r) {
                    a > 0 && (e[a - 1]._parent = void 0, e[a - 1]._length = 1), e[r]._parent = void 0, e[r]._length = 1;
                    var c = r > 0 ? e[r - 1] : this;
                    t - 1 > a ? (c._parent = e[a + 1], c._parent.uncycle(), c._length = c._parent._length + 1) : (c._parent = void 0, c._length = 1);

                    for (var l = c._length + 1, u = r - 2; u >= 0; --u) {
                      e[u]._length = l, l++;
                    }

                    return;
                  }
                }
              }
            }, S.prototype.attachExtraTrace = function (t) {
              if (!t.__stackCleaned__) {
                this.uncycle();

                for (var e = j(t), n = e.message, r = [e.stack], i = this; void 0 !== i;) {
                  r.push(w(i.stack.split("\n"))), i = i._parent;
                }

                b(r), g(r), H.notEnumerableProp(t, "stack", m(n, r)), H.notEnumerableProp(t, "__stackCleaned__", !0);
              }
            };

            var it = function () {
              var t = /^\s*at\s*/,
                  e = function e(t, _e) {
                return "string" == typeof t ? t : void 0 !== _e.name && void 0 !== _e.message ? _e.toString() : F(_e);
              };

              if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                Error.stackTraceLimit += 6, q = t, Q = e;
                var n = Error.captureStackTrace;
                return nt = function nt(t) {
                  return B.test(t);
                }, function (t, e) {
                  Error.stackTraceLimit += 6, n(t, e), Error.stackTraceLimit -= 6;
                };
              }

              var r = new Error();
              if ("string" == typeof r.stack && r.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return q = /@/, Q = e, $ = !0, function (t) {
                t.stack = new Error().stack;
              };
              var i;

              try {
                throw new Error();
              } catch (o) {
                i = "stack" in o;
              }

              return "stack" in r || !i || "number" != typeof Error.stackTraceLimit ? (Q = function Q(t, e) {
                return "string" == typeof t ? t : "object" != _typeof(e) && "function" != typeof e || void 0 === e.name || void 0 === e.message ? F(e) : e.toString();
              }, null) : (q = t, Q = e, function (t) {
                Error.stackTraceLimit += 6;

                try {
                  throw new Error();
                } catch (e) {
                  t.stack = e.stack;
                }

                Error.stackTraceLimit -= 6;
              });
            }();

            "undefined" != typeof console && "undefined" != typeof console.warn && (D = function D(t) {
              console.warn(t);
            }, H.isNode && process.stderr.isTTY ? D = function D(t, e) {
              var n = e ? "[33m" : "[31m";
              console.warn(n + t + "[0m\n");
            } : H.isNode || "string" != typeof new Error().stack || (D = function D(t, e) {
              console.warn("%c" + t, e ? "color: darkorange" : "color: red");
            }));
            var ot = {
              warnings: z,
              longStackTraces: !1,
              cancellation: !1,
              monitoring: !1
            };
            return X && e.longStackTraces(), {
              longStackTraces: function longStackTraces() {
                return ot.longStackTraces;
              },
              warnings: function warnings() {
                return ot.warnings;
              },
              cancellation: function cancellation() {
                return ot.cancellation;
              },
              monitoring: function monitoring() {
                return ot.monitoring;
              },
              propagateFromFunction: function propagateFromFunction() {
                return et;
              },
              boundValueFunction: function boundValueFunction() {
                return h;
              },
              checkForgottenReturns: d,
              setBounds: R,
              warn: y,
              deprecated: v,
              CapturedTrace: S,
              fireDomEvent: J,
              fireGlobalEvent: Y
            };
          };
        }, {
          "./errors": 12,
          "./util": 36
        }],
        10: [function (t, e, n) {

          e.exports = function (t) {
            function e() {
              return this.value;
            }

            function n() {
              throw this.reason;
            }

            t.prototype["return"] = t.prototype.thenReturn = function (n) {
              return n instanceof t && n.suppressUnhandledRejections(), this._then(e, void 0, void 0, {
                value: n
              }, void 0);
            }, t.prototype["throw"] = t.prototype.thenThrow = function (t) {
              return this._then(n, void 0, void 0, {
                reason: t
              }, void 0);
            }, t.prototype.catchThrow = function (t) {
              if (arguments.length <= 1) return this._then(void 0, n, void 0, {
                reason: t
              }, void 0);

              var e = arguments[1],
                  r = function r() {
                throw e;
              };

              return this.caught(t, r);
            }, t.prototype.catchReturn = function (n) {
              if (arguments.length <= 1) return n instanceof t && n.suppressUnhandledRejections(), this._then(void 0, e, void 0, {
                value: n
              }, void 0);
              var r = arguments[1];
              r instanceof t && r.suppressUnhandledRejections();

              var i = function i() {
                return r;
              };

              return this.caught(n, i);
            };
          };
        }, {}],
        11: [function (t, e, n) {

          e.exports = function (t, e) {
            function n() {
              return o(this);
            }

            function r(t, n) {
              return i(t, n, e, e);
            }

            var i = t.reduce,
                o = t.all;
            t.prototype.each = function (t) {
              return i(this, t, e, 0)._then(n, void 0, void 0, this, void 0);
            }, t.prototype.mapSeries = function (t) {
              return i(this, t, e, e);
            }, t.each = function (t, r) {
              return i(t, r, e, 0)._then(n, void 0, void 0, t, void 0);
            }, t.mapSeries = r;
          };
        }, {}],
        12: [function (t, e, n) {

          function r(t, e) {
            function n(r) {
              return this instanceof n ? (p(this, "message", "string" == typeof r ? r : e), p(this, "name", t), void (Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this))) : new n(r);
            }

            return u(n, Error), n;
          }

          function i(t) {
            return this instanceof i ? (p(this, "name", "OperationalError"), p(this, "message", t), this.cause = t, this.isOperational = !0, void (t instanceof Error ? (p(this, "message", t.message), p(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor))) : new i(t);
          }

          var o,
              s,
              a = t("./es5"),
              c = a.freeze,
              l = t("./util"),
              u = l.inherits,
              p = l.notEnumerableProp,
              h = r("Warning", "warning"),
              f = r("CancellationError", "cancellation error"),
              _ = r("TimeoutError", "timeout error"),
              d = r("AggregateError", "aggregate error");

          try {
            o = TypeError, s = RangeError;
          } catch (v) {
            o = r("TypeError", "type error"), s = r("RangeError", "range error");
          }

          for (var y = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), m = 0; m < y.length; ++m) {
            "function" == typeof Array.prototype[y[m]] && (d.prototype[y[m]] = Array.prototype[y[m]]);
          }

          a.defineProperty(d.prototype, "length", {
            value: 0,
            configurable: !1,
            writable: !0,
            enumerable: !0
          }), d.prototype.isOperational = !0;
          var g = 0;
          d.prototype.toString = function () {
            var t = Array(4 * g + 1).join(" "),
                e = "\n" + t + "AggregateError of:\n";
            g++, t = Array(4 * g + 1).join(" ");

            for (var n = 0; n < this.length; ++n) {
              for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", i = r.split("\n"), o = 0; o < i.length; ++o) {
                i[o] = t + i[o];
              }

              r = i.join("\n"), e += r + "\n";
            }

            return g--, e;
          }, u(i, Error);
          var b = Error.__BluebirdErrorTypes__;
          b || (b = c({
            CancellationError: f,
            TimeoutError: _,
            OperationalError: i,
            RejectionError: i,
            AggregateError: d
          }), a.defineProperty(Error, "__BluebirdErrorTypes__", {
            value: b,
            writable: !1,
            enumerable: !1,
            configurable: !1
          })), e.exports = {
            Error: Error,
            TypeError: o,
            RangeError: s,
            CancellationError: b.CancellationError,
            OperationalError: b.OperationalError,
            TimeoutError: b.TimeoutError,
            AggregateError: b.AggregateError,
            Warning: h
          };
        }, {
          "./es5": 13,
          "./util": 36
        }],
        13: [function (t, e, n) {
          var r = function () {

            return void 0 === this;
          }();

          if (r) e.exports = {
            freeze: Object.freeze,
            defineProperty: Object.defineProperty,
            getDescriptor: Object.getOwnPropertyDescriptor,
            keys: Object.keys,
            names: Object.getOwnPropertyNames,
            getPrototypeOf: Object.getPrototypeOf,
            isArray: Array.isArray,
            isES5: r,
            propertyIsWritable: function propertyIsWritable(t, e) {
              var n = Object.getOwnPropertyDescriptor(t, e);
              return !(n && !n.writable && !n.set);
            }
          };else {
            var i = {}.hasOwnProperty,
                o = {}.toString,
                s = {}.constructor.prototype,
                a = function a(t) {
              var e = [];

              for (var n in t) {
                i.call(t, n) && e.push(n);
              }

              return e;
            },
                c = function c(t, e) {
              return {
                value: t[e]
              };
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
            };

            e.exports = {
              isArray: h,
              keys: a,
              names: a,
              defineProperty: l,
              getDescriptor: c,
              freeze: u,
              getPrototypeOf: p,
              isES5: r,
              propertyIsWritable: function propertyIsWritable() {
                return !0;
              }
            };
          }
        }, {}],
        14: [function (t, e, n) {

          e.exports = function (t, e) {
            var n = t.map;
            t.prototype.filter = function (t, r) {
              return n(this, t, r, e);
            }, t.filter = function (t, r, i) {
              return n(t, r, i, e);
            };
          };
        }, {}],
        15: [function (t, e, n) {

          e.exports = function (e, n, r) {
            function i(t, e, n) {
              this.promise = t, this.type = e, this.handler = n, this.called = !1, this.cancelPromise = null;
            }

            function o(t) {
              this.finallyHandler = t;
            }

            function s(t, e) {
              return null != t.cancelPromise ? (arguments.length > 1 ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), t.cancelPromise = null, !0) : !1;
            }

            function a() {
              return l.call(this, this.promise._target()._settledValue());
            }

            function c(t) {
              return s(this, t) ? void 0 : (h.e = t, h);
            }

            function l(t) {
              var i = this.promise,
                  l = this.handler;

              if (!this.called) {
                this.called = !0;
                var u = this.isFinallyHandler() ? l.call(i._boundValue()) : l.call(i._boundValue(), t);
                if (u === r) return u;

                if (void 0 !== u) {
                  i._setReturnedNonUndefined();

                  var f = n(u, i);

                  if (f instanceof e) {
                    if (null != this.cancelPromise) {
                      if (f._isCancelled()) {
                        var _ = new p("late cancellation observer");

                        return i._attachExtraTrace(_), h.e = _, h;
                      }

                      f.isPending() && f._attachCancellationCallback(new o(this));
                    }

                    return f._then(a, c, void 0, this, void 0);
                  }
                }
              }

              return i.isRejected() ? (s(this), h.e = t, h) : (s(this), t);
            }

            var u = t("./util"),
                p = e.CancellationError,
                h = u.errorObj,
                f = t("./catch_filter")(r);
            return i.prototype.isFinallyHandler = function () {
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
              var n = arguments.length;
              if (1 === n) return this._passThrough(t, 1, void 0, l);
              var r,
                  i = new Array(n - 1),
                  o = 0;

              for (r = 0; n - 1 > r; ++r) {
                var s = arguments[r];
                if (!u.isObject(s)) return e.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + u.classString(s)));
                i[o++] = s;
              }

              i.length = o;
              var a = arguments[r];
              return this._passThrough(f(i, a, this), 1, void 0, l);
            }, i;
          };
        }, {
          "./catch_filter": 7,
          "./util": 36
        }],
        16: [function (t, e, n) {

          e.exports = function (e, n, r, i, o, s) {
            function a(t, n, r) {
              for (var o = 0; o < n.length; ++o) {
                r._pushContext();

                var s = f(n[o])(t);

                if (r._popContext(), s === h) {
                  r._pushContext();

                  var a = e.reject(h.e);
                  return r._popContext(), a;
                }

                var c = i(s, r);
                if (c instanceof e) return c;
              }

              return null;
            }

            function c(t, n, i, o) {
              if (s.cancellation()) {
                var a = new e(r),
                    c = this._finallyPromise = new e(r);
                this._promise = a.lastly(function () {
                  return c;
                }), a._captureStackTrace(), a._setOnCancel(this);
              } else {
                var l = this._promise = new e(r);

                l._captureStackTrace();
              }

              this._stack = o, this._generatorFunction = t, this._receiver = n, this._generator = void 0, this._yieldHandlers = "function" == typeof i ? [i].concat(_) : _, this._yieldedPromise = null, this._cancellationPhase = !1;
            }

            var l = t("./errors"),
                u = l.TypeError,
                p = t("./util"),
                h = p.errorObj,
                f = p.tryCatch,
                _ = [];
            p.inherits(c, o), c.prototype._isResolved = function () {
              return null === this._promise;
            }, c.prototype._cleanup = function () {
              this._promise = this._generator = null, s.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), this._finallyPromise = null);
            }, c.prototype._promiseCancelled = function () {
              if (!this._isResolved()) {
                var t,
                    n = "undefined" != typeof this._generator["return"];
                if (n) this._promise._pushContext(), t = f(this._generator["return"]).call(this._generator, void 0), this._promise._popContext();else {
                  var r = new e.CancellationError("generator .return() sentinel");
                  e.coroutine.returnSentinel = r, this._promise._attachExtraTrace(r), this._promise._pushContext(), t = f(this._generator["throw"]).call(this._generator, r), this._promise._popContext();
                }
                this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(t);
              }
            }, c.prototype._promiseFulfilled = function (t) {
              this._yieldedPromise = null, this._promise._pushContext();
              var e = f(this._generator.next).call(this._generator, t);
              this._promise._popContext(), this._continue(e);
            }, c.prototype._promiseRejected = function (t) {
              this._yieldedPromise = null, this._promise._attachExtraTrace(t), this._promise._pushContext();
              var e = f(this._generator["throw"]).call(this._generator, t);
              this._promise._popContext(), this._continue(e);
            }, c.prototype._resultCancelled = function () {
              if (this._yieldedPromise instanceof e) {
                var t = this._yieldedPromise;
                this._yieldedPromise = null, t.cancel();
              }
            }, c.prototype.promise = function () {
              return this._promise;
            }, c.prototype._run = function () {
              this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0);
            }, c.prototype._continue = function (t) {
              var n = this._promise;
              if (t === h) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._rejectCallback(t.e, !1);
              var r = t.value;
              if (t.done === !0) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._resolveCallback(r);
              var o = i(r, this._promise);
              if (!(o instanceof e) && (o = a(o, this._yieldHandlers, this._promise), null === o)) return void this._promiseRejected(new u("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(r)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
              o = o._target();
              var s = o._bitField;
              0 === (50397184 & s) ? (this._yieldedPromise = o, o._proxy(this, null)) : 0 !== (33554432 & s) ? e._async.invoke(this._promiseFulfilled, this, o._value()) : 0 !== (16777216 & s) ? e._async.invoke(this._promiseRejected, this, o._reason()) : this._promiseCancelled();
            }, e.coroutine = function (t, e) {
              if ("function" != typeof t) throw new u("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
              var n = Object(e).yieldHandler,
                  r = c,
                  i = new Error().stack;
              return function () {
                var e = t.apply(this, arguments),
                    o = new r(void 0, void 0, n, i),
                    s = o.promise();
                return o._generator = e, o._promiseFulfilled(void 0), s;
              };
            }, e.coroutine.addYieldHandler = function (t) {
              if ("function" != typeof t) throw new u("expecting a function but got " + p.classString(t));

              _.push(t);
            }, e.spawn = function (t) {
              if (s.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t) return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
              var r = new c(t, this),
                  i = r.promise();
              return r._run(e.spawn), i;
            };
          };
        }, {
          "./errors": 12,
          "./util": 36
        }],
        17: [function (t, e, n) {

          e.exports = function (e, n, r, i, o, s) {
            var a = t("./util");
            a.canEvaluate, a.tryCatch, a.errorObj;

            e.join = function () {
              var t,
                  e = arguments.length - 1;

              if (e > 0 && "function" == typeof arguments[e]) {
                t = arguments[e];
                var r;
              }

              var i = [].slice.call(arguments);
              t && i.pop();
              var r = new n(i).promise();
              return void 0 !== t ? r.spread(t) : r;
            };
          };
        }, {
          "./util": 36
        }],
        18: [function (t, e, n) {

          e.exports = function (e, n, r, i, o, s) {
            function a(t, e, n, r) {
              this.constructor$(t), this._promise._captureStackTrace();
              var i = l();
              this._callback = null === i ? e : u.domainBind(i, e), this._preservedValues = r === o ? new Array(this.length()) : null, this._limit = n, this._inFlight = 0, this._queue = [], f.invoke(this._asyncInit, this, void 0);
            }

            function c(t, n, i, o) {
              if ("function" != typeof n) return r("expecting a function but got " + u.classString(n));
              var s = 0;

              if (void 0 !== i) {
                if ("object" != _typeof(i) || null === i) return e.reject(new TypeError("options argument must be an object but it is " + u.classString(i)));
                if ("number" != typeof i.concurrency) return e.reject(new TypeError("'concurrency' must be a number but it is " + u.classString(i.concurrency)));
                s = i.concurrency;
              }

              return s = "number" == typeof s && isFinite(s) && s >= 1 ? s : 0, new a(t, n, s, o).promise();
            }

            var l = e._getDomain,
                u = t("./util"),
                p = u.tryCatch,
                h = u.errorObj,
                f = e._async;
            u.inherits(a, n), a.prototype._asyncInit = function () {
              this._init$(void 0, -2);
            }, a.prototype._init = function () {}, a.prototype._promiseFulfilled = function (t, n) {
              var r = this._values,
                  o = this.length(),
                  a = this._preservedValues,
                  c = this._limit;

              if (0 > n) {
                if (n = -1 * n - 1, r[n] = t, c >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return !0;
              } else {
                if (c >= 1 && this._inFlight >= c) return r[n] = t, this._queue.push(n), !1;
                null !== a && (a[n] = t);

                var l = this._promise,
                    u = this._callback,
                    f = l._boundValue();

                l._pushContext();

                var _ = p(u).call(f, t, n, o),
                    d = l._popContext();

                if (s.checkForgottenReturns(_, d, null !== a ? "Promise.filter" : "Promise.map", l), _ === h) return this._reject(_.e), !0;
                var v = i(_, this._promise);

                if (v instanceof e) {
                  v = v._target();
                  var y = v._bitField;
                  if (0 === (50397184 & y)) return c >= 1 && this._inFlight++, r[n] = v, v._proxy(this, -1 * (n + 1)), !1;
                  if (0 === (33554432 & y)) return 0 !== (16777216 & y) ? (this._reject(v._reason()), !0) : (this._cancel(), !0);
                  _ = v._value();
                }

                r[n] = _;
              }

              var m = ++this._totalResolved;
              return m >= o ? (null !== a ? this._filter(r, a) : this._resolve(r), !0) : !1;
            }, a.prototype._drainQueue = function () {
              for (var t = this._queue, e = this._limit, n = this._values; t.length > 0 && this._inFlight < e;) {
                if (this._isResolved()) return;
                var r = t.pop();

                this._promiseFulfilled(n[r], r);
              }
            }, a.prototype._filter = function (t, e) {
              for (var n = e.length, r = new Array(n), i = 0, o = 0; n > o; ++o) {
                t[o] && (r[i++] = e[o]);
              }

              r.length = i, this._resolve(r);
            }, a.prototype.preservedValues = function () {
              return this._preservedValues;
            }, e.prototype.map = function (t, e) {
              return c(this, t, e, null);
            }, e.map = function (t, e, n, r) {
              return c(t, e, n, r);
            };
          };
        }, {
          "./util": 36
        }],
        19: [function (t, e, n) {

          e.exports = function (e, n, r, i, o) {
            var s = t("./util"),
                a = s.tryCatch;
            e.method = function (t) {
              if ("function" != typeof t) throw new e.TypeError("expecting a function but got " + s.classString(t));
              return function () {
                var r = new e(n);
                r._captureStackTrace(), r._pushContext();

                var i = a(t).apply(this, arguments),
                    s = r._popContext();

                return o.checkForgottenReturns(i, s, "Promise.method", r), r._resolveFromSyncValue(i), r;
              };
            }, e.attempt = e["try"] = function (t) {
              if ("function" != typeof t) return i("expecting a function but got " + s.classString(t));
              var r = new e(n);
              r._captureStackTrace(), r._pushContext();
              var c;

              if (arguments.length > 1) {
                o.deprecated("calling Promise.try with more than 1 argument");
                var l = arguments[1],
                    u = arguments[2];
                c = s.isArray(l) ? a(t).apply(u, l) : a(t).call(u, l);
              } else c = a(t)();

              var p = r._popContext();

              return o.checkForgottenReturns(c, p, "Promise.try", r), r._resolveFromSyncValue(c), r;
            }, e.prototype._resolveFromSyncValue = function (t) {
              t === s.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0);
            };
          };
        }, {
          "./util": 36
        }],
        20: [function (t, e, n) {

          function r(t) {
            return t instanceof Error && u.getPrototypeOf(t) === Error.prototype;
          }

          function i(t) {
            var e;

            if (r(t)) {
              e = new l(t), e.name = t.name, e.message = t.message, e.stack = t.stack;

              for (var n = u.keys(t), i = 0; i < n.length; ++i) {
                var o = n[i];
                p.test(o) || (e[o] = t[o]);
              }

              return e;
            }

            return s.markAsOriginatingFromRejection(t), t;
          }

          function o(t, e) {
            return function (n, r) {
              if (null !== t) {
                if (n) {
                  var o = i(a(n));
                  t._attachExtraTrace(o), t._reject(o);
                } else if (e) {
                  var s = [].slice.call(arguments, 1);

                  t._fulfill(s);
                } else t._fulfill(r);

                t = null;
              }
            };
          }

          var s = t("./util"),
              a = s.maybeWrapAsError,
              c = t("./errors"),
              l = c.OperationalError,
              u = t("./es5"),
              p = /^(?:name|message|stack|cause)$/;
          e.exports = o;
        }, {
          "./errors": 12,
          "./es5": 13,
          "./util": 36
        }],
        21: [function (t, e, n) {

          e.exports = function (e) {
            function n(t, e) {
              var n = this;
              if (!o.isArray(t)) return r.call(n, t, e);
              var i = a(e).apply(n._boundValue(), [null].concat(t));
              i === c && s.throwLater(i.e);
            }

            function r(t, e) {
              var n = this,
                  r = n._boundValue(),
                  i = void 0 === t ? a(e).call(r, null) : a(e).call(r, null, t);

              i === c && s.throwLater(i.e);
            }

            function i(t, e) {
              var n = this;

              if (!t) {
                var r = new Error(t + "");
                r.cause = t, t = r;
              }

              var i = a(e).call(n._boundValue(), t);
              i === c && s.throwLater(i.e);
            }

            var o = t("./util"),
                s = e._async,
                a = o.tryCatch,
                c = o.errorObj;

            e.prototype.asCallback = e.prototype.nodeify = function (t, e) {
              if ("function" == typeof t) {
                var o = r;
                void 0 !== e && Object(e).spread && (o = n), this._then(o, i, void 0, this, t);
              }

              return this;
            };
          };
        }, {
          "./util": 36
        }],
        22: [function (t, e, n) {

          e.exports = function () {
            function n() {}

            function r(t, e) {
              if (null == t || t.constructor !== i) throw new m("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
              if ("function" != typeof e) throw new m("expecting a function but got " + f.classString(e));
            }

            function i(t) {
              t !== b && r(this, t), this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, this._resolveFromExecutor(t), this._promiseCreated(), this._fireEvent("promiseCreated", this);
            }

            function o(t) {
              this.promise._resolveCallback(t);
            }

            function s(t) {
              this.promise._rejectCallback(t, !1);
            }

            function a(t) {
              var e = new i(b);
              e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._promise0 = t, e._receiver0 = t;
            }

            var c,
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
                f = t("./util");

            c = f.isNode ? function () {
              var t = process.domain;
              return void 0 === t && (t = null), t;
            } : function () {
              return null;
            }, f.notEnumerableProp(i, "_getDomain", c);

            var _ = t("./es5"),
                d = t("./async"),
                v = new d();

            _.defineProperty(i, "_async", {
              value: v
            });

            var y = t("./errors"),
                m = i.TypeError = y.TypeError;
            i.RangeError = y.RangeError;
            var g = i.CancellationError = y.CancellationError;
            i.TimeoutError = y.TimeoutError, i.OperationalError = y.OperationalError, i.RejectionError = y.OperationalError, i.AggregateError = y.AggregateError;

            var b = function b() {},
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
                O = f.tryCatch;

            return i.prototype.toString = function () {
              return "[object Promise]";
            }, i.prototype.caught = i.prototype["catch"] = function (t) {
              var e = arguments.length;

              if (e > 1) {
                var n,
                    r = new Array(e - 1),
                    i = 0;

                for (n = 0; e - 1 > n; ++n) {
                  var o = arguments[n];
                  if (!f.isObject(o)) return p("Catch statement predicate: expecting an object but got " + f.classString(o));
                  r[i++] = o;
                }

                return r.length = i, t = arguments[n], this.then(void 0, P(r, t, this));
              }

              return this.then(void 0, t);
            }, i.prototype.reflect = function () {
              return this._then(u, u, void 0, this, void 0);
            }, i.prototype.then = function (t, e) {
              if (x.warnings() && arguments.length > 0 && "function" != typeof t && "function" != typeof e) {
                var n = ".then() only accepts functions but was passed: " + f.classString(t);
                arguments.length > 1 && (n += ", " + f.classString(e)), this._warn(n);
              }

              return this._then(t, e, void 0, void 0, void 0);
            }, i.prototype.done = function (t, e) {
              var n = this._then(t, e, void 0, void 0, void 0);

              n._setIsFinal();
            }, i.prototype.spread = function (t) {
              return "function" != typeof t ? p("expecting a function but got " + f.classString(t)) : this.all()._then(t, void 0, void 0, w, void 0);
            }, i.prototype.toJSON = function () {
              var t = {
                isFulfilled: !1,
                isRejected: !1,
                fulfillmentValue: void 0,
                rejectionReason: void 0
              };
              return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), t.isRejected = !0), t;
            }, i.prototype.all = function () {
              return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new E(this).promise();
            }, i.prototype.error = function (t) {
              return this.caught(f.originatesFromRejection, t);
            }, i.getNewLibraryCopy = e.exports, i.is = function (t) {
              return t instanceof i;
            }, i.fromNode = i.fromCallback = function (t) {
              var e = new i(b);

              e._captureStackTrace();

              var n = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : !1,
                  r = O(t)(R(e, n));
              return r === S && e._rejectCallback(r.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), e;
            }, i.all = function (t) {
              return new E(t).promise();
            }, i.cast = function (t) {
              var e = j(t);
              return e instanceof i || (e = new i(b), e._captureStackTrace(), e._setFulfilled(), e._rejectionHandler0 = t), e;
            }, i.resolve = i.fulfilled = i.cast, i.reject = i.rejected = function (t) {
              var e = new i(b);
              return e._captureStackTrace(), e._rejectCallback(t, !0), e;
            }, i.setScheduler = function (t) {
              if ("function" != typeof t) throw new m("expecting a function but got " + f.classString(t));
              return v.setScheduler(t);
            }, i.prototype._then = function (t, e, n, r, o) {
              var s = void 0 !== o,
                  a = s ? o : new i(b),
                  l = this._target(),
                  u = l._bitField;

              s || (a._propagateFrom(this, 3), a._captureStackTrace(), void 0 === r && 0 !== (2097152 & this._bitField) && (r = 0 !== (50397184 & u) ? this._boundValue() : l === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, a));
              var p = c();

              if (0 !== (50397184 & u)) {
                var h,
                    _,
                    d = l._settlePromiseCtx;

                0 !== (33554432 & u) ? (_ = l._rejectionHandler0, h = t) : 0 !== (16777216 & u) ? (_ = l._fulfillmentHandler0, h = e, l._unsetRejectionIsUnhandled()) : (d = l._settlePromiseLateCancellationObserver, _ = new g("late cancellation observer"), l._attachExtraTrace(_), h = e), v.invoke(d, l, {
                  handler: null === p ? h : "function" == typeof h && f.domainBind(p, h),
                  promise: a,
                  receiver: r,
                  value: _
                });
              } else l._addCallbacks(t, e, a, r, p);

              return a;
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
              var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
              return e === h ? void 0 : void 0 === e && this._isBound() ? this._boundValue() : e;
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
                  i = t._receiverAt(0);

              void 0 === i && (i = h), this._addCallbacks(e, n, r, i, null);
            }, i.prototype._migrateCallbackAt = function (t, e) {
              var n = t._fulfillmentHandlerAt(e),
                  r = t._rejectionHandlerAt(e),
                  i = t._promiseAt(e),
                  o = t._receiverAt(e);

              void 0 === o && (o = h), this._addCallbacks(n, r, i, o, null);
            }, i.prototype._addCallbacks = function (t, e, n, r, i) {
              var o = this._length();

              if (o >= 65531 && (o = 0, this._setLength(0)), 0 === o) this._promise0 = n, this._receiver0 = r, "function" == typeof t && (this._fulfillmentHandler0 = null === i ? t : f.domainBind(i, t)), "function" == typeof e && (this._rejectionHandler0 = null === i ? e : f.domainBind(i, e));else {
                var s = 4 * o - 4;
                this[s + 2] = n, this[s + 3] = r, "function" == typeof t && (this[s + 0] = null === i ? t : f.domainBind(i, t)), "function" == typeof e && (this[s + 1] = null === i ? e : f.domainBind(i, e));
              }
              return this._setLength(o + 1), o;
            }, i.prototype._proxy = function (t, e) {
              this._addCallbacks(void 0, void 0, e, t, null);
            }, i.prototype._resolveCallback = function (t, e) {
              if (0 === (117506048 & this._bitField)) {
                if (t === this) return this._rejectCallback(l(), !1);
                var n = j(t, this);
                if (!(n instanceof i)) return this._fulfill(t);
                e && this._propagateFrom(n, 2);

                var r = n._target();

                if (r === this) return void this._reject(l());
                var o = r._bitField;

                if (0 === (50397184 & o)) {
                  var s = this._length();

                  s > 0 && r._migrateCallback0(this);

                  for (var a = 1; s > a; ++a) {
                    r._migrateCallbackAt(this, a);
                  }

                  this._setFollowing(), this._setLength(0), this._setFollowee(r);
                } else if (0 !== (33554432 & o)) this._fulfill(r._value());else if (0 !== (16777216 & o)) this._reject(r._reason());else {
                  var c = new g("late cancellation observer");
                  r._attachExtraTrace(c), this._reject(c);
                }
              }
            }, i.prototype._rejectCallback = function (t, e, n) {
              var r = f.ensureErrorObject(t),
                  i = r === t;

              if (!i && !n && x.warnings()) {
                var o = "a promise was rejected with a non-error: " + f.classString(t);

                this._warn(o, !0);
              }

              this._attachExtraTrace(r, e ? i : !1), this._reject(t);
            }, i.prototype._resolveFromExecutor = function (t) {
              if (t !== b) {
                var e = this;
                this._captureStackTrace(), this._pushContext();

                var n = !0,
                    r = this._execute(t, function (t) {
                  e._resolveCallback(t);
                }, function (t) {
                  e._rejectCallback(t, n);
                });

                n = !1, this._popContext(), void 0 !== r && e._rejectCallback(r, !0);
              }
            }, i.prototype._settlePromiseFromHandler = function (t, e, n, r) {
              var i = r._bitField;

              if (0 === (65536 & i)) {
                r._pushContext();

                var o;
                e === w ? n && "number" == typeof n.length ? o = O(t).apply(this._boundValue(), n) : (o = S, o.e = new m("cannot .spread() a non-array: " + f.classString(n))) : o = O(t).call(e, n);

                var s = r._popContext();

                i = r._bitField, 0 === (65536 & i) && (o === C ? r._reject(n) : o === S ? r._rejectCallback(o.e, !1) : (x.checkForgottenReturns(o, s, "", r, this), r._resolveCallback(o)));
              }
            }, i.prototype._target = function () {
              for (var t = this; t._isFollowing();) {
                t = t._followee();
              }

              return t;
            }, i.prototype._followee = function () {
              return this._rejectionHandler0;
            }, i.prototype._setFollowee = function (t) {
              this._rejectionHandler0 = t;
            }, i.prototype._settlePromise = function (t, e, r, o) {
              var s = t instanceof i,
                  a = this._bitField,
                  c = 0 !== (134217728 & a);
              0 !== (65536 & a) ? (s && t._invokeInternalOnCancel(), r instanceof T && r.isFinallyHandler() ? (r.cancelPromise = t, O(e).call(r, o) === S && t._reject(S.e)) : e === u ? t._fulfill(u.call(r)) : r instanceof n ? r._promiseCancelled(t) : s || t instanceof E ? t._cancel() : r.cancel()) : "function" == typeof e ? s ? (c && t._setAsyncGuaranteed(), this._settlePromiseFromHandler(e, r, o, t)) : e.call(r, o, t) : r instanceof n ? r._isResolved() || (0 !== (33554432 & a) ? r._promiseFulfilled(o, t) : r._promiseRejected(o, t)) : s && (c && t._setAsyncGuaranteed(), 0 !== (33554432 & a) ? t._fulfill(o) : t._reject(o));
            }, i.prototype._settlePromiseLateCancellationObserver = function (t) {
              var e = t.handler,
                  n = t.promise,
                  r = t.receiver,
                  o = t.value;
              "function" == typeof e ? n instanceof i ? this._settlePromiseFromHandler(e, r, o, n) : e.call(r, o, n) : n instanceof i && n._reject(o);
            }, i.prototype._settlePromiseCtx = function (t) {
              this._settlePromise(t.promise, t.handler, t.receiver, t.value);
            }, i.prototype._settlePromise0 = function (t, e, n) {
              var r = this._promise0,
                  i = this._receiverAt(0);

              this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(r, t, i, e);
            }, i.prototype._clearCallbackDataAtIndex = function (t) {
              var e = 4 * t - 4;
              this[e + 2] = this[e + 3] = this[e + 0] = this[e + 1] = void 0;
            }, i.prototype._fulfill = function (t) {
              var e = this._bitField;

              if (!((117506048 & e) >>> 16)) {
                if (t === this) {
                  var n = l();
                  return this._attachExtraTrace(n), this._reject(n);
                }

                this._setFulfilled(), this._rejectionHandler0 = t, (65535 & e) > 0 && (0 !== (134217728 & e) ? this._settlePromises() : v.settlePromises(this));
              }
            }, i.prototype._reject = function (t) {
              var e = this._bitField;
              if (!((117506048 & e) >>> 16)) return this._setRejected(), this._fulfillmentHandler0 = t, this._isFinal() ? v.fatalError(t, f.isNode) : void ((65535 & e) > 0 ? v.settlePromises(this) : this._ensurePossibleRejectionHandled());
            }, i.prototype._fulfillPromises = function (t, e) {
              for (var n = 1; t > n; n++) {
                var r = this._fulfillmentHandlerAt(n),
                    i = this._promiseAt(n),
                    o = this._receiverAt(n);

                this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
              }
            }, i.prototype._rejectPromises = function (t, e) {
              for (var n = 1; t > n; n++) {
                var r = this._rejectionHandlerAt(n),
                    i = this._promiseAt(n),
                    o = this._receiverAt(n);

                this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
              }
            }, i.prototype._settlePromises = function () {
              var t = this._bitField,
                  e = 65535 & t;

              if (e > 0) {
                if (0 !== (16842752 & t)) {
                  var n = this._fulfillmentHandler0;
                  this._settlePromise0(this._rejectionHandler0, n, t), this._rejectPromises(e, n);
                } else {
                  var r = this._rejectionHandler0;
                  this._settlePromise0(this._fulfillmentHandler0, r, t), this._fulfillPromises(e, r);
                }

                this._setLength(0);
              }

              this._clearCancellationData();
            }, i.prototype._settledValue = function () {
              var t = this._bitField;
              return 0 !== (33554432 & t) ? this._rejectionHandler0 : 0 !== (16777216 & t) ? this._fulfillmentHandler0 : void 0;
            }, i.defer = i.pending = function () {
              x.deprecated("Promise.defer", "new Promise");
              var t = new i(b);
              return {
                promise: t,
                resolve: o,
                reject: s
              };
            }, f.notEnumerableProp(i, "_makeSelfResolutionError", l), t("./method")(i, b, j, p, x), t("./bind")(i, b, j, x), t("./cancel")(i, E, p, x), t("./direct_resolve")(i), t("./synchronous_inspection")(i), t("./join")(i, E, j, b, v, c), i.Promise = i, i.version = "3.5.0", t("./map.js")(i, E, p, j, b, x), t("./call_get.js")(i), t("./using.js")(i, p, j, F, b, x), t("./timers.js")(i, b, x), t("./generators.js")(i, p, b, j, n, x), t("./nodeify.js")(i), t("./promisify.js")(i, b), t("./props.js")(i, E, j, p), t("./race.js")(i, b, j, p), t("./reduce.js")(i, E, p, j, b, x), t("./settle.js")(i, E, x), t("./some.js")(i, E, p), t("./filter.js")(i, b), t("./each.js")(i, b), t("./any.js")(i), f.toFastProperties(i), f.toFastProperties(i.prototype), a({
              a: 1
            }), a({
              b: 2
            }), a({
              c: 3
            }), a(1), a(function () {}), a(void 0), a(!1), a(new i(b)), x.setBounds(d.firstLineError, f.lastLineError), i;
          };
        }, {
          "./any.js": 1,
          "./async": 2,
          "./bind": 3,
          "./call_get.js": 5,
          "./cancel": 6,
          "./catch_filter": 7,
          "./context": 8,
          "./debuggability": 9,
          "./direct_resolve": 10,
          "./each.js": 11,
          "./errors": 12,
          "./es5": 13,
          "./filter.js": 14,
          "./finally": 15,
          "./generators.js": 16,
          "./join": 17,
          "./map.js": 18,
          "./method": 19,
          "./nodeback": 20,
          "./nodeify.js": 21,
          "./promise_array": 23,
          "./promisify.js": 24,
          "./props.js": 25,
          "./race.js": 27,
          "./reduce.js": 28,
          "./settle.js": 30,
          "./some.js": 31,
          "./synchronous_inspection": 32,
          "./thenables": 33,
          "./timers.js": 34,
          "./using.js": 35,
          "./util": 36
        }],
        23: [function (t, e, n) {

          e.exports = function (e, n, r, i, o) {
            function s(t) {
              switch (t) {
                case -2:
                  return [];

                case -3:
                  return {};

                case -6:
                  return new Map();
              }
            }

            function a(t) {
              var r = this._promise = new e(n);
              t instanceof e && r._propagateFrom(t, 3), r._setOnCancel(this), this._values = t, this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
            }

            var c = t("./util");
            c.isArray;
            return c.inherits(a, o), a.prototype.length = function () {
              return this._length;
            }, a.prototype.promise = function () {
              return this._promise;
            }, a.prototype._init = function l(t, n) {
              var o = r(this._values, this._promise);

              if (o instanceof e) {
                o = o._target();
                var a = o._bitField;
                if (this._values = o, 0 === (50397184 & a)) return this._promise._setAsyncGuaranteed(), o._then(l, this._reject, void 0, this, n);
                if (0 === (33554432 & a)) return 0 !== (16777216 & a) ? this._reject(o._reason()) : this._cancel();
                o = o._value();
              }

              if (o = c.asArray(o), null === o) {
                var u = i("expecting an array or an iterable object but got " + c.classString(o)).reason();
                return void this._promise._rejectCallback(u, !1);
              }

              return 0 === o.length ? void (-5 === n ? this._resolveEmptyArray() : this._resolve(s(n))) : void this._iterate(o);
            }, a.prototype._iterate = function (t) {
              var n = this.getActualLength(t.length);
              this._length = n, this._values = this.shouldCopyValues() ? new Array(n) : this._values;

              for (var i = this._promise, o = !1, s = null, a = 0; n > a; ++a) {
                var c = r(t[a], i);
                c instanceof e ? (c = c._target(), s = c._bitField) : s = null, o ? null !== s && c.suppressUnhandledRejections() : null !== s ? 0 === (50397184 & s) ? (c._proxy(this, a), this._values[a] = c) : o = 0 !== (33554432 & s) ? this._promiseFulfilled(c._value(), a) : 0 !== (16777216 & s) ? this._promiseRejected(c._reason(), a) : this._promiseCancelled(a) : o = this._promiseFulfilled(c, a);
              }

              o || i._setAsyncGuaranteed();
            }, a.prototype._isResolved = function () {
              return null === this._values;
            }, a.prototype._resolve = function (t) {
              this._values = null, this._promise._fulfill(t);
            }, a.prototype._cancel = function () {
              !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel());
            }, a.prototype._reject = function (t) {
              this._values = null, this._promise._rejectCallback(t, !1);
            }, a.prototype._promiseFulfilled = function (t, e) {
              this._values[e] = t;
              var n = ++this._totalResolved;
              return n >= this._length ? (this._resolve(this._values), !0) : !1;
            }, a.prototype._promiseCancelled = function () {
              return this._cancel(), !0;
            }, a.prototype._promiseRejected = function (t) {
              return this._totalResolved++, this._reject(t), !0;
            }, a.prototype._resultCancelled = function () {
              if (!this._isResolved()) {
                var t = this._values;
                if (this._cancel(), t instanceof e) t.cancel();else for (var n = 0; n < t.length; ++n) {
                  t[n] instanceof e && t[n].cancel();
                }
              }
            }, a.prototype.shouldCopyValues = function () {
              return !0;
            }, a.prototype.getActualLength = function (t) {
              return t;
            }, a;
          };
        }, {
          "./util": 36
        }],
        24: [function (t, e, n) {

          e.exports = function (e, n) {
            function r(t) {
              return !C.test(t);
            }

            function i(t) {
              try {
                return t.__isPromisified__ === !0;
              } catch (e) {
                return !1;
              }
            }

            function o(t, e, n) {
              var r = f.getDataPropertyOrDefault(t, e + n, b);
              return r ? i(r) : !1;
            }

            function s(t, e, n) {
              for (var r = 0; r < t.length; r += 2) {
                var i = t[r];
                if (n.test(i)) for (var o = i.replace(n, ""), s = 0; s < t.length; s += 2) {
                  if (t[s] === o) throw new m("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e));
                }
              }
            }

            function a(t, e, n, r) {
              for (var a = f.inheritedDataKeys(t), c = [], l = 0; l < a.length; ++l) {
                var u = a[l],
                    p = t[u],
                    h = r === j ? !0 : j(u);
                "function" != typeof p || i(p) || o(t, u, e) || !r(u, p, t, h) || c.push(u, p);
              }

              return s(c, e, n), c;
            }

            function c(t, r, i, o, s, a) {
              function c() {
                var i = r;
                r === h && (i = this);
                var o = new e(n);

                o._captureStackTrace();

                var s = "string" == typeof u && this !== l ? this[u] : t,
                    c = _(o, a);

                try {
                  s.apply(i, d(arguments, c));
                } catch (p) {
                  o._rejectCallback(v(p), !0, !0);
                }

                return o._isFateSealed() || o._setAsyncGuaranteed(), o;
              }

              var l = function () {
                return this;
              }(),
                  u = t;

              return "string" == typeof u && (t = o), f.notEnumerableProp(c, "__isPromisified__", !0), c;
            }

            function l(t, e, n, r, i) {
              for (var o = new RegExp(E(e) + "$"), s = a(t, e, o, n), c = 0, l = s.length; l > c; c += 2) {
                var u = s[c],
                    p = s[c + 1],
                    _ = u + e;

                if (r === k) t[_] = k(u, h, u, p, e, i);else {
                  var d = r(p, function () {
                    return k(u, h, u, p, e, i);
                  });
                  f.notEnumerableProp(d, "__isPromisified__", !0), t[_] = d;
                }
              }

              return f.toFastProperties(t), t;
            }

            function u(t, e, n) {
              return k(t, e, void 0, t, null, n);
            }

            var p,
                h = {},
                f = t("./util"),
                _ = t("./nodeback"),
                d = f.withAppended,
                v = f.maybeWrapAsError,
                y = f.canEvaluate,
                m = t("./errors").TypeError,
                g = "Async",
                b = {
              __isPromisified__: !0
            },
                w = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"],
                C = new RegExp("^(?:" + w.join("|") + ")$"),
                j = function j(t) {
              return f.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t;
            },
                E = function E(t) {
              return t.replace(/([$])/, "\\$");
            },
                k = y ? p : c;

            e.promisify = function (t, e) {
              if ("function" != typeof t) throw new m("expecting a function but got " + f.classString(t));
              if (i(t)) return t;
              e = Object(e);
              var n = void 0 === e.context ? h : e.context,
                  o = !!e.multiArgs,
                  s = u(t, n, o);
              return f.copyDescriptors(t, s, r), s;
            }, e.promisifyAll = function (t, e) {
              if ("function" != typeof t && "object" != _typeof(t)) throw new m("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
              e = Object(e);
              var n = !!e.multiArgs,
                  r = e.suffix;
              "string" != typeof r && (r = g);
              var i = e.filter;
              "function" != typeof i && (i = j);
              var o = e.promisifier;
              if ("function" != typeof o && (o = k), !f.isIdentifier(r)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");

              for (var s = f.inheritedDataKeys(t), a = 0; a < s.length; ++a) {
                var c = t[s[a]];
                "constructor" !== s[a] && f.isClass(c) && (l(c.prototype, r, i, o, n), l(c, r, i, o, n));
              }

              return l(t, r, i, o, n);
            };
          };
        }, {
          "./errors": 12,
          "./nodeback": 20,
          "./util": 36
        }],
        25: [function (t, e, n) {

          e.exports = function (e, n, r, i) {
            function o(t) {
              var e,
                  n = !1;
              if (void 0 !== a && t instanceof a) e = p(t), n = !0;else {
                var r = u.keys(t),
                    i = r.length;
                e = new Array(2 * i);

                for (var o = 0; i > o; ++o) {
                  var s = r[o];
                  e[o] = t[s], e[o + i] = s;
                }
              }
              this.constructor$(e), this._isMap = n, this._init$(void 0, n ? -6 : -3);
            }

            function s(t) {
              var n,
                  s = r(t);
              return l(s) ? (n = s instanceof e ? s._then(e.props, void 0, void 0, void 0, void 0) : new o(s).promise(), s instanceof e && n._propagateFrom(s, 2), n) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
            }

            var a,
                c = t("./util"),
                l = c.isObject,
                u = t("./es5");
            "function" == typeof Map && (a = Map);

            var p = function () {
              function t(t, r) {
                this[e] = t, this[e + n] = r, e++;
              }

              var e = 0,
                  n = 0;
              return function (r) {
                n = r.size, e = 0;
                var i = new Array(2 * r.size);
                return r.forEach(t, i), i;
              };
            }(),
                h = function h(t) {
              for (var e = new a(), n = t.length / 2 | 0, r = 0; n > r; ++r) {
                var i = t[n + r],
                    o = t[r];
                e.set(i, o);
              }

              return e;
            };

            c.inherits(o, n), o.prototype._init = function () {}, o.prototype._promiseFulfilled = function (t, e) {
              this._values[e] = t;
              var n = ++this._totalResolved;

              if (n >= this._length) {
                var r;
                if (this._isMap) r = h(this._values);else {
                  r = {};

                  for (var i = this.length(), o = 0, s = this.length(); s > o; ++o) {
                    r[this._values[o + i]] = this._values[o];
                  }
                }
                return this._resolve(r), !0;
              }

              return !1;
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
        }, {
          "./es5": 13,
          "./util": 36
        }],
        26: [function (t, e, n) {

          function r(t, e, n, r, i) {
            for (var o = 0; i > o; ++o) {
              n[o + r] = t[o + e], t[o + e] = void 0;
            }
          }

          function i(t) {
            this._capacity = t, this._length = 0, this._front = 0;
          }

          i.prototype._willBeOverCapacity = function (t) {
            return this._capacity < t;
          }, i.prototype._pushOne = function (t) {
            var e = this.length();

            this._checkCapacity(e + 1);

            var n = this._front + e & this._capacity - 1;
            this[n] = t, this._length = e + 1;
          }, i.prototype.push = function (t, e, n) {
            var r = this.length() + 3;
            if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
            var i = this._front + r - 3;

            this._checkCapacity(r);

            var o = this._capacity - 1;
            this[i + 0 & o] = t, this[i + 1 & o] = e, this[i + 2 & o] = n, this._length = r;
          }, i.prototype.shift = function () {
            var t = this._front,
                e = this[t];
            return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, e;
          }, i.prototype.length = function () {
            return this._length;
          }, i.prototype._checkCapacity = function (t) {
            this._capacity < t && this._resizeTo(this._capacity << 1);
          }, i.prototype._resizeTo = function (t) {
            var e = this._capacity;
            this._capacity = t;
            var n = this._front,
                i = this._length,
                o = n + i & e - 1;
            r(this, 0, this, e, o);
          }, e.exports = i;
        }, {}],
        27: [function (t, e, n) {

          e.exports = function (e, n, r, i) {
            function o(t, o) {
              var c = r(t);
              if (c instanceof e) return a(c);
              if (t = s.asArray(t), null === t) return i("expecting an array or an iterable object but got " + s.classString(t));
              var l = new e(n);
              void 0 !== o && l._propagateFrom(o, 3);

              for (var u = l._fulfill, p = l._reject, h = 0, f = t.length; f > h; ++h) {
                var _ = t[h];
                (void 0 !== _ || h in t) && e.cast(_)._then(u, p, void 0, l, null);
              }

              return l;
            }

            var s = t("./util"),
                a = function a(t) {
              return t.then(function (e) {
                return o(e, t);
              });
            };

            e.race = function (t) {
              return o(t, void 0);
            }, e.prototype.race = function () {
              return o(this, void 0);
            };
          };
        }, {
          "./util": 36
        }],
        28: [function (t, e, n) {

          e.exports = function (e, n, r, i, o, s) {
            function a(t, n, r, i) {
              this.constructor$(t);
              var s = h();
              this._fn = null === s ? n : f.domainBind(s, n), void 0 !== r && (r = e.resolve(r), r._attachCancellationCallback(this)), this._initialValue = r, this._currentCancellable = null, i === o ? this._eachValues = Array(this._length) : 0 === i ? this._eachValues = null : this._eachValues = void 0, this._promise._captureStackTrace(), this._init$(void 0, -5);
            }

            function c(t, e) {
              this.isFulfilled() ? e._resolve(t) : e._reject(t);
            }

            function l(t, e, n, i) {
              if ("function" != typeof e) return r("expecting a function but got " + f.classString(e));
              var o = new a(t, e, n, i);
              return o.promise();
            }

            function u(t) {
              this.accum = t, this.array._gotAccum(t);
              var n = i(this.value, this.array._promise);
              return n instanceof e ? (this.array._currentCancellable = n, n._then(p, void 0, void 0, this, void 0)) : p.call(this, n);
            }

            function p(t) {
              var n = this.array,
                  r = n._promise,
                  i = _(n._fn);

              r._pushContext();

              var o;
              o = void 0 !== n._eachValues ? i.call(r._boundValue(), t, this.index, this.length) : i.call(r._boundValue(), this.accum, t, this.index, this.length), o instanceof e && (n._currentCancellable = o);

              var a = r._popContext();

              return s.checkForgottenReturns(o, a, void 0 !== n._eachValues ? "Promise.each" : "Promise.reduce", r), o;
            }

            var h = e._getDomain,
                f = t("./util"),
                _ = f.tryCatch;
            f.inherits(a, n), a.prototype._gotAccum = function (t) {
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
              this._values = t;
              var n,
                  r,
                  i = t.length;
              if (void 0 !== this._initialValue ? (n = this._initialValue, r = 0) : (n = e.resolve(t[0]), r = 1), this._currentCancellable = n, !n.isRejected()) for (; i > r; ++r) {
                var o = {
                  accum: null,
                  value: t[r],
                  index: r,
                  length: i,
                  array: this
                };
                n = n._then(u, void 0, void 0, o, void 0);
              }
              void 0 !== this._eachValues && (n = n._then(this._eachComplete, void 0, void 0, this, void 0)), n._then(c, c, void 0, n, this);
            }, e.prototype.reduce = function (t, e) {
              return l(this, t, e, null);
            }, e.reduce = function (t, e, n, r) {
              return l(t, e, n, r);
            };
          };
        }, {
          "./util": 36
        }],
        29: [function (t, e, n) {

          var r,
              i = t("./util"),
              o = function o() {
            throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
          },
              s = i.getNativePromise();

          if (i.isNode && "undefined" == typeof MutationObserver) {
            var a = commonjsGlobal.setImmediate,
                c = process.nextTick;
            r = i.isRecentNode ? function (t) {
              a.call(commonjsGlobal, t);
            } : function (t) {
              c.call(process, t);
            };
          } else if ("function" == typeof s && "function" == typeof s.resolve) {
            var l = s.resolve();

            r = function r(t) {
              l.then(t);
            };
          } else r = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? "undefined" != typeof setImmediate ? function (t) {
            setImmediate(t);
          } : "undefined" != typeof setTimeout ? function (t) {
            setTimeout(t, 0);
          } : o : function () {
            var t = document.createElement("div"),
                e = {
              attributes: !0
            },
                n = !1,
                r = document.createElement("div"),
                i = new MutationObserver(function () {
              t.classList.toggle("foo"), n = !1;
            });
            i.observe(r, e);

            var o = function o() {
              n || (n = !0, r.classList.toggle("foo"));
            };

            return function (n) {
              var r = new MutationObserver(function () {
                r.disconnect(), n();
              });
              r.observe(t, e), o();
            };
          }();

          e.exports = r;
        }, {
          "./util": 36
        }],
        30: [function (t, e, n) {

          e.exports = function (e, n, r) {
            function i(t) {
              this.constructor$(t);
            }

            var o = e.PromiseInspection,
                s = t("./util");
            s.inherits(i, n), i.prototype._promiseResolved = function (t, e) {
              this._values[t] = e;
              var n = ++this._totalResolved;
              return n >= this._length ? (this._resolve(this._values), !0) : !1;
            }, i.prototype._promiseFulfilled = function (t, e) {
              var n = new o();
              return n._bitField = 33554432, n._settledValueField = t, this._promiseResolved(e, n);
            }, i.prototype._promiseRejected = function (t, e) {
              var n = new o();
              return n._bitField = 16777216, n._settledValueField = t, this._promiseResolved(e, n);
            }, e.settle = function (t) {
              return r.deprecated(".settle()", ".reflect()"), new i(t).promise();
            }, e.prototype.settle = function () {
              return e.settle(this);
            };
          };
        }, {
          "./util": 36
        }],
        31: [function (t, e, n) {

          e.exports = function (e, n, r) {
            function i(t) {
              this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
            }

            function o(t, e) {
              if ((0 | e) !== e || 0 > e) return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
              var n = new i(t),
                  o = n.promise();
              return n.setHowMany(e), n.init(), o;
            }

            var s = t("./util"),
                a = t("./errors").RangeError,
                c = t("./errors").AggregateError,
                l = s.isArray,
                u = {};
            s.inherits(i, n), i.prototype._init = function () {
              if (this._initialized) {
                if (0 === this._howMany) return void this._resolve([]);

                this._init$(void 0, -5);

                var t = l(this._values);
                !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
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
                }

                return t.length > 0 ? this._reject(t) : this._cancel(), !0;
              }

              return !1;
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
              var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
              return new a(e);
            }, i.prototype._resolveEmptyArray = function () {
              this._reject(this._getRangeError(0));
            }, e.some = function (t, e) {
              return o(t, e);
            }, e.prototype.some = function (t) {
              return o(this, t);
            }, e._SomePromiseArray = i;
          };
        }, {
          "./errors": 12,
          "./util": 36
        }],
        32: [function (t, e, n) {

          e.exports = function (t) {
            function e(t) {
              void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0);
            }

            e.prototype._settledValue = function () {
              return this._settledValueField;
            };

            var n = e.prototype.value = function () {
              if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
              return this._settledValue();
            },
                r = e.prototype.error = e.prototype.reason = function () {
              if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
              return this._settledValue();
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
            };

            e.prototype.isCancelled = function () {
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
              var t = this._target();

              return t._unsetRejectionIsUnhandled(), r.call(t);
            }, t.prototype._value = function () {
              return this._settledValue();
            }, t.prototype._reason = function () {
              return this._unsetRejectionIsUnhandled(), this._settledValue();
            }, t.PromiseInspection = e;
          };
        }, {}],
        33: [function (t, e, n) {

          e.exports = function (e, n) {
            function r(t, r) {
              if (u(t)) {
                if (t instanceof e) return t;
                var i = o(t);

                if (i === l) {
                  r && r._pushContext();
                  var c = e.reject(i.e);
                  return r && r._popContext(), c;
                }

                if ("function" == typeof i) {
                  if (s(t)) {
                    var c = new e(n);
                    return t._then(c._fulfill, c._reject, void 0, c, null), c;
                  }

                  return a(t, i, r);
                }
              }

              return t;
            }

            function i(t) {
              return t.then;
            }

            function o(t) {
              try {
                return i(t);
              } catch (e) {
                return l.e = e, l;
              }
            }

            function s(t) {
              try {
                return p.call(t, "_promise0");
              } catch (e) {
                return !1;
              }
            }

            function a(t, r, i) {
              function o(t) {
                a && (a._resolveCallback(t), a = null);
              }

              function s(t) {
                a && (a._rejectCallback(t, p, !0), a = null);
              }

              var a = new e(n),
                  u = a;
              i && i._pushContext(), a._captureStackTrace(), i && i._popContext();
              var p = !0,
                  h = c.tryCatch(r).call(t, o, s);
              return p = !1, a && h === l && (a._rejectCallback(h.e, !0, !0), a = null), u;
            }

            var c = t("./util"),
                l = c.errorObj,
                u = c.isObject,
                p = {}.hasOwnProperty;
            return r;
          };
        }, {
          "./util": 36
        }],
        34: [function (t, e, n) {

          e.exports = function (e, n, r) {
            function i(t) {
              this.handle = t;
            }

            function o(t) {
              return clearTimeout(this.handle), t;
            }

            function s(t) {
              throw clearTimeout(this.handle), t;
            }

            var a = t("./util"),
                c = e.TimeoutError;

            i.prototype._resultCancelled = function () {
              clearTimeout(this.handle);
            };

            var l = function l(t) {
              return u(+this).thenReturn(t);
            },
                u = e.delay = function (t, o) {
              var s, a;
              return void 0 !== o ? (s = e.resolve(o)._then(l, null, null, t, void 0), r.cancellation() && o instanceof e && s._setOnCancel(o)) : (s = new e(n), a = setTimeout(function () {
                s._fulfill();
              }, +t), r.cancellation() && s._setOnCancel(new i(a)), s._captureStackTrace()), s._setAsyncGuaranteed(), s;
            };

            e.prototype.delay = function (t) {
              return u(t, this);
            };

            var p = function p(t, e, n) {
              var r;
              r = "string" != typeof e ? e instanceof Error ? e : new c("operation timed out") : new c(e), a.markAsOriginatingFromRejection(r), t._attachExtraTrace(r), t._reject(r), null != n && n.cancel();
            };

            e.prototype.timeout = function (t, e) {
              t = +t;
              var n,
                  a,
                  c = new i(setTimeout(function () {
                n.isPending() && p(n, e, a);
              }, t));
              return r.cancellation() ? (a = this.then(), n = a._then(o, s, void 0, c, void 0), n._setOnCancel(c)) : n = this._then(o, s, void 0, c, void 0), n;
            };
          };
        }, {
          "./util": 36
        }],
        35: [function (t, e, n) {

          e.exports = function (e, n, r, i, o, s) {
            function a(t) {
              setTimeout(function () {
                throw t;
              }, 0);
            }

            function c(t) {
              var e = r(t);
              return e !== t && "function" == typeof t._isDisposable && "function" == typeof t._getDisposer && t._isDisposable() && e._setDisposable(t._getDisposer()), e;
            }

            function l(t, n) {
              function i() {
                if (s >= l) return u._fulfill();
                var o = c(t[s++]);

                if (o instanceof e && o._isDisposable()) {
                  try {
                    o = r(o._getDisposer().tryDispose(n), t.promise);
                  } catch (p) {
                    return a(p);
                  }

                  if (o instanceof e) return o._then(i, a, null, null, null);
                }

                i();
              }

              var s = 0,
                  l = t.length,
                  u = new e(o);
              return i(), u;
            }

            function u(t, e, n) {
              this._data = t, this._promise = e, this._context = n;
            }

            function p(t, e, n) {
              this.constructor$(t, e, n);
            }

            function h(t) {
              return u.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t;
            }

            function f(t) {
              this.length = t, this.promise = null, this[t - 1] = null;
            }

            var _ = t("./util"),
                d = t("./errors").TypeError,
                v = t("./util").inherits,
                y = _.errorObj,
                m = _.tryCatch,
                g = {};

            u.prototype.data = function () {
              return this._data;
            }, u.prototype.promise = function () {
              return this._promise;
            }, u.prototype.resource = function () {
              return this.promise().isFulfilled() ? this.promise().value() : g;
            }, u.prototype.tryDispose = function (t) {
              var e = this.resource(),
                  n = this._context;
              void 0 !== n && n._pushContext();
              var r = e !== g ? this.doDispose(e, t) : null;
              return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, r;
            }, u.isDisposer = function (t) {
              return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose;
            }, v(p, u), p.prototype.doDispose = function (t, e) {
              var n = this.data();
              return n.call(t, t, e);
            }, f.prototype._resultCancelled = function () {
              for (var t = this.length, n = 0; t > n; ++n) {
                var r = this[n];
                r instanceof e && r.cancel();
              }
            }, e.using = function () {
              var t = arguments.length;
              if (2 > t) return n("you must pass at least 2 arguments to Promise.using");
              var i = arguments[t - 1];
              if ("function" != typeof i) return n("expecting a function but got " + _.classString(i));
              var o,
                  a = !0;
              2 === t && Array.isArray(arguments[0]) ? (o = arguments[0], t = o.length, a = !1) : (o = arguments, t--);

              for (var c = new f(t), p = 0; t > p; ++p) {
                var d = o[p];

                if (u.isDisposer(d)) {
                  var v = d;
                  d = d.promise(), d._setDisposable(v);
                } else {
                  var g = r(d);
                  g instanceof e && (d = g._then(h, null, null, {
                    resources: c,
                    index: p
                  }, void 0));
                }

                c[p] = d;
              }

              for (var b = new Array(c.length), p = 0; p < b.length; ++p) {
                b[p] = e.resolve(c[p]).reflect();
              }

              var w = e.all(b).then(function (t) {
                for (var e = 0; e < t.length; ++e) {
                  var n = t[e];
                  if (n.isRejected()) return y.e = n.error(), y;
                  if (!n.isFulfilled()) return void w.cancel();
                  t[e] = n.value();
                }

                C._pushContext(), i = m(i);

                var r = a ? i.apply(void 0, t) : i(t),
                    o = C._popContext();

                return s.checkForgottenReturns(r, o, "Promise.using", C), r;
              }),
                  C = w.lastly(function () {
                var t = new e.PromiseInspection(w);
                return l(c, t);
              });
              return c.promise = C, C._setOnCancel(c), C;
            }, e.prototype._setDisposable = function (t) {
              this._bitField = 131072 | this._bitField, this._disposer = t;
            }, e.prototype._isDisposable = function () {
              return (131072 & this._bitField) > 0;
            }, e.prototype._getDisposer = function () {
              return this._disposer;
            }, e.prototype._unsetDisposable = function () {
              this._bitField = -131073 & this._bitField, this._disposer = void 0;
            }, e.prototype.disposer = function (t) {
              if ("function" == typeof t) return new p(t, this, i());
              throw new d();
            };
          };
        }, {
          "./errors": 12,
          "./util": 36
        }],
        36: [function (t, e, n) {

          function r() {
            try {
              var t = P;
              return P = null, t.apply(this, arguments);
            } catch (e) {
              return T.e = e, T;
            }
          }

          function i(t) {
            return P = t, r;
          }

          function o(t) {
            return null == t || t === !0 || t === !1 || "string" == typeof t || "number" == typeof t;
          }

          function s(t) {
            return "function" == typeof t || "object" == _typeof(t) && null !== t;
          }

          function a(t) {
            return o(t) ? new Error(v(t)) : t;
          }

          function c(t, e) {
            var n,
                r = t.length,
                i = new Array(r + 1);

            for (n = 0; r > n; ++n) {
              i[n] = t[n];
            }

            return i[n] = e, i;
          }

          function l(t, e, n) {
            if (!F.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
            var r = Object.getOwnPropertyDescriptor(t, e);
            return null != r ? null == r.get && null == r.set ? r.value : n : void 0;
          }

          function u(t, e, n) {
            if (o(t)) return t;
            var r = {
              value: n,
              configurable: !0,
              enumerable: !1,
              writable: !0
            };
            return F.defineProperty(t, e, r), t;
          }

          function p(t) {
            throw t;
          }

          function h(t) {
            try {
              if ("function" == typeof t) {
                var e = F.names(t.prototype),
                    n = F.isES5 && e.length > 1,
                    r = e.length > 0 && !(1 === e.length && "constructor" === e[0]),
                    i = A.test(t + "") && F.names(t).length > 0;
                if (n || r || i) return !0;
              }

              return !1;
            } catch (o) {
              return !1;
            }
          }

          function f(t) {

            return t;
          }

          function _(t) {
            return D.test(t);
          }

          function d(t, e, n) {
            for (var r = new Array(t), i = 0; t > i; ++i) {
              r[i] = e + i + n;
            }

            return r;
          }

          function v(t) {
            try {
              return t + "";
            } catch (e) {
              return "[no string representation]";
            }
          }

          function y(t) {
            return null !== t && "object" == _typeof(t) && "string" == typeof t.message && "string" == typeof t.name;
          }

          function m(t) {
            try {
              u(t, "isOperational", !0);
            } catch (e) {}
          }

          function g(t) {
            return null == t ? !1 : t instanceof Error.__BluebirdErrorTypes__.OperationalError || t.isOperational === !0;
          }

          function b(t) {
            return y(t) && F.propertyIsWritable(t, "stack");
          }

          function w(t) {
            return {}.toString.call(t);
          }

          function C(t, e, n) {
            for (var r = F.names(t), i = 0; i < r.length; ++i) {
              var o = r[i];
              if (n(o)) try {
                F.defineProperty(e, o, F.getDescriptor(t, o));
              } catch (s) {}
            }
          }

          function j(t) {
            return N ? process.env[t] : void 0;
          }

          function E() {
            if ("function" == typeof Promise) try {
              var t = new Promise(function () {});
              if ("[object Promise]" === {}.toString.call(t)) return Promise;
            } catch (e) {}
          }

          function k(t, e) {
            return t.bind(e);
          }

          var F = t("./es5"),
              x = "undefined" == typeof navigator,
              T = {
            e: {}
          },
              P,
              R = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : void 0 !== this ? this : null,
              S = function S(t, e) {
            function n() {
              this.constructor = t, this.constructor$ = e;

              for (var n in e.prototype) {
                r.call(e.prototype, n) && "$" !== n.charAt(n.length - 1) && (this[n + "$"] = e.prototype[n]);
              }
            }

            var r = {}.hasOwnProperty;
            return n.prototype = e.prototype, t.prototype = new n(), t.prototype;
          },
              O = function () {
            var t = [Array.prototype, Object.prototype, Function.prototype],
                e = function e(_e2) {
              for (var n = 0; n < t.length; ++n) {
                if (t[n] === _e2) return !0;
              }

              return !1;
            };

            if (F.isES5) {
              var n = Object.getOwnPropertyNames;
              return function (t) {
                for (var r = [], i = Object.create(null); null != t && !e(t);) {
                  var o;

                  try {
                    o = n(t);
                  } catch (s) {
                    return r;
                  }

                  for (var a = 0; a < o.length; ++a) {
                    var c = o[a];

                    if (!i[c]) {
                      i[c] = !0;
                      var l = Object.getOwnPropertyDescriptor(t, c);
                      null != l && null == l.get && null == l.set && r.push(c);
                    }
                  }

                  t = F.getPrototypeOf(t);
                }

                return r;
              };
            }

            var r = {}.hasOwnProperty;
            return function (n) {
              if (e(n)) return [];
              var i = [];

              t: for (var o in n) {
                if (r.call(n, o)) i.push(o);else {
                  for (var s = 0; s < t.length; ++s) {
                    if (r.call(t[s], o)) continue t;
                  }

                  i.push(o);
                }
              }

              return i;
            };
          }(),
              A = /this\s*\.\s*\S+\s*=/,
              D = /^[a-z$_][a-z$_0-9]*$/i,
              V = function () {
            return "stack" in new Error() ? function (t) {
              return b(t) ? t : new Error(v(t));
            } : function (t) {
              if (b(t)) return t;

              try {
                throw new Error(v(t));
              } catch (e) {
                return e;
              }
            };
          }(),
              I = function I(t) {
            return F.isArray(t) ? t : null;
          };

          if ("undefined" != typeof Symbol && Symbol.iterator) {
            var L = "function" == typeof Array.from ? function (t) {
              return Array.from(t);
            } : function (t) {
              for (var e, n = [], r = t[Symbol.iterator](); !(e = r.next()).done;) {
                n.push(e.value);
              }

              return n;
            };

            I = function I(t) {
              return F.isArray(t) ? t : null != t && "function" == typeof t[Symbol.iterator] ? L(t) : null;
            };
          }

          var H = "undefined" != typeof process && "[object process]" === w(process).toLowerCase(),
              N = "undefined" != typeof process && "undefined" != typeof process.env,
              B = {
            isClass: h,
            isIdentifier: _,
            inheritedDataKeys: O,
            getDataPropertyOrDefault: l,
            thrower: p,
            isArray: F.isArray,
            asArray: I,
            notEnumerableProp: u,
            isPrimitive: o,
            isObject: s,
            isError: y,
            canEvaluate: x,
            errorObj: T,
            tryCatch: i,
            inherits: S,
            withAppended: c,
            maybeWrapAsError: a,
            toFastProperties: f,
            filledRange: d,
            toString: v,
            canAttachTrace: b,
            ensureErrorObject: V,
            originatesFromRejection: g,
            markAsOriginatingFromRejection: m,
            classString: w,
            copyDescriptors: C,
            hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
            isNode: H,
            hasEnvVariables: N,
            env: j,
            global: R,
            getNativePromise: E,
            domainBind: k
          };
          B.isRecentNode = B.isNode && function () {
            var t = process.versions.node.split(".").map(Number);
            return 0 === t[0] && t[1] > 10 || t[0] > 0;
          }(), B.isNode && B.toFastProperties(process);

          try {
            throw new Error();
          } catch (U) {
            B.lastLineError = U;
          }

          e.exports = B;
        }, {
          "./es5": 13
        }]
      }, {}, [4])(4);
    }), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise);
  });

  // window.requestAnimationFrame / window.cancelAnimationFrame
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
  var animationFrame_1 = animationFrame;

  var quot = /"/g;
  // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
  var createHTML = function (string, tag, attribute, value) {
    var S = String(_defined(string));
    var p1 = '<' + tag;
    if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
    return p1 + '>' + S + '</' + tag + '>';
  };
  var _stringHtml = function (NAME, exec) {
    var O = {};
    O[NAME] = exec(createHTML);
    _export(_export.P + _export.F * _fails(function () {
      var test = ''[NAME]('"');
      return test !== test.toLowerCase() || test.split('"').length > 3;
    }), 'String', O);
  };

  // B.2.3.13 String.prototype.sub()
  _stringHtml('sub', function (createHTML) {
    return function sub() {
      return createHTML(this, 'sub', '', '');
    };
  });

  var TYPED = _uid('typed_array');
  var VIEW = _uid('view');
  var ABV = !!(_global.ArrayBuffer && _global.DataView);
  var CONSTR = ABV;
  var i$2 = 0;
  var l = 9;
  var Typed;

  var TypedArrayConstructors = (
    'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
  ).split(',');

  while (i$2 < l) {
    if (Typed = _global[TypedArrayConstructors[i$2++]]) {
      _hide(Typed.prototype, TYPED, true);
      _hide(Typed.prototype, VIEW, true);
    } else CONSTR = false;
  }

  var _typed = {
    ABV: ABV,
    CONSTR: CONSTR,
    TYPED: TYPED,
    VIEW: VIEW
  };

  // https://tc39.github.io/ecma262/#sec-toindex


  var _toIndex = function (it) {
    if (it === undefined) return 0;
    var number = _toInteger(it);
    var length = _toLength(number);
    if (number !== length) throw RangeError('Wrong length!');
    return length;
  };

  var _arrayFill = function fill(value /* , start = 0, end = @length */) {
    var O = _toObject(this);
    var length = _toLength(O.length);
    var aLen = arguments.length;
    var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
    var end = aLen > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  var _typedBuffer = createCommonjsModule(function (module, exports) {











  var gOPN = _objectGopn.f;
  var dP = _objectDp.f;


  var ARRAY_BUFFER = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE = 'prototype';
  var WRONG_LENGTH = 'Wrong length!';
  var WRONG_INDEX = 'Wrong index!';
  var $ArrayBuffer = _global[ARRAY_BUFFER];
  var $DataView = _global[DATA_VIEW];
  var Math = _global.Math;
  var RangeError = _global.RangeError;
  // eslint-disable-next-line no-shadow-restricted-names
  var Infinity = _global.Infinity;
  var BaseBuffer = $ArrayBuffer;
  var abs = Math.abs;
  var pow = Math.pow;
  var floor = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;
  var BUFFER = 'buffer';
  var BYTE_LENGTH = 'byteLength';
  var BYTE_OFFSET = 'byteOffset';
  var $BUFFER = _descriptors ? '_b' : BUFFER;
  var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
  var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

  // IEEE754 conversions based on https://github.com/feross/ieee754
  function packIEEE754(value, mLen, nBytes) {
    var buffer = new Array(nBytes);
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
    var i = 0;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    var e, m, c;
    value = abs(value);
    // eslint-disable-next-line no-self-compare
    if (value != value || value === Infinity) {
      // eslint-disable-next-line no-self-compare
      m = value != value ? 1 : 0;
      e = eMax;
    } else {
      e = floor(log(value) / LN2);
      if (value * (c = pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * pow(2, eBias - 1) * pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
    buffer[--i] |= s * 128;
    return buffer;
  }
  function unpackIEEE754(buffer, mLen, nBytes) {
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = eLen - 7;
    var i = nBytes - 1;
    var s = buffer[i--];
    var e = s & 127;
    var m;
    s >>= 7;
    for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : s ? -Infinity : Infinity;
    } else {
      m = m + pow(2, mLen);
      e = e - eBias;
    } return (s ? -1 : 1) * m * pow(2, e - mLen);
  }

  function unpackI32(bytes) {
    return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
  }
  function packI8(it) {
    return [it & 0xff];
  }
  function packI16(it) {
    return [it & 0xff, it >> 8 & 0xff];
  }
  function packI32(it) {
    return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
  }
  function packF64(it) {
    return packIEEE754(it, 52, 8);
  }
  function packF32(it) {
    return packIEEE754(it, 23, 4);
  }

  function addGetter(C, key, internal) {
    dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
  }

  function get(view, bytes, index, isLittleEndian) {
    var numIndex = +index;
    var intIndex = _toIndex(numIndex);
    if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
    var store = view[$BUFFER]._b;
    var start = intIndex + view[$OFFSET];
    var pack = store.slice(start, start + bytes);
    return isLittleEndian ? pack : pack.reverse();
  }
  function set(view, bytes, index, conversion, value, isLittleEndian) {
    var numIndex = +index;
    var intIndex = _toIndex(numIndex);
    if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
    var store = view[$BUFFER]._b;
    var start = intIndex + view[$OFFSET];
    var pack = conversion(+value);
    for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
  }

  if (!_typed.ABV) {
    $ArrayBuffer = function ArrayBuffer(length) {
      _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
      var byteLength = _toIndex(length);
      this._b = _arrayFill.call(new Array(byteLength), 0);
      this[$LENGTH] = byteLength;
    };

    $DataView = function DataView(buffer, byteOffset, byteLength) {
      _anInstance(this, $DataView, DATA_VIEW);
      _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
      var bufferLength = buffer[$LENGTH];
      var offset = _toInteger(byteOffset);
      if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
      byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
      if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
      this[$BUFFER] = buffer;
      this[$OFFSET] = offset;
      this[$LENGTH] = byteLength;
    };

    if (_descriptors) {
      addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
      addGetter($DataView, BUFFER, '_b');
      addGetter($DataView, BYTE_LENGTH, '_l');
      addGetter($DataView, BYTE_OFFSET, '_o');
    }

    _redefineAll($DataView[PROTOTYPE], {
      getInt8: function getInt8(byteOffset) {
        return get(this, 1, byteOffset)[0] << 24 >> 24;
      },
      getUint8: function getUint8(byteOffset) {
        return get(this, 1, byteOffset)[0];
      },
      getInt16: function getInt16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments[1]);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      },
      getUint16: function getUint16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments[1]);
        return bytes[1] << 8 | bytes[0];
      },
      getInt32: function getInt32(byteOffset /* , littleEndian */) {
        return unpackI32(get(this, 4, byteOffset, arguments[1]));
      },
      getUint32: function getUint32(byteOffset /* , littleEndian */) {
        return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
      },
      getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
      },
      getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
      },
      setInt8: function setInt8(byteOffset, value) {
        set(this, 1, byteOffset, packI8, value);
      },
      setUint8: function setUint8(byteOffset, value) {
        set(this, 1, byteOffset, packI8, value);
      },
      setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packI16, value, arguments[2]);
      },
      setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packI16, value, arguments[2]);
      },
      setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packI32, value, arguments[2]);
      },
      setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packI32, value, arguments[2]);
      },
      setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packF32, value, arguments[2]);
      },
      setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
        set(this, 8, byteOffset, packF64, value, arguments[2]);
      }
    });
  } else {
    if (!_fails(function () {
      $ArrayBuffer(1);
    }) || !_fails(function () {
      new $ArrayBuffer(-1); // eslint-disable-line no-new
    }) || _fails(function () {
      new $ArrayBuffer(); // eslint-disable-line no-new
      new $ArrayBuffer(1.5); // eslint-disable-line no-new
      new $ArrayBuffer(NaN); // eslint-disable-line no-new
      return $ArrayBuffer.name != ARRAY_BUFFER;
    })) {
      $ArrayBuffer = function ArrayBuffer(length) {
        _anInstance(this, $ArrayBuffer);
        return new BaseBuffer(_toIndex(length));
      };
      var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
      for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
        if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
      }
      ArrayBufferProto.constructor = $ArrayBuffer;
    }
    // iOS Safari 7.x bug
    var view = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = $DataView[PROTOTYPE].setInt8;
    view.setInt8(0, 2147483648);
    view.setInt8(1, 2147483649);
    if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8.call(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint8(byteOffset, value) {
        $setInt8.call(this, byteOffset, value << 24 >> 24);
      }
    }, true);
  }
  _setToStringTag($ArrayBuffer, ARRAY_BUFFER);
  _setToStringTag($DataView, DATA_VIEW);
  _hide($DataView[PROTOTYPE], _typed.VIEW, true);
  exports[ARRAY_BUFFER] = $ArrayBuffer;
  exports[DATA_VIEW] = $DataView;
  });

  var SPECIES$3 = _wks('species');

  var _arraySpeciesConstructor = function (original) {
    var C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
      if (_isObject(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)


  var _arraySpeciesCreate = function (original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex





  var _arrayMethods = function (TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || _arraySpeciesCreate;
    return function ($this, callbackfn, that) {
      var O = _toObject($this);
      var self = _iobject(O);
      var f = _ctx(callbackfn, that, 3);
      var length = _toLength(self.length);
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

  var _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
    var O = _toObject(this);
    var len = _toLength(O.length);
    var to = _toAbsoluteIndex(target, len);
    var from = _toAbsoluteIndex(start, len);
    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
    var inc = 1;
    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }
    while (count-- > 0) {
      if (from in O) O[to] = O[from];
      else delete O[to];
      to += inc;
      from += inc;
    } return O;
  };

  var _typedArray = createCommonjsModule(function (module) {
  if (_descriptors) {
    var LIBRARY = _library;
    var global = _global;
    var fails = _fails;
    var $export = _export;
    var $typed = _typed;
    var $buffer = _typedBuffer;
    var ctx = _ctx;
    var anInstance = _anInstance;
    var propertyDesc = _propertyDesc;
    var hide = _hide;
    var redefineAll = _redefineAll;
    var toInteger = _toInteger;
    var toLength = _toLength;
    var toIndex = _toIndex;
    var toAbsoluteIndex = _toAbsoluteIndex;
    var toPrimitive = _toPrimitive;
    var has = _has;
    var classof = _classof;
    var isObject = _isObject;
    var toObject = _toObject;
    var isArrayIter = _isArrayIter;
    var create = _objectCreate;
    var getPrototypeOf = _objectGpo;
    var gOPN = _objectGopn.f;
    var getIterFn = core_getIteratorMethod;
    var uid = _uid;
    var wks = _wks;
    var createArrayMethod = _arrayMethods;
    var createArrayIncludes = _arrayIncludes;
    var speciesConstructor = _speciesConstructor;
    var ArrayIterators = es6_array_iterator;
    var Iterators = _iterators;
    var $iterDetect = _iterDetect;
    var setSpecies = _setSpecies;
    var arrayFill = _arrayFill;
    var arrayCopyWithin = _arrayCopyWithin;
    var $DP = _objectDp;
    var $GOPD = _objectGopd;
    var dP = $DP.f;
    var gOPD = $GOPD.f;
    var RangeError = global.RangeError;
    var TypeError = global.TypeError;
    var Uint8Array = global.Uint8Array;
    var ARRAY_BUFFER = 'ArrayBuffer';
    var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
    var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
    var PROTOTYPE = 'prototype';
    var ArrayProto = Array[PROTOTYPE];
    var $ArrayBuffer = $buffer.ArrayBuffer;
    var $DataView = $buffer.DataView;
    var arrayForEach = createArrayMethod(0);
    var arrayFilter = createArrayMethod(2);
    var arraySome = createArrayMethod(3);
    var arrayEvery = createArrayMethod(4);
    var arrayFind = createArrayMethod(5);
    var arrayFindIndex = createArrayMethod(6);
    var arrayIncludes = createArrayIncludes(true);
    var arrayIndexOf = createArrayIncludes(false);
    var arrayValues = ArrayIterators.values;
    var arrayKeys = ArrayIterators.keys;
    var arrayEntries = ArrayIterators.entries;
    var arrayLastIndexOf = ArrayProto.lastIndexOf;
    var arrayReduce = ArrayProto.reduce;
    var arrayReduceRight = ArrayProto.reduceRight;
    var arrayJoin = ArrayProto.join;
    var arraySort = ArrayProto.sort;
    var arraySlice = ArrayProto.slice;
    var arrayToString = ArrayProto.toString;
    var arrayToLocaleString = ArrayProto.toLocaleString;
    var ITERATOR = wks('iterator');
    var TAG = wks('toStringTag');
    var TYPED_CONSTRUCTOR = uid('typed_constructor');
    var DEF_CONSTRUCTOR = uid('def_constructor');
    var ALL_CONSTRUCTORS = $typed.CONSTR;
    var TYPED_ARRAY = $typed.TYPED;
    var VIEW = $typed.VIEW;
    var WRONG_LENGTH = 'Wrong length!';

    var $map = createArrayMethod(1, function (O, length) {
      return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
    });

    var LITTLE_ENDIAN = fails(function () {
      // eslint-disable-next-line no-undef
      return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
    });

    var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
      new Uint8Array(1).set({});
    });

    var toOffset = function (it, BYTES) {
      var offset = toInteger(it);
      if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
      return offset;
    };

    var validate = function (it) {
      if (isObject(it) && TYPED_ARRAY in it) return it;
      throw TypeError(it + ' is not a typed array!');
    };

    var allocate = function (C, length) {
      if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
        throw TypeError('It is not a typed array constructor!');
      } return new C(length);
    };

    var speciesFromList = function (O, list) {
      return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
    };

    var fromList = function (C, list) {
      var index = 0;
      var length = list.length;
      var result = allocate(C, length);
      while (length > index) result[index] = list[index++];
      return result;
    };

    var addGetter = function (it, key, internal) {
      dP(it, key, { get: function () { return this._d[internal]; } });
    };

    var $from = function from(source /* , mapfn, thisArg */) {
      var O = toObject(source);
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var iterFn = getIterFn(O);
      var i, length, values, result, step, iterator;
      if (iterFn != undefined && !isArrayIter(iterFn)) {
        for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
          values.push(step.value);
        } O = values;
      }
      if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
      for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
        result[i] = mapping ? mapfn(O[i], i) : O[i];
      }
      return result;
    };

    var $of = function of(/* ...items */) {
      var index = 0;
      var length = arguments.length;
      var result = allocate(this, length);
      while (length > index) result[index] = arguments[index++];
      return result;
    };

    // iOS Safari 6.x fails here
    var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

    var $toLocaleString = function toLocaleString() {
      return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
    };

    var proto = {
      copyWithin: function copyWithin(target, start /* , end */) {
        return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
      },
      every: function every(callbackfn /* , thisArg */) {
        return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
        return arrayFill.apply(validate(this), arguments);
      },
      filter: function filter(callbackfn /* , thisArg */) {
        return speciesFromList(this, arrayFilter(validate(this), callbackfn,
          arguments.length > 1 ? arguments[1] : undefined));
      },
      find: function find(predicate /* , thisArg */) {
        return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
      },
      findIndex: function findIndex(predicate /* , thisArg */) {
        return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
      },
      forEach: function forEach(callbackfn /* , thisArg */) {
        arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      indexOf: function indexOf(searchElement /* , fromIndex */) {
        return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
      },
      includes: function includes(searchElement /* , fromIndex */) {
        return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
      },
      join: function join(separator) { // eslint-disable-line no-unused-vars
        return arrayJoin.apply(validate(this), arguments);
      },
      lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
        return arrayLastIndexOf.apply(validate(this), arguments);
      },
      map: function map(mapfn /* , thisArg */) {
        return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
        return arrayReduce.apply(validate(this), arguments);
      },
      reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
        return arrayReduceRight.apply(validate(this), arguments);
      },
      reverse: function reverse() {
        var that = this;
        var length = validate(that).length;
        var middle = Math.floor(length / 2);
        var index = 0;
        var value;
        while (index < middle) {
          value = that[index];
          that[index++] = that[--length];
          that[length] = value;
        } return that;
      },
      some: function some(callbackfn /* , thisArg */) {
        return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      sort: function sort(comparefn) {
        return arraySort.call(validate(this), comparefn);
      },
      subarray: function subarray(begin, end) {
        var O = validate(this);
        var length = O.length;
        var $begin = toAbsoluteIndex(begin, length);
        return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
          O.buffer,
          O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
          toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
        );
      }
    };

    var $slice = function slice(start, end) {
      return speciesFromList(this, arraySlice.call(validate(this), start, end));
    };

    var $set = function set(arrayLike /* , offset */) {
      validate(this);
      var offset = toOffset(arguments[1], 1);
      var length = this.length;
      var src = toObject(arrayLike);
      var len = toLength(src.length);
      var index = 0;
      if (len + offset > length) throw RangeError(WRONG_LENGTH);
      while (index < len) this[offset + index] = src[index++];
    };

    var $iterators = {
      entries: function entries() {
        return arrayEntries.call(validate(this));
      },
      keys: function keys() {
        return arrayKeys.call(validate(this));
      },
      values: function values() {
        return arrayValues.call(validate(this));
      }
    };

    var isTAIndex = function (target, key) {
      return isObject(target)
        && target[TYPED_ARRAY]
        && typeof key != 'symbol'
        && key in target
        && String(+key) == String(key);
    };
    var $getDesc = function getOwnPropertyDescriptor(target, key) {
      return isTAIndex(target, key = toPrimitive(key, true))
        ? propertyDesc(2, target[key])
        : gOPD(target, key);
    };
    var $setDesc = function defineProperty(target, key, desc) {
      if (isTAIndex(target, key = toPrimitive(key, true))
        && isObject(desc)
        && has(desc, 'value')
        && !has(desc, 'get')
        && !has(desc, 'set')
        // TODO: add validation descriptor w/o calling accessors
        && !desc.configurable
        && (!has(desc, 'writable') || desc.writable)
        && (!has(desc, 'enumerable') || desc.enumerable)
      ) {
        target[key] = desc.value;
        return target;
      } return dP(target, key, desc);
    };

    if (!ALL_CONSTRUCTORS) {
      $GOPD.f = $getDesc;
      $DP.f = $setDesc;
    }

    $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
      getOwnPropertyDescriptor: $getDesc,
      defineProperty: $setDesc
    });

    if (fails(function () { arrayToString.call({}); })) {
      arrayToString = arrayToLocaleString = function toString() {
        return arrayJoin.call(this);
      };
    }

    var $TypedArrayPrototype$ = redefineAll({}, proto);
    redefineAll($TypedArrayPrototype$, $iterators);
    hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
    redefineAll($TypedArrayPrototype$, {
      slice: $slice,
      set: $set,
      constructor: function () { /* noop */ },
      toString: arrayToString,
      toLocaleString: $toLocaleString
    });
    addGetter($TypedArrayPrototype$, 'buffer', 'b');
    addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
    addGetter($TypedArrayPrototype$, 'byteLength', 'l');
    addGetter($TypedArrayPrototype$, 'length', 'e');
    dP($TypedArrayPrototype$, TAG, {
      get: function () { return this[TYPED_ARRAY]; }
    });

    // eslint-disable-next-line max-statements
    module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
      CLAMPED = !!CLAMPED;
      var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + KEY;
      var SETTER = 'set' + KEY;
      var TypedArray = global[NAME];
      var Base = TypedArray || {};
      var TAC = TypedArray && getPrototypeOf(TypedArray);
      var FORCED = !TypedArray || !$typed.ABV;
      var O = {};
      var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
      var getter = function (that, index) {
        var data = that._d;
        return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
      };
      var setter = function (that, index, value) {
        var data = that._d;
        if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
        data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
      };
      var addElement = function (that, index) {
        dP(that, index, {
          get: function () {
            return getter(this, index);
          },
          set: function (value) {
            return setter(this, index, value);
          },
          enumerable: true
        });
      };
      if (FORCED) {
        TypedArray = wrapper(function (that, data, $offset, $length) {
          anInstance(that, TypedArray, NAME, '_d');
          var index = 0;
          var offset = 0;
          var buffer, byteLength, length, klass;
          if (!isObject(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new $ArrayBuffer(byteLength);
          } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
            buffer = data;
            offset = toOffset($offset, BYTES);
            var $len = data.byteLength;
            if ($length === undefined) {
              if ($len % BYTES) throw RangeError(WRONG_LENGTH);
              byteLength = $len - offset;
              if (byteLength < 0) throw RangeError(WRONG_LENGTH);
            } else {
              byteLength = toLength($length) * BYTES;
              if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
            }
            length = byteLength / BYTES;
          } else if (TYPED_ARRAY in data) {
            return fromList(TypedArray, data);
          } else {
            return $from.call(TypedArray, data);
          }
          hide(that, '_d', {
            b: buffer,
            o: offset,
            l: byteLength,
            e: length,
            v: new $DataView(buffer)
          });
          while (index < length) addElement(that, index++);
        });
        TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
        hide(TypedArrayPrototype, 'constructor', TypedArray);
      } else if (!fails(function () {
        TypedArray(1);
      }) || !fails(function () {
        new TypedArray(-1); // eslint-disable-line no-new
      }) || !$iterDetect(function (iter) {
        new TypedArray(); // eslint-disable-line no-new
        new TypedArray(null); // eslint-disable-line no-new
        new TypedArray(1.5); // eslint-disable-line no-new
        new TypedArray(iter); // eslint-disable-line no-new
      }, true)) {
        TypedArray = wrapper(function (that, data, $offset, $length) {
          anInstance(that, TypedArray, NAME);
          var klass;
          // `ws` module bug, temporarily remove validation length for Uint8Array
          // https://github.com/websockets/ws/pull/645
          if (!isObject(data)) return new Base(toIndex(data));
          if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
            return $length !== undefined
              ? new Base(data, toOffset($offset, BYTES), $length)
              : $offset !== undefined
                ? new Base(data, toOffset($offset, BYTES))
                : new Base(data);
          }
          if (TYPED_ARRAY in data) return fromList(TypedArray, data);
          return $from.call(TypedArray, data);
        });
        arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
          if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
        });
        TypedArray[PROTOTYPE] = TypedArrayPrototype;
        if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
      }
      var $nativeIterator = TypedArrayPrototype[ITERATOR];
      var CORRECT_ITER_NAME = !!$nativeIterator
        && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
      var $iterator = $iterators.values;
      hide(TypedArray, TYPED_CONSTRUCTOR, true);
      hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
      hide(TypedArrayPrototype, VIEW, true);
      hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

      if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
        dP(TypedArrayPrototype, TAG, {
          get: function () { return NAME; }
        });
      }

      O[NAME] = TypedArray;

      $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

      $export($export.S, NAME, {
        BYTES_PER_ELEMENT: BYTES
      });

      $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
        from: $from,
        of: $of
      });

      if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

      $export($export.P, NAME, proto);

      setSpecies(NAME);

      $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

      $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

      if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

      $export($export.P + $export.F * fails(function () {
        new TypedArray(1).slice();
      }), NAME, { slice: $slice });

      $export($export.P + $export.F * (fails(function () {
        return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
      }) || !fails(function () {
        TypedArrayPrototype.toLocaleString.call([1, 2]);
      })), NAME, { toLocaleString: $toLocaleString });

      Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
      if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
    };
  } else module.exports = function () { /* empty */ };
  });

  _typedArray('Uint32', 4, function (init) {
    return function Uint32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  // 7.2.9 SameValue(x, y)
  var _sameValue = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

  // @@search logic
  _fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
    return [
      // `String.prototype.search` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.search
      function search(regexp) {
        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[SEARCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      },
      // `RegExp.prototype[@@search]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
      function (regexp) {
        var res = maybeCallNative($search, regexp, this);
        if (res.done) return res.value;
        var rx = _anObject(regexp);
        var S = String(this);
        var previousLastIndex = rx.lastIndex;
        if (!_sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
        var result = _regexpExecAbstract(rx, S);
        if (!_sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }
    ];
  });

  var bignumber = createCommonjsModule(function (module) {

    (function (globalObj) {
      /*
        bignumber.js v4.0.1
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
          MAX_SAFE_INTEGER = 0x1fffffffffffff,
          // 2^53 - 1
      // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
      POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
          SQRT_BASE = 1e7,

      /*
       * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
       * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
       * exception is thrown (if ERRORS is true).
       */
      MAX = 1E9; // 0 to MAX_INT32

      /*
       * Create and return a BigNumber constructor.
       */

      function constructorFactory(config) {
        var div,
            parseNumeric,
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
        DECIMAL_PLACES = 20,
            // 0 to MAX

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
        ROUNDING_MODE = 4,
            // 0 to 8
        // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]
        // The exponent value at and beneath which toString returns exponential notation.
        // Number type: -7
        TO_EXP_NEG = -7,
            // 0 to -MAX
        // The exponent value at and above which toString returns exponential notation.
        // Number type: 21
        TO_EXP_POS = 21,
            // 0 to MAX
        // RANGE : [MIN_EXP, MAX_EXP]
        // The minimum exponent value, beneath which underflow to zero occurs.
        // Number type: -324  (5e-324)
        MIN_EXP = -1e7,
            // -1 to -MAX
        // The maximum exponent value, above which overflow to Infinity occurs.
        // Number type:  308  (1.7976931348623157e+308)
        // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
        MAX_EXP = 1e7,
            // 1 to MAX
        // Whether BigNumber Errors are ever thrown.
        ERRORS = true,
            // true or false
        // Change to intValidatorNoErrors if ERRORS is false.
        isValidInt = intValidatorWithErrors,
            // intValidatorWithErrors/intValidatorNoErrors
        // Whether to use cryptographically-secure random number generation, if available.
        CRYPTO = false,
            // true or false

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
        MODULO_MODE = 1,
            // 0 to 9
        // The maximum number of significant digits of the result of the toPower operation.
        // If POW_PRECISION is 0, there will be unlimited significant digits.
        POW_PRECISION = 0,
            // 0 to MAX
        // The format specification used by the BigNumber.prototype.toFormat method.
        FORMAT = {
          decimalSeparator: '.',
          groupSeparator: ',',
          groupSize: 3,
          secondaryGroupSize: 0,
          fractionGroupSeparator: '\xA0',
          // non-breaking space
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

        function BigNumber(n, b) {
          var c,
              e,
              i,
              num,
              len,
              str,
              x = this; // Enable constructor usage without new.

          if (!(x instanceof BigNumber)) {
            // 'BigNumber() constructor call without new: {n}'
            if (ERRORS) raise(26, 'constructor call without new', n);
            return new BigNumber(n, b);
          } // 'new BigNumber() base not an integer: {b}'
          // 'new BigNumber() base out of range: {b}'


          if (b == null || !isValidInt(b, 2, 64, id, 'base')) {
            // Duplicate.
            if (n instanceof BigNumber) {
              x.s = n.s;
              x.e = n.e;
              x.c = (n = n.c) ? n.slice() : n;
              id = 0;
              return;
            }

            if ((num = typeof n == 'number') && n * 0 == 0) {
              x.s = 1 / n < 0 ? (n = -n, -1) : 1; // Fast path for integers.

              if (n === ~~n) {
                for (e = 0, i = n; i >= 10; i /= 10, e++) {
                }

                x.e = e;
                x.c = [n];
                id = 0;
                return;
              }

              str = n + '';
            } else {
              if (!isNumeric.test(str = n + '')) return parseNumeric(x, str, num);
              x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }
          } else {
            b = b | 0;
            str = n + ''; // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
            // Allow exponential notation to be used with base 10 argument.

            if (b == 10) {
              x = new BigNumber(n instanceof BigNumber ? n : str);
              return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
            } // Avoid potential interpretation of Infinity and NaN as base 44+ values.
            // Any number in exponential form will fail due to the [Ee][+-].


            if ((num = typeof n == 'number') && n * 0 != 0 || !new RegExp('^-?' + (c = '[' + ALPHABET.slice(0, b) + ']+') + '(?:\\.' + c + ')?$', b < 37 ? 'i' : '').test(str)) {
              return parseNumeric(x, str, num, b);
            }

            if (num) {
              x.s = 1 / n < 0 ? (str = str.slice(1), -1) : 1;

              if (ERRORS && str.replace(/^0\.0*|\./, '').length > 15) {
                // 'new BigNumber() number type has more than 15 significant digits: {n}'
                raise(id, tooManyDigits, n);
              } // Prevent later check for length on converted number.


              num = false;
            } else {
              x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }

            str = convertBase(str, 10, b, x.s);
          } // Decimal point?


          if ((e = str.indexOf('.')) > -1) str = str.replace('.', ''); // Exponential form?

          if ((i = str.search(/e/i)) > 0) {
            // Determine exponent.
            if (e < 0) e = i;
            e += +str.slice(i + 1);
            str = str.substring(0, i);
          } else if (e < 0) {
            // Integer.
            e = str.length;
          } // Determine leading zeros.


          for (i = 0; str.charCodeAt(i) === 48; i++) {
          } // Determine trailing zeros.


          for (len = str.length; str.charCodeAt(--len) === 48;) {
          }

          str = str.slice(i, len + 1);

          if (str) {
            len = str.length; // Disallow numbers with over 15 significant digits if number type.
            // 'new BigNumber() number type has more than 15 significant digits: {n}'

            if (num && ERRORS && len > 15 && (n > MAX_SAFE_INTEGER || n !== mathfloor(n))) {
              raise(id, tooManyDigits, x.s * n);
            }

            e = e - i - 1; // Overflow?

            if (e > MAX_EXP) {
              // Infinity.
              x.c = x.e = null; // Underflow?
            } else if (e < MIN_EXP) {
              // Zero.
              x.c = [x.e = 0];
            } else {
              x.e = e;
              x.c = []; // Transform base
              // e is the base 10 exponent.
              // i is where to slice str to get the first element of the coefficient array.

              i = (e + 1) % LOG_BASE;
              if (e < 0) i += LOG_BASE;

              if (i < len) {
                if (i) x.c.push(+str.slice(0, i));

                for (len -= LOG_BASE; i < len;) {
                  x.c.push(+str.slice(i, i += LOG_BASE));
                }

                str = str.slice(i);
                i = LOG_BASE - str.length;
              } else {
                i -= len;
              }

              for (; i--; str += '0') {
              }

              x.c.push(+str);
            }
          } else {
            // Zero.
            x.c = [x.e = 0];
          }

          id = 0;
        } // CONSTRUCTOR PROPERTIES


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
          var v,
              p,
              i = 0,
              r = {},
              a = arguments,
              o = a[0],
              has = o && _typeof(o) == 'object' ? function () {
            if (o.hasOwnProperty(p)) return (v = o[p]) != null;
          } : function () {
            if (a.length > i) return (v = a[i++]) != null;
          }; // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // 'config() DECIMAL_PLACES not an integer: {v}'
          // 'config() DECIMAL_PLACES out of range: {v}'

          if (has(p = 'DECIMAL_PLACES') && isValidInt(v, 0, MAX, 2, p)) {
            DECIMAL_PLACES = v | 0;
          }

          r[p] = DECIMAL_PLACES; // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // 'config() ROUNDING_MODE not an integer: {v}'
          // 'config() ROUNDING_MODE out of range: {v}'

          if (has(p = 'ROUNDING_MODE') && isValidInt(v, 0, 8, 2, p)) {
            ROUNDING_MODE = v | 0;
          }

          r[p] = ROUNDING_MODE; // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // 'config() EXPONENTIAL_AT not an integer: {v}'
          // 'config() EXPONENTIAL_AT out of range: {v}'

          if (has(p = 'EXPONENTIAL_AT')) {
            if (isArray(v)) {
              if (isValidInt(v[0], -MAX, 0, 2, p) && isValidInt(v[1], 0, MAX, 2, p)) {
                TO_EXP_NEG = v[0] | 0;
                TO_EXP_POS = v[1] | 0;
              }
            } else if (isValidInt(v, -MAX, MAX, 2, p)) {
              TO_EXP_NEG = -(TO_EXP_POS = (v < 0 ? -v : v) | 0);
            }
          }

          r[p] = [TO_EXP_NEG, TO_EXP_POS]; // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // 'config() RANGE not an integer: {v}'
          // 'config() RANGE cannot be zero: {v}'
          // 'config() RANGE out of range: {v}'

          if (has(p = 'RANGE')) {
            if (isArray(v)) {
              if (isValidInt(v[0], -MAX, -1, 2, p) && isValidInt(v[1], 1, MAX, 2, p)) {
                MIN_EXP = v[0] | 0;
                MAX_EXP = v[1] | 0;
              }
            } else if (isValidInt(v, -MAX, MAX, 2, p)) {
              if (v | 0) MIN_EXP = -(MAX_EXP = (v < 0 ? -v : v) | 0);else if (ERRORS) raise(2, p + ' cannot be zero', v);
            }
          }

          r[p] = [MIN_EXP, MAX_EXP]; // ERRORS {boolean|number} true, false, 1 or 0.
          // 'config() ERRORS not a boolean or binary digit: {v}'

          if (has(p = 'ERRORS')) {
            if (v === !!v || v === 1 || v === 0) {
              id = 0;
              isValidInt = (ERRORS = !!v) ? intValidatorWithErrors : intValidatorNoErrors;
            } else if (ERRORS) {
              raise(2, p + notBool, v);
            }
          }

          r[p] = ERRORS; // CRYPTO {boolean|number} true, false, 1 or 0.
          // 'config() CRYPTO not a boolean or binary digit: {v}'
          // 'config() crypto unavailable: {crypto}'

          if (has(p = 'CRYPTO')) {
            if (v === true || v === false || v === 1 || v === 0) {
              if (v) {
                v = typeof crypto == 'undefined';

                if (!v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = true;
                } else if (ERRORS) {
                  raise(2, 'crypto unavailable', v ? void 0 : crypto);
                } else {
                  CRYPTO = false;
                }
              } else {
                CRYPTO = false;
              }
            } else if (ERRORS) {
              raise(2, p + notBool, v);
            }
          }

          r[p] = CRYPTO; // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // 'config() MODULO_MODE not an integer: {v}'
          // 'config() MODULO_MODE out of range: {v}'

          if (has(p = 'MODULO_MODE') && isValidInt(v, 0, 9, 2, p)) {
            MODULO_MODE = v | 0;
          }

          r[p] = MODULO_MODE; // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // 'config() POW_PRECISION not an integer: {v}'
          // 'config() POW_PRECISION out of range: {v}'

          if (has(p = 'POW_PRECISION') && isValidInt(v, 0, MAX, 2, p)) {
            POW_PRECISION = v | 0;
          }

          r[p] = POW_PRECISION; // FORMAT {object}
          // 'config() FORMAT not an object: {v}'

          if (has(p = 'FORMAT')) {
            if (_typeof(v) == 'object') {
              FORMAT = v;
            } else if (ERRORS) {
              raise(2, p + ' not an object', v);
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


        BigNumber.max = function () {
          return maxOrMin(arguments, P.lt);
        };
        /*
         * Return a new BigNumber whose value is the minimum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */


        BigNumber.min = function () {
          return maxOrMin(arguments, P.gt);
        };
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


        BigNumber.random = function () {
          var pow2_53 = 0x20000000000000; // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
          // Check if Math.random() produces more than 32 bits of randomness.
          // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
          // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.

          var random53bitInt = Math.random() * pow2_53 & 0x1fffff ? function () {
            return mathfloor(Math.random() * pow2_53);
          } : function () {
            return (Math.random() * 0x40000000 | 0) * 0x800000 + (Math.random() * 0x800000 | 0);
          };
          return function (dp) {
            var a,
                b,
                e,
                k,
                v,
                i = 0,
                c = [],
                rand = new BigNumber(ONE);
            dp = dp == null || !isValidInt(dp, 0, MAX, 14) ? DECIMAL_PLACES : dp | 0;
            k = mathceil(dp / LOG_BASE);

            if (CRYPTO) {
              // Browsers supporting crypto.getRandomValues.
              if (crypto.getRandomValues) {
                a = crypto.getRandomValues(new Uint32Array(k *= 2));

                for (; i < k;) {
                  // 53 bits:
                  // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                  // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                  // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                  //                                     11111 11111111 11111111
                  // 0x20000 is 2^21.
                  v = a[i] * 0x20000 + (a[i + 1] >>> 11); // Rejection sampling:
                  // 0 <= v < 9007199254740992
                  // Probability that v >= 9e15, is
                  // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251

                  if (v >= 9e15) {
                    b = crypto.getRandomValues(new Uint32Array(2));
                    a[i] = b[0];
                    a[i + 1] = b[1];
                  } else {
                    // 0 <= v <= 8999999999999999
                    // 0 <= (v % 1e14) <= 99999999999999
                    c.push(v % 1e14);
                    i += 2;
                  }
                }

                i = k / 2; // Node.js supporting crypto.randomBytes.
              } else if (crypto.randomBytes) {
                // buffer
                a = crypto.randomBytes(k *= 7);

                for (; i < k;) {
                  // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                  // 0x100000000 is 2^32, 0x1000000 is 2^24
                  // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                  // 0 <= v < 9007199254740992
                  v = (a[i] & 31) * 0x1000000000000 + a[i + 1] * 0x10000000000 + a[i + 2] * 0x100000000 + a[i + 3] * 0x1000000 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

                  if (v >= 9e15) {
                    crypto.randomBytes(7).copy(a, i);
                  } else {
                    // 0 <= (v % 1e14) <= 99999999999999
                    c.push(v % 1e14);
                    i += 7;
                  }
                }

                i = k / 7;
              } else {
                CRYPTO = false;
                if (ERRORS) raise(14, 'crypto unavailable', crypto);
              }
            } // Use Math.random.


            if (!CRYPTO) {
              for (; i < k;) {
                v = random53bitInt();
                if (v < 9e15) c[i++] = v % 1e14;
              }
            }

            k = c[--i];
            dp %= LOG_BASE; // Convert trailing digits to zeros according to dp.

            if (k && dp) {
              v = POWS_TEN[LOG_BASE - dp];
              c[i] = mathfloor(k / v) * v;
            } // Remove trailing elements which are zero.


            for (; c[i] === 0; c.pop(), i--) {
            } // Zero?


            if (i < 0) {
              c = [e = 0];
            } else {
              // Remove leading elements which are zero and adjust exponent accordingly.
              for (e = -1; c[0] === 0; c.shift(), e -= LOG_BASE) {
              } // Count the digits of the first element of c to determine leading zeros, and...


              for (i = 1, v = c[0]; v >= 10; v /= 10, i++) {
              } // adjust the exponent accordingly.


              if (i < LOG_BASE) e -= LOG_BASE - i;
            }

            rand.e = e;
            rand.c = c;
            return rand;
          };
        }(); // PRIVATE FUNCTIONS
        // Convert a numeric string of baseIn to a numeric string of baseOut.


        function convertBase(str, baseOut, baseIn, sign) {
          var d,
              e,
              k,
              r,
              x,
              xc,
              y,
              i = str.indexOf('.'),
              dp = DECIMAL_PLACES,
              rm = ROUNDING_MODE;
          if (baseIn < 37) str = str.toLowerCase(); // Non-integer.

          if (i >= 0) {
            k = POW_PRECISION; // Unlimited precision.

            POW_PRECISION = 0;
            str = str.replace('.', '');
            y = new BigNumber(baseIn);
            x = y.pow(str.length - i);
            POW_PRECISION = k; // Convert str as if an integer, then restore the fraction part by dividing the
            // result by its base raised to a power.

            y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e), 10, baseOut);
            y.e = y.c.length;
          } // Convert the number as integer.


          xc = toBaseOut(str, baseIn, baseOut);
          e = k = xc.length; // Remove trailing zeros.

          for (; xc[--k] == 0; xc.pop()) {
          }

          if (!xc[0]) return '0';

          if (i < 0) {
            --e;
          } else {
            x.c = xc;
            x.e = e; // sign is needed for correct rounding.

            x.s = sign;
            x = div(x, y, dp, rm, baseOut);
            xc = x.c;
            r = x.r;
            e = x.e;
          }

          d = e + dp + 1; // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.

          i = xc[d];
          k = baseOut / 2;
          r = r || d < 0 || xc[d + 1] != null;
          r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));

          if (d < 1 || !xc[0]) {
            // 1^-dp or 0.
            str = r ? toFixedPoint('1', -dp) : '0';
          } else {
            xc.length = d;

            if (r) {
              // Rounding up may mean the previous digit has to be rounded up and so on.
              for (--baseOut; ++xc[--d] > baseOut;) {
                xc[d] = 0;

                if (!d) {
                  ++e;
                  xc.unshift(1);
                }
              }
            } // Determine trailing zeros.


            for (k = xc.length; !xc[--k];) {
            } // E.g. [4, 11, 15] becomes 4bf.


            for (i = 0, str = ''; i <= k; str += ALPHABET.charAt(xc[i++])) {
            }

            str = toFixedPoint(str, e);
          } // The caller will add the sign.


          return str;
        } // Perform division in the specified base. Called by div and convertBase.


        div = function () {
          // Assume non-zero x and k.
          function multiply(x, k, base) {
            var m,
                temp,
                xlo,
                xhi,
                carry = 0,
                i = x.length,
                klo = k % SQRT_BASE,
                khi = k / SQRT_BASE | 0;

            for (x = x.slice(); i--;) {
              xlo = x[i] % SQRT_BASE;
              xhi = x[i] / SQRT_BASE | 0;
              m = khi * xlo + xhi * klo;
              temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
              carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
              x[i] = temp % base;
            }

            if (carry) x.unshift(carry);
            return x;
          }

          function compare(a, b, aL, bL) {
            var i, cmp;

            if (aL != bL) {
              cmp = aL > bL ? 1 : -1;
            } else {
              for (i = cmp = 0; i < aL; i++) {
                if (a[i] != b[i]) {
                  cmp = a[i] > b[i] ? 1 : -1;
                  break;
                }
              }
            }

            return cmp;
          }

          function subtract(a, b, aL, base) {
            var i = 0; // Subtract b from a.

            for (; aL--;) {
              a[aL] -= i;
              i = a[aL] < b[aL] ? 1 : 0;
              a[aL] = i * base + a[aL] - b[aL];
            } // Remove leading zeros.


            for (; !a[0] && a.length > 1; a.shift()) {
            }
          } // x: dividend, y: divisor.


          return function (x, y, dp, rm, base) {
            var cmp,
                e,
                i,
                more,
                n,
                prod,
                prodL,
                q,
                qc,
                rem,
                remL,
                rem0,
                xi,
                xL,
                yc0,
                yL,
                yz,
                s = x.s == y.s ? 1 : -1,
                xc = x.c,
                yc = y.c; // Either NaN, Infinity or 0?

            if (!xc || !xc[0] || !yc || !yc[0]) {
              return new BigNumber( // Return NaN if either NaN, or both Infinity or 0.
              !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
              xc && xc[0] == 0 || !yc ? s * 0 : s / 0);
            }

            q = new BigNumber(s);
            qc = q.c = [];
            e = x.e - y.e;
            s = dp + e + 1;

            if (!base) {
              base = BASE;
              e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
              s = s / LOG_BASE | 0;
            } // Result exponent may be one less then the current value of e.
            // The coefficients of the BigNumbers from convertBase may have trailing zeros.


            for (i = 0; yc[i] == (xc[i] || 0); i++) {
            }

            if (yc[i] > (xc[i] || 0)) e--;

            if (s < 0) {
              qc.push(1);
              more = true;
            } else {
              xL = xc.length;
              yL = yc.length;
              i = 0;
              s += 2; // Normalise xc and yc so highest order digit of yc is >= base / 2.

              n = mathfloor(base / (yc[0] + 1)); // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
              // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {

              if (n > 1) {
                yc = multiply(yc, n, base);
                xc = multiply(xc, n, base);
                yL = yc.length;
                xL = xc.length;
              }

              xi = yL;
              rem = xc.slice(0, yL);
              remL = rem.length; // Add zeros to make remainder as long as divisor.

              for (; remL < yL; rem[remL++] = 0) {
              }

              yz = yc.slice();
              yz.unshift(0);
              yc0 = yc[0];
              if (yc[1] >= base / 2) yc0++; // Not necessary, but to prevent trial digit n > base, when using base 3.
              // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

              do {
                n = 0; // Compare divisor and remainder.

                cmp = compare(yc, rem, yL, remL); // If divisor < remainder.

                if (cmp < 0) {
                  // Calculate trial digit, n.
                  rem0 = rem[0];
                  if (yL != remL) rem0 = rem0 * base + (rem[1] || 0); // n is how many times the divisor goes into the current remainder.

                  n = mathfloor(rem0 / yc0); //  Algorithm:
                  //  1. product = divisor * trial digit (n)
                  //  2. if product > remainder: product -= divisor, n--
                  //  3. remainder -= product
                  //  4. if product was < remainder at 2:
                  //    5. compare new remainder and divisor
                  //    6. If remainder > divisor: remainder -= divisor, n++

                  if (n > 1) {
                    // n may be > base only when base is 3.
                    if (n >= base) n = base - 1; // product = divisor * trial digit.

                    prod = multiply(yc, n, base);
                    prodL = prod.length;
                    remL = rem.length; // Compare product and remainder.
                    // If product > remainder.
                    // Trial digit n too high.
                    // n is 1 too high about 5% of the time, and is not known to have
                    // ever been more than 1 too high.

                    while (compare(prod, rem, prodL, remL) == 1) {
                      n--; // Subtract divisor from product.

                      subtract(prod, yL < prodL ? yz : yc, prodL, base);
                      prodL = prod.length;
                      cmp = 1;
                    }
                  } else {
                    // n is 0 or 1, cmp is -1.
                    // If n is 0, there is no need to compare yc and rem again below,
                    // so change cmp to 1 to avoid it.
                    // If n is 1, leave cmp as -1, so yc and rem are compared again.
                    if (n == 0) {
                      // divisor < remainder, so n must be at least 1.
                      cmp = n = 1;
                    } // product = divisor


                    prod = yc.slice();
                    prodL = prod.length;
                  }

                  if (prodL < remL) prod.unshift(0); // Subtract product from remainder.

                  subtract(rem, prod, remL, base);
                  remL = rem.length; // If product was < remainder.

                  if (cmp == -1) {
                    // Compare divisor and new remainder.
                    // If divisor < new remainder, subtract divisor from remainder.
                    // Trial digit n too low.
                    // n is 1 too low about 5% of the time, and very rarely 2 too low.
                    while (compare(yc, rem, yL, remL) < 1) {
                      n++; // Subtract divisor from remainder.

                      subtract(rem, yL < remL ? yz : yc, remL, base);
                      remL = rem.length;
                    }
                  }
                } else if (cmp === 0) {
                  n++;
                  rem = [0];
                } // else cmp === 1 and n will be 0
                // Add the next digit, n, to the result array.


                qc[i++] = n; // Update the remainder.

                if (rem[0]) {
                  rem[remL++] = xc[xi] || 0;
                } else {
                  rem = [xc[xi]];
                  remL = 1;
                }
              } while ((xi++ < xL || rem[0] != null) && s--);

              more = rem[0] != null; // Leading zero?

              if (!qc[0]) qc.shift();
            }

            if (base == BASE) {
              // To calculate q.e, first get the number of digits of qc[0].
              for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) {
              }

              round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more); // Caller is convertBase.
            } else {
              q.e = e;
              q.r = +more;
            }

            return q;
          };
        }();
        /*
         * Return a string representing the value of BigNumber n in fixed-point or exponential
         * notation rounded to the specified decimal places or significant digits.
         *
         * n is a BigNumber.
         * i is the index of the last digit required (i.e. the digit that may be rounded up).
         * rm is the rounding mode.
         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
         */


        function format(n, i, rm, caller) {
          var c0, e, ne, len, str;
          rm = rm != null && isValidInt(rm, 0, 8, caller, roundingMode) ? rm | 0 : ROUNDING_MODE;
          if (!n.c) return n.toString();
          c0 = n.c[0];
          ne = n.e;

          if (i == null) {
            str = coeffToString(n.c);
            str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG ? toExponential(str, ne) : toFixedPoint(str, ne);
          } else {
            n = round(new BigNumber(n), i, rm); // n.e may have changed if the value was rounded up.

            e = n.e;
            str = coeffToString(n.c);
            len = str.length; // toPrecision returns exponential notation if the number of significant digits
            // specified is less than the number of digits necessary to represent the integer
            // part of the value in fixed-point notation.
            // Exponential notation.

            if (caller == 19 || caller == 24 && (i <= e || e <= TO_EXP_NEG)) {
              // Append zeros?
              for (; len < i; str += '0', len++) {
              }

              str = toExponential(str, e); // Fixed-point notation.
            } else {
              i -= ne;
              str = toFixedPoint(str, e); // Append zeros?

              if (e + 1 > len) {
                if (--i > 0) for (str += '.'; i--; str += '0') {
                }
              } else {
                i += e - len;

                if (i > 0) {
                  if (e + 1 == len) str += '.';

                  for (; i--; str += '0') {
                  }
                }
              }
            }
          }

          return n.s < 0 && c0 ? '-' + str : str;
        } // Handle BigNumber.max and BigNumber.min.


        function maxOrMin(args, method) {
          var m,
              n,
              i = 0;
          if (isArray(args[0])) args = args[0];
          m = new BigNumber(args[0]);

          for (; ++i < args.length;) {
            n = new BigNumber(args[i]); // If any number is NaN, return NaN.

            if (!n.s) {
              m = n;
              break;
            } else if (method.call(m, n)) {
              m = n;
            }
          }

          return m;
        }
        /*
         * Return true if n is an integer in range, otherwise throw.
         * Use for argument validation when ERRORS is true.
         */


        function intValidatorWithErrors(n, min, max, caller, name) {
          if (n < min || n > max || n != truncate(n)) {
            raise(caller, (name || 'decimal places') + (n < min || n > max ? ' out of range' : ' not an integer'), n);
          }

          return true;
        }
        /*
         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
         * Called by minus, plus and times.
         */


        function normalise(n, c, e) {
          var i = 1,
              j = c.length; // Remove trailing zeros.

          for (; !c[--j]; c.pop()) {
          } // Calculate the base 10 exponent. First get the number of digits of c[0].


          for (j = c[0]; j >= 10; j /= 10, i++) {
          } // Overflow?


          if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
            // Infinity.
            n.c = n.e = null; // Underflow?
          } else if (e < MIN_EXP) {
            // Zero.
            n.c = [n.e = 0];
          } else {
            n.e = e;
            n.c = c;
          }

          return n;
        } // Handle values that fail the validity test in BigNumber.


        parseNumeric = function () {
          var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
              dotAfter = /^([^.]+)\.$/,
              dotBefore = /^\.([^.]+)$/,
              isInfinityOrNaN = /^-?(Infinity|NaN)$/,
              whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function (x, str, num, b) {
            var base,
                s = num ? str : str.replace(whitespaceOrPlus, ''); // No exception on ±Infinity or NaN.

            if (isInfinityOrNaN.test(s)) {
              x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
            } else {
              if (!num) {
                // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
                s = s.replace(basePrefix, function (m, p1, p2) {
                  base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                  return !b || b == base ? p1 : m;
                });

                if (b) {
                  base = b; // E.g. '1.' to '1', '.1' to '0.1'

                  s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
                }

                if (str != s) return new BigNumber(s, base);
              } // 'new BigNumber() not a number: {n}'
              // 'new BigNumber() not a base {b} number: {n}'


              if (ERRORS) raise(id, 'not a' + (b ? ' base ' + b : '') + ' number', str);
              x.s = null;
            }

            x.c = x.e = null;
            id = 0;
          };
        }(); // Throw a BigNumber Error.


        function raise(caller, msg, val) {
          var error = new Error(['new BigNumber', // 0
          'cmp', // 1
          'config', // 2
          'div', // 3
          'divToInt', // 4
          'eq', // 5
          'gt', // 6
          'gte', // 7
          'lt', // 8
          'lte', // 9
          'minus', // 10
          'mod', // 11
          'plus', // 12
          'precision', // 13
          'random', // 14
          'round', // 15
          'shift', // 16
          'times', // 17
          'toDigits', // 18
          'toExponential', // 19
          'toFixed', // 20
          'toFormat', // 21
          'toFraction', // 22
          'pow', // 23
          'toPrecision', // 24
          'toString', // 25
          'BigNumber' // 26
          ][caller] + '() ' + msg + ': ' + val);
          error.name = 'BigNumber Error';
          id = 0;
          throw error;
        }
        /*
         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
         * If r is truthy, it is known that there are more digits after the rounding digit.
         */


        function round(x, sd, rm, r) {
          var d,
              i,
              j,
              k,
              n,
              ni,
              rd,
              xc = x.c,
              pows10 = POWS_TEN; // if x is not Infinity or NaN...

          if (xc) {
            // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
            // n is a base 1e14 number, the value of the element of array x.c containing rd.
            // ni is the index of n within x.c.
            // d is the number of digits of n.
            // i is the index of rd within n including leading zeros.
            // j is the actual index of rd within n (if < 0, rd is a leading zero).
            out: {
              // Get the number of digits of the first element of xc.
              for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) {
              }

              i = sd - d; // If the rounding digit is in the first element of xc...

              if (i < 0) {
                i += LOG_BASE;
                j = sd;
                n = xc[ni = 0]; // Get the rounding digit at index j of n.

                rd = n / pows10[d - j - 1] % 10 | 0;
              } else {
                ni = mathceil((i + 1) / LOG_BASE);

                if (ni >= xc.length) {
                  if (r) {
                    // Needed by sqrt.
                    for (; xc.length <= ni; xc.push(0)) {
                    }

                    n = rd = 0;
                    d = 1;
                    i %= LOG_BASE;
                    j = i - LOG_BASE + 1;
                  } else {
                    break out;
                  }
                } else {
                  n = k = xc[ni]; // Get the number of digits of n.

                  for (d = 1; k >= 10; k /= 10, d++) {
                  } // Get the index of rd within n.


                  i %= LOG_BASE; // Get the index of rd within n, adjusted for leading zeros.
                  // The number of leading zeros of n is given by LOG_BASE - d.

                  j = i - LOG_BASE + d; // Get the rounding digit at index j of n.

                  rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
                }
              }

              r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
              // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
              // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
              xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
              r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
              (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));

              if (sd < 1 || !xc[0]) {
                xc.length = 0;

                if (r) {
                  // Convert sd to decimal places.
                  sd -= x.e + 1; // 1, 0.1, 0.01, 0.001, 0.0001 etc.

                  xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                  x.e = -sd || 0;
                } else {
                  // Zero.
                  xc[0] = x.e = 0;
                }

                return x;
              } // Remove excess digits.


              if (i == 0) {
                xc.length = ni;
                k = 1;
                ni--;
              } else {
                xc.length = ni + 1;
                k = pows10[LOG_BASE - i]; // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                // j > 0 means i > number of leading zeros of n.

                xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
              } // Round up?


              if (r) {
                for (;;) {
                  // If the digit to be rounded up is in the first element of xc...
                  if (ni == 0) {
                    // i will be the length of xc[0] before k is added.
                    for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) {
                    }

                    j = xc[0] += k;

                    for (k = 1; j >= 10; j /= 10, k++) {
                    } // if i != k the length has increased.


                    if (i != k) {
                      x.e++;
                      if (xc[0] == BASE) xc[0] = 1;
                    }

                    break;
                  } else {
                    xc[ni] += k;
                    if (xc[ni] != BASE) break;
                    xc[ni--] = 0;
                    k = 1;
                  }
                }
              } // Remove trailing zeros.


              for (i = xc.length; xc[--i] === 0; xc.pop()) {
              }
            } // Overflow? Infinity.


            if (x.e > MAX_EXP) {
              x.c = x.e = null; // Underflow? Zero.
            } else if (x.e < MIN_EXP) {
              x.c = [x.e = 0];
            }
          }

          return x;
        } // PROTOTYPE/INSTANCE METHODS

        /*
         * Return a new BigNumber whose value is the absolute value of this BigNumber.
         */


        P.absoluteValue = P.abs = function () {
          var x = new BigNumber(this);
          if (x.s < 0) x.s = 1;
          return x;
        };
        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of Infinity.
         */


        P.ceil = function () {
          return round(new BigNumber(this), this.e + 1, 2);
        };
        /*
         * Return
         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
         * 0 if they have the same value,
         * or null if the value of either is NaN.
         */


        P.comparedTo = P.cmp = function (y, b) {
          id = 1;
          return compare(this, new BigNumber(y, b));
        };
        /*
         * Return the number of decimal places of the value of this BigNumber, or null if the value
         * of this BigNumber is ±Infinity or NaN.
         */


        P.decimalPlaces = P.dp = function () {
          var n,
              v,
              c = this.c;
          if (!c) return null;
          n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE; // Subtract the number of trailing zeros of the last number.

          if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) {
          }
          if (n < 0) n = 0;
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


        P.dividedBy = P.div = function (y, b) {
          id = 3;
          return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
        };
        /*
         * Return a new BigNumber whose value is the integer part of dividing the value of this
         * BigNumber by the value of BigNumber(y, b).
         */


        P.dividedToIntegerBy = P.divToInt = function (y, b) {
          id = 4;
          return div(this, new BigNumber(y, b), 0, 1);
        };
        /*
         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
         * otherwise returns false.
         */


        P.equals = P.eq = function (y, b) {
          id = 5;
          return compare(this, new BigNumber(y, b)) === 0;
        };
        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of -Infinity.
         */


        P.floor = function () {
          return round(new BigNumber(this), this.e + 1, 3);
        };
        /*
         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * otherwise returns false.
         */


        P.greaterThan = P.gt = function (y, b) {
          id = 6;
          return compare(this, new BigNumber(y, b)) > 0;
        };
        /*
         * Return true if the value of this BigNumber is greater than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */


        P.greaterThanOrEqualTo = P.gte = function (y, b) {
          id = 7;
          return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;
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
          return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
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


        P.lessThan = P.lt = function (y, b) {
          id = 8;
          return compare(this, new BigNumber(y, b)) < 0;
        };
        /*
         * Return true if the value of this BigNumber is less than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */


        P.lessThanOrEqualTo = P.lte = function (y, b) {
          id = 9;
          return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
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


        P.minus = P.sub = function (y, b) {
          var i,
              j,
              t,
              xLTy,
              x = this,
              a = x.s;
          id = 10;
          y = new BigNumber(y, b);
          b = y.s; // Either NaN?

          if (!a || !b) return new BigNumber(NaN); // Signs differ?

          if (a != b) {
            y.s = -b;
            return x.plus(y);
          }

          var xe = x.e / LOG_BASE,
              ye = y.e / LOG_BASE,
              xc = x.c,
              yc = y.c;

          if (!xe || !ye) {
            // Either Infinity?
            if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN); // Either zero?

            if (!xc[0] || !yc[0]) {
              // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
              return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x : // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
              ROUNDING_MODE == 3 ? -0 : 0);
            }
          }

          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice(); // Determine which is the bigger number.

          if (a = xe - ye) {
            if (xLTy = a < 0) {
              a = -a;
              t = xc;
            } else {
              ye = xe;
              t = yc;
            }

            t.reverse(); // Prepend zeros to equalise exponents.

            for (b = a; b--; t.push(0)) {
            }

            t.reverse();
          } else {
            // Exponents equal. Check digit by digit.
            j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

            for (a = b = 0; b < j; b++) {
              if (xc[b] != yc[b]) {
                xLTy = xc[b] < yc[b];
                break;
              }
            }
          } // x < y? Point xc to the array of the bigger number.


          if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;
          b = (j = yc.length) - (i = xc.length); // Append zeros to xc if shorter.
          // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.

          if (b > 0) for (; b--; xc[i++] = 0) {
          }
          b = BASE - 1; // Subtract yc from xc.

          for (; j > a;) {
            if (xc[--j] < yc[j]) {
              for (i = j; i && !xc[--i]; xc[i] = b) {
              }

              --xc[i];
              xc[j] += BASE;
            }

            xc[j] -= yc[j];
          } // Remove leading zeros and adjust exponent accordingly.


          for (; xc[0] == 0; xc.shift(), --ye) {
          } // Zero?


          if (!xc[0]) {
            // Following IEEE 754 (2008) 6.3,
            // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
            y.s = ROUNDING_MODE == 3 ? -1 : 1;
            y.c = [y.e = 0];
            return y;
          } // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
          // for finite x and y.


          return normalise(y, xc, ye);
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


        P.modulo = P.mod = function (y, b) {
          var q,
              s,
              x = this;
          id = 11;
          y = new BigNumber(y, b); // Return NaN if x is Infinity or NaN, or y is NaN or zero.

          if (!x.c || !y.s || y.c && !y.c[0]) {
            return new BigNumber(NaN); // Return x if y is Infinity or x is zero.
          } else if (!y.c || x.c && !x.c[0]) {
            return new BigNumber(x);
          }

          if (MODULO_MODE == 9) {
            // Euclidian division: q = sign(y) * floor(x / abs(y))
            // r = x - qy    where  0 <= r < abs(y)
            s = y.s;
            y.s = 1;
            q = div(x, y, 0, 3);
            y.s = s;
            q.s *= s;
          } else {
            q = div(x, y, 0, MODULO_MODE);
          }

          return x.minus(q.times(y));
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


        P.plus = P.add = function (y, b) {
          var t,
              x = this,
              a = x.s;
          id = 12;
          y = new BigNumber(y, b);
          b = y.s; // Either NaN?

          if (!a || !b) return new BigNumber(NaN); // Signs differ?

          if (a != b) {
            y.s = -b;
            return x.minus(y);
          }

          var xe = x.e / LOG_BASE,
              ye = y.e / LOG_BASE,
              xc = x.c,
              yc = y.c;

          if (!xe || !ye) {
            // Return ±Infinity if either ±Infinity.
            if (!xc || !yc) return new BigNumber(a / 0); // Either zero?
            // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.

            if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
          }

          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice(); // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.

          if (a = xe - ye) {
            if (a > 0) {
              ye = xe;
              t = yc;
            } else {
              a = -a;
              t = xc;
            }

            t.reverse();

            for (; a--; t.push(0)) {
            }

            t.reverse();
          }

          a = xc.length;
          b = yc.length; // Point xc to the longer array, and b to the shorter length.

          if (a - b < 0) t = yc, yc = xc, xc = t, b = a; // Only start adding at yc.length - 1 as the further digits of xc can be ignored.

          for (a = 0; b;) {
            a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
            xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
          }

          if (a) {
            xc.unshift(a);
            ++ye;
          } // No need to check for zero, as +x + +y != 0 && -x + -y != 0
          // ye = MAX_EXP + 1 possible


          return normalise(y, xc, ye);
        };
        /*
         * Return the number of significant digits of the value of this BigNumber.
         *
         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
         */


        P.precision = P.sd = function (z) {
          var n,
              v,
              x = this,
              c = x.c; // 'precision() argument not a boolean or binary digit: {z}'

          if (z != null && z !== !!z && z !== 1 && z !== 0) {
            if (ERRORS) raise(13, 'argument' + notBool, z);
            if (z != !!z) z = null;
          }

          if (!c) return null;
          v = c.length - 1;
          n = v * LOG_BASE + 1;

          if (v = c[v]) {
            // Subtract the number of trailing zeros of the last element.
            for (; v % 10 == 0; v /= 10, n--) {
            } // Add the number of digits of the first element.


            for (v = c[0]; v >= 10; v /= 10, n++) {
            }
          }

          if (z && x.e + 1 > n) n = x.e + 1;
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


        P.round = function (dp, rm) {
          var n = new BigNumber(this);

          if (dp == null || isValidInt(dp, 0, MAX, 15)) {
            round(n, ~~dp + this.e + 1, rm == null || !isValidInt(rm, 0, 8, 15, roundingMode) ? ROUNDING_MODE : rm | 0);
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
          return isValidInt(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument') // k < 1e+21, or truncate(k) will produce exponential notation.
          ? n.times('1e' + truncate(k)) : new BigNumber(n.c && n.c[0] && (k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER) ? n.s * (k < 0 ? 0 : 1 / 0) : n);
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
          var m,
              n,
              r,
              rep,
              t,
              x = this,
              c = x.c,
              s = x.s,
              e = x.e,
              dp = DECIMAL_PLACES + 4,
              half = new BigNumber('0.5'); // Negative/NaN/Infinity/zero?

          if (s !== 1 || !c || !c[0]) {
            return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
          } // Initial estimate.


          s = Math.sqrt(+x); // Math.sqrt underflow/overflow?
          // Pass x to Math.sqrt as integer, then adjust the exponent of the result.

          if (s == 0 || s == 1 / 0) {
            n = coeffToString(c);
            if ((n.length + e) % 2 == 0) n += '0';
            s = Math.sqrt(n);
            e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

            if (s == 1 / 0) {
              n = '1e' + e;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf('e') + 1) + e;
            }

            r = new BigNumber(n);
          } else {
            r = new BigNumber(s + '');
          } // Check for zero.
          // r could be zero if MIN_EXP is changed after the this value was created.
          // This would cause a division by zero (x/t) and hence Infinity below, which would cause
          // coeffToString to throw.


          if (r.c[0]) {
            e = r.e;
            s = e + dp;
            if (s < 3) s = 0; // Newton-Raphson iteration.

            for (;;) {
              t = r;
              r = half.times(t.plus(div(x, t, dp, 1)));

              if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                // The exponent of r may here be one less than the final result exponent,
                // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
                // are indexed correctly.
                if (r.e < e) --s;
                n = n.slice(s - 3, s + 1); // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
                // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
                // iteration.

                if (n == '9999' || !rep && n == '4999') {
                  // On the first iteration only, check to see if rounding up gives the
                  // exact result as the nines may infinitely repeat.
                  if (!rep) {
                    round(t, t.e + DECIMAL_PLACES + 2, 0);

                    if (t.times(t).eq(x)) {
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
                  if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
                    // Truncate to the first rounding digit.
                    round(r, r.e + DECIMAL_PLACES + 2, 1);
                    m = !r.times(r).eq(x);
                  }

                  break;
                }
              }
            }
          }

          return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
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


        P.times = P.mul = function (y, b) {
          var c,
              e,
              i,
              j,
              k,
              m,
              xcL,
              xlo,
              xhi,
              ycL,
              ylo,
              yhi,
              zc,
              base,
              sqrtBase,
              x = this,
              xc = x.c,
              yc = (id = 17, y = new BigNumber(y, b)).c; // Either NaN, ±Infinity or ±0?

          if (!xc || !yc || !xc[0] || !yc[0]) {
            // Return NaN if either is NaN, or one is 0 and the other is Infinity.
            if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
              y.c = y.e = y.s = null;
            } else {
              y.s *= x.s; // Return ±Infinity if either is ±Infinity.

              if (!xc || !yc) {
                y.c = y.e = null; // Return ±0 if either is ±0.
              } else {
                y.c = [0];
                y.e = 0;
              }
            }

            return y;
          }

          e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
          y.s *= x.s;
          xcL = xc.length;
          ycL = yc.length; // Ensure xc points to longer array and xcL to its length.

          if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i; // Initialise the result array with zeros.

          for (i = xcL + ycL, zc = []; i--; zc.push(0)) {
          }

          base = BASE;
          sqrtBase = SQRT_BASE;

          for (i = ycL; --i >= 0;) {
            c = 0;
            ylo = yc[i] % sqrtBase;
            yhi = yc[i] / sqrtBase | 0;

            for (k = xcL, j = i + k; j > i;) {
              xlo = xc[--k] % sqrtBase;
              xhi = xc[k] / sqrtBase | 0;
              m = yhi * xlo + xhi * ylo;
              xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
              c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
              zc[j--] = xlo % base;
            }

            zc[j] = c;
          }

          if (c) {
            ++e;
          } else {
            zc.shift();
          }

          return normalise(y, zc, e);
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


        P.toDigits = function (sd, rm) {
          var n = new BigNumber(this);
          sd = sd == null || !isValidInt(sd, 1, MAX, 18, 'precision') ? null : sd | 0;
          rm = rm == null || !isValidInt(rm, 0, 8, 18, roundingMode) ? ROUNDING_MODE : rm | 0;
          return sd ? round(n, sd, rm) : n;
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


        P.toExponential = function (dp, rm) {
          return format(this, dp != null && isValidInt(dp, 0, MAX, 19) ? ~~dp + 1 : null, rm, 19);
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


        P.toFixed = function (dp, rm) {
          return format(this, dp != null && isValidInt(dp, 0, MAX, 20) ? ~~dp + this.e + 1 : null, rm, 20);
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


        P.toFormat = function (dp, rm) {
          var str = format(this, dp != null && isValidInt(dp, 0, MAX, 21) ? ~~dp + this.e + 1 : null, rm, 21);

          if (this.c) {
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

            if (g1 > 0 && len > 0) {
              i = len % g1 || g1;
              intPart = intDigits.substr(0, i);

              for (; i < len; i += g1) {
                intPart += groupSeparator + intDigits.substr(i, g1);
              }

              if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
              if (isNeg) intPart = '-' + intPart;
            }

            str = fractionPart ? intPart + FORMAT.decimalSeparator + ((g2 = +FORMAT.fractionGroupSize) ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'), '$&' + FORMAT.fractionGroupSeparator) : fractionPart) : intPart;
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
          var arr,
              d0,
              d2,
              e,
              exp,
              n,
              n0,
              q,
              s,
              k = ERRORS,
              x = this,
              xc = x.c,
              d = new BigNumber(ONE),
              n1 = d0 = new BigNumber(ONE),
              d1 = n0 = new BigNumber(ONE);

          if (md != null) {
            ERRORS = false;
            n = new BigNumber(md);
            ERRORS = k;

            if (!(k = n.isInt()) || n.lt(ONE)) {
              if (ERRORS) {
                raise(22, 'max denominator ' + (k ? 'out of range' : 'not an integer'), md);
              } // ERRORS is false:
              // If md is a finite non-integer >= 1, round it to an integer and use it.


              md = !k && n.c && round(n, n.e + 1, 1).gte(ONE) ? n : null;
            }
          }

          if (!xc) return x.toString();
          s = coeffToString(xc); // Determine initial denominator.
          // d is a power of 10 and the minimum max denominator that specifies the value exactly.

          e = d.e = s.length - x.e - 1;
          d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
          md = !md || n.cmp(d) > 0 ? e > 0 ? d : n1 : n;
          exp = MAX_EXP;
          MAX_EXP = 1 / 0;
          n = new BigNumber(s); // n0 = d1 = 0

          n0.c[0] = 0;

          for (;;) {
            q = div(n, d, 0, 1);
            d2 = d0.plus(q.times(d1));
            if (d2.cmp(md) == 1) break;
            d0 = d1;
            d1 = d2;
            n1 = n0.plus(q.times(d2 = n1));
            n0 = d2;
            d = n.minus(q.times(d2 = d));
            n = d2;
          }

          d2 = div(md.minus(d0), d1, 0, 1);
          n0 = n0.plus(d2.times(n1));
          d0 = d0.plus(d2.times(d1));
          n0.s = n1.s = x.s;
          e *= 2; // Determine which fraction is closer to x, n0/d0 or n1/d1

          arr = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().cmp(div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1.toString(), d1.toString()] : [n0.toString(), d0.toString()];
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


        P.toPower = P.pow = function (n, m) {
          var k,
              y,
              z,
              i = mathfloor(n < 0 ? -n : +n),
              x = this;

          if (m != null) {
            id = 23;
            m = new BigNumber(m);
          } // Pass ±Infinity to Math.pow if exponent is out of range.


          if (!isValidInt(n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent') && (!isFinite(n) || i > MAX_SAFE_INTEGER && (n /= 0) || parseFloat(n) != n && !(n = NaN)) || n == 0) {
            k = Math.pow(+x, n);
            return new BigNumber(m ? k % m : k);
          }

          if (m) {
            if (n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt()) {
              x = x.mod(m);
            } else {
              z = m; // Nullify m so only a single mod operation is performed at the end.

              m = null;
            }
          } else if (POW_PRECISION) {
            // Truncating each coefficient array to a length of k after each multiplication
            // equates to truncating significant digits to POW_PRECISION + [28, 41],
            // i.e. there will be a minimum of 28 guard digits retained.
            // (Using + 1.5 would give [9, 21] guard digits.)
            k = mathceil(POW_PRECISION / LOG_BASE + 2);
          }

          y = new BigNumber(ONE);

          for (;;) {
            if (i % 2) {
              y = y.times(x);
              if (!y.c) break;

              if (k) {
                if (y.c.length > k) y.c.length = k;
              } else if (m) {
                y = y.mod(m);
              }
            }

            i = mathfloor(i / 2);
            if (!i) break;
            x = x.times(x);

            if (k) {
              if (x.c && x.c.length > k) x.c.length = k;
            } else if (m) {
              x = x.mod(m);
            }
          }

          if (m) return y;
          if (n < 0) y = ONE.div(y);
          return z ? y.mod(z) : k ? round(y, POW_PRECISION, ROUNDING_MODE) : y;
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


        P.toPrecision = function (sd, rm) {
          return format(this, sd != null && isValidInt(sd, 1, MAX, 24, 'precision') ? sd | 0 : null, rm, 24);
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
              e = n.e; // Infinity or NaN?

          if (e === null) {
            if (s) {
              str = 'Infinity';
              if (s < 0) str = '-' + str;
            } else {
              str = 'NaN';
            }
          } else {
            str = coeffToString(n.c);

            if (b == null || !isValidInt(b, 2, 64, 25, 'base')) {
              str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e);
            } else {
              str = convertBase(toFixedPoint(str, e), b | 0, 10, s);
            }

            if (s < 0 && n.c[0]) str = '-' + str;
          }

          return str;
        };
        /*
         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
         * number.
         */


        P.truncated = P.trunc = function () {
          return round(new BigNumber(this), this.e + 1, 1);
        };
        /*
         * Return as toString, but do not accept a base argument, and include the minus sign for
         * negative zero.
         */


        P.valueOf = P.toJSON = function () {
          var str,
              n = this,
              e = n.e;
          if (e === null) return n.toString();
          str = coeffToString(n.c);
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e);
          return n.s < 0 ? '-' + str : str;
        };

        P.isBigNumber = true;
        if (config != null) BigNumber.config(config);
        return BigNumber;
      } // PRIVATE HELPER FUNCTIONS


      function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
      } // Return a coefficient array as a string of base 10 digits.


      function coeffToString(a) {
        var s,
            z,
            i = 1,
            j = a.length,
            r = a[0] + '';

        for (; i < j;) {
          s = a[i++] + '';
          z = LOG_BASE - s.length;

          for (; z--; s = '0' + s) {
          }

          r += s;
        } // Determine trailing zeros.


        for (j = r.length; r.charCodeAt(--j) === 48;) {
        }

        return r.slice(0, j + 1 || 1);
      } // Compare the value of BigNumbers x and y.


      function compare(x, y) {
        var a,
            b,
            xc = x.c,
            yc = y.c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e; // Either NaN?

        if (!i || !j) return null;
        a = xc && !xc[0];
        b = yc && !yc[0]; // Either zero?

        if (a || b) return a ? b ? 0 : -j : i; // Signs differ?

        if (i != j) return i;
        a = i < 0;
        b = k == l; // Either Infinity?

        if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1; // Compare exponents.

        if (!b) return k > l ^ a ? 1 : -1;
        j = (k = xc.length) < (l = yc.length) ? k : l; // Compare digit by digit.

        for (i = 0; i < j; i++) {
          if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
        } // Compare lengths.


        return k == l ? 0 : k > l ^ a ? 1 : -1;
      }
      /*
       * Return true if n is a valid number in range, otherwise false.
       * Use for argument validation when ERRORS is false.
       * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
       */


      function intValidatorNoErrors(n, min, max) {
        return (n = truncate(n)) >= min && n <= max;
      }

      function isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
      }
      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. convertBase('255', 10, 16) returns [15, 15].
       * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
       */


      function toBaseOut(str, baseIn, baseOut) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) {
          }

          arr[j = 0] += ALPHABET.indexOf(str.charAt(i++));

          for (; j < arr.length; j++) {
            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      }

      function toExponential(str, e) {
        return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) + (e < 0 ? 'e' : 'e+') + e;
      }

      function toFixedPoint(str, e) {
        var len, z; // Negative exponent?

        if (e < 0) {
          // Prepend zeros.
          for (z = '0.'; ++e; z += '0') {
          }

          str = z + str; // Positive exponent
        } else {
          len = str.length; // Append zeros.

          if (++e > len) {
            for (z = '0', e -= len; --e; z += '0') {
            }

            str += z;
          } else if (e < len) {
            str = str.slice(0, e) + '.' + str.slice(e);
          }
        }

        return str;
      }

      function truncate(n) {
        n = parseFloat(n);
        return n < 0 ? mathceil(n) : mathfloor(n);
      } // EXPORT


      BigNumber = constructorFactory();
      BigNumber['default'] = BigNumber.BigNumber = BigNumber; // AMD.

      if ( module.exports) {
        module.exports = BigNumber; // Browser.
      } else {
        if (!globalObj) globalObj = typeof self != 'undefined' ? self : Function('return this')();
        globalObj.BigNumber = BigNumber;
      }
    })(commonjsGlobal);
  });

  /**
  * @desc: 判断是否是有效时间.
  */

  var isValidate = function isValidate(date
  /*:Date*/
  )
  /*:boolean*/
  {
    if (isNaN(date) || !date || date.toString() == 'Invalid Date') return false;
    return date instanceof Date;
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
      "M+": t.getMonth() + 1,
      //月份         
      "d+": t.getDate(),
      //日         
      "h+": t.getHours() % 12 == 0 ? 12 : t.getHours() % 12,
      //小时         
      "H+": t.getHours(),
      //小时         
      "m+": t.getMinutes(),
      //分         
      "s+": t.getSeconds(),
      //秒         
      "q+": Math.floor((t.getMonth() + 3) / 3),
      //季度         
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
  }
  var getTimeString_1 = getTimeString;
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

  var getTimeStringFromNow = function getTimeStringFromNow(time, strFmt) {
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
   * @desc: 通过字符串获取date. getTime('2012-05-09 11:10:12')
   * @param strTime: 时间字符串. '2012-05-09 11:10:12' 
   * @return: Date.
   */


  var getTime = function getTime(strTime) {
    var date = new Date();
    date.setFullYear(parseInt(strTime.substr(0, 4)), parseInt(strTime.substr(5, 2), 10) - 1, parseInt(strTime.substr(8, 2)));
    date.setHours(parseInt(strTime.substr(11, 2)) || 0, parseInt(strTime.substr(14, 2)) || 0, parseInt(strTime.substr(17, 2)) || 0, 0);
    return date;
  };
  /**
   * @desc: 通过时间获取date. getTime2('20120509111012')
   * @param strTime: 时间字符串. '20120509111012' 
   * @return: Date.
   */


  var getTime2 = function getTime2(strTime) {
    var date = new Date();
    date.setFullYear(parseInt(strTime.substr(0, 4)), parseInt(strTime.substr(4, 2), 10) - 1, parseInt(strTime.substr(6, 2)));
    date.setHours(parseInt(strTime.substr(8, 2)) || 0, parseInt(strTime.substr(10, 2)) || 0, parseInt(strTime.substr(12, 2)) || 0, 0);
    return date;
  };
  /**
   * @desc: getDate('2012-05-09')
   * @return: Date.
   */


  var getDate = function getDate(strDate) {
    var date = new Date(parseInt(strDate.substr(0, 4)), parseInt(strDate.substr(5, 2), 10) - 1, parseInt(strDate.substr(8, 2)));
    return date;
  };
  /**
   * @desc: getDate2('20120509')
   * @return: Date.
   */


  var getDate2 = function getDate2(strDate) {
    var date = new Date(parseInt(strDate.substr(0, 4)), parseInt(strDate.substr(4, 2), 10) - 1, parseInt(strDate.substr(6, 2)));
    return date;
  };
  /**
   * @desc: 获取时间的协调世界时间 string.
   * @param time: ms. (本地时间)
   * @param fmt: 格式化, 默认为 'HH:mm:ss'
   *             年(y)、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
   *              'yyyy-MM-dd hh:mm:ss.S' ==> 2006-07-02 08:09:04.423
   *              'yyyy-MM-dd E HH:mm:ss' ==> 2009-03-10 星期二 20:09:04
   *              'yyyy-M-d h:m:s.S'      ==> 2006-7-2 8:9:4.18
   * @param weekFmt: 星期的文字格式, 默认为 {'0':'星期天', '1': '星期一', ..., '6':'星期六'}
   * @return: string.
   */


  var getUTCTimeString = function getUTCTimeString(time, fmt, weekFmt) {
    if (typeof time !== "number") return "";
    fmt = fmt || 'HH:mm:ss';
    var t = new Date(time);
    var o = {
      "M+": t.getUTCMonth() + 1,
      //月份         
      "d+": t.getUTCDate(),
      //日         
      "h+": t.getUTCHours() % 12 == 0 ? 12 : t.getUTCHours() % 12,
      //小时         
      "H+": t.getUTCHours(),
      //小时         
      "m+": t.getUTCMinutes(),
      //分         
      "s+": t.getUTCSeconds(),
      //秒         
      "q+": Math.floor((t.getUTCMonth() + 3) / 3),
      //季度         
      "S": t.getUTCMilliseconds() //毫秒         

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
      fmt = fmt.replace(RegExp.$1, (t.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
    }

    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, week[t.getUTCDay() + ""]);
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }

    return fmt;
  };
  /**
   * @desc: 通过世界时间获取date. getDateFromUTC('2012-05-09')
   * @param strDateUTC: 世界日期字符串. '2012-05-09' 
   * @return: Date.
   */


  var getDateFromUTC = function getDateFromUTC(strDateUTC) {
    var date = new Date();
    date.setUTCFullYear(parseInt(strDateUTC.substr(0, 4)), parseInt(strDateUTC.substr(5, 2), 10) - 1, parseInt(strDateUTC.substr(8, 2)));
    date.setUTCHours(0, 0, 0, 0);
    return date;
  };
  /**
   * @desc: 通过世界时间获取date. getDate2FromUTC('20120509')
   * @param strDateUTC: 世界日期字符串. '20120509' 
   * @return: Date.
   */


  var getDate2FromUTC = function getDate2FromUTC(strDateUTC) {
    var date = new Date();
    date.setUTCFullYear(parseInt(strDateUTC.substr(0, 4)), parseInt(strDateUTC.substr(4, 2), 10) - 1, parseInt(strDateUTC.substr(6, 2)));
    date.setUTCHours(0, 0, 0, 0);
    return date;
  };
  /**
   * @desc: 通过世界时间获取date. getTimeFromUTC('2012-05-09 11:10:12')
   * @param strTimeUTC: 世界时间字符串. '2012-05-09 11:10:12' 
   * @return: Date.
   */


  var getTimeFromUTC = function getTimeFromUTC(strTimeUTC) {
    var date = new Date();
    date.setUTCFullYear(parseInt(strTimeUTC.substr(0, 4)), parseInt(strTimeUTC.substr(5, 2), 10) - 1, parseInt(strTimeUTC.substr(8, 2)));
    date.setUTCHours(parseInt(strTimeUTC.substr(11, 2)) || 0, parseInt(strTimeUTC.substr(14, 2)) || 0, parseInt(strTimeUTC.substr(17, 2)) || 0, 0);
    return date;
  };
  /**
   * @desc: 通过世界时间获取date. getTime2FromUTC('20120509111012')
   * @param strTimeUTC: 世界日期字符串. '20120509111012' 
   * @return: Date.
   */


  var getTime2FromUTC = function getTime2FromUTC(strTimeUTC) {
    var date = new Date();
    date.setUTCFullYear(parseInt(strTimeUTC.substr(0, 4)), parseInt(strTimeUTC.substr(4, 2), 10) - 1, parseInt(strTimeUTC.substr(6, 2)));
    date.setUTCHours(parseInt(strTimeUTC.substr(8, 2)) || 0, parseInt(strTimeUTC.substr(10, 2)) || 0, parseInt(strTimeUTC.substr(12, 2)) || 0, 0);
    return date;
  };

  var date = {
    isValidate: isValidate,
    getTimeString: getTimeString_1,
    getTimeStringFromNow: getTimeStringFromNow,
    getTime: getTime,
    getTime2: getTime2,
    getDate: getDate,
    getDate2: getDate2,
    getUTCTimeString: getUTCTimeString,
    getDateFromUTC: getDateFromUTC,
    getDate2FromUTC: getDate2FromUTC,
    getTimeFromUTC: getTimeFromUTC,
    getTime2FromUTC: getTime2FromUTC
  };

  /**
  * Copyright (c) 2017 Copyright tj All Rights Reserved.
  * Author: lipengxiang
  * Date: 2018-06-02 17:39
  * Desc: 
  */


  var isValidate$1 = date.isValidate;
  var getDate$1 = date.getDate;
  var getDate2$1 = date.getDate2;
  var getDate2FromUTC$1 = date.getDate2FromUTC;
  var getDateFromUTC$1 = date.getDateFromUTC;
  var getTime2FromUTC$1 = date.getTime2FromUTC;
  var getTimeString$1 = date.getTimeString;
  var getUTCTimeString$1 = date.getUTCTimeString;
  var getTimeStringFromNow$1 = date.getTimeStringFromNow;
  var getTimeFromUTC$1 = date.getTimeFromUTC;
  var getTime$1 = date.getTime;
  var getTime2$1 = date.getTime2;
  var date_1 = {
    isValidate: isValidate$1,
    getDate: getDate$1,
    getDate2: getDate2$1,
    getDate2FromUTC: getDate2FromUTC$1,
    getDateFromUTC: getDateFromUTC$1,
    getTime2FromUTC: getTime2FromUTC$1,
    getTimeString: getTimeString$1,
    getUTCTimeString: getUTCTimeString$1,
    getTimeStringFromNow: getTimeStringFromNow$1,
    getTimeFromUTC: getTimeFromUTC$1,
    getTime: getTime$1,
    getTime2: getTime2$1
  };

  /**
   * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
   * Author: lipengxiang
   * Desc:
   */


  var PromiseLib = Promise;
  /**
   * @desc: 模拟sleep.
   * @return: Promise.
   *     在ms时间后执行.
   * @e.g.
   *     febs.utils.sleep(1000).then(()=>{
            //1000ms之后resolve.
         });
   */

  var sleep = function sleep(ms) {
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
   * @desc: 合并多个map (浅拷贝).
   * @return: {}
   */


  var mergeMap = function mergeMap() {
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


  var isNull = function isNull(e) {
    return e === null || e === undefined || Number.isNaN(e);
  };
  /**
   * date.
   */


  var getTimeString$2 = date.getTimeString;
  var getTimeStringFromNow$2 = date.getTimeStringFromNow;
  var getDate$2 = date.getDate;
  var getDate2$2 = date.getDate2;
  /**
  * @desc: 创建promise，但函数中的this可以为指定值.
  *         例如: yield denodeify(fs.exists)(path);
  * @param self: 指定的对象.s
  * @return: promise.
  */

  var denodeify = function denodeify(fn, self, argumentCount) {
    argumentCount = argumentCount || Infinity;
    return function () {
      var args = Array.prototype.slice.call(arguments, 0, argumentCount > 0 ? argumentCount : 0);
      return new PromiseLib(function (resolve, reject) {
        args.push(function (err, res) {
          if (err) reject(err);else resolve(res);
        });
        var res = fn.apply(self, args);

        if (res && (_typeof(res) === 'object' || typeof res === 'function') && typeof res.then === 'function') {
          resolve(res);
        }
      });
    };
  };

  var utils = {
    sleep: sleep,
    mergeMap: mergeMap,
    isNull: isNull,
    getTimeString: getTimeString$2,
    getTimeStringFromNow: getTimeStringFromNow$2,
    getDate: getDate$2,
    getDate2: getDate2$2,
    denodeify: denodeify
  };

  // 20.1.2.6 Number.MAX_SAFE_INTEGER


  _export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

  var utils_browser = createCommonjsModule(function (module, exports) {
    /**
    * Copyright (c) 2020 Copyright bp All Rights Reserved.
    * Author: lipengxiang
    * Date: 2020-04-14 12:46
    * Desc: 
    */

    /**
     * @desc: 判断是否是ie.
     */

    exports.browserIsIE = function () {
      if (!!window.ActiveXObject || "ActiveXObject" in window) return true;else return false;
    };
    /**
     * @desc: 判断ie版本号.
     * @return number. 非ie返回Number.MAX_SAFE_INTEGER.
     *        如果是 edge 返回 'edge'
     */


    exports.browserIEVer = function () {
      if (!exports.browserIsIE()) return Number.MAX_SAFE_INTEGER;
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  

      var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  

      var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  

      var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;

      if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);

        if (fIEVersion == 7) {
          return 7;
        } else if (fIEVersion == 8) {
          return 8;
        } else if (fIEVersion == 9) {
          return 9;
        } else if (fIEVersion == 10) {
          return 10;
        } else {
          return 6; //IE版本<=7
        }
      } else if (isEdge) {
        return 'edge'; //edge
      } else if (isIE11) {
        return 11; //IE11  
      }
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
    /**
     * @desc: the browser is mobile.
     * @param userAgent: the browser user agent string.
     */


    exports.browserIsMobile = function (userAgent) {
      if (!userAgent) {
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined) {
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
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined) {
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
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined) {
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
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined) {
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
     * @desc: the platform is Windows.
     */


    exports.platformIsWin = function (userAgent) {
      if (!userAgent) {
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined) {
          userAgent = window.navigator.userAgent;
        }
      }

      var agent = userAgent;

      if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
        return true;
      }

      if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        return true;
      }

      return false;
    };
    /**
     * @desc: the platform is Mac.
     */


    exports.platformIsMac = function (userAgent) {
      if (!userAgent) {
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined) {
          userAgent = window.navigator.userAgent;
        }
      }

      var agent = userAgent;

      if (/macintosh|mac os x/i.test(agent)) {
        return true;
      }

      return false;
    };
  });
  var utils_browser_1 = utils_browser.browserIsIE;
  var utils_browser_2 = utils_browser.browserIEVer;
  var utils_browser_3 = utils_browser.browserIsSupportHtml5;
  var utils_browser_4 = utils_browser.browserIsMobile;
  var utils_browser_5 = utils_browser.browserIsIOS;
  var utils_browser_6 = utils_browser.browserIsPhone;
  var utils_browser_7 = utils_browser.browserIsWeixin;
  var utils_browser_8 = utils_browser.platformIsWin;
  var utils_browser_9 = utils_browser.platformIsMac;

  /**
   * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
   * Author: lipengxiang
   * Desc:
   */

  /**
   * @desc: 模拟sleep.
   * @return: Promise.
   *     在ms时间后执行.
   * @e.g.
   *     febs.utils.sleep(1000).then(()=>{
            //1000ms之后resolve.
         });
   */


  var sleep$1 = utils.sleep;
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

  var getTimeString$3 = utils.getTimeString;
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

  var getTimeStringFromNow$3 = utils.getTimeStringFromNow;
  /**
   * @desc: getDate('2012-05-09')
   * @return: Date.
   */

  var getDate$3 = utils.getDate;
  /**
   * @desc: getDate2('20120509')
   * @return: Date.
   */

  var getDate2$3 = utils.getDate2;
  /**
   * @desc: 合并多个map.
   * @return: {}
   */

  var mergeMap$1 = utils.mergeMap;
  /**
   * @desc: 判断参数是否是null,undefined,NaN
   * @return: boolean
   */

  var isNull$1 = utils.isNull;
  /**
  * @desc: 创建promise，但函数中的this可以为指定值.
  *         例如: yield denodeify(fs.exists)(path);
  * @param self: 指定的对象.s
  * @return: promise.
  */

  var denodeify$1 = utils.denodeify;
  /**
   * @desc: 判断是否是ie.
   */

  var browserIsIE = utils_browser.browserIsIE;
  /**
   * @desc: 判断ie版本号.
   * @return number. 非ie返回Number.MAX_SAFE_INTEGER.
   *        如果是 edge 返回 'edge'
   */

  var browserIEVer = utils_browser.browserIEVer;
  /**
   * @desc: the browser is support html5.
   */

  var browserIsSupportHtml5 = utils_browser.browserIsSupportHtml5;
  /**
   * @desc: the browser is mobile.
   * @param userAgent: the browser user agent string.
   */

  var browserIsMobile = utils_browser.browserIsMobile;
  /**
   * @desc: the browser is ios.
   * @param userAgent: the browser user agent string.
   */

  var browserIsIOS = utils_browser.browserIsIOS;
  /**
   * @desc: the browser is phone.
   * @param userAgent: the browser user agent string.
   */

  var browserIsPhone = utils_browser.browserIsPhone;
  /**
   * @desc: the browser is weixin.
   */

  var browserIsWeixin = utils_browser.browserIsWeixin;
  /**
   * @desc: the platform is Windows.
   */

  var platformIsWin = utils_browser.platformIsWin;
  /**
   * @desc: the platform is Mac.
   */

  var platformIsMac = utils_browser.platformIsMac;
  var utils_1 = {
    sleep: sleep$1,
    getTimeString: getTimeString$3,
    getTimeStringFromNow: getTimeStringFromNow$3,
    getDate: getDate$3,
    getDate2: getDate2$3,
    mergeMap: mergeMap$1,
    isNull: isNull$1,
    denodeify: denodeify$1,
    browserIsIE: browserIsIE,
    browserIEVer: browserIEVer,
    browserIsSupportHtml5: browserIsSupportHtml5,
    browserIsMobile: browserIsMobile,
    browserIsIOS: browserIsIOS,
    browserIsPhone: browserIsPhone,
    browserIsWeixin: browserIsWeixin,
    platformIsWin: platformIsWin,
    platformIsMac: platformIsMac
  };

  var string = createCommonjsModule(function (module, exports) {
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

      if (/^(1[2-9][0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89]|98[0-9]|99[0-9])\d{8}$/.test(str)) {
        return true;
      }

      return false;
    };
    /**
     * @desc: 判断是否是email.
     * @return: boolean.
     */


    exports.isEmail = function (str) {
      if (!str) return false;

      if (/^(([A-Za-z0-9\u4e00-\u9fa5_-]|\.)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)$/.test(str)) {
        return true;
      }

      return false;
    };
    /**
     * @desc: 判断是否是英文数字组合.
     * @return: boolean.
     */


    exports.isAlphaOrDigit = function (str) {
      if (!str) return false;

      if (/^[A-Za-z0-9]+$/.test(str)) {
        return true;
      }

      return false;
    };
    /**
     * @desc: 判断是否是中文.
     * @return: boolean.
     */


    exports.isChinese = function (str) {
      if (!str) return false;

      if (/^[\u4e00-\u9fa5]{0,}$/.test(str)) {
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
      } //alert(totalLength);


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

    exports.utf8ToBytes = function (str) {
      if (!str) {
        return new Array();
      }

      var bytes = new Array();
      var len, c;
      len = str.length;

      for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);

        if (c >= 0x010000 && c <= 0x10FFFF) {
          bytes.push(c >> 18 & 0x07 | 0xF0);
          bytes.push(c >> 12 & 0x3F | 0x80);
          bytes.push(c >> 6 & 0x3F | 0x80);
          bytes.push(c & 0x3F | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
          bytes.push(c >> 12 & 0x0F | 0xE0);
          bytes.push(c >> 6 & 0x3F | 0x80);
          bytes.push(c & 0x3F | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
          bytes.push(c >> 6 & 0x1F | 0xC0);
          bytes.push(c & 0x3F | 0x80);
        } else {
          bytes.push(c & 0xFF);
        }
      }

      return bytes;
    };

    exports.bytesToUtf8 = function (utf8Bytes) {
      var unicodeStr = "";

      for (var pos = 0; pos < utf8Bytes.length;) {
        var flag = utf8Bytes[pos];
        var unicode = 0;

        if (flag >>> 7 === 0) {
          unicodeStr += String.fromCharCode(utf8Bytes[pos]);
          pos += 1;
        } else if ((flag & 0xFC) === 0xFC) {
          unicode = (utf8Bytes[pos] & 0x3) << 30;
          unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24;
          unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18;
          unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12;
          unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6;
          unicode |= utf8Bytes[pos + 5] & 0x3F;
          unicodeStr += String.fromCharCode(unicode);
          pos += 6;
        } else if ((flag & 0xF8) === 0xF8) {
          unicode = (utf8Bytes[pos] & 0x7) << 24;
          unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18;
          unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12;
          unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6;
          unicode |= utf8Bytes[pos + 4] & 0x3F;
          unicodeStr += String.fromCharCode(unicode);
          pos += 5;
        } else if ((flag & 0xF0) === 0xF0) {
          unicode = (utf8Bytes[pos] & 0xF) << 18;
          unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12;
          unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6;
          unicode |= utf8Bytes[pos + 3] & 0x3F;
          unicodeStr += String.fromCharCode(unicode);
          pos += 4;
        } else if ((flag & 0xE0) === 0xE0) {
          unicode = (utf8Bytes[pos] & 0x1F) << 12;
          unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6;
          unicode |= utf8Bytes[pos + 2] & 0x3F;
          unicodeStr += String.fromCharCode(unicode);
          pos += 3;
        } else if ((flag & 0xC0) === 0xC0) {
          //110
          unicode = (utf8Bytes[pos] & 0x3F) << 6;
          unicode |= utf8Bytes[pos + 1] & 0x3F;
          unicodeStr += String.fromCharCode(unicode);
          pos += 2;
        } else {
          unicodeStr += String.fromCharCode(utf8Bytes[pos]);
          pos += 1;
        }
      }

      return unicodeStr;
    };

    exports.trim = function (str) {
      if (!str) return str;
      return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    /**
     * @desc: 对字符串中的 <>空格"& 标签进行转义为 &lt;, &gt;
     * @return: string.
     */


    exports.escapeHtml = function (str) {
      // 转义.
      if (str) {
        str = exports.replace(str, '&', '&amp;');
        str = exports.replace(str, '<', '&lt;');
        str = exports.replace(str, '>', '&gt;');
        str = exports.replace(str, ' ', '&nbsp;');
        str = exports.replace(str, '"', '&quot;');
      }

      return str || '';
    };
  });
  var string_1 = string.isPhoneMobile;
  var string_2 = string.isEmail;
  var string_3 = string.isAlphaOrDigit;
  var string_4 = string.isChinese;
  var string_5 = string.isEmpty;
  var string_6 = string.getByteSize;
  var string_7 = string.replace;
  var string_8 = string.utf8ToBytes;
  var string_9 = string.bytesToUtf8;
  var string_10 = string.trim;
  var string_11 = string.escapeHtml;

  /**
   * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
   * Author: lipengxiang
   * Desc:
   */

  /**
  * @desc: 判断是否是手机号码.
  * @return: boolean.
  */


  var isPhoneMobile = string.isPhoneMobile;
  /**
   * @desc: 是否为空串.
   * @return: boolean.
   */

  var isEmpty = string.isEmpty;
  /**
   * @desc: 判断是否是email.
   * @return: boolean.
   */

  var isEmail = string.isEmail;
  /**
   * @desc: 判断是否是英文数字组合.
   * @return: boolean.
   */

  var isAlphaOrDigit = string.isAlphaOrDigit;
  /**
   * @desc: 判断是否是中文.
   * @return: boolean.
   */

  var isChinese = string.isChinese;
  /**
   * @desc: 获得字符串utf8编码后的字节长度.
   * @return: u32.
   */

  var getByteSize = string.getByteSize;
  /**
   * @desc: 替换字符串中所有的strSrc->strDest.
   * @return: string.
   */

  var replace = string.replace;
  var utf8ToBytes = string.utf8ToBytes;
  var bytesToUtf8 = string.bytesToUtf8;
  var trim$1 = string.trim;
  /**
  * @desc: 对字符串中的 <> 标签进行转义为 &lt;, &gt;
  * @return: string.
  */

  var escapeHtml = string.escapeHtml;
  var string_1$1 = {
    isPhoneMobile: isPhoneMobile,
    isEmpty: isEmpty,
    isEmail: isEmail,
    isAlphaOrDigit: isAlphaOrDigit,
    isChinese: isChinese,
    getByteSize: getByteSize,
    replace: replace,
    utf8ToBytes: utf8ToBytes,
    bytesToUtf8: bytesToUtf8,
    trim: trim$1,
    escapeHtml: escapeHtml
  };

  /**
   * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
   * Author: lipengxiang
   * Desc:
   */

  var crc32_table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
  var crc32_table_1 = crc32_table;
  /**
  * @desc: base64编码.
  * @param arrByte: 字节数组.
  * @return: string.
  */

  var base64_encode = function base64_encode(arrByte) {
    if (!arrByte) {
      return '';
    }

    if (typeof arrByte === 'string') {
      arrByte = string.utf8ToBytes(arrByte);
    }

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

  var crypt = {
    crc32_table: crc32_table_1,
    base64_encode: base64_encode
  };

  /**
   * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
   * Author: lipengxiang
   * Desc:
   *  crc32(str, crc=null);
   *  crc32_file(file, function(crc32Value) {})
   */

  /**
   * @desc: 计算字符串的crc32值
   * @param crc: 可以在这个值得基础上继续计算
   * @return: number.
   */

  function crc32(
  /* String */
  str,
  /* Number */
  crc) {
    if (!crc) crc = 0;
    crc = crc ^ -1;

    for (var i = 0, iTop = str.length; i < iTop; i++) {
      crc = crc >>> 8 ^ crypt.crc32_table[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return crc ^ -1;
  }

  var crc32_1 = crc32;
  /**
   * @desc:
   * @param cb: cb(crc32)
   * @return:
   */

  function crc32_fileSegment(file, offset, length, cb) {
    if (!file || !cb) {
      if (cb) cb(0);
      return;
    }

    if (offset >= file.size || offset < 0 || length == 0) {
      if (cb) cb(0);
      return;
    }

    if (length < 0) {
      length = file.size;
    }

    var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
    var fileReader = new FileReader();

    if (file.size - offset < length) {
      length = file.size - offset;
    }

    var chunkSize = 1024 * 1024 * 2;
    var chunks = Math.ceil(length / chunkSize);
    var currentChunk = 0;

    var loadNext = function loadNext() {
      var start = currentChunk * chunkSize + offset,
          end = start + chunkSize >= length + offset ? length + offset : start + chunkSize;
      fileReader.readAsBinaryString(blobSlice.call(file, start, end));
    };

    var crc = 0; //每块文件读取完毕之后的处理.

    fileReader.onload = function (e) {
      crc = crc32(e.target.result, crc); // append binary string

      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        cb(crc);
      }
    };

    loadNext();
  }

  var crc32_fileSegment_1 = crc32_fileSegment;
  /**
   * @desc:
   * @param cb: cb(crc32)
   * @return:
   */

  var crc32_file = function crc32_file(file, cb) {
    crc32_fileSegment(file, 0, file.size, cb);
  };
  /**
  * @desc: base64编码.
  * @param arrByte: 字节数组.
  * @return: string.
  */


  var base64_encode$1 = crypt.base64_encode;
  /**
  * @desc: base64解码.
  * @return: 字节数组.
  */

  var base64_decode = function base64_decode(strBase64) {
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
  /**
  * @desc: 生成一个uuid (v4 random).
  * @return: 
  */


  var uuid = function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";

    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }

    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010

    s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  };

  var crypt_1 = {
    crc32: crc32_1,
    crc32_fileSegment: crc32_fileSegment_1,
    crc32_file: crc32_file,
    base64_encode: base64_encode$1,
    base64_decode: base64_decode,
    uuid: uuid
  };

  var crypt$1 = createCommonjsModule(function (module) {
    (function () {
      var base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          crypt = {
        // Bit-wise rotation left
        rotl: function rotl(n, b) {
          return n << b | n >>> 32 - b;
        },
        // Bit-wise rotation right
        rotr: function rotr(n, b) {
          return n << 32 - b | n >>> b;
        },
        // Swap big-endian to little-endian and vice versa
        endian: function endian(n) {
          // If number given, swap endian
          if (n.constructor == Number) {
            return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
          } // Else, assume array and swap all items


          for (var i = 0; i < n.length; i++) {
            n[i] = crypt.endian(n[i]);
          }

          return n;
        },
        // Generate an array of any length of random bytes
        randomBytes: function randomBytes(n) {
          for (var bytes = []; n > 0; n--) {
            bytes.push(Math.floor(Math.random() * 256));
          }

          return bytes;
        },
        // Convert a byte array to big-endian 32-bit words
        bytesToWords: function bytesToWords(bytes) {
          for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
            words[b >>> 5] |= bytes[i] << 24 - b % 32;
          }

          return words;
        },
        // Convert big-endian 32-bit words to a byte array
        wordsToBytes: function wordsToBytes(words) {
          for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
            bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
          }

          return bytes;
        },
        // Convert a byte array to a hex string
        bytesToHex: function bytesToHex(bytes) {
          for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
          }

          return hex.join('');
        },
        // Convert a hex string to a byte array
        hexToBytes: function hexToBytes(hex) {
          for (var bytes = [], c = 0; c < hex.length; c += 2) {
            bytes.push(parseInt(hex.substr(c, 2), 16));
          }

          return bytes;
        },
        // Convert a byte array to a base-64 string
        bytesToBase64: function bytesToBase64(bytes) {
          for (var base64 = [], i = 0; i < bytes.length; i += 3) {
            var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];

            for (var j = 0; j < 4; j++) {
              if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
            }
          }

          return base64.join('');
        },
        // Convert a base-64 string to a byte array
        base64ToBytes: function base64ToBytes(base64) {
          // Remove non-base-64 characters
          base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

          for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
            if (imod4 == 0) continue;
            bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
          }

          return bytes;
        }
      };
      module.exports = crypt;
    })();
  });

  var charenc = {
    // UTF-8 encoding
    utf8: {
      // Convert a string to a byte array
      stringToBytes: function stringToBytes(str) {
        return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
      },
      // Convert a byte array to a string
      bytesToString: function bytesToString(bytes) {
        return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
      }
    },
    // Binary encoding
    bin: {
      // Convert a string to a byte array
      stringToBytes: function stringToBytes(str) {
        for (var bytes = [], i = 0; i < str.length; i++) {
          bytes.push(str.charCodeAt(i) & 0xFF);
        }

        return bytes;
      },
      // Convert a byte array to a string
      bytesToString: function bytesToString(bytes) {
        for (var str = [], i = 0; i < bytes.length; i++) {
          str.push(String.fromCharCode(bytes[i]));
        }

        return str.join('');
      }
    }
  };
  var charenc_1 = charenc;

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  var isBuffer_1 = function isBuffer_1(obj) {
    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
  };

  function isBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
  } // For Node v0.10 support. Remove this eventually.


  function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
  }

  var md5 = createCommonjsModule(function (module) {
    (function () {
      var crypt = crypt$1,
          utf8 = charenc_1.utf8,
          isBuffer = isBuffer_1,
          bin = charenc_1.bin,
          // The core
      md5 = function md5(message, options) {
        // Convert to byte array
        if (message.constructor == String) {
          if (options && options.encoding === 'binary') message = bin.stringToBytes(message);else message = utf8.stringToBytes(message);
        } else if (isBuffer(message)) message = Array.prototype.slice.call(message, 0);else if (!Array.isArray(message)) message = message.toString(); // else, assume byte array already

        var m = crypt.bytesToWords(message),
            l = message.length * 8,
            a = 1732584193,
            b = -271733879,
            c = -1732584194,
            d = 271733878; // Swap endian

        for (var i = 0; i < m.length; i++) {
          m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF | (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
        } // Padding


        m[l >>> 5] |= 0x80 << l % 32;
        m[(l + 64 >>> 9 << 4) + 14] = l; // Method shortcuts

        var FF = md5._ff,
            GG = md5._gg,
            HH = md5._hh,
            II = md5._ii;

        for (var i = 0; i < m.length; i += 16) {
          var aa = a,
              bb = b,
              cc = c,
              dd = d;
          a = FF(a, b, c, d, m[i + 0], 7, -680876936);
          d = FF(d, a, b, c, m[i + 1], 12, -389564586);
          c = FF(c, d, a, b, m[i + 2], 17, 606105819);
          b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
          a = FF(a, b, c, d, m[i + 4], 7, -176418897);
          d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
          c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
          b = FF(b, c, d, a, m[i + 7], 22, -45705983);
          a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
          d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
          c = FF(c, d, a, b, m[i + 10], 17, -42063);
          b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
          a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
          d = FF(d, a, b, c, m[i + 13], 12, -40341101);
          c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
          b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
          a = GG(a, b, c, d, m[i + 1], 5, -165796510);
          d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
          c = GG(c, d, a, b, m[i + 11], 14, 643717713);
          b = GG(b, c, d, a, m[i + 0], 20, -373897302);
          a = GG(a, b, c, d, m[i + 5], 5, -701558691);
          d = GG(d, a, b, c, m[i + 10], 9, 38016083);
          c = GG(c, d, a, b, m[i + 15], 14, -660478335);
          b = GG(b, c, d, a, m[i + 4], 20, -405537848);
          a = GG(a, b, c, d, m[i + 9], 5, 568446438);
          d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
          c = GG(c, d, a, b, m[i + 3], 14, -187363961);
          b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
          a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
          d = GG(d, a, b, c, m[i + 2], 9, -51403784);
          c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
          b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
          a = HH(a, b, c, d, m[i + 5], 4, -378558);
          d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
          c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
          b = HH(b, c, d, a, m[i + 14], 23, -35309556);
          a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
          d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
          c = HH(c, d, a, b, m[i + 7], 16, -155497632);
          b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
          a = HH(a, b, c, d, m[i + 13], 4, 681279174);
          d = HH(d, a, b, c, m[i + 0], 11, -358537222);
          c = HH(c, d, a, b, m[i + 3], 16, -722521979);
          b = HH(b, c, d, a, m[i + 6], 23, 76029189);
          a = HH(a, b, c, d, m[i + 9], 4, -640364487);
          d = HH(d, a, b, c, m[i + 12], 11, -421815835);
          c = HH(c, d, a, b, m[i + 15], 16, 530742520);
          b = HH(b, c, d, a, m[i + 2], 23, -995338651);
          a = II(a, b, c, d, m[i + 0], 6, -198630844);
          d = II(d, a, b, c, m[i + 7], 10, 1126891415);
          c = II(c, d, a, b, m[i + 14], 15, -1416354905);
          b = II(b, c, d, a, m[i + 5], 21, -57434055);
          a = II(a, b, c, d, m[i + 12], 6, 1700485571);
          d = II(d, a, b, c, m[i + 3], 10, -1894986606);
          c = II(c, d, a, b, m[i + 10], 15, -1051523);
          b = II(b, c, d, a, m[i + 1], 21, -2054922799);
          a = II(a, b, c, d, m[i + 8], 6, 1873313359);
          d = II(d, a, b, c, m[i + 15], 10, -30611744);
          c = II(c, d, a, b, m[i + 6], 15, -1560198380);
          b = II(b, c, d, a, m[i + 13], 21, 1309151649);
          a = II(a, b, c, d, m[i + 4], 6, -145523070);
          d = II(d, a, b, c, m[i + 11], 10, -1120210379);
          c = II(c, d, a, b, m[i + 2], 15, 718787259);
          b = II(b, c, d, a, m[i + 9], 21, -343485551);
          a = a + aa >>> 0;
          b = b + bb >>> 0;
          c = c + cc >>> 0;
          d = d + dd >>> 0;
        }

        return crypt.endian([a, b, c, d]);
      }; // Auxiliary functions


      md5._ff = function (a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };

      md5._gg = function (a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };

      md5._hh = function (a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };

      md5._ii = function (a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      }; // Package private blocksize


      md5._blocksize = 16;
      md5._digestsize = 16;

      module.exports = function (message, options) {
        if (message === undefined || message === null) throw new Error('Illegal argument ' + message);
        var digestbytes = crypt.wordsToBytes(md5(message, options));
        return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
      };
    })();
  });

  /**
   * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
   * Author: lipengxiang
   * Desc:
   *  crc32(str, crc=null);
   *  crc32_file(file, function(crc32Value) {})
   */

  var md5_1 = md5;
  var crypt_md5 = {
    md5: md5_1
  };

  var sha1 = createCommonjsModule(function (module) {
    (function () {
      var crypt = crypt$1,
          utf8 = charenc_1.utf8,
          bin = charenc_1.bin,
          // The core
      sha1 = function sha1(message) {
        // Convert to byte array
        if (message.constructor == String) message = utf8.stringToBytes(message);else if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(message)) message = Array.prototype.slice.call(message, 0);else if (!Array.isArray(message)) message = message.toString(); // otherwise assume byte array

        var m = crypt.bytesToWords(message),
            l = message.length * 8,
            w = [],
            H0 = 1732584193,
            H1 = -271733879,
            H2 = -1732584194,
            H3 = 271733878,
            H4 = -1009589776; // Padding

        m[l >> 5] |= 0x80 << 24 - l % 32;
        m[(l + 64 >>> 9 << 4) + 15] = l;

        for (var i = 0; i < m.length; i += 16) {
          var a = H0,
              b = H1,
              c = H2,
              d = H3,
              e = H4;

          for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = m[i + j];else {
              var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
              w[j] = n << 1 | n >>> 31;
            }
            var t = (H0 << 5 | H0 >>> 27) + H4 + (w[j] >>> 0) + (j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 : j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 : j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 : (H1 ^ H2 ^ H3) - 899497514);
            H4 = H3;
            H3 = H2;
            H2 = H1 << 30 | H1 >>> 2;
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
      api = function api(message, options) {
        var digestbytes = crypt.wordsToBytes(sha1(message));
        return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
      };

      api._blocksize = 16;
      api._digestsize = 20;
      module.exports = api;
    })();
  });

  /**
   * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
   * Author: lipengxiang
   * Desc:
   *  crc32(str, crc=null);
   *  crc32_file(file, function(crc32Value) {})
   */

  var sha1_1 = sha1;
  var crypt_sha1 = {
    sha1: sha1_1
  };

  var utils_bigint = createCommonjsModule(function (module, exports) {
    /**
     * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
     * Author: lipengxiang
     * Desc:
     */
    // var BigNumber = require('../third-party/bignumber.min.js');

    /**
     * @desc: 进行bigint转换.
     */

    exports.bigint = function (v) {
      if (exports.bigint_check(v)) {
        if (typeof v === 'string') {
          if (v.length >= 15) // 对千亿以上的数值使用bignumber.
            return new bignumber(v);
          return Number(v);
        } else {
          return v;
        }
      } else {
        return Number.NaN;
      }
    };
    /**
     * @desc: 判断是否是bigint.
     */


    exports.bigint_check = function (v) {
      if (Number.isInteger(v)) return true;
      if (!v) return false;

      var typev = _typeof(v);

      if (typev === 'string') {
        if (v.length > 22 || v.length < 1) return false;

        for (var j = 1; j < v.length; j++) {
          if (v[j] < '0' || v[j] > '9') return false;
        }

        if (v.length == 1) {
          if (v[0] < '0' || v[0] > '9') return false;else return true;
        }

        if (v[0] == '-') {
          if (v.length < 2 || v[1] < '1' || v[1] > '9') return false;
        } else {
          if (v[0] < '1' || v[0] > '9') return false;
        }

        return true;
      } else if (typev === 'object') {
        return !!v.isBigNumber;
      } else {
        return false;
      }
    };
    /**
    * @desc: calc bigint
    * @return: bigint.
    */


    exports.bigint_add = function (a, b) {
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.plus(b);
    };

    exports.bigint_minus = function (a, b) {
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.minus(b);
    };

    exports.bigint_dividedBy = function (a, b) {
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.dividedBy(b);
    };

    exports.bigint_mul = function (a, b) {
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.times(b);
    };
    /**
    * @desc: compare with bigint.
    * @return: boolean.
    */


    exports.bigint_equal = function (a, b) {
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.equals(b);
    };

    exports.bigint_more_than = function (a, b) {
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.greaterThan(b);
    };

    exports.bigint_more_than_e = function (a, b) {
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.greaterThanOrEqualTo(b);
    };

    exports.bigint_less_than = function (a, b) {
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.lessThan(b);
    };

    exports.bigint_less_than_e = function (a, b) {
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.lessThanOrEqualTo(b);
    };

    exports.bigint_mod = function (a, b) {
      if (Number.isInteger(a)) {
        if (Number.isInteger(b)) return a % b;else {
          return new bignumber(a).mod(b);
        }
      }

      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.mod(b);
    };
    /**
    * @desc: 转换bigint->string.
    * @param fixed: 小数位个数, 默认为0.
    * @return: string.
    */


    exports.bigint_toFixed = function (a, fixed) {
      fixed = fixed || 0;
      if (!(a instanceof bignumber)) a = new bignumber(a);
      return a.toFixed(fixed);
    };
  });
  var utils_bigint_1 = utils_bigint.bigint;
  var utils_bigint_2 = utils_bigint.bigint_check;
  var utils_bigint_3 = utils_bigint.bigint_add;
  var utils_bigint_4 = utils_bigint.bigint_minus;
  var utils_bigint_5 = utils_bigint.bigint_dividedBy;
  var utils_bigint_6 = utils_bigint.bigint_mul;
  var utils_bigint_7 = utils_bigint.bigint_equal;
  var utils_bigint_8 = utils_bigint.bigint_more_than;
  var utils_bigint_9 = utils_bigint.bigint_more_than_e;
  var utils_bigint_10 = utils_bigint.bigint_less_than;
  var utils_bigint_11 = utils_bigint.bigint_less_than_e;
  var utils_bigint_12 = utils_bigint.bigint_mod;
  var utils_bigint_13 = utils_bigint.bigint_toFixed;

  /**
   * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
   * Author: lipengxiang
   * Desc:
   */
  var DefaultTimeout = 5000;

  var transfer = function transfer(window) {
    var xhr;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest();else if (window.XDomainRequest) xhr = new XDomainRequest();else {
      var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP");

      for (var i = 0; i < XmlHttpVersions.length && !xmlHttp; i++) {
        try {
          xhr = new ActiveXObject(XmlHttpVersions[i]);
        } catch (e) {}
      }
    }
    return xhr;
  };

  var net_transfer = {
    DefaultTimeout: DefaultTimeout,
    transfer: transfer
  };

  var Ajaxmark = '_FeBs_ajaxmark';
  var net = {}; //--------------------------------------------------------
  // ajax
  //--------------------------------------------------------

  /**
   * @desc: ajax 跳转. 允许添加 progress: function(percent) 选项.
   * @return:
   */

  function ajax(ctx) {
    //if (!!window.ActiveXObject || "ActiveXObject" in window) // ie11.
    {
      if (ctx.url) {
        if (!window[Ajaxmark]) window[Ajaxmark] = 1;
        var i = ctx.url.indexOf('?');

        if (i < 0) {
          ctx.url += "?ajaxmark=" + window[Ajaxmark];
        } else {
          if (i == ctx.url.length - 1) {
            ctx.url += "ajaxmark=" + window[Ajaxmark];
          } else {
            ctx.url += "&ajaxmark=" + window[Ajaxmark];
          }
        }
      }

      window[Ajaxmark]++;
    } // if.

    var cbError = ctx.error || function () {};

    var cbSuccess = ctx.success || function () {};

    var cbComplete = ctx.complete || function () {};

    ctx.processData = ctx.hasOwnProperty('processData') ? ctx.processData : true; //
    // net transfer.

    var xhr = net_transfer.transfer(window); // xhr.onload = function() {
    //   var status = (xhr.status === 1223) ? 204 : xhr.status
    //   if (status < 100 || status > 599) {
    //     reject(new TypeError('Network request failed'))
    //     return
    //   }
    //   var options = {
    //     status: status,
    //     statusText: xhr.statusText,
    //     headers: febsnet.headers(xhr),
    //     url: responseURL()
    //   }
    //   var body = 'response' in xhr ? xhr.response : xhr.responseText;
    //   resolve(new febsnet.Response(body, options))
    // }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var status = xhr.status === 1223 ? 204 : xhr.status;

        if (status < 100 || status > 599) {
          cbError(xhr, xhr.statusText, new TypeError('Network request failed'));
          cbError = null;
          return;
        }

        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        if (status == 200) cbSuccess(body, xhr.statusText, xhr);
        cbComplete(xhr, xhr.statusText);
      }
    };

    xhr.ontimeout = function () {
      if (cbError) cbError(xhr, null, 'timeout');
    };

    xhr.onerror = function () {
      if (cbError) cbError(xhr, null, new TypeError('Network request failed'));
    };

    if (ctx.progress) {
      if ('upload' in xhr && 'onprogress' in xhr.upload) {
        xhr.upload.onprogress = function (event) {
          if (event.lengthComputable) {
            ctx.progress(event.loaded / event.total);
          }
        };
      } else {
        console.log('The browser not support progress event');
      }
    }

    xhr.open(ctx.type, ctx.url, ctx.async === false ? false : true);
    var timeout = (ctx.async === false ? false : true) ? ctx.timeout : 0;
    xhr.timeout = timeout !== undefined && timeout !== null ? timeout : net_transfer.DefaultTimeout;

    if (ctx.hasOwnProperty('withCredentials')) {
      xhr.withCredentials = ctx.withCredentials;
    } else {
      xhr.withCredentials = true;
    }

    if (ctx.headers) {
      if (xhr.setRequestHeader) {
        for (var key in ctx.headers) {
          var element = ctx.headers[key];

          if (key == 'Content-Type' && element === false) {
            continue;
          }

          xhr.setRequestHeader(key, element);
        }
      } else {
        console.log('ajax can\'t set headers');
      }
    }

    if (!ctx.headers || !ctx.headers.hasOwnProperty('Content-Type')) {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    } // auto content-type.


    var data_content = ctx.data;

    if (data_content) {
      if (ctx.processData && typeof data_content !== 'string') {
        try {
          if (ctx.headers && ctx.headers['Content-Type'] && ctx.headers['Content-Type'].toLowerCase().indexOf('json') >= 0) {
            data_content = JSON.stringify(data_content);
          } else {
            var data_tt = '';

            for (var key in data_content) {
              var element = data_content[key];
              if (data_tt.length > 0) data_tt += '&';
              data_tt += key + '=' + (element ? element.toString() : '');
            }

            data_content = data_tt;
          }
        } catch (e) {
          console.log('ajax stringify data error');
          console.log(e);
        }
      }
    }

    if (ctx.beforeSend) {
      ctx.beforeSend(xhr);
    }

    xhr.send(data_content);
    return {
      abort: function abort() {
        xhr.abort();
      }
    };
  }

  net.ajax = ajax;
  var net_ajax = net;

  var febsnet = {};
  var net$1 = {}; //--------------------------------------------------------
  // fetch.
  //--------------------------------------------------------

  {
    if (!Promise) {
      throw new Error('unsupported Promise');
    } // https://github.com/github/fetch


    febsnet.normalizeName = function (name) {
      if (typeof name !== 'string') {
        name = String(name);
      }

      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }

      return name.toLowerCase();
    };

    febsnet.normalizeValue = function (value) {
      if (typeof value !== 'string') {
        value = String(value);
      }

      return value;
    };

    febsnet.Headers = function (headers) {
      this.map = {};

      if (headers instanceof febsnet.Headers) {
        headers.forEach(function (value, name) {
          this.append(name, value);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function (name) {
          this.append(name, headers[name]);
        }, this);
      }
    };

    febsnet.Headers.prototype.append = function (name, value) {
      name = febsnet.normalizeName(name);
      value = febsnet.normalizeValue(value);
      var list = this.map[name];

      if (!list) {
        list = [];
        this.map[name] = list;
      }

      list.push(value);
    };

    febsnet.Headers.prototype['delete'] = function (name) {
      delete this.map[febsnet.normalizeName(name)];
    };

    febsnet.Headers.prototype.get = function (name) {
      var values = this.map[febsnet.normalizeName(name)];
      return values ? values[0] : null;
    };

    febsnet.Headers.prototype.getAll = function (name) {
      return this.map[febsnet.normalizeName(name)] || [];
    };

    febsnet.Headers.prototype.has = function (name) {
      return this.map.hasOwnProperty(febsnet.normalizeName(name));
    };

    febsnet.Headers.prototype.set = function (name, value) {
      this.map[febsnet.normalizeName(name)] = [febsnet.normalizeValue(value)];
    };

    febsnet.Headers.prototype.forEach = function (callback, thisArg) {
      Object.getOwnPropertyNames(this.map).forEach(function (name) {
        this.map[name].forEach(function (value) {
          callback.call(thisArg, value, name, this);
        }, this);
      }, this);
    };

    febsnet.consumed = function (body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
      }

      body.bodyUsed = true;
    };

    febsnet.fileReaderReady = function (reader) {
      return new Promise(function (resolve, reject) {
        reader.onload = function () {
          resolve(reader.result);
        };

        reader.onerror = function () {
          reject(reader.error);
        };
      });
    };

    febsnet.readBlobAsArrayBuffer = function (blob) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      return febsnet.fileReaderReady(reader);
    };

    febsnet.readBlobAsText = function (blob) {
      var reader = new FileReader();
      reader.readAsText(blob);
      return febsnet.fileReaderReady(reader);
    };

    febsnet.support = {
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

    febsnet.Body = function () {
      this.bodyUsed = false;

      this._initBody = function (body) {
        this._bodyInit = body;

        if (typeof body === 'string') {
          this._bodyText = body;
        } else if (febsnet.support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (febsnet.support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (!body) {
          this._bodyText = '';
        } else if (febsnet.support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) ; else {
          throw new Error('unsupported BodyInit type');
        }
      };

      if (febsnet.support.blob) {
        this.blob = function () {
          var rejected = febsnet.consumed(this);

          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return Promise.resolve(new Blob([this._bodyText]));
          }
        };

        this.arrayBuffer = function () {
          return this.blob().then(febsnet.readBlobAsArrayBuffer);
        };

        this.text = function () {
          var rejected = febsnet.consumed(this);

          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return febsnet.readBlobAsText(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text');
          } else {
            return Promise.resolve(this._bodyText);
          }
        };
      } else {
        this.text = function () {
          var rejected = febsnet.consumed(this);
          return rejected ? rejected : Promise.resolve(this._bodyText);
        };
      }

      if (febsnet.support.formData) {
        this.formData = function () {
          return this.text().then(febsnet.decode);
        };
      }

      this.json = function () {
        return this.text().then(JSON.parse);
      };

      return this;
    }; // HTTP methods whose capitalization should be normalized


    febsnet.normalizeMethod = function (method) {
      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    };

    febsnet.Request = function (input, options) {
      options = options || {};
      var body = options.body;

      if (febsnet.Request.prototype.isPrototypeOf(input)) {
        if (input.bodyUsed) {
          throw new TypeError('Already read');
        }

        this.url = input.url;
        this.credentials = input.credentials;

        if (!options.headers) {
          this.headers = new febsnet.Headers(input.headers);
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
        this.headers = new febsnet.Headers(options.headers);
      }

      this.method = febsnet.normalizeMethod(options.method || this.method || 'GET');
      this.mode = options.mode || this.mode || null;
      this.referrer = null; // if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      //   throw new TypeError('febsnet.Body not allowed for GET or HEAD requests')
      // }

      this._initBody(body);
    };

    febsnet.Request.prototype.clone = function () {
      return new febsnet.Request(this);
    };

    febsnet.decode = function (body) {
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

    febsnet.headers = function (xhr) {
      var head = new febsnet.Headers();
      var pairs = xhr.getAllResponseHeaders().trim().split('\n');
      pairs.forEach(function (header) {
        var split = header.trim().split(':');
        var key = split.shift().trim();
        var value = split.join(':').trim();
        head.append(key, value);
      });
      return head;
    };

    febsnet.Body.call(febsnet.Request.prototype);

    febsnet.Response = function (bodyInit, options) {
      if (!options) {
        options = {};
      }

      this._initBody(bodyInit);

      this.type = 'default';
      this.status = options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = options.statusText;
      this.headers = options.headers instanceof febsnet.Headers ? options.headers : new febsnet.Headers(options.headers);
      this.url = options.url || '';
    };

    febsnet.Body.call(febsnet.Response.prototype);

    febsnet.Response.prototype.clone = function () {
      return new febsnet.Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new febsnet.Headers(this.headers),
        url: this.url
      });
    };

    febsnet.Response.error = function () {
      var response = new febsnet.Response(null, {
        status: 0,
        statusText: ''
      });
      response.type = 'error';
      return response;
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    febsnet.Response.redirect = function (url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code');
      }

      return new febsnet.Response(null, {
        status: status,
        headers: {
          location: url
        }
      });
    };

    window.Headers = febsnet.Headers;
    window.Request = febsnet.Request;
    window.Response = febsnet.Response;

    window.fetch = febsnet.fetch = function (input, init) {
      // other.
      return new Promise(function (resolve, reject) {
        var request;

        if (febsnet.Request.prototype.isPrototypeOf(input) && !init) {
          request = input;
        } else {
          request = new febsnet.Request(input, init);
        }

        var xhr = net_transfer.transfer(window);

        function responseURL() {
          if ('responseURL' in xhr) {
            return xhr.responseURL;
          } // Avoid security warnings on getResponseHeader when not allowed by CORS


          if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
          }

          return;
        } // xhr.onload = function() {
        //   var status = (xhr.status === 1223) ? 204 : xhr.status
        //   if (status < 100 || status > 599) {
        //     reject(new TypeError('Network request failed'))
        //     return
        //   }
        //   var options = {
        //     status: status,
        //     statusText: xhr.statusText,
        //     headers: febsnet.headers(xhr),
        //     url: responseURL()
        //   }
        //   var body = 'response' in xhr ? xhr.response : xhr.responseText;
        //   resolve(new febsnet.Response(body, options))
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
              headers: febsnet.headers(xhr),
              url: responseURL()
            };
            var body = 'response' in xhr ? xhr.response : xhr.responseText;
            resolve(new febsnet.Response(body, options));
          }
        };

        xhr.ontimeout = function () {
          reject('timeout');
        };

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        if (init.progress) {
          xhr.onprogress = function (event) {
            if (event.lengthComputable) {
              init.progress(event.position / event.totalSize);
            }
          };
        }

        xhr.open(request.method, request.url, true);
        var timeout = init ? init.timeout : null;
        xhr.timeout = timeout !== undefined && timeout !== null ? timeout : net_transfer.DefaultTimeout;

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        } else {
          xhr.withCredentials = false;
        }

        if ('responseType' in xhr && febsnet.support.blob) {
          xhr.responseType = 'blob';
        }

        if (xhr.setRequestHeader) {
          request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
          });
        } else if (request.headers && request.headers.map.length > 0) {
          console.log('fetch can\'t set headers');
        }

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    };

    febsnet.fetch.polyfill = true;
    net$1.fetch = febsnet.fetch;
  } // if..else.


  var net_fetch = net$1;

  var DefaultTimeout$1 = 5000;
  var febsnet$1 = {};
  var net$2 = {}; //--------------------------------------------------------
  // jsonp
  //--------------------------------------------------------
  // From https://github.com/camsong/fetch-jsonp

  febsnet$1.jsonp_defaultOptions = {
    timeout: DefaultTimeout$1,
    jsonpCallback: 'callback'
  };

  febsnet$1.jsonp_generateCallbackFunction = function () {
    return 'jsonp_' + Date.now().toString() + '_' + Math.ceil(Math.random() * 100000);
  }; // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout


  febsnet$1.jsonp_clearFunction = function (functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {}
  };

  febsnet$1.jsonp_removeScript = function (scriptId) {
    var script = document.getElementById(scriptId);
    document.getElementsByTagName("head")[0].removeChild(script);
  };

  febsnet$1.jsonp = function (url, options) {
    options = options || {};
    var timeout = options.timeout != null ? options.timeout : febsnet$1.jsonp_defaultOptions.timeout;
    var jsonpCallback = !!options.jsonpCallback ? options.jsonpCallback : febsnet$1.jsonp_defaultOptions.jsonpCallback;
    var timeoutId;
    return new Promise(function (resolve, reject) {
      var callbackFunction = febsnet$1.jsonp_generateCallbackFunction();

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });
        if (timeoutId) clearTimeout(timeoutId);
        febsnet$1.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);
        febsnet$1.jsonp_clearFunction(callbackFunction);
      }; // Check if the user set their own params, and if not add a ? to start a list of params


      url += url.indexOf('?') === -1 ? '?' : '&';
      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute("src", url + jsonpCallback + '=' + callbackFunction);
      jsonpScript.id = jsonpCallback + '_' + callbackFunction;
      document.getElementsByTagName("head")[0].appendChild(jsonpScript);
      timeoutId = setTimeout(function () {
        reject('timeout');
        febsnet$1.jsonp_clearFunction(callbackFunction);
        febsnet$1.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);
      }, timeout);
    });
  };

  net$2.jsonp = febsnet$1.jsonp;
  var net_jsonp = net$2;

  var net$3 = {
    ajax: net_ajax.ajax,
    fetch: net_fetch.fetch,
    jsonp: net_jsonp.jsonp
  };
  var net_1 = net$3;

  // - name 子节点selector.
  // - notAllChildren 仅查询一层子节点.
  // 返回匹配到的元素集合.

  function _matchElement(parentNodes, name, notAllChildren) {
    var elems;
    var tag = 0; // 0-tag, 1-id, 2-class.

    var nameattr, nameattrVal; // :checked, :disabled

    var selector = name.split(':');
    name = selector[0];
    name = string_1$1.trim(name);
    selector = selector[1];

    if (selector) {
      if (selector != 'checked' && selector != 'disabled') {
        throw new Error('only support `:checked or :disabled` selector');
      }
    } // attri.


    if (name.indexOf('[') > 0) {
      var iblace = name.indexOf('[');
      nameattr = name.substring(iblace + 1, name.length - 1);
      nameattr = nameattr.split('=');

      if (nameattr.length != 2) {
        throw new Error('Syntax error, unrecognized expression: ' + name);
      }

      nameattrVal = nameattr[1];
      if (nameattrVal.indexOf('\'') >= 0 || nameattrVal.indexOf('"') >= 0) nameattrVal = nameattrVal.substring(1, nameattrVal.length - 1);
      nameattr = nameattr[0];
      name = name.substr(0, iblace);
    }

    if (name[0] == '.') {
      tag = 2;
      name = name.substr(1);
    } else if (name[0] == '#') {
      tag = 1;
      name = name.substr(1);
    }

    if (!parentNodes || parentNodes.length == 0) {
      if (2 == tag) {
        elems = window.document.getElementsByClassName(name);
      } else if (1 == tag) {
        elems = window.document.getElementById(name);
        if (elems) elems = [elems];else elems = [];
      } else if (0 == tag) {
        elems = window.document.getElementsByTagName(name);
      } // attrvalue.


      if (nameattr) {
        var tt_elems = elems;
        elems = [];

        for (var i = 0; i < tt_elems.length; i++) {
          if (tt_elems[i].getAttribute(nameattr) === nameattrVal) {
            elems.push(tt_elems[i]);
          }
        }
      } // if.


      if (selector) {
        var tt_elems = elems;
        elems = [];

        for (var i = 0; i < tt_elems.length; i++) {
          if (selector == 'disabled') {
            if (tt_elems[i].disabled) {
              elems.push(tt_elems[i]);
            }
          } else if (selector == 'checked') {
            if (tt_elems[i].checked) {
              elems.push(tt_elems[i]);
            }
          }
        }
      } // if.

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
          var add = true;

          if (selector) {
            if (selector == 'disabled') {
              if (!node[j].disabled) {
                add = false;
              }
            } else if (selector == 'checked') {
              if (!node[j].checked) {
                add = false;
              }
            }
          } // if.
          // attrvalue.


          if (add && nameattr) {
            if (node[j].getAttribute(nameattr) !== nameattrVal) {
              add = false;
            }
          }

          if (add) {
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
            } else if (0 == tag) {
              if (node[j].nodeName.toUpperCase() == name.toUpperCase()) {
                elems.push(node[j]);
                continue;
              }
            }
          } // if.


          if (!notAllChildren) {
            var nn = node[j].childNodes;

            if (nn && nn.length > 0) {
              for (var k = 0; k < nn.length; k++) {
                node.push(nn[k]);
              }

              if (j > 20) {
                node = node.slice(j + 1);
                j = -1;
              }
            }
          }
        } // for.

      } // for.

    } // if..else.


    return elems;
  } // - parentNode 仅筛选此节点下的节点.


  function _getElement(name, parentNode) {
    if (name === '') name = null;

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

    return {
      _elem: _elem,
      _isarr: _isarr
    };
  }
  /**
   * hasClass
   */


  function _hasClass(element, cName) {
    if (!element || !element.className || typeof element.className.match !== 'function') return false;
    return !!element.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断  
  }
  /**
   * addClass
   */


  function _addClass(element, cName) {
    if (!element) return;

    if (typeof element.className === 'string') {
      if (!_hasClass(element, cName)) {
        if (string_1$1.isEmpty(element.className)) element.className += cName;else element.className += " " + cName;
      }
    }
  }
  /**
   * removeClass
   */


  function _removeClass(element, cName) {
    if (!element) return;

    if (typeof element.className === 'string') {
      if (_hasClass(element, cName)) {
        element.className = element.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换 
        // trim.

        element.className = string_1$1.trim(element.className);
      }
    }
  }
  /**
   * removeElement
   */


  function _removeElement(element) {
    if (element) {
      var _parentElement = element.parentNode;

      if (_parentElement) {
        _parentElement.removeChild(element);
      }
    }
  }
  /**
   * appendChild
   */


  function _appendChild(element, node) {
    if (element) {
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

  function _prependChild(element, node) {
    if (!element) return;

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

  function _isHtmlElement(obj) {
    var d = document.createElement("div");

    try {
      d.appendChild(obj.cloneNode(true));
      return obj.nodeType == 1 ? true : false;
    } catch (e) {
      return obj == window || obj == document;
    }
  }

  var CreateDom;
  /**
   * @desc 类jquery dom操作.
   */

  var Dom = /*#__PURE__*/function () {
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
        if (_isHtmlElement(name)) {
          this._elem = name;
          this._isArr = false;
        } else {
          this._elem = _getElement(name);
          this._isArr = this._elem._isarr;
          this._elem = this._elem._elem;
        }
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
            if (window.addEventListener) window.document.addEventListener('DOMContentLoaded', f);else window.document.attachEvent('onload', f);
          } else {
            _this.trigger('ready');
          }

          return _this;
        };

        this.unload = function (f) {
          if (f) {
            if (window.addEventListener) window.document.addEventListener('unload', f);else window.document.attachEvent('onunload', f);
          } else {
            _this.trigger('unload');
          }

          return _this;
        };

        this.context = window.document;
      } else if (name === window) {
        this.unload = function (f) {
          if (f) {
            if (window.addEventListener) window.addEventListener('unload', f);else window.attachEvent('onunload', f);
          } else {
            _this.trigger('unload');
          }

          return _this;
        };
      } else {
        this.context = window.document;
      }

      if (typeof name === 'function') {
        var foo = function foo(e) {
          name.bind(_this)(e);
          if (window.addEventListener) window.document.removeEventListener('DOMContentLoaded', foo);else window.document.detachEvent('onload', foo);
        };

        if (window.addEventListener) window.document.addEventListener('DOMContentLoaded', foo);else window.document.attachEvent('onload', foo);
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
        } else {
          this._domtify(this._elem);
        }
      } // plugin.


      for (var key in CreateDom.fn) {
        if (key == 'extend' || key == 'fn') continue;

        if (typeof CreateDom.fn[key] === 'function') {
          this[key] = CreateDom.fn[key].bind(this);
        }
      }

      this.__domtify = true;
    }

    _createClass(Dom, [{
      key: "get",
      value: function get(index) {
        if (!this._elem) return null;else {
          if (this._isArray()) {
            return this._elem[index];
          } else {
            return index > 0 ? null : this._elem;
          }
        }
      }
      /**
       * @desc: hasClass
       */

    }, {
      key: "hasClass",
      value: function hasClass(cName) {
        if (!this._elem) {
          return false;
        }

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          if (_hasClass(this.get(i), cName)) return true;
        }

        return false;
      }
      /**
       * @desc: addClass
       */

    }, {
      key: "addClass",
      value: function addClass(cName) {
        if (!this._elem) {
          return this;
        }

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          _addClass(this.get(i), cName);
        }

        return this;
      }
      /**
       * @desc: removeClass
       */

    }, {
      key: "removeClass",
      value: function removeClass(cName) {
        if (!this._elem) {
          return this;
        }

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          _removeClass(this.get(i), cName);
        }

        return this;
      }
      /**
       * @desc: toggleClass
       */

    }, {
      key: "toggleClass",
      value: function toggleClass(cName) {
        if (!this._elem) {
          return this;
        }

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          if (_hasClass(this.get(i), cName)) _removeClass(this.get(i), cName);else _addClass(this.get(i), cName);
        }

        return this;
      }
      /**
       * @desc: remove
       */

    }, {
      key: "remove",
      value: function remove() {
        if (!this._elem) {
          return this;
        }

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          _removeElement(this.get(i));
        }

        return this;
      }
      /**
       * @desc: append
       */

    }, {
      key: "append",
      value: function append(node) {
        if (!this._elem) {
          return this;
        }

        var _dom = new Dom(node);

        _appendChild(this.get(0), _dom);

        return this;
      }
      /**
       * appendTo
       */

    }, {
      key: "appendTo",
      value: function appendTo(node) {
        if (!this._elem) {
          return this;
        }

        var dom = new Dom(node);
        dom.append(this);
        return this;
      }
      /**
       * @desc: prepend
       */

    }, {
      key: "prepend",
      value: function prepend(node) {
        if (!this._elem) {
          return this;
        }

        var _dom = new Dom(node);

        _prependChild(this.get(0), _dom);

        return this;
      }
      /**
       * @desc: prependTo
       */

    }, {
      key: "prependTo",
      value: function prependTo(node) {
        if (!this._elem) {
          return this;
        }

        var dom = new Dom(node);
        dom.prepend(this);
        return this;
      }
      /**
       * @desc: before
       */

    }, {
      key: "before",
      value: function before(node) {
        if (!this._elem) {
          return this;
        }

        var _dom = new Dom(node);

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          _dom.insertBefore(this.get(i));
        }

        return this;
      }
      /**
       * insertBefore
       */

    }, {
      key: "insertBefore",
      value: function insertBefore(node) {
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
      }
      /**
       * @desc: after
       */

    }, {
      key: "after",
      value: function after(node) {
        if (!this._elem) {
          return this;
        }

        var _dom = new Dom(node);

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          _dom.insertAfter(this.get(i));
        }

        return this;
      }
      /**
       * @desc: insertAfter
       */

    }, {
      key: "insertAfter",
      value: function insertAfter(node) {
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
      }
      /**
       * @desc: attr.
       */

    }, {
      key: "attr",
      value: function attr(attrName, value) {
        if (!attrName) {
          throw new Error('need attrName');
        }

        if (!this._elem) {
          if (typeof value !== 'undefined') return this;
          return undefined;
        }

        if (typeof value === 'undefined') {
          if (!this.get(0).hasAttribute(attrName)) return undefined;
          return this.get(0).getAttribute(attrName);
        } else {
          var _thisLength = this.length ? this.length : 1;

          for (var i = 0; i < _thisLength; i++) {
            this.get(i).setAttribute(attrName, value);
          }

          return this;
        }
      }
      /**
       * @desc: removeAttr
       */

    }, {
      key: "removeAttr",
      value: function removeAttr(name) {
        if (!this._elem) {
          return this;
        }

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          this.get(i).removeAttribute(name);
        }

        return this;
      }
      /**
      * @desc: detach.
      */

    }, {
      key: "detach",
      value: function detach() {
        throw new Error('unimplement');
      }
      /**
      * @desc: clone.
      */

    }, {
      key: "clone",
      value: function clone() {
        throw new Error('unimplement');
      }
      /**
      * @desc: replaceAll.
      */

    }, {
      key: "replaceAll",
      value: function replaceAll() {
        throw new Error('unimplement');
      }
      /**
      * @desc: replaceWith.
      */

    }, {
      key: "unwrap",
      value: function unwrap() {
        throw new Error('unimplement');
      }
      /**
      * @desc: replaceWith.
      */

    }, {
      key: "wrap",
      value: function wrap() {
        throw new Error('unimplement');
      }
      /**
      * @desc: replaceWith.
      */

    }, {
      key: "wrapAll",
      value: function wrapAll() {
        throw new Error('unimplement');
      }
      /**
      * @desc: replaceWith.
      */

    }, {
      key: "wrapinner",
      value: function wrapinner() {
        throw new Error('unimplement');
      }
      /**
      * @desc: empty.
      */

    }, {
      key: "empty",
      value: function empty() {
        if (!this._elem) {
          return this;
        }

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          this.get(i).innerHTML = '';
        }

        return this;
      }
      /**
      * @desc: html.
      */

    }, {
      key: "html",
      value: function html(v) {
        if (!this._elem) {
          if (typeof v !== 'undefined') return this;
          return;
        }

        if (typeof v === 'undefined') {
          return this.get(0).innerHTML;
        } else {
          var _thisLength = this.length ? this.length : 1;

          for (var i = 0; i < _thisLength; i++) {
            this.get(i).innerHTML = v;
          }

          return this;
        }
      }
      /**
      * @desc: text.
      */

    }, {
      key: "text",
      value: function text(v) {
        if (!this._elem) {
          if (typeof v !== 'undefined') return this;
          return;
        }

        if (typeof v === 'undefined') {
          return this.get(0).textContent;
        } else {
          var _thisLength = this.length ? this.length : 1;

          for (var i = 0; i < _thisLength; i++) {
            this.get(i).textContent = v;
          }

          return this;
        }
      }
      /**
      * @desc: val.
      */

    }, {
      key: "val",
      value: function val(v) {
        if (!this._elem) {
          if (typeof v !== 'undefined') return this;
          return;
        }

        if (typeof v === 'undefined') {
          return this.get(0).value;
        } else {
          var _thisLength = this.length ? this.length : 1;

          for (var i = 0; i < _thisLength; i++) {
            this.get(i).value = v;
          }

          return this;
        }
      }
      /**
      * @desc: css.
      */

    }, {
      key: "css",
      value: function css(name, value) {
        if (!this._elem) {
          if (typeof value !== 'undefined') return this;
          return;
        }

        if (typeof value === 'undefined') {
          return this.get(0).style[name];
        } else {
          var _thisLength = this.length ? this.length : 0;

          for (var i = 0; i < _thisLength; i++) {
            if (value == '') this.get(i).style[name] = '';else this.get(i).style[name] = value;
          }

          return this;
        }
      }
      /**
      * @desc: on.
      */

    }, {
      key: "on",
      value: function on(eventname, foo) {
        if (!eventname) throw new Error('need event name');
        if (typeof foo !== 'function') throw new Error('on need function params');

        if (!this._elem) {
          return this;
        }

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          var ee = this.get(i);

          if (ee instanceof Dom || ee.__domtify) {
            ee = ee._elem;

            if (!ee) {
              continue;
            }
          }

          if (!ee.__events) ee.__events = {};
          if (!ee.__events[eventname]) ee.__events[eventname] = [];
          var env = ee.__events[eventname];
          var j;

          for (j = 0; j < env.length; j++) {
            if (env[j] === foo) {
              break;
            }
          }

          if (j >= env.length) {
            env.push(foo);
          }

          if ('on' + eventname in ee) {
            if (ee.addEventListener) ee.addEventListener(eventname, foo);else ee.attachEvent('on' + eventname, foo);
          }
        }

        return this;
      }
      /**
      * @desc: one.
      */

    }, {
      key: "one",
      value: function one(event, f) {
        if (!event || typeof event !== 'string') throw new Error('need event name');

        var _this = this;

        var tt = function tt(e) {
          _this.off(event, tt);

          f.bind(this)(e);
        };

        _this.on(event, tt);

        return this;
      }
      /**
      * @desc: off.
      */

    }, {
      key: "off",
      value: function off(eventname, foo) {
        if (!eventname) throw new Error('need event name');

        if (!this._elem) {
          return this;
        }

        if (!foo) {
          var _thisLength = this.length ? this.length : 1;

          for (var i = 0; i < _thisLength; i++) {
            var ee = this.get(i);

            if (ee instanceof Dom || ee.__domtify) {
              ee = ee._elem;

              if (!ee) {
                continue;
              }
            }

            if (ee.__events && ee.__events[eventname]) {
              var env = ee.__events[eventname];
              var j;

              if ('on' + eventname in ee) {
                for (j = 0; j < env.length; j++) {
                  if (ee.removeEventListener) ee.removeEventListener(eventname, env[j]);else ee.detachEvent('on' + eventname, env[j]);
                }
              }

              ee.__events[eventname] = [];
            }
          }

          return this;
        }

        if (typeof foo !== 'function') throw new Error('off need function params');

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          var ee = this.get(i);

          if (ee instanceof Dom) {
            ee = ee._elem;
          }

          if (ee.__events && ee.__events[eventname]) {
            var env = ee.__events[eventname];
            var j;

            for (j = 0; j < env.length; j++) {
              if (env[j] === foo) {
                env.splice(j, 1);
                break;
              }
            }
          }

          if ('on' + eventname in ee) {
            if (ee.removeEventListener) ee.removeEventListener(eventname, foo);else ee.detachEvent('on' + eventname, foo);
          }
        }

        return this;
      }
      /**
      * @desc: trigger.
      */

    }, {
      key: "trigger",
      value: function trigger(eventname, extraParameters) {
        if (!eventname) throw new Error('need event name');

        if (!this._elem) {
          return this;
        }

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          var ee = this.get(i);

          if (ee instanceof Dom) {
            ee = ee._elem;
          } // fire.


          if (ee) {
            if ('on' + eventname in ee) {
              if (!window.document.addEventListener) {
                ee.fireEvent('on' + eventname);
              } else {
                var env = window.document.createEvent('HTMLEvents');
                env.initEvent(eventname, true, true);
                ee.dispatchEvent(env);
              }
            } else {
              if (ee.__events && ee.__events[eventname]) {
                var env = ee.__events[eventname];
                var j;
                var enve; // if (!window.document.addEventListener) {

                enve = {
                  bubbles: false,
                  cancelable: false,
                  cancelBubble: false,
                  defaultPrevented: false,
                  // currentTarget: ee,
                  // target: ee,
                  type: eventname
                }; // }
                // else {
                //   enve = window.document.createEvent('HTMLEvents');
                //   enve.initEvent(eventname, false, false);
                // }

                enve.currentTarget = ee;
                enve.target = ee;

                for (j = 0; j < env.length; j++) {
                  env[j](enve, extraParameters);
                }
              } // if.

            }
          } // if.

        }

        return this;
      }
      /**
      * @desc: parent
      * @return: 
      */

    }, {
      key: "parent",
      value: function parent(selector) {
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

          var _thisLength = this.length ? this.length : 1;

          for (var i = 0; i < _thisLength; i++) {
            if (this.get(i).parentNode) {
              if (!sel || sel._isElementIn(this.get(i).parentNode)) {
                this._domtify(this.get(i).parentNode);

                dom._elem.push(this.get(i).parentNode);

                dom[dom.length] = this.get(i).parentNode;
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

    }, {
      key: "parents",
      value: function parents(selector) {
        if (!this._elem) {
          return new Dom();
        }

        var sel;
        if (selector) sel = new Dom(selector);
        var nodes = [];

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          if (!this.get(i).parentNode) continue;
          var elem = this.get(i);

          while (elem.parentNode) {
            if (elem.parentNode == window || elem.parentNode == window.document) break;

            if (!sel || sel._isElementIn(elem.parentNode)) {
              var j;

              for (j = 0; j < nodes.length; j++) {
                if (typeof nodes[j].isSameNode === 'function') {
                  if (nodes[j].isSameNode(elem.parentNode)) {
                    break;
                  }
                } else {
                  if (nodes[j] === elem.parentNode) {
                    break;
                  }
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
      }
      /**
       * children
       * @param {*} selector 
       */

    }, {
      key: "children",
      value: function children(selector) {
        if (!this._elem) {
          return new Dom();
        }

        var nodes = [];

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          var sel;
          if (selector) sel = _getElement(selector, this.get(i));else {
            sel = {
              _elem: [],
              _isarr: true
            };

            for (var j = 0; j < this.get(i).childNodes.length; j++) {
              sel._elem.push(this.get(i).childNodes[j]);
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
      }
      /**
       * next
       * @param {*} selector 
       */

    }, {
      key: "next",
      value: function next(selector) {
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

          var _thisLength = this.length ? this.length : 1;

          for (var i = 0; i < _thisLength; i++) {
            if (!dom || dom._isElementIn(this.get(i).nextSibling)) {
              if (this.get(i).nextSibling) nodes.push(this.get(i).nextSibling);
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

      }
      /**
       * prev
       * @param {*} selector 
       */

    }, {
      key: "prev",
      value: function prev(selector) {
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

          var _thisLength = this.length ? this.length : 1;

          for (var i = 0; i < _thisLength; i++) {
            if (!dom || dom._isElementIn(this.get(i).previousSibling)) {
              if (this.get(i).previousSibling) nodes.push(this.get(i).previousSibling);
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

      }
      /**
      * @desc: 遍历
      */

    }, {
      key: "each",
      value: function each(cb) {
        if (cb) {
          for (var i = 0; i < this.length; i++) {
            cb(i, this.get(i));
          }
        }
      } // 将普通节点设置为Dom对象.

    }, {
      key: "_domtify",
      value: function _domtify(node) {
        if (node instanceof Dom) return;
        if (node.__domtify) return;

        var _proto = Object.getPrototypeOf(this);

        for (var key in _proto) {
          if (key != '__proto__' && key != 'constructor') {
            // 不覆盖native方法.
            if (!node[key]) {
              node[key] = _proto[key].bind(node);
            }
          }
        } // // plugin.


        for (var key in CreateDom.fn) {
          if (key == 'extend' || key == 'fn') continue;

          if (typeof CreateDom.fn[key] === 'function') {
            if (!node[key]) {
              node[key] = CreateDom.fn[key].bind(node);
            }
          }
        } // delete node.length;


        node._isArr = false;
        node._elem = node; // node[0] = node;

        node.__domtify = true;
      } // 当前是否是数组.

    }, {
      key: "_isArray",
      value: function _isArray() {
        return this._isArr;
      } // 指定节点是否存在于本对象中.

    }, {
      key: "_isElementIn",
      value: function _isElementIn(node) {
        if (!this._elem) return false;

        var _thisLength = this.length ? this.length : 1;

        for (var i = 0; i < _thisLength; i++) {
          if (typeof this.get(i).isSameNode === 'function') {
            if (this.get(i).isSameNode(node)) return true;
          } else {
            if (this.get(i) === node) return true;
          }
        }

        return false;
      }
    }]);

    return Dom;
  }();

  CreateDom = function CreateDom(n) {
    return new Dom(n);
  }; // plugin.


  CreateDom.fn = {};

  CreateDom.extend = function (plugin) {
    if (arguments.length == 0) return {};

    if (arguments.length == 1) {
      for (var key in arguments[0]) {
        if (key == 'extend' || key == 'fn') continue;

        if (typeof arguments[0][key] === 'function') {
          CreateDom[key] = arguments[0][key];
        }
      }

      return this;
    } else {
      if (arguments[0] === false) throw new Error('can\'t be false');
      var o = {};
      var i = 0;
      if (arguments[0] === true) i = 1;

      for (; i < arguments.length; i++) {
        o = utils_1.mergeMap(o, arguments[i]);
      }

      return o;
    } // if..else.

  };
  /**
  * @desc: viewport.
  * @return: {width, height}
  */


  Dom.getViewPort = function () {
    if (window.document.compatMode == "BackCompat") {
      //浏览器嗅探，混杂模式
      return {
        width: window.document.body.clientWidth,
        height: window.document.body.clientHeight
      };
    } else {
      return {
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight
      };
    }
  };
  /**
  * @desc: documentport.
  * @return: {width, height}
  */


  Dom.getDocumentPort = function () {
    if (window.document.compatMode == "BackCompat") {
      return {
        width: window.document.body.scrollWidth,
        height: window.document.body.scrollHeight
      };
    } else {
      return {
        width: Math.max(window.document.documentElement.scrollWidth, window.document.documentElement.clientWidth),
        height: Math.max(window.document.documentElement.scrollHeight, window.document.documentElement.clientHeight)
      };
    }
  };
  /**
  * @desc: document offset.
  * @return: {top, left}
  */


  Dom.getDocumentOffset = function () {
    var elementScrollLeft;
    var elementScrollTop;

    if (window.document.compatMode == "BackCompat") {
      elementScrollLeft = window.document.body.scrollLeft;
      elementScrollTop = window.document.body.scrollTop;
    } else {
      // CSS1Compat
      elementScrollLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
      elementScrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
    }

    return {
      top: elementScrollTop,
      left: elementScrollLeft
    };
  };
  /**
  * @desc: 获取指定元素相对于视口的的offset
  * @return: 
  */


  Dom.getElementOffset = function (e) {
    if (!e) {
      return {};
    }

    var ee = CreateDom(e);
    ee = ee[0];

    if (ee) {
      if (typeof ee.getBoundingClientRect === 'function') {
        var rect = ee.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top
        };
      } else {
        var actualLeft = ee.offsetLeft;
        var actualTop = ee.offsetTop;
        var current = ee.offsetParent;

        while (current) {
          actualLeft += current.offsetLeft;
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }

        var elementScrollLeft;
        var elementScrollTop;

        if (window.document.compatMode == "BackCompat") {
          elementScrollLeft = window.document.body.scrollLeft;
          elementScrollTop = window.document.body.scrollTop;
        } else {
          elementScrollLeft = window.document.documentElement.scrollLeft == 0 ? window.document.body.scrollLeft : window.document.documentElement.scrollLeft;
          elementScrollTop = window.document.documentElement.scrollTop == 0 ? window.document.body.scrollTop : window.document.documentElement.scrollTop;
        }

        return {
          left: actualLeft - elementScrollLeft,
          top: actualTop - elementScrollTop
        };
      } // if..else.

    }

    return {};
  };
  /**
  * @desc: 判断是否是dom对象.
  * @return: boolean.
  */


  Dom.isDom = function (e) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? e instanceof HTMLElement : e && _typeof(e) === 'object' && e.nodeType === 1 && typeof e.nodeName === 'string';
  };
  /**
  * @desc: 统一处理 removeEventListener, detachEvent; 并提供useCapture参数问题.
  */


  Dom.removeEventListener = function (dom, eventName, foo, useCapture) {
    if (!dom) return;

    if (dom.addEventListener) {
      dom.removeEventListener(eventName, foo, useCapture);
    } else {
      dom.detachEvent('on' + eventName, foo);
    }
  };
  /**
  * @desc: 统一处理 addEventListener, attachEvent; 并提供useCapture参数问题.
  */


  Dom.addEventListener = function (dom, eventName, foo, useCapture) {
    if (!dom) return;

    if (dom.addEventListener) {
      dom.addEventListener(eventName, foo, useCapture);
    } else {
      dom.attachEvent('on' + eventName, foo);
    }
  };

  var Dom_1 = Dom;
  var CreateDom_1 = CreateDom;
  var dom = {
    Dom: Dom_1,
    CreateDom: CreateDom_1
  };

  getCjsExportFromNamespace(promiseFinallyPolyfill);

  // require('es5-shim/es5-sham');
  // require('console-polyfill');
  // require('babel-polyfill');
  // require('../third-party/bluebird.min.js');
  // require('../third-party/bignumber.min.js');
  //
  // promise.

  window.Promise = bluebird_min; //
  // getPrototypeOf

  if (typeof Object.getPrototypeOf !== 'function') {
    Object.getPrototypeOf = ''.__proto__ === String.prototype ? function (object) {
      return object.__proto__;
    } : function (object) {
      // May break if the constructor has been tampered with
      return object.constructor.prototype;
    };
  } //
  // bind.


  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function fNOP() {},
          fBound = function fBound() {
        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
      };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
      return fBound;
    };
  } //
  // Number.isNaN


  if (typeof Number.isNaN !== 'function') {
    Number.isNaN = function (num) {
      if (typeof num !== 'number') return false;
      if (isNaN(num)) return true;
      return false;
    };
  } //
  // Number.isInteger


  if (typeof Number.isInteger !== 'function') {
    Number.isInteger = function (num) {
      if (typeof num !== 'number') return false;
      if (Math.ceil(num) === num) return true;
      return false;
    };
  } //
  // document.getElementsByClassName


  if (window && !window.document.getElementsByClassName) {
    window.document.getElementsByClassName = function (className, element) {
      var children = (element || window.document).getElementsByTagName('*');
      var elements = new Array();

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var classNames = child.className.split(' ');

        for (var j = 0; j < classNames.length; j++) {
          if (classNames[j] == className) {
            elements.push(child);
            break;
          }
        }
      }

      return elements;
    };
  } //
  // define the animationFrame.
  //
  // define the __debug.


  if (!window['__debug']) {
    window.__debug = false;
  } //
  // define the animationFrame.


  if (!window['requestAnimationFrame']) window.requestAnimationFrame = animationFrame_1.requestAnimationFrame;
  if (!window['cancelAnimationFrame']) window.cancelAnimationFrame = animationFrame_1.cancelAnimationFrame;
  var febs = {};
  febs.__debug = window.__debug;
  febs.BigNumber = bignumber;
  febs.date = date_1;
  febs.utils = febs.utils.mergeMap(utils_1, utils_bigint);
  febs.string = string_1$1;
  febs.crypt = febs.utils.mergeMap(crypt_1, crypt_md5, crypt_sha1);
  febs.net = net_1;
  febs['$'] = dom.CreateDom;
  febs.dom = dom.Dom;
  if (!window['febs']) window['febs'] = febs;else {
    window['febs'].string = window['febs'].string ? febs.utils.mergeMap(window['febs'].string, febs.string) : febs.string;
    window['febs'].crypt = window['febs'].crypt ? febs.utils.mergeMap(window['febs'].crypt, febs.crypt) : febs.crypt;
    window['febs'].utils = window['febs'].utils ? febs.utils.mergeMap(window['febs'].utils, febs.utils) : febs.utils;
    window['febs'].net = window['febs'].net ? febs.utils.mergeMap(window['febs'].net, febs.net) : febs.net;
    window['febs'].dom = window['febs'].dom ? febs.utils.mergeMap(window['febs'].dom, febs.dom) : febs.dom;
  }
  if (!window['$']) window['$'] = febs['$'];
  if (!window['jQuery']) window['jQuery'] = febs['$']; //
  // debug.
  //
  // if (!console.debug) {

  if (window.console) {
    window.console.debug = function () {
      if (window.__debug) {
        var logfoo;
        if (window.console.warn) logfoo = window.console.warn;else logfoo = window.console.log;

        for (var i = 0; i < arguments.length; i++) {
          logfoo(arguments[i]);
        }
      }
    };
  } // }


  var __debug = febs.__debug;
  var BigNumber = febs.BigNumber;
  var date$1 = febs.date;
  var utils$1 = febs.utils;
  var string$1 = febs.string;
  var crypt$2 = febs.crypt;
  var net$4 = febs.net;
  var $ = febs['$'];
  var dom$1 = febs.dom;

  exports.$ = $;
  exports.BigNumber = BigNumber;
  exports.__debug = __debug;
  exports.crypt = crypt$2;
  exports.date = date$1;
  exports.dom = dom$1;
  exports.net = net$4;
  exports.string = string$1;
  exports.utils = utils$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.ie8.js.map
