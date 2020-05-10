# leetcode14:[最长公共前缀](https://leetcode-cn.com/problems/two-sum/)

## 题目描述

![leetcode14](../assets/img/leetcode14_longestCommonPrefix.png)

## 梳理思路

### 解法一：逐个比较，然后截取每次比较出来的相同的字符串，作为当前选出的最长公共前缀

```javascript
const longestCommonPrefix = function (strs) {
  if (strs === null || strs.length === 0) return "";
  // 假设当前的最长公共前缀是第一项
  let prevs = strs[0];
  // 外层循环数组，遍历每个字符串
  for (let i = 0; i < strs.length; i++) {
    // 内层循环当前字符串，但是要对遍历的长度做控制，当下标已经大于了当前字符串的长度或者已经大于当前选出来的公共前缀prevs的长度时，就要停止
    let j = 0;
    // j其实就是控制字符串循环到哪一位，一旦比较不同，跳出循环，那么此时的j就是当前的最长公共前缀的最后一位
    for (; j < prevs.length && j < strs[i].length; j++) {
      if (prevs.charAt(j) !== strs[i].charAt(j)) break;
    }
    // 截取出当前选出的最长公共前缀
    prevs = prevs.substring(0, j);
    if (prevs === "") return "";
  }
  return prevs;
};
```

::: tip 复杂度

- 时间复杂度 `O(s)` -- `s`为字符串长度的总和
- 空间复杂度 `O(1)` -- `prevs`的空间

:::

### 解法二：分治策略，归并思想

```javascript
const longestCommonPrefix = function (strs) {
  if (strs === null || strs.length === 0) return "";
  if (strs.length === 1) return strs[0];
  let min = 0;
  let max = 0;
  for (let i = 0; i < strs.length; i++) {
    if (strs[min] > strs[i]) min = i;
    if (strs[max] < strs[i]) max = i;
  }
  console.log(strs[max], strs[min]);
  for (let j = 0; j < strs[min].length; j++) {
    if (strs[min].charAt(j) !== strs[max].charAt(j)) {
      return strs[min].substring(0, j);
    }
  }
  return strs[min];
};
```

::: tip 复杂度

- 时间复杂度 `O(n+m)` -- `n` 是数组的长度，`m` 是最小值的长度
- 空间复杂度 `O(1)` -- `min` 和 `max` 的空间，是常数

:::
