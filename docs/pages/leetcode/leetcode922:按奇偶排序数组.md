# leetcode922:[按奇偶排序数组](https://leetcode-cn.com/problems/sort-array-by-parity-ii/)

## 题目描述

![leetcode922](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode922_sortArrayByParityII.png)

## 梳理思路

### 解法一：声明一个空数组和奇数位索引指针、偶数位索引指针，遍历数组，当前项为偶数就放到新数组的偶数位，否则放到奇数位

```javascript
/**
 * @param {number[]} deck
 * @return {boolean}
 */
const sortArrayByParityII = function (A) {
  // 声明一个空数组，存储奇偶排序后的数组
  const r = [];
  let odd = 1;
  let even = 0;
  for (let i = 0; i < A.length; i++) {
    const item = A[i];
    if (item % 2 === 1) {
      // 奇数
      r[odd] = item;
      odd += 2;
    } else {
      // 偶数
      r[even] = item;
      even += 2;
    }
  }
  return r;
};
```

### 解法二：声明奇数位索引指针、偶数位索引指针，遍历数组，假如当前项为奇数，就去找数组中索引为奇数的项是否为奇数，不为奇数则设定为当前值，然后和当前位置的值进行交换

```javascript
const sortArrayByParityII = function (A) {
  // 双指针，奇数指针，偶数指针
  let odd = 1;
  for (let i = 0; i < A.length; i += 2) {
    if (A[i] % 2 === 1) {
      // 当前项为奇数
      while (A[odd] % 2 === 1) {
        // 判断奇数指针索引的项是否为奇数
        // 如果当前项是奇数，那么就去找下一个奇数指针
        odd += 2;
      }
      // 如果找到了当前奇数指针索引的项是偶数，那么就交换这两个值
      const temp = A[i];
      A[i] = A[odd];
      A[odd] = temp;
    }
  }
  return A;
};
```
