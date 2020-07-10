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

function HexToRgb (str) {
  const hexReg = /^#?[0-9A-Fa-f]{6}$/

  if (!hexReg.test(str)) {
    return str
  }

  const color = str.replace('#', '')
  const hxs = color.match(/../g)

  for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
  return `rbg(${hxs.join(',')})`
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

function RgbToHex (rgb) {
  const reg = /\d{1,3}/g
  const rgbAry = rgb.match(reg)

  if (rgbAry.length !== 3) {
    return rgb
  }

  const hexs = [
    parseInt(rgbAry[0]).toString(16),
    parseInt(rgbAry[1]).toString(16),
    parseInt(rgbAry[2]).toString(16)
  ]

  for (let i = 0; i < 3; i++) {
    if (hexs[i].length === 1) {
      hexs[i] = '0' + hexs[i]
    }
  }
  return '#' + hexs.join('')
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

function toRgba (color, opacity) {
  if (typeof opacity !== 'number' || opacity > 1 || opacity < 0) {
    return color
  }
  const rgb = HexToRgb(color)
  const reg = /\d{1,3}/g
  const rgbAry = rgb.match(reg)

  if (!rgbAry.length) {
    return
  }

  rgbAry.push(opacity)
  return `rgba(${rgbAry.join(', ')})`
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

function darkenColor (color, level) {
  if (typeof level !== 'number' || level > 1 || level < 0) {
    return color
  }
  const rgb = HexToRgb(color)
  const reg = /\d{1,3}/g
  const rgbAry = rgb.match(reg)

  for (let i = 0; i < 3; i++) {
    rgbAry[i] = Math.floor(rgbAry[i] * (1 - level))
  }

  return `rgb(${rgbAry.join(', ')})`
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

function lightnessColor (color, level) {
  if (typeof level !== 'number' || level > 1 || level < 0) {
    return color
  }
  const rgb = HexToRgb(color)
  const reg = /\d{1,3}/g
  const rgbAry = rgb.match(reg).map(item => parseInt(item))

  for (let i = 0; i < 3; i++) {
    rgbAry[i] = Math.floor((255 - rgbAry[i]) * level + rgbAry[i])
  }

  return `rgb(${rgbAry.join(', ')})`
}


export {
  HexToRgb,
  RgbToHex,
  toRgba,
  darkenColor,
  lightnessColor
}