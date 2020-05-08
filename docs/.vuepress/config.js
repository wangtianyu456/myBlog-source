const path = require("path");
// const generateSidebarConfig = require("../../helper/generateSidebarConfig");
const generateSidebarConfig = require("vuepress-generatesidebar");
const pagesDirPath = path.join(__dirname, "../pages");
const exclude = [".DS_Store", "assets"];
const sidebarConfig = generateSidebarConfig(pagesDirPath, exclude, {});
module.exports = {
  title: "Blog",
  description: "前端博客,javascript,vue,webpack",
  head: [
    ["link", { rel: "icon", href: "./public/mountain.jpg" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      },
    ],
    [("meta", { name: "baidu-site-verification", content: "4WnagnHyTT" })],
  ],
  base: "/",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    // logo: "./public/img/mountain.jpg",
    lastUpdated: "Last Updated",
    nav: [
      { text: "首页", link: "/" },
      { text: "js原理系列", link: "/pages/javascript/" },
      {
        text: "Vue",
        ariaLabel: "vue",
        items: [
          { text: "Vue进阶", link: "/pages/vue/进阶/" },
          { text: "Vue原理系列", link: "/pages/vue/原理系列/" },
        ],
      },
      { text: "leetcode", link: "/pages/leetcode/" },
      { text: "其他", link: "/pages/其他/" },
      // { text: "Vue原理系列", link: "/pages/vue/" },
      //格式三：跳转至外部网页，需http/https前缀
      { text: "Github", link: "https://github.com/wangtianyu456" },
    ],
    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    // sidebar: {
    //   "/pages/javascript/": [
    //     {
    //       title: "js原理系列", // 一级菜单名称
    //       collapsable: false, // false为默认展开菜单, 默认值true是折叠,
    //       sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
    //       children: [
    //         ["实现instanceof.md", "实现instanceof"], //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
    //         ["实现new.md", "实现new"],
    //         ["防抖与节流.md", "防抖与节流"],
    //         ["数组拍平.md", "数组拍平"],
    //         ["原型链.md", "原型链"],
    //         ["call、apply、bind解析.md", "call、apply、bind解析"],
    //       ],
    //     },
    //   ],
    //   "/pages/vue/原理系列/": [
    //     {
    //       title: "Vue原理系列",
    //       collapsable: false,
    //       children: [["手写实现MVVM原理.md", "手写实现MVVM原理"]],
    //     },
    //   ],
    //   "/pages/vue/进阶/": [
    //     {
    //       title: "Vue进阶",
    //       collapsable: false,
    //       children: [["组件封装-Modal组件.md", "组件封装-Modal组件"]],
    //     },
    //   ],

    //   //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    // },
    sidebar: sidebarConfig,
  },
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-153554262-1", //你的Google Analytics ID
      },
    ],
    "@vuepress/nprogress",
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
  ],
};
