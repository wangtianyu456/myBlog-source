# leetcode455:[分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

## 题目描述

![leetcode455](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode455_findContentChildren.png)

## 梳理思路

### 解法:双指针

先排序，然后双指针，判断`s`当前项的大小，如果大于`g`的当前项，则直接`count++` 指针后移，如果饼干`s[j]`的项小于当前孩子的胃口`g[i]`，则饼干指针后移

```javascript
const findContentChildren = function (g, s) {
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)

  let i = 0
  let j = 0
  let count = 0
  while (i < g.length && j < s.length) {
    let need = g[i]
    let cookie = s[j]
    if (cookie >= need) {
      count++
      i++
      j++
    } else {
      j++
    }
  }
  return count
}
```
