---
meta:
  - title: marquee.js 文档
    time: 2020-07-02 16:25:14
    tag: marquee,js
---

# marquee

## 使用方法

```js
let textNode = document.querySelector(".text")
let m = marquee(textNode)
```

## 配置项

| 参数               | 类型    | 说明                             | 默认值    |
| ------------------ | ------- | -------------------------------- | --------- |
| `duration`         | Number  | 动画时长（ms）                   | 10000     |
| `gap`              | Number  | 两个文本之间的距离，单位：px     | undefined |
| `start`            | Number  | 文本距离容器左边缘距离，单位：px | 0         |
| `scrollOverflowed` | Boolean | 是否多行时才滚动                 | false     |

## 实例方法

### destory

销毁实例，移除监听事件、更改的 `dom` 和样式。
