/**
 * 页面相关函数。
 * @module html
 */

/**
 * @description 判断页面是否可以滚动
 * @return {Boolean} trye or false
 */

function checkPageCanScroll () {
  const viewHeight = document.documentElement.clientHeight
  const viewWidth = document.documentElement.clientWidth
  const bodyStyle = window.getComputedStyle(document.body)
  const htmlStyle = window.getComputedStyle(document.documentElement)

  return (
    bodyStyle.overflow !== 'hidden' &&
    htmlStyle.overflow !== 'hidden' &&
    (document.documentElement.scrollHeight > viewHeight ||
      document.documentElement.scrollWidth > viewWidth)
  )
}

/**
 * @description 判断节点内部是否可以滚动
 * @param {HTMLElement} el html 节点
 * @return {Boolean} trye or false
 */

function checkNodeCanScroll (el) {
  const elStyle = window.getComputedStyle(el)

  return (
    (elStyle.overflow === 'scroll' || elStyle.overflow === 'auto') &&
    (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)
  )
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

function cutText (text, length) {
  let realLength = 0
  let charCode = -1
  let index = 0

  for (let i = 0; i < text.length; i++) {
    charCode = text.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      // 占一个宽度的字符
      realLength += 1
    } else {
      // 占两个宽度的字符，例如：汉字
      realLength += 2
    }
    if (realLength > length * 2) {
      index = i
      break
    }
  }
  if (index > length - 1) {
    return text.slice(0, index) + '...'
  }
  return text
}

/**
 * @description 获取 canvas 存储的像素比 和 屏幕像素比比值 。<br>
 * 即如果比值为x，那么canvas的真正大小（width属性）应该是：css像素*x。
 * @return {Number} 比值。
 */

function getPixelRatio () {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const backingStoreRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1
  const devicePixelRatio = window.devicePixelRatio || 1

  return devicePixelRatio / backingStoreRatio
}

/**
 * @description 获取 canvas dataURL（转化为图片）。<br>
 * 获取的图片分辨率适应当前设备的设备像素比，即在 Retina 屏幕下获取的图片分辨率更高。
 * @param {HTMLElement} canvas - canvas 节点。
 * @return {String} dataURL。
 */

function canvasToImg (canvas) {
  const scale = getPixelRatio()
  const style = window.getComputedStyle(canvas)

  canvas.width = scale * parseFloat(style.width)
  canvas.height = scale * parseFloat(style.height)
  return canvas.toDataURL()
}

/**
 * @ignore
 * @description dataURL 转换为 blob 对象。
 * @param {String} dataURL - dataURL。
 * @param {Blob} Blob 对象。
 */

function dataURLToBlob (dataURL) {
  // atob：解码base64，并提取data部分
  const data = atob(dataURL.split(',')[1])
  const len = data.length
  const arr = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    arr[i] = data.charCodeAt(i)
  }
  return new Blob([arr])
}

/**
 * @description 下载图片，如果是网络图片（http开头），需要同域名。<br>
 * 同时依赖于a标签的download兼容性，移动端兼容性差。
 * @param {String} src - 图片链接，可以是blob url, dataURL, 网络图片（http开头）。
 * @param {Number} imgName - 图片名字。
 * @param {Number} useblob - 转换为blob url，只有dataURL可以转换。
 */

function downloadImg (src, imgName, useblob = false) {
  let url = ''

  if (src.startsWith('blob:')) {
    // 本身是 blob url
    url = src
  } else {
    if (useblob) {
      const blob = dataURLToBlob(src)

      if (window.navigator.msSaveBlob) {
        try {
          window.navigator.msSaveBlob(blob, imgName)
        } catch (e) {
          console.error(e)
        }
        return
      }

      url = URL.createObjectURL(blob)
    } else {
      url = src
    }
  }

  const a = document.createElement('a')

  a.download = imgName
  a.href = url
  a.click()
  a.remove()
  // 释放创建的url对象
  URL.revokeObjectURL(url)
}

export {
  checkPageCanScroll,
  checkNodeCanScroll,
  cutText,
  getPixelRatio,
  canvasToImg,
  downloadImg
}