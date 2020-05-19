# leetcode94:[二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

## 题目描述

![leetcode94](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode94_inorderTraversal.png)

## 梳理思路

递归法很简单，这里使用迭代法

- 迭代法本质上也是利用栈来模拟出入栈的过程
- 先将根节点入栈，然后左节点入栈，直到左下角的叶子节点
- 然后左节点出栈，然后该节点出栈，然后右节点出栈

```javascript
var inorderTraversal = function (root) {
  const stack = [];
  const result = [];
  let current = root;
  while (current || stack.length > 0) {
    // 根节点入栈，然后左节点入栈，直到叶子节点
    while (current) {
      stack.push(current);
      current = current.left;
    }
    // 然后开始出栈，最先出栈的是左下角的叶子节点，然后是该节点出栈，然后是右节点出栈
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;
};
```
