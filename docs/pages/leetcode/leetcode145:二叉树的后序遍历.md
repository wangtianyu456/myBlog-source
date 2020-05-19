# leetcode145:[二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

## 题目描述

![leetcode145](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode145_postorderTraversal.png)

## 梳理思路

递归法很简单，这里使用迭代法

- 迭代法本质上也是利用栈来模拟出入栈的过程
- 先将根节点入栈，然后左节点入栈，直到左下角的叶子节点
- 然后将栈中最后一项取出来，判断是否有右节点，或者右节点是否被标记过
  - 如果没有右节点，那么直接将该节点出栈，并把该节点标记为已访问过
  - 如果还有右节点，那么就要把`current`设置为右节点，下次循环的时候，把该节点入栈，在重复执行(该节点出栈，标记为已访问)
  - 如果右节点被标记了已访问，那么就是说明，该根节点(子树)左节点和右节点都已经出栈了，那么就到该节点出栈了

```javascript
var postorderTraversal = function (root) {
  const stack = [];
  const result = [];
  let last = null; // 标记已访问的节点
  let current = root;
  while (current || stack.length > 0) {
    // 找到左下角
    while (current) {
      stack.push(current);
      current = current.left;
    }
    // 先取栈中的最后一项
    current = stack[stack.length - 1];
    // 判断当前项是否有右节点，或者它的右节点是否被访问过，被访问过了，那么就应该当前节点出栈
    if (!current.right || current.right === last) {
      // 没有右节点，那么就把当前项出栈
      current = stack.pop();
      result.push(current.val);
      // 并把当前项标记为已访问
      last = current;
      current = null;
    } else {
      // 有右节点，那么接着下次循环的时候，就会把这个右节点压入栈顶
      current = current.right;
    }
  }
  return result;
};
```
