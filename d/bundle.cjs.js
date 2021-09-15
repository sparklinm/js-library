'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.array.concat');
require('core-js/modules/es.array.slice');
require('core-js/modules/es.object.to-string');
require('core-js/modules/es.promise');
require('core-js/modules/es.array.for-each');
require('core-js/modules/es.array.iterator');
require('core-js/modules/es.array.join');
require('core-js/modules/es.object.assign');
require('core-js/modules/es.regexp.exec');
require('core-js/modules/es.string.iterator');
require('core-js/modules/es.string.replace');
require('core-js/modules/es.string.split');
require('core-js/modules/es.string.starts-with');
require('core-js/modules/es.typed-array.uint8-array');
require('core-js/modules/es.typed-array.copy-within');
require('core-js/modules/es.typed-array.every');
require('core-js/modules/es.typed-array.fill');
require('core-js/modules/es.typed-array.filter');
require('core-js/modules/es.typed-array.find');
require('core-js/modules/es.typed-array.find-index');
require('core-js/modules/es.typed-array.for-each');
require('core-js/modules/es.typed-array.includes');
require('core-js/modules/es.typed-array.index-of');
require('core-js/modules/es.typed-array.iterator');
require('core-js/modules/es.typed-array.join');
require('core-js/modules/es.typed-array.last-index-of');
require('core-js/modules/es.typed-array.map');
require('core-js/modules/es.typed-array.reduce');
require('core-js/modules/es.typed-array.reduce-right');
require('core-js/modules/es.typed-array.reverse');
require('core-js/modules/es.typed-array.set');
require('core-js/modules/es.typed-array.slice');
require('core-js/modules/es.typed-array.some');
require('core-js/modules/es.typed-array.sort');
require('core-js/modules/es.typed-array.subarray');
require('core-js/modules/es.typed-array.to-locale-string');
require('core-js/modules/es.typed-array.to-string');
require('core-js/modules/web.dom-collections.for-each');
require('core-js/modules/web.dom-collections.iterator');
require('core-js/modules/web.url');
require('core-js/modules/es.array.includes');
require('core-js/modules/es.array.index-of');
require('core-js/modules/es.array.map');
require('core-js/modules/es.regexp.to-string');
require('core-js/modules/es.string.match');
require('core-js/modules/es.reflect.construct');
require('core-js/modules/es.array.filter');
require('core-js/modules/es.array.splice');
require('core-js/modules/es.function.name');
require('core-js/modules/es.array.reduce');
require('core-js/modules/es.array.some');
require('core-js/modules/es.promise.finally');
require('core-js/modules/es.weak-map');
require('core-js/modules/es.weak-set');
require('core-js/modules/es.object.keys');
var parser = require('@babel/parser');
var generator = require('@babel/generator');
var traverse$1 = require('@babel/traverse');
require('core-js/modules/es.symbol');
require('core-js/modules/es.array.fill');
require('core-js/modules/es.array.find-index');
require('core-js/modules/es.number.constructor');
require('core-js/modules/es.number.is-integer');
require('core-js/modules/es.object.get-own-property-descriptor');
require('core-js/modules/es.object.get-own-property-descriptors');
require('core-js/modules/es.string.includes');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var parser__default = /*#__PURE__*/_interopDefaultLegacy(parser);
var generator__default = /*#__PURE__*/_interopDefaultLegacy(generator);
var traverse__default = /*#__PURE__*/_interopDefaultLegacy(traverse$1);

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

/* eslint-disable no-unused-vars */

/**
 * 通用函数。
 * @module common
 */

/**
 * @static
 * @description 函数柯里化。
 * @example
 * function add(a, b) {
 *  return a + b
 * }
 * var curriedAdd = curry(add)
 * var addFive = curriedAdd(5)
 * var result = [0, 1, 2, 3, 4, 5].map(addFive)
 * // [5, 6, 7, 8, 9, 10]
 * @param {function} fn 需要柯里化的函数，函数“无默认值的参数”个数不为0。
 * @return {function} 柯里化后的函数。
 */
function curry(fn) {
  // fn的无默认值参数的个数
  if (fn.length === 0) {
    return fn;
  }

  function _curried(depth, args) {
    return function (newArgument) {
      // 需要传入fn需要的参数个数，才会返回值
      if (depth - 1 === 0) {
        return fn.apply(void 0, toConsumableArray(args).concat([newArgument]));
      }

      return _curried(depth - 1, [].concat(toConsumableArray(args), [newArgument]));
    };
  }

  return _curried(fn.length, []);
}
/**
 * @static
 * @description 最大重复数数量
 * @example
 * countMaxDuplicateNumber([1,2,2,5,5,5])
 * // 3
 * @param {Array<Number>} array 数字数组
 * @return {Number} 数量
 */


function countMaxDuplicateNumber(array) {
  if (!array.length) {
    return 0;
  }

  var sortedAry = array.sort(function (a, b) {
    return a - b;
  });
  var count = 1;
  var max = 1;

  for (var i = 1; i < sortedAry.length; i++) {
    if (sortedAry[i - 1] === sortedAry[i]) {
      max++;
    } else {
      if (max > count) {
        count = max;
      }

      max = 1;
    }
  }

  return count;
}
/**
 * @static
 * @description requestAnimationFrame 节流函数。
 * @param {Function} fn 数字数组。
 * @return {Function} 节流函数。
 */


function throttle$1(fn) {
  var curTick = false;
  var that = this;
  var params = Array.prototype.slice.call(arguments);
  params.shift();
  return function () {
    var curParams = Array.prototype.slice.call(arguments);

    if (!curTick) {
      curTick = true;
      requestAnimationFrame(function () {
        fn.apply(that, [].concat(toConsumableArray(curParams), [params]));
        curTick = false;
      });
    }
  };
}
/**
 * @static
 * @description 依次按序执行 promise，全部调用完毕后返回一个新的 promise。
 * @example
 * function getA() {
 *     return new Promise((resolve, reject) => {
 *         get('/user/a', (status, res) => {
 *             if (status == 200) {
 *                 resolve(res)
 *             } else {
 *                 reject('error')
 *             }
 *         })
 *     })
 * }
 *
 * function getB(dataA) {
 *     return new Promise((resolve, reject) => {
 *         get('/user/b', dataA, (status, res) => {
 *             if (status == 200) {
 *                 resolve(res)
 *             } else {
 *                 reject('error')
 *             }
 *         })
 *
 *     })
 * }
 *
 * function getC(dataB) {
 *     return new Promise((resolve, reject) => {
 *         get('/user/c', dataB, (status, res) => {
 *             if (status == 200) {
 *                 resolve(res)
 *             } else {
 *                 reject('error')
 *             }
 *         })
 *
 *     })
 * }
 *
 * promiseOrder([getA,getB,getC]).then((res)=>{
 *     console.log('success');
 *     console.log(res);
 * })
 * @param {Arry} pFAry 数组，元素是函数，函数返回 promise 对象。
 * 函数接收上一次 promise resolve 的参数。
 * @returns {Promise} 新的 fulfilled 状态 promise 对象。
 * 传递最后一次 promise resolve 的参数。
 */


function promiseOrder(pFAry) {
  return new Promise(function (resolve, reject) {
    var promise = Promise.resolve(); // 由于要最后一个promise执行完毕，才resolve，这里需要pFAry.length + 1

    var _loop = function _loop(i) {
      promise = promise.then(function (res) {
        if (i === pFAry.length) {
          resolve(res);
        } else {
          return pFAry[i](res);
        }
      }).catch(function (error) {
        reject(error); // 捕获错误后由于下一次循环依然会添加then，需要返回一个pending状态的promise来中断后面的所有操作

        return new Promise(function () {});
      });
    };

    for (var i = 0; i < pFAry.length + 1; i++) {
      _loop(i);
    }
  });
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

/**
 * 页面相关函数。
 * @module html
 */

/**
 * @static
 * @description 判断页面是否可以滚动
 * @return {Boolean} trye or false
 */

function checkPageCanScroll$1() {
  var viewHeight = document.documentElement.clientHeight;
  var viewWidth = document.documentElement.clientWidth;
  var bodyStyle = window.getComputedStyle(document.body);
  var htmlStyle = window.getComputedStyle(document.documentElement);
  return bodyStyle.overflow !== 'hidden' && htmlStyle.overflow !== 'hidden' && (document.documentElement.scrollHeight > viewHeight || document.documentElement.scrollWidth > viewWidth);
}
/**
 * @static
 * @description 判断节点内部是否可以滚动
 * @param {HTMLElement} el html 节点
 * @return {Boolean} trye or false
 */


function checkNodeCanScroll$1(el) {
  var elStyle = window.getComputedStyle(el);
  return (elStyle.overflow === 'scroll' || elStyle.overflow === 'auto') && (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth);
}
/**
 * @static
 * @description 截断文字添加省略号，单位长度为一个汉字长度。
 * @example
 * cutText('xxxyyy', 2)
 * // xxxy
 * @param {String} text 字符
 * @param {Number} length 长度，以一个汉字长度为单位
 * @return {String} 截断后的字符
 */


function cutText(text, length) {
  var realLength = 0;
  var charCode = -1;
  var index = 0;

  for (var i = 0; i < text.length; i++) {
    charCode = text.charCodeAt(i);

    if (charCode >= 0 && charCode <= 128) {
      // 占一个宽度的字符
      realLength += 1;
    } else {
      // 占两个宽度的字符，例如：汉字
      realLength += 2;
    }

    if (realLength > length * 2) {
      index = i;
      break;
    }
  }

  if (index > length - 1) {
    return text.slice(0, index) + '...';
  }

  return text;
}
/**
 * @static
 * @description 获取 canvas 存储的像素比 和 屏幕像素比比值 。<br>
 * 即如果比值为x，那么canvas的真正大小（width属性）应该是：css像素*x。
 * @return {Number} 比值。
 */


function getPixelRatio() {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
  var devicePixelRatio = window.devicePixelRatio || 1;
  return devicePixelRatio / backingStoreRatio;
}
/**
 * @static
 * @description 获取 canvas dataURL（转化为图片）。<br>
 * 获取的图片分辨率适应当前设备的设备像素比，即在 Retina 屏幕下获取的图片分辨率更高。
 * @param {HTMLElement} canvas - canvas 节点。
 * @return {String} dataURL。
 */


function canvasToImg(canvas) {
  var scale = getPixelRatio();
  var style = window.getComputedStyle(canvas);
  canvas.width = scale * parseFloat(style.width);
  canvas.height = scale * parseFloat(style.height);
  return canvas.toDataURL();
}
/**
 * @static
 * @description 图片 url 转换为 dataURL。
 * @param {String} url - 图片 url。
 * @returns {String} dataURL。
 */


function urlToDataURL(url) {
  return new Promise(function (resolve, reject) {
    var image = new Image();

    image.onload = function () {
      var canvas = document.createElement('canvas'); // 实际宽高

      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight; // 将图片插入画布并开始绘制

      canvas.getContext('2d').drawImage(image, 0, 0); // result

      var result = canvas.toDataURL('image/png');
      resolve(result);
    }; // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror


    image.setAttribute('crossOrigin', 'Anonymous');
    image.src = url; // 图片加载失败的错误处理

    image.onerror = function () {
      reject(new Error('img error'));
    };
  });
}
/**
 * @static
 * @example
 * blobToDataURL(blob).then(dataURL => {
 *   console.log(dataURL)
 * })
 * @description blob 对象转换为 dataURL。
 * @param {Blob} blob - blob 对象。
 * @returns {String} dataURL 。
 */


function blobToDataURL(blob) {
  return new Promise(function (resolve, reject) {
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      resolve(e.target.result);
    }; // readAsDataURL


    fileReader.readAsDataURL(blob);

    fileReader.onerror = function () {
      reject(new Error('file error'));
    };
  });
}
/**
 * @static
 * @description dataURL 转换为 blob 对象。
 * @param {String} dataURL - dataURL。
 * @returns {Blob} Blob 对象。
 */


function dataURLToBlob(dataURL) {
  // atob：解码base64，并提取data部分
  var data = atob(dataURL.split(',')[1]);
  var len = data.length;
  var arr = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    arr[i] = data.charCodeAt(i);
  }

  return new Blob([arr]);
}
/**
 * @static
 * @description 下载图片。
 * 依赖于 a 标签的 download 兼容性，移动端兼容性差。
 * @param {String} src - 图片链接，可以是blob url, dataURL, 网络图片（http开头）。
 * @param {Number} imgName - 图片名字。
 * 需要加上格式，同时原图片是什么格式，这里就必须是什么格式。
 * @param {Number} useType
 * 可选值为 dataURL 或者 blobURL，表示转换为哪种格式下载。
 * 仅对 dataURL, 网络图片 有效，本身为 blobURL 不可转换。
 * 如果是网络图片，不转换成 dataURL 或者 blobURL 无法跨域下载。
 */


function downloadImg(_x, _x2, _x3) {
  return _downloadImg.apply(this, arguments);
}
/**
 * @static
 * @description 插入字符串形式的 script 标签。
 * @example
 * insertScripts('<script></script><script></script>')
 * insertScripts(['<script></script><script></script>','<script></script>'])
 * @param {String|Array} scripts - 字符串形式的 script 标签。
 * @param {HTMLElement} container 插入到的节点容器。
 */


function _downloadImg() {
  _downloadImg = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(src, imgName, useType) {
    var url, type, download, blob, _blob;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = '';
            type = '';

            if (src.startsWith('blob:')) {
              // 本身是 blob url
              type = 'blobURL';
            } else if (src.startsWith('data:')) {
              type = 'dataURL';
            } else {
              type = 'httpURL';
            }

            download = function download(url) {
              var a = document.createElement('a');
              a.download = imgName;
              a.href = url;
              a.click();
              a.remove();
            };

            if (!(type === 'blobURL')) {
              _context.next = 8;
              break;
            }

            // 本身是 blob url
            url = src;
            download(url);
            return _context.abrupt("return");

          case 8:
            if (!(type === 'dataURL')) {
              _context.next = 21;
              break;
            }

            if (!(useType === 'blobURL')) {
              _context.next = 18;
              break;
            }

            blob = dataURLToBlob(src);

            if (!window.navigator.msSaveBlob) {
              _context.next = 14;
              break;
            }

            try {
              window.navigator.msSaveBlob(blob, imgName);
            } catch (e) {
              console.error(e);
            }

            return _context.abrupt("return");

          case 14:
            url = URL.createObjectURL(blob);
            download(url);
            URL.revokeObjectURL(url);
            return _context.abrupt("return");

          case 18:
            url = src;
            download(url);
            return _context.abrupt("return");

          case 21:
            if (!(useType === 'dataURL')) {
              _context.next = 27;
              break;
            }

            _context.next = 24;
            return urlToDataURL(src);

          case 24:
            url = _context.sent;
            download(url);
            return _context.abrupt("return");

          case 27:
            if (!(useType === 'blobURL')) {
              _context.next = 39;
              break;
            }

            _context.next = 30;
            return urlToDataURL(src);

          case 30:
            url = _context.sent;
            _blob = dataURLToBlob(url);

            if (!window.navigator.msSaveBlob) {
              _context.next = 35;
              break;
            }

            try {
              window.navigator.msSaveBlob(_blob, imgName);
            } catch (e) {
              console.error(e);
            }

            return _context.abrupt("return");

          case 35:
            url = URL.createObjectURL(_blob);
            download(url);
            URL.revokeObjectURL(url);
            return _context.abrupt("return");

          case 39:
            url = src;
            download(url);

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _downloadImg.apply(this, arguments);
}

function insertScripts(scripts, container) {
  if (document) {
    var str = Array.isArray(scripts) ? scripts.join('') : scripts;
    var cont = document.createElement('div');
    cont.innerHTML = str;
    var oldScripts = cont.querySelectorAll('script');
    cont = null;
    oldScripts.forEach(function (oldScript) {
      var newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.innerHTML = oldScript.innerHTML;

      if (oldScript.src) {
        newScript.src = oldScript.src;
      }

      if (container) {
        container.appendChild(newScript);
      } else {
        document.documentElement.appendChild(newScript);
      }
    });
  }
}
/**
 * @static
 * @description HTML转义。
 * @example
 * HTMLEncode('<div class=""> xx </div>')
 * // &lt;div&nbsp;class=&quot;&quot;&gt;&nbsp;xx&nbsp;&lt;/div&gt;
 * @param {String} str - 字符串形式的html。
 * @returns {String} - 转义后的字符串html。
 */


function HTMLEncode(str) {
  if (typeof document !== 'undefined') {
    var temp = document.createElement('div');
    temp.textContent !== null ? temp.textContent = str : temp.innerText = str;
    var output = temp.innerHTML;
    temp = null;
    return output;
  }

  var s = '';
  if (str.length === 0) return '';
  s = str.replace(/&/g, '&amp;');
  s = s.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  s = s.replace(/ /g, '&nbsp;');
  s = s.replace(/'/g, '&#39;');
  s = s.replace(/"/g, '&quot;');
  s = s.replace(/\n/g, '<br/>');
  return s;
}
/**
 * @static
 * @description 解析转义后的html。
 * @example
 * HTMLEncode('&lt;div&nbsp;class=&quot;&quot;&gt;&nbsp;xx&nbsp;&lt;/div&gt;')
 * // <div class=""> xx </div>
 * @param {String} str - 转义后的字符串html。
 * @returns {String} - 字符串形式的html。
 */


function HTMLDecode(str) {
  if (typeof document !== 'undefined') {
    var temp = document.createElement('div');
    temp.innerHTML = str;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  }

  var s = '';
  if (str.length === 0) return '';
  s = str.replace(/&amp;/g, '&');
  s = s.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');
  s = s.replace(/&nbsp;/g, ' ');
  s = s.replace(/&#39;/g, '\'');
  s = s.replace(/&quot;/g, '"');
  s = s.replace(/<br\/>|<br>/g, '\n');
  return s;
}
/**
 * @static
 * @description 文本超出指定行后隐藏。
 * 因为使用了 getComputedStyle 获取高度，所以节点不能是内联节点。
 * @example
 * hiddenRows (el, 6, 2)
 * // 表示超过 6+2 行后才隐藏
 * // 隐藏后的行数显示为6行
 * // {
 * //   hidden: false or true,
 * //   height: 文本高度
 * // }
 * @param {HTMLElement} el - html节点。
 * @param {Number} [rows=5] - 指定的行数。
 * @param {Number} [exceededRows=0] 超出 指定行数 多少行 后才隐藏。
 * @returns {Object} 对象，包括是否隐藏的标志和文本高度。
 */


function hiddenRows(el) {
  var rows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  var exceededRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var style = window.getComputedStyle(el);
  var height = parseFloat(style.height);
  var lineHeight = parseFloat(style.lineHeight);
  var boxSizing = style.boxSizing;
  var paddingTop = 0;
  var paddingBottom = 0; // border-box 盒模型下 padding 影响内容高度

  if (boxSizing === 'border-box') {
    paddingTop = parseFloat(style.paddingTop);
    paddingBottom = parseFloat(style.paddingBottom);
  }

  var totalRows = Math.ceil((height - paddingTop - paddingBottom) / lineHeight);

  if (totalRows > rows + exceededRows) {
    return {
      hidden: true,
      height: rows * lineHeight
    };
  }

  return {
    hidden: false,
    height: height
  };
}
/**
 * @static
 * @description 无限滚动。
 * @example
 * // const ins = infiniteScroll({
 * //   el: 'html节点',
 * //   distance: 10,
 * //   callback: () => {
 * //     console.log('a')
 * //   }
 * // })
 *
 * // ins.destory()
 * @param {Object} options - 配置参数。
 * @param {HTMLElement} [options.el=document.documentElement] 无限滚动的节点。
 * @param {Function} options.callback 回调函数。
 * @param {Number} [options.distance=0] 距离底部多少调用回调函数。
 * @returns {Object} 对象，包含摧毁监听的方法 destory。
 */


function infiniteScroll(options) {
  if (!options.callback) {
    return;
  }

  var container = document;
  var opt = Object.assign({
    el: document.documentElement,
    distance: 0
  }, options);
  var el = opt.el;
  var canEmitCallback = true;

  if (el !== document.documentElement) {
    container = el;
  }

  function scroll() {
    var scrollTop = el.scrollTop,
        scrollHeight = el.scrollHeight,
        clientHeight = el.clientHeight;

    if (clientHeight + scrollTop + opt.distance >= scrollHeight) {
      if (canEmitCallback) {
        opt.callback();
        canEmitCallback = false;
      }
    } else {
      canEmitCallback = true;
    }
  }

  var throttleScroll = throttle$1(scroll);

  function destory() {
    container.removeEventListener('scroll', throttleScroll);
  }

  container.addEventListener('scroll', throttleScroll);
  return {
    destory: destory
  };
}

/**
 * 日期相关函数。
 * @module date
 */

/**
 * @static
 * @description 时间格式化
 * @example
 * dateFormatter(new Date(2015, 1, 10, 14, 25, 33), 'yyyy-MM-dd hh:mm:ss')
 * dateFormatter(new Date(2015, 1, 10, 14, 25, 33), 'yyyy-M-d hh:mm:ss')
 * dateFormatter('2015-2-10 14:25:33', 'yyyy-M-d h:m:ss')
 * dateFormatter('2015-2-10 14:25:33', 'yyyy年第qq季度')
 * // 2015-02-10 14:25:33
 * // 2015-2-10 14:25:33
 * // 2015-2-10 14:25:33
 * // 2015年第01季度
 * @param {String|Date} date 需要格式化的时间。
 * @param {String} format 格式模板。
 * @return {String} 格式化后的时间字符。
 */
function dateFormatter(date, format) {
  // 时间格式化辅助函数 date:毫秒数 format:'yyyy-MM-dd hh:mm:ss'
  if (!date || date === '') {
    return '';
  }

  var cdate = date;

  if (typeof cdate === 'string') {
    var mts = cdate.match(/(\/Date\((\d+)\)\/)/);

    if (mts && mts.length >= 3) {
      cdate = parseInt(mts[2]);
    }
  }

  cdate = new Date(cdate);

  if (!cdate || cdate.toUTCString() === 'Invalid Date') {
    return '';
  }

  var map = {
    M: cdate.getMonth() + 1,
    // 月份
    d: cdate.getDate(),
    // 日
    h: cdate.getHours(),
    // 小时
    m: cdate.getMinutes(),
    // 分
    s: cdate.getSeconds(),
    // 秒
    q: Math.floor((cdate.getMonth() + 3) / 3),
    // 季度
    S: cdate.getMilliseconds() // 毫秒

  };
  var formatTime = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    var v = map[t];

    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }

      return v;
    }

    if (t === 'y') {
      return (cdate.getFullYear() + '').substr(4 - all.length);
    }

    return all;
  });
  return formatTime;
}
/**
 * @static
 * @description 判断是否是合法日期对象
 * @param {Date} date 日期对象
 * @returns {Boolean} true or false
 */


