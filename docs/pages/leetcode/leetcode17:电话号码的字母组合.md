# leetcode17:[电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

## 题目描述

![leetcode17](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode17_letterCombinations.png)

## 梳理思路

### 解法一：嵌套循环

- 先将传进来的字符串拆分成数组，然后将数组的一项拆分开来，放进`res`中
- 接着去循环数字数组，去取`res`的值和后面匹配到的字母去做组合

```javascript
const map = {
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz",
};

const letterCombinations = function (digits) {
  if (digits.length === 0) return [];
  // 先把第一个值存下来
  let res = [...map[digits.split("")[0]].split("")];
  for (let i = 1; i < digits.length; i++) {
    // 创建一个临时变量
    const temp = [];
    // 取出当前匹配的字母从数组中下标为1的项开始
    const arr = [...map[digits.split("")[i]].split("")];
    for (let j = 0; j < res.length; j++) {
      for (let k = 0; k < arr.length; k++) {
        temp.push(`${res[j]}${arr[k]}`);
      }
    }
    // 每次循环组合完成之后，都要把最新的结果赋值给res
    // 然后下次循环进来，res就会以最新的结果来进行循环从而进行组合
    res = temp;
  }
  return res;
};
```
