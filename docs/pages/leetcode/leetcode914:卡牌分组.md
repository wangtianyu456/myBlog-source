# leetcode914:[卡牌分组](https://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards/)

## 题目描述

![leetcode914](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode914_hasGroupsSizeX.png)

## 梳理思路

先找出数组中各项的出现次数，然后将各项的次数转为数组

- 这时我们再去看数组中各项是否还有最大公约数
  - 如果有最大公约数且大于等于 2(题目要求)，就说明满足条件
  - 如果最大公约数是 1，那么就不满足条件

```javascript
/**
 * @param {number[]} deck
 * @return {boolean}
 */
const hasGroupsSizeX = function (deck) {
  if (deck.length <= 1) return false;
  const map = {};
  for (let i = 0; i < deck.length; i++) {
    const element = deck[i];
    if (map[element]) {
      map[element] += 1;
    } else {
      map[element] = 1;
    }
  }
  // 出现的次数的数组，去出现次数的最大公约数即可
  const arr = Object.values(map);
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    max = gcd(max, arr[i]);
  }
  console.log(max);
  return max >= 2;
};

/**
 * 最大公约数
 *
 * - 求解最大公约数的方法是，两个值去做递归的除法
 * - 如 36 和 27 的最大公约数的求解过程为
 *  - 36/27 = 1 (余9) --  36%27 = 9
 *  - 接下来我们继续计算 27/9 = 3 (余数为0) -- 27%9 = 0
 *  - 即取余的过程，当余数为0时，那么就说明找到了最大公约数
 *  - 那么就说明他们的最大公约数为9
 * @param {number} x 当前值
 * @param {number} y 当前的余数
 * @returns {Boolean}
 */
const gcd = (x, y) => {
  if (y === 0) {
    // 当余数为0了，那么就说明当前项为最大公约数
    return x;
  } else {
    // 当余数不为0的时候，我们要继续取当前的余数来做除法(取余)
    return gcd(y, x % y);
  }
};
```
