# 学习使用花里胡哨的Console

## 基础方法

### Console.assert()

判断第一个参数是否为真，false 的话抛出异常并且在控制台输出相应信息。

### Console.clear()

清空控制台，并输出 Console was cleared。

### Console.count()

以参数为标识记录调用的次数，调用时在控制台打印标识以及调用次数。

### Console.countReset()

重置指定标签的计数器值。

### Console.debug()

在控制台打印一条 "debug" 级别的消息。

### Console.dir()

显示一个由特定的 Javascript 对象列表组成的可交互列表。这个列表可以使用三角形隐藏和显示来审查子对象的内容。

### Console.dirxml()

打印 XML/HTML 元素表示的指定对象，否则显示 JavaScript 对象视图。

### Console.error()

打印一条错误信息，使用方法可以参考 string substitution。

### Console.group()

创建一个新的内联 group, 后续所有打印内容将会以子层级的形式展示。调用 groupEnd()来闭合组。

### Console.groupCollapsed()

创建一个新的内联 group。使用方法和 group() 相同，不同的是，groupCollapsed() 方法打印出来的内容默认是折叠的。调用groupEnd()来闭合组。

### Console.groupEnd()

闭合当前内联 group。

### Console.info()

打印资讯类说明信息，使用方法可以参考 string substitution。

### Console.log()

打印内容的通用方法，使用方法可以参考 string substitution。

### Console.table()

将列表型的数据打印成表格。

### Console.time()

启动一个以入参作为特定名称的计时器，在显示页面中可同时运行的计时器上限为10,000.

### Console.timeEnd()

结束特定的 计时器 并以豪秒打印其从开始到结束所用的时间。

### Console.timeLog()

打印特定 计时器 所运行的时间。

### Console.timeStamp()

添加一个标记到浏览器的 Timeline 或 Waterfall 工具。

### Console.trace()

输出一个 stack trace。

### Console.warn()

打印一个警告信息，可以使用 string substitution 和额外的参数。

## 定义样式

例如：

```js
console.log("This is %cMy stylish message", "color: yellow; font-style: italic; background-color: blue;padding: 2px");
```

%c 语法可用的属性如下 (至少在 Firefox 中是这样，别的浏览器会有诸多不同)：

- background 与其全写版本。
- border 与其全写版本。
- border-radius
- box-decoration-break
- box-shadow
- clear 和 float
- color
- cursor
- display
- font 与其全写版本。
- line-height
- margin
- outline 与其全写版本。
- padding
- text-transform 这类 text-* 属性
- white-space
- word-spacing 和 word-break
- writing-mode

::: tip 注意
注意: 控制台信息的默认行为与行内元素相似。为了应用 padding, margin 这类效果，你应当这样设置display: inline-block.。
:::

<Valine></Valine>
