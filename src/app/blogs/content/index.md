# 前端工程化项目构建流程及基本结构

![banner](/images/blogs/blog/index.png)

## 环境准备

::: warning 注意
当前文档问 WebpackV4 版本使用方法，在 V5 使用需要进行迁移。

1. 插件语法变更

   ```js
   plugins: [
     new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin()
   ];
   //变为
   optimization: {
     moduleIds: "named",
   },
   ```

2. mode 必须设置

   ```js
   mode: "development",
   ```

3. 服务启动命令变更

   ```sh
   webpack-dev-server --open
   //变为
   webpack serve
   // open在devserver中加入open字段
   ```

:::

开发前确保已经安装好了 Node.js 的最新 LTS（长期支持）版本，否则请下载安装或更新。

## 创建 Node.js 项目

先通过下面的命令初始化 node 项目，新建 package.json 文件用来管理包。

```sh
npm init [-y]

```

如果在后面跟上`-y`的意义是每项问题都选择回车默认。如果不加则有以下问题,括号内为回车默认填写内容。

```sh
package name: ([文件夹名])
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
[此处展示根据前面的选项生成的package.json的内容]
Is this OK? (yes)
```

## 使用 Webpack 模块化打包

### 初步使用 webpack

项目中的文件可以选择分文件形式，也可以选择压缩打包为单文件形式，打包工具选择目前主流的 webpack。先通过下面的命令安装 webpack 包。

```sh
npm install webpack webpack-cli --save-dev
```

然后创建一个打包项目的文件结构,即 dist/index.html 文件与 src/index.js 文件。并在 package.json 文件中做一些调整，以便确保我们安装包是私有的(private)，并且移除 main 入口。这可以防止意外发布代码。

```json
+   "private": true,
-   "main": "index.js",
```

执行打包命令，webpack 会根据默认配置将 src 中的 js 文件打包为一个 js 放入 dist，dist 中的 html 只需要引用这个 js 即可。

```sh
npx webpack
```

对于更复杂的配置需求，可以新建 webpack.config.js 文件用来管理 webpack 的自定义配置。

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

为了让打包不需要每次都手动输入命令，可以再 package.json 中添加 npm 脚本。

```json
"scripts": {
  "build": "webpack"
},
```

### 使用 source map 定位错误

在开发中，如果出现错误，控制台只能找到打包文件的出错位置，不能找到打包前模块文件的错误位置。因此需要使用 source map 来定位错误。

```js
module.exports = {
  devtool: "inline-source-map"
};
```

在配置中添加 inline-source-map，就可以启用 source map。

### 使用观察模式即时打包

观察模式是对代码进行观察，如果发现代码有变化则立即打包，而不用每次更改都运行命令手动打包。观察模式是 webpack 命令的配置，可以通过命令启用。

```json
"scripts": {
  "watch": "webpack --watch",
},
```

### 使用 webpack-dev-server 启动本地服务

观察模式虽然方便，但是仍然需要每次都刷新页面才可以更新代码，如果想要让项目有可以自动刷新的本地服务器，则需要配置 webpack-dev-server,首先安装包。

```sh
npm install --save-dev webpack-dev-server
```

然后修改 webpack.config.js 文件启用 webpack-dev-server。

```js
module.exports = {
  devServer: {
    contentBase: "./dist"
  }
};
```

此配置将使项目在默认的 8080 端口开启服务，并在当前目录的 dist 下寻找可访问的页面。开启服务也有对应的命令可以使用。

```json
"scripts": {
  "start": "webpack-dev-server --open",
},
```

启动服务后，打开页面修改代码保存，页面将自动刷新。

### 启用 HMR 进行开发

当项目结构逐渐复杂，每次保存代码都重新编译就会很浪费时间。这时候可以使用热重载，即在项目运行的状态下，替换部分更改的模块，而不需要重新编译整个项目，这样可以大大提高效率。HMR 功能是 webpack-dev-server 包的内容，因此只需要对配置文件进行修改即可。

```js
const webpack = require("webpack");

module.exports = {
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

### 使用 HtmlWebpackPlugin 生成 html 模板

为了方便不再修改 html 文件，可以安装插件让打包的 js 自动插入到 生成的 html 文件里。想要达成这个目的，可以使用 html-webpack-plugin 插件。

```sh
npm install --save-dev html-webpack-plugin
```

下载好后修改 webpack 配置文件启用 html 模板功能。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin({
    title: 'Output Management'
  })
],
```

