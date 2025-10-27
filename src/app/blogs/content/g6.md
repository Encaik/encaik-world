# 学习 AntV G6 图可视化引擎

![banner](/images/blogs/blog/g6.png)

## 介绍

G6 是一个简单、易用、完备的图可视化引擎，它在高定制能力的基础上，提供了一系列设计优雅、便于使用的图可视化解决方案。能帮助开发者搭建属于自己的图可视化、图分析、或图编辑器应用。

## 安装

- CDN 引入

```html
// version <= 3.2
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-{$version}/build/g6.js"></script>

// version >= 3.3
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-{$version}/dist/g6.min.js"></script>
```

::: tip 注意
在 {\$version} 中填写版本号，例如 3.4.7；
最新版可以在 NPM 查看最新版本及版本号；
详情参考 Github 分支：https://github.com/antvis/g6/tree/master。
:::

- NPM 安装

1. 使用 npm 安装依赖

```sh
npm install --save @antv/g6
```

2. 在需要使用的地方引入

```js
import G6 from "@antv/g6";
```

3. Vue 中使用

   1. 在需要使用 G6 的文件中引入/在 Vue 中全局引入
   2. 在 methods 中创建初始化图的方法，详细配置参考文档
   3. 在 mounted 中调用初始化方法，并使用 nextTick 立即更改 DOM
   4. 如果有 behavior、绑定监听等交互事件，则可以在 mounted 中声明，也可以在初始化方法中声明

## 概念

### 画布/布局

G6 中画布为 canvas，需要插入在 div 上，包括画布的插件也是一样。因为在初始化时需要声明插入 div 的 class 及尺寸。布局则是画布元素分布规则，设置后元素将根据分布规则固定自己的位置。

### 元素

G6 中节点，边，分组都是元素，结构公用。此类对象都定义在图数据中，被 render 方法渲染在画布上。如果没有交互事件配合，元素将只是通过定义生成在画布上的图形。

### 状态

元素的样式状态，可以通过交互行为和事件绑定变更状态，然后展示出在初始化时配置的不同状态的样式效果。

### 交互

G6 中交互对象主要有画布和元素，可以响应常见的所有交互事件。需要按照文档的 behavior 写法定义，并注册。初始化前注册可以写在初始化中，初始化后注册则通过方法加入。事件也可以单独使用，绑定监听。

### 动画

G6 中可添加动画，定义好动画并注册到动画组件中，就可以在画布上显示。主要分为全局动画，节点动画和边动画。

## 使用

### 实现节点/边/combo 添加（删改同理）

1. 使用 G6 的 API，通过 addItem 方法，标明元素类型，携带节点配置创建。这种方法创建的节点只能通过 API 获取数据。

```js
this.graph.addItem("node", {
  id: this.newNode.id,
  type: this.newNode.type,
  label: this.newNode.label,
  size: nodeSize,
  x: parseInt(this.newNode.x),
  y: parseInt(this.newNode.y),
  comboId: null
});
```

2. 在 data 中定义图数据，然后通过 push 方法添加到节点数组中，通过 API 读取数据重新渲染添加节点。这种方法创建的节点可以在 data 中直接获取操作。

```js
this.ghdata.nodes.push({
  id: this.newNode.id,
  type: this.newNode.type,
  label: this.newNode.label,
  size: nodeSize,
  x: parseInt(this.newNode.x),
  y: parseInt(this.newNode.y),
  comboId: null
});
this.graph.read(this.ghdata);
this.graph.render();
```

### 实现行为绑定/事件监听

1. 通过 registerBehavior 方法注册行为，参数为行为名称及行为配置， getEvents 方法为说明事件与方法对应关系。注册后需要在图中配置行为参与的模式，否则不生效。

```js
G6.registerBehavior("before-edge", {
  getEvents() {
    return {
      "node:mousedown": "onMouseDown"
    };
  },
  onMouseDown(e) {
    const graph = this.graph;
    if ("index" in e.shape.attrs) {
      if (e.shape.attrs.index == "node") {
        console.log("节点：拖动关键图形");
      } else {
        console.log("节点：拖动锚点");
        if (e.item) {
          const point = e.item.getContainer().get("children")[
            parseInt(e.shape.attrs.index) + 1
          ];
          point.attr("fill", "#fff");
          point.attr("stroke", "#000");
          point.attr("r", 2.5);
        }
        const uid = Math.round(Math.random() * 100 + 100);
        graph.setMode("addedge");
        newEdge = graph.addItem("edge", {
          id: uid,
          type: "cubic",
          source: e.item.getModel().id,
          sourceAnchor: e.shape.attrs.index,
          target: { x: e.x, y: e.y }
        });
        newEdge.toBack();
      }
    } else {
      console.log("节点：拖动原生图形");
    }
  }
});

this.graph = new G6.Graph({
  modes: {
    default: ["before-edge"]
  }
});
```

