exports.id = "component---src-pages-twitter-timeline-js";
exports.ids = ["component---src-pages-twitter-timeline-js"];
exports.modules = {

/***/ "./src/components/css/twitter.module.css":
/*!***********************************************!*\
  !*** ./src/components/css/twitter.module.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "twitterFrame": () => (/* binding */ twitterFrame)
/* harmony export */ });
// Exports
var twitterFrame = "twitter-module--twitterFrame--89f1c";


/***/ }),

/***/ "./src/pages/twitter_timeline.js?export=default":
/*!******************************************************!*\
  !*** ./src/pages/twitter_timeline.js?export=default ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_3358258035_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/3358258035.json */ "./public/page-data/sq/d/3358258035.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_twitter_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-twitter-widgets */ "./node_modules/react-twitter-widgets/es/index.js");
/* harmony import */ var _components_css_twitter_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/css/twitter.module.css */ "./src/components/css/twitter.module.css");



// CSS読み込み

const TwitterTimeLine = () => {
  const data = _public_page_data_sq_d_3358258035_json__WEBPACK_IMPORTED_MODULE_0__.data;
  // console.log(data,"TwitterTimeline")
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: _components_css_twitter_module_css__WEBPACK_IMPORTED_MODULE_3__.twitterFrame
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_twitter_widgets__WEBPACK_IMPORTED_MODULE_2__.Timeline, {
    dataSource: {
      sourceType: 'profile',
      screenName: data.site.siteMetadata.social.twitter // アカウント名
    },

    options: {
      height: '600'
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TwitterTimeLine);

/***/ }),

/***/ "./node_modules/loadjs/dist/loadjs.umd.js":
/*!************************************************!*\
  !*** ./node_modules/loadjs/dist/loadjs.umd.js ***!
  \************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function() {
/**
 * Global dependencies.
 * @global {Object} document - DOM
 */

var devnull = function() {},
    bundleIdCache = {},
    bundleResultCache = {},
    bundleCallbackQueue = {};


/**
 * Subscribe to bundle load event.
 * @param {string[]} bundleIds - Bundle ids
 * @param {Function} callbackFn - The callback function
 */
function subscribe(bundleIds, callbackFn) {
  // listify
  bundleIds = bundleIds.push ? bundleIds : [bundleIds];

  var depsNotFound = [],
      i = bundleIds.length,
      numWaiting = i,
      fn,
      bundleId,
      r,
      q;

  // define callback function
  fn = function (bundleId, pathsNotFound) {
    if (pathsNotFound.length) depsNotFound.push(bundleId);

    numWaiting--;
    if (!numWaiting) callbackFn(depsNotFound);
  };

  // register callback
  while (i--) {
    bundleId = bundleIds[i];

    // execute callback if in result cache
    r = bundleResultCache[bundleId];
    if (r) {
      fn(bundleId, r);
      continue;
    }

    // add to callback queue
    q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
    q.push(fn);
  }
}


/**
 * Publish bundle load event.
 * @param {string} bundleId - Bundle id
 * @param {string[]} pathsNotFound - List of files not found
 */
function publish(bundleId, pathsNotFound) {
  // exit if id isn't defined
  if (!bundleId) return;

  var q = bundleCallbackQueue[bundleId];

  // cache result
  bundleResultCache[bundleId] = pathsNotFound;

  // exit if queue is empty
  if (!q) return;

  // empty callback queue
  while (q.length) {
    q[0](bundleId, pathsNotFound);
    q.splice(0, 1);
  }
}


/**
 * Execute callbacks.
 * @param {Object or Function} args - The callback args
 * @param {string[]} depsNotFound - List of dependencies not found
 */
function executeCallbacks(args, depsNotFound) {
  // accept function as argument
  if (args.call) args = {success: args};

  // success and error callbacks
  if (depsNotFound.length) (args.error || devnull)(depsNotFound);
  else (args.success || devnull)(args);
}


/**
 * Load individual file.
 * @param {string} path - The file path
 * @param {Function} callbackFn - The callback function
 */