function isValidDate(date) {
  if (date instanceof Date === false) {
    return false;
  }

  return date.toString() !== 'Invalid Date';
}
/**
 * @static
 * @description 判断是否是润年
 * @param {Number} year 年份
 * @returns {Boolean} true or false
 */


function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * @static
 * @ignore
 * @description 判断是否是大月
 * @param {Number} month 月份
 * @returns {Boolean} true or false
 */


function isBigMonth(month) {
  var bigMonths = [0, 2, 4, 6, 7, 9, 11];
  return bigMonths.includes(month);
}
/**
 * @static
 * @description 获取月份天数
 * @param {Date} date 日期
 * @returns {Number} 天数
 */


function getMonthDays(date) {
  var month = date.getMonth();
  var year = date.getFullYear();

  if (isBigMonth(month)) {
    return 31;
  }

  if (month === 1) {
    if (isLeapYear(year)) {
      return 29;
    }

    return 28;
  }

  return 30;
}
/**
 * @static
 * @description 转换成日期对象
 * @param {String} time 时间字符串
 * @returns {Date} 日期对象
 */


function toDate(time) {
  var date = time;

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date;
}
/**
 * @static
 * @description 判断日期相等
 * @param {Date|String} stime 日期1
 * @param {Date|String} ttime 日期2
 * @returns {Boolean} true or false
 */


function isEqualDate(stime, ttime) {
  var sdate = toDate(stime);
  var tdate = toDate(ttime);

  if (!isValidDate(sdate) || !isValidDate(tdate)) {
    return false;
  }

  return sdate.getTime() === tdate.getTime();
}
/**
 * @static
 * @ignore
 * @description 获取完全的日期，年月日时分秒毫秒
 * @param {Date|String} date 日期
 * @returns {Object} 包含年月日时分秒毫秒
 */


function getFullDate(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliSeconds: date.getMilliseconds()
  };
}
/**
 * @static
 * @description 判断日期模糊相等
 * @example
 * isEqualDateFuzzy('2015-3-2','2015-3-2 12:56','date')
 * // true
 * @param {Date|String} stime 日期1
 * @param {Date|String} ttime 日期2
 * @param {String} tag 相等界限，取值范围：<br>
 * year, month, date, hours, minutes, seconds, milliSeconds,<br>
 * day — 星期。
 * @returns {Boolean} true or false
 */


function isEqualDateFuzzy(stime, ttime, tag) {
  var sdate = toDate(stime);
  var tdate = toDate(ttime);

  if (!isValidDate(sdate) || !isValidDate(tdate)) {
    return false;
  }

  var allTags = ['year', 'month', 'date', 'hours', 'minutes', 'seconds', 'milliSeconds'];
  var index = allTags.indexOf(tag);

  if (index === -1) {
    return isEqualDate(sdate, tdate);
  } // 获取年月日星期时分秒毫秒组成的对象


  var fullsdate = getFullDate(sdate);
  var fulltdate = getFullDate(tdate); // 星期相等

  if (tag === 'day') {
    return fullsdate.day === fulltdate.day;
  }

  for (var i = 0; i < index + 1; i++) {
    if (fullsdate[allTags[i]] !== fulltdate[allTags[i]]) {
      return false;
    }
  }

  return true;
}
/**
 * @static
 * @description 根据日、周、月、年获取指定日期所在时间段。
 * @example
 * getPeriod('2015-3-2','month')
 * // new Date('2015-3-1')
 * // new Date('2015-3-31')
 * @param {Date|String} date 日期
 * @param {Date|String} unit 单位：day, week, month, year
 * @returns {Array} 一个数组，包括开始日期和结束日期。
 */


function getPeriod() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var unit = arguments.length > 1 ? arguments[1] : undefined;
  var cdate = toDate(date);

  if (!isValidDate(cdate)) {
    return false;
  }

  var year = cdate.getFullYear();
  var month = cdate.getMonth();
  var d = cdate.getDate();
  var day = cdate.getDay() || 7;
  var oneDay = 24 * 60 * 60 * 1000;
  var today = new Date(year, month, d);

  if (unit === 'day') {
    return [today, new Date(today.getTime() + oneDay)];
  }

  if (unit === 'week') {
    return [new Date(today.getTime() - (day - 1) * oneDay), new Date(today.getTime() + (8 - day) * oneDay)];
  }

  if (unit === 'month') {
    var startDate = 1;
    var nextMonth = '';

    if (month === 11) {
      nextMonth = new Date(year + 1, 0, 1);
    } else {
      nextMonth = new Date(year, month + 1, 1);
    }

    return [new Date(year, month, startDate), nextMonth];
  }

  if (unit === 'year') {
    return [new Date(year, 0, 1), new Date(year + 1, 0, 1)];
  }
}
/**
 * @static
 * @description 最大的连续天数数量。
 * @example
 * countMaxConsecutiveDate([
 *   new Date(2015, 1, 1),
 *   new Date(2015, 1, 4),
 *   new Date(2015, 1, 5)
 * ])
 * // 2
 * @param {Date} dates 日期数组
 * @returns {Number} 数量
 */


function countMaxConsecutiveDate(dates) {
  var cdates = dates.map(function (date) {
    var cdate = new Date(date);
    return new Date(cdate.getFullYear(), cdate.getMonth(), cdate.getDate()).getTime();
  });
  var sortedDates = cdates.sort(function (a, b) {
    return a - b;
  });
  var count = 1;
  var max = 1;

  for (var i = 1; i < sortedDates.length; i++) {
    if (sortedDates[i] - sortedDates[i - 1] === 24 * 60 * 60 * 1000) {
      max++;
    } else {
      if (max > count) {
        count = max;
      }

      max = 1;
    }
  }

  return count;
}

/**
 * 颜色相关函数。
 * @module color
 */

/**
 * @static
 * @description Hex颜色转Rgb
 * @example
 * HexToRgb('#fff333')
 * // rbg(255,243,51)
 * @param {String} str Hex 颜色(6位)
 * @return {String} Rgb 颜色
 */
function HexToRgb(str) {
  var hexReg = /^#?[0-9A-Fa-f]{6}$/;

  if (!hexReg.test(str)) {
    return str;
  }

  var color = str.replace('#', '');
  var hxs = color.match(/../g);

  for (var i = 0; i < 3; i++) {
    hxs[i] = parseInt(hxs[i], 16);
  }

  return "rbg(".concat(hxs.join(','), ")");
}
/**
 * @static
 * @description Rgb 转 Hex
 * @example
 * RgbToHex('rgb(255,243,51)')
 * // #fff333
 * @param {String} rgb rgb 颜色
 * @return {String} hex 颜色
 */


function RgbToHex(rgb) {
  var reg = /\d{1,3}/g;
  var rgbAry = rgb.match(reg);

  if (rgbAry.length !== 3) {
    return rgb;
  }

  var hexs = [parseInt(rgbAry[0]).toString(16), parseInt(rgbAry[1]).toString(16), parseInt(rgbAry[2]).toString(16)];

  for (var i = 0; i < 3; i++) {
    if (hexs[i].length === 1) {
      hexs[i] = '0' + hexs[i];
    }
  }

  return '#' + hexs.join('');
}
/**
 * @static
 * @description Rgb 转 Rgba
 * @example
 * toRgba('#fff333', 0.6)
 * // rgba(255, 243, 51, 0.6)
 * toRgba('rgb(233, 233, 5)', 0.6)
 * // rgba(233, 233, 5, 0.6)
 * @param {String} color 颜色：Rgb 或 Hex
 * @param {Number} opacity 透明度
 * @return {String} Rgba 颜色
 */


function toRgba(color, opacity) {
  if (typeof opacity !== 'number' || opacity > 1 || opacity < 0) {
    return color;
  }

  var rgb = HexToRgb(color);
  var reg = /\d{1,3}/g;
  var rgbAry = rgb.match(reg);

  if (!rgbAry.length) {
    return;
  }

  rgbAry.push(opacity);
  return "rgba(".concat(rgbAry.join(', '), ")");
}
/**
 * @static
 * @description 颜色变深
 * @example
 * darkenColor('rgb(40, 40, 40)', 0.2)
 * // rgb(32, 32, 32)
 * @param {String} color 颜色：Rgb, Hex, Rgba
 * @param {Number} level 变深程度：[0, 1]
 * @return {String} Rgb 颜色
 */


function darkenColor(color, level) {
  if (typeof level !== 'number' || level > 1 || level < 0) {
    return color;
  }

  var rgb = HexToRgb(color);
  var reg = /\d{1,3}/g;
  var rgbAry = rgb.match(reg);

  for (var i = 0; i < 3; i++) {
    rgbAry[i] = Math.floor(rgbAry[i] * (1 - level));
  }

  return "rgb(".concat(rgbAry.join(', '), ")");
}
/**
 * @static
 * @description 颜色变浅
 * @lightnessColor
 * darkenColor('rgb(40, 40, 40)', 0.2)
 * // rgb(83, 83, 83)
 * @param {String} color 颜色：Rgb, Hex, Rgba
 * @param {Number} level 变浅程度：[0, 1]
 * @return {String} Rgb 颜色
 */