2. 通过 on/off 方法添加或移除事件监听，参数为监听事件及处理方法。事件监听只允许监听触发一个事件，但行为可以同时监听触发多个事件。

```js
this.graph.on("node:click", e => {
  this.select = { ...e.item.getModel() };
});
```

### 实现状态变换

1. 先在样式配置中声明状态样式，有以下两种方法：

   1. 初始化默认全局配置

   ```js
   this.graph = new G6.Graph({
     defaultEdge: {
       style: {
         stroke: "#000",
         endArrow: true
       }
     },
     edgeStateStyles: {
       hover: {
         stroke: "#66C4FF"
       }
     }
   });
   ```

   2. 添加节点单独配置

   ```js
   this.graph.addItem("node", {
     ...,
     style: {
       stroke: "#000",
       endArrow: true
     }
   });
   ```

2. 然后在代码中通过 setItemState 方法转换元素状态，G6 高版本中支持多值转换，即一个状态种类多种状态样式。

```js
const graph = this.graph;
const item = e.item;
graph.setItemState(item, "hover", true);
```

### 实现自定义节点/边

1. 通过 registerNode/ registerEdge 方法注册节点/边，参数为节点/边名以及自定义生命周期对象。

```js
G6.registerNode(
  "nodeName",
  {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {}
      }
    },
    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 节点的容器
     * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
     * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
     */
    draw(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 节点的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    update(cfg, node) {},
    /**
     * 更新节点后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    afterUpdate(cfg, node) {},
    /**
     * 响应节点的状态变化。
     * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState(name, value, node) {},
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg 节点的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
     */
    getAnchorPoints(cfg) {}
  },
  // 继承内置节点类型的名字，例如基类 'single-node'，或 'circle', 'rect' 等
  // 当不指定该参数则代表不继承任何内置节点类型
  extendedNodeName
);
```

::: tip 注意

- 如果不从任何现有的节点或从 'single-node' 扩展新节点时，draw 方法是必须的；
- 节点内部所有图形使用相对于节点自身的坐标系，即 (0, 0) 是该节点的中心。而节点的坐标是相对于画布的，由该节点 group 上的矩阵控制，自定义节点中不需要用户感知。若在自定义节点内增加 rect 图形，要注意让它的 x 与 y 各减去其长与宽的一半。详见例子 从无到有定义节点；
- update 方法可以不定义：
  - 当 update 未定义：若指定了 registerNode 的第三个参数 extendedNodeName（即代表继承指定的内置节点类型），则节点更新时将执行被继承的内置节点类型的 update 逻辑；若未指定 registerNode 的第三个参数，则节点更新时会执行 draw 方法，所有图形清除重绘；
  - 当定义了 update 方法，则不论是否指定 registerNode 的第三个参数，在节点更新时都会执行复写的 update 函数逻辑。
- afterDraw，afterUpdate 方法一般用于扩展已有的节点，例如：在矩形节点上附加图片，圆节点增加动画等；
- setState 只有在需要使用动画的方式来响应状态变化时需要复写，一般的样式响应状态变化可以通过 配置状态样式 实现；
- getAnchorPoints 方法仅在需要限制与边的连接点时才需要复写，也可以在数据中直接指定。
  :::

2. 除了 draw 是必须要有的图形绘制方法，其他的方法根据需求添加（未复写的方法会继承基类）。Draw 的参数 cfg 为创建配置，group 为图形组合，该方法返回一个图形组合，就是最终样式。

