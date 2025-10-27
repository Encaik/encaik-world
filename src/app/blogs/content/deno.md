# 初探 Deno，学习用法

## 官网

[Deno 官网](https://deno.land/)

## 安装

Shell (Mac, Linux):

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

PowerShell (Windows):

```sh
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

Homebrew (Mac):

```sh
brew install deno
```

Chocolatey (Windows):

```sh
choco install deno
```

Scoop (Windows):

```sh
scoop install deno
```

Build and install from source using Cargo

```sh
cargo install deno
```

安装完成后在命令行输入 deno，如果出现以下内容说明安装成功：

```sh
Deno 1.2.1
exit using ctrl+d or close()
>
```

## 使用

新建一个文件夹，并在其中新建文件 index.js，内容为：

```js
console.log("Hello World!");
```

然后在命令行中输入命令运行 js 文件：

```sh
deno run ./index.js
```

可以看到命令行中出现了打印的字符串，这就是使用 deno 运行 js 文件最基本的例子。

```sh
Hello World!
```

deno 启动服务

```js
import { serve } from "https://deno.land/std@0.62.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

执行后就可以看到 deno 启动了一个服务

<Valine></Valine>
