import { Slide as Touch } from '../../util/class/Slide'
import { DomResize } from '../../util/class/DomResize'
import { Event } from '../../util/class/Event'
import { throttle } from '../../util/util'

export class SlideSelect extends Event {
  // 初始选择的索引
  firstIndex=0
  // 所选元素索引
  curIndex = 0
  // 上一个所选元素索引
  lastIndex = 0
  // 父元素偏移量（transform:translateY）
  translateY = 0
  // 元素数量（不包括前后占位元素）
  // 是否正在动画
  isAnimated = false
  // 列表元素信息
  nodeInfo = {
    width: 30,
    height: 30,
    total: 0
  }
  nodes = []
  el = null

  constructor (el, options = {}) {
    super()
    this.el = el
    const defaultOptions = {
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
    }

    this.options = Object.assign(defaultOptions, options)
    this.addListener()
    // this.domResize = new DomResize(this.el)

    // this.domResize.on('domResize', () => {
    //   this.init()
    // })

    this.touch = new Touch(this.el)
  }

  init (options = {}) {
    Object.assign(this.options, options)
    this.setNodes()
    this.style(this.el, {
      height: this.options.visiableRowCount * this.nodeInfo.height + 'px',
      overflow: 'hidden'
    })
    // 开始位置的优先级 startIndex > keepIndex > 默认第一个
    let index = 0

    if (this.options.startIndex >= 0) {
      index = this.options.startIndex
    } else if (this.options.keepIndex) {
      if (this.curIndex > this.nodeInfo.total - 1) {
        index = this.nodeInfo.total - 1
      }
    } else {
      index = 0

    }
    this.curIndex = index
    this.lastIndex = index
    this.firstIndex = index
    this.addSelectedClass()
    this.setPosDirect(this.getSelectedPos(this.curIndex))
    this.addSelectBox()
    this.emit('finish', {
      index: this.curIndex,
      node: this.nodes[this.curIndex]
    })
  }

  addListener () {
    this._throttleSlide = throttle(this._slide)
    this.el.addEventListener('slidestart', this._slidestart)
    this.el.addEventListener('slidemove', this._throttleSlide)
    this.el.addEventListener('slideend', this._slideend)
  }

  static connect () {}

  _slidestart = () => {
    this.firstIndex = this.curIndex
    this.emit(
      'slidestart',
      {
        index: this.curIndex,
        node: this.nodes[this.curIndex]
      }
    )
  }

  _slide = (e) => {
    if (!this.isAnimated) {
      this.slide(e.detail.dy)
      this.emit('slide')
    }
  }

  _slideend = () => {
    this.smoothSlide(this.getCorrectPos() - this.translateY)
    this.emit('slideend')
    this.on(
      'animationend',
      () => {
        this.changeCurIndex()
        this.emit('selected', {
          index: this.curIndex,
          node: this.nodes[this.curIndex],
          startIndex: this.firstIndex,
          startNode: this.nodes[this.firstIndex]
        })
      },
      true
    )
  }

  smoothSlide (distance) {
    if (distance === 0) {
      return
    }
    if (!this.isAnimated) {
      this.doSmoothSlide(distance)
      this.isAnimated = true
    }
  }

  doSmoothSlide (distance) {
    let piece = 0
    let dy = 0
    let newDistance = 0

    if (distance > 0) {
      piece = 5
      const d = distance - piece

      if (d > 0) {
        dy = piece
        newDistance = d
      } else {
        dy = distance
        newDistance = 0
      }
    } else if (distance < 0) {
      piece = -5
      const d = distance - piece

      if (d < 0) {
        dy = piece
        newDistance = d
      } else {
        dy = distance
        newDistance = 0
      }
    } else {
      this.emit('animationend')
      // 不在动画状态
      this.isAnimated = false
      return
    }
    this.setPos(dy)

    setTimeout(() => {
      this.doSmoothSlide(newDistance)
    }, 5)
  }

  slide (d) {
    this.setPos(d)
  }

  setPos (dy) {
    this.translateY += dy
    this.style(this.list, {
      transform: `translateY(${this.translateY}px)`
    })
    this.changeCurIndex()
  }

  setPosDirect (y) {
    this.translateY = y
    this.style(this.list, {
      transform: `translateY(${y}px)`
    })
  }