```js
G6.registerNode("ownrect", {
  draw(cfg, group) {
    group.addShape("rect", {
      attrs: {
        width: cfg.size[0],
        height: cfg.size[1],
        stroke: "block",
        fill: "white",
        index: "node"
      },
      draggable: true
    });
    const points = cfg.anchorPoints;
    for (let index = 0; index < points.length; index++) {
      group.addShape("circle", {
        attrs: {
          x: cfg.size[0] * points[index][0],
          y: cfg.size[1] * points[index][1],
          r: 2.5,
          stroke: "block",
          fill: "white",
          index
        }
      });
    }
    if (cfg.label) {
      group.addShape("text", {
        attrs: {
          x: cfg.size[0] / 2,
          y: cfg.size[1] / 2,
          textAlign: "center",
          textBaseline: "middle",
          text: cfg.label,
          fill: "#666",
          index: "node"
        },
        draggable: true
      });
    }
    return group;
  }
});
```

### 实现拖拽生成节点

1. 设置 HTML 标签为可拖拽 draggable，然后添加拖拽结束后的方法 dragend。

```html
<span draggable @dragend="handleDragEnd">
  拖动节点
</span>
```

2. 在 dragend 中设定生成坐标 x，y 以及节点配置，然后通过 addItem 添加节点到画布。

```js
handleDragEnd(e) {
  let str = Math.round(Math.random() * 100).toString();
  let point = this.graph.getPointByClient(e.clientX, e.clientY);
  this.graph.addItem("node", {
    id: str,
    type: "ownrect",
    label: str,
    size: [80, 80],
    x: parseInt(point.x - 40),
    y: parseInt(point.y - 40),
    comboId: null
  });
},
```

### 实现拖拽生成边

1. 先处理拖拽添加边和拖拽移动节点的逻辑，拖动节点行为放在默认 mode 中，添加边行为放在自定义 mode 中。通过 node:mousedown（节点上按下鼠标）事件可以监听鼠标是在锚点按下还是在节点按下，如果是锚点则切换至自定义 mode 同时创建边，如果是节点则不用管。

```js
G6.registerBehavior("before-edge", {
  getEvents() {
    return {
      "node:mousedown": "onMouseDown"
    };
  },
  onMouseDown(e) {
    const graph = this.graph;
    if ("index" in e.shape.attrs) {
      if (e.shape.attrs.index == "node") {
        console.log("节点：拖动关键图形");
      } else {
        console.log("节点：拖动锚点");
        if (e.item) {
          const point = e.item.getContainer().get("children")[
            parseInt(e.shape.attrs.index) + 1
          ];
          point.attr("fill", "#fff");
          point.attr("stroke", "#000");
          point.attr("r", 2.5);
        }
        const uid = Math.round(Math.random() * 100 + 100);
        graph.setMode("addedge");
        newEdge = graph.addItem("edge", {
          id: uid,
          type: "cubic",
          source: e.item.getModel().id,
          sourceAnchor: e.shape.attrs.index,
          target: { x: e.x, y: e.y }
        });
        newEdge.toBack();
      }
    } else {
      console.log("节点：拖动原生图形");
    }
  }
});
```

2. 切换到自定义 mode 后监听 mousemove（全画布鼠标移动）事件，通过获取鼠标位置持续更新边的 target 配置，做出鼠标拉着边移动的效果。然后在 mouseup（全画布鼠标抬起）事件触发时，获取松开时所指节点及锚点信息，更新边完成创建。如果松开鼠标时不在节点上，则直接销毁边。

```js
G6.registerBehavior("add-edge", {
  getEvents() {
    return {
      mousemove: "onMouseMove",
      mouseup: "onMouseUp"
    };
  },
  onMouseMove(e) {
    const graph = this.graph;
    console.log("画布：鼠标移动");
    if (newEdge) {
      graph.updateItem(newEdge, {
        target: { x: e.x, y: e.y }
      });
    }
  },
  onMouseUp(e) {
    const graph = this.graph;
    if (!e.item.getModel()) {
      console.log("节点：松开在画布");
      graph.removeItem(newEdge);
      graph.setMode("default");
      newEdge = {};
      return;
    }
    if ("index" in e.shape.attrs) {
      if (e.shape.attrs.index == "node") {
        console.log("节点：松开在关键图形");
      } else {
        console.log("节点：松开在锚点");
        graph.updateItem(newEdge, {
          target: e.item.getModel().id,
          targetAnchor: e.shape.attrs.index
        });
        graph.setMode("default");
        newEdge = {};
      }
    } else {
      console.log("节点：松开在原生图形");
    }
  }
});
```

<Valine></Valine>
