import { Slide as Touch } from '../util/class/Slide'
import { DomResize } from '../util/class/DomResize'
import { Event } from '../util/class/Event'

export class Broadcast extends Event {
  // 当前轮播的元素索引
  currentIndex = 0
  lastIndex = 0
  // 与当前元素交互的元素索引
  nextIndex = 0
  // 父元素偏移量（transform:translateX）
  translateX = 0
  // 元素数量（不包括前后占位元素）
  length = 0
  // 是否正在动画
  isAnimated = false
  // 各个轮播元素应该在的位置
  posAry = []

  el = null
  parentNode = null

  constructor (el, options = {}) {
    super()
    this.container = el
    const defaultOptions = {
      startIndex: 0,
      // 是否循环显示
      loop: true,
      // 是否实时根据交互元素高度设置容器高度
      timingHeight: false,
      width: 0,
      broadcastList: '.broadcast-list'
    }

    this.opt = Object.assign(defaultOptions, options)
    // this.domResize = new DomResize(this.container)

    // this.domResize.on('domResize', () => {
    //   // this.init()
    //   // // 在滑动过程中改变dom大小时，不能直接修正到正常位置
    //   // this.changeTranslate(this.getCorrectPos())
    // })
  }

  init (options = {}) {
    this.opt = Object.assign(this.opt, options)
    this.el = document.querySelector(this.opt.broadcastList)
    if (this.opt.loop) {
      // 首尾元素的变化
      this.addHolder()
      // 元素的个数变化
      this.setNodes()
      this.length = this.nodes.length - 2
      // width的变化或父元素宽度变化
      this.initSize()
      this.initContainerStyle()
      this.setPosAry()
      this.initNodesStyle()
      this.toItem(0,
        false
      )
    } else {
      this.setNodes()
      this.length = this.nodes.length
      this.initSize()
      this.initContainerStyle()
      this.setPosAry()
      this.initNodesStyle()
    }

    if (!this.touch) {
      this.addlistener()
    }

    this.setTranslate(this.posAry[this.opt.startIndex])
    this.currentIndex = this.opt.startIndex
    this.lastIndex = this.currentIndex

    this.emit('finish', {
      index: this.currentIndex,
      node: this.getNode(this.currentIndex)
    })
  }

  autoResize () {}

  addlistener () {
    this.touch = new Touch(this.el, {
      limitArea: true
    })
    this.touch.setMaxSlideDx(this.size.width)
    this.throttleSlide = this.throttle(this._slide)
    this.el.addEventListener('transitionend', this.transitionend)
    this.el.addEventListener('slidestart', this._slidestart)
    this.el.addEventListener('slidemove', this._slide)
    this.el.addEventListener('slideend', this._slidend)
  }

  removeListener () {
    this.touch.destroy()
    this.el.removeEventListener('transitionend', this.transitionend)
    this.el.removeEventListener('slidestart', this._slidestart)
    this.el.removeEventListener('slidemove', this._slide)
    this.el.removeEventListener('slideend', this._slidend)
  }

