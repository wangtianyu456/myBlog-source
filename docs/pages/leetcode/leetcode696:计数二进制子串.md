# leetcode696:[计数二进制子串](https://leetcode-cn.com/problems/count-binary-substrings/)

## 题目描述

![leetcode696](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode696_countBinarySubstrings.png)

## 梳理思路

### 解法一：利用正则匹配来实现

截取字符串，以`0`和`1`开头的重复字符为起始，匹配到不重复为止，然后根据前边的重复字符串，生成后边应该相匹配的字符串，如`00`就应该生成`11`，最终组合出来的期望字符串就是`0011`,这样我们那这个期望字符串去做正则匹配，只要当前截取的字符串是以该期望字符串开头的，那么就符合要求，将该字符串压入栈中

```javascript
const countBinarySubstrings = function (s) {
  // 用栈来保存
  const arr = [];
  const match = (str) => {
    const j = str.match(/^0+|1+/g)[0];
    const o = (j[0] ^ 1).toString().repeat(j.length);

    // 这里用字符串匹配，是否以字符串开头，原理一样
    // const finalStr = `${j}${o}`
    // if (str.startsWith(finalStr)) {
    //   return finalStr
    // } else {
    //   return undefined
    // }

    // 这里用正则
    const reg = new RegExp(`^(${j}${o})`);
    if (reg.test(str)) {
      return str.match(reg)[0];
    } else {
      return "";
    }
  };
  // 先循环
  for (let i = 0; i < s.length; i++) {
    const sub = match(s.slice(i));
    if (sub) {
      arr.push(sub);
    }
  }
  return arr.length;
};
```

### 解法二：利用栈和正则匹配来实现

- `pre`是用来存储上个字符串中的重复复字符的数量，`curr`是用来存储当前字符串的重复字符的数量，`result`用来存储符合条件的字符串
- 循环字符串，每次都拿当前项和下一项去比对，
  - 如果当前项和下一项相等，那么我们就把`curr`加 1，
  - 如果不相等那我们就应该把当前的`curr`的值给`pre`，重置`curr`
  - 如果当`pre`的长度大于等于`curr`的时候，就说明，出现了一次重复
    - 例如出现`0011`，或者`001`这种都算是出现了一次

```javascript
var _countBinarySubstrings = function (s) {
  let pre = 0; // 上一个字符串的重复数
  let curr = 1; // 当前字符串的重复数
  let result = 0;
  // 这里循环需要小于s.length-1，因为在内部比较的时候是和s+1比较的
  for (let i = 0; i < s.length - 1; i++) {
    // 当前项和下一项相等
    if (s[i] === s[i + 1]) {
      curr++;
    } else {
      // 当前项和下一项不相等
      // 那我们就把`curr`的长度给`pre`的长度，重置`curr`
      pre = curr;
      curr = 1;
    }
    // 这里是当`pre`的长度大于等于`curr`的长度的时候就说明之前的重复字符串和当前的重复字符串存在连续了
    // 如 `pre`是 00 `cur`是1 那么此时就可以判定出现了重复连续字符串
    // `pre`是00 `cur`是`11` 此时也可以
    if (pre >= curr) {
      result++;
    }
  }
  return result;
};
```
