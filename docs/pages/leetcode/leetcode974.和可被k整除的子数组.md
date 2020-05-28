# leetcode974:[和可被 k 整除的子数组](https://leetcode-cn.com/problems/gray-code/)

## 题目描述

![leetcode974](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode974_subarraysDivByK.png)

## 梳理思路

利用同余定理，即两个数`a`与`b`的差能够被另一个数`m`整除的话，那么就称`a`与`b`对模`m`同余

> 同理可以得到，当 `(preSum[j]−preSum[i−1]) mod K == 0` 满足条件时[i,j]之间的数组就是我们要的满足条件的数组
> 根据同余定理，得到 `preSum[j] mod K == preSum[i−1] mod K`，我们就是要依据这个公式来找符合条件的小数组，他们之间的子数组就是我们要的能被整除的子数组

- 然后我们利用一个`map`来保存出现过的余数(前缀和模`k`)，有就加 1，没有就设定为 1
- 然后我们在再次出现这个余数的时候，就让 count 加上之前已经出现的次数

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
  // 假设i等于0的时候，边界情况，此时的前缀和preSum[i-1]为0
  const map = { 0: 1 };
  // 保存前缀和模k的结果
  let preSumModK = 0;
  let count = 0;
  for (let i = 0; i < A.length; i++) {
    // 这里是利用了模的分配率公式，即 `(a + b) mod c = (a mod c + b mod c) mod c`
    // (preSumModK mod K + A[i] mod K) % K =  (preSumModK + A[i]) % K
    preSumModK = (preSumModK + A[i]) % K;
    // 处理 preSumModK 为负数的情况，当余数为preSumModK的时候，我们应该再加上正的preSumModK才能被整除，所以让preSumModK(这时是负数，其实是k-preSumModK)加上K，那么得到的结果是相同的，也是在加上preSumModK才能整除
    if (preSumModK < 0) preSumModK += K;
    if (map[preSumModK]) {
      // 这里指的是，当再次出现了map中出现过的值(余数)，则证明此时出现「同余」，那么说明此时中间的值正好是可以整除K的，所以count加上之前出现过的次数
      // 之所以加上之前出现过的次数是因为，之前出现过几次相同的前缀和，那么和当前的前缀和组合就会有几个满足条件的子数组
      count += map[preSumModK];
    }
    if (map[preSumModK]) {
      map[preSumModK]++;
    } else {
      map[preSumModK] = 1;
    }
  }
  return count;
};
```
