# leetcode680:[验证回文串||](https://leetcode-cn.com/problems/valid-palindrome-ii/)

## 题目描述

![leetcode680](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode680_validPalindrome.png)

## 梳理思路

### 解法：利用头尾双指针，向中间逼近

- 当头尾不等时指针的值相等时，那就让头指针向后移动一位，尾指针向前移动一位
- 当头尾指针不等时，则要尝试删除头指针或者尾指针，再去进行比较(这里我们用了一个辅助方法，将指针移动来模拟删除，然后在这个辅助方法中去判断，移动后的字符是否相等，如果不相等，则直接返回`false`，如果相等，则继续指针向中间移动)

```javascript
const isPalindrome = function (s) {
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return s.split("").reverse().join("") === s;
};
```
