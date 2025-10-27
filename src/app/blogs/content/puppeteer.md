# 初步学习如何使用 puppeteer 操控无头浏览器

![banner](/images/blogs/blog/pupeteer.png)

## 安装

```sh
npm i puppeteer
```

## 使用

```js
const puppeteer = require("puppeteer");
const browser = await puppeteer.launch();
const page = await browser.newPage();
```

通过这几步导入包，然后打开浏览器并创建新页面

```js
//设置视口大小为1920*1080
await page.setViewport({ width: 1920, height: 1080 });
//打开设置的url页面
await page.goto(url);
//给当前页面截图
await page.screenshot({ path: path + name + ".png" });
//将当前页面输出为pdf文件
await page.pdf({ path: path + name + ".pdf", format: "A4" });
//获取页面的信息
const dimensions = await page.evaluate(() => {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    deviceScaleFactor: window.devicePixelRatio
  };
});
//关闭浏览器
await browser.close();
```

通过这些方法可以初步使用 pupeteer 完成一些操作

<Valine></Valine>
