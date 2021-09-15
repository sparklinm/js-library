import { Event } from './Event'

/**
 * @description 节点大小监测。
 * @example
 * // 使用
 * let event = new DomResize(document.querySelector('#contianer'))
 * event.on('dom-resize', callback)
 */

export class DomResize extends Event {
  width = 20000
  oldWidth = 0
  newWidth = 0
  oldHeight = 0
  newHeight = 0
  supportsPassive = false
  constructor (el) {
      super()
      this.el = el
      this._init()
  }
  _init () {
      this.oldWidth = parseFloat(window.getComputedStyle(this.el).width)
      this.oldHeight = parseFloat(window.getComputedStyle(this.el).height)
      this.setSupportsPassive()
      this.createNode()
  }

  createNode () {
      // 监听变大的DOM
      const holderBig = document.createElement('div')

      holderBig.style =
      'position: absolute;top:0;left: 0;bottom: 0;right: 0;overflow: hidden;visibility: hidden;z-index:-1'
      holderBig.innerHTML = `<div style="width:${this.width}px;height:${this.width}px"></div>`

      // 监听变小的DOM
      const holderSmall = document.createElement('div')

      holderSmall.style =
      'position: absolute;top:0;left: 0;bottom: 0;right: 0;overflow: hidden;visibility: hidden;z-index:-1'
      holderSmall.innerHTML = '<div style="width:300%;height:300%"></div>'

      this.holderBig = holderBig
      this.holderSmall = holderSmall
      this.el.appendChild(holderBig)
      this.el.appendChild(holderSmall)

      holderSmall.scrollTop = this.width
      holderSmall.scrollLeft = this.width
      holderBig.scrollTop = this.width
      holderBig.scrollLeft = this.width

      holderBig.addEventListener(
          'scroll',
          this.scroll,
          this.supportsPassive
              ? {
                  passive: true
              }
              : false,
          false
      )
      holderSmall.addEventListener(
          'scroll',
          this.scroll,
          this.supportsPassive
              ? {
                  passive: true
              }
              : false,
          false
      )
  }

  scroll = () => {
      this.newWidth = parseFloat(window.getComputedStyle(this.el).width)
      this.newHeight = parseFloat(window.getComputedStyle(this.el).height)
      // 只有两次width不同时才分发事件，不然会多次分发
      if (this.oldWidth !== this.newWidth || this.oldHeight !== this.newHeight) {
          this.emit('dom-resize')
          this.oldWidth = this.newWidth
          this.oldHeight = this.newHeight
      }
      // 每次触发滚动事件后，重新将滚动条设至尽头
      this.holderSmall.scrollTop = this.holderBig.scrollTop = this.width
      this.holderSmall.scrollLeft = this.holderBig.scrollLeft = this.width
  }

  setSupportsPassive () {
      try {
          const opts = Object.defineProperty({}, 'passive', {
              get: () => {
                  this.supportsPassive = true
                  return true
              }
          })

          window.addEventListener('testPassive', null, opts)
          window.removeEventListener('testPassive', null, opts)
      } catch (e) {
          console.error(e)
      }
  }

  destroy () {
      this.holderBig.removeEventListener('scroll', this.scroll)
      this.holderSmall.removeEventListener('scroll', this.scroll)
      this.el.removeChild(this.holderBig)
      this.el.removeChild(this.holderSmall)
  }
}

