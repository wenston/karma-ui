(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue/dist/vue.esm.js"));
	else if(typeof define === 'function' && define.amd)
		define("karma-ui", ["vue/dist/vue.esm.js"], factory);
	else if(typeof exports === 'object')
		exports["karma-ui"] = factory(require("vue/dist/vue.esm.js"));
	else
		root["karma-ui"] = factory(root["vue/dist/vue.esm.js"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_102__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 125);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(75);

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
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(54)('wks');
var uid = __webpack_require__(37);
var Symbol = __webpack_require__(3).Symbol;
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return offset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return scroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return client; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return scrollIntoViewIfNeed; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);

var setStyle = function setStyle(el, p, value) {
  if ((typeof p === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(p)) === "object") {
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

//注意，offset包含了元素内部的滚动高度！
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

var scrollIntoViewIfNeed = function scrollIntoViewIfNeed(elem, wrapperElem) {
  if (elem && wrapperElem) {
    var top = offset(elem, wrapperElem).top;
    var elemHeight = parseFloat(getStyle(elem, "height"));
    var bodyHeight = parseFloat(getStyle(wrapperElem, "height"));
    var scrollTop = wrapperElem.scrollTop;
    if (top > bodyHeight + scrollTop - elemHeight || top < scrollTop) {
      wrapperElem.scrollTop = top - bodyHeight + elemHeight;
    }
  } else {
    console.warn("scrollIntoViewIfNeed\u51FD\u6570\u4F20\u5165\u4E86\u65E0\u6548\u7684\u53C2\u6570");
  }
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'KIcon',
  props: {
    size: [String, Number],
    color: String,
    name: String,
    weight: Boolean,
    tag: {
      type: String,
      default: 'i'
    }
  },
  render: function render() {
    var h = arguments[0];
    var $props = this.$props,
        $listeners = this.$listeners;

    var iconProps = {
      attrs: this.$attrs,
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
    return h(this.tag, iconProps);
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(2);
var ctx = __webpack_require__(14);
var hide = __webpack_require__(15);
var has = __webpack_require__(16);
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(76);
var toPrimitive = __webpack_require__(49);
var dP = Object.defineProperty;

exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(19)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(78);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(24);
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(25);
module.exports = __webpack_require__(11) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_input_jsx_vue__ = __webpack_require__(79);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(158);

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
/* 19 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50);
var defined = __webpack_require__(51);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(142)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(57)(String, 'String', function (iterated) {
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
/* 22 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_icon_icon__ = __webpack_require__(6);



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
    },
    capsule: Boolean,
    autofocus: Boolean
  },
  computed: {
    classes: function classes() {
      var _ref;

      return _ref = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-btn", true), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-btn--" + this.type, true), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-btn--" + this.size, true), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-btn--block", this.block), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, 'k-btn--capsule', this.capsule), _ref;
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
      Content = h(
        "span",
        { "class": "k-btn-cont" },
        [$slots.default]
      );
    }
    var buttonProps = {
      class: classes,
      attrs: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, $attrs, {
        href: this.href,
        target: this.target,
        disabled: this.loading || this.disabled,
        tabindex: 1
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
    },
    focus: function focus() {
      this.$el.focus();
    }
  },
  mounted: function mounted() {
    this.autofocus && this.$nextTick().then(this.focus);
  },

  watch: {
    autofocus: {
      immediate: true,
      handler: function handler(b) {
        if (b) {
          this.$nextTick().then(this.focus);
        }
      }
    }
  }
});

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(146);
var global = __webpack_require__(3);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(22);
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return layer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer__ = __webpack_require__(86);

__WEBPACK_IMPORTED_MODULE_0__layer__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__layer__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__layer__["a" /* default */]);
  __WEBPACK_IMPORTED_MODULE_0__layer__["a" /* default */].LayerConstructor = Vue.extend(__WEBPACK_IMPORTED_MODULE_0__layer__["a" /* default */]);
};
//layer生成一个实例，并插入parent
var layer = function layer() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

  //parent是插入的位置的父级

  var ins = new __WEBPACK_IMPORTED_MODULE_0__layer__["a" /* default */].LayerConstructor().$mount();
  ins.$data.parent = parent;
  parent.appendChild(ins.$el);
  return ins;
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__layer__["a" /* default */]);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var call = __webpack_require__(87);
var isArrayIter = __webpack_require__(88);
var anObject = __webpack_require__(13);
var toLength = __webpack_require__(36);
var getIterFn = __webpack_require__(64);
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(179), __esModule: true };

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_option_vue__ = __webpack_require__(92);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_checkbox_vue__ = __webpack_require__(93);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_b40adff4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_checkbox_vue__ = __webpack_require__(180);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(77);
var enumBugKeys = __webpack_require__(55);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(52);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(51);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(140);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(148);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return merge; });
/* unused harmony export assign */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isObject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(75);
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
  if (typeof __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default.a != "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {
        // .length of function is 2
        "use strict";

        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError("Cannot convert undefined or null to object");
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

var isObject = function isObject(o) {
  return Object.prototype.toString.call(o).toLowerCase() === "[object object]";
};

/***/ }),
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(26);
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(165), __esModule: true };

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_loading_Loading_vue__ = __webpack_require__(103);





