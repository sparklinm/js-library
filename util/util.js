/* eslint-disable no-unused-vars */
/**
 * 通用函数。
 * @module common
 */

/**
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


export {
  curry,
  throttle,
  countMaxDuplicateNumber
}