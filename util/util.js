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

function curry (fn) {
  // fn的无默认值参数的个数
  if (fn.length === 0) {
    return fn
  }

  function _curried (depth, args) {
    return function (newArgument) {
      // 需要传入fn需要的参数个数，才会返回值
      if (depth - 1 === 0) {
        return fn(...args, newArgument)
      }
      return _curried(depth - 1, [...args, newArgument])
    }
  }

  return _curried(fn.length, [])
}

/**
 * @static
 * @description 最大重复数数量
 * @example
 * countMaxDuplicateNumber([1,2,2,5,5,5])
 * // 3
 * @param {Array} array 数字数组
 * @return {Number} 数量
 */

function countMaxDuplicateNumber (array) {
  if (!array.length) {
    return 0
  }
  const sortedAry = array.sort((a, b) => {
    return a - b
  })
  let count = 1
  let max = 1

  for (let i = 1; i < sortedAry.length; i++) {
    if (sortedAry[i - 1] === sortedAry[i]) {
      max++
    } else {
      if (max > count) {
        count = max
      }
      max = 1
    }
  }
  return count
}

/**
 * @static
 * @description requestAnimationFrame 节流函数。
 * @param {Function} fn 数字数组。
 * @return {Function} 节流函数。
 */

function throttle (fn) {
  let curTick = false
  const that = this
  const params = [...arguments]

  params.shift()
  return function () {
    const curParams = [...arguments]

    if (!curTick) {
      curTick = true
      requestAnimationFrame(() => {
        fn.apply(that, [...curParams, params])
        curTick = false
      })
    }
  }
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

function promiseOrder (pFAry) {
  return new Promise((resolve, reject) => {
    let promise = Promise.resolve()

    // 由于要最后一个promise执行完毕，才resolve，这里需要pFAry.length + 1
    for (let i = 0; i < pFAry.length + 1; i++) {
      promise = promise
        .then((res) => {
          if (i === pFAry.length) {
            resolve(res)
          } else {
            return pFAry[i](res)
          }
        })
        .catch((error) => {
          reject(error)
          // 捕获错误后由于下一次循环依然会添加then，需要返回一个pending状态的promise来中断后面的所有操作
          return new Promise(() => {})
        })
    }
  })
}

export {
  curry,
  throttle,
  countMaxDuplicateNumber,
  promiseOrder
}
