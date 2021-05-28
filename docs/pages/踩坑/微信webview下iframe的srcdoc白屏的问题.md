# 微信 webview 下 `iframe` 的 `srcdoc` 白屏的问题

::: tip

微信下部分 ios 系统的 `iframe` 使用 `srcdoc` 属性会导致白屏

:::

```vue
// 以 vue 语法为例
<iframe id="iframe" :srcdoc="html"></iframe>
```

```javascript
// 解决方案
const html = `<div>HTML content</div>`
// 获取到 iframe 后，再重新赋值一遍即可
const iframe = document.getElementById('iframe')
iframe.contentDocument.write(html)
```