var timeout = function timeout(t) {
  return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    setTimeout(function () {
      console.warn("v-loading\u6307\u4EE4\uFF1A\u8D85\u65F6\uFF08" + t + "ms\uFF09\u81EA\u52A8\u5173\u95ED");
      resolve();
    }, t);
  });
};
var instance = "@@instance";
var settings = {
  content: "努力加载中...",
  position: "absolute",
  isFullScreen: true,
  color: "#3366ff",
  backgroundColor: "rgba(255,255,255,.75)",
  iconColor: "#3366ff",
  timeout: -1, //-1代表没有超时自动关闭的功能
  afterTimeout: function afterTimeout() {}
};
/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding) {
    var LoadingConstructor = __WEBPACK_IMPORTED_MODULE_2_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_loading_Loading_vue__["a" /* default */]);
    el[instance] = new LoadingConstructor().$mount();
    var position = Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["b" /* getStyle */])(el, "position");
    if (position !== "fixed" && position !== "relative" && position !== "absolute") {
      Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["f" /* setStyle */])(el, "position", "relative");
    }
    el.appendChild(el[instance].$el);
  },
  inserted: function inserted(el, binding) {
    var isShow = false,
        v = binding.value,
        opts = {};
    if (typeof v === "boolean") {
      isShow = v;
    } else {
      isShow = v.loading;
      opts = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, settings, v);
      el[instance].setOptions(opts);
    }
    if (isShow) {
      el[instance].show();
      opts.timeout && opts.timeout > -1 && timeout(opts.timeout).then(function () {
        el[instance].hide(true);
        opts.afterTimeout();
      });
    } else {
      el[instance].hide(true);
    }
  },
  componentUpdated: function componentUpdated(el, binding) {
    var isShow = false,
        v = binding.value,
        opts = {};
    if (typeof v === "boolean") {
      isShow = v;
    } else {
      isShow = v.loading;
      opts = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, settings, v);
      el[instance].setOptions(opts);
    }
    if (isShow) {
      __WEBPACK_IMPORTED_MODULE_2_vue___default.a.nextTick(function () {
        if (el[instance]) el[instance].show();
      });
      opts.timeout && opts.timeout > -1 && timeout(opts.timeout).then(function () {
        el[instance].hide(true);
        opts.afterTimeout();
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_2_vue___default.a.nextTick(function () {
        if (el[instance]) el[instance].hide(true);
      });
    }
  },
  unbind: function unbind(el, binding) {
    el[instance] = null;
  }
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return props; });
var props = {
  //点击某一行时，是否支持高亮显示
  canHighlightRow: {
    type: Boolean,
    default: false
  },
  //高亮时的唯一标示，如Id
  highlightKey: {
    type: String,
    default: "index,Id"
  },
  //高亮时，highlightKey对应的值
  //可以通过设置此值，来高亮某行
  //用以替代setHighlightRow方法
  //支持sync
  highlightValue: {
    type: [String, Number],
    default: ""
  },
  //循环行时的那个key，指的是字段名
  //loopKey可以是以逗号分隔的多个字段名，也可以是单个
  loopKey: {
    type: [String, Number],
    //index是指的数据行号
    default: "index,Id"
  },
  //原始数据
  data: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  //列名及对应的描述
  //field必须要有
  //style里的宽度如果没有指定，则会有一个默认的120px的宽度，见colGroup.jsx
  /**
   *
   *  [{
   *    field:'字段名',
   *    name:'字段描述',
   *    scopedSlots:'slotName',
   *    style:{},
   *    sum:true,
   *    sorter:true
   *  }]
   * sum：是否需要汇总，类型：Boolean,String,Number,Function
   * sorter: 是否排序，Boolean
   */
  columns: {
    type: [Array, Function],
    default: function _default() {
      return [];
    }
  },
  //是否有边框
  bordered: {
    type: Boolean,
    default: true
  },
  //简易表格，只有下边框
  simple: {
    type: Boolean,
    default: false
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
  //是否有操作按钮
  //默认只有添加和删除操作
  hasAction: {
    type: Boolean,
    default: false
  },
  //是否有表头
  hasThead: {
    type: Boolean,
    default: true
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
  //可否选择某行，返回布尔值数组
  //[当前行是否被选中，当前行是否能被选中操作]的函数，接收两个参数，row、index
  //checkable的选中数据，不在selectedRows和selectedKeys里体现！
  checkable: Function,
  //支持sync，保存的是选择的行数据
  //selectedRows和selectedKeys里不包括不能进行选择操作的数据！
  //两个要同时使用，否则可能会出现问题！
  selectedRows: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  //支持sync，保存的是checkboxKey作为key 的数组
  selectedKeys: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  //支持单选的情况下，需指定一个唯一的标示，同checkboxKey
  radioKey: {
    type: String,
    default: "Id"
  },
  //是否支持单选
  hasRadio: {
    type: Boolean,
    default: false
  },
  //单选时，选中的radioKey对应的值
  value: {
    type: [Number, String]
  },
  //表格宽度，true表明是固定宽，false是auto，自动横向拉伸至100%
  minContent: {
    type: Boolean,
    default: true
  },
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
  minHeight: {
    type: String,
    default: ''
  },
  //是否允许文本换行
  // nowrap: {
  //   type: Boolean,
  //   default: false
  // },
  //tfoot 合计的文本描述
  sumText: {
    type: String,
    default: "合计"
  },
  //可调整列宽
  resizeWidth: {
    type: Boolean,
    default: false
  },
  emptyText: {
    type: [String, Function],
    default: "暂无相关数据"
  }
};

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_object_js__ = __webpack_require__(41);




/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    //第一步，提取有效数据
    c_filter_columns: function c_filter_columns() {
      var columns = this.columns;
      if (typeof columns === "function") {
        columns = columns();
      }
      var arr = [];
      columns.forEach(function (col) {
        if (!!col && Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_object_js__["a" /* isObject */])(col)) {
          arr.push(col);
        } else if (typeof col === "function") {
          var c = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, col());
          if (!!c && Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_object_js__["a" /* isObject */])(c)) arr.push(c);
        }
      });
      return arr;
    },

    //第二步，加工thead、tbody需要的数据
    headAndBodyColumns: function headAndBodyColumns() {
      var columns = this.c_filter_columns;
      var bodyColumns = [],
          fn = function fn(arr) {
        arr.forEach(function (col) {
          if (col.children && col.children.length) {
            fn(col.children);
          } else {
            // bodyColumns.push({...col})
            bodyColumns.push(col);
          }
        });
      };
      fn(columns);

      return { bodyColumns: bodyColumns, headColumns: columns };
    },

    //第三步，预置一些列，如：index，checkbox，radio，action
    //形成最终的thead和tbody需要的列数据
    machiningColumns: function machiningColumns() {
      // let columns = this.columns
      var _headAndBodyColumns = this.headAndBodyColumns,
          bodyColumns = _headAndBodyColumns.bodyColumns,
          headColumns = _headAndBodyColumns.headColumns;

      var cellWidth = this.cellWidth;
      var fixedLeft = this.hasFixedColumns.fixedLeft;
      //如果存在固定左侧列的情况，则index和checkbox或者radio列，默认也要固定
      //如果存在固定右侧列的情况，则index和checkbox或者radio不需要固定

      var obj = {
        style: {
          width: cellWidth,
          // backgroundColor: "#fafafa",
          textAlign: "center"
        }
      };
      if (fixedLeft) {
        obj.fixed = "left";
      }
      //处理复选或者单选
      if (this.hasCheckbox) {
        bodyColumns = [__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, obj, { field: "@_checkbox" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(bodyColumns));
        headColumns = [__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, obj, { field: "@_checkbox" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(headColumns));
      } else if (this.hasRadio) {
        bodyColumns = [__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, obj, { field: "@_radio" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(bodyColumns));
        headColumns = [__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, obj, { field: "@_radio" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(headColumns));
      }
      //处理有操作按钮的情况
      if (this.hasAction) {
        bodyColumns = [__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, obj, { field: "@_action" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(bodyColumns));
        headColumns = [__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, obj, { field: "@_action" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(headColumns));
      }
      //处理有序号的情况
      if (this.hasIndex) {
        bodyColumns = [__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, obj, { field: "@_index" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(bodyColumns));
        headColumns = [__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, obj, { field: "@_index" })].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(headColumns));
      }
      return { bodyColumns: bodyColumns, headColumns: headColumns };
    },

    //是否存在固定列（左，右）
    hasFixedColumns: function hasFixedColumns() {
      var fixedLeft = 0,
          fixedRight = 0,
          columns = this.c_filter_columns;
      columns.forEach(function (col) {
        var f = col.fixed;
        if (f === "left") {
          fixedLeft += 1;
        } else if (f === "right") {
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
    },
    cellWidth: function cellWidth() {
      var size = {
        mini: "45",
        small: "45",
        medium: "45",
        big: "50",
        large: "55",
        huge: "60"
      };
      return size[this.size];
    },
    hasSum: function hasSum() {
      return this.machiningColumns.bodyColumns.some(function (col) {
        return "sum" in col;
      });
    }
  },
  methods: {
    //判断是否是内置列
    $_is_built_in_column: function $_is_built_in_column(field) {
      return field === this.__index || field === this.__action || field === this.__checkbox || field === this.__radio;
    },

    //获取单元格的style
    $_get_td_style: function $_get_td_style(row, index, col) {
      var obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var style = typeof col.style === "function" ? col.style(row, index, obj) : col.style;

      var _width$style = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({ width: "" }, style),
          width = _width$style.width,
          restStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(_width$style, ["width"]);

      return restStyle;
    }
  }
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(26);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(54)('keys');
var uid = __webpack_require__(37);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(27) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 55 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 56 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(80);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(22);
var $iterCreate = __webpack_require__(143);
var setToStringTag = __webpack_require__(28);
var getPrototypeOf = __webpack_require__(145);
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(13);
var dPs = __webpack_require__(144);
var enumBugKeys = __webpack_require__(55);
var IE_PROTO = __webpack_require__(53)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(48)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(81).appendChild(iframe);
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(4);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(37)('meta');
var isObject = __webpack_require__(10);
var has = __webpack_require__(16);
var setDesc = __webpack_require__(9).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(19)(function () {
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(27);
var wksExt = __webpack_require__(59);
var defineProperty = __webpack_require__(9).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {



/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_select_vue__ = __webpack_require__(85);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(43);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(22);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(15);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Scrollbar_vue__ = __webpack_require__(94);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(24);

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
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_radio_vue__ = __webpack_require__(105);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_b8d820c4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_radio_vue__ = __webpack_require__(195);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getNow */
/* unused harmony export getMonths */
/* unused harmony export weeks */
/* unused harmony export addMonths */
/* unused harmony export getDateByAddOneMonths */
/* unused harmony export isSameMonth */
/* unused harmony export isSameYear */
/* unused harmony export isSameDay */
/* unused harmony export isSameDate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return formatDate; });
/* unused harmony export addDays */
/* unused harmony export getMondayInThisWeek */
/* unused harmony export getLastWeek */
/* unused harmony export getFirstDayInThisMonth */
/* unused harmony export getLastMonth */
function isLeapYear(y) {
  var cond1 = y % 4 == 0; //条件1：年份必须要能被4整除
  var cond2 = y % 100 != 0; //条件2：年份不能是整百数
  var cond3 = y % 400 == 0; //条件3：年份是400的倍数
  //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
  //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
  //所以得出判断闰年的表达式：
  return cond1 && cond2 || cond3;
}
var getNow = function getNow() {
  var now = null;
  if (!now) {
    return function () {
      return new Date();
    }();
  }
  return now;
};
var getMonths = function getMonths(y) {
  return [undefined, 31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};
var weeks = [undefined, '一', '二', '三', '四', '五', '六', '日'];
//根据月，向前或者后获取月
var addMonths = function addMonths(m, n) {
  m = +m;
  n = +n;
  var next = (m + n) % 12;
  if (next === 0) {
    next = 12;
  }
  return next;
};
//获取上个月、下个月的日期
var getDateByAddOneMonths = function getDateByAddOneMonths(date, n) {
  date = new Date(date);
  var month = date.getMonth() + 1;
  var y = date.getFullYear();
  var month_n = addMonths(month, n);
  if (n === 1 && month > month_n) {
    return y + 1 + '-' + month_n + '-01';
  } else if (n === -1 && month < month_n) {
    return y - 1 + '-' + month_n + '-01';
  }
  return y + '-' + month_n;
};
var isSameMonth = function isSameMonth(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  return date1.getMonth() === date2.getMonth();
};
var isSameYear = function isSameYear(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  return date1.getFullYear() === date2.getFullYear();
};
var isSameDay = function isSameDay(d1, d2) {
  d1 = new Date(d1);
  d2 = new Date(d2);
  return d1.getDate() === d2.getDate();
};
var isSameDate = function isSameDate(d1, d2) {
  //只比较是否同年同月同日
  return isSameDay(d1, d2) && isSameMonth(d1, d2) && isSameYear(d1, d2);
};
var formatDate = function formatDate(date) {
  date = new Date(date);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  return y + '-' + m + '-' + d;
};
var addDays = function addDays(date, day) {
  date = new Date(date) - 0;
  day = day * 86400000;
  return formatDate(date + day);
};
var getMondayInThisWeek = function getMondayInThisWeek() {
  var d = getNow();
  var day = d.getDay();
  if (day === 0) {
    day = 7;
  }
  return addDays(new Date(), (day - 1) * -1);
};
var getLastWeek = function getLastWeek() {
  var thisMonday = getMondayInThisWeek();
  var start = addDays(thisMonday, -7);
  var end = addDays(start, 6);
  return { start: start, end: end };
};
var getFirstDayInThisMonth = function getFirstDayInThisMonth() {
  var d = getNow();
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  return formatDate(y + '-' + m + '-1');
};
var getLastMonth = function getLastMonth() {
  var d = getNow();
  var m = d.getMonth() + 1;
  var y = d.getFullYear();
  var lastM = addMonths(m, -1);
  if (lastM > m) {
    y = y - 1;
  }
  var days = getMonths(y)[lastM];
  var start = formatDate(y + '-' + lastM + '-1');
  return {
    start: start,
    end: formatDate(addDays(start, days - 1))
  };
};
/* harmony default export */ __webpack_exports__["a"] = ({
  getNow: getNow,
  getMonths: getMonths,
  weeks: weeks,
  addMonths: addMonths,
  isSameDay: isSameDay,
  isSameYear: isSameYear,
  isSameMonth: isSameMonth,
  isSameDate: isSameDate,
  getDateByAddOneMonths: getDateByAddOneMonths,
  formatDate: formatDate,
  addDays: addDays,
  getMondayInThisWeek: getMondayInThisWeek,
  getLastWeek: getLastWeek,
  getFirstDayInThisMonth: getFirstDayInThisMonth,
  getLastMonth: getLastMonth
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_layer_index__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_util_esc_js__ = __webpack_require__(42);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KDropdown",
  props: {
    //虽然title和body都支持function类型，但还是建议在使用时
    //使用:title="title()"或者:body="body()"
    //因为这样写法，body会及时更新，而body函数并不会变化
    //当body函数不变时，自然就不会引起layer组件重新init
    title: [Array, Object, Function], //支持vnode
    body: [Array, Object, Function],
    tag: {
      type: String,
      default: "div"
    },
    trigger: {
      type: [String, Boolean], //Boolean时，取值是false，表示没有事件
      default: "click"
    },
    show: {
      type: Boolean,
      default: false
    },
    //是否懒渲染，只在展开的时候渲染
    lazy: {
      type: Boolean,
      default: true
    },
    //是否在不可见时销毁
    destroyWhenHide: Boolean,
    bodyClassName: String,
    headerClassName: String,
    footerClassName: String,
    //是否可以从点击dropdown外部关闭dropdown
    canCloseByClickoutside: {
      type: Boolean,
      default: true
    },
    //从外部点击关闭dropdown时，除了whiteList中的元素
    whiteList: Array
  },
  data: function data() {
    return {
      ins: null,
      visible: this.show,
      timer: null,
      insElement: null
    };
  },

  methods: {
    showLayer: function showLayer() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      if (!this.ins) {
        this.instanceAndBindEvents();
      }
      this.ins.show(cb);
    },
    hideLayer: function hideLayer() {
      var _this = this;

      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      this.ins && this.ins.hide(function () {
        cb();
        if (_this.destroyWhenHide) {
          _this.ins.destroy();
          _this.ins = null;
        }
      });
    },
    hideIt: function hideIt() {
      var _this2 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this2.visible = false;
      }, delay);
    },
    showIt: function showIt() {
      var _this3 = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this3.visible = true;
      });
    },

    //init方法待改进：是否可以加入debounce
    init: function init() {
      var _this4 = this;

      this.ins && this.$nextTick(function () {
        var body = _this4.body;
        var $slots = _this4.$slots;
        var _$props = _this4.$props,
            bodyClassName = _$props.bodyClassName,
            footerClassName = _$props.footerClassName,
            headerClassName = _$props.headerClassName,
            canCloseByClickoutside = _$props.canCloseByClickoutside;

        if (body) {
          if (typeof body === "function") {
            body = body();
          }
        } else {
          body = $slots.default;
        }
        // console.log('dropdown接收到的whiteList',this.whiteList)
        _this4.ins.init(_this4, {
          default: body,
          header: $slots.header,
          footer: $slots.footer
        }, {
          width: "auto",
          bodyClassName: bodyClassName,
          footerClassName: footerClassName,
          headerClassName: headerClassName,
          canCloseByClickoutside: canCloseByClickoutside,
          whiteList: _this4.whiteList
        });
      });
    },
    instanceAndBindEvents: function instanceAndBindEvents() {
      var _this5 = this;

      this.ins = Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_layer_index__["b" /* layer */])();
      if (this.lazy) {
        this.init();
      }
      this.ins.$on("after-hide", function () {
        _this5.visible = false;
      });
      this.ins.$on("layer-inited", function () {
        if (_this5.visible) {
          _this5.showLayer();
        }
        if (_this5.trigger == "hover") {
          _this5.ins.$el.addEventListener("mouseover", _this5.showIt);
          _this5.ins.$el.addEventListener("mouseout", _this5.hideIt);
        }
        if (_this5.insElement == null || _this5.insElement && _this5.insElement != _this5.ins.$el) {
          _this5.insElement = _this5.ins.$el;
          _this5.$emit("getLayerElement", _this5.insElement);
        }
      });
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler: function handler(v) {
        this.$emit("update:show", v);
        if (v) {
          this.showLayer();
        } else {
          this.hideLayer();
        }
      }
    },
    // visible(v) {
    //   this.$emit("update:show", v)
    //   if (v) {
    //     console.log('v',v)
    //     this.showLayer()
    //   } else {
    //     this.hideLayer()
    //   }
    // },
    show: function show(v) {
      this.visible = v;
    },

    //如下一大堆的监控和update钩子有什么区别，去掉行不行？
    title: "init",
    body: "init",
    header: "init",
    footer: "init",
    "$slots.header": "init",
    "$slots.footer": "init",
    "$slots.default": "init"
  },
  mounted: function mounted() {
    if (!this.lazy) {
      this.instanceAndBindEvents();
      this.init();
    }
  },
  updated: function updated() {
    // console.log('dropdown updated !!!!')
    this.init();
  },
  render: function render() {
    var _this6 = this;

    var h = arguments[0];
    var trigger = this.trigger,
        visible = this.visible;

    var p = {
      class: "k-dropdown",
      directives: [{
        name: "esc",
        value: function value() {
          _this6.hideIt(0);
        }
      }]
    };
    if (trigger) {
      p.on = {
        click: function click(e) {
          if (trigger == "click") {
            _this6.visible = !visible;
          }
        },
        mouseover: function mouseover(e) {
          if (trigger == "hover") {
            _this6.showIt();
          }
        },
        mouseout: function mouseout(e) {
          if (trigger == "hover") {
            _this6.hideIt();
          }
        }
      };
    }

    return h(
      this.tag,
      p,
      [typeof this.title === "function" ? this.title() : this.title]
    );
  },
  beforeDestroy: function beforeDestroy() {
    if (this.ins) {
      this.ins.$el.removeEventListener("mouseover", this.showIt);
      this.ins.$el.removeEventListener("mouseout", this.hideIt);
      this.ins.destroy();
    }
  },

  directives: {
    esc: __WEBPACK_IMPORTED_MODULE_1_karma_ui_util_esc_js__["a" /* default */]
  }
});

/***/ }),
/* 72 */
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
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_icon_icon__ = __webpack_require__(6);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KCell",
  components: {
    KIcon: __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_icon_icon__["a" /* default */]
  },
  props: {
    tag: {
      type: String,
      default: "td"
    },
    rowspan: [String, Number],
    colspan: [String, Number],
    resizeWidth: Boolean,
    sorter: [Boolean, Number] //0是升序，1是降序,true是恢复默认排序
  },
  data: function data() {
    return {
      sort: this.sorter,
      inResizing: false,
      timer: null
    };
  },

  computed: {
    hasSorter: function hasSorter() {
      var sorter = this.$data.sort;

      return sorter === true || sorter === 1 || sorter === 0;
    },
    sortText: function sortText() {
      return {
        "0": "升序",
        "1": "降序",
        true: "排序"
      };
    }
  },
  methods: {
    handleMouseup: function handleMouseup(e) {
      var _this = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.inResizing = false;
      }, 100);
      document.removeEventListener("mouseup", this.handleMouseup);
    },
    resizeElem: function resizeElem() {
      var _this2 = this;

      var h = this.$createElement;

      var p = {
        class: {
          "k-table-resize": true
        },
        on: {
          mousedown: function mousedown(e) {
            clearTimeout(_this2.timer);
            _this2.inResizing = true;
            document.addEventListener("mouseup", _this2.handleMouseup);
            _this2.$emit("handleResizeDown", e, _this2.$el);
            e.stopPropagation();
          },
          click: function click(e) {
            e.stopPropagation();
          }
        }
      };
      if (this.resizeWidth && this.colspan - 1 <= 0) {
        return h("div", p);
      }
    },
    sorterElem: function sorterElem() {
      var h = this.$createElement;
      var sorter = this.$data.sort;

      var up = h("k-icon", {
        attrs: {
          name: "k-icon-sort-up"
        },
        "class": {
          "k-table-sorter-icon": true,
          "k-table-sorter-icon-active": sorter === 0
        }
      });
      var down = h("k-icon", {
        attrs: {
          name: "k-icon-sort-down"
        },
        "class": {
          "k-table-sorter-icon": true,
          "k-table-sorter-icon-down": true,
          "k-table-sorter-icon-active": sorter === 1
        }
      });
      return h(
        "div",
        { "class": "k-table-sorter", attrs: { title: this.sortText[sorter + ""] }
        },
        [up, down]
      );
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];

    var p = {
      attrs: {
        rowspan: this.rowspan,
        colspan: this.colspan
      },
      class: {
        "k-table-td-relative": this.resizeWidth || this.hasSorter,
        "k-cursor-pointer": this.hasSorter,
        "k-no-select": this.hasSorter
      }
    };
    if (this.hasSorter && !this.inResizing) {
      p.on = {
        click: function click(e) {
          if (_this3.sort === 1) {
            _this3.sort = true;
          } else if (_this3.sort === 0) {
            _this3.sort = 1;
          } else if (_this3.sort === true) {
            _this3.sort = 0;
          }
          _this3.$emit("sort", _this3.sort);
        }
      };
    }
    return h(
      this.tag,
      p,
      [this.$slots.default, this.resizeElem(), this.hasSorter ? this.sorterElem() : null]
    );
  },

  watch: {
    sorter: function sorter(s) {
      this.sort = s;
    },
    showBaseLine: function showBaseLine(v) {
      console.log(v);
    }
  }
});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  //树形组件的原始数据
  data: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  //折叠图标、展开图标、叶子节点图标
  icon: {
    type: Array,
    default: function _default() {
      return ["k-icon-plus-square", "k-icon-minus-square", "k-icon-leaf"];
    }
  },
  //是否有复选框
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  //key，用来选择用的字段名
  keyField: {
    type: String,
    default: "Id"
  },
  //子节点字段名
  childField: {
    type: String,
    default: "Childs"
  },
  //展示出来的文本，字段名
  textField: {
    type: String,
    default: "Name"
  },
  leafField: {
    type: String,
    default: 'IsLeaf'
  },
  //大小尺寸
  size: String, //目前只支持两种：默认和big

  //用户选择的数据(拍平的数据)，支持sync
  selectedData: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  //用户选择的keyField对应的值（拍平的数组），支持sync
  selectedKeys: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  //复选控制，选中时的规则设置，selectedRule为some时，代表子级只要有一个被选中，则父级就被选中
  //为every时，代表子级所有都被选中时，父级才被选中
  selectedRule: {
    type: [String, Boolean],
    default: "some" //every
  },
  lazy: {
    type: Boolean,
    default: false
  },
  lazyLoad: Function,
  //是否是手风琴效果
  accordion: {
    type: Boolean,
    default: true
  }
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(131), __esModule: true };

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(11) && !__webpack_require__(19)(function () {
  return Object.defineProperty(__webpack_require__(48)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(16);
var toIObject = __webpack_require__(20);
var arrayIndexOf = __webpack_require__(134)(false);
var IE_PROTO = __webpack_require__(53)('IE_PROTO');

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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(136), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_mixins_validate_js__ = __webpack_require__(139);





/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_3_karma_ui_mixins_validate_js__["a" /* validate */]],
  name: "KInput",
  inheritAttrs: false,
  data: function data() {
    return {
      oldValue: ""
    };
  },

  model: {
    prop: "value",
    event: "valueChange"
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
    //active是为了让input不依赖hover，而一直保持蓝色框状态
    active: Boolean,
    select: Boolean,
    autocomplete: {
      type: String,
      default: "on"
    },
    type: {
      type: String,
      default: "text"
    },
    max: Number,
    min: Number,
    maxlength: [String, Number],
    minlength: [String, Number],
    clearable: Boolean,
    block: Boolean,
    size: {
      type: String,
      default: "small"
    },
    styles: Object,
    inputStyles: Object,
    simple: Boolean, //简易型。只有下边框
    noStyle: Boolean,
    capsule: Boolean //胶囊形状的输入框
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
        append = h("i", __WEBPACK_IMPORTED_MODULE_2_babel_helper_vue_jsx_merge_props___default()([{
          "class": "k-input-clearable k-icon-close iconfont"
        }, {
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
        }, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-input-" + this.size, true), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-input-block", this.block), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-input-simple", this.simple), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-input-nostyle", this.noStyle), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref, "k-input-capsule", this.capsule), _ref),
        style: this.styles
      },
      [prepend, append, h(this.tag, __WEBPACK_IMPORTED_MODULE_2_babel_helper_vue_jsx_merge_props___default()([{ directives: directives }, { attrs: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.$props, { tabindex: 1 }) }, {
        domProps: {
          "value": this.value,
          "disabled": this.disabled
        },

        "class": (_ref2 = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref2, this.isInput ? "k-input" : "k-textarea", true), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref2, "k-input-disabled", this.disabled), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_ref2, "k-input-active", this.active), _ref2),
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
        _this2.$emit("valueChange", _this2.validateOptions.useOldValue ? _this2.oldValue : "");
        //触发自定义invalid事件
        _this2.$emit("invalid", _this2.value);
      });
    },
    handlerEvent: function handlerEvent(e) {
      var eType = e.type;
      var val = e.target.value + "";
      //给v-model绑定的属性写入值
      if (eType === "input") {
        // console.log(val)
        this.$emit("valueChange", val);
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
    toClear: function toClear(e) {
      e.stopPropagation();
      this.$emit("valueChange", "");
      this.$emit('clear');
    },
    focus: function focus() {
      if (this.$refs.input) this.$refs.input.focus();
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
    },

    autofocus: {
      immediate: true,
      handler: function handler(f) {
        if (f) {
          this.focus();
        }
      }
    }
  },
  mounted: function mounted() {
    this.autofocus && this.$nextTick().then(this.focus);
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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(26);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(77);
var hiddenKeys = __webpack_require__(55).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_input_input_jsx_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_esc_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_layer_index__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_icon_icon__ = __webpack_require__(6);




// import clickoutside from "karma-ui/util/clickoutside.js"



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KSelect",
  components: {
    KInput: __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_input_input_jsx_vue__["a" /* default */],
    KIcon: __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_icon_icon__["a" /* default */]
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
    clearable: Boolean,
    simple: Boolean,
    block: Boolean,
    icon: {
      type: Array,
      default: function _default() {
        return ["k-icon-arrow-down", "k-icon-close"];
      }
    }
  },
  data: function data() {
    return {
      modelValue: "",
      showOptionList: false,
      showDelete: false,
      //optionWrapper实例及里边包含的option列表实例
      ins: Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_layer_index__["b" /* layer */])(),
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
    focusAndScrollIntoView: function focusAndScrollIntoView() {
      this.$el.scrollIntoView({ behavior: "smooth" });
      this.$refs.input.focus();
    },
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
      // console.log(obj)
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
          [h("k-icon", {
            attrs: {
              size: "14",

              name: this.icon[1] || "k-icon-close"
            },
            "class": "k-select__clear" })]
        );
      } else {
        return h(
          "span",
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            slot: "append"
          }, {
            on: {
              "click": function click($event) {
                for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  attrs[_key2 - 1] = arguments[_key2];
                }

                (function (e) {
                  _this.$refs.input.focus();
                  e.stopPropagation();
                }).apply(undefined, [$event].concat(attrs));
              }
            }
          }]),
          [h("k-icon", {
            attrs: {
              size: "14",

              name: this.icon[0] || "k-icon-arrow-down"
            },
            "class": {
              "k-select__down": true,
              "k-select__down--up": this.ifOptionList
            } })]
        );
      }
    },

    //实例化option列表
    initIns: function initIns() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.ins.init(_this2, _this2.$slots.default, {
          bodyClassName: "k-select__list",
          tag: "div",
          bodyTag: "ul",
          canCloseByClickoutside: true
        });
      });
    },

    // scrollIntoView(index) {
    //   let i = 0
    //   if (typeof index === "number") {
    //     i = index
    //   } else {
    //     i = this.getSelectedOptionIndex()
    //     if (i === -1) {
    //       i = 0
    //     }
    //   }
    //   this.ins.$refs.body.scrollTop = offset(
    //     this.options[i].$el,
    //     this.ins.$refs.body
    //   ).top
    // },
    scrollIntoViewIfNeed: function scrollIntoViewIfNeed(index) {
      var i = 0;
      if (typeof index === "number") {
        i = index;
      } else {
        i = this.getSelectedOptionIndex();
        if (i === -1) {
          i = 0;
        }
      }
      Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__["e" /* scrollIntoViewIfNeed */])(this.options[i].$el, this.ins.$refs.body);
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
    handleKeyup: function handleKeyup(e) {
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
      this.scrollIntoViewIfNeed(i);

      e.preventDefault();
    },
    handleKeydown: function handleKeydown(e) {
      var code = e.keyCode;
      if (code == 13 || code == 40 || code == 38) e.preventDefault();
    },
    addUpDownEvent: function addUpDownEvent() {
      document.addEventListener("keyup", this.handleKeyup);
      document.addEventListener("keydown", this.handleKeydown);
    },
    removeUpDownEvent: function removeUpDownEvent() {
      document.removeEventListener("keyup", this.handleKeyup);
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
  beforeDestroy: function beforeDestroy() {
    this.ins.destroy();
  },
  updated: function updated() {
    this.initIns();
  },
  mounted: function mounted() {
    var _this4 = this;

    this.initIns();
    this.ins.$on("layer-inited", function () {
      _this4.$emit("getLayerElement", _this4.ins);
    });
    this.ins.$on("after-hide", function () {
      _this4.hideList();
    });
    this.ins.$on("mousedown", function () {
      _this4.isMouseDownOption = true;
    });
    this.ins.$on("mouseout", function () {
      _this4.isMouseDownOption = false;
    });
  },
  created: function created() {
    var _this5 = this;

    this.$on("getKeyValueFromOption", function (k, v, hide) {
      // console.log(k,v)
      _this5._change({ k: k, v: v }, hide);
    });
    this.$on("getOptionComponentName", function (name) {
      _this5.optionCompName = name;
    });
    this.$on("inovering", function (isMouseDownOption) {
      _this5.isMouseDownOption = isMouseDownOption;
      //如果鼠标离开列表，且当前焦点不是此组件的input，则隐藏列表
      if (!isMouseDownOption) {
        if (document.activeElement != _this5.$refs.input.getInputElement()) {
          _this5.hideList();
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
        this.ins.show(this.scrollIntoViewIfNeed);
        //绑定键盘上下键操作
        this.addUpDownEvent();
      } else {
        this.ins.hide();
        this.removeUpDownEvent();
      }
    },
    showOptionList: function showOptionList(v) {
      if (!v) {
        this.$emit("blur", this.$refs.input.$el);
      }
    }
  },
  directives: {
    // clickoutside,
    esc: __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_esc_js__["a" /* default */]
  },
  render: function render() {
    var _this6 = this;

    var h = arguments[0];

    var inputProps = {
      directives: [{
        name: "esc",
        value: this.hideList
      }],
      ref: "input",
      class: {
        "k-select__active": this.ifOptionList
      },
      props: {
        placeholder: this.placeholder,
        readonly: true,
        size: this.size,
        value: this.modelValue,
        disabled: this.disabled,
        simple: this.simple,
        block: this.block
      },
      on: {
        focus: function focus(e) {
          _this6.showList();
          _this6.$emit("focus", e);
          e.stopPropagation();
        },
        blur: function blur(e) {
          //失去焦点的时候，如果鼠标还在列表中呈现mousedown状态，则不隐藏
          if (!_this6.isMouseDownOption) {
            _this6.hideList();
          }
        }
      },
      nativeOn: {
        click: this.showList,
        mouseover: this.showDeleteBtn,
        mouseout: this.hideDeleteBtn
      },
      style: this.styles
    };
    return h(
      "k-input",
      inputProps,
      [this.rIcon()]
    );
  }
});

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_util_clickoutside_js__ = __webpack_require__(162);





// import esc from "karma-ui/util/esc.js"
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KLayer",
  props: {
    gap: {
      type: Number,
      default: 2
    },
    hasTransition: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      transitionType: "slide-down",
      //相对于vm定位
      //vm是 定位的依据
      vm: null,
      //插入dom的位置
      parent: null,
      //$slots.default内容
      list: null,
      //header插槽
      headerSlots: null,
      //footer插槽
      footerSlots: null,
      //表签,默认div
      tag: "div",
      bodyTag: "div",
      headerTag: "div",
      footerTag: "div",
      //位置
      left: 0,
      top: -9999,
      //外部传入的layer宽度
      width: 0,
      //外部传入的layer高度
      height: 0,
      layerWidth: 0,
      vmHeight: 0,
      vmWidth: 0,
      layerHeight: 0,
      visible: false,
      //default插槽的class
      bodyClassName: "",
      //header插槽的class
      headerClassName: "",
      //footer插槽的class
      footerClassName: "",
      //
      canCloseByClickoutside: false,
      whiteList: [],
      styles: {},
      afterEnter: function afterEnter() {},
      afterLeave: function afterLeave() {}
    };
  },

  computed: {
    transitionName: function transitionName() {
      return "k-transition-" + this.transitionType;
    }
  },
  provide: function provide() {
    return {
      layerComponent: this
    };
  },

  //下划线开始的，是内部方法。
  //不带下划线的，可供组件外部调用
  methods: {
    isObject: function isObject(d) {
      return Object.prototype.toString.call(d).toLowerCase() === "[object object]";
    },
    //初始化，插入内容，并设置一些参数
    init: function init(vm, slots, opts) {
      var _this = this;

      //opts是传入的参数，覆盖原有$data上的属性
      if (this.isObject(slots)) {
        this.list = slots.default || null;
        this.headerSlots = slots.header || null;
        this.footerSlots = slots.footer || null;
      } else {
        this.list = slots;
      }
      //className
      var bodyClasses = ["k-layer-body"];
      if (this.headerSlots) {
        bodyClasses.push("k-layer-has-header");
        this.headerClassName = "k-layer-header";
      }
      if (this.footerSlots) {
        bodyClasses.push("k-layer-has-footer");
        this.footerClassName = "k-layer-footer";
      }
      this.bodyClassName = bodyClasses.join(" ");

      this.vm = vm;
      for (var k in opts) {
        if (opts[k]) {
          this.$data[k] = opts[k];
        }
      }
      // console.log(opts.whiteList)
      this.$nextTick().then(function () {
        _this.calcLayerHeightAndGetPosition();
        _this.$emit("layer-inited");
      });
    },

    //获取与layer相关的vm的$el的位置、尺寸信息
    _getElemPosition: function _getElemPosition() {
      if (!this.vm || !this.vm.$el) {
        return;
      }
      var elem = this.vm.$el;
      if (!elem) {
        return null;
      }
      var pos = elem.getBoundingClientRect();
      this.left = pos.left + window.pageXOffset;
      this.top = pos.top + window.pageYOffset;
      if (!this.width) {
        var w = Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["b" /* getStyle */])(elem, "width");
        this.layerWidth = w;
      } else {
        this.layerWidth = this.width;
      }
      // if (!this.height) {
      var h = Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["b" /* getStyle */])(elem, "height");
      this.vmHeight = h;
      this.vmWidth = this.layerWidth;
      // } else {
      //   this.vmHeight = this.height
      // }

      this._setSizeAndPosition();
    },
    _setSizeAndPosition: function _setSizeAndPosition() {
      //屏幕可视区高度
      var clientHeight = document.documentElement.clientHeight,
          clientWidth = document.documentElement.clientWidth;
      //关联vm元素的底部距离屏幕最上边的高
      var top = this.top + parseFloat(this.vmHeight) + this.gap,
          left = this.left;
      //layer本身的高度
      var height = this.layerHeight,

      // width = this.layerWidth
      width = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["b" /* getStyle */])(this.$el, "width"));

      //5是layer距离可视区边界的大小
      var wholeHeight = clientHeight + window.pageYOffset;
      if (top + height > wholeHeight - 5) {
        top = wholeHeight - 5 - height;
        if (top < 0) {
          top = 0;
        }
      }
      // console.log(left,width,clientWidth)
      if (left + width > clientWidth - 5) {
        left = clientWidth - width - 5;
        if (left < 0) {
          left = 0;
        }
      }
      Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["f" /* setStyle */])(this.$el, {
        width: this.layerWidth,
        top: top + "px",
        left: left + "px"
      });
      if (this.height) {
        Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["f" /* setStyle */])(this.$el, {
          height: this.height
        });
      }
    },
    _handleEnter: function _handleEnter() {
      if (this.afterEnter) {
        this.afterEnter();
      }
    },
    _handleAfterLeave: function _handleAfterLeave() {
      if (this.afterLeave) {
        this.afterLeave();
      }
    },
    show: function show(callback) {
      var _this2 = this;

      this.visible = true;
      this.afterEnter = function () {
        _this2.$nextTick(function () {
          // this.calcLayerHeightAndGetPosition()
          callback && callback();
        });
      };
    },
    hide: function hide(cb) {
      this.visible = false;
      this.$emit("after-hide");
      if (cb && typeof cb === "function") {
        this.afterLeave = cb;
      }
    },
    destroy: function destroy() {
      this.$destroy();
    },
    calcLayerHeightAndGetPosition: function calcLayerHeightAndGetPosition() {
      this.layerHeight = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["b" /* getStyle */])(this.$el, "height"));
      this._getElemPosition();
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("resize", this._getElemPosition);
    this.parent.removeChild(this.$el);
  },
  destroyed: function destroyed() {},
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3._getElemPosition();
      window.addEventListener("resize", _this3._getElemPosition);
    });
  },
  updated: function updated() {
    this.$nextTick(this._getElemPosition);
  },

  watch: {
    vm: "_getElemPosition"
  },
  directives: {
    clickoutside: __WEBPACK_IMPORTED_MODULE_4_karma_ui_util_clickoutside_js__["a" /* default */]
    // esc
  },
  render: function render() {
    var _this4 = this;

    var h = arguments[0];

    var p = {
      attrs: {
        tabindex: -1
      },
      class: {
        "k-layer": true
      },
      on: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, this.$listeners, {
        mouseover: function mouseover(e) {
          _this4.$emit("mouseover", e);
        },
        mouseout: function mouseout(e) {
          _this4.$emit("mouseout", e);
        },
        mousedown: function mousedown(e) {
          _this4.$emit("mousedown", e);
        }
      }),
      style: this.styles
    };
    var transitionProps = null;
    if (this.hasTransition) {
      transitionProps = {
        on: {
          enter: this._handleEnter,
          "after-leave": this._handleAfterLeave
        },
        props: {
          name: "k-transition-slide-down"
        }
      };
      p.directives = [{
        name: "show",
        value: this.visible
      }];
      if (this.canCloseByClickoutside) {
        var list = [this.vm.$el].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(this.whiteList));
        // console.log("layer组件接收到的whiteList", list)
        p.directives.push({
          name: "clickoutside",
          value: {
            fn: this.hide,
            whiteList: list
          }
        });
      }
    }
    var content = h(
      this.tag,
      p,
      [this.headerSlots ? h(
        this.headerTag,
        {
          "class": __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, this.headerClassName, !!this.headerClassName)
        },
        [this.headerSlots]
      ) : null, h(
        this.bodyTag,
        {
          ref: "body",
          "class": __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, this.bodyClassName, !!this.bodyClassName)
        },
        [this.list]
      ), this.footerSlots ? h(
        this.footerTag,
        {
          "class": __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, this.footerClassName, !!this.footerClassName)
        },
        [this.footerSlots]
      ) : null]
    );
    if (this.hasTransition) {
      return h(
        "transition",
        transitionProps,
        [content]
      );
    }
    return content;
  }
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(13);
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(22);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 89 */
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(2);
var dP = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(11);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KOption",
  inject: ["layerComponent"],
  props: {
    tag: {
      type: String,
      default: "li"
    },
    multiple: Boolean, //是不是多选
    selected: Boolean,
    value: [String, Number, Boolean], //等同于option的value的用法，等同于key value中的key
    label: [String, Number] //实际上保存的是(key, value)中的value
  },
  methods: {
    handleClick: function handleClick(e) {
      this.emitKeyValueToSelect(!this.multiple);
      this.$emit('click', e);
    },
    emitKeyValueToSelect: function emitKeyValueToSelect() {
      var hide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.layerComponent && this.layerComponent.$data.vm.$emit("getKeyValueFromOption", this.value, this.label, !!hide //true代表要收起下拉列表
      );
    }
  },
  created: function created() {
    this.layerComponent && this.layerComponent.$data.vm.$emit("getOptionComponentName", this.$options.name);
  },
  render: function render() {
    var _this = this;

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
      on: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.$listeners, {
        click: this.handleClick,
        mousedown: function mousedown(e) {
          e.stopPropagation();
          _this.layerComponent && _this.layerComponent.$data.vm.$emit("inovering", true);
          _this.$emit('mousedown', e);
        },
        mouseup: function mouseup(e) {
          e.stopPropagation();
          _this.layerComponent && _this.layerComponent.$data.vm.$emit("inovering", false);
          _this.$emit('mouseup', e);
        }
      })
    };
    return h(
      this.tag,
      p,
      [h("span", [this.$slots.default])]
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
/* 93 */
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
    event: "checkedChange"
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
        return item == _this.value;
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
      this.$emit("checkedChange", isChecked);
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
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ScrollbarY__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ScrollbarX__ = __webpack_require__(183);

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
    trackStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    thumbStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
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
      if (this.$refs.y) {
        this.$refs.y.scroll(this.top);
      }
      if (this.$refs.x) {
        this.$refs.x.scroll(this.left);
      }
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
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
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
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(185), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(13);
var aFunction = __webpack_require__(24);
var SPECIES = __webpack_require__(4)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var invoke = __webpack_require__(187);
var html = __webpack_require__(81);
var cel = __webpack_require__(48);
var global = __webpack_require__(3);
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
  if (__webpack_require__(26)(process) == 'process') {
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
/* 100 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var isObject = __webpack_require__(10);
var newPromiseCapability = __webpack_require__(68);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_102__;

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Loading_vue__ = __webpack_require__(104);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_10dc4500_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Loading_vue__ = __webpack_require__(192);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_icon_icon__ = __webpack_require__(6);
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
        this[k] = opts[k];
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
/* 105 */
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
      if (this.exact) {
        return this.modelValue === this.value;
      }
      return this.modelValue == this.value;
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
    name: String,
    exact: Boolean
  },
  methods: {
    onChange: function onChange(e) {
      this.$emit('modelValueChange', this.state ? '' : this.value);
      this.$emit('change', e);
    }
  }
});

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_input_input_jsx_vue__ = __webpack_require__(17);
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
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_select_select_vue__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_option_option_vue__ = __webpack_require__(33);


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

// import { province, city, county } from "./areaData.js"


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KArea",
  inheritAttrs: false,
  components: {
    KSelect: __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_select_select_vue__["a" /* default */],
    KOption: __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_option_option_vue__["a" /* default */]
  },
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    level: {
      type: [Number, String],
      default: 3
    },
    province: {
      type: Array,
      default: function _default() {
        return [{}];
      }
    },
    city: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    county: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    code: [String, Number],
    selectStyle: {
      type: Object,
      default: function _default() {
        return {
          width: '90px'
        };
      }
    },
    lastSelectStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      sheng: this.province,
      shi: this.city,
      qu: this.county,
      curProvince: "",
      curCity: "",
      curCounty: ""
    };
  },

  model: {
    prop: "code",
    event: "codeChange"
  },
  computed: {
    numLevel: function numLevel() {
      return +this.level;
    },
    lastStyle: function lastStyle() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.selectStyle, this.lastSelectStyle);
    },
    sCode: function sCode() {
      return this.code + "";
    }
  },
  methods: {
    handleChange: function handleChange(e, n) {
      if (e.k === undefined) {
        if (n === 1) {

          this.$emit('codeChange', '');
          this.emit('', '', '');
        } else if (n === 2) {
          this.$emit('codeChange', this.curProvince);
          this.emit(this.curProvince, '', '');
        } else {
          this.$emit('codeChange', this.curCity);
          this.emit(this.curProvince, this.curCity, '');
        }
      }
    },
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
        var arr = (this.sheng || []).filter(function (item) {
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
      if (cityCode && code && this.shi && this.shi[cityCode]) {
        var arr = this.shi[cityCode].filter(function (item) {
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
      if (cityCode && code && this.qu && this.qu[cityCode]) {
        var arr = this.qu[cityCode].filter(function (item) {
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
    province: function province(v) {
      this.sheng = v;
      // this.$nextTick(() => {
      //   this.emit(...this.splitCode())
      // })
    },
    city: function city(v) {
      this.shi = v;
      // this.$nextTick(() => {
      //   this.emit(...this.splitCode())
      // })
    },
    county: function county(v) {
      this.qu = v;
      // this.$nextTick(() => {
      //   this.emit(...this.splitCode())
      // })
    },
    sCode: function sCode(val, oldVal) {
      // console.log(val,oldVal)
      if (val != oldVal) {
        if (val && val.length === 6) {
          this.emit.apply(this, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.splitCode()));
        } else {
          // this.curProvince = '';this.curCity = '';this.curCounty = '';
          this.emit("", "", "");
        }
      }
    },
    curProvince: function curProvince(n, old) {
      if (n == old) return;
      if (n == this.splitCode()[0]) return;
      if (n) {
        this.$emit("codeChange", n);
        //不需要再调用this.emit，因为给code赋值后，会触发watcher:sCode方法
      }
    },
    curCity: function curCity(n, old) {
      if (n == old) return;
      if (n == this.splitCode()[1]) return;
      if (n) {
        this.$emit("codeChange", n);
      }
    },
    curCounty: function curCounty(n, old) {
      if (n == old) return;
      if (n === this.splitCode()[2]) return;
      if (n) {
        this.$emit("codeChange", n);
      }
    }
  }
});

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_popup_vue__ = __webpack_require__(109);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_7e757f40_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_popup_vue__ = __webpack_require__(209);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_button_button__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_icon_icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_directives_dnd_bind_js__ = __webpack_require__(110);
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
    },
    hasBottomLine: {
      type: Boolean,
      default: true
    },
    allowBodyScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onOk: function onOk() {
      this.$emit("after-ok");
    },
    onCancel: function onCancel() {
      this.$emit("update:show", false);
      this.$emit("after-cancel");
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
  },
  watch: {
    show: function show(v) {
      var _this = this;

      if (v) {
        if (!this.allowBodyScroll) {
          document.body.classList.add("k-overflow-hidden");
        }
        this.$nextTick().then(function () {
          _this.$refs.popup.focus();
        });
      } else {
        if (!this.allowBodyScroll) {
          document.body.classList.remove("k-overflow-hidden");
        }
        if (this.$refs.popup) {
          this.$refs.popup.blur();
        }
      }
    }
  }
});

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dnd_js__ = __webpack_require__(206);

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
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_popup_popup__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_icon_icon__ = __webpack_require__(6);

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
    KPopup: __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_popup_popup__["a" /* default */],
    KIcon: __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_icon_icon__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_popup_popup__["a" /* default */].props, {
    content: String,
    hasIcon: {
      type: Boolean,
      default: true
    },
    iconName: {
      type: String,
      default: 'k-icon-question'
    },
    iconColor: String,
    iconSize: [String, Number]
  }),
  methods: {
    afterCancel: function afterCancel() {
      this.$emit("after-cancel");
    },
    afterOk: function afterOk() {
      this.$emit("after-ok");
    }
  }
});

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
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
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(elem, {
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
/* 113 */
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
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_util_object_js__ = __webpack_require__(41);


var baseStyle = {
  "min-width": "180px",
  "min-height": "120px",
  "max-width": "300px",
  "max-height": "200px"
};
var baseContent = "操作完成";

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      visible: true,
      content: baseContent,
      styles: baseStyle,
      type: "success", //'error','warning'
      timer: null
    };
  },
  render: function render() {
    var h = arguments[0];

    var p = {
      class: 'k-tips',
      style: this.styles,
      directives: [{
        name: 'show',
        value: this.visible
      }]
    };
    var tip = h(
      "div",
      p,
      [h(
        "div",
        { "class": "k-tips__tag" },
        [h("i", {
          "class": __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({
            "k-tips__icon": true
          }, "k-tips__icon--" + this.type, true)
        })]
      ), h(
        "div",
        { "class": "k-tips__cont" },
        [this.content]
      )]
    );
    return tip;
  },

  methods: {
    setType: function setType(type) {
      if (type) {
        this.type = type;
      } else {
        this.type = "success";
      }
      return this;
    },
    setStyle: function setStyle(styleObj) {
      this.styles = Object(__WEBPACK_IMPORTED_MODULE_1_karma_ui_util_object_js__["b" /* merge */])({}, baseStyle, styleObj);
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
    hide: function hide(time, cb) {
      var _this = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        if (cb && typeof cb === 'function') {
          cb();
        }
        _this.visible = false;
      }, time);
      return this;
    }
  }
});