  // 滑动到某个元素
  toItem (index, animation = true) {
    let cindex = Math.floor(index)
    const firstIndex = 0
    const lastIndex = this.nodeInfo.total - 1

    if (index < firstIndex) {
      cindex = firstIndex
    } else if (index > lastIndex) {
      cindex = lastIndex
    }

    if (cindex === this.curIndex) {
      return
    }

    const distance = (this.curIndex - cindex) * this.nodeInfo.height

    this.firstIndex = this.curIndex

    if (!animation) {
      this.slide(distance)
      this.changeCurIndex()
    } else {
      this.smoothSlide(distance)
      this.on(
        'animationend',
        () => {
          this.changeCurIndex()
          this.emit('selected', {
            index: this.curIndex,
            node: this.nodes[this.curIndex],
            startIndex: this.firstIndex,
            startNode: this.nodes[this.firstIndex]
          })
        },
        true
      )
    }
  }

  next (animation = true) {
    this.toItem(this.curIndex + 1, animation)
  }

  pre (animation = true) {
    this.toItem(this.curIndex - 1, animation)
  }

  setNodes () {
    const list = this.el.querySelector(this.options.slideList)

    // 每个元素大小相同
    this.nodeInfo = {
      // offsetWidth在元素隐藏时无效
      width: list.children[0].offsetWidth || 30,
      height: list.children[0].offsetHeight || 30,
      total: list.children.length
    }
    this.list = list
    this.nodes = [...this.list.children]
  }

  // 获取正确的元素位置
  getCorrectPos () {
    const correctIndex = this.getTopIndex(this.translateY)
    const correctTranslateY = -correctIndex * this.nodeInfo.height

    return correctTranslateY
  }

  // 根据translateY获得顶部元素索引
  getTopIndex (y) {
    let topIndex = -Math.round(y / this.nodeInfo.height)
    // 顶端元素在选择框内时，无法再下滑动
    const minTopIndex = 0 - this.options.selectBox.position
    const maxTopIndex =
      this.nodeInfo.total - 1 - this.options.selectBox.position

    if (topIndex < minTopIndex) {
      topIndex = minTopIndex
    } else if (topIndex > maxTopIndex) {
      topIndex = maxTopIndex
    }
    return topIndex
  }

  // 获取所选元素索引
  getSelectedIndex (y) {
    return this.getTopIndex(y) + this.options.selectBox.position
  }

  // 获取所选元素位置
  getSelectedPos (index) {
    return (-index + this.options.selectBox.position) * this.nodeInfo.height
  }

  changeCurIndex () {
    const index = this.getSelectedIndex(this.translateY)

    if (index !== this.curIndex) {
      this.lastIndex = this.curIndex
      this.curIndex = index
      this.addSelectedClass()
      this.emit('change', {
        index: this.curIndex,
        node: this.nodes[this.curIndex],
        lastIndex: this.lastIndex,
        lastNode: this.nodes[this.lastIndex]
      })
    }
  }

  addSelectedClass () {
    const curItem = this.nodes[this.curIndex]
    const lastItem = this.nodes[this.lastIndex]

    curItem.classList.add('slide-item-checked')
    lastItem.classList.remove('slide-item-checked')
  }

  addSelectBox () {
    // 添加前，如果存在先remove掉
    if (this.selectBox) {
      this.el.removeChild(this.selectBox)
    }

    const height = this.nodeInfo.height
    const customSelectBox = this.el.querySelector('.slide-select-box')

    // 相对于父元素定位
    this.el.style.position = 'relative'
    if (customSelectBox) {
      customSelectBox.style.display = ''
      // 不改变原dom
      const copy = customSelectBox.cloneNode(true)

      this.el.appendChild(copy)
      // 隐藏原dom
      customSelectBox.style.display = 'none'
      const computedStyle = window.getComputedStyle(copy)

      this.style(copy, {
        left: 0,
        top: this.options.selectBox.position * height + 'px',
        position: 'absolute',
        width: computedStyle.width,
        height: computedStyle.height
      })
      this.selectBox = copy
      return
    }

    // 默认选择框
    const selectBox = document.createElement('div')

    this.style(selectBox, {
      width: this.el.offsetWidth + 'px',
      height: height + 'px',
      position: 'absolute',
      left: 0,
      top: this.options.selectBox.position * height + 'px',
      borderTop: '1px solid rgb(3, 136, 189)',
      borderBottom: '1px solid rgb(3, 136, 189)',
      background: 'rgb(169, 221, 241)',
      opacity: 0.4,
      ...this.options.selectBox.style
    })
    this.el.appendChild(selectBox)
    this.selectBox = selectBox
  }

  destroy () {
    if (this.selectBox) {
      this.el.removeChild(this.selectBox)
    }
    this.touch.destroy()
    // this.domResize.destroy()
    this.el.removeEventListener('slidestart', this._slidestart)
    this.el.removeEventListener('slidemove', this._throttleSlide)
    this.el.removeEventListener('slideend', this._slideend)
  }

  style (el, obj) {
    Object.assign(el.style, obj)
  }
}
