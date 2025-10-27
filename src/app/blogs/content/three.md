# 学习 three.js 库的使用

![banner](/images/blogs/blog/three.png)

## 使用

### 引入

- script 脚本引入(文件引入)

从网站下载或从 github 下载，然后根据引入方式找到合适的文件夹，根据需求引入文件：

```html
<script src="./js/three.js/build/three.min.js"></script>
<script src="./js/three.js/examples/js/controls/OrbitControls.js"></script>
<script src="./js/three.js/examples/js/loaders/FBXLoader.js"></script>
<script src="./js/three.js/examples/js/libs/inflate.min.js"></script>
```

以上是常规页面使用 three 的方法，如果是使用模块化项目的话，需要从 jsm 文件夹中导入模块。

- npm 包导入

```sh
npm i three
```

```js
import * as THREE from "./js/three.module.js";
```

### 初始化场景

```js
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e1926); //设置场景背景色
```

### 定义添加辅助网格

```js
var gridHelper = new THREE.GridHelper(10000, 10, 0x2c2c2c, 0x888888);
scene.add(gridHelper);
//或
var axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);
```

GridHelper 是在场景中显示出一个网格作为参考平面，AxesHelper 是在场景中显示出当前场景的坐标系。

### 在场景中添加相机

其中`OrthographicCamera`为正交相机，即物体无论远近，大小不会发生变化。
另一种是透视相机`PerspectiveCamera`，根据人眼观察物体的效果会对物体产生形变。

```js
/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 6000; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0, 30000);
camera.position.set(15000, 0, 0); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
```

### 在场景中添加光源

其中`AmbientLight`是环境光，只起环境基础照明作用，不会产生阴影。`PointLight`是点光，通过点光照射的物体会产生阴影，如果没有默认产生则需要对光和物体进行配置。即点光产生阴影，物体接受产生阴影。`DirectionalLight`是平行光，其作用与点光相似，产生的阴影不同。

```js
/**
 * 光源设置
 */
//环境光
var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);
//点光
var pointLight = new THREE.PointLight("#123456");
pointLight.position.set(100000, 100000, 100000);
pointLight.castShadow = true; //光照可产生阴影
scene.add(pointLight);
//平行光
var directionalLight = new Three.DirectionalLight(0xccccaa);
directionalLight.position.set(0, 100, 100);
directionalLight.intensity = 20; //光照强度
scene.add(directionalLight);
```

### 创建渲染器对象

通过这一步，之前所有的对象就可以产生在页面绑定好的标签位置上。此时的场景是个空场景。

```js
/**
 * 创建渲染器对象
 */
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //打开抗锯齿和背景可透明
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.shadowMapEnabled = true;
renderer.setClearColor(0xb9d3ff, 0); //设置背景颜色
document.getElementById("map").appendChild(renderer.domElement); //body元素中插入canvas对象
renderer.render(scene, camera); //执行渲染操作
```

### 添加物体

通过`FBXLoader`可以将 FBX 模型导入场景中显示。

```js
var loader = new THREE.FBXLoader(); //创建一个FBX加载器
loader.load("xxx.FBX", obj => {
  scene.add(obj);
});
```

### 添加物体控制

通过`OrbitControls`可以添加对物体的控制，然后每次控制事件发生就重新渲染页面，做到即时操作的效果。

```js
//执行渲染操作   指定场景、相机作为参数
function render() {
  renderer.render(scene, camera); //执行渲染操作
}
render();
var controls = new THREE.OrbitControls(camera, renderer.domElement); //创建控件对象
controls.addEventListener("change", render); //监听鼠标、键盘事件
```

### 粒子

粒子系统，创建物体需要有几何体和材质组成，首先创建粒子几何体：

```js
let editorGeometry = new THREE.Geometry();
editorGeometry.vertices = threeCloudPointVectors; //点位置信息，是个三元位置对象
editorGeometry.colors = threeCloudPointColors; //点颜色信息，是个颜色对象
```

然后创建对应的材质：

```js
let editorMaterial = new THREE.PointsMaterial({
  size: 2, //点的大小
  sizeAttenuation: false, //点的颜色是否随距离衰减
  vertexColors: Three.VertexColors //启用顶点对应的颜色
});
```

有了几何体和材质以后，组装成粒子模型,然后添加至场景中：

```js
let cloudPoint = new THREE.Points(editorGeometry, editorMaterial);
scene.add(cloudPoint);
```

### 导向线

普通的线没有箭头，如果想要做成导向线，需要使用箭头辅助类

- dir -- 基于箭头原点的方向. 必须为单位向量.
- origin -- 箭头的原点.
- length -- 箭头的长度. 默认为 1.
- hex -- 定义的 16 进制颜色值. 默认为 0xffff00.
- headLength -- 箭头头部(锥体)的长度. 默认为箭头长度的 0.2 倍(0.2 \* length).
- headWidth -- 箭头的宽度. 默认为箭头头部(锥体)长度的 0.2 倍(0.2 \* headLength).

```js
let arrowHelper = new THREE.ArrowHelper(
  dir,
  origin,
  length,
  hex,
  headLength,
  headWidth
);
scene.add(arrowHelper);
```

<Valine></Valine>
