# 从头开始学习Vue2源码

## 准备

首先，从Github克隆Vue的源码。

``` sh
git clone git@github.com:vuejs/vue.git
```

然后，打开文件夹，并将版本切换到vue最早创建的init版本。

``` sh
git checkout a879ec06ef9504db8df2a19aac0d07609fe36131
```

此时文件夹中就是vue最开始的源码，结构比现在简单了很多：

``` sh
VueProject
    ├─build
    │   └─build.js
    ├─src
    │   ├─compiler
    │   ├─instance
    │   ├─observer
    │   ├─util
    │   ├─vdom
    │   ├─config.js
    │   ├─index.js
    │   └─index.umd.js      // Webpack入口文件
    ├─.babelrc              // Babel配置文件
    ├─package-lock.json     // npm包管理文件
    ├─package.json          // npm配置文件
    └─webpack.config.js     // Webpack配置文件
```

除了这些常用熟悉的文件外，其他文件逐个分析。

## package.json

``` json
"scripts": {
    "dev": "webpack --watch",
    "test": "mocha",
    "build": "NODE_ENV=production node build/build.js"
  },
```

### dev

这是webpack观察者模式启动项目的命令，目的是修改项目后不用每次都打包，缺点是需要手动刷新浏览器。

### test

未找到相关配置，直接运行报错，应该是需要有全局mocha配置。之后细看。

### build

修改环境变量为生产环境并打包项目。运行此命令后产生dist文件夹，里面是打包好的vue.js文件。

## webpack.config.js

``` js
var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.umd.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue.js',
    library: 'Vue',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
}
```

入口文件为index.umd.js，输出目录为dist/vue.js，库名称为Vue，库类型为umd。

下面为配置babel处理除了node_modules文件夹中的其他js文件。

## .babelrc

``` json
{
  "env": {
    "development": {
      "presets": ["es2015", "stage-2"]
    },
    "production": {
      "presets": ["es2015-rollup", "stage-2"]
    }
  }
}
```

设置了两个环境不同的规则，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development。

其中开发环境下配置预设转换为es2015，模式为stage-2，是不同阶段出现的es语法，包含不同的转码插件。

stage-2：

除了覆盖stage-3的所有功能，还支持如下两个插件：

- syntax-trailing-function-commas
- transform-object-reset-spread

而在生产环境则用了es2015-rollup，这是前端模块打包工具，可以让bundle文件最小化，避免引入冗余模块代码，有效减少文件请求大小。

## instance(实例)

先选择这个文件夹是因为这是入口文件导向的第一个文件夹。index.umd.js只是引入indes.js文件，而index.js文件则引入instance文件夹中的index.js文件。

``` js
import { compile } from '../compiler/index'
import { observe } from '../observer/index'
import Watcher from '../observer/watcher'
import { h, patch } from '../vdom/index'
import { nextTick, isReserved, getOuterHTML } from '../util/index'
```

从开头就可以看到这个文件已经引入了其他所有文件夹的入口文件。

``` js
export default class Component {}

Component.prototype.__h__ = h
Component.nextTick = nextTick
```

该文件声明了一个Component类并且暴露接口。

添加了名为__h__的属性，该属性的值由vdom入口文件导出。

给名为nextTick的属性赋值为nextTick，该值由util入口文件导出。

``` js
/* 源代码 */
constructor (options) {
    this.$options = options
    this._data = options.data
    const el = this._el = document.querySelector(options.el)
    const render = compile(getOuterHTML(el))
    this._el.innerHTML = ''
    Object.keys(options.data).forEach(key => this._proxy(key))
    if (options.methods) {
      Object.keys(options.methods).forEach(key => {
        this[key] = options.methods[key].bind(this)
      })
    }
    this._ob = observe(options.data)
    this._watchers = []
    this._watcher = new Watcher(this, render, this._update)
    this._update(this._watcher.value)
  }
  /* Vue实例 */
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })
  ```

对比中可以看到实例花括号中的内容被构造函数拆解，其中`this.$options = options`把参数对象赋值给了$options。

`this._data = options.data`把data对象赋值给了私有变量_data。

