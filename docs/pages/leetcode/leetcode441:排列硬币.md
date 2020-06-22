# leetcode441:[排列硬币](https://leetcode-cn.com/problems/arranging-coins/)

## 题目描述

![leetcode441](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode441_arrangeCoins.png)

## 梳理思路

### 解法：二分法

形成 x 行阶梯需要的硬币数是 `1+2+...+x = (1+x) * x/2` 个
是一个递增序列 [0,1,3,6...,(1+x)*(x/2)]
现在的题目就是给你 n 个硬币，求出到底能算出递增序列中的 target 的位置，如果 target 不存在，那么就返回前一项

```javascript
var arrangeCoins = function (n) {
  if (n === 0) {
    return 0
  }
  let start = 0
  let end = n
  while (start <= end) {
    const mid = Math.floor(start + (end - start) / 2)
    const currentCount = (1 + mid) * (mid / 2)
    if (currentCount === n) {
      return mid
    } else if (currentCount < n) {
      start = mid + 1
    } else {
      // currentCount > n，大于了，返回他的前一项
      end = mid - 1
    }
  }
  return end
}
```
