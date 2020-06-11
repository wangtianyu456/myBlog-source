# leetcode380:[常数时间插入、删除和获取随机元素](https://leetcode-cn.com/problems/insert-delete-getrandom-o1/)

## 题目描述

![leetcode380](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode380RandomizedSet.png)

## 梳理思路

### 解法一:利用 `Map` 和数组

- 插入数据好说，直接向 map 和数组中插入数据即可
- 但是删除数据的时候还要保持`O(1)`复杂度，比较复杂，所以在删除的时候，我们始终用数组中的最后一项来直接的替换当前项，然后删除掉最后一项即可
- 在获取随机的一项的值的时候，数组就有了很大的作用，我们可以以数组的长度来获取随机值，这样直接在数组中取随机值，复杂度也为`O(1)`

```javascript
/**
 * Initialize your data structure here.
 */
const RandomizedSet = function () {
  this.map = new Map()
  this.values = []
}

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.map.has(val)) {
    return false
  }
  this.map.set(val, this.values.length)
  this.values.push(val)
  return true
}

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (!this.map.has(val)) {
    return false
  }
  const index = this.map.get(val)
  // 存在且为最后一个元素
  if (index === this.values.length - 1) {
    this.values.pop()
    this.map.delete(val)
  } else {
    // 不为最后一个元素，直接拿数组末尾的项来替换它，就完成了删除
    const lastValue = this.values.pop()
    this.values[index] = lastValue
    this.map.set(lastValue, index)
    this.map.delete(val)
  }
  return true
}

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const length = this.values.length
  const random = Math.floor(Math.random() * length)
  return this.values[random]
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
```

### 解法二:利用 `Set` 数据结构

```javascript
/**
 * Initialize your data structure here.
 */
const RandomizedSet = function () {
  this.set = new Set()
}

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.set.has(val)) {
    return false
  }
  this.set.add(val)
  return true
}

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (!this.set.has(val)) {
    return false
  }
  this.set.delete(val)
  return true
}

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const random = Math.floor(Math.random() * this.set.size)
  return [...this.set][random]
}
```
