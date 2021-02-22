# leetcode8:[字符串转换整数 (atoi)](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

## 题目描述

![leetcode8](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode8_myAtoi.png)

## 梳理思路

### 解法 1：正则匹配方案

> 忽略前面的空格，匹配正负号，匹配数字 `/\s*([+|-]?[0-9]*).*/`

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let res = 0

  // 最大 最小值
  const max = 2 ** 31 - 1
  const min = 2 ** 31 * -1

  const reg = /\s*([+|-]?[0-9]*).*/
  const group = s.match(reg)
  if (group) {
    // 获取到匹配到的值
    res = +group[1]

    if (isNaN(res)) {
      res = 0
    }
  }

  // 最大最小值判断
  if (res > max) {
    res = max
  } else if (res < min) {
    res = min
  }

  return res
}
```

### 解法 2：自动机

[leetcode 题解](https://leetcode-cn.com/problems/string-to-integer-atoi/solution/javascriptzi-dong-ji-guan-fang-ti-jie-de-xiang-xi-/)

```javascript
/**
 * 解法 2：自动机
 * @param {string} s
 * @return {number}
 */
const _myAtoi = function (s) {
  class Automaton {
    constructor() {
      // 当前的状态，默认是开始
      this.state = 'start'

      // 正负号 默认是正数
      this.sign = 1

      // 结果
      this.answer = 0

      this.map = new Map([
        ['start', ['start', 'signed', 'in_number', 'end']],
        ['signed', ['end', 'end', 'in_number', 'end']],
        ['in_number', ['end', 'end', 'in_number', 'end']],
        ['end', ['end', 'end', 'end', 'end']],
      ])
    }

    getIndex(char) {
      if (char === ' ') {
        // 空格
        return 0
      } else if (char === '-' || char === '+') {
        // 正负号
        return 1
      } else if (typeof Number(char) === 'number' && !isNaN(char)) {
        // 数字
        return 2
      } else {
        // 其他情况
        return 3
      }
    }

    get(char) {
      this.state = this.map.get(this.state)[this.getIndex(char)]

      if (this.state === 'in_number') {
        // 在JS中，对字符串类型进行减法操作，可以将得到一个数值型（Number）的值
        this.answer = this.answer * 10 + (char - 0)

        this.answer =
          this.sign === 1
            ? Math.min(this.answer, Math.pow(2, 31) - 1)
            : Math.min(this.answer, -Math.pow(-2, 31))
      } else if (this.state === 'signed') {
        this.sign = char === '+' ? 1 : -1
      }
    }
  }

  const automaton = new Automaton()
  for (let char of s) {
    automaton.get(char)
  }
  return automaton.sign * automaton.answer
}
```
