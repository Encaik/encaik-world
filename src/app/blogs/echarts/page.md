# Echarts 的使用及配置项对照

![banner](/images/blogs/blog/echarts.png)

## 使用

- 标签引入

[在 Github 获取 Echarts](https://github.com/apache/incubator-echarts/releases)

- npm

```sh
npm install echarts --save
```

```js
var echarts = require("echarts");
```

### 准备容器

```html
<body>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div id="main" style="width:600px;height:400px;"></div>
</body>
```

这个 div 就是 Echarts 使用的容器，Echarts 将会生成一个相同大小的 canvas 标签插入到 div 中，通过 id 获取位置，所以如果页面中有多个图表，容器的 id 是不可以重复的。

### 初始化及添加配置项

```js
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById("main"));

// 指定图表的配置项和数据
var option = {
  title: {
    text: "ECharts 入门示例"
  },
  tooltip: {},
  legend: {
    data: ["销量"]
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
```

可以看到插入图表的操作很简单，可以分为两步：

1. 通过 id 找到容易，声明 echarts 的初始化
2. 使用 setOption 方法将配置项给图表

::: tip 注意
主流的框架中，使用 echarts 需要在 dom 挂载完成后，否则初始化时无法找到 dom 将会报错
:::

### 定时刷新

如果遇到数据要定时刷新的情况，可以将 option 对象定义为方法，然后传入数据返回 option。通过图标对象调用 setOption 即可刷新数据。

## 配置项

以下是一些常用配置项，带`*`的是比较重要的配置项。配置项在文档中都很清楚，这里只对他们的含义做一个对照，Echarts 的核心在于配置项，熟悉了配置项的使用就可以满足业务使用了。

- title——图表标题
- \*legend——图表标注
- \*grid——图表布局
- \*xAxis——X 轴（笛卡尔坐标系）
- \*yAxis——Y 轴（笛卡尔坐标系）
- polar——极坐标（适用于原笛卡尔坐标系图表）
- radiusAxis——径向轴（极坐标）
- angleAxis——角度轴（极坐标）
- radar——雷达图坐标系
- dataZoom——图表缩放
- \*tooltip——提示气泡框
- axisPointer——坐标轴指示器
- \*toolbox——工具组件
- brush——刷取部分数据
- geo——地图信息绘制
- parallel——平行坐标系
- parallelAxis——平行坐标轴（平行坐标系）
- singleAxis——单轴坐标系
- timeline——时间线
- calendar——日历坐标系
- \*series——数据
- textStyle——文本样式
- color——色彩样式

<Valine></Valine>