/***/ }),
/* 115 */
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
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_select_select__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_option_option__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_input_input_jsx_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_button_button__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_icon_icon__ = __webpack_require__(6);
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
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date__ = __webpack_require__(70);

/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    $_is_in_max_min_range: function $_is_in_max_min_range(d) {
      var max = new Date(Object(__WEBPACK_IMPORTED_MODULE_0__date__["b" /* formatDate */])(this.max)) - 0;
      var min = new Date(Object(__WEBPACK_IMPORTED_MODULE_0__date__["b" /* formatDate */])(this.min)) - 0;
      d = new Date(Object(__WEBPACK_IMPORTED_MODULE_0__date__["b" /* formatDate */])(d)) - 0;
      if (max && min) {
        return d >= min && max >= d;
      } else if (!max && !min) {
        return true;
      } else if (max) {
        return d <= max;
      } else if (min) {
        return d >= min;
      }
      return true;
    }
  }
});

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__ = __webpack_require__(5);



//TODO: dom元素会插入v-enter v-enter-to等class，应如何更好的去除？
//TODO: 下拉时，有时会没有过渡效果！
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KTransition",
  // functional: true,
  props: {
    duration: {
      type: [Number, String],
      default: 350
    },
    timingFunction: {
      type: String,
      default: "ease"
    }
  },
  data: function data() {
    return {
      height: "",
      paddingTop: "",
      paddingBottom: "",
      marginBottom: "",
      marginTop: "",
      borderTopWidth: "",
      borderBottomWidth: ""
    };
  },

  methods: {
    isAppear: function isAppear(el) {
      var t = null;
      return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (res) {
        t = setInterval(function () {
          if (document.body.contains(el)) {
            clearInterval(t);
            res();
          }
        }, 0);
      });
    },
    setProperty: function setProperty(el) {
      this.height = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(el, "height");
      this.paddingTop = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(el, "paddingTop");
      this.paddingBottom = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(el, "paddingBottom");
      this.marginBottom = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(el, "marginBottom");
      this.marginTop = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(el, "marginTop");
      this.borderTopWidth = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(el, "borderTopWidth");
      this.borderBottomWidth = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(el, "borderBottomWidth");
    },
    beforeEnter: function beforeEnter(el) {
      if (document.body.contains(el)) {
        var pnode = el.parentNode;
        pnode.dataset.oldHeight = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(pnode, "height");
        pnode.dataset.oldOverflow = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["b" /* getStyle */])(pnode, "overflow");
        Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(pnode, {
          height: pnode.dataset.oldHeight,
          overflow: "hidden"
        });
        Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
          display: "block",
          visibility: "hidden"
        });
        this.setProperty(el);
        Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
          display: "none",
          visibility: "visible",
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0
        });
        pnode.removeAttribute("style");
      } else {
        var wrapper = document.createElement("div");
        wrapper.style.cssText = "height:0;overflow:hidden;";
        wrapper.appendChild(el);
        document.body.appendChild(wrapper);
        // this.offsetHeight = el.offsetHeight
        this.setProperty(el);
        document.body.removeChild(wrapper);
        Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
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
    },
    enter: function enter(el, done) {
      var _this = this;

      this.isAppear(el).then(function () {
        Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
          height: _this.height,
          opacity: 1,
          paddingTop: _this.paddingTop,
          paddingBottom: _this.paddingBottom,
          marginTop: _this.marginTop,
          marginBottom: _this.marginBottom,
          borderBottomWidth: _this.borderBottomWidth,
          borderTopWidth: _this.borderTopWidth,
          transition: _this.duration + "ms " + _this.timingFunction
        });
      });
    },
    beforeLeave: function beforeLeave(el) {
      this.setProperty(el);
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
        height: this.height,
        opacity: 1,
        paddingBottom: this.paddingBottom,
        paddingTop: this.paddingTop,
        marginTop: this.marginTop,
        marginBottom: this.marginBottom,
        borderBottomWidth: this.borderBottomWidth,
        borderTopWidth: this.borderTopWidth,
        transition: this.duration + "ms " + this.timingFunction
      });
    },
    leave: function leave(el, done) {
      setTimeout(function () {

        Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
          height: 0,
          opacity: 0,
          paddingBottom: 0,
          paddingTop: 0,
          marginTop: 0,
          marginBottom: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0
        });
      });
    },
    afterLeave: function afterLeave(el) {
      el.removeAttribute("style");
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
        display: "none"
      });
      this.$emit("after-transition");
    },
    afterEnter: function afterEnter(el) {
      el.removeAttribute('style');
      this.$emit("after-transition");
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];

    var children = this.$slots.default;
    return h(
      "transition",
      __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
        attrs: {
          enterClass: "",
          enterToClass: "",
          enterActiveClass: "",
          leaveClass: "",
          leaveToClass: "",
          leaveActiveClass: ""
        }
      }, {
        on: {
          "beforeEnter": function beforeEnter($event) {
            for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              attrs[_key - 1] = arguments[_key];
            }

            _this2.beforeEnter.apply(_this2, [$event].concat(attrs));
          },
          "enter": function enter($event) {
            for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              attrs[_key2 - 1] = arguments[_key2];
            }

            _this2.enter.apply(_this2, [$event].concat(attrs));
          },
          "afterEnter": function afterEnter($event) {
            for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              attrs[_key3 - 1] = arguments[_key3];
            }

            _this2.afterEnter.apply(_this2, [$event].concat(attrs));
          },
          "beforeLeave": function beforeLeave($event) {
            for (var _len4 = arguments.length, attrs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
              attrs[_key4 - 1] = arguments[_key4];
            }

            _this2.beforeLeave.apply(_this2, [$event].concat(attrs));
          },
          "leave": function leave($event) {
            for (var _len5 = arguments.length, attrs = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
              attrs[_key5 - 1] = arguments[_key5];
            }

            _this2.leave.apply(_this2, [$event].concat(attrs));
          },
          "afterLeave": function afterLeave($event) {
            for (var _len6 = arguments.length, attrs = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
              attrs[_key6 - 1] = arguments[_key6];
            }

            _this2.afterLeave.apply(_this2, [$event].concat(attrs));
          }
        }
      }]),
      [children]
    );
  }
});

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_props__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins___ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tableHead__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tableBody__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tableFoot__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__colGroup__ = __webpack_require__(121);









/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_4__mixins___["a" /* default */]],
  components: {
    KColGroup: __WEBPACK_IMPORTED_MODULE_8__colGroup__["a" /* default */],
    KTableHead: __WEBPACK_IMPORTED_MODULE_5__tableHead__["a" /* default */],
    KTableBody: __WEBPACK_IMPORTED_MODULE_6__tableBody__["a" /* default */],
    KTableFoot: __WEBPACK_IMPORTED_MODULE_7__tableFoot__["a" /* default */]
  },
  name: "KTable",
  props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_3__util_props__["a" /* props */]),
  model: {
    prop: "value",
    event: "valueChange"
  },
  data: function data() {
    return {
      theadTop: 0,
      tfootBottom: 0,
      currentResizeTd: null,
      showBaseLine: false,
      hoverIndex: -1
    };
  },
  provide: function provide() {
    return {
      __index: "@_index",
      __checkbox: "@_checkbox",
      __radio: "@_radio",
      __action: "@_action"
    };
  },

  computed: {
    tableWrapperClasses: function tableWrapperClasses() {
      return ["k-tablebox", "k-tablebox--" + this.size, {
        "k-tablebox--stripe": this.stripe,
        "k-tablebox--bordered": !this.simple && this.bordered,
        "k-tablebox--simple": this.simple
      }];
    },
    colGroup: function colGroup() {
      var h = this.$createElement;

      return h("k-col-group", {
        attrs: { columns: this.machiningColumns.bodyColumns }
      });
    },
    rColGroup: function rColGroup() {
      var h = this.$createElement;

      return h(
        "template",
        { slot: "colgroup" },
        [this.colGroup]
      );
    }
  },
  watch: {
    highlightValue: {
      immediate: true,
      handler: function handler(v) {
        var _this = this;

        this.$nextTick(function () {
          _this.setHighlightRow({ key: v });
        });
      }
    }
  },
  methods: {
    handleSort: function handleSort(type, col) {
      var name = col.name,
          field = col.field;

      this.$emit("sort", { type: type, field: field, name: name });
    },
    setHighlightRow: function setHighlightRow(e) {
      if (this.$refs.tbody) {
        this.$refs.tbody.setHighlightRow(e);
      }
    },
    toggleCheckedAll: function toggleCheckedAll(b) {
      var tbody = this.$refs.tbody;

      tbody && tbody.onCheckedAll(b);
    },
    canCheckRow: function canCheckRow() {
      var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var index = arguments[1];

      var can = [false, true];
      if (this.checkable && typeof this.checkable === "function") {
        can = this.checkable(row, index);
      }
      return can;
    },
    emitSelectChange: function emitSelectChange(e) {
      var _this2 = this;

      //{checked,rows,row,index}
      var sourceDataLength = this.$props.data.length;
      var cant = 0;
      this.$props.data.forEach(function (row, index) {
        if (!_this2.canCheckRow(row, index)[1]) {
          cant += 1;
        }
      });
      if (this.$refs.thead) {

        if (cant === 0) {
          this.$refs.thead.onCheckedAll(sourceDataLength > 0 && e.rows.length === sourceDataLength);
        } else {
          this.$refs.thead.onCheckedAll(sourceDataLength > 0 && e.rows.length === sourceDataLength - cant);
        }
      }
      this.$emit("update:selectedRows", e.rows);
      this.$emit("update:selectedKeys", e.keys);
      this.$emit("select-change", /*JSON.parse(JSON.stringify(e))*/e);
    },
    emitHighlight: function emitHighlight(e) {
      this.setHighlightRow(e);
      this.$emit("update:highlightValue", e.value);
      this.$emit("toggle-highlight", e);
    },
    emitRadioChange: function emitRadioChange(e) {
      //{radioKey的值value，row,index}
      this.$emit("valueChange", e.value);
      //向组件外发射
      this.$emit("radio-change", e);
    },
    emitDblclickRow: function emitDblclickRow(e) {
      this.$emit("dblclick-row", e);
    },
    emitAddRow: function emitAddRow(e) {
      this.$emit("add-row", e);
    },
    emitDeleteRow: function emitDeleteRow(e) {
      this.$emit("delete-row", e);
    },
    onTableWrapperScroll: function onTableWrapperScroll() {
      var _$refs = this.$refs,
          thead = _$refs.thead,
          tfoot = _$refs.tfoot,
          mainTable = _$refs.mainTable;

      if (mainTable) {
        var tar = mainTable;
        var scrollTop = tar.scrollTop;
        var scrollLeft = tar.scrollLeft;
        var scrollHeight = tar.scrollHeight;
        var clientHeight = tar.clientHeight;
        if (thead) {
          var theadEl = thead.$el;
          this.theadTop = scrollTop;
          theadEl.style.top = scrollTop + "px";
        }
        if (tfoot) {
          this.tfootBottom = scrollHeight - clientHeight - scrollTop;
        }
      }
    },
    init: function init() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.onTableWrapperScroll();
        window.addEventListener("resize", _this3.onTableWrapperScroll);
      });
    },

    //e是事件对象，el是当前要调整宽度的单元格，index是第几个单元格
    handleResizeDown: function handleResizeDown(e, el, index) {
      this.currentResizeTd = el;
      document.addEventListener("mousemove", this.handleResizeMove);
      document.addEventListener("mouseup", this.handleResizeUp);
      var scrollLeft = this.$refs.mainTable.scrollLeft;
      var tdOldWidth = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom__["b" /* getStyle */])(el, "width"));
      var totalHeight = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom__["b" /* getStyle */])(this.$refs.mainTable, "height");
      var baseLine = this.$refs.baseLine;
      var left = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom__["c" /* offset */])(el, this.$el).left + tdOldWidth - scrollLeft;
      baseLine.style.height = totalHeight;
      baseLine.style.left = left + 1 + "px";
      this.currentResizeTd.startX = e.clientX;
      this.currentResizeTd.tdOldWidth = tdOldWidth;
      this.currentResizeTd.baseLineLeft = left;
      this.currentResizeTd.colIndex = index;
      this.showBaseLine = true;
    },
    handleResizeMove: function handleResizeMove(e) {
      var el = this.currentResizeTd;
      var dx = e.clientX - el.startX;
      // const scrollLeft = this.$refs.mainTable.scrollLeft
      // this.$refs.baseLine.style.left = scrollLeft + el.baseLineLeft + dx + "px"
      this.$refs.baseLine.style.left = el.baseLineLeft + dx + "px";
    },
    handleResizeUp: function handleResizeUp(e) {
      var _$refs2 = this.$refs,
          mainTable = _$refs2.mainTable,
          leftTable = _$refs2.leftTable,
          rightTable = _$refs2.rightTable;

      this.resizeColumnWidth(mainTable, e);
      leftTable && this.resizeColumnWidth(leftTable, e);
      rightTable && this.resizeColumnWidth(rightTable, e);

      this.showBaseLine = false;
      this.currentResizeTd = null;
      document.removeEventListener("mousemove", this.handleResizeMove);
      document.removeEventListener("mouseup", this.handleResizeUp);
    },
    resizeColumnWidth: function resizeColumnWidth(t, e) {
      var _currentResizeTd = this.currentResizeTd,
          colIndex = _currentResizeTd.colIndex,
          startX = _currentResizeTd.startX,
          tdOldWidth = _currentResizeTd.tdOldWidth;

      if (t) {
        var head = t.querySelector(".k-theadwrapper"),
            body = t.querySelector(".k-tbodywrapper"),
            foot = t.querySelector(".k-tfootwrapper"),
            resize = function resize(el) {
          if (el) {
            var cols = el.querySelectorAll("col");
            if (cols) {
              cols[+colIndex].style.width = tdOldWidth + e.clientX - startX + "px";
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
          class: ["k-table-base-line"],
          ref: "baseLine",
          directives: [{
            name: "show",
            value: this.showBaseLine
          }]
        };
        return h("div", p);
      }
    },
    rTfoot: function rTfoot(baseProps) {
      var h = this.$createElement;

      if (this.hasSum) {
        var colgroup = h(
          "template",
          { slot: "colgroup" },
          [this.colGroup]
        );
        return h(
          __WEBPACK_IMPORTED_MODULE_7__tableFoot__["a" /* default */],
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([baseProps, { ref: "tfoot", attrs: { bottom: this.tfootBottom }
          }]),
          [colgroup]
        );
      }
    }
  },
  updated: function updated() {
    this.onTableWrapperScroll();
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("resize", this.onTableWrapperScroll);
  },
  render: function render() {
    var _this4 = this;

    var h = arguments[0];
    var _machiningColumns = this.machiningColumns,
        bodyColumns = _machiningColumns.bodyColumns,
        headColumns = _machiningColumns.headColumns;
    //对columns进行初步处理，剔除null/undefined/false/''等无效的列

    // 2. 整理出来colgroup

    var colgroup = h(
      "template",
      { slot: "colgroup" },
      [this.colGroup]
    );
    var tableWrapperProps = {
      ref: "mainTable",
      class: [this.tableWrapperClasses, {
        "k-no-select": this.showBaseLine
      }],
      style: {
        height: this.height,
        maxHeight: this.maxHeight,
        minHeight: this.minHeight
      },
      on: {
        scroll: this.onTableWrapperScroll
      }
    };
    var baseProps = {
      props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.$props, {
        columns: bodyColumns
      })
    };
    var headProps = {
      class: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, baseProps.class),
      props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, baseProps.props, {
        columns: headColumns,
        top: this.theadTop
      }),
      on: {
        handleResizeDown: this.handleResizeDown,
        togglechecked: this.toggleCheckedAll,
        sort: this.handleSort
      }
    };
    var bodyProps = {
      props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, baseProps.props, {
        hoverIndex: this.hoverIndex,
        bodyScopedSlots: this.$scopedSlots
      }),
      on: {
        "add-row": this.emitAddRow,
        "delete-row": this.emitDeleteRow,
        "dblclick-row": this.emitDblclickRow,
        "toggle-radio-row": this.emitRadioChange,
        "toggle-highlight": this.emitHighlight,
        "select-change": this.emitSelectChange,
        "update:hoverIndex": function updateHoverIndex(i) {
          _this4.hoverIndex = i;
        }
      }
    };
    var footProps = null;
    if (this.hasSum) {
      footProps = {
        props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, baseProps.props, {
          bottom: this.tfootBottom
        })
      };
    }
    return h(
      "div",
      { "class": "k-tableouter" },
      [h(
        "div",
        tableWrapperProps,
        [this.hasThead ? h(
          __WEBPACK_IMPORTED_MODULE_5__tableHead__["a" /* default */],
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([headProps, { ref: "thead" }]),
          [colgroup]
        ) : null, h(
          __WEBPACK_IMPORTED_MODULE_6__tableBody__["a" /* default */],
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([bodyProps, { ref: "tbody" }]),
          [colgroup]
        ), this.hasSum ? h(
          __WEBPACK_IMPORTED_MODULE_7__tableFoot__["a" /* default */],
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([footProps, { ref: "tfoot" }]),
          [colgroup]
        ) : null]
      ), this.rBaseLine()]
    );
  }
});

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export throttle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return debounce; });
/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
function throttle(delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */

  function wrapper() {
    var self = this;
    var elapsed = Date.now() - lastExec;
    var args = arguments;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */

    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

/* eslint-disable no-undefined */
/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  [atBegin]     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */

function debounce(delay, atBegin, callback) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}



/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(72);
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
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__treeList__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_karma_ui_util_getAllParent__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__props__ = __webpack_require__(74);






var _name$components$name;




/* harmony default export */ __webpack_exports__["a"] = (_name$components$name = {
  name: "KTree",
  components: {
    KTreeList: __WEBPACK_IMPORTED_MODULE_5__treeList__["a" /* default */]
  }
}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_name$components$name, "name", "KTree"), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_name$components$name, "provide", function provide() {
  return {
    tree: this,
    souceData: this.souceData
  };
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_name$components$name, "props", __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__props__["a" /* default */], {
  //当前选择的那个节点，keyField对应的值
  value: [String, Number]
})), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_name$components$name, "model", {
  prop: "value",
  event: "valueChange"
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_name$components$name, "data", function data() {
  var d = this.processData();
  return {
    currentValue: this.value,
    checkedKeys: JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(this.selectedKeys)),
    checkedData: JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(this.selectedData)),
    sourceData: d
  };
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_name$components$name, "computed", {
  // sourceData() {

  // }
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_name$components$name, "methods", {
  //对传入组件的data数据进行加工处理
  processData: function processData() {
    var childField = this.childField;
    function fn(data) {
      data.forEach(function (item) {
        if (!("__open__" in item)) {
          item.__open__ = false;
        }
        if (item[childField] && item[childField].length) {
          fn(item[childField]);
        }
      });
    }
    fn(this.data);
    return this.data;
  },
  toPure: function toPure(arr) {
    if (Array.isArray(arr)) return JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(arr)).map(function (item) {
      delete item.__open__;
      return item;
    });
    arr = JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(arr));
    delete arr.__open__;
    return arr;
  },
  spreadParent: function spreadParent(v) {
    //根据当前节点找到所有父级节点，并将其__open__置为true
    var keyField = this.keyField,
        childField = this.childField,
        sourceData = this.sourceData;

    if (sourceData.length) {

      var arr = Object(__WEBPACK_IMPORTED_MODULE_6_karma_ui_util_getAllParent__["a" /* default */])(sourceData, v, keyField, childField);

      arr.slice(0, -1).forEach(function (item) {
        item.__open__ = true;
      });
      this.$emit("toggle", arr);
    }
  },
  createCheckedDataByCheckedKeys: function createCheckedDataByCheckedKeys(k) {
    var sourceData = this.sourceData,
        keyField = this.keyField,
        textField = this.textField,
        childField = this.childField;

    var set = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default.a(k.map(function (t) {
      return t + "";
    }));
    var arr = [];
    function fn(data) {
      data.forEach(function (item) {
        if (set.has(item[keyField] + "")) {
          var __open__ = item.__open__,
              others = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(item, ["__open__"]);

          arr.push(others);
        }
        if (item[childField] && item[childField].length) {
          fn(item[childField]);
        }
      });
    }
    fn(sourceData);
    this.checkedData = arr;
  },
  isSameKeys: function isSameKeys(arr1, arr2) {
    var a1 = JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(arr1)).sort(function (x, y) {
      return x - y;
    }).join(',');
    var a2 = JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(arr2)).sort(function (x, y) {
      return x - y;
    }).join(',');
    return a1 === a2;
  }
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_name$components$name, "render", function render() {
  var h = arguments[0];

  var p = {
    props: __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, this.$props, {
      data: this.sourceData,
      active: this.currentValue,
      scopedSlots: this.$scopedSlots
    }),
    on: {
      toggle: function toggle(e) {
        // 暂时用不到这种方式
        // console.log(e, e[this.keyField])
        // this.currentValue = e[this.keyField]
      }
    }
  };

  return h("k-tree-list", p);
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_name$components$name, "watch", {
  sourceData: {
    deep: true,
    handler: function handler(d, oldD) {
      if (__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(d) !== __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(oldD)) this.$emit('update:data', d);
    }
  },
  data: {
    deep: true,
    handler: function handler(d, oldD) {
      if (__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(d) === __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(oldD)) {
        return;
      }
      this.sourceData = this.processData();
      if (this.value) this.spreadParent(this.value);
    }
  },
  checkedKeys: function checkedKeys(k, oldKeys) {
    if (!this.isSameKeys(k, oldKeys)) {
      this.$emit("update:selectedKeys", k);
      this.createCheckedDataByCheckedKeys(k);
    }
    //todo: 选中的树形数据
  },
  selectedKeys: function selectedKeys(k, oldKeys) {
    if (!this.isSameKeys(k, this.checkedKeys)) {
      this.checkedKeys = k;
    }
  },
  checkedData: function checkedData(d) {
    this.$emit("update:selectedData", d);
  },
  selectedData: function selectedData(d) {
    this.checkedData = d;
  },
  currentValue: function currentValue(v) {
    this.$emit("valueChange", v);
  },

  value: {
    immediate: true,
    handler: function handler(v) {
      this.currentValue = v;
      if (v !== undefined && v !== '') {
        //如果value是从组件外部改变的，则需要展开其父级
        this.spreadParent(v);
      }
    }
  }
}), _name$components$name);

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_tree_treeItem__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__props__ = __webpack_require__(74);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KTreeList",
  components: {
    KTreeItem: __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_tree_treeItem__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_2__props__["a" /* default */], {
    scopedSlots: Object,
    active: [String, Number] //当前选择的节点数据
  }),
  data: function data() {
    return {
      // dataList: this.data
    };
  },

  watch: {
    // data(d) {
    //   this.dataList = d
    // }
  },
  computed: {
    treeProps: function treeProps() {
      return {
        class: ["k-tree", {
          "k-tree--big": this.size && this.size.trim() === "big"
        }]
      };
    }
  },
  methods: {
    toggle: function toggle(e) {
      //暂时用不到这种方式
      // this.$emit('toggle',e)
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var sourceData = this.data,
        treeProps = this.treeProps;

    var len = sourceData.length - 1;
    var root = sourceData.map(function (item, i) {
      var treeItemProps = {
        key: item[_this.keyField],
        props: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, _this.$props, {
          item: item,
          isLastOne: i === len,
          spread: item.__open__
        }),
        on: {
          toggle: _this.toggle,
          "update:spread": function updateSpread(b, el) {
            // console.log(this.$children)
            item.__open__ = b;

            if (b) {
              _this.$children.forEach(function (child) {
                if (child.$el != el) {
                  child.open = false;
                } else {
                  child.open = true;
                }
              });
            }
          }
        }
      };
      return h("k-tree-item", treeItemProps);
    });
    return h(
      "div",
      treeProps,
      [root]
    );
  }
});

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);

