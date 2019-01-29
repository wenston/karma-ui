(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue/dist/vue.esm.js"));
	else if(typeof define === 'function' && define.amd)
		define("karma-ui", ["vue/dist/vue.esm.js"], factory);
	else if(typeof exports === 'object')
		exports["karma-ui"] = factory(require("vue/dist/vue.esm.js"));
	else
		root["karma-ui"] = factory(root["vue/dist/vue.esm.js"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_95__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 114);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(65);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(41)('wks');
var uid = __webpack_require__(29);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return setStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return offset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return scroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return client; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);

var setStyle = function setStyle(el, p, value) {
  if ((typeof p === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(p)) === 'object') {
    for (var k in p) {
      el.style[k] = p[k];
    }
  } else {
    el.style[p] = value;
  }
};

var getStyle = function getStyle(elem, prop) {
  return window.getComputedStyle(elem, null)[prop];
};

var offset = function offset(elem, parent) {
  var left = elem.offsetLeft,
      top = elem.offsetTop,
      cur = elem.offsetParent;
  if (!parent) {

    while (cur) {
      left += cur.offsetLeft;
      top += cur.offsetTop;
      cur = cur.offsetParent;
    }
  } else {
    while (cur != parent) {
      left += cur.offsetLeft;
      top += cur.offsetTop;
      cur = cur.offsetParent;
    }
  }
  return {
    left: left,
    top: top
  };
};

var scroll = function scroll() {
  return {
    top: Math.max(document.documentElement.scrollTop, document.body.scrollTop),
    left: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)
  };
};

var client = function client() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(3);
var ctx = __webpack_require__(12);
var hide = __webpack_require__(13);
var has = __webpack_require__(15);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(66);
var toPrimitive = __webpack_require__(36);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(16)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(68);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/

module.exports = function mergeJSXProps (objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp
    for (key in b) {
      aa = a[key]
      bb = b[key]
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa
            a[key] = aa = {}
            aa[temp] = true
          }
          if (typeof bb === 'string') {
            temp = bb
            b[key] = bb = {}
            bb[temp] = true
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey])
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb)
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb)
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey]
          }
        }
      } else {
        a[key] = b[key]
      }
    }
    return a
  }, {})
}

function mergeFn (a, b) {
  return function () {
    a && a.apply(this, arguments)
    b && b.apply(this, arguments)
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(19);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(37);
var defined = __webpack_require__(38);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'KIcon',
  props: {
    size: [String, Number],
    color: String,
    name: String,
    weight: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var $props = this.$props,
        $listeners = this.$listeners;

    var iconProps = {
      on: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, $listeners),
      class: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({
        'iconfont': true
      }, $props.name, !!$props.name),
      style: {
        'font-size': parseFloat($props.size) + 'px',
        'color': $props.color,
        'font-weight': $props.weight ? 'bold' : ''
      }
    };
    return h('i', iconProps);
  }
});

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_input_jsx_vue__ = __webpack_require__(69);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_input_jsx_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/input/input.jsx.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f1e04846", Component.options)
  } else {
    hotAPI.reload("data-v-f1e04846", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(15);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(12);
var call = __webpack_require__(83);
var isArrayIter = __webpack_require__(84);
var anObject = __webpack_require__(14);
var toLength = __webpack_require__(28);
var getIterFn = __webpack_require__(85);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(67);
var enumBugKeys = __webpack_require__(42);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(39);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(38);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(131)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(45)(String, 'String', function (iterated) {
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return props; });
var props = {
  //是否为自动宽的表格：table-layout:auto,默认否
  tableLayoutAuto: Boolean,
  //原始数据
  data: Array,
  //列名及对应的描述
  //field必须要有
  //style里的宽度如果没有指定，则会有一个默认的120px的宽度，见colGroup.jsx
  /**
   *
   *  [{field:'字段名',name:'字段描述',scopedSlots:'slotName',style:{},sum:true}]
   * sum：是否需要汇总，类型：Boolean,String,Number,Function
   */
  columns: Array,
  //是否有边框
  bordered: {
    type: Boolean,
    default: true
  },
  //表格尺寸
  size: {
    type: String,
    default: "medium"
  },
  //是否有斑马线
  stripe: {
    type: Boolean,
    default: true
  },
  //是否鼠标滑入变色
  hover: {
    type: Boolean,
    default: true
  },
  //是否有序号index
  hasIndex: {
    type: Boolean,
    default: false
  },
  //序号index对应的表头描述
  indexText: {
    type: String,
    default: "#"
  },
  //是否支持复选框，支持复选时，单选就不起作用
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  //支持复选的情况下，需指定一个唯一标示的key，默认是Id，可以自定义
  //自定义的情况下，可以是多个key以逗号分隔，如：'ProId,StoreId'
  //从而确保key的唯一性
  checkboxKey: {
    type: String,
    default: "Id"
  },
  //支持单选的情况下，需指定一个唯一的标示，同checkboxKey
  radioKey: {
    type: String,
    default: 'Id'
  },
  //是否支持单选
  hasRadio: {
    type: Boolean,
    default: false
  },
  //单选时，选中的radioKey对应的值
  currentValue: {
    type: [Number, String]
  },
  //表格宽度，默认情况下：是100%，即：各个列都是等宽
  //，且各个列的宽之和是等于表格总宽度的
  //取值是css的width可以接收的任何属性
  //fixed情况下，无默认宽度
  //对应的是table的宽度是不是min-content，默认是100%

  minContent: Boolean,
  //表格主题tbody高度，有高度的情况下，可以实现表头固定
  //NOTE: 是给表格主题外部div的高度
  height: {
    type: String,
    default: ""
  },
  maxHeight: {
    type: String,
    default: ""
  },
  //是否允许文本换行
  nowrap: {
    type: Boolean,
    default: false
  },
  //tfoot 合计的文本描述
  sumText: {
    type: String,
    default: "合计"
  },
  //可调整列宽
  resizeWidth: Boolean
};

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_icon_icon__ = __webpack_require__(18);



/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    KIcon: __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_icon_icon__["a" /* default */]
  },
  name: "KButton",
  props: {
    tag: {
      type: String,
      default: "button"
    },
    type: {
      type: String,
      default: "default" //primary,warning,danger,default
    },
    size: {
      type: String,
      default: "medium" //huge,large,big,medium,small,mini
    },
    block: Boolean,
    disabled: Boolean,
    loading: Boolean,
    href: String,
    target: String,
    loadingIconName: {
      type: String,
      default: "k-icon-loading"
    }
  },
  computed: {
    classes: function classes() {
      var _ref;

      return _ref = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-btn", true), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-btn--" + this.type, true), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-btn--" + this.size, true), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-btn--block", this.block), _ref;
    },
    iconSize: function iconSize() {
      return {
        huge: 21,
        large: 18,
        big: 15,
        medium: 12,
        small: 12,
        mini: 12
      };
    },
    iconColor: function iconColor() {
      return {
        primary: "white",
        warning: "white",
        danger: "white",
        success: "white",
        default: "#666"
      };
    }
  },
  render: function render() {
    var h = arguments[0];
    var classes = this.classes,
        $slots = this.$slots,
        $attrs = this.$attrs,
        $listeners = this.$listeners,
        loadingIconName = this.loadingIconName;

    var LoadingComp = null;
    var Content = null;
    if (this.loading) {
      LoadingComp = h("k-icon", {
        "class": "k-btn__loading",
        attrs: { color: this.iconColor[this.type],
          size: this.iconSize[this.size],
          name: loadingIconName
        }
      });
    }
    if (this.$slots.default) {
      Content = h("span", [$slots.default]);
    }
    var buttonProps = {
      class: classes,
      attrs: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, $attrs, {
        href: this.href,
        target: this.target,
        disabled: this.loading || this.disabled
      }),
      on: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, $listeners, {
        click: this.handleClick
      })
    };
    return h(
      this.tag,
      buttonProps,
      [Content, LoadingComp]
    );
  },

  methods: {
    handleClick: function handleClick(e) {
      if (!this.disabled) this.$emit("click", e);
    }
  }
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(41)('keys');
var uid = __webpack_require__(29);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(3);
var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(22) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(129);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(137);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(70);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(24);
var $iterCreate = __webpack_require__(132);
var setToStringTag = __webpack_require__(25);
var getPrototypeOf = __webpack_require__(134);
var ITERATOR = __webpack_require__(4)('iterator');
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(14);
var dPs = __webpack_require__(133);
var enumBugKeys = __webpack_require__(42);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(35)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(71).appendChild(iframe);
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
var global = __webpack_require__(1);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(24);
var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(4);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(29)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(15);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(16)(function () {
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(3);
var LIBRARY = __webpack_require__(22);
var wksExt = __webpack_require__(48);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return merge; });
/* unused harmony export assign */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);

//浅合并
var merge = function merge() {
  for (var _len = arguments.length, arrObj = Array(_len), _key = 0; _key < _len; _key++) {
    arrObj[_key] = arguments[_key];
  }

  var i = 1,
      len = arrObj.length;
  if (len <= 1) return;
  var obj = arrObj[0];
  for (; i < len; i++) {
    for (var k in arrObj[i]) {
      obj[k] = arrObj[i][k];
    }
  }
  return obj;
};

//Object.assign的polyfill
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
var assign = function assign() {
  if (typeof __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default.a != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {
        // .length of function is 2
        'use strict';

        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default.a;
};

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_select_vue__ = __webpack_require__(75);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_select_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/select/select.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5bd6c866", Component.options)
  } else {
    hotAPI.reload("data-v-5bd6c866", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_option_vue__ = __webpack_require__(77);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_option_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/option/option.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5558a374", Component.options)
  } else {
    hotAPI.reload("data-v-5558a374", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_radio_vue__ = __webpack_require__(79);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_b8d820c4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_radio_vue__ = __webpack_require__(151);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_radio_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_b8d820c4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_radio_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/radio/radio.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b8d820c4", Component.options)
  } else {
    hotAPI.reload("data-v-b8d820c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_checkbox_vue__ = __webpack_require__(80);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_b40adff4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_checkbox_vue__ = __webpack_require__(153);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_checkbox_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_b40adff4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_checkbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/checkbox/checkbox.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b40adff4", Component.options)
  } else {
    hotAPI.reload("data-v-b40adff4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(159);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(4)('toStringTag');
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
/* 59 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(19);

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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(207), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'KColGroup',
  props: {
    columns: Array
  },
  methods: {
    renderCols: function renderCols() {
      var h = this.$createElement;

      return this.columns.map(function (col) {
        var _width$col$style = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ width: 120 }, col.style),
            width = _width$col$style.width,
            restStyle = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(_width$col$style, ['width']);

        return h('col', {
          attrs: { width: width }
        });
      });
    }
  },
  render: function render() {
    var h = arguments[0];

    return h('colgroup', [this.renderCols()]);
  }
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'KCell',
  props: {
    tag: {
      type: String,
      default: 'td'
    },
    rowspan: [String, Number],
    colspan: [String, Number],
    resizeWidth: Boolean
  },
  methods: {
    resizeElem: function resizeElem() {
      var _this = this;

      var h = this.$createElement;

      var p = {
        class: {
          'k-table-resize': true
        },
        on: {
          mousedown: function mousedown(e) {
            _this.$emit('handleResizeDown', e, _this.$el);
          }
        }
      };
      if (this.resizeWidth && this.colspan - 1 <= 0) {

        return h('div', p);
      }
    }
  },
  render: function render() {
    var h = arguments[0];

    var p = {
      attrs: {
        rowspan: this.rowspan,
        colspan: this.colspan
      },
      class: {
        'k-table-td-relative': this.resizeWidth
      }
    };
    return h(
      this.tag,
      p,
      [this.$slots.default, this.resizeElem()]
    );
  }
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(16)(function () {
  return Object.defineProperty(__webpack_require__(35)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(15);
var toIObject = __webpack_require__(17);
var arrayIndexOf = __webpack_require__(123)(false);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_mixins_validate_js__ = __webpack_require__(128);




/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_2_karma_ui_mixins_validate_js__["a" /* validate */]],
  name: "KInput",
  inheritAttrs: false,
  data: function data() {
    return {
      oldValue: ""
    };
  },

  model: {
    prop: "value",
    event: "bianbianbian"
  },
  props: {
    tag: {
      type: String,
      default: "input"
    },
    value: {
      type: [Number, String, Boolean],
      default: void 0
    },
    name: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    autofocus: Boolean,
    select: Boolean,
    autocomplete: {
      type: String,
      default: "on"
    },
    type: {
      type: String,
      default: "text"
    },
    maxlength: [String, Number],
    minlength: [String, Number],
    clearable: Boolean,
    block: Boolean,
    size: {
      type: String,
      default: "small"
    },
    styles: Object,
    inputStyles: Object
  },
  computed: {
    isInput: function isInput() {
      return this.tag.toLowerCase() === "input";
    }
  },
  render: function render() {
    var _this = this,
        _ref,
        _ref2;

    var h = arguments[0];

    var directives = [{
      name: "select",
      value: { select: this.select }
    }];
    var prepend = null,
        append = null;
    if (this.isInput) {
      if (this.$slots.prepend) {
        prepend = h(
          "div",
          { "class": "k-input-prepend" },
          [this.$slots.prepend]
        );
      }
      if (this.$slots.append || this.$slots.default) {
        append = h(
          "div",
          { "class": "k-input-append" },
          [this.$slots.append || this.$slots.default]
        );
      }
      if (this.clearable && (this.value + "").trim() !== "") {
        append = h("i", __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props___default()([{ "class": "k-input-clearable k-icon-close iconfont" }, {
          on: {
            "click": function click($event) {
              for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                attrs[_key - 1] = arguments[_key];
              }

              _this.toClear.apply(_this, [$event].concat(attrs));
            }
          }
        }]));
      }
    }
    return h(
      "div",
      {
        "class": (_ref = {
          "k-input-section": true
        }, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, "k-input-" + this.size, true), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, "k-input-block", this.block), _ref),
        style: this.styles
      },
      [prepend, append, h(this.tag, __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props___default()([{ directives: directives }, { attrs: this.$props }, {
        domProps: {
          "value": this.value,
          "disabled": this.disabled
        },

        "class": (_ref2 = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref2, this.isInput ? "k-input" : "k-textarea", true), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref2, "k-input-disabled", this.disabled), _ref2),
        style: this.inputStyles,

        ref: "input"
      }, {
        on: {
          "input": function input($event) {
            for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              attrs[_key2 - 1] = arguments[_key2];
            }

            (function () {
              return _this.handlerEvent($event);
            }).apply(undefined, [$event].concat(attrs));
          },
          "change": function change($event) {
            for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              attrs[_key3 - 1] = arguments[_key3];
            }

            _this.handlerEvent.apply(_this, [$event].concat(attrs));
          },
          "keyup": function keyup($event) {
            for (var _len4 = arguments.length, attrs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
              attrs[_key4 - 1] = arguments[_key4];
            }

            _this.handlerEvent.apply(_this, [$event].concat(attrs));
          },
          "keydown": function keydown($event) {
            for (var _len5 = arguments.length, attrs = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
              attrs[_key5 - 1] = arguments[_key5];
            }

            _this.handlerEvent.apply(_this, [$event].concat(attrs));
          },
          "keypress": function keypress($event) {
            for (var _len6 = arguments.length, attrs = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
              attrs[_key6 - 1] = arguments[_key6];
            }

            _this.handlerEvent.apply(_this, [$event].concat(attrs));
          },
          "blur": function blur($event) {
            for (var _len7 = arguments.length, attrs = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
              attrs[_key7 - 1] = arguments[_key7];
            }

            _this.handlerEvent.apply(_this, [$event].concat(attrs));
          },
          "focus": function focus($event) {
            for (var _len8 = arguments.length, attrs = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
              attrs[_key8 - 1] = arguments[_key8];
            }

            _this.handlerEvent.apply(_this, [$event].concat(attrs));
          }
        }
      }]))]
    );
  },

  methods: {
    _successCallback: function _successCallback() {
      //触发自定义valid事件
      this.$emit("valid", this.value);
    },
    _errorCallback: function _errorCallback(errorType) {
      var _this2 = this;

      if (errorType) {
        if (errorType.digits) {
          //如果是小数位数问题
          this.oldValue = parseFloat(this.oldValue).toFixed(errorType.digits);
        } else if (errorType.clear) {
          //清空
          this.oldValue = "";
        } else if (errorType.value) {
          this.oldValue = errorType.value;
        }
      }
      // console.log(this.oldValue)
      setTimeout(function () {
        _this2.$emit("bianbianbian", _this2.validateOptions.useOldValue ? _this2.oldValue : "");
        //触发自定义invalid事件
        _this2.$emit("invalid", _this2.value);
      });
    },
    handlerEvent: function handlerEvent(e) {
      var eType = e.type;
      var val = (e.target.value + "").trim();
      //给v-model绑定的属性写入值
      if (eType === "input") {
        // console.log(val)
        this.$emit("bianbianbian", val);
      }
      //验证用户输入
      if (this.needValidate && eType === this.validateOptions.when.toLowerCase()) {
        this.toValidate(
        //需要验证的那个值
        val,
        //输入有效时的回调
        this._successCallback,
        //输入无效时的回调
        this._errorCallback);
      }
      //向外发自定义事件，input/keyup/change等等类似原生的事件
      // console.log(eType)
      this.$emit(eType, e);
    },
    toClear: function toClear() {
      this.$emit("bianbianbian", "");
    },
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    onSelect: function onSelect() {
      this.$refs.input.select();
    },
    getInputElement: function getInputElement() {
      return this.$refs.input;
    }
  },
  watch: {
    value: function value(val, oldVal) {
      // console.log(val)
      var old = oldVal;
      if (this.isIntOrCurrency) {
        old = parseFloat(old);
        old = isNaN(old) ? "" : old < 0 ? "" : old;
      }
      this.oldValue = old;
    }
  },
  directives: {
    select: {
      inserted: function inserted(el, binding) {
        if (binding.value.select) {
          el.select();
        }
      }
    }
  }
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(67);
var hiddenKeys = __webpack_require__(42).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_input_input_jsx_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_clickoutside_js__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_util_esc_js__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_option_index__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_icon_icon__ = __webpack_require__(18);








/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KSelect",
  components: {
    ZInput: __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_input_input_jsx_vue__["a" /* default */],
    KIcon: __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_icon_icon__["a" /* default */]
  },
  model: {
    prop: "modelKey",
    event: "modelKeyChange"
  },
  props: {
    size: String,
    value: {
      type: [Number, String, Boolean],
      default: void 0
    },
    modelKey: {
      type: [Number, String],
      default: void 0
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    styles: Object,
    disabled: Boolean,
    clearable: Boolean
  },
  data: function data() {
    return {
      modelValue: "",
      showOptionList: false,
      showDelete: false,
      //optionWrapper实例及里边包含的option列表实例
      ins: Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_option_index__["b" /* optionWrapper */])(),
      options: [], //收集本组件下属的所有option组件
      optionCompName: "",
      isMouseDownOption: false
    };
  },

  computed: {
    ifOptionList: function ifOptionList() {
      return this.showOptionList && this.$slots.default;
    }
  },
  methods: {
    clear: function clear() {
      this._change({});
      this.showDelete = false;
    },
    showDeleteBtn: function showDeleteBtn() {
      if (this.clearable && this.modelKey !== "" && this.modelKey !== undefined) {
        this.showDelete = true;
      }
    },
    hideDeleteBtn: function hideDeleteBtn() {
      if (this.clearable && this.modelKey !== "" && this.modelKey !== undefined) {
        this.showDelete = false;
      }
    },
    showList: function showList() {
      if (!this.disabled) {
        this.showOptionList = true;
      }
    },
    hideList: function hideList() {
      if (!this.disabled) {
        this.showOptionList = false;
        this.$refs.input.blur();
      }
    },
    _change: function _change(obj, hide) {
      this.modelValue = obj.v;
      this.$emit("modelKeyChange", obj.k);
      this.$emit("change", obj);
      hide && this.hideList();
    },
    rIcon: function rIcon() {
      var _this = this;

      var h = this.$createElement;

      if (this.showDelete && this.clearable) {
        return h(
          "span",
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            slot: "append"
          }, {
            on: {
              "click": function click($event) {
                for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  attrs[_key - 1] = arguments[_key];
                }

                (function (e) {
                  _this.clear();
                  e.stopPropagation();
                }).apply(undefined, [$event].concat(attrs));
              }
            }
          }]),
          [h("k-icon", { "class": "k-select__clear", attrs: { name: "k-icon-close" }
          })]
        );
      } else {
        return h(
          "span",
          {
            slot: "append"
          },
          [h("k-icon", {
            "class": {
              'k-select__down': true,
              'k-select__down--up': this.ifOptionList
            },
            attrs: { name: "k-icon-arrow-down"
            }
          })]
        );
      }
    },

    //实例化option列表
    initIns: function initIns() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.ins.init(_this2);
      });
    },
    scrollIntoView: function scrollIntoView(index) {
      var i = 0;
      if (typeof index === "number") {
        i = index;
      } else {
        i = this.getSelectedOptionIndex();
        if (i === -1) {
          i = 0;
        }
      }
      this.ins.$el.scrollTop = Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["c" /* offset */])(this.options[i].$el, this.ins.$el).top;
    },
    getSelectedOptionIndex: function getSelectedOptionIndex() {
      var i = -1;
      this.options.forEach(function (op, idx) {
        if (op.selected) {
          i = idx;
        }
      });
      return i;
    },
    handleKeydown: function handleKeydown(e) {
      var code = e.keyCode;
      if (code != 40 && code != 38 && code != 13) {
        return;
      }
      var i = this.getSelectedOptionIndex();
      if (code == 38) {
        i -= 1;
        if (i < 0) {
          i = this.options.length - 1;
        }
      } else if (code == 40) {
        //下
        i += 1;
        if (i >= this.options.length) {
          i = 0;
        }
      } else if (code == 13) {
        this.hideList();
      }
      this._change({ k: this.options[i].value, v: this.options[i].label }, false);
      this.scrollIntoView(i);

      e.preventDefault();
    },
    addUpDownEvent: function addUpDownEvent() {
      document.addEventListener("keydown", this.handleKeydown);
    },
    removeUpDownEvent: function removeUpDownEvent() {
      document.removeEventListener("keydown", this.handleKeydown);
    },
    getAllOptionsComponent: function getAllOptionsComponent() {
      var _this3 = this;

      var arr = [];
      var fn = function fn(Comp) {
        Comp.$children.forEach(function (child) {
          if (child.$options.name === _this3.optionCompName) {
            arr.push(child);
          } else {
            fn(child);
          }
        });
      };
      fn(this.ins);
      this.options = arr;
    }
  },
  destroyed: function destroyed() {
    this.ins.destroy();
  },
  updated: function updated() {
    this.initIns();
  },
  mounted: function mounted() {
    this.initIns();
  },
  created: function created() {
    var _this4 = this;

    this.$on("getKeyValueFromOption", function (k, v, hide) {
      _this4._change({ k: k, v: v }, hide);
    });
    this.$on("getOptionComponentName", function (name) {
      _this4.optionCompName = name;
    });
    this.$on("inovering", function (isMouseDownOption) {
      _this4.isMouseDownOption = isMouseDownOption;
      //如果鼠标离开列表，且当前焦点不是此组件的input，则隐藏列表
      if (!isMouseDownOption) {
        if (document.activeElement != _this4.$refs.input.getInputElement()) {
          _this4.hideList();
        }
      }
    });
  },

  watch: {
    modelKey: function modelKey(n) {
      if (n === undefined || n === "") {
        this._change({});
      }
    },
    ifOptionList: function ifOptionList(val) {
      if (val) {
        //获取到所有option组件
        this.getAllOptionsComponent();
        //展示下拉列表并定位到选中的元素
        this.ins.show(this.scrollIntoView);
        //绑定键盘上下键操作
        this.addUpDownEvent();
      } else {
        this.ins.hide();
        this.removeUpDownEvent();
      }
    }
  },
  directives: {
    clickoutside: __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_clickoutside_js__["a" /* default */],
    esc: __WEBPACK_IMPORTED_MODULE_4_karma_ui_util_esc_js__["a" /* default */]
  },
  render: function render() {
    var _this5 = this;

    var h = arguments[0];

    var p = {
      directives: [{
        name: "clickoutside",
        value: this.hideList
      }, {
        name: "esc",
        value: this.hideList
      }],
      on: {
        click: this.showList,
        mouseover: this.showDeleteBtn,
        mouseout: this.hideDeleteBtn
      },
      class: {
        "k-select": true
      }
    };
    var inputProps = {
      ref: "input",
      class: {
        "k-select__active": this.ifOptionList
      },
      props: {
        placeholder: this.placeholder,
        readonly: true,
        size: this.size,
        value: this.modelValue,
        disabled: this.disabled
      },
      on: {
        focus: function focus(e) {
          _this5.showList();
        },
        blur: function blur() {
          //失去焦点的时候，如果鼠标还在列表中呈现mousedown状态，则不隐藏
          if (!_this5.isMouseDownOption) {
            _this5.hideList();
          }
        }
      },
      style: this.styles
    };
    return h(
      "div",
      p,
      [h(
        "z-input",
        inputProps,
        [this.rIcon()]
      )]
    );
  }
});

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return optionWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__optionWrapper__ = __webpack_require__(149);


__WEBPACK_IMPORTED_MODULE_0__option_vue__["a" /* default */].install = function (Vue, opts) {
    Vue.component(__WEBPACK_IMPORTED_MODULE_0__option_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__option_vue__["a" /* default */]);
    __WEBPACK_IMPORTED_MODULE_1__optionWrapper__["a" /* default */].OptionConstructor = Vue.extend(__WEBPACK_IMPORTED_MODULE_1__optionWrapper__["a" /* default */]);
};

var optionWrapper = function optionWrapper() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;


    var ins = new __WEBPACK_IMPORTED_MODULE_1__optionWrapper__["a" /* default */].OptionConstructor().$mount();
    ins.$data.parent = parent;
    parent.appendChild(ins.$el);
    return ins;
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__option_vue__["a" /* default */]);

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KOption",
  inject: ["positionComponent"],
  props: {
    selected: Boolean,
    value: [String, Number, Boolean], //等同于option的value的用法，等同于key value中的key
    label: [String, Number] //实际上保存的是key value中的value
  },
  methods: {
    handleClick: function handleClick(e) {
      this.emitKeyValueToSelect(true);
    },
    emitKeyValueToSelect: function emitKeyValueToSelect() {
      var hide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.positionComponent.$props.vm.$emit("getKeyValueFromOption", this.value, this.label, hide //true代表要收起下拉列表
      );
    }
  },
  created: function created() {
    this.positionComponent.$props.vm.$emit("getOptionComponentName", this.$options.name);
  },
  render: function render() {
    var h = arguments[0];
    var label = this.label,
        value = this.value,
        selected = this.selected;

    var p = {
      attrs: {
        title: this.label
      },
      class: {
        "k-option": true,
        "k-option--selected": selected
      },
      on: {
        click: this.handleClick
        // mousedown: e => {
        //   e.stopPropagation()
        // },
        // mouseup: e => {
        //   e.stopPropagation()
        // }
      }
    };
    return h(
      "li",
      p,
      [this.$slots.default]
    );
  },

  watch: {
    selected: {
      immediate: true,
      handler: function handler(nv) {
        if (nv) {
          this.emitKeyValueToSelect();
        }
      }
    }
  }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__ = __webpack_require__(5);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'KPosition',
  props: {
    //相对于vm定位
    //vm是 定位的依据
    vm: {
      type: Object,
      default: null
    },
    gap: {
      type: Number,
      default: 2
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  data: function data() {
    return {
      left: 0,
      top: -9999,
      width: 0,
      height: 0
    };
  },
  provide: function provide() {
    return {
      positionComponent: this
    };
  },

  methods: {
    getElemPosition: function getElemPosition() {
      if (!this.vm || !this.vm.$el) {
        return;
      }
      var elem = this.vm.$el;
      if (!elem) {
        return null;
      }
      var pos = Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["c" /* offset */])(elem);
      var w = Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(elem, 'width');
      var h = Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(elem, 'height');
      this.left = pos.left;
      this.top = pos.top;
      this.width = w;
      this.height = h;
      this.setSizeAndPosition();
    },
    setSizeAndPosition: function setSizeAndPosition() {
      Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["e" /* setStyle */])(this.$el, {
        width: this.width,
        top: this.top + parseFloat(this.height) + this.gap + 'px',
        left: this.left + 'px'
      });
    }
  },
  mounted: function mounted() {
    this.$nextTick(this.getElemPosition);
  },
  updated: function updated() {
    this.$nextTick(this.getElemPosition);
  },

  watch: {
    vm: 'getElemPosition'
  },
  render: function render() {
    var h = arguments[0];

    var p = {
      class: {
        'k-absolute': true
      },
      on: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.$listeners)
    };
    return h(
      this.tag,
      p,
      [this.$slots.default]
    );
  }
});

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'KRadio',
  model: {
    prop: "modelValue",
    event: 'modelValueChange'
  },
  computed: {
    state: function state() {
      if (this.modelValue === void 0) {
        return this.checked;
      }
      return this.modelValue === this.value;
    }
  },
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: void 0
    },
    checked: Boolean,
    disabled: Boolean,
    value: {
      type: [String, Number, Boolean],
      default: void 0
    },
    name: String
  },
  methods: {
    onChange: function onChange(e) {
      this.$emit('modelValueChange', this.state ? '' : this.value);
      this.$emit('change', e);
    }
  }
});

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 *  //绑定单一布尔值
 *  <z-checkbox
      text="北京"
      value="北京"
      v-model="isChecked"
      disabled
      @change="onChange"></z-checkbox>
    //绑定一个数组
    <z-checkbox
      disabled
      type="arr"
      value="北京"
      text="北京"
      :data-arr.sync="cityArr"
      @change="onChange"></z-checkbox>
    <z-checkbox
      type="arr"
      value="上海"
      text="上海"
      :data-arr.sync="cityArr"
      @change="onChange"></z-checkbox>
    <z-checkbox
      type="arr"
      value="深圳"
      text="深圳"
      :data-arr.sync="cityArr"
      @change="onChange"></z-checkbox>
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KCheckbox",
  model: {
    prop: "checked",
    event: "checkbox-change"
  },
  props: {
    text: {
      type: [String, Number],
      default: ""
    },
    checked: Boolean,
    value: {
      type: [Number, String],
      default: ""
    },
    dataArr: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabled: Boolean,
    type: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      arr: this.dataArr
    };
  },

  methods: {
    _has: function _has() {
      var _this = this;

      return this.arr.some(function (item) {
        return item === _this.value;
      });
    },
    _del: function _del() {
      this.arr = this.arr.splice(this.arr.indexOf(this.value), 1);
    },
    _change: function _change(e) {
      var isChecked = e.target.checked;
      if (this.type === "arr") {
        if (isChecked) {
          if (this.value !== "") {
            if (!this._has()) {
              this.arr.push(this.value);
            }
          }
        } else {
          if (this._has()) {
            this._del();
          }
        }
        this.$emit("update:dataArr", this.arr);
      }
      this.$emit("checkbox-change", isChecked);
      this.$emit("change", e);
    }
  },
  watch: {
    dataArr: function dataArr() {
      this.arr = this.dataArr;
    }
  }
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_input_input_jsx_vue__ = __webpack_require__(23);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**@augments min Number 最小值，默认1，可以置为""
 * @augments max 最大值，默认不限
 * @augments value 可以使用v-model双向绑定的值
 * @augments step 步长，默认1
 * @augments size 尺寸大小，同input组件
 * @augments styles 设置整体样式，同input组件
 * @augments inputStyles 同input组件
 * @augments disabled 是否禁用
 *
 */

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KInputNumber",
  components: {
    KInput: __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_input_input_jsx_vue__["a" /* default */]
  },
  data: function data() {
    return {
      inputValue: this.value,
      validate: {
        type: "int>0",
        max: this.max,
        min: this.min,
        when: "input",
        showTips: false,
        useOldValue: true
      }
    };
  },

  model: {
    prop: "value",
    event: "valueChange"
  },
  props: {
    min: {
      type: Number,
      default: 1,
      validator: function validator(v) {
        return v >= 1;
      }
    },
    max: Number,
    value: [Number, String],
    size: String,
    step: {
      type: Number,
      default: 1,
      validator: function validator(v) {
        return v >= 1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default: function _default() {
        return {
          width: "100px"
        };
      }
    },
    inputStyles: {
      type: Object,
      default: function _default() {
        return {
          textAlign: "center"
        };
      }
    }
  },
  methods: {
    handleKeydown: function handleKeydown(e) {
      var code = e.keyCode;
      if (code != 40 && code != 38) {
        return;
      }
      if (code == 40) {
        this.minus();
      } else {
        this.add();
      }
    },
    handleFocus: function handleFocus() {
      document.addEventListener('keydown', this.handleKeydown);
    },
    handleBlur: function handleBlur() {
      document.removeEventListener('keydown', this.handleKeydown);
    },
    minus: function minus() {
      if (!this.disabled) {
        var v = this.value - this.step;
        this.$emit("valueChange", v < this.min ? this.min : v);
      }
    },
    add: function add() {
      if (!this.disabled) {
        var v = this.value + this.step;
        if (this.max) {
          v = v > this.max ? this.max : v;
        }
        this.$emit("valueChange", v);
      }
    }
  },
  watch: {
    value: function value(val, oldVal) {
      this.inputValue = val;
      this.$emit("change", val);
    },
    inputValue: function inputValue(val, oldVal) {
      if (val !== "") {
        val = parseInt(val);
        if (val > this.max) {
          val = this.max;
        } else if (val < this.min) {
          val = this.min;
        }
      }
      this.$emit("valueChange", val);
    }
  }
});

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__areaData_js__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_select_select_vue__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_option_option_vue__ = __webpack_require__(54);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/**
 * //todo
 * 1. 显式引入select 和 option组件会报错！
 * There are multiple modules with names that only differ in casing.
 * 为什么？
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KArea",
  components: {
    KSelect: __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_select_select_vue__["a" /* default */], KOption: __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_option_option_vue__["a" /* default */]
  },
  data: function data() {
    return {
      province: __WEBPACK_IMPORTED_MODULE_1__areaData_js__["c" /* province */],
      city: __WEBPACK_IMPORTED_MODULE_1__areaData_js__["a" /* city */],
      county: __WEBPACK_IMPORTED_MODULE_1__areaData_js__["b" /* county */],
      curProvince: "",
      curCity: "",
      curCounty: "",
      selectStyle: {
        width: '90px'
      }
    };
  },

  model: {
    prop: "code",
    event: "codeChange"
  },
  props: {
    code: [String, Number]
    // code: [String, Number]
  },
  computed: {
    sCode: function sCode() {
      return this.code + "";
    }
  },
  methods: {
    emit: function emit(provinceCode, cityCode, countyCode) {
      // console.log(provinceCode, cityCode, countyCode)
      var pname = this.getProvinceNameByCode(provinceCode);
      var cityName = this.getCityNameByCode(provinceCode, cityCode);
      var countyName = this.getCountyNameByCode(cityCode, countyCode);
      this.setCode("curProvince", pname ? provinceCode : "");
      this.setCode("curCity", cityName ? cityCode : "");
      this.setCode("curCounty", countyName ? countyCode : "");
      this.$emit("update:area", [{
        name: pname,
        code: provinceCode
      }, {
        name: cityName,
        code: cityCode
      }, {
        name: countyName,
        code: countyCode
      }]);
    },
    getProvinceNameByCode: function getProvinceNameByCode(code) {
      var name = "";
      if (code) {
        var arr = this.province.filter(function (item) {
          return item.code == code;
        });
        if (arr && arr.length) {
          name = arr[0].name;
        }
      }
      return name;
    },
    getCityNameByCode: function getCityNameByCode(cityCode, code) {
      var name = "";
      if (cityCode && code && this.city[cityCode]) {
        var arr = this.city[cityCode].filter(function (item) {
          return item.code == code;
        });
        if (arr && arr.length) {
          name = arr[0].name;
        }
      }
      return name;
    },
    getCountyNameByCode: function getCountyNameByCode(cityCode, code) {
      var name = "";
      if (cityCode && code && this.county[cityCode]) {
        var arr = this.county[cityCode].filter(function (item) {
          return item.code == code;
        });
        if (arr && arr.length) {
          name = arr[0].name;
        }
      }
      return name;
    },
    setCode: function setCode(type, code) {
      this[type] = code + "";
    },
    splitCode: function splitCode() {
      var code = this.sCode;
      var province = "",
          city = "",
          county = "";
      if (code) {
        province = code.slice(0, 2) + "0000";
        city = code.slice(0, 4) + "00";
        county = code;
      }
      return [province, city, county];
    }
  },
  mounted: function mounted() {
    this.emit.apply(this, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.splitCode()));
  },

  watch: {
    sCode: function sCode(val, oldVal) {
      if (val != oldVal) {
        if (val && val.length === 6) {
          this.emit.apply(this, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.splitCode()));
        } else {
          // this.curProvince = '';this.curCity = '';this.curCounty = '';
          this.emit('', '', '');
        }
      }
    },
    curProvince: function curProvince(n, old) {
      if (n == old) return;
      if (n == this.splitCode()[0]) return;
      if (n) {
        this.$emit('codeChange', n);
        //不需要再调用this.emit，因为给code赋值后，会触发watcher:sCode方法
      }
    },
    curCity: function curCity(n, old) {
      if (n == old) return;
      if (n == this.splitCode()[1]) return;
      if (n) {
        this.$emit('codeChange', n);
      }
    },
    curCounty: function curCounty(n, old) {
      if (n == old) return;
      if (n === this.splitCode()[2]) return;
      if (n) {
        this.$emit('codeChange', n);
      }
    }
  }
});

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(14);
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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(24);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(58);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(24);
module.exports = __webpack_require__(3).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(4)('iterator');
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
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_popup_vue__ = __webpack_require__(88);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_7e757f40_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_popup_vue__ = __webpack_require__(167);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_popup_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_7e757f40_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_popup_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/popup/popup.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e757f40", Component.options)
  } else {
    hotAPI.reload("data-v-7e757f40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_button_button__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_icon_icon__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_directives_dnd_bind_js__ = __webpack_require__(89);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 有关弹框宽度，可以对插入的body宽度进行设置。



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KPopup",
  components: {
    KButton: __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_button_button__["a" /* default */],
    KIcon: __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_icon_icon__["a" /* default */]
  },
  props: {
    title: {
      type: String,
      default: "确认"
    },
    okText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    show: {
      type: Boolean,
      default: false
    },
    //显示出此组件的哪些部分：头部、body、footer，关闭按钮、遮罩
    //默认全显示
    layout: {
      type: String,
      default: "header,body,footer,close,mask"
    },
    buttonSize: {
      type: String,
      default: "medium"
    }
  },
  methods: {
    onOk: function onOk() {
      this.$emit("after:ok");
    },
    onCancel: function onCancel() {
      this.$emit("update:show", false);
      this.$emit("after:cancel");
    },
    esc: function esc(e) {
      if (e.keyCode == 27) {
        this.show && this.onCancel();
      }
    }
  },
  mounted: function mounted() {
    document.addEventListener("keyup", this.esc);
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener("keyup", this.esc);
  },

  directives: {
    dnd: __WEBPACK_IMPORTED_MODULE_2_karma_ui_directives_dnd_bind_js__["a" /* default */]
  }
});

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dnd_js__ = __webpack_require__(166);

/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding) {
    el.instance = new __WEBPACK_IMPORTED_MODULE_0__Dnd_js__["a" /* Dnd */](el, el.querySelector('.' + binding.value.handlerClass));
  },
  unbind: function unbind(el, binding) {
    el.instance.destroy();
    delete el.instance;
  }
});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(68);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_popup_popup__ = __webpack_require__(87);

//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    KPopup: __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_popup_popup__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_popup_popup__["a" /* default */].props, { content: String }),
  methods: {
    afterCancel: function afterCancel() {
      this.$emit('after:cancel');
    },
    afterOk: function afterOk() {
      this.$emit('after:ok');
    }
  }
});

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__ = __webpack_require__(5);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KCarousel",
  data: function data() {
    return {
      timer: null,
      len: 0,
      i: 1
    };
  },

  props: {
    interval: {
      type: Number,
      default: 3500
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    indicatorPosition: {
      type: String,
      default: "center" //其他取值"right"
    },
    trigger: {
      type: String,
      default: "hover"
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];

    var container = this.$slots.default;
    var len = container.length;
    this.len = len;
    var btn = null;
    var btns = [];
    for (var i = 0; i < len; i++) {
      btns.push(btn);
    }
    //指示器 -- 按钮
    var indi = btns ? h(
      "ul",
      {
        ref: "btns",
        "class": __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({
          "k-carousel__indicator": true
        }, "k-carousel__indicator--" + this.indicatorPosition, true)
      },
      [btns.map(function (btn, index) {
        return h("li", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
          "class": {
            "k-carousel__button": true,
            "k-carousel__button--active": _this.i - 1 === index
          }
        }, {
          on: {
            "click": function click($event) {
              for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                attrs[_key - 1] = arguments[_key];
              }

              (function () {
                return _this.handleClick(index);
              }).apply(undefined, [$event].concat(attrs));
            },
            "mouseover": function mouseover($event) {
              for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                attrs[_key2 - 1] = arguments[_key2];
              }

              (function () {
                return _this.handleMouseover(index);
              }).apply(undefined, [$event].concat(attrs));
            }
          }
        }]));
      })]
    ) : null;
    return h(
      "div",
      __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{ "class": "k-carousel"
      }, {
        on: {
          "mouseover": function mouseover($event) {
            for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              attrs[_key3 - 1] = arguments[_key3];
            }

            _this.pause.apply(_this, [$event].concat(attrs));
          },
          "mouseout": function mouseout($event) {
            for (var _len4 = arguments.length, attrs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
              attrs[_key4 - 1] = arguments[_key4];
            }

            _this.handleOut.apply(_this, [$event].concat(attrs));
          }
        }
      }]),
      [h(
        "div",
        {
          "class": "k-carousel__container",
          ref: "container",
          style: { width: len * 100 + "%" }
        },
        [container]
      ), indi]
    );
  },

  methods: {
    handleOut: function handleOut() {
      this.autoPlay && this.play();
    },
    pause: function pause() {
      clearInterval(this.timer);
    },
    handleClick: function handleClick(index) {
      if (this.trigger.toLowerCase() !== 'click') return;
      this.i = index;
      this.pause();
      this.anim(this.$refs.container);
      this.autoPlay && this.play();
    },
    handleMouseover: function handleMouseover(index) {
      if (this.trigger.toLowerCase() !== 'hover') return;
      this.i = index;
      this.pause();
      this.anim(this.$refs.container);
      this.autoPlay && this.play();
    },
    anim: function anim(elem) {
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["e" /* setStyle */])(elem, {
        marginLeft: "-" + this.i++ * 100 + "%"
      });
    },
    play: function play() {
      var _this2 = this;

      this.pause();
      var container = this.$refs.container,
          btns = this.$refs.btns.children;

      this.timer = setInterval(function () {
        if (_this2.len > 0 && _this2.i >= _this2.len) {
          _this2.i = 0;
        }
        _this2.anim(container);
      }, this.interval);
    }
  },
  mounted: function mounted() {
    this.autoPlay && this.$nextTick(this.play);
  }
});

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'KCarouselItem',
  render: function render() {
    var h = arguments[0];


    return h(
      "div",
      { "class": "k-carousel-item" },
      [this.$slots.default]
    );
  }
});

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_95__;

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_util_object_js__ = __webpack_require__(52);


var baseStyle = {
  "min-width": '180px',
  "min-height": '120px',
  "max-width": '300px',
  "max-height": '200px'
};
var baseContent = '操作完成';

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      visible: true,
      content: baseContent,
      styles: baseStyle,
      type: 'success', //'error','warning'
      timer: null
    };
  },
  render: function render() {
    var h = arguments[0];

    var tip = null;
    if (this.visible) {
      tip = h(
        "div",
        { "class": "k-tips",
          style: this.styles },
        [h(
          "div",
          { "class": "k-tips__tag" },
          [h("i", { "class": __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({
              'k-tips__icon': true
            }, 'k-tips__icon--' + this.type, true) })]
        ), h(
          "div",
          { "class": "k-tips__cont" },
          [this.content]
        )]
      );
    }
    return tip;
  },

  methods: {
    setType: function setType(type) {
      if (type) {
        this.type = type;
      } else {
        this.type = 'success';
      }
      return this;
    },
    setStyle: function setStyle(styleObj) {
      this.styles = Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_object_js__["a" /* merge */])({}, baseStyle, styleObj);
      return this;
    },
    setContent: function setContent(cont) {
      if (cont) {
        this.content = cont;
      } else {
        this.content = baseContent;
      }
      return this;
    },
    show: function show() {
      clearTimeout(this.timer);
      this.visible = true;
      return this;
    },
    hide: function hide(time) {
      var _this = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.visible = false;
      }, time);
      return this;
    }
  }
});

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Loading_vue__ = __webpack_require__(98);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_10dc4500_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Loading_vue__ = __webpack_require__(178);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Loading_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_10dc4500_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Loading_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/loading/Loading.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10dc4500", Component.options)
  } else {
    hotAPI.reload("data-v-10dc4500", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_icon_icon__ = __webpack_require__(18);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * 此组件主要用在数据加载时的loading提示，
 * 加载时，调用Vue.Loading().show();
 * 加载完成后，调用Vue.Loading().hide();
 * 不建议用在其他地方！
 */

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "Loading",
  components: { KIcon: __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_icon_icon__["a" /* default */] },
  data: function data() {
    return {
      //定位
      position: "",
      //是否铺面父级元素
      isFullScreen: false,
      //内容
      content: "努力加载中...",
      //背景
      backgroundColor: "",
      //字体颜色
      color: "",
      //icon的name
      iconName: 'k-icon-loading',
      //icon的颜色
      iconColor: '',
      //icon的大小
      iconSize: 25,
      //以上参数，都是可以由外部传参设置的。
      isShow: false,
      //start和end是成对的，
      //show的时候，start加1
      //hide时，end加1，
      //判断start和end是否相等，如果相等就关闭，否则就不关闭
      //为什么这样做？
      //此组件是共用的，属于单例模式。当多个请求同时发送时，
      //数据返回时间不一样，为了让最开始请求开始就出现这个loading状态，
      //并当最后一个请求结束时才最终关闭loading状态，故此设计。
      cp: {
        start: 0,
        end: 0
      }
    };
  },

  methods: {
    setOptions: function setOptions() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (var k in opts) {
        if (opts[k]) {
          this.$data[k] = opts[k];
        }
      }
    },
    show: function show() {
      this.cp.start = this.cp.start + 1;
      this.isShow = true;
      return this;
    },
    hide: function hide(isForce /*是否强制手动关闭*/, delay /*延迟关闭*/) {
      var _this = this;

      if (isForce) {
        this.cp.start = this.cp.end = 0;
        if (delay) {
          setTimeout(function () {
            _this.isShow = false;
          }, delay);
        } else {
          this.isShow = false;
        }
      } else {
        this.cp.end = this.cp.end + 1;
        if (this.cp.start <= this.cp.end) {
          if (delay) {
            setTimeout(function () {
              _this.isShow = false;
            }, delay);
          } else {
            this.isShow = false;
          }
        }
      }
      return this;
    }
  }
});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(181), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(14);
var aFunction = __webpack_require__(19);
var SPECIES = __webpack_require__(4)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(12);
var invoke = __webpack_require__(183);
var html = __webpack_require__(71);
var cel = __webpack_require__(35);
var global = __webpack_require__(1);
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
  if (__webpack_require__(21)(process) == 'process') {
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
/* 102 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(14);
var isObject = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(60);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var core = __webpack_require__(3);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(9);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KToTop",
  data: function data() {
    return {
      visible: false
    };
  },

  props: {
    distance: {
      type: Number,
      default: 200
    },
    bottom: String,
    right: String
  },
  methods: {
    onScroll: function onScroll() {
      this.visible = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["d" /* scroll */])().top > this.distance;
    },
    onToTop: function onToTop() {
      window.scrollTo(0, 0);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      window.addEventListener('scroll', _this.onScroll);
    });
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
});

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_select_select__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_option_option__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_input_input_jsx_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_button_button__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_icon_icon__ = __webpack_require__(18);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    KSelect: __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_select_select__["a" /* default */],
    KOption: __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_option_option__["a" /* default */],
    KInput: __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_input_input_jsx_vue__["a" /* default */],
    KButton: __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_button_button__["a" /* default */],
    KIcon: __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_icon_icon__["a" /* default */]
  },
  name: "KPagination",
  props: {
    total: Number, //数据总条数
    currentPage: Number, //当前页码
    pageSize: {
      type: [Number, String],
      default: 15
    },
    pageSizes: {
      type: Array,
      default: function _default() {
        return [10, 15, 20, 25];
      }
    },
    layout: {
      type: String,
      default: "total,prev,pager,next,sizes,jumper"
    },
    disabled: Boolean
  },
  data: function data() {
    return {
      dot: "...", //省略符号
      size: 10, //超出10时，开始显示...
      max: 5, //出现两个dot时最大连续展示5个页码
      max2: 7, //只出现一个dot时，最大连续展示7个页码
      modelPageSize: this.pageSize,
      goPage: ""
    };
  },

  watch: {
    pageSize: function pageSize(s, os) {
      if (s != os) {
        this.modelPageSize = s;
      }
    },
    modelPageSize: function modelPageSize(s, os) {
      if (s != os) {
        this.$emit("update:pageSize", s);
        this.$emit("size-change", s);
      }
    }
  },
  computed: {
    //总页数
    totalPages: function totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    cTotal: function cTotal() {
      //无论总页数多少，第一页和最后一页总是要展示
      var t = this.totalPages,
          size = this.size,
          max = this.max,
          max2 = this.max2,
          p = this.currentPage,
          //当前页码
      dot = this.dot;
      if (t > size) {
        var arr = [];
        if (t - p >= this.max && p > this.max) {
          for (var i = p - 2; i <= p + 2; i++) {
            arr.push(i);
          }
          arr.push(dot, t);
          arr.unshift(1, dot);
        } else {
          if (p <= this.max) {
            for (var _i = 1; _i <= this.max2; _i++) {
              arr.push(_i);
            }
            arr.push(dot, t);
          } else if (t - p < this.max) {
            for (var _i2 = t; _i2 > t - this.max2; _i2--) {
              arr.unshift(_i2);
            }
            arr.unshift(1, dot);
          }
        }
        return arr;
      } else {
        return t;
      }
    }
  },
  methods: {
    order: function order(item) {
      var i = this.layout.toLowerCase().split(",").indexOf(item.toLowerCase());
      return i;
    },
    showItem: function showItem(item) {
      var i = this.layout.toLowerCase().indexOf(item.toLowerCase());
      return i > -1;
    },
    goto: function goto() {
      var p = this.goPage;
      this.$refs.pageInput.onSelect();
      if (p < 1 || p > this.totalPages) {
        return;
      }
      this.pageChange(p);
    },
    goNext: function goNext() {
      var p = this.currentPage;
      var t = this.totalPages;
      if (p < t) {
        this.pageChange(p + 1);
      }
    },
    goPrev: function goPrev() {
      var p = this.currentPage;
      if (p > 1) {
        this.pageChange(p - 1);
      }
    },
    pageChange: function pageChange(page) {
      if (page == this.dot) {
        return;
      } else {
        if (page != this.currentPage && this.total > 0) {
          this.$emit("update:currentPage", page);
          //事件，页码变动时
          this.$emit("page-change", page);
        }
      }
    }
  }
});

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_input_input_jsx__ = __webpack_require__(23);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    width: {
      type: String,
      default: '118px'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  name: 'KDatePicker',
  components: {
    KInput: __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_input_input_jsx__["a" /* default */]
  }
});

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ScrollbarY__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ScrollbarX__ = __webpack_require__(201);

//

// <template>
//   <div class="k-scrollbar"
//     @wheel="onWheel">
//     <scrollbar-y :wrapper-height="wrapperHeight"
//       :content-height="contentHeight"
//       ref="y"
//       @dragging="onDragging"></scrollbar-y>
//     <scrollbar-x :wrapper-width="wrapperWidth"
//       :content-width="contentWidth"
//       ref="x"
//       @dragging="onDraggingX"></scrollbar-x>
//     <div class="k-scrollbar__content"
//       :class="{'k-scrollbar-transition':!dragging}"
//       ref="content"
//       :style="{marginTop:top*-1+'px',marginLeft:left*-1+'px'}">
//       <slot></slot>
//     </div>
//   </div>
// </template>
/* NOTE: 1.（与本组件无关）当prop属性想要sync的时候，必须在组件传入此参数如
  /* <my-comp :allow="allow.sync"></my-comp>，否则不起作用。
   * NOTE: 2.当scrollbar组件内是router-view时，页面变化将不会触发到scrollbar组件
   * 此时需要手动，做法是：页面的updated钩子中写个回调，然后在router-view组件上
   * 监听此自定义函数，然后再调用scrollbar的reset方法。另外：如果页面很多，那
   * 是不是每个页面都要写回调？不用！这种情况下，可以再写一个组件，这个组件里可以只有
   * updated钩子。
   * NOTE: 3.此组件使用时，对于此组件的根节点不要有margin/padding/border。否则会
   * 造成部分内容被隐藏看不到。
   * NOTE: 4.此组件能不用就不用，使用此组件时，
   *         ① 键盘中的上下页、起始、结束、空格键不起作用
   *         ② v-viewable指令不起作用
   * NOTE: 被scrollbar组件包裹的所有元素，调用原生的scrollIntoView方法后会造成
   * 滚动条位置偏移不准，避免使用！应使用本组件的scrollIntoView方法。
   * TODO: 1.scrollx组件和scrolly组件可以合并成一个
   * TODO: 2.scrollBy方法
   * TODO: 3.throttle或者debounce为什么没起作用！？
   * TODO: 4.viewable方法，用以检查组件内包裹的元素是否在可视区内
   *         待完成，带后续看具体需求再写。
   * 
  */



// import {debounce} from 'karma-ui/util/throttle_debounce'
// import {throttle, debounce} from 'throttle-debounce'
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KScrollbar",
  components: {
    ScrollbarY: __WEBPACK_IMPORTED_MODULE_2__ScrollbarY__["a" /* default */],
    ScrollbarX: __WEBPACK_IMPORTED_MODULE_3__ScrollbarX__["a" /* default */]
  },
  props: {
    trackStyle: Object,
    thumbStyle: Object,
    allowBodyScroll: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 53
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  data: function data() {
    return {
      //allow应该在内容高度小于等于容器高度的时候，自动设置成true
      //否则，将会出现：当鼠标在某个区域内滚动的时候，外部滚动条也滚动不了
      allow: this.allowBodyScroll,
      top: 0,
      left: 0,
      maxScrollTop: 0,
      maxScrollLeft: 0,
      contentHeight: 0, //内容高度
      wrapperHeight: 0, //scrollbar组件最外部容器的高度
      contentWidth: 0,
      wrapperWidth: 0,
      dragging: false
    };
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];

    return h(
      this.tag,
      __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{ "class": "k-scrollbar" }, {
        on: {
          "wheel": function wheel($event) {
            for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              attrs[_key - 1] = arguments[_key];
            }

            _this.onWheel.apply(_this, [$event].concat(attrs));
          }
        }
      }]),
      [h(__WEBPACK_IMPORTED_MODULE_2__ScrollbarY__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
        ref: "y",
        attrs: { "content-height": this.contentHeight,
          "wrapper-height": this.wrapperHeight,
          "track-style": this.trackStyle,
          "thumb-style": this.thumbStyle
        }
      }, {
        on: {
          "dragging": function dragging($event) {
            for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              attrs[_key2 - 1] = arguments[_key2];
            }

            _this.onDragging.apply(_this, [$event].concat(attrs));
          }
        }
      }])), h(__WEBPACK_IMPORTED_MODULE_3__ScrollbarX__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
        ref: "x",
        attrs: { "content-width": this.contentWidth,
          "wrapper-width": this.wrapperWidth,
          "track-style": this.trackStyle,
          "thumb-style": this.thumbStyle
        }
      }, {
        on: {
          "dragging": function dragging($event) {
            for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              attrs[_key3 - 1] = arguments[_key3];
            }

            _this.onDraggingX.apply(_this, [$event].concat(attrs));
          }
        }
      }])), h(
        "div",
        {
          "class": {
            "k-scrollbar__content": true,
            "k-scrollbar-transition": !this.dragging
          },
          ref: "content",
          style: {
            marginTop: this.top * -1 + "px",
            marginLeft: this.left * -1 + "px"
          }
        },
        [this.$slots.default]
      )]
    );
  },

  watch: {
    left: "emitScroll",
    top: "emitScroll"
  },
  methods: {
    emitScroll: function emitScroll() {
      this.$emit("scroll", {
        scrollTop: this.top,
        scrollLeft: this.left,
        wrapper: {
          width: this.wrapperWidth,
          height: this.wrapperHeight
        },
        content: {
          width: this.contentWidth,
          height: this.contentHeight
        }
      });
    },
    onDragging: function onDragging(thumbTop, h, isDragging) {
      var top = thumbTop * this.maxScrollTop / (100 - h);
      this.top = top;
      this.dragging = isDragging;
    },
    onDraggingX: function onDraggingX(thumbLeft, w, isDragging) {
      var left = thumbLeft * this.maxScrollLeft / (100 - w);
      this.left = left;
      this.dragging = isDragging;
    },
    onWheel: function onWheel(e) {
      // console.log(e)
      this.scrollY(e.deltaY);
      this.dragging = false;
      if (!this.allow) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    scrollY: function scrollY(y) {
      var s = this.speed,
          max = this.maxScrollTop;
      var top = 0;
      if (y > 0) {
        top = s + this.top;
      } else if (y < 0) {
        top = this.top - s;
      }
      if (top < 0) {
        top = 0;
      } else if (top > max) {
        top = max;
      }
      this.top = top;
      //滚动条thumb位置
      //由于dom的margin变化会反映到updated钩子，所以不需要再次调用scroll
      // this.$refs.y.scroll(top)
    },
    getSize: function getSize() {
      //content只计算clientWidth和clientHeight不行，需加上margin和border
      var el = this.$el,
          content = this.$refs.content.children[0];
      if (this.$refs.content.children.length > 1) {
        console.warn("scrollbar组件的slot只能有一个根节点");
      }
      // console.log(el.clientHeight)
      if (!content) {
        return {
          elClientHeight: el.clientHeight,
          elClientWidth: el.clientWidth,
          contentWholeHeight: el.clientHeight,
          contentWholeWidth: el.clientWidth
        };
      }
      return {
        elClientHeight: el.clientHeight,
        elClientWidth: el.clientWidth,
        contentWholeHeight: content.clientHeight + parseInt(Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(content, "margin-top")) + parseInt(Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(content, "margin-bottom")) + parseInt(Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(content, "border-top-width")) + parseInt(Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(content, "border-bottom-width")),
        // +parseInt(getStyle(el,'padding-top'))
        // +parseInt(getStyle(el,'padding-bottom'))
        // +parseInt(getStyle(el,'border-top-width'))
        // +parseInt(getStyle(el,'border-bottom-width')),
        contentWholeWidth: content.clientWidth + parseInt(Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(content, "margin-left")) + parseInt(Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(content, "margin-right")) + parseInt(Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(content, "border-left-width")) + parseInt(Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["b" /* getStyle */])(content, "border-right-width"))
        // +parseInt(getStyle(el,'padding-left'))
        // +parseInt(getStyle(el,'padding-right'))
        // +parseInt(getStyle(el,'border-left-width'))
        // +parseInt(getStyle(el,'border-right-width'))
      };
    },
    init: function init() {
      var size = this.getSize();
      this.contentHeight = size.contentWholeHeight;
      this.wrapperHeight = size.elClientHeight;
      this.contentWidth = size.contentWholeWidth;
      this.wrapperWidth = size.elClientWidth;
      // console.log(size)
      var maxScrollTop = this.contentHeight - this.wrapperHeight,
          maxScrollLeft = this.contentWidth - this.wrapperWidth;
      this.maxScrollTop = maxScrollTop < 0 ? 0 : maxScrollTop;
      this.maxScrollLeft = maxScrollLeft < 0 ? 0 : maxScrollLeft;
      var allow = this.allowBodyScroll;
      if (this.contentHeight < this.wrapperHeight) {
        allow = true;
      }
      this.allow = allow;
    },
    resetContentPosition: function resetContentPosition() {
      //调整content内容区域的marginTop/marginLeft
      var maxScrollTop = this.maxScrollTop;
      var maxScrollLeft = this.maxScrollLeft;
      var top = this.top;
      var left = this.left;
      if (top > maxScrollTop) {
        this.top = maxScrollTop;
      }
      if (left > maxScrollLeft) {
        this.left = maxScrollLeft;
      }
      this.$refs.y.scroll(this.top);
      this.$refs.x.scroll(this.left);
    },

    //组件外部调用
    reset: function reset() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.init();
        _this2.$nextTick(function () {
          _this2.resetContentPosition();
        });
      });
    },

    //组件外部调用
    scrollIntoView: function scrollIntoView(elem) {
      if (!elem) {
        console.warn("\u6240\u9009\u5143\u7D20\u4E3A" + elem + "\uFF0C\u8BF7\u68C0\u67E5");
        return;
      }
      if (!this.$el.contains(elem)) {
        console.warn("scrollbar\u7EC4\u4EF6\u4E2D\u4E0D\u5305\u542B" + elem);
        return;
      }
      var s = Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["c" /* offset */])(elem, this.$el);
      this.scrollTo(s.left, s.top);
    },

    //组件外部调用
    scrollTo: function scrollTo(x, y) {
      //x,的单位需是px
      x = parseFloat(x);
      y = parseFloat(y);
      if (typeof x === "number") {
        this.left = x;
        this.$refs.x.scroll(x);
      }
      if (typeof y === "number") {
        this.top = y;
        this.$refs.y.scroll(y);
      }
    },

    //组件外部调用
    scrollToTop: function scrollToTop() {
      this.scrollTo(0, 0);
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.init();
    });
    window.addEventListener("resize", this.reset);
  },
  updated: function updated() {
    this.reset();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("resize", this.reset);
  }
});

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    trackStyle: Object,
    thumbStyle: Object,
    contentHeight: Number, //内容高度
    wrapperHeight: Number //scrollbar组件最外部容器的高度
  },
  data: function data() {
    return {
      maxScrollTop: 0,
      top: 0,
      lastTop: 0,
      start: 0,
      dragging: false
    };
  },

  computed: {
    thumb_styl: function thumb_styl() {
      var s = { top: this.top + '%', height: this.height + '%' };
      if (this.thumbStyle) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.thumbStyle, s);
      } else {
        return s;
      }
    },
    height: function height() {
      // console.log(this.wrapperHeight , this.contentHeight)
      if (this.contentHeight !== 0) {
        return this.wrapperHeight / this.contentHeight * 100;
      }
    },
    show: function show() {
      return this.contentHeight - this.wrapperHeight > 0;
    }
  },
  methods: {
    onJump: function onJump(e) {
      var y = e.clientY,
          trackPos = this.$refs.track.getBoundingClientRect();
      //计算所点的位置位于track的高度百分比

      var yHeight = (y - trackPos.top) / this.wrapperHeight * 100;
      //计算滚动条应该移动到的位置
      var top = yHeight - this.height / 2;
      if (top < 0) {
        top = 0;
      } else if (top + this.height > 100) {
        top = 100 - this.height;
      }
      this.top = top;
      this.$emit('dragging', this.top, this.height, false);
    },
    onDown: function onDown(e) {
      this.dragging = true;
      this.start = e.clientY;
      this.lastTop = this.top;
      document.addEventListener('mousemove', this.onMove);
      document.addEventListener('mouseup', this.onUp);
    },
    onMove: function onMove(e) {
      if (this.dragging) {
        var d = e.clientY - this.start;
        var precentageD = d / this.wrapperHeight * 100;
        var top = precentageD + this.lastTop;
        if (top < 0) {
          top = 0;
        } else if (top > 100 - this.height) {
          top = 100 - this.height;
        }
        // console.log(top,this.top,precentageD)

        this.top = top;
        this.$emit('dragging', this.top, this.height, true);
        e.stopPropagation();
        e.preventDefault();
      }
    },
    onUp: function onUp(e) {
      this.dragging = false;
      document.removeEventListener('mousemove', this.onMove);
      document.removeEventListener('mouseup', this.onUp);
    },
    scroll: function scroll(ctop) {
      if (this.maxScrollTop) this.top = ctop / this.maxScrollTop * (100 - this.height);
    },
    calcMaxScrollTop: function calcMaxScrollTop() {
      var max = this.contentHeight - this.wrapperHeight;
      this.maxScrollTop = max < 0 ? 0 : max;
    }
  },
  watch: {
    contentHeight: function contentHeight() {
      this.calcMaxScrollTop();
    },
    wrapperHeight: function wrapperHeight() {
      this.calcMaxScrollTop();
    }
  }
});

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    trackStyle: Object,
    thumbStyle: Object,
    contentWidth: Number, //内容宽度
    wrapperWidth: Number //scrollbar组件最外部容器的宽度
  },
  data: function data() {
    return {
      maxScrollLeft: 0,
      left: 0,
      lastLeft: 0,
      start: 0,
      dragging: false
    };
  },

  computed: {
    thumb_styl: function thumb_styl() {
      var s = { left: this.left + '%', width: this.width + '%' };
      if (this.thumbStyle) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.thumbStyle, s);
      } else {
        return s;
      }
    },
    width: function width() {
      if (this.contentWidth !== 0) {
        return this.wrapperWidth / this.contentWidth * 100;
      }
    },
    show: function show() {
      return this.contentWidth - this.wrapperWidth > 0;
    }
  },
  methods: {
    onJump: function onJump(e) {
      var x = e.clientX,
          trackPos = this.$refs.track.getBoundingClientRect();
      //计算所点的位置位于track的宽度百分比

      var xWidth = (x - trackPos.left) / this.wrapperWidth * 100;
      //计算滚动条应该移动到的位置
      var left = xWidth - this.width / 2;
      if (left < 0) {
        left = 0;
      } else if (left + this.width > 100) {
        left = 100 - this.width;
      }
      this.left = left;
      this.$emit('dragging', this.left, this.width, false);
    },
    onDown: function onDown(e) {
      this.dragging = true;
      this.start = e.clientX;
      this.lastLeft = this.left;
      document.addEventListener('mousemove', this.onMove);
      document.addEventListener('mouseup', this.onUp);
    },
    onMove: function onMove(e) {
      if (this.dragging) {
        var d = e.clientX - this.start;
        var precentageD = d / this.wrapperWidth * 100;
        var left = precentageD + this.lastLeft;
        if (left < 0) {
          left = 0;
        } else if (left > 100 - this.width) {
          left = 100 - this.width;
        }
        // console.log(top,this.top,precentageD)

        this.left = left;
        // console.log(left)
        this.$emit('dragging', this.left, this.width, true);
      }
    },
    onUp: function onUp(e) {
      this.dragging = false;
      document.removeEventListener('mousemove', this.onMove);
      document.removeEventListener('mouseup', this.onUp);
    },
    scroll: function scroll(cLeft) {
      // console.log(cLeft, this.maxScrollLeft)
      if (this.maxScrollLeft) {

        this.left = cLeft / this.maxScrollLeft * (100 - this.width);
      }
    },
    calcMaxScrollLeft: function calcMaxScrollLeft() {
      var max = this.contentWidth - this.wrapperWidth;
      this.maxScrollLeft = max < 0 ? 0 : max;
    }
  },
  watch: {
    contentWidth: function contentWidth() {
      this.calcMaxScrollLeft();
    },
    wrapperWidth: function wrapperWidth() {
      this.calcMaxScrollLeft();
    }
  }
});

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    headAndBodyColumns: function headAndBodyColumns() {
      var bodyColumns = [],
          fn = function fn(arr) {
        arr.forEach(function (col) {
          if (col.children && col.children.length) {
            fn(col.children);
          } else {
            bodyColumns.push(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, col));
          }
        });
      };
      fn(this.columns);
      return { bodyColumns: bodyColumns, headColumns: this.columns };
    },

    //是否存在固定列（左，右）
    hasFixedColumns: function hasFixedColumns() {
      var fixedLeft = 0,
          fixedRight = 0;
      this.columns.forEach(function (col) {
        var f = col.fixed;
        if (f === 'left') {
          fixedLeft += 1;
        } else if (f === 'right') {
          fixedRight += 1;
        }
      });
      if (fixedLeft > 0) {
        if (this.hasCheckbox || this.hasRadio) {
          fixedLeft += 1;
        }
        if (this.hasIndex) {
          fixedLeft += 1;
        }
      }
      return {
        fixedLeft: fixedLeft,
        fixedRight: fixedRight
      };
    }
  }
});

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(115);


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_util_setPropsGlobal_js__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_theme_index_css__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_theme_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_karma_ui_theme_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_theme_font_iconfont_css__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_theme_font_iconfont_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_karma_ui_theme_font_iconfont_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_button_index_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_input_index_js__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_select_index_js__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_option_index_js__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_karma_ui_packages_radio_index_js__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_checkbox_index_js__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_karma_ui_packages_input_number_index_js__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_karma_ui_packages_area_index_js__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_popup_index_js__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_dialog_index_js__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_karma_ui_packages_carousel_index_js__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_karma_ui_packages_carousel_item_index_js__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_karma_ui_packages_tips_index_js__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_karma_ui_packages_loading_index_js__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_karma_ui_packages_to_top_index_js__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_karma_ui_packages_pagination_index_js__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_karma_ui_packages_date_picker_index_js__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_karma_ui_packages_scrollbar_index_js__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_karma_ui_packages_transition_index_js__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_karma_ui_packages_table_index_js__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_karma_ui_packages_position_index_js__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_karma_ui_packages_icon_index_js__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_karma_ui_directives_dnd_index_js__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_karma_ui_directives_pin_index_js__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_karma_ui_directives_viewable_index_js__ = __webpack_require__(230);

























//指令




var obj = {
  KButton: __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_button_index_js__["a" /* default */],
  KInput: __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_input_index_js__["a" /* default */],
  KSelect: __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_select_index_js__["a" /* default */],
  KOption: __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_option_index_js__["a" /* default */],
  KRadio: __WEBPACK_IMPORTED_MODULE_7_karma_ui_packages_radio_index_js__["a" /* default */],
  KCheckbox: __WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_checkbox_index_js__["a" /* default */],
  KInputNumber: __WEBPACK_IMPORTED_MODULE_9_karma_ui_packages_input_number_index_js__["a" /* default */],
  KArea: __WEBPACK_IMPORTED_MODULE_10_karma_ui_packages_area_index_js__["a" /* default */],
  KPopup: __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_popup_index_js__["a" /* default */],
  Dialog: __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_dialog_index_js__["a" /* default */],
  KToTop: __WEBPACK_IMPORTED_MODULE_17_karma_ui_packages_to_top_index_js__["a" /* default */],
  KIcon: __WEBPACK_IMPORTED_MODULE_24_karma_ui_packages_icon_index_js__["a" /* default */],
  Tips: __WEBPACK_IMPORTED_MODULE_15_karma_ui_packages_tips_index_js__["a" /* default */],
  Loading: __WEBPACK_IMPORTED_MODULE_16_karma_ui_packages_loading_index_js__["a" /* default */],
  Dnd: __WEBPACK_IMPORTED_MODULE_25_karma_ui_directives_dnd_index_js__["a" /* default */],
  Pin: __WEBPACK_IMPORTED_MODULE_26_karma_ui_directives_pin_index_js__["a" /* default */],
  KCarousel: __WEBPACK_IMPORTED_MODULE_13_karma_ui_packages_carousel_index_js__["a" /* default */],
  KCarouselItem: __WEBPACK_IMPORTED_MODULE_14_karma_ui_packages_carousel_item_index_js__["a" /* default */],
  Viewable: __WEBPACK_IMPORTED_MODULE_27_karma_ui_directives_viewable_index_js__["a" /* default */],
  KPagination: __WEBPACK_IMPORTED_MODULE_18_karma_ui_packages_pagination_index_js__["a" /* default */],
  KDatePicker: __WEBPACK_IMPORTED_MODULE_19_karma_ui_packages_date_picker_index_js__["a" /* default */],
  KScrollbar: __WEBPACK_IMPORTED_MODULE_20_karma_ui_packages_scrollbar_index_js__["a" /* default */],
  KTransition: __WEBPACK_IMPORTED_MODULE_21_karma_ui_packages_transition_index_js__["a" /* default */],
  KTable: __WEBPACK_IMPORTED_MODULE_22_karma_ui_packages_table_index_js__["a" /* default */],
  KPosition: __WEBPACK_IMPORTED_MODULE_23_karma_ui_packages_position_index_js__["a" /* default */]
};

/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var comp in obj) {
      Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_setPropsGlobal_js__["a" /* default */])(obj[comp], opts[comp]);
      Vue.use(obj[comp], opts);
    }
  }
});

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//全局配置各个组件的参数，如果prop有默认值，就可以全局设置参数
// 例：
// Vue.use(karmaUI, {
//   KButton: {
//     size: 'large',
//     type: 'danger',
//     tag: 'span'
//   },
//   KInput: {
//     size: 'large',
//     type: 'number',
//   }
// })
/* harmony default export */ __webpack_exports__["a"] = (function (comp) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (comp.props) {
    var props = comp.props;
    for (var prop in props) {
      if ('default' in props[prop]) {
        if (options[prop]) {
          props[prop].default = options[prop];
        }
      }
    }
  }
});

/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 118 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_jsx__ = __webpack_require__(34);

__WEBPACK_IMPORTED_MODULE_0__button_jsx__["a" /* default */].install = function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  Vue.component(__WEBPACK_IMPORTED_MODULE_0__button_jsx__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__button_jsx__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__button_jsx__["a" /* default */]);

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
module.exports = __webpack_require__(3).Object.assign;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(122) });


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(30);
var toObject = __webpack_require__(31);
var IObject = __webpack_require__(37);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(16)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(28);
var toAbsoluteIndex = __webpack_require__(124);
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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(39);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
var $Object = __webpack_require__(3).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__ = __webpack_require__(23);

__WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__["a" /* default */]);

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_reg_index_js__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_object_js__ = __webpack_require__(52);



var _methods;


// import tips from 'karma-ui/packages/tips/index.js';

var baseOpts = {
  type: void 0, //验证类型：如身份证是idnumber
  when: 'change', //验证时机
  message: '', //错误时给出的提示信息
  showTips: true, //是否显示提示
  useOldValue: false, //如果输入的无效，是否用oldValue填充，最好配合input事件
  digits: 2, //小数位数，只有验证小数的时候才有效
  max: void 0, //最大值
  min: void 0 //最小值
};
var validate = {
  props: {
    validate: Object
  },
  computed: {
    validateOptions: function validateOptions() {
      return Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_object_js__["a" /* merge */])({}, baseOpts, this.validate);
    },
    needValidate: function needValidate() {
      return this.validate && this.validateOptions.type !== undefined && this.validateOptions.type !== "";
    },
    isIntOrCurrency: function isIntOrCurrency() {
      var t = this.validateOptions.type;
      return this.needValidate && /(int|currency)/.test(t);
    }
  },
  methods: (_methods = {
    validate_number: function validate_number(val) {
      //验证数字。是数字返回true
      return __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_reg_index_js__["d" /* number */].test(val);
    },
    validate_digits: function validate_digits(val) {
      //验证小数位数，返回的是小数位数。如果非数字或者小数有问题，返回 -1
      var v = parseFloat(val);
      var stringV = val + '';
      if (typeof v === "number") {
        var arr = stringV.split('.');
        if (arr.length === 1) {
          return 0; //此时是整数
        } else if (arr.length > 2) {
          return -1; //此时小数有问题
        } else {
          return arr[1].length;
        }
      }
      return -1;
    },
    validate_max_min: function validate_max_min(val) {
      //验证最大值和最小值
      var fail = void 0,
          msg = void 0,
          errorType = void 0;
      if (this.isIntOrCurrency) {
        //验证最大最小值是否超出范围
        if (this.validateOptions.max !== '' && this.validateOptions.max !== undefined) {
          if (this.validateOptions.max < val) {
            errorType = {
              value: this.validateOptions.max
            };
            fail = true;
            msg = '不能超出最大值';
          }
        }
        if (this.validateOptions.min !== '' && this.validateOptions.min !== undefined) {
          if (this.validateOptions.min > val) {
            errorType = {
              value: this.validateOptions.min
            };
            fail = true;
            msg = '不能小于最小值';
          }
        }
      }
      return {
        fail: fail,
        msg: msg,
        errorType: errorType
      };
    }
  }, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_methods, "currency>0", function currency0(val) {
    var fail = void 0,
        msg = void 0,
        errorType = void 0;
    if (__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_reg_index_js__["b" /* nonnegativeFloat */].test(val)) {
      //如果是非负数
      var d = this.validate_digits(val); //获取小数位数
      if (d > this.validateOptions.digits) {
        msg = '\u8BF7\u4FDD\u75590-' + this.validateOptions.digits + '\u4F4D\u5C0F\u6570';
        errorType = {
          digits: this.validateOptions.digits
        };
        fail = true;
      }
    } else {
      msg = '请输入正数';
      errorType = {
        clear: true
      };
      fail = true;
    }
    return { fail: fail, msg: msg, errorType: errorType };
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_methods, 'toValidate', function toValidate(val, successCallback, errorCallback) {
    if (val === '' || (typeof val === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(val)) === undefined) return;
    var errorType = null; //保存错误类型，在errorCallback中当做参数返回
    /**
     * 错误类型列表：告诉错误回调做些什么
     * 1.{digits:n} //小数位数应该是n
     * 2.{clear:true} //清空输入框
     * 3.{value:v}//设置为v
     * 其他错误类型待添加
     */
    var type = this.validateOptions.type.toLowerCase();
    var msg = this.validateOptions.message;
    var fail = false;
    if (type === 'idnumber') {
      if (!__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_reg_index_js__["a" /* idNumber */].test(val)) {
        msg = msg || '身份证号码不合法';
        fail = true;
      }
    } else if (type === 'currency>=0' || type === 'currency>0') {
      var vali = this['currency>0'](val);
      fail = vali.fail;
      msg = vali.msg;
      errorType = vali.errorType;
      if (type === 'currency>0') {
        if (parseFloat(val) === 0) {
          fail = true;
          msg = '金额不能为0';
          errorType = { clear: true };
        }
      }
    } else if (type === 'int>0') {
      //大于0 的正整数
      if (!__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_reg_index_js__["c" /* nonzeroInt */].test(val)) {
        msg = '请填写大于0的数值';
        fail = true;
        if (!this.validate_number()) {
          msg = '不能包含字母或者特殊字符';
        }
      }
    }
    var _max_min = this.validate_max_min(val);
    if (_max_min.fail !== undefined) {
      fail = _max_min.fail;
      msg = _max_min.msg;
      errorType = _max_min.errorType;
    }

    this.validateOptions.showTips && fail && this.$tips().setContent(msg).setType('error').hide(2500);

    !fail && successCallback && successCallback();
    fail && errorCallback && errorCallback(errorType);
  }), _methods)
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(47);
module.exports = __webpack_require__(48).f('iterator');


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(39);
var defined = __webpack_require__(38);
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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(46);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(25);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(14);
var getKeys = __webpack_require__(27);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(15);
var toObject = __webpack_require__(31);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(136);
var step = __webpack_require__(72);
var Iterators = __webpack_require__(24);
var toIObject = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(45)(Array, 'Array', function (iterated, kind) {
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
/* 136 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139);
__webpack_require__(51);
__webpack_require__(143);
__webpack_require__(144);
module.exports = __webpack_require__(3).Symbol;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(15);
var DESCRIPTORS = __webpack_require__(9);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(70);
var META = __webpack_require__(49).KEY;
var $fails = __webpack_require__(16);
var shared = __webpack_require__(41);
var setToStringTag = __webpack_require__(25);
var uid = __webpack_require__(29);
var wks = __webpack_require__(4);
var wksExt = __webpack_require__(48);
var wksDefine = __webpack_require__(50);
var enumKeys = __webpack_require__(140);
var isArray = __webpack_require__(73);
var anObject = __webpack_require__(14);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(36);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(46);
var gOPNExt = __webpack_require__(141);
var $GOPD = __webpack_require__(142);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(27);
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
  __webpack_require__(74).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(30).f = $propertyIsEnumerable;
  __webpack_require__(43).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(22)) {
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(30);
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
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17);
var gOPN = __webpack_require__(74).f;
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
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(30);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(36);
var has = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(66);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50)('asyncIterator');


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50)('observable');


/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return idNumber; });
/* unused harmony export telephone */
/* unused harmony export mobile */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return number; });
/* unused harmony export numberFloat */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return nonzeroInt; });
/* unused harmony export nonnegativeInt */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return nonnegativeFloat; });
/* unused harmony export float */
/* unused harmony export currency */
/* unused harmony export nonzeroCurrency */
/* unused harmony export chinese */
/* unused harmony export password */
/* unused harmony export email */
//身份证号
var idNumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
//固定电话号码
var telephone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
//手机号码
var mobile = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
//只允许数字
var number = /^[0-9]*$/;
//0到2位小数的正实数，包括0
var numberFloat = /^[0-9]+(.[0-9]{0,2})?$/;
//非0正整数
var nonzeroInt = /^\+?[1-9][0-9]*$/;
//非负整数 包括0
var nonnegativeInt = /^\d+$/;
//非负浮点数 包括0
var nonnegativeFloat = /^\d+(\.\d+)?$/;
//正浮点数
var float = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;

//两位小数，金额正则 ，包括0
var currency = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/;
//0到2位小数，大于0 不等于0
var nonzeroCurrency = /^-?(?!0+(\.0*)?$)\d+(\.\d{0,2})?$/;

//汉字
var chinese = /^[\u4e00-\u9fa5]*$/;

//密码 以字母开头，6-18位
var password = /^[a-zA-Z]\w{5,17}$/;
//邮箱
var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select_vue__ = __webpack_require__(53);

__WEBPACK_IMPORTED_MODULE_0__select_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__select_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__select_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__select_vue__["a" /* default */]);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ctx = '___clickoutside';
var downTarget = '___downTarget';
var upTarget = '___upTarget';
/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding) {
    var fn = function fn(e) {
      // if (el.contains(e.target)) {
      //   return null
      // } else {
      //   el[ctx].bindingFn(e)
      // }
      // console.log(e)
      if (e.type === 'mousedown') {
        el[downTarget] = e.target;
      } else if (e.type === 'mouseup') {
        el[upTarget] = e.target;
      }
      if (el.contains(el[downTarget]) || el.contains(el[upTarget])) {
        return;
      } else {
        el[ctx].bindingFn(e);
      }
    };
    el[ctx] = {
      documentHandler: fn,
      methodName: binding.expression,
      bindingFn: binding.value
      // document.addEventListener('click', el[ctx].documentHandler)
    };document.addEventListener('mousedown', el[ctx].documentHandler);
    document.addEventListener('mouseup', el[ctx].documentHandler);
  },
  update: function update(el, binding) {
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },
  unbind: function unbind(el) {
    // document.removeEventListener('click', el[ctx].documentHandler)
    document.removeEventListener('mousedown', el[ctx].documentHandler);
    document.removeEventListener('mouseup', el[ctx].documentHandler);
    delete el[ctx];
    delete el[upTarget];
    delete el[downTarget];
  }
});

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var esc = '___esc';
var escCode = 27;
/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding) {
    var fn = function fn(e) {
      if (e.keyCode == escCode) {
        el[esc].bindingFn(e);
      } else {
        return null;
      }
    };
    el[esc] = {
      documentFn: fn,
      methodName: binding.expression,
      bindingFn: binding.value
    };
    document.addEventListener('keyup', el[esc].documentFn);
  },
  update: function update(el, binding) {
    el[esc].methodName = binding.expression;
    el[esc].bindingFn = binding.value;
  },
  unbind: function unbind(el) {
    document.removeEventListener('keyup', el[esc].documentFn);
    delete el[esc];
  }
});

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_position_position__ = __webpack_require__(78);


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    KPosition: __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_position_position__["a" /* default */]
  },
  data: function data() {
    return {
      parent: null,
      list: null,
      visible: false,
      //position组件要有个left和top值，这两个值是相对于vm的$el计算的
      //在此，vm就是select组件
      vm: null,
      afterShow: function afterShow() {}
    };
  },

  methods: {
    init: function init(vm) {
      this.list = vm.$slots.default;
      this.vm = vm;
    },
    show: function show(callback) {
      this.visible = true;
      if (callback) {
        this.afterShow = callback;
      }
    },
    handleEnter: function handleEnter() {
      if (this.afterShow) {
        this.afterShow();
      }
    },
    hide: function hide() {
      this.visible = false;
    },
    destroy: function destroy() {
      this.parent.removeChild(this.$el);
      this.$destroy();
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];

    var transitionProps = {
      on: {
        'enter': this.handleEnter
      }
    };
    var positionProps = {
      props: {
        tag: "ul",
        vm: this.vm
      },
      class: {
        "k-select__list": true
      },
      directives: [{
        name: "show",
        value: this.visible
      }],
      on: {
        mousedown: function mousedown(e) {
          e.stopPropagation();
          _this.vm.$emit('inovering', true);
        },
        mouseup: function mouseup(e) {
          e.stopPropagation();
          _this.vm.$emit('inovering', false);
        }
      }
    };
    return h(
      "transition",
      __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
        attrs: { name: "k-transition-slide-down" }
      }, transitionProps]),
      [h(
        "k-position",
        positionProps,
        [this.list]
      )]
    );
  }
});

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__radio_vue__ = __webpack_require__(55);

__WEBPACK_IMPORTED_MODULE_0__radio_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__radio_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__radio_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__radio_vue__["a" /* default */]);

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("label", { staticClass: "k-radio" }, [
    _c("input", {
      staticClass: "k-radio__input",
      attrs: { type: "radio", name: _vm.name, disabled: _vm.disabled },
      domProps: { checked: _vm.state, value: _vm.value },
      on: { change: _vm.onChange }
    }),
    _vm._v(" "),
    _c("span", { staticClass: "k-radio__icon" }),
    _vm._v(" "),
    _c("span", { staticClass: "k-radio__text" }, [_vm._t("default")], 2)
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-b8d820c4", esExports)
  }
}

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkbox__ = __webpack_require__(56);

__WEBPACK_IMPORTED_MODULE_0__checkbox__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__checkbox__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__checkbox__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__checkbox__["a" /* default */]);

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("label", { staticClass: "k-checkbox" }, [
    _vm.type === "arr"
      ? _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.arr,
              expression: "arr"
            }
          ],
          staticClass: "k-checkbox__input",
          attrs: { type: "checkbox", disabled: _vm.disabled },
          domProps: {
            value: _vm.value,
            checked: Array.isArray(_vm.arr)
              ? _vm._i(_vm.arr, _vm.value) > -1
              : _vm.arr
          },
          on: {
            change: [
              function($event) {
                var $$a = _vm.arr,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = _vm.value,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 && (_vm.arr = $$a.concat([$$v]))
                  } else {
                    $$i > -1 &&
                      (_vm.arr = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
                  }
                } else {
                  _vm.arr = $$c
                }
              },
              _vm._change
            ]
          }
        })
      : _c("input", {
          staticClass: "k-checkbox__input",
          attrs: { type: "checkbox", disabled: _vm.disabled },
          domProps: { checked: _vm.checked, value: _vm.value },
          on: { change: _vm._change }
        }),
    _vm._v(" "),
    _c("span", { staticClass: "k-checkbox__icon" }),
    _vm._v(" "),
    _vm.text !== ""
      ? _c("span", { staticClass: "k-checkbox__text" }, [
          _vm._v(_vm._s(_vm.text))
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-b40adff4", esExports)
  }
}

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__ = __webpack_require__(155);

__WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__["a" /* default */]);

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_inputNumber_vue__ = __webpack_require__(81);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_dda91bae_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_inputNumber_vue__ = __webpack_require__(156);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_inputNumber_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_dda91bae_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_inputNumber_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/input-number/inputNumber.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dda91bae", Component.options)
  } else {
    hotAPI.reload("data-v-dda91bae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "k-input",
    {
      class: { "k-input-number--disabled": this.disabled },
      attrs: {
        disabled: _vm.disabled,
        styles: _vm.styles,
        "input-styles": _vm.inputStyles,
        size: _vm.size,
        validate: _vm.validate
      },
      on: { focus: _vm.handleFocus, blur: _vm.handleBlur },
      model: {
        value: _vm.inputValue,
        callback: function($$v) {
          _vm.inputValue = $$v
        },
        expression: "inputValue"
      }
    },
    [
      _c(
        "div",
        {
          class: {
            "k-input-number": true,
            "k-input-number--disabled": _vm.value <= _vm.min
          },
          attrs: { slot: "prepend" },
          on: { click: _vm.minus },
          slot: "prepend"
        },
        [_c("i", { staticClass: "k-input-number-icon" }, [_vm._v("-")])]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          class: {
            "k-input-number--right": true,
            "k-input-number--disabled": _vm.max <= _vm.value
          },
          attrs: { slot: "append" },
          on: { click: _vm.add },
          slot: "append"
        },
        [_c("i", { staticClass: "k-input-number-icon" }, [_vm._v("+")])]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-dda91bae", esExports)
  }
}

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__area_vue__ = __webpack_require__(158);

__WEBPACK_IMPORTED_MODULE_0__area_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__area_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__area_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__area_vue__["a" /* default */]);

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_area_vue__ = __webpack_require__(82);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_d8981974_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_area_vue__ = __webpack_require__(164);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_area_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_d8981974_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_area_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/area/area.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d8981974", Component.options)
  } else {
    hotAPI.reload("data-v-d8981974", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(161);
module.exports = __webpack_require__(3).Array.from;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(12);
var $export = __webpack_require__(6);
var toObject = __webpack_require__(31);
var call = __webpack_require__(83);
var isArrayIter = __webpack_require__(84);
var toLength = __webpack_require__(28);
var createProperty = __webpack_require__(162);
var getIterFn = __webpack_require__(85);

$export($export.S + $export.F * !__webpack_require__(86)(function (iter) { Array.from(iter); }), 'Array', {
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
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(20);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return province; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return city; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return county; });


var province = [{ "name": "北京市", "code": "110000" }, { "name": "天津市", "code": "120000" }, { "name": "河北省", "code": "130000" }, { "name": "山西省", "code": "140000" }, { "name": "内蒙古自治区", "code": "150000" }, { "name": "辽宁省", "code": "210000" }, { "name": "吉林省", "code": "220000" }, { "name": "黑龙江省", "code": "230000" }, { "name": "上海市", "code": "310000" }, { "name": "江苏省", "code": "320000" }, { "name": "浙江省", "code": "330000" }, { "name": "安徽省", "code": "340000" }, { "name": "福建省", "code": "350000" }, { "name": "江西省", "code": "360000" }, { "name": "山东省", "code": "370000" }, { "name": "河南省", "code": "410000" }, { "name": "湖北省", "code": "420000" }, { "name": "湖南省", "code": "430000" }, { "name": "广东省", "code": "440000" }, { "name": "广西壮族自治区", "code": "450000" }, { "name": "海南省", "code": "460000" }, { "name": "重庆市", "code": "500000" }, { "name": "四川省", "code": "510000" }, { "name": "贵州省", "code": "520000" }, { "name": "云南省", "code": "530000" }, { "name": "西藏自治区", "code": "540000" }, { "name": "陕西省", "code": "610000" }, { "name": "甘肃省", "code": "620000" }, { "name": "青海省", "code": "630000" }, { "name": "宁夏回族自治区", "code": "640000" }, { "name": "新疆维吾尔自治区", "code": "650000" }];

var city = { "110000": [{ "name": "北京市", "code": "110100" }], "120000": [{ "name": "天津市", "code": "120100" }], "130000": [{ "name": "石家庄市", "code": "130100" }, { "name": "唐山市", "code": "130200" }, { "name": "秦皇岛市", "code": "130300" }, { "name": "邯郸市", "code": "130400" }, { "name": "邢台市", "code": "130500" }, { "name": "保定市", "code": "130600" }, { "name": "张家口市", "code": "130700" }, { "name": "承德市", "code": "130800" }, { "name": "沧州市", "code": "130900" }, { "name": "廊坊市", "code": "131000" }, { "name": "衡水市", "code": "131100" }], "140000": [{ "name": "太原市", "code": "140100" }, { "name": "大同市", "code": "140200" }, { "name": "阳泉市", "code": "140300" }, { "name": "长治市", "code": "140400" }, { "name": "晋城市", "code": "140500" }, { "name": "朔州市", "code": "140600" }, { "name": "晋中市", "code": "140700" }, { "name": "运城市", "code": "140800" }, { "name": "忻州市", "code": "140900" }, { "name": "临汾市", "code": "141000" }, { "name": "吕梁市", "code": "141100" }], "150000": [{ "name": "呼和浩特市", "code": "150100" }, { "name": "包头市", "code": "150200" }, { "name": "乌海市", "code": "150300" }, { "name": "赤峰市", "code": "150400" }, { "name": "通辽市", "code": "150500" }, { "name": "鄂尔多斯市", "code": "150600" }, { "name": "呼伦贝尔市", "code": "150700" }, { "name": "巴彦淖尔市", "code": "150800" }, { "name": "乌兰察布市", "code": "150900" }, { "name": "兴安盟", "code": "152200" }, { "name": "锡林郭勒盟", "code": "152500" }, { "name": "阿拉善盟", "code": "152900" }], "210000": [{ "name": "沈阳市", "code": "210100" }, { "name": "大连市", "code": "210200" }, { "name": "鞍山市", "code": "210300" }, { "name": "抚顺市", "code": "210400" }, { "name": "本溪市", "code": "210500" }, { "name": "丹东市", "code": "210600" }, { "name": "锦州市", "code": "210700" }, { "name": "营口市", "code": "210800" }, { "name": "阜新市", "code": "210900" }, { "name": "辽阳市", "code": "211000" }, { "name": "盘锦市", "code": "211100" }, { "name": "铁岭市", "code": "211200" }, { "name": "朝阳市", "code": "211300" }, { "name": "葫芦岛市", "code": "211400" }], "220000": [{ "name": "长春市", "code": "220100" }, { "name": "吉林市", "code": "220200" }, { "name": "四平市", "code": "220300" }, { "name": "辽源市", "code": "220400" }, { "name": "通化市", "code": "220500" }, { "name": "白山市", "code": "220600" }, { "name": "松原市", "code": "220700" }, { "name": "白城市", "code": "220800" }, { "name": "延边朝鲜族自治州", "code": "222400" }], "230000": [{ "name": "哈尔滨市", "code": "230100" }, { "name": "齐齐哈尔市", "code": "230200" }, { "name": "鸡西市", "code": "230300" }, { "name": "鹤岗市", "code": "230400" }, { "name": "双鸭山市", "code": "230500" }, { "name": "大庆市", "code": "230600" }, { "name": "伊春市", "code": "230700" }, { "name": "佳木斯市", "code": "230800" }, { "name": "七台河市", "code": "230900" }, { "name": "牡丹江市", "code": "231000" }, { "name": "黑河市", "code": "231100" }, { "name": "绥化市", "code": "231200" }, { "name": "大兴安岭地区", "code": "232700" }], "310000": [{ "name": "上海市", "code": "310100" }], "320000": [{ "name": "南京市", "code": "320100" }, { "name": "无锡市", "code": "320200" }, { "name": "徐州市", "code": "320300" }, { "name": "常州市", "code": "320400" }, { "name": "苏州市", "code": "320500" }, { "name": "南通市", "code": "320600" }, { "name": "连云港市", "code": "320700" }, { "name": "淮安市", "code": "320800" }, { "name": "盐城市", "code": "320900" }, { "name": "扬州市", "code": "321000" }, { "name": "镇江市", "code": "321100" }, { "name": "泰州市", "code": "321200" }, { "name": "宿迁市", "code": "321300" }], "330000": [{ "name": "杭州市", "code": "330100" }, { "name": "宁波市", "code": "330200" }, { "name": "温州市", "code": "330300" }, { "name": "嘉兴市", "code": "330400" }, { "name": "湖州市", "code": "330500" }, { "name": "绍兴市", "code": "330600" }, { "name": "金华市", "code": "330700" }, { "name": "衢州市", "code": "330800" }, { "name": "舟山市", "code": "330900" }, { "name": "台州市", "code": "331000" }, { "name": "丽水市", "code": "331100" }], "340000": [{ "name": "合肥市", "code": "340100" }, { "name": "芜湖市", "code": "340200" }, { "name": "蚌埠市", "code": "340300" }, { "name": "淮南市", "code": "340400" }, { "name": "马鞍山市", "code": "340500" }, { "name": "淮北市", "code": "340600" }, { "name": "铜陵市", "code": "340700" }, { "name": "安庆市", "code": "340800" }, { "name": "黄山市", "code": "341000" }, { "name": "滁州市", "code": "341100" }, { "name": "阜阳市", "code": "341200" }, { "name": "宿州市", "code": "341300" }, { "name": "六安市", "code": "341500" }, { "name": "亳州市", "code": "341600" }, { "name": "池州市", "code": "341700" }, { "name": "宣城市", "code": "341800" }], "350000": [{ "name": "福州市", "code": "350100" }, { "name": "厦门市", "code": "350200" }, { "name": "莆田市", "code": "350300" }, { "name": "三明市", "code": "350400" }, { "name": "泉州市", "code": "350500" }, { "name": "漳州市", "code": "350600" }, { "name": "南平市", "code": "350700" }, { "name": "龙岩市", "code": "350800" }, { "name": "宁德市", "code": "350900" }], "360000": [{ "name": "南昌市", "code": "360100" }, { "name": "景德镇市", "code": "360200" }, { "name": "萍乡市", "code": "360300" }, { "name": "九江市", "code": "360400" }, { "name": "新余市", "code": "360500" }, { "name": "鹰潭市", "code": "360600" }, { "name": "赣州市", "code": "360700" }, { "name": "吉安市", "code": "360800" }, { "name": "宜春市", "code": "360900" }, { "name": "抚州市", "code": "361000" }, { "name": "上饶市", "code": "361100" }], "370000": [{ "name": "济南市", "code": "370100" }, { "name": "青岛市", "code": "370200" }, { "name": "淄博市", "code": "370300" }, { "name": "枣庄市", "code": "370400" }, { "name": "东营市", "code": "370500" }, { "name": "烟台市", "code": "370600" }, { "name": "潍坊市", "code": "370700" }, { "name": "济宁市", "code": "370800" }, { "name": "泰安市", "code": "370900" }, { "name": "威海市", "code": "371000" }, { "name": "日照市", "code": "371100" }, { "name": "莱芜市", "code": "371200" }, { "name": "临沂市", "code": "371300" }, { "name": "德州市", "code": "371400" }, { "name": "聊城市", "code": "371500" }, { "name": "滨州市", "code": "371600" }, { "name": "菏泽市", "code": "371700" }], "410000": [{ "name": "郑州市", "code": "410100" }, { "name": "开封市", "code": "410200" }, { "name": "洛阳市", "code": "410300" }, { "name": "平顶山市", "code": "410400" }, { "name": "安阳市", "code": "410500" }, { "name": "鹤壁市", "code": "410600" }, { "name": "新乡市", "code": "410700" }, { "name": "焦作市", "code": "410800" }, { "name": "濮阳市", "code": "410900" }, { "name": "许昌市", "code": "411000" }, { "name": "漯河市", "code": "411100" }, { "name": "三门峡市", "code": "411200" }, { "name": "南阳市", "code": "411300" }, { "name": "商丘市", "code": "411400" }, { "name": "信阳市", "code": "411500" }, { "name": "周口市", "code": "411600" }, { "name": "驻马店市", "code": "411700" }, { "name": "济源市", "code": "419000" }], "420000": [{ "name": "武汉市", "code": "420100" }, { "name": "黄石市", "code": "420200" }, { "name": "十堰市", "code": "420300" }, { "name": "宜昌市", "code": "420500" }, { "name": "襄阳市", "code": "420600" }, { "name": "鄂州市", "code": "420700" }, { "name": "荆门市", "code": "420800" }, { "name": "孝感市", "code": "420900" }, { "name": "荆州市", "code": "421000" }, { "name": "黄冈市", "code": "421100" }, { "name": "咸宁市", "code": "421200" }, { "name": "随州市", "code": "421300" }, { "name": "恩施土家族苗族自治州", "code": "422800" }], "430000": [{ "name": "长沙市", "code": "430100" }, { "name": "株洲市", "code": "430200" }, { "name": "湘潭市", "code": "430300" }, { "name": "衡阳市", "code": "430400" }, { "name": "邵阳市", "code": "430500" }, { "name": "岳阳市", "code": "430600" }, { "name": "常德市", "code": "430700" }, { "name": "张家界市", "code": "430800" }, { "name": "益阳市", "code": "430900" }, { "name": "郴州市", "code": "431000" }, { "name": "永州市", "code": "431100" }, { "name": "怀化市", "code": "431200" }, { "name": "娄底市", "code": "431300" }, { "name": "湘西土家族苗族自治州", "code": "433100" }], "440000": [{ "name": "广州市", "code": "440100" }, { "name": "韶关市", "code": "440200" }, { "name": "深圳市", "code": "440300" }, { "name": "珠海市", "code": "440400" }, { "name": "汕头市", "code": "440500" }, { "name": "佛山市", "code": "440600" }, { "name": "江门市", "code": "440700" }, { "name": "湛江市", "code": "440800" }, { "name": "茂名市", "code": "440900" }, { "name": "肇庆市", "code": "441200" }, { "name": "惠州市", "code": "441300" }, { "name": "梅州市", "code": "441400" }, { "name": "汕尾市", "code": "441500" }, { "name": "河源市", "code": "441600" }, { "name": "阳江市", "code": "441700" }, { "name": "清远市", "code": "441800" }, { "name": "东莞市", "code": "441900" }, { "name": "中山市", "code": "442000" }, { "name": "潮州市", "code": "445100" }, { "name": "揭阳市", "code": "445200" }, { "name": "云浮市", "code": "445300" }], "450000": [{ "name": "南宁市", "code": "450100" }, { "name": "柳州市", "code": "450200" }, { "name": "桂林市", "code": "450300" }, { "name": "梧州市", "code": "450400" }, { "name": "北海市", "code": "450500" }, { "name": "防城港市", "code": "450600" }, { "name": "钦州市", "code": "450700" }, { "name": "贵港市", "code": "450800" }, { "name": "玉林市", "code": "450900" }, { "name": "百色市", "code": "451000" }, { "name": "贺州市", "code": "451100" }, { "name": "河池市", "code": "451200" }, { "name": "来宾市", "code": "451300" }, { "name": "崇左市", "code": "451400" }], "460000": [{ "name": "海口市", "code": "460100" }, { "name": "三亚市", "code": "460200" }, { "name": "三沙市", "code": "460300" }], "500000": [{ "name": "重庆市", "code": "500100" }], "510000": [{ "name": "成都市", "code": "510100" }, { "name": "自贡市", "code": "510300" }, { "name": "攀枝花市", "code": "510400" }, { "name": "泸州市", "code": "510500" }, { "name": "德阳市", "code": "510600" }, { "name": "绵阳市", "code": "510700" }, { "name": "广元市", "code": "510800" }, { "name": "遂宁市", "code": "510900" }, { "name": "内江市", "code": "511000" }, { "name": "乐山市", "code": "511100" }, { "name": "南充市", "code": "511300" }, { "name": "眉山市", "code": "511400" }, { "name": "宜宾市", "code": "511500" }, { "name": "广安市", "code": "511600" }, { "name": "达州市", "code": "511700" }, { "name": "雅安市", "code": "511800" }, { "name": "巴中市", "code": "511900" }, { "name": "资阳市", "code": "512000" }, { "name": "阿坝藏族羌族自治州", "code": "513200" }, { "name": "甘孜藏族自治州", "code": "513300" }, { "name": "凉山彝族自治州", "code": "513400" }], "520000": [{ "name": "贵阳市", "code": "520100" }, { "name": "六盘水市", "code": "520200" }, { "name": "遵义市", "code": "520300" }, { "name": "安顺市", "code": "520400" }, { "name": "毕节市", "code": "520500" }, { "name": "铜仁市", "code": "520600" }, { "name": "黔西南布依族苗族自治州", "code": "522300" }, { "name": "黔东南苗族侗族自治州", "code": "522600" }, { "name": "黔南布依族苗族自治州", "code": "522700" }], "530000": [{ "name": "昆明市", "code": "530100" }, { "name": "曲靖市", "code": "530300" }, { "name": "玉溪市", "code": "530400" }, { "name": "保山市", "code": "530500" }, { "name": "昭通市", "code": "530600" }, { "name": "丽江市", "code": "530700" }, { "name": "普洱市", "code": "530800" }, { "name": "临沧市", "code": "530900" }, { "name": "楚雄彝族自治州", "code": "532300" }, { "name": "红河哈尼族彝族自治州", "code": "532500" }, { "name": "文山壮族苗族自治州", "code": "532600" }, { "name": "西双版纳傣族自治州", "code": "532800" }, { "name": "大理白族自治州", "code": "532900" }, { "name": "德宏傣族景颇族自治州", "code": "533100" }, { "name": "怒江傈僳族自治州", "code": "533300" }, { "name": "迪庆藏族自治州", "code": "533400" }], "540000": [{ "name": "拉萨市", "code": "540100" }, { "name": "日喀则市", "code": "540200" }, { "name": "昌都市", "code": "540300" }, { "name": "林芝市", "code": "540400" }, { "name": "山南地区", "code": "542200" }, { "name": "那曲地区", "code": "542400" }, { "name": "阿里地区", "code": "542500" }], "610000": [{ "name": "西安市", "code": "610100" }, { "name": "铜川市", "code": "610200" }, { "name": "宝鸡市", "code": "610300" }, { "name": "咸阳市", "code": "610400" }, { "name": "渭南市", "code": "610500" }, { "name": "延安市", "code": "610600" }, { "name": "汉中市", "code": "610700" }, { "name": "榆林市", "code": "610800" }, { "name": "安康市", "code": "610900" }, { "name": "商洛市", "code": "611000" }], "620000": [{ "name": "兰州市", "code": "620100" }, { "name": "嘉峪关市", "code": "620200" }, { "name": "金昌市", "code": "620300" }, { "name": "白银市", "code": "620400" }, { "name": "天水市", "code": "620500" }, { "name": "武威市", "code": "620600" }, { "name": "张掖市", "code": "620700" }, { "name": "平凉市", "code": "620800" }, { "name": "酒泉市", "code": "620900" }, { "name": "庆阳市", "code": "621000" }, { "name": "定西市", "code": "621100" }, { "name": "陇南市", "code": "621200" }, { "name": "临夏回族自治州", "code": "622900" }, { "name": "甘南藏族自治州", "code": "623000" }], "630000": [{ "name": "西宁市", "code": "630100" }, { "name": "海东市", "code": "630200" }, { "name": "海北藏族自治州", "code": "632200" }, { "name": "黄南藏族自治州", "code": "632300" }, { "name": "海南藏族自治州", "code": "632500" }, { "name": "果洛藏族自治州", "code": "632600" }, { "name": "玉树藏族自治州", "code": "632700" }, { "name": "海西蒙古族藏族自治州", "code": "632800" }], "640000": [{ "name": "银川市", "code": "640100" }, { "name": "石嘴山市", "code": "640200" }, { "name": "吴忠市", "code": "640300" }, { "name": "固原市", "code": "640400" }, { "name": "中卫市", "code": "640500" }], "650000": [{ "name": "乌鲁木齐市", "code": "650100" }, { "name": "克拉玛依市", "code": "650200" }, { "name": "吐鲁番市", "code": "650400" }, { "name": "哈密地区", "code": "652200" }, { "name": "昌吉回族自治州", "code": "652300" }, { "name": "博尔塔拉蒙古自治州", "code": "652700" }, { "name": "巴音郭楞蒙古自治州", "code": "652800" }, { "name": "阿克苏地区", "code": "652900" }, { "name": "克孜勒苏柯尔克孜自治州", "code": "653000" }, { "name": "喀什地区", "code": "653100" }, { "name": "和田地区", "code": "653200" }, { "name": "伊犁哈萨克自治州", "code": "654000" }, { "name": "塔城地区", "code": "654200" }, { "name": "阿勒泰地区", "code": "654300" }, { "name": "石河子市", "code": "659001" }] };

var county = { "110100": [{ "name": "东城区", "code": "110101" }, { "name": "西城区", "code": "110102" }, { "name": "朝阳区", "code": "110105" }, { "name": "丰台区", "code": "110106" }, { "name": "石景山区", "code": "110107" }, { "name": "海淀区", "code": "110108" }, { "name": "门头沟区", "code": "110109" }, { "name": "房山区", "code": "110111" }, { "name": "通州区", "code": "110112" }, { "name": "顺义区", "code": "110113" }, { "name": "昌平区", "code": "110114" }, { "name": "大兴区", "code": "110115" }, { "name": "怀柔区", "code": "110116" }, { "name": "平谷区", "code": "110117" }, { "name": "密云县", "code": "110228" }, { "name": "延庆县", "code": "110229" }], "120100": [{ "name": "和平区", "code": "120101" }, { "name": "河东区", "code": "120102" }, { "name": "河西区", "code": "120103" }, { "name": "南开区", "code": "120104" }, { "name": "河北区", "code": "120105" }, { "name": "红桥区", "code": "120106" }, { "name": "东丽区", "code": "120110" }, { "name": "西青区", "code": "120111" }, { "name": "津南区", "code": "120112" }, { "name": "北辰区", "code": "120113" }, { "name": "武清区", "code": "120114" }, { "name": "宝坻区", "code": "120115" }, { "name": "滨海新区", "code": "120116" }, { "name": "宁河区", "code": "120117" }, { "name": "静海区", "code": "120118" }, { "name": "蓟县", "code": "120225" }], "130100": [{ "name": "长安区", "code": "130102" }, { "name": "桥西区", "code": "130104" }, { "name": "新华区", "code": "130105" }, { "name": "井陉矿区", "code": "130107" }, { "name": "裕华区", "code": "130108" }, { "name": "藁城区", "code": "130109" }, { "name": "鹿泉区", "code": "130110" }, { "name": "栾城区", "code": "130111" }, { "name": "井陉县", "code": "130121" }, { "name": "正定县", "code": "130123" }, { "name": "行唐县", "code": "130125" }, { "name": "灵寿县", "code": "130126" }, { "name": "高邑县", "code": "130127" }, { "name": "深泽县", "code": "130128" }, { "name": "赞皇县", "code": "130129" }, { "name": "无极县", "code": "130130" }, { "name": "平山县", "code": "130131" }, { "name": "元氏县", "code": "130132" }, { "name": "赵县", "code": "130133" }, { "name": "晋州市", "code": "130183" }, { "name": "新乐市", "code": "130184" }, { "name": "桥东区", "code": "130103" }, { "name": "栾城县", "code": "130124" }, { "name": "辛集市", "code": "130181" }, { "name": "鹿泉市", "code": "130185" }], "130200": [{ "name": "路南区", "code": "130202" }, { "name": "路北区", "code": "130203" }, { "name": "古冶区", "code": "130204" }, { "name": "开平区", "code": "130205" }, { "name": "丰南区", "code": "130207" }, { "name": "丰润区", "code": "130208" }, { "name": "曹妃甸区", "code": "130209" }, { "name": "滦县", "code": "130223" }, { "name": "滦南县", "code": "130224" }, { "name": "乐亭县", "code": "130225" }, { "name": "迁西县", "code": "130227" }, { "name": "玉田县", "code": "130229" }, { "name": "遵化市", "code": "130281" }, { "name": "迁安市", "code": "130283" }, { "name": "唐海县", "code": "130230" }], "130300": [{ "name": "海港区", "code": "130302" }, { "name": "山海关区", "code": "130303" }, { "name": "北戴河区", "code": "130304" }, { "name": "抚宁区", "code": "130306" }, { "name": "青龙满族自治县", "code": "130321" }, { "name": "昌黎县", "code": "130322" }, { "name": "卢龙县", "code": "130324" }], "130400": [{ "name": "邯山区", "code": "130402" }, { "name": "丛台区", "code": "130403" }, { "name": "复兴区", "code": "130404" }, { "name": "峰峰矿区", "code": "130406" }, { "name": "邯郸县", "code": "130421" }, { "name": "临漳县", "code": "130423" }, { "name": "成安县", "code": "130424" }, { "name": "大名县", "code": "130425" }, { "name": "涉县", "code": "130426" }, { "name": "磁县", "code": "130427" }, { "name": "肥乡县", "code": "130428" }, { "name": "永年县", "code": "130429" }, { "name": "邱县", "code": "130430" }, { "name": "鸡泽县", "code": "130431" }, { "name": "广平县", "code": "130432" }, { "name": "馆陶县", "code": "130433" }, { "name": "魏县", "code": "130434" }, { "name": "曲周县", "code": "130435" }, { "name": "武安市", "code": "130481" }], "130500": [{ "name": "桥东区", "code": "130502" }, { "name": "桥西区", "code": "130503" }, { "name": "邢台县", "code": "130521" }, { "name": "临城县", "code": "130522" }, { "name": "内丘县", "code": "130523" }, { "name": "柏乡县", "code": "130524" }, { "name": "隆尧县", "code": "130525" }, { "name": "任县", "code": "130526" }, { "name": "南和县", "code": "130527" }, { "name": "宁晋县", "code": "130528" }, { "name": "巨鹿县", "code": "130529" }, { "name": "新河县", "code": "130530" }, { "name": "广宗县", "code": "130531" }, { "name": "平乡县", "code": "130532" }, { "name": "威县", "code": "130533" }, { "name": "清河县", "code": "130534" }, { "name": "临西县", "code": "130535" }, { "name": "南宫市", "code": "130581" }, { "name": "沙河市", "code": "130582" }], "130600": [{ "name": "竞秀区", "code": "130602" }, { "name": "莲池区", "code": "130606" }, { "name": "满城区", "code": "130607" }, { "name": "清苑区", "code": "130608" }, { "name": "徐水区", "code": "130609" }, { "name": "涞水县", "code": "130623" }, { "name": "阜平县", "code": "130624" }, { "name": "定兴县", "code": "130626" }, { "name": "唐县", "code": "130627" }, { "name": "高阳县", "code": "130628" }, { "name": "容城县", "code": "130629" }, { "name": "涞源县", "code": "130630" }, { "name": "望都县", "code": "130631" }, { "name": "安新县", "code": "130632" }, { "name": "易县", "code": "130633" }, { "name": "曲阳县", "code": "130634" }, { "name": "蠡县", "code": "130635" }, { "name": "顺平县", "code": "130636" }, { "name": "博野县", "code": "130637" }, { "name": "雄县", "code": "130638" }, { "name": "涿州市", "code": "130681" }, { "name": "安国市", "code": "130683" }, { "name": "高碑店市", "code": "130684" }, { "name": "北市区", "code": "130603" }, { "name": "南市区", "code": "130604" }], "130700": [{ "name": "桥东区", "code": "130702" }, { "name": "桥西区", "code": "130703" }, { "name": "宣化区", "code": "130705" }, { "name": "下花园区", "code": "130706" }, { "name": "宣化县", "code": "130721" }, { "name": "张北县", "code": "130722" }, { "name": "康保县", "code": "130723" }, { "name": "沽源县", "code": "130724" }, { "name": "尚义县", "code": "130725" }, { "name": "蔚县", "code": "130726" }, { "name": "阳原县", "code": "130727" }, { "name": "怀安县", "code": "130728" }, { "name": "万全县", "code": "130729" }, { "name": "怀来县", "code": "130730" }, { "name": "涿鹿县", "code": "130731" }, { "name": "赤城县", "code": "130732" }, { "name": "崇礼县", "code": "130733" }], "130800": [{ "name": "双桥区", "code": "130802" }, { "name": "双滦区", "code": "130803" }, { "name": "鹰手营子矿区", "code": "130804" }, { "name": "承德县", "code": "130821" }, { "name": "兴隆县", "code": "130822" }, { "name": "平泉县", "code": "130823" }, { "name": "滦平县", "code": "130824" }, { "name": "隆化县", "code": "130825" }, { "name": "丰宁满族自治县", "code": "130826" }, { "name": "宽城满族自治县", "code": "130827" }, { "name": "围场满族蒙古族自治县", "code": "130828" }], "130900": [{ "name": "新华区", "code": "130902" }, { "name": "运河区", "code": "130903" }, { "name": "沧县", "code": "130921" }, { "name": "青县", "code": "130922" }, { "name": "东光县", "code": "130923" }, { "name": "海兴县", "code": "130924" }, { "name": "盐山县", "code": "130925" }, { "name": "肃宁县", "code": "130926" }, { "name": "南皮县", "code": "130927" }, { "name": "吴桥县", "code": "130928" }, { "name": "献县", "code": "130929" }, { "name": "孟村回族自治县", "code": "130930" }, { "name": "泊头市", "code": "130981" }, { "name": "任丘市", "code": "130982" }, { "name": "黄骅市", "code": "130983" }, { "name": "河间市", "code": "130984" }], "131000": [{ "name": "安次区", "code": "131002" }, { "name": "广阳区", "code": "131003" }, { "name": "固安县", "code": "131022" }, { "name": "永清县", "code": "131023" }, { "name": "香河县", "code": "131024" }, { "name": "大城县", "code": "131025" }, { "name": "文安县", "code": "131026" }, { "name": "大厂回族自治县", "code": "131028" }, { "name": "霸州市", "code": "131081" }, { "name": "三河市", "code": "131082" }], "131100": [{ "name": "桃城区", "code": "131102" }, { "name": "枣强县", "code": "131121" }, { "name": "武邑县", "code": "131122" }, { "name": "武强县", "code": "131123" }, { "name": "饶阳县", "code": "131124" }, { "name": "安平县", "code": "131125" }, { "name": "故城县", "code": "131126" }, { "name": "景县", "code": "131127" }, { "name": "阜城县", "code": "131128" }, { "name": "冀州市", "code": "131181" }, { "name": "深州市", "code": "131182" }], "140100": [{ "name": "小店区", "code": "140105" }, { "name": "迎泽区", "code": "140106" }, { "name": "杏花岭区", "code": "140107" }, { "name": "尖草坪区", "code": "140108" }, { "name": "万柏林区", "code": "140109" }, { "name": "晋源区", "code": "140110" }, { "name": "清徐县", "code": "140121" }, { "name": "阳曲县", "code": "140122" }, { "name": "娄烦县", "code": "140123" }, { "name": "古交市", "code": "140181" }], "140200": [{ "name": "城区", "code": "140202" }, { "name": "矿区", "code": "140203" }, { "name": "南郊区", "code": "140211" }, { "name": "新荣区", "code": "140212" }, { "name": "阳高县", "code": "140221" }, { "name": "天镇县", "code": "140222" }, { "name": "广灵县", "code": "140223" }, { "name": "灵丘县", "code": "140224" }, { "name": "浑源县", "code": "140225" }, { "name": "左云县", "code": "140226" }, { "name": "大同县", "code": "140227" }], "140300": [{ "name": "城区", "code": "140302" }, { "name": "矿区", "code": "140303" }, { "name": "郊区", "code": "140311" }, { "name": "平定县", "code": "140321" }, { "name": "盂县", "code": "140322" }], "140400": [{ "name": "城区", "code": "140402" }, { "name": "郊区", "code": "140411" }, { "name": "长治县", "code": "140421" }, { "name": "襄垣县", "code": "140423" }, { "name": "屯留县", "code": "140424" }, { "name": "平顺县", "code": "140425" }, { "name": "黎城县", "code": "140426" }, { "name": "壶关县", "code": "140427" }, { "name": "长子县", "code": "140428" }, { "name": "武乡县", "code": "140429" }, { "name": "沁县", "code": "140430" }, { "name": "沁源县", "code": "140431" }, { "name": "潞城市", "code": "140481" }], "140500": [{ "name": "城区", "code": "140502" }, { "name": "沁水县", "code": "140521" }, { "name": "阳城县", "code": "140522" }, { "name": "陵川县", "code": "140524" }, { "name": "泽州县", "code": "140525" }, { "name": "高平市", "code": "140581" }], "140600": [{ "name": "朔城区", "code": "140602" }, { "name": "平鲁区", "code": "140603" }, { "name": "山阴县", "code": "140621" }, { "name": "应县", "code": "140622" }, { "name": "右玉县", "code": "140623" }, { "name": "怀仁县", "code": "140624" }], "140700": [{ "name": "榆次区", "code": "140702" }, { "name": "榆社县", "code": "140721" }, { "name": "左权县", "code": "140722" }, { "name": "和顺县", "code": "140723" }, { "name": "昔阳县", "code": "140724" }, { "name": "寿阳县", "code": "140725" }, { "name": "太谷县", "code": "140726" }, { "name": "祁县", "code": "140727" }, { "name": "平遥县", "code": "140728" }, { "name": "灵石县", "code": "140729" }, { "name": "介休市", "code": "140781" }], "140800": [{ "name": "盐湖区", "code": "140802" }, { "name": "临猗县", "code": "140821" }, { "name": "万荣县", "code": "140822" }, { "name": "闻喜县", "code": "140823" }, { "name": "稷山县", "code": "140824" }, { "name": "新绛县", "code": "140825" }, { "name": "绛县", "code": "140826" }, { "name": "垣曲县", "code": "140827" }, { "name": "夏县", "code": "140828" }, { "name": "平陆县", "code": "140829" }, { "name": "芮城县", "code": "140830" }, { "name": "永济市", "code": "140881" }, { "name": "河津市", "code": "140882" }], "140900": [{ "name": "忻府区", "code": "140902" }, { "name": "定襄县", "code": "140921" }, { "name": "五台县", "code": "140922" }, { "name": "代县", "code": "140923" }, { "name": "繁峙县", "code": "140924" }, { "name": "宁武县", "code": "140925" }, { "name": "静乐县", "code": "140926" }, { "name": "神池县", "code": "140927" }, { "name": "五寨县", "code": "140928" }, { "name": "岢岚县", "code": "140929" }, { "name": "河曲县", "code": "140930" }, { "name": "保德县", "code": "140931" }, { "name": "偏关县", "code": "140932" }, { "name": "原平市", "code": "140981" }], "141000": [{ "name": "尧都区", "code": "141002" }, { "name": "曲沃县", "code": "141021" }, { "name": "翼城县", "code": "141022" }, { "name": "襄汾县", "code": "141023" }, { "name": "洪洞县", "code": "141024" }, { "name": "古县", "code": "141025" }, { "name": "安泽县", "code": "141026" }, { "name": "浮山县", "code": "141027" }, { "name": "吉县", "code": "141028" }, { "name": "乡宁县", "code": "141029" }, { "name": "大宁县", "code": "141030" }, { "name": "隰县", "code": "141031" }, { "name": "永和县", "code": "141032" }, { "name": "蒲县", "code": "141033" }, { "name": "汾西县", "code": "141034" }, { "name": "侯马市", "code": "141081" }, { "name": "霍州市", "code": "141082" }], "141100": [{ "name": "离石区", "code": "141102" }, { "name": "文水县", "code": "141121" }, { "name": "交城县", "code": "141122" }, { "name": "兴县", "code": "141123" }, { "name": "临县", "code": "141124" }, { "name": "柳林县", "code": "141125" }, { "name": "石楼县", "code": "141126" }, { "name": "岚县", "code": "141127" }, { "name": "方山县", "code": "141128" }, { "name": "中阳县", "code": "141129" }, { "name": "交口县", "code": "141130" }, { "name": "孝义市", "code": "141181" }, { "name": "汾阳市", "code": "141182" }], "150100": [{ "name": "新城区", "code": "150102" }, { "name": "回民区", "code": "150103" }, { "name": "玉泉区", "code": "150104" }, { "name": "赛罕区", "code": "150105" }, { "name": "土默特左旗", "code": "150121" }, { "name": "托克托县", "code": "150122" }, { "name": "和林格尔县", "code": "150123" }, { "name": "清水河县", "code": "150124" }, { "name": "武川县", "code": "150125" }], "150200": [{ "name": "东河区", "code": "150202" }, { "name": "昆都仑区", "code": "150203" }, { "name": "青山区", "code": "150204" }, { "name": "石拐区", "code": "150205" }, { "name": "白云鄂博矿区", "code": "150206" }, { "name": "九原区", "code": "150207" }, { "name": "土默特右旗", "code": "150221" }, { "name": "固阳县", "code": "150222" }, { "name": "达尔罕茂明安联合旗", "code": "150223" }], "150300": [{ "name": "海勃湾区", "code": "150302" }, { "name": "海南区", "code": "150303" }, { "name": "乌达区", "code": "150304" }], "150400": [{ "name": "红山区", "code": "150402" }, { "name": "元宝山区", "code": "150403" }, { "name": "松山区", "code": "150404" }, { "name": "阿鲁科尔沁旗", "code": "150421" }, { "name": "巴林左旗", "code": "150422" }, { "name": "巴林右旗", "code": "150423" }, { "name": "林西县", "code": "150424" }, { "name": "克什克腾旗", "code": "150425" }, { "name": "翁牛特旗", "code": "150426" }, { "name": "喀喇沁旗", "code": "150428" }, { "name": "宁城县", "code": "150429" }, { "name": "敖汉旗", "code": "150430" }], "150500": [{ "name": "科尔沁区", "code": "150502" }, { "name": "科尔沁左翼中旗", "code": "150521" }, { "name": "科尔沁左翼后旗", "code": "150522" }, { "name": "开鲁县", "code": "150523" }, { "name": "库伦旗", "code": "150524" }, { "name": "奈曼旗", "code": "150525" }, { "name": "扎鲁特旗", "code": "150526" }, { "name": "霍林郭勒市", "code": "150581" }], "150600": [{ "name": "东胜区", "code": "150602" }, { "name": "达拉特旗", "code": "150621" }, { "name": "准格尔旗", "code": "150622" }, { "name": "鄂托克前旗", "code": "150623" }, { "name": "鄂托克旗", "code": "150624" }, { "name": "杭锦旗", "code": "150625" }, { "name": "乌审旗", "code": "150626" }, { "name": "伊金霍洛旗", "code": "150627" }], "150700": [{ "name": "海拉尔区", "code": "150702" }, { "name": "扎赉诺尔区", "code": "150703" }, { "name": "阿荣旗", "code": "150721" }, { "name": "莫力达瓦达斡尔族自治旗", "code": "150722" }, { "name": "鄂伦春自治旗", "code": "150723" }, { "name": "鄂温克族自治旗", "code": "150724" }, { "name": "陈巴尔虎旗", "code": "150725" }, { "name": "新巴尔虎左旗", "code": "150726" }, { "name": "新巴尔虎右旗", "code": "150727" }, { "name": "满洲里市", "code": "150781" }, { "name": "牙克石市", "code": "150782" }, { "name": "扎兰屯市", "code": "150783" }, { "name": "额尔古纳市", "code": "150784" }, { "name": "根河市", "code": "150785" }], "150800": [{ "name": "临河区", "code": "150802" }, { "name": "五原县", "code": "150821" }, { "name": "磴口县", "code": "150822" }, { "name": "乌拉特前旗", "code": "150823" }, { "name": "乌拉特中旗", "code": "150824" }, { "name": "乌拉特后旗", "code": "150825" }, { "name": "杭锦后旗", "code": "150826" }], "150900": [{ "name": "集宁区", "code": "150902" }, { "name": "卓资县", "code": "150921" }, { "name": "化德县", "code": "150922" }, { "name": "商都县", "code": "150923" }, { "name": "兴和县", "code": "150924" }, { "name": "凉城县", "code": "150925" }, { "name": "察哈尔右翼前旗", "code": "150926" }, { "name": "察哈尔右翼中旗", "code": "150927" }, { "name": "察哈尔右翼后旗", "code": "150928" }, { "name": "四子王旗", "code": "150929" }, { "name": "丰镇市", "code": "150981" }], "152200": [{ "name": "乌兰浩特市", "code": "152201" }, { "name": "阿尔山市", "code": "152202" }, { "name": "科尔沁右翼前旗", "code": "152221" }, { "name": "科尔沁右翼中旗", "code": "152222" }, { "name": "扎赉特旗", "code": "152223" }, { "name": "突泉县", "code": "152224" }], "152500": [{ "name": "二连浩特市", "code": "152501" }, { "name": "锡林浩特市", "code": "152502" }, { "name": "阿巴嘎旗", "code": "152522" }, { "name": "苏尼特左旗", "code": "152523" }, { "name": "苏尼特右旗", "code": "152524" }, { "name": "东乌珠穆沁旗", "code": "152525" }, { "name": "西乌珠穆沁旗", "code": "152526" }, { "name": "太仆寺旗", "code": "152527" }, { "name": "镶黄旗", "code": "152528" }, { "name": "正镶白旗", "code": "152529" }, { "name": "正蓝旗", "code": "152530" }, { "name": "多伦县", "code": "152531" }], "152900": [{ "name": "阿拉善左旗", "code": "152921" }, { "name": "阿拉善右旗", "code": "152922" }, { "name": "额济纳旗", "code": "152923" }], "210100": [{ "name": "和平区", "code": "210102" }, { "name": "沈河区", "code": "210103" }, { "name": "大东区", "code": "210104" }, { "name": "皇姑区", "code": "210105" }, { "name": "铁西区", "code": "210106" }, { "name": "苏家屯区", "code": "210111" }, { "name": "浑南区", "code": "210112" }, { "name": "沈北新区", "code": "210113" }, { "name": "于洪区", "code": "210114" }, { "name": "辽中县", "code": "210122" }, { "name": "康平县", "code": "210123" }, { "name": "法库县", "code": "210124" }, { "name": "新民市", "code": "210181" }], "210200": [{ "name": "中山区", "code": "210202" }, { "name": "西岗区", "code": "210203" }, { "name": "沙河口区", "code": "210204" }, { "name": "甘井子区", "code": "210211" }, { "name": "旅顺口区", "code": "210212" }, { "name": "金州区", "code": "210213" }, { "name": "长海县", "code": "210224" }, { "name": "瓦房店市", "code": "210281" }, { "name": "普兰店市", "code": "210282" }, { "name": "庄河市", "code": "210283" }], "210300": [{ "name": "铁东区", "code": "210302" }, { "name": "铁西区", "code": "210303" }, { "name": "立山区", "code": "210304" }, { "name": "千山区", "code": "210311" }, { "name": "台安县", "code": "210321" }, { "name": "岫岩满族自治县", "code": "210323" }, { "name": "海城市", "code": "210381" }], "210400": [{ "name": "新抚区", "code": "210402" }, { "name": "东洲区", "code": "210403" }, { "name": "望花区", "code": "210404" }, { "name": "顺城区", "code": "210411" }, { "name": "抚顺县", "code": "210421" }, { "name": "新宾满族自治县", "code": "210422" }, { "name": "清原满族自治县", "code": "210423" }], "210500": [{ "name": "平山区", "code": "210502" }, { "name": "溪湖区", "code": "210503" }, { "name": "明山区", "code": "210504" }, { "name": "南芬区", "code": "210505" }, { "name": "本溪满族自治县", "code": "210521" }, { "name": "桓仁满族自治县", "code": "210522" }], "210600": [{ "name": "元宝区", "code": "210602" }, { "name": "振兴区", "code": "210603" }, { "name": "振安区", "code": "210604" }, { "name": "宽甸满族自治县", "code": "210624" }, { "name": "东港市", "code": "210681" }, { "name": "凤城市", "code": "210682" }], "210700": [{ "name": "古塔区", "code": "210702" }, { "name": "凌河区", "code": "210703" }, { "name": "太和区", "code": "210711" }, { "name": "黑山县", "code": "210726" }, { "name": "义县", "code": "210727" }, { "name": "凌海市", "code": "210781" }, { "name": "北镇市", "code": "210782" }], "210800": [{ "name": "站前区", "code": "210802" }, { "name": "西市区", "code": "210803" }, { "name": "鲅鱼圈区", "code": "210804" }, { "name": "老边区", "code": "210811" }, { "name": "盖州市", "code": "210881" }, { "name": "大石桥市", "code": "210882" }], "210900": [{ "name": "海州区", "code": "210902" }, { "name": "新邱区", "code": "210903" }, { "name": "太平区", "code": "210904" }, { "name": "清河门区", "code": "210905" }, { "name": "细河区", "code": "210911" }, { "name": "阜新蒙古族自治县", "code": "210921" }, { "name": "彰武县", "code": "210922" }], "211000": [{ "name": "白塔区", "code": "211002" }, { "name": "文圣区", "code": "211003" }, { "name": "宏伟区", "code": "211004" }, { "name": "弓长岭区", "code": "211005" }, { "name": "太子河区", "code": "211011" }, { "name": "辽阳县", "code": "211021" }, { "name": "灯塔市", "code": "211081" }], "211100": [{ "name": "双台子区", "code": "211102" }, { "name": "兴隆台区", "code": "211103" }, { "name": "大洼县", "code": "211121" }, { "name": "盘山县", "code": "211122" }], "211200": [{ "name": "银州区", "code": "211202" }, { "name": "清河区", "code": "211204" }, { "name": "铁岭县", "code": "211221" }, { "name": "西丰县", "code": "211223" }, { "name": "昌图县", "code": "211224" }, { "name": "调兵山市", "code": "211281" }, { "name": "开原市", "code": "211282" }], "211300": [{ "name": "双塔区", "code": "211302" }, { "name": "龙城区", "code": "211303" }, { "name": "朝阳县", "code": "211321" }, { "name": "建平县", "code": "211322" }, { "name": "喀喇沁左翼蒙古族自治县", "code": "211324" }, { "name": "北票市", "code": "211381" }, { "name": "凌源市", "code": "211382" }], "211400": [{ "name": "连山区", "code": "211402" }, { "name": "龙港区", "code": "211403" }, { "name": "南票区", "code": "211404" }, { "name": "绥中县", "code": "211421" }, { "name": "建昌县", "code": "211422" }, { "name": "兴城市", "code": "211481" }], "220100": [{ "name": "南关区", "code": "220102" }, { "name": "宽城区", "code": "220103" }, { "name": "朝阳区", "code": "220104" }, { "name": "二道区", "code": "220105" }, { "name": "绿园区", "code": "220106" }, { "name": "双阳区", "code": "220112" }, { "name": "九台区", "code": "220113" }, { "name": "农安县", "code": "220122" }, { "name": "榆树市", "code": "220182" }, { "name": "德惠市", "code": "220183" }], "220200": [{ "name": "昌邑区", "code": "220202" }, { "name": "龙潭区", "code": "220203" }, { "name": "船营区", "code": "220204" }, { "name": "丰满区", "code": "220211" }, { "name": "永吉县", "code": "220221" }, { "name": "蛟河市", "code": "220281" }, { "name": "桦甸市", "code": "220282" }, { "name": "舒兰市", "code": "220283" }, { "name": "磐石市", "code": "220284" }], "220300": [{ "name": "铁西区", "code": "220302" }, { "name": "铁东区", "code": "220303" }, { "name": "梨树县", "code": "220322" }, { "name": "伊通满族自治县", "code": "220323" }, { "name": "公主岭市", "code": "220381" }, { "name": "双辽市", "code": "220382" }], "220400": [{ "name": "龙山区", "code": "220402" }, { "name": "西安区", "code": "220403" }, { "name": "东丰县", "code": "220421" }, { "name": "东辽县", "code": "220422" }], "220500": [{ "name": "东昌区", "code": "220502" }, { "name": "二道江区", "code": "220503" }, { "name": "通化县", "code": "220521" }, { "name": "辉南县", "code": "220523" }, { "name": "柳河县", "code": "220524" }, { "name": "梅河口市", "code": "220581" }, { "name": "集安市", "code": "220582" }], "220600": [{ "name": "浑江区", "code": "220602" }, { "name": "江源区", "code": "220605" }, { "name": "抚松县", "code": "220621" }, { "name": "靖宇县", "code": "220622" }, { "name": "长白朝鲜族自治县", "code": "220623" }, { "name": "临江市", "code": "220681" }], "220700": [{ "name": "宁江区", "code": "220702" }, { "name": "前郭尔罗斯蒙古族自治县", "code": "220721" }, { "name": "长岭县", "code": "220722" }, { "name": "乾安县", "code": "220723" }, { "name": "扶余市", "code": "220781" }], "220800": [{ "name": "洮北区", "code": "220802" }, { "name": "镇赉县", "code": "220821" }, { "name": "通榆县", "code": "220822" }, { "name": "洮南市", "code": "220881" }, { "name": "大安市", "code": "220882" }], "222400": [{ "name": "延吉市", "code": "222401" }, { "name": "图们市", "code": "222402" }, { "name": "敦化市", "code": "222403" }, { "name": "珲春市", "code": "222404" }, { "name": "龙井市", "code": "222405" }, { "name": "和龙市", "code": "222406" }, { "name": "汪清县", "code": "222424" }, { "name": "安图县", "code": "222426" }], "230100": [{ "name": "道里区", "code": "230102" }, { "name": "南岗区", "code": "230103" }, { "name": "道外区", "code": "230104" }, { "name": "平房区", "code": "230108" }, { "name": "松北区", "code": "230109" }, { "name": "香坊区", "code": "230110" }, { "name": "呼兰区", "code": "230111" }, { "name": "阿城区", "code": "230112" }, { "name": "双城区", "code": "230113" }, { "name": "依兰县", "code": "230123" }, { "name": "方正县", "code": "230124" }, { "name": "宾县", "code": "230125" }, { "name": "巴彦县", "code": "230126" }, { "name": "木兰县", "code": "230127" }, { "name": "通河县", "code": "230128" }, { "name": "延寿县", "code": "230129" }, { "name": "尚志市", "code": "230183" }, { "name": "五常市", "code": "230184" }], "230200": [{ "name": "龙沙区", "code": "230202" }, { "name": "建华区", "code": "230203" }, { "name": "铁锋区", "code": "230204" }, { "name": "昂昂溪区", "code": "230205" }, { "name": "富拉尔基区", "code": "230206" }, { "name": "碾子山区", "code": "230207" }, { "name": "梅里斯达斡尔族区", "code": "230208" }, { "name": "龙江县", "code": "230221" }, { "name": "依安县", "code": "230223" }, { "name": "泰来县", "code": "230224" }, { "name": "甘南县", "code": "230225" }, { "name": "富裕县", "code": "230227" }, { "name": "克山县", "code": "230229" }, { "name": "克东县", "code": "230230" }, { "name": "拜泉县", "code": "230231" }, { "name": "讷河市", "code": "230281" }], "230300": [{ "name": "鸡冠区", "code": "230302" }, { "name": "恒山区", "code": "230303" }, { "name": "滴道区", "code": "230304" }, { "name": "梨树区", "code": "230305" }, { "name": "城子河区", "code": "230306" }, { "name": "麻山区", "code": "230307" }, { "name": "鸡东县", "code": "230321" }, { "name": "虎林市", "code": "230381" }, { "name": "密山市", "code": "230382" }], "230400": [{ "name": "向阳区", "code": "230402" }, { "name": "工农区", "code": "230403" }, { "name": "南山区", "code": "230404" }, { "name": "兴安区", "code": "230405" }, { "name": "东山区", "code": "230406" }, { "name": "兴山区", "code": "230407" }, { "name": "萝北县", "code": "230421" }, { "name": "绥滨县", "code": "230422" }], "230500": [{ "name": "尖山区", "code": "230502" }, { "name": "岭东区", "code": "230503" }, { "name": "四方台区", "code": "230505" }, { "name": "宝山区", "code": "230506" }, { "name": "集贤县", "code": "230521" }, { "name": "友谊县", "code": "230522" }, { "name": "宝清县", "code": "230523" }, { "name": "饶河县", "code": "230524" }], "230600": [{ "name": "萨尔图区", "code": "230602" }, { "name": "龙凤区", "code": "230603" }, { "name": "让胡路区", "code": "230604" }, { "name": "红岗区", "code": "230605" }, { "name": "大同区", "code": "230606" }, { "name": "肇州县", "code": "230621" }, { "name": "肇源县", "code": "230622" }, { "name": "林甸县", "code": "230623" }, { "name": "杜尔伯特蒙古族自治县", "code": "230624" }], "230700": [{ "name": "伊春区", "code": "230702" }, { "name": "南岔区", "code": "230703" }, { "name": "友好区", "code": "230704" }, { "name": "西林区", "code": "230705" }, { "name": "翠峦区", "code": "230706" }, { "name": "新青区", "code": "230707" }, { "name": "美溪区", "code": "230708" }, { "name": "金山屯区", "code": "230709" }, { "name": "五营区", "code": "230710" }, { "name": "乌马河区", "code": "230711" }, { "name": "汤旺河区", "code": "230712" }, { "name": "带岭区", "code": "230713" }, { "name": "乌伊岭区", "code": "230714" }, { "name": "红星区", "code": "230715" }, { "name": "上甘岭区", "code": "230716" }, { "name": "嘉荫县", "code": "230722" }, { "name": "铁力市", "code": "230781" }], "230800": [{ "name": "向阳区", "code": "230803" }, { "name": "前进区", "code": "230804" }, { "name": "东风区", "code": "230805" }, { "name": "郊区", "code": "230811" }, { "name": "桦南县", "code": "230822" }, { "name": "桦川县", "code": "230826" }, { "name": "汤原县", "code": "230828" }, { "name": "抚远县", "code": "230833" }, { "name": "同江市", "code": "230881" }, { "name": "富锦市", "code": "230882" }], "230900": [{ "name": "新兴区", "code": "230902" }, { "name": "桃山区", "code": "230903" }, { "name": "茄子河区", "code": "230904" }, { "name": "勃利县", "code": "230921" }], "231000": [{ "name": "东安区", "code": "231002" }, { "name": "阳明区", "code": "231003" }, { "name": "爱民区", "code": "231004" }, { "name": "西安区", "code": "231005" }, { "name": "东宁县", "code": "231024" }, { "name": "林口县", "code": "231025" }, { "name": "绥芬河市", "code": "231081" }, { "name": "海林市", "code": "231083" }, { "name": "宁安市", "code": "231084" }, { "name": "穆棱市", "code": "231085" }], "231100": [{ "name": "爱辉区", "code": "231102" }, { "name": "嫩江县", "code": "231121" }, { "name": "逊克县", "code": "231123" }, { "name": "孙吴县", "code": "231124" }, { "name": "北安市", "code": "231181" }, { "name": "五大连池市", "code": "231182" }], "231200": [{ "name": "北林区", "code": "231202" }, { "name": "望奎县", "code": "231221" }, { "name": "兰西县", "code": "231222" }, { "name": "青冈县", "code": "231223" }, { "name": "庆安县", "code": "231224" }, { "name": "明水县", "code": "231225" }, { "name": "绥棱县", "code": "231226" }, { "name": "安达市", "code": "231281" }, { "name": "肇东市", "code": "231282" }, { "name": "海伦市", "code": "231283" }], "232700": [{ "name": "呼玛县", "code": "232721" }, { "name": "塔河县", "code": "232722" }, { "name": "漠河县", "code": "232723" }], "310100": [{ "name": "黄浦区", "code": "310101" }, { "name": "徐汇区", "code": "310104" }, { "name": "长宁区", "code": "310105" }, { "name": "静安区", "code": "310106" }, { "name": "普陀区", "code": "310107" }, { "name": "闸北区", "code": "310108" }, { "name": "虹口区", "code": "310109" }, { "name": "杨浦区", "code": "310110" }, { "name": "闵行区", "code": "310112" }, { "name": "宝山区", "code": "310113" }, { "name": "嘉定区", "code": "310114" }, { "name": "浦东新区", "code": "310115" }, { "name": "金山区", "code": "310116" }, { "name": "松江区", "code": "310117" }, { "name": "青浦区", "code": "310118" }, { "name": "奉贤区", "code": "310120" }, { "name": "崇明县", "code": "310151" }], "320100": [{ "name": "玄武区", "code": "320102" }, { "name": "秦淮区", "code": "320104" }, { "name": "建邺区", "code": "320105" }, { "name": "鼓楼区", "code": "320106" }, { "name": "浦口区", "code": "320111" }, { "name": "栖霞区", "code": "320113" }, { "name": "雨花台区", "code": "320114" }, { "name": "江宁区", "code": "320115" }, { "name": "六合区", "code": "320116" }, { "name": "溧水区", "code": "320117" }, { "name": "高淳区", "code": "320118" }], "320200": [{ "name": "崇安区", "code": "320202" }, { "name": "南长区", "code": "320203" }, { "name": "北塘区", "code": "320204" }, { "name": "锡山区", "code": "320205" }, { "name": "惠山区", "code": "320206" }, { "name": "滨湖区", "code": "320211" }, { "name": "江阴市", "code": "320281" }, { "name": "宜兴市", "code": "320282" }], "320300": [{ "name": "鼓楼区", "code": "320302" }, { "name": "云龙区", "code": "320303" }, { "name": "贾汪区", "code": "320305" }, { "name": "泉山区", "code": "320311" }, { "name": "铜山区", "code": "320312" }, { "name": "丰县", "code": "320321" }, { "name": "沛县", "code": "320322" }, { "name": "睢宁县", "code": "320324" }, { "name": "新沂市", "code": "320381" }, { "name": "邳州市", "code": "320382" }], "320400": [{ "name": "天宁区", "code": "320402" }, { "name": "钟楼区", "code": "320404" }, { "name": "新北区", "code": "320411" }, { "name": "武进区", "code": "320412" }, { "name": "金坛区", "code": "320413" }, { "name": "溧阳市", "code": "320481" }, { "name": "金坛市", "code": "320482" }], "320500": [{ "name": "虎丘区", "code": "320505" }, { "name": "吴中区", "code": "320506" }, { "name": "相城区", "code": "320507" }, { "name": "姑苏区", "code": "320508" }, { "name": "吴江区", "code": "320509" }, { "name": "常熟市", "code": "320581" }, { "name": "张家港市", "code": "320582" }, { "name": "昆山市", "code": "320583" }, { "name": "太仓市", "code": "320585" }], "320600": [{ "name": "崇川区", "code": "320602" }, { "name": "港闸区", "code": "320611" }, { "name": "通州区", "code": "320612" }, { "name": "海安县", "code": "320621" }, { "name": "如东县", "code": "320623" }, { "name": "启东市", "code": "320681" }, { "name": "如皋市", "code": "320682" }, { "name": "海门市", "code": "320684" }], "320700": [{ "name": "连云区", "code": "320703" }, { "name": "海州区", "code": "320706" }, { "name": "赣榆区", "code": "320707" }, { "name": "东海县", "code": "320722" }, { "name": "灌云县", "code": "320723" }, { "name": "灌南县", "code": "320724" }], "320800": [{ "name": "清河区", "code": "320802" }, { "name": "淮安区", "code": "320803" }, { "name": "淮阴区", "code": "320804" }, { "name": "清浦区", "code": "320811" }, { "name": "涟水县", "code": "320826" }, { "name": "洪泽县", "code": "320829" }, { "name": "盱眙县", "code": "320830" }, { "name": "金湖县", "code": "320831" }], "320900": [{ "name": "亭湖区", "code": "320902" }, { "name": "盐都区", "code": "320903" }, { "name": "大丰区", "code": "320904" }, { "name": "响水县", "code": "320921" }, { "name": "滨海县", "code": "320922" }, { "name": "阜宁县", "code": "320923" }, { "name": "射阳县", "code": "320924" }, { "name": "建湖县", "code": "320925" }, { "name": "东台市", "code": "320981" }], "321000": [{ "name": "广陵区", "code": "321002" }, { "name": "邗江区", "code": "321003" }, { "name": "江都区", "code": "321012" }, { "name": "宝应县", "code": "321023" }, { "name": "仪征市", "code": "321081" }, { "name": "高邮市", "code": "321084" }], "321100": [{ "name": "京口区", "code": "321102" }, { "name": "润州区", "code": "321111" }, { "name": "丹徒区", "code": "321112" }, { "name": "丹阳市", "code": "321181" }, { "name": "扬中市", "code": "321182" }, { "name": "句容市", "code": "321183" }], "321200": [{ "name": "海陵区", "code": "321202" }, { "name": "高港区", "code": "321203" }, { "name": "姜堰区", "code": "321204" }, { "name": "兴化市", "code": "321281" }, { "name": "靖江市", "code": "321282" }, { "name": "泰兴市", "code": "321283" }], "321300": [{ "name": "宿城区", "code": "321302" }, { "name": "宿豫区", "code": "321311" }, { "name": "沭阳县", "code": "321322" }, { "name": "泗阳县", "code": "321323" }, { "name": "泗洪县", "code": "321324" }], "330100": [{ "name": "上城区", "code": "330102" }, { "name": "下城区", "code": "330103" }, { "name": "江干区", "code": "330104" }, { "name": "拱墅区", "code": "330105" }, { "name": "西湖区", "code": "330106" }, { "name": "滨江区", "code": "330108" }, { "name": "萧山区", "code": "330109" }, { "name": "余杭区", "code": "330110" }, { "name": "富阳区", "code": "330111" }, { "name": "桐庐县", "code": "330122" }, { "name": "淳安县", "code": "330127" }, { "name": "建德市", "code": "330182" }, { "name": "临安市", "code": "330185" }], "330200": [{ "name": "海曙区", "code": "330203" }, { "name": "江东区", "code": "330204" }, { "name": "江北区", "code": "330205" }, { "name": "北仑区", "code": "330206" }, { "name": "镇海区", "code": "330211" }, { "name": "鄞州区", "code": "330212" }, { "name": "象山县", "code": "330225" }, { "name": "宁海县", "code": "330226" }, { "name": "余姚市", "code": "330281" }, { "name": "慈溪市", "code": "330282" }, { "name": "奉化市", "code": "330283" }], "330300": [{ "name": "鹿城区", "code": "330302" }, { "name": "龙湾区", "code": "330303" }, { "name": "瓯海区", "code": "330304" }, { "name": "洞头区", "code": "330305" }, { "name": "永嘉县", "code": "330324" }, { "name": "平阳县", "code": "330326" }, { "name": "苍南县", "code": "330327" }, { "name": "文成县", "code": "330328" }, { "name": "泰顺县", "code": "330329" }, { "name": "瑞安市", "code": "330381" }, { "name": "乐清市", "code": "330382" }], "330400": [{ "name": "南湖区", "code": "330402" }, { "name": "秀洲区", "code": "330411" }, { "name": "嘉善县", "code": "330421" }, { "name": "海盐县", "code": "330424" }, { "name": "海宁市", "code": "330481" }, { "name": "平湖市", "code": "330482" }, { "name": "桐乡市", "code": "330483" }], "330500": [{ "name": "吴兴区", "code": "330502" }, { "name": "南浔区", "code": "330503" }, { "name": "德清县", "code": "330521" }, { "name": "长兴县", "code": "330522" }, { "name": "安吉县", "code": "330523" }], "330600": [{ "name": "越城区", "code": "330602" }, { "name": "柯桥区", "code": "330603" }, { "name": "上虞区", "code": "330604" }, { "name": "新昌县", "code": "330624" }, { "name": "诸暨市", "code": "330681" }, { "name": "嵊州市", "code": "330683" }], "330700": [{ "name": "婺城区", "code": "330702" }, { "name": "金东区", "code": "330703" }, { "name": "武义县", "code": "330723" }, { "name": "浦江县", "code": "330726" }, { "name": "磐安县", "code": "330727" }, { "name": "兰溪市", "code": "330781" }, { "name": "义乌市", "code": "330782" }, { "name": "东阳市", "code": "330783" }, { "name": "永康市", "code": "330784" }], "330800": [{ "name": "柯城区", "code": "330802" }, { "name": "衢江区", "code": "330803" }, { "name": "常山县", "code": "330822" }, { "name": "开化县", "code": "330824" }, { "name": "龙游县", "code": "330825" }, { "name": "江山市", "code": "330881" }], "330900": [{ "name": "定海区", "code": "330902" }, { "name": "普陀区", "code": "330903" }, { "name": "岱山县", "code": "330921" }, { "name": "嵊泗县", "code": "330922" }], "331000": [{ "name": "椒江区", "code": "331002" }, { "name": "黄岩区", "code": "331003" }, { "name": "路桥区", "code": "331004" }, { "name": "玉环县", "code": "331021" }, { "name": "三门县", "code": "331022" }, { "name": "天台县", "code": "331023" }, { "name": "仙居县", "code": "331024" }, { "name": "温岭市", "code": "331081" }, { "name": "临海市", "code": "331082" }], "331100": [{ "name": "莲都区", "code": "331102" }, { "name": "青田县", "code": "331121" }, { "name": "缙云县", "code": "331122" }, { "name": "遂昌县", "code": "331123" }, { "name": "松阳县", "code": "331124" }, { "name": "云和县", "code": "331125" }, { "name": "庆元县", "code": "331126" }, { "name": "景宁畲族自治县", "code": "331127" }, { "name": "龙泉市", "code": "331181" }], "340100": [{ "name": "瑶海区", "code": "340102" }, { "name": "庐阳区", "code": "340103" }, { "name": "蜀山区", "code": "340104" }, { "name": "包河区", "code": "340111" }, { "name": "长丰县", "code": "340121" }, { "name": "肥东县", "code": "340122" }, { "name": "肥西县", "code": "340123" }, { "name": "庐江县", "code": "340124" }, { "name": "巢湖市", "code": "340181" }], "340200": [{ "name": "镜湖区", "code": "340202" }, { "name": "弋江区", "code": "340203" }, { "name": "鸠江区", "code": "340207" }, { "name": "三山区", "code": "340208" }, { "name": "芜湖县", "code": "340221" }, { "name": "繁昌县", "code": "340222" }, { "name": "南陵县", "code": "340223" }, { "name": "无为县", "code": "340225" }], "340300": [{ "name": "龙子湖区", "code": "340302" }, { "name": "蚌山区", "code": "340303" }, { "name": "禹会区", "code": "340304" }, { "name": "淮上区", "code": "340311" }, { "name": "怀远县", "code": "340321" }, { "name": "五河县", "code": "340322" }, { "name": "固镇县", "code": "340323" }], "340400": [{ "name": "大通区", "code": "340402" }, { "name": "田家庵区", "code": "340403" }, { "name": "谢家集区", "code": "340404" }, { "name": "八公山区", "code": "340405" }, { "name": "潘集区", "code": "340406" }, { "name": "凤台县", "code": "340421" }], "340500": [{ "name": "花山区", "code": "340503" }, { "name": "雨山区", "code": "340504" }, { "name": "博望区", "code": "340506" }, { "name": "当涂县", "code": "340521" }, { "name": "含山县", "code": "340522" }, { "name": "和县", "code": "340523" }], "340600": [{ "name": "杜集区", "code": "340602" }, { "name": "相山区", "code": "340603" }, { "name": "烈山区", "code": "340604" }, { "name": "濉溪县", "code": "340621" }], "340700": [{ "name": "铜官山区", "code": "340702" }, { "name": "狮子山区", "code": "340703" }, { "name": "郊区", "code": "340711" }, { "name": "铜陵县", "code": "340721" }], "340800": [{ "name": "迎江区", "code": "340802" }, { "name": "大观区", "code": "340803" }, { "name": "宜秀区", "code": "340811" }, { "name": "怀宁县", "code": "340822" }, { "name": "枞阳县", "code": "340823" }, { "name": "潜山县", "code": "340824" }, { "name": "太湖县", "code": "340825" }, { "name": "宿松县", "code": "340826" }, { "name": "望江县", "code": "340827" }, { "name": "岳西县", "code": "340828" }, { "name": "桐城市", "code": "340881" }], "341000": [{ "name": "屯溪区", "code": "341002" }, { "name": "黄山区", "code": "341003" }, { "name": "徽州区", "code": "341004" }, { "name": "歙县", "code": "341021" }, { "name": "休宁县", "code": "341022" }, { "name": "黟县", "code": "341023" }, { "name": "祁门县", "code": "341024" }], "341100": [{ "name": "琅琊区", "code": "341102" }, { "name": "南谯区", "code": "341103" }, { "name": "来安县", "code": "341122" }, { "name": "全椒县", "code": "341124" }, { "name": "定远县", "code": "341125" }, { "name": "凤阳县", "code": "341126" }, { "name": "天长市", "code": "341181" }, { "name": "明光市", "code": "341182" }], "341200": [{ "name": "颍州区", "code": "341202" }, { "name": "颍东区", "code": "341203" }, { "name": "颍泉区", "code": "341204" }, { "name": "临泉县", "code": "341221" }, { "name": "太和县", "code": "341222" }, { "name": "阜南县", "code": "341225" }, { "name": "颍上县", "code": "341226" }, { "name": "界首市", "code": "341282" }], "341300": [{ "name": "埇桥区", "code": "341302" }, { "name": "砀山县", "code": "341321" }, { "name": "萧县", "code": "341322" }, { "name": "灵璧县", "code": "341323" }, { "name": "泗县", "code": "341324" }], "341500": [{ "name": "金安区", "code": "341502" }, { "name": "裕安区", "code": "341503" }, { "name": "寿县", "code": "341521" }, { "name": "霍邱县", "code": "341522" }, { "name": "舒城县", "code": "341523" }, { "name": "金寨县", "code": "341524" }, { "name": "霍山县", "code": "341525" }], "341600": [{ "name": "谯城区", "code": "341602" }, { "name": "涡阳县", "code": "341621" }, { "name": "蒙城县", "code": "341622" }, { "name": "利辛县", "code": "341623" }], "341700": [{ "name": "贵池区", "code": "341702" }, { "name": "东至县", "code": "341721" }, { "name": "石台县", "code": "341722" }, { "name": "青阳县", "code": "341723" }], "341800": [{ "name": "宣州区", "code": "341802" }, { "name": "郎溪县", "code": "341821" }, { "name": "广德县", "code": "341822" }, { "name": "泾县", "code": "341823" }, { "name": "绩溪县", "code": "341824" }, { "name": "旌德县", "code": "341825" }, { "name": "宁国市", "code": "341881" }], "350100": [{ "name": "鼓楼区", "code": "350102" }, { "name": "台江区", "code": "350103" }, { "name": "仓山区", "code": "350104" }, { "name": "马尾区", "code": "350105" }, { "name": "晋安区", "code": "350111" }, { "name": "闽侯县", "code": "350121" }, { "name": "连江县", "code": "350122" }, { "name": "罗源县", "code": "350123" }, { "name": "闽清县", "code": "350124" }, { "name": "永泰县", "code": "350125" }, { "name": "平潭县", "code": "350128" }, { "name": "福清市", "code": "350181" }, { "name": "长乐市", "code": "350182" }], "350200": [{ "name": "思明区", "code": "350203" }, { "name": "海沧区", "code": "350205" }, { "name": "湖里区", "code": "350206" }, { "name": "集美区", "code": "350211" }, { "name": "同安区", "code": "350212" }, { "name": "翔安区", "code": "350213" }], "350300": [{ "name": "城厢区", "code": "350302" }, { "name": "涵江区", "code": "350303" }, { "name": "荔城区", "code": "350304" }, { "name": "秀屿区", "code": "350305" }, { "name": "仙游县", "code": "350322" }], "350400": [{ "name": "梅列区", "code": "350402" }, { "name": "三元区", "code": "350403" }, { "name": "明溪县", "code": "350421" }, { "name": "清流县", "code": "350423" }, { "name": "宁化县", "code": "350424" }, { "name": "大田县", "code": "350425" }, { "name": "尤溪县", "code": "350426" }, { "name": "沙县", "code": "350427" }, { "name": "将乐县", "code": "350428" }, { "name": "泰宁县", "code": "350429" }, { "name": "建宁县", "code": "350430" }, { "name": "永安市", "code": "350481" }], "350500": [{ "name": "鲤城区", "code": "350502" }, { "name": "丰泽区", "code": "350503" }, { "name": "洛江区", "code": "350504" }, { "name": "泉港区", "code": "350505" }, { "name": "惠安县", "code": "350521" }, { "name": "安溪县", "code": "350524" }, { "name": "永春县", "code": "350525" }, { "name": "德化县", "code": "350526" }, { "name": "金门县", "code": "350527" }, { "name": "石狮市", "code": "350581" }, { "name": "晋江市", "code": "350582" }, { "name": "南安市", "code": "350583" }], "350600": [{ "name": "芗城区", "code": "350602" }, { "name": "龙文区", "code": "350603" }, { "name": "云霄县", "code": "350622" }, { "name": "漳浦县", "code": "350623" }, { "name": "诏安县", "code": "350624" }, { "name": "长泰县", "code": "350625" }, { "name": "东山县", "code": "350626" }, { "name": "南靖县", "code": "350627" }, { "name": "平和县", "code": "350628" }, { "name": "华安县", "code": "350629" }, { "name": "龙海市", "code": "350681" }], "350700": [{ "name": "延平区", "code": "350702" }, { "name": "建阳区", "code": "350703" }, { "name": "顺昌县", "code": "350721" }, { "name": "浦城县", "code": "350722" }, { "name": "光泽县", "code": "350723" }, { "name": "松溪县", "code": "350724" }, { "name": "政和县", "code": "350725" }, { "name": "邵武市", "code": "350781" }, { "name": "武夷山市", "code": "350782" }, { "name": "建瓯市", "code": "350783" }], "350800": [{ "name": "新罗区", "code": "350802" }, { "name": "永定区", "code": "350803" }, { "name": "长汀县", "code": "350821" }, { "name": "上杭县", "code": "350823" }, { "name": "武平县", "code": "350824" }, { "name": "连城县", "code": "350825" }, { "name": "漳平市", "code": "350881" }], "350900": [{ "name": "蕉城区", "code": "350902" }, { "name": "霞浦县", "code": "350921" }, { "name": "古田县", "code": "350922" }, { "name": "屏南县", "code": "350923" }, { "name": "寿宁县", "code": "350924" }, { "name": "周宁县", "code": "350925" }, { "name": "柘荣县", "code": "350926" }, { "name": "福安市", "code": "350981" }, { "name": "福鼎市", "code": "350982" }], "360100": [{ "name": "东湖区", "code": "360102" }, { "name": "西湖区", "code": "360103" }, { "name": "青云谱区", "code": "360104" }, { "name": "湾里区", "code": "360105" }, { "name": "青山湖区", "code": "360111" }, { "name": "新建区", "code": "360112" }, { "name": "南昌县", "code": "360121" }, { "name": "安义县", "code": "360123" }, { "name": "进贤县", "code": "360124" }], "360200": [{ "name": "昌江区", "code": "360202" }, { "name": "珠山区", "code": "360203" }, { "name": "浮梁县", "code": "360222" }, { "name": "乐平市", "code": "360281" }], "360300": [{ "name": "安源区", "code": "360302" }, { "name": "湘东区", "code": "360313" }, { "name": "莲花县", "code": "360321" }, { "name": "上栗县", "code": "360322" }, { "name": "芦溪县", "code": "360323" }], "360400": [{ "name": "庐山区", "code": "360402" }, { "name": "浔阳区", "code": "360403" }, { "name": "九江县", "code": "360421" }, { "name": "武宁县", "code": "360423" }, { "name": "修水县", "code": "360424" }, { "name": "永修县", "code": "360425" }, { "name": "德安县", "code": "360426" }, { "name": "星子县", "code": "360427" }, { "name": "都昌县", "code": "360428" }, { "name": "湖口县", "code": "360429" }, { "name": "彭泽县", "code": "360430" }, { "name": "瑞昌市", "code": "360481" }, { "name": "共青城市", "code": "360482" }], "360500": [{ "name": "渝水区", "code": "360502" }, { "name": "分宜县", "code": "360521" }], "360600": [{ "name": "月湖区", "code": "360602" }, { "name": "余江县", "code": "360622" }, { "name": "贵溪市", "code": "360681" }], "360700": [{ "name": "章贡区", "code": "360702" }, { "name": "南康区", "code": "360703" }, { "name": "赣县", "code": "360721" }, { "name": "信丰县", "code": "360722" }, { "name": "大余县", "code": "360723" }, { "name": "上犹县", "code": "360724" }, { "name": "崇义县", "code": "360725" }, { "name": "安远县", "code": "360726" }, { "name": "龙南县", "code": "360727" }, { "name": "定南县", "code": "360728" }, { "name": "全南县", "code": "360729" }, { "name": "宁都县", "code": "360730" }, { "name": "于都县", "code": "360731" }, { "name": "兴国县", "code": "360732" }, { "name": "会昌县", "code": "360733" }, { "name": "寻乌县", "code": "360734" }, { "name": "石城县", "code": "360735" }, { "name": "瑞金市", "code": "360781" }], "360800": [{ "name": "吉州区", "code": "360802" }, { "name": "青原区", "code": "360803" }, { "name": "吉安县", "code": "360821" }, { "name": "吉水县", "code": "360822" }, { "name": "峡江县", "code": "360823" }, { "name": "新干县", "code": "360824" }, { "name": "永丰县", "code": "360825" }, { "name": "泰和县", "code": "360826" }, { "name": "遂川县", "code": "360827" }, { "name": "万安县", "code": "360828" }, { "name": "安福县", "code": "360829" }, { "name": "永新县", "code": "360830" }, { "name": "井冈山市", "code": "360881" }], "360900": [{ "name": "袁州区", "code": "360902" }, { "name": "奉新县", "code": "360921" }, { "name": "万载县", "code": "360922" }, { "name": "上高县", "code": "360923" }, { "name": "宜丰县", "code": "360924" }, { "name": "靖安县", "code": "360925" }, { "name": "铜鼓县", "code": "360926" }, { "name": "丰城市", "code": "360981" }, { "name": "樟树市", "code": "360982" }, { "name": "高安市", "code": "360983" }], "361000": [{ "name": "临川区", "code": "361002" }, { "name": "南城县", "code": "361021" }, { "name": "黎川县", "code": "361022" }, { "name": "南丰县", "code": "361023" }, { "name": "崇仁县", "code": "361024" }, { "name": "乐安县", "code": "361025" }, { "name": "宜黄县", "code": "361026" }, { "name": "金溪县", "code": "361027" }, { "name": "资溪县", "code": "361028" }, { "name": "东乡县", "code": "361029" }, { "name": "广昌县", "code": "361030" }], "361100": [{ "name": "信州区", "code": "361102" }, { "name": "广丰区", "code": "361103" }, { "name": "上饶县", "code": "361121" }, { "name": "玉山县", "code": "361123" }, { "name": "铅山县", "code": "361124" }, { "name": "横峰县", "code": "361125" }, { "name": "弋阳县", "code": "361126" }, { "name": "余干县", "code": "361127" }, { "name": "鄱阳县", "code": "361128" }, { "name": "万年县", "code": "361129" }, { "name": "婺源县", "code": "361130" }, { "name": "德兴市", "code": "361181" }], "370100": [{ "name": "历下区", "code": "370102" }, { "name": "市中区", "code": "370103" }, { "name": "槐荫区", "code": "370104" }, { "name": "天桥区", "code": "370105" }, { "name": "历城区", "code": "370112" }, { "name": "长清区", "code": "370113" }, { "name": "平阴县", "code": "370124" }, { "name": "济阳县", "code": "370125" }, { "name": "商河县", "code": "370126" }, { "name": "章丘市", "code": "370181" }], "370200": [{ "name": "市南区", "code": "370202" }, { "name": "市北区", "code": "370203" }, { "name": "黄岛区", "code": "370211" }, { "name": "崂山区", "code": "370212" }, { "name": "李沧区", "code": "370213" }, { "name": "城阳区", "code": "370214" }, { "name": "胶州市", "code": "370281" }, { "name": "即墨市", "code": "370282" }, { "name": "平度市", "code": "370283" }, { "name": "莱西市", "code": "370285" }], "370300": [{ "name": "淄川区", "code": "370302" }, { "name": "张店区", "code": "370303" }, { "name": "博山区", "code": "370304" }, { "name": "临淄区", "code": "370305" }, { "name": "周村区", "code": "370306" }, { "name": "桓台县", "code": "370321" }, { "name": "高青县", "code": "370322" }, { "name": "沂源县", "code": "370323" }], "370400": [{ "name": "市中区", "code": "370402" }, { "name": "薛城区", "code": "370403" }, { "name": "峄城区", "code": "370404" }, { "name": "台儿庄区", "code": "370405" }, { "name": "山亭区", "code": "370406" }, { "name": "滕州市", "code": "370481" }], "370500": [{ "name": "东营区", "code": "370502" }, { "name": "河口区", "code": "370503" }, { "name": "垦利县", "code": "370521" }, { "name": "利津县", "code": "370522" }, { "name": "广饶县", "code": "370523" }], "370600": [{ "name": "芝罘区", "code": "370602" }, { "name": "福山区", "code": "370611" }, { "name": "牟平区", "code": "370612" }, { "name": "莱山区", "code": "370613" }, { "name": "长岛县", "code": "370634" }, { "name": "龙口市", "code": "370681" }, { "name": "莱阳市", "code": "370682" }, { "name": "莱州市", "code": "370683" }, { "name": "蓬莱市", "code": "370684" }, { "name": "招远市", "code": "370685" }, { "name": "栖霞市", "code": "370686" }, { "name": "海阳市", "code": "370687" }], "370700": [{ "name": "潍城区", "code": "370702" }, { "name": "寒亭区", "code": "370703" }, { "name": "坊子区", "code": "370704" }, { "name": "奎文区", "code": "370705" }, { "name": "临朐县", "code": "370724" }, { "name": "昌乐县", "code": "370725" }, { "name": "青州市", "code": "370781" }, { "name": "诸城市", "code": "370782" }, { "name": "寿光市", "code": "370783" }, { "name": "安丘市", "code": "370784" }, { "name": "高密市", "code": "370785" }, { "name": "昌邑市", "code": "370786" }], "370800": [{ "name": "任城区", "code": "370811" }, { "name": "兖州区", "code": "370812" }, { "name": "微山县", "code": "370826" }, { "name": "鱼台县", "code": "370827" }, { "name": "金乡县", "code": "370828" }, { "name": "嘉祥县", "code": "370829" }, { "name": "汶上县", "code": "370830" }, { "name": "泗水县", "code": "370831" }, { "name": "梁山县", "code": "370832" }, { "name": "曲阜市", "code": "370881" }, { "name": "邹城市", "code": "370883" }], "370900": [{ "name": "泰山区", "code": "370902" }, { "name": "岱岳区", "code": "370911" }, { "name": "宁阳县", "code": "370921" }, { "name": "东平县", "code": "370923" }, { "name": "新泰市", "code": "370982" }, { "name": "肥城市", "code": "370983" }], "371000": [{ "name": "环翠区", "code": "371002" }, { "name": "文登区", "code": "371003" }, { "name": "荣成市", "code": "371082" }, { "name": "乳山市", "code": "371083" }], "371100": [{ "name": "东港区", "code": "371102" }, { "name": "岚山区", "code": "371103" }, { "name": "五莲县", "code": "371121" }, { "name": "莒县", "code": "371122" }], "371200": [{ "name": "莱城区", "code": "371202" }, { "name": "钢城区", "code": "371203" }], "371300": [{ "name": "兰山区", "code": "371302" }, { "name": "罗庄区", "code": "371311" }, { "name": "河东区", "code": "371312" }, { "name": "沂南县", "code": "371321" }, { "name": "郯城县", "code": "371322" }, { "name": "沂水县", "code": "371323" }, { "name": "兰陵县", "code": "371324" }, { "name": "费县", "code": "371325" }, { "name": "平邑县", "code": "371326" }, { "name": "莒南县", "code": "371327" }, { "name": "蒙阴县", "code": "371328" }, { "name": "临沭县", "code": "371329" }], "371400": [{ "name": "德城区", "code": "371402" }, { "name": "陵城区", "code": "371403" }, { "name": "宁津县", "code": "371422" }, { "name": "庆云县", "code": "371423" }, { "name": "临邑县", "code": "371424" }, { "name": "齐河县", "code": "371425" }, { "name": "平原县", "code": "371426" }, { "name": "夏津县", "code": "371427" }, { "name": "武城县", "code": "371428" }, { "name": "乐陵市", "code": "371481" }, { "name": "禹城市", "code": "371482" }], "371500": [{ "name": "东昌府区", "code": "371502" }, { "name": "阳谷县", "code": "371521" }, { "name": "莘县", "code": "371522" }, { "name": "茌平县", "code": "371523" }, { "name": "东阿县", "code": "371524" }, { "name": "冠县", "code": "371525" }, { "name": "高唐县", "code": "371526" }, { "name": "临清市", "code": "371581" }], "371600": [{ "name": "滨城区", "code": "371602" }, { "name": "沾化区", "code": "371603" }, { "name": "惠民县", "code": "371621" }, { "name": "阳信县", "code": "371622" }, { "name": "无棣县", "code": "371623" }, { "name": "博兴县", "code": "371625" }, { "name": "邹平县", "code": "371626" }], "371700": [{ "name": "牡丹区", "code": "371702" }, { "name": "曹县", "code": "371721" }, { "name": "单县", "code": "371722" }, { "name": "成武县", "code": "371723" }, { "name": "巨野县", "code": "371724" }, { "name": "郓城县", "code": "371725" }, { "name": "鄄城县", "code": "371726" }, { "name": "定陶县", "code": "371727" }, { "name": "东明县", "code": "371728" }], "410100": [{ "name": "中原区", "code": "410102" }, { "name": "二七区", "code": "410103" }, { "name": "管城回族区", "code": "410104" }, { "name": "金水区", "code": "410105" }, { "name": "上街区", "code": "410106" }, { "name": "惠济区", "code": "410108" }, { "name": "中牟县", "code": "410122" }, { "name": "巩义市", "code": "410181" }, { "name": "荥阳市", "code": "410182" }, { "name": "新密市", "code": "410183" }, { "name": "新郑市", "code": "410184" }, { "name": "登封市", "code": "410185" }, { "name": "经开区", "code": "410112" }], "410200": [{ "name": "龙亭区", "code": "410202" }, { "name": "顺河回族区", "code": "410203" }, { "name": "鼓楼区", "code": "410204" }, { "name": "禹王台区", "code": "410205" }, { "name": "金明区", "code": "410211" }, { "name": "祥符区", "code": "410212" }, { "name": "杞县", "code": "410221" }, { "name": "通许县", "code": "410222" }, { "name": "尉氏县", "code": "410223" }, { "name": "兰考县", "code": "410225" }, { "name": "开封县", "code": "410224" }], "410300": [{ "name": "老城区", "code": "410302" }, { "name": "西工区", "code": "410303" }, { "name": "瀍河回族区", "code": "410304" }, { "name": "涧西区", "code": "410305" }, { "name": "吉利区", "code": "410306" }, { "name": "洛龙区", "code": "410311" }, { "name": "孟津县", "code": "410322" }, { "name": "新安县", "code": "410323" }, { "name": "栾川县", "code": "410324" }, { "name": "嵩县", "code": "410325" }, { "name": "汝阳县", "code": "410326" }, { "name": "宜阳县", "code": "410327" }, { "name": "洛宁县", "code": "410328" }, { "name": "伊川县", "code": "410329" }, { "name": "偃师市", "code": "410381" }], "410400": [{ "name": "新华区", "code": "410402" }, { "name": "卫东区", "code": "410403" }, { "name": "石龙区", "code": "410404" }, { "name": "湛河区", "code": "410411" }, { "name": "宝丰县", "code": "410421" }, { "name": "叶县", "code": "410422" }, { "name": "鲁山县", "code": "410423" }, { "name": "郏县", "code": "410425" }, { "name": "舞钢市", "code": "410481" }, { "name": "汝州市", "code": "410482" }], "410500": [{ "name": "文峰区", "code": "410502" }, { "name": "北关区", "code": "410503" }, { "name": "殷都区", "code": "410505" }, { "name": "龙安区", "code": "410506" }, { "name": "安阳县", "code": "410522" }, { "name": "汤阴县", "code": "410523" }, { "name": "滑县", "code": "410526" }, { "name": "内黄县", "code": "410527" }, { "name": "林州市", "code": "410581" }], "410600": [{ "name": "鹤山区", "code": "410602" }, { "name": "山城区", "code": "410603" }, { "name": "淇滨区", "code": "410611" }, { "name": "浚县", "code": "410621" }, { "name": "淇县", "code": "410622" }], "410700": [{ "name": "红旗区", "code": "410702" }, { "name": "卫滨区", "code": "410703" }, { "name": "凤泉区", "code": "410704" }, { "name": "牧野区", "code": "410711" }, { "name": "新乡县", "code": "410721" }, { "name": "获嘉县", "code": "410724" }, { "name": "原阳县", "code": "410725" }, { "name": "延津县", "code": "410726" }, { "name": "封丘县", "code": "410727" }, { "name": "长垣县", "code": "410728" }, { "name": "卫辉市", "code": "410781" }, { "name": "辉县市", "code": "410782" }], "410800": [{ "name": "解放区", "code": "410802" }, { "name": "中站区", "code": "410803" }, { "name": "马村区", "code": "410804" }, { "name": "山阳区", "code": "410811" }, { "name": "修武县", "code": "410821" }, { "name": "博爱县", "code": "410822" }, { "name": "武陟县", "code": "410823" }, { "name": "温县", "code": "410825" }, { "name": "沁阳市", "code": "410882" }, { "name": "孟州市", "code": "410883" }], "410900": [{ "name": "华龙区", "code": "410902" }, { "name": "清丰县", "code": "410922" }, { "name": "南乐县", "code": "410923" }, { "name": "范县", "code": "410926" }, { "name": "台前县", "code": "410927" }, { "name": "濮阳县", "code": "410928" }], "411000": [{ "name": "魏都区", "code": "411002" }, { "name": "许昌县", "code": "411023" }, { "name": "鄢陵县", "code": "411024" }, { "name": "襄城县", "code": "411025" }, { "name": "禹州市", "code": "411081" }, { "name": "长葛市", "code": "411082" }], "411100": [{ "name": "源汇区", "code": "411102" }, { "name": "郾城区", "code": "411103" }, { "name": "召陵区", "code": "411104" }, { "name": "舞阳县", "code": "411121" }, { "name": "临颍县", "code": "411122" }], "411200": [{ "name": "湖滨区", "code": "411202" }, { "name": "渑池县", "code": "411221" }, { "name": "陕县", "code": "411222" }, { "name": "卢氏县", "code": "411224" }, { "name": "义马市", "code": "411281" }, { "name": "灵宝市", "code": "411282" }], "411300": [{ "name": "宛城区", "code": "411302" }, { "name": "卧龙区", "code": "411303" }, { "name": "南召县", "code": "411321" }, { "name": "方城县", "code": "411322" }, { "name": "西峡县", "code": "411323" }, { "name": "镇平县", "code": "411324" }, { "name": "内乡县", "code": "411325" }, { "name": "淅川县", "code": "411326" }, { "name": "社旗县", "code": "411327" }, { "name": "唐河县", "code": "411328" }, { "name": "新野县", "code": "411329" }, { "name": "桐柏县", "code": "411330" }, { "name": "邓州市", "code": "411381" }], "411400": [{ "name": "梁园区", "code": "411402" }, { "name": "睢阳区", "code": "411403" }, { "name": "民权县", "code": "411421" }, { "name": "睢县", "code": "411422" }, { "name": "宁陵县", "code": "411423" }, { "name": "柘城县", "code": "411424" }, { "name": "虞城县", "code": "411425" }, { "name": "夏邑县", "code": "411426" }, { "name": "永城市", "code": "411481" }], "411500": [{ "name": "浉河区", "code": "411502" }, { "name": "平桥区", "code": "411503" }, { "name": "罗山县", "code": "411521" }, { "name": "光山县", "code": "411522" }, { "name": "新县", "code": "411523" }, { "name": "商城县", "code": "411524" }, { "name": "固始县", "code": "411525" }, { "name": "潢川县", "code": "411526" }, { "name": "淮滨县", "code": "411527" }, { "name": "息县", "code": "411528" }], "411600": [{ "name": "川汇区", "code": "411602" }, { "name": "扶沟县", "code": "411621" }, { "name": "西华县", "code": "411622" }, { "name": "商水县", "code": "411623" }, { "name": "沈丘县", "code": "411624" }, { "name": "郸城县", "code": "411625" }, { "name": "淮阳县", "code": "411626" }, { "name": "太康县", "code": "411627" }, { "name": "鹿邑县", "code": "411628" }, { "name": "项城市", "code": "411681" }], "411700": [{ "name": "驿城区", "code": "411702" }, { "name": "西平县", "code": "411721" }, { "name": "上蔡县", "code": "411722" }, { "name": "平舆县", "code": "411723" }, { "name": "正阳县", "code": "411724" }, { "name": "确山县", "code": "411725" }, { "name": "泌阳县", "code": "411726" }, { "name": "汝南县", "code": "411727" }, { "name": "遂平县", "code": "411728" }, { "name": "新蔡县", "code": "411729" }], "419000": [{ "name": "济源市", "code": "419001" }], "420100": [{ "name": "江岸区", "code": "420102" }, { "name": "江汉区", "code": "420103" }, { "name": "硚口区", "code": "420104" }, { "name": "汉阳区", "code": "420105" }, { "name": "武昌区", "code": "420106" }, { "name": "青山区", "code": "420107" }, { "name": "洪山区", "code": "420111" }, { "name": "东西湖区", "code": "420112" }, { "name": "汉南区", "code": "420113" }, { "name": "蔡甸区", "code": "420114" }, { "name": "江夏区", "code": "420115" }, { "name": "黄陂区", "code": "420116" }, { "name": "新洲区", "code": "420117" }], "420200": [{ "name": "黄石港区", "code": "420202" }, { "name": "西塞山区", "code": "420203" }, { "name": "下陆区", "code": "420204" }, { "name": "铁山区", "code": "420205" }, { "name": "阳新县", "code": "420222" }, { "name": "大冶市", "code": "420281" }], "420300": [{ "name": "茅箭区", "code": "420302" }, { "name": "张湾区", "code": "420303" }, { "name": "郧阳区", "code": "420304" }, { "name": "郧西县", "code": "420322" }, { "name": "竹山县", "code": "420323" }, { "name": "竹溪县", "code": "420324" }, { "name": "房县", "code": "420325" }, { "name": "丹江口市", "code": "420381" }], "420500": [{ "name": "西陵区", "code": "420502" }, { "name": "伍家岗区", "code": "420503" }, { "name": "点军区", "code": "420504" }, { "name": "猇亭区", "code": "420505" }, { "name": "夷陵区", "code": "420506" }, { "name": "远安县", "code": "420525" }, { "name": "兴山县", "code": "420526" }, { "name": "秭归县", "code": "420527" }, { "name": "长阳土家族自治县", "code": "420528" }, { "name": "五峰土家族自治县", "code": "420529" }, { "name": "宜都市", "code": "420581" }, { "name": "当阳市", "code": "420582" }, { "name": "枝江市", "code": "420583" }], "420600": [{ "name": "襄城区", "code": "420602" }, { "name": "樊城区", "code": "420606" }, { "name": "襄州区", "code": "420607" }, { "name": "南漳县", "code": "420624" }, { "name": "谷城县", "code": "420625" }, { "name": "保康县", "code": "420626" }, { "name": "老河口市", "code": "420682" }, { "name": "枣阳市", "code": "420683" }, { "name": "宜城市", "code": "420684" }], "420700": [{ "name": "梁子湖区", "code": "420702" }, { "name": "华容区", "code": "420703" }, { "name": "鄂城区", "code": "420704" }], "420800": [{ "name": "东宝区", "code": "420802" }, { "name": "掇刀区", "code": "420804" }, { "name": "京山县", "code": "420821" }, { "name": "沙洋县", "code": "420822" }, { "name": "钟祥市", "code": "420881" }], "420900": [{ "name": "孝南区", "code": "420902" }, { "name": "孝昌县", "code": "420921" }, { "name": "大悟县", "code": "420922" }, { "name": "云梦县", "code": "420923" }, { "name": "应城市", "code": "420981" }, { "name": "安陆市", "code": "420982" }, { "name": "汉川市", "code": "420984" }], "421000": [{ "name": "沙市区", "code": "421002" }, { "name": "荆州区", "code": "421003" }, { "name": "公安县", "code": "421022" }, { "name": "监利县", "code": "421023" }, { "name": "江陵县", "code": "421024" }, { "name": "石首市", "code": "421081" }, { "name": "洪湖市", "code": "421083" }, { "name": "松滋市", "code": "421087" }], "421100": [{ "name": "黄州区", "code": "421102" }, { "name": "团风县", "code": "421121" }, { "name": "红安县", "code": "421122" }, { "name": "罗田县", "code": "421123" }, { "name": "英山县", "code": "421124" }, { "name": "浠水县", "code": "421125" }, { "name": "蕲春县", "code": "421126" }, { "name": "黄梅县", "code": "421127" }, { "name": "麻城市", "code": "421181" }, { "name": "武穴市", "code": "421182" }], "421200": [{ "name": "咸安区", "code": "421202" }, { "name": "嘉鱼县", "code": "421221" }, { "name": "通城县", "code": "421222" }, { "name": "崇阳县", "code": "421223" }, { "name": "通山县", "code": "421224" }, { "name": "赤壁市", "code": "421281" }], "421300": [{ "name": "曾都区", "code": "421303" }, { "name": "随县", "code": "421321" }, { "name": "广水市", "code": "421381" }], "422800": [{ "name": "恩施市", "code": "422801" }, { "name": "利川市", "code": "422802" }, { "name": "建始县", "code": "422822" }, { "name": "巴东县", "code": "422823" }, { "name": "宣恩县", "code": "422825" }, { "name": "咸丰县", "code": "422826" }, { "name": "来凤县", "code": "422827" }, { "name": "鹤峰县", "code": "422828" }], "430100": [{ "name": "芙蓉区", "code": "430102" }, { "name": "天心区", "code": "430103" }, { "name": "岳麓区", "code": "430104" }, { "name": "开福区", "code": "430105" }, { "name": "雨花区", "code": "430111" }, { "name": "望城区", "code": "430112" }, { "name": "长沙县", "code": "430121" }, { "name": "宁乡县", "code": "430124" }, { "name": "浏阳市", "code": "430181" }], "430200": [{ "name": "荷塘区", "code": "430202" }, { "name": "芦淞区", "code": "430203" }, { "name": "石峰区", "code": "430204" }, { "name": "天元区", "code": "430211" }, { "name": "株洲县", "code": "430221" }, { "name": "攸县", "code": "430223" }, { "name": "茶陵县", "code": "430224" }, { "name": "炎陵县", "code": "430225" }, { "name": "醴陵市", "code": "430281" }], "430300": [{ "name": "雨湖区", "code": "430302" }, { "name": "岳塘区", "code": "430304" }, { "name": "湘潭县", "code": "430321" }, { "name": "湘乡市", "code": "430381" }, { "name": "韶山市", "code": "430382" }], "430400": [{ "name": "珠晖区", "code": "430405" }, { "name": "雁峰区", "code": "430406" }, { "name": "石鼓区", "code": "430407" }, { "name": "蒸湘区", "code": "430408" }, { "name": "南岳区", "code": "430412" }, { "name": "衡阳县", "code": "430421" }, { "name": "衡南县", "code": "430422" }, { "name": "衡山县", "code": "430423" }, { "name": "衡东县", "code": "430424" }, { "name": "祁东县", "code": "430426" }, { "name": "耒阳市", "code": "430481" }, { "name": "常宁市", "code": "430482" }], "430500": [{ "name": "双清区", "code": "430502" }, { "name": "大祥区", "code": "430503" }, { "name": "北塔区", "code": "430511" }, { "name": "邵东县", "code": "430521" }, { "name": "新邵县", "code": "430522" }, { "name": "邵阳县", "code": "430523" }, { "name": "隆回县", "code": "430524" }, { "name": "洞口县", "code": "430525" }, { "name": "绥宁县", "code": "430527" }, { "name": "新宁县", "code": "430528" }, { "name": "城步苗族自治县", "code": "430529" }, { "name": "武冈市", "code": "430581" }], "430600": [{ "name": "岳阳楼区", "code": "430602" }, { "name": "云溪区", "code": "430603" }, { "name": "君山区", "code": "430611" }, { "name": "岳阳县", "code": "430621" }, { "name": "华容县", "code": "430623" }, { "name": "湘阴县", "code": "430624" }, { "name": "平江县", "code": "430626" }, { "name": "汨罗市", "code": "430681" }, { "name": "临湘市", "code": "430682" }], "430700": [{ "name": "武陵区", "code": "430702" }, { "name": "鼎城区", "code": "430703" }, { "name": "安乡县", "code": "430721" }, { "name": "汉寿县", "code": "430722" }, { "name": "澧县", "code": "430723" }, { "name": "临澧县", "code": "430724" }, { "name": "桃源县", "code": "430725" }, { "name": "石门县", "code": "430726" }, { "name": "津市市", "code": "430781" }], "430800": [{ "name": "永定区", "code": "430802" }, { "name": "武陵源区", "code": "430811" }, { "name": "慈利县", "code": "430821" }, { "name": "桑植县", "code": "430822" }], "430900": [{ "name": "资阳区", "code": "430902" }, { "name": "赫山区", "code": "430903" }, { "name": "南县", "code": "430921" }, { "name": "桃江县", "code": "430922" }, { "name": "安化县", "code": "430923" }, { "name": "沅江市", "code": "430981" }], "431000": [{ "name": "北湖区", "code": "431002" }, { "name": "苏仙区", "code": "431003" }, { "name": "桂阳县", "code": "431021" }, { "name": "宜章县", "code": "431022" }, { "name": "永兴县", "code": "431023" }, { "name": "嘉禾县", "code": "431024" }, { "name": "临武县", "code": "431025" }, { "name": "汝城县", "code": "431026" }, { "name": "桂东县", "code": "431027" }, { "name": "安仁县", "code": "431028" }, { "name": "资兴市", "code": "431081" }], "431100": [{ "name": "零陵区", "code": "431102" }, { "name": "冷水滩区", "code": "431103" }, { "name": "祁阳县", "code": "431121" }, { "name": "东安县", "code": "431122" }, { "name": "双牌县", "code": "431123" }, { "name": "道县", "code": "431124" }, { "name": "江永县", "code": "431125" }, { "name": "宁远县", "code": "431126" }, { "name": "蓝山县", "code": "431127" }, { "name": "新田县", "code": "431128" }, { "name": "江华瑶族自治县", "code": "431129" }], "431200": [{ "name": "鹤城区", "code": "431202" }, { "name": "中方县", "code": "431221" }, { "name": "沅陵县", "code": "431222" }, { "name": "辰溪县", "code": "431223" }, { "name": "溆浦县", "code": "431224" }, { "name": "会同县", "code": "431225" }, { "name": "麻阳苗族自治县", "code": "431226" }, { "name": "新晃侗族自治县", "code": "431227" }, { "name": "芷江侗族自治县", "code": "431228" }, { "name": "靖州苗族侗族自治县", "code": "431229" }, { "name": "通道侗族自治县", "code": "431230" }, { "name": "洪江市", "code": "431281" }], "431300": [{ "name": "娄星区", "code": "431302" }, { "name": "双峰县", "code": "431321" }, { "name": "新化县", "code": "431322" }, { "name": "冷水江市", "code": "431381" }, { "name": "涟源市", "code": "431382" }], "433100": [{ "name": "吉首市", "code": "433101" }, { "name": "泸溪县", "code": "433122" }, { "name": "凤凰县", "code": "433123" }, { "name": "花垣县", "code": "433124" }, { "name": "保靖县", "code": "433125" }, { "name": "古丈县", "code": "433126" }, { "name": "永顺县", "code": "433127" }, { "name": "龙山县", "code": "433130" }], "440100": [{ "name": "荔湾区", "code": "440103" }, { "name": "越秀区", "code": "440104" }, { "name": "海珠区", "code": "440105" }, { "name": "天河区", "code": "440106" }, { "name": "白云区", "code": "440111" }, { "name": "黄埔区", "code": "440112" }, { "name": "番禺区", "code": "440113" }, { "name": "花都区", "code": "440114" }, { "name": "南沙区", "code": "440115" }, { "name": "从化区", "code": "440117" }, { "name": "增城区", "code": "440118" }], "440200": [{ "name": "武江区", "code": "440203" }, { "name": "浈江区", "code": "440204" }, { "name": "曲江区", "code": "440205" }, { "name": "始兴县", "code": "440222" }, { "name": "仁化县", "code": "440224" }, { "name": "翁源县", "code": "440229" }, { "name": "乳源瑶族自治县", "code": "440232" }, { "name": "新丰县", "code": "440233" }, { "name": "乐昌市", "code": "440281" }, { "name": "南雄市", "code": "440282" }], "440300": [{ "name": "罗湖区", "code": "440303" }, { "name": "福田区", "code": "440304" }, { "name": "南山区", "code": "440305" }, { "name": "宝安区", "code": "440306" }, { "name": "龙岗区", "code": "440307" }, { "name": "盐田区", "code": "440308" }], "440400": [{ "name": "香洲区", "code": "440402" }, { "name": "斗门区", "code": "440403" }, { "name": "金湾区", "code": "440404" }], "440500": [{ "name": "龙湖区", "code": "440507" }, { "name": "金平区", "code": "440511" }, { "name": "濠江区", "code": "440512" }, { "name": "潮阳区", "code": "440513" }, { "name": "潮南区", "code": "440514" }, { "name": "澄海区", "code": "440515" }, { "name": "南澳县", "code": "440523" }], "440600": [{ "name": "禅城区", "code": "440604" }, { "name": "南海区", "code": "440605" }, { "name": "顺德区", "code": "440606" }, { "name": "三水区", "code": "440607" }, { "name": "高明区", "code": "440608" }], "440700": [{ "name": "蓬江区", "code": "440703" }, { "name": "江海区", "code": "440704" }, { "name": "新会区", "code": "440705" }, { "name": "台山市", "code": "440781" }, { "name": "开平市", "code": "440783" }, { "name": "鹤山市", "code": "440784" }, { "name": "恩平市", "code": "440785" }], "440800": [{ "name": "赤坎区", "code": "440802" }, { "name": "霞山区", "code": "440803" }, { "name": "坡头区", "code": "440804" }, { "name": "麻章区", "code": "440811" }, { "name": "遂溪县", "code": "440823" }, { "name": "徐闻县", "code": "440825" }, { "name": "廉江市", "code": "440881" }, { "name": "雷州市", "code": "440882" }, { "name": "吴川市", "code": "440883" }], "440900": [{ "name": "茂南区", "code": "440902" }, { "name": "电白区", "code": "440904" }, { "name": "高州市", "code": "440981" }, { "name": "化州市", "code": "440982" }, { "name": "信宜市", "code": "440983" }], "441200": [{ "name": "端州区", "code": "441202" }, { "name": "鼎湖区", "code": "441203" }, { "name": "高要区", "code": "441204" }, { "name": "广宁县", "code": "441223" }, { "name": "怀集县", "code": "441224" }, { "name": "封开县", "code": "441225" }, { "name": "德庆县", "code": "441226" }, { "name": "四会市", "code": "441284" }], "441300": [{ "name": "惠城区", "code": "441302" }, { "name": "惠阳区", "code": "441303" }, { "name": "博罗县", "code": "441322" }, { "name": "惠东县", "code": "441323" }, { "name": "龙门县", "code": "441324" }], "441400": [{ "name": "梅江区", "code": "441402" }, { "name": "梅县区", "code": "441403" }, { "name": "大埔县", "code": "441422" }, { "name": "丰顺县", "code": "441423" }, { "name": "五华县", "code": "441424" }, { "name": "平远县", "code": "441426" }, { "name": "蕉岭县", "code": "441427" }, { "name": "兴宁市", "code": "441481" }], "441500": [{ "name": "城区", "code": "441502" }, { "name": "海丰县", "code": "441521" }, { "name": "陆河县", "code": "441523" }, { "name": "陆丰市", "code": "441581" }], "441600": [{ "name": "源城区", "code": "441602" }, { "name": "紫金县", "code": "441621" }, { "name": "龙川县", "code": "441622" }, { "name": "连平县", "code": "441623" }, { "name": "和平县", "code": "441624" }, { "name": "东源县", "code": "441625" }], "441700": [{ "name": "江城区", "code": "441702" }, { "name": "阳东区", "code": "441704" }, { "name": "阳西县", "code": "441721" }, { "name": "阳春市", "code": "441781" }], "441800": [{ "name": "清城区", "code": "441802" }, { "name": "清新区", "code": "441803" }, { "name": "佛冈县", "code": "441821" }, { "name": "阳山县", "code": "441823" }, { "name": "连山壮族瑶族自治县", "code": "441825" }, { "name": "连南瑶族自治县", "code": "441826" }, { "name": "英德市", "code": "441881" }, { "name": "连州市", "code": "441882" }], "441900": [{ "name": "东莞市", "code": "441901" }], "442000": [], "445100": [{ "name": "湘桥区", "code": "445102" }, { "name": "潮安区", "code": "445103" }, { "name": "饶平县", "code": "445122" }], "445200": [{ "name": "榕城区", "code": "445202" }, { "name": "揭东区", "code": "445203" }, { "name": "揭西县", "code": "445222" }, { "name": "惠来县", "code": "445224" }, { "name": "普宁市", "code": "445281" }], "445300": [{ "name": "云城区", "code": "445302" }, { "name": "云安区", "code": "445303" }, { "name": "新兴县", "code": "445321" }, { "name": "郁南县", "code": "445322" }, { "name": "罗定市", "code": "445381" }], "450100": [{ "name": "兴宁区", "code": "450102" }, { "name": "青秀区", "code": "450103" }, { "name": "江南区", "code": "450105" }, { "name": "西乡塘区", "code": "450107" }, { "name": "良庆区", "code": "450108" }, { "name": "邕宁区", "code": "450109" }, { "name": "武鸣区", "code": "450110" }, { "name": "隆安县", "code": "450123" }, { "name": "马山县", "code": "450124" }, { "name": "上林县", "code": "450125" }, { "name": "宾阳县", "code": "450126" }, { "name": "横县", "code": "450127" }], "450200": [{ "name": "城中区", "code": "450202" }, { "name": "鱼峰区", "code": "450203" }, { "name": "柳南区", "code": "450204" }, { "name": "柳北区", "code": "450205" }, { "name": "柳江县", "code": "450221" }, { "name": "柳城县", "code": "450222" }, { "name": "鹿寨县", "code": "450223" }, { "name": "融安县", "code": "450224" }, { "name": "融水苗族自治县", "code": "450225" }, { "name": "三江侗族自治县", "code": "450226" }], "450300": [{ "name": "秀峰区", "code": "450302" }, { "name": "叠彩区", "code": "450303" }, { "name": "象山区", "code": "450304" }, { "name": "七星区", "code": "450305" }, { "name": "雁山区", "code": "450311" }, { "name": "临桂区", "code": "450312" }, { "name": "阳朔县", "code": "450321" }, { "name": "灵川县", "code": "450323" }, { "name": "全州县", "code": "450324" }, { "name": "兴安县", "code": "450325" }, { "name": "永福县", "code": "450326" }, { "name": "灌阳县", "code": "450327" }, { "name": "龙胜各族自治县", "code": "450328" }, { "name": "资源县", "code": "450329" }, { "name": "平乐县", "code": "450330" }, { "name": "荔浦县", "code": "450331" }, { "name": "恭城瑶族自治县", "code": "450332" }], "450400": [{ "name": "万秀区", "code": "450403" }, { "name": "长洲区", "code": "450405" }, { "name": "龙圩区", "code": "450406" }, { "name": "苍梧县", "code": "450421" }, { "name": "藤县", "code": "450422" }, { "name": "蒙山县", "code": "450423" }, { "name": "岑溪市", "code": "450481" }], "450500": [{ "name": "海城区", "code": "450502" }, { "name": "银海区", "code": "450503" }, { "name": "铁山港区", "code": "450512" }, { "name": "合浦县", "code": "450521" }], "450600": [{ "name": "港口区", "code": "450602" }, { "name": "防城区", "code": "450603" }, { "name": "上思县", "code": "450621" }, { "name": "东兴市", "code": "450681" }], "450700": [{ "name": "钦南区", "code": "450702" }, { "name": "钦北区", "code": "450703" }, { "name": "灵山县", "code": "450721" }, { "name": "浦北县", "code": "450722" }], "450800": [{ "name": "港北区", "code": "450802" }, { "name": "港南区", "code": "450803" }, { "name": "覃塘区", "code": "450804" }, { "name": "平南县", "code": "450821" }, { "name": "桂平市", "code": "450881" }], "450900": [{ "name": "玉州区", "code": "450902" }, { "name": "福绵区", "code": "450903" }, { "name": "容县", "code": "450921" }, { "name": "陆川县", "code": "450922" }, { "name": "博白县", "code": "450923" }, { "name": "兴业县", "code": "450924" }, { "name": "北流市", "code": "450981" }], "451000": [{ "name": "右江区", "code": "451002" }, { "name": "田阳县", "code": "451021" }, { "name": "田东县", "code": "451022" }, { "name": "平果县", "code": "451023" }, { "name": "德保县", "code": "451024" }, { "name": "那坡县", "code": "451026" }, { "name": "凌云县", "code": "451027" }, { "name": "乐业县", "code": "451028" }, { "name": "田林县", "code": "451029" }, { "name": "西林县", "code": "451030" }, { "name": "隆林各族自治县", "code": "451031" }, { "name": "靖西市", "code": "451081" }], "451100": [{ "name": "八步区", "code": "451102" }, { "name": "昭平县", "code": "451121" }, { "name": "钟山县", "code": "451122" }, { "name": "富川瑶族自治县", "code": "451123" }], "451200": [{ "name": "金城江区", "code": "451202" }, { "name": "南丹县", "code": "451221" }, { "name": "天峨县", "code": "451222" }, { "name": "凤山县", "code": "451223" }, { "name": "东兰县", "code": "451224" }, { "name": "罗城仫佬族自治县", "code": "451225" }, { "name": "环江毛南族自治县", "code": "451226" }, { "name": "巴马瑶族自治县", "code": "451227" }, { "name": "都安瑶族自治县", "code": "451228" }, { "name": "大化瑶族自治县", "code": "451229" }, { "name": "宜州市", "code": "451281" }], "451300": [{ "name": "兴宾区", "code": "451302" }, { "name": "忻城县", "code": "451321" }, { "name": "象州县", "code": "451322" }, { "name": "武宣县", "code": "451323" }, { "name": "金秀瑶族自治县", "code": "451324" }, { "name": "合山市", "code": "451381" }], "451400": [{ "name": "江州区", "code": "451402" }, { "name": "扶绥县", "code": "451421" }, { "name": "宁明县", "code": "451422" }, { "name": "龙州县", "code": "451423" }, { "name": "大新县", "code": "451424" }, { "name": "天等县", "code": "451425" }, { "name": "凭祥市", "code": "451481" }], "460100": [{ "name": "秀英区", "code": "460105" }, { "name": "龙华区", "code": "460106" }, { "name": "琼山区", "code": "460107" }, { "name": "美兰区", "code": "460108" }], "460200": [{ "name": "海棠区", "code": "460202" }, { "name": "吉阳区", "code": "460203" }, { "name": "天涯区", "code": "460204" }, { "name": "崖州区", "code": "460205" }], "460300": [{ "name": "西沙群岛", "code": "460321" }, { "name": "南沙群岛", "code": "460322" }, { "name": "中沙群岛的岛礁及其海域", "code": "460323" }], "500100": [{ "name": "万州区", "code": "500101" }, { "name": "涪陵区", "code": "500102" }, { "name": "渝中区", "code": "500103" }, { "name": "大渡口区", "code": "500104" }, { "name": "江北区", "code": "500105" }, { "name": "沙坪坝区", "code": "500106" }, { "name": "九龙坡区", "code": "500107" }, { "name": "南岸区", "code": "500108" }, { "name": "北碚区", "code": "500109" }, { "name": "綦江区", "code": "500110" }, { "name": "大足区", "code": "500111" }, { "name": "渝北区", "code": "500112" }, { "name": "巴南区", "code": "500113" }, { "name": "黔江区", "code": "500114" }, { "name": "长寿区", "code": "500115" }, { "name": "江津区", "code": "500116" }, { "name": "合川区", "code": "500117" }, { "name": "永川区", "code": "500118" }, { "name": "南川区", "code": "500119" }, { "name": "璧山区", "code": "500120" }, { "name": "铜梁区", "code": "500151" }, { "name": "潼南区", "code": "500152" }, { "name": "荣昌区", "code": "500153" }, { "name": "梁平县", "code": "500228" }, { "name": "城口县", "code": "500229" }, { "name": "丰都县", "code": "500230" }, { "name": "垫江县", "code": "500231" }, { "name": "武隆县", "code": "500232" }, { "name": "忠县", "code": "500233" }, { "name": "开县", "code": "500234" }, { "name": "云阳县", "code": "500235" }, { "name": "奉节县", "code": "500236" }, { "name": "巫山县", "code": "500237" }, { "name": "巫溪县", "code": "500238" }, { "name": "石柱土家族自治县", "code": "500240" }, { "name": "秀山土家族苗族自治县", "code": "500241" }, { "name": "酉阳土家族苗族自治县", "code": "500242" }, { "name": "彭水苗族土家族自治县", "code": "500243" }], "510100": [{ "name": "锦江区", "code": "510104" }, { "name": "青羊区", "code": "510105" }, { "name": "金牛区", "code": "510106" }, { "name": "武侯区", "code": "510107" }, { "name": "成华区", "code": "510108" }, { "name": "龙泉驿区", "code": "510112" }, { "name": "青白江区", "code": "510113" }, { "name": "新都区", "code": "510114" }, { "name": "温江区", "code": "510115" }, { "name": "金堂县", "code": "510121" }, { "name": "双流县", "code": "510122" }, { "name": "郫县", "code": "510124" }, { "name": "大邑县", "code": "510129" }, { "name": "蒲江县", "code": "510131" }, { "name": "新津县", "code": "510132" }, { "name": "都江堰市", "code": "510181" }, { "name": "彭州市", "code": "510182" }, { "name": "邛崃市", "code": "510183" }, { "name": "崇州市", "code": "510184" }], "510300": [{ "name": "自流井区", "code": "510302" }, { "name": "贡井区", "code": "510303" }, { "name": "大安区", "code": "510304" }, { "name": "沿滩区", "code": "510311" }, { "name": "荣县", "code": "510321" }, { "name": "富顺县", "code": "510322" }], "510400": [{ "name": "东区", "code": "510402" }, { "name": "西区", "code": "510403" }, { "name": "仁和区", "code": "510411" }, { "name": "米易县", "code": "510421" }, { "name": "盐边县", "code": "510422" }], "510500": [{ "name": "江阳区", "code": "510502" }, { "name": "纳溪区", "code": "510503" }, { "name": "龙马潭区", "code": "510504" }, { "name": "泸县", "code": "510521" }, { "name": "合江县", "code": "510522" }, { "name": "叙永县", "code": "510524" }, { "name": "古蔺县", "code": "510525" }], "510600": [{ "name": "旌阳区", "code": "510603" }, { "name": "中江县", "code": "510623" }, { "name": "罗江县", "code": "510626" }, { "name": "广汉市", "code": "510681" }, { "name": "什邡市", "code": "510682" }, { "name": "绵竹市", "code": "510683" }], "510700": [{ "name": "涪城区", "code": "510703" }, { "name": "游仙区", "code": "510704" }, { "name": "三台县", "code": "510722" }, { "name": "盐亭县", "code": "510723" }, { "name": "安县", "code": "510724" }, { "name": "梓潼县", "code": "510725" }, { "name": "北川羌族自治县", "code": "510726" }, { "name": "平武县", "code": "510727" }, { "name": "江油市", "code": "510781" }], "510800": [{ "name": "利州区", "code": "510802" }, { "name": "昭化区", "code": "510811" }, { "name": "朝天区", "code": "510812" }, { "name": "旺苍县", "code": "510821" }, { "name": "青川县", "code": "510822" }, { "name": "剑阁县", "code": "510823" }, { "name": "苍溪县", "code": "510824" }], "510900": [{ "name": "船山区", "code": "510903" }, { "name": "安居区", "code": "510904" }, { "name": "蓬溪县", "code": "510921" }, { "name": "射洪县", "code": "510922" }, { "name": "大英县", "code": "510923" }], "511000": [{ "name": "市中区", "code": "511002" }, { "name": "东兴区", "code": "511011" }, { "name": "威远县", "code": "511024" }, { "name": "资中县", "code": "511025" }, { "name": "隆昌县", "code": "511028" }], "511100": [{ "name": "市中区", "code": "511102" }, { "name": "沙湾区", "code": "511111" }, { "name": "五通桥区", "code": "511112" }, { "name": "金口河区", "code": "511113" }, { "name": "犍为县", "code": "511123" }, { "name": "井研县", "code": "511124" }, { "name": "夹江县", "code": "511126" }, { "name": "沐川县", "code": "511129" }, { "name": "峨边彝族自治县", "code": "511132" }, { "name": "马边彝族自治县", "code": "511133" }, { "name": "峨眉山市", "code": "511181" }], "511300": [{ "name": "顺庆区", "code": "511302" }, { "name": "高坪区", "code": "511303" }, { "name": "嘉陵区", "code": "511304" }, { "name": "南部县", "code": "511321" }, { "name": "营山县", "code": "511322" }, { "name": "蓬安县", "code": "511323" }, { "name": "仪陇县", "code": "511324" }, { "name": "西充县", "code": "511325" }, { "name": "阆中市", "code": "511381" }], "511400": [{ "name": "东坡区", "code": "511402" }, { "name": "彭山区", "code": "511403" }, { "name": "仁寿县", "code": "511421" }, { "name": "洪雅县", "code": "511423" }, { "name": "丹棱县", "code": "511424" }, { "name": "青神县", "code": "511425" }], "511500": [{ "name": "翠屏区", "code": "511502" }, { "name": "南溪区", "code": "511503" }, { "name": "宜宾县", "code": "511521" }, { "name": "江安县", "code": "511523" }, { "name": "长宁县", "code": "511524" }, { "name": "高县", "code": "511525" }, { "name": "珙县", "code": "511526" }, { "name": "筠连县", "code": "511527" }, { "name": "兴文县", "code": "511528" }, { "name": "屏山县", "code": "511529" }], "511600": [{ "name": "广安区", "code": "511602" }, { "name": "前锋区", "code": "511603" }, { "name": "岳池县", "code": "511621" }, { "name": "武胜县", "code": "511622" }, { "name": "邻水县", "code": "511623" }, { "name": "华蓥市", "code": "511681" }], "511700": [{ "name": "通川区", "code": "511702" }, { "name": "达川区", "code": "511703" }, { "name": "宣汉县", "code": "511722" }, { "name": "开江县", "code": "511723" }, { "name": "大竹县", "code": "511724" }, { "name": "渠县", "code": "511725" }, { "name": "万源市", "code": "511781" }], "511800": [{ "name": "雨城区", "code": "511802" }, { "name": "名山区", "code": "511803" }, { "name": "荥经县", "code": "511822" }, { "name": "汉源县", "code": "511823" }, { "name": "石棉县", "code": "511824" }, { "name": "天全县", "code": "511825" }, { "name": "芦山县", "code": "511826" }, { "name": "宝兴县", "code": "511827" }], "511900": [{ "name": "巴州区", "code": "511902" }, { "name": "恩阳区", "code": "511903" }, { "name": "通江县", "code": "511921" }, { "name": "南江县", "code": "511922" }, { "name": "平昌县", "code": "511923" }], "512000": [{ "name": "雁江区", "code": "512002" }, { "name": "安岳县", "code": "512021" }, { "name": "乐至县", "code": "512022" }, { "name": "简阳市", "code": "512081" }], "513200": [{ "name": "汶川县", "code": "513221" }, { "name": "理县", "code": "513222" }, { "name": "茂县", "code": "513223" }, { "name": "松潘县", "code": "513224" }, { "name": "九寨沟县", "code": "513225" }, { "name": "金川县", "code": "513226" }, { "name": "小金县", "code": "513227" }, { "name": "黑水县", "code": "513228" }, { "name": "马尔康县", "code": "513229" }, { "name": "壤塘县", "code": "513230" }, { "name": "阿坝县", "code": "513231" }, { "name": "若尔盖县", "code": "513232" }, { "name": "红原县", "code": "513233" }], "513300": [{ "name": "康定市", "code": "513301" }, { "name": "泸定县", "code": "513322" }, { "name": "丹巴县", "code": "513323" }, { "name": "九龙县", "code": "513324" }, { "name": "雅江县", "code": "513325" }, { "name": "道孚县", "code": "513326" }, { "name": "炉霍县", "code": "513327" }, { "name": "甘孜县", "code": "513328" }, { "name": "新龙县", "code": "513329" }, { "name": "德格县", "code": "513330" }, { "name": "白玉县", "code": "513331" }, { "name": "石渠县", "code": "513332" }, { "name": "色达县", "code": "513333" }, { "name": "理塘县", "code": "513334" }, { "name": "巴塘县", "code": "513335" }, { "name": "乡城县", "code": "513336" }, { "name": "稻城县", "code": "513337" }, { "name": "得荣县", "code": "513338" }], "513400": [{ "name": "西昌市", "code": "513401" }, { "name": "木里藏族自治县", "code": "513422" }, { "name": "盐源县", "code": "513423" }, { "name": "德昌县", "code": "513424" }, { "name": "会理县", "code": "513425" }, { "name": "会东县", "code": "513426" }, { "name": "宁南县", "code": "513427" }, { "name": "普格县", "code": "513428" }, { "name": "布拖县", "code": "513429" }, { "name": "金阳县", "code": "513430" }, { "name": "昭觉县", "code": "513431" }, { "name": "喜德县", "code": "513432" }, { "name": "冕宁县", "code": "513433" }, { "name": "越西县", "code": "513434" }, { "name": "甘洛县", "code": "513435" }, { "name": "美姑县", "code": "513436" }, { "name": "雷波县", "code": "513437" }], "520100": [{ "name": "南明区", "code": "520102" }, { "name": "云岩区", "code": "520103" }, { "name": "花溪区", "code": "520111" }, { "name": "乌当区", "code": "520112" }, { "name": "白云区", "code": "520113" }, { "name": "观山湖区", "code": "520115" }, { "name": "开阳县", "code": "520121" }, { "name": "息烽县", "code": "520122" }, { "name": "修文县", "code": "520123" }, { "name": "清镇市", "code": "520181" }], "520200": [{ "name": "钟山区", "code": "520201" }, { "name": "六枝特区", "code": "520203" }, { "name": "水城县", "code": "520221" }, { "name": "盘县", "code": "520222" }], "520300": [{ "name": "红花岗区", "code": "520302" }, { "name": "汇川区", "code": "520303" }, { "name": "遵义县", "code": "520321" }, { "name": "桐梓县", "code": "520322" }, { "name": "绥阳县", "code": "520323" }, { "name": "正安县", "code": "520324" }, { "name": "道真仡佬族苗族自治县", "code": "520325" }, { "name": "务川仡佬族苗族自治县", "code": "520326" }, { "name": "凤冈县", "code": "520327" }, { "name": "湄潭县", "code": "520328" }, { "name": "余庆县", "code": "520329" }, { "name": "习水县", "code": "520330" }, { "name": "赤水市", "code": "520381" }, { "name": "仁怀市", "code": "520382" }], "520400": [{ "name": "西秀区", "code": "520402" }, { "name": "平坝区", "code": "520403" }, { "name": "普定县", "code": "520422" }, { "name": "镇宁布依族苗族自治县", "code": "520423" }, { "name": "关岭布依族苗族自治县", "code": "520424" }, { "name": "紫云苗族布依族自治县", "code": "520425" }], "520500": [{ "name": "七星关区", "code": "520502" }, { "name": "大方县", "code": "520521" }, { "name": "黔西县", "code": "520522" }, { "name": "金沙县", "code": "520523" }, { "name": "织金县", "code": "520524" }, { "name": "纳雍县", "code": "520525" }, { "name": "威宁彝族回族苗族自治县", "code": "520526" }, { "name": "赫章县", "code": "520527" }], "520600": [{ "name": "碧江区", "code": "520602" }, { "name": "万山区", "code": "520603" }, { "name": "江口县", "code": "520621" }, { "name": "玉屏侗族自治县", "code": "520622" }, { "name": "石阡县", "code": "520623" }, { "name": "思南县", "code": "520624" }, { "name": "印江土家族苗族自治县", "code": "520625" }, { "name": "德江县", "code": "520626" }, { "name": "沿河土家族自治县", "code": "520627" }, { "name": "松桃苗族自治县", "code": "520628" }], "522300": [{ "name": "兴义市", "code": "522301" }, { "name": "兴仁县", "code": "522322" }, { "name": "普安县", "code": "522323" }, { "name": "晴隆县", "code": "522324" }, { "name": "贞丰县", "code": "522325" }, { "name": "望谟县", "code": "522326" }, { "name": "册亨县", "code": "522327" }, { "name": "安龙县", "code": "522328" }], "522600": [{ "name": "凯里市", "code": "522601" }, { "name": "黄平县", "code": "522622" }, { "name": "施秉县", "code": "522623" }, { "name": "三穗县", "code": "522624" }, { "name": "镇远县", "code": "522625" }, { "name": "岑巩县", "code": "522626" }, { "name": "天柱县", "code": "522627" }, { "name": "锦屏县", "code": "522628" }, { "name": "剑河县", "code": "522629" }, { "name": "台江县", "code": "522630" }, { "name": "黎平县", "code": "522631" }, { "name": "榕江县", "code": "522632" }, { "name": "从江县", "code": "522633" }, { "name": "雷山县", "code": "522634" }, { "name": "麻江县", "code": "522635" }, { "name": "丹寨县", "code": "522636" }], "522700": [{ "name": "都匀市", "code": "522701" }, { "name": "福泉市", "code": "522702" }, { "name": "荔波县", "code": "522722" }, { "name": "贵定县", "code": "522723" }, { "name": "瓮安县", "code": "522725" }, { "name": "独山县", "code": "522726" }, { "name": "平塘县", "code": "522727" }, { "name": "罗甸县", "code": "522728" }, { "name": "长顺县", "code": "522729" }, { "name": "龙里县", "code": "522730" }, { "name": "惠水县", "code": "522731" }, { "name": "三都水族自治县", "code": "522732" }], "530100": [{ "name": "五华区", "code": "530102" }, { "name": "盘龙区", "code": "530103" }, { "name": "官渡区", "code": "530111" }, { "name": "西山区", "code": "530112" }, { "name": "东川区", "code": "530113" }, { "name": "呈贡区", "code": "530114" }, { "name": "晋宁县", "code": "530122" }, { "name": "富民县", "code": "530124" }, { "name": "宜良县", "code": "530125" }, { "name": "石林彝族自治县", "code": "530126" }, { "name": "嵩明县", "code": "530127" }, { "name": "禄劝彝族苗族自治县", "code": "530128" }, { "name": "寻甸回族彝族自治县", "code": "530129" }, { "name": "安宁市", "code": "530181" }], "530300": [{ "name": "麒麟区", "code": "530302" }, { "name": "马龙县", "code": "530321" }, { "name": "陆良县", "code": "530322" }, { "name": "师宗县", "code": "530323" }, { "name": "罗平县", "code": "530324" }, { "name": "富源县", "code": "530325" }, { "name": "会泽县", "code": "530326" }, { "name": "沾益县", "code": "530328" }, { "name": "宣威市", "code": "530381" }], "530400": [{ "name": "红塔区", "code": "530402" }, { "name": "江川县", "code": "530421" }, { "name": "澄江县", "code": "530422" }, { "name": "通海县", "code": "530423" }, { "name": "华宁县", "code": "530424" }, { "name": "易门县", "code": "530425" }, { "name": "峨山彝族自治县", "code": "530426" }, { "name": "新平彝族傣族自治县", "code": "530427" }, { "name": "元江哈尼族彝族傣族自治县", "code": "530428" }], "530500": [{ "name": "隆阳区", "code": "530502" }, { "name": "施甸县", "code": "530521" }, { "name": "龙陵县", "code": "530523" }, { "name": "昌宁县", "code": "530524" }, { "name": "腾冲市", "code": "530581" }], "530600": [{ "name": "昭阳区", "code": "530602" }, { "name": "鲁甸县", "code": "530621" }, { "name": "巧家县", "code": "530622" }, { "name": "盐津县", "code": "530623" }, { "name": "大关县", "code": "530624" }, { "name": "永善县", "code": "530625" }, { "name": "绥江县", "code": "530626" }, { "name": "镇雄县", "code": "530627" }, { "name": "彝良县", "code": "530628" }, { "name": "威信县", "code": "530629" }, { "name": "水富县", "code": "530630" }], "530700": [{ "name": "古城区", "code": "530702" }, { "name": "玉龙纳西族自治县", "code": "530721" }, { "name": "永胜县", "code": "530722" }, { "name": "华坪县", "code": "530723" }, { "name": "宁蒗彝族自治县", "code": "530724" }], "530800": [{ "name": "思茅区", "code": "530802" }, { "name": "宁洱哈尼族彝族自治县", "code": "530821" }, { "name": "墨江哈尼族自治县", "code": "530822" }, { "name": "景东彝族自治县", "code": "530823" }, { "name": "景谷傣族彝族自治县", "code": "530824" }, { "name": "镇沅彝族哈尼族拉祜族自治县", "code": "530825" }, { "name": "江城哈尼族彝族自治县", "code": "530826" }, { "name": "孟连傣族拉祜族佤族自治县", "code": "530827" }, { "name": "澜沧拉祜族自治县", "code": "530828" }, { "name": "西盟佤族自治县", "code": "530829" }], "530900": [{ "name": "临翔区", "code": "530902" }, { "name": "凤庆县", "code": "530921" }, { "name": "云县", "code": "530922" }, { "name": "永德县", "code": "530923" }, { "name": "镇康县", "code": "530924" }, { "name": "双江拉祜族佤族布朗族傣族自治县", "code": "530925" }, { "name": "耿马傣族佤族自治县", "code": "530926" }, { "name": "沧源佤族自治县", "code": "530927" }], "532300": [{ "name": "楚雄市", "code": "532301" }, { "name": "双柏县", "code": "532322" }, { "name": "牟定县", "code": "532323" }, { "name": "南华县", "code": "532324" }, { "name": "姚安县", "code": "532325" }, { "name": "大姚县", "code": "532326" }, { "name": "永仁县", "code": "532327" }, { "name": "元谋县", "code": "532328" }, { "name": "武定县", "code": "532329" }, { "name": "禄丰县", "code": "532331" }], "532500": [{ "name": "个旧市", "code": "532501" }, { "name": "开远市", "code": "532502" }, { "name": "蒙自市", "code": "532503" }, { "name": "弥勒市", "code": "532504" }, { "name": "屏边苗族自治县", "code": "532523" }, { "name": "建水县", "code": "532524" }, { "name": "石屏县", "code": "532525" }, { "name": "泸西县", "code": "532527" }, { "name": "元阳县", "code": "532528" }, { "name": "红河县", "code": "532529" }, { "name": "金平苗族瑶族傣族自治县", "code": "532530" }, { "name": "绿春县", "code": "532531" }, { "name": "河口瑶族自治县", "code": "532532" }], "532600": [{ "name": "文山市", "code": "532601" }, { "name": "砚山县", "code": "532622" }, { "name": "西畴县", "code": "532623" }, { "name": "麻栗坡县", "code": "532624" }, { "name": "马关县", "code": "532625" }, { "name": "丘北县", "code": "532626" }, { "name": "广南县", "code": "532627" }, { "name": "富宁县", "code": "532628" }], "532800": [{ "name": "景洪市", "code": "532801" }, { "name": "勐海县", "code": "532822" }, { "name": "勐腊县", "code": "532823" }], "532900": [{ "name": "大理市", "code": "532901" }, { "name": "漾濞彝族自治县", "code": "532922" }, { "name": "祥云县", "code": "532923" }, { "name": "宾川县", "code": "532924" }, { "name": "弥渡县", "code": "532925" }, { "name": "南涧彝族自治县", "code": "532926" }, { "name": "巍山彝族回族自治县", "code": "532927" }, { "name": "永平县", "code": "532928" }, { "name": "云龙县", "code": "532929" }, { "name": "洱源县", "code": "532930" }, { "name": "剑川县", "code": "532931" }, { "name": "鹤庆县", "code": "532932" }], "533100": [{ "name": "瑞丽市", "code": "533102" }, { "name": "芒市", "code": "533103" }, { "name": "梁河县", "code": "533122" }, { "name": "盈江县", "code": "533123" }, { "name": "陇川县", "code": "533124" }], "533300": [{ "name": "泸水县", "code": "533321" }, { "name": "福贡县", "code": "533323" }, { "name": "贡山独龙族怒族自治县", "code": "533324" }, { "name": "兰坪白族普米族自治县", "code": "533325" }], "533400": [{ "name": "香格里拉市", "code": "533401" }, { "name": "德钦县", "code": "533422" }, { "name": "维西傈僳族自治县", "code": "533423" }], "540100": [{ "name": "城关区", "code": "540102" }, { "name": "林周县", "code": "540121" }, { "name": "当雄县", "code": "540122" }, { "name": "尼木县", "code": "540123" }, { "name": "曲水县", "code": "540124" }, { "name": "堆龙德庆县", "code": "540125" }, { "name": "达孜县", "code": "540126" }, { "name": "墨竹工卡县", "code": "540127" }], "540200": [{ "name": "桑珠孜区", "code": "540202" }, { "name": "南木林县", "code": "540221" }, { "name": "江孜县", "code": "540222" }, { "name": "定日县", "code": "540223" }, { "name": "萨迦县", "code": "540224" }, { "name": "拉孜县", "code": "540225" }, { "name": "昂仁县", "code": "540226" }, { "name": "谢通门县", "code": "540227" }, { "name": "白朗县", "code": "540228" }, { "name": "仁布县", "code": "540229" }, { "name": "康马县", "code": "540230" }, { "name": "定结县", "code": "540231" }, { "name": "仲巴县", "code": "540232" }, { "name": "亚东县", "code": "540233" }, { "name": "吉隆县", "code": "540234" }, { "name": "聂拉木县", "code": "540235" }, { "name": "萨嘎县", "code": "540236" }, { "name": "岗巴县", "code": "540237" }], "540300": [{ "name": "卡若区", "code": "540302" }, { "name": "江达县", "code": "540321" }, { "name": "贡觉县", "code": "540322" }, { "name": "类乌齐县", "code": "540323" }, { "name": "丁青县", "code": "540324" }, { "name": "察雅县", "code": "540325" }, { "name": "八宿县", "code": "540326" }, { "name": "左贡县", "code": "540327" }, { "name": "芒康县", "code": "540328" }, { "name": "洛隆县", "code": "540329" }, { "name": "边坝县", "code": "540330" }], "540400": [{ "name": "巴宜区", "code": "540402" }, { "name": "工布江达县", "code": "540421" }, { "name": "米林县", "code": "540422" }, { "name": "墨脱县", "code": "540423" }, { "name": "波密县", "code": "540424" }, { "name": "察隅县", "code": "540425" }, { "name": "朗县", "code": "540426" }], "542200": [{ "name": "乃东县", "code": "542221" }, { "name": "扎囊县", "code": "542222" }, { "name": "贡嘎县", "code": "542223" }, { "name": "桑日县", "code": "542224" }, { "name": "琼结县", "code": "542225" }, { "name": "曲松县", "code": "542226" }, { "name": "措美县", "code": "542227" }, { "name": "洛扎县", "code": "542228" }, { "name": "加查县", "code": "542229" }, { "name": "隆子县", "code": "542231" }, { "name": "错那县", "code": "542232" }, { "name": "浪卡子县", "code": "542233" }], "542400": [{ "name": "那曲县", "code": "542421" }, { "name": "嘉黎县", "code": "542422" }, { "name": "比如县", "code": "542423" }, { "name": "聂荣县", "code": "542424" }, { "name": "安多县", "code": "542425" }, { "name": "申扎县", "code": "542426" }, { "name": "索县", "code": "542427" }, { "name": "班戈县", "code": "542428" }, { "name": "巴青县", "code": "542429" }, { "name": "尼玛县", "code": "542430" }, { "name": "双湖县", "code": "542431" }], "542500": [{ "name": "普兰县", "code": "542521" }, { "name": "札达县", "code": "542522" }, { "name": "噶尔县", "code": "542523" }, { "name": "日土县", "code": "542524" }, { "name": "革吉县", "code": "542525" }, { "name": "改则县", "code": "542526" }, { "name": "措勤县", "code": "542527" }], "610100": [{ "name": "新城区", "code": "610102" }, { "name": "碑林区", "code": "610103" }, { "name": "莲湖区", "code": "610104" }, { "name": "灞桥区", "code": "610111" }, { "name": "未央区", "code": "610112" }, { "name": "雁塔区", "code": "610113" }, { "name": "阎良区", "code": "610114" }, { "name": "临潼区", "code": "610115" }, { "name": "长安区", "code": "610116" }, { "name": "高陵区", "code": "610117" }, { "name": "蓝田县", "code": "610122" }, { "name": "周至县", "code": "610124" }, { "name": "户县", "code": "610125" }, { "name": "高陵县", "code": "610126" }], "610200": [{ "name": "王益区", "code": "610202" }, { "name": "印台区", "code": "610203" }, { "name": "耀州区", "code": "610204" }, { "name": "宜君县", "code": "610222" }], "610300": [{ "name": "渭滨区", "code": "610302" }, { "name": "金台区", "code": "610303" }, { "name": "陈仓区", "code": "610304" }, { "name": "凤翔县", "code": "610322" }, { "name": "岐山县", "code": "610323" }, { "name": "扶风县", "code": "610324" }, { "name": "眉县", "code": "610326" }, { "name": "陇县", "code": "610327" }, { "name": "千阳县", "code": "610328" }, { "name": "麟游县", "code": "610329" }, { "name": "凤县", "code": "610330" }, { "name": "太白县", "code": "610331" }], "610400": [{ "name": "秦都区", "code": "610402" }, { "name": "杨陵区", "code": "610403" }, { "name": "渭城区", "code": "610404" }, { "name": "三原县", "code": "610422" }, { "name": "泾阳县", "code": "610423" }, { "name": "乾县", "code": "610424" }, { "name": "礼泉县", "code": "610425" }, { "name": "永寿县", "code": "610426" }, { "name": "彬县", "code": "610427" }, { "name": "长武县", "code": "610428" }, { "name": "旬邑县", "code": "610429" }, { "name": "淳化县", "code": "610430" }, { "name": "武功县", "code": "610431" }, { "name": "兴平市", "code": "610481" }], "610500": [{ "name": "临渭区", "code": "610502" }, { "name": "华县", "code": "610521" }, { "name": "潼关县", "code": "610522" }, { "name": "大荔县", "code": "610523" }, { "name": "合阳县", "code": "610524" }, { "name": "澄城县", "code": "610525" }, { "name": "蒲城县", "code": "610526" }, { "name": "白水县", "code": "610527" }, { "name": "富平县", "code": "610528" }, { "name": "韩城市", "code": "610581" }, { "name": "华阴市", "code": "610582" }], "610600": [{ "name": "宝塔区", "code": "610602" }, { "name": "延长县", "code": "610621" }, { "name": "延川县", "code": "610622" }, { "name": "子长县", "code": "610623" }, { "name": "安塞县", "code": "610624" }, { "name": "志丹县", "code": "610625" }, { "name": "吴起县", "code": "610626" }, { "name": "甘泉县", "code": "610627" }, { "name": "富县", "code": "610628" }, { "name": "洛川县", "code": "610629" }, { "name": "宜川县", "code": "610630" }, { "name": "黄龙县", "code": "610631" }, { "name": "黄陵县", "code": "610632" }], "610700": [{ "name": "汉台区", "code": "610702" }, { "name": "南郑县", "code": "610721" }, { "name": "城固县", "code": "610722" }, { "name": "洋县", "code": "610723" }, { "name": "西乡县", "code": "610724" }, { "name": "勉县", "code": "610725" }, { "name": "宁强县", "code": "610726" }, { "name": "略阳县", "code": "610727" }, { "name": "镇巴县", "code": "610728" }, { "name": "留坝县", "code": "610729" }, { "name": "佛坪县", "code": "610730" }], "610800": [{ "name": "榆阳区", "code": "610802" }, { "name": "神木县", "code": "610821" }, { "name": "府谷县", "code": "610822" }, { "name": "横山县", "code": "610823" }, { "name": "靖边县", "code": "610824" }, { "name": "定边县", "code": "610825" }, { "name": "绥德县", "code": "610826" }, { "name": "米脂县", "code": "610827" }, { "name": "佳县", "code": "610828" }, { "name": "吴堡县", "code": "610829" }, { "name": "清涧县", "code": "610830" }, { "name": "子洲县", "code": "610831" }], "610900": [{ "name": "汉滨区", "code": "610902" }, { "name": "汉阴县", "code": "610921" }, { "name": "石泉县", "code": "610922" }, { "name": "宁陕县", "code": "610923" }, { "name": "紫阳县", "code": "610924" }, { "name": "岚皋县", "code": "610925" }, { "name": "平利县", "code": "610926" }, { "name": "镇坪县", "code": "610927" }, { "name": "旬阳县", "code": "610928" }, { "name": "白河县", "code": "610929" }], "611000": [{ "name": "商州区", "code": "611002" }, { "name": "洛南县", "code": "611021" }, { "name": "丹凤县", "code": "611022" }, { "name": "商南县", "code": "611023" }, { "name": "山阳县", "code": "611024" }, { "name": "镇安县", "code": "611025" }, { "name": "柞水县", "code": "611026" }], "620100": [{ "name": "城关区", "code": "620102" }, { "name": "七里河区", "code": "620103" }, { "name": "西固区", "code": "620104" }, { "name": "安宁区", "code": "620105" }, { "name": "红古区", "code": "620111" }, { "name": "永登县", "code": "620121" }, { "name": "皋兰县", "code": "620122" }, { "name": "榆中县", "code": "620123" }], "620200": [], "620300": [{ "name": "金川区", "code": "620302" }, { "name": "永昌县", "code": "620321" }], "620400": [{ "name": "白银区", "code": "620402" }, { "name": "平川区", "code": "620403" }, { "name": "靖远县", "code": "620421" }, { "name": "会宁县", "code": "620422" }, { "name": "景泰县", "code": "620423" }], "620500": [{ "name": "秦州区", "code": "620502" }, { "name": "麦积区", "code": "620503" }, { "name": "清水县", "code": "620521" }, { "name": "秦安县", "code": "620522" }, { "name": "甘谷县", "code": "620523" }, { "name": "武山县", "code": "620524" }, { "name": "张家川回族自治县", "code": "620525" }], "620600": [{ "name": "凉州区", "code": "620602" }, { "name": "民勤县", "code": "620621" }, { "name": "古浪县", "code": "620622" }, { "name": "天祝藏族自治县", "code": "620623" }], "620700": [{ "name": "甘州区", "code": "620702" }, { "name": "肃南裕固族自治县", "code": "620721" }, { "name": "民乐县", "code": "620722" }, { "name": "临泽县", "code": "620723" }, { "name": "高台县", "code": "620724" }, { "name": "山丹县", "code": "620725" }], "620800": [{ "name": "崆峒区", "code": "620802" }, { "name": "泾川县", "code": "620821" }, { "name": "灵台县", "code": "620822" }, { "name": "崇信县", "code": "620823" }, { "name": "华亭县", "code": "620824" }, { "name": "庄浪县", "code": "620825" }, { "name": "静宁县", "code": "620826" }], "620900": [{ "name": "肃州区", "code": "620902" }, { "name": "金塔县", "code": "620921" }, { "name": "瓜州县", "code": "620922" }, { "name": "肃北蒙古族自治县", "code": "620923" }, { "name": "阿克塞哈萨克族自治县", "code": "620924" }, { "name": "玉门市", "code": "620981" }, { "name": "敦煌市", "code": "620982" }], "621000": [{ "name": "西峰区", "code": "621002" }, { "name": "庆城县", "code": "621021" }, { "name": "环县", "code": "621022" }, { "name": "华池县", "code": "621023" }, { "name": "合水县", "code": "621024" }, { "name": "正宁县", "code": "621025" }, { "name": "宁县", "code": "621026" }, { "name": "镇原县", "code": "621027" }], "621100": [{ "name": "安定区", "code": "621102" }, { "name": "通渭县", "code": "621121" }, { "name": "陇西县", "code": "621122" }, { "name": "渭源县", "code": "621123" }, { "name": "临洮县", "code": "621124" }, { "name": "漳县", "code": "621125" }, { "name": "岷县", "code": "621126" }], "621200": [{ "name": "武都区", "code": "621202" }, { "name": "成县", "code": "621221" }, { "name": "文县", "code": "621222" }, { "name": "宕昌县", "code": "621223" }, { "name": "康县", "code": "621224" }, { "name": "西和县", "code": "621225" }, { "name": "礼县", "code": "621226" }, { "name": "徽县", "code": "621227" }, { "name": "两当县", "code": "621228" }], "622900": [{ "name": "临夏市", "code": "622901" }, { "name": "临夏县", "code": "622921" }, { "name": "康乐县", "code": "622922" }, { "name": "永靖县", "code": "622923" }, { "name": "广河县", "code": "622924" }, { "name": "和政县", "code": "622925" }, { "name": "东乡族自治县", "code": "622926" }, { "name": "积石山保安族东乡族撒拉族自治县", "code": "622927" }], "623000": [{ "name": "合作市", "code": "623001" }, { "name": "临潭县", "code": "623021" }, { "name": "卓尼县", "code": "623022" }, { "name": "舟曲县", "code": "623023" }, { "name": "迭部县", "code": "623024" }, { "name": "玛曲县", "code": "623025" }, { "name": "碌曲县", "code": "623026" }, { "name": "夏河县", "code": "623027" }], "630100": [{ "name": "城东区", "code": "630102" }, { "name": "城中区", "code": "630103" }, { "name": "城西区", "code": "630104" }, { "name": "城北区", "code": "630105" }, { "name": "大通回族土族自治县", "code": "630121" }, { "name": "湟中县", "code": "630122" }, { "name": "湟源县", "code": "630123" }], "630200": [{ "name": "乐都区", "code": "630202" }, { "name": "平安区", "code": "630203" }, { "name": "民和回族土族自治县", "code": "630222" }, { "name": "互助土族自治县", "code": "630223" }, { "name": "化隆回族自治县", "code": "630224" }, { "name": "循化撒拉族自治县", "code": "630225" }], "632200": [{ "name": "门源回族自治县", "code": "632221" }, { "name": "祁连县", "code": "632222" }, { "name": "海晏县", "code": "632223" }, { "name": "刚察县", "code": "632224" }], "632300": [{ "name": "同仁县", "code": "632321" }, { "name": "尖扎县", "code": "632322" }, { "name": "泽库县", "code": "632323" }, { "name": "河南蒙古族自治县", "code": "632324" }], "632500": [{ "name": "共和县", "code": "632521" }, { "name": "同德县", "code": "632522" }, { "name": "贵德县", "code": "632523" }, { "name": "兴海县", "code": "632524" }, { "name": "贵南县", "code": "632525" }], "632600": [{ "name": "玛沁县", "code": "632621" }, { "name": "班玛县", "code": "632622" }, { "name": "甘德县", "code": "632623" }, { "name": "达日县", "code": "632624" }, { "name": "久治县", "code": "632625" }, { "name": "玛多县", "code": "632626" }], "632700": [{ "name": "玉树市", "code": "632701" }, { "name": "杂多县", "code": "632722" }, { "name": "称多县", "code": "632723" }, { "name": "治多县", "code": "632724" }, { "name": "囊谦县", "code": "632725" }, { "name": "曲麻莱县", "code": "632726" }], "632800": [{ "name": "格尔木市", "code": "632801" }, { "name": "德令哈市", "code": "632802" }, { "name": "乌兰县", "code": "632821" }, { "name": "都兰县", "code": "632822" }, { "name": "天峻县", "code": "632823" }], "640100": [{ "name": "兴庆区", "code": "640104" }, { "name": "西夏区", "code": "640105" }, { "name": "金凤区", "code": "640106" }, { "name": "永宁县", "code": "640121" }, { "name": "贺兰县", "code": "640122" }, { "name": "灵武市", "code": "640181" }], "640200": [{ "name": "大武口区", "code": "640202" }, { "name": "惠农区", "code": "640205" }, { "name": "平罗县", "code": "640221" }], "640300": [{ "name": "利通区", "code": "640302" }, { "name": "红寺堡区", "code": "640303" }, { "name": "盐池县", "code": "640323" }, { "name": "同心县", "code": "640324" }, { "name": "青铜峡市", "code": "640381" }], "640400": [{ "name": "原州区", "code": "640402" }, { "name": "西吉县", "code": "640422" }, { "name": "隆德县", "code": "640423" }, { "name": "泾源县", "code": "640424" }, { "name": "彭阳县", "code": "640425" }], "640500": [{ "name": "沙坡头区", "code": "640502" }, { "name": "中宁县", "code": "640521" }, { "name": "海原县", "code": "640522" }], "650100": [{ "name": "天山区", "code": "650102" }, { "name": "沙依巴克区", "code": "650103" }, { "name": "新市区", "code": "650104" }, { "name": "水磨沟区", "code": "650105" }, { "name": "头屯河区", "code": "650106" }, { "name": "达坂城区", "code": "650107" }, { "name": "米东区", "code": "650109" }, { "name": "乌鲁木齐县", "code": "650121" }], "650200": [{ "name": "独山子区", "code": "650202" }, { "name": "克拉玛依区", "code": "650203" }, { "name": "白碱滩区", "code": "650204" }, { "name": "乌尔禾区", "code": "650205" }], "650400": [{ "name": "高昌区", "code": "650402" }, { "name": "鄯善县", "code": "650421" }, { "name": "托克逊县", "code": "650422" }], "652200": [{ "name": "哈密市", "code": "652201" }, { "name": "巴里坤哈萨克自治县", "code": "652222" }, { "name": "伊吾县", "code": "652223" }], "652300": [{ "name": "昌吉市", "code": "652301" }, { "name": "阜康市", "code": "652302" }, { "name": "呼图壁县", "code": "652323" }, { "name": "玛纳斯县", "code": "652324" }, { "name": "奇台县", "code": "652325" }, { "name": "吉木萨尔县", "code": "652327" }, { "name": "木垒哈萨克自治县", "code": "652328" }], "652700": [{ "name": "博乐市", "code": "652701" }, { "name": "阿拉山口市", "code": "652702" }, { "name": "精河县", "code": "652722" }, { "name": "温泉县", "code": "652723" }], "652800": [{ "name": "库尔勒市", "code": "652801" }, { "name": "轮台县", "code": "652822" }, { "name": "尉犁县", "code": "652823" }, { "name": "若羌县", "code": "652824" }, { "name": "且末县", "code": "652825" }, { "name": "焉耆回族自治县", "code": "652826" }, { "name": "和静县", "code": "652827" }, { "name": "和硕县", "code": "652828" }, { "name": "博湖县", "code": "652829" }], "652900": [{ "name": "阿克苏市", "code": "652901" }, { "name": "温宿县", "code": "652922" }, { "name": "库车县", "code": "652923" }, { "name": "沙雅县", "code": "652924" }, { "name": "新和县", "code": "652925" }, { "name": "拜城县", "code": "652926" }, { "name": "乌什县", "code": "652927" }, { "name": "阿瓦提县", "code": "652928" }, { "name": "柯坪县", "code": "652929" }], "653000": [{ "name": "阿图什市", "code": "653001" }, { "name": "阿克陶县", "code": "653022" }, { "name": "阿合奇县", "code": "653023" }, { "name": "乌恰县", "code": "653024" }], "653100": [{ "name": "喀什市", "code": "653101" }, { "name": "疏附县", "code": "653121" }, { "name": "疏勒县", "code": "653122" }, { "name": "英吉沙县", "code": "653123" }, { "name": "泽普县", "code": "653124" }, { "name": "莎车县", "code": "653125" }, { "name": "叶城县", "code": "653126" }, { "name": "麦盖提县", "code": "653127" }, { "name": "岳普湖县", "code": "653128" }, { "name": "伽师县", "code": "653129" }, { "name": "巴楚县", "code": "653130" }, { "name": "塔什库尔干塔吉克自治县", "code": "653131" }], "653200": [{ "name": "和田市", "code": "653201" }, { "name": "和田县", "code": "653221" }, { "name": "墨玉县", "code": "653222" }, { "name": "皮山县", "code": "653223" }, { "name": "洛浦县", "code": "653224" }, { "name": "策勒县", "code": "653225" }, { "name": "于田县", "code": "653226" }, { "name": "民丰县", "code": "653227" }], "654000": [{ "name": "伊宁市", "code": "654002" }, { "name": "奎屯市", "code": "654003" }, { "name": "霍尔果斯市", "code": "654004" }, { "name": "伊宁县", "code": "654021" }, { "name": "察布查尔锡伯自治县", "code": "654022" }, { "name": "霍城县", "code": "654023" }, { "name": "巩留县", "code": "654024" }, { "name": "新源县", "code": "654025" }, { "name": "昭苏县", "code": "654026" }, { "name": "特克斯县", "code": "654027" }, { "name": "尼勒克县", "code": "654028" }], "654200": [{ "name": "塔城市", "code": "654201" }, { "name": "乌苏市", "code": "654202" }, { "name": "额敏县", "code": "654221" }, { "name": "沙湾县", "code": "654223" }, { "name": "托里县", "code": "654224" }, { "name": "裕民县", "code": "654225" }, { "name": "和布克赛尔蒙古自治县", "code": "654226" }], "654300": [{ "name": "阿勒泰市", "code": "654301" }, { "name": "布尔津县", "code": "654321" }, { "name": "富蕴县", "code": "654322" }, { "name": "福海县", "code": "654323" }, { "name": "哈巴河县", "code": "654324" }, { "name": "青河县", "code": "654325" }, { "name": "吉木乃县", "code": "654326" }], "659001": [] };

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "k-area" },
    [
      _c(
        "k-select",
        {
          attrs: { styles: _vm.selectStyle, placeholder: "省/直辖市" },
          model: {
            value: _vm.curProvince,
            callback: function($$v) {
              _vm.curProvince = $$v
            },
            expression: "curProvince"
          }
        },
        _vm._l(_vm.province, function(item) {
          return _c(
            "k-option",
            {
              key: item.code,
              attrs: {
                value: item.code,
                label: item.name,
                selected: item.code == _vm.curProvince
              }
            },
            [_vm._v(_vm._s(item.name))]
          )
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "k-select",
        {
          attrs: { styles: _vm.selectStyle, placeholder: "市/区" },
          model: {
            value: _vm.curCity,
            callback: function($$v) {
              _vm.curCity = $$v
            },
            expression: "curCity"
          }
        },
        _vm._l(_vm.city[_vm.curProvince], function(item) {
          return _c(
            "k-option",
            {
              key: item.code,
              attrs: {
                value: item.code,
                label: item.name,
                selected: item.code == _vm.curCity
              }
            },
            [_vm._v(_vm._s(item.name))]
          )
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "k-select",
        {
          attrs: { styles: _vm.selectStyle, placeholder: "区/县" },
          model: {
            value: _vm.curCounty,
            callback: function($$v) {
              _vm.curCounty = $$v
            },
            expression: "curCounty"
          }
        },
        _vm._l(_vm.county[_vm.curCity], function(item) {
          return _c(
            "k-option",
            {
              key: item.code,
              attrs: {
                value: item.code,
                label: item.name,
                selected: item.code == _vm.curCounty
              }
            },
            [_vm._v(_vm._s(item.name))]
          )
        }),
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-d8981974", esExports)
  }
}

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_vue__ = __webpack_require__(87);

__WEBPACK_IMPORTED_MODULE_0__popup_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__popup_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__popup_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__popup_vue__["a" /* default */]);

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dnd; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__ = __webpack_require__(5);



var Dnd = function () {
  //如果有parent参数，则拖拽范围是parent内
  function Dnd(el, handler, parent) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Dnd);

    this.dx = 0;
    this.dy = 0;
    this.el = el;
    this.handler = handler;
    this.parent = parent;
    this.eventDown = this.eventDown.bind(this);
    this.eventMove = this.eventMove.bind(this);
    this.eventUp = this.eventUp.bind(this);
    this.bindEvent();
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Dnd, [{
    key: 'bindEvent',
    value: function bindEvent() {
      this.handler.addEventListener('mousedown', this.eventDown);
    }
  }, {
    key: 'eventDown',
    value: function eventDown(e) {
      var offsetLeft = this.parent ? Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["c" /* offset */])(this.el, this.parent).left : Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["c" /* offset */])(this.el).left;
      var offsetTop = this.parent ? Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["c" /* offset */])(this.el, this.parent).top : Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["c" /* offset */])(this.el).top;
      var position = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(this.el, 'position');
      if (position === 'static' || position === 'relative') {
        Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["e" /* setStyle */])(this.el, {
          position: 'absolute'
        });
      }
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["e" /* setStyle */])(this.handler, {
        cursor: 'move'
      });
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["e" /* setStyle */])(this.el, {
        left: offsetLeft + 'px',
        top: offsetTop + 'px',
        margin: 'auto'
      });
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["e" /* setStyle */])(document.body, {
        userSelect: 'none'
      });
      this.dx = e.clientX - offsetLeft;
      this.dy = e.clientY - offsetTop;
      document.addEventListener('mousemove', this.eventMove);
      document.addEventListener('mouseup', this.eventUp);
    }
  }, {
    key: 'eventMove',
    value: function eventMove(e) {
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["e" /* setStyle */])(this.el, {
        top: e.clientY - this.dy + 'px',
        left: e.clientX - this.dx + 'px'
      });
    }
  }, {
    key: 'eventUp',
    value: function eventUp(e) {
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["e" /* setStyle */])(this.handler, {
        cursor: 'default'
      });
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["e" /* setStyle */])(document.body, {
        userSelect: 'auto'
      });
      document.removeEventListener('mousemove', this.eventMove);
      document.removeEventListener('mouseup', this.eventUp);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.handler.removeEventListener('mousedown', this.eventDown);
    }
  }]);

  return Dnd;
}();

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "k-t-fade" } }, [
    _vm.show
      ? _c(
          "div",
          {
            class: [
              "k-popup",
              _vm.layout.indexOf("mask") > -1
                ? "k-popup--mask"
                : "k-popup--transparent"
            ]
          },
          [
            _vm.show
              ? _c("div", { staticClass: "k-popup__wrapper" }, [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "dnd",
                          rawName: "v-dnd",
                          value: { handlerClass: "k-popup__header__title" },
                          expression: "{handlerClass:'k-popup__header__title'}"
                        }
                      ],
                      staticClass: "k-popup__container"
                    },
                    [
                      _vm.layout.indexOf("close") > -1
                        ? _c("k-icon", {
                            staticClass: "k-popup__close",
                            attrs: {
                              name: "k-icon-close",
                              size: "16",
                              title: "关闭",
                              weight: ""
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                return _vm.onCancel($event)
                              }
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._t("header", [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.layout.indexOf("header") > -1,
                                expression: "layout.indexOf('header')>-1"
                              }
                            ],
                            staticClass: "k-popup__header"
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "k-popup__header__title" },
                              [_c("b", [_vm._v(_vm._s(_vm.title))])]
                            )
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _vm.layout.indexOf("body") > -1
                        ? _c("div", { staticClass: "k-popup__body" }, [
                            _c(
                              "div",
                              { staticClass: "k-popup__content" },
                              [_vm._t("body"), _vm._v(" "), _vm._t("default")],
                              2
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.layout.indexOf("footer") > -1
                        ? _c("div", { staticClass: "k-popup__footer" }, [
                            _c(
                              "div",
                              { staticClass: "k-popup__footer__con" },
                              [
                                _vm._t("footer", [
                                  _c(
                                    "k-button",
                                    {
                                      attrs: { size: _vm.buttonSize },
                                      on: { click: _vm.onCancel }
                                    },
                                    [_vm._v(_vm._s(_vm.cancelText))]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "k-button",
                                    {
                                      attrs: {
                                        type: "primary",
                                        size: _vm.buttonSize
                                      },
                                      on: { click: _vm.onOk }
                                    },
                                    [_vm._v(_vm._s(_vm.okText))]
                                  )
                                ])
                              ],
                              2
                            )
                          ])
                        : _vm._e()
                    ],
                    2
                  )
                ])
              : _vm._e()
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-7e757f40", esExports)
  }
}

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_dialog_dialog__ = __webpack_require__(169);


/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue, opts) {
    var KPopupConstructor = Vue.extend(__WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_dialog_dialog__["a" /* default */]);
    var instance = new KPopupConstructor().$mount();
    document.body.appendChild(instance.$el);

    Vue.dialog = Vue.prototype.$dialog = function (_ref) {
      var title = _ref.title,
          content = _ref.content,
          ok = _ref.ok,
          cancel = _ref.cancel,
          okText = _ref.okText,
          cancelText = _ref.cancelText;


      instance.$props.title = title;

      instance.$props.okText = okText;

      instance.$props.cancelText = cancelText;

      if (typeof content === 'function') {
        instance.$slots.default = content.call(this);
      } else {
        instance.$props.content = content;
      }
      instance.$props.show = true;

      instance.$on('after:ok', function () {
        instance.$props.show = false;
        ok && ok();
        instance.$off(['after:cancel', 'after:ok']);
      });
      instance.$on('after:cancel', function () {
        cancel && cancel();
        instance.$off(['after:cancel', 'after:ok']);
      });
    };
  }
});

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_dialog_vue__ = __webpack_require__(92);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5311dae6_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_dialog_vue__ = __webpack_require__(170);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_dialog_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5311dae6_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_dialog_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/dialog/dialog.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5311dae6", Component.options)
  } else {
    hotAPI.reload("data-v-5311dae6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "k-popup",
    _vm._b(
      {
        attrs: { show: _vm.show },
        on: {
          "update:show": function($event) {
            _vm.show = $event
          },
          "after:cancel": _vm.afterCancel,
          "after:ok": _vm.afterOk
        }
      },
      "k-popup",
      _vm.$props,
      false
    ),
    [
      _vm.$slots.default
        ? [_vm._t("default")]
        : _c("div", { domProps: { innerHTML: _vm._s(_vm.content) } })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5311dae6", esExports)
  }
}

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carousel_vue__ = __webpack_require__(172);

__WEBPACK_IMPORTED_MODULE_0__carousel_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__carousel_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__carousel_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__carousel_vue__["a" /* default */]);

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_carousel_vue__ = __webpack_require__(93);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_carousel_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/carousel/carousel.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b1d7eb4", Component.options)
  } else {
    hotAPI.reload("data-v-6b1d7eb4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__ = __webpack_require__(174);

__WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__["a" /* default */]);

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_carouselItem_vue__ = __webpack_require__(94);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_carouselItem_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/carousel-item/carouselItem.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e3a35a0a", Component.options)
  } else {
    hotAPI.reload("data-v-e3a35a0a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tips_vue__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_object_js__ = __webpack_require__(52);



var TipsConstructor = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_1__tips_vue__["a" /* default */]);
//单例
var instance = null;
__WEBPACK_IMPORTED_MODULE_1__tips_vue__["a" /* default */].install = function (Vue, opts) {
  // Vue.component(tipsComponent.name,tipsComponent)

  Vue.tips = Vue.prototype.$tips = function () {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (instance === null) {
      instance = new TipsConstructor().$mount();
      document.body.appendChild(instance.$el);
    }
    var opts = {
      content: '', //显示内容，可以写这里，也可以用setContent方法
      style: {}, //样式设置，也可以用setStyle方法
      type: 'success' //成功success,错误error,警告warning
    };
    opts = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_object_js__["a" /* merge */])({}, opts, settings);
    instance.setContent(opts.content).setStyle(opts.style).setType(opts.type).show();

    return instance;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__tips_vue__["a" /* default */]);

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_tips_vue__ = __webpack_require__(96);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_tips_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/tips/tips.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fae513b4", Component.options)
  } else {
    hotAPI.reload("data-v-fae513b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Loading_vue__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_directives_loading___ = __webpack_require__(179);


//自定义指令


__WEBPACK_IMPORTED_MODULE_1__Loading_vue__["a" /* default */].install = function (Vue, opts) {
  var LoadingConstructor = Vue.extend(__WEBPACK_IMPORTED_MODULE_1__Loading_vue__["a" /* default */]);
  var instance = new LoadingConstructor().$mount();
  document.body.appendChild(instance.$el);
  Vue.loading = Vue.prototype.$loading = function () {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    instance.setOptions(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, opts, settings));
    //需要显式调用show方法才能显示出来
    return instance;
  };
  Vue.directive("loading", __WEBPACK_IMPORTED_MODULE_2_karma_ui_directives_loading___["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__Loading_vue__["a" /* default */]);

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.isShow,
          expression: "isShow"
        }
      ],
      class: [
        "k-loading",
        _vm.isFullScreen ? "k-loading--fullscreen" : "k-loading--default"
      ],
      style: { backgroundColor: _vm.backgroundColor, position: _vm.position }
    },
    [
      _c(
        "div",
        { staticClass: "k-loading__content" },
        [
          _c("k-icon", {
            staticClass: "k-loading__icon",
            attrs: {
              name: _vm.iconName,
              size: _vm.iconSize,
              color: _vm.iconColor
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.content,
            expression: "content"
          }
        ],
        staticClass: "k-loading__text",
        style: { color: _vm.color },
        domProps: { innerHTML: _vm._s(_vm.content) }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-10dc4500", esExports)
  }
}

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_throttle_debounce__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_loading_Loading_vue__ = __webpack_require__(97);





var instance = "@@instance";
var settings = {
  content: "努力加载中. . .",
  position: 'absolute',
  isFullScreen: true,
  color: "#378cee",
  backgroundColor: "rgba(255,255,255,.5)",
  iconColor: "#378cee"

};
/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding) {
    var LoadingConstructor = __WEBPACK_IMPORTED_MODULE_1_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_loading_Loading_vue__["a" /* default */]);
    el[instance] = new LoadingConstructor().$mount();
    var position = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom__["b" /* getStyle */])(el, "position");
    if (position !== "fixed" && position !== "relative" && position !== "absolute") {
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom__["e" /* setStyle */])(el, "position", "relative");
    }
    el.appendChild(el[instance].$el);
  },
  inserted: function inserted(el, binding) {
    var isShow = false,
        v = binding.value;
    if (typeof v === "boolean") {
      isShow = v;
    } else {
      isShow = v.loading;
      el[instance].setOptions(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, settings, v.binding));
    }
    isShow && el[instance].show();
  },
  update: function update(el, binding) {
    var isShow = false,
        v = binding.value;
    if (typeof v === "boolean") {
      isShow = v;
    } else {
      isShow = v.loading;
      el[instance].setOptions(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, settings, v.binding));
    }
    if (isShow) {
      Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_throttle_debounce__["a" /* debounce */])().then(el[instance].show);
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_throttle_debounce__["a" /* debounce */])().then(el[instance].hide);
    }
  },
  unbind: function unbind(el, binding) {
    el[instance] = null;
  }
});

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export throttle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return debounce; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);

var throttle = function throttle() {
  var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

  var last = +new Date(),
      timer = void 0,
      now = +new Date();
  if (now - last > interval) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (res) {
      timer = setTimeout(function () {
        res();
      }, interval);
    });
  } else {
    clearTimeout(timer);
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject();
  }
};

var debounce = function debounce() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

  var timer = null;
  clearTimeout(timer);
  return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve) {
    timer = setTimeout(function () {
      resolve();
    }, delay);
  });
};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(32);
__webpack_require__(47);
__webpack_require__(182);
__webpack_require__(186);
__webpack_require__(187);
module.exports = __webpack_require__(3).Promise;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var global = __webpack_require__(1);
var ctx = __webpack_require__(12);
var classof = __webpack_require__(58);
var $export = __webpack_require__(6);
var isObject = __webpack_require__(8);
var aFunction = __webpack_require__(19);
var anInstance = __webpack_require__(59);
var forOf = __webpack_require__(26);
var speciesConstructor = __webpack_require__(100);
var task = __webpack_require__(101).set;
var microtask = __webpack_require__(184)();
var newPromiseCapabilityModule = __webpack_require__(60);
var perform = __webpack_require__(102);
var userAgent = __webpack_require__(185);
var promiseResolve = __webpack_require__(103);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(4)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
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
  Internal.prototype = __webpack_require__(61)($Promise.prototype, {
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
    // 25.4.5.1 Promise.prototype.catch(onRejected)
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
__webpack_require__(25)($Promise, PROMISE);
__webpack_require__(104)(PROMISE);
Wrapper = __webpack_require__(3)[PROMISE];

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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(86)(function (iter) {
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
/* 183 */
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
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var macrotask = __webpack_require__(101).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

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
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
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
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(6);
var core = __webpack_require__(3);
var global = __webpack_require__(1);
var speciesConstructor = __webpack_require__(100);
var promiseResolve = __webpack_require__(103);

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
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(60);
var perform = __webpack_require__(102);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__to_top_vue__ = __webpack_require__(189);

__WEBPACK_IMPORTED_MODULE_0__to_top_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__to_top_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__to_top_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__to_top_vue__["a" /* default */]);

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_to_top_vue__ = __webpack_require__(105);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_06dbb286_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_to_top_vue__ = __webpack_require__(190);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_to_top_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_06dbb286_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_to_top_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/to-top/to-top.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06dbb286", Component.options)
  } else {
    hotAPI.reload("data-v-06dbb286", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.visible
    ? _c(
        "div",
        {
          staticClass: "k-to-top",
          style: { bottom: _vm.bottom, right: _vm.right }
        },
        [
          _vm._t("default", [
            _c(
              "div",
              { staticClass: "k-to-top__btn", on: { click: _vm.onToTop } },
              [
                _c("span", { staticClass: "k-to-top__text" }, [
                  _vm._v("回到顶部")
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "k-to-top__icon" })
              ]
            )
          ])
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-06dbb286", esExports)
  }
}

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination__ = __webpack_require__(192);

__WEBPACK_IMPORTED_MODULE_0__pagination__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__pagination__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__pagination__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__pagination__["a" /* default */]);

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_pagination_vue__ = __webpack_require__(106);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5f0df926_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_pagination_vue__ = __webpack_require__(193);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_pagination_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5f0df926_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_pagination_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/pagination/pagination.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f0df926", Component.options)
  } else {
    hotAPI.reload("data-v-5f0df926", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "k-pagi", class: { "k-pagi-disabled-all": _vm.disabled } },
    [
      _vm.showItem("total")
        ? _c(
            "li",
            {
              staticClass: "k-pagi-total",
              class: "k-pagi-order-" + _vm.order("total")
            },
            [_vm._v("\n    共 " + _vm._s(_vm.total) + " 条\n  ")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showItem("prev")
        ? _c(
            "li",
            {
              staticClass: "k-pagi-item k-pagi-prev",
              class: [
                "k-pagi-order-" + _vm.order("prev"),
                { "k-pagi-disabled": _vm.currentPage <= 1 }
              ],
              on: { click: _vm.goPrev }
            },
            [_c("k-icon", { attrs: { name: "k-icon-arrow-left" } })],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showItem("pager")
        ? [
            _vm._l(_vm.cTotal, function(page, i) {
              return [
                _c(
                  "li",
                  {
                    key: i,
                    staticClass: "k-pagi-item",
                    class: [
                      "k-pagi-order-" + _vm.order("pager"),
                      {
                        "k-current-page": page == _vm.currentPage,
                        "k-pagi-dot": page == _vm.dot
                      }
                    ],
                    on: {
                      click: function($event) {
                        _vm.pageChange(page)
                      }
                    }
                  },
                  [_vm._v(_vm._s(page))]
                )
              ]
            })
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.showItem("next")
        ? _c(
            "li",
            {
              staticClass: "k-pagi-item k-pagi-next",
              class: [
                "k-pagi-order-" + _vm.order("next"),
                { "k-pagi-disabled": _vm.currentPage >= _vm.totalPages }
              ],
              on: { click: _vm.goNext }
            },
            [_c("k-icon", { attrs: { name: "k-icon-arrow-right" } })],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showItem("sizes")
        ? _c(
            "li",
            {
              staticClass: "k-pagi-sizes",
              class: "k-pagi-order-" + _vm.order("sizes")
            },
            [
              _c(
                "k-select",
                {
                  attrs: { size: "small" },
                  model: {
                    value: _vm.modelPageSize,
                    callback: function($$v) {
                      _vm.modelPageSize = $$v
                    },
                    expression: "modelPageSize"
                  }
                },
                _vm._l(_vm.pageSizes, function(s) {
                  return _c(
                    "k-option",
                    {
                      key: s,
                      attrs: {
                        label: s + "条/页",
                        value: s,
                        selected: _vm.modelPageSize == s
                      }
                    },
                    [_vm._v(_vm._s(s) + "条/页")]
                  )
                }),
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showItem("jumper")
        ? [
            _c(
              "li",
              {
                staticClass: "k-pagi-go",
                class: "k-pagi-order-" + _vm.order("jumper")
              },
              [
                _vm._v("\n      前往\n      "),
                _c("k-input", {
                  ref: "pageInput",
                  attrs: { size: "small", type: "number" },
                  on: {
                    keyup: function($event) {
                      if (
                        !("button" in $event) &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      return _vm.goto($event)
                    }
                  },
                  model: {
                    value: _vm.goPage,
                    callback: function($$v) {
                      _vm.goPage = _vm._n($$v)
                    },
                    expression: "goPage"
                  }
                }),
                _vm._v("\n      页\n    ")
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { class: "k-pagi-order-" + _vm.order("jumper") },
              [
                _c(
                  "k-button",
                  { attrs: { size: "small" }, on: { click: _vm.goto } },
                  [_vm._v("Go")]
                )
              ],
              1
            )
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5f0df926", esExports)
  }
}

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datePicker__ = __webpack_require__(195);

__WEBPACK_IMPORTED_MODULE_0__datePicker__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__datePicker__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__datePicker__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__datePicker__["a" /* default */]);

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_datePicker_vue__ = __webpack_require__(107);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6fc51437_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_datePicker_vue__ = __webpack_require__(196);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_datePicker_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6fc51437_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_datePicker_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/date-picker/datePicker.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6fc51437", Component.options)
  } else {
    hotAPI.reload("data-v-6fc51437", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "k-dp" },
    [
      _c(
        "k-input",
        {
          style: { width: _vm.width },
          attrs: {
            readonly: _vm.readonly,
            clearable: _vm.clearable,
            size: _vm.size
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "k-dp__icon",
              attrs: { slot: "prepend" },
              slot: "prepend"
            },
            [_c("i", { staticClass: "k-icon-calendar" })]
          )
        ]
      ),
      _vm._v(" "),
      _vm._m(0)
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "k-dp__calendar" }, [
      _c("div", { staticClass: "k-dp__sidebar" }),
      _vm._v(" "),
      _c("div", { staticClass: "k-dp__panel" }, [
        _c("div", { staticClass: "k-dp__header" }, [
          _c("div", [
            _c("span", [
              _c("i", { staticClass: "k-icon-keyboard_arrow_left" })
            ]),
            _vm._v(" "),
            _c("span", [_c("i", { staticClass: "k-icon-keyboard_arrow_left" })])
          ]),
          _vm._v(" "),
          _c("div", [
            _c("span", [
              _c("i", { staticClass: "k-icon-keyboard_arrow_right" })
            ]),
            _vm._v(" "),
            _c("span", [
              _c("i", { staticClass: "k-icon-keyboard_arrow_right" })
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-6fc51437", esExports)
  }
}

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scrollbar__ = __webpack_require__(198);


__WEBPACK_IMPORTED_MODULE_0__Scrollbar__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__Scrollbar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__Scrollbar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Scrollbar__["a" /* default */]);

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Scrollbar_vue__ = __webpack_require__(108);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Scrollbar_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/scrollbar/Scrollbar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c4702bd8", Component.options)
  } else {
    hotAPI.reload("data-v-c4702bd8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ScrollbarY_vue__ = __webpack_require__(109);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1d729675_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ScrollbarY_vue__ = __webpack_require__(200);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ScrollbarY_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1d729675_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ScrollbarY_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/scrollbar/ScrollbarY.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d729675", Component.options)
  } else {
    hotAPI.reload("data-v-1d729675", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      staticClass: "k-scrollbar__y",
      on: {
        click: function($event) {
          $event.stopPropagation()
          $event.preventDefault()
        }
      }
    },
    [
      _c("div", {
        ref: "track",
        staticClass: "k-scrollbar__ytrack",
        style: _vm.trackStyle,
        on: {
          click: function($event) {
            $event.stopPropagation()
            $event.preventDefault()
            return _vm.onJump($event)
          }
        }
      }),
      _vm._v(" "),
      _c("div", {
        staticClass: "k-scrollbar__ythumb",
        class: { "k-scrollbar-transition": !_vm.dragging },
        style: _vm.thumb_styl,
        on: {
          mousedown: function($event) {
            $event.stopPropagation()
            $event.preventDefault()
            return _vm.onDown($event)
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-1d729675", esExports)
  }
}

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ScrollbarX_vue__ = __webpack_require__(110);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1d647ef4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ScrollbarX_vue__ = __webpack_require__(202);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ScrollbarX_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1d647ef4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ScrollbarX_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/packages/scrollbar/ScrollbarX.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d647ef4", Component.options)
  } else {
    hotAPI.reload("data-v-1d647ef4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      staticClass: "k-scrollbar__x"
    },
    [
      _c("div", {
        ref: "track",
        staticClass: "k-scrollbar__xtrack",
        style: _vm.trackStyle,
        on: {
          click: function($event) {
            $event.stopPropagation()
            $event.preventDefault()
            return _vm.onJump($event)
          }
        }
      }),
      _vm._v(" "),
      _c("div", {
        staticClass: "k-scrollbar__xthumb",
        class: { "k-scrollbar-transition": !_vm.dragging },
        style: _vm.thumb_styl,
        on: {
          mousedown: function($event) {
            $event.stopPropagation()
            $event.preventDefault()
            return _vm.onDown($event)
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-1d647ef4", esExports)
  }
}

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transition_js__ = __webpack_require__(204);

__WEBPACK_IMPORTED_MODULE_0__transition_js__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__transition_js__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__transition_js__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__transition_js__["a" /* default */]);

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__ = __webpack_require__(5);






var Transition = function () {
  function Transition(duration, timingFunction) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Transition);

    this.duration = duration;
    this.timingFunction = timingFunction;
    this.offsetHeight = 0;
    this.height = 0;
    this.paddingTop = 0;
    this.paddingBottom = 0;
    this.marginTop = 0;
    this.marginBottom = 0;
    this.borderTopWidth = 0;
    this.borderBottomWidth = 0;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Transition, [{
    key: 'isAppear',
    value: function isAppear(el) {
      var t = null;
      return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (res) {

        t = setInterval(function () {
          if (document.body.contains(el)) {
            clearInterval(t);
            res();
          }
        }, 8);
      });
    }
  }, {
    key: 'setProperty',
    value: function setProperty(el) {
      this.height = Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'height');
      this.paddingTop = Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'paddingTop');
      this.paddingBottom = Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'paddingBottom');
      this.marginBottom = Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'marginBottom');
      this.marginTop = Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'marginTop');
      this.borderTopWidth = Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'borderTopWidth');
      this.borderBottomWidth = Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'borderBottomWidth');
    }
  }, {
    key: 'beforeEnter',
    value: function beforeEnter(el) {
      if (document.body.contains(el)) {
        var pnode = el.parentNode;
        pnode.dataset.oldHeight = Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["b" /* getStyle */])(pnode, 'height');
        pnode.dataset.oldOverflow = Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["b" /* getStyle */])(pnode, 'overflow');
        Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["e" /* setStyle */])(pnode, {
          height: pnode.dataset.oldHeight,
          overflow: 'hidden'
        });
        Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["e" /* setStyle */])(el, {
          display: 'block',
          visibility: 'hidden'
        });
        this.setProperty(el);
        Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["e" /* setStyle */])(el, {
          display: 'none',
          visibility: 'visible',
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0

        });
        pnode.removeAttribute('style');
      } else {
        var wrapper = document.createElement('div');
        wrapper.style.cssText = 'height:0;overflow:hidden;';
        wrapper.appendChild(el);
        document.body.appendChild(wrapper);
        // this.offsetHeight = el.offsetHeight
        this.setProperty(el);
        document.body.removeChild(wrapper);
        Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["e" /* setStyle */])(el, {
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0
        });
      }
    }
  }, {
    key: 'enter',
    value: function enter(el, done) {
      var _this = this;

      this.isAppear(el).then(function () {
        Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["e" /* setStyle */])(el, {
          height: _this.height,
          opacity: 1,
          paddingTop: _this.paddingTop,
          paddingBottom: _this.paddingBottom,
          marginTop: _this.marginTop,
          marginBottom: _this.marginBottom,
          borderBottomWidth: _this.borderBottomWidth,
          borderTopWidth: _this.borderTopWidth,
          transition: _this.duration + 'ms ' + _this.timingFunction
        });
      });
    }
  }, {
    key: 'leave',
    value: function leave(el, done) {
      Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["e" /* setStyle */])(el, {
        height: 0,
        opacity: 0,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: 0,
        marginBottom: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0
      });
    }
  }, {
    key: 'afterLeave',
    value: function afterLeave(el) {
      el.removeAttribute('style');
      Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom_js__["e" /* setStyle */])(el, {
        display: 'none'
      });
    }
  }]);

  return Transition;
}();
//TODO: dom元素会插入v-enter v-enter-to等class，应如何更好的去除？
//TODO: 下拉时，有时会没有过渡效果！


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'KTransition',
  functional: true,
  props: {
    duration: {
      type: [Number, String],
      default: 350
    },
    timingFunction: {
      type: String,
      default: 'ease'
    }
  },
  render: function render(h, ctx) {
    var handlers = new Transition(ctx.props.duration, ctx.props.timingFunction);
    var children = ctx.children;
    return h(
      'transition',
      __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
        attrs: {
          // duration = {{
          //   enter:ctx.props.duration,
          //   leave:ctx.props.duration
          // }}
          enterClass: '',
          enterToClass: '',
          enterActiveClass: '',
          leaveClass: '',
          leaveToClass: '',
          leaveActiveClass: ''
        }
      }, {
        on: {
          'beforeEnter': function beforeEnter($event) {
            for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              attrs[_key - 1] = arguments[_key];
            }

            handlers.beforeEnter.apply(handlers, [$event].concat(attrs));
          },
          'enter': function enter($event) {
            for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              attrs[_key2 - 1] = arguments[_key2];
            }

            handlers.enter.apply(handlers, [$event].concat(attrs));
          },
          'leave': function leave($event) {
            for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              attrs[_key3 - 1] = arguments[_key3];
            }

            handlers.leave.apply(handlers, [$event].concat(attrs));
          },
          'afterLeave': function afterLeave($event) {
            for (var _len4 = arguments.length, attrs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
              attrs[_key4 - 1] = arguments[_key4];
            }

            handlers.afterLeave.apply(handlers, [$event].concat(attrs));
          }
        }
      }]),
      [children]
    );
  }
});

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__table__ = __webpack_require__(206);

__WEBPACK_IMPORTED_MODULE_0__table__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__table__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__table__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__table__["a" /* default */]);

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_props__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins___ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tableHead__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tableBody__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__tableFoot__ = __webpack_require__(225);











/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_7__mixins___["a" /* default */]],
  components: {
    KTableHead: __WEBPACK_IMPORTED_MODULE_8__tableHead__["a" /* default */],
    KTableBody: __WEBPACK_IMPORTED_MODULE_9__tableBody__["a" /* default */],
    KTableFoot: __WEBPACK_IMPORTED_MODULE_10__tableFoot__["a" /* default */]
  },
  name: "KTable",
  props: __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__util_props__["a" /* props */]),
  model: {
    prop: 'currentValue',
    event: 'currentValueChange'
  },
  data: function data() {
    return {
      currentScrollTarget: null,
      timeout: null,
      headHeight: "",
      footHeight: "",
      showBaseLine: false,
      currentResizeTd: null //当前要调整列宽的单元格
    };
  },

  provide: {
    __index: "@_index",
    __checkbox: "@_checkbox",
    __radio: "@_radio"
  },
  computed: {
    leftWrapperClasses: function leftWrapperClasses() {
      var fixedLeft = this.hasFixedColumns.fixedLeft;

      return {
        "k-table-wrapper": true,
        "k-table-wrapper--fixed_left": fixedLeft
      };
    },
    rightWrapperClasses: function rightWrapperClasses() {
      var fixedRight = this.hasFixedColumns.fixedRight;

      return {
        "k-table-wrapper": true,
        "k-table-wrapper--fixed_right": fixedRight
      };
    },
    tableClass: function tableClass() {
      var _ref;

      return _ref = {
        "k-table": true,
        "k-table--bordered": this.bordered
      }, __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--" + this.size, true), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--stripe", this.stripe), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--auto", this.tableLayoutAuto), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--nowrap", this.nowrap), _ref;
    },
    cellWidth: function cellWidth() {
      var size = {
        mini: "28",
        small: "30",
        medium: "33",
        big: "36",
        large: "40",
        huge: "46"
      };
      return size[this.size];
    }
    // tableBodyProps() {
    //   return {
    //     props: {
    //       ...this.$props,
    //       bodyScopedSlots: this.$scopedSlots
    //     },
    //     style: {
    //       height: this.height
    //     },
    //     on: {
    //       'select-change':'emitSelectChange',
    //       bodyscroll:'bodyScroll',
    //       trmouseover: 'trMouseover',
    //       trmouseout:'trMouseout'
    //     }
    //   }
    // }

  },
  methods: {
    getTableProps: function getTableProps() {
      var tableClass = this.tableClass,
          $attrs = this.$attrs,
          $listeners = this.$listeners;

      return {
        class: tableClass,
        attrs: __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, $attrs),
        on: __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, $listeners)
      };
    },
    toggleCheckedAll: function toggleCheckedAll(b) {
      var _$refs = this.$refs,
          leftTbodyWrapper = _$refs.leftTbodyWrapper,
          mainTbodyWrapper = _$refs.mainTbodyWrapper,
          rightTbodyWrapper = _$refs.rightTbodyWrapper;

      leftTbodyWrapper && leftTbodyWrapper.onCheckedAll(b);
      mainTbodyWrapper && mainTbodyWrapper.onCheckedAll(b);
      rightTbodyWrapper && rightTbodyWrapper.onCheckedAll(b);
    },
    emitSelectChange: function emitSelectChange(e) {
      //{checked,rows,row,index}
      this.$refs.theadWrapper.onCheckedAll(e.rows.length === this.$props.data.length);
      this.$emit("select-change", JSON.parse(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(e)));
    },
    emitRadioChange: function emitRadioChange(e) {
      //{radioKey的值value，row,index}
      this.$emit('currentValueChange', e.value);
      //向组件外发射
      this.$emit('radio-change', e);
    },

    //对columns数据进行加工后再使用
    machiningColumns: function machiningColumns() {
      // let columns = this.columns
      var columns = this.headAndBodyColumns.bodyColumns;
      var headColumns = this.headAndBodyColumns.headColumns;
      var cellWidth = this.cellWidth;
      var fixedLeft = this.hasFixedColumns.fixedLeft;
      //如果存在固定左侧列的情况，则index和checkbox或者radio列，默认也要固定
      //如果存在固定右侧列的情况，则index和checkbox或者radio不需要固定

      var obj = {
        style: { width: cellWidth }
      };
      if (fixedLeft) {
        obj.fixed = "left";
      }
      //处理复选或者单选
      if (this.hasCheckbox) {
        columns = [__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, obj, { field: "@_checkbox" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(columns));
        headColumns = [__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, obj, { field: "@_checkbox" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(headColumns));
      } else if (this.hasRadio) {
        columns = [__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, obj, { field: "@_radio" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(columns));
        headColumns = [__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, obj, { field: "@_radio" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(headColumns));
      }
      //处理有序号的情况
      if (this.hasIndex) {
        columns = [__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, obj, { field: "@_index" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(columns));
        headColumns = [__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, obj, { field: "@_index" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(headColumns));
      }
      return { columns: columns, headColumns: headColumns };
    },

    //获取滚动条的宽度
    //TODO: 可以优化，不必要每次都计算
    getScrollBarWidth: function getScrollBarWidth(el) {
      // 刚开始是获取的el的滚动条宽度
      // 此时存在一个问题：如果width是fit-content时，滚动条宽度为0！
      // 所以还是直接采用创建节点来计算滚动条宽度的方法
      // console.log(el)
      var oldOverflowY = Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(el, "overflowY");
      el.style.overflowY = "hidden";
      var w = el.clientWidth;
      el.style.overflowY = oldOverflowY;
      var wScroll = el.clientWidth;
      return w - wScroll;
      // const div = document.createElement('div')
      // div.style.cssText = `
      //   width:100px;
      //   height:100px;
      //   position:absolute;
      //   top:-9999px;
      // `
      // document.body.appendChild(div)
      // const w = div.clientWidth
      // div.style.overflowY = 'scroll'
      // const wScroll = div.clientWidth
      // document.body.removeChild(div)
      // return w - wScroll
    },

    //如果出现了纵向滚动条，
    //在table-layout:fixed和width:100%的情况下，
    //thead的列宽和tbody的列宽对不上,
    //此时需要给thead外层的div一个padding-right:滚动条宽度
    //才能对齐
    justifyColumns: function justifyColumns() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.height || _this.maxHeight) {
          var mainTable = _this.$refs.mainTable,
              body = mainTable.querySelector(".k-table-body"),
              head = mainTable.querySelector(".k-table-head"),
              foot = mainTable.querySelector(".k-table-foot"),
              scrollbarWidth = _this.getScrollBarWidth(body),
              leftTable = _this.$refs.leftTable,
              rightTable = _this.$refs.rightTable;
          head && (head.style.paddingRight = scrollbarWidth + "px");
          foot && (foot.style.paddingRight = scrollbarWidth + "px");

          if (leftTable) {
            leftTable.querySelector(".k-table-head").style.paddingRight = scrollbarWidth + "px";
          }
          if (rightTable) {
            rightTable.querySelector(".k-table-head").style.paddingRight = scrollbarWidth + "px";
          }
        }
      });
    },

    //当有固定列时，需要根据主体表格宽度动态计算那些固定的总列宽
    calcColumnsWidth: function calcColumnsWidth() {
      var _this2 = this;

      this.$nextTick(function () {
        var _$refs2 = _this2.$refs,
            leftTable = _$refs2.leftTable,
            rightTable = _$refs2.rightTable,
            mainTable = _$refs2.mainTable,
            _hasFixedColumns = _this2.hasFixedColumns,
            fixedLeft = _hasFixedColumns.fixedLeft,
            fixedRight = _hasFixedColumns.fixedRight;


        if (leftTable || rightTable) {
          //获取主体表格的table实际宽度，以便在窗口大小变化时动态赋给left和right表格的table元素
          var mainTableEl = mainTable.querySelector("table");
          var w = Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(mainTableEl, "width");
          // console.log(mw)
          // console.log(leftTable.querySelectorAll('table'))
          if (leftTable) {
            var tables = leftTable.querySelectorAll("table"),
                th = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(mainTable.querySelectorAll("thead th"))).slice(0, fixedLeft);
            !_this2.minContent && tables.forEach(function (table) {
              table.style.width = w;
            });
            var thWidth = 0;
            th.forEach(function (el) {
              thWidth += parseFloat(Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(el, "width"));
            });
            leftTable.style.width = thWidth + "px";
            leftTable.style.overflow = "hidden";
          }
          if (rightTable) {
            //NOTE: 右固定表格，在props的width为100%时是不需要做定位处理的
            //因为此时的右固定表格，一直处于右侧，且主表格宽度是100%的
            //所以不存在位置上的差异
            //但在width:fit-content时，是需要做特殊的处理的，因为此时的宽度
            //不随窗口大小变化，如果窗口过宽，就会出现表格占不满容器，
            //而右固定表格位于最右侧，就出现了覆盖不了主表格的情况
            var _tables = rightTable.querySelectorAll("table"),
                _th = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(mainTable.querySelectorAll("thead th"))).reverse().slice(0, fixedRight);
            !_this2.minContent && _tables.forEach(function (table) {
              table.style.width = w;
            });
            var mainWrapperWidth = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(mainTable, "width"));
            var mainTBodyWrapperWidth = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(mainTable.querySelector(".k-table-body"), "width"));
            var right = mainWrapperWidth - mainTBodyWrapperWidth;
            right = right < 0 ? 0 : right;
            rightTable.style.right = right + "px";

            var rightTableBodyWidth = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(rightTable.querySelector(".k-table-body"), "width"));
            var rightTableWidth = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(rightTable.querySelector(".k-table-body table"), "width"));
            var barWidth = rightTableBodyWidth - rightTableWidth;
            var _thWidth = 0;
            _th.forEach(function (el) {
              _thWidth += parseFloat(Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(el, "width"));
            });
            rightTable.style.width = _thWidth + barWidth + "px";
            // th[0].scrollIntoView()
            rightTable.scrollTo(99999, 0);
            rightTable.style.overflowX = "hidden";
            // let thWidth = 0,
            //   barWidth = this.getScrollBarWidth(
            //     rightTable.querySelector('.k-table-body'),
            //   )
            // th.forEach(el => {
            //   thWidth += parseFloat(getStyle(el, 'width'))
            // })
            // rightTable.style.width = thWidth + barWidth + 'px'
            // rightTable.scrollTo(99999, 0)
            // rightTable.style.overflowX = 'hidden'
            // if (this.width.toLowerCase() === 'fit-content') {
            //   rightTable.style.right = 'auto'
            //   let left = mainTable.clientWidth - thWidth - barWidth
            //   const maxLeft = parseFloat(w) - thWidth
            //   left = left > maxLeft ? maxLeft : left
            //   rightTable.style.left = left + 'px'
            // }
          }
        }
      });
    },
    mainTableScroll: function mainTableScroll() {
      var _$refs3 = this.$refs,
          mainTable = _$refs3.mainTable,
          leftTable = _$refs3.leftTable,
          rightTable = _$refs3.rightTable,
          scrollLeft = mainTable.scrollLeft,
          clsLeft = "k-table-wrapper--fixed_left_shadow",
          clsRight = "k-table-wrapper--fixed_right_shadow";


      if (leftTable) {
        if (scrollLeft > 0) {
          leftTable.classList.add(clsLeft);
        } else {
          leftTable.classList.remove(clsLeft);
        }
      }
      if (rightTable) {
        var mainScrollWidth = mainTable.scrollWidth,
            mainClientWidth = mainTable.clientWidth;
        if (mainTable.scrollLeft >= mainScrollWidth - mainClientWidth) {
          rightTable.classList.remove(clsRight);
        } else {
          rightTable.classList.add(clsRight);
        }
      }
    },
    bodyScroll: function bodyScroll(_ref2) {
      var _this3 = this;

      var top = _ref2.top,
          left = _ref2.left,
          target = _ref2.target;

      //NOTE: 主体表格滚动的时候，左右表格也滚动
      //左右表格滚动的时候，主体表格也要滚动，
      //此时就造成了一个循环，并且scrollTop给表格自己赋值时，
      //会导致滚动的距离非常短
      //所以用了一个50ms的延迟，
      //当鼠标滚轮滚动时，如果当前target是滚动对象
      //就忽略自身，只有当不是自身时，才赋值scrollTop
      //当用户切换表格并滚动的速度小于50ms时，此做法就会有问题，
      //好在用户的操作不会那么快，所以也能解决问题
      //有其他的办法吗？
      //h5端什么表现？
      clearTimeout(this.timeout);
      if (this.currentScrollTarget === null) {
        this.currentScrollTarget = target;
      }
      var _$refs4 = this.$refs,
          leftTable = _$refs4.leftTable,
          rightTable = _$refs4.rightTable,
          mainTable = _$refs4.mainTable;

      var leftTableBody = void 0,
          rightTableBody = void 0,
          mainTableBody = void 0;
      if (leftTable) {
        leftTableBody = leftTable.querySelector(".k-table-body");
        if (this.currentScrollTarget !== leftTableBody) {
          leftTableBody.scrollTop = top;
        }
      }
      if (rightTable) {
        rightTableBody = rightTable.querySelector(".k-table-body");
        if (this.currentScrollTarget !== rightTableBody) {
          rightTableBody.scrollTop = top;
        }
      }
      mainTableBody = mainTable.querySelector(".k-table-body");
      if (this.currentScrollTarget !== mainTableBody) {
        mainTableBody.scrollTop = top;
      }
      this.timeout = setTimeout(function () {
        _this3.currentScrollTarget = null;
      }, 50);
    },
    trMouseover: function trMouseover(row, index) {
      var _$refs5 = this.$refs,
          leftTable = _$refs5.leftTable,
          mainTable = _$refs5.mainTable,
          rightTable = _$refs5.rightTable;

      this.hoverTr(mainTable, index);
      this.hoverTr(leftTable, index);
      this.hoverTr(rightTable, index);
    },
    trMouseout: function trMouseout(row, index) {
      var _$refs6 = this.$refs,
          leftTable = _$refs6.leftTable,
          mainTable = _$refs6.mainTable,
          rightTable = _$refs6.rightTable;

      this.hoverTr(mainTable, index, false);
      this.hoverTr(leftTable, index, false);
      this.hoverTr(rightTable, index, false);
    },
    hoverTr: function hoverTr(table, index) {
      var isIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (table) {
        var tr = table.querySelectorAll(".k-table-body table tbody tr");
        tr[index].classList[isIn ? "add" : "remove"]("k-table-tr-hover");
      }
    },

    //e是事件对象，el是当前要调整宽度的单元格，index是第几个单元格
    handleResizeDown: function handleResizeDown(e, el, index) {
      this.currentResizeTd = el;
      document.addEventListener('mousemove', this.handleResizeMove);
      document.addEventListener('mouseup', this.handleResizeUp);

      var tdOldWidth = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(el, 'width'));
      var totalHeight = Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["b" /* getStyle */])(this.$refs.mainTable, 'height');
      var baseLine = this.$refs.baseLine;
      var left = Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["c" /* offset */])(el, this.$el).left + tdOldWidth;
      baseLine.style.height = totalHeight;
      baseLine.style.left = left + 'px';
      this.currentResizeTd.startX = e.clientX;
      this.currentResizeTd.tdOldWidth = tdOldWidth;
      this.currentResizeTd.baseLineLeft = left;
      this.currentResizeTd.colIndex = index;
      this.showBaseLine = true;
    },
    handleResizeMove: function handleResizeMove(e) {
      var el = this.currentResizeTd;
      var dx = e.clientX - el.startX;
      this.$refs.baseLine.style.left = el.baseLineLeft + dx + 'px';
    },
    handleResizeUp: function handleResizeUp(e) {
      var _$refs7 = this.$refs,
          mainTable = _$refs7.mainTable,
          leftTable = _$refs7.leftTable,
          rightTable = _$refs7.rightTable;

      this.resizeColumnWidth(mainTable, e);
      leftTable && this.resizeColumnWidth(leftTable, e);
      rightTable && this.resizeColumnWidth(rightTable, e);

      this.showBaseLine = false;
      this.currentResizeTd = null;
      document.removeEventListener('mousemove', this.handleResizeMove);
      document.removeEventListener('mouseup', this.handleResizeUp);
    },
    resizeColumnWidth: function resizeColumnWidth(t, e) {
      var _currentResizeTd = this.currentResizeTd,
          colIndex = _currentResizeTd.colIndex,
          startX = _currentResizeTd.startX,
          tdOldWidth = _currentResizeTd.tdOldWidth;

      if (t) {
        var head = t.querySelector('.k-table-head'),
            body = t.querySelector('.k-table-body'),
            foot = t.querySelector('.k-table-foot'),
            resize = function resize(el) {
          if (el) {
            var cols = el.querySelectorAll('col');
            if (cols) {
              cols[+colIndex].style.width = tdOldWidth + e.clientX - startX + 'px';
            }
          }
        };
        head && resize(head);
        body && resize(body);
        foot && resize(foot);
      }
    },

    //调整列宽时，显示出来一个基准线
    rBaseLine: function rBaseLine() {
      var h = this.$createElement;

      if (this.resizeWidth) {
        var p = {
          class: {
            'k-table-base-line': true
          },
          ref: 'baseLine',
          directives: [{
            name: 'show',
            value: this.showBaseLine
          }]
        };
        return h("div", p);
      }
    }
  },
  mounted: function mounted() {
    this.justifyColumns();
    this.calcColumnsWidth();
    this.mainTableScroll();
    window.addEventListener("resize", this.justifyColumns);
    window.addEventListener("resize", this.calcColumnsWidth);
    window.addEventListener("resize", this.mainTableScroll);
  },
  updated: function updated() {
    this.justifyColumns();
    this.calcColumnsWidth();
    this.mainTableScroll();
  },
  destroyed: function destroyed() {
    window.removeEventListener("resize", this.justifyColumns);
    window.removeEventListener("resize", this.calcColumnsWidth);
    window.removeEventListener("resize", this.mainTableScroll);
  },
  render: function render() {
    var _this4 = this;

    var h = arguments[0];
    var _hasFixedColumns2 = this.hasFixedColumns,
        fixedLeft = _hasFixedColumns2.fixedLeft,
        fixedRight = _hasFixedColumns2.fixedRight;

    var _machiningColumns = this.machiningColumns(),
        columns = _machiningColumns.columns,
        headColumns = _machiningColumns.headColumns;

    var props = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, this.$props, { columns: columns });
    var heightStyle = {};
    if (this.height) {
      heightStyle.height = "calc(" + this.height + " - " + (this.headHeight || 0) + " - " + (this.footHeight || 0) + ")";
    } else if (this.maxHeight) {
      heightStyle.maxHeight = "calc(" + this.maxHeight + " - " + (this.headHeight || 0) + " - " + (this.footHeight || 0) + ")";
    }
    var tableBodyProps = {
      props: __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, props, {
        bodyScopedSlots: this.$scopedSlots
      }),
      style: __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, heightStyle),
      on: {
        "select-change": this.emitSelectChange,
        'toggle-radio-row': this.emitRadioChange,
        bodyscroll: this.bodyScroll,
        //TODO: 由于是js控制的hover后背景变色，如果有合并行的情况，会有不准确的问题。待修正
        trmouseover: this.trMouseover,
        trmouseout: this.trMouseout
      }

      //table的thead
    };var thead = h("k-table-head", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{ props: props }, {
      attrs: {
        "head-columns": headColumns
      },
      ref: "theadWrapper"
    }, {
      on: {
        "handleResizeDown": function handleResizeDown($event) {
          for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            attrs[_key - 1] = arguments[_key];
          }

          _this4.handleResizeDown.apply(_this4, [$event].concat(attrs));
        },
        "togglechecked": function togglechecked($event) {
          for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            attrs[_key2 - 1] = arguments[_key2];
          }

          _this4.toggleCheckedAll.apply(_this4, [$event].concat(attrs));
        },
        "head-mounted": function headMounted($event) {
          for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            attrs[_key3 - 1] = arguments[_key3];
          }

          (function (headHeight) {
            _this4.headHeight = headHeight;
          }).apply(undefined, [$event].concat(attrs));
        }
      }
    }]));
    //table的tfoot
    var tfoot = h("k-table-foot", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{ props: props }, {
      on: {
        "foot-mounted": function footMounted($event) {
          for (var _len4 = arguments.length, attrs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            attrs[_key4 - 1] = arguments[_key4];
          }

          (function (footHeight) {
            _this4.footHeight = footHeight;
          }).apply(undefined, [$event].concat(attrs));
        }
      }
    }]));
    // console.log(columns)
    //主表格
    var mainTable = h(
      "div",
      __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
        "class": "k-table-wrapper",
        ref: "mainTable"
      }, {
        on: {
          "scroll": function scroll($event) {
            for (var _len5 = arguments.length, attrs = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
              attrs[_key5 - 1] = arguments[_key5];
            }

            _this4.mainTableScroll.apply(_this4, [$event].concat(attrs));
          }
        }
      }]),
      [thead, h("k-table-body", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([tableBodyProps, { ref: "mainTbodyWrapper", attrs: { who: "main" }
      }])), tfoot]
    );
    //固定列时，复制出来的另一个左固定表格
    var fixedLeftTable = null;
    if (fixedLeft) {
      fixedLeftTable = h(
        "div",
        { "class": this.leftWrapperClasses, ref: "leftTable" },
        [thead, h("k-table-body", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([tableBodyProps, { ref: "leftTbodyWrapper", attrs: { who: "left" }
        }])), tfoot]
      );
    }
    //右侧固定列时，复制出右固定表格
    var fixedRightTable = null;
    if (fixedRight) {
      fixedRightTable = h(
        "div",
        { "class": this.rightWrapperClasses, ref: "rightTable" },
        [thead, h("k-table-body", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([tableBodyProps, {
          ref: "rightTbodyWrapper",
          attrs: { who: "right"
          }
        }])), tfoot]
      );
    }
    return h(
      "div",
      { "class": {
          "k-table-outer": true,
          'k-no-select': this.showBaseLine && this.resizeWidth
        } },
      [mainTable, fixedLeftTable, fixedRightTable, this.rBaseLine()]
    );
  }
});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(3);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_props__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__colGroup__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tableCell__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_checkbox_checkbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_karma_ui_packages_radio_radio__ = __webpack_require__(55);










/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    KColGroup: __WEBPACK_IMPORTED_MODULE_6__colGroup__["a" /* default */],
    KCell: __WEBPACK_IMPORTED_MODULE_7__tableCell__["a" /* default */],
    KCheckbox: __WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_checkbox_checkbox__["a" /* default */],
    KRadio: __WEBPACK_IMPORTED_MODULE_9_karma_ui_packages_radio_radio__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_5__util_props__["a" /* props */], {
    headColumns: Array
  }),
  data: function data() {
    return {
      isCheckedAll: false
    };
  },

  inject: ["__index", "__checkbox", "__radio"],
  computed: {
    headWrapperClasses: function headWrapperClasses() {
      return {
        "k-table-head": true
      };
    },
    headClasses: function headClasses() {
      var _ref;

      return _ref = {
        "k-table": true,
        "k-table--bordered": this.bordered
      }, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--" + this.size, true), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--nowrap", this.nowrap), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--min-content", this.minContent), _ref;
    }
  },
  methods: {
    //父组件调用，改变复选框状态
    onCheckedAll: function onCheckedAll(b) {
      this.isCheckedAll = b;
    },
    toggleCheckedAll: function toggleCheckedAll(e) {
      this.$emit("togglechecked", e.target.checked);
    },
    getRowspan: function getRowspan(obj, max) {
      if (obj.children && obj.children.length !== 0) {
        return 1;
      }
      return max - obj.__level;
    },
    getColspan: function getColspan(obj) {
      var arr = [],
          fn = function fn(obj) {
        if (obj.children && obj.children.length) {
          obj.children.forEach(function (c) {
            fn(c);
          });
        } else {
          arr.push(obj);
        }
      };
      fn(obj);
      return arr.length || 1;
    },
    renderTableHead: function renderTableHead() {
      var _this = this;

      var h = this.$createElement;

      var columns = JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(this.headColumns));
      //记录总共行数
      var maxRowLength = 0;
      //记录单元格序列号
      var __index = 0;
      //标记每一行数据
      /**
       * addIndex，给每列添加一个index，对应col的序列
       * 
       */
      var addIndex = function addIndex(col, colChildren) {
        if (colChildren.children && colChildren.children.length) {
          col.__index = col.__index + colChildren.children.length - 1;
          colChildren.children.forEach(function (c) {
            addIndex(col, c);
          });
        }
      };
      //addLevel标记上层级，方便合并行和列
      var addLevel = function addLevel(cols, i) {
        cols.forEach(function (col) {
          //__level代表了第几行tr
          col.__index = __index++;
          col.__level = i;
          if (maxRowLength < i) {
            maxRowLength = i;
          }
          if (col.children && col.children.length) {
            // col.__index = col.__index + col.children.length - 1
            addIndex(col, col);
            __index--;
            addLevel(col.children, col.__level + 1);
          }
        });
      };
      //给数据添加行编号，方便后续循环时将单元格插入对应的行
      addLevel(columns, 0);
      //由于行号时从0开始的，所以要加1
      maxRowLength += 1;
      //预先创建好所有的行
      var trs = Array.apply(null, { length: maxRowLength }).map(function () {
        return [];
      });

      var renderTd = function renderTd(columns) {
        columns.forEach(function (col, i, arr) {
          var content = col.name || col.field;
          if (_this.hasIndex && _this.indexText && col.field === _this.__index) {
            content = _this.indexText;
          }
          if (_this.hasCheckbox && col.field === _this.__checkbox) {
            content = h("k-checkbox", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
              attrs: {
                checked: _this.isCheckedAll
              }
            }, {
              on: {
                "change": function change($event) {
                  for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    attrs[_key - 1] = arguments[_key];
                  }

                  _this.toggleCheckedAll.apply(_this, [$event].concat(attrs));
                }
              }
            }]));
          } else if (_this.hasRadio && col.field === _this.__radio) {
            content = "";
          }
          var colspan = _this.getColspan(col);
          var rowspan = _this.getRowspan(col, maxRowLength);
          var cellProps = {
            props: {
              colspan: colspan,
              rowspan: rowspan,
              resizeWidth: _this.resizeWidth,
              tag: "th"
            },
            class: {
              "k-table-td-center": colspan > 1
            },
            on: {
              handleResizeDown: function handleResizeDown(e, el) {
                if (col.children && col.children.length) {
                  console.log(col);
                  return;
                }
                _this.$emit("handleResizeDown", e, el, col.__index);
              }
            }
            //如果有children，说明有列合并
          };trs[col.__level].push(h(
            "k-cell",
            cellProps,
            [content]
          ));
          if (col.children && col.children.length) {
            renderTd(col.children);
          }
        });
      };

      renderTd(columns);

      return trs.map(function (tr) {
        return h("tr", [tr]);
      });
    }
  },
  render: function render() {
    var h = arguments[0];

    return h(
      "div",
      { "class": this.headWrapperClasses },
      [h(
        "table",
        { "class": this.headClasses },
        [h("k-col-group", {
          attrs: { columns: this.columns }
        }), h("thead", [this.renderTableHead()])]
      )]
    );
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.$emit("head-mounted", Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_dom__["b" /* getStyle */])(_this2.$el, "height"));
    });
  }
});

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_props__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins___ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__colGroup__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__tableCell__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_checkbox_checkbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_radio_radio__ = __webpack_require__(55);













/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_8__mixins___["a" /* default */]],
  components: {
    KColGroup: __WEBPACK_IMPORTED_MODULE_9__colGroup__["a" /* default */],
    KCell: __WEBPACK_IMPORTED_MODULE_10__tableCell__["a" /* default */],
    KCheckbox: __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_checkbox_checkbox__["a" /* default */],
    KRadio: __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_radio_radio__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__util_props__["a" /* props */], {
    bodyScopedSlots: Object, //接收来自KTable的插槽内容$scopedSlots
    //主体表格main、左固定表格left、右固定表格right
    //根据不同表格，有选择的渲染某些数据：复选和单选
    who: {
      type: String,
      default: "main"
    }
  }),
  inject: ["__index", "__checkbox", "__radio"],
  data: function data() {
    return {
      checkedKeys: [], //保存复选的所有key
      checkedRows: [], //保存复选的所有行数据
      currentRadioValue: ''
    };
  },

  computed: {
    bodyWrapperClasses: function bodyWrapperClasses() {
      return {
        "k-table-body": true
      };
    },
    tableClasses: function tableClasses() {
      var _ref;

      return _ref = {
        "k-table": true,
        "k-table--bordered": this.bordered
      }, __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--" + this.size, true), __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--stripe", this.stripe), __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--nowrap", this.nowrap), __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--min-content", this.minContent), _ref;
    },
    tableStyles: function tableStyles() {
      return {
        width: this.width
      };
    },
    trProps: function trProps() {
      return {
        on: {
          mouseover: function mouseover(e) {
            console.log(e.target);
          },
          mouseout: function mouseout() {}
        }
      };
    }
  },
  watch: {
    currentValue: {
      immediate: true,
      handler: function handler(v) {
        this.currentRadioValue = v;
      }
    }
  },
  methods: {
    onCheckedAll: function onCheckedAll(checked) {
      var _this = this;

      //当不选择时，不可以将checkedKeys直接清空，因为可能存在跨页选择的数据
      //checkedRows同上
      var set = new __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set___default.a(this.checkedKeys);
      if (checked) {
        this.data.forEach(function (row) {
          var k = _this.formatCheckedKey(row);
          set.add(k);
          var has = false;
          for (var i = 0, len = _this.checkedRows.length; i < len; i++) {
            if (k === _this.formatCheckedKey(_this.checkedRows[i])) {
              has = true;
              break;
            }
          }
          if (!has) {
            _this.checkedRows.push(JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(row)));
          }
        });
      } else {
        this.data.forEach(function (row) {
          var k = _this.formatCheckedKey(row);
          set.delete(k);
          var j = -1;
          for (var i = 0, len = _this.checkedRows.length; i < len; i++) {
            if (k === _this.formatCheckedKey(_this.checkedRows[i])) {
              j = i;
              break;
            }
          }
          if (j > -1) {
            _this.checkedRows.splice(j, 1);
          }
        });
      }
      this.checkedKeys = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(set));
      this.emitSelectChange();
      //NOTE: 如果出现选不中的情况，需检查传入的checkboxKey是否有问题
    },
    emitSelectChange: function emitSelectChange(checked, row, index) {
      var _hasFixedColumns = this.hasFixedColumns,
          fixedLeft = _hasFixedColumns.fixedLeft,
          fixedRight = _hasFixedColumns.fixedRight,
          rows = JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(this.checkedRows)),
          para = { checked: checked, index: index, row: row, rows: rows };

      if (fixedLeft && this.hasCheckbox && this.who === "left") {
        this.$emit("select-change", para);
      } else if (!fixedLeft && this.hasCheckbox && this.who === "main") {
        this.$emit("select-change", para);
      }
    },


    //复选，单行
    toggleRow: function toggleRow(e, row, index) {
      var k = this.formatCheckedKey(row);
      var set = new __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set___default.a(this.checkedKeys);
      if (e.target.checked) {
        set.add(k);
        var has = false;
        for (var i = 0, len = this.checkedRows.length; i < len; i++) {
          if (k === this.formatCheckedKey(this.checkedRows[i])) {
            has = true;
            break;
          }
        }
        if (!has) {
          this.checkedRows.push(JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(row)));
        }
      } else {
        set.delete(k);
        var j = -1;
        for (var _i = 0, _len = this.checkedRows.length; _i < _len; _i++) {
          if (k === this.formatCheckedKey(this.checkedRows[_i])) {
            j = _i;
            break;
          }
        }
        if (j > -1) {
          this.checkedRows.splice(j, 1);
        }
      }
      this.checkedKeys = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(set));
      this.emitSelectChange(e.target.checked, row, index);
    },

    //格式化checkboxKey/radioKey
    formatCheckedKey: function formatCheckedKey(row) {
      var keys = [];
      var result = [];
      if (this.checkboxKey && this.hasCheckbox) {

        keys = this.checkboxKey.trim().split(",");
      } else if (this.radioKey && this.hasRadio) {
        keys = this.radioKey.trim().split(',');
      }
      keys.forEach(function (key) {
        result.push(row[key]);
      });
      return result.join(',');
    },

    //处理序号列、多选或者单选的情况
    addFields: function addFields(row, col, index, cell) {
      var _this2 = this;

      var h = this.$createElement;

      //如果有序号列
      if (this.hasIndex && col.field === this.__index) {
        cell = index + 1;
      }
      //如果有复选框
      if (this.hasCheckbox && col.field === this.__checkbox) {
        cell = h("k-checkbox", __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props___default()([{
          attrs: {
            value: this.formatCheckedKey(row),
            type: "arr",
            "data-arr": this.checkedKeys
          }
        }, {
          on: {
            "change": function change($event) {
              for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key = 1; _key < _len2; _key++) {
                attrs[_key - 1] = arguments[_key];
              }

              (function () {
                return _this2.toggleRow($event, row, index);
              }).apply(undefined, [$event].concat(attrs));
            }
          }
        }]));
        //如果有单选框
      } else if (this.hasRadio && col.field === this.__radio) {
        var radioProps = {
          props: {
            modelValue: this.currentRadioValue,
            value: this.formatCheckedKey(row)
          },
          on: {
            modelValueChange: function modelValueChange(value) {
              _this2.currentRadioValue = value;
              _this2.$emit('toggle-radio-row', { value: value, row: row, index: index });
            }
          }
        };
        cell = h("k-radio", radioProps);
      }
      return cell;
    },

    //获取有嵌套的数据列field,目前只支持2级嵌套
    getNestingField: function getNestingField(columns) {
      var field = "";
      for (var i = 0, len = columns.length; i < len; i++) {
        var f = columns[i].field || "";
        var fields = f.trim().split(".");
        if (fields.length > 1) {
          field = fields[0];
          break;
        }
      }

      return field;
    },

    //渲染tr
    renderTr: function renderTr(column, row, index) {
      var _this3 = this;

      var h = this.$createElement;

      var on = {
        mouseover: function mouseover() {
          _this3.$emit("trmouseover", row, index);
        },
        mouseout: function mouseout() {
          _this3.$emit("trmouseout", row, index);
        },
        click: function click() {
          //可以在此处理复选单选
          //暂时不处理单击行选择的功能
        }
      };
      return this.hover ? h(
        "tr",
        { on: on },
        [column]
      ) : h("tr", [column]);
    },

    //渲染单元格
    renderTableCell: function renderTableCell(row, col, index) {
      var h = this.$createElement;

      var _width$col$style = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_extends___default()({ width: "" }, col.style),
          width = _width$col$style.width,
          restStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(_width$col$style, ["width"]);

      var cell = row[col.field];
      cell = this.addFields(row, col, index, cell);

      //如果有作用域插槽
      if (col.scopedSlots) {
        cell = this.bodyScopedSlots[col.scopedSlots]({
          row: row,
          index: index
        });
        //如果有自定义渲染函数
      } else if (col.customRender) {
        cell = col.customRender(row, index);
      }
      return h(
        "k-cell",
        { style: restStyle },
        [cell]
      );
    },

    //合并tbody行，只依据一个嵌套数据进行合并！
    renderMergeRow: function renderMergeRow(bodyScopedSlots, columns, data) {
      var _this4 = this;

      var h = this.$createElement;

      var tbody = [],
          nestingField = this.getNestingField(columns);
      //TODO: 如果需支持多级嵌套表格，需优化以下内容
      data.forEach(function (row, index) {
        var rowspan = row[nestingField].length || 1;
        var tr = Array.apply(null, { length: rowspan }).map(function (n, i) {
          var column = columns.map(function (col, icol) {
            //获取此列样式
            var _width$col$style2 = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_extends___default()({ width: "" }, col.style),
                width = _width$col$style2.width,
                restStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(_width$col$style2, ["width"]);
            //获取此列的字段名、嵌套层级


            var fields = (col.field ? col.field : "").trim().split(".");
            var fieldsLength = fields.length;

            //--start 定义单元格内容
            //目前只支持2级表格
            var cellContent = null;
            var f = fields;
            if (fieldsLength === 1) {
              cellContent = row[col.field];
            } else {
              cellContent = row[f[0]][i][f[1]];
            }
            cellContent = _this4.addFields(row, col, index, cellContent);
            //如果有作用域插槽
            if (col.scopedSlots) {
              cellContent = _this4.bodyScopedSlots[col.scopedSlots]({
                row: row,
                row1: row[f[0]][i],
                index: index,
                index1: i
              });
              //如果有自定义渲染函数
            } else if (col.customRender) {
              //TODO: row1是undefined，需检查
              cellContent = col.customRender({
                row: row,
                index: index,
                row1: row[f[0][i]],
                index1: i
              });
            }
            if (rowspan > 1) {
              if (fieldsLength === 1 && i === 0) {
                return h(
                  "k-cell",
                  {
                    attrs: { rowspan: rowspan },
                    style: restStyle },
                  [cellContent]
                );
              } else if (fieldsLength === 1 && i !== 0) {
                return null;
              }
              return h(
                "k-cell",
                { style: restStyle },
                [cellContent]
              );
            }
            return h(
              "k-cell",
              { style: restStyle },
              [cellContent]
            );
            //--end
          });
          return _this4.renderTr(column, row, index);
        });
        tbody.push(tr);
      });
      return tbody;
    },

    //渲染表格的tbody
    renderTableBody: function renderTableBody() {
      var _this5 = this;

      var bodyScopedSlots = this.bodyScopedSlots,
          columns = this.columns,
          data = this.data;

      var tbody = [],

      //level是数据的层级，1是只有1层，2是有1层嵌套，3是有2层嵌套...
      level = 1;
      if (columns.length !== 0) {
        columns.forEach(function (col) {
          var n = (col.field ? col.field : "").split(".").length;
          if (level < n) {
            level = n;
          }
        });
      }
      if (level > 1) {
        //如果有合并行的情况
        return this.renderMergeRow(bodyScopedSlots, columns, data);
      }
      data.forEach(function (row, index) {
        var column = columns.map(function (col) {
          return _this5.renderTableCell(row, col, index);
        });
        tbody.push(_this5.renderTr(column, row, index));
      });
      return tbody;
    },
    bodyScroll: function bodyScroll(e) {
      this.$emit("bodyscroll", {
        target: e.target,
        left: e.target.scrollLeft,
        top: e.target.scrollTop
      });
    }
  },
  render: function render() {
    var _this6 = this;

    var h = arguments[0];
    var bodyWrapperClasses = this.bodyWrapperClasses,
        tableClasses = this.tableClasses;

    return h(
      "div",
      __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props___default()([{
        "class": bodyWrapperClasses
      }, {
        on: {
          "scroll": function scroll($event) {
            for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key2 = 1; _key2 < _len3; _key2++) {
              attrs[_key2 - 1] = arguments[_key2];
            }

            (function () {
              _this6.bodyScroll($event);
            }).apply(undefined, [$event].concat(attrs));
          }
        }
      }]),
      [h(
        "table",
        { "class": tableClasses },
        [h("k-col-group", {
          attrs: { columns: this.columns }
        }), h("tbody", [this.renderTableBody()])]
      )]
    );
  }
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(211), __esModule: true };

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(32);
__webpack_require__(47);
__webpack_require__(212);
__webpack_require__(218);
__webpack_require__(221);
__webpack_require__(223);
module.exports = __webpack_require__(3).Set;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(213);
var validate = __webpack_require__(113);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(214)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(46);
var redefineAll = __webpack_require__(61);
var ctx = __webpack_require__(12);
var anInstance = __webpack_require__(59);
var forOf = __webpack_require__(26);
var $iterDefine = __webpack_require__(45);
var step = __webpack_require__(72);
var setSpecies = __webpack_require__(104);
var DESCRIPTORS = __webpack_require__(9);
var fastKey = __webpack_require__(49).fastKey;
var validate = __webpack_require__(113);
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
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var $export = __webpack_require__(6);
var meta = __webpack_require__(49);
var fails = __webpack_require__(16);
var hide = __webpack_require__(13);
var redefineAll = __webpack_require__(61);
var forOf = __webpack_require__(26);
var anInstance = __webpack_require__(59);
var isObject = __webpack_require__(8);
var setToStringTag = __webpack_require__(25);
var dP = __webpack_require__(7).f;
var each = __webpack_require__(215)(0);
var DESCRIPTORS = __webpack_require__(9);

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
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(12);
var IObject = __webpack_require__(37);
var toObject = __webpack_require__(31);
var toLength = __webpack_require__(28);
var asc = __webpack_require__(216);
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
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(217);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var isArray = __webpack_require__(73);
var SPECIES = __webpack_require__(4)('species');

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
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(6);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(219)('Set') });


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(58);
var from = __webpack_require__(220);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(26);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(222)('Set');


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(6);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(224)('Set');


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(6);
var aFunction = __webpack_require__(19);
var ctx = __webpack_require__(12);
var forOf = __webpack_require__(26);

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
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_props__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tableCell__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__colGroup__ = __webpack_require__(63);







/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    KCell: __WEBPACK_IMPORTED_MODULE_5__tableCell__["a" /* default */],
    KColGroup: __WEBPACK_IMPORTED_MODULE_6__colGroup__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_4__util_props__["a" /* props */]),
  computed: {
    tableClasses: function tableClasses() {
      var _ref;

      return _ref = {
        "k-table": true,
        "k-table--bordered": this.bordered
      }, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--" + this.size, true), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--nowrap", this.nowrap), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-table--min-content", this.minContent), _ref;
    },
    hasSum: function hasSum() {
      return this.columns.some(function (col) {
        return "sum" in col;
      });
    }
  },
  methods: {
    isObject: function isObject(any) {
      return Object.prototype.toString.call(any).toLowerCase() === "[object object]";
    },
    getColSum: function getColSum(field) {
      var f = field.split(".");
      var t = 0;
      if (f.length === 1 && f[0]) {
        this.data.forEach(function (el) {
          t += +el[f[0]];
        });
      } else {
        var _fnObj = function _fnObj(obj, fields) {
          for (var i = 0, len = fields.length; i < len; i++) {
            var fd = fields[i];
            if (Array.isArray(obj[fd])) {
              _fn(obj[fd], fields.slice(1));
            } else if (me.isObject(obj[fd])) {
              _fnObj(obj[fd], fields.slice(1));
            } else {
              t += +obj[fd];
              isEnd = true;
              break;
            }
          }
        };

        var _fn = function _fn(data, fields) {
          for (var i = 0, len = fields.length; i < len; i++) {
            var fd = fields[i];
            for (var j = 0, jlen = data.length; j < jlen; j++) {
              var dd = data[j];

              if (Array.isArray(dd[fd])) {
                dd[fd].forEach(function (el) {
                  _fnObj(el, fields.slice(1));
                });
              } else {
                if (me.isObject(dd[fd])) {
                  _fnObj(dd[fd], fields.slice(1));
                } else {
                  t += +dd[fd];
                  isEnd = true;
                  break;
                }
              }
            }
            if (isEnd) break;
          }
        };

        var me = this;
        var isEnd = false;

        _fn(this.data, f);
      }
      return t;
    },
    getSumContent: function getSumContent(col, i) {
      var sum = col.sum,
          field = col.field;

      var type = typeof sum === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(sum);
      if (type === "string" || type === "number") {
        return sum;
      } else {
        var total = this.getColSum(field);
        if (type === 'function') {
          //total是算出来的总和，i是此列的序号
          return sum(total, i);
        } else if (type === 'boolean') {
          return total;
        }
      }
      return null;
    },
    renderTd: function renderTd() {
      var _this = this;

      var h = this.$createElement;
      var sumText = this.sumText;

      var tds = this.columns.map(function (col, i) {
        var content = i === 0 ? sumText : _this.getSumContent(col, i);
        return h("k-cell", [content]);
      });
      return h("tr", [tds]);
    }
  },
  render: function render() {
    var h = arguments[0];

    if (this.hasSum) {
      var tableClasses = this.tableClasses;

      return h(
        "div",
        { "class": "k-table-foot" },
        [h(
          "table",
          { "class": tableClasses },
          [h("k-col-group", {
            attrs: { columns: this.columns }
          }), h("tfoot", [this.renderTd()])]
        )]
      );
    }
    return false;
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.$emit('foot-mounted', Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["b" /* getStyle */])(_this2.$el, 'height'));
    });
  }
});

/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__position__ = __webpack_require__(78);

__WEBPACK_IMPORTED_MODULE_0__position__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__position__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__position__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__position__["a" /* default */]);

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon__ = __webpack_require__(18);

__WEBPACK_IMPORTED_MODULE_0__icon__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__icon__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__icon__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__icon__["a" /* default */]);

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bind_js__ = __webpack_require__(89);

/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue, opts) {
    Vue.directive('dnd', __WEBPACK_IMPORTED_MODULE_0__bind_js__["a" /* default */]);
  }
});

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__ = __webpack_require__(5);

/* harmony default export */ __webpack_exports__["a"] = ({
  //指令 - 吸顶或吸底
  install: function install(Vue, opts) {
    Vue.directive('pin', {
      bind: function bind() {
        // console.log('bind pin')
      },
      inserted: function inserted(el, binding) {
        // console.log('insert pin')
        //参数
        var arg = parseFloat(binding.arg) || 0;
        //修饰符
        var modi = binding.modifiers; //{top:true}//{bottom:true}//默认top
        var isTop = false;
        var isBottom = false;
        if (!('top' in modi) && !('bottom' in modi)) {
          isTop = true;
        } else {
          isTop = !!modi.top;
          isBottom = !!modi.bottom;
        }
        var style = binding.value; //吸顶后的样式：binding.value
        var parentNode = el.parentNode; //注意：不一定会插入到dom中！
        var elWidth = -1;
        var position = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'position');
        var elTop = -1;
        var isTopPining = false;
        var isBottomPining = false;
        el.___zPinFn = function (e) {

          var scrollTop = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["d" /* scroll */])().top;
          //为什么要用parentNode，因为当页面初始就滚动到了底下时，此时el已经是固定住了，所以计算出的el的offsetTop会不准确。但parentNode不会受影响！

          //el本身最好不要有margin-top，因为没有考虑！
          //parentNode最好不要有padding-top，没有考虑它！

          //el本身可以有class，但不能有行间样式，因为会被清除！
          var top = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["c" /* offset */])(parentNode).top;
          // console.log(top)
          var height = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["b" /* getStyle */])(parentNode, 'height');
          elTop = top;

          if (isTop) {
            if (scrollTop >= elTop - arg) {
              isTopPining = true;
              // if(elWidth<0) 
              elWidth = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'width');
              //修复因吸顶导致的页面高度塌陷进而造成页面的抖动问题
              Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["e" /* setStyle */])(parentNode, {
                height: height
              });
              //
              Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["e" /* setStyle */])(el, {
                position: 'fixed',
                top: arg + 'px',
                bottom: 'auto',
                width: elWidth
              });
              if (style) Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["e" /* setStyle */])(el, style);
            } else {
              isTopPining = false;
              !isBottomPining && el.removeAttribute('style');
            }
          }
          if (isBottom) {
            var n = scrollTop + window.innerHeight - parseFloat(height) - arg;
            if (n > 0 && n <= elTop) {
              isBottomPining = true;
              elWidth = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'width');
              Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["e" /* setStyle */])(parentNode, {
                height: height
              });
              Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["e" /* setStyle */])(el, {
                position: 'fixed',
                bottom: arg + 'px',
                top: 'auto',
                width: elWidth
              });
              if (style) Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["e" /* setStyle */])(el, style);
            } else {
              isBottomPining = false;
              !isTopPining && el.removeAttribute('style');
            }
          }

          //单独对resize时做处理，由于resize时，el的宽度可能会变化
          if (e.type === 'resize') {
            Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["e" /* setStyle */])(el, {
              width: Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["b" /* getStyle */])(parentNode, 'width')
            });
          }
        };
        el.___zPinEvent = function (type) {
          window[type + 'EventListener']('scroll', el.___zPinFn);
          window[type + 'EventListener']('resize', el.___zPinFn);
        };

        el.___zPinEvent('add');
      },
      componentUpdated: function componentUpdated(el) {},
      unbind: function unbind(el) {
        el.___zPinEvent('remove');
        delete el.___zPinFn;
        delete el.___zPinEvent;
      }
    });
  }
});

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_util_inVisibleRange_js__ = __webpack_require__(231);

var reg = /^\{.*\}$/;
var context = '@@viewablecontext';
var bind = {
  inserted: function inserted(el, binding) {
    var isOnce = !!binding.modifiers.once;
    el[context] = {
      handler: function handler(binding) {
        var exp = binding.expression;
        var v = binding.value;
        var viewable = null;
        var unviewable = null;
        var delay = 0;
        if (reg.test(exp)) {
          viewable = v.viewable;
          unviewable = v.unviewable;
          if (v.delay) delay = v.delay;
        } else {
          viewable = v;
        }
        Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_inVisibleRange_js__["a" /* default */])({
          el: el,
          once: isOnce,
          delay: delay,
          viewable: viewable,
          unviewable: unviewable
        });
      }
    };
    el[context].handler(binding);
  },
  updated: function updated(el, binding) {
    el[context].handler(binding);
  },
  unbind: function unbind(el) {
    el[context] = null;
  }
};
/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue, opts) {
    Vue.directive('viewable', bind);
  }
});

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__ = __webpack_require__(5);
//判断当前元素是否出现在可视区内

var check = '@@checkVisible';
var inVisible = function inVisible(_ref) {
  var _ref$el = _ref.el,
      el = _ref$el === undefined ? null : _ref$el,
      _ref$once = _ref.once,
      once = _ref$once === undefined ? false : _ref$once,
      _ref$delay = _ref.delay,
      delay = _ref$delay === undefined ? 0 : _ref$delay,
      viewable = _ref.viewable,
      unviewable = _ref.unviewable;

  if (!el) {
    console.error('inVisible:', '请传入一个元素');
    return;
  }
  var timer = null;
  el[check] = function () {
    if (!document.body.contains(el)) return;
    var scrollTop = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["d" /* scroll */])().top,
        clientHeight = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["a" /* client */])().height,
        elOffsetTop = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["c" /* offset */])(el).top,
        elHeight = parseInt(Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["b" /* getStyle */])(el, 'height'));
    elHeight = isNaN(elHeight) ? 0 : elHeight;

    //何时不在可视区。注意要监控scroll 和 resize事件
    // scrollTop>elOffsetTop+elHeight || scrollTop+clientHeight<elOffsetTop

    //如果不在可视区
    if (scrollTop > elOffsetTop + elHeight || scrollTop + clientHeight < elOffsetTop) {

      unviewable && unviewable();
    } else {
      //如果在可视区
      if (once) {
        window.removeEventListener('scroll', el[check]);
        window.removeEventListener('resize', el[check]);
        el[check] = null;
      }
      clearTimeout(timer);
      timer = setTimeout(function () {
        viewable && viewable();
      }, delay);
    }
  };

  window.addEventListener('scroll', el[check]);
  window.addEventListener('resize', el[check]);
  el[check](); //要不要加，不加的时候，如果初始页面的scrollTop是0的时候，就不会触发回调？
};

/* harmony default export */ __webpack_exports__["a"] = (inVisible);

/***/ })
/******/ ]);
});