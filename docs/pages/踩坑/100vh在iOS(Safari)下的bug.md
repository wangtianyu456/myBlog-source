# 100vh 在 iOS 下的 bug

```css
body {
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
}
```