//树形结构数据中，给定一个数值，和此数值对应的字段名，child字段名，找出此节点以及所有父级节点
/* harmony default export */ __webpack_exports__["a"] = (function (source, val, keyField, childField) {
  var arr = [],
      copyArr = [],
      lastObj = {};
  function findFromArr(arrData, val, keyField) {
    for (var i = 0, len = arrData.length; i < len; i++) {
      var item = arrData[i];
      if (item[keyField] == val) {
        return item;
      }
    }
  }
  function findFromArr2(arrData, val, keyField, childField) {
    for (var i = 0, len = arrData.length; i < len; i++) {
      lastObj = arrData[i];

      if (lastObj[keyField] == val) {
        arr.unshift(lastObj);
        break;
      } else {
        if (lastObj[childField] && lastObj[childField].length) {
          var b = findFromArr(lastObj[childField], val, keyField);
          if (b) {
            arr.unshift(lastObj, b);
            break;
          } else {
            findFromArr2(lastObj[childField], val, keyField, childField);
          }
        }
      }
    }
  }
  function findAllParent(arrData, val, keyField, childField) {
    //找到当前节点和他的直接父级
    findFromArr2(arrData, val, keyField, childField);
    if (arr.length > 1 && arr[0]) {
      copyArr.unshift.apply(copyArr, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(arr));
      var itemV = arr[0][keyField];
      arr = [];
      if (itemV) {
        findAllParent(arrData, itemV, keyField, childField);
      }
    } else if (arr.length === 1) {
      copyArr.unshift(arr[0]);
    }
  }
  function uniq(source, keyField) {
    var arr = source && [source[0]] || [];
    if (arr.length === 0) {
      return arr;
    }
    source.slice(1).forEach(function (item) {
      if (arr.every(function (el) {
        return item[keyField] != el[keyField];
      })) {
        arr.push(item);
      }
    });
    return arr;
  }
  findAllParent(source, val, keyField, childField);
  return uniq(copyArr, keyField);
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(126);


/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_util_setPropsGlobal_js__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_theme_font_iconfont_css__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_theme_font_iconfont_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_karma_ui_theme_font_iconfont_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_theme_index_css__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_theme_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_karma_ui_theme_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_button_index_js__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_input_index_js__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_select_index_js__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_select2_index_js__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_karma_ui_packages_option_index_js__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_radio_index_js__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_karma_ui_packages_checkbox_index_js__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_karma_ui_packages_switch_index_js__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_input_number_index_js__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_area_index_js__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_karma_ui_packages_popup_index_js__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_karma_ui_packages_dialog_index_js__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_karma_ui_packages_carousel_index_js__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_karma_ui_packages_carousel_item_index_js__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_karma_ui_packages_tips_index_js__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_karma_ui_packages_loading_index_js__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_karma_ui_packages_to_top_index_js__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_karma_ui_packages_pagination_index_js__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_karma_ui_packages_date_picker_index_js__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_karma_ui_packages_scrollbar_index_js__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_karma_ui_packages_transition_index_js__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_karma_ui_packages_table_index_js__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_karma_ui_packages_table2_index_js__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_karma_ui_packages_layer_index_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_karma_ui_packages_board_index_js__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_karma_ui_packages_icon_index_js__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_karma_ui_packages_auto_complete_index_js__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_karma_ui_packages_tree_index_js__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_karma_ui_packages_dropdown_index_js__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_karma_ui_packages_select_tree_index_js__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_karma_ui_directives_dnd_index_js__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_karma_ui_directives_pin_index_js__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_karma_ui_directives_viewable_index_js__ = __webpack_require__(255);

































//指令




var obj = {
  KButton: __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_button_index_js__["a" /* default */],
  KInput: __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_input_index_js__["a" /* default */],
  KSelect: __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_select_index_js__["a" /* default */],
  KSelect2: __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_select2_index_js__["a" /* default */],
  KOption: __WEBPACK_IMPORTED_MODULE_7_karma_ui_packages_option_index_js__["a" /* default */],
  KRadio: __WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_radio_index_js__["a" /* default */],
  KCheckbox: __WEBPACK_IMPORTED_MODULE_9_karma_ui_packages_checkbox_index_js__["a" /* default */],
  KSwitch: __WEBPACK_IMPORTED_MODULE_10_karma_ui_packages_switch_index_js__["a" /* default */],
  KInputNumber: __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_input_number_index_js__["a" /* default */],
  KArea: __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_area_index_js__["a" /* default */],
  KPopup: __WEBPACK_IMPORTED_MODULE_13_karma_ui_packages_popup_index_js__["a" /* default */],
  Dialog: __WEBPACK_IMPORTED_MODULE_14_karma_ui_packages_dialog_index_js__["a" /* default */],
  KToTop: __WEBPACK_IMPORTED_MODULE_19_karma_ui_packages_to_top_index_js__["a" /* default */],
  KIcon: __WEBPACK_IMPORTED_MODULE_28_karma_ui_packages_icon_index_js__["a" /* default */],
  Tips: __WEBPACK_IMPORTED_MODULE_17_karma_ui_packages_tips_index_js__["a" /* default */],
  Loading: __WEBPACK_IMPORTED_MODULE_18_karma_ui_packages_loading_index_js__["a" /* default */],
  Dnd: __WEBPACK_IMPORTED_MODULE_33_karma_ui_directives_dnd_index_js__["a" /* default */],
  Pin: __WEBPACK_IMPORTED_MODULE_34_karma_ui_directives_pin_index_js__["a" /* default */],
  KCarousel: __WEBPACK_IMPORTED_MODULE_15_karma_ui_packages_carousel_index_js__["a" /* default */],
  KCarouselItem: __WEBPACK_IMPORTED_MODULE_16_karma_ui_packages_carousel_item_index_js__["a" /* default */],
  Viewable: __WEBPACK_IMPORTED_MODULE_35_karma_ui_directives_viewable_index_js__["a" /* default */],
  KPagination: __WEBPACK_IMPORTED_MODULE_20_karma_ui_packages_pagination_index_js__["a" /* default */],
  KDatePicker: __WEBPACK_IMPORTED_MODULE_21_karma_ui_packages_date_picker_index_js__["a" /* default */],
  KScrollbar: __WEBPACK_IMPORTED_MODULE_22_karma_ui_packages_scrollbar_index_js__["a" /* default */],
  KTransition: __WEBPACK_IMPORTED_MODULE_23_karma_ui_packages_transition_index_js__["a" /* default */],
  KTable: __WEBPACK_IMPORTED_MODULE_24_karma_ui_packages_table_index_js__["a" /* default */],
  KTable2: __WEBPACK_IMPORTED_MODULE_25_karma_ui_packages_table2_index_js__["a" /* default */],
  KLayer: __WEBPACK_IMPORTED_MODULE_26_karma_ui_packages_layer_index_js__["a" /* default */],
  board: __WEBPACK_IMPORTED_MODULE_27_karma_ui_packages_board_index_js__["a" /* default */],
  KAutoComplete: __WEBPACK_IMPORTED_MODULE_29_karma_ui_packages_auto_complete_index_js__["a" /* default */],
  KTree: __WEBPACK_IMPORTED_MODULE_30_karma_ui_packages_tree_index_js__["a" /* default */],
  KDropdown: __WEBPACK_IMPORTED_MODULE_31_karma_ui_packages_dropdown_index_js__["a" /* default */],
  KSelectTree: __WEBPACK_IMPORTED_MODULE_32_karma_ui_packages_select_tree_index_js__["a" /* default */]
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
/* 127 */
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
        if (prop in options) {
          props[prop].default = options[prop];
        }
      }
    }
  }
});

/***/ }),
/* 128 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 129 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_jsx__ = __webpack_require__(23);

__WEBPACK_IMPORTED_MODULE_0__button_jsx__["a" /* default */].install = function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  Vue.component(__WEBPACK_IMPORTED_MODULE_0__button_jsx__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__button_jsx__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__button_jsx__["a" /* default */]);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(132);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(7);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(133) });


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(56);
var pIE = __webpack_require__(38);
var toObject = __webpack_require__(39);
var IObject = __webpack_require__(50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(19)(function () {
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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(20);
var toLength = __webpack_require__(36);
var toAbsoluteIndex = __webpack_require__(135);
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
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(52);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(137);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(11), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__ = __webpack_require__(17);

__WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__input_jsx_vue__["a" /* default */]);

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_reg_index_js__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_object_js__ = __webpack_require__(41);



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
      return Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_object_js__["b" /* merge */])({}, baseOpts, this.validate);
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

    this.validateOptions.showTips && fail && this.$tips().setContent(msg).setType('error').hide(1500);

    !fail && successCallback && successCallback();
    fail && errorCallback && errorCallback(errorType);
  }), _methods)
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(29);
module.exports = __webpack_require__(59).f('iterator');


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(52);
var defined = __webpack_require__(51);
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

"use strict";

var create = __webpack_require__(58);
var descriptor = __webpack_require__(25);
var setToStringTag = __webpack_require__(28);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(13);
var getKeys = __webpack_require__(35);

module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(16);
var toObject = __webpack_require__(39);
var IE_PROTO = __webpack_require__(53)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(147);
var step = __webpack_require__(82);
var Iterators = __webpack_require__(22);
var toIObject = __webpack_require__(20);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(57)(Array, 'Array', function (iterated, kind) {
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
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
__webpack_require__(62);
__webpack_require__(154);
__webpack_require__(155);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(16);
var DESCRIPTORS = __webpack_require__(11);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(80);
var META = __webpack_require__(60).KEY;
var $fails = __webpack_require__(19);
var shared = __webpack_require__(54);
var setToStringTag = __webpack_require__(28);
var uid = __webpack_require__(37);
var wks = __webpack_require__(4);
var wksExt = __webpack_require__(59);
var wksDefine = __webpack_require__(61);
var enumKeys = __webpack_require__(151);
var isArray = __webpack_require__(83);
var anObject = __webpack_require__(13);
var isObject = __webpack_require__(10);
var toIObject = __webpack_require__(20);
var toPrimitive = __webpack_require__(49);
var createDesc = __webpack_require__(25);
var _create = __webpack_require__(58);
var gOPNExt = __webpack_require__(152);
var $GOPD = __webpack_require__(153);
var $DP = __webpack_require__(9);
var $keys = __webpack_require__(35);
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
  __webpack_require__(84).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(38).f = $propertyIsEnumerable;
  __webpack_require__(56).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(27)) {
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(56);
var pIE = __webpack_require__(38);
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
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(20);
var gOPN = __webpack_require__(84).f;
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
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(38);
var createDesc = __webpack_require__(25);
var toIObject = __webpack_require__(20);
var toPrimitive = __webpack_require__(49);
var has = __webpack_require__(16);
var IE8_DOM_DEFINE = __webpack_require__(76);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(11) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61)('asyncIterator');


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61)('observable');


/***/ }),
/* 156 */
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
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select_vue__ = __webpack_require__(63);

__WEBPACK_IMPORTED_MODULE_0__select_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__select_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__select_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__select_vue__["a" /* default */]);

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(159), __esModule: true };

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(160);
module.exports = __webpack_require__(2).Array.from;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(14);
var $export = __webpack_require__(7);
var toObject = __webpack_require__(39);
var call = __webpack_require__(87);
var isArrayIter = __webpack_require__(88);
var toLength = __webpack_require__(36);
var createProperty = __webpack_require__(161);
var getIterFn = __webpack_require__(64);

$export($export.S + $export.F * !__webpack_require__(89)(function (iter) { Array.from(iter); }), 'Array', {
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
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(9);
var createDesc = __webpack_require__(25);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ctx = "___clickoutside";
var downTarget = "___downTarget";
var upTarget = "___upTarget";
/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding) {
    //update里也有事件函数，如何合并？
    var fn = function fn(e) {
      if (e.type === "mousedown") {
        el[downTarget] = e.target;
      } else if (e.type === "mouseup") {
        el[upTarget] = e.target;
      }
      if (el.contains(el[downTarget]) || el.contains(el[upTarget])) {
        return;
      } else if (binding.value.whiteList && binding.value.whiteList.length) {
        //如果设置了白名单的情况
        var target = e.target;
        // console.log(binding.value.whiteList)
        if (binding.value.whiteList.some(function (elem) {
          // console.log(elem == target , elem.contains(target))
          return elem == target || elem.contains(target);
        })) {
          return;
        }
      }
      el[ctx].bindingFn(e);
    };
    el[ctx] = {
      documentHandler: fn,
      methodName: binding.expression,
      bindingFn: binding.value.fn ? binding.value.fn : binding.value
      // document.addEventListener('click', el[ctx].documentHandler)
    };document.addEventListener("mousedown", el[ctx].documentHandler);
    document.addEventListener("mouseup", el[ctx].documentHandler);
  },
  update: function update(el, binding) {
    //有变动时，特别是白名单的变动，重新绑定事件！
    //否则仍然使用的是bind时的白名单
    document.removeEventListener("mousedown", el[ctx].documentHandler);
    document.removeEventListener("mouseup", el[ctx].documentHandler);
    el[ctx].documentHandler = function (e) {
      if (e.type === "mousedown") {
        el[downTarget] = e.target;
      } else if (e.type === "mouseup") {
        el[upTarget] = e.target;
      }
      if (el.contains(el[downTarget]) || el.contains(el[upTarget])) {
        return;
      } else if (binding.value.whiteList && binding.value.whiteList.length) {
        //如果设置了白名单的情况
        var target = e.target;
        if (binding.value.whiteList.some(function (elem) {
          return elem == target || elem.contains(target);
        })) {
          return;
        }
      }
      el[ctx].bindingFn(e);
    };
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value.fn ? binding.value.fn : binding.value;
    document.addEventListener("mousedown", el[ctx].documentHandler);
    document.addEventListener("mouseup", el[ctx].documentHandler);
  },
  unbind: function unbind(el) {
    // document.removeEventListener('click', el[ctx].documentHandler)
    document.removeEventListener("mousedown", el[ctx].documentHandler);
    document.removeEventListener("mouseup", el[ctx].documentHandler);
    delete el[ctx];
    delete el[upTarget];
    delete el[downTarget];
  }
});

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select2__ = __webpack_require__(164);

__WEBPACK_IMPORTED_MODULE_0__select2__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__select2__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__select2__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__select2__["a" /* default */]);

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_input_input_jsx_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_karma_ui_packages_button_button_jsx__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_layer_index__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_karma_ui_util_esc__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_karma_ui_packages_icon_icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_option_option__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_checkbox_checkbox__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_karma_ui_packages_scrollbar_Scrollbar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_karma_ui_directives_loading_index__ = __webpack_require__(45);















/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KSelect2",
  components: {
    KInput: __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_input_input_jsx_vue__["a" /* default */],
    KButton: __WEBPACK_IMPORTED_MODULE_7_karma_ui_packages_button_button_jsx__["a" /* default */],
    KIcon: __WEBPACK_IMPORTED_MODULE_10_karma_ui_packages_icon_icon__["a" /* default */],
    KOption: __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_option_option__["a" /* default */],
    KCheckbox: __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_checkbox_checkbox__["a" /* default */],
    ScrollBar: __WEBPACK_IMPORTED_MODULE_13_karma_ui_packages_scrollbar_Scrollbar__["a" /* default */]
  },
  props: {
    //数据源，目前只支持Array类型
    data: [Array, Object],
    //多选的值，可以是数组、字符串（可以用逗号分隔）、单个数值
    value: [Array, String, Number],
    //选择基准关键字
    keyField: {
      type: String,
      default: "Id"
    },
    //描述，data中的字段名
    textField: String,
    placeholder: String,
    searchPlaceholder: String,
    //模糊匹配需要搜索的字段
    searchField: {
      type: [String, Array],
      default: "Name"
    },
    block: Boolean,
    simple: Boolean,
    layerWidth: {
      type: [String, Boolean],
      default: "auto"
    },
    hasClose: {
      type: Boolean,
      default: true
    },
    hasRefresh: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    var arr = [];
    if (this.value) {
      arr = this.toArray(this.value);
    }
    return {
      //存储用户选择
      dataValue: arr,
      //下拉列表实例
      layerIns: Object(__WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_layer_index__["b" /* layer */])(),
      //搜索关键字
      searchText: "",
      //记录状态：下拉列表是否可见
      visible: false,
      //全选
      isCheckedAll: false,
      //通过键盘上下箭头选择的当前数据行的index
      currentIndex: -1
    };
  },

  model: {
    prop: "value",
    event: "valueChange"
  },
  computed: {
    filterData: function filterData() {
      var arr = [];
      if (this.searchText.trim() !== "") {
        //将用户输入，转化成关键字数组，以逐个匹配
        var arrText = this.searchText.toLowerCase().split(/\s+/);
        var arrField = typeof this.searchField === "string" ? [this.searchField] : Array.isArray(this.searchField) ? this.searchField : [];
        if (arrField.length === 0) {
          console.warn(this.$options.name + "\u662F\u5426\u6CA1\u6709\u4F20\u5165searchField\u53C2\u6570\uFF1F");
        }
        //搜索出来
        this.data.forEach(function (item) {
          var has = false;
          arrField.forEach(function (field) {
            var fieldText = (item[field] + "").toLowerCase();
            arrText.forEach(function (text) {
              text = (text + "").trim();
              if (fieldText.indexOf(text) > -1) {
                has = true;
              }
            });
          });
          if (has) {
            arr.push(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, item));
          }
        });
      } else {
        arr = this.data;
      }
      return arr;
    }
  },
  methods: {
    toArray: function toArray(v) {
      var arr = [];
      if (Array.isArray(v)) {
        arr = JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(v));
      } else if (typeof v === "string") {
        arr = v.split(/\s*,\s*/);
      } else if (typeof v === "number") {
        arr = [v + ""];
      }
      return arr;
    },
    rBox: function rBox() {
      var _this = this;

      var h = this.$createElement;

      var p = {
        ref: "boxInput",
        props: {
          active: this.visible,
          readonly: true,
          placeholder: this.dataValue.length ? "" : this.placeholder,
          block: true,
          simple: this.simple
        },
        on: {
          focus: function focus(e) {
            _this.showLayer();
          }
        }
      };
      return h("k-input", p);
    },

    //搜索匹配框、全选
    rSearchInput: function rSearchInput() {
      var _this2 = this;

      var h = this.$createElement;

      var p = {
        class: "k-select2-searchinput",
        props: {
          clearable: true,
          size: "small",
          placeholder: this.searchPlaceholder,
          block: true,
          value: this.searchText,
          simple: this.simple
          // active: this.visible
        },
        ref: "searchInput",
        on: {
          valueChange: function valueChange(v) {
            _this2.currentIndex = -1;
            _this2.searchText = v;
          },
          input: function input(e) {}
        }
      };
      var checkProps = {
        props: {
          checked: this.isCheckedAll
        },
        on: {
          checkedChange: function checkedChange(b) {
            if (b) {
              var set = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default.a(_this2.dataValue);
              var filterData = _this2.filterData;
              filterData.forEach(function (el) {
                set.add(el[_this2.keyField] + "");
              });
              _this2.dataValue = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(set));
            } else {
              _this2.dataValue = [];
            }

            _this2.emitValue();
            // this.$forceUpdate()
          }
        }
      };
      return h("div", [h(
        "k-input",
        p,
        [h(
          "span",
          { "class": "k-select2-check-all", slot: "prepend" },
          [h("k-checkbox", checkProps)]
        )]
      )]);
    },

    //数据列表
    rList: function rList() {
      var _this3 = this;

      var h = this.$createElement;

      var filterData = this.filterData;
      if (filterData) {
        var list = [];
        if (Array.isArray(filterData)) {
          list = filterData.map(function (item, index) {
            var p = {
              ref: "filterDataList" + item[_this3.keyField],
              class: "k-select2-checkbox",
              props: {
                text: item[_this3.textField],
                value: item[_this3.keyField],
                checked: _this3.dataValue.some(function (id) {
                  return id == item[_this3.keyField];
                })
              },
              on: {
                checkedChange: function checkedChange(checked) {
                  var set = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default.a(_this3.dataValue);
                  var v = item[_this3.keyField] + "";
                  if (checked) {
                    set.add(v);
                  } else {
                    set.delete(v);
                  }
                  _this3.dataValue = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(set));
                  _this3.emitValue();
                  // this.$forceUpdate()
                }
              }
            };
            var itemClass = {
              "k-select2-list-item": true,
              "k-select2-list-item-hover": _this3.currentIndex === index
            };
            return h(
              "div",
              { "class": itemClass },
              [h("k-checkbox", p)]
            );
          });
        } else {
          for (var k in filterData) {
            // list.push(
            //   <div>
            //     <k-checkbox text={dataList[k]} />
            //   </div>
            // )
          }
        }
        var select2ListProp = {
          class: 'k-select2-list',
          directives: [{
            name: 'loading',
            value: {
              loading: this.data.length === 0,
              content: '数据获取中...'
            }
          }]
        };
        return h(
          "div",
          select2ListProp,
          [list]
        );
      }
    },

    //用户选择的数据名称列表
    rCheckedList: function rCheckedList() {
      var _this4 = this;

      var h = this.$createElement;

      var dataValue = this.dataValue;
      var filterData = this.data;
      var keyField = this.keyField;
      var textField = this.textField;
      var arr = [];
      var list = null;
      if (dataValue.length) {
        if (Array.isArray(filterData)) {
          filterData.forEach(function (item) {
            if (dataValue.some(function (el) {
              return el == item[keyField];
            })) {
              arr.push(item);
            }
          });
        }
      }
      if (arr.length > 0) {
        list = arr.map(function (item) {
          return h(
            "div",
            { "class": "k-select2-checked-item" },
            [h(
              "span",
              { "class": "k-select2-checked-name" },
              [item[textField]]
            ), h(
              "span",
              __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
                "class": "k-select2-checked-del"
              }, {
                on: {
                  "click": function click($event) {
                    for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                      attrs[_key - 1] = arguments[_key];
                    }

                    (function (e) {
                      var k = item[keyField] + "";
                      var i = dataValue.indexOf(k);
                      _this4.dataValue.splice(i, 1);
                      _this4.emitValue();
                      e.stopPropagation();
                    }).apply(undefined, [$event].concat(attrs));
                  }
                }
              }]),
              ["\xD7"]
            )]
          );
        });
        return h(
          __WEBPACK_IMPORTED_MODULE_13_karma_ui_packages_scrollbar_Scrollbar__["a" /* default */],
          {
            attrs: { speed: 10 },
            "class": "k-select2-checked-list" },
          [h(
            "div",
            { "class": "k-select2-checked-box" },
            [list]
          )]
        );
      }
    },
    refresh: function refresh() {
      this.$emit("refresh");
    },
    hideLayer: function hideLayer() {
      this.visible = false;
      if (this.layerIns) {
        this.layerIns.hide();
      }
      this.removeUpdownEvent();
    },
    showLayer: function showLayer() {
      this.layerIns.show(this.$refs.searchInput.focus);
      this.$refs.searchInput.focus();
      this.visible = true;
      this.addUpdownEvent();
    },

    //实例化option列表
    initIns: function initIns() {
      var _this5 = this;

      var h = this.$createElement;

      this.$nextTick(function () {
        // this.layerIns.init(this, [this.rSearchInput(), this.rList()])
        var close = _this5.hasClose ? h(
          "k-button",
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            attrs: { size: "mini" }
          }, {
            on: {
              "click": function click($event) {
                for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  attrs[_key2 - 1] = arguments[_key2];
                }

                _this5.hideLayer.apply(_this5, [$event].concat(attrs));
              }
            }
          }]),
          ["\u5173\u95ED"]
        ) : null;
        var refresh = _this5.hasRefresh ? h(
          "k-button",
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            attrs: { size: "mini", type: "primary" }
          }, {
            on: {
              "click": function click($event) {
                for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                  attrs[_key3 - 1] = arguments[_key3];
                }

                _this5.refresh.apply(_this5, [$event].concat(attrs));
              }
            }
          }]),
          ["\u5237\u65B0"]
        ) : null;
        var footer = close || refresh ? h(
          "div",
          { "class": "k-select2-footer" },
          [close, refresh]
        ) : null;
        _this5.layerIns.init(_this5, {
          header: _this5.rSearchInput(),
          default: _this5.rList(),
          footer: footer
        }, {
          width: _this5.layerWidth,
          canCloseByClickoutside: true
        });
      });
    },
    isSame: function isSame(v, ov) {
      if (!v || !ov) {
        return false;
      }
      var arr = this.toArray(v);
      var oArr = this.toArray(ov);
      var str = arr.sort(function (x, y) {
        return x - y;
      }).join(",");
      var oStr = oArr.sort(function (x, y) {
        return x - y;
      }).join(",");
      return str === oStr;
    },
    emitValue: function emitValue() {
      var v = JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(this.dataValue));
      if (Array.isArray(this.value)) {
        this.$emit("valueChange", v);
      } else if (typeof this.value === "string") {
        this.$emit("valueChange", v.filter(function (el) {
          return !!el;
        }).join(","));
      } else {
        this.$emit("valueChange", v);
      }
    },
    scrollIntoViewIfNeed: function scrollIntoViewIfNeed(index) {
      var key = this.filterData[index][this.keyField];
      var currentEl = this.$refs["filterDataList" + key].$el;
      if (currentEl) Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_util_dom__["e" /* scrollIntoViewIfNeed */])(currentEl, this.layerIns.$refs.body);
    },
    handleKeydown: function handleKeydown(e) {
      var filterData = this.filterData;
      var code = e.keyCode;
      if (code != 40 && code != 38 && code != 13) {
        return;
      }
      var index = this.currentIndex;
      if (code == 38) {
        index -= 1;
        if (index < 0) {
          index = filterData.length - 1;
        }
      } else if (code == 40) {
        index += 1;
        if (index > filterData.length - 1) {
          index = 0;
        }
      } else {
        if (filterData.length === 0) {
          return;
        }
        if (index < 0 && filterData.length > 0) {
          index = 0;
        }
        //选择或者取消选择
        var set = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default.a(this.dataValue);
        var item = filterData[index];
        var v = "";
        if (item) {
          v = item[this.keyField] + "";
          if (set.has(v)) {
            set.delete(v);
          } else {
            set.add(v);
          }
          this.dataValue = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(set));
          this.emitValue();
        }
      }
      this.currentIndex = index;
      this.scrollIntoViewIfNeed(index);
      this.$forceUpdate();
    },
    addUpdownEvent: function addUpdownEvent() {
      document.addEventListener("keydown", this.handleKeydown);
    },
    removeUpdownEvent: function removeUpdownEvent() {
      document.removeEventListener("keydown", this.handleKeydown);
    },
    canCheckAll: function canCheckAll() {
      var _this6 = this;

      this.$nextTick(function () {
        var d = _this6.filterData;
        if (d && d.length) {
          //判断filterData里的所有keyField对应的值，是否都在dataValue里边
          var b = true,
              i = 0,
              len = d.length;
          var set = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default.a(_this6.dataValue);
          while (i < len) {
            var v = d[i][_this6.keyField] + "";
            if (!set.has(v)) {
              b = false;
              break;
            }
            i += 1;
          }
          _this6.isCheckedAll = b;
        } else {
          _this6.isCheckedAll = false;
        }
        _this6.$forceUpdate();
      });
    }
  },
  render: function render() {
    var _this7 = this;

    var h = arguments[0];

    var p = {
      directives: [{
        name: "esc",
        value: this.hideLayer
      }],
      class: ["k-select2", { "k-block": this.block }],
      on: {
        click: function click(e) {
          _this7.$refs.boxInput.focus();
        }
      }
    };
    return h(
      "div",
      p,
      [this.rBox(), this.rCheckedList()]
    );
  },

  watch: {
    value: function value(v, ov) {
      // console.log('value:',v,ov)
      if (!this.isSame(v, ov)) {
        if (Array.isArray(v)) {
          this.dataValue = JSON.parse(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(v));
        } else if (typeof v === "string") {
          this.dataValue = v.split(/\s*,\s*/);
        } else if (typeof v === "number") {
          this.dataValue = [v + ""];
        }
      }
    },
    filterData: function filterData() {
      this.canCheckAll();
    },
    searchText: function searchText() {
      this.canCheckAll();
    },
    dataValue: function dataValue() {
      this.canCheckAll();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.layerIns.destroy();
  },
  destroyed: function destroyed() {},
  updated: function updated() {
    this.initIns();
  },
  mounted: function mounted() {
    var _this8 = this;

    //拦截由layer组件中关闭layer的情况
    this.layerIns.$on("after-hide", function () {
      _this8.visible = false;
      _this8.removeUpdownEvent();
    });
    this.initIns();
  },

  directives: {
    esc: __WEBPACK_IMPORTED_MODULE_9_karma_ui_util_esc__["a" /* default */],
    loading: __WEBPACK_IMPORTED_MODULE_14_karma_ui_directives_loading_index__["a" /* default */]
  }
});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
__webpack_require__(21);
__webpack_require__(29);
__webpack_require__(166);
__webpack_require__(172);
__webpack_require__(175);
__webpack_require__(177);
module.exports = __webpack_require__(2).Set;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(167);
var validate = __webpack_require__(91);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(168)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(9).f;
var create = __webpack_require__(58);
var redefineAll = __webpack_require__(65);
var ctx = __webpack_require__(14);
var anInstance = __webpack_require__(66);
var forOf = __webpack_require__(31);
var $iterDefine = __webpack_require__(57);
var step = __webpack_require__(82);
var setSpecies = __webpack_require__(90);
var DESCRIPTORS = __webpack_require__(11);
var fastKey = __webpack_require__(60).fastKey;
var validate = __webpack_require__(91);
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
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(7);
var meta = __webpack_require__(60);
var fails = __webpack_require__(19);
var hide = __webpack_require__(15);
var redefineAll = __webpack_require__(65);
var forOf = __webpack_require__(31);
var anInstance = __webpack_require__(66);
var isObject = __webpack_require__(10);
var setToStringTag = __webpack_require__(28);
var dP = __webpack_require__(9).f;
var each = __webpack_require__(169)(0);
var DESCRIPTORS = __webpack_require__(11);

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
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(14);
var IObject = __webpack_require__(50);
var toObject = __webpack_require__(39);
var toLength = __webpack_require__(36);
var asc = __webpack_require__(170);
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
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(171);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var isArray = __webpack_require__(83);
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
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(7);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(173)('Set') });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(43);
var from = __webpack_require__(174);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(31);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(176)('Set');


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(7);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(178)('Set');


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(7);
var aFunction = __webpack_require__(24);
var ctx = __webpack_require__(14);
var forOf = __webpack_require__(31);

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
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 180 */
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
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ScrollbarY_vue__ = __webpack_require__(95);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1d729675_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ScrollbarY_vue__ = __webpack_require__(182);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 182 */
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
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ScrollbarX_vue__ = __webpack_require__(96);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1d647ef4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ScrollbarX_vue__ = __webpack_require__(184);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 184 */
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
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
__webpack_require__(21);
__webpack_require__(29);
__webpack_require__(186);
__webpack_require__(190);
__webpack_require__(191);
module.exports = __webpack_require__(2).Promise;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var global = __webpack_require__(3);
var ctx = __webpack_require__(14);
var classof = __webpack_require__(43);
var $export = __webpack_require__(7);
var isObject = __webpack_require__(10);
var aFunction = __webpack_require__(24);
var anInstance = __webpack_require__(66);
var forOf = __webpack_require__(31);
var speciesConstructor = __webpack_require__(98);
var task = __webpack_require__(99).set;
var microtask = __webpack_require__(188)();
var newPromiseCapabilityModule = __webpack_require__(68);
var perform = __webpack_require__(100);
var userAgent = __webpack_require__(189);
var promiseResolve = __webpack_require__(101);
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
  Internal.prototype = __webpack_require__(65)($Promise.prototype, {
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
__webpack_require__(28)($Promise, PROMISE);
__webpack_require__(90)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(89)(function (iter) {
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
/* 187 */
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
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(99).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(26)(process) == 'process';

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
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(7);
var core = __webpack_require__(2);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(98);
var promiseResolve = __webpack_require__(101);

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
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(7);
var newPromiseCapability = __webpack_require__(68);
var perform = __webpack_require__(100);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "k-t-fade" } }, [
    _c(
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
  ])
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
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option_vue__ = __webpack_require__(33);

__WEBPACK_IMPORTED_MODULE_0__option_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__option_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__option_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__option_vue__["a" /* default */]);

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__radio_vue__ = __webpack_require__(69);

__WEBPACK_IMPORTED_MODULE_0__radio_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__radio_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__radio_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__radio_vue__["a" /* default */]);

