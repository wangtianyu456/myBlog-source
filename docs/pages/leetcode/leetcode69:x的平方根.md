# leetcode69:[x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

## 题目描述

![leetcode69](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode69_mySqrt.png)

## 梳理思路

### 解法：二分搜索法

该数的平方根一定在`[0,x)`之间，所以取中间值平方，然后与`x`比较，当遍历完成时，`mid，此时的start`的平方刚好大于 x，所以返回`mid，此时的start-1`

- 当 start>end 的时候，跳出循环
- 如，求 8 的平方根
- 第一次的 mid 是 4,不符合要求，所以 end=4
- 第二次的 mid=2,mid*mid < x，所以 start=mid+1 = 3，再次进入循环体，mid = 3,mid*mid>x 了，end=mid，此时 start=mid，跳出循环，返回 start-1 即可

```javascript
const mySqrt = function (x) {
  if (x === 0 || x === 1) {
    return 0
  }
  let start = 0
  let end = x
  while (start < end) {
    const mid = Math.floor(start + (end - start) / 2)
    const middle = mid * mid
    if (middle === x) {
      return mid
    } else if (middle < x) {
      start = mid + 1
    } else {
      end = mid
    }
  }
  return end - 1
}
```
