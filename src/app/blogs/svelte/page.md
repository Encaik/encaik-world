# 初试 svelte 前端开发

## 简介

svelte 是新兴的轻量型框架，与三大框架一样是为了让页面构建变得简单，但是 svelte 最大的特点是在编译打包的时候输出完全与框架无关的代码，减少了加载应用时为框架消耗的资源。

## 安装

degit 是一个用于从 git repos 中存储的模板创建项目的工具。

```sh
npm install -g degit
```

然后您可以使用它来启动一个新项目：

```sh
degit sveltejs/template my-new-project
cd my-new-project
npm install
npm run dev
```

您可以使用任何喜欢的 git repo-这些是“官方”模板：

- sveltejs / template —这是从 REPL 下载获得的
- sveltejs / template-webpack-类似，但是使用 webpack 而不是 Rollup

> svelte 提供了命令行工具，但官方不建议用于生产

## 使用

### 入口 main.js

```js
import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "world"
  }
});

export default app;
```
