/*!
 * febs v1.2.4
 * Copyright (c) 2021 bpoint.lee@gmail.com All Rights Reserved.
 * Released under the MIT License.
 */

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
}

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f$1
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$2
};

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
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
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

var nativePromiseConstructor = global_1.Promise;

var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

var defineProperty = objectDefineProperty.f;



var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
    defineProperty(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
  }
};

var SPECIES = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var iterators = {};

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
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

var ITERATOR$1 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || iterators[classof(it)];
};

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var iterate_1 = createCommonjsModule(function (module) {
var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};
});

var ITERATOR$2 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$2] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$2] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var SPECIES$1 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
};

var html = getBuiltIn('document', 'documentElement');

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

var location = global_1.location;
var set$1 = global_1.setImmediate;
var clear = global_1.clearImmediate;
var process = global_1.process;
var MessageChannel = global_1.MessageChannel;
var Dispatch = global_1.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global_1.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set$1 || !clear) {
  set$1 = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classofRaw(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !engineIsIos) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = functionBindContext(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global_1.addEventListener &&
    typeof postMessage == 'function' &&
    !global_1.importScripts &&
    !fails(post) &&
    location.protocol !== 'file:'
  ) {
    defer = post;
    global_1.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
    defer = function (id) {
      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task = {
  set: set$1,
  clear: clear
};

var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

var macrotask = task.set;


var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
var process$1 = global_1.process;
var Promise$1 = global_1.Promise;
var IS_NODE = classofRaw(process$1) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process$1.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !engineIsIos) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
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
      macrotask.call(global_1, flush);
    };
  }
}

