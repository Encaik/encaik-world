# Koa2基本学习

```js
const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  ctx.body = 'Hello Koa2';
});

app.listen(8000, () => {
  console.log('app started at port http://localhost:8000');
});
```

<Valine></Valine>