function lightnessColor(color, level) {
  if (typeof level !== 'number' || level > 1 || level < 0) {
    return color;
  }

  var rgb = HexToRgb(color);
  var reg = /\d{1,3}/g;
  var rgbAry = rgb.match(reg).map(function (item) {
    return parseInt(item);
  });

  for (var i = 0; i < 3; i++) {
    rgbAry[i] = Math.floor((255 - rgbAry[i]) * level + rgbAry[i]);
  }

  return "rgb(".concat(rgbAry.join(', '), ")");
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

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

var createClass = _createClass;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

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
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

/**
 * @description 自定义事件分发。
 * @example
 * // 使用
 * let event = new Event()
 * event.on("myevent", callback)
 * // 一次性事件
 * event.on("myevent", callback, true)
 * event.off("myevent", callback)
 */
var Event = /*#__PURE__*/function () {
  function Event() {
    classCallCheck(this, Event);

    defineProperty(this, "onEvents", {});

    defineProperty(this, "index", -1);

    defineProperty(this, "count", 0);
  }

  createClass(Event, [{
    key: "on",
    // once 表示注册的事件只执行一次便自动移除
    value: function on(name, callback) {
      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.onEvents[name] = this.onEvents[name] || [];
      this.onEvents[name].push({
        name: name,
        callback: callback,
        once: once
      });
    } // 移除事件

  }, {
    key: "off",
    value: function off(name, callback) {
      var _this = this;

      if (!this.onEvents[name] || !this.onEvents[name].length) {
        return;
      }

      this.onEvents[name] = this.onEvents[name].filter(function (event, index) {
        var flag = true; // 在emit的回调中，可能会off事件

        if (event.callback === callback) {
          flag = false;

          if (index <= _this.index && name === _this.name) {
            _this.count++;
          }
        }

        return flag;
      });
    }
  }, {
    key: "emit",
    value: function emit(name) {
      if (!this.onEvents[name] || !this.onEvents[name].length) {
        return;
      }

      var params = Array.prototype.slice.call(arguments).slice(1);
      this.name = name;

      for (var i = 0; i < this.onEvents[name].length; i++) {
        var event = this.onEvents[name][i]; // 需要先判断是否为一次性事件，先移除
        // 以防在事件回调中继续触发当前事件时即使是一次性事件也会执行多次

        if (event.once) {
          this.onEvents[name].splice(i, 1);
          i--;
        } // 记录此时的index


        this.index = i;
        event.callback.apply(event, toConsumableArray(params)); // 如果回调中off事件，需要记录off的小于等于这个index的个数

        i -= this.count;
        this.count = 0;
      }

      this.count = 0;
      this.index = -1;
    }
  }]);

  return Event;
}();

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * @description 节点大小监测。
 * @example
 * // 使用
 * let event = new DomResize(document.querySelector('#contianer'))
 * event.on('dom-resize', callback)
 */

var DomResize = /*#__PURE__*/function (_Event) {
  inherits(DomResize, _Event);

  var _super = _createSuper$2(DomResize);

  function DomResize(el) {
    var _this;

    classCallCheck(this, DomResize);

    _this = _super.call(this);

    defineProperty(assertThisInitialized(_this), "width", 20000);

    defineProperty(assertThisInitialized(_this), "oldWidth", 0);

    defineProperty(assertThisInitialized(_this), "newWidth", 0);

    defineProperty(assertThisInitialized(_this), "oldHeight", 0);

    defineProperty(assertThisInitialized(_this), "newHeight", 0);

    defineProperty(assertThisInitialized(_this), "supportsPassive", false);

    defineProperty(assertThisInitialized(_this), "scroll", function () {
      _this.newWidth = parseFloat(window.getComputedStyle(_this.el).width);
      _this.newHeight = parseFloat(window.getComputedStyle(_this.el).height); // 只有两次width不同时才分发事件，不然会多次分发

      if (_this.oldWidth !== _this.newWidth || _this.oldHeight !== _this.newHeight) {
        _this.emit('dom-resize');

        _this.oldWidth = _this.newWidth;
        _this.oldHeight = _this.newHeight;
      } // 每次触发滚动事件后，重新将滚动条设至尽头


      _this.holderSmall.scrollTop = _this.holderBig.scrollTop = _this.width;
      _this.holderSmall.scrollLeft = _this.holderBig.scrollLeft = _this.width;
    });

    _this.el = el;

    _this._init();

    return _this;
  }

  createClass(DomResize, [{
    key: "_init",
    value: function _init() {
      this.oldWidth = parseFloat(window.getComputedStyle(this.el).width);
      this.oldHeight = parseFloat(window.getComputedStyle(this.el).height);
      this.setSupportsPassive();
      this.createNode();
    }
  }, {
    key: "createNode",
    value: function createNode() {
      // 监听变大的DOM
      var holderBig = document.createElement('div');
      holderBig.style = 'position: absolute;top:0;left: 0;bottom: 0;right: 0;overflow: hidden;visibility: hidden;z-index:-1';
      holderBig.innerHTML = "<div style=\"width:".concat(this.width, "px;height:").concat(this.width, "px\"></div>"); // 监听变小的DOM

      var holderSmall = document.createElement('div');
      holderSmall.style = 'position: absolute;top:0;left: 0;bottom: 0;right: 0;overflow: hidden;visibility: hidden;z-index:-1';
      holderSmall.innerHTML = '<div style="width:300%;height:300%"></div>';
      this.holderBig = holderBig;
      this.holderSmall = holderSmall;
      this.el.appendChild(holderBig);
      this.el.appendChild(holderSmall);
      holderSmall.scrollTop = this.width;
      holderSmall.scrollLeft = this.width;
      holderBig.scrollTop = this.width;
      holderBig.scrollLeft = this.width;
      holderBig.addEventListener('scroll', this.scroll, this.supportsPassive ? {
        passive: true
      } : false, false);
      holderSmall.addEventListener('scroll', this.scroll, this.supportsPassive ? {
        passive: true
      } : false, false);
    }
  }, {
    key: "setSupportsPassive",
    value: function setSupportsPassive() {
      var _this2 = this;

      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function get() {
            _this2.supportsPassive = true;
            return true;
          }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.holderBig.removeEventListener('scroll', this.scroll);
      this.holderSmall.removeEventListener('scroll', this.scroll);
      this.el.removeChild(this.holderBig);
      this.el.removeChild(this.holderSmall);
    }
  }]);

  return DomResize;
}(Event);

/**
 * @description 渐显加载图片。
 * @example
 * // 使用
 * let img = new LoadImg(document.querySelector('#img'))
 * img.setSrc('./a.jpg').then(callback)
 */
var LoadImg = /*#__PURE__*/function () {
  function LoadImg(_el) {
    var _this = this;

    classCallCheck(this, LoadImg);

    defineProperty(this, "show", function (e) {
      var el = e.target;
      setTimeout(function () {
        Object.assign(el.style, {
          opacity: 1,
          transition: 'opacity 0.5s ease',
          visibility: 'visible'
        });
        el.addEventListener('transitionend', function () {
          Object.assign(el.style, {
            transition: 'initial'
          });
          _this.resolve && _this.resolve();
          _this.resolve = null;
        });
      }, 300);
    });

    this.el = _el;

    _el.addEventListener('load', this.showImg);
  }

  createClass(LoadImg, [{
    key: "setSrc",
    value: function setSrc(src) {
      var _this2 = this;

      return new Promise(function (resolve) {
        requestAnimationFrame(function () {
          Object.assign(_this2.el.style, {
            opacity: 0,
            visibility: 'hidden'
          });
          requestAnimationFrame(function () {
            _this2.el.src = src;
          });
        });
        _this2.resolve = resolve;
      });
    }
  }]);

  return LoadImg;
}();

/**
 * @description 带缓存的随机数种子。
 * @example
 * const seed = new RandomSeed(5, 10, [6])
 * seed.do()
 * // 5 or 7 or 8 or 9 or 10
 */
var RandomSeed = /*#__PURE__*/function () {
  /**
   * @param {Number} lower - 下限（包含）。
   * @param {Number} upper - 上限（包含）。
   * @param {Array} initCache - 初始缓存数组。
   * @param {Boolean} loop - 如果是，当缓存满时，清空缓存。默认 true。
  */
  function RandomSeed(lower, upper, initCache) {
    var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    classCallCheck(this, RandomSeed);

    if (upper < lower) {
      throw new Error('params error');
    }

    this.lower = lower;
    this.upper = upper;
    this.loop = loop; // 在随机范围内 数的个数

    this.length = this.upper - this.lower + 1;
    this.setCache(initCache || []);
  }

  createClass(RandomSeed, [{
    key: "setCache",
    value: function setCache(cache) {
      var _this = this;

      this.initCache = cache;
      this.cache = cache.concat(); // 缓存中界限外的数个数

      this.outBoundsNum = this.initCache.reduce(function (total, val) {
        if (val < _this.lower || val > _this.upper) {
          return total + 1;
        }

        return total;
      }, 0); // cache 能放入的元素个数是
      // cache 的长度加 cache中 超出界限的数的个数

      this.cacheLimitLength = this.length + this.outBoundsNum;
    }
  }, {
    key: "do",
    value: function _do() {
      if (!this.loop && this.cache.length === this.cacheLimitLength) {
        return;
      }

      if (this.upper - this.lower === 0) {
        return this.lower;
      }

      var random = Math.floor(Math.random() * this.length + this.lower);

      if (this.cache.length === this.cacheLimitLength) {
        var lastValue = this.cache[this.cache.length - 1];

        if (random === lastValue) {
          return this.do();
        }

        this.cache = this.initCache.concat() || [];
      }

      if (this.cache.some(function (number) {
        return number === random;
      })) {
        return this.do();
      }

      this.cache.push(random);
      return random;
    }
  }]);

  return RandomSeed;
}();

/**
 * 封装鼠标触摸事件。
 * @example
 * const el = document.querySelector('#container')
 * new Slide(el, 200, 200)
 * el.addEventListener('slidemove', (e) => {
 *   console.log(e.detail)
 *   // {
 *   //    // 滑动开始的点
 *   //    startx: ,
 *   //    starty: ,
 *   //    // 滑动过程的点
 *   //    endx: ,
 *   //    endy: ,
 *   //    // 滑动过程中与上一个点的距离
 *   //    dx: ,
 *   //    dy: ,
 *   //    // 滑动过程中与开始点的距离
 *   //    offsetx: ,
 *   //    offsety:
 *   // }
 * })
 */
var Slide = /*#__PURE__*/function () {
  // dom节点
  // 手指移动过程中上一个坐标
  // 自定义用户数据

  /**
   * @param {HTMLElement} el - html 节点。
   * @param {Number} maxSlideDx - x 方向最大移动距离。
   * @param {Number} maxSlideDy - y 方向最大移动距离。
   * @param {Boolean} [limitArea=false] - 是否限制区域。
   * 如果为true，当滑动超过 maxSlideDx 限定的区域内，
   * 获取到的 dx 为 0，offsetx 为 ±maxSlideDx。
   * 如果为false，当滑动超过 maxSlideDx 限定的区域内，
   * 获取到的 dx 为 正常值，offsetx 为 ±maxSlideDx。
   */
  function Slide(el) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      limitArea: false
    };

    classCallCheck(this, Slide);

    defineProperty(this, "el", null);

    defineProperty(this, "prePoint", {
      x: 0,
      y: 0
    });

    defineProperty(this, "customData", {
      // 滑动开始的点
      startx: 0,
      starty: 0,
      // 滑动过程的点
      endx: 0,
      endy: 0,
      // 滑动过程中与上一个点的距离
      dx: 0,
      dy: 0,
      // 滑动过程中与开始点的距离
      offsetx: 0,
      offsety: 0
    });

    defineProperty(this, "_start", function (e) {
      e.preventDefault();
      var startx = 0;
      var starty = 0;

      if (e.type === 'mousedown') {
        if (e.button !== 0) {
          return;
        }

        if (_this.checkNode(e.target)) {
          _this.canSlide = true;
        } else {
          _this.canSlide = false;
          return;
        }

        startx = e.pageX;
        starty = e.pageY;
      } else {
        e.preventDefault();
        startx = e.targetTouches[0].pageX;
        starty = e.targetTouches[0].pageY;
      } // 初始化data


      Object.assign(_this.customData, {
        startx: startx,
        starty: starty,
        endx: startx,
        endy: starty,
        dx: 0,
        dy: 0,
        offsetx: 0,
        offsety: 0
      });
      _this.prePoint = {
        x: startx,
        y: starty
      };

      _this.el.dispatchEvent(_this.slidestart);
    });

    defineProperty(this, "_move", function (e) {
      var endx = 0;
      var endy = 0;

      if (e.type === 'mousemove') {
        if (!_this.canSlide) {
          return;
        }

        endx = e.pageX;
        endy = e.pageY;
      } else {
        endx = e.targetTouches[0].pageX;
        endy = e.targetTouches[0].pageY;
      } // 相较于上一次touchmove点的距离


      var dx = endx - _this.prePoint.x;
      var dy = endy - _this.prePoint.y;
      var offsetx = 0;
      var offsety = 0; // 单次滑动过程不能超过设定maxSlideDx值

      if (_this.maxSlideDx) {
        if (_this.customData.offsetx + dx >= _this.maxSlideDx) {
          dx = _this.maxSlideDx - _this.customData.offsetx;
          offsetx = _this.maxSlideDx;
        } else if (_this.customData.offsetx + dx <= -_this.maxSlideDx) {
          dx = -_this.maxSlideDx - _this.customData.offsetx;
          offsetx = -_this.maxSlideDx;
        } else {
          if (!_this.limitArea) {
            offsetx = _this.customData.offsetx + dx;
          } else {
            var x = endx - _this.customData.startx; // 鼠标在界限范内

            if (x > -_this.maxSlideDx && x < _this.maxSlideDx) {
              // 处理边界问题
              // 如果是上次鼠标位置在左边界外面，然后移动到里面
              // 修正 dx 的值
              if (_this.prePoint.x - _this.customData.startx < -_this.maxSlideDx) {
                dx = x - -_this.maxSlideDx;
              } else if (_this.prePoint.x - _this.customData.startx > _this.maxSlideDx) {
                dx = x - _this.maxSlideDx;
              }

              offsetx = x;
            } else {
              offsetx = _this.customData.offsetx;
              dx = 0;
            }
          }
        }
      } else {
        offsetx = endx - _this.customData.startx;
      } // 单次滑动过程不能超过设定maxSlideDy值


      if (_this.customData.offsety + dy > _this.maxSlideDy) {
        dy = _this.maxSlideDy - _this.customData.offsety;
        offsety = _this.maxSlideDy;
      } else if (_this.customData.offsety + dy < -_this.maxSlideDy) {
        dy = -_this.maxSlideDy - _this.customData.offsety;
        offsety = -_this.maxSlideDy;
      } else {
        offsety = endy - _this.customData.starty;
      }

      Object.assign(_this.customData, {
        endx: endx,
        endy: endy,
        dx: dx,
        dy: dy,
        offsetx: offsetx,
        offsety: offsety
      });
      _this.prePoint = {
        x: endx,
        y: endy
      };

      _this.el.dispatchEvent(_this.slidemove);
    });

    defineProperty(this, "_end", function (e) {
      var endx = 0;
      var endy = 0;

      if (e.type === 'mouseup') {
        if (!_this.canSlide) {
          return;
        }

        endx = e.pageX;
        endy = e.pageY;
        _this.canSlide = false;
      } else {
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
      }

      Object.assign(_this.customData, {
        endx: endx,
        endy: endy
      });

      _this.el.dispatchEvent(_this.slideend);
    });

    this.el = el; // 单次的最大横向滑动距离

    this.maxSlideDx = options.maxSlideDx;
    this.maxSlideDy = options.maxSlideDy;
    this.limitArea = options.limitArea;

    this._init();
  }

  createClass(Slide, [{
    key: "_init",
    value: function _init() {
      // 注册滑动开始、过程、结束事件
      this.slidestart = new CustomEvent('slidestart', {
        detail: this.customData,
        bubbles: true,
        cancelable: true
      });
      this.slidemove = new CustomEvent('slidemove', {
        detail: this.customData,
        bubbles: true,
        cancelable: true
      });
      this.slideend = new CustomEvent('slideend', {
        detail: this.customData,
        bubbles: true,
        cancelable: true
      }); // 监听原生触摸事件

      this.setSupportsPassive();

      if ('ontouchstart' in window) {
        this._on(this.el, 'touchstart', this._start);

        this._on(this.el, 'touchmove', this._move);

        this._on(this.el, 'touchend', this._end);
      } else {
        this._on(window, 'mousedown', this._start);

        this._on(window, 'mousemove', this._move);

        this._on(window, 'mouseup', this._end);
      }
    }
  }, {
    key: "_on",
    value: function _on(el, event, fn) {
      el.addEventListener(event, fn, this.supportsPassive ? {
        capture: false,
        passive: false
      } : false);
    }
  }, {
    key: "_off",
    value: function _off(el, event, fn) {
      el.removeEventListener(event, fn, this.supportsPassive ? {
        capture: false,
        passive: false
      } : false);
    }
  }, {
    key: "setSupportsPassive",
    value: function setSupportsPassive() {
      var _this2 = this;

      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function get() {
            _this2.supportsPassive = true;
            return true;
          }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: "checkNode",
    value: function checkNode(node) {
      if (!node) {
        return false;
      }

      if (node === this.el) {
        return true;
      }

      return this.checkNode(node.parentNode);
    }
  }, {
    key: "setMaxSlideDx",
    value: function setMaxSlideDx(ds) {
      this.maxSlideDx = ds;
    }
  }, {
    key: "setMaxSlideDy",
    value: function setMaxSlideDy(ds) {
      this.maxSlideDy = ds;
    } // 销毁自定义事件

  }, {
    key: "destroy",
    value: function destroy() {
      this._off(this.el, 'touchstart', this._start);

      this._off(this.el, 'touchmove', this._move);

      this._off(this.el, 'touchend', this._end);

      this._off(window, 'mousedown', this._start);

      this._off(window, 'mousemove', this._move);

      this._off(window, 'mouseup', this._end);
    }
  }]);

  return Slide;
}();

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

var classPrivateFieldSet = _classPrivateFieldSet;

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

var classPrivateFieldGet = _classPrivateFieldGet;

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _preCancelTokenSource = /*#__PURE__*/new WeakMap();

var _firstRequest = /*#__PURE__*/new WeakMap();

var _requestCancelBefore = /*#__PURE__*/new WeakSet();

var _requestBlockAfter = /*#__PURE__*/new WeakSet();

/**
 * @description
 * axios 并发请求处理竞态，
 * （注意这个类不能直接使用，是对 axios.request 的封装）
 * @example
 * // 使用
 * let axiosRace = new AxiosRace({ blockAfter: true });
 * // url: 请求地址
 * // config: axios 请求配置
 * axiosRace.request(url, config)
 */
var AxiosRace =
/**
 * @param {Object} options - 配置项。
 * @param {Boolean} options.cancelBefore - 取消之前的请求，只有最后一个请求有效。
 * @param {Boolean} options.blockAfter - 后面的请求不执行，并返回第一个请求的结果。
 */
function AxiosRace(options) {
  classCallCheck(this, AxiosRace);

  _requestBlockAfter.add(this);

  _requestCancelBefore.add(this);

  _preCancelTokenSource.set(this, {
    writable: true,
    value: null
  });

  _firstRequest.set(this, {
    writable: true,
    value: null
  });

  defineProperty(this, "hasFirstRequest", false);

  var blockAfter = options.blockAfter,
      cancelBefore = options.cancelBefore;

  if (cancelBefore) {
    this.request = _classPrivateMethodGet(this, _requestCancelBefore, _requestCancelBefore2);
    return;
  }

  if (blockAfter) {
    this.request = _classPrivateMethodGet(this, _requestBlockAfter, _requestBlockAfter2);
    return;
  }

  throw new Error('please provide the correct options');
} // 取消之前的请求，只有最后一个请求有效
;

function _requestCancelBefore2(url, config) {
  var _this = this;

  var axiosConfig = _objectSpread$2({}, config); // 取消上一次请求


  if (classPrivateFieldGet(this, _preCancelTokenSource)) {
    classPrivateFieldGet(this, _preCancelTokenSource).cancel();
  } // 创建 cancel token


  var source = CancelToken.source();
  axiosConfig.cancelToken = source.token;
  axiosConfig.url = url; // 存储 cancel token

  classPrivateFieldSet(this, _preCancelTokenSource, source);

  return axios.request(axiosConfig).finally(function () {
    classPrivateFieldSet(_this, _preCancelTokenSource, null);
  });
}

function _requestBlockAfter2(url, config) {
  var _this2 = this;

  // 返回第一次请求的结果
  if (classPrivateFieldGet(this, _firstRequest)) {
    return classPrivateFieldGet(this, _firstRequest);
  }

  var axiosConfig = _objectSpread$2({}, config);

  axiosConfig.url = url;

  classPrivateFieldSet(this, _firstRequest, axios.request(axiosConfig).finally(function () {
    classPrivateFieldSet(_this2, _firstRequest, null);

    _this2.hasFirstRequest = false;
  }));

  this.hasFirstRequest = true;
  return classPrivateFieldGet(this, _firstRequest);
}

/**
 * ast 编译相关
 * @module ast
 */

var parse = parser__default['default'].parse;
var generate = generator__default['default'].default;
var traverse = traverse__default['default'].default;
/**
 * @static
 * @description 解析获得特定字符之间的表达式，例如 "{{}}", "{}"
 * @example
 * getExpression("{{a+1}}{{b+1}}", "{{", "}}")
 * // ['a+1','b+1']
 * @param {String} content
 * @param {String} startFlag
 * @param {String} endFlag
 * @return {Array} 表达式数组
 */

function getExpression(content, startFlag, endFlag) {
  var isSingleQuotes = false;
  var isDoubleQuotes = false;
  var isTemplateStr = false;
  var singleQuotes = '\'';
  var doubleQuotes = '"';
  var templateStr = '`';

  var canStart = function canStart(open) {
    return open === startFlag && !isSingleQuotes && !isDoubleQuotes && !isTemplateStr;
  };

  var canEnd = function canEnd(close) {
    return close === endFlag && !isSingleQuotes && !isDoubleQuotes && !isTemplateStr;
  };

  var isQuotes = function isQuotes(s) {
    return [singleQuotes, doubleQuotes, templateStr].includes(s);
  };

  var expressions = [];
  var current = '';
  var isExpression = false;

  for (var i = 0; i < content.length; i++) {
    var c = content[i];
    var n = content[i + 1];

    if (c === '\\' && isQuotes(n)) {
      i++;

      if (isExpression) {
        current += c + n;
      }

      continue;
    } else if (c === singleQuotes) {
      isSingleQuotes = !isSingleQuotes;
    } else if (c === doubleQuotes) {
      isDoubleQuotes = !isDoubleQuotes;
    } else if (c === templateStr) {
      isTemplateStr = !isTemplateStr;
    } else if (canStart(c + n)) {
      isExpression = true;
      i++;
      continue;
    } else if (canEnd(c + n)) {
      expressions.push(current);
      current = '';
      isExpression = false;
      i++;
    }

    if (isExpression) {
      current += c;
    }
  }

  return expressions;
}
/**
 * @static
 * @ignore
 * @description 替换 js 表达式中的 Identifier 节点 name
 * @example
 * replaceIdentifierName("a+b+1", [a, b], "[c, d]")
 * // c+d+1
 * @param {string} expression js 表达式
 * @param {array} nflgas 新 Identifier 节点名称集合
 * @param {array} oflags 旧 Identifier 节点名称集合
 * @return {string} 替换后的 js 表达式
 */


function replaceIdentifierName(expression, nflgas, oflags) {
  if (!nflgas || !nflgas.length) {
    return;
  }

  var ast = null; // ast树

  try {
    ast = parse(expression);
  } catch (error) {
    throw new Error("\u8868\u8FBE\u5F0F ".concat(expression, " \u89E3\u6790\u51FA\u9519"));
  }

  traverse(ast, {
    enter: function enter(path) {
      // 是对象属性时跳过该节点
      if (path.isMemberExpression() && !path.node.computed) {
        path.skip();
      }

      nflgas.forEach(function (nflag, index) {
        var oflag = oflags[index];

        if (path.isIdentifier({
          name: oflag
        })) {
          path.node.name = nflag;
        }
      });
    }
  }); // 对于微信小程序来说
  // 输出时，否则小程序将解析失败

  return generate(ast, {
    compact: true
  }).code.slice(0, -1);
}

function handleExpression(text, nIndexs, oIndexs) {
  if (!text || !nIndexs || !nIndexs.length) {
    return text;
  }

  var changedNewIndexs = [];
  var changedOldIndex = [];
  var lowerIndexs = [];

  for (var i = nIndexs.length - 1; i >= 0; i--) {
    var nIndex = nIndexs[i];
    var oIndex = oIndexs[i];

    if (nIndex !== oIndex && !lowerIndexs.includes(nIndex)) {
      changedNewIndexs.push(nIndex);
      changedOldIndex.push(oIndex);
    }

    lowerIndexs.push(nIndex);
  }

  if (!changedNewIndexs.length) {
    return text;
  }

  var expressions = getExpression(text, '{{', '}}');

  if (!expressions.length) {
    return text;
  }

  var resText = text;
  expressions.forEach(function (expression) {
    var exp = replaceIdentifierName(expression, changedNewIndexs, changedOldIndex); // exp 中不要带 $
    // 在 replace 函数中，替代字符串中 $ 有特殊含义

    resText = resText.replace(expression, exp);
  });
  return resText;
}

var HandleAttribs = /*#__PURE__*/function () {
  function HandleAttribs(attribs) {
    classCallCheck(this, HandleAttribs);

    this.attribs = attribs || {};
  }

  createClass(HandleAttribs, [{
    key: "get",
    value: function get(key) {
      return this.attribs[key];
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      delete this.attribs[key];
    }
  }, {
    key: "push",
    value: function push(obj) {
      Object.assign(this.attribs, obj);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.attribs[key] = value;
    }
  }]);

  return HandleAttribs;
}(); // 获取节点在父节点下的索引


function getElementIndex(element) {
  var index = 0;
  var prev = element.prev;

  while (prev) {
    if (prev.type === 'tag') {
      index++;
    }

    prev = prev.prev;
  }

  return index;
} // 获取节点在父节点下的唯一标志


