# leetcode367:[有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/)

## 题目描述

![leetcode367](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode367_isPerfectSquare.png)

## 梳理思路

### 解法：二分搜索算法

- 如果`num`为完全平方数，那么形成该平方数的整数一定在`[1,num)`之间
- 我们通过取`[1,num)`区间的中间值，平方计算后来做比较，小于当前值，则将区间缩小为[1,mid]，否则为[mid+1,num]
- 直到 start 不在小于 end 的时候，说明左右指针相遇，这时取值去判断即可

```typescript
function isPerfectSquare(num: number): boolean {
  let start = 1
  let end = num
  while (start < end) {
    const mid = Math.floor(start + (end - start) / 2)
    const middle = mid * mid
    if (num > middle) {
      start = mid + 1
    } else {
      end = mid
    }
  }
  return start ** 2 === num
}
```
