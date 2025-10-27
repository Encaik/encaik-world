# 从头开始学习Vue3源码

## 准备

步骤和vue2源码分析相似，直接分析init时的目录结构：

``` sh
Vue3Project
    ├─.vscode
    │   └─settings.json
    ├─packages
    │   ├─core
    │   ├─observer
    │   ├─runtime-dom
    │   ├─scheduler
    │   └─global.d.ts
    ├─scripts
    ├─.prettierrc         //prettier配置文件
    ├─lerna.json          //lerna代码库管理工具
    ├─package.json        //npm配置文件
    ├─rollup.config.js    //rollup配置文件
    ├─tsconfig.json       //ts配置文件
    └─yarn.lock           //yarn依赖管理文件
```

可以看到VUE3与VUE2的区别有以下几点：

- 使用rollup代替webpack打包项目
- 使用TypeScript代替js编程
- 使用代码库管理工具lerna

## package.json

``` json
"private": true,
"workspaces": [
  "packages/*"
],
"scripts": {
  "dev": "node scripts/dev.js",
  "build": "node scripts/build.js",
  "lint": "prettier --write --parser typescript 'packages/*/src/**/*.ts'"
},
```

## scripts

### dev.js

``` js
const execa = require('execa')
const { targets, fuzzyMatchTarget } = require('./utils')

const target = fuzzyMatchTarget(process.argv[2] || 'runtime-dom')

execa(
  'rollup',
  [
    '-wc',
    '--environment',
    `TARGET:${target},FORMATS:umd`
  ],
  {
    stdio: 'inherit'
  }
)
```

### build.js

``` js

```

## rollup.config.js

<Valine></Valine>