### 使用 clean-webpack-plugin 清理 dist 目录

有时候会把旧的文件遗留在打包目录内，但是我们并不需要。因此我们可以使用 clean-webpack-plugin 插件在每次打包前清空 dist 目录。

```sh
npm install clean-webpack-plugin --save-dev
```

安装完成以后再 webpack 配置文件做以下修改：

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
  new CleanWebpackPlugin(),
],
```

### 使用 babel-loader 转译 ES6 及更新版本代码

```sh
npm install -D babel-loader @babel/core @babel/preset-env
```

首先在 webpack 中加入 babel-loader 使 babel 生效。

```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    }
  ];
}
```

由于 babel 默认只转换 ES6 新语法，不转换新的 API，如：Set、Map、Promise 等，所以需要安装其他模块转换新 API。有两个模块可以完成此功能。分别是`@babel/polyfill`和`@babel/plugin-transform-runtime`。

其中，polyfill 常用于项目中，因为该模块会在全局添加方法实现 Api；而 plugin-transform-runtime 常用于库中，因为该模块只会在局部添加方法实现 Api，不会影响全局环境。

- @babel/polyfill

```sh
npm install --save @babel/polyfill
```

修改 webpack 配置文件启用模块，在配置文件中设置：

```js
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"]
};
```

- @babel/plugin-transform-runtime

```sh
npm install --save @babel/runtime
npm install --save-dev @babel/plugin-transform-runtime
```

修改 babel 配置文件，启用插件：

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false
      }
    ]
  ]
}
```

### 通过 loader 加载 CSS

目前项目主要都是由 js 完成，但是网页中，css 是不可能不用的。在 webpack 中使用非 js 的模块化文件，都需要先使用 loader 去加载。先安装 CSS 的加载模块。

```sh
npm install --save-dev style-loader css-loader
```

安装完成后，在 webpack 的配置文件里，模块-规则一栏，添加对.css 后缀文件的加载器，这样 webpack 就可以认出模块化的 css 文件该如何去处理了。

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
  ];
}
```

### 通过 file-loader 加载图片

如果在文件中使用图片，相对路径将会以文本形式存在，这将导致我们需要将图片等资源，手动移动到打包后的目录，这和工程化的思想不符合，所以我们需要模块化图片，让图片一起打包。首先安装文件加载模块。

```sh
npm install --save-dev file-loader
```

加载完成后，对.png、.svg、.jpg、.gif 后缀的图像文件进行处理，这些文件将参与打包。

```js
module: {
  rules: [
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ["file-loader"]
    }
  ];
}
```

### 通过别名配置引用资源

如果不想通过 loader 的方式加载资源文件，webpack 也可以通过别名的方式，将某个路径规定一个别名，import 这个别名规定路径里的文件，将参与打包。

```js
resolve: {
  alias: {
    public: path.resolve(__dirname, "public/"),
  },
},
```

## 使用 ESlint 检查代码格式

```sh
npm i -D eslint eslint-loader eslint-friendly-formatter
```

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        {
          loader: "eslint-loader"
        }
      ],
      enforce: "pre", // 编译前检查
      exclude: /node_modules/, // 不检测的文件
      include: [path.resolve(__dirname, "src")], // 指定检查的目录
      options: {
        // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
        formatter: require("eslint-friendly-formatter") // 指定错误报告的格式规范
      }
    }
  ];
}
```

```json
{
  "root": true,
  "parserOptions": {
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "linebreak-style": [0, "error", "windows"],
    "indent": ["error", 4]
  }
}
```

## 引入框架开发（可选，使用命令行工具可代替上面步骤）

[vue](https://cn.vuejs.org/)

[react](https://zh-hans.reactjs.org/)

[angular](https://angular.cn/)

## 创建 Git 仓库并上传（可选）

首先创建本地仓库，创建完成后将所有文件（如果有需要忽略的文件则添加.gitignore 文件）添加到本地仓库

```sh
git init
git add .
```

然后创建空的远程仓库，创建完成后会取得远程仓库的 http 或 ssh 链接，将此链接设为远程推送仓库

```sh
git remote add origin [branch(为空时默认为master)] [url]
```

设置完成后，将本地仓库的内容推送到远程仓库

```sh
git push
```

<Valine></Valine>
