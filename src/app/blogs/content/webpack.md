# 分析 webpack 源码，理解原理

## 分析

惯例，把源代码回退到初始化版本，查看代码理念。可以看到项目结构如下：

```sh
webpack
├─/bin
│  └─webpack.js
├─/examples
├─/lib
│  ├─buildDeps.js
│  ├─parse.js
│  ├─resolve.js
│  ├─templateAsync.js
│  ├─templateSingle.js
│  ├─webpack.js
│  ├─writeChunk.js
│  └─writeSource.js
├─/test
├─.gitignore
├─package.json
├─README.md
├─require-polyfill.js
└─require-polyfill.web.js
```

然后从 package.json 中可以看到`"bin": "./bin/webpack.js",`，代表 webpack 的 cli 在这里，而`"main": "lib/webpack.js",`这应则是主要入口。

我们先从 cli 入手，根据使用方法来分析 webpack 的原理。

## cli

先安装此包，查看用法:

```sh
npm install . -g
+ webpack@0.1.0
```

在命令行中输入命令 webpack：

```sh
Usage: C:\\...\\nodejs\\node.exe C:\\...\\webpack\\bin\\webpack.js <input> <output>
Options:
  --single             Disable Code Splitting                 [boolean]  [default: false]
  --min                Minimize it with uglifyjs              [boolean]  [default: false]
  --filenames          Output Filenames Into File             [boolean]  [default: false]
  --options            Options JSON File                      [string]
  --script-src-prefix  Path Prefix For JavaScript Loading     [string]
  --libary             Stores the exports into this variable  [string]

Not enough non-option arguments: got 0, need at least 1
```

可以看到，webpack 显示出了 node 的位置，以及本地 cli 文件的位置，至少需要一个必需的参数 input。

下方的 options 分别为一下用途：

| 选项              | 描述                      | 类型    | 默认值   |
| ----------------- | ------------------------- | ------- | -------- |
| single            | 禁用代码拆分              | boolean | 默认关闭 |
| min               | 用 uglifyjs 最小化        | boolean | 默认关闭 |
| filenames         | 将文件名输出到文件中      | boolean | 默认关闭 |
| options           | 选项 JSON 文件            | string  |          |
| script-src-prefix | JavaScript 加载的路径前缀 | string  |          |
| libary            | 将导出存储到此变量中      | string  |          |

打开 bin 中的 webpack.js 查看：

```js
var argv = require("optimist")
  .usage("Usage: $0 <input> <output>")
  .boolean("single")
  .describe("single", "Disable Code Splitting")
  .default("single", false)
  .boolean("min")
  .describe("min", "Minimize it with uglifyjs")
  .default("min", false)
  .boolean("filenames")
  .describe("filenames", "Output Filenames Into File")
  .default("filenames", false)
  .string("options")
  .describe("options", "Options JSON File")
  .string("script-src-prefix")
  .describe("script-src-prefix", "Path Prefix For JavaScript Loading")
  .string("libary")
  .describe("libary", "Stores the exports into this variable")
  .demand(1).argv;
```

这里就是对命令参数的要求，即表格中的内容。

```js
var input = argv._[0],
  output = argv._[1];
if (input && input[0] !== "/" && input[1] !== ":") {
  input = path.join(process.cwd(), input);
}
if (output && output[0] !== "/" && input[1] !== ":") {
  output = path.join(process.cwd(), output);
}
```

输入参数以后，会和当前 node 项目的根目录拼接，相当于是制定一个入口文件，以及一个出口文件。最少只要 input 参数，说明出口文件有默认位置。

```js
var options = {};
if (argv.options) {
  options = JSON.parse(fs.readFileSync(argv.options, "utf-8"));
}
if (argv["script-src-prefix"]) {
  options.scriptSrcPrefix = argv["script-src-prefix"];
}
if (argv.min) {
  options.minimize = true;
}
if (argv.filenames) {
  options.includeFilenames = true;
}
if (argv.libary) {
  options.libary = argv.libary;
}
```

这里是对选项参数进行剖析，存在 options 对象里。

```js
var webpack = require("../lib/webpack.js");
if (argv.single) {
  //...
} else {
  //...
}
```

这里引入了 webpack 源文件，然后根据 single 选项分为了两种情况，下面对两种情况分别分析，根据选项含义，首先是禁用了代码拆分的情况：

```js
webpack(input, options, function(err, source) {
  if (err) {
    console.error(err);
    return;
  }
  if (output) {
    fs.writeFileSync(output, source, "utf-8");
  } else {
    process.stdout.write(source);
  }
});
```

这里直接调用了 webpack 方法，传入了 input 和 options，然后有一个回调，其中发生错误将直接打印，执行完成后判断有没有出口文件，如果存在就直接写入，如果不存在就输入一个 source，这里大概是默认的输出位置。

```js
output = output || path.join(process.cwd(), "js", "web.js");
if (!options.outputDirectory) options.outputDirectory = path.dirname(output);
if (!options.output) options.output = path.basename(output);
if (!options.outputPostfix) options.outputPostfix = "." + path.basename(output);
var outExists = path.existsSync(options.outputDirectory);
if (!outExists) fs.mkdirSync(options.outputDirectory);
webpack(input, options, function(err, stats) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats);
});
```

这里是启用代码拆分的情况，先对出口做了定义，如果存在就使用，不存在就输出到./js/web.js。之后开始判断在 options 中有没有对出口文件夹，出口文件名，以及出口文件后缀。然后判断这个出口文件夹是否存在，不存在就创建一个。然后调用 webpack，回调变成了输出一个状态。

> 这里有一个问题，existsSync 方法是 fs 模块的内容，这里写成了 path，因此在这里会报错，改过来就好了。

## lib

从上面看出，主要的内容围绕在 webpack 方法，这个方法在引入的./lib/webpack.js 文件中，整体结构如下（这里对所有方法进行了简化处理，之后再详细分析）：

```js
var buildDeps = require("./buildDeps");
var path = require("path");
var writeChunk = require("./writeChunk");
var fs = require("fs");

var templateAsync = require("fs").readFileSync(
  path.join(__dirname, "templateAsync.js")
);
var templateSingle = require("fs").readFileSync(
  path.join(__dirname, "templateSingle.js")
);

/**
 * ...
 */

module.exports = function(context, moduleName, options, callback) {
  //...
};

function uglify(input, filename) {
  //...
}

function stringify(str) {
  //...
}
```

可以看到，这里的核心都在导出的方法上，分析先从导出模块开始。

```js
if (typeof moduleName === "object") {
  callback = options;
  options = moduleName;
  moduleName = "./" + path.basename(context);
  context = path.dirname(context);
}
if (typeof moduleName === "function") {
  callback = moduleName;
  options = {};
  moduleName = "./" + path.basename(context);
  context = path.dirname(context);
}
if (!callback) {
  callback = options;
  options = {};
}
```

<Valine></Valine>
