# 在 Ng-alain 中使用 mock

## 在 ng-alain 中安装 mockjs

与其他项目一致，直接使用 npm/pnpm/yarn 安装即可。

## 在 mock 文件中使用 mockjs

最基本的 ng-alain 中 mock 文件写法规范，可以参考文档。
[https://ng-alain.com/mock/getting-started/zh](https://ng-alain.com/mock/getting-started/zh)
其中，数据部分可以使用 mockjs 来模拟数据。

```javascript
'POST /list': Mock.mock({
  code: 0,
  msg: '',
  'data|5-10': [
    {
      'id|+1': 1,
      name: () => Random.cname()
    }
  ],
  traceMessage: ''
})
```

如以上代码所示，这里是一个通用模板所用的 list 接口，接口为 post 请求，该请求会返回一个 mock 数据。其中字段 data 使用了 mock 的语法，语法可以在 mock 文档参考。
[http://mockjs.com/examples.html](http://mockjs.com/examples.html)

## 综合讨论

这里列举一些使用的技巧或者规范，尽可能利用 mockjs 的优势，来让开发工作的效率提升，减少代码复杂度。

### 学会使用生成规则

```javascript
//bad
{
  data: Array.from({ length: 8, (v, i) => i).map(i => ({
    id: i + 1,
  }))
}

//good
{
  'data|8': [
    {
      'id|+1': 1
    }
  ]
}
```

### 学会使用列表生成状态值

```javascript
//bad
{
  auditStatus: `${Math.round(Math.random() * 3)}`
}

//good
{
  "auditStatus|1": ["0","1","2","3"],
  "auditStatusDesc|1": ["已申请","未审核","已审核","已驳回"]
}
```

### 学会使用正则生成特殊数据

```javascript
//bad
{
  phone: () => `18${Math.round(Math.random() * 10000000) + 100000000}`;
}

//good
{
  phone: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
}
```

::: tip 注意
常见正则表达式都可通过搜索得到。
:::
