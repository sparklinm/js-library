import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.array.slice';
import 'core-js/modules/es.array.iterator';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.regexp.exec';
import 'core-js/modules/es.string.iterator';
import 'core-js/modules/es.string.split';
import 'core-js/modules/es.string.starts-with';
import 'core-js/modules/es.typed-array.uint8-array';
import 'core-js/modules/es.typed-array.copy-within';
import 'core-js/modules/es.typed-array.every';
import 'core-js/modules/es.typed-array.fill';
import 'core-js/modules/es.typed-array.filter';
import 'core-js/modules/es.typed-array.find';
import 'core-js/modules/es.typed-array.find-index';
import 'core-js/modules/es.typed-array.for-each';
import 'core-js/modules/es.typed-array.includes';
import 'core-js/modules/es.typed-array.index-of';
import 'core-js/modules/es.typed-array.iterator';
import 'core-js/modules/es.typed-array.join';
import 'core-js/modules/es.typed-array.last-index-of';
import 'core-js/modules/es.typed-array.map';
import 'core-js/modules/es.typed-array.reduce';
import 'core-js/modules/es.typed-array.reduce-right';
import 'core-js/modules/es.typed-array.reverse';
import 'core-js/modules/es.typed-array.set';
import 'core-js/modules/es.typed-array.slice';
import 'core-js/modules/es.typed-array.some';
import 'core-js/modules/es.typed-array.sort';
import 'core-js/modules/es.typed-array.subarray';
import 'core-js/modules/es.typed-array.to-locale-string';
import 'core-js/modules/es.typed-array.to-string';
import 'core-js/modules/web.dom-collections.iterator';
import 'core-js/modules/web.url';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.array.index-of';
import 'core-js/modules/es.array.map';
import 'core-js/modules/es.regexp.to-string';
import 'core-js/modules/es.string.match';
import 'core-js/modules/es.string.replace';
import 'core-js/modules/es.array.join';
import 'core-js/modules/es.reflect.construct';
import 'core-js/modules/es.array.filter';
import 'core-js/modules/es.array.splice';
import 'core-js/modules/es.function.name';
import 'core-js/modules/es.object.assign';
import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.reduce';
import 'core-js/modules/es.array.some';

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
 * @description 最大重复数数量
 * @example
 * countMaxDuplicateNumber([1,2,2,5,5,5])
 * // 3
 * @param {Array} array 数字数组
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
 * @description requestAnimationFrame 节流函数。
 * @param {Function} fn 数字数组。
 * @return {Function} 节流函数。
 */


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
 * 页面相关函数。
 * @module html
 */

/**
 * @description 判断页面是否可以滚动
 * @return {Boolean} trye or false
 */
function checkPageCanScroll() {
  var viewHeight = document.documentElement.clientHeight;
  var viewWidth = document.documentElement.clientWidth;
  var bodyStyle = window.getComputedStyle(document.body);
  var htmlStyle = window.getComputedStyle(document.documentElement);
  return bodyStyle.overflow !== 'hidden' && htmlStyle.overflow !== 'hidden' && (document.documentElement.scrollHeight > viewHeight || document.documentElement.scrollWidth > viewWidth);
}
/**
 * @description 判断节点内部是否可以滚动
 * @param {HTMLElement} el html 节点
 * @return {Boolean} trye or false
 */


function checkNodeCanScroll(el) {
  var elStyle = window.getComputedStyle(el);
  return (elStyle.overflow === 'scroll' || elStyle.overflow === 'auto') && (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth);
}
/**
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
 * @ignore
 * @description dataURL 转换为 blob 对象。
 * @param {String} dataURL - dataURL。
 * @param {Blob} Blob 对象。
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
 * @description 下载图片，如果是网络图片（http开头），需要同域名。<br>
 * 同时依赖于a标签的download兼容性，移动端兼容性差。
 * @param {String} src - 图片链接，可以是blob url, dataURL, 网络图片（http开头）。
 * @param {Number} imgName - 图片名字。
 * @param {Number} useblob - 转换为blob url，只有dataURL可以转换。
 */


function downloadImg(src, imgName) {
  var useblob = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var url = '';

  if (src.startsWith('blob:')) {
    // 本身是 blob url
    url = src;
  } else {
    if (useblob) {
      var blob = dataURLToBlob(src);

      if (window.navigator.msSaveBlob) {
        try {
          window.navigator.msSaveBlob(blob, imgName);
        } catch (e) {
          console.error(e);
        }

        return;
      }

      url = URL.createObjectURL(blob);
    } else {
      url = src;
    }
  }

  var a = document.createElement('a');
  a.download = imgName;
  a.href = url;
  a.click();
  a.remove(); // 释放创建的url对象

  URL.revokeObjectURL(url);
}

