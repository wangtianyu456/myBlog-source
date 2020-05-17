# leetcode144:[二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

## 题目描述

![leetcode144](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode144_preorderTraversal.png)

## 梳理思路

递归法很简单，这里使用迭代法

- 迭代法本质上也是利用栈来模拟出入栈的过程
- 先将根节点入栈，然后开始迭代
- 先将根节点出栈，然后入栈右节点，在入栈左节点(因为栈是先入后出)
- 然后出栈(左节点出栈，然后左节点的右节点入栈，左节点入栈)，直到叶节点

```javascript
var preorderTraversal = function (root) {
  const list = [];
  const stack = [];

  // 首先入栈的是root节点
  if (root) stack.push(root);
  while (stack.length > 0) {
    const curNode = stack.pop();
    // 首先访问的是根节点
    list.push(curNode.val);

    // 我们要先打印左子树，再打印右子树
    // 所以我们先入栈的顺序就是先右子树，再左子树(先入后出)
    if (curNode.right !== null) {
      stack.push(curNode.right);
    }
    if (curNode.left !== null) {
      stack.push(curNode.left);
    }
  }
  return list;
};
```