function getlementUniqueFlagInParent(element, uniqueFlagAttr) {
  var parent = element.parent;
  var parentUniqueFlag = '';

  if (parent) {
    parentUniqueFlag = parent.attribs[uniqueFlagAttr];
  }

  var index = getElementIndex(element);

  function getName() {
    return element.name || '';
  } // 父节点的 uniqueFlag + tagName + element 在父节点下的索引


  if (parentUniqueFlag) {
    return "".concat(parentUniqueFlag, "--").concat(getName()).concat(index);
  } // tagName + 索引


  return "".concat(getName()).concat(index);
}

function assembleUniqueId(keyElement) {
  return keyElement.reduce(function (prev, key) {
    if (key) {
      if (prev) {
        return prev + '_' + key;
      }

      return prev + key;
    }

    return prev;
  }, '');
}
/**
 * @static
 * @description
 * 为微信小程序 dom 节点生成唯一标志，存储在特定 data-[name] 下。
 * 节点唯一标志 = 父节点唯一标志 + 在父节点下的索引 + 标签名 + 节点本身id
 * 根节点唯一标志 = 节点唯一标志 + 页面path
 * wx:for 节点唯一标志 = 节点唯一标志 + index
 * @example
 * generateElementUniqueFlag(dom, {
        indexPrefix: 'index',
        flagKey: 'uid',
        filePath: 'C:\\Users\xx\Desktop\project\src\util\page.wxml'
    })
 * @param {Object} dom htmlParser2 解析后得到的 dom ast 树
 * @param {Object} options 配置项
 * @param {string} [options.indexPrefix=index] wx:for-index 值得前缀，会主动给 wx:for 节点设置 wx:for-index
 * @param {string} [options.flagKey=uflag] data-[flagKey] 存储唯一 id
 * @param {string} [options.filePath=''] 文件路径，多个文件是，需要加上文件路径才能保证每个节点 id 唯一
 */


function generateElementUniqueFlag(dom) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defalutOptions = {
    indexPrefix: 'index',
    flagKey: 'uflag',
    filePath: ''
  };
  var currentOptions = Object.assign({}, defalutOptions, options);
  var indexPrefix = currentOptions.indexPrefix,
      flagKey = currentOptions.flagKey,
      filePath = currentOptions.filePath; // 存储嵌套index的栈

  var nIndexs = []; // 存储wx:for节点的栈

  var loopNodes = []; // 存储旧的index的栈

  var oIndexs = [];
  var currentIndex = '';
  var deep = 0;
  var isRoot = true;

  function travel(dom) {
    dom.forEach(function (element) {
      var attribs = element.attribs;

      if (attribs) {
        var attrs = new HandleAttribs(attribs);

        if (attrs.get('wx:for')) {
          if (attrs.get('wx:for-index')) {
            var index = attrs.get('wx:for-index');
            nIndexs.push(index);
            oIndexs.push(index);
            currentIndex = index;
          } else {
            var _index = "".concat(indexPrefix, "_").concat(deep); // 主动设置wx:for-index


            attrs.set('wx:for-index', _index);
            nIndexs.push(_index);
            oIndexs.push('index');
            currentIndex = _index;
          }

          loopNodes.push(element);
          deep++;
        } // 为每个节点注入唯一标志


        var attr = "data-".concat(flagKey); // 在父节点下的唯一标志（与父节点唯一标志、标签名、在父节点下的位置索引有关）

        var uniqueFlagInParent = getlementUniqueFlagInParent(element, attr); // wx:for 组件内唯一标志与上层所有 index 有关
        // 当发现 wx:for 时，该节点唯一标志与 index 有关
        // 这样其所有子节点唯一标志都将与这个 index 有关
        // 这样即使是嵌套循环，也能保证内部节点唯一标志与上层每个 wx:for 相关

        var indexsStr = currentIndex ? "{{".concat(currentIndex, "}}") : '';
        var keys = []; // 多个wxml文件时，还需在根节点加上文件路径，才能确保每个元素生成的标志唯一

        if (isRoot) {
          keys.push(filePath);
        }

        keys = [].concat(toConsumableArray(keys), [uniqueFlagInParent, indexsStr, attrs.get('id')]);
        var uniqueFlag = assembleUniqueId(keys);

        var obj = defineProperty({}, attr, uniqueFlag);

        attrs.push(obj); // 处理for+template标签组合

        if (element.name === 'template') ; else {
          Object.keys(attribs).forEach(function (key) {
            attribs[key] = handleExpression(attribs[key], nIndexs, oIndexs);
          });
        }
      } else if (element.type === 'text') {
        element.data = handleExpression(element.data, nIndexs, oIndexs);
      }

      if (element.children) {
        isRoot = false;
        currentIndex = '';
        travel(element.children);
      } // 回溯到wx:for节点时


      if (element === loopNodes[loopNodes.length - 1]) {
        nIndexs.pop();
        oIndexs.pop();
        loopNodes.pop();
        deep--;
      }
    });
  }

  travel(dom);
}

var generateElementId = {
  generateElementUniqueFlag: generateElementUniqueFlag,
  getExpression: getExpression
};
var generateElementId_1 = generateElementId.generateElementUniqueFlag;
var generateElementId_2 = generateElementId.getExpression;

function marquee(el, options) {
  var opt = Object.assign({
    // 动画时长
    duration: 10000,
    // 两个文本间间距
    gap: '',
    // 文本距离容器左边缘距离
    start: 0,
    // 在哪里滚动
    scrollIn: 'parent',
    // 是否超出容器才滚动
    scrollOnOverflow: false
  }, options);
  Object.assign(el.style, {
    whiteSpace: 'nowrap'
  });
  Object.assign(el.parentNode.style, {
    overflow: 'hidden'
  });
  var containerStyle = window.getComputedStyle(el.parentNode); // 容器宽度

  var containerWidth = parseInt(containerStyle.width); // 文字宽度

  var textWidth = el.offsetWidth;
  var gapWidth = 0;

  if (opt.scrollIn === 'self') {
    gapWidth = opt.gap || textWidth;
  } else {
    gapWidth = opt.gap || containerWidth;
  } // 最大translatex


  var maxTranslateX = -(textWidth + gapWidth);
  Object.assign(el.parentNode.style, {
    overflow: ''
  });

  if (textWidth <= containerWidth && opt.scrollOnOverflow || containerWidth === 0 || textWidth === 0) {
    Object.assign(el.style, {
      whiteSpace: ''
    });
    return;
  }

  var container = document.createElement('div');
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  var copy1 = document.createElement('span');
  var rawEl = el.cloneNode(true);
  copy1.innerHTML = el.innerHTML;
  var copy2 = copy1.cloneNode(true);
  div1.appendChild(copy1);
  div2.appendChild(copy2);
  container.appendChild(div1);
  container.appendChild(div2);

  for (var i = 0; i < el.childNodes.length;) {
    el.removeChild(el.childNodes[i]);
  }

  el.appendChild(container);
  Object.assign(div1.style, {
    display: 'inline-block',
    marginRight: gapWidth + 'px',
    marginLeft: opt.start + 'px'
  });
  Object.assign(div2.style, {
    display: 'inline-block'
  });
  Object.assign(container.style, {
    display: 'inline-block'
  });
  Object.assign(el.style, {
    overflow: 'hidden'
  });

  if (opt.scrollIn === 'self' && textWidth < containerWidth) {
    Object.assign(el.style, {
      width: textWidth + 'px',
      display: 'inline-block',
      verticalAlign: 'bottom'
    });
  } else {
    Object.assign(el.style, {
      width: containerWidth + 'px',
      margin: 0,
      display: 'block'
    });
  }

  var piece = maxTranslateX / opt.duration * 10;
  var translateX = -piece;
  var timer = null;
  var timeout = 10;

  var doMarquee = function doMarquee() {
    translateX += piece;
    timeout = 10;

    if (translateX > maxTranslateX && translateX < 0) {
      container.style.transform = "translateX(".concat(translateX, "px)");
    } else if (translateX === 0) {
      container.style.transform = "translateX(".concat(translateX, "px)");
      timeout = 2000;
    } else {
      container.style.transform = "translateX(".concat(maxTranslateX, "px)");
      translateX = -piece;
    }

    timer = setTimeout(function () {
      doMarquee();
    }, timeout);
  };

  var mouseenter = function mouseenter() {
    clearTimeout(timer);
  };

  var mouseleave = function mouseleave() {
    doMarquee();
  };

  var destroy = function destroy() {
    el.parentNode.appendChild(rawEl);
    el.parentNode.removeChild(el);
    Object.assign(rawEl.style, {
      whiteSpace: ''
    });
    clearTimeout(timer);
    el.removeEventListener('mouseenter', mouseenter);
    el.removeEventListener('mouseleave', mouseleave);
  };

  el.addEventListener('mouseenter', mouseenter);
  el.addEventListener('mouseleave', mouseleave);
  doMarquee();
  return {
    destroy: destroy
  };
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function boolMobile() {
  if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true; // 移动端
  }

  return false; // PC端
}

function checkPageCanScroll() {
  var viewHeight = document.documentElement.clientHeight;
  var viewWidth = document.documentElement.clientWidth;
  var bodyStyle = window.getComputedStyle(document.body);
  var htmlStyle = window.getComputedStyle(document.documentElement);
  return bodyStyle.overflow !== 'hidden' && htmlStyle.overflow !== 'hidden' && (document.documentElement.scrollHeight > viewHeight || document.documentElement.scrollWidth > viewWidth);
}

function checkNodeCanScroll(el) {
  var elStyle = window.getComputedStyle(el);
  return elStyle.overflow !== 'visible' && (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth);
}

function throttle(fn) {
  var curTick = false;
  var that = this;
  var params = Array.prototype.slice.call(arguments);
  params.shift();
  return function () {
    var curParams = Array.prototype.slice.call(arguments);

    if (!curTick) {
      curTick = true;
      requestAnimationFrame(function () {
        fn.apply(that, [].concat(toConsumableArray(curParams), [params]));
        curTick = false;
      });
    }
  };
}
/**
 * @description 分类器
 * @param {String} id 父元素id选择器
 * @param {Array} data 可选，分类的数据
 */


