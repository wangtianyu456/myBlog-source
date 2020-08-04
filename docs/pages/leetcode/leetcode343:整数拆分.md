# leetcode343:[整数拆分](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

## 题目描述

![leetcode343](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode343_integerBreak.png)

## 梳理思路

### 解法一：暴力递归法

- 对于数字 n 我们可以对其进行拆分
- 比如 10 可以拆分成 1 9 可以拆分成 2 8
- 而拆分出来的数比如 9 还可以继续拆分
- 因此可以递归

```javascript
const integerBreak = function (n) {
  let res = 0
  // 对于数字 n 我们可以对其进行拆分
  // 比如 10 可以拆分成 1 9  可以拆分成 2 8
  // 而拆分出来的数比如 9 还可以继续拆分
  // 因此可以递归
  for (let i = 1; i <= n - 1; i++) {
    res = Math.max(res, i * (n - i), i * integerBreak(n - i))
  }
  return res
}
```

### 解法二：记忆递归，减少重复的计算，优化性能

```javascript
const _integerBreak = function (n) {
  const memo = new Array(n + 1)
  const dfs = (n) => {
    if (memo[n]) return memo[n]
    let res = 0
    for (let i = 1; i <= n - 1; i++) {
      res = Math.max(res, i * (n - i), i * dfs(n - i))
    }
    memo[n] = res
    return res
  }
  return dfs(n)
}
```

### 解法三：动态规划

```javascript
const __integerBreak = function (n) {
  const dp = new Array(n + 1)
  // 0 1 不能拆，所以是0
  dp[0] = dp[1] = 0
  dp[2] = 1
  for (let i = 3; i <= n; i++) {
    dp[i] = 0
    // 对于数字 i 它可以分为两份 j 和 i-j  j 的范围是 1 到 i-j
    for (let j = 1; j < i - j; j++) {
      // i-j 这部分 要进行比较，不拆分和拆分后的计算结果的最大值
      dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j])
    }
  }
  return dp[n]
}
```