/**
 * 日期相关函数。
 * @module date
 */

/**
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
 * 判断是否是合法日期对象
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
 * 判断是否是润年
 * @param {Number} year 年份
 * @returns {Boolean} true or false
 */


function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * @ignore
 * 判断是否是大月
 * @param {Number} month 月份
 * @returns {Boolean} true or false
 */


function isBigMonth(month) {
  var bigMonths = [0, 2, 4, 6, 7, 9, 11];
  return bigMonths.includes(month);
}
/**
 * 获取月份天数
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
 * 转换成日期对象
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
 * 判断日期相等
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
 * @ignore
 * 获取完全的日期，年月日时分秒毫秒
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
 * 判断日期模糊相等
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
 * 根据日、周、月、年获取指定日期所在时间段。
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
 * 最大的连续天数数量。
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

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * @description 节点大小监测。
 * @example
 * // 使用
 * let event = new DomResize(document.querySelector('#contianer'))
 * event.on('dom-resize', callback)
 */

var DomResize = /*#__PURE__*/function (_Event) {
  inherits(DomResize, _Event);

  var _super = _createSuper(DomResize);

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
   */
  function Slide(el, maxSlideDx, maxSlideDy) {
    var _this = this;

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

        e.preventDefault();
        startx = e.pageX;
        starty = e.pageY;
      } else {
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

      if (_this.customData.offsetx + dx > _this.maxSlideDx) {
        dx = _this.maxSlideDx - _this.customData.offsetx;
        offsetx = _this.maxSlideDx;
      } else if (_this.customData.offsetx + dx < -_this.maxSlideDx) {
        dx = -_this.maxSlideDx - _this.customData.offsetx;
        offsetx = -_this.maxSlideDx;
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

    this.maxSlideDx = maxSlideDx;
    this.maxSlideDy = maxSlideDy;

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

      this.el.addEventListener('touchstart', this._start);
      this.el.addEventListener('touchmove', this._move);
      this.el.addEventListener('touchend', this._end);
      window.addEventListener('mousedown', this._start);
      window.addEventListener('mousemove', this._move);
      window.addEventListener('mouseup', this._end);
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
      this.el.removeEventListener('touchstart', this._start);
      this.el.removeEventListener('touchmove', this._move);
      this.el.removeEventListener('touchend', this._end);
    }
  }]);

  return Slide;
}();

function marquee(el, options) {
  var opt = Object.assign({
    // 动画时长
    duration: 10000,
    // 两个文本间间距
    gap: '',
    // 文本距离容器左边缘距离
    start: 0,
    // 是否超出容器才滚动
    scrollOverflowed: false
  }, options);
  Object.assign(el.style, {
    whiteSpace: 'nowrap'
  });
  Object.assign(el.parentNode.style, {
    overflow: 'hidden'
  }); // 容器宽度

  var containerWidth = el.parentNode.clientWidth; // 文字宽度

  var textWidth = el.offsetWidth;
  var gapWidth = opt.gap || containerWidth; // 最大translatex

  var maxTranslateX = -(textWidth + gapWidth);
  Object.assign(el.parentNode.style, {
    overflow: ''
  });

  if (textWidth <= containerWidth && opt.scrollOverflowed || containerWidth === 0 || textWidth === 0) {
    Object.assign(el.style, {
      whiteSpace: ''
    });
    return;
  }

  var container = document.createElement('div');
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  var copy1 = el.cloneNode(true);
  var copy2 = el.cloneNode(true);
  var rawEl = el.cloneNode(true);
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
    display: 'inline-block',
    overflow: 'hidden',
    width: containerWidth + 'px'
  });
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

export { DomResize, Event, HexToRgb, LoadImg, RandomSeed, RgbToHex, Slide, canvasToImg, checkNodeCanScroll, checkPageCanScroll, countMaxConsecutiveDate, countMaxDuplicateNumber, curry, cutText, darkenColor, dateFormatter, downloadImg, getFullDate, getMonthDays, getPeriod, getPixelRatio, isBigMonth, isEqualDate, isEqualDateFuzzy, isLeapYear, isValidDate, lightnessColor, marquee, throttle, toDate, toRgba };
