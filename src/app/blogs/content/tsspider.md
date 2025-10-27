# Typescr学习-实现基础爬虫

## 全局安装Typescript

``` sh
npm install -g typescript
```

## 初始化npm配置文件

``` sh
npm init -y
```

## 初始化typescript配置文件

``` sh
tsc --init
```

## 创建项目结构

``` sh
project
  src
    js
    index.ts
  package-locak.json
  package.json
```

## 修改配置文件符合目录结构

## 安装所需模块

https与fs为自带模块无需安装，cheerio需要安装

``` sh
npm install -s cheerio @types/cheerio
```

## 在index.ts中编写程序

``` ts
import https from 'https';
import cheerio from 'cheerio';

let url:string = "https://www.iplaysoft.com/page/1"

https.get(url,(res:any) => {
    let chunks:any = [],size:number = 0;
    res.on('data',(chunk:any) => {
        chunks.push(chunk);
        size += chunk.length;
    });
    res.on('end',() => {
        let data:any = Buffer.concat(chunks,size);
        let html:string = data.toString();
        let $:any = cheerio.load(html);
        let result:string[] = [];
        $('.entry-head').each((i:number) => {
            let map:any = {};
            map.title = $('.entry-head').eq(i).find('h2').find('a').text();
            map.tag = $('.entry-head').eq(i).find('.entry-cat').find('.entry-update-summary').text();
            result.push(map);
            map = {};
        })
        console.log(result);
    });
})
```

## 在package.json中添加命令

``` json
"scripts":{
  "start":"node ./src/js/index.js"
}
```

## 运行命令

``` sh
npm start
```

<Valine></Valine>
