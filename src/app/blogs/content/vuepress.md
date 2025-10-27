# Vuepress搭建博客

## 创建文件夹并初始化

这里可以按照官网的步骤先安装vuepress

```sh
# 将 VuePress 作为一个本地依赖安装
yarn add -D vuepress # 或者：npm install -D vuepress
```

## 构建项目结构并新建文件

然后创建项目结构

```sh
# 新建一个 docs 文件夹
mkdir docs & cd docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > README.md

# 新建.vuepress文件夹
mkdir .vuepress & cd .vuepress

# 新建config.js配置文件
```

最终结构如下

```md
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── public (可选的)
│   │   └── config.js (可选的)
│   └── README.md
└── package.json
```

## 修改配置文件

你可以通过 themeConfig.nav 增加一些导航栏链接

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

## 在package.json中添加项目NPM脚本

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

然后就可以开始写作了:

```sh
yarn docs:dev # 或者：npm run docs:dev
```

要生成静态的 HTML 文件，运行：

```sh
yarn docs:build # 或者：npm run docs:build
```

默认情况下，文件将会被生成在 .vuepress/dist，当然，你也可以通过 .vuepress/config.js 中的 dest 字段来修改，生成的文件可以部署到任意的静态文件服务器上

## 部署博客至Github Pages

在 docs/.vuepress/config.js 中设置正确的 base。

如果你打算发布到 <https://USERNAME.github.io/>，则可以省略这一步，因为 base 默认即是 "/"。

如果你打算发布到 <https://USERNAME.github.io/REPO/>（也就是说你的仓库在 <https://github.com/USERNAME/REPO）>，则将 base 设置为 "/REPO/"。

在你的项目中，创建一个如下的 deploy.sh 文件:

```sh
# !/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

## 部署博客至Netlify

1. 在 Netlify 中, 创建一个新的 GitHub 项目，使用以下设置：

    - Build Command: npm run build:docs 或者 yarn build:docs
    - Publish directory: docs/.vuepress/dist

2. 点击 deploy 按钮！

## 添加谷歌分析工具

### 安装

``` sh
yarn add -D @vuepress/plugin-google-analytics
# OR npm install -D @vuepress/plugin-google-analytics
```

### 使用

``` sh
module.exports = {
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
    ]
  ]
}
```

## 添加PWA离线app功能

### 安装

``` sh
yarn add -D @vuepress/plugin-pwa
# OR npm install -D @vuepress/plugin-pwa
```

### 使用

``` sh
module.exports = {
  plugins: ['@vuepress/pwa']
}
```

::: tip 提示
提示

为了让你的网站完全地兼容 PWA，你需要:

在 .vuepress/public 提供 Manifest 和 icons

在 .vuepress/config.js 添加正確的 head links(参见下面例子).
:::

这是一个在VuePress中完全地兼容 PWA 的例子：

``` js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
  }],
}
```

<Valine></Valine>
