# 初次上手尝试开发鸿蒙 OS 上的 Javascript 应用

![banner](/images/blogs/blog/harmony.png)

## 起因

最近鸿蒙 OS 很火，本着吃瓜群众的心理，我也想看看号称可以用 js 直接开发应用的鸿蒙 OS 是什么样的。我对 Android 和 Flutter 都略有接触（学学写法，写个 demo 的水平），希望可以通过这次学习了解 js 直接开发会有什么不同。

## 准备工作

### 安装编译器

打开[华为鸿蒙 OS 开发者中心-开发](https://developer.harmonyos.com/cn/develop)，往下翻可以看到官方编译器 HUAWEI DevEco Studio 的下载链接：

![image.png](/images/blogs/blog/harmony/1.png)

点击立即下载，然后下载完成后解压安装。

> 编译器是基于 IntelliJ 平台的，所以操作使用与 idea/as 及其相似，几乎没有学习成本。

### 环境配置

这个不用多说，基础的 nodejs 运行环境都要配置好。其他配置内容都可以在[开发者中心-文档-工具-配置开发环境](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/environment_config-0000001052902427)参考。

## 创建项目

### 新建鸿蒙 OS 项目

![image.png](/images/blogs/blog/harmony/2.png)

> 这里需要注意的是需要点击新建鸿蒙 OS 项目才可以创建一个带有模板的项目，如果直接点新建项目将会创建一个全新的空项目。

### 新建 js 空应用

![image.png](/images/blogs/blog/harmony/3.png)

> 这里应用名后面的括号里都有标注模板是使用什么语言开发，注意要选择正确。

![image.png](/images/blogs/blog/harmony/4.png)

然后填写应用的相关信息，点击完成就可以创建一个项目了。

### 了解项目模板文件作用

![image.png](/images/blogs/blog/harmony/5.png)

模板中开发文件夹位置是`entry/src`文件夹中的内容，其中结构与 node 项目相似，然后进入 js 开发目录，即`main/js`目录，其中：

- common 是公共文件夹，这里应该放置的是公共资源
- i18n 是国际化文件夹，里面放的是各语言环境文本内容
- pages 是页面，有 html，css，js 三个文件组成
- app.js 是入口文件

![image.png](/images/blogs/blog/harmony/6.png)

新建页面时推荐在右键新建中选择 JS Page，这样可以自动添加路由到 config.json 文件中。

## 开发应用

总体写法感觉与主流前端框架相似，没有上手难度，IDE 提示很全面，这个很舒服。

### html 标签

| 组件类型 | 主要组件                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------- |
| 基础组件 | text、image、progress、rating、span、marquee、image-animator、divider、search、menu、chart        |
| 容器组件 | div、list、list-item、stack、swiper、tabs、tab-bar、tab-content、list-item-group、refresh、dialog |
| 媒体组件 | video                                                                                             |
| 画布组件 | canvas                                                                                            |

![image.png](/images/blogs/blog/harmony/7.png)

### 双向绑定

双向绑定可以直接使用双花括号，即`{{}}`，而且部分标签内容与标签属性，都是需要使用双花括号的。使用`$t`可以直接引用国际化对象的内容。

- 列表循环

```js
<!-- xxx.hml -->
<div class="array-container">
  <!-- div列表渲染 -->
  <!-- 默认$item代表数组中的元素, $idx代表数组中的元素索引 -->
  <div for="{{array}}" tid="id" onclick="changeText">
    <text>{{$idx}}.{{$item.name}}</text>
  </div>
  <!-- 自定义元素变量名称 -->
  <div for="{{value in array}}" tid="id" onclick="changeText">
    <text>{{$idx}}.{{value.name}}</text>
  </div>
  <!-- 自定义元素变量、索引名称 -->
  <div for="{{(index, value) in array}}" tid="id" onclick="changeText">
    <text>{{index}}.{{value.name}}</text>
  </div>
</div>
```

- 条件判断

一种是 ifelse 语法，false 时不渲染；另一种是 show 语法，false 时渲染但不显示。

```html
<text if="{{show}}"> Hello-One </text>
<text elif="{{display}}"> Hello-Two </text>
<text else> Hello-World </text>

<text show="{{visible}}"> Hello World </text>
```

- 模板引用

```html
<!-- template.hml -->
<div class="item">
  <text>Name: {{name}}</text>
  <text>Age: {{age}}</text>
</div>

<!-- index.hml -->
<element name="comp" src="../../common/template.hml"></element>
```

### 事件绑定

时间绑定与原生 js 相同，由 onevent 等关键词绑定方法。官网给出的时间绑定方法有如下多种：

```html
<!-- xxx.hml -->
<div>
  <!-- 通过'@'绑定事件 -->
  <div @click="clickfunc"></div>
  <!-- 通过'on'绑定事件  -->
  <div onclick="clickfunc"></div>
  <!-- 使用事件冒泡模式绑定事件回调函数。5+ -->
  <div on:touchstart.bubble="touchstartfunc"></div>
  <!-- 使用事件捕获模式绑定事件回调函数。5+ -->
  <div on:touchstart.capture="touchstartfunc"></div>
  <!-- on:{event}等价于on:{event}.bubble。5+ -->
  <div on:touchstart="touchstartfunc"></div>
  <!-- 绑定事件回调函数，但阻止事件向上传递。5+ -->
  <div grab:touchstart.bubble="touchstartfunc"></div>
  <!-- 绑定事件回调函数，但阻止事件向下传递。5+ -->
  <div grab:touchstart.capture="touchstartfunc"></div>
  <!-- grab:{event}等价于grab:{event}.bubble。5+ -->
  <div grab:touchstart="touchstartfunc"></div>
</div>
```

IDE 提示中的 on:event 写法与 onevent 写法在实际使用时并没有表现出差别。

![image.png](/images/blogs/blog/harmony/8.png)

### 路由跳转

路由使用`@system.router`的方法完成:

- 跳转至其他页面

```js
// index.js
import router from '@system.router';

// 跳转至detail页面
jumpToDetail(){
    router.push({
        uri:'pages/detail/detail'    //路由在config.json文件中
    })
}
```

- 返回上一页面

```js
// detail.js
import router from '@system.router';

backToIndex(){
    router.back()
}
```

### dom 操作

- 获取某个 dom 节点

通过 ref 绑定在标签上，然后在 js 中使用\$refs 获取 dom

```html
<!-- index.hml -->
<div class="container">
  <text ref="hello">hello</text>
</div>
```

```js
const helloElement = this.$refs.hello; // 获取ref属性为animator的DOM元素
```

- 获取父组件

```js
const parent = this.$parent();
```

- 获取子组件

```html
<div class="container">
  <childComponent id="childComponent"></childComponent>
</div>
```

```js
const childComponent = this.$child("childComponent");
```

### 生命周期

刚才提到的 app.js 文件中有两个特殊生命周期，表示应用的创建与销毁：

```js
export default {
  onCreate() {
    console.info("AceApplication onCreate");
  },
  onDestroy() {
    console.info("AceApplication onDestroy");
  }
};
```

除了这两个以外，每一个 page 也有生命周期，官网对于每一个生命周期的描述如下：

| 属性                           | 参数   | 返回值  | 描述               | 触发时机                                                                                                                     |
| ------------------------------ | ------ | ------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| onInit                         | 无     | 无      | 页面初始化         | 页面数据初始化完成时触发，只触发一次。                                                                                       |
| onReady                        | 无     | 无      | 页面创建完成       | 页面创建完成时触发，只触发一次。                                                                                             |
| onShow                         | 无     | 无      | 页面显示           | 页面显示时触发。                                                                                                             |
| onHide                         | 无     | 无      | 页面消失           | 页面消失时触发。                                                                                                             |
| onDestroy                      | 无     | 无      | 页面销毁           | 页面销毁时触发。                                                                                                             |
| onBackPress                    | 无     | Boolean | 返回按钮动作       | 当用户点击返回按钮时触发。返回 true 表示页面自己处理返回逻辑。返回 false 表示使用默认的返回逻辑。不返回值会作为 false 处理。 |
| onActive()5+                   | 无     | 无      | 页面激活           | 页面激活时触发。                                                                                                             |
| onInactive()5+                 | 无     | 无      | 页面暂停           | 页面暂停时触发。                                                                                                             |
| onNewRequest()5+               | 无     | 无      | FA 重新请求        | 该回调当 FA 已经启动时收到新的请求后触发。                                                                                   |
| onStartContinuation()5+        | 无     | 无      | 详细描述见链接内容 | 分布式能力接口，详细解释见分布式迁移。                                                                                       |
| onSaveData(OBJECT)5+           | OBJECT | 无      | 详细描述见链接内容 | 分布式能力接口，详细解释见分布式迁移。                                                                                       |
| onRestoreData(OBJECT)5+        | OBJECT | 无      | 详细描述见链接内容 | 分布式能力接口，详细解释见分布式迁移。                                                                                       |
| onCompleteContinuation(code)5+ | code   | 无      | 详细描述见链接内容 | 分布式能力接口，详细解释见分布式迁移。                                                                                       |

页面 A 的生命周期接口的调用顺序：

- 打开页面 A：onInit() -> onReady() -> onShow() -> onActive()
- 在页面 A 打开页面 B：onInactive() -> onHide()
- 从页面 B 返回页面 A：onShow() -> onActive()
- 退出页面 A：onBackPress() -> onInactive() -> onHide() -> onDestroy()
- 页面隐藏到后台运行：onInactive() -> onHide()
- 页面从后台运行恢复到前台：onShow()

> 其中 5+的含义应该是 API 版本 5 及以上，根据官网发布版本的信息，HarmonyOS SDK 2.1.1.21 即 v5。

## 调试应用

调试分为真机与虚拟机，因为我没有鸿蒙系统的手机，所以这里只说明虚拟机的调试方法。

### 获取虚拟机

点击顶部菜单栏的工具-设备管理，会弹出一个预设虚拟机弹窗，如下图所示：

![image.png](/images/blogs/blog/harmony/9.png)

> 第一次打开此弹窗，如果没有登录和实名认证的开发者是看不到右侧的设备列表的，需要先去注册华为开发者账号，然后进行实名认证。认证完成后回到 IDE 退出并重新登录（这里弹出的授权页面也需要重新登录才可以），才会显示设备列表。

选择想要运行的设备，点右侧运行按钮，然后再运行项目，就可以看到虚拟机演示效果了。

![image.png](/images/blogs/blog/harmony/10.png)

::: tip 注意

1. 开发时没有热更新，需要重新运行才可以看到修改后的效果。

2. 虚拟机是云手机，所以会出现操作迟滞，画面模糊等问题。

3. 云手机有使用时长限制，上侧有 1 个小时倒计时。

:::