/***/ }),
/* 195 */
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
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkbox__ = __webpack_require__(34);

__WEBPACK_IMPORTED_MODULE_0__checkbox__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__checkbox__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__checkbox__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__checkbox__["a" /* default */]);

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__switch__ = __webpack_require__(198);

__WEBPACK_IMPORTED_MODULE_0__switch__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__switch__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__switch__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__switch__["a" /* default */]);

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KSwitch",
  props: {
    checked: {
      type: [Boolean, Number, String],
      default: true
    }, //true,false,0,1,"0","1"
    size: {
      type: String,
      default: "mini"
    }
  },
  model: {
    prop: "checked",
    event: "checkedChange"
  },
  data: function data() {
    return {
      ckd: this.checked
    };
  },

  methods: {
    transferType: function transferType(value) {
      var type = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(this.checked);
      value = +value;
      if (type === "string") {
        value = value + "";
      } else if (type === "boolean") {
        value = Boolean(value);
      }
      return value;
    },
    reverse: function reverse(value) {
      value = 1 - +value;
      return this.transferType(value);
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];

    var p = {
      class: ["k-switch", "k-switch--" + this.size, { "k-switch--on": this.ckd == 1 }],
      on: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.$listeners, {
        click: function click(e) {
          var r = _this.reverse(_this.ckd);
          _this.ckd = r;
          _this.$emit("checkedChange", r);
          _this.$emit('change', r);
        }
      })
    };
    return h("div", p);
  },

  watch: {
    checked: function checked(c) {
      this.ckd = c;
    },
    ckd: function ckd(c, oldC) {
      this.$emit("checkedChange", this.transferType(c));
    }
  }
});

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__ = __webpack_require__(200);

__WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__inputNumber_vue__["a" /* default */]);

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_inputNumber_vue__ = __webpack_require__(106);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_dda91bae_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_inputNumber_vue__ = __webpack_require__(201);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 201 */
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
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__area_vue__ = __webpack_require__(203);

__WEBPACK_IMPORTED_MODULE_0__area_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__area_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__area_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__area_vue__["a" /* default */]);

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_area_vue__ = __webpack_require__(107);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_d8981974_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_area_vue__ = __webpack_require__(204);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 204 */
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
      _vm.sheng && _vm.sheng.length && _vm.numLevel >= 1
        ? [
            _c(
              "k-select",
              {
                attrs: {
                  styles: _vm.selectStyle,
                  clearable: _vm.clearable,
                  placeholder: "省/直辖市"
                },
                on: {
                  change: function($event) {
                    return _vm.handleChange($event, 1)
                  }
                },
                model: {
                  value: _vm.curProvince,
                  callback: function($$v) {
                    _vm.curProvince = $$v
                  },
                  expression: "curProvince"
                }
              },
              _vm._l(_vm.sheng, function(item) {
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
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.shi && _vm.numLevel >= 2
        ? [
            _c(
              "k-select",
              {
                attrs: {
                  styles: _vm.selectStyle,
                  clearable: _vm.clearable,
                  placeholder: "市/区"
                },
                on: {
                  change: function($event) {
                    return _vm.handleChange($event, 2)
                  }
                },
                model: {
                  value: _vm.curCity,
                  callback: function($$v) {
                    _vm.curCity = $$v
                  },
                  expression: "curCity"
                }
              },
              _vm._l(_vm.shi[_vm.curProvince], function(item) {
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
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.qu && _vm.numLevel >= 3
        ? [
            _c(
              "k-select",
              {
                attrs: {
                  styles: _vm.lastStyle,
                  clearable: _vm.clearable,
                  placeholder: "区/县"
                },
                on: {
                  change: function($event) {
                    return _vm.handleChange($event, 2)
                  }
                },
                model: {
                  value: _vm.curCounty,
                  callback: function($$v) {
                    _vm.curCounty = $$v
                  },
                  expression: "curCounty"
                }
              },
              _vm._l(_vm.qu[_vm.curCity], function(item) {
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-d8981974", esExports)
  }
}

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_vue__ = __webpack_require__(108);

__WEBPACK_IMPORTED_MODULE_0__popup_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__popup_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__popup_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__popup_vue__["a" /* default */]);

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dnd; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(208);
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
        Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(this.el, {
          position: 'absolute'
        });
      }
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(this.handler, {
        cursor: 'move'
      });
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(this.el, {
        left: offsetLeft + 'px',
        top: offsetTop + 'px',
        margin: 'auto'
      });
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(document.body, {
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
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(this.el, {
        top: e.clientY - this.dy + 'px',
        left: e.clientX - this.dx + 'px'
      });
    }
  }, {
    key: 'eventUp',
    value: function eventUp(e) {
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(this.handler, {
        cursor: 'default'
      });
      Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom_js__["f" /* setStyle */])(document.body, {
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
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(78);

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
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "k-t-fade" } }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.show,
            expression: "show"
          }
        ],
        ref: "popup",
        class: [
          "k-popup",
          _vm.layout.indexOf("mask") > -1
            ? "k-popup--mask"
            : "k-popup--transparent"
        ],
        attrs: { tabindex: "-1" }
      },
      [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.show,
                expression: "show"
              }
            ],
            staticClass: "k-popup__wrapper"
          },
          [
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
                      _c("div", { staticClass: "k-popup__header__title" }, [
                        _c("b", [_vm._v(_vm._s(_vm.title))])
                      ])
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
                        {
                          class: [
                            "k-popup__footer__con",
                            { "k-popup__footer__con--line": _vm.hasBottomLine }
                          ]
                        },
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
          ]
        )
      ]
    )
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
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_packages_dialog_dialog__ = __webpack_require__(211);


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
          cancelText = _ref.cancelText,
          layout = _ref.layout,
          _ref$hasIcon = _ref.hasIcon,
          hasIcon = _ref$hasIcon === undefined ? true : _ref$hasIcon,
          iconColor = _ref.iconColor,
          iconSize = _ref.iconSize,
          _ref$hasBottomLine = _ref.hasBottomLine,
          hasBottomLine = _ref$hasBottomLine === undefined ? false : _ref$hasBottomLine;


      instance.$props.title = title;

      instance.$props.okText = okText;

      instance.$props.cancelText = cancelText;
      instance.$props.layout = layout;
      instance.$props.hasIcon = hasIcon;
      instance.$props.iconColor = iconColor;
      instance.$props.iconSize = iconSize;
      instance.$props.hasBottomLine = hasBottomLine;

      if (typeof content === 'function') {
        instance.$slots.default = content.call(this);
      } else {
        instance.$props.content = content;
      }
      instance.$props.show = true;

      instance.$on('after-ok', function () {
        instance.$props.show = false;
        ok && ok();
        instance.$off(['after-cancel', 'after-ok']);
      });
      instance.$on('after-cancel', function () {
        cancel && cancel();
        instance.$off(['after-cancel', 'after-ok']);
      });
      instance.hide = function () {
        instance.$props.show = false;
        instance.$off(['after-cancel', 'after-ok']);
      };
      return instance;
    };
  }
});

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_dialog_vue__ = __webpack_require__(111);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5311dae6_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_dialog_vue__ = __webpack_require__(212);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 212 */
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
        ref: "popup",
        attrs: { show: _vm.show },
        on: {
          "update:show": function($event) {
            _vm.show = $event
          },
          "after-cancel": _vm.afterCancel,
          "after-ok": _vm.afterOk
        }
      },
      "k-popup",
      _vm.$props,
      false
    ),
    [
      _c(
        "div",
        { staticClass: "k-dialog" },
        [
          _vm.hasIcon
            ? _c("k-icon", {
                staticClass: "k-dialog-icon",
                attrs: {
                  name: _vm.iconName,
                  color: _vm.iconColor,
                  size: _vm.iconSize
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.$slots.default
            ? [_vm._t("default")]
            : _c("div", { domProps: { innerHTML: _vm._s(_vm.content) } })
        ],
        2
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5311dae6", esExports)
  }
}

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carousel_vue__ = __webpack_require__(214);

__WEBPACK_IMPORTED_MODULE_0__carousel_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__carousel_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__carousel_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__carousel_vue__["a" /* default */]);

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_carousel_vue__ = __webpack_require__(112);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__ = __webpack_require__(216);

__WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__carouselItem_vue__["a" /* default */]);

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_carouselItem_vue__ = __webpack_require__(113);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tips_vue__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_object_js__ = __webpack_require__(41);



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
    opts = Object(__WEBPACK_IMPORTED_MODULE_2_karma_ui_util_object_js__["b" /* merge */])({}, opts, settings);
    instance.setContent(opts.content).setStyle(opts.style).setType(opts.type).show();

    return instance;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__tips_vue__["a" /* default */]);

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_tips_vue__ = __webpack_require__(114);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Loading_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_directives_loading___ = __webpack_require__(45);


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
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__to_top_vue__ = __webpack_require__(221);

__WEBPACK_IMPORTED_MODULE_0__to_top_vue__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__to_top_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__to_top_vue__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__to_top_vue__["a" /* default */]);

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_to_top_vue__ = __webpack_require__(115);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_06dbb286_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_to_top_vue__ = __webpack_require__(222);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 222 */
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
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination__ = __webpack_require__(224);

__WEBPACK_IMPORTED_MODULE_0__pagination__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__pagination__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__pagination__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__pagination__["a" /* default */]);

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_pagination_vue__ = __webpack_require__(116);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5f0df926_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_pagination_vue__ = __webpack_require__(225);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 225 */
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
                        return _vm.pageChange(page)
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
                        !$event.type.indexOf("key") &&
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
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datePicker__ = __webpack_require__(227);

__WEBPACK_IMPORTED_MODULE_0__datePicker__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__datePicker__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__datePicker__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__datePicker__["a" /* default */]);

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__date__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_input_input_jsx_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_dropdown_dropdown__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_button_button__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_date__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_mixins__ = __webpack_require__(117);








/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_7__util_mixins__["a" /* default */]],
  components: {
    KDate: __WEBPACK_IMPORTED_MODULE_2__date__["a" /* default */],
    KInput: __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_input_input_jsx_vue__["a" /* default */],
    KDropdown: __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_dropdown_dropdown__["a" /* default */],
    KButton: __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_button_button__["a" /* default */]
  },
  name: "KDatePicker",
  props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_input_input_jsx_vue__["a" /* default */].props, {
    lazy: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "选择日期"
    },
    value: [Number, String, Date],
    start: [Number, String, Date],
    end: [Number, String, Date],
    min: [Number, String, Date],
    max: [Number, String, Date],
    startPlaceholder: {
      type: String,
      default: "开始日期"
    },
    endPlaceholder: {
      type: String,
      default: "结束日期"
    },
    styles: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    range: {
      type: Boolean,
      default: false
    },
    hasActions: {
      type: Boolean,
      default: true
    },
    hasQuick: {
      type: Boolean,
      default: true
    },
    quick: {
      type: [Array, Boolean],
      default: function _default() {
        return [{
          name: "今天",
          day: 0
        }, {
          name: "昨天",
          day: -1
        }, {
          name: "前天",
          day: -2
        }];
      }
    },
    //快捷选择区间
    quickRange: {
      type: [Array, Boolean],
      default: function _default() {
        return [{
          name: "近3天",
          start: __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].addDays(new Date(), -2),
          end: __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(__WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getNow())
        }, {
          name: "近7天",
          start: __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].addDays(new Date(), -6),
          end: __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(__WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getNow())
        }, {
          name: "本周",
          start: __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getMondayInThisWeek(new Date()),
          end: __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(__WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getNow())
        }, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
          name: "上周"
        }, __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getLastWeek()), {
          name: "本月",
          start: __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getFirstDayInThisMonth(),
          end: __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(__WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getNow())
        }, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
          name: "上个月"
        }, __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getLastMonth())];
      }
    }
  }),
  model: {
    prop: "value",
    event: "valueChange"
  },
  data: function data() {
    var start = this.start;
    var end = this.end;
    if (start) {
      start = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(start);
    }
    if (end) {
      end = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(end);
    }
    return {
      visible: this.show,
      currentDate: this.value,
      showingDate: this.value,
      startDate: start,
      endDate: end,
      cacheStart: start,
      cacheEnd: end,
      initStartDate: "",
      initEndDate: "",
      startShowingDate: "",
      endShowingDate: ""
    };
  },

  computed: {
    hidePrevNext: function hidePrevNext() {
      var start = new Date(this.startShowingDate || this.initStartDate),
          end = new Date(this.endShowingDate || this.initEndDate),
          start_ms = start - 0,
          end_ms = end - 0;
      if (isNaN(start_ms) || isNaN(end_ms)) {
        return true;
      }
      if (start_ms >= end_ms) {
        return true;
      } else {
        var start_month = start.getMonth() + 1,
            end_month = end.getMonth() + 1,
            start_year = start.getFullYear(),
            end_year = end.getFullYear();
        if (end_year > start_year) {
          if (start_month === 12 && end_month === 1) {
            return true;
          }
          return false;
        } else {
          if (end_month - start_month > 1) {
            return false;
          }
          return true;
        }
      }
    },
    formatDate: function formatDate() {
      var now = new Date(this.currentDate);
      if (now == "Invalid Date") {
        now = new Date();
      }
      return now;
    },
    currentYear: function currentYear() {
      return this.formatDate.getFullYear();
    },
    currentMonth: function currentMonth() {
      return this.formatDate.getMonth() + 1;
    },
    currentDay: function currentDay() {
      return this.formatDate.getDate();
    }
  },
  methods: {
    clearDate: function clearDate() {
      if (this.range) {
        this.startDate = this.endDate = "";
      } else {
        this.currentDate = this.showingDate = "";
      }
    },
    dateToString: function dateToString() {
      if (this.currentDate) {
        var y = this.currentYear;
        var m = this.currentMonth;
        var d = this.currentDay;
        return __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(y + "-" + m + "-" + d);
      } else {
        return "";
      }
    },
    setDateByDay: function setDateByDay(day) {
      var now = new Date() - 0;
      //把day转化成毫秒数
      day = day * 86400000;
      var theDay = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(day + now);
      if (this.range) {
        this.endDate = this.startDate = theDay;
      } else {
        this.showingDate = this.currentDate = theDay;
      }
      this.visible = false;
    },
    isSameDate: function isSameDate(d1, d2) {
      //range
      if (d1 && d2) {
        return __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].isSameDate(d1, this.start) && __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].isSameDate(d2, this.end);
      } else if (d1) {
        //单个
        return __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].isSameDate(d1, this.currentDate);
      }
    },
    _renderQuick: function _renderQuick() {
      var _this = this;

      var h = this.$createElement;

      if (this.hasQuick) {
        var listQuick = [],
            listQuickRange = [];
        if (this.quick && this.quick.length) {
          listQuick = this.quick.map(function (q) {
            var d = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(new Date() - 0 + q.day * 86400000);
            var isIn = _this.$_is_in_max_min_range(d);
            return h(
              "a",
              __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
                attrs: {
                  href: "javascript:;"
                },
                "class": {
                  "k-date-picker-quick-item": true,
                  "k-date-picker-quick-disabled": !isIn,
                  "k-d-p-q-active": _this.range ? _this.isSameDate(d, d) : _this.isSameDate(d)
                }
              }, {
                on: {
                  "click": function click($event) {
                    for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                      attrs[_key - 1] = arguments[_key];
                    }

                    (function (e) {
                      if (isIn) _this.setDateByDay(q.day);
                    }).apply(undefined, [$event].concat(attrs));
                  }
                }
              }]),
              [q.name]
            );
          });
        }
        if (this.range && this.quickRange && this.quickRange.length) {
          listQuickRange = this.quickRange.map(function (q) {
            var isIn = _this.$_is_in_max_min_range(q.start) && _this.$_is_in_max_min_range(q.end);
            return h(
              "a",
              __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
                attrs: {
                  href: "javascript:;"
                },
                "class": {
                  "k-date-picker-quick-item": true,
                  "k-date-picker-quick-disabled": !isIn,
                  "k-d-p-q-active": _this.isSameDate(q.start, q.end)
                }
              }, {
                on: {
                  "click": function click($event) {
                    for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                      attrs[_key2 - 1] = arguments[_key2];
                    }

                    (function (e) {
                      if (isIn) {
                        _this.startDate = q.start;
                        _this.endDate = q.end;
                      }
                    }).apply(undefined, [$event].concat(attrs));
                  }
                }
              }]),
              [q.name]
            );
          });
        }
        return h(
          "div",
          { slot: "quick", "class": "k-date-picker-quick" },
          [listQuick, listQuickRange]
        );
      }
    },
    to2: function to2(n) {
      n = +n;
      if (n > 9) {
        return n;
      }
      return "0" + n;
    },
    renderTitle: function renderTitle() {
      var _this2 = this;

      var h = this.$createElement;

      var p = {
        style: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
          width: this.block ? "" : "98px"
        }, this.styles),
        props: {
          // ...this.$props,
          placeholder: this.placeholder,
          disabled: this.disabled,
          block: this.block,
          simple: this.simple,
          size: this.size,
          styles: this.styles,
          inputStyles: this.inputStyles,
          noStyle: this.noStyle,
          capsule: this.capsule,
          readonly: true,
          value: this.dateToString()
        },
        on: {
          clear: function clear() {
            _this2.clearDate();
          },
          keyup: function keyup(e) {
            if (e.keyCode == 13) _this2.visible = true;
          }
        }
      };
      if (this.range) {
        var rangeP = {
          class: ["k-date-picker-range", {
            'k-date-picker-range-disabled': this.disabled
          }],

          on: {
            keyup: function keyup(e) {
              if (e.keyCode == 13) {
                _this2.visible = true;
              }
            }
          },
          style: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({ width: this.block ? "100%" : "180px" }, this.styles)
        };
        if (!this.disabled) {
          rangeP.attrs = {
            tabindex: 1
          };
        }
        return h(
          "div",
          rangeP,
          [h(
            "div",
            { "class": "k-date-picker-range-placeholder" },
            [this.start ? h(
              "span",
              { "class": "k-date-picker-range-item" },
              [__WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(this.start)]
            ) : h(
              "span",
              { "class": "k-date-picker-range-item k-d-p-r-p" },
              [this.startPlaceholder]
            ), h(
              "span",
              { "class": "k-d-p-r-p" },
              ["\u81F3"]
            ), this.end ? h(
              "span",
              { "class": "k-date-picker-range-item" },
              [__WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(this.end)]
            ) : h(
              "span",
              { "class": "k-date-picker-range-item k-d-p-r-p" },
              [this.endPlaceholder]
            ), (this.start || this.end) && !this.disabled ? h("k-icon", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
              attrs: {
                name: "k-icon-close"
              },
              "class": "k-date-picker-icon-close"
            }, {
              on: {
                "click": function click($event) {
                  for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                    attrs[_key3 - 1] = arguments[_key3];
                  }

                  (function (e) {
                    _this2.clearDate();
                    e.stopPropagation();
                  }).apply(undefined, [$event].concat(attrs));
                }
              }
            }])) : h("k-icon", {
              attrs: { name: "k-icon-calendar" },
              "class": "k-date-picker-icon" })]
          )]
        );
      }
      return h(
        "k-input",
        p,
        [this.value && !this.disabled ? h("k-icon", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
          attrs: {
            name: "k-icon-close"
          },
          "class": "k-date-picker-icon-close"
        }, {
          on: {
            "click": function click($event) {
              for (var _len4 = arguments.length, attrs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                attrs[_key4 - 1] = arguments[_key4];
              }

              (function (e) {
                _this2.clearDate();
              }).apply(undefined, [$event].concat(attrs));
            }
          }
        }])) : h("k-icon", {
          attrs: { name: "k-icon-calendar" },
          "class": "k-date-picker-icon" })]
      );
    },
    _renderActions: function _renderActions() {
      var _this3 = this;

      var h = this.$createElement;

      if (this.hasActions) {
        var actions = [h(
          "k-button",
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            attrs: {
              size: "mini"
            }
          }, {
            on: {
              "click": function click($event) {
                for (var _len5 = arguments.length, attrs = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                  attrs[_key5 - 1] = arguments[_key5];
                }

                (function () {
                  _this3.clearDate();
                }).apply(undefined, [$event].concat(attrs));
              }
            }
          }]),
          ["\u6E05\u7A7A"]
        ), h(
          "k-button",
          __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            attrs: {
              size: "mini"
            }
          }, {
            on: {
              "click": function click($event) {
                for (var _len6 = arguments.length, attrs = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                  attrs[_key6 - 1] = arguments[_key6];
                }

                (function (e) {
                  _this3.visible = false;
                }).apply(undefined, [$event].concat(attrs));
              }
            }
          }]),
          ["\u5173\u95ED"]
        )];
        if (this.range) {} else {
          var disabled = !this.$_is_in_max_min_range(this.showingDate);
          // console.log(this.min+','+this.showingDate)
          actions.push(h(
            "k-button",
            __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
              attrs: {
                size: "mini",
                type: "primary",
                disabled: disabled
              }
            }, {
              on: {
                "click": function click($event) {
                  for (var _len7 = arguments.length, attrs = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                    attrs[_key7 - 1] = arguments[_key7];
                  }

                  (function (e) {
                    if (disabled) {
                      return;
                    }
                    _this3.currentDate = _this3.showingDate;
                    _this3.visible = false;
                  }).apply(undefined, [$event].concat(attrs));
                }
              }
            }]),
            ["\u786E\u5B9A"]
          ));
        }

        return h(
          "div",
          { "class": "k-date-picker-actions" },
          [actions]
        );
      }
    },
    handleStartEndChange: function handleStartEndChange(d) {
      var start = new Date(this.startDate) - 0;
      var end = new Date(this.endDate) - 0;
      if (!start) {
        this.startDate = d;
      } else {
        if (!end) {
          this.endDate = d;
        } else {
          //重新选择
          this.startDate = d;
          this.endDate = "";
        }
      }
    },
    getPrevNextMonth: function getPrevNextMonth(d, n) {
      var sd = new Date(d);
      var sd_y = sd.getFullYear();
      var sd_m = sd.getMonth() + 1;
      var sd_d = sd.getDate();
      var next_m = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].addMonths(sd_m, n);
      var next_y = sd_y;
      if (n === 1 && next_m < sd_m) {
        next_y += 1;
      } else if (n === -1 && next_m > sd_m) {
        next_y -= 1;
      }

      return next_y + "-" + next_m + "-01";
    },
    renderBody: function renderBody() {
      var _this4 = this;

      var h = this.$createElement;

      if (this.readonly || this.disabled) {
        return;
      }
      var startProps = {
        props: {
          value: this.initStartDate,
          hasActions: false,
          range: this.range,
          start: this.startDate,
          end: this.endDate,
          min: this.min,
          max: this.max,
          cacheStart: this.cacheStart,
          cacheEnd: this.cacheEnd,
          isStart: true,
          hidePrevNext: this.hidePrevNext
        },
        on: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.$listeners, {
          change: function change(d) {
            if (_this4.range) {
              _this4.handleStartEndChange(d);
            } else {
              _this4.currentDate = d;
              _this4.visible = false;
            }
          },
          "change-end": function changeEnd(d) {
            _this4.endDate = d;
            _this4.startDate = "";
          },
          "change-start": function changeStart(d) {
            _this4.startDate = d;
            _this4.endDate = "";
          },
          "change-cache-start": function changeCacheStart(d) {
            _this4.cacheStart = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d);
          },
          "change-cache-end": function changeCacheEnd(d) {
            _this4.cacheEnd = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d);
          },
          "change-showing-date": function changeShowingDate(d) {
            _this4.startShowingDate = d;
          },
          "change-ymd": function changeYmd(d) {
            _this4.showingDate = d;
          }
        })
      };
      var endProps = {
        props: {
          value: this.initEndDate,
          start: this.startDate,
          end: this.endDate,
          min: this.min,
          max: this.max,
          range: true,
          hasActions: true,
          cacheStart: this.cacheStart,
          cacheEnd: this.cacheEnd,
          isEnd: true,
          hidePrevNext: this.hidePrevNext
        },
        on: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.$listeners, {
          change: function change(d) {
            _this4.handleStartEndChange(d);
          },
          "change-end": function changeEnd(d) {
            _this4.endDate = d;
            _this4.cacheEnd = d;
            _this4.startDate = "";
          },
          "change-start": function changeStart(d) {
            _this4.startDate = d;
            _this4.cacheStart = d;
            _this4.endDate = "";
          },
          "change-cache-start": function changeCacheStart(d) {
            _this4.cacheStart = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d);
          },
          "change-cache-end": function changeCacheEnd(d) {
            _this4.cacheEnd = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d);
          },
          "change-showing-date": function changeShowingDate(d) {
            _this4.endShowingDate = d;
          },
          "change-ymd": function changeYmd(d) {
            // this.showingDate = d
            // console.log(d)
          }
        })
      };
      return [this._renderQuick(), h(
        "div",
        { "class": "k-date-picker-right" },
        [h(
          "div",
          { "class": "k-date-picker-right-top" },
          [h("k-date", startProps), this.range ? [h("div", { "class": "k-date-picker-line" }), h("k-date", endProps)] : null]
        ), this._renderActions()]
      )];
    },
    initStartAndEnd: function initStartAndEnd() {
      var start = this.startDate,
          end = this.endDate;
      var start1 = this.range ? start : this.currentDate;
      var start2 = this.range ? end : "";
      if (this.range) {
        if (start && end) {
          if (__WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].isSameMonth(start, end)) {
            if (__WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].isSameYear(start, end)) {
              start2 = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getDateByAddOneMonths(start, 1);
            }
          }
        } else {
          if (start) {
            start2 = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getDateByAddOneMonths(start, 1);
          } else if (end) {
            start2 = end;
            start1 = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getDateByAddOneMonths(end, -1);
          } else if (!start && !end) {
            start2 = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].getDateByAddOneMonths(new Date(), 1);
          }
        }
      }
      this.initEndDate = start2;
      this.initStartDate = start1 || __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(new Date());
    }
  },
  render: function render() {
    var _this5 = this;

    var h = arguments[0];

    var p = {
      props: {
        lazy: this.lazy,
        show: this.visible,
        trigger: this.trigger,
        bodyClassName: "k-date-picker",
        title: this.renderTitle(),
        body: this.renderBody()
      },
      on: {
        "update:show": function updateShow(v) {
          _this5.visible = v;
        },
        "getLayerElement": function getLayerElement(el) {
          _this5.$emit('getLayerElement', el);
        }
      }
    };
    if (this.disabled) {
      return this.renderTitle();
    }
    return h("k-dropdown", p);
  },

  watch: {
    visible: function visible(v) {
      var _this6 = this;

      if (v) {
        this.initStartAndEnd();
        this.$nextTick(function () {
          _this6.$emit('after-show');
        });
      } else {
        this.$nextTick(function () {
          _this6.$emit('after-hide');
        });
      }
      this.$emit('update:show', v);
    },
    show: function show(v) {
      this.visible = v;
    },
    currentDate: function currentDate(d) {
      d = new Date(d) - 0;
      if (d) this.$emit("valueChange", __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d));else this.$emit("valueChange", "");
    },
    value: function value(d) {
      if (d) {
        this.currentDate = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d);
      }
    },

    start: {
      immediate: false,
      handler: function handler(d) {
        if (d) {
          this.startDate = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d);
          this.initStartAndEnd();
        }
      }
    },
    end: {
      immediate: false,
      handler: function handler(d) {
        if (d) {
          this.endDate = __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d);
          this.initStartAndEnd();
        }
      }
    },
    startDate: function startDate(d) {
      var _this7 = this;

      this.$nextTick(function () {
        if (d && _this7.endDate) {
          _this7.$emit("update:end", __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(_this7.endDate));
          _this7.$emit("update:start", __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d));
          _this7.visible = false;
          return;
        }
        _this7.$emit("update:start", "");
      });
    },
    endDate: function endDate(d) {
      var _this8 = this;

      this.$nextTick(function () {
        if (d && _this8.startDate) {
          _this8.$emit("update:start", __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(_this8.startDate));
          _this8.$emit("update:end", __WEBPACK_IMPORTED_MODULE_6__util_date__["a" /* default */].formatDate(d));
          _this8.visible = false;
          return;
        }
        _this8.$emit("update:end", "");
      });
    }
  }
});

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_icon_icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_date__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_mixins__ = __webpack_require__(117);




