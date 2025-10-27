# 学习 Electron 框架配合 Vue 制作桌面端应用

## 安装

### 模板

[electron-vue](https://github.com/SimulatedGREG/electron-vue)

### 运行

此时 node 版本高于 10 的话将会出现一个问题，报错如下：

```sh
Html Webpack Plugin:
  ReferenceError: process is not defined

  - index.ejs:11 eval
    [.]/[html-webpack-plugin]/lib/loader.js!./src/index.ejs:11:2

  - index.ejs:16 module.exports
    [.]/[html-webpack-plugin]/lib/loader.js!./src/index.ejs:16:3

  - index.js:284
    [electron-learn]/[html-webpack-plugin]/index.js:284:18

  - runMicrotasks

  - task_queues.js:97 processTicksAndRejections
    internal/process/task_queues.js:97:5
```

这个问题需要找到根目录下的`.electron-vue`文件夹，打开`webpack.renderer.config.js`文件，找到以下代码：

```js
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.ejs'),
    minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    },
    nodeModules: process.env.NODE_ENV !== 'production'
    ? path.resolve(__dirname, '../node_modules')
    : false
}),
```

替换为：

```js
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.ejs'),
    minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    },
    templateParameters(compilation, assets, options) {
        return {
            compilation: compilation,
            webpack: compilation.getStats().toJson(),
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
                files: assets,
                options: options
            },
            process,
        };
    },
    nodeModules: process.env.NODE_ENV !== 'production'
    ? path.resolve(__dirname, '../node_modules')
    : false
 }),
```

然后打开`webpack.web.config.js`文件，找到以下代码：

```js
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.ejs'),
    minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    },
    nodeModules: false
}),
```

替换为：

```js
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.ejs'),
    templateParameters(compilation, assets, options) {
    return {
        compilation: compilation,
        webpack: compilation.getStats().toJson(),
        webpackConfig: compilation.options,
        htmlWebpackPlugin: {
            files: assets,
            options: options
        },
        process,
    };
    },
    minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    },
    nodeModules: false
}),
```

然后再运行，就可以了。

<Valine></Valine>
