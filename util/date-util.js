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

function dateFormatter (date, format) {
  // 时间格式化辅助函数 date:毫秒数 format:'yyyy-MM-dd hh:mm:ss'
  if (!date || date === '') {
    return ''
  }

  let cdate = date

  if (typeof cdate === 'string') {
    const mts = cdate.match(/(\/Date\((\d+)\)\/)/)

    if (mts && mts.length >= 3) {
      cdate = parseInt(mts[2])
    }
  }

  cdate = new Date(cdate)
  if (!cdate || cdate.toUTCString() === 'Invalid Date') {
    return ''
  }

  const map = {
    M: cdate.getMonth() + 1, // 月份
    d: cdate.getDate(), // 日
    h: cdate.getHours(), // 小时
    m: cdate.getMinutes(), // 分
    s: cdate.getSeconds(), // 秒
    q: Math.floor((cdate.getMonth() + 3) / 3), // 季度
    S: cdate.getMilliseconds() // 毫秒
  }

  const formatTime = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    let v = map[t]

    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    }
    if (t === 'y') {
      return (cdate.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })

  return formatTime
}

/**
 * @static
 * 判断是否是合法日期对象
 * @param {Date} date 日期对象
 * @returns {Boolean} true or false
 */

function isValidDate (date) {
  if (date instanceof Date === false) {
    return false
  }
  return date.toString() !== 'Invalid Date'
}

/**
 * @static
 * 判断是否是润年
 * @param {Number} year 年份
 * @returns {Boolean} true or false
 */

function isLeapYear (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * @static
 * @ignore
 * 判断是否是大月
 * @param {Number} month 月份
 * @returns {Boolean} true or false
 */

function isBigMonth (month) {
  const bigMonths = [0, 2, 4, 6, 7, 9, 11]

  return bigMonths.includes(month)
}

/**
 * @static
 * 获取月份天数
 * @param {Date} date 日期
 * @returns {Number} 天数
 */

function getMonthDays (date) {
  const month = date.getMonth()
  const year = date.getFullYear()

  if (isBigMonth(month)) {
    return 31
  }
  if (month === 1) {
    if (isLeapYear(year)) {
      return 29
    }
    return 28
  }
  return 30
}

/**
 * @static
 * 转换成日期对象
 * @param {String} time 时间字符串
 * @returns {Date} 日期对象
 */

function toDate (time) {
  let date = time

  if (typeof date === 'string') {
    date = new Date(date)
  }
  return date
}

/**
 * @static
 * 判断日期相等
 * @param {Date|String} stime 日期1
 * @param {Date|String} ttime 日期2
 * @returns {Boolean} true or false
 */

function isEqualDate (stime, ttime) {
  const sdate = toDate(stime)
  const tdate = toDate(ttime)

  if (!isValidDate(sdate) || !isValidDate(tdate)) {
    return false
  }
  return sdate.getTime() === tdate.getTime()
}

/**
 * @static
 * @ignore
 * 获取完全的日期，年月日时分秒毫秒
 * @param {Date|String} date 日期
 * @returns {Object} 包含年月日时分秒毫秒
 */
function getFullDate (date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliSeconds: date.getMilliseconds()
  }
}

/**
 * @static
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

function isEqualDateFuzzy (stime, ttime, tag) {
  const sdate = toDate(stime)
  const tdate = toDate(ttime)

  if (!isValidDate(sdate) || !isValidDate(tdate)) {
    return false
  }

  const allTags = [
    'year',
    'month',
    'date',
    'hours',
    'minutes',
    'seconds',
    'milliSeconds'
  ]
  const index = allTags.indexOf(tag)

  if (index === -1) {
    return isEqualDate(sdate, tdate)
  }

  // 获取年月日星期时分秒毫秒组成的对象
  const fullsdate = getFullDate(sdate)
  const fulltdate = getFullDate(tdate)

  // 星期相等
  if (tag === 'day') {
    return fullsdate.day === fulltdate.day
  }

  for (let i = 0; i < index + 1; i++) {
    if (fullsdate[allTags[i]] !== fulltdate[allTags[i]]) {
      return false
    }
  }
  return true
}

/**
 * @static
 * 根据日、周、月、年获取指定日期所在时间段。
 * @example
 * getPeriod('2015-3-2','month')
 * // new Date('2015-3-1')
 * // new Date('2015-3-31')
 * @param {Date|String} date 日期
 * @param {Date|String} unit 单位：day, week, month, year
 * @returns {Array} 一个数组，包括开始日期和结束日期。
 */

function getPeriod (date = new Date(), unit) {
  const cdate = toDate(date)

  if (!isValidDate(cdate)) {
    return false
  }

  const year = cdate.getFullYear()
  const month = cdate.getMonth()
  const d = cdate.getDate()
  const day = cdate.getDay() || 7
  const oneDay = 24 * 60 * 60 * 1000
  const today = new Date(year, month, d)

  if (unit === 'day') {
    return [today, new Date(today.getTime() + oneDay)]
  }
  if (unit === 'week') {
    return [
      new Date(today.getTime() - (day - 1) * oneDay),
      new Date(today.getTime() + (8 - day) * oneDay)
    ]
  }
  if (unit === 'month') {
    const startDate = 1
    let nextMonth = ''

    if (month === 11) {
      nextMonth = new Date(year + 1, 0, 1)
    } else {
      nextMonth = new Date(year, month + 1, 1)
    }
    return [new Date(year, month, startDate), nextMonth]
  }
  if (unit === 'year') {
    return [new Date(year, 0, 1), new Date(year + 1, 0, 1)]
  }
}

/**
 * @static
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

function countMaxConsecutiveDate (dates) {
  const cdates = dates.map(date => {
    const cdate = new Date(date)

    return new Date(
      cdate.getFullYear(),
      cdate.getMonth(),
      cdate.getDate()
    ).getTime()
  })
  const sortedDates = cdates.sort((a, b) => {
    return a - b
  })

  let count = 1
  let max = 1

  for (let i = 1; i < sortedDates.length; i++) {
    if (sortedDates[i] - sortedDates[i - 1] === 24 * 60 * 60 * 1000) {
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



export {
  dateFormatter,
  isValidDate,
  isLeapYear,
  isBigMonth,
  getMonthDays,
  toDate,
  isEqualDate,
  getFullDate,
  isEqualDateFuzzy,
  getPeriod,
  countMaxConsecutiveDate
}