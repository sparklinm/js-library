
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

export class Event {
  // on 监听的事件
  onEvents = {}
  index = -1
  count = 0
  // once 表示注册的事件只执行一次便自动移除
  on (name, callback, once = false) {
      this.onEvents[name] = this.onEvents[name] || []
      this.onEvents[name].push({
          name: name,
          callback: callback,
          once: once
      })
  }

  // 移除事件
  off (name, callback) {
      if (!this.onEvents[name] || !this.onEvents[name].length) {
          return
      }
      this.onEvents[name] = this.onEvents[name].filter((event, index) => {
          let flag = true

          // 在emit的回调中，可能会off事件
          if (event.callback === callback) {
              flag = false
              if (index <= this.index && name === this.name) {
                  this.count++
              }
          }

          return flag
      })
  }

  emit (name) {
      if (!this.onEvents[name] || !this.onEvents[name].length) {
          return
      }

      const params = [...arguments].slice(1)

      this.name = name

      for (let i = 0; i < this.onEvents[name].length; i++) {
          const event = this.onEvents[name][i]

          // 需要先判断是否为一次性事件，先移除
          // 以防在事件回调中继续触发当前事件时即使是一次性事件也会执行多次
          if (event.once) {
              this.onEvents[name].splice(i, 1)
              i--
          }
          // 记录此时的index
          this.index = i
          event.callback(...params)
          // 如果回调中off事件，需要记录off的小于等于这个index的个数
          i -= this.count
          this.count = 0
      }
      this.count = 0
      this.index = -1
  }
}