  throttle (fn) {
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

  transitionend = () => {
    this.style(this.el, {
      transition: ''
    })
    this.isAnimated = false
    requestAnimationFrame(() => {
      this.emit('_animationend')
    })
  }

  _slidestart = () => {
    this.emit('slidestart', {
      index: this.currentIndex,
      node: this.getNode(this.currentIndex)
    })
  }

  _slide = (e) => {
    if (this.isAnimated) {
      return
    }

    const pos = e.detail

    if (pos.dx === 0) {
      return
    }

    let dx = pos.dx

    if (!this.opt.loop) {
      // 非loop模式下的 最大左滑和最大右滑
      const maxOffset = 200
      const leftLimit = this.posAry[0] + maxOffset
      const rightLimit = this.posAry[this.posAry.length - 1] - maxOffset

      if (this.translateX > leftLimit) {
        dx = 0
      } else if (this.translateX + pos.dx > leftLimit) {
        dx = maxOffset - this.translateX
      } else if (this.translateX < rightLimit) {
        dx = 0
      } else if (this.translateX + pos.dx < rightLimit) {
        dx = rightLimit - this.translateX
      }
    }

    this.slide(dx)

    this.emit('slide')
  }

  _slidend = () => {
    this.emit('slideend')
    this.correctPosition()
  }

  smoothSlide (distance) {
    return new Promise((resolve) => {
      if (!this.isAnimated) {
        this.doSmoothSlide(distance)
        this.resolve = resolve
        this.isAnimated = true
      }
    })
  }

  doSmoothSlide (distance) {
    setTimeout(() => {
      let piece = 0

      if (distance > 0) {
        piece = 5
        const d = distance - piece

        if (d > 0) {
          this.slide(piece)
          this.doSmoothSlide(d)
        } else {
          this.slide(distance)
          this.doSmoothSlide(0)
        }
      } else if (distance < 0) {
        piece = -5
        const d = distance - piece

        if (d < 0) {
          this.slide(piece)
          this.doSmoothSlide(d)
        } else {
          this.slide(distance)
          this.doSmoothSlide(0)
        }
      } else {
        this.resolve && this.resolve()
        this.resolve = null
        // 不在动画状态
        this.isAnimated = false
      }
    }, 5)
  }

  slide (dx) {
    this.changeTranslate(dx)
    // 在滑动过程中实时获得下一个元素索引(待优化，不需要每次执行)
  }

  changeTranslate (dx) {
    this.translateX += dx
    this.style(this.el, {
      transform: `translateX(${this.translateX}px)`
    })
    this.setNextIndex()
  }

  setTranslate (d) {
    this.translateX = d
    this.style(this.el, {
      transform: `translateX(${this.translateX}px)`
    })
    this.setNextIndex()
  }

  resetPostion (animation = true) {
    this.toItem(this.currentIndex,
      animation
    )
  }

  initNodesStyle () {
    this.nodes.forEach((node) => {
      this.style(node.el, {
        display: 'inline-block',
        width: this.size.width + 'px'
      })
    })
  }

  addHolder () {
    if (this.firstHolder) {
      this.el.removeChild(this.firstHolder)
    }
    if (this.lastHolder) {
      this.el.removeChild(this.lastHolder)
    }
    const children = this.el.children

    this.lastHolder = children[0].cloneNode(true)
    this.firstHolder = children[children.length - 1].cloneNode(true)
    this.el.insertBefore(this.firstHolder, children[0])
    this.el.appendChild(this.lastHolder)
  }

  initSize () {
    const style = window.getComputedStyle(this.container)
    let styleWidth = style.width

    if (!styleWidth.includes('px')) {
      styleWidth = 300
    }

    this.size = {
      width: this.opt.width || parseFloat(styleWidth),
      height: parseFloat(style.height)
    }
  }

  initContainerStyle () {
    this.style(this.container, {
      overflow: 'hidden'
    })
    this.style(this.el, {
      width: this.size.width * this.nodes.length + 'px'
    })
  }

  setNodes () {
    const children = this.el.children

    const nodes = []

    for (let i = 0; i < children.length; i++) {
      nodes.push({
        el: children[i],
        index: i
      })
    }
    this.nodes = nodes
  }

  setPosAry () {
    // 不包含holder的本身元素位置
    const posAry = []

    for (let i = 0; i < this.length; i++) {
      posAry[i] = this.getPosByIndex(i)
    }
    this.posAry = posAry
    if (this.opt.loop) {
      this.firstHolderPos = 0
      this.lastHolderPos = this.posAry[this.posAry.length - 1] - this.size.width
    }
  }

  correctPosition () {
    const distance = this.translateX - this.posAry[this.currentIndex]
    let direction = 0

    if (distance < 0) {
      direction = 1
    } else {
      direction = -1
    }

    if (Math.abs(distance) > this.size.width / 3) {
      if (direction === 1) {
        this.next()
      } else if (direction === -1) {
        this.pre()
      }
    } else {
      this.resetPostion()
    }
  }

  // 触摸事件结束时，修正元素位置
  getCorrectPos () {
    let correctedx = 0
    const firstPos = this.posAry[0]
    const lastPos = this.posAry[this.posAry.length - 1]

    if (this.translateX > firstPos) {
      // 首元素继续右移时
      if (this.opt.loop) {
        const d = Math.abs(this.translateX - firstPos)

        if (d < this.size.width / 2) {
          correctedx = -d
        } else {
          correctedx = Math.abs(this.translateX)
        }
      } else {
        // 非loop模式下 总是回到首元素
        correctedx = -this.translateX
      }
    } else if (this.translateX < lastPos) {
      // 尾元素继续左移时
      if (this.opt.loop) {
        const d = Math.abs(this.translateX - lastPos)

        if (d < this.size.width / 2) {
          correctedx = d
        } else {
          correctedx = d - this.size.width
        }
      } else {
        correctedx = lastPos - this.translateX
      }
    } else {
      this.posAry.forEach((item, index) => {
        if (
          this.translateX < item &&
          this.translateX > this.posAry[index + 1]
        ) {
          const d = Math.abs(this.translateX - item)

          if (d < this.size.width / 2) {
            correctedx = d
          } else {
            correctedx = this.posAry[index + 1] - this.translateX
          }
        }
      })
    }
    return correctedx
  }

  // 获得这个位置的元素索引
  getIndexByPos (offsetx) {
    const index = -offsetx / this.size.width

    return this.correctIndex(index)
  }

  // 修正两种模式下的元素索引
  correctIndex (index) {
    let cindex = index

    if (!this.opt.loop) {
      if (index < 0) {
        cindex = 0
      } else if (index > this.length - 1) {
        cindex = this.length - 1
      }
    } else {
      cindex--
      if (index < 0) {
        cindex = this.length - 1
      } else if (index > this.length - 1) {
        cindex = 0
      }
    }
    return cindex
  }

  getNode (index) {
    if (!this.opt.loop) {
      return this.nodes[index].el
    }
    return this.nodes[index + 1].el
  }

  // 获得这个元素索引的位置
  getPosByIndex (index) {
    const pos = -index * this.size.width

    if (!this.opt.loop) {
      return pos
    }
    return pos - this.size.width
  }

  // 实时设置容器高度（如果元素之间的高度不同）
  setConHeightTiming () {
    const curHeight = window.getComputedStyle(this.nodes[this.currentIndex].el)
      .height
    const nextHeight = window.getComputedStyle(this.nodes[this.nextIndex].el)
      .height
    const conHeight = Math.max(parseFloat(curHeight), parseFloat(nextHeight))

    this.conHeight = conHeight
    this.style(this.el, {
      height: conHeight + 'px'
    })
  }

  setCurrentIndex (index) {
    const tindex = index || this.getIndexByPos(this.translateX)

    if (tindex !== this.currentIndex) {
      this.lastIndex = this.currentIndex
      this.currentIndex = tindex
      // currentIndex变化时，设置容器高度
      if (this.opt.timingHeight) {
        this.setConHeightTiming()
      }
    }
  }

  setNextIndex () {
    this.nextIndex = this.getIndexByPos(this.translateX)
    if (this.nextIndex > 0 && this.nextIndex < this.length - 1) {
      if (this.nextIndex > this.currentIndex) {
        this.nextIndex = Math.ceil(this.nextIndex)
      } else {
        this.nextIndex = Math.floor(this.nextIndex)
      }
    }
    // nextIndex变化时，设置容器高度
    if (this.opt.timingHeight) {
      if (this.nextIndex !== this.lastNextIndex) {
        this.lastNextIndex = this.nextIndex
        this.setConHeightTiming()
      }
    }
  }

  style (el, obj) {
    Object.assign(el.style, obj)
  }


  // public
  // direction 表示方向 1 为向右，-1 为向左，loop下有用
  toItem (index, animation = true, direction) {
    let tindex = Math.floor(index)

    if (index < 0) {
      tindex = 0
    } else if (index > this.length - 1) {
      tindex = this.length - 1
    }

    if (!animation) {
      this.setTranslate(this.posAry[tindex])
      this.setCurrentIndex(tindex)
      return
    }

    const emitAnimationendEvent = () => {
      this.emit('animationend', {
        index: this.currentIndex,
        node: this.getNode(this.currentIndex),
        lastIndex: this.lastIndex,
        lastNode: this.getNode(this.lastIndex)
      })
    }

    const doSlide = (distance) => {
      this.smoothSlide(distance).then(() => {
        this.setCurrentIndex(tindex)
        emitAnimationendEvent()
      })
    }

    if (tindex === this.currentIndex) {
      const distance = this.posAry[this.currentIndex] - this.translateX

      if (distance !== 0) {
        doSlide(distance)
      }
      return
    }

    let distance = this.posAry[tindex] - this.translateX

    if (direction && this.opt.loop) {
      if (direction === 1) {
        if (this.currentIndex < tindex) {
          doSlide(distance)
        } else {
          distance = this.lastHolderPos - this.translateX
          const distance2 = this.posAry[tindex] - this.posAry[0]

          this.smoothSlide(distance).then(() => {
            this.setTranslate(this.posAry[0])
            if (distance2 === 0) {
              this.setCurrentIndex(tindex)
              emitAnimationendEvent()
            } else {
              this.smoothSlide(distance2).then(() => {
                this.setCurrentIndex(tindex)
                emitAnimationendEvent()
              })
            }
          })
        }
      } else if (direction === -1) {
        if (this.currentIndex > tindex) {
          doSlide(distance)
        } else {
          distance = this.firstHolderPos - this.translateX
          const distance2 = this.posAry[tindex] - this.posAry[this.length - 1]

          this.smoothSlide(distance).then(() => {
            this.setTranslate(this.posAry[this.length - 1])
            if (distance2 === 0) {
              this.setCurrentIndex(tindex)
              emitAnimationendEvent()
            } else {
              this.smoothSlide(distance2).then(() => {
                this.setCurrentIndex(tindex)
                emitAnimationendEvent()
              })
            }
          })
        }
      }
    } else {
      doSlide(distance)
    }
  }

  next (animation = true) {
    if (this.currentIndex === this.length - 1 && this.opt.loop) {
      this.toItem(0,
        animation,
        1
      )
    } else {
      this.toItem(this.currentIndex + 1,
        animation
      )
    }
  }

  pre (animation = true) {
    if (this.currentIndex === 0 && this.opt.loop) {
      this.toItem(this.length - 1,
        animation,
        -1
      )
    } else {
      this.toItem(this.currentIndex - 1,
        animation
      )
    }
  }

  destroy () {
    this.removeListener()
  }
}
