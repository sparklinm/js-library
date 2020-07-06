export function marquee (el, options) {
  const opt = Object.assign(
    {
      // 动画时长
      duration: 10000,
      // 两个文本间间距
      gap: '',
      // 文本距离容器左边缘距离
      start: 0,
      // 在哪里滚动
      scrollIn: 'parent',
      // 是否超出容器才滚动
      scrollOnOverflow: false
    },
    options
  )

  Object.assign(el.style, {
    whiteSpace: 'nowrap'
  })
  Object.assign(el.parentNode.style, {
    overflow: 'hidden'
  })

  const containerStyle = window.getComputedStyle(el.parentNode)
  // 容器宽度
  const containerWidth = parseInt(containerStyle.width)
  // 文字宽度
  const textWidth = el.offsetWidth

  let gapWidth = 0

  if (opt.scrollIn === 'self') {
    gapWidth = opt.gap || textWidth
  } else {
    gapWidth = opt.gap || containerWidth
  }
  // 最大translatex
  const maxTranslateX = -(textWidth + gapWidth)

  Object.assign(el.parentNode.style, {
    overflow: ''
  })

  if (
    (textWidth <= containerWidth && opt.scrollOnOverflow) ||
    containerWidth === 0 ||
    textWidth === 0
  ) {
    Object.assign(el.style, {
      whiteSpace: ''
    })
    return
  }

  const container = document.createElement('div')
  const div1 = document.createElement('div')
  const div2 = document.createElement('div')
  const copy1 = document.createElement('span')
  const rawEl = el.cloneNode(true)

  copy1.innerHTML = el.innerHTML
  const copy2 = copy1.cloneNode(true)

  div1.appendChild(copy1)
  div2.appendChild(copy2)
  container.appendChild(div1)
  container.appendChild(div2)

  for (let i = 0; i < el.childNodes.length;) {
    el.removeChild(el.childNodes[i])
  }
  el.appendChild(container)

  Object.assign(div1.style, {
    display: 'inline-block',
    marginRight: gapWidth + 'px',
    marginLeft: opt.start + 'px'
  })
  Object.assign(div2.style, {
    display: 'inline-block'
  })
  Object.assign(container.style, {
    display: 'inline-block'
  })

  Object.assign(el.style, {
    overflow: 'hidden'
  })

  if (opt.scrollIn === 'self' && textWidth < containerWidth) {
    Object.assign(el.style, {
      width: textWidth + 'px',
      display: 'inline-block',
      verticalAlign: 'bottom'
    })
  } else {
    Object.assign(el.style, {
      width: containerWidth + 'px',
      margin: 0,
      display: 'block'
    })
  }


  const piece = (maxTranslateX / opt.duration) * 10
  let translateX = -piece
  let timer = null
  let timeout = 10

  const doMarquee = function () {
    translateX += piece
    timeout = 10

    if (translateX > maxTranslateX && translateX < 0) {
      container.style.transform = `translateX(${translateX}px)`
    } else if (translateX === 0) {
      container.style.transform = `translateX(${translateX}px)`
      timeout = 2000
    } else {
      container.style.transform = `translateX(${maxTranslateX}px)`
      translateX = -piece
    }
    timer = setTimeout(() => {
      doMarquee()
    }, timeout)
  }

  const mouseenter = function () {
    clearTimeout(timer)
  }

  const mouseleave = function () {
    doMarquee()
  }

  const destroy = function () {
    el.parentNode.appendChild(rawEl)
    el.parentNode.removeChild(el)
    Object.assign(rawEl.style, {
      whiteSpace: ''
    })
    clearTimeout(timer)
    el.removeEventListener('mouseenter', mouseenter)
    el.removeEventListener('mouseleave', mouseleave)
  }

  el.addEventListener('mouseenter', mouseenter)
  el.addEventListener('mouseleave', mouseleave)

  doMarquee()
  return {
    destroy: destroy
  }
}