function loadFile(path, callbackFn, args, numTries) {
  var doc = document,
      async = args.async,
      maxTries = (args.numRetries || 0) + 1,
      beforeCallbackFn = args.before || devnull,
      pathname = path.replace(/[\?|#].*$/, ''),
      pathStripped = path.replace(/^(css|img)!/, ''),
      isLegacyIECss,
      e;

  numTries = numTries || 0;

  if (/(^css!|\.css$)/.test(pathname)) {
    // css
    e = doc.createElement('link');
    e.rel = 'stylesheet';
    e.href = pathStripped;

    // tag IE9+
    isLegacyIECss = 'hideFocus' in e;

    // use preload in IE Edge (to detect load errors)
    if (isLegacyIECss && e.relList) {
      isLegacyIECss = 0;
      e.rel = 'preload';
      e.as = 'style';
    }
  } else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(pathname)) {
    // image
    e = doc.createElement('img');
    e.src = pathStripped;    
  } else {
    // javascript
    e = doc.createElement('script');
    e.src = path;
    e.async = async === undefined ? true : async;
  }

  e.onload = e.onerror = e.onbeforeload = function (ev) {
    var result = ev.type[0];

    // treat empty stylesheets as failures to get around lack of onerror
    // support in IE9-11
    if (isLegacyIECss) {
      try {
        if (!e.sheet.cssText.length) result = 'e';
      } catch (x) {
        // sheets objects created from load errors don't allow access to
        // `cssText` (unless error is Code:18 SecurityError)
        if (x.code != 18) result = 'e';
      }
    }

    // handle retries in case of load failure
    if (result == 'e') {
      // increment counter
      numTries += 1;

      // exit function and try again
      if (numTries < maxTries) {
        return loadFile(path, callbackFn, args, numTries);
      }
    } else if (e.rel == 'preload' && e.as == 'style') {
      // activate preloaded stylesheets
      return e.rel = 'stylesheet'; // jshint ignore:line
    }
    
    // execute callback
    callbackFn(path, result, ev.defaultPrevented);
  };

  // add to document (unless callback returns `false`)
  if (beforeCallbackFn(path, e) !== false) doc.head.appendChild(e);
}


/**
 * Load multiple files.
 * @param {string[]} paths - The file paths
 * @param {Function} callbackFn - The callback function
 */
function loadFiles(paths, callbackFn, args) {
  // listify paths
  paths = paths.push ? paths : [paths];

  var numWaiting = paths.length,
      x = numWaiting,
      pathsNotFound = [],
      fn,
      i;

  // define callback function
  fn = function(path, result, defaultPrevented) {
    // handle error
    if (result == 'e') pathsNotFound.push(path);

    // handle beforeload event. If defaultPrevented then that means the load
    // will be blocked (ex. Ghostery/ABP on Safari)
    if (result == 'b') {
      if (defaultPrevented) pathsNotFound.push(path);
      else return;
    }

    numWaiting--;
    if (!numWaiting) callbackFn(pathsNotFound);
  };

  // load scripts
  for (i=0; i < x; i++) loadFile(paths[i], fn, args);
}


/**
 * Initiate script load and register bundle.
 * @param {(string|string[])} paths - The file paths
 * @param {(string|Function|Object)} [arg1] - The (1) bundleId or (2) success
 *   callback or (3) object literal with success/error arguments, numRetries,
 *   etc.
 * @param {(Function|Object)} [arg2] - The (1) success callback or (2) object
 *   literal with success/error arguments, numRetries, etc.
 */
function loadjs(paths, arg1, arg2) {
  var bundleId,
      args;

  // bundleId (if string)
  if (arg1 && arg1.trim) bundleId = arg1;

  // args (default is {})
  args = (bundleId ? arg2 : arg1) || {};

  // throw error if bundle is already defined
  if (bundleId) {
    if (bundleId in bundleIdCache) {
      throw "LoadJS";
    } else {
      bundleIdCache[bundleId] = true;
    }
  }

  function loadFn(resolve, reject) {
    loadFiles(paths, function (pathsNotFound) {
      // execute callbacks
      executeCallbacks(args, pathsNotFound);
      
      // resolve Promise
      if (resolve) {
        executeCallbacks({success: resolve, error: reject}, pathsNotFound);
      }

      // publish bundle load event
      publish(bundleId, pathsNotFound);
    }, args);
  }
  
  if (args.returnPromise) return new Promise(loadFn);
  else loadFn();
}


/**
 * Execute callbacks when dependencies have been satisfied.
 * @param {(string|string[])} deps - List of bundle ids
 * @param {Object} args - success/error arguments
 */
loadjs.ready = function ready(deps, args) {
  // subscribe to bundle load event
  subscribe(deps, function (depsNotFound) {
    // execute callbacks
    executeCallbacks(args, depsNotFound);
  });

  return loadjs;
};


/**
 * Manually satisfy bundle dependencies.
 * @param {string} bundleId - The bundle id
 */
loadjs.done = function done(bundleId) {
  publish(bundleId, []);
};


/**
 * Reset loadjs dependencies statuses
 */
loadjs.reset = function reset() {
  bundleIdCache = {};
  bundleResultCache = {};
  bundleCallbackQueue = {};
};


/**
 * Determine if bundle has already been defined
 * @param String} bundleId - The bundle id
 */
loadjs.isDefined = function isDefined(bundleId) {
  return bundleId in bundleIdCache;
};


// export
return loadjs;

}));


