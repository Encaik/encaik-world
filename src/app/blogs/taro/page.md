# Taro 多端统一小程序框架体验

![banner](/images/blogs/blog/taro.png)

## 环境配置

1. Node.js

2. Taro.js

   在命令行通过 npm 命令安装 taro：

   ```sh
   npm i -g @tarojs/cli
   ```

   安装完成后在命令行输入命令查看信息，如果返回 taro 的信息，则证明安装成功：

   ```sh
   taro -V
   Taro v3.0.6
   ```

## 创建项目

命令行输入命令创建新项目：

```sh
taro init
```

拉取模板后，需要选择喜好风格：

```sh
√ 拉取远程模板仓库成功！
? 请输入项目名称!
? 请输入项目介绍!
? 请选择框架
? 是否需要使用 TypeScript ？
? 请选择 CSS 预处理器（Sass/Less/Stylus）
? 请选择模板
```

当看到以下内容时，证明项目已经创建完成：

```sh
创建项目 taro-learn 成功！
请进入项目目录 taro-learn 开始工作吧！�
```

打开文件夹后可以看到项目已经默认创建了本地仓库，并安装了依赖。

## 项目结构

```sh
project
  ├─📁config
  │ ├─📝dev.js              # 开发模式配置
  │ ├─📝index.js            # 默认配置
  │ └─📝prod.js             # 生产模式配置
  ├─📁node_modules
  ├─📁src
  │ ├─📝app.config.js       # 全局配置
  │ ├─📝app.css             # 全局 CSS(根据css预编译器的不同，文件后缀不同)
  │ ├─📝app.js              # 入口组件
  │ ├─📝index.html          # H5 入口 HTML
  │ └─📁pages               # 页面组件
  │   └─📁index
  │     ├─📝index.config.js # 页面配置
  │     ├─📝index.css       # 页面 CSS
  │     └─📝index.jsx       # 页面组件，如果是 Vue 项目，此文件为 index.vue
  ├─📝.editorconfig
  ├─📝.eslintrc
  ├─📝.gitignore
  ├─📝.npmrc
  ├─📝babel.config.js
  ├─📝global.d.ts
  ├─📝package.json
  ├─📝package-lock.json
  ├─📝project.config.json
  └─📝tsconfig.json
```

实际根据创建项目时选择的框架、语言、编译器的区别，文件、后缀等位置也会有一些不同。

## 运行项目

在 npm 脚本中已经提供了多种运行方式，分别对应不同的平台

```js
"dev:weapp": "npm run build:weapp -- --watch",
"dev:swan": "npm run build:swan -- --watch",
"dev:alipay": "npm run build:alipay -- --watch",
"dev:tt": "npm run build:tt -- --watch",
"dev:h5": "npm run build:h5 -- --watch",
"dev:rn": "npm run build:rn -- --watch",
"dev:qq": "npm run build:qq -- --watch",
"dev:jd": "npm run build:jd -- --watch",
"dev:quickapp": "npm run build:quickapp -- --watch"
```

运行 dev:h5，完成后将弹出页面，一个 taro 项目就创建成功了。

<Valine></Valine>