`const el = this._el = document.querySelector(options.el)`把dom中绑定Vue实例元素的标签同时赋值给了私有变量_el和静态常量el。

`const render = compile(getOuterHTML(el))`调用compile方法，并把返回值赋给了render。

`this._el.innerHTML = ''`把绑定Vue元素的标签内部清空。

`Object.keys(options.data).forEach(key => this._proxy(key))`把data中的参数遍历调用了_proxy方法。

::: tip 注意

遍历对象有两种方法：

- `Object.keys(obj).forEach((key)=>{})`

此方法只会循环遍历对象中可遍历的属性，而不去搜索原型链。

- `for(let i in obj)`

此方法会搜索原型链并遍历所有属性。因此一般`for···in···`都需要一个`hasOwnProperty`方法来判断便利出的是不是本身的属性。

:::

``` js
if (options.methods) {
  Object.keys(options.methods).forEach(key => {
    this[key] = options.methods[key].bind(this)
  })
}
/* 这一段则是判断vue实例中是否含存在methods对象，如果存在则遍历并绑定this作用域后赋值给实例作为属性。 */
```

`this._ob = observe(options.data)`把私有变量_ob赋值为方法observe的返回值，该方法参数为data对象。

`this._watchers = []`设置私有变量watchers数组为空。

`this._watcher = new Watcher(this, render, this._update)`设置私有变量watcher为Watcher类的实例，参数为vue实例，render和_update方法。

`this._update(this._watcher.value)`调用私有方法_update，参数为_watcher.value。

构造函数结束，可以看出构造函数是在初始化vue实例，解析实例中的数据。

接下来自己动手试试，首先创建了vue.js当作源码，然后创建main.js当作实例。

``` js
/* vue.js */
class Vue {
  constructor(params) {
    const el = this._el = params.el;
    this._data = params.data;
  }
}

module.exports = Vue;

/* main.js */
var Vue = require('./vue.js');

var app = new Vue({
  el: "#app",
  data: {
    name: "enciak"
  }
});

console.log(app._el);
```

运行`node main.js`后得到结果#app，说明没有问题。

继续往下需要解析html文件，所以修改文件目录分离vue实例和网页，然后在vue实例中创建node项目并配置webpack等相关文件。

首先初始化node项目:`npm i -y`

然后安装webpack，babel等依赖:

``` sh
npm install webpack webpack-cli --save-dev
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
npm install --save-dev babel-loader
```

创建webpack.config.js，因为版本原因，所以需要修改配置文件结构及属性，最终配置文件如下：

``` js
var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

创建.babelrc文件，内容如下：

``` js
{
  "presets": ["@babel/preset-env"]
}
```

最终文件目录结构如下：

``` sh
VueProject
    ├─dist
    │   └─vue.js
    ├─src
    │   └─index.js
    ├─.babelrc
    ├─package-lock.json
    ├─package.json
    └─webpack.config.js
VueHtmlProject
    ├─src
    │   └─index.js
    ├─index.html
    ├─package-lock.json
    ├─package.json
    └─webpack.config.js
```

::: tip 注意

在后续使用中发现，index.umd.js是为了让vue以umd模块的形式导出，这样做可以让webpack直接使用，如果以ES6的形式导出，在导入vue时会报错。

:::

然后在index.html中通过文件引入的方式引入vue.js，并创建实例。在浏览器中打开index.html，控制台中输出了#app的标签，说明没有问题拿到了标签，下一步分析html解析。

## compiler

### index

在vue源码中，构造函数通过`const render = compile(getOuterHTML(el))`拿到了标签，解析并返回了渲染内容。所以打开compiler目录查看结构:

``` sh
compiler
    ├─codegen.js
    ├─html-parser.js
    ├─index.js
    └─text-parser.js
```

先查看index.js文件的内容:

``` js
import { parse } from './html-parser'
import { generate } from './codegen'

const cache = Object.create(null)

