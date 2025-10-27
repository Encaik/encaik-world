# 学习使用 D3.js 为图片绘制标注

![banner](/images/blogs/blog/d3.png)

## 安装

- npm

```sh
npm i d3
```

- script

```html
<script src="https://d3js.org/d3.v5.min.js"></script>
```

## 使用

### 选择器

```js
d3.select();
d3.selectAll();
```

选择器使用与 jquery 相似，select 为选择符合要求的第一个元素，selectAll 为符合要求的所有元素。

常用选择方法有标签选择"p",类选择".class",id 选择"#id"。

### 组成

- svg

svg 是最外层包裹元素，需要有明确的宽高。可以直接写好，也可以通过 d3 创建。

```js
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "500px");
```

- g

g 是分组，即 group，图形可以通过 g 操控。

```js
var g = svg.append("g");
```

### 绘制

- 文本

[d3 中文文档](https://www.d3js.org.cn/svg/get_start/#%E7%AC%AC%E4%B9%9D%E7%AB%A0-%E6%96%87%E6%9C%AC)

```js
g.append("text").text("这是一段文本");
```

<Valine></Valine>
