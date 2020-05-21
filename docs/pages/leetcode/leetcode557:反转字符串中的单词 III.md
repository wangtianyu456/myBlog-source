# leetcode557:[反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

## 题目描述

![leetcode557](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode557_reverseWords.png)

## 梳理思路

### 解法一：map 方法

```javascript
const reverseWords = function (s) {
  // return s
  //   .split(' ')
  //   .map((item) => item.split('').reverse().join(''))
  //   .join(' ')
  return s
    .split(/\s/)
    .map((item) => item.split("").reverse().join(""))
    .join(" ");
};
```

### 解法二：将字符串包括空格在内，全部翻转，在以空格为分界，翻转回来

```javascript
var _reverseWords = function (s) {
  // 先将字符串转成数组，包括空格在内
  // 然后将数组翻转
  // 转为字符串，这时就是完全翻转后的字符串了
  // 因为此时字符串中还是有空格的，所以我们以空格为分割，再拆分成数组，这时拿到的数组其实就是倒序的数组
  // 将数组翻转成正序，最终转为以空格分割的字符串
  return s.split("").reverse().join("").split(/\s+/).reverse().join(" ");
};
```