export function compile (html) {
  html = html.trim()
  const hit = cache[html]
  return hit || (cache[html] = generate(parse(html)))
}
```

可以看到首先引入了同目录下另外两个文件，然后创建了一个新的对象赋值给cache。

::: tip 注意

创建一个空对象有以下三个方法：

- {}

``` js
> var a = {};
< undefined
> a.isPrototypeOf
< ƒ isPrototypeOf() { [native code] }
```

- Object.create(null)

``` js
> var b = Object.create(null);
< undefined
> b.isPrototypeOf
< undefined
```

- new Object()

``` js
> var c = new Object();
< undefined
> c.isPrototypeOf
< ƒ isPrototypeOf() { [native code] }
```

根据对比可以明显看出来，`Object.create(null)`创建的是一个绝对空白的对象，甚至都没有构造函数，toString、hasOwnProperty属性。

:::

然后创建方法compile并导出，参数名为html，根据之前的代码知道这里是挂载vue实例的标签。

实例调用compile，并传参`getOuterHTML(el)`，此方法由util文件夹中的index导出，方法返回该标签及其子标签的字符串。

在compile中定义html，赋值为传参字符串去掉空白字符。

`const hit = cache[html]`中，cache应该没有html属性，因此赋值后hit为undefined。

`return hit || (cache[html] = generate(parse(html)))`返回hit或cache[html]，后者则是通过generate方法生成，该方法由同目录下的codegen文件导出。传参则是html调用parse方法，该方法由同目录下的html-parse文件导出。

### html-parser

#### parse

找到方法后通过注释可以知道这个方法把html解析为了AST。parse方法内部定义了root，currentParent,stack三个变量，然后调用了HTMLParser方法，并传入参数html和一个对象，最后则返回root。

#### HTMLParser

HTMLParser方法接受了两个参数，一个是html，另一个是handler对象。其中handler作为参数调用了attrForHandler方法。

#### attrForHandler

从文件中找到了该方法，内容如下：

``` js
function attrForHandler(handler) {
  var pattern = singleAttrIdentifier.source +
                '(?:\\s*(' + joinSingleAttrAssigns(handler) + ')' +
                '\\s*(?:' + singleAttrValues.join('|') + '))?'
  return new RegExp('^\\s*' + pattern)
}
```

可以看到该方法又将handler作为参数调用了joinSingleAttrAssigns方法。拿到方法返回的正则匹配范围后，可以看到还需要转换两个属性，singleAttrIdentifier.source即([^\s"'<>\/=]+)，singleAttrValues.join('|')即"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)。

最后pattren的值是([^\s"'<>\/=]+)(?:\s*((?:=))\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?，然后新建一个RegExp对象，参数为^\s*([^\s"'<>\/=]+)(?:\s*((?:=))\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?。

#### joinSingleAttrAssigns

``` js
function joinSingleAttrAssigns(handler) {
  return singleAttrAssigns.map(function(assign) {
    return '(?:' + assign.source + ')'
  }).join('|')
}
```

该方法拿到handler后并未使用，而是用map处理了singleAttrAssigns数组。`singleAttrAssigns = [singleAttrAssign]`根据定义看到数组中只有一个值为singleAttrAssign，`singleAttrAssign = /=/`查看定义得知这是匹配`=`的正则表达式。

因此map最终返回的应该是一个字符串`'(?:=)'`，然后处理了joinSingleAttrAssigns返回一个正则匹配范围`'(?:=)'`。

### codegen

进入codegen文件可以看到有各种方法解析AST，并最终返回一个方法，内容为返回解析后的代码。

## util

### index

调用compile需要用到getOuterHTML方法，所以打开index文件查看方法来源。

``` js
export * from './lang'
export * from './env'
export * from './dom'
export * from './options'
export * from './component'
export * from './debug'
export { defineReactive } from '../observer/index'

```

从名称中可以看出各文件大概的作用，进入dom文件查看是否存在该方法。

### dom

#### outerHTML

在我末尾找到了该方法，内容如下：

``` js
/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 *
 * @param {Element} el
 * @return {String}
 */

export function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}
```

该方法是为了获取vue挂载的标签本身及内容，因为outerHTML只支持IE浏览器，为了兼容性需要做处理。如果存在outerHTML则返回该标签，如果不存在则创建div并复制节点及其子节点到div下，返回该div的innerHTML。

## observer(观察者)

## vdom

<Valine></Valine>