/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_3__util_mixins__["a" /* default */]],
  inheritAttrs: false,
  name: "KDate",
  components: {
    KIcon: __WEBPACK_IMPORTED_MODULE_1_karma_ui_packages_icon_icon__["a" /* default */]
  },
  props: {
    value: {
      type: [Number, String, Date],
      default: ""
    },
    range: Boolean,
    //start和end记录选中的开始、结束日期
    start: [Number, String, Date],
    end: [Number, String, Date],
    min: [Number, String, Date],
    max: [Number, String, Date],
    //cache记录mouseover的开始、结束日期
    cacheStart: [Number, String, Date],
    cacheEnd: [Number, String, Date],
    isStart: Boolean,
    isEnd: Boolean,
    hidePrevNext: Boolean
  },
  data: function data() {
    return {
      //当前展示的年月日日期
      showingDate: this.value,
      currentDay: new Date().getDate(),
      startDate: this.start,
      endDate: this.end
    };
  },

  computed: {
    showingFormatDate: function showingFormatDate() {
      var now = new Date(this.showingDate);
      if (now == "Invalid Date") {
        now = new Date();
      }
      return now;
    },
    showingYear: function showingYear() {
      return this.showingFormatDate.getFullYear();
    },
    showingMonth: function showingMonth() {
      return this.showingFormatDate.getMonth() + 1;
    },
    showingDay: function showingDay() {
      return this.showingFormatDate.getDate();
    }
  },
  methods: {
    emitEnd: function emitEnd(date) {
      this.$emit("change-end", date);
    },
    emitStart: function emitStart(date) {
      this.$emit("change-start", date);
    },
    emitChange: function emitChange(date) {
      this.$emit("change", date);
    },
    clearDate: function clearDate() {
      this.showingDate = "";
      this.emitChange("");
    },
    _renderWeeksTitle: function _renderWeeksTitle() {
      var h = this.$createElement;

      var weeks = __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].weeks.slice(1);
      var ths = [];
      for (var w in weeks) {
        ths.push(h("th", [weeks[w]]));
      }
      return h("thead", [h("tr", [ths])]);
    },
    prevNextYear: function prevNextYear(n) {
      this.showingDate = this.showingYear + n + "-" + this.showingMonth + "-" + this.showingDay;
      this.$emit("change-ymd", this.showingDate);
    },
    prevNextMonth: function prevNextMonth(n) {
      var showM = this.showingMonth;
      var m = __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].addMonths(this.showingMonth, n);
      var y = this.showingYear;
      if (n < 0 && m > showM) {
        y = y - 1;
      } else if (n > 0 && m < showM) {
        y = y + 1;
      }
      this.showingDate = y + "-" + m + "-" + this.showingDay;
      this.$emit("change-ymd", this.showingDate);
    },
    _renderBodyTitle: function _renderBodyTitle() {
      var _this = this;

      var h = this.$createElement;

      return h(
        "div",
        { "class": "k-date-picker-title" },
        [h(
          "div",
          { "class": "k-d-p-p-n-box" },
          [this.range && this.hidePrevNext && this.isEnd ? null : [h("k-icon", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            attrs: {
              name: "k-icon-double-left",

              title: "\u4E0A\u4E00\u5E74"
            },
            "class": "k-date-picker-prev-next" }, {
            on: {
              "click": function click($event) {
                for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  attrs[_key - 1] = arguments[_key];
                }

                (function (e) {
                  _this.prevNextYear(-1);
                }).apply(undefined, [$event].concat(attrs));
              }
            }
          }])), h("k-icon", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            attrs: {
              name: "k-icon-arrow-left",

              title: "\u4E0A\u4E2A\u6708"
            },
            "class": "k-date-picker-prev-next" }, {
            on: {
              "click": function click($event) {
                for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  attrs[_key2 - 1] = arguments[_key2];
                }

                (function (e) {
                  _this.prevNextMonth(-1);
                }).apply(undefined, [$event].concat(attrs));
              }
            }
          }]))]]
        ), h(
          "div",
          { "class": "k-date-picker-year-month" },
          [h(
            "span",
            { "class": "k-date-picker-item" },
            [this.showingYear, "\u5E74"]
          ), h(
            "span",
            { "class": "k-date-picker-item" },
            [this.showingMonth, "\u6708"]
          )]
        ), h(
          "div",
          { "class": "k-d-p-p-n-box" },
          [this.range && this.hidePrevNext && this.isStart ? null : [h("k-icon", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            attrs: {
              name: "k-icon-arrow-right",

              title: "\u4E0B\u4E2A\u6708"
            },
            "class": "k-date-picker-prev-next" }, {
            on: {
              "click": function click($event) {
                for (var _len3 = arguments.length, attrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                  attrs[_key3 - 1] = arguments[_key3];
                }

                (function (e) {
                  _this.prevNextMonth(1);
                }).apply(undefined, [$event].concat(attrs));
              }
            }
          }])), h("k-icon", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
            attrs: {
              name: "k-icon-double-right",

              title: "\u4E0B\u4E00\u5E74"
            },
            "class": "k-date-picker-prev-next" }, {
            on: {
              "click": function click($event) {
                for (var _len4 = arguments.length, attrs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                  attrs[_key4 - 1] = arguments[_key4];
                }

                (function (e) {
                  _this.prevNextYear(1);
                }).apply(undefined, [$event].concat(attrs));
              }
            }
          }]))]]
        )]
      );
    },
    isInRange: function isInRange(d) {
      if (this.range) {
        var start = new Date(this.startDate) - 0,
            end = new Date(this.endDate) - 0;
        if (start && end) {
          if (d > start && d < end) {
            return true;
          }
        }
      } else {
        return false;
      }
    },

    //根据年、月、日渲染出某月的所有天
    _renderDays: function _renderDays(D) {
      var _this2 = this;

      var h = this.$createElement;

      D = new Date(D);

      var year = this.showingYear;
      var month = this.showingMonth;
      //某月第一天对应的完整日期
      var firstDate = new Date(year + "-" + month + "-" + 1);
      //今天是多少号
      var selectDay = this.showingDay;
      //获取某月第一天的对应星期几
      var w = firstDate.getDay();
      //获取上个月
      var lastMonth = __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].addMonths(month, -1);
      //判断上个月的年份
      var lastYear = lastMonth > month ? year - 1 : year;
      //获取本月共有天数
      var monthDays = __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].getMonths(year)[month];
      //获取上个月的共有天数
      var lastMonthTotalDays = __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].getMonths(lastYear)[lastMonth];
      //获取下个月
      var nextMonth = __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].addMonths(month, 1);
      //获取下一年
      var nextYear = nextMonth < month ? year + 1 : year;

      //渲染出month对应的所有天，一共6行，多了的行显示下一个月的前几天
      var i = 1;
      var tds = [];

      var _loop = function _loop() {
        var j = i;
        var curFormatDate = __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].formatDate(_this2.showingYear + "-" + _this2.showingMonth + "-" + j);
        var curDate = new Date(curFormatDate) - 0;
        var inMaxMinRange = _this2.$_is_in_max_min_range(curDate);

        var p = {
          class: {
            "k-date-picker-select-day": function () {
              if (_this2.range) {
                var start = new Date(_this2.startDate) - 0;
                var end = new Date(_this2.endDate) - 0;

                if (start && end) {
                  return __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].isSameDate(curDate, start) || __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].isSameDate(curDate, end);
                } else if (start) {
                  return __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].isSameDate(curDate, start);
                } else if (end) {
                  return __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].isSameDate(curDate, end);
                }
              } else {
                return j == selectDay;
              }
            }(),
            "k-date-picker-current-day": j == _this2.currentDay,
            "k-date-picker-active": _this2.isInRange(curDate),
            "k-date-picker-disabled": !inMaxMinRange
          },
          on: {
            click: function click(e) {
              if (inMaxMinRange) {
                _this2.showingDate = curFormatDate;
                _this2.emitChange(_this2.showingDate);
              }
            },
            mouseover: function mouseover(e) {
              if (_this2.range && inMaxMinRange) _this2.overAndOut(curDate, e);
            },
            mouseout: function mouseout(e) {
              if (_this2.range && inMaxMinRange) _this2.overAndOut(curDate, e);
            }
          }
        };
        if (i == selectDay) {} else if (i == _this2.currentDay) {} else {
          // p.class= 'k-date-picker-active'
        }
        tds.push(h(
          "td",
          p,
          [i++]
        ));
      };

      while (i <= monthDays) {
        _loop();
      }
      //补充上个月的几天
      {
        var d = w - 1;
        var n = 0;

        var _loop2 = function _loop2() {
          var day = lastMonthTotalDays - n;
          var curDate = __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].formatDate(lastYear + "-" + lastMonth + "-" + day);
          var inMaxMinRange = _this2.$_is_in_max_min_range(curDate);
          var p = {
            class: ["k-date-picker_not_cur_month", {
              "k-date-picker-active": _this2.isInRange(curDate),
              "k-date-picker-disabled": !inMaxMinRange
            }],
            on: {
              click: function click(e) {
                if (inMaxMinRange) {
                  _this2.showingDate = curDate;
                  _this2.emitChange(_this2.showingDate);
                }
              },
              mouseover: function mouseover(e) {
                if (_this2.range && inMaxMinRange) _this2.overAndOut(curDate, e);
              },
              mouseout: function mouseout(e) {
                if (_this2.range && inMaxMinRange) _this2.overAndOut(curDate, e);
              }
            }
          };
          tds.unshift(h(
            "td",
            p,
            [day]
          ));
          n++;
        };

        while (d - n >= 1) {
          _loop2();
        }
      }
      {
        //补充下一个月的几天
        var _i = 1,
            len = tds.length;

        var _loop3 = function _loop3() {
          var j = _i;
          var curDate = __WEBPACK_IMPORTED_MODULE_2__util_date__["a" /* default */].formatDate(nextYear + "-" + nextMonth + "-" + j);
          var inMaxMinRange = _this2.$_is_in_max_min_range(curDate);
          var p = {
            class: ["k-date-picker_not_cur_month", {
              "k-date-picker-active": _this2.isInRange(curDate),
              "k-date-picker-disabled": !inMaxMinRange
            }],
            on: {
              click: function click(e) {
                if (_this2.range) {
                  _this2.emitChange(curDate);
                } else {
                  if (inMaxMinRange) {
                    _this2.showingDate = curDate;
                    _this2.emitChange(curDate);
                  }
                }
              },
              mouseover: function mouseover(e) {
                if (_this2.range && inMaxMinRange) _this2.overAndOut(curDate, e);
              },
              mouseout: function mouseout(e) {
                if (_this2.range && inMaxMinRange) _this2.overAndOut(curDate, e);
              }
            }
          };
          tds.push(h(
            "td",
            p,
            [j]
          ));
          _i++;
        };

        while (_i <= len) {
          _loop3();
        }
      }
      //补充完后，用tr标签7个一组分开，分成6组
      var trs = [];
      {
        var _i2 = 0;
        while (_i2 <= 5) {
          var tr = [];
          var _j = 0;
          while (_j < 7) {
            tr.push(tds[_i2 * 7 + _j]);
            _j++;
          }
          trs.push(h("tr", [tr]));
          _i2++;
        }
      }
      return h("tbody", [trs]);
    },
    overAndOut: function overAndOut(curDate, e) {
      if (this.range) {
        var start = new Date(this.start) - 0;
        var end = new Date(this.end) - 0;
        if (start && end) {
          return;
        }
        if (start || end) {
          if (start) {
            if (curDate - start < 0) {
              // console.log('变开始为结束')
              this.emitEnd(this.start);
              this.$emit('change-cache-start', curDate);
            } else {
              this.endDate = curDate;
              this.$emit("change-cache-end", curDate);
            }
            // console.log(this.startDate,this.endDate)
          } else {
            if (curDate - end > 0) {
              // console.log('变结束为开始')
              this.emitStart(this.end);
              this.$emit('change-cache-end', curDate);
              // this.$nextTick(() => {
              //   this.endDate = curDate
              // })
            } else {
              this.startDate = curDate;
              this.$emit("change-cache-start", curDate);
            }
          }
        }
        if (e.type === "mouseout") {
          if (!start) {
            this.startDate = "";
          }
          if (!end) {
            this.endDate = "";
          }
        }
      }
    },
    renderBody: function renderBody() {
      var h = this.$createElement;

      return h("div", [this._renderBodyTitle(), h(
        "table",
        { "class": "k-date-picker-main" },
        [this._renderWeeksTitle(), this._renderDays(this.showingDate)]
      )]);
    }
  },
  render: function render() {
    return this.renderBody();
  },

  watch: {
    // value(v) {
    //   this.showingDate = v
    // },
    value: {
      immediate: true,
      handler: function handler(d) {
        this.showingDate = d;
        if (this.range) this.$emit("change-showing-date", d);else this.$emit('change-ymd', d);
      }
    },
    showingDate: {
      immediate: true,
      handler: function handler(d) {
        this.$emit("change-showing-date", d);
      }
    },
    start: function start(d) {
      if (this.range) {
        this.startDate = d;
        // console.log(d)
      }
    },
    end: function end(d) {
      if (this.range) {
        this.endDate = d;
        // console.log(d)
      }
    },
    cacheStart: function cacheStart(d) {
      // console.log("cache start:", d)
      if (this.range) this.startDate = d;
    },
    cacheEnd: function cacheEnd(d) {
      // console.log("cache end:", d)
      if (this.range) this.endDate = d;
    }
  }
});

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scrollbar__ = __webpack_require__(67);


__WEBPACK_IMPORTED_MODULE_0__Scrollbar__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__Scrollbar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__Scrollbar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Scrollbar__["a" /* default */]);

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transition_js__ = __webpack_require__(118);

__WEBPACK_IMPORTED_MODULE_0__transition_js__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__transition_js__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__transition_js__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__transition_js__["a" /* default */]);

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__table__ = __webpack_require__(119);

__WEBPACK_IMPORTED_MODULE_0__table__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__table__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__table__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__table__["a" /* default */]);

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_props__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tableCell__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_checkbox_checkbox__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_radio_radio__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins___ = __webpack_require__(47);








/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_7__mixins___["a" /* default */]],
  components: {
    KCell: __WEBPACK_IMPORTED_MODULE_4__tableCell__["a" /* default */],
    KCheckbox: __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_checkbox_checkbox__["a" /* default */],
    KRadio: __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_radio_radio__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_3__util_props__["a" /* props */], {
    top: Number
  }),
  data: function data() {
    return {
      isCheckedAll: false
    };
  },

  inject: ["__index", "__checkbox", "__radio", "__action"],
  computed: {
    headWrapperClasses: function headWrapperClasses() {
      return ["k-theadwrapper", {
        "k-theadwrapper-shadow": this.top > 0
      }];
    },
    headClasses: function headClasses() {
      return ["k-table", {
        "k-table--auto": !this.minContent
      }];
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

      var columns = this.columns;
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
          var content = null;
          // console.log(col.name , typeof col.name)
          if (typeof col.name === "function") {
            content = col.name();
          } else {
            content = col.name;
          }
          if (_this.hasIndex && _this.indexText && col.field === _this.__index) {
            content = _this.indexText;
          }
          if (_this.hasAction && col.field === _this.__action) {
            content = "操作";
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
              tag: "th",
              sorter: col.sorter === undefined ? false : col.sorter
            },
            class: {
              "k-text-center": colspan > 1 || _this.$_is_built_in_column(col.field)
            },
            style: _this.$_get_td_style(null, null, col, { thead: true }),
            on: {
              handleResizeDown: function handleResizeDown(e, el) {
                if (col.children && col.children.length) {
                  return;
                }
                _this.$emit("handleResizeDown", e, el, col.__index);
              },
              sort: function sort(type) {
                _this.$emit("sort", type, col);
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
        [this.$slots.colgroup, h("thead", [this.renderTableHead()])]
      )]
    );
  },
  mounted: function mounted() {}
});

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_props__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_karma_ui_util_throttle_debounce__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins___ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__colGroup__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tableCell__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_karma_ui_packages_checkbox_checkbox__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_radio_radio__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_icon_icon__ = __webpack_require__(6);













