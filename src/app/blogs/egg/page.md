# 学习使用Egg.js搭建后端

## 介绍

- 提供基于 Egg 定制上层框架的能力
- 高度可扩展的插件机制
- 内置多进程管理
- 基于 Koa 开发，性能优异
- 框架稳定，测试覆盖率高
- 渐进式开发

## 安装

### 脚手架

``` sh
mkdir egg-example && cd egg-example
npm init egg --type=simple
npm i
```

## 使用

### 目录结构

``` sh
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

如上，由框架约定的目录：

app/router.js 用于配置 URL 路由规则，具体参见 Router。

app/controller/** 用于解析用户的输入，处理后返回相应的结果，具体参见 Controller。

app/service/** 用于编写业务逻辑层，可选，建议使用，具体参见 Service。

app/middleware/** 用于编写中间件，可选，具体参见 Middleware。

app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。

app/extend/** 用于框架的扩展，可选，具体参见框架扩展。
config/config.{env}.js 用于编写配置文件，具体参见配置。

config/plugin.js 用于配置需要加载的插件，具体参见插件。

test/** 用于单元测试，具体参见单元测试。

app.js 和 agent.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。关于agent.js的作用参见Agent机制。

由内置插件约定的目录：

app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。

app/schedule/** 用于定时任务，可选，具体参见定时任务。

<Valine></Valine>
