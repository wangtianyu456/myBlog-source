# leetcode1:[两数之和](https://leetcode-cn.com/problems/two-sum/)

## 题目描述

![leetcode1](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode1_twoSum.png)

## 梳理思路

初始化一个`map`实例 `const map = new Map()`

然后遍历`nums`，每次都判断`target`与当前项`nums[i]`的差值`difference`是否已经在`map`中存在

- 如果不存在，那么就往`map`中新增一项 => `key`为当前值，`value`为当前索引 => `map.set(nums[i],i)`

- 如果已经存在，那么直接返回当前 map 中这一项和当前索引组成的数组 => `[map.get(difference),i]`

如果循环完毕都不存在，那么直接返回空数组 `[]`

```javascript
const twoSum = (nums, target) => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const difference = target - nums[i];
    if (map.has(difference)) {
      return [map.get(difference), i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
};
```
