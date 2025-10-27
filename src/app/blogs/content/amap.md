# 高德 JS api 总结

![banner](/images/blogs/blog/amap.png)

## Vue 中引入高德地图 api

- npm 包引入

```sh
npm i amap-js -S
```

优点：开箱即用，使用简单

- script 脚本引入

在 index.html 中加入链接，链接后跟申请的 key。

```html
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=[key]"
></script>
<script src="https://webapi.amap.com/ui/1.1/main.js"></script>
```

在 vue.config.js 中配置全局名，在代码中可以通过 vue 实例直接调用。

```js
module.exports = {
  configureWebpack: {
    externals: {
      AMap: "AMap",
      AMapUI: "AMapUI"
    }
  };
}
```

优点：定制化程度高，可以按需组合功能。

## 高德地图基础概念

### 地图

![1](/images/blogs/blog/amap/1.png)

地图是高德地图 api 的承载，所有的 api 都需要由一个地图来接收，同一个界面可以有多个地图。

```html
<!-- 地图 -->
<div id="container" style="width: 100%; height: 100%"></div>
```

```js
this.map = new this.AMap.Map("container", {
  resizeEnable: true, // 是否监控地图容器尺寸变化
  zoom: 15, // 初始化地图层级
  zooms: [5, 18], //地图允许缩放的层级
  center: [117.96, 40.96], // 初始化地图中心点
  mapStyle: "amap://styles/407154d906b9cd83d4e5e57df8b27cec" //自定义地图发布的样式
});
```

### 图层

图层是覆盖在地图上的一个个层，每一层具有不同的功能，层与层之间拥有层级关系。

- 官方图层

![2](/images/blogs/blog/amap/2.png)

| 类名     | 说明            | 是否插件 |
| :---: | :---: | :---: |
| AMap.TileLayer       | 切片图层类                                  | 否       |
| AMap.TileLayer.Satellite | 卫星图层类，继承自 TileLayer                 | 否       |
| AMap.TileLayer.RoadNet   | 路网图层类，继承自 TileLayer                    | 否       |
| AMap.TileLayer.Traffic   | 实时交通图层类，继承自 TileLayer               | 否       |
| AMap.Buildings           | 楼块图层，独立显示矢量楼块数据的一种图层         | 否       |
| AMap.MassMarks           | 图海量麻点图层类                             | 否       |
| AMap.Heatmap             | 热力图插件                                   | 是       |
| AMap.LayerGroup          | 图层集合，用来包装其它图层类的实例并对集合做批量操作 | 否       |
| AMap.LabelsLayer         | 标注图层，用于添加 LabelMarker 类型标注         | 否       |

```js
// 卫星
let satellite = new AMap.TileLayer.Satellite();
// 路网
let road = new AMap.TileLayer.RoadNet();
this.map.setLayers([satellite, road]);
```

- 自建图层

![3](/images/blogs/blog/amap/3.png)

| 类名                    | 说明                                                                    | 是否插件 |
| ----------------------- | ----------------------------------------------------------------------- | -------- |
| AMap.TileLayer.Flexible | 自定义切片图层，即可灵活自定义切片内容的栅格图层，继承自 AMap.TileLayer | 否       |
| AMap.ImageLayer         | 图片图层，可将图片叠加在地图的对应区域                                  | 否       |
| AMap.CanvasLayer        | Canvas 图层，可将 Canvas 叠加在地图的对应区域                           | 否       |
| AMap.VideoLayer         | Video 图层，可将视频叠加在地图的对应区域                                | 否       |
| AMap.CustomLayer        | 完全自定义绘制的图层                                                    | 否       |

```js
let imageLayer = new AMap.ImageLayer({
  url:
    "http://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg",
  bounds: new AMap.Bounds([116.327911, 39.939229], [116.342659, 39.946275])
});
```

- WMS/WMTS

![4](/images/blogs/blog/amap/4.png)