var Sorter = /*#__PURE__*/function () {
  // 分类数据
  // 容器节点
  // 列表元素
  // 拖拽元素的副本
  // 拖拽元素最开始位置信息
  // 拖拽元素位置索引
  // 鼠标位置
  // 单次动画结束
  // 当次拖拽结束
  // 是否能拖拽
  // 相对于文档的位置
  // 相对于文档的位置
  // 相对于文档的位置
  // postions 相对于文档的位置
  // simple：性能高，但多行时如果有动画，不支持元素大小不一样
  // complex: 性能低， 但支持多行时元素大小不一样
  function Sorter(el, initOptions, data) {
    var _this = this;

    classCallCheck(this, Sorter);

    defineProperty(this, "data", void 0);

    defineProperty(this, "container", void 0);

    defineProperty(this, "items", void 0);

    defineProperty(this, "nodeCopy", void 0);

    defineProperty(this, "nodeInitPos", void 0);

    defineProperty(this, "index", void 0);

    defineProperty(this, "mouse", {});

    defineProperty(this, "isMoveEnd", true);

    defineProperty(this, "isDragEnd", true);

    defineProperty(this, "canDrag", true);

    defineProperty(this, "copyPosition", {});

    defineProperty(this, "bodyPosition", {});

    defineProperty(this, "containerPosition", {});

    defineProperty(this, "dragStart", function (e) {
      var node = e.target;

      var dragNode = _this.checkNode(node);

      if (!_this.isRightNode) {
        return;
      }

      var index = _this._start(dragNode, e.clientX, e.clientY);

      if (index < 0) {
        return;
      }

      if (e.dataTransfer.setData) {
        e.dataTransfer.setData('text/html', e.target);
      }

      if (e.dataTransfer.dropEffect) {
        e.dataTransfer.dropEffect = 'move';
      }

      _this.setDragNodeStyle();
    });

    defineProperty(this, "drag", function (e) {
      if (!_this.isRightNode) {
        return;
      } // e.clientX和e.clientY突然出现一瞬间的0 0
      // console.log('clientX：' + e.clientX + '；' + 'clientY：' + e.clientY)


      _this._move(e.clientX, e.clientY);
    });

    defineProperty(this, "dragEnd", function () {
      if (!_this.isRightNode) {
        return;
      }

      _this._end();
    });

    defineProperty(this, "mouseDown", function (event) {
      if (event.button !== 0) {
        return;
      }

      event.preventDefault();
      var node = event.target;

      var dragNode = _this.checkNode(node); // 鼠标移出浏览器时不会触发mouseup事件，此时进入浏览器点击鼠标左键需要执行上一次的end


      if (!_this.isRightNode) {
        return;
      }

      if (_this.isMouseLeft) {
        _this._end();

        return;
      }

      var index = _this._start(dragNode, event.clientX, event.clientY);

      if (index < 0) {
        return;
      }

      _this.setDragNodeStyle();

      _this.setNodeCopy(dragNode);
    });

    defineProperty(this, "mouseMove", function (event) {
      if (!_this.isRightNode || !_this.nodeCopy) {
        return;
      }

      _this._move(event.clientX, event.clientY);
    });

    defineProperty(this, "mouseLeave", function () {
      if (!_this.isRightNode) {
        return;
      } // 只有存在copy元素才算离开过


      if (_this.nodeCopy) {
        _this.isMouseLeft = true;
      }
    });

    defineProperty(this, "mouseUp", function () {
      if (!_this.isRightNode) {
        return;
      }

      _this._end(); // 即使mouseup触发  mousemove还是会触发


      _this.isRightNode = false;
      _this.isMouseLeft = false;
    });

    defineProperty(this, "touchStart", function (event) {
      event.preventDefault();
      var touch = event.targetTouches[0];
      var node = touch.target;

      var dragNode = _this.checkNode(node);

      if (!_this.isRightNode) {
        return;
      }

      var index = _this._start(dragNode, touch.clientX, touch.clientY);

      if (index < 0) {
        return;
      }

      _this.setNodeCopy(dragNode);

      _this.setDragNodeStyle();
    });

    defineProperty(this, "touchMove", function (event) {
      if (!_this.isRightNode) {
        return;
      }

      var touch = event.targetTouches[0];

      _this._move(touch.clientX, touch.clientY);
    });

    defineProperty(this, "touchEnd", function () {
      if (!_this.isRightNode) {
        return;
      }

      _this._end();
    });

    defineProperty(this, "animateNodeEnd", function () {
      _this.animatedNode.removeEventListener('transitionend', _this.animateNodeEnd); // 触发end的条件，拖拽元素有发生交换，拖拽元素有动画


      _this.event.emit('animationend');

      _this.resolve && _this.resolve();
    });

    this.container = el;
    this.options = _objectSpread$1({
      // simple complex
      mode: 'complex',
      way: 'mouse',
      // 拖拽不能超出边界
      animation: true,
      duration: 200,
      delay: 0,
      dragNode: 'sort-cell',
      dragClass: '',
      group: {
        clone: true,
        put: true
      },
      sort: true
    }, initOptions);
    this.event = new Event(); // this.data = _.cloneDeep(data)

    this.data = data;
  }

  createClass(Sorter, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.isMobile = boolMobile();
      this.isSimpleMode = this.options.mode === 'simple';
      this.setNodes();

      if (this.isSimpleMode) {
        var area = 0; // horizontal vertical mixin

        this.direction = 'vertical';
        this.items = [];
        this.nodes.forEach(function (node, index) {
          if (!_this2.isMobile) {
            node.draggable = true;
          }

          var position = _this2.getPostionInContainer(node);

          var obj = {
            el: node,
            position: position,
            id: index
          };

          if (index === 1) {
            var lastItem = _this2.items[0];

            if (lastItem.position.left !== position.left && lastItem.position.top === position.top) {
              _this2.direction = 'horizontal';
            } else if (lastItem.position.top !== position.top && lastItem.position.left === position.left) {
              _this2.direction = 'vertical';
            } else {
              _this2.direction = 'mixin';
            }
          }

          if (index > 0) {
            var _lastItem = _this2.items[index - 1];

            if (_this2.direction === 'horizontal') {
              if (position.top !== _lastItem.position.top) {
                area++;
                _lastItem.last = true;
                obj.first = true;
              }
            } else if (_this2.direction === 'vertical') {
              if (position.left !== _lastItem.position.left) {
                area++;
                _lastItem.last = true;
                obj.first = true;
              }
            }
          } else {
            obj.first = true;
          }

          obj.area = area;

          _this2.items.push(obj);
        });
      } else {
        this.nodes.forEach(function (node) {
          if (!_this2.isMobile) {
            node.draggable = true;
          }
        });
        var firstNodePos = this.getPosition(this.nodes[0]);
        var secondNodePos = this.getPosition(this.nodes[1]);

        if (secondNodePos.left !== firstNodePos.left && secondNodePos.top === firstNodePos.top) {
          this.direction = 'horizontal';
        } else if (secondNodePos.top !== firstNodePos.top && secondNodePos.left === firstNodePos.left) {
          this.direction = 'vertical';
        } else {
          this.direction = 'mixin';
        }
      }

      this.initScrollInfo();
      this.throttleTouchMove = throttle(this.touchMove);
      this.throttleDrag = throttle(this.drag);
      this.throttleMouseMove = throttle(this.mouseMove);
      this.setSupportsPassive();
      this.addlistener();
    }
  }, {
    key: "addlistener",
    value: function addlistener() {
      // 对container监听的话，移出container外会出现不灵敏的卡顿现象
      if (this.isMobile) {
        this._on(this.container, 'touchstart', this.touchStart);

        this._on(this.container, 'touchmove', this.throttleTouchMove); // this._on(this.container, 'touchmove', this.touchMove)


        this._on(this.container, 'touchend', this.touchEnd);
      } else {
        // this._on(document.body, 'dragstart', this.dragStart)
        // this._on(document.body, 'drag', this.throttleDrag)
        // this._on(document.body, 'dragend', this.dragEnd)
        if (this.options.way === 'drag') {
          this._on(this.container, 'dragstart', this.dragStart);

          this._on(this.container, 'drag', this.throttleDrag);

          this._on(this.container, 'dragend', this.dragEnd);

          this._on(this.container, 'dragover', this.dragOver);
        } else {
          this._on(window, 'mousedown', this.mouseDown);

          this._on(window, 'mousemove', this.throttleMouseMove); // this._on(document.body, 'mousemove', this.mouseMove)


          this._on(window, 'mouseleave', this.mouseLeave);

          this._on(window, 'mouseup', this.mouseUp);
        }
      }
    }
  }, {
    key: "removeListener",
    value: function removeListener() {
      if (this.isMobile) {
        this._off(this.container, 'touchstart', this.touchStart);

        this._off(this.container, 'touchmove', this.throttleTouchMove);

        this._off(this.container, 'touchend', this.touchEnd);
      } else {
        // this._off(document.body, 'dragstart', this.dragStart)
        // this._off(document.body, 'drag', this.throttleDrag)
        // this._off(document.body, 'dragend', this.dragEnd)
        if (this.options.way === 'drag') {
          this._off(this.container, 'dragstart', this.dragStart);

          this._off(this.container, 'drag', this.throttleDrag);

          this._off(this.container, 'dragend', this.dragEnd);
        } else {
          this._off(window, 'mousedown', this.mouseDown);

          this._off(window, 'mousemove', this.throttleMouseMove);

          this._off(window, 'mouseleave', this.mouseLeave);

          this._off(window, 'mouseup', this.mouseUp);
        }
      }
    } // 需要在touchStart事件中使用preventDefault阻止页面的滚动行为
    // 但高版本浏览器会默认设置passive:true，无法preventDefault
    // 所以需要设置passive:false

  }, {
    key: "_on",
    value: function _on(el, event, fn) {
      el.addEventListener(event, fn, this.supportsPassive ? {
        capture: false,
        passive: false
      } : false);
    }
  }, {
    key: "_off",
    value: function _off(el, event, fn) {
      el.removeEventListener(event, fn, this.supportsPassive ? {
        capture: false,
        passive: false
      } : false);
    }
  }, {
    key: "on",
    value: function on(name, callback) {
      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.event.on(name, callback, once);
    }
  }, {
    key: "off",
    value: function off(name, callback) {
      this.event.off(name, callback);
    }
  }, {
    key: "setSupportsPassive",
    value: function setSupportsPassive() {
      var _this3 = this;

      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function get() {
            _this3.supportsPassive = true;
            return true;
          }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: "dragOver",
    value: function dragOver(ev) {
      ev.preventDefault();
    }
  }, {
    key: "_start",
    value: function _start(node, x, y) {
      // 即使end事件触发，但动画也可能正在进行
      // 只有动画完毕才可以拖拽
      if (!this.isMoveEnd) {
        this.canDrag = false;
        return -1;
      }

      var index = -1;

      if (this.isSimpleMode) {
        index = this.items.findIndex(function (item) {
          return item.el === node;
        });
      } else {
        this.setNodes();
        index = this.nodes.findIndex(function (el) {
          return el === node;
        });
      }

      if (index === -1) {
        return -1;
      }

      this.canDrag = true;
      this.isDragEnd = false; // 相对于容器的节点中心坐标
      // 设置copy的初始位置

      this.initCopyPostion(node);
      this.nodeInitPos = {
        node: node,
        index: index
      };
      this.moveInfo = {
        dragNode: node,
        dragIndex: index
      };
      this.mouse.originX = x;
      this.mouse.originY = y;
      this.mouse.startX = x;
      this.mouse.startY = y;

      if (this.isSimpleMode) {
        this.mouse.index = index;
      }

      this.index = index;
      this.event.emit('dragstart', {
        node: node,
        index: index,
        position: this.copyPosition
      });
      return index;
    }
  }, {
    key: "_move",
    value: function _move(x, y) {
      if (!this.canDrag) {
        return;
      } // const start = performance.now()
      // 距离开始位置的偏移量


      var offsety = y - this.mouse.originY;
      var offsetx = x - this.mouse.originX;
      var dx = x - this.mouse.startX;
      var dy = y - this.mouse.startY;

      if (dx === 0 && dy === 0) {
        return;
      }

      this.setCopyPosition(dx, dy);
      this.mouse.startX = x;
      this.mouse.startY = y;

      if (this.canScrollBody || this.canScrollContainer) {
        this.scrollOnMove();
      }

      this.setNodes();
      var newX = this.copyPosition.centreX;
      var newY = this.copyPosition.centreY; // 节点位置是相对于文档的，但容器内滚动会改变相对于文档的位置
      // simple 下元素的位置只在最开始获取
      // 当容器发生滚动时，需要加上滚动的距离

      if (this.isSimpleMode && this.canScrollContainer) {
        newX += this.container.scrollLeft;
        newY += this.container.scrollTop;
      }

      if (this.nodeCopy) {
        this.nodeCopy.style.transform = "translate(".concat(offsetx, "px,").concat(offsety, "px)");
      }

      this.event.emit('dragmove', {
        node: this.moveInfo.dragNode,
        index: this.moveInfo.dragIndex,
        position: this.copyPosition
      }); // 不在容器内

      if (!this.checkInContainer(this.copyPosition.centreX, this.copyPosition.centreY)) {
        this.event.emit('outcontaner', this.copyPosition);
        return;
      }

      if (!this.options.sort) {
        return;
      } // 拖拽元素中心在另一个元素内


      var hint = this.hint(newX, newY);

      if (this.isSimpleMode) {
        if (hint === -1 || hint === this.mouse.index) {
          return;
        }
      } else {
        if (hint === -1 || hint === this.index) {
          return;
        } // 因为会在节点交换后，让新节点在原先位置，此时会触发事件，但不应该再次发生交换，所以不能正在交换的2个节点


        if (this.options.animation && hint === this.lastHint) {
          return;
        }
      }

      this.setMoveInfo(this.index, hint);
      this.swapItem();

      if (this.isSimpleMode) {
        this.mouse.index = hint;
      } else {
        // 移动节点后，hintNode索引会改变
        if (hint > this.index) {
          this.lastHint = hint - 1;
        } else if (hint < this.index) {
          this.lastHint = hint + 1;
        }

        this.index = hint;
      } // console.log('total:' + (performance.now() - start))

    }
  }, {
    key: "_end",
    value: function _end() {
      if (!this.canDrag) {
        return;
      }

      this.isDragEnd = true;

      if (this.nodeCopy) {
        this.nodeCopy.remove();
        this.nodeCopy = null;
        this.hasNodeCopy = false;
      }

      this.event.emit('dragend', {
        node: this.moveInfo.dragNode,
        index: this.moveInfo.dragIndex,
        position: this.copyPosition
      }); // 拖拽结束，但动画未结束，不触发节点交换

      if (this.isSimpleMode) {
        if (this.isMoveEnd && this.options.animation) {
          this.sortEndOnSimple();
        }
      } else {
        if (this.isMoveEnd) {
          this.sortEndOnComplex();
        }
      }
    }
  }, {
    key: "swapItem",
    value: function swapItem() {
      var _this4 = this;

      if (this.isSimpleMode) {
        if (this.options.animation) {
          this.isMoveEnd = false;
          this.animateSwap().then(function () {
            _this4.isMoveEnd = true; // 如果动画结束，但拖拽没有结束，不触发节点交换

            if (_this4.isDragEnd) {
              _this4.sortEndOnSimple();
            }
          });
        } else {
          this.sortEndOnSimple();
        }
      } else {
        this.swapNode();

        if (this.options.animation) {
          this.isMoveEnd = false;
          this.animateSwap().then(function () {
            // 动画结束后可与上一次hint元素hint
            _this4.lastHint = -1;
            _this4.isMoveEnd = true;

            if (_this4.isDragEnd) {
              _this4.sortEndOnComplex();
            }
          });
        }
      }

      this.event.emit('change', _objectSpread$1({
        position: this.copyPosition
      }, this.moveInfo));
    }
  }, {
    key: "sortEndOnComplex",
    value: function sortEndOnComplex() {
      if (!this.moveInfo) {
        return;
      }

      this.canDrag = true;
      this.resetDragNodeStyle();

      if (this.moveInfo.hintNode) {
        this.resetNodesTransitionStyle();
        this.swapDataComplex();
        this.event.emit('sorted', {
          startIndex: this.nodeInitPos.index,
          startNode: this.nodeInitPos.node,
          hintIndex: this.moveInfo.hintIndex,
          hintNode: this.moveInfo.hintNode,
          position: this.copyPosition
        });
        this.nodeInitPos = null;
      }

      this.moveInfo = null;
    }
  }, {
    key: "sortEndOnSimple",
    value: function sortEndOnSimple() {
      var _this5 = this;

      if (!this.moveInfo) {
        return;
      }

      this.canDrag = true;
      this.resetDragNodeStyle();

      if (this.moveInfo.hintNode === undefined) {
        return;
      }

      var _this$moveInfo = this.moveInfo,
          dragIndex = _this$moveInfo.dragIndex,
          hintIndex = _this$moveInfo.hintIndex;
      this.swapNode();
      setTimeout(function () {
        if (hintIndex > dragIndex) {
          for (var i = dragIndex; i < hintIndex; i++) {
            var _ref = [_this5.items[i + 1].el, _this5.items[i].el];
            _this5.items[i].el = _ref[0];
            _this5.items[i + 1].el = _ref[1];
            _this5.items[i].position = _this5.getPostionInContainer(_this5.items[i].el);

            if (i === hintIndex - 1) {
              _this5.items[i + 1].position = _this5.getPostionInContainer(_this5.items[i + 1].el);
            }
          }
        } else if (hintIndex < dragIndex) {
          for (var _i = dragIndex; _i > hintIndex; _i--) {
            var _ref2 = [_this5.items[_i - 1].el, _this5.items[_i].el];
            _this5.items[_i].el = _ref2[0];
            _this5.items[_i - 1].el = _ref2[1];
            _this5.items[_i].position = _this5.getPostionInContainer(_this5.items[_i].el);

            if (_i === hintIndex - 1) {
              _this5.items[_i - 1].position = _this5.getPostionInContainer(_this5.items[_i - 1].el);
            }
          }
        }
      });
      this.items.forEach(function (item) {
        _this5.resetTransitionStyle(item.el);
      });
      this.index = hintIndex;
      this.swapDataSerial();
      this.moveInfo = null;
    }
  }, {
    key: "insertNode",
    value: function insertNode(newNode, refNode) {
      var before = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var parentNode = refNode.parentNode;

      if (before) {
        parentNode.insertBefore(newNode, refNode);
      } else {
        var tempNode = document.createElement('div');
        parentNode.insertBefore(newNode, refNode);
        parentNode.replaceChild(tempNode, newNode);
        parentNode.replaceChild(newNode, refNode);
        parentNode.replaceChild(refNode, tempNode);
      }
    }
  }, {
    key: "swapNode",
    value: function swapNode() {
      var _this$moveInfo2 = this.moveInfo,
          dragIndex = _this$moveInfo2.dragIndex,
          hintIndex = _this$moveInfo2.hintIndex,
          dragNode = _this$moveInfo2.dragNode,
          hintNode = _this$moveInfo2.hintNode;

      if (hintIndex > dragIndex) {
        this.insertNode(dragNode, hintNode, false);
      } else if (hintIndex < dragIndex) {
        this.insertNode(dragNode, hintNode);
      }
    }
  }, {
    key: "animateSwap",
    value: function animateSwap() {
      var _this6 = this;

      return new Promise(function (resolve) {
        _this6.animateNodes();

        _this6.emitAnimationEvent(_this6.moveInfo.dragNode);

        _this6.resolve = resolve;
      });
    }
  }, {
    key: "animateNodes",
    value: function animateNodes() {
      var _this7 = this;

      if (this.isSimpleMode) {
        var swaptItems = [];
        var transition = "transform ".concat(this.options.duration, "ms ease ").concat(this.options.delay, "ms");
        var _this$moveInfo3 = this.moveInfo,
            dragIndex = _this$moveInfo3.dragIndex,
            hintIndex = _this$moveInfo3.hintIndex,
            dragItem = _this$moveInfo3.dragItem,
            dragNode = _this$moveInfo3.dragNode;

        if (this.lastSwaptItems && this.lastSwaptItems.length) {
          this.lastSwaptItems.forEach(function (item) {
            _this7.style(item.el, {
              transition: transition,
              transform: 'translate(0,0px)'
            });
          });
        }

        var offsetX = 0;
        var offsetY = 0;

        if (this.direction === 'vertical') {
          if (hintIndex > dragIndex) {
            swaptItems = this.items.slice(dragIndex + 1, hintIndex + 1);
            offsetX = 0;
            offsetY = dragItem.position.top - swaptItems[0].position.top;
          } else if (dragIndex > hintIndex) {
            swaptItems = this.items.slice(hintIndex, dragIndex).reverse();
            offsetX = 0;
            offsetY = dragItem.position.bottom - swaptItems[0].position.bottom;
          }
        } else if (this.direction === 'horizontal') {
          if (hintIndex > dragIndex) {
            swaptItems = this.items.slice(dragIndex + 1, hintIndex + 1);
            offsetX = dragItem.position.left - swaptItems[0].position.left;
            offsetY = 0;
          } else if (dragIndex > hintIndex) {
            swaptItems = this.items.slice(hintIndex, dragIndex).reverse();
            offsetX = dragItem.position.right - swaptItems[0].position.right;
            offsetY = 0;
          }
        }

        swaptItems.forEach(function (item, index) {
          // 其余元素移动的距离
          var distanceX = 0;
          var distanceY = 0; // 多行的情况下
          // 每行第一个移动到上一行最后一个
          // 每行最后一个移动到下一行第一个
          // 其他移动的等于该行第一个或最后一个元素与相临元素间距离

          if (hintIndex > dragIndex && item.first || hintIndex < dragIndex && item.last) {
            if (index === 0) {
              distanceX = dragItem.position.left - item.position.left;
              distanceY = dragItem.position.top - item.position.top;
            } else {
              distanceX = swaptItems[index - 1].position.left - item.position.left;
              distanceY = swaptItems[index - 1].position.top - item.position.top;
            }

            if (swaptItems[index + 1]) {
              if (_this7.direction === 'horizontal') {
                offsetX = item.position.left - swaptItems[index + 1].position.left;
              } else if (_this7.direction === 'vertical') {
                offsetY = item.position.top - swaptItems[index + 1].position.top;
              }
            }
          } else {
            distanceX = offsetX;
            distanceY = offsetY;
          }

          _this7.style(item.el, {
            transition: transition,
            transform: "translate(".concat(distanceX, "px,").concat(distanceY, "px)")
          });
        });
        this.lastSwaptItems = swaptItems;
        this.style(dragNode, {
          transition: transition,
          transform: "translate(".concat(this.moveInfo.dx, "px,").concat(this.moveInfo.dy, "px)")
        });
      } else {
        // this.nodes.forEach((node, index) => {
        //   if (index === this.moveInfo.dragIndex) {
        //     return
        //   }
        //   this.animateComplex(node, this.positions[index])
        // })
        // this.animateComplex(
        //   this.moveInfo.dragNode,
        //   this.positions[this.moveInfo.dragIndex]
        // )
        this.animateNodesDiffPos(this.nodes, this.positions);
      }
    }
  }, {
    key: "animateNodesDiffPos",
    value: function animateNodesDiffPos(nodes, positionsBefore) {
      var _this8 = this;

      // 先将全部节点过渡取消
      nodes.forEach(function (el) {
        // 节点在文档中的位置改变后，为了准确获取改变后的位置信息
        _this8.resetTransitionStyle(el);
      }); // 再获取现在的位置
      // 因为获取位置时会重绘制，如果取消一个节点过渡，就离开获取位置，那么会重绘n次
      // 这样虽然遍历次数增加一倍，但重绘制只有一次，性能提高很多

      var positionsNow = this.getPositions(nodes); // 最后对2次的位置进行过渡动画

      nodes.forEach(function (node, index) {
        _this8.animateDiffPos(node, positionsBefore[index], positionsNow[index]);
      });
    }
  }, {
    key: "animateDiffPos",
    value: function animateDiffPos(el, positionBefore, positionNow) {
      var _this9 = this;

      var transition = "transform ".concat(this.options.duration, "ms ease ").concat(this.options.delay, "ms");

      if (positionBefore.left !== positionNow.left || positionBefore.top !== positionNow.top) {
        this.style(el, {
          transition: 'none',
          transform: "translate(".concat(positionBefore.left - positionNow.left, "px,").concat(positionBefore.top - positionNow.top, "px)")
        }); // this.getPosition(el)
        // 在下一帧启用过渡
        // 我们需要的是 1.设置元素的 transform 2. 过渡回来原先位置
        // 这2步操作应该在 1 次重绘前后进行
        // setTimeout 是推入下一次的宏任务队列
        // 但浏览器的重绘不一定在每次的宏任务最后，
        // 重绘应该是浏览器设置，以一个默认周期去重绘，比如16.6ms，
        // 所以在使用 setTimeout 时，如果2次宏任务恰好在同一周期，1 、2步骤依然可能在一次重绘前进行
        // 解决方法
        // 1. 强制重绘，
        // 2. move事件节流，使用requestAnimationFrame。不能使用setTimeout节流

        setTimeout(function () {
          _this9.style(el, {
            transform: 'translate(0, 0)',
            transition: transition
          });
        });
        this.lastAnimateNode = el;
      }
    } // directionX: dragNode 和 hintNode 之间的方向，正时 hintNode 在右边
    // ditanceX: 移动的距离

  }, {
    key: "animateComplex",
    value: function animateComplex(el, position) {
      var _this10 = this;

      var transition = "transform ".concat(this.options.duration, "ms ease ").concat(this.options.delay, "ms"); // 节点在文档中的位置改变后，为了准确获取改变后的位置信息

      this.resetTransitionStyle(el);
      var positionBefore = position; // 获取位置信息，会强制引起重绘，所以这里能正确获取

      var positionNow = this.getPosition(el);

      if (positionBefore.left !== positionNow.left || positionBefore.top !== positionNow.top) {
        this.style(el, {
          transition: 'none',
          transform: "translate(".concat(positionBefore.left - positionNow.left, "px,").concat(positionBefore.top - positionNow.top, "px)")
        }); // this.getPosition(el)
        // 在下一帧启用过渡
        // 我们需要的是 1.设置元素的 transform 2. 过渡回来原先位置
        // 这2步操作应该在 1 次重绘前后进行
        // setTimeout 是推入下一次的宏任务队列
        // 但浏览器的重绘不一定在每次的宏任务最后，
        // 重绘应该是浏览器设置，以一个默认周期去重绘，比如16.6ms，
        // 所以在使用 setTimeout 时，如果2次宏任务恰好在同一周期，1 、2步骤依然可能在一次重绘前进行
        // 解决方法
        // 1. 强制重绘，
        // 2. move事件节流，使用requestAnimationFrame。不能使用setTimeout节流

        requestAnimationFrame(function () {
          _this10.style(el, {
            transform: 'translate(0, 0)',
            transition: transition
          });
        });
        this.lastAnimateNode = el;
      }
    }
  }, {
    key: "setNodes",
    value: function setNodes() {
      this.nodes = this.getNodes();
    }
  }, {
    key: "getNodes",
    value: function getNodes() {
      var _this11 = this;

      // const nodes = [...this.container.querySelectorAll(`.${this.options.dragNode}`)]
      var nodes = toConsumableArray(this.container.children).filter(function (node) {
        if (_this11.groupDragNodes && _this11.groupDragNodes.length) {
          return _this11.groupDragNodes.some(function (item) {
            return node.className.includes(item);
          });
        }

        return node.className.includes(_this11.options.dragNode);
      });

      if (this.options.mode === 'complex') {
        if (this.hasNodeCopy) {
          nodes.pop();
        }
      }

      return nodes;
    }
  }, {
    key: "setPostions",
    value: function setPostions() {
      this.positions = this.getPositions(this.nodes);
    }
  }, {
    key: "getPositions",
    value: function getPositions(nodes) {
      var _this12 = this;

      return nodes.map(function (node) {
        return _this12.getPosition(node);
      });
    }
  }, {
    key: "hint",
    value: function hint(x, y) {
      var _this13 = this;

      if (this.isSimpleMode) {
        return this.items.findIndex(function (item) {
          var position = item.position;
          return x > position.left && x < position.right && y > position.top && y < position.bottom;
        });
      }

      var hintIndex = -1;
      var isHintIndex = false;
      var isDragIndex = false;
      var piece = 0;
      this.setPostions();
      this.positions.forEach(function (position, index) {
        if (x > position.left + piece && x < position.right - piece && y > position.top + piece && y < position.bottom - piece) {
          // 多行时，处于换行动画的元素不hint
          // 如果hint，会发生和预期不同的交换结果
          if (_this13.direction === 'horizontal' && _this13.positions[index - 1] && _this13.positions[index + 1] && position.top !== _this13.positions[index + 1].top && position.top !== _this13.positions[index - 1].top) {
            return;
          }

          if (_this13.direction === 'vertical' && _this13.positions[index - 1] && _this13.positions[index + 1] && position.left !== _this13.positions[index + 1].left && position.left !== _this13.positions[index - 1].left) {
            return;
          } // 元素重叠时，正在drag和hint的优先


          if (index === _this13.moveInfo.dragIndex) {
            isDragIndex = true;
          } else if (index === _this13.moveInfo.hintIndex) {
            isHintIndex = true;
          } else {
            hintIndex = index;
          }
        }
      });

      if (isHintIndex) {
        return this.moveInfo.hintIndex;
      }

      if (isDragIndex) {
        return this.moveInfo.dragIndex;
      }

      return hintIndex;
    }
  }, {
    key: "checkInContainer",
    value: function checkInContainer(x, y) {
      var pos = this.containerPosition;
      return x > pos.left && x < pos.right && y > pos.top && y < pos.bottom;
    }
  }, {
    key: "setMoveInfo",
    value: function setMoveInfo(current, hint) {
      if (this.isSimpleMode) {
        var hintObj = this.items[hint];
        var currentObj = this.items[current];
        var dx = 0;
        var dy = 0;

        if (hint > current) {
          dy = hintObj.position.bottom - currentObj.position.bottom;
          dx = hintObj.position.right - currentObj.position.right;
        } else if (hint < current) {
          dy = hintObj.position.top - currentObj.position.top;
          dx = hintObj.position.left - currentObj.position.left;
        }

        this.moveInfo = {
          dragItem: currentObj,
          hintItem: hintObj,
          dragNode: currentObj.el,
          hintNode: hintObj.el,
          dragIndex: current,
          hintIndex: hint,
          dx: dx,
          dy: dy
        };
      } else {
        this.moveInfo = {
          dragNode: this.nodes[current],
          hintNode: this.nodes[hint],
          dragIndex: current,
          hintIndex: hint
        };
      }
    } // 相对于文档的位置

  }, {
    key: "getPosition",
    value: function getPosition(node) {
      var scrollX = window.scrollX;
      var scrollY = window.scrollY;
      var cRect = node.getBoundingClientRect();
      var left = cRect.left + scrollX;
      var top = cRect.top + scrollY;
      var right = cRect.right + scrollX;
      var bottom = cRect.bottom + scrollY;
      var width = cRect.right - cRect.left;
      var height = cRect.bottom - cRect.top;
      return {
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        centreX: left + width / 2,
        centreY: top + height / 2,
        width: width,
        height: height,
        viewLeft: cRect.left,
        viewRight: cRect.right,
        viewTop: cRect.top,
        viewBottom: cRect.bottom,
        viewCentreX: cRect.left + width / 2,
        viewCentreY: cRect.top + height / 2
      };
    } // 获取与容器滚动无关，且相对于文档的绝对位置

  }, {
    key: "getPostionInContainer",
    value: function getPostionInContainer(node) {
      var _this$container = this.container,
          scrollLeft = _this$container.scrollLeft,
          scrollTop = _this$container.scrollTop;
      var position = this.getPosition(node);
      ['left', 'right', 'centreX'].forEach(function (item) {
        position[item] += scrollLeft;
      });
      ['top', 'bottom', 'centreY'].forEach(function (item) {
        position[item] += scrollTop;
      });
      return position;
    }
  }, {
    key: "setNodeCopy",
    value: function setNodeCopy(node) {
      var _this$copyInitViewPos = this.copyInitViewPosition,
          left = _this$copyInitViewPos.left,
          top = _this$copyInitViewPos.top,
          width = _this$copyInitViewPos.width,
          height = _this$copyInitViewPos.height;
      this.nodeCopy = node.cloneNode(true);
      var style = {
        position: 'fixed',
        left: left + 'px',
        top: top + 'px',
        zIndex: 100,
        transformOrigin: '50% 50%',
        boxSizing: 'border-box',
        background: '#c8ebfb',
        opacity: 0.8,
        transition: 'none',
        width: width + 'px',
        height: height + 'px'
      };
      this.nodeCopy.classList.add('sort-copy');
      this.hasNodeCopy = true;
      Object.assign(this.nodeCopy.style, style);
      this.container.appendChild(this.nodeCopy);
    }
  }, {
    key: "initCopyPostion",
    value: function initCopyPostion(node) {
      var position = this.getPosition(node); // 初始相对于可视窗口的位置

      this.copyInitViewPosition = {
        left: position.viewLeft,
        top: position.viewTop,
        right: position.viewRight,
        bottom: position.viewBottom,
        centreX: position.viewCentreX,
        centreY: position.viewCentreY,
        width: position.width,
        height: position.height
      };
      this.copyPosition = {
        left: position.left,
        top: position.top,
        right: position.right,
        bottom: position.bottom,
        centreX: position.centreX,
        centreY: position.centreY,
        width: position.width,
        height: position.height
      };
    }
  }, {
    key: "setCopyPosition",
    value: function setCopyPosition(dx, dy) {
      // 与容器滚动无关，相对于文档的位置
      this.copyPosition = {
        left: this.copyPosition.left + dx,
        right: this.copyPosition.right + dx,
        top: this.copyPosition.top + dy,
        bottom: this.copyPosition.bottom + dy,
        centreX: this.copyPosition.centreX + dx,
        centreY: this.copyPosition.centreY + dy,
        width: this.copyPosition.width,
        height: this.copyPosition.height
      };
    }
  }, {
    key: "setBodyPosition",
    value: function setBodyPosition() {
      var _window = window,
          scrollX = _window.scrollX,
          scrollY = _window.scrollY;
      this.bodyPosition = {
        left: 0 + scrollX,
        top: 0 + scrollY,
        right: document.documentElement.clientWidth + scrollX,
        bottom: document.documentElement.clientHeight + scrollY
      };
    }
  }, {
    key: "checkContainerScroll",
    value: function checkContainerScroll() {
      this.canScrollContainer = checkNodeCanScroll(this.container);
    }
  }, {
    key: "checkBodyScroll",
    value: function checkBodyScroll() {
      this.canScrollBody = checkPageCanScroll();

      if (this.canScrollBody) {
        // 由容器造成的页面滚动
        if (this.containerPosition.bottom <= document.documentElement.clientHeight) {
          this.canScrollBody = false;
        }
      }
    }
  }, {
    key: "initScrollInfo",
    value: function initScrollInfo() {
      this.checkContainerScroll(); // 相对于文档的位置

      this.containerPosition = this.getPosition(this.container);
      this.checkBodyScroll();

      if (this.canScrollBody) {
        // 视口相对于文档的位置
        this.setBodyPosition();
      }
    }
  }, {
    key: "scrollRelative",
    value: function scrollRelative(el, x, y) {
      el.scrollLeft += x;
      el.scrollTop += y;
    } // 鼠标距离开始地方移动的距离dx dy（不包含滚动条)

  }, {
    key: "scrollOnMove",
    value: function scrollOnMove() {
      var _this14 = this;

      var _this$copyPosition = this.copyPosition,
          left = _this$copyPosition.left,
          top = _this$copyPosition.top,
          right = _this$copyPosition.right,
          bottom = _this$copyPosition.bottom;
      var piece = 20;

      var scroll = function scroll(el, edge) {
        return new Promise(function (resolve) {
          // console.log(edge)
          if (left <= edge.left) {
            resolve();

            _this14.scrollRelative(el, -piece, 0);
          } else if (right >= edge.right) {
            resolve();

            _this14.scrollRelative(el, piece, 0);
          } else if (top <= edge.top) {
            resolve();

            _this14.scrollRelative(el, 0, -piece);
          } else if (bottom >= edge.bottom) {
            resolve();

            _this14.scrollRelative(el, 0, piece);
          }
        });
      }; // 暂时只能container造成body scroll或者container scroll但不造成body scroll


      if (this.canScrollContainer) {
        scroll(this.container, this.containerPosition);
      } else if (this.canScrollBody) {
        // 重绘是昂贵的
        var oldScrollX = window.scrollX;
        var oldScrollY = window.scrollY;
        scroll(document.documentElement, this.bodyPosition).then(function () {
          _this14.setCopyPosition(scrollX - oldScrollX, scrollY - oldScrollY);

          _this14.setBodyPosition();
        });
      }
    }
  }, {
    key: "animateScrollRelative",
    value: function animateScrollRelative(el, x, y) {
      var _this15 = this;

      var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 300;
      var timeout = 10;
      var dx = Math.ceil(x / duration * timeout);
      var dy = Math.ceil(y / duration * timeout);
      var remain = 0;
      var d = 0;

      if (x !== 0) {
        remain = x;
        d = dx;
      } else if (y !== 0) {
        remain = y;
        d = dy;
      }

      this.isScroll = true;

      var animate = function animate() {
        if (remain <= 0) {
          _this15.isScroll = false;
          return;
        }

        _this15.scrollRelative(el, dx, dy);

        remain -= d;
        setTimeout(function () {
          animate();
        }, timeout);
      };

      animate();
    }
  }, {
    key: "setDragNodeStyle",
    value: function setDragNodeStyle() {
      var dragNode = this.moveInfo.dragNode;

      if (!dragNode) {
        return;
      }

      if (this.options.dragClass) {
        dragNode.classList.remove(this.options.dragClass);
      } else {
        dragNode.style.opacity = 0.6;
        dragNode.style.background = '#c8ebfb';
        dragNode.style.zIndex = 10;
        dragNode.style.position = 'relative';
      }
    }
  }, {
    key: "resetDragNodeStyle",
    value: function resetDragNodeStyle() {
      var dragNode = this.moveInfo.dragNode;

      if (!dragNode) {
        return;
      }

      this.resetDragStyle(dragNode);
    }
  }, {
    key: "resetDragStyle",
    value: function resetDragStyle(node) {
      if (this.options.dragClass) {
        node.classList.add(this.options.dragClass);
      } else {
        node.style.opacity = '';
        node.style.background = '';
        node.style.zIndex = '';
        node.style.position = '';
      }
    }
  }, {
    key: "resetNodesTransitionStyle",
    value: function resetNodesTransitionStyle() {
      var _this16 = this;

      this.nodes.forEach(function (node) {
        _this16.resetTransitionStyle(node);
      });
    }
  }, {
    key: "resetTransitionStyle",
    value: function resetTransitionStyle(node) {
      this.style(node, {
        transition: '',
        transform: ''
      });
    }
  }, {
    key: "getParentByClass",
    value: function getParentByClass(node, pClass) {
      if (!node) {
        return null;
      }

      if (node.className && node.className.split(' ').includes(pClass)) {
        return node;
      }

      return this.getParentByClass(node.parentNode, pClass);
    }
  }, {
    key: "swapData",
    value: function swapData(current, hint) {
      var _ref3 = [this.data[hint], this.data[current]];
      this.data[current] = _ref3[0];
      this.data[hint] = _ref3[1];
    }
  }, {
    key: "checkNode",
    value: function checkNode(node) {
      var _this17 = this;

      // 拖拽子节点时，往上寻找 sort-cell 节点
      var dragNode = null;

      if (this.groupDragNodes && this.groupDragNodes.length) {
        this.groupDragNodes.some(function (item) {
          dragNode = _this17.getParentByClass(node, item);
          return dragNode;
        });
      } else {
        dragNode = this.getParentByClass(node, this.options.dragNode);
      }

      if (!dragNode || dragNode.parentNode !== this.container) {
        this.isRightNode = false;
      } else {
        this.isRightNode = true;
      }

      return dragNode;
    }
  }, {
    key: "swapDataSerial",
    value: function swapDataSerial() {
      if (!this.data || !this.moveInfo) {
        return;
      }

      var _this$moveInfo4 = this.moveInfo,
          dragIndex = _this$moveInfo4.dragIndex,
          hintIndex = _this$moveInfo4.hintIndex;
      this.sortData(this.data, dragIndex, hintIndex);
    }
  }, {
    key: "swapDataComplex",
    value: function swapDataComplex() {
      if (!this.data || !this.moveInfo || !this.nodeInitPos) {
        return;
      }

      var firstIndex = this.nodeInitPos.index;
      var hintIndex = this.moveInfo.hintIndex;
      this.sortData(this.data, firstIndex, hintIndex);
    }
  }, {
    key: "sortData",
    value: function sortData(data, start, end) {
      if (!data || !data.length || !(start >= 0) || !(end >= 0) || start === end) {
        return;
      }

      var dragItem = this.data.splice(start, 1)[0]; // 如果 end > start，删除后，end 代表的元素已经代表原先的下一个
      // end 前面添加

      data.splice(end, 0, dragItem);
    }
  }, {
    key: "emitAnimationEvent",
    value: function emitAnimationEvent(node) {
      var _this18 = this;

      return new Promise(function (resolve) {
        _this18.event.emit('animationstart');

        node.removeEventListener('transitionend', _this18.animateNodeEnd);
        node.addEventListener('transitionend', _this18.animateNodeEnd);
        _this18.animatedNode = node;
        _this18.resolve = resolve;
      });
    } // 过渡结束触发

  }, {
    key: "limitNumber",
    value: function limitNumber(value, min, max) {
      if (value < min) {
        return min;
      }

      if (value > max) {
        return max;
      }

      return value;
    }
  }, {
    key: "style",
    value: function style(el, styles) {
      Object.assign(el.style, styles);
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
    }
  }, {
    key: "removeData",
    value: function removeData(index) {
      if (!this.data) {
        return;
      }

      this.data.splice(index, 1);
    }
  }, {
    key: "addData",
    value: function addData(index, value) {
      if (!this.data || value === undefined) {
        return;
      }

      this.data.splice(index, 0, value);
    } // public
    // 删除节点

  }, {
    key: "removeNode",
    value: function removeNode(index) {
      if (!Number.isInteger(index)) {
        return;
      }

      var nodes = this.getNodes();
      var curIndex = index;
      curIndex = this.limitNumber(index, 0, nodes.length - 1);
      this.container.removeChild(nodes[curIndex]);
      this.removeData(curIndex);
      return {
        index: curIndex,
        node: nodes[curIndex]
      };
    }
  }, {
    key: "removeNodeAnimated",
    value: function removeNodeAnimated(index) {
      if (!Number.isInteger(index)) {
        return;
      }

      var nodes = this.getNodes();
      var curIndex = index;
      curIndex = this.limitNumber(index, 0, nodes.length - 1);
      var beforePostions = this.getPositions(nodes);
      this.container.removeChild(nodes[curIndex]);
      this.animateNodesDiffPos(nodes, beforePostions);
      this.emitAnimationEvent(this.lastAnimateNode);
      this.removeData(curIndex);
      return {
        index: curIndex,
        node: nodes[curIndex]
      };
    } // 添加节点

  }, {
    key: "addNode",
    value: function addNode(index, node, value) {
      if (!Number.isInteger(index)) {
        return;
      }

      var nodes = this.getNodes();
      var curIndex = index;
      curIndex = this.limitNumber(index, 0, nodes.length);

      if (curIndex === nodes.length) {
        this.insertNode(node, nodes[nodes.length - 1], false);
      } else {
        this.container.insertBefore(node, nodes[curIndex]);
      }

      this.addData(curIndex, value);
      return {
        index: curIndex,
        node: node
      };
    }
    /**
     * @description 从指定位置动画添加节点
     * @param {Number} index 插入位置的索引
     * @param {Object} newNode 插入的节点
     * @param {Object} position 节点的初始位置
     */

  }, {
    key: "addNodeAnimated",
    value: function addNodeAnimated(_ref4) {
      var index = _ref4.index,
          node = _ref4.node,
          position = _ref4.position,
          value = _ref4.value;

      if (!Number.isInteger(index)) {
        return;
      }

      var nodes = this.getNodes();
      var beforePostions = this.getPositions(nodes);
      var newNodePosition = position || this.getPosition(node);
      var curIndex = index;
      curIndex = this.limitNumber(index, 0, nodes.length);

      if (curIndex === nodes.length) {
        this.insertNode(node, nodes[nodes.length - 1], false);
      } else {
        this.container.insertBefore(node, nodes[curIndex]);
      }

      this.animateNodesDiffPos(nodes, beforePostions);
      this.animateComplex(node, newNodePosition);
      this.addData(curIndex, value);
      this.emitAnimationEvent(node);
      return {
        index: curIndex,
        node: node
      };
    }
  }, {
    key: "start",
    value: function start() {
      var nodes = this.getNodes();
      var positions = this.getPositions(nodes);
      var that = this;
      var fills = [];
      var lastAddNode = null;
      var addCount = 0;
      fills.length = positions.length;
      var _addNodeChanin = null;
      var _removeNodeChain = null;

      var end = function end() {
        var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (animation) {
          var _nodes = that.getNodes();

          that.animateNodesDiffPos(_nodes, positions);
          that.emitAnimationEvent(lastAddNode || that.lastAnimateNode);
        }
      };

      _removeNodeChain = function removeNodeChain(index) {
        if (fills[index] === 0) {
          return {
            removeNode: _removeNodeChain,
            addNode: _addNodeChanin,
            end: end
          };
        }

        var mindex = index;

        for (var i = 0; i < index + addCount; i++) {
          if (fills[i] === 0) {
            mindex--;
          } else if (fills[i] === 2) {
            mindex++;
          }
        }

        var _that$removeNode = that.removeNode(mindex),
            cindex = _that$removeNode.index;
            _that$removeNode.node;

        if (cindex >= 0) {
          positions.splice(cindex, 1);
          fills.splice(index, 1, 0);
        }

        return {
          removeNode: _removeNodeChain,
          addNode: _addNodeChanin,
          end: end
        };
      };

      _addNodeChanin = function addNodeChanin(_ref5) {
        var index = _ref5.index,
            node = _ref5.node,
            value = _ref5.value,
            position = _ref5.position,
            callback = _ref5.callback;
        var mindex = index;

        for (var i = 0; i < index + addCount; i++) {
          if (fills[i] === 0) {
            mindex--;
          } else if (fills[i] === 2) {
            mindex++;
          }
        }

        var _that$addNode = that.addNode(mindex, node, value),
            cindex = _that$addNode.index,
            cnode = _that$addNode.node;

        if (cindex >= 0) {
          positions.splice(cindex, 0, position || that.getPosition(cnode));
          fills.splice(index, 0, 2);
          addCount++;
          lastAddNode = node;
        }

        if (callback) {
          callback(cindex, cnode);
        }

        return {
          removeNode: _removeNodeChain,
          addNode: _addNodeChanin,
          end: end
        };
      };

      return {
        removeNode: _removeNodeChain,
        addNode: _addNodeChanin
      };
    }
  }, {
    key: "sort",
    value: function sort(start, end) {
      if (start === end || !Number.isInteger(start) || !Number.isInteger(end)) {
        return;
      }

      if (this.isSimpleMode) {
        var curStart = this.limitNumber(start, 0, this.items.length - 1);
        var curEnd = this.limitNumber(end, 0, this.items.length - 1);
        this.setMoveInfo(curStart, curEnd);
        this.setDragNodeStyle();
        this.swapItem();
      } else {
        this.setNodes();

        var _curStart = this.limitNumber(start, 0, this.nodes.length - 1);

        var _curEnd = this.limitNumber(end, 0, this.nodes.length - 1);

        this.nodeInitPos = {
          node: this.nodes[_curStart],
          index: _curStart
        };
        this.setMoveInfo(_curStart, _curEnd);
        this.setPostions();
        this.swapItem();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.removeListener();

      if (this.isMobile) {
        this.items.forEach(function (item) {
          item.el.draggable = '';
          item.el.dataset.sortIndex = '';
        });
      }
    }
  }], [{
    key: "group",
    value: function group() {
      var instances = Array.prototype.slice.call(arguments);
      var cloned = false;
      var cloneInfo = {
        instance: null,
        node: null,
        index: -1
      };
      var firstInstance = null;
      var animationend = false;
      var dragend = false;
      var dragInstance = null;
      var hintInstance = null;
      var isResetNode = true; // 切换排序列表后，第一次拖拽结束执行

      var reset = function reset() {
        cloned = false;
        firstInstance = null;

        if (isResetNode) {
          hintInstance.resetDragNodeStyle();
          hintInstance.resetNodesTransitionStyle();
          hintInstance.canDrag = true;
        }

        dragInstance.isMoveEnd = hintInstance.isMoveEnd = true;
        dragInstance.isDragEnd = hintInstance.isDragEnd = true;
        dragInstance.hasNodeCopy = hintInstance.hasNodeCopy = false;
        cloneInfo = {
          instance: null,
          node: null,
          index: -1
        };
        hintInstance.off('animationend', handleAnimationEnd);
        hintInstance.off('animationstart', handleAnimationStart);
      };

      var handleAnimationStart = function handleAnimationStart() {
        animationend = false;
      };

      var handleAnimationEnd = function handleAnimationEnd() {
        animationend = true;

        if (dragend) {
          reset();
        }
      };

      var handleDragEnd = function handleDragEnd() {
        dragend = true;

        if (animationend) {
          reset();
        }
      };

      var handleChange = function handleChange() {
        isResetNode = false;
      };

      var addEndEvent = function addEndEvent(dinstance, htInstance) {
        dragInstance = dinstance;
        hintInstance = htInstance;
        animationend = false;
        dragend = false;
        isResetNode = true;
        dragInstance.off('animationend', handleAnimationEnd);
        dragInstance.off('dragend', handleDragEnd);
        hintInstance.on('animationend', handleAnimationEnd);
        hintInstance.on('animationstart', handleAnimationStart);
        hintInstance.on('dragend', handleDragEnd, true);
        hintInstance.on('change', handleChange, true);
      };

      var handleMove = function handleMove(dragInstance) {
        return function (position) {
          instances.some(function (hintInstance) {
            var x = position.centreX,
                y = position.centreY;

            if (hintInstance.checkInContainer(x, y)) {
              if (hintInstance !== dragInstance) {
                var ingore = false;
                var put = true;

                if (hintInstance.options.group && !hintInstance.options.group.put) {
                  ingore = true;
                  put = false;
                }

                if (hintInstance === firstInstance && cloned) {
                  ingore = false;
                }

                if (ingore) {
                  return true;
                }

                firstInstance = firstInstance || dragInstance;
                var nodes = hintInstance.getNodes();
                var hintIndex = -1;
                nodes.forEach(function (node, index) {
                  var position = hintInstance.getPosition(node);

                  if (x > position.left && x < position.right && y > position.top && y < position.bottom) {
                    hintIndex = index;
                  }

                  return position;
                });

                if (hintIndex === -1) {
                  return true;
                }

                var dragNode = dragInstance.moveInfo.dragNode;
                var dragInstanceIndex = dragInstance.index;
                var index = hintIndex + 1;
                var lastHint = hintIndex; // dragNode 是否动画移动结束

                var isMoveEnd = false;

                var _position = dragInstance.getPosition(dragNode);

                var positionsBefore = dragInstance.getPositions(dragInstance.getNodes());
                var dragNodeCopy = dragNode;
                var value = dragInstance.data[dragInstance.nodeInitPos.index];

                if (put) {
                  if (cloned) {
                    if (hintInstance === firstInstance) {
                      hintInstance.start().removeNode(cloneInfo.index).addNode({
                        index: hintIndex + 1,
                        node: dragNode,
                        position: _position,
                        value: value
                      }).end(true); // hint前会移除copy元素，所以lastHint代表的索引减1

                      if (hintIndex > cloneInfo.index) {
                        index = hintIndex;
                        lastHint = hintIndex - 1; // 不移除copy元素，index在hint的下一个元素
                      } else if (hintIndex < cloneInfo.index) {
                        index = hintIndex + 1;
                        lastHint = hintIndex;
                      } else {
                        index = hintIndex;
                      }

                      positionsBefore.splice(dragInstanceIndex, 1);
                    }
                  } else {
                    hintInstance.addNodeAnimated({
                      index: hintIndex + 1,
                      node: dragNode,
                      position: _position,
                      value: value
                    });
                    positionsBefore.splice(dragInstanceIndex, 1);
                  }
                } else {
                  if (cloned) {
                    if (hintInstance === firstInstance) {
                      hintInstance.start().removeNode(cloneInfo.index).addNode({
                        index: cloneInfo.index,
                        node: dragNode,
                        value: value
                      }).end();
                      index = hintInstance.index;
                      positionsBefore.splice(dragInstanceIndex, 1);
                      hintInstance.resetTransitionStyle(dragNode);
                      isMoveEnd = true;
                    }
                  }
                }

                if (firstInstance.options.group && firstInstance.options.group.clone) {
                  if (!cloned) {
                    // 记录copy的初始位置
                    var copyPosition = dragInstance.getPosition(dragNode);
                    dragNodeCopy = dragNode.cloneNode(true);
                    dragInstance.resetDragStyle(dragNodeCopy);
                    dragInstance.addNode(dragInstanceIndex, dragNodeCopy);
                    dragInstance.animateComplex(dragNodeCopy, copyPosition);
                    dragInstance.swapDataComplex();
                    cloneInfo = {
                      instance: dragInstance,
                      node: dragNodeCopy,
                      index: dragInstanceIndex
                    };
                    cloned = true;
                  } else {
                    dragInstance.animateNodesDiffPos(dragInstance.getNodes(), positionsBefore);
                    dragInstance.removeData(dragInstance.nodeInitPos.index);
                  }
                } else {
                  dragInstance.animateNodesDiffPos(dragInstance.getNodes(), positionsBefore);
                  dragInstance.removeData(dragInstance.nodeInitPos.index);
                }

                dragInstance.event.emit('sortedOnLists', {});
                hintInstance.event.emit('sortedOnLists', {});

                if (hintInstance === firstInstance && cloned) {
                  cloned = false;
                }

                dragInstance.isRightNode = false; // 设置hint实例状态，因为不会触发hint实例的start事件，直接触发move事件

                hintInstance.isRightNode = true;
                hintInstance.copyPosition = dragInstance.copyPosition;
                hintInstance.mouse = dragInstance.mouse;
                hintInstance.nodeInitPos = {
                  index: index
                };

                if (dragInstance.nodeCopy) {
                  hintInstance.nodeCopy = dragInstance.nodeCopy;
                }

                hintInstance.moveInfo = {
                  dragNode: dragNode,
                  dragIndex: index
                };
                hintInstance.index = index;
                hintInstance.lastHint = lastHint;
                dragInstance.isMoveEnd = hintInstance.isMoveEnd = isMoveEnd;
                hintInstance.isDragEnd = false; // 兼容鼠标离开浏览器后不响应mouseup事件

                if (dragInstance.options.way === 'mouse') {
                  if (dragInstance.isMouseLeft) {
                    dragInstance.isMouseLeft = false;
                    hintInstance.isMouseLeft = true;
                  }

                  hintInstance.addNode(10000, dragInstance.nodeCopy);
                  hintInstance.hasNodeCopy = true;
                  dragInstance.nodeCopy = null;
                  dragInstance.hasNodeCopy = false;
                } // 如果只是插入到第一个hint的节点之后，不移动的话不会再触发move事件，需要手动在动画或拖拽结束时复原拖拽节点样式


                addEndEvent(dragInstance, hintInstance);
                return true;
              }
            }
          });
        };
      };

      var moveFuns = [];
      var groupDragNodes = [];
      instances.forEach(function (instance) {
        groupDragNodes.push(instance.options.dragNode);
      });
      instances.forEach(function (instance, index) {
        moveFuns[index] = handleMove(instance);
        instance.groupDragNodes = groupDragNodes;
        instance.on('outcontaner', moveFuns[index]);
      });
    }
  }]);

  return Sorter;
}();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var SlideSelect = /*#__PURE__*/function (_Event) {
  inherits(SlideSelect, _Event);

  var _super = _createSuper$1(SlideSelect);

  // 初始选择的索引
  // 所选元素索引
  // 上一个所选元素索引
  // 父元素偏移量（transform:translateY）
  // 元素数量（不包括前后占位元素）
  // 是否正在动画
  // 列表元素信息
  function SlideSelect(el) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    classCallCheck(this, SlideSelect);

    _this = _super.call(this);

    defineProperty(assertThisInitialized(_this), "firstIndex", 0);

    defineProperty(assertThisInitialized(_this), "curIndex", 0);

    defineProperty(assertThisInitialized(_this), "lastIndex", 0);

    defineProperty(assertThisInitialized(_this), "translateY", 0);

    defineProperty(assertThisInitialized(_this), "isAnimated", false);

    defineProperty(assertThisInitialized(_this), "nodeInfo", {
      width: 30,
      height: 30,
      total: 0
    });

    defineProperty(assertThisInitialized(_this), "nodes", []);

    defineProperty(assertThisInitialized(_this), "el", null);

    defineProperty(assertThisInitialized(_this), "_slidestart", function () {
      _this.firstIndex = _this.curIndex;

      _this.emit('slidestart', {
        index: _this.curIndex,
        node: _this.nodes[_this.curIndex]
      });
    });

    defineProperty(assertThisInitialized(_this), "_slide", function (e) {
      if (!_this.isAnimated) {
        _this.slide(e.detail.dy);

        _this.emit('slide');
      }
    });

    defineProperty(assertThisInitialized(_this), "_slideend", function () {
      _this.smoothSlide(_this.getCorrectPos() - _this.translateY);

      _this.emit('slideend');

      _this.on('animationend', function () {
        _this.changeCurIndex();

        _this.emit('selected', {
          index: _this.curIndex,
          node: _this.nodes[_this.curIndex],
          startIndex: _this.firstIndex,
          startNode: _this.nodes[_this.firstIndex]
        });
      }, true);
    });

    _this.el = el;
    var defaultOptions = {
      slideList: '.slide-list',
      // 可见行数
      visiableRowCount: 5,
      // 初始位置索引
      startIndex: 0,
      // 保持索引位置不变
      keepIndex: true,
      // 选择节点的class
      selectedClass: 'slide-item-checked',
      // 选择框
      selectBox: {
        // 选择框所在位置
        position: 2,
        style: {}
      }
    };
    _this.options = Object.assign(defaultOptions, options);

    _this.addListener(); // this.domResize = new DomResize(this.el)
    // this.domResize.on('domResize', () => {
    //   this.init()
    // })


    _this.touch = new Slide(_this.el);
    return _this;
  }

  createClass(SlideSelect, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(this.options, options);
      this.setNodes();
      this.style(this.el, {
        height: this.options.visiableRowCount * this.nodeInfo.height + 'px',
        overflow: 'hidden'
      }); // 开始位置的优先级 startIndex > keepIndex > 默认第一个

      var index = 0;

      if (this.options.startIndex >= 0) {
        index = this.options.startIndex;
      } else if (this.options.keepIndex) {
        if (this.curIndex > this.nodeInfo.total - 1) {
          index = this.nodeInfo.total - 1;
        }
      } else {
        index = 0;
      }

      this.curIndex = index;
      this.lastIndex = index;
      this.firstIndex = index;
      this.addSelectedClass();
      this.setPosDirect(this.getSelectedPos(this.curIndex));
      this.addSelectBox();
      this.emit('finish', {
        index: this.curIndex,
        node: this.nodes[this.curIndex]
      });
    }
  }, {
    key: "addListener",
    value: function addListener() {
      this._throttleSlide = throttle$1(this._slide);
      this.el.addEventListener('slidestart', this._slidestart);
      this.el.addEventListener('slidemove', this._throttleSlide);
      this.el.addEventListener('slideend', this._slideend);
    }
  }, {
    key: "smoothSlide",
    value: function smoothSlide(distance) {
      if (distance === 0) {
        return;
      }

      if (!this.isAnimated) {
        this.doSmoothSlide(distance);
        this.isAnimated = true;
      }
    }
  }, {
    key: "doSmoothSlide",
    value: function doSmoothSlide(distance) {
      var _this2 = this;

      var piece = 0;
      var dy = 0;
      var newDistance = 0;

      if (distance > 0) {
        piece = 5;
        var d = distance - piece;

        if (d > 0) {
          dy = piece;
          newDistance = d;
        } else {
          dy = distance;
          newDistance = 0;
        }
      } else if (distance < 0) {
        piece = -5;

        var _d = distance - piece;

        if (_d < 0) {
          dy = piece;
          newDistance = _d;
        } else {
          dy = distance;
          newDistance = 0;
        }
      } else {
        this.emit('animationend'); // 不在动画状态

        this.isAnimated = false;
        return;
      }

      this.setPos(dy);
      setTimeout(function () {
        _this2.doSmoothSlide(newDistance);
      }, 5);
    }
  }, {
    key: "slide",
    value: function slide(d) {
      this.setPos(d);
    }
  }, {
    key: "setPos",
    value: function setPos(dy) {
      this.translateY += dy;
      this.style(this.list, {
        transform: "translateY(".concat(this.translateY, "px)")
      });
      this.changeCurIndex();
    }
  }, {
    key: "setPosDirect",
    value: function setPosDirect(y) {
      this.translateY = y;
      this.style(this.list, {
        transform: "translateY(".concat(y, "px)")
      });
    } // 滑动到某个元素

  }, {
    key: "toItem",
    value: function toItem(index) {
      var _this3 = this;

      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var cindex = Math.floor(index);
      var firstIndex = 0;
      var lastIndex = this.nodeInfo.total - 1;

      if (index < firstIndex) {
        cindex = firstIndex;
      } else if (index > lastIndex) {
        cindex = lastIndex;
      }

      if (cindex === this.curIndex) {
        return;
      }

      var distance = (this.curIndex - cindex) * this.nodeInfo.height;
      this.firstIndex = this.curIndex;

      if (!animation) {
        this.slide(distance);
        this.changeCurIndex();
      } else {
        this.smoothSlide(distance);
        this.on('animationend', function () {
          _this3.changeCurIndex();

          _this3.emit('selected', {
            index: _this3.curIndex,
            node: _this3.nodes[_this3.curIndex],
            startIndex: _this3.firstIndex,
            startNode: _this3.nodes[_this3.firstIndex]
          });
        }, true);
      }
    }
  }, {
    key: "next",
    value: function next() {
      var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.toItem(this.curIndex + 1, animation);
    }
  }, {
    key: "pre",
    value: function pre() {
      var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.toItem(this.curIndex - 1, animation);
    }
  }, {
    key: "setNodes",
    value: function setNodes() {
      var list = this.el.querySelector(this.options.slideList); // 每个元素大小相同

      this.nodeInfo = {
        // offsetWidth在元素隐藏时无效
        width: list.children[0].offsetWidth || 30,
        height: list.children[0].offsetHeight || 30,
        total: list.children.length
      };
      this.list = list;
      this.nodes = toConsumableArray(this.list.children);
    } // 获取正确的元素位置

  }, {
    key: "getCorrectPos",
    value: function getCorrectPos() {
      var correctIndex = this.getTopIndex(this.translateY);
      var correctTranslateY = -correctIndex * this.nodeInfo.height;
      return correctTranslateY;
    } // 根据translateY获得顶部元素索引

  }, {
    key: "getTopIndex",
    value: function getTopIndex(y) {
      var topIndex = -Math.round(y / this.nodeInfo.height); // 顶端元素在选择框内时，无法再下滑动

      var minTopIndex = 0 - this.options.selectBox.position;
      var maxTopIndex = this.nodeInfo.total - 1 - this.options.selectBox.position;

      if (topIndex < minTopIndex) {
        topIndex = minTopIndex;
      } else if (topIndex > maxTopIndex) {
        topIndex = maxTopIndex;
      }

      return topIndex;
    } // 获取所选元素索引

  }, {
    key: "getSelectedIndex",
    value: function getSelectedIndex(y) {
      return this.getTopIndex(y) + this.options.selectBox.position;
    } // 获取所选元素位置

  }, {
    key: "getSelectedPos",
    value: function getSelectedPos(index) {
      return (-index + this.options.selectBox.position) * this.nodeInfo.height;
    }
  }, {
    key: "changeCurIndex",
    value: function changeCurIndex() {
      var index = this.getSelectedIndex(this.translateY);

      if (index !== this.curIndex) {
        this.lastIndex = this.curIndex;
        this.curIndex = index;
        this.addSelectedClass();
        this.emit('change', {
          index: this.curIndex,
          node: this.nodes[this.curIndex],
          lastIndex: this.lastIndex,
          lastNode: this.nodes[this.lastIndex]
        });
      }
    }
  }, {
    key: "addSelectedClass",
    value: function addSelectedClass() {
      var curItem = this.nodes[this.curIndex];
      var lastItem = this.nodes[this.lastIndex];
      curItem.classList.add('slide-item-checked');
      lastItem.classList.remove('slide-item-checked');
    }
  }, {
    key: "addSelectBox",
    value: function addSelectBox() {
      // 添加前，如果存在先remove掉
      if (this.selectBox) {
        this.el.removeChild(this.selectBox);
      }

      var height = this.nodeInfo.height;
      var customSelectBox = this.el.querySelector('.slide-select-box'); // 相对于父元素定位

      this.el.style.position = 'relative';

      if (customSelectBox) {
        customSelectBox.style.display = ''; // 不改变原dom

        var copy = customSelectBox.cloneNode(true);
        this.el.appendChild(copy); // 隐藏原dom

        customSelectBox.style.display = 'none';
        var computedStyle = window.getComputedStyle(copy);
        this.style(copy, {
          left: 0,
          top: this.options.selectBox.position * height + 'px',
          position: 'absolute',
          width: computedStyle.width,
          height: computedStyle.height
        });
        this.selectBox = copy;
        return;
      } // 默认选择框


      var selectBox = document.createElement('div');
      this.style(selectBox, _objectSpread({
        width: this.el.offsetWidth + 'px',
        height: height + 'px',
        position: 'absolute',
        left: 0,
        top: this.options.selectBox.position * height + 'px',
        borderTop: '1px solid rgb(3, 136, 189)',
        borderBottom: '1px solid rgb(3, 136, 189)',
        background: 'rgb(169, 221, 241)',
        opacity: 0.4
      }, this.options.selectBox.style));
      this.el.appendChild(selectBox);
      this.selectBox = selectBox;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.selectBox) {
        this.el.removeChild(this.selectBox);
      }

      this.touch.destroy(); // this.domResize.destroy()

      this.el.removeEventListener('slidestart', this._slidestart);
      this.el.removeEventListener('slidemove', this._throttleSlide);
      this.el.removeEventListener('slideend', this._slideend);
    }
  }, {
    key: "style",
    value: function style(el, obj) {
      Object.assign(el.style, obj);
    }
  }], [{
    key: "connect",
    value: function connect() {}
  }]);

  return SlideSelect;
}(Event);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Broadcast = /*#__PURE__*/function (_Event) {
  inherits(Broadcast, _Event);

  var _super = _createSuper(Broadcast);

  // 当前轮播的元素索引
  // 与当前元素交互的元素索引
  // 父元素偏移量（transform:translateX）
  // 元素数量（不包括前后占位元素）
  // 是否正在动画
  // 各个轮播元素应该在的位置
  function Broadcast(el) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    classCallCheck(this, Broadcast);

    _this = _super.call(this);

    defineProperty(assertThisInitialized(_this), "currentIndex", 0);

    defineProperty(assertThisInitialized(_this), "lastIndex", 0);

    defineProperty(assertThisInitialized(_this), "nextIndex", 0);

    defineProperty(assertThisInitialized(_this), "translateX", 0);

    defineProperty(assertThisInitialized(_this), "length", 0);

    defineProperty(assertThisInitialized(_this), "isAnimated", false);

    defineProperty(assertThisInitialized(_this), "posAry", []);

    defineProperty(assertThisInitialized(_this), "el", null);

    defineProperty(assertThisInitialized(_this), "parentNode", null);

    defineProperty(assertThisInitialized(_this), "transitionend", function () {
      _this.style(_this.el, {
        transition: ''
      });

      _this.isAnimated = false;
      requestAnimationFrame(function () {
        _this.emit('_animationend');
      });
    });

    defineProperty(assertThisInitialized(_this), "_slidestart", function () {
      _this.emit('slidestart', {
        index: _this.currentIndex,
        node: _this.getNode(_this.currentIndex)
      });
    });

    defineProperty(assertThisInitialized(_this), "_slide", function (e) {
      if (_this.isAnimated) {
        return;
      }

      var pos = e.detail;

      if (pos.dx === 0) {
        return;
      }

      var dx = pos.dx;

      if (!_this.opt.loop) {
        // 非loop模式下的 最大左滑和最大右滑
        var maxOffset = 200;
        var leftLimit = _this.posAry[0] + maxOffset;
        var rightLimit = _this.posAry[_this.posAry.length - 1] - maxOffset;

        if (_this.translateX > leftLimit) {
          dx = 0;
        } else if (_this.translateX + pos.dx > leftLimit) {
          dx = maxOffset - _this.translateX;
        } else if (_this.translateX < rightLimit) {
          dx = 0;
        } else if (_this.translateX + pos.dx < rightLimit) {
          dx = rightLimit - _this.translateX;
        }
      }

      _this.slide(dx);

      _this.emit('slide');
    });

    defineProperty(assertThisInitialized(_this), "_slidend", function () {
      _this.emit('slideend');

      _this.correctPosition();
    });

    _this.container = el;
    var defaultOptions = {
      startIndex: 0,
      // 是否循环显示
      loop: true,
      // 是否实时根据交互元素高度设置容器高度
      timingHeight: false,
      width: 0,
      broadcastList: '.broadcast-list'
    };
    _this.opt = Object.assign(defaultOptions, options); // this.domResize = new DomResize(this.container)
    // this.domResize.on('domResize', () => {
    //   // this.init()
    //   // // 在滑动过程中改变dom大小时，不能直接修正到正常位置
    //   // this.changeTranslate(this.getCorrectPos())
    // })

    return _this;
  }

  createClass(Broadcast, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.opt = Object.assign(this.opt, options);
      this.el = document.querySelector(this.opt.broadcastList);

      if (this.opt.loop) {
        // 首尾元素的变化
        this.addHolder(); // 元素的个数变化

        this.setNodes();
        this.length = this.nodes.length - 2; // width的变化或父元素宽度变化

        this.initSize();
        this.initContainerStyle();
        this.setPosAry();
        this.initNodesStyle();
        this.toItem(0, false);
      } else {
        this.setNodes();
        this.length = this.nodes.length;
        this.initSize();
        this.initContainerStyle();
        this.setPosAry();
        this.initNodesStyle();
      }

      if (!this.touch) {
        this.addlistener();
      }

      this.setTranslate(this.posAry[this.opt.startIndex]);
      this.currentIndex = this.opt.startIndex;
      this.lastIndex = this.currentIndex;
      this.emit('finish', {
        index: this.currentIndex,
        node: this.getNode(this.currentIndex)
      });
    }
  }, {
    key: "autoResize",
    value: function autoResize() {}
  }, {
    key: "addlistener",
    value: function addlistener() {
      this.touch = new Slide(this.el, {
        limitArea: true
      });
      this.touch.setMaxSlideDx(this.size.width);
      this.throttleSlide = this.throttle(this._slide);
      this.el.addEventListener('transitionend', this.transitionend);
      this.el.addEventListener('slidestart', this._slidestart);
      this.el.addEventListener('slidemove', this._slide);
      this.el.addEventListener('slideend', this._slidend);
    }
  }, {
    key: "removeListener",
    value: function removeListener() {
      this.touch.destroy();
      this.el.removeEventListener('transitionend', this.transitionend);
      this.el.removeEventListener('slidestart', this._slidestart);
      this.el.removeEventListener('slidemove', this._slide);
      this.el.removeEventListener('slideend', this._slidend);
    }
  }, {
    key: "throttle",
    value: function throttle(fn) {
      var curTick = false;
      var that = this;
      var params = Array.prototype.slice.call(arguments);
      params.shift();
      return function () {
        var curParams = Array.prototype.slice.call(arguments);

        if (!curTick) {
          curTick = true;
          requestAnimationFrame(function () {
            fn.apply(that, [].concat(toConsumableArray(curParams), [params]));
            curTick = false;
          });
        }
      };
    }
  }, {
    key: "smoothSlide",
    value: function smoothSlide(distance) {
      var _this2 = this;

      return new Promise(function (resolve) {
        if (!_this2.isAnimated) {
          _this2.doSmoothSlide(distance);

          _this2.resolve = resolve;
          _this2.isAnimated = true;
        }
      });
    }
  }, {
    key: "doSmoothSlide",
    value: function doSmoothSlide(distance) {
      var _this3 = this;

      setTimeout(function () {
        var piece = 0;

        if (distance > 0) {
          piece = 5;
          var d = distance - piece;

          if (d > 0) {
            _this3.slide(piece);

            _this3.doSmoothSlide(d);
          } else {
            _this3.slide(distance);

            _this3.doSmoothSlide(0);
          }
        } else if (distance < 0) {
          piece = -5;

          var _d = distance - piece;

          if (_d < 0) {
            _this3.slide(piece);

            _this3.doSmoothSlide(_d);
          } else {
            _this3.slide(distance);

            _this3.doSmoothSlide(0);
          }
        } else {
          _this3.resolve && _this3.resolve();
          _this3.resolve = null; // 不在动画状态

          _this3.isAnimated = false;
        }
      }, 5);
    }
  }, {
    key: "slide",
    value: function slide(dx) {
      this.changeTranslate(dx); // 在滑动过程中实时获得下一个元素索引(待优化，不需要每次执行)
    }
  }, {
    key: "changeTranslate",
    value: function changeTranslate(dx) {
      this.translateX += dx;
      this.style(this.el, {
        transform: "translateX(".concat(this.translateX, "px)")
      });
      this.setNextIndex();
    }
  }, {
    key: "setTranslate",
    value: function setTranslate(d) {
      this.translateX = d;
      this.style(this.el, {
        transform: "translateX(".concat(this.translateX, "px)")
      });
      this.setNextIndex();
    }
  }, {
    key: "resetPostion",
    value: function resetPostion() {
      var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.toItem(this.currentIndex, animation);
    }
  }, {
    key: "initNodesStyle",
    value: function initNodesStyle() {
      var _this4 = this;

      this.nodes.forEach(function (node) {
        _this4.style(node.el, {
          display: 'inline-block',
          width: _this4.size.width + 'px'
        });
      });
    }
  }, {
    key: "addHolder",
    value: function addHolder() {
      if (this.firstHolder) {
        this.el.removeChild(this.firstHolder);
      }

      if (this.lastHolder) {
        this.el.removeChild(this.lastHolder);
      }

      var children = this.el.children;
      this.lastHolder = children[0].cloneNode(true);
      this.firstHolder = children[children.length - 1].cloneNode(true);
      this.el.insertBefore(this.firstHolder, children[0]);
      this.el.appendChild(this.lastHolder);
    }
  }, {
    key: "initSize",
    value: function initSize() {
      var style = window.getComputedStyle(this.container);
      var styleWidth = style.width;

      if (!styleWidth.includes('px')) {
        styleWidth = 300;
      }

      this.size = {
        width: this.opt.width || parseFloat(styleWidth),
        height: parseFloat(style.height)
      };
    }
  }, {
    key: "initContainerStyle",
    value: function initContainerStyle() {
      this.style(this.container, {
        overflow: 'hidden'
      });
      this.style(this.el, {
        width: this.size.width * this.nodes.length + 'px'
      });
    }
  }, {
    key: "setNodes",
    value: function setNodes() {
      var children = this.el.children;
      var nodes = [];

      for (var i = 0; i < children.length; i++) {
        nodes.push({
          el: children[i],
          index: i
        });
      }

      this.nodes = nodes;
    }
  }, {
    key: "setPosAry",
    value: function setPosAry() {
      // 不包含holder的本身元素位置
      var posAry = [];

      for (var i = 0; i < this.length; i++) {
        posAry[i] = this.getPosByIndex(i);
      }

      this.posAry = posAry;

      if (this.opt.loop) {
        this.firstHolderPos = 0;
        this.lastHolderPos = this.posAry[this.posAry.length - 1] - this.size.width;
      }
    }
  }, {
    key: "correctPosition",
    value: function correctPosition() {
      var distance = this.translateX - this.posAry[this.currentIndex];
      var direction = 0;

      if (distance < 0) {
        direction = 1;
      } else {
        direction = -1;
      }

      if (Math.abs(distance) > this.size.width / 3) {
        if (direction === 1) {
          this.next();
        } else if (direction === -1) {
          this.pre();
        }
      } else {
        this.resetPostion();
      }
    } // 触摸事件结束时，修正元素位置

  }, {
    key: "getCorrectPos",
    value: function getCorrectPos() {
      var _this5 = this;

      var correctedx = 0;
      var firstPos = this.posAry[0];
      var lastPos = this.posAry[this.posAry.length - 1];

      if (this.translateX > firstPos) {
        // 首元素继续右移时
        if (this.opt.loop) {
          var d = Math.abs(this.translateX - firstPos);

          if (d < this.size.width / 2) {
            correctedx = -d;
          } else {
            correctedx = Math.abs(this.translateX);
          }
        } else {
          // 非loop模式下 总是回到首元素
          correctedx = -this.translateX;
        }
      } else if (this.translateX < lastPos) {
        // 尾元素继续左移时
        if (this.opt.loop) {
          var _d2 = Math.abs(this.translateX - lastPos);

          if (_d2 < this.size.width / 2) {
            correctedx = _d2;
          } else {
            correctedx = _d2 - this.size.width;
          }
        } else {
          correctedx = lastPos - this.translateX;
        }
      } else {
        this.posAry.forEach(function (item, index) {
          if (_this5.translateX < item && _this5.translateX > _this5.posAry[index + 1]) {
            var _d3 = Math.abs(_this5.translateX - item);

            if (_d3 < _this5.size.width / 2) {
              correctedx = _d3;
            } else {
              correctedx = _this5.posAry[index + 1] - _this5.translateX;
            }
          }
        });
      }

      return correctedx;
    } // 获得这个位置的元素索引

  }, {
    key: "getIndexByPos",
    value: function getIndexByPos(offsetx) {
      var index = -offsetx / this.size.width;
      return this.correctIndex(index);
    } // 修正两种模式下的元素索引

  }, {
    key: "correctIndex",
    value: function correctIndex(index) {
      var cindex = index;

      if (!this.opt.loop) {
        if (index < 0) {
          cindex = 0;
        } else if (index > this.length - 1) {
          cindex = this.length - 1;
        }
      } else {
        cindex--;

        if (index < 0) {
          cindex = this.length - 1;
        } else if (index > this.length - 1) {
          cindex = 0;
        }
      }

      return cindex;
    }
  }, {
    key: "getNode",
    value: function getNode(index) {
      if (!this.opt.loop) {
        return this.nodes[index].el;
      }

      return this.nodes[index + 1].el;
    } // 获得这个元素索引的位置

  }, {
    key: "getPosByIndex",
    value: function getPosByIndex(index) {
      var pos = -index * this.size.width;

      if (!this.opt.loop) {
        return pos;
      }

      return pos - this.size.width;
    } // 实时设置容器高度（如果元素之间的高度不同）

  }, {
    key: "setConHeightTiming",
    value: function setConHeightTiming() {
      var curHeight = window.getComputedStyle(this.nodes[this.currentIndex].el).height;
      var nextHeight = window.getComputedStyle(this.nodes[this.nextIndex].el).height;
      var conHeight = Math.max(parseFloat(curHeight), parseFloat(nextHeight));
      this.conHeight = conHeight;
      this.style(this.el, {
        height: conHeight + 'px'
      });
    }
  }, {
    key: "setCurrentIndex",
    value: function setCurrentIndex(index) {
      var tindex = index || this.getIndexByPos(this.translateX);

      if (tindex !== this.currentIndex) {
        this.lastIndex = this.currentIndex;
        this.currentIndex = tindex; // currentIndex变化时，设置容器高度

        if (this.opt.timingHeight) {
          this.setConHeightTiming();
        }
      }
    }
  }, {
    key: "setNextIndex",
    value: function setNextIndex() {
      this.nextIndex = this.getIndexByPos(this.translateX);

      if (this.nextIndex > 0 && this.nextIndex < this.length - 1) {
        if (this.nextIndex > this.currentIndex) {
          this.nextIndex = Math.ceil(this.nextIndex);
        } else {
          this.nextIndex = Math.floor(this.nextIndex);
        }
      } // nextIndex变化时，设置容器高度


      if (this.opt.timingHeight) {
        if (this.nextIndex !== this.lastNextIndex) {
          this.lastNextIndex = this.nextIndex;
          this.setConHeightTiming();
        }
      }
    }
  }, {
    key: "style",
    value: function style(el, obj) {
      Object.assign(el.style, obj);
    } // public
    // direction 表示方向 1 为向右，-1 为向左，loop下有用

  }, {
    key: "toItem",
    value: function toItem(index) {
      var _this6 = this;

      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var direction = arguments.length > 2 ? arguments[2] : undefined;
      var tindex = Math.floor(index);

      if (index < 0) {
        tindex = 0;
      } else if (index > this.length - 1) {
        tindex = this.length - 1;
      }

      if (!animation) {
        this.setTranslate(this.posAry[tindex]);
        this.setCurrentIndex(tindex);
        return;
      }

      var emitAnimationendEvent = function emitAnimationendEvent() {
        _this6.emit('animationend', {
          index: _this6.currentIndex,
          node: _this6.getNode(_this6.currentIndex),
          lastIndex: _this6.lastIndex,
          lastNode: _this6.getNode(_this6.lastIndex)
        });
      };

      var doSlide = function doSlide(distance) {
        _this6.smoothSlide(distance).then(function () {
          _this6.setCurrentIndex(tindex);

          emitAnimationendEvent();
        });
      };

      if (tindex === this.currentIndex) {
        var _distance = this.posAry[this.currentIndex] - this.translateX;

        if (_distance !== 0) {
          doSlide(_distance);
        }

        return;
      }

      var distance = this.posAry[tindex] - this.translateX;

      if (direction && this.opt.loop) {
        if (direction === 1) {
          if (this.currentIndex < tindex) {
            doSlide(distance);
          } else {
            distance = this.lastHolderPos - this.translateX;
            var distance2 = this.posAry[tindex] - this.posAry[0];
            this.smoothSlide(distance).then(function () {
              _this6.setTranslate(_this6.posAry[0]);

              if (distance2 === 0) {
                _this6.setCurrentIndex(tindex);

                emitAnimationendEvent();
              } else {
                _this6.smoothSlide(distance2).then(function () {
                  _this6.setCurrentIndex(tindex);

                  emitAnimationendEvent();
                });
              }
            });
          }
        } else if (direction === -1) {
          if (this.currentIndex > tindex) {
            doSlide(distance);
          } else {
            distance = this.firstHolderPos - this.translateX;

            var _distance2 = this.posAry[tindex] - this.posAry[this.length - 1];

            this.smoothSlide(distance).then(function () {
              _this6.setTranslate(_this6.posAry[_this6.length - 1]);

              if (_distance2 === 0) {
                _this6.setCurrentIndex(tindex);

                emitAnimationendEvent();
              } else {
                _this6.smoothSlide(_distance2).then(function () {
                  _this6.setCurrentIndex(tindex);

                  emitAnimationendEvent();
                });
              }
            });
          }
        }
      } else {
        doSlide(distance);
      }
    }
  }, {
    key: "next",
    value: function next() {
      var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.currentIndex === this.length - 1 && this.opt.loop) {
        this.toItem(0, animation, 1);
      } else {
        this.toItem(this.currentIndex + 1, animation);
      }
    }
  }, {
    key: "pre",
    value: function pre() {
      var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.currentIndex === 0 && this.opt.loop) {
        this.toItem(this.length - 1, animation, -1);
      } else {
        this.toItem(this.currentIndex - 1, animation);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.removeListener();
    }
  }]);

  return Broadcast;
}(Event);