/***/ }),

/***/ "./node_modules/react-twitter-widgets/es/index.js":
/*!********************************************************!*\
  !*** ./node_modules/react-twitter-widgets/es/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Follow": () => (/* binding */ Follow),
/* harmony export */   "Hashtag": () => (/* binding */ Hashtag),
/* harmony export */   "Mention": () => (/* binding */ Mention),
/* harmony export */   "Share": () => (/* binding */ Share),
/* harmony export */   "Timeline": () => (/* binding */ Timeline),
/* harmony export */   "Tweet": () => (/* binding */ Tweet),
/* harmony export */   "eagerLoadTwitterLibrary": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_1__.loadTwitterLibrary)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/react-twitter-widgets/es/utils.js");



var childDivIdentifyingAttribute = "twdiv";

function useTwitterWidget(factoryFunctionName, primaryArg, options, onLoad) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      error = _useState[0],
      setError = _useState[1];

  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // noop if ssr

  if (!_utils__WEBPACK_IMPORTED_MODULE_1__.canUseDOM) {
    return {
      ref: ref,
      error: error
    };
  } // Make deps for useEffect.
  // options, and possibly primaryArg, are objects that should be compared (shallow).
  // There currently aren't any nested arrays or objects, so they
  // can be cloned in a shallow manner.
  // NOTE onLoad is used in useCallback, but it is not listed as a dependency.
  // Listing it would likely cause unnecessary loads. The latest onLoad should be
  // used regardless, since it will not be called unless the other dependencies
  // change, so it works out.


  var deps = [factoryFunctionName, (0,_utils__WEBPACK_IMPORTED_MODULE_1__.useShallowCompareMemoize)(primaryArg), (0,_utils__WEBPACK_IMPORTED_MODULE_1__.useShallowCompareMemoize)(options)];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Reset error
    setError(null); // Protect against race conditions
    // (set to true in cleanup function;
    // checked if canceled in async loadWidget)

    var isCanceled = false;

    if (ref.current) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.removeChildrenWithAttribute)(ref.current, childDivIdentifyingAttribute);

      if (!ref || !ref.current) {
        return;
      }

      var childEl = document.createElement("div");
      childEl.setAttribute(childDivIdentifyingAttribute, "yes");
      ref.current.appendChild(childEl);
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.twWidgetFactory)().then(function (wf) {
        // primaryArg (possibly an object) and options must be cloned
        // since twitter mutates them (gah!).
        // There currently aren't any nested arrays or objects, so they
        // can be cloned in a shallow manner.
        return wf[factoryFunctionName]((0,_utils__WEBPACK_IMPORTED_MODULE_1__.cloneShallow)(primaryArg), childEl, (0,_utils__WEBPACK_IMPORTED_MODULE_1__.cloneShallow)(options));
      }).then(function (resultMaybe) {
        // Twitter returns undefined if widget creation fails.
        // However, if deps are stale (isCanceled), suppress error (likely race condition).
        if (!resultMaybe && !isCanceled) {
          throw new Error("Twitter could not create widget. If it is a Timeline or " + "Tweet, ensure the screenName/tweetId exists.");
        }

        if (!ref || !ref.current) {
          return;
        }

        if (isCanceled) {
          if (childEl) {
            childEl.remove();
          }

          return;
        }

        if (onLoad) {
          onLoad();
        }
      })["catch"](function (e) {
        console.error(e);
        setError(e);
      });
    }

    return function () {
      isCanceled = true;
    };
  }, deps);
  return {
    ref: ref,
    error: error
  };
}