| 类名                | 描述                          | 是否插件 |
| ------------------- | ----------------------------- | -------- |
| AMap.TileLayer.WMS  | 用于加载 OGC 标准的 WMS 图层  | 否       |
| AMap.TileLayer.WMTS | 用于加载 OGC 标准的 WMTS 图层 | 否       |

```js
var wms = new AMap.TileLayer.WMTS({
  url:
    "https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/",
  blend: false,
  tileSize: 256,
  params: {
    Layer: "0",
    Version: "1.0.0",
    Format: "image/png",
    TileMatrixSet: "EPSG:3857"
  }
});
```

### 覆盖物

覆盖物是绘制在地图上的一些矢量图形或图标。

- Marker 类

点标记，图标可以自定义。

![5](/images/blogs/blog/amap/5.png)

- Text 类

文本标注，可以添加自定义样式的文本。

![6](/images/blogs/blog/amap/6.png)

- Polyline 类

折线

![7](/images/blogs/blog/amap/7.png)

- Polygon 类

多边形

![8](/images/blogs/blog/amap/8.png)

- BezierCurve 类

贝塞尔曲线

![9](/images/blogs/blog/amap/9.png)

- Circle 类

圆形

![10](/images/blogs/blog/amap/10.png)

- OverlayGroup 类

OverlayGroup 是覆盖物管理类，可以用此类批量管理覆盖物的显示隐藏及其他操作。

### 信息窗体

信息窗体是根据地图位置偏移显示在界面上的一个 HTML 节点。

![11](/images/blogs/blog/amap/11.png)

```js
this.infoWindow = new this.AMap.InfoWindow({
  isCustom: true,
  autoMove: true,
  closeWhenClickMap: true,
  anchor: "top-left",
  content: document.getElementById("infoWindow"),
  offset: new this.AMap.Pixel(22, 22)
});
```

### 地图控件

地图控件是官方封装的一些用来控制地图操作的组件。

| 控件名称        | 说明                                                                                     | 是否插件 |
| --------------- | ---------------------------------------------------------------------------------------- | -------- |
| AMap.ControlBar | 组合了旋转、倾斜、复位、缩放在内的地图控件，在 3D 地图模式下会显示（自 V1.4.0 版本新增） | 是       |
| AMap.MapType    | 地图类型切换插件，用来切换固定的几个常用图层                                             | 是       |
| AMap.OverView   | 地图鹰眼插件，默认在地图右下角显示缩略图                                                 | 是       |
| AMap.Scale      | 地图比例尺插件                                                                           | 是       |
| AMap.ToolBar    | 地图工具条插件，可以用来控制地图的缩放和平移                                             | 是       |

```js
this.map.plugin(["AMap.ControlBar"], () => {
  let controlBar = new AMap.ControlBar(Options);
  this.map.addControl(controlBar);
});
```

### 工具

| 插件名称               | 说明                                  | 是否插件 |
| ---------------------- | ------------------------------------- | -------- |
| AMap.MouseTool         | 鼠标工具插件                          | 是       |
| AMap.CircleEditor      | 圆编辑插件，用于编辑 AMap.Circle 对象 | 是       |
| AMap.PolyEditor        | 折线、多边形编辑插件                  | 是       |
| AMap.BezierCurveEditor | 贝瑟尔曲线编辑插件                    | 是       |
| AMap.EllipseEditor     | 椭圆编辑插件                          | 是       |
| AMap.RectangleEditor   | 矩形编辑插件                          | 是       |
| AMap.Hotspot           | 地图热点                              | 是       |
| AMap.MarkerClusterer   | 点聚合插件                            | 是       |
| AMap.RangingTool       | 距离量测插件                          | 是       |

### 事件监听

使用`on( eventName, handler, context)`和`off( eventName, handler, context)`方法对地图及地图元素进行监听。

eventName：事件名称（必填）

handler：事件回调函数（必填）

context：事件回调中的上下文（可选，缺省时，handler 中 this 为调用 on 方法的对象本身，否则 this 指向 context 引用的对象）

注意：多次绑定时，当 eventName、handler 函数对象、context 对象有任意一个不一样就会再次绑定。