/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_7__mixins___["a" /* default */]],
  components: {
    KColGroup: __WEBPACK_IMPORTED_MODULE_8__colGroup__["a" /* default */],
    KCell: __WEBPACK_IMPORTED_MODULE_9__tableCell__["a" /* default */],
    KCheckbox: __WEBPACK_IMPORTED_MODULE_10_karma_ui_packages_checkbox_checkbox__["a" /* default */],
    KRadio: __WEBPACK_IMPORTED_MODULE_11_karma_ui_packages_radio_radio__["a" /* default */],
    KIcon: __WEBPACK_IMPORTED_MODULE_12_karma_ui_packages_icon_icon__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_5__util_props__["a" /* props */], {
    hoverIndex: Number,
    bodyScopedSlots: Object, //接收来自KTable的插槽内容$scopedSlots
    //主体表格main、左固定表格left、右固定表格right
    //根据不同表格，有选择的渲染某些数据：复选和单选
    who: {
      type: String,
      default: "main"
    }
  }),
  inject: ["__index", "__checkbox", "__radio", "__action"],
  data: function data() {
    return {
      checkedKeys: this.selectedKeys || [], //保存复选的所有key
      checkedRows: this.selectedRows || [], //保存复选的所有行数据
      currentRadioValue: "",
      currentHighlightKey: "",
      hoverTimeout: null
    };
  },

  computed: {
    bodyWrapperClasses: function bodyWrapperClasses() {
      return ["k-tbodywrapper"];
    },
    tableClasses: function tableClasses() {
      return ["k-table", "k-tbody", { "k-table--auto": !this.minContent }];
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler(v) {
        this.currentRadioValue = v;
      }
    },
    selectedKeys: function selectedKeys(keys) {
      this.checkedKeys = keys;
    },

    selectedRows: {
      immediate: true,
      handler: function handler(rows) {
        var _this = this;

        this.checkedRows = rows;
        //收集keys
        var keys = [];
        this.checkedRows.forEach(function (r) {
          var k = _this.formatCheckedKey(r);
          keys.push(k);
        });
        this.checkedKeys = keys;
        this.emitSelectChange();
      }
    }
  },
  methods: {
    //传入row,index，或者只传index都行，或者只传key
    setHighlightRow: function setHighlightRow(_ref) {
      var row = _ref.row,
          index = _ref.index,
          key = _ref.key;

      if (row) {
        this.currentHighlightKey = this.getRowKey(row, index, this.highlightKey);
      } else if (typeof index === "number") {
        var i = +index;
        if (typeof i === "number") {
          this.currentHighlightKey = this.getRowKey(this.data[i], i, this.highlightKey);
        }
      } else if (key) {
        this.currentHighlightKey = key;
      }
    },
    bodyScroll: function bodyScroll(e) {},


    //父级调用
    onCheckedAll: function onCheckedAll(checked) {
      var _this2 = this;

      //当不选择时，不可以将checkedKeys直接清空，因为可能存在跨页选择的数据
      //checkedRows同上
      var set = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a(this.checkedKeys);
      if (checked) {
        this.data.forEach(function (row, index) {
          if (_this2.canCheckRow(row, index)[1]) {
            var k = _this2.formatCheckedKey(row);
            set.add(k);
            var has = false;
            for (var i = 0, len = _this2.checkedRows.length; i < len; i++) {
              if (k === _this2.formatCheckedKey(_this2.checkedRows[i])) {
                has = true;
                break;
              }
            }
            if (!has) {
              // this.checkedRows.push(JSON.parse(JSON.stringify(row)))
              _this2.checkedRows.push(row);
            }
          }
        });
      } else {
        this.data.forEach(function (row, index) {
          if (_this2.canCheckRow(row, index)[1]) {
            var k = _this2.formatCheckedKey(row);
            set.delete(k);
            var j = -1;
            for (var i = 0, len = _this2.checkedRows.length; i < len; i++) {
              if (k === _this2.formatCheckedKey(_this2.checkedRows[i])) {
                j = i;
                break;
              }
            }
            if (j > -1) {
              _this2.checkedRows.splice(j, 1);
            }
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
          rows = this.checkedRows,
          para = { checked: checked, index: index, row: row, rows: rows, keys: this.checkedKeys };

      if (this.canCheckRow(row, index)[1]) {
        // if (fixedLeft && this.hasCheckbox && this.who === "left") {
        //   this.$emit("select-change", para)
        // } else if (!fixedLeft && this.hasCheckbox && this.who === "main") {
        //   // console.log(para)
        //   this.$emit("select-change", para)
        // }
        this.$emit("select-change", para);
      }
    },

    //格式化checkboxKey/radioKey
    formatCheckedKey: function formatCheckedKey(row) {
      var keys = [];
      var result = [];
      if (this.checkboxKey && this.hasCheckbox) {
        keys = this.checkboxKey.trim().split(",");
      } else if (this.radioKey && this.hasRadio) {
        keys = this.radioKey.trim().split(",");
      }
      keys.forEach(function (key) {
        result.push(row[key]);
      });
      return result.join(",");
    },
    canCheckRow: function canCheckRow() {
      var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var index = arguments[1];

      var can = [false, true];
      if (this.checkable && typeof this.checkable === "function") {
        can = this.checkable(row, index);
      }
      return can;
    },

    //tbody渲染
    renderTBody: function renderTBody() {
      var _this3 = this;

      var h = this.$createElement;

      var tbody = [];
      if (this.data.length) {

        this.data.forEach(function (row, index) {
          tbody.push(_this3.renderTr(row, index));
        });
        return tbody;
      } else {
        var colspan = this.columns.length || 1;
        var text = typeof this.emptyText === "function" ? this.emptyText() : this.emptyText;
        if (text) {
          return h("tr", [h(
            "k-cell",
            { "class": "k-text-center", attrs: { colspan: colspan }
            },
            [text]
          )]);
        }
      }
    },


    //处理序号列、操作列、多选或者单选的情况
    addFields: function addFields(row, col, index, cell) {
      var _this4 = this;

      var h = this.$createElement;

      var _canCheckRow = this.canCheckRow(row, index),
          _canCheckRow2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(_canCheckRow, 2),
          ck = _canCheckRow2[0],
          canCk = _canCheckRow2[1];
      //如果有序号列


      if (this.hasIndex && col.field === this.__index) {
        cell = index + 1;
      }
      if (this.hasAction && col.field === this.__action) {
        cell = h("div", [h("k-icon", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
          attrs: {
            title: "\u65B0\u589E\u884C",

            name: "k-icon-add"
          },
          "class": "k-table-icon-action" }, {
          on: {
            "click": function click($event) {
              for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                attrs[_key - 1] = arguments[_key];
              }

              (function (e) {
                e.stopPropagation();
                _this4.$emit("add-row", { row: row, index: index });
              }).apply(undefined, [$event].concat(attrs));
            }
          }
        }])), h("k-icon", __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
          attrs: {
            title: "\u5220\u9664\u884C",

            name: "k-icon-delete"
          },
          "class": "k-table-icon-action" }, {
          on: {
            "click": function click($event) {
              for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                attrs[_key2 - 1] = arguments[_key2];
              }

              (function (e) {
                e.stopPropagation();
                _this4.$emit("delete-row", { row: row, index: index });
              }).apply(undefined, [$event].concat(attrs));
            }
          }
        }]))]);
      }
      //如果有复选框
      if (this.hasCheckbox && col.field === this.__checkbox) {
        var checked = false;
        var k = this.formatCheckedKey(row);
        var set = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a(this.checkedKeys);
        if (set.has(k)) {
          checked = true;
        }
        //如果可以操作选中

        if (canCk) {
          cell = h("k-checkbox", {
            attrs: {
              value: this.formatCheckedKey(row),
              checked: checked
            },
            style: "pointer-events:none;"
          });
        } else {
          cell = h("k-checkbox", {
            attrs: {
              value: this.formatCheckedKey(row),
              checked: ck,
              disabled: !canCk
            },
            style: "pointer-events:none;"
          });
        }
        //如果有单选框
      } else if (this.hasRadio && col.field === this.__radio) {
        var radioProps = {
          props: {
            modelValue: this.currentRadioValue,
            value: this.formatCheckedKey(row),
            disabled: !canCk
          },
          on: {
            modelValueChange: function modelValueChange(value) {
              _this4.currentRadioValue = value;
              _this4.$emit("toggle-radio-row", { value: value, row: row, index: index });
            }
          }
        };
        cell = h("k-radio", radioProps);
      }
      return cell;
    },

    //单元格渲染
    renderTd: function renderTd(row, index, col) {
      var h = this.$createElement;

      var cont = null;
      if (col.customRender) {
        if (typeof col.customRender === "function") {
          cont = col.customRender(row, index);
        } else {
          cont = col.customRender;
        }
      } else if (col.scopedSlots) {
        cont = this.bodyScopedSlots[col.scopedSlots]({
          row: row,
          index: index
        });
      } else if (col.field) {
        cont = row[col.field];
        cont = this.addFields(row, col, index, cont);
      }
      var cellProps = {
        class: {
          "k-text-center": this.$_is_built_in_column(col.field)
        },
        style: this.$_get_td_style(row, index, col)
      };
      return h(
        "k-cell",
        cellProps,
        [cont]
      );
    },
    getRowKey: function getRowKey(row, index, keys) {
      var k = [];
      var arr = [];
      if (keys) {
        arr = (keys + "").trim().split(/\s?\,\s?/);
      }
      arr.forEach(function (el) {
        if (el.toLowerCase() === "index") {
          k.push(index + "");
        } else if (row[el]) {
          k.push(row[el]);
        }
      });
      return k.join(",");
    },

    //渲染数据的一行
    renderTr: function renderTr(row, index) {
      var _this5 = this;

      var h = this.$createElement;

      var k = this.getRowKey(row, index, this.loopKey);
      var curHighlightRowKey = this.getRowKey(row, index, this.highlightKey);
      var tds = [];
      this.columns.forEach(function (col) {
        tds.push(_this5.renderTd(row, index, col));
      });
      var trProps = {
        attrs: {
          "data-key": k,
          "data-highlight": curHighlightRowKey
        },
        key: k,
        class: {
          "k-table-tr-highlight": curHighlightRowKey == this.currentHighlightKey,
          "k-table-tr-hover": this.hoverIndex === index
        },
        on: {
          dblclick: function dblclick() {
            _this5.$emit("dblclick-row", { row: row, index: index });
          },
          click: function click() {
            if (_this5.canHighlightRow) {
              _this5.currentHighlightKey = _this5.getRowKey(row, index, _this5.highlightKey);
              _this5.$emit("toggle-highlight", {
                row: row,
                index: index,
                value: curHighlightRowKey
              });
            }
            //可以在此处理复选单选
            var k = _this5.formatCheckedKey(row);
            if (_this5.canCheckRow(row, index)[1]) {
              if (_this5.hasCheckbox) {
                var checked = false;
                var set = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a(_this5.checkedKeys);
                if (set.has(k)) {
                  set.delete(k);
                  var j = -1;
                  for (var i = 0, len = _this5.checkedRows.length; i < len; i++) {
                    if (k === _this5.formatCheckedKey(_this5.checkedRows[i])) {
                      j = i;
                      break;
                    }
                  }
                  if (j > -1) {
                    _this5.checkedRows.splice(j, 1);
                  }
                } else {
                  set.add(k);
                  checked = true;
                  var has = false;
                  for (var _i = 0, _len3 = _this5.checkedRows.length; _i < _len3; _i++) {
                    if (k === _this5.formatCheckedKey(_this5.checkedRows[_i])) {
                      has = true;
                      break;
                    }
                  }
                  if (!has) {
                    // this.checkedRows.push(JSON.parse(JSON.stringify(row)))
                    _this5.checkedRows.push(row);
                  }
                }
                _this5.checkedKeys = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(set));
                _this5.emitSelectChange(checked, row, index);
              } else if (_this5.hasRadio) {
                _this5.currentRadioValue = k;
                _this5.$emit("toggle-radio-row", { value: k, row: row, index: index });
              }
            }
          }
        }
      };
      if (this.hover) {
        trProps.on.mouseover = function () {
          clearTimeout(_this5.hoverTimeout);
          _this5.hoverTimeout = setTimeout(function () {
            _this5.$emit("update:hoverIndex", index);
          }, 80);
        };
        trProps.on.mouseout = function () {
          clearTimeout(_this5.hoverTimeout);
          _this5.hoverTimeout = setTimeout(function () {
            _this5.$emit("update:hoverIndex", -1);
          }, 20);
        };
      }
      return h(
        "tr",
        trProps,
        [tds]
      );
    }
  },
  render: function render() {
    var _this6 = this;

    var h = arguments[0];

    console.log('body渲染了');
    var bodyWrapperClasses = this.bodyWrapperClasses,
        tableClasses = this.tableClasses;

    return h(
      "div",
      __WEBPACK_IMPORTED_MODULE_0_babel_helper_vue_jsx_merge_props___default()([{
        "class": bodyWrapperClasses
      }, {
        on: {
          "scroll": function scroll($event) {
            for (var _len4 = arguments.length, attrs = Array(_len4 > 1 ? _len4 - 1 : 0), _key3 = 1; _key3 < _len4; _key3++) {
              attrs[_key3 - 1] = arguments[_key3];
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
        [this.$slots.colgroup, h("tbody", [this.renderTBody()])]
      )]
    );
  }
});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(235);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(238);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(236), __esModule: true };

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
__webpack_require__(21);
module.exports = __webpack_require__(237);


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(43);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(22);
module.exports = __webpack_require__(2).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(239), __esModule: true };

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
__webpack_require__(21);
module.exports = __webpack_require__(240);


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var get = __webpack_require__(64);
module.exports = __webpack_require__(2).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_props__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tableCell__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins___ = __webpack_require__(47);






/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_5__mixins___["a" /* default */]],
  components: {
    KCell: __WEBPACK_IMPORTED_MODULE_4__tableCell__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_3__util_props__["a" /* props */], {
    bottom: Number
  }),
  computed: {
    tableWrapperClasses: function tableWrapperClasses() {
      return ["k-tfootwrapper"];
    },
    tableClasses: function tableClasses() {
      return ["k-table", "k-tfoot", {
        "k-tfootshadow": this.bottom > 0,
        "k-table--auto": !this.minContent
      }];
    }
  },
  methods: {
    getSumTotal: function getSumTotal(col, iCol) {
      var sum = col.sum,
          field = col.field;

      var type = typeof sum === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(sum);
      if (type === "undefined" || type === "boolean" && !sum) {
        return null;
      }
      if (type === "string" || type === "number") {
        return sum;
      } else {
        var total = 0;
        if (field) {
          this.data.forEach(function (row) {
            total += +row[field];
          });
        }
        total = total || "";
        if (type === "function") {
          return sum(total);
        } else if (type === "boolean") {
          return total;
        }
      }
    },
    renderTd: function renderTd() {
      var _this = this;

      var h = this.$createElement;

      //只自动计算一级数据，如果有二级数据，需要自己算哦
      var tds = this.columns.map(function (col, i) {
        var content = i === 0 ? _this.sumText : _this.getSumTotal(col, i);
        return h(
          "k-cell",
          {
            attrs: {
              tag: "th"
            },
            style: _this.$_get_td_style(null, null, col, { tfoot: true })
          },
          [content]
        );
      });
      return h("tr", [tds]);
    }
  },
  render: function render() {
    var h = arguments[0];
    var tableClasses = this.tableClasses,
        tableWrapperClasses = this.tableWrapperClasses;

    var wrapperProps = {
      class: tableWrapperClasses,
      style: {
        bottom: this.bottom + "px"
      }
    };
    return h(
      "div",
      wrapperProps,
      [h(
        "table",
        { "class": tableClasses },
        [this.$slots.colgroup, h("tfoot", [this.renderTd()])]
      )]
    );
  },
  mounted: function mounted() {
    // this.$nextTick(() => {
    //   //注意： 0必须要写成'0px'的形式，否则calc失效！
    //   this.$emit("foot-mounted", this.hasSum ? getStyle(this.$el, "height") : '0px')
    // })
  }
});

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__table2__ = __webpack_require__(243);

__WEBPACK_IMPORTED_MODULE_0__table2__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__table2__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__table2__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__table2__["a" /* default */]);

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_table_table__ = __webpack_require__(119);


// 在table基础上做的扩展，支持占位表格行

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KTable2",
  components: {
    KTable: __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_table_table__["a" /* default */]
  },
  model: {
    prop: 'data',
    event: 'dataChange'
  },
  props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_2_karma_ui_packages_table_table__["a" /* default */].props, {
    stripe: {
      type: Boolean,
      default: false
    },
    hasIndex: {
      type: Boolean,
      default: true
    },
    hasAction: {
      type: Boolean,
      default: true
    },
    resizeWidth: {
      type: Boolean,
      default: true
    },
    minContent: {
      type: Boolean,
      default: true
    },
    //rowData可以不传，
    //但需注意：如果不传的话，当单元格内包含有其他组件时，将会出现组件
    //在不知不觉中销毁并重建的一个过程！
    //可表现为组件状态无法保持的视觉异常！
    //rowData为一个对象模板，或者一个返回对象的函数，
    //建议写一个函数返回一个对象
    rowData: {
      type: [Object, Function],
      default: function _default() {
        return {};
      }
    },
    //beforeDeleteRow是能返回Promise的函数
    beforeDeleteRow: Function
    //占位行数，当不足时自动补充空行
    // placeholderRows: {
    //   type: Number,
    //   default: 5
    // }
  }),
  data: function data() {
    return {};
  },

  methods: {
    setHighlightRow: function setHighlightRow(e) {
      this.$refs.table.setHighlightRow(e);
    },
    getRowData: function getRowData(e) {
      var d = typeof this.rowData === 'function' ? this.rowData(e) : this.rowData;
      return JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(d));
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];

    var tableProps = {
      ref: 'table',
      props: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.$props),
      scopedSlots: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.$scopedSlots),
      on: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.$listeners, {
        'add-row': function addRow(e) {
          // this.$emit('dataChange', this.data.splice(e.index+1,0,{}))
          _this.data.splice(e.index + 1, 0, _this.getRowData(e));
          _this.$emit('add-row', e);
        },
        'delete-row': function deleteRow(e) {
          if (_this.data.length > 1) {
            // this.$emit('dataChange', this.data.splice(e.index,1))
            if (_this.beforeDeleteRow && typeof _this.beforeDeleteRow === 'function') {
              _this.beforeDeleteRow(e).then(function () {
                _this.data.splice(e.index, 1);
                _this.$emit('delete-row', e);
              }).catch(function () {});
            } else {
              _this.data.splice(e.index, 1);
              _this.$emit('delete-row', e);
            }
          }
        }
      })
    };
    return h("k-table", tableProps);
  }
});

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer_layer__ = __webpack_require__(86);

var boardIns = "@@instance@@";
/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue, opts) {
    var LayerConstructor = Vue.extend(__WEBPACK_IMPORTED_MODULE_0__layer_layer__["a" /* default */]);
    Vue.board = Vue.prototype.$board = function (elem, _ref) {
      var header = _ref.header,
          body = _ref.body,
          footer = _ref.footer,
          _ref$destroyWhenHide = _ref.destroyWhenHide,
          destroyWhenHide = _ref$destroyWhenHide === undefined ? true : _ref$destroyWhenHide,
          _ref$parent = _ref.parent,
          parent = _ref$parent === undefined ? document.body : _ref$parent,
          _ref$afterHide = _ref.afterHide,
          afterHide = _ref$afterHide === undefined ? function () {} : _ref$afterHide,
          bodyClassName = _ref.bodyClassName;

      if (!elem[boardIns]) {
        elem[boardIns] = new LayerConstructor().$mount();
        elem[boardIns].$data.parent = parent;
        parent.appendChild(elem[boardIns].$el);
      }
      elem[boardIns].init({ $el: elem }, {
        header: typeof header === "function" ? header() : header,
        default: typeof body === "function" ? body() : body,
        footer: typeof footer === "function" ? footer() : footer
      }, {
        canCloseByClickoutside: true,
        width: "auto",
        bodyClassName: bodyClassName,
        afterLeave: function afterLeave() {
          afterHide();
          if (destroyWhenHide) {
            elem[boardIns].destroy();
            elem[boardIns] = null;
          }
        }
      });

      return elem[boardIns];
    };
  }
});

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon__ = __webpack_require__(6);

__WEBPACK_IMPORTED_MODULE_0__icon__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__icon__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__icon__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__icon__["a" /* default */]);

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__autoComplete__ = __webpack_require__(247);

__WEBPACK_IMPORTED_MODULE_0__autoComplete__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__autoComplete__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__autoComplete__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__autoComplete__["a" /* default */]);

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_util_throttle_debounce__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_layer_index__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_input_input_jsx_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_karma_ui_packages_option_option__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_karma_ui_util_esc_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_karma_ui_directives_loading_index__ = __webpack_require__(45);










/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KAutoComplete",
  components: {
    KInput: __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_input_input_jsx_vue__["a" /* default */],
    KOption: __WEBPACK_IMPORTED_MODULE_7_karma_ui_packages_option_option__["a" /* default */]
  },
  props: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_input_input_jsx_vue__["a" /* default */].props, {
    clearable: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    //弹层的宽度，有值的话，就用那个设置的值，如果设置了空字符串或者false，表示和
    //输入框等宽
    layerWidth: {
      type: [String, Boolean],
      default: "auto"
    },
    //弹层的高度
    layerHeight: {
      type: String,
      default: "auto"
    },
    //keyfield用来向后台提交的字段名(对应的数据)
    keyField: {
      type: String,
      default: "Id"
    },
    //展示的那个字段名(对应的数据)
    valueField: {
      type: String,
      default: "Name"
    },
    //模糊匹配需要搜索的字段
    searchField: {
      type: [String, Array],
      default: "Name"
    },
    //只有展示列表的时候，再初始化layer
    //此参数同时具有收起列表后销毁layer的功能控制
    lazy: {
      type: Boolean,
      default: true
    },
    //前端分页，有值就代表有分页，没有值就没有分页
    pageSize: {
      type: [Number, String],
      default: void 0
    },
    debounceTime: {
      type: Number,
      default: 350
    }
  }),
  model: {
    prop: "value",
    event: "valueChange"
  },
  data: function data() {
    var _ref;

    return _ref = {
      //layer实例
      ins: null,
      //提交数据用的，可能是id或者proid等等
      // val: this.value,
      //展示在输入框的那个文本
      inputText: "",
      optionCompName: "",
      isMouseDownOption: false,
      //选中的那个数据的index
      currentIndex: -1,
      currentHoverIndex: -1,
      //filterData
      filterData: JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(this.data)),
      options: [] }, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, "optionCompName", ""), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, "loading", false), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, "pageIndex", 1), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, "timer", null), _ref;
  },

  computed: {
    totalPages: function totalPages() {
      if (this.pageSize && this.filterData.length) {
        return Math.ceil(this.filterData.length / this.pageSize);
      }
      return 1;
    }
  },
  watch: {
    // val(v) {
    //   this.$emit("valueChange", v)
    // },
    data: function data(d) {
      if (d && d.length) {
        this.getInputTextByKeyField();
        this.filterData = JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(d));
        var i = this.currentHoverIndex;

        //如果v-model有数据，且有分页、当前数据不在第一页
        //
        if (this.pageSize && this.pageIndex == 1 && i > this.pageSize * this.pageIndex - 1) {
          var half = Math.ceil(this.pageSize / 2);
          this.filterData = this.filterData.slice(i - half, i + half);
          this.currentHoverIndex = this.currentIndex = half;
        }

        if (document.activeElement == this.$refs.input.getInputElement()) this.showList();
      } else {
        this.filterData = [];
        if (this.pageSize) this.currentHoverIndex = this.currentIndex = 1;
      }
    },

    value: {
      immediate: true,
      handler: function handler(v) {
        this.getInputTextByKeyField();
      }
    }
    // currentHoverIndex(hoverIndex) {
    //   console.log("hoverIndex:", hoverIndex)
    // },
    // currentIndex(cI) {
    //   console.log("currentIndex:", cI)
    // }
  },
  methods: {
    handleKeyup: function handleKeyup(e) {
      this.$emit("keyup", e);
      var code = e.keyCode;
      if (code != 40 && code != 38 && code != 13) {
        return;
      }
      var i = this.currentHoverIndex;
      var len = this.filterData.length;
      if (code == 40) {
        //下
        i += 1;
        if (i >= len) {
          i = 0;
        }
      } else if (code == 38) {
        i -= 1;
        if (i < 0) {
          i = len - 1;
        }
      } else if (code == 13) {
        if (this.filterData.length) {
          this.currentIndex = this.currentHoverIndex == -1 ? 0 : this.currentHoverIndex;
          this.$emit("valueChange", this.filterData[this.currentIndex][this.keyField]);
          this.$emit("toggle", {
            row: this.filterData[this.currentIndex],
            index: this.currentIndex
          }, e);
          this.hideList(this.destroyLayer);
        }
        return;
      }
      this.currentHoverIndex = i;
      // console.log(i)
      this.scrollIntoViewIfNeed(i);
      this.$forceUpdate();
    },

    //
    getInputTextByKeyField: function getInputTextByKeyField() {
      var text = "";
      if (this.value !== undefined && this.value !== null && this.value !== "" && this.data && this.data.length && this.keyField) {
        for (var i = 0, len = this.data.length; i < len; i++) {
          var item = this.data[i];
          if (item[this.keyField] == this.value) {
            text = item[this.valueField];
            this.currentIndex = i;
            this.currentHoverIndex = i;
            break;
          }
        }
      }
      this.inputText = text;
      if (this.inputText === "") {
        this.currentHoverIndex = -1;
        this.currentIndex = -1;
        this.getFilterData();
      }
      return text;
      // this.$emit('toggle',{row,index})
      // return {row,index}
    },

    //外部调用，获取valueField对应的值
    getName: function getName() {
      return this.getInputTextByKeyField();
    },

    //外部调用,获取输入框里的文本
    getInputValue: function getInputValue() {
      return this.inputText;
    },

    //根据inputText获取keyField对应的值
    getValueByInputText: function getValueByInputText() {
      var v = "";
      //将用户输入，转化成关键字数组，以逐个匹配
      var arrText = this.inputText.toLowerCase().split(/\s+/);
      if (this.data && this.data.length && this.inputText !== "" && this.inputText !== undefined && this.keyField) {
        if (Array.isArray(this.searchField)) {} else if (typeof this.searchField === "string") {}
      }
    },
    getFilterData: function getFilterData() {
      if (this.inputText.trim() !== "") {
        //将用户输入，转化成关键字数组，以逐个匹配
        var arrText = this.inputText.toLowerCase().split(/\s+/).filter(function (el) {
          return el.length > 0;
        });
        var arrField = typeof this.searchField === "string" ? [this.searchField] : Array.isArray(this.searchField) ? this.searchField : [];
        if (arrField.length === 0) {
          console.warn(this.$options.name + "\u662F\u5426\u6CA1\u6709\u4F20\u5165searchField\u53C2\u6570\uFF1F");
        }
        //搜索出来
        var arr = [];
        this.data.forEach(function (item) {
          var has = false;
          arrField.forEach(function (field) {
            var fieldText = (item[field] + "").toLowerCase();
            arrText.forEach(function (text) {
              text = (text + "").trim();
              if (fieldText.indexOf(text) > -1) {
                has = true;
              }
            });
          });
          if (has) {
            arr.push(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, item));
          }
        });
        this.filterData = arr;
        if (arr.length === 0) {
          this.ins.hide();
        } else {
          this.showList(this.scrollIntoViewIfNeed);
        }
        this.$forceUpdate();
      } else {
        this.filterData = this.data;
        if (this.$refs.input && document.activeElement == this.$refs.input.getInputElement()) {
          this.showList(this.scrollIntoViewIfNeed);
        }
      }
    },

    handleLayerBodyScroll: Object(__WEBPACK_IMPORTED_MODULE_4_karma_ui_util_throttle_debounce__["a" /* debounce */])(100, function () {
      var body = this.ins.$refs.body;
      var bodyHeight = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["b" /* getStyle */])(body, "height"));
      var scrollTop = body.scrollTop;
      var scrollHeight = Math.ceil(body.scrollHeight);
      // console.log(bodyHeight,scrollTop,scrollHeight,this.totalPages)
      // 使用了Math.ceil和 -2，处理临界点高度
      if (bodyHeight + scrollTop >= scrollHeight - 2) {
        if (this.totalPages > 1) {
          if (this.pageIndex < this.totalPages) {
            this.pageIndex += 1;
            this.$forceUpdate();
          }
        }
      }
    }),
    showList: function showList() {
      var _this = this;

      var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      this.$nextTick().then(function () {
        _this.ins && _this.ins.show(function () {
          fn();
          // 优化事件绑定时机：由layer抛出事件告诉父组件
          // layer已经初始化完毕，之后进行事件绑定
          // 而不是在layer展示出来后绑定
          // this.ins.$refs.body.addEventListener(
          //   "scroll",
          //   this.handleLayerBodyScroll
          // )
        });
      });
    },
    hideList: function hideList() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      if (!this.disabled) {
        if (this.ins) {
          //remove事件
          this.ins.$refs.body.removeEventListener("scroll", this.handleLayerBodyScroll);
          this.ins.hide(cb);
          this.$refs.input.blur();
          this.$nextTick(function () {
            //如果没有选择，或者输入框没有东西，则重置成第一页
            // if(!this.value && !this.inputText) {
            //   this.pageIndex = 1
            //   // console.log('没有value吗？')
            // }
          });
        }
      }
    },

    // scrollIntoView(index) {
    //   let i = 0
    //   if (typeof index === "number") {
    //     i = index
    //   } else {
    //     this.filterData.forEach((el, index) => {
    //       if (el[this.keyField] == this.value) {
    //         i = index
    //       }
    //     })
    //   }
    //   this.getAllOptionsComponent()
    //   if (this.options.length) {
    //     this.ins.$refs.body.scrollTop = offset(
    //       this.options[i].$el,
    //       this.ins.$refs.body
    //     ).top
    //   }
    // },
    scrollIntoViewIfNeed: function scrollIntoViewIfNeed(index) {
      var _this2 = this;

      var i = 0;
      if (typeof index === "number") {
        i = index;
      } else {
        this.filterData.forEach(function (el, index) {
          if (el[_this2.keyField] == _this2.value) {
            i = index;
          }
        });
      }
      this.getAllOptionsComponent();
      if (this.options.length && this.options[i] && this.options[i].$el) {
        Object(__WEBPACK_IMPORTED_MODULE_3_karma_ui_util_dom__["e" /* scrollIntoViewIfNeed */])(this.options[i].$el, this.ins.$refs.body);
      }
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
    },

    //可供外部调用
    focus: function focus() {
      this.$refs.input.focus();
    },
    inputProps: function inputProps() {
      var _this4 = this;

      return {
        directives: [{
          name: "esc",
          value: function value() {
            _this4.hideList(_this4.destroyLayer);
          }
        }],
        ref: "input",
        props: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, this.$props, {
          value: this.inputText
        }),
        on: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, this.$listeners, {
          focus: function focus(e) {
            _this4.$refs.input.onSelect();
            //如果还没有实例化，则先实例化
            if (!_this4.ins) {
              _this4.instanceAndOn();
              _this4.init();
            }
            //如果没有筛选出来的数据，就不显示列表
            if (_this4.filterData.length !== 0) {
              _this4.showList(function () {
                _this4.scrollIntoViewIfNeed();
                _this4.currentHoverIndex = _this4.currentIndex;
                _this4.$forceUpdate();
              });
              //如果数据源本身就没有，此时可能是正在延迟加载数据中
            } else if (_this4.data.length === 0) {
              _this4.showList();
            }
            _this4.$emit("focus", e);
          },
          blur: function blur() {
            if (!_this4.isMouseDownOption) {
              _this4.hideList(_this4.destroyLayer);
            }
          },
          input: function input() {
            clearTimeout(_this4.timer);
            _this4.timer = setTimeout(function () {
              _this4.$emit("input", _this4.inputText);
            }, _this4.debounceTime);
          },
          keyup: function keyup(e) {
            _this4.handleKeyup(e);
          },
          keydown: function keydown(e) {
            //阻止光标乱跑。在keyup中阻止不了
            // e.preventDefault()
          },
          valueChange: function valueChange(v) {
            _this4.pageIndex = 1;
            _this4.inputText = v;
            _this4.currentIndex = _this4.currentHoverIndex = -1;
            if (v.trim() === "") {
              _this4.$emit("valueChange", "");
              _this4.$emit("toggle", { row: undefined, index: undefined });
            }
            _this4.getFilterData();
          }
        })
      };
    },
    instanceAndOn: function instanceAndOn() {
      var _this5 = this;

      this.ins = Object(__WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_layer_index__["b" /* layer */])();

      this.ins.$on("layer-inited", function () {
        _this5.$nextTick().then(function () {
          _this5.ins.$refs.body.addEventListener("scroll", _this5.handleLayerBodyScroll);
        });
      });

      this.ins.$on("mousedown", function () {
        _this5.isMouseDownOption = true;
      });
      this.ins.$on("mouseout", function () {
        _this5.isMouseDownOption = false;
      });
    },
    init: function init() {
      var _this6 = this;

      var h = this.$createElement;

      this.$nextTick(function () {
        // console.log('初始化时的pageIndex',this.pageIndex)
        if (_this6.ins) {
          var layerWidth = _this6.layerWidth,
              layerHeight = _this6.layerHeight,
              filterData = _this6.filterData,
              $slots = _this6.$slots,
              $scopedSlots = _this6.$scopedSlots;

          if (_this6.filterData.length === 0) {
            //提示加载中
            _this6.loading = true;
          } else {
            _this6.loading = false;
          }
          var loadingProps = {
            directives: [{
              name: "loading",
              value: {
                loading: _this6.loading,
                content: "数据获取中..."
              }
            }],
            style: {
              minHeight: "200px"
            }
          };
          var slotsDefault = $slots.default || filterData.length && filterData.slice(0, _this6.pageIndex * (_this6.pageSize || filterData.length)).map(function (item, index) {
            var optionProps = {
              class: {
                "k-option--hover": index == _this6.currentHoverIndex
              },
              props: {
                tag: "div",
                selected: item[_this6.keyField] == _this6.value
              },
              on: {
                click: function click(e) {
                  _this6.currentIndex = index;
                  _this6.$emit("valueChange", item[_this6.keyField]);
                  _this6.$emit("toggle", { row: item, index: index });
                  _this6.hideList(_this6.destroyLayer);
                }
              }
            };
            if ($scopedSlots.default) {
              return h(
                "k-option",
                optionProps,
                [$scopedSlots.default({
                  row: item,
                  index: index
                })]
              );
            }
            return h(
              "k-option",
              optionProps,
              [item[_this6.valueField]]
            );
          }) || h("k-option", loadingProps);
          var slotsHeader = $slots.header;
          var slotsFooter = $slots.footer;
          _this6.ins.init(_this6, {
            //列表的插槽内容
            default: slotsDefault,
            //列表头部的内容
            header: slotsHeader,
            //列表底部的内容
            footer: slotsFooter
          }, {
            //弹框标签类型
            tag: "div",
            //弹框列表头部标签类型
            headerTag: "div",
            //弹框列表底部标签类型
            footerTag: "div",
            //弹框宽。如果不指定宽，则宽度和输入框一致
            width: layerWidth,
            //高度暂时没有设置。TODO
            height: layerHeight,
            canCloseByClickoutside: true
          });
        }
      });
    },
    destroyLayer: function destroyLayer() {
      if (this.lazy) {
        if (this.ins) {
          this.ins.destroy();
          this.ins = null;
        }
      }
    }
  },
  directives: {
    esc: __WEBPACK_IMPORTED_MODULE_8_karma_ui_util_esc_js__["a" /* default */],
    loading: __WEBPACK_IMPORTED_MODULE_9_karma_ui_directives_loading_index__["a" /* default */]
  },
  render: function render() {
    var h = arguments[0];

    var inputProps = this.inputProps();
    return h("k-input", inputProps);
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyLayer();
  },
  destroyed: function destroyed() {
    // console.log('k-auto-complete被销毁了！当前页：',this.pageIndex)
    if (this.ins) {}
  },
  mounted: function mounted() {
    if (!this.lazy) {
      if (!this.ins) {
        this.instanceAndOn();
        this.init();
      }
    }
  },
  updated: function updated() {
    this.ins && this.init();
  },
  created: function created() {
    var _this7 = this;

    this.$on("getOptionComponentName", function (name) {
      _this7.optionCompName = name;
    });

    this.$on("inovering", function (isMouseDownOption) {
      _this7.isMouseDownOption = isMouseDownOption;
      //如果鼠标离开列表，且当前焦点不是此组件的input，则隐藏列表
      if (!isMouseDownOption) {
        if (document.activeElement != _this7.$refs.input.getInputElement()) {
          _this7.hideList(_this7.destroyLayer);
        }
      }
    });
  }
});

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree__ = __webpack_require__(122);