exports.AxiosRace = AxiosRace;
exports.Broadcast = Broadcast;
exports.DomResize = DomResize;
exports.Event = Event;
exports.HTMLDecode = HTMLDecode;
exports.HTMLEncode = HTMLEncode;
exports.HexToRgb = HexToRgb;
exports.LoadImg = LoadImg;
exports.RandomSeed = RandomSeed;
exports.RgbToHex = RgbToHex;
exports.Slide = Slide;
exports.SlideSelect = SlideSelect;
exports.Sorter = Sorter;
exports.__moduleExports = generateElementId;
exports.blobToDataURL = blobToDataURL;
exports.canvasToImg = canvasToImg;
exports.checkNodeCanScroll = checkNodeCanScroll$1;
exports.checkPageCanScroll = checkPageCanScroll$1;
exports.countMaxConsecutiveDate = countMaxConsecutiveDate;
exports.countMaxDuplicateNumber = countMaxDuplicateNumber;
exports.curry = curry;
exports.cutText = cutText;
exports.darkenColor = darkenColor;
exports.dataURLToBlob = dataURLToBlob;
exports.dateFormatter = dateFormatter;
exports.downloadImg = downloadImg;
exports.generateElementUniqueFlag = generateElementId_1;
exports.getExpression = generateElementId_2;
exports.getFullDate = getFullDate;
exports.getMonthDays = getMonthDays;
exports.getPeriod = getPeriod;
exports.getPixelRatio = getPixelRatio;
exports.hiddenRows = hiddenRows;
exports.infiniteScroll = infiniteScroll;
exports.insertScripts = insertScripts;
exports.isBigMonth = isBigMonth;
exports.isEqualDate = isEqualDate;
exports.isEqualDateFuzzy = isEqualDateFuzzy;
exports.isLeapYear = isLeapYear;
exports.isValidDate = isValidDate;
exports.lightnessColor = lightnessColor;
exports.marquee = marquee;
exports.promiseOrder = promiseOrder;
exports.throttle = throttle$1;
exports.toDate = toDate;
exports.toRgba = toRgba;
exports.urlToDataURL = urlToDataURL;
