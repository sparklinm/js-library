import { throttle } from './util'

/**
 * 页面相关函数。
 * @module html
 */

/**
 * @static
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
 * @static
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
 * @static
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
 * @static
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
 * @static
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
 * @static
 * @description 图片 url 转换为 dataURL。
 * @param {String} url - 图片 url。
 * @returns {String} dataURL。
 */

function urlToDataURL (url) {
    return new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = function () {
            const canvas = document.createElement('canvas')

            // 实际宽高
            canvas.width = this.naturalWidth
            canvas.height = this.naturalHeight
            // 将图片插入画布并开始绘制
            canvas.getContext('2d').drawImage(image, 0, 0)
            // result
            const result = canvas.toDataURL('image/png')

            resolve(result)
        }
        // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
        image.setAttribute('crossOrigin', 'Anonymous')
        image.src = url
        // 图片加载失败的错误处理
        image.onerror = () => {
            reject(new Error('img error'))
        }
    })
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

function blobToDataURL (blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.onload = (e) => {
            resolve(e.target.result)
        }
        // readAsDataURL
        fileReader.readAsDataURL(blob)
        fileReader.onerror = () => {
            reject(new Error('file error'))
        }
    })
}

/**
 * @static
 * @description dataURL 转换为 blob 对象。
 * @param {String} dataURL - dataURL。
 * @returns {Blob} Blob 对象。
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

async function downloadImg (src, imgName, useType) {
    let url = ''
    let type = ''

    if (src.startsWith('blob:')) {
    // 本身是 blob url
        type = 'blobURL'
    } else if (src.startsWith('data:')) {
        type = 'dataURL'
    } else {
        type = 'httpURL'
    }


    const download = (url) => {
        const a = document.createElement('a')

        a.download = imgName
        a.href = url
        a.click()
        a.remove()
    }

    if (type === 'blobURL') {
    // 本身是 blob url
        url = src
        download(url)
        return
    }

    if (type === 'dataURL') {
        if (useType === 'blobURL') {
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
            download(url)
            URL.revokeObjectURL(url)
            return
        }

        url = src
        download(url)
        return
    }

    // 网络图片
    if (useType === 'dataURL') {
        url = await urlToDataURL(src)
        download(url)
        return
    }

    if (useType === 'blobURL') {
        url = await urlToDataURL(src)
        const blob = dataURLToBlob(url)

        if (window.navigator.msSaveBlob) {
            try {
                window.navigator.msSaveBlob(blob, imgName)
            } catch (e) {
                console.error(e)
            }
            return
        }

        url = URL.createObjectURL(blob)
        download(url)
        URL.revokeObjectURL(url)
        return
    }

    url = src
    download(url)
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

function insertScripts (scripts, container) {
    if (document) {
        const str = Array.isArray(scripts) ? scripts.join('') : scripts
        let cont = document.createElement('div')

        cont.innerHTML = str
        const oldScripts = cont.querySelectorAll('script')

        cont = null

        oldScripts.forEach((oldScript) => {
            const newScript = document.createElement('script')

            newScript.type = 'text/javascript'
            newScript.innerHTML = oldScript.innerHTML
            if (oldScript.src) {
                newScript.src = oldScript.src
            }
            if (container) {
                container.appendChild(newScript)
            } else {
                document.documentElement.appendChild(newScript)
            }
        })
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

function HTMLEncode (str) {
    if (typeof document !== 'undefined') {
        let temp = document.createElement('div')

        temp.textContent !== null
            ? (temp.textContent = str)
            : (temp.innerText = str)
        const output = temp.innerHTML

        temp = null
        return output
    }

    let s = ''

    if (str.length === 0) return ''
    s = str.replace(/&/g, '&amp;')
    s = s.replace(/</g, '&lt;')
    s = s.replace(/>/g, '&gt;')
    s = s.replace(/ /g, '&nbsp;')
    s = s.replace(/'/g, '&#39;')
    s = s.replace(/"/g, '&quot;')
    s = s.replace(/\n/g, '<br/>')
    return s
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

function HTMLDecode (str) {
    if (typeof document !== 'undefined') {
        let temp = document.createElement('div')

        temp.innerHTML = str
        const output = temp.innerText || temp.textContent

        temp = null
        return output
    }

    let s = ''

    if (str.length === 0) return ''
    s = str.replace(/&amp;/g, '&')
    s = s.replace(/&lt;/g, '<')
    s = s.replace(/&gt;/g, '>')
    s = s.replace(/&nbsp;/g, ' ')
    s = s.replace(/&#39;/g, '\'')
    s = s.replace(/&quot;/g, '"')
    s = s.replace(/<br\/>|<br>/g, '\n')
    return s
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

function hiddenRows (el, rows = 5, exceededRows = 0) {
    const style = window.getComputedStyle(el)
    const height = parseFloat(style.height)
    const lineHeight = parseFloat(style.lineHeight)
    const boxSizing = style.boxSizing
    let paddingTop = 0
    let paddingBottom = 0

    // border-box 盒模型下 padding 影响内容高度
    if (boxSizing === 'border-box') {
        paddingTop = parseFloat(style.paddingTop)
        paddingBottom = parseFloat(style.paddingBottom)
    }

    const totalRows = Math.ceil(
        (height - paddingTop - paddingBottom) / lineHeight
    )

    if (totalRows > rows + exceededRows) {
        return {
            hidden: true,
            height: rows * lineHeight
        }
    }
    return {
        hidden: false,
        height
    }
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

function infiniteScroll (options) {
    if (!options.callback) {
        return
    }
    let container = document
    const opt = Object.assign(
        {
            el: document.documentElement,
            distance: 0
        },
        options
    )
    const el = opt.el
    let canEmitCallback = true

    if (el !== document.documentElement) {
        container = el
    }

    function scroll () {
        const { scrollTop, scrollHeight, clientHeight } = el

        if (clientHeight + scrollTop + opt.distance >= scrollHeight) {
            if (canEmitCallback) {
                opt.callback()
                canEmitCallback = false
            }
        } else {
            canEmitCallback = true
        }
    }

    const throttleScroll = throttle(scroll)

    function destory () {
        container.removeEventListener('scroll', throttleScroll)
    }

    container.addEventListener('scroll', throttleScroll)

    return {
        destory
    }
}


export {
    checkPageCanScroll,
    checkNodeCanScroll,
    cutText,
    getPixelRatio,
    canvasToImg,
    downloadImg,
    insertScripts,
    HTMLEncode,
    HTMLDecode,
    urlToDataURL,
    blobToDataURL,
    dataURLToBlob,
    hiddenRows,
    infiniteScroll
}
