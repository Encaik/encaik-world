# 知识积累

## 常用官方网站

### 博客论坛

- [掘金](https://juejin.cn/)
- [思否](https://segmentfault.com/)
- [技术胖](https://www.jspang.com/)
- [政采云前端小报](https://weekly.zoo.team/)

### 技术总览

- [web 技术册](https://platform.html5.org/)
- [腾讯云开发者手册](https://cloud.tencent.com/developer/devdocs)

### 算法提升

- [力扣](https://leetcode-cn.com/)

### 数据统计

- [百度统计流量研究院](https://tongji.baidu.com/research/site#profile)
- [W3Techs](https://w3techs.com/)

## 浏览器

### 浏览器内核

#### 内核介绍

1. 浏览器内核又可以分成两部分：渲染引擎(layout engineer 或者 Rendering Engine)和 JS 引擎。

2. 渲染引擎 它负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。

3. JS 引擎 则是解析 Javascript 语言，执行 javascript 语言来实现网页的动态效果。

4. 最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。有一个网页标准计划小组制作了一个 ACID 来测试引擎的兼容性和性能。

#### 内核的分类

浏览器的内核的种类很多，常见的浏览器内核可以分为四种：Trident、Gecko、Blink、Webkit。

1. Trident (IE 内核)

   国内很多的双核浏览器的其中一核便是 Trident，美其名曰 "兼容模式"。

   代表： IE、傲游、世界之窗浏览器、Avant、腾讯 TT、猎豹安全浏览器、360 极速浏览器、百度浏览器等。
   Window10 发布后，IE 将其内置浏览器命名为 Edge，Edge 最显著的特点就是新内核 EdgeHTML。

2. Gecko(firefox)

   Mozilla FireFox(火狐浏览器) 采用该内核，Gecko 的特点是代码完全公开，因此，其可开发程度很高，全世界的程序员都可以为其编写代码，增加功能。

   可惜这几年已经没落了， 比如 打开速度慢、升级频繁。

3. webkit(Safari)

   Safari 是苹果公司开发的浏览器，所用浏览器内核的名称是大名鼎鼎的 WebKit。

   代表浏览器：傲游浏览器 3、 Apple Safari (Win/Mac/iPhone/iPad)、Symbian 手机浏览器、Android 默认浏览器。

4. Chromium/Bink(chrome)

   在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。Blink 其实是 WebKit 的分支。

   大部分国产浏览器最新版都采用 Blink 内核。

5. Presto (Opera)

   Presto 是挪威产浏览器 opera 的 "前任" 内核，最新的 opera 浏览器早已将之抛弃从而投入到了谷歌怀抱了。

#### 移动端的浏览器

目前移动设备浏览器上常用的内核有 Webkit，Blink，Trident，Gecko 等。

其中 iPhone 和 iPad 等苹果 iOS 平台主要是 WebKit；

Android 4.4 之前的 Android 系统浏览器内核是 WebKit；

Android4.4 系统浏览器切换到了 Chromium，内核是 Webkit 的分支 Blink；

Windows Phone 8 系统浏览器内核是 Trident。

### 事件模型

此模型是 W3C 制定的标准模型，现代浏览器（IE6~8 除外）都已经遵循这个规范。W3C 制定的事件模型中，一次事件的发生包含三个过程：

1. 事件捕获阶段
2. 事件目标阶段
3. 事件冒泡阶段

![事件模型](/img/road/1.png)

事件捕获：当某个元素触发某个事件（如 onclick），顶层对象 document 就会发出一个事件流，随着 DOM 树的节点向目标元素节点流去，直到到达事件真正发生的目标元素。在这个过程中，事件相应的监听函数是不会被触发的。

事件目标：当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。

事件冒泡：从目标元素开始，往顶层元素传播。途中如果有节点绑定了相应的事件处理函数，这些函数都会被一次触发。
所有的事件类型都会经历事件捕获但是只有部分事件会经历事件冒泡阶段,例如 submit 事件就不会被冒泡。

事件的传播是可以阻止的：

- 在 W3c 中，使用 stopPropagation（）方法
- 在 IE 下设置 cancelBubble = true；

在捕获的过程中 stopPropagation（）；后，后面的冒泡过程就不会发生了。

标准的事件监听器该如何绑定：

addEventListener("eventType","handler","true|false");其中 eventType 指事件类型，注意不要加‘on’前缀，与 IE 下不同。第二个参数是处理函数，第三个即用来指定是否在捕获阶段进行处理，一般设为 false 来与 IE 保持一致(默认设置)，除非你有特殊的逻辑需求。监听器的解除也类似：removeEventListner("eventType","handler","true!false");

### 浏览器 BOM API

### 性能

![null](/img/road/1.jpg)

## 计算机网络

### 网络模型

| OSI 七层模型                 | TCP/IP 四层模型 | 网络协议                                                                                                                        |
| ---------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 应用层<br/>表示层<br/>会话层 | 应用层          | HTTP（超文本传输协议）<br/>HTTPS（超文本传输安全协议）<br/>FTP（文件传输协议）<br/>SMTP（简单邮件传输协议）<br/>DNS（域名服务） |
| 传输层                       | 传输层          | TCP（传输控制协议）<br/>UDP（用户数据报协议）                                                                                   |
| 网络层                       | 网际互连层      | IP（网际协议）<br/>ICMP（网络控制消息协议）<br/>IGMP（网络组管理协议）                                                          |
| 数据链路层<br/>物理层        | 网络接口层      | 以太网<br/>Wi-Fi                                                                                                                |

### TCP vs UDP

#### UDP

UDP 协议是参考模型中一种无连接的传输层协议，提供面向事务的简单不可靠信息传送服务。

特点:

- UDP 是无连接的，减少开销和发送数据之前的时间延迟。大家都知道 TCP 的三次握手和四次分手，这个是需要时间花销的，但是 UDP 没有这部分花销。
- UDP 使用最大努力交付，即不保证可靠交付。那谁来保证可靠的交付呢？是由 UDP 的上一层协议，应用层来保证。
- UDP 是面向报文的，适合一次性传输少量数据的网络应用。什么意思呢，如下图，UDP 这层，把应用层的全部内容作为自己的数据报部分，在 IP 层也只是加了一个 IP 首部，我们知道，在以太网，链路层上的数据如果超过 1500 字节，就会分片，所以网络层发现上面传输层给了太大的数据就会分片，加上 UDP 是不可靠的协议，这就加大了 UDP 的不可靠性，容易丢失，所以 UDP 适合数据量少的。
- UDP 没有拥塞控制，适合很多实时应用。也就是说如果网络堵塞，UDP 不管那么多，照样按照自己的速率发数据，那有些人就会说，这协议是不是有点坑 B，路都堵上了，还发死劲发数据呢，但是反过来看，这也是 UDP 的优点，它允许丢包，如果你的网络情况还不错，UDP 就非常适合实时应用，比如视频会议。
- UDP 首部较小，只有 8 字节，而 TCP 由 20 字节。这也是减少网络传输开销的一方面。

#### TCP

TCP 协议简单来说是一种位于传输层的，面向连接的、可靠的、基于字节流的传输层通信协议。

- TCP 是面向连接的传输层协议。比如说 TCP 的三次握手，四次分手，针对的都是连接。
- 每一条 TCP 连接只能有两个端点，每一条 TCP 连接是点对点的。也就是说 TCP 是不同计算机之间的进程的通信。
- TCP 提供可靠交付的服务，无差错，不丢失，不重复，按序到达。总结一下就是，可靠有序，不丢不重。
- TCP 提供全双工通信。全双工指的是连接双方可以同时收发数据。在收发两端都有发送缓存和接收缓存，发送缓存就是一个准备发送的队列，接收缓存是一个准备接收的队列。
- TCP 面向字节流。

### HTTP/HTTPS

超文本传输 ​​ 协议（HTTP）是一个用于传输超媒体文档（例如 HTML）的应用层协议。它是为 Web 浏览器与 Web 服务器之间的通信而设计的，但也可以用于其他目的。HTTP 遵循经典的客户端-服务端模型，客户端打开一个连接以发出请求，然后等待它收到服务器端响应。HTTP 是无状态协议，这意味着服务器不会在两个请求之间保留任何数据（状态）。该协议虽然通常基于 TCP/IP 层，但可以在任何可靠的传输层上使用；也就是说，不像 UDP，它是一个不会静默丢失消息的协议。RUDP——作为 UDP 的可靠化升级版本——是一种合适的替代选择。

#### 组成

1. 方法(method)：客户端希望服务器对资源执行的动作，是一个单独的词，比如，GET、POST 或 HEAD
2. 请求 URL(request-URL)：要直接与服务器进行对话，只要请求 URL 是资源的绝对路径就可以了，服务器可以假定自己是 URL 的主机/端口
3. 版本(version)：报文所使用的 HTTP 版本。其格式：HTTP/<主要版本号>.<次要版本号>
4. 状态码(status-code)：状态码是三位数字，描述了请求过程中所发生的情况。每个状态码的第一位数字都用于描述状态的一般类别(比如，“成功”、“出错”等等)
5. 原因短语(reason-phrase)：数字状态码的可读版本，包含行终止序列之前的所有文本。原因短语只对人类有意义，因此，尽管响应行 HTTP/1.0 200 NOT OK 和 HTTP/1.0 200 OK 中原因短语的含义不同，但同样都会被当作成功指示处理
6. 头部(header)：可以有零个或多个头部，每个首部都包含一个名字，后面跟着一个冒号(:)，然后是一个可选的空格，接着是一个值，最后是一个 CRLF 首部是由一个空行(CRLF)结束的，表示了头部列表的结束和实体主体部分的开始
7. 实体的主体部分(entity-body)：实体的主体部分包含一个由任意数据组成的数据块，并不是所有的报文都包含实体的主体部分，有时，报文只是以一个 CRLF 结束。

#### 常用头部

> 通用头部：既可以出现在请求报文中，也可以出现在响应报文中，它提供了与报文相关的最基本的信息

- Connection：允许客户端和服务器指定与请求/响应连接有关的选项，http1.1 默认是 keep-alive
- Date：提供日期和时间标志，说明报文是什么时间创建的
- Transfer-Encoding：告知接收端为了保证报文的可靠传输，对报文采用了什么编码方式
- Cache-Control：用于随报文传送缓存指示

> 请求头部：请求头部是只在请求报文中有意义的头部。用于说明是谁或什么在发送请求、请求源自何处，或者客户端的喜好及能力

- Host：给出了接收请求的服务器的主机名和端口号
- Referer：提供了包含当前请求 URI 的文档的 URL
- User-Agent：将发起请求的应用程序名称告知服务器
- Accept：告诉服务器能够发送哪些媒体类型
- Accept-Encoding：告诉服务器能够发送哪些编码方式
- Accept-Language：告诉服务器能够发送哪些语言
- Range：如果服务器支持范围请求，就请求资源的指定范围
- If-Range：允许对文档的某个范围进行条件请求
- Authorization：包含了客户端提供给服务器，以便对其自身进行认证的数据
- Cookie：客户端用它向服务器传送数据

> 响应头部：响应头部为客户端提供了一些额外信息，比如谁在发送响应、响应者的功能，甚至与响应相关的一些特殊指令

- Age：(从最初创建开始)响应持续时间
- Server：服务器应用程序软件的名称和版本
- Accept-Ranges：对此资源来说，服务器可接受的范围类型
- Set-Cookie：在客户端设置数据，以便服务器对客户端进行标识

> 实体首部：描述主体的长度和内容，或者资源自身

- Allow：列出了可以对此实体执行的请求方法
- Location：告知客户端实体实际上位于何处，用于将接收端定向到资源的位置(URL)上去
- Content-Base：解析主体中的相对 URL 时使用的基础 URL
- Content-Encoding：对主体执行的任意编码方式
- Content-Language：理解主体时最适宜使用的自然语言
- Content-Length：主体的长度
- Content-Type：这个主体的对象类型
- ETag：与此实体相关的实体标记
- Last-Modified：这个实体最后一次被修改的日期和时间

### DNS

域名系统（Domain Name System 缩写 DNS，Domain Name 被译为域名）是因特网的一项核心服务，它作为可以将域名和 IP 地址相互映射的一个分布式数据库，能够使人更方便的访问互联网，而不用去记住能够被机器直接读取的 IP 数串。

域名系统(Domain Name System,DNS)是 Internet 上解决网上机器命名的一种系统。就像拜访朋友要先知道别人家怎么走一样，Internet 上当一台主机要访问另外一台主机时，必须首先获知其地址，TCP/IP 中的 IP 地址是由四段以“.”分开的数字组成，记起来总是不如名字那么方便，所以，就采用了域名系统来管理名字和 IP 的对应关系。

## AST

在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

抽象语法树（AST）是代码运行最核心的知识点，是 js 里最底层的部分，再往下拆解就是转换和编译的知识了。

举个例子：

```js
function add(a, b) {
  return a + b;
}
```

这段代码拆解为 AST 应该是这样：

```js
FunctionDeclaration {
    type: 'FunctionDeclaration',
    name: 'add'
    params: [
      {
        type: 'identifier',
        name: 'a',
      },
      {
        type: 'identifier',
        name: 'b',
      },
    ],
    body: Blockstatement {
      type: 'BlockStatement',
      body: ReturnStatement {
        type: 'ReturnStatement',
        body: BinaryExpression {
          left: 'a',
          operator: '+',
          right: 'b',
        }
      }
    }
}
```

这只是最简单的样式，但是实际 AST 中包含很多信息。而这些标准都可以在[MDN/Parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects)以及[The ESTree Spec](https://github.com/estree/estree)中查找到。

如果想看详细的案例，也可以在[AST Explorer](https://astexplorer.net/)中查看。

### parser

parser 即解释器，通过解释器就可以将 js 源码转换为 AST 结构。

常见的解释器有：

- esprima
- traceur
- acorn
- shift

## HTML

### Web 存储

localStorage 和 sessionStorage：

- localStorage

用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除。

- sessionStorage

用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。

### Web 缓存

#### Manifest

### WebSocket

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。

### Canvas

HTML5 \<canvas> 标签用于绘制图像（通过脚本，通常是 JavaScript）。

## CSS

### 文章

- [掘金-老姚 你未必知道的 49 个知识点](https://juejin.im/post/5d3eca78e51d4561cb5dde12)
- [掘金-老姚 你未必知道的知识点(第二季)](https://juejin.im/post/5d9ec8b0518825651b1dffa3)

### 盒模型

盒模型分为 IE 盒模型和标准盒模型。

1. 标准盒模型：
2. IE 盒模型：

### 布局

CSS 布局模式，有时简称为布局，是一种基于盒子与其兄弟和祖辈盒子的交互方式来确定盒子的位置和大小的算法。有以下几种形式：

块布局：用来布置文件。块布局包含以文档为中心的功能，例如 浮动元素或将其放置在多列上的功能。

行内布局：用来布置文本。

表格布局：用来布置表格。

定位布局：用来对那些与其他元素无交互的定位元素进行布置 。

弹性盒子布局：用来布置那些可以顺利调整大小的复杂页面。

网格布局：用来布置那些与一个固定网格相关的元素。

### BFC(块格式化上下文)

块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。BFC 与外部元素不互相影响，因此 BFC 可以用来解决高度塌陷，外边距重叠等问题。

下列方式会创建块格式化上下文：

- 根元素（html）
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、- thead、tfoot 的默认属性）或 inline-table）
- overflow 计算值(Computed)不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 paint 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

## 数据结构与算法

[杂记-数据结构与算法](../note/dsaa.md)

## JS

### ECMAscript

[杂记-ECMAscript](../note/es.md)

### 运行机制

#### 进程与线程

什么是进程

我们都知道，CPU 是计算机的核心，承担所有的计算任务

官网说法，进程是 CPU 资源分配的最小单位

字面意思就是进行中的程序，我将它理解为一个可以独立运行且拥有自己的资源空间的任务程序

进程包括运行中的程序和程序所使用到的内存和系统资源

CPU 可以有很多进程，我们的电脑每打开一个软件就会产生一个或多个进程，为什么电脑运行的软件多就会卡，是因为 CPU 给每个进程分配资源空间，但是一个 CPU 一共就那么多资源，分出去越多，越卡，每个进程之间是相互独立的，CPU 在运行一个进程时，其他的进程处于非运行状态，CPU 使用 时间片轮转调度算法 来实现同时运行多个进程
什么是线程

线程是 CPU 调度的最小单位

线程是建立在进程的基础上的一次程序运行单位，通俗点解释线程就是程序中的一个执行流，一个进程可以有多个线程

一个进程中只有一个执行流称作单线程，即程序执行时，所走的程序路径按照连续顺序排下来，前面的必须处理好，后面的才会执行

一个进程中有多个执行流称作多线程，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，
也就是说允许单个程序创建多个并行执行的线程来完成各自的任务

进程和线程的区别

进程是操作系统分配资源的最小单位，线程是程序执行的最小单位

一个进程由一个或多个线程组成，线程可以理解为是一个进程中代码的不同执行路线

进程之间相互独立，但同一进程下的各个线程间共享程序的内存空间(包括代码段、数据集、堆等)及一些进程级的资源(如打开文件和信号)

调度和切换：线程上下文切换比进程上下文切换要快得多

多进程和多线程

多进程：多进程指的是在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如大家可以在网易云听歌的同时打开编辑器敲代码，编辑器和网易云的进程之间不会相互干扰

多线程：多线程是指程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务

#### JS 为什么是单线程

JS 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

还有人说 js 还有 Worker 线程，对的，为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程是完 全受主线程控制的，而且不得操作 DOM

所以，这个标准并没有改变 JavaScript 是单线程的本质

了解了进程和线程之后，接下来看看浏览器解析，浏览器之间也是有些许差距的，不过大致是差不多的，下文我们皆用市场占有比例最大的 Chrome 为例

作者：isboyjc
链接：[链接](https://juejin.im/post/5e22b391f265da3e204d8c14)
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### 内置类型

值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol。

引用数据类型：对象(Object)、数组(Array)、函数(Function)。

::: tip 注意

Symbol 是 ES6 引入了一种新的原始数据类型，表示独一无二的值。

:::

### 作用域与闭包

在 JavaScript 中, 对象和函数同样也是变量。

在 JavaScript 中, 作用域为可访问变量，对象，函数的集合。

JavaScript 函数作用域: 作用域在函数内修改。

### 操作符优先级

下面的表将所有运算符按照优先级的不同从高（20）到低（1）排列。

| 优先级 | 运算类型                    | 关联性        | 运算符         |
| :----- | :-------------------------- | :------------ | :------------- |
| 20     | 圆括号                      | n/a（不相关） | ( … )          |
| 19     | 成员访问                    | 从左到右      | … . …          |
|        | 需计算的成员访问            | 从左到右      | … [ … ]        |
|        | new (带参数列表)            | n/a           | new … ( … )    |
|        | 函数调用                    | 从左到右      | … ( … )        |
|        | 可选链（Optional chaining） | 从左到右      | ?.             |
| 18     | new (无参数列表)            | 从右到左      | new …          |
| 17     | 后置递增(运算符在后)        | n/a           | … ++           |
|        | 后置递减(运算符在后)        | n/a           | … --           |
| 16     | 逻辑非                      | 从右到左      | ! …            |
|        | 按位非                      | 从右到左      | ~ …            |
|        | 一元加法                    | 从右到左      | + …            |
|        | 一元减法                    | 从右到左      | - …            |
|        | 前置递增                    | 从右到左      | ++ …           |
|        | 前置递减                    | 从右到左      | -- …           |
|        | typeof                      | 从右到左      | typeof …       |
|        | void                        | 从右到左      | void …         |
|        | delete                      | 从右到左      | delete …       |
|        | await                       | 从右到左      | await …        |
| 15     | 幂                          | 从右到左      | … \*\* …       |
| 14     | 乘法                        | 从左到右      | … \* …         |
|        | 除法                        | 从左到右      | … / …          |
|        | 取模                        | 从左到右      | … % …          |
| 13     | 加法                        | 从左到右      | … + …          |
|        | 减法                        | 从左到右      | … - …          |
| 12     | 按位左移                    | 从左到右      | … << …         |
|        | 按位右移                    | 从左到右      | … >> …         |
|        | 无符号右移                  | 从左到右      | … >>> …        |
| 11     | 小于                        | 从左到右      | … < …          |
|        | 小于等于                    | 从左到右      | … <= …         |
|        | 大于                        | 从左到右      | … > …          |
|        | 大于等于                    | 从左到右      | … >= …         |
|        | in                          | 从左到右      | … in …         |
|        | instanceof                  | 从左到右      | … instanceof … |
| 10     | 等号                        | 从左到右      | … == …         |
|        | 非等号                      | 从左到右      | … != …         |
|        | 全等号                      | 从左到右      | … === …        |
|        | 非全等号                    | 从左到右      | … !== …        |
| 9      | 按位与                      | 从左到右      | … & …          |
| 8      | 按位异或                    | 从左到右      | … ^ …          |
| 7      | 按位或                      | 从左到右      | …              | … |
| 6      | 逻辑与                      | 从左到右      | … && …         |
| 5      | 逻辑或                      | 从左到右      | …              |  | … |
| 4      | 条件运算符                  | 从右到左      | … ? … : …      |
| 3      | 赋值                        | 从右到左      | … = …          |
|        |                             | 从右到左      | … += …         |
|        |                             | 从右到左      | … -= …         |
|        |                             | 从右到左      | … \*= …        |
|        |                             | 从右到左      | … /= …         |
|        |                             | 从右到左      | … %= …         |
|        |                             | 从右到左      | … <<= …        |
|        |                             | 从右到左      | … >>= …        |
|        |                             | 从右到左      | … >>>= …       |
|        |                             | 从右到左      | … &= …         |
|        |                             | 从右到左      | … ^= …         |
|        |                             | 从右到左      | …              | = … |
| 2      | yield                       | 从右到左      | yield …        |
|        | yield\*                     | 从右到左      | yield\* …      |
| 1      | 展开运算符                  | n/a           | ... …          |
| 0      | 逗号                        | 从左到右      | … , …          |

### 原型和继承

![原型链](https://user-gold-cdn.xitu.io/2020/2/19/1705cd422ba707f0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 基于原型链的继承

继承属性

JavaScript 对象是动态的属性“包”（指其自己的属性）。JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

> 遵循 ECMAScript 标准，someObject.[[Prototype]] 符号是用于指向 someObject 的原型。从 ECMAScript 6 开始，[[Prototype]] 可以通过 Object.getPrototypeOf() 和 Object.setPrototypeOf() 访问器来访问。这个等同于 JavaScript 的非标准但许多浏览器实现的属性 **proto**。
>
> 但它不应该与构造函数 func 的 prototype 属性相混淆。被构造函数创建的实例对象的 [[prototype]] 指向 func 的 prototype 属性。Object.prototype 属性表示 Object 的原型对象。

这里演示当尝试访问属性时会发生什么：

```js
// 让我们从一个自身拥有属性a和b的函数里创建一个对象o：
let f = function() {
  this.a = 1;
  this.b = 2;
};
/* 这么写也一样
function f() {
  this.a = 1;
  this.b = 2;
}
*/
let o = new f(); // {a: 1, b: 2}

// 在f函数的原型上定义属性
f.prototype.b = 3;
f.prototype.c = 4;

// 不要在 f 函数的原型上直接定义 f.prototype = {b:3,c:4};这样会直接打破原型链
// o.[[Prototype]] 有属性 b 和 c
//  (其实就是 o.__proto__ 或者 o.constructor.prototype)
// o.[[Prototype]].[[Prototype]] 是 Object.prototype.
// 最后o.[[Prototype]].[[Prototype]].[[Prototype]]是null
// 这就是原型链的末尾，即 null，
// 根据定义，null 就是没有 [[Prototype]]。

// 综上，整个原型链如下:

// {a:1, b:2} ---> {b:3, c:4} ---> Object.prototype---> null

console.log(o.a); // 1
// a是o的自身属性吗？是的，该属性的值为 1

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为 2
// 原型上也有一个'b'属性，但是它不会被访问到。
// 这种情况被称为"属性遮蔽 (property shadowing)"

console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看它的原型上有没有
// c是o.[[Prototype]]的属性吗？是的，该属性的值为 4

console.log(o.d); // undefined
// d 是 o 的自身属性吗？不是，那看看它的原型上有没有
// d 是 o.[[Prototype]] 的属性吗？不是，那看看它的原型上有没有
// o.[[Prototype]].[[Prototype]] 为 null，停止搜索
// 找不到 d 属性，返回 undefined
```

给对象设置属性会创建自有属性。获取和设置属性的唯一限制是内置 getter 或 setter 的属性。

继承方法

JavaScript 并没有其他基于类的语言所定义的“方法”。在 JavaScript 里，任何函数都可以添加到对象上作为对象的属性。函数的继承与其他的属性继承没有差别，包括上面的“属性遮蔽”（这种情况相当于其他语言的方法重写）。

当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象。

```js
var o = {
  a: 2,
  m: function() {
    return this.a + 1;
  }
};

console.log(o.m()); // 3
// 当调用 o.m 时，'this' 指向了 o.

var p = Object.create(o);
// p是一个继承自 o 的对象

p.a = 4; // 创建 p 的自身属性 'a'
console.log(p.m()); // 5
// 调用 p.m 时，'this' 指向了 p
// 又因为 p 继承了 o 的 m 函数
// 所以，此时的 'this.a' 即 p.a，就是 p 的自身属性 'a'
```

#### 在 JavaScript 中使用原型

接下去，来仔细分析一下这些应用场景下， JavaScript 在背后做了哪些事情。

正如之前提到的，在 JavaScript 中，函数（function）是允许拥有属性的。所有的函数会有一个特别的属性 —— prototype 。请注意，以下的代码是独立的（出于严谨，假定页面没有其他的 JavaScript 代码）。为了最佳的学习体验，我们强烈建议阁下打开浏览器的控制台（在 Chrome 和火狐浏览器中，按 Ctrl+Shift+I 即可），进入“console”选项卡，然后把如下的 JavaScript 代码复制粘贴到窗口中，最后通过按下回车键运行代码。

```js
function doSomething() {}
console.log(doSomething.prototype);
// 和声明函数的方式无关，
// JavaScript 中的函数永远有一个默认原型属性。
var doSomething = function() {};
console.log(doSomething.prototype);
```

在控制台显示的 JavaScript 代码块中，我们可以看到 doSomething 函数的一个默认属性 prototype。而这段代码运行之后，控制台应该显示类似如下的结果：

```js
{
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
```

我们可以给 doSomething 函数的原型对象添加新属性，如下：

```js
function doSomething() {}
doSomething.prototype.foo = "bar";
console.log(doSomething.prototype);
```

可以看到运行后的结果如下：

```js
{
    foo: "bar",
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
```

现在我们可以通过 new 操作符来创建基于这个原型对象的 doSomething 实例。使用 new 操作符，只需在调用 doSomething 函数语句之前添加 new。这样，便可以获得这个函数的一个实例对象。一些属性就可以添加到该原型对象中。

请尝试运行以下代码：

```js
function doSomething() {}
doSomething.prototype.foo = "bar"; // add a property onto the prototype
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value"; // add a property onto the object
console.log(doSomeInstancing);
```

运行的结果类似于以下的语句。

```js
{
    prop: "some value",
    __proto__: {
        foo: "bar",
        constructor: ƒ doSomething(),
        __proto__: {
            constructor: ƒ Object(),
            hasOwnProperty: ƒ hasOwnProperty(),
            isPrototypeOf: ƒ isPrototypeOf(),
            propertyIsEnumerable: ƒ propertyIsEnumerable(),
            toLocaleString: ƒ toLocaleString(),
            toString: ƒ toString(),
            valueOf: ƒ valueOf()
        }
    }
}
```

如上所示, doSomeInstancing 中的**proto**是 doSomething.prototype. 但这是做什么的呢？当你访问 doSomeInstancing 中的一个属性，浏览器首先会查看 doSomeInstancing 中是否存在这个属性。

如果 doSomeInstancing 不包含属性信息, 那么浏览器会在 doSomeInstancing 的 **proto** 中进行查找(同 doSomething.prototype). 如属性在 doSomeInstancing 的 **proto** 中查找到，则使用 doSomeInstancing 中 **proto** 的属性。

否则，如果 doSomeInstancing 中 **proto** 不具有该属性，则检查 doSomeInstancing 的 **proto** 的 **proto** 是否具有该属性。默认情况下，任何函数的原型属性 **proto** 都是 window.Object.prototype. 因此, 通过 doSomeInstancing 的 **proto** 的 **proto** ( 同 doSomething.prototype 的 **proto** (同 Object.prototype)) 来查找要搜索的属性。

如果属性不存在 doSomeInstancing 的 **proto** 的 **proto** 中， 那么就会在 doSomeInstancing 的 **proto** 的 **proto** 的 **proto** 中查找。然而, 这里存在个问题：doSomeInstancing 的 **proto** 的 **proto** 的 **proto** 其实不存在。因此，只有这样，在 **proto** 的整个原型链被查看之后，这里没有更多的 **proto** ， 浏览器断言该属性不存在，并给出属性值为 undefined 的结论。

让我们在控制台窗口中输入更多的代码，如下：

```js
function doSomething() {}
doSomething.prototype.foo = "bar";
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value";
console.log("doSomeInstancing.prop:      " + doSomeInstancing.prop);
console.log("doSomeInstancing.foo:       " + doSomeInstancing.foo);
console.log("doSomething.prop:           " + doSomething.prop);
console.log("doSomething.foo:            " + doSomething.foo);
console.log("doSomething.prototype.prop: " + doSomething.prototype.prop);
console.log("doSomething.prototype.foo:  " + doSomething.prototype.foo);
```

结果如下：

```js
doSomeInstancing.prop:      some value
doSomeInstancing.foo:       bar
doSomething.prop:           undefined
doSomething.foo:            undefined
doSomething.prototype.prop: undefined
doSomething.prototype.foo:  bar
```

#### 使用不同的方法来创建对象和生成原型链

使用语法结构创建的对象

```js
var o = { a: 1 };

// o 这个对象继承了 Object.prototype 上面的所有属性
// o 自身没有名为 hasOwnProperty 的属性
// hasOwnProperty 是 Object.prototype 的属性
// 因此 o 继承了 Object.prototype 的 hasOwnProperty
// Object.prototype 的原型为 null
// 原型链如下:
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];

// 数组都继承于 Array.prototype
// (Array.prototype 中包含 indexOf, forEach 等方法)
// 原型链如下:
// a ---> Array.prototype ---> Object.prototype ---> null

function f() {
  return 2;
}

// 函数都继承于 Function.prototype
// (Function.prototype 中包含 call, bind等方法)
// 原型链如下:
// f ---> Function.prototype ---> Object.prototype ---> null
```

使用构造器创建的对象

在 JavaScript 中，构造器其实就是一个普通的函数。当使用 new 操作符 来作用这个函数时，它就可以被称为构造方法（构造函数）。

```js
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function(v) {
    this.vertices.push(v);
  }
};

var g = new Graph();
// g 是生成的对象，他的自身属性有 'vertices' 和 'edges'。
// 在 g 被实例化时，g.[[Prototype]] 指向了 Graph.prototype。
```

使用 Object.create 创建的对象

ECMAScript 5 中引入了一个新方法：Object.create()。可以调用这个方法来创建一个新对象。新对象的原型就是调用 create 方法时传入的第一个参数：

```js
var a = { a: 1 };
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype
```

使用 class 关键字创建的对象

ECMAScript6 引入了一套新的关键字用来实现 class。使用基于类语言的开发人员会对这些结构感到熟悉，但它们是不同的。JavaScript 仍然基于原型。这些新的关键字包括 class, constructor，static，extends 和 super。

```js
"use strict";

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
```

性能

在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。另外，试图访问不存在的属性时会遍历整个原型链。

遍历对象的属性时，原型链上的每个可枚举属性都会被枚举出来。要检查对象是否具有自己定义的属性，而不是其原型链上的某个属性，则必须使用所有对象从 Object.prototype 继承的 hasOwnProperty 方法。下面给出一个具体的例子来说明它：

```js
console.log(g.hasOwnProperty("vertices"));
// true

console.log(g.hasOwnProperty("nope"));
// false

console.log(g.hasOwnProperty("addVertex"));
// false

console.log(g.__proto__.hasOwnProperty("addVertex"));
// true
```

hasOwnProperty 是 JavaScript 中唯一一个处理属性并且不会遍历原型链的方法。（译者注：原文如此。另一种这样的方法：Object.keys()）

> 注意：检查属性是否为 undefined 是不能够检查其是否存在的。该属性可能已存在，但其值恰好被设置成了 undefined。

### this

与其他语言相比，函数的 this 关键字在 JavaScript 中的表现略有不同，此外，在严格模式和非严格模式之间也会有一些差别。

在绝大多数情况下，函数的调用方式决定了 this 的值。this 不能在执行期间被赋值，并且在每次函数被调用时 this 的值也可能会不同。ES5 引入了 bind 方法来设置函数的 this 值，而不用考虑函数如何被调用的，ES2015 引入了支持 this 词法解析的箭头函数（它在闭合的执行环境内设置 this 的值）。

this：当前执行代码的环境对象。

#### 全局环境

无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象。

```js
// 在浏览器中, window 对象同时也是全局对象：
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b); // "MDN"
console.log(b); // "MDN"
```

#### 函数（运行内）环境

在函数内部，this 的值取决于函数被调用的方式。

简单调用

因为下面的代码不在严格模式下，且 this 的值不是由该调用设置的，所以 this 的值默认指向全局对象。

```js
function f1() {
  return this;
}
//在浏览器中：
f1() === window; //在浏览器中，全局对象是window

//在Node中：
f1() === global;
```

然而，在严格模式下，this 将保持他进入执行环境时的值，所以下面的 this 将会默认为 undefined。

```js
function f2() {
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true
```

所以，在严格模式下，如果 this 没有被执行环境（execution context）定义，那它将保持为 undefined。

> 在第二个例子中，this 的确应该是 undefined，因为 f2 是被直接调用的，而不是作为对象的属性或方法调用的（如 window.f2()）。有一些浏览器最初在支持严格模式时没有正确实现这个功能，于是它们错误地返回了 window 对象。

如果要想把 this 的值从一个环境传到另一个，就要用 call 或者 apply 方法。

```js
// 将一个对象作为call和apply的第一个参数，this会被绑定到这个对象。
var obj = { a: "Custom" };

// 这个属性是在global对象定义的。
var a = "Global";

function whatsThis(arg) {
  return this.a; // this的值取决于函数的调用方式
}

whatsThis(); // 'Global'
whatsThis.call(obj); // 'Custom'
whatsThis.apply(obj); // 'Custom'
```

当一个函数在其主体中使用 this 关键字时，可以通过使用函数继承自 Function.prototype 的 call 或 apply 方法将 this 值绑定到调用中的特定对象。

```js
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };

// 第一个参数是作为‘this’使用的对象
// 后续参数作为参数传递给函数调用
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// 第一个参数也是作为‘this’使用的对象
// 第二个参数是一个数组，数组里的元素用作函数调用中的参数
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
```

使用 call 和 apply 函数的时候要注意，如果传递给 this 的值不是一个对象，JavaScript 会尝试使用内部 ToObject 操作将其转换为对象。因此，如果传递的值是一个原始值比如 7 或 'foo'，那么就会使用相关构造函数将它转换为对象，所以原始值 7 会被转换为对象，像 new Number(7) 这样，而字符串 'foo' 转化成 new String('foo') 这样，例如：

```js
function bar() {
  console.log(Object.prototype.toString.call(this));
}

//原始值 7 被隐式转换为对象
bar.call(7); // [object Number]
```

bind 方法

ECMAScript 5 引入了 Function.prototype.bind。调用 f.bind(someObject)会创建一个与 f 具有相同函数体和作用域的函数，但是在这个新函数中，this 将永久地被绑定到了 bind 的第一个参数，无论这个函数是如何被调用的。

```js
function f() {
  return this.a;
}

var g = f.bind({ a: "azerty" });
console.log(g()); // azerty

var h = g.bind({ a: "yoo" }); // bind只生效一次！
console.log(h()); // azerty

var o = { a: 37, f: f, g: g, h: h };
console.log(o.f(), o.g(), o.h()); // 37, azerty, azerty
```

箭头函数

在箭头函数中，this 与封闭词法环境的 this 保持一致。在全局代码中，它将被设置为全局对象：

```js
var globalObject = this;
var foo = () => this;
console.log(foo() === globalObject); // true
```

> 注意：如果将 this 传递给 call、bind、或者 apply，它将被忽略。不过你仍然可以为调用添加参数，不过第一个参数（thisArg）应该设置为 null。

```js
// 接着上面的代码
// 作为对象的一个方法调用
var obj = { foo: foo };
console.log(obj.foo() === globalObject); // true

// 尝试使用call来设定this
console.log(foo.call(obj) === globalObject); // true

// 尝试使用bind来设定this
foo = foo.bind(obj);
console.log(foo() === globalObject); // true
```

无论如何，foo 的 this 被设置为他被创建时的环境（在上面的例子中，就是全局对象）。这同样适用于在其他函数内创建的箭头函数：这些箭头函数的 this 被设置为封闭的词法环境的。

```js
// 创建一个含有bar方法的obj对象，
// bar返回一个函数，
// 这个函数返回this，
// 这个返回的函数是以箭头函数创建的，
// 所以它的this被永久绑定到了它外层函数的this。
// bar的值可以在调用中设置，这反过来又设置了返回函数的值。
var obj = {
  bar: function() {
    var x = () => this;
    return x;
  }
};

// 作为obj对象的一个方法来调用bar，把它的this绑定到obj。
// 将返回的函数的引用赋值给fn。
var fn = obj.bar();

// 直接调用fn而不设置this，
// 通常(即不使用箭头函数的情况)默认为全局对象
// 若在严格模式则为undefined
console.log(fn() === obj); // true

// 但是注意，如果你只是引用obj的方法，
// 而没有调用它
var fn2 = obj.bar;
// 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。
console.log(fn2()() == window); // true
```

在上面的例子中，一个赋值给了 obj.bar 的函数（称为匿名函数 A），返回了另一个箭头函数（称为匿名函数 B）。因此，在 A 调用时，函数 B 的 this 被永久设置为 obj.bar（函数 A）的 this。当返回的函数（函数 B）被调用时，它 this 始终是最初设置的。在上面的代码示例中，函数 B 的 this 被设置为函数 A 的 this，即 obj，所以即使被调用的方式通常将其设置为 undefined 或全局对象（或者如前面示例中的其他全局执行环境中的方法），它的 this 也仍然是 obj 。

作为对象的方法

当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。

下面的例子中，当 o.f()被调用时，函数内的 this 将绑定到 o 对象。

```js
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // logs 37
```

请注意，这样的行为，根本不受函数定义方式或位置的影响。在前面的例子中，我们在定义对象 o 的同时，将函数内联定义为成员 f 。但是，我们也可以先定义函数，然后再将其附属到 o.f。这样做会导致相同的行为：

```js
var o = { prop: 37 };

function independent() {
  return this.prop;
}

o.f = independent;

console.log(o.f()); // logs 37
```

这表明函数是从 o 的 f 成员调用的才是重点。

同样，this 的绑定只受最靠近的成员引用的影响。在下面的这个例子中，我们把一个方法 g 当作对象 o.b 的函数调用。在这次执行期间，函数中的 this 将指向 o.b。事实证明，这与他是对象 o 的成员没有多大关系，最靠近的引用才是最重要的。

```js
o.b = { g: independent, prop: 42 };
console.log(o.b.g()); // 42
```

原型链中的 this

对于在对象原型链上某处定义的方法，同样的概念也适用。如果该方法存在于一个对象的原型链上，那么 this 指向的是调用这个方法的对象，就像该方法在对象上一样。

var o = {
f: function() {
return this.a + this.b;
}
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5

在这个例子中，对象 p 没有属于它自己的 f 属性，它的 f 属性继承自它的原型。虽然在对 f 的查找过程中，最终是在 o 中找到 f 属性的，这并没有关系；查找过程首先从 p.f 的引用开始，所以函数中的 this 指向 p。也就是说，因为 f 是作为 p 的方法调用的，所以它的 this 指向了 p。这是 JavaScript 的原型继承中的一个有趣的特性。

getter 与 setter 中的 this

再次，相同的概念也适用于当函数在一个 getter 或者 setter 中被调用。用作 getter 或 setter 的函数都会把 this 绑定到设置或获取属性的对象。

```js
function sum() {
  return this.a + this.b + this.c;
}

var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3;
  }
};

Object.defineProperty(o, "sum", {
  get: sum,
  enumerable: true,
  configurable: true
});

console.log(o.average, o.sum); // logs 2, 6
```

作为构造函数

当一个函数用作构造函数时（使用 new 关键字），它的 this 被绑定到正在构造的新对象。

> 虽然构造器返回的默认值是 this 所指的那个对象，但它仍可以手动返回其他的对象（如果返回值不是一个对象，则返回 this 对象）。

```js
/*
 * 构造函数这样工作:
 *
 * function MyConstructor(){
 *   // 函数实体写在这里
 *   // 根据需要在this上创建属性，然后赋值给它们，比如：
 *   this.fum = "nom";
 *   // 等等...
 *
 *   // 如果函数具有返回对象的return语句，
 *   // 则该对象将是 new 表达式的结果。
 *   // 否则，表达式的结果是当前绑定到 this 的对象。
 *   //（即通常看到的常见情况）。
 * }
 */

function C() {
  this.a = 37;
}

var o = new C();
console.log(o.a); // logs 37

function C2() {
  this.a = 37;
  return { a: 38 };
}

o = new C2();
console.log(o.a); // logs 38
```

在刚刚的例子中（C2），因为在调用构造函数的过程中，手动的设置了返回对象，与 this 绑定的默认对象被丢弃了。（这基本上使得语句 “this.a = 37;”成了“僵尸”代码，实际上并不是真正的“僵尸”，这条语句执行了，但是对于外部没有任何影响，因此完全可以忽略它）。

作为一个 DOM 事件处理函数

当函数被用作事件处理函数时，它的 this 指向触发事件的元素（一些浏览器在使用非 addEventListener 的函数动态添加监听函数时不遵守这个约定）。

```js
// 被调用时，将关联的元素变成蓝色
function bluify(e) {
  console.log(this === e.currentTarget); // 总是 true

  // 当 currentTarget 和 target 是同一个对象时为 true
  console.log(this === e.target);
  this.style.backgroundColor = "#A5D9F3";
}

// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName("*");

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", bluify, false);
}
```

作为一个内联事件处理函数

当代码被内联 on-event 处理函数调用时，它的 this 指向监听器所在的 DOM 元素：

```js
<button onclick="alert(this.tagName.toLowerCase());">Show this</button>
```

上面的 alert 会显示 button。注意只有外层代码中的 this 是这样设置的：

```js
<button onclick="alert((function(){return this})());">Show inner this</button>
```

在这种情况下，没有设置内部函数的 this，所以它指向 global/window 对象（即非严格模式下调用的函数未设置 this 时指向的默认对象）。

### 执行上下文（EC）

### 正则表达式

正则表达式（英语：Regular Expression，在代码中常简写为 regex、regexp 或 RE）使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式。

搜索模式可用于文本搜索和文本替换。

语法：`/正则表达式主体/修饰符(可选)`

正则表达式修饰符(修饰符可以在全局搜索中不区分大小写):
|修饰符|描述|
|--|--|
|i|执行对大小写不敏感的匹配。|
|g|执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。|
|m|执行多行匹配。|

正则表达式模式:

方括号用于查找某个范围内的字符：

| 表达式             | 描述                               |
| ------------------ | ---------------------------------- |
| [abc]              | 查找方括号之间的任何字符。         |
| [^abc]             | 查找任何不在方括号之间的字符。     |
| [0-9]              | 查找任何从 0 至 9 的数字。         |
| [a-z]              | 查找任何从小写 a 到小写 z 的字符。 |
| [A-Z]              | 查找任何从大写 A 到大写 Z 的字符。 |
| [A-z]              | 查找任何从大写 A 到小写 z 的字符。 |
| [adgk]             | 查找给定集合内的任何字符。         |
| [^adgk]            | 查找给定集合外的任何字符。         |
| (red\|blue\|green) | 查找任何指定的选项。               |

元字符是拥有特殊含义的字符：

| 元字符 | 描述                                        |
| ------ | ------------------------------------------- |
| .      | 查找单个字符，除了换行和行结束符。          |
| \w     | 查找单词字符。                              |
| \W     | 查找非单词字符。                            |
| \d     | 查找数字。                                  |
| \D     | 查找非数字字符。                            |
| \s     | 查找空白字符。                              |
| \S     | 查找非空白字符。                            |
| \b     | 匹配单词边界。                              |
| \B     | 匹配非单词边界。                            |
| \0     | 查找 NUL 字符。                             |
| \n     | 查找换行符。                                |
| \f     | 查找换页符。                                |
| \r     | 查找回车符。                                |
| \t     | 查找制表符。                                |
| \v     | 查找垂直制表符。                            |
| \xxx   | 查找以八进制数 xxx 规定的字符。             |
| \xdd   | 查找以十六进制数 dd 规定的字符。            |
| \uxxxx | 查找以十六进制数 xxxx 规定的 Unicode 字符。 |

量词:

| 量词   | 描述                                        |
| ------ | ------------------------------------------- |
| n+     | 匹配任何包含至少一个 n 的字符串。           |
| n\*    | 匹配任何包含零个或多个 n 的字符串。         |
| n?     | 匹配任何包含零个或一个 n 的字符串。         |
| n{X}   | 匹配包含 X 个 n 的序列的字符串。            |
| n{X,Y} | 匹配包含 X 至 Y 个 n 的序列的字符串。       |
| n{X,}  | 匹配包含至少 X 个 n 的序列的字符串。        |
| n\$    | 匹配任何结尾为 n 的字符串。                 |
| ^n     | 匹配任何开头为 n 的字符串。                 |
| ?=n    | 匹配任何其后紧接指定字符串 n 的字符串。     |
| ?!n    | 匹配任何其后没有紧接指定字符串 n 的字符串。 |

RegExp 对象属性:

| 属性       | 描述                                     |
| ---------- | ---------------------------------------- |
| global     | RegExp 对象是否具有标志 g。              |
| ignoreCase | RegExp 对象是否具有标志 i。              |
| lastIndex  | 一个整数，标示开始下一次匹配的字符位置。 |
| multiline  | RegExp 对象是否具有标志 m。              |
| source     | 正则表达式的源文本。                     |

支持正则表达式的 String 对象的方法:

| 方法    | 描述                             |
| ------- | -------------------------------- |
| search  | 检索与正则表达式相匹配的值。     |
| match   | 找到一个或多个正则表达式的匹配。 |
| replace | 替换与正则表达式匹配的子串。     |
| split   | 把字符串分割为字符串数组。       |

### 事件循环

JavaScript 的并发模型基于“事件循环”。这个模型与像 C 或者 Java 这种其它语言中的模型截然不同。

#### 运行时概念

下面的内容解释了一个理论模型。现代 JavaScript 引擎实现并着重优化了所描述的这些语义。

##### 可视化描述

![runtime](https://developer.mozilla.org/files/4617/default.svg)

##### 栈

函数调用形成了一个栈帧。

```js
function foo(b) {
  var a = 10;
  return a + b + 11;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(7)); // 返回 42
```

当调用 bar 时，创建了第一个帧 ，帧中包含了 bar 的参数和局部变量。当 bar 调用 foo 时，第二个帧就被创建，并被压到第一个帧之上，帧中包含了 foo 的参数和局部变量。当 foo 返回时，最上层的帧就被弹出栈（剩下 bar 函数的调用帧 ）。当 bar 返回的时候，栈就空了。

##### 堆

对象被分配在一个堆中，即用以表示一大块非结构化的内存区域。

##### 队列

一个 JavaScript 运行时包含了一个待处理的消息队列。每一个消息都关联着一个用以处理这个消息的函数。

在事件循环期间的某个时刻，运行时从最先进入队列的消息开始处理队列中的消息。为此，这个消息会被移出队列，并作为输入参数调用与之关联的函数。正如前面所提到的，调用一个函数总是会为其创造一个新的栈帧。

函数的处理会一直进行到执行栈再次为空为止；然后事件循环将会处理队列中的下一个消息（如果还有的话）。

#### 事件循环

之所以称之为事件循环，是因为它经常按照类似如下的方式来被实现：

```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

如果当前没有任何消息，queue.waitForMessage() 会同步地等待消息到达。

##### "执行至完成"

每一个消息完整地执行后，其它消息才会被执行。这为程序的分析提供了一些优秀的特性，包括：一个函数执行时，它永远不会被抢占，并且在其他代码运行之前完全运行（且可以修改此函数操作的数据）。这与 C 语言不同，例如，如果函数在线程中运行，它可能在任何位置被终止，然后在另一个线程中运行其他代码。

这个模型的一个缺点在于当一个消息需要太长时间才能处理完毕时，Web 应用就无法处理用户的交互，例如点击或滚动。浏览器用“程序需要过长时间运行”的对话框来缓解这个问题。一个很好的做法是缩短消息处理，并在可能的情况下将一个消息裁剪成多个消息。

##### 添加消息

在浏览器里，当一个事件发生且有一个事件监听器绑定在该事件上时，消息会被随时添加进队列。如果没有事件监听器，事件会丢失。所以点击一个附带点击事件处理函数的元素会添加一个消息，其它事件类似。

函数 setTimeout 接受两个参数：待加入队列的消息和一个延迟（可选，默认为 0）。这个延迟代表了消息被实际加入到队列的最小延迟时间。如果队列中没有其它消息，在这段延迟时间过去之后，消息会被马上处理。但是，如果有其它消息，setTimeout 消息必须等待其它消息处理完。因此第二个参数仅仅表示最少延迟时间，而非确切的等待时间。

下面的例子演示了这个概念（setTimeout 并不会在计时器到期之后直接执行）：

```js
const s = new Date().getSeconds();

setTimeout(function() {
  // 输出 "2"，表示回调函数并没有在 500 毫秒之后立即执行
  console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
}, 500);

while (true) {
  if (new Date().getSeconds() - s >= 2) {
    console.log("Good, looped for 2 seconds");
    break;
  }
}
```

##### 零延迟

零延迟并不意味着回调会立即执行。以 0 为第二参数调用 setTimeout 并不表示在 0 毫秒后就立即调用回调函数。

其等待的时间取决于队列里待处理的消息数量。在下面的例子中，"这是一条消息" 将会在回调获得处理之前输出到控制台，这是因为延迟参数是运行时处理请求所需的最小等待时间，但并不保证是准确的等待时间。

基本上，setTimeout 需要等待当前队列中所有的消息都处理完毕之后才能执行，即使已经超出了由第二参数所指定的时间。

```js
(function() {
  console.log("这是开始");

  setTimeout(function cb() {
    console.log("这是来自第一个回调的消息");
  });

  console.log("这是一条消息");

  setTimeout(function cb1() {
    console.log("这是来自第二个回调的消息");
  }, 0);

  console.log("这是结束");
})();

// "这是开始"
// "这是一条消息"
// "这是结束"
// 此处，函数返回了 undefined
// "这是来自第一个回调的消息"
// "这是来自第二个回调的消息"
```

##### 多个运行时互相通信

一个 web worker 或者一个跨域的 iframe 都有自己的栈，堆和消息队列。两个不同的运行时只能通过 postMessage 方法进行通信。如果另一个运行时侦听 message 事件，则此方法会向该运行时添加消息。

#### 永不阻塞

事件循环模型的一个非常有趣的特性是，与许多其他语言不同，JavaScript 永不阻塞。 处理 I/O 通常通过事件和回调来执行，所以当一个应用正等待一个 IndexedDB 查询返回或者一个 XHR 请求返回时，它仍然可以处理其它事情，比如用户输入。

遗留的例外是存在的，如 alert 或者同步 XHR，但应该尽量避免使用它们。注意，例外的例外也是存在的（但通常是实现错误而非其它原因）。

## 开发框架

### Vue VS React

#### 起源

| Vue                                                                                                                                                                                                                       | React                                                                                                                                                               |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Google 前工程师尤雨溪于 2014 年创建了这个框架。Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。 | 与 Vue 不同，react 库是由 Facebook 创建的。最初是为了 Facebook 广告流量管理创建的。那时 Facebook 遇到了维护和编码方面的问题。它以动态创建和交互式 UI 的能力而闻名。 |

#### 介绍

| Vue                                                                                                                                                                                                                                                                                                   | React                                                                                                                                                       |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。 | React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。 |

#### 运行时性能

| Vue                                                                                                                                                                                          | React                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。你可以理解为每一个组件都已经自动获得了 shouldComponentUpdate，并且没有 React 的子树问题限制。 | 在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。如要避免不必要的子组件的重渲染，你需要在所有可能的地方使用 PureComponent，或是手动实现 houldComponentUpdate 方法。同时你可能会需要使用不可变的数据结构来使得你的组件更容易被优化。然而，使用 PureComponent 和 shouldComponentUpdate 时，需要保证该组件的整个子树的渲染输出都是由该组件的 props 所决定的。如果不符合这个情况，那么此类优化就会导致难以察觉的渲染结果不一致。这使得 React 中的组件优化伴随着相当的心智负担。 |

#### 核心思想

| Vue                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | React                                                                                                                                                                                                                                                                                                                                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vue 也提供了渲染函数，甚至支持 JSX。然而，我们默认推荐的还是模板。任何合乎规范的 HTML 都是合法的 Vue 模板，这也带来了一些特有的优势：对于很多习惯了 HTML 的开发者来说，模板比起 JSX 读写起来更自然。这里当然有主观偏好的成分，但如果这种区别会导致开发效率的提升，那么它就有客观的价值存在。基于 HTML 的模板使得将已有的应用逐步迁移到 Vue 更为容易。这也使得设计师和新人开发者更容易理解和参与到项目中。你甚至可以使用其他模板预处理器，比如 Pug 来书写 Vue 的模板。 | 在 React 中，所有的组件的渲染功能都依靠 JSX。JSX 是使用 XML 语法编写 JavaScript 的一种语法糖。使用 JSX 的渲染函数有下面这些优势：你可以使用完整的编程语言 JavaScript 功能来构建你的视图页面。比如你可以使用临时变量、JS 自带的流程控制、以及直接引用当前 JS 作用域中的值等等。开发工具对 JSX 的支持相比于现有可用的其他 Vue 模板还是比较先进的 (比如，linting、类型检查、编辑器的自动完成)。 |

#### 组件

##### vue

vue 组件定义使用 xx.vue 文件来表示，vue 组件将 html、css、js 组合到一起，模板部分使用数据使用{{}}，形式如下：

```js
// 模板(html)
<template>
  <div>{{name}}</div>
</template>

// 数据管理(js)
<script>
export default {
  name: 'NewComponent',
  data() {
    return {
      name: 'xx'
    }
  }
}
</script>

// 样式(css)
<style scoped>

</style>
```

组件使用：

```js
<new-component name="xx" />
```

##### react

react 推荐使用 jsx 或者 js 文件来表示组件，react 支持 class 组件和 function 组件 2 种形式，react 使用{}包裹变量，这点需要注意。

> 注意： 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。

（1）class 组件

```js
import React from "react";

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "xx"
    };
  }
  render() {
    rerurn(<div>{name}</div>);
  }
}

export default NewComponent;
```

（2）function 组件

hooks 的出现赋予了 function 组件管理 state 的能力。

```js
import React, { useState } from "react";

function NewComponent() {
  const [name, setName] = useState("");
  return <div>{name}</div>;
}

export default NewComponent;
```

#### 数据管理

vue 与 react 都是单向数据流，这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

##### vue

data:

props:

##### react

state:

props:

#### 组件通信

##### vue

props/\$emit:

##### react

props/回调:

#### CSS

#### 生命周期

#### 事件处理

## 跨平台开发

### WEEX

### Flutter

### Electron

## 服务器端渲染(SSR)

### Nuxt.js

### Next.js

## UI 框架

### Ant-design

### element

## runtime

### node.js

## 打包工具

### Webpack

### Rollup

## 转译工具

### Babel

## 语法检查

### ESlint

## 代码格式化

### Prettier

## CSS 预编译器

### Less

### Sass
