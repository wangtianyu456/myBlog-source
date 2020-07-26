# leetcode16:[最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest)

## 题目描述

![leetcode16](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode16_threeSumClosest.png)

## 梳理思路

- 先将数组排序
- 然后迭代数组，每次从数组中取一个基准点，然后在基准点的右侧取双指针不断缩小，然后来寻找差值
  - 当前基准点为 `i`
  - `left`:`i+1`
  - `right`:`nums.length-1`
- 然后进行求和，
  - 如果和大于 target，则应该让`right`指针左移
  - 如果当前和小于`target`，则`left`指针右移
  - 相等则正好是我们要找的值

```javascript
const threeSumClosest = function (nums, target) {
  let n = nums.length
  // 边界判断，如果正好是三位，则直接返回
  if (n === 3) {
    return getSum(nums)
  }

  // 先升序排序 此为解题的前置条件
  nums.sort((a, b) => a - b)

  // 先设定一个最小值，表示当前的sum和target的最小差
  let min = Infinity
  let res
  // 因为一次选择三位，除了当前项外，还要选择两位，所以len要减2
  for (let i = 0; i < nums.length - 2; i++) {
    let basic = nums[i]
    // 左指针先从i右侧的第一位开始
    let left = i + 1
    // 右指针先从数组的最后一位开始
    let right = n - 1

    while (left < right) {
      let sum = basic + nums[left] + nums[right]
      // 计算最小差
      let diff = Math.abs(sum - target)
      if (diff < min) {
        // 如果当前的差值小于之前记录的最小值，则更新最小值
        min = diff
        res = sum
      }
      if (sum < target) {
        // 当前的求和比目标值小，所以左指针后移一位
        left++
      } else if (sum > target) {
        // 当前的求和比目标值大，所以右指针左移一位
        right--
      } else {
        // 如果正好相等，那么差为0，正好就是要找的值
        return sum
      }
    }
  }
  return res
}

function getSum(nums) {
  return nums.reduce((total, cur) => total + cur, 0)
}
```
