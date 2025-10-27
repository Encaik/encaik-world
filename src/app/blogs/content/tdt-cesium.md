# 天地图 api 及 Cesium.js 库总结

## 常用地图 api 文档链接

- [谷歌地图](https://developers.google.com/maps/documentation/javascript/tutorial?hl=zh-cn)

- [高德地图](https://lbs.amap.com/api/javascript-api/summary)

- [百度地图](http://lbsyun.baidu.com/index.php?title=jspopularGL)

- [天地图](http://lbs.tianditu.gov.cn/api/js4.0/examples.html)

## 常用 js 库文档链接

- [Mapbox](https://www.mapbox.com/)

- [three-geo](https://github.com/w3reality/three-geo)

- [Cesium](https://cesium.com/docs/)

- [ArcGIS](https://developers.arcgis.com/javascript/latest/api-reference/)

- [openlayers](https://openlayers.org/en/latest/examples/)

## CesiumJs + 天地图

天地图及 CesiumJs 对 webpack 支持度差，步骤繁琐，因此采用脚本引入方式。

此处是[CesiumJs webpack 配置](https://cesium.com/docs/tutorials/cesium-and-webpack/)及[天地图 nodejs 配置](http://lbs.tianditu.gov.cn/docs/#/sanwei/)

### CesiumJs 页面模板

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script src="https://cesium.com/downloads/cesiumjs/releases/1.69/Build/Cesium/Cesium.js"></script>
    <link
      href="https://cesium.com/downloads/cesiumjs/releases/1.69/Build/Cesium/Widgets/widgets.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="cesiumContainer" style="width: 700px; height:400px"></div>
    <script>
      Cesium.Ion.defaultAccessToken = "token";
      var viewer = new Cesium.Viewer("cesiumContainer");
    </script>
  </body>
</html>
```

### 天地图 api

```html
<script src="http://api.tianditu.gov.cn/cdn/plugins/cesium/cesiumTdt.js"></script>
```

> 注意：天地图 api 只能与 CesiumJS 特定版本搭配使用，推荐 1.63.1 版本

### 修改 CesiumJS 配置

```js
Cesium.Ion.defaultAccessToken = "token";
var viewer = new Cesium.Viewer("cesiumContainer", {
  animation: false, //是否创建动画小器件，左下角仪表
  baseLayerPicker: false, //是否显示图层选择器
  fullscreenButton: false, //是否显示全屏按钮
  geocoder: false, //是否显示geocoder小器件，右上角查询按钮
  homeButton: false, //是否显示Home按钮
  infoBox: false, //是否显示信息框
  sceneModePicker: false, //是否显示3D/2D选择器
  selectionIndicator: false, //是否显示选取指示器组件
  timeline: false, //是否显示时间轴
  navigationHelpButton: false //是否显示右上角的帮助按钮
});
//去除版权信息
viewer._cesiumWidget._creditContainer.style.display = "none";
// 将三维球定位到中国
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
  orientation: {
    heading: Cesium.Math.toRadians(348.4202942851978),
    pitch: Cesium.Math.toRadians(-89.74026687972041),
    roll: Cesium.Math.toRadians(0)
  },
  complete: function callback() {
    // 定位完成之后的回调函数
  }
});
```

### 在 CesiumJS 中添加天地图 api

```js
// 叠加影像服务
var imgMap = new Cesium.UrlTemplateImageryProvider({
  url: tdtUrl + "DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + token,
  subdomains: subdomains,
  tilingScheme: new Cesium.WebMercatorTilingScheme(),
  maximumLevel: 18
});
viewer.imageryLayers.addImageryProvider(imgMap);

// 叠加国界服务
var iboMap = new Cesium.UrlTemplateImageryProvider({
  url: tdtUrl + "DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=" + token,
  subdomains: subdomains,
  tilingScheme: new Cesium.WebMercatorTilingScheme(),
  maximumLevel: 10
});
viewer.imageryLayers.addImageryProvider(iboMap);

// 叠加地形服务
var terrainUrls = new Array();

for (var i = 0; i < subdomains.length; i++) {
  var url =
    tdtUrl.replace("{s}", subdomains[i]) + "mapservice/swdx?tk=" + token;
  terrainUrls.push(url);
}

var provider = new Cesium.GeoTerrainProvider({
  urls: terrainUrls
});

viewer.terrainProvider = provider;

// 叠加三维地名服务
var wtfs = new Cesium.GeoWTFS({
  viewer,
  subdomains: subdomains,
  metadata: {
    boundBox: {
      minX: -180,
      minY: -90,
      maxX: 180,
      maxY: 90
    },
    minLevel: 1,
    maxLevel: 20
  },
  aotuCollide: true, //是否开启避让
  collisionPadding: [5, 10, 8, 5], //开启避让时，标注碰撞增加内边距，上、右、下、左
  serverFirstStyle: true, //服务端样式优先
  labelGraphics: {
    font: "28px sans-serif",
    fontSize: 28,
    fillColor: Cesium.Color.WHITE,
    scale: 0.5,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 5,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    showBackground: false,
    backgroundColor: Cesium.Color.RED,
    backgroundPadding: new Cesium.Cartesian2(10, 10),
    horizontalOrigin: Cesium.HorizontalOrigin.MIDDLE,
    verticalOrigin: Cesium.VerticalOrigin.TOP,
    eyeOffset: Cesium.Cartesian3.ZERO,
    pixelOffset: new Cesium.Cartesian2(0, 8)
  },
  billboardGraphics: {
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.CENTER,
    eyeOffset: Cesium.Cartesian3.ZERO,
    pixelOffset: Cesium.Cartesian2.ZERO,
    alignedAxis: Cesium.Cartesian3.ZERO,
    color: Cesium.Color.WHITE,
    rotation: 0,
    scale: 1,
    width: 18,
    height: 18
  }
});

//三维地名服务，使用wtfs服务
wtfs.getTileUrl = function() {
  return tdtUrl + "mapservice/GetTiles?lxys={z},{x},{y}&tk=" + token;
};

wtfs.initTDT([
  {
    x: 6,
    y: 1,
    level: 2,
    boundBox: { minX: 90, minY: 0, maxX: 135, maxY: 45 }
  },
  {
    x: 7,
    y: 1,
    level: 2,
    boundBox: { minX: 135, minY: 0, maxX: 180, maxY: 45 }
  },
  {
    x: 6,
    y: 0,
    level: 2,
    boundBox: { minX: 90, minY: 45, maxX: 135, maxY: 90 }
  },
  {
    x: 7,
    y: 0,
    level: 2,
    boundBox: { minX: 135, minY: 45, maxX: 180, maxY: 90 }
  },
  { x: 5, y: 1, level: 2, boundBox: { minX: 45, minY: 0, maxX: 90, maxY: 45 } },
  { x: 4, y: 1, level: 2, boundBox: { minX: 0, minY: 0, maxX: 45, maxY: 45 } },
  {
    x: 5,
    y: 0,
    level: 2,
    boundBox: { minX: 45, minY: 45, maxX: 90, maxY: 90 }
  },
  { x: 4, y: 0, level: 2, boundBox: { minX: 0, minY: 45, maxX: 45, maxY: 90 } },
  {
    x: 6,
    y: 2,
    level: 2,
    boundBox: { minX: 90, minY: -45, maxX: 135, maxY: 0 }
  },
  {
    x: 6,
    y: 3,
    level: 2,
    boundBox: { minX: 90, minY: -90, maxX: 135, maxY: -45 }
  },
  {
    x: 7,
    y: 2,
    level: 2,
    boundBox: { minX: 135, minY: -45, maxX: 180, maxY: 0 }
  },
  {
    x: 5,
    y: 2,
    level: 2,
    boundBox: { minX: 45, minY: -45, maxX: 90, maxY: 0 }
  },
  { x: 4, y: 2, level: 2, boundBox: { minX: 0, minY: -45, maxX: 45, maxY: 0 } },
  { x: 3, y: 1, level: 2, boundBox: { minX: -45, minY: 0, maxX: 0, maxY: 45 } },
  {
    x: 3,
    y: 0,
    level: 2,
    boundBox: { minX: -45, minY: 45, maxX: 0, maxY: 90 }
  },
  {
    x: 2,
    y: 0,
    level: 2,
    boundBox: { minX: -90, minY: 45, maxX: -45, maxY: 90 }
  },
  {
    x: 0,
    y: 1,
    level: 2,
    boundBox: { minX: -180, minY: 0, maxX: -135, maxY: 45 }
  },
  {
    x: 1,
    y: 0,
    level: 2,
    boundBox: { minX: -135, minY: 45, maxX: -90, maxY: 90 }
  },
  {
    x: 0,
    y: 0,
    level: 2,
    boundBox: { minX: -180, minY: 45, maxX: -135, maxY: 90 }
  }
]);
```

以下用于实现在地图上添加简单几何物体，可自定义位置及材质样式。

- [几何类型](https://cesium.com/docs/tutorials/geometry-and-appearances/#geometry-types)
- [组合几何](https://cesium.com/docs/tutorials/geometry-and-appearances/#combining-geometries)
- [材质](https://cesium.com/docs/tutorials/geometry-and-appearances/#appearances)

以下用于实现地图上卫星图，地形图，3D 模型，漫游动画等功能。

- [摄像机](https://cesium.com/docs/tutorials/camera/)
- [3D 模型](https://cesium.com/docs/tutorials/3d-models/)
- [地形](https://cesium.com/docs/tutorials/terrain/)
- [覆盖层](https://cesium.com/docs/tutorials/imagery-layers/)

<Valine></Valine>
