# leetcode41:[缺失的第一个正数](https://leetcode-cn.com/problems/first-missing-positive/)

## 题目描述

![leetcode41](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode41_firstMissingPositive.png)

## 梳理思路

### 解法一：暴力法

::: tip

- 时间复杂度上`O(n)`加上`sort`方法的复杂度在加上遍历的`O(n)`，得到的结果不一定是线性的
- 空间上过滤掉`nums`中的负数后所占的空间`O(n)` `n` 是正数的数量

:::

```javascript
const firstMissingPositive = function (nums) {
  // 第一步，先过滤掉数组中的负数
  nums = nums.filter((item) => item > 0)
  if (nums.length) {
    // 第二步给数组排序，升序
    nums.sort((a, b) => a - b)
    // 判断数组第一项是不是1，如果不是1，则直接返回1
    if (nums[0] !== 1) {
      return 1
    } else {
      for (let i = 0; i < nums.length - 1; i++) {
        // 如果相邻的两个值的差值大于1，那么就说明不是连续的，则让小值去加1
        if (nums[i + 1] - nums[i] > 1) {
          return nums[i] + 1
        }
      }
      // 是连续的，所以直接取最后一项加1
      return nums[nums.length - 1] + 1
    }
  } else {
    // 过滤后数组的长度为0.则直接返回1
    return 1
  }
}
```

### 解法二：借助选择排序

::: tip

- 时间复杂度为`O(n^2)`
- 空间上过滤掉`nums`中的负数后所占的空间`O(n)` `n` 是正数的数量
  :::

```javascript
const firstMissingPositive = function (nums) {
  nums = nums.filter((item) => item > 0)
  // 选择排序，去拿最小值，如果第一个元素不是1，直接返回1，如果是1，则去比较相邻元素
  for (let i = 0; i < nums.length; i++) {
    let min = nums[i]
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < min) {
        const cur = min
        min = nums[j]
        nums[j] = cur
      }
    }
    nums[i] = min
    if (i > 0) {
      // 判断相邻项的差
      if (nums[i] - nums[i - 1] > 1) {
        return nums[i - 1] + 1
      }
    } else {
      if (min !== 1) {
        return 1
      }
    }
  }
  // 如果数组都是连续的
  if (nums.length) {
    return nums[nums.length - 1] + 1
  } else {
    return 1
  }
}
```

### 解法三

假定数组为连续正整数数组，那么就满足一个条件 即`nums[i] = i+1`
我们遍历这个数组，假定`j`为当前值的索引，判断是否满足这个条件`nums[j] = j+1`

- 例如 当前值为`5`，那么`j=4`
- 如果不满足这个条件，那么我们就让 索引为`i`的项和索引为`j`的项进行交换位置，让索引为`j`的项到它本来该在的位置
- 还要判断`j`是否为当前数组的索引，如数组`[1,2,3,7,9]`中， 值为 6 的项的索引本应该是`7-1=6`，但是数组中不存在，所以直接跳过它

一轮遍历之后，我们就得到了尽可能符合这个条件的数组，这时我们再重新从 0 开始遍历，直到第一个不满足这个条件的值，让它的索引+1，就是我们要的最小正数

::: tip
这种解法的复杂度是满足题目要求的

- 时间复杂度 `O(2n) = O(n)`
- 空间复杂度为常量 `O(1)`

:::

```javascript
const firstMissingPositive = function (nums) {
  let i = 0
  let j
  while (i < nums.length) {
    // j 为当前值的索引
    j = nums[i] - 1
    // 判断当前索引是否存在余nums中，且是否满足 `nums[i] = i+1` 的规则
    if (j >= 0 && j < nums.length && nums[j] !== j + 1) {
      // 如果不满足规范，则去交换位置，这样 索引为j的位置的值就满足`nums[j] = j+1`的条件了
      const temp = nums[i]
      nums[i] = nums[j]
      nums[j] = temp
    } else {
      i++
    }
  }
  // 一轮遍历后，我们在进行二次遍历即可
  let x = 0
  while (x < nums.length && nums[x] === x + 1) {
    x++
  }
  return x + 1
}
```
