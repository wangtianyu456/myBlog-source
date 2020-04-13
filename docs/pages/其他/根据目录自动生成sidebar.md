# 根据目录自动生成 sidebar 配置

在以 vuepress 来写文档的时候，我们经常会需要在 pages 下新建目录，新建文件，然后到 config.js 下去配置当前的目录与文件，如果每次新增页面都这样来配置，未免太过于麻烦，因此写一个工具来根据 pages 文件下的目录和文件自动生成 sidebar 配置

::: warning 提醒
目前只支持 pages 目录下的文件，而且目前只能生成`sidebar`,`nav`暂时不能
:::

## 安装

```bash
yarn add vuepress-generatesidebar -D
```

## 使用

在`config.js`里

```javascript
// config.js
const generateSidebarConfig = require("vuepress-generatesidebar");

/**
 * generateSidebarConfig 接受三个参数
 * @param pagesDirPath 指的是pages目录的路径
 * @param exclude 指的是你要排除在外的目录名单
 * @param options 指的是你对sidebar中的其他额外配置，具体配置参照vuepress文档
 */

const pagesDirPath = path.join(__dirname, "../pages");

const exclude = [".DS_Store", "assets"];

const options = {
  collapsable: false,
};
const sidebarConfig = generateSidebarConfig(pagesDirPath, exclude);

module.exports = {
  title: "your-website",
  description: "website",
  base: "/",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    // ...
  },
  // ...
  sidebar: sidebrConfig,
};
```

## `sidebarConfig`的结构

最终生成的`sidebarConfig`的结构

```javascript
let sidebarConfig = {
  "/pages/javascript": [
    {
      title: "javascript",
      collapsable: false,
      children: [["javascript原型链.md", "javascript原型链"]],
    },
  ],
};
```
