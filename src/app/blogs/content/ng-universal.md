# 渲染方式对比

## CSR（客户端渲染)

系统类网页应用渲染方式，即组装页面这个步骤，是在客户端进行，服务端提供异步数据请求的后端服务。

![CSR](https://cdn.nlark.com/yuque/0/2023/jpeg/653410/1680503093740-ab4e3ce8-eed2-4865-a2e3-1cd8d1db3fba.jpeg)

### 优点

1. 适合有大量动态数据的网站，即常规后台等需要 api 获取数据的网站类型
2. 构建时间短

### 缺点

1. 没有良好的 seo（后台网站不对公众开放，不影响）
2. 页面从请求到首屏时间长
3. 对部署前端的服务器压力较大

### 框架

1. React
2. Vue
3. Angular

## SSR（服务端渲染)

门户类网站渲染方式

![SSR](https://cdn.nlark.com/yuque/0/2023/jpeg/653410/1680503266848-20e6a8b2-7482-4f88-81bd-5bff6fe5448f.jpeg)

### 优点

1. 有良好 seo
2. 页面从请求到首屏时间较短，基本页面可以很快展示

### 缺点

1. 只适合使用少量动态数据或完全不使用动态数据
2. 构建时间较长
3. 对部署前端的服务器压力较大

### 框架

1. Next.js（React+Node.js）
2. Nuxt.js（Vue+Node.js）
3. Angular universal（Angular+Express.js）
4. Nest.js（Node.js+Express.js）

## SSG（静态网站生成)

博客及文档类网站渲染方式

![SSG](https://cdn.nlark.com/yuque/0/2023/jpeg/653410/1680503268946-643e0bfb-804f-4953-9324-2dfb8d06f708.jpeg)

### 优点

1. 优秀的 seo
2. 页面从请求到首屏时间极短
3. 对部署前端的服务器压力小

### 缺点

1. 构建时间长
2. 不能使用动态数据，每次修改都需要重新构建

### 框架

1. Vuepress
2. Jekyll
3. Gatsby
4. Hugo

## Angular universal 入门

### 安装

官网链接：[https://angular.io/guide/universal](https://angular.io/guide/universal)

假设当前已有一个标准的 Angular 应用，安装 ssr 则需要先安装一个服务，这里是 express。

```shell
ng add @nguniversal/express-engine
```

安装前后目录对比：

| 安装前                                                                                                                                                                                                                                                                                                                                                                                                     | 安装后                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1680572299037-93ecc0e2-3cbd-4a65-842c-a0e72ef83d40.png#averageHue=%23232930&clientId=u2dfde43a-3db5-4&from=paste&height=383&id=u4e67a744&name=image.png&originHeight=383&originWidth=229&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16289&status=done&style=none&taskId=uf5e61a92-092b-4856-982a-64100a1138a&title=&width=229) | ![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1680572329719-60d2a181-7428-48cc-bda6-70842b7b0870.png#averageHue=%2322272e&clientId=u2dfde43a-3db5-4&from=paste&height=451&id=bNQtj&name=image.png&originHeight=451&originWidth=263&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21192&status=done&style=none&taskId=u012e31a6-5dd2-4c3a-8458-9b7c23e109b&title=&width=263)![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1680572445392-c3af7d93-7bbf-44fd-a7e4-09a8d3921fa4.png#averageHue=%2323282f&clientId=u2dfde43a-3db5-4&from=paste&height=459&id=u257926a1&name=image.png&originHeight=459&originWidth=319&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25507&status=done&style=none&taskId=u8fd61735-e8a6-449d-9139-d03e2c56793&title=&width=319) |

主要分为两部分，一部分是修改了配置，另一部分是创建了 server 端代码

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1680572500799-4b9cfa53-20a7-4dc1-9cb6-2bc745d674d1.png#averageHue=%23282c34&clientId=u2dfde43a-3db5-4&from=paste&height=401&id=u978f5f57&name=image.png&originHeight=401&originWidth=2078&originalType=binary&ratio=1&rotation=0&showTitle=false&size=96587&status=done&style=none&taskId=u8a3e6a7f-227b-4f38-b213-c27573a1c3b&title=&width=2078)

客户端方面的配置改动，是把原本的应用打包输出放在了二级文件夹下

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1680572568115-0d787674-e087-438c-9005-132012a5f35f.png#averageHue=%2339564b&clientId=u2dfde43a-3db5-4&from=paste&height=579&id=u799d01bc&name=image.png&originHeight=579&originWidth=1958&originalType=binary&ratio=1&rotation=0&showTitle=false&size=108671&status=done&style=none&taskId=u226425bf-3a3d-4b89-b269-f32ee46e676&title=&width=1958)

服务端则是完全重新生成了一套配置，用于 ssr 项目的开发

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1680573819127-32deedfe-4b39-4ad0-8bd2-1eec7bd386b5.png#averageHue=%23282c34&clientId=u2dfde43a-3db5-4&from=paste&height=155&id=u162c9e6b&name=image.png&originHeight=155&originWidth=963&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42010&status=done&style=none&taskId=ubba07543-f501-4137-90b9-ca1bf113590&title=&width=963)

在脚本中添加了 ssr 的开发，运行，打包和预渲染命令

```typescript
import "zone.js/dist/zone-node";

import { ngExpressEngine } from "@nguniversal/express-engine";
import * as express from "express";
import { join } from "path";

import { AppServerModule } from "./src/main.server";
import { APP_BASE_HREF } from "@angular/common";
import { existsSync } from "fs";

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), "dist/ssr-project/browser");
  const indexHtml = existsSync(join(distFolder, "index.original.html"))
    ? "index.original.html"
    : "index";

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    "html",
    ngExpressEngine({
      bootstrap: AppServerModule
    })
  );

  server.set("view engine", "html");
  server.set("views", distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    "*.*",
    express.static(distFolder, {
      maxAge: "1y"
    })
  );

  // All regular routes use the Universal engine
  server.get("*", (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
    });
  });

  return server;
}

function run(): void {
  const port = process.env["PORT"] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || "";
if (moduleFilename === __filename || moduleFilename.includes("iisnode")) {
  run();
}

export * from "./src/main.server";
```

服务端最核心的则是根目录的 server.ts 文件，这里做了 Angular 页面与 express 服务的绑定，以及 express 服务的启动代码

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1680574084692-137816f2-f25c-4312-81f4-062a23742c1a.png#averageHue=%2320262d&clientId=u2dfde43a-3db5-4&from=paste&height=60&id=u1d29649e&name=image.png&originHeight=60&originWidth=218&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2072&status=done&style=none&taskId=u9c0c24e1-24d5-4ed9-abf5-05417831a74&title=&width=218)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1680574090757-d5d197b3-a02b-4f2b-abf9-1dc9c698895b.png#averageHue=%2321262c&clientId=u2dfde43a-3db5-4&from=paste&height=63&id=uec414fdf&name=image.png&originHeight=63&originWidth=254&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3315&status=done&style=none&taskId=u0fbb4e12-054d-47ee-abd9-12c5f478752&title=&width=254)

main.ts 和 app.module.ts 都对服务端逻辑创建了一份新文件，当遇到服务端缓存数据或其他类型的需要操控服务端的逻辑，就需要在这里配置。如果只是普通的 ssr 网站，到这一步后则与开发常规 Angular 应用一样，正常开发即可

### 常见问题

#### NG-ZORRO 一起使用

官网链接：[https://ng.ant.design/docs/universal/zh](https://ng.ant.design/docs/universal/zh)

文档中有两种方式可以选择，一种较为复杂，需要自己安装 ng-zorro 以后，然后修改服务端文件；另一种则是直接 clone 一个模板项目，修改项目名即可使用。

#### 区分服务端逻辑与客户端逻辑

```typescript
constructor(
    @Inject(PLATFORM_ID) private platformId: Object
) {}

func() {
  if (isPlatformBrowser(this.platformId)) {
    // do something
  }
}
```

#### 跨域配置

跨域配置分为两种情况，分别是开发模式和生产模式

##### 开发模式

```typescript
"dev:ssr": "ng run xw_offical:serve-ssr"
```

因为 ssr 会有服务端请求和客户端请求同时存在，客户端请求代理即 Angular 的 proxy 文件中配置，而服务端需要在 express 的 server.ts 文件中添加中间件。

```typescript
import { createProxyMiddleware } from "http-proxy-middleware";

const server = app().use(
  "/api",
  createProxyMiddleware({
    target: "http://ip:port/",
    secure: false,
    logLevel: "debug",
    changeOrigin: true
  })
);
```

##### 生产模式

```typescript
"serve:ssr": "node dist/xw_offical/server/main.js"
```

生产模式会将客户端请求拦截并从服务端发送，因此只需要 server.ts 文件中的中间件即可。
