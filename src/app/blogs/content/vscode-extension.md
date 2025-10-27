# 学习 vscode 插件开发

## 模板生成

- 全局安装模板生成工具

```sh
npm install -g yo generator-code
```

- 生成插件模板

```sh
yo code
```

回答一些关于项目的问题就可以生成对应的项目模板了，这里我生成了最基本的 js 插件模板。

## 运行

模板项目默认是一个 helloword 命令项目，使用 f5 运行项目，会自动弹出一个新的 vscode 窗口，在这个窗口中使用 ctrl+shift+p 唤出命令面板，然后输入 helloworld 运行。vscode 会弹出一条消息，显示`Hello World from vscode-extension-learn!`。

## 配置

插件中的内容需要先在 package.json 文件中声明，常用的包括以下几个：

```json
{
  "icon": "assets/icon.png",
  "contributes": {
    "commands": [
      {
        "command": "book-view.helloWorld",
        "title": "Hello World"
      }
    ],
    "views": {
      "book-explorer": [
        {
          "id": "allBookList",
          "name": "全部作品人气排行榜"
        }
      ]
    },
    "viewsContainers": {
      "activitybar": [
        {
          "id": "book-explorer",
          "title": "小说阅读器",
          "icon": "assets/favicon.svg"
        }
      ]
    }
  }
}
```
