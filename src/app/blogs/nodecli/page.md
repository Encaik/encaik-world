# 自己做一个带 cli 的 npm 包发布

## 准备

首先安装好 node.js，新建一个文件夹，命名为 cli-learn，然后在文件夹中创建 npm 项目。

创建好以后分别创建 bin 目录存放 cli 代码和 src 目录存放源码，然后修改 package.json 里面的 main 为 src 中入口文件路径，bin 为 bin 中入口文件路径，结构及代码如下所示：

```sh
cli-learn
├─/bin
│ └─index.js
├─/src
│ └─index.js
└─package.json
```

```json
{
  "main": "./src/index.js",
  "bin": "./bin/index.js"
}
```

## 开发 cli 并获取参数

首先，cli 的核心是获取参数并作出相应的反应，那么首先要做的就是获取参数。node 的进程对象 process 里面，包含了这一内容，通过 argv 获取。`#!/usr/bin/env node`文件头加上这个，可以声明该文件运行于 node 环境中。

```js
#!/usr/bin/env node
let argvs = process.argv;
console.log(argvs);
```

假设我们已经有一个可以用的 cli，那么我们要在全局安装它。

```sh
npm install . -g
```

安装完成后使用`cli-learn`调用 cli，然后在后面加参数查看输出。

## 使用 optimist 更便捷的解析参数

自己动手解析参数肯定是充满了麻烦，那么我们可以使用已有的库来减少麻烦。

```sh
npm install optimist
```

安装好之后，把之前的代码替换为库方法。

```js
#!/usr/bin/env node
let argvs = require("optimist").argv;
console.log(argvs);
```

<Valine></Valine>
