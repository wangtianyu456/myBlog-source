# leetcode89:[格雷编码](https://leetcode-cn.com/problems/gray-code/)

## 题目描述

![leetcode89](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode89_grayCode.png)

## 梳理思路

题目本身是找规律

> - 当输入为`1`的时候，输出的二进制数组为[0,1]
> - 当输入为`2`的时候，输出的二进制数组为[00,01,11,10] - 当输入为`3`的时候，输出的二进制数组为[000,001,011,010,110,111,101,100]

由此我们可以总结出规律，首先数组的长度就是`n`的平方，然后从输出的数组从中间分开来看，去掉高位的 `0` 和 `1`，可以得出前后是镜像的
其次，我们发现去掉`0`和`1`后，后边的值就是当前`n-1`应该输出的二进制数组，由此我们可以得出解法，递归去一位一位的生成当前值的二进制数组，最终添加上`0`和`1`即可

```javascript
const grayCode = function (n) {
  return make(n).map((item) => parseInt(item, 2));
};

/**
 * 递归
 * @param {number} n
 * @returns {number[]}
 */
const make = (n) => {
  if (n === 0) {
    return [0];
  } else if (n === 1) {
    return [0, 1];
  } else {
    const prev = make(n - 1);
    const result = [];
    const maxLength = Math.pow(2, n) - 1;
    for (let i = 0; i < prev.length; i++) {
      result[i] = `0${prev[i]}`;
      result[maxLength - i] = `1${prev[i]}`;
    }
    return result;
  }
};
```
