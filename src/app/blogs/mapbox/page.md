# 使用 mapbox-gl 创建数据可视化地图

![banner](/images/blogs/blog/mapbox.png)

Mapbox GL JS 是一个 JavaScript 库，它使用 WebGL，以 vector tiles 和 Mapbox styles 为来源，将它们渲染成互动式地图。它是 Mapbox GL 生态系统的一部分，其中还包括 Mapbox Mobile，它是一个用 C++ 编写的兼容桌面和移动平台的渲染引擎。

## 使用方式

mapbox 请求数据需要申请 token，分为公共密钥和私密密钥，对应不同等级的功能。

- script 引入

```html
<script src="https://api.tiles.mapbox.com/mapbox-gl-js/v1.1.1/mapbox-gl.js"></script>
<link
  href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.1.1/mapbox-gl.css"
  rel="stylesheet"
/>
```

```js
mapboxgl.accessToken = "your_token";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9"
});
```

- npm

```sh
npm install --save mapbox-gl
```

```js
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "your_token";
const map = new mapboxgl.Map({
  container: "<your HTML element id>",
  style: "mapbox://styles/mapbox/streets-v9"
});
```

## 核心概念

### Map

Map 对象代表页面上的地图。它暴露了一系列的方法和属性使得用户可以通过编程开发对地图进行修改，并在用户与地图交互时触发一系列的事件。

### Sources

Sources 用于指定将在地图中渲染的地理要素。 Source 对象可通过 Map#getSource 获得。

### Style

Mapbox 样式是一种定义地图视觉外观的文档:绘制什么数据、绘制它的顺序以及在绘制数据时如何对数据进行样式化。样式文档是具有特定根级别和嵌套属性的 JSON 对象。该规范定义并描述了这些属性。

## 业务使用

### 初始化地图

```js
const map = new mapboxgl.Map({
  container: "mapbox",
  style: {
    version: 8,
    sources: {},
    layers: []
  }
});
```

此处举例为重要参数，container 为地图容器的 id，style 为初始化地图时的默认样式。version 为 mapbox 默认样式版本，sources 为初始化地图时添加的数据源，layers 为初始化地图时添加的图层。

### 添加瓦片图层(以天地图为例)

```js
const tdtServer = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
map.addLayer({
  id: "tdtLayer",
  type: "raster",
  source: {
    type: "raster",
    tiles: tdtServer.map(
      i =>
        `http://${i}.tianditu.gov.cn/DataServer?tk=此处为你申请的token&T=img_w&x={x}&y={y}&l={z}`
    ),
    tileSize: 256
  }
});
```

瓦片服务为 raster 类型的数据源,tiles 是提供瓦片的服务地址数组,如果填写多个,创建图层时将交叉申请数组中的每一个服务地址。

### 添加 geojson 线路及标注

```js
const lineData = [
  [120.28106689453125, 30.581179257386985],
  [120.1904296875, 30.585908257485578],
  [120.09979248046874, 30.581179257386985],
  [119.97894287109376, 30.57881467083501],
  [119.92401123046875, 30.56462594065098],
  [119.9212646484375, 30.519681272749402],
  [119.90753173828125, 30.453409130203596],
  [119.90478515625, 30.39656853856939],
  [119.90203857421875, 30.339694848974247],
  [119.871826171875, 30.28041626667403],
  [119.8773193359375, 30.194992169502903],
  [119.84161376953125, 30.135626231134587],
  [119.83062744140625, 30.071470887901302],
  [119.871826171875, 29.87637380707133],
  [119.79766845703125, 29.83111376473715],
  [119.68505859375, 29.773913869992242],
  [119.61090087890625, 29.711910431038035],
  [119.55596923828124, 29.66180275761379],
  [119.49279785156249, 29.602118211647333],
  [119.45709228515625, 29.532839863453397],
  [119.49554443359376, 29.463514026304715],
  [119.61639404296874, 29.34387539941801],
  [119.66583251953124, 29.31993078977759],
  [119.718017578125, 29.250459642950652],
  [119.73724365234375, 29.159357041355424]
];
//添加线路
this.map.addLayer({
  id: "route",
  type: "line",
  source: {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: lineData
      }
    }
  },
  layout: {
    "line-join": "round",
    "line-cap": "round"
  },
  paint: {
    "line-color": "#0f0",
    "line-width": 3
  }
});
//添加线路文本标注
this.map.addLayer({
  id: "textlabel",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {
        text: "这里有线"
      },
      geometry: {
        type: "LineString",
        coordinates: lineData
      }
    }
  },
  layout: {
    "symbol-placement": "line",
    "text-font": ["Microsoft YaHei UI Regular"],
    "symbol-spacing": 50,
    "text-field": ["get", "text"],
    "text-size": 12,
    "text-keep-upright": true,
    "text-allow-overlap": true,
    "text-pitch-alignment": "map",
    "text-offset": [0, 0.7]
  },
  paint: {
    "text-color": "white"
  }
});
```

此处添加了两个图层，一个是线路，一个是线路的文本标注。

线路为line类型的数据源，然后将geojson传入即可显示。线路文本为symbol类型的数据源，也要传入geojson以表明文本需要显示的位置。
