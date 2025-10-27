# 使用 socket.io 做一个在线聊天室

![banner](/images/blogs/blog/socketio.png)

## 安装

```sh
npm install socket.io
```

socket 分为前后端两个库，分别是 服务端的 socket.io 和 客户端的 socket.io-client。

## 使用 vue+express+socket 搭建聊天服务

在 vue 中使用时，可以使用封装的 vue-socket.io 库更简便开发，服务端则使用 socket.io 与 express 搭配建立服务。

### vue 使用 vue-socket.io

#### 安装

```sh
npm i socket.io-client vue-socket.io
```

#### 连接 socket 服务

```js
import io from "socket.io-client";
import VueSocketIo from "vue-socket.io";
Vue.use(
  new VueSocketIo({
    debug: true,
    connection: io(window.location.origin)
  })
);
```

#### 发送消息到服务端

```js
this.$socket.emit("server-message", {
  msg: "这是一条消息"
});
```

#### 监听服务端的消息

```js
this.sockets.subscribe("client-message", res => {
  console.log(res);
});
```

### express 使用 socket.io

#### 安装

```sh
npm i socket.io
```

#### 监听客户端连接

```js
io.on("connection", socket => {
  //so something
});
```

#### 监听客户端消息

```js
socket.on("server-message", res => {
  console.log("客户端发送信息：", res);
});
```

#### 发送消息到对应连接的客户端

```js
socket.emit("client-message", {
  msg: "只有自己能看到的消息"
});
```

#### 发送消息到所有连接的客户端

```js
io.emit("client-message", {
  msg: "所有人都能看到的消息"
});
```

<Valine></Valine>
