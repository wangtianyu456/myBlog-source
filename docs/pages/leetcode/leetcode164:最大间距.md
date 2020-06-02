# leetcode164:[最大间距](https://leetcode-cn.com/problems/maximum-gap/)

## 题目描述

![leetcode164](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode164_maximumGap.png)

## 梳理思路

### 解法一：常规解法，先排序，然后两两取差值和当前的最大差值相对比

这种算法的性能问题在于，`sort`的时候其实就已经将数组遍历过一次了，然后在后边又进行了一次遍历

> 时间复杂度 `O(2n)` 在小于 10 的时候是快排`O(nlogn)`，大于 10 的时候是插排，因此时间复杂度最坏是`O(2n)`，好是`O(nlogn+n)`
> 空间复杂度为 `O(1)` 常量

```javascript
const maximumGap = function (nums) {
  if (nums.length < 2) return 0;
  nums.sort((a, b) => a - b);
  let max = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    const temp = nums[i + 1] - nums[i];
    if (temp > max) {
      max = temp;
    }
  }
  return max;
};
```

### 解法二：常规解法，先排序，然后两两取差值和当前的最大差值相对比

这种算法的性能问题在于，`sort`的时候其实就已经将数组遍历过一次了，然后在后边又进行了一次遍历，所以时间上是走了`O(2n)`

> 时间复杂度为 `O(n^2)` 嵌套循环数组，这时的时间复杂度其实是不满足要求的
> 空间复杂度为 `O(1)`

```javascript
const _maximumGap = function (nums) {
  if (nums.length < 2) return 0;
  // 最大差值
  let max = 0;

  const len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
    // 冒泡排序每次都会选出当前轮的最大值，因此只要选出两个最大值的时候就可以开始计算两者之间的间距了
    // 从第二轮开始去比较当前排序好的最后的两位，即最大值和第二大的值
    if (i >= 1) {
      // 这里就是把当前轮的最后一项和倒数第二项进行取差值的操作
      // 但是存在一个问题，当`i`达到临界条件的时候，即`i = len-2`的时候，就是最后一次循环了，这时比较的是`nums[2]-nums[1]`
      // 所以在最后返回max之前要把索引为0和索引为1的值取出来做差值，然后和max比较后再返回
      // 当前的两位之间的间距(差值)
      const space = nums[len - i] - nums[len - i - 1];
      if (space > max) {
        max = space;
      }
    }
  }
  if (nums[1] - nums[0] > max) {
    max = nums[1] - nums[0];
  }
  return max;
};
```
