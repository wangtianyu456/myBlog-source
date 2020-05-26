# leetcode287:[寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)

## 题目描述

![leetcode287](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode287_findDuplicate.png)

## 梳理思路

### 解法：利用快慢指针

- 因为数组中的数的大小是小于等于`n`(数组长度)的，即`(0,n)`,这就说明，在数组内使用数组内的值作为索引是不会跳出数组的，所以直接用链表来模拟，快指针每次都以「当前快指针指向的索引的值」为索引去找，慢指针一步一步的往后找，直到找到相等的时候，这个时候就是说明找到了两个指针相遇的点，也就是环的入口
- 这时我们去进行第二轮的比较，让`slow`指针回到`0`，然后两个指针一次只走一步，当两个指针的值相等的时候，返回当前值即可

```javascript
const findDuplicate = function (nums) {
  let fast = 0;
  let slow = 0;
  // 首先开始走快慢指针，慢指针一次走一步 ，快指针走两步
  // 每次走的下一此的索引都是当前索引在数组中的值
  // 这里先找到他们相等的时候的指针，这里就是他们相遇的点，即环的入口
  do {
    slow = nums[slow];
    // 这里 fast 是走两步，相当于 fast = nums[fast] fast = nums[fast]
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // 第一次找到了相遇的点，即环的入口，此时我们将`slow`置位0，然后快慢指针一次只走一步，寻找相等的值
  slow = 0;
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  // 返回当前的值
  // return fast
  return slow;
};
```