var Follow = function Follow(_ref) {
  var username = _ref.username,
      options = _ref.options,
      onLoad = _ref.onLoad,
      renderError = _ref.renderError;

  var _useTwitterWidget = useTwitterWidget("createFollowButton", username, options, onLoad),
      ref = _useTwitterWidget.ref,
      error = _useTwitterWidget.error;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: ref
  }, error && renderError && renderError(error));
};
var Hashtag = function Hashtag(_ref2) {
  var hashtag = _ref2.hashtag,
      options = _ref2.options,
      onLoad = _ref2.onLoad,
      renderError = _ref2.renderError;

  var _useTwitterWidget2 = useTwitterWidget("createHashtagButton", hashtag, options, onLoad),
      ref = _useTwitterWidget2.ref,
      error = _useTwitterWidget2.error;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: ref
  }, error && renderError && renderError(error));
};
var Mention = function Mention(_ref3) {
  var username = _ref3.username,
      options = _ref3.options,
      onLoad = _ref3.onLoad,
      renderError = _ref3.renderError;

  var _useTwitterWidget3 = useTwitterWidget("createMentionButton", username, options, onLoad),
      ref = _useTwitterWidget3.ref,
      error = _useTwitterWidget3.error;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: ref
  }, error && renderError && renderError(error));
};
var Share = function Share(_ref4) {
  var url = _ref4.url,
      options = _ref4.options,
      onLoad = _ref4.onLoad,
      renderError = _ref4.renderError;

  var _useTwitterWidget4 = useTwitterWidget("createShareButton", url, options, onLoad),
      ref = _useTwitterWidget4.ref,
      error = _useTwitterWidget4.error;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: ref
  }, error && renderError && renderError(error));
};
var Timeline = function Timeline(_ref5) {
  var dataSource = _ref5.dataSource,
      options = _ref5.options,
      onLoad = _ref5.onLoad,
      renderError = _ref5.renderError;

  var _useTwitterWidget5 = useTwitterWidget("createTimeline", dataSource, options, onLoad),
      ref = _useTwitterWidget5.ref,
      error = _useTwitterWidget5.error;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: ref
  }, error && renderError && renderError(error));
};
var Tweet = function Tweet(_ref6) {
  var tweetId = _ref6.tweetId,
      options = _ref6.options,
      onLoad = _ref6.onLoad,
      renderError = _ref6.renderError;

  var _useTwitterWidget6 = useTwitterWidget("createTweet", tweetId, options, onLoad),
      ref = _useTwitterWidget6.ref,
      error = _useTwitterWidget6.error;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: ref
  }, error && renderError && renderError(error));
};

/***/ }),

/***/ "./node_modules/react-twitter-widgets/es/utils.js":
/*!********************************************************!*\
  !*** ./node_modules/react-twitter-widgets/es/utils.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canUseDOM": () => (/* binding */ canUseDOM),
/* harmony export */   "cloneShallow": () => (/* binding */ cloneShallow),
/* harmony export */   "loadTwitterLibrary": () => (/* binding */ loadTwitterLibrary),
/* harmony export */   "removeChildrenWithAttribute": () => (/* binding */ removeChildrenWithAttribute),
/* harmony export */   "twWidgetFactory": () => (/* binding */ twWidgetFactory),
/* harmony export */   "useShallowCompareMemoize": () => (/* binding */ useShallowCompareMemoize)
/* harmony export */ });
/* harmony import */ var loadjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loadjs */ "./node_modules/loadjs/dist/loadjs.umd.js");
/* harmony import */ var loadjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(loadjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var twScriptUrl = "https://platform.twitter.com/widgets.js";
var twScriptWindowFieldName = "twttr";
var twScriptName = twScriptWindowFieldName;
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function loadTwitterLibrary() {
  if (!loadjs__WEBPACK_IMPORTED_MODULE_0___default().isDefined(twScriptName)) {
    loadjs__WEBPACK_IMPORTED_MODULE_0___default()(twScriptUrl, twScriptName);
  }
}
function twWidgetFactory() {
  return new Promise(function (resolve, reject) {
    var rejectWithError = function rejectWithError() {
      return reject(new Error("Could not load remote twitter widgets js"));
    };

    loadTwitterLibrary();
    loadjs__WEBPACK_IMPORTED_MODULE_0___default().ready(twScriptName, {
      success: function success() {
        // Ensure loaded
        var twttr = window[twScriptWindowFieldName];

        if (!twttr || !twttr.widgets) {
          rejectWithError();
        }

        resolve(twttr.widgets);
      },
      error: rejectWithError
    });
  });
}
function removeChildrenWithAttribute(node, attribute) {
  if (node) {
    node.querySelectorAll("*").forEach(function (child) {
      if (child.hasAttribute(attribute)) {
        child.remove();
      }
    });
  }
}

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function isShallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function useShallowCompareMemoize(value) {
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();

  if (!isShallowEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
function cloneShallow(value) {
  return typeof value === "object" ? Object.assign({}, value) : value;
}

/***/ }),

/***/ "./public/page-data/sq/d/3358258035.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/3358258035.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"data":{"site":{"siteMetadata":{"social":{"twitter":"tm_web_jc"}}}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-twitter-timeline-js.js.map