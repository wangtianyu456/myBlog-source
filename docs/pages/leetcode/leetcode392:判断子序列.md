# leetcode392:[判断子序列](https://leetcode-cn.com/problems/is-subsequence/)

## 题目描述

![leetcode392](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode392_isSubsequence.png)

## 梳理思路

### 解法一:双指针

两个指针分别指向两个字符串的起始位置，然后开始遍历，如果发现两个字符相等，那么连个指针就都向后移动

- 如果不相同的话，就长串移动到下一位
- 如果正好短串走完了,那么说明此时正好在长串中都有匹配到，返回`true`
- 如果长串走完了，则说明没有匹配全短串，返回`false`

```javascript
const isSubsequence = function (s, t) {
  if (s.length === 0) return true
  // 长串的索引
  let index = 0
  // 短串的索引
  let subIndex = 0
  // 遍历长串
  while (index < t.length) {
    // 如果此时两个字符相等，则短串指针也需要右移一位
    if (s[subIndex] === t[index]) {
      subIndex++
      if (subIndex > s.length - 1) {
        // 此时说明短串走完了，说明在长串里匹配到了短串
        return true
      }
    }
    index++
  }
  return false
}
```

### 解法二:递归

```javascript
const _isSubsequence = function (s, t) {
  if (s.length === 0) return true
  let i = 0
  while (i < t.length) {
    if (s[0] === t[i]) {
      // 截取剩余的短串
      const restSub = s.substring(1)
      // 剩余的长串
      const restStr = t.substring(i + 1)
      return _isSubsequence(restSub, restStr)
    }
    i++
  }
  return false
}
```
