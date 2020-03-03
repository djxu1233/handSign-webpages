// const path = require("path");

module.exports = {
  title: "手写签批",
  description: "手写签批",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "img", href: "/img/icon-40.png" }] // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/handSign-webpages/", // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },

  dest: "./docs/.vuepress/dist",
  ga: "",
  evergreen: true,
  // palette: path.resolve(__dirname, "palette.styl"),

  themeConfig: {
    logo: "/img/icon-40.png",
    nav: [
      // 导航栏配置
      { text: "首页", link: "/" },
      { text: "概述", link: "/overView/" },
      { text: "集成文档", link: "/integrationDoc/" },
      { text: "开发工具", link: "/developmentTool/" }
    ],
    sidebar: [
      // 侧边栏配置
      {
        title: "概述", // 必要的
        // path: "/overView/", // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ["/overView/"]
        // children: [
        //   {
        //     title: "iOS", // 必要的
        //     // path: "./overView/iOS/README.md", // 可选的, 应该是一个绝对路径
        //     collapsable: false, // 可选的, 默认值是 true,
        //     sidebarDepth: 1, // 可选的, 默认值是 1
        //     children: ["/"]
        //   }
        // ]
      },
      {
        title: "集成文档", // 必要的
        // path: "/iOS/", // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: ["/integrationDoc/"]
      },
      {
        title: "开发工具", // 必要的
        // path: "/iOS/", // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: ["/developmentTool/"]
      }
    ],

    sidebar: "auto" // 侧边栏配置
    // sidebarDepth: 2 // 侧边栏显示2级
  }
};
