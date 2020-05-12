# leetcode125:[验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

## 题目描述

![leetcode125](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode125_isPalindrome.png)

## 梳理思路

### 解法一：直接用字符串和数组的 API

```javascript
const isPalindrome = function (s) {
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return s.split("").reverse().join("") === s;
};
```

### 解法二：利用头尾指针来实现，不停遍历，向中间靠拢

```javascript
const _isPalindrome = function (s) {
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let i = 0,
    j = s.length - 1;
  while (i < j) {
    if (s.charAt(i) !== s.charAt(j)) return false;
    i++;
    j--;
  }
  return true;
};
```