__WEBPACK_IMPORTED_MODULE_0__tree__["a" /* default */].install = function (Vue, opts) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__tree__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__tree__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__tree__["a" /* default */]);

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_checkbox_checkbox__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_icon_icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_transition_transition__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__treeList__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_karma_ui_util_getAllParent__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__props__ = __webpack_require__(74);









/* harmony default export */ __webpack_exports__["a"] = ({
  components: { KCheckbox: __WEBPACK_IMPORTED_MODULE_3_karma_ui_packages_checkbox_checkbox__["a" /* default */], KIcon: __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_icon_icon__["a" /* default */], KTransition: __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_transition_transition__["a" /* default */], KTreeList: __WEBPACK_IMPORTED_MODULE_6__treeList__["a" /* default */] },
  props: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_8__props__["a" /* default */], {
    item: Object,
    isLastOne: Boolean, //是不是数组中最后一条数据
    active: [Number, String], //当前选择的节点数据
    spread: Boolean, //
    scopedSlots: Object
  }),
  data: function data() {
    return {
      open: this.spread,
      //是否处于加载下一级数据之中
      loading: false
    };
  },

  inject: ["tree"],
  methods: {
    isSelected: function isSelected(item) {
      //console.log(item,this.selectedData)
      var set = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default.a(this.tree.checkedKeys.map(function (t) {
        return t + "";
      }));
      var v = item[this.keyField] + "";
      return set.has(v);
    },
    cancelChecked: function cancelChecked(data, set) {
      var rule = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "some";

      //data是当前数据及其所有父级，set是selectedKeys
      //如果data只有1，则代表只选择了顶级一层的数据
      var keyField = this.keyField,
          childField = this.childField;

      if (data.length === 1) {
        var v = data[0][keyField] + "";
        set.delete(v);
      } else {
        var _deleteFromSet = function _deleteFromSet(data, set) {
          var len = data.length,
              i = len - 1;
          do {
            if (i === len - 1) {
              set.delete(data[i][keyField] + "");
            } else {
              //搜集所有同级，判断是否有一个被选中
              var has = false;
              if (rule === "every") {
                has = true;
              }
              for (var j = 0, jlen = data[i][childField].length; j < jlen; j++) {
                var c = data[i][childField][j];
                if (rule === "some") {
                  if (set.has(c[keyField] + "")) {
                    has = true;
                    break;
                  }
                } else if (rule === "every") {
                  if (!set.has(c[keyField] + "")) {
                    has = false;
                    break;
                  }
                }
              }
              if (has) {
                break;
              } else {
                _deleteFromSet(data.slice(0, -1), set);
              }
            }
            i = i - 1;
          } while (i >= 0);
        };

        _deleteFromSet(data, set);
      }
      return set;
    },
    selectParent: function selectParent(item, checked) {
      var keyField = this.keyField,
          childField = this.childField,
          selectedRule = this.selectedRule;

      var set = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default.a(this.tree.checkedKeys.map(function (k) {
        return k + "";
      }));

      if (selectedRule === "some" || selectedRule === "every") {
        //将此节点及父级相关的节点push到selectedData
        var arr = Object(__WEBPACK_IMPORTED_MODULE_7_karma_ui_util_getAllParent__["a" /* default */])(this.tree.sourceData, item[keyField], keyField, childField);
        var checkedData = this.tree.checkedData;
        // console.log(arr)
        var vals = [];
        arr.forEach(function (el) {
          vals.push(el[keyField] + "");
        });

        if (checked) {
          //只要有一个子级被选中，则父级就被选中
          if (selectedRule === "some") {
            vals.forEach(function (k) {
              set.add(k);
            });
            //只有所有的子级都被选中，父级才会被选中
          } else if (selectedRule === "every") {
            //arr长度是1时代表只选择了一个根节点数据，此时不用向上找父级了
            if (arr.length === 1) {
              set.add(vals[0]);
            } else {
              var _everySelect = function _everySelect(arr, set) {
                var len = arr.length,
                    i = len - 1;
                do {
                  if (i === len - 1) {
                    set.add(arr[i][keyField] + "");
                  } else {
                    var childs = arr[i][childField];
                    if (childs && childs.length) {
                      var has = true;
                      for (var j = 0; j < childs.length; j++) {
                        var _item = childs[j];
                        if (!set.has(_item[keyField] + "")) {
                          has = false;
                          break;
                        }
                      }
                      if (has) {
                        _everySelect(arr.slice(0, -1), set);
                      } else {
                        break;
                      }
                    }
                  }
                  i = i - 1;
                } while (i >= 0);
              };

              _everySelect(arr, set);
            }
          }
        } else {
          if (selectedRule === "some") {
            //取消选中此项，
            //并判断同级有没有被选中，如果所有同级都没有被选中，则父级取消选中
            set = this.cancelChecked(arr, set);
          } else if (selectedRule === "every") {
            //如果有一个没有被选中，则父级取消选中
            set = this.cancelChecked(arr, set, "every");
          }
        }
        this.tree.checkedKeys = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(set));
      } else {
        if (checked) {
          set.add(item[keyField]);
        } else {
          set.delete(item[keyField]);
        }
        this.tree.checkedKeys = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(set));
      }
    },
    selectChilds: function selectChilds(item, checked) {
      var keyField = this.keyField,
          childField = this.childField,
          selectedRule = this.selectedRule;


      var set = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default.a(this.tree.checkedKeys.map(function (t) {
        return t + "";
      }));
      if (selectedRule === "some" || selectedRule === "every") {
        var _selectChildren = function _selectChildren(data, set) {
          var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "add";

          data.forEach(function (el) {
            set[type](el[keyField] + "");
            if (el[childField] && el[childField].length) {
              _selectChildren(el[childField], set, type);
            }
          });
        };

        if (item[childField] && item[childField].length) {
          if (checked) {
            _selectChildren(item[childField], set);
          } else {
            _selectChildren(item[childField], set, "delete");
          }
        }
      } else {
        if (checked) {
          set.add(item[keyField]);
        } else {
          set.delete(item[keyField]);
        }
      }
      this.tree.checkedKeys = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(set));
    },
    leafIcon: function leafIcon() {
      var h = this.$createElement;

      var icon = this.icon[2];
      return h("k-icon", { "class": "k-tree-icon-leaf", attrs: { name: icon }
      });
    },
    foldIcon: function foldIcon() {
      var h = this.$createElement;

      var icon = this.icon[0];
      var p = {
        props: {
          name: icon
        },
        class: "k-tree-icon"
      };
      return h("k-icon", p);
    },
    openIcon: function openIcon() {
      var h = this.$createElement;

      var icon = this.icon[1];
      var p = {
        props: {
          name: icon
        },
        class: "k-tree-icon"
      };
      return h("k-icon", p);
    },
    loadingIcon: function loadingIcon() {
      var h = this.$createElement;

      var p = {
        props: {
          name: "k-icon-loading"
        },
        class: "k-loading__icon k-tree-icon"
      };
      return h("k-icon", p);
    },
    renderText: function renderText(item) {
      var _this = this;

      var h = this.$createElement;
      var textField = this.textField,
          keyField = this.keyField,
          active = this.active,
          hasCheckbox = this.hasCheckbox;

      var p = {
        class: ["k-tree-text", {
          "k-tree-text--active": active == item[keyField]
        }],
        on: {
          click: function click() {
            // 暂时用不到这种方式
            // this.$emit("toggle", item)
            _this.tree.currentValue = item[keyField];
          }
        }
      };
      var text = null;
      if (this.scopedSlots && this.scopedSlots.default) {
        text = h(
          "span",
          p,
          [this.scopedSlots.default({
            item: item
          })]
        );
      } else {
        text = h(
          "span",
          p,
          [item[textField]]
        );
      }
      if (hasCheckbox) {
        var checkProp = {
          class: "k-tree-checkbox",
          props: {
            checked: this.isSelected(item),
            value: item[keyField]
          },
          on: {
            checkedChange: function checkedChange(checked) {
              //选中、取消选中子级所有节点
              _this.selectChilds(item, checked);
              //选中、取消选中父级所有节点
              _this.selectParent(item, checked);
              //复选或者取消复选时，当前节点数据
              _this.tree.$emit("select", checked, item);
              //选中、取消选中时，应向组件外抛出事件，把数据发送出去
              //发送的数据为扁平的数组
              //从tree组件将数组发出去
              //见tree组件中的createCheckedDataByCheckedKeys方法
            }
          },
          nativeOn: {
            click: function click(e) {
              e.stopPropagation();
            }
          }
        };
        return [h("k-checkbox", checkProp), text];
      }
      return text;
    },
    renderIconWrapper: function renderIconWrapper() {
      var _this2 = this;

      var h = this.$createElement;

      var icon = this.foldIcon();
      if (this.open) {
        icon = this.openIcon();
      } else {
        if (this.loading) {
          icon = this.loadingIcon();
        }
      }
      if (this.item[this.leafField]) {
        icon = this.leafIcon();
      }
      var p = {
        class: "k-tree-icon-wrapper"
      };
      if (!this.item[this.leafField]) {
        p.on = {
          click: function click(e) {
            _this2.handleIconClick();
          }
        };
      }
      return h(
        "span",
        p,
        [icon]
      );
    },

    //点击图标后展开、折叠、加载的操作
    handleIconClick: function handleIconClick() {
      var _this3 = this;

      var item = this.item,
          childField = this.childField,
          childData = this.item[childField],
          leafField = this.leafField;
      if (this.lazy) {
        if (!this.open) {
          if (!childData || childData.length === 0) {
            this.loading = true;
            this.lazyLoad(item).then(function (data) {
              if (data.length) {
                data.forEach(function (el) {
                  el.__open__ = false;
                });
                _this3.$set(_this3.item, childField, data);
              }
              _this3.$nextTick(function () {
                _this3.open = true;
                _this3.tree.$emit("expand", _this3.open, item);
              });
              _this3.loading = false;
            }).catch(function () {
              _this3.loading = false;
              console.warn("树形结构中的lazyLoad加载数据失败！");
            });
          } else {
            this.open = true;
          }
        } else {
          this.open = false;
        }
      } else {
        this.open = !this.open;
        if (childData && childData.length) {
          this.tree.$emit("expand", this.open, item);
        }
      }
    }
  },
  watch: {
    spread: function spread(v) {
      this.open = v;
    },
    open: function open(v) {
      this.$emit("update:spread", v, this.$el);
    }
  },
  render: function render() {
    var _this4 = this;

    var h = arguments[0];

    var childField = this.childField;
    var childData = this.item[childField];
    var open = this.open;
    //注意参数的传递！
    var child = {
      props: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, this.$props, {
        data: childData && childData.length ? childData : []
      }),
      on: {
        toggle: function toggle(e) {
          _this4.$emit("toggle", e);
        }
      },
      directives: [{
        name: "show",
        value: open
      }]
    };
    var itemProps = {
      class: ["k-tree-item", {
        "k-tree-item--dotted": this.isLastOne && open
      }]
    };
    return h(
      "div",
      itemProps,
      [this.renderIconWrapper(), this.renderText(this.item), h(
        "k-transition",
        {
          on: {
            "after-transition": function afterTransition($event) {
              for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                attrs[_key - 1] = arguments[_key];
              }

              (function () {
                _this4.tree.$emit("after-transition");
              }).apply(undefined, [$event].concat(attrs));
            }
          }
        },
        [h(__WEBPACK_IMPORTED_MODULE_6__treeList__["a" /* default */], child)]
      )]
    );
  }
});

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropdown__ = __webpack_require__(71);

__WEBPACK_IMPORTED_MODULE_0__dropdown__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__dropdown__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__dropdown__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__dropdown__["a" /* default */]);

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selectTree__ = __webpack_require__(252);

__WEBPACK_IMPORTED_MODULE_0__selectTree__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__selectTree__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__selectTree__["a" /* default */]);
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__selectTree__["a" /* default */]);

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_dropdown_dropdown__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_tree_tree__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_icon_icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_karma_ui_directives_loading_index__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_scrollbar_Scrollbar__ = __webpack_require__(67);









//TODO: 需增加clearable
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "KSelectTree",
  components: {
    KDropdown: __WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_dropdown_dropdown__["a" /* default */],
    KTree: __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_tree_tree__["a" /* default */],
    KIcon: __WEBPACK_IMPORTED_MODULE_6_karma_ui_packages_icon_icon__["a" /* default */]
  },
  //根据hasCheckbox判断是否是多选
  props: __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_tree_tree__["a" /* default */].props, {
    show: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择分类"
    },
    block: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    clearable: Boolean,
    //textField对应的值，text参数的作用是在树形数据懒加载时用的。因为懒加载
    //数据是空的，所以找不到对应的名字，故需要在组件外部事先给出来
    text: [String, Number]
  }),
  data: function data() {
    return {
      visible: this.show,
      checkedData: this.selectedData,
      checkedKeys: this.selectedKeys.join(","),
      list: [],
      currentVal: this.value,
      currentText: this.text //currentVal对应的具体值
    };
  },

  model: {
    prop: "value",
    event: "valueChange"
  },
  methods: {
    isSameKeys: function isSameKeys(arr1, arr2) {
      var a1 = JSON.parse(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(arr1)).sort(function (x, y) {
        return x - y;
      }).join(",");
      var a2 = JSON.parse(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(arr2)).sort(function (x, y) {
        return x - y;
      }).join(",");
      return a1 === a2;
    },
    checkedList: function checkedList() {
      var h = this.$createElement;

      if (this.hasCheckbox) {
        var list = h(
          "span",
          { "class": "k-select-tree-placeholder" },
          [this.placeholder]
        ),
            textField = this.textField,
            keyField = this.keyField,
            checkedData = this.checkedData;
        if (checkedData && checkedData.length) {
          list = checkedData.map(function (item, i) {
            return item[textField] + (i === checkedData.length - 1 ? "" : "，");
          });
        }
        return h(
          __WEBPACK_IMPORTED_MODULE_8_karma_ui_packages_scrollbar_Scrollbar__["a" /* default */],
          {
            attrs: { speed: 10 },
            "class": "k-select-tree-checked-list" },
          [h(
            "div",
            { "class": "k-select-tree-checked" },
            [list]
          )]
        );
      } else {
        return h(
          "div",
          { "class": "k-select-tree-checked-one" },
          [this.currentText]
        );
      }
    },
    title: function title() {
      var _this = this,
          _ref;

      var h = this.$createElement;

      var icon = null;
      if (this.checkedData && this.checkedData.length || this.clearable && this.currentVal !== "" && this.currentVal !== undefined) {
        icon = h("k-icon", __WEBPACK_IMPORTED_MODULE_1_babel_helper_vue_jsx_merge_props___default()([{
          "class": "k-select-tree-clear",
          attrs: { name: "k-icon-close",
            tabindex: "-1"
          }
        }, {
          on: {
            "focus": function focus($event) {
              for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                attrs[_key - 1] = arguments[_key];
              }

              (function (e) {
                e.stopPropagation();
              }).apply(undefined, [$event].concat(attrs));
            },
            "click": function click($event) {
              for (var _len2 = arguments.length, attrs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                attrs[_key2 - 1] = arguments[_key2];
              }

              (function (e) {
                if (_this.checkedData && _this.checkedData.length) {
                  _this.checkedKeys = "";
                } else if (_this.currentVal !== "" && _this.currentVal !== undefined && _this.clearable) {
                  _this.currentVal = "";
                  _this.currentText = '';
                }
                e.stopPropagation();
              }).apply(undefined, [$event].concat(attrs));
            }
          }
        }]));
      }
      var p = {
        attrs: {
          tabindex: 1
        },
        class: ["k-select-tree", (_ref = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, "k-select-tree--block", this.block), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, "k-select-tree--simple", this.simple), _ref)],
        on: {
          focus: function focus(e) {
            _this.visible = true;
          },
          click: function click(e) {
            e.stopPropagation();
          }
        }
      };
      return h(
        "div",
        p,
        [this.checkedList(), icon]
      );
    },
    body: function body() {
      var _this2 = this;

      var h = this.$createElement;

      var childField = this.childField,
          keyField = this.keyField,
          textField = this.textField;
      var list = this.list;
      var p = {
        props: __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, this.$props, {
          value: this.currentVal,
          selectedData: this.checkedData
        }),
        on: __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, this.$listeners, {
          valueChange: function valueChange(v) {
            _this2.currentVal = v;
            if (!_this2.hasCheckbox) {
              if (v !== '' && v !== undefined) {

                _this2.visible = false;
              }
            }
          },
          toggle: function toggle(arr) {
            if (arr.length) {
              var item = arr[arr.length - 1];
              _this2.currentText = item[textField];
            }
            _this2.$emit("toggle", arr);
          },
          "update:selectedData": function updateSelectedData(d) {
            _this2.checkedData = d;
          }
        })
      };
      if (this.visible) {
        p.directives = [{
          name: "loading",
          value: {
            loading: this.data.length === 0,
            content: "数据获取中..."
          }
        }];
      }
      return h(__WEBPACK_IMPORTED_MODULE_5_karma_ui_packages_tree_tree__["a" /* default */], p);
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];

    var title = this.title();
    var body = this.body();
    var p = {
      props: {
        show: this.visible,
        title: title,
        body: body,
        bodyClassName: "k-select-tree-body"
      },
      on: {
        "update:show": function updateShow(v) {
          _this3.visible = v;
        }
      }
    };
    return h(__WEBPACK_IMPORTED_MODULE_4_karma_ui_packages_dropdown_dropdown__["a" /* default */], p);
  },

  watch: {
    text: function text(t) {
      this.currentText = t;
    },
    currentVal: function currentVal(v) {
      this.$emit("valueChange", v);
    },
    value: function value(v) {
      this.currentVal = v;
    },
    visible: function visible(v) {
      this.$emit("update:show", v);
    },
    show: function show(v) {
      this.visible = v;
    },
    selectedData: function selectedData(d) {
      this.checkedData = d;
    },
    checkedData: function checkedData(d) {
      this.$emit("update:selectedData", d);
    },
    checkedKeys: function checkedKeys(v, oldv) {
      var arr = v.split(",");
      if (arr && arr.length && !arr[0]) {
        arr = [];
      }
      if (!this.isSameKeys(this.selectedKeys, arr)) {
        this.$emit("update:selectedKeys", arr);
      }
    },
    selectedKeys: function selectedKeys(v, oldv) {
      if (!this.isSameKeys(v, oldv)) {
        this.checkedKeys = v.join(",");
      }
    }
  },
  directives: {
    loading: __WEBPACK_IMPORTED_MODULE_7_karma_ui_directives_loading_index__["a" /* default */]
  }
});

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bind_js__ = __webpack_require__(110);

/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue, opts) {
    Vue.directive('dnd', __WEBPACK_IMPORTED_MODULE_0__bind_js__["a" /* default */]);
  }
});

/***/ }),
/* 254 */
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
              Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["f" /* setStyle */])(parentNode, {
                height: height
              });
              //
              Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
                position: 'fixed',
                top: arg + 'px',
                bottom: 'auto',
                width: elWidth
              });
              if (style) Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["f" /* setStyle */])(el, style);
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
              Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["f" /* setStyle */])(parentNode, {
                height: height
              });
              Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
                position: 'fixed',
                bottom: arg + 'px',
                top: 'auto',
                width: elWidth
              });
              if (style) Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["f" /* setStyle */])(el, style);
            } else {
              isBottomPining = false;
              !isTopPining && el.removeAttribute('style');
            }
          }

          //单独对resize时做处理，由于resize时，el的宽度可能会变化
          if (e.type === 'resize') {
            Object(__WEBPACK_IMPORTED_MODULE_0_karma_ui_util_dom_js__["f" /* setStyle */])(el, {
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
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_karma_ui_util_inVisibleRange_js__ = __webpack_require__(256);

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
/* 256 */
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