var microtask = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$1(resolve);
  this.reject = aFunction$1(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
var f$5 = function (C) {
  return new PromiseCapability(C);
};

var newPromiseCapability = {
	f: f$5
};

var promiseResolve = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var hostReportErrors = function (a, b) {
  var console = global_1.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var process$2 = global_1.process;
var versions = process$2 && process$2.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var task$1 = task.set;










var SPECIES$2 = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = internalState.get;
var setInternalState = internalState.set;
var getInternalPromiseState = internalState.getterFor(PROMISE);
var PromiseConstructor = nativePromiseConstructor;
var TypeError$1 = global_1.TypeError;
var document$2 = global_1.document;
var process$3 = global_1.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability$1 = newPromiseCapability.f;
var newGenericPromiseCapability = newPromiseCapability$1;
var IS_NODE$1 = classofRaw(process$3) == 'process';
var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced_1(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (engineV8Version === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$2] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify$1 = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
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
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$2.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global_1.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global_1['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE$1) {
          process$3.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    if (IS_NODE$1) {
      process$3.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify$1(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify$1(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction$1(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify$1(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if ( typeof nativePromiseConstructor == 'function') {
    nativeThen = nativePromiseConstructor.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
      }
    });
  }
}

_export({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
_export({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability$1(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

_export({ target: PROMISE, stat: true, forced:  FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve( this, x);
  }
});

_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate_1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      iterate_1(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
  nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
_export({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if ( typeof nativePromiseConstructor == 'function' && !nativePromiseConstructor.prototype['finally']) {
  redefine(nativePromiseConstructor.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}

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

var slice = [].slice;
var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
_export({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global_1.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global_1.setInterval)
});

var Window = "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : undefined;
var animationFrame = {};
var lastTime = 0;
Window.requestAnimationFrame = Window.requestAnimationFrame || Window.mozRequestAnimationFrame || Window.webkitRequestAnimationFrame || Window.msRequestAnimationFrame;
Window.cancelAnimationFrame = Window.cancelAnimationFrame || Window.mozCancelAnimationFrame;

if (!Window.requestAnimationFrame) {
  Window.requestAnimationFrame = function (callback) {
    var currTime = Date.now();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = Window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!Window.cancelAnimationFrame) {
  Window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}

animationFrame.requestAnimationFrame = Window.requestAnimationFrame;
animationFrame.cancelAnimationFrame = Window.cancelAnimationFrame;
var animationFrame_1 = animationFrame;

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
	UNSUPPORTED_Y: UNSUPPORTED_Y,
	BROKEN_CARET: BROKEN_CARET
};

var defineProperty$1 = objectDefineProperty.f;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;





var setInternalState$1 = internalState.set;



var MATCH$1 = wellKnownSymbol('match');
var NativeRegExp = global_1.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;

var FORCED$1 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
  re2[MATCH$1] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED$1) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegexp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y$1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y$1 && sticky) setInternalState$1(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$1(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys$1 = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys$1.length > index) proxy(keys$1[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global_1, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

// TODO: Remove from `core-js@4` since it's moved to entry points







var SPECIES$3 = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
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

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$3] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var charAt = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

var max$1 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
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
        var result = regexpExecAbstract(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max$1(min$2(toInteger(result.index), S.length), 0);
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
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
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
            var f = floor$1(n / 10);
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

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var SPECIES$4 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$4] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var defineProperty$2 = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty$2(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES$5 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$2 = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$5];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$2 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$2(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$2(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$2(3)
};

var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
var defineProperty$3 = objectDefineProperty.f;
var trim = stringTrim.trim;

var NUMBER = 'Number';
var NativeNumber = global_1[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys$2 = descriptors ? getOwnPropertyNames$1(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys$2.length > j; j++) {
    if (has(NativeNumber, key = keys$2[j]) && !has(NumberWrapper, key)) {
      defineProperty$3(NumberWrapper, key, getOwnPropertyDescriptor$3(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global_1, NUMBER, NumberWrapper);
}

// `Number.isNaN` method
// https://tc39.github.io/ecma262/#sec-number.isnan
_export({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var utils = createCommonjsModule(function (module, exports) {
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
   * @desc: 合并多个map (浅拷贝).
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
    return e === null || e === undefined || Number.isNaN(e);
  };
  /**
   * date.
   */


  exports.getTimeString = date.getTimeString;
  exports.getTimeStringFromNow = date.getTimeStringFromNow;
  exports.getDate = date.getDate;
  exports.getDate2 = date.getDate2;
  /**
  * @desc: 创建promise，但函数中的this可以为指定值.
  *         例如: yield denodeify(fs.exists)(path);
  * @param self: 指定的对象.s
  * @return: promise.
  */

  exports.denodeify = function (fn, self, argumentCount) {
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

  exports.promisify = exports.denodeify;
});
var utils_1 = utils.sleep;
var utils_2 = utils.mergeMap;
var utils_3 = utils.isNull;
var utils_4 = utils.getTimeString;
var utils_5 = utils.getTimeStringFromNow;
var utils_6 = utils.getDate;
var utils_7 = utils.getDate2;
var utils_8 = utils.denodeify;
var utils_9 = utils.promisify;

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $indexOf = arrayIncludes.indexOf;



var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH$1 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var nativeJoin = [].join;

var ES3_STRINGS = indexedObject != Object;
var STRICT_METHOD$1 = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$1 }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

// `Number.MAX_SAFE_INTEGER` constant
// https://tc39.github.io/ecma262/#sec-number.max_safe_integer
_export({ target: 'Number', stat: true }, {
  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
});

// @@match logic
fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regexpExecAbstract(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regexpExecAbstract(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

var utils_browser = createCommonjsModule(function (module, exports) {
  /**
  * Copyright (c) 2020 Copyright bp All Rights Reserved.
  * Author: lipengxiang
  * Date: 2020-04-14 12:46
  * Desc: 
  */

  var Window = "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : undefined;
  /**
   * @desc: 判断是否是ie.
   */

  exports.browserIsIE = function () {
    if (!!Window.ActiveXObject || "ActiveXObject" in Window) return true;else return false;
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
    } else {
      return Number.MAX_SAFE_INTEGER;
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
      if (_typeof(Window) !== undefined) {
        userAgent = Window.navigator.userAgent;
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
      if (_typeof(Window) !== undefined) {
        userAgent = Window.navigator.userAgent;
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
      if (_typeof(Window) !== undefined) {
        userAgent = Window.navigator.userAgent;
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
      if (_typeof(Window) !== undefined) {
        userAgent = Window.navigator.userAgent;
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
      if (_typeof(Window) !== undefined) {
        userAgent = Window.navigator.userAgent;
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
      if (_typeof(Window) !== undefined) {
        userAgent = Window.navigator.userAgent;
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


var sleep = utils.sleep;
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

var getTimeString$2 = utils.getTimeString;
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

var getTimeStringFromNow$2 = utils.getTimeStringFromNow;
/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */

var getDate$2 = utils.getDate;
/**
 * @desc: getDate2('20120509')
 * @return: Date.
 */

var getDate2$2 = utils.getDate2;
/**
 * @desc: 合并多个map.
 * @return: {}
 */

var mergeMap = utils.mergeMap;
/**
 * @desc: 判断参数是否是null,undefined,NaN
 * @return: boolean
 */

var isNull = utils.isNull;
/**
* @desc: 创建promise，但函数中的this可以为指定值.
*         例如: yield denodeify(fs.exists)(path);
* @param self: 指定的对象.s
* @return: promise.
*/

var denodeify = utils.denodeify;
var promisify = utils.promisify;
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
var utils_1$1 = {
  sleep: sleep,
  getTimeString: getTimeString$2,
  getTimeStringFromNow: getTimeStringFromNow$2,
  getDate: getDate$2,
  getDate2: getDate2$2,
  mergeMap: mergeMap,
  isNull: isNull,
  denodeify: denodeify,
  promisify: promisify,
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

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
var stringTrimForced = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $trim = stringTrim.trim;


// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
_export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

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

  exports.utf8Encode = function utf8Encode(str) {
    var x,
        y,
        output = '',
        i = -1,
        l;

    if (str && str.length) {
      l = str.length;

      while ((i += 1) < l) {
        /* Decode utf-16 surrogate pairs */
        x = str.charCodeAt(i);
        y = i + 1 < l ? str.charCodeAt(i + 1) : 0;

        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i += 1;
        }
        /* Encode output as utf-8 */


        if (x <= 0x7F) {
          output += String.fromCharCode(x);
        } else if (x <= 0x7FF) {
          output += String.fromCharCode(0xC0 | x >>> 6 & 0x1F, 0x80 | x & 0x3F);
        } else if (x <= 0xFFFF) {
          output += String.fromCharCode(0xE0 | x >>> 12 & 0x0F, 0x80 | x >>> 6 & 0x3F, 0x80 | x & 0x3F);
        } else if (x <= 0x1FFFFF) {
          output += String.fromCharCode(0xF0 | x >>> 18 & 0x07, 0x80 | x >>> 12 & 0x3F, 0x80 | x >>> 6 & 0x3F, 0x80 | x & 0x3F);
        }
      }
    }

    return output;
  };

  exports.utf8Decode = function utf8Decode(str) {
    var i,
        ac,
        c1,
        c2,
        c3,
        arr = [],
        l;
    i = ac = c1 = c2 = c3 = 0;

    if (str && str.length) {
      l = str.length;
      str += '';

      while (i < l) {
        c1 = str.charCodeAt(i);
        ac += 1;

        if (c1 < 128) {
          arr[ac] = String.fromCharCode(c1);
          i += 1;
        } else if (c1 > 191 && c1 < 224) {
          c2 = str.charCodeAt(i + 1);
          arr[ac] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
          i += 2;
        } else {
          c2 = str.charCodeAt(i + 1);
          c3 = str.charCodeAt(i + 2);
          arr[ac] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          i += 3;
        }
      }
    }

    return arr.join('');
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
var string_10 = string.utf8Encode;
var string_11 = string.utf8Decode;
var string_12 = string.trim;
var string_13 = string.escapeHtml;

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
var utf8Encode = string.utf8Encode;
var utf8Decode = string.utf8Decode;
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
  utf8Encode: utf8Encode,
  utf8Decode: utf8Decode,
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

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

function binl2rstr(input) {
  var i,
      l = input.length * 32,
      output = '';

  for (i = 0; i < l; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
  }

  return output;
}

function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

function rstr2binl(input) {
  var i,
      l = input.length * 8,
      output = Array(input.length >> 2),
      lo = output.length;

  for (i = 0; i < lo; i += 1) {
    output[i] = 0;
  }

  for (i = 0; i < l; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;
  }

  return output;
}

function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

function hex(s) {
  var input = binl2rstr(binl(rstr2binl(s), s.length * 8));
  var hex_tab = '0123456789abcdef',
      output = '',
      x,
      i = 0,
      l = input.length;

  for (; i < l; i += 1) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt(x >>> 4 & 0x0f) + hex_tab.charAt(x & 0x0f);
  }

  return output;
}
/**
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function binl(x, len) {
  var i,
      olda,
      oldb,
      oldc,
      oldd,
      a = 1732584193,
      b = -271733879,
      c = -1732584194,
      d = 271733878;
  /* append padding */

  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }

  return Array(a, b, c, d);
}
/**
 * These functions implement the four basic operations the algorithm uses.
 */


function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

var md5 = function md5(str) {
  return hex(string.utf8Encode(str));
};

var crypt_md5 = {
  md5: md5
};

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

function binb2rstr(input) {
  var i,
      l = input.length * 32,
      output = '';

  for (i = 0; i < l; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> 24 - i % 32 & 0xff);
  }

  return output;
}

function bit_rol$1(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

function safe_add$1(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}

function sha1_ft(t, b, c, d) {
  if (t < 20) {
    return b & c | ~b & d;
  }

  if (t < 40) {
    return b ^ c ^ d;
  }

  if (t < 60) {
    return b & c | b & d | c & d;
  }

  return b ^ c ^ d;
}

function sha1_kt(t) {
  return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
}

function rstr2binb(input) {
  var i,
      l = input.length * 8,
      output = Array(input.length >> 2),
      lo = output.length;

  for (i = 0; i < lo; i += 1) {
    output[i] = 0;
  }

  for (i = 0; i < l; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << 24 - i % 32;
  }

  return output;
}

function hex$1(s) {
  var input = binb2rstr(binb(rstr2binb(s), s.length * 8));
  var hex_tab = '0123456789abcdef',
      output = '',
      x,
      i = 0,
      l = input.length;

  for (; i < l; i += 1) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt(x >>> 4 & 0x0f) + hex_tab.charAt(x & 0x0f);
  }

  return output;
}

function binb(x, len) {
  var i,
      j,
      t,
      olda,
      oldb,
      oldc,
      oldd,
      olde,
      w = Array(80),
      a = 1732584193,
      b = -271733879,
      c = -1732584194,
      d = 271733878,
      e = -1009589776;
  /* append padding */

  x[len >> 5] |= 0x80 << 24 - len % 32;
  x[(len + 64 >> 9 << 4) + 15] = len;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    olde = e;

    for (j = 0; j < 80; j += 1) {
      if (j < 16) {
        w[j] = x[i + j];
      } else {
        w[j] = bit_rol$1(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      }

      t = safe_add$1(safe_add$1(bit_rol$1(a, 5), sha1_ft(j, b, c, d)), safe_add$1(safe_add$1(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = bit_rol$1(b, 30);
      b = a;
      a = t;
    }

    a = safe_add$1(a, olda);
    b = safe_add$1(b, oldb);
    c = safe_add$1(c, oldc);
    d = safe_add$1(d, oldd);
    e = safe_add$1(e, olde);
  }

  return Array(a, b, c, d, e);
}

var sha1 = function sha1(str) {
  return hex$1(string.utf8Encode(str));
};

var crypt_sha1 = {
  sha1: sha1
};

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

var Window$1 = "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : undefined; // var Ajaxmark = Symbol('ajaxmark');

var Ajaxmark = '_FeBs_ajaxmark';
var net = {}; //--------------------------------------------------------
// ajax
//--------------------------------------------------------

/**
 * @desc: ajax 跳转. 允许添加 progress: function(percent) 选项.
 * @return:
 */

function ajax(ctx) {
  //if (!!Window.ActiveXObject || "ActiveXObject" in Window) // ie11.
  {
    if (ctx.url) {
      if (!Window$1[Ajaxmark]) Window$1[Ajaxmark] = 1;
      var i = ctx.url.indexOf('?');

      if (i < 0) {
        ctx.url += "?ajaxmark=" + Window$1[Ajaxmark];
      } else {
        if (i == ctx.url.length - 1) {
          ctx.url += "ajaxmark=" + Window$1[Ajaxmark];
        } else {
          ctx.url += "&ajaxmark=" + Window$1[Ajaxmark];
        }
      }
    }

    Window$1[Ajaxmark]++;
  } // if.

  var cbError = ctx.error || function () {};

  var cbSuccess = ctx.success || function () {};

  var cbComplete = ctx.complete || function () {};

  ctx.processData = ctx.hasOwnProperty('processData') ? ctx.processData : true; //
  // net transfer.

  var xhr = net_transfer.transfer(Window$1); // xhr.onload = function() {
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

var SPECIES$6 = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES$6];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod$3 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$3(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$3(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$3(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$3(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$3(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$3(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$3(6)
};

var $forEach = arrayIteration.forEach;



var STRICT_METHOD$2 = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH$2 = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
var arrayForEach = (!STRICT_METHOD$2 || !USES_TO_LENGTH$2) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
  forEach: arrayForEach
});

var $map = arrayIteration.map;



var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH$3 = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
var toIndex = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};

// IEEE754 conversions based on https://github.com/feross/ieee754
// eslint-disable-next-line no-shadow-restricted-names
var Infinity$1 = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor$2 = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity$1) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor$2(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity$1 : Infinity$1;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

var ieee754 = {
  pack: pack,
  unpack: unpack
};

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
var arrayFill = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
var defineProperty$4 = objectDefineProperty.f;




var getInternalState$1 = internalState.get;
var setInternalState$2 = internalState.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE$1 = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global_1[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global_1[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE$1];
var ObjectPrototype$1 = Object.prototype;
var RangeError$1 = global_1.RangeError;

var packIEEE754 = ieee754.pack;
var unpackIEEE754 = ieee754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty$4(Constructor[PROTOTYPE$1], key, { get: function () { return getInternalState$1(this)[key]; } });
};

var get$1 = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState$1(view);
  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
  var bytes = getInternalState$1(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set$2 = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState$1(view);
  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
  var bytes = getInternalState$1(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!arrayBufferNative) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState$2(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!descriptors) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState$1(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError$1('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError$1(WRONG_LENGTH);
    setInternalState$2(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!descriptors) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (descriptors) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE$1], {
    getInt8: function getInt8(byteOffset) {
      return get$1(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get$1(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set$2(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set$2(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set$2(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set$2(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE$1] = NativeArrayBuffer[PROTOTYPE$1];
    for (var keys$3 = getOwnPropertyNames$2(NativeArrayBuffer), j$1 = 0, key$1; keys$3.length > j$1;) {
      if (!((key$1 = keys$3[j$1++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key$1, NativeArrayBuffer[key$1]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (objectSetPrototypeOf && objectGetPrototypeOf($DataViewPrototype) !== ObjectPrototype$1) {
    objectSetPrototypeOf($DataViewPrototype, ObjectPrototype$1);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

var arrayBuffer = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

var ARRAY_BUFFER$1 = 'ArrayBuffer';
var ArrayBuffer$1 = arrayBuffer[ARRAY_BUFFER$1];
var NativeArrayBuffer$1 = global_1[ARRAY_BUFFER$1];

// `ArrayBuffer` constructor
// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor
_export({ global: true, forced: NativeArrayBuffer$1 !== ArrayBuffer$1 }, {
  ArrayBuffer: ArrayBuffer$1
});

setSpecies(ARRAY_BUFFER$1);

var ArrayBuffer$2 = arrayBuffer.ArrayBuffer;
var DataView$1 = arrayBuffer.DataView;
var nativeArrayBufferSlice = ArrayBuffer$2.prototype.slice;

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer$2(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice
_export({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice !== undefined && end === undefined) {
      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer$2))(toLength(fin - first));
    var viewSource = new DataView$1(this);
    var viewTarget = new DataView$1(result);
    var index = 0;
    while (first < fin) {
      viewTarget.setUint8(index++, viewSource.getUint8(first++));
    } return result;
  }
});

var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var f$6 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
	f: f$6
};

var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;

var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: nativeGetOwnPropertyNames$1
});

var arrayPush = [].push;
var min$3 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegexp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
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
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

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
      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
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
}, !SUPPORTS_Y);

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype.forEach = arrayForEach;
  }
}

var exception = /*#__PURE__*/function (_Error) {
  _inherits(exception, _Error);

  var _super = _createSuper(exception);

  /**
  * @desc: 构造异常对象.
  * @param msg: 异常消息
  * @param code: 异常代码
  * @param filename: 异常文件名
  * @param line: 异常文件所在行
  * @param column: 异常文件所在列
  * @return: 
  */
  function exception(msg, code, filename, line, column) {
    var _this;

    _classCallCheck(this, exception);

    _this = _super.call(this, code + " " + msg);
    _this.__tag = 'febs.exception';
    _this.code = code;
    _this.msg = msg;
    _this.filename = filename;
    _this.line = line;
    _this.column = column || 0;
    return _this;
  }
  /**
   * 判断是否是febs.exception异常实例.
   */


  _createClass(exception, null, [{
    key: "isInstance",
    value: function isInstance(e) {
      return e && e.__tag === 'febs.exception';
    }
    /**
    * @desc: 一般错误.
    */

  }, {
    key: "ERROR",
    get: function get() {
      return "error";
    }
    /**
    * @desc: 参数错误.
    */

  }, {
    key: "PARAM",
    get: function get() {
      return "param error";
    }
    /**
    * @desc: 越界
    * @return:
    */

  }, {
    key: "OUT_OF_RANGE",
    get: function get() {
      return "out of range";
    }
  }]);

  return exception;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var Window$2 = "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : undefined;
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

  if (!Window$2.self) {
    febsnet.support = {};
  } else {
    febsnet.support = {
      blob: 'FileReader' in Window$2.self && 'Blob' in Window$2.self && function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      }(),
      formData: 'FormData' in Window$2.self,
      arrayBuffer: 'ArrayBuffer' in Window$2.self
    };
  }

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

  Window$2.Headers = febsnet.Headers;
  Window$2.Request = febsnet.Request;
  Window$2.Response = febsnet.Response;

  Window$2.fetch = febsnet.fetch = function (input, init) {
    // other.
    return new Promise(function (resolve, reject) {
      var request;

      if (febsnet.Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new febsnet.Request(input, init);
      }

      var xhr = net_transfer.transfer(Window$2);

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
            reject(new exception('Network request failed', 'NetworkFailed', __filename, __line, __column));
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
        reject(new exception('Network timeout', 'NetworkTimeout', __filename, __line, __column));
      };

      xhr.onerror = function () {
        reject(new exception('Network request failed', 'NetworkFailed', __filename, __line, __column));
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

var Window$3 = "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : undefined;
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
    delete Window$3[functionName];
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

    Window$3[callbackFunction] = function (response) {
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

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED$2 }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH$4 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max$3 = Math.max;
var min$4 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$4 }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$4(max$3(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var FAILS_ON_PRIMITIVES$1 = fails(function () { objectGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !correctPrototypeGetter }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return objectGetPrototypeOf(toObject(it));
  }
});

var Window$4 = "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : undefined; // - parentNodes 父节点 (HTMLNode)
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
      elems = Window$4.document.getElementsByClassName(name);
    } else if (1 == tag) {
      elems = Window$4.document.getElementById(name);
      if (elems) elems = [elems];else elems = [];
    } else if (0 == tag) {
      elems = Window$4.document.getElementsByTagName(name);
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
      _elem = Window$4.document.createElement('div');
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
    return obj == Window$4 || obj == document;
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
    if (name === Window$4.document || name == Window$4) {
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

    if (name === Window$4.document) {
      this.ready = function (f) {
        if (f) {
          if (Window$4.addEventListener) Window$4.document.addEventListener('DOMContentLoaded', f);else Window$4.document.attachEvent('onload', f);
        } else {
          _this.trigger('ready');
        }

        return _this;
      };

      this.unload = function (f) {
        if (f) {
          if (Window$4.addEventListener) Window$4.document.addEventListener('unload', f);else Window$4.document.attachEvent('onunload', f);
        } else {
          _this.trigger('unload');
        }

        return _this;
      };

      this.context = Window$4.document;
    } else if (name === Window$4) {
      this.unload = function (f) {
        if (f) {
          if (Window$4.addEventListener) Window$4.addEventListener('unload', f);else Window$4.attachEvent('onunload', f);
        } else {
          _this.trigger('unload');
        }

        return _this;
      };
    } else {
      this.context = Window$4.document;
    }

    if (typeof name === 'function') {
      var foo = function foo(e) {
        name.bind(_this)(e);
        if (Window$4.addEventListener) Window$4.document.removeEventListener('DOMContentLoaded', foo);else Window$4.document.detachEvent('onload', foo);
      };

      if (Window$4.addEventListener) Window$4.document.addEventListener('DOMContentLoaded', foo);else Window$4.document.attachEvent('onload', foo);
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

      for (var i = _thisLength - 1; i >= 0; i--) {
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
            if (!Window$4.document.addEventListener) {
              ee.fireEvent('on' + eventname);
            } else {
              var env = Window$4.document.createEvent('HTMLEvents');
              env.initEvent(eventname, true, true);
              ee.dispatchEvent(env);
            }
          } else {
            if (ee.__events && ee.__events[eventname]) {
              var env = ee.__events[eventname];
              var j;
              var enve; // if (!Window.document.addEventListener) {

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
              //   enve = Window.document.createEvent('HTMLEvents');
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
          if (elem.parentNode == Window$4 || elem.parentNode == Window$4.document) break;

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
      o = utils_1$1.mergeMap(o, arguments[i]);
    }

    return o;
  } // if..else.

};
/**
* @desc: viewport.
* @return: {width, height}
*/


Dom.getViewPort = function () {
  if (Window$4.document.compatMode == "BackCompat") {
    //浏览器嗅探，混杂模式
    return {
      width: Window$4.document.body.clientWidth,
      height: Window$4.document.body.clientHeight
    };
  } else {
    return {
      width: Window$4.document.documentElement.clientWidth,
      height: Window$4.document.documentElement.clientHeight
    };
  }
};
/**
* @desc: documentport.
* @return: {width, height}
*/


Dom.getDocumentPort = function () {
  if (Window$4.document.compatMode == "BackCompat") {
    return {
      width: Window$4.document.body.scrollWidth,
      height: Window$4.document.body.scrollHeight
    };
  } else {
    return {
      width: Math.max(Window$4.document.documentElement.scrollWidth, Window$4.document.documentElement.clientWidth),
      height: Math.max(Window$4.document.documentElement.scrollHeight, Window$4.document.documentElement.clientHeight)
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

  if (Window$4.document.compatMode == "BackCompat") {
    elementScrollLeft = Window$4.document.body.scrollLeft;
    elementScrollTop = Window$4.document.body.scrollTop;
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

      if (Window$4.document.compatMode == "BackCompat") {
        elementScrollLeft = Window$4.document.body.scrollLeft;
        elementScrollTop = Window$4.document.body.scrollTop;
      } else {
        elementScrollLeft = Window$4.document.documentElement.scrollLeft == 0 ? Window$4.document.body.scrollLeft : Window$4.document.documentElement.scrollLeft;
        elementScrollTop = Window$4.document.documentElement.scrollTop == 0 ? Window$4.document.body.scrollTop : Window$4.document.documentElement.scrollTop;
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

var Window$5 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : undefined;

if (!Window$5.__line) {
  Window$5.__line = undefined;
  Window$5.__column = undefined;
} // require('core-js/stable');
// require('regenerator-runtime/runtime');
// require('core-js/modules/es.global-this');
// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');
//
// define the animationFrame.
//
// define the __debug.


if (!Window$5['__debug']) {
  Window$5.__debug = false;
} //
// define the animationFrame.


if (!Window$5['requestAnimationFrame']) Window$5.requestAnimationFrame = animationFrame_1.requestAnimationFrame;
if (!Window$5['cancelAnimationFrame']) Window$5.cancelAnimationFrame = animationFrame_1.cancelAnimationFrame;
var febs = {};
febs.__debug = Window$5.__debug;
febs.date = date_1;
febs.utils = utils_1$1;
febs.string = string_1$1;
febs.crypt = febs.utils.mergeMap(crypt_1, crypt_md5, crypt_sha1);
febs.net = net_1;
febs['$'] = dom.CreateDom;
febs.dom = dom.Dom;
febs.exception = exception;
if (!Window$5['febs']) Window$5['febs'] = febs;else {
  Window$5['febs'].string = Window$5['febs'].string ? febs.utils.mergeMap(Window$5['febs'].string, febs.string) : febs.string;
  Window$5['febs'].crypt = Window$5['febs'].crypt ? febs.utils.mergeMap(Window$5['febs'].crypt, febs.crypt) : febs.crypt;
  Window$5['febs'].utils = Window$5['febs'].utils ? febs.utils.mergeMap(Window$5['febs'].utils, febs.utils) : febs.utils;
  Window$5['febs'].net = Window$5['febs'].net ? febs.utils.mergeMap(Window$5['febs'].net, febs.net) : febs.net;
  Window$5['febs'].dom = Window$5['febs'].dom ? febs.utils.mergeMap(Window$5['febs'].dom, febs.dom) : febs.dom;
  Window$5['febs'].exception = Window$5['febs'].exception ? febs.utils.mergeMap(Window$5['febs'].exception, febs.exception) : febs.exception;
}
if (!Window$5['$']) Window$5['$'] = febs['$'];
if (!Window$5['jQuery']) Window$5['jQuery'] = febs['$']; //
// debug.
//
// if (!console.debug) {

if (Window$5.console) {
  Window$5.console.debug = function () {
    if (Window$5.__debug) {
      var logfoo;
      if (Window$5.console.warn) logfoo = Window$5.console.warn;else logfoo = Window$5.console.log;

      for (var i = 0; i < arguments.length; i++) {
        logfoo(arguments[i]);
      }
    }
  };
} // }


var __debug = febs.__debug;
var date$1 = febs.date;
var utils$1 = febs.utils;
var string$1 = febs.string;
var crypt$1 = febs.crypt;
var net$4 = febs.net;
var $ = febs['$'];
var dom$1 = febs.dom;
var exception$1 = febs.exception;

var index_base = /*#__PURE__*/Object.freeze({
	__proto__: null,
	__debug: __debug,
	date: date$1,
	utils: utils$1,
	string: string$1,
	crypt: crypt$1,
	net: net$4,
	$: $,
	dom: dom$1,
	exception: exception$1
});

var floor$3 = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.github.io/ecma262/#sec-number.isinteger
var isInteger = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor$3(it) === it;
};

// `Number.isInteger` method
// https://tc39.github.io/ecma262/#sec-number.isinteger
_export({ target: 'Number', stat: true }, {
  isInteger: isInteger
});

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
var thisNumberValue = function (value) {
  if (typeof value != 'number' && classofRaw(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
var stringRepeat = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

var nativeToFixed = 1.0.toFixed;
var floor$4 = Math.floor;

var pow$1 = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow$1(x, n - 1, acc * x) : pow$1(x * x, n / 2, acc);
};

var log$1 = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var FORCED$3 = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
_export({ target: 'Number', proto: true, forced: FORCED$3 }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor$4(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor$4(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + stringRepeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log$1(number * pow$1(2, 69, 1)) - 69;
      z = e < 0 ? number * pow$1(2, -e, 1) : number / pow$1(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow$1(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + stringRepeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + stringRepeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var ITERATOR$3 = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ( !has(IteratorPrototype, ITERATOR$3)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis$1 = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$4]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
  }
  iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$3 = internalState.set;
var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$3(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$2(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
iterators.Arguments = iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var nativeReverse = [].reverse;
var test$1 = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
_export({ target: 'Array', proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});

var defineProperty$5 = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty$5(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
var sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

// @@search logic
fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regexpExecAbstract(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var quot = /"/g;

// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
// https://tc39.github.io/ecma262/#sec-createhtml
var createHtml = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
var stringHtmlForced = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};

// `String.prototype.sub` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sub
_export({ target: 'String', proto: true, forced: stringHtmlForced('sub') }, {
  sub: function sub() {
    return createHtml(this, 'sub', '', '');
  }
});

var defineProperty$6 = objectDefineProperty.f;





var Int8Array$1 = global_1.Int8Array;
var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
var Uint8ClampedArray = global_1.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype$2 = Object.prototype;
var isPrototypeOf = ObjectPrototype$2.isPrototypeOf;

var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferNative && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME$1;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof(it);
  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (objectSetPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME$1)) {
    var TypedArrayConstructor = global_1[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!descriptors) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global_1[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!descriptors) return;
  if (objectSetPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global_1[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array$1[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global_1[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME$1 in TypedArrayConstructorsList) {
  if (!global_1[NAME$1]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
    if (global_1[NAME$1]) objectSetPrototypeOf(global_1[NAME$1], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$2) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
    if (global_1[NAME$1]) objectSetPrototypeOf(global_1[NAME$1].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (descriptors && !has(TypedArrayPrototype, TO_STRING_TAG$3)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty$6(TypedArrayPrototype, TO_STRING_TAG$3, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME$1 in TypedArrayConstructorsList) if (global_1[NAME$1]) {
    createNonEnumerableProperty(global_1[NAME$1], TYPED_ARRAY_TAG, NAME$1);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};

/* eslint-disable no-new */



var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer$3 = global_1.ArrayBuffer;
var Int8Array$2 = global_1.Int8Array;

var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
  Int8Array$2(1);
}) || !fails(function () {
  new Int8Array$2(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array$2();
  new Int8Array$2(null);
  new Int8Array$2(1.5);
  new Int8Array$2(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array$2(new ArrayBuffer$3(2), 1, undefined).length !== 1;
});

var toPositiveInteger = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};

var toOffset = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};

var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

var typedArrayFrom = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = functionBindContext(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor$1(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};

var typedArrayConstructor = createCommonjsModule(function (module) {


















var getOwnPropertyNames = objectGetOwnPropertyNames.f;

var forEach = arrayIteration.forEach;






var getInternalState = internalState.get;
var setInternalState = internalState.set;
var nativeDefineProperty = objectDefineProperty.f;
var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var round = Math.round;
var RangeError = global_1.RangeError;
var ArrayBuffer = arrayBuffer.ArrayBuffer;
var DataView = arrayBuffer.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = arrayBufferViewCore.TypedArray;
var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = arrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (descriptors) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
    objectDefineProperty.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  _export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
    } else if (typedArrayConstructorsRequireWrappers) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    _export({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };
});

// `Uint32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
typedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var min$5 = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min$5((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
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

var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod$1('copyWithin', function copyWithin(target, start /* , end */) {
  return arrayCopyWithin.call(aTypedArray$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});

var $every = arrayIteration.every;

var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod$2('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray$2(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod$3('fill', function fill(value /* , start, end */) {
  return arrayFill.apply(aTypedArray$3(this), arguments);
});

var $filter = arrayIteration.filter;


var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod$4('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor$2(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
});

var $find = arrayIteration.find;

var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod$5('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray$5(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var $findIndex = arrayIteration.findIndex;

var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod$6('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var $forEach$1 = arrayIteration.forEach;

var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod$7('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach$1(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

var $includes = arrayIncludes.includes;

var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod$8('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

var $indexOf$1 = arrayIncludes.indexOf;

var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod$9('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf$1(aTypedArray$9(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

var ITERATOR$5 = wellKnownSymbol('iterator');
var Uint8Array = global_1.Uint8Array;
var arrayValues = es_array_iterator.values;
var arrayKeys = es_array_iterator.keys;
var arrayEntries = es_array_iterator.entries;
var aTypedArray$a = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR$5];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray$a(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod$a('entries', function entries() {
  return arrayEntries.call(aTypedArray$a(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod$a('keys', function keys() {
  return arrayKeys.call(aTypedArray$a(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod$a('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod$a(ITERATOR$5, typedArrayValues, !CORRECT_ITER_NAME);

var aTypedArray$b = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;
var $join = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod$b('join', function join(separator) {
  return $join.apply(aTypedArray$b(this), arguments);
});

var min$6 = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO$1 = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD$3 = arrayMethodIsStrict('lastIndexOf');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
var FORCED$4 = NEGATIVE_ZERO$1 || !STRICT_METHOD$3 || !USES_TO_LENGTH$5;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
var arrayLastIndexOf = FORCED$4 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO$1) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min$6(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;

var aTypedArray$c = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod$c('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return arrayLastIndexOf.apply(aTypedArray$c(this), arguments);
});

var $map$1 = arrayIteration.map;


var aTypedArray$d = arrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod$d('map', function map(mapfn /* , thisArg */) {
  return $map$1(aTypedArray$d(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (aTypedArrayConstructor$3(speciesConstructor(O, O.constructor)))(length);
  });
});

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$4 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$4(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$4(true)
};

var $reduce = arrayReduce.left;

var aTypedArray$e = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$e = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod$e('reduce', function reduce(callbackfn /* , initialValue */) {
  return $reduce(aTypedArray$e(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

var $reduceRight = arrayReduce.right;

var aTypedArray$f = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$f = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod$f('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return $reduceRight(aTypedArray$f(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

var aTypedArray$g = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$g = arrayBufferViewCore.exportTypedArrayMethod;
var floor$5 = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod$g('reverse', function reverse() {
  var that = this;
  var length = aTypedArray$g(that).length;
  var middle = floor$5(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});

var aTypedArray$h = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$h = arrayBufferViewCore.exportTypedArrayMethod;

var FORCED$5 = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod$h('set', function set(arrayLike /* , offset */) {
  aTypedArray$h(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED$5);

var aTypedArray$i = arrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;
var $slice = [].slice;

var FORCED$6 = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod$i('slice', function slice(start, end) {
  var list = $slice.call(aTypedArray$i(this), start, end);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor$4(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED$6);

var $some = arrayIteration.some;

var aTypedArray$j = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$j = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod$j('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray$j(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

var aTypedArray$k = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$k = arrayBufferViewCore.exportTypedArrayMethod;
var $sort = [].sort;

// `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod$k('sort', function sort(comparefn) {
  return $sort.call(aTypedArray$k(this), comparefn);
});

var aTypedArray$l = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$l = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod$l('subarray', function subarray(begin, end) {
  var O = aTypedArray$l(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  return new (speciesConstructor(O, O.constructor))(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});

var Int8Array$3 = global_1.Int8Array;
var aTypedArray$m = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$m = arrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice$1 = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array$3 && fails(function () {
  $toLocaleString.call(new Int8Array$3(1));
});

var FORCED$7 = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array$3.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
}, FORCED$7);

var exportTypedArrayMethod$n = arrayBufferViewCore.exportTypedArrayMethod;



var Uint8Array$1 = global_1.Uint8Array;
var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod$n('toString', arrayToString, IS_NOT_ARRAY_METHOD);

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
_export({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return URL.prototype.toString.call(this);
  }
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

var utils_bigint = createCommonjsModule(function (module, exports) {
  /**
   * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
   * Author: lipengxiang
   * Desc:
   */

  exports.BigNumber = bignumber;
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
      if (v.length > 100 || v.length < 1) return false;

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
var utils_bigint_1 = utils_bigint.BigNumber;
var utils_bigint_2 = utils_bigint.bigint;
var utils_bigint_3 = utils_bigint.bigint_check;
var utils_bigint_4 = utils_bigint.bigint_add;
var utils_bigint_5 = utils_bigint.bigint_minus;
var utils_bigint_6 = utils_bigint.bigint_dividedBy;
var utils_bigint_7 = utils_bigint.bigint_mul;
var utils_bigint_8 = utils_bigint.bigint_equal;
var utils_bigint_9 = utils_bigint.bigint_more_than;
var utils_bigint_10 = utils_bigint.bigint_more_than_e;
var utils_bigint_11 = utils_bigint.bigint_less_than;
var utils_bigint_12 = utils_bigint.bigint_less_than_e;
var utils_bigint_13 = utils_bigint.bigint_mod;
var utils_bigint_14 = utils_bigint.bigint_toFixed;

var BigNumber = utils_bigint.BigNumber;
var __debug$1 = index_base.__debug;
var date$2 = index_base.date;
var utils$2 = index_base.utils.mergeMap(index_base.utils, utils_bigint);
var string$2 = index_base.string;
var crypt$2 = index_base.crypt;
var net$5 = index_base.net;
var $$1 = index_base['$'];
var dom$2 = index_base.dom;
var exception$2 = index_base.exception;

export { $$1 as $, BigNumber, __debug$1 as __debug, crypt$2 as crypt, date$2 as date, dom$2 as dom, exception$2 as exception, net$5 as net, string$2 as string, utils$2 as utils };
//# sourceMappingURL=index.esm.js.map
