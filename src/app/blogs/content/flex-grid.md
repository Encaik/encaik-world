# 详细理解 Flexbox 与 Gridbox 布局属性

![banner](/images/blogs/blog/flex&grid.png)

## Flexbox

使用 flex-box 布局时，需要在排列元素的父元素上添加属性。

![使用前](/images/blogs/blog/flex&grid/1.png)

```css
#flex {
  display: flex;
  /*或*/
  display: inline-flex;
}
```

![使用后](/images/blogs/blog/flex&grid/2.png)

## 布局配置

### 主轴（Main Axis）

主轴决定了子元素的排列方向，且可以由`flex-direction`属性定义主轴方向，该属性有四个取值。

- row

该值是 flex-box 布局的默认值，即行排列。如图所示：

![row](/images/blogs/blog/flex&grid/3.png)

- row-reverse

该值为行排列的逆序排列，即子元素从后往前反向排列，并右对齐，与 row 成镜像效果。如图所示：

![row-reverse](/images/blogs/blog/flex&grid/4.png)

- column

该值为纵向依次排列，即列排列。如图所示：

![column](/images/blogs/blog/flex&grid/5.png)

- column-reverse

该值为反向列排列，如果父元素有高度且高于子元素堆叠，则子元素对齐在底部；如果父元素无高度或高度小于子元素堆叠，则子元素对其在顶部。如图所示：

父元素高度 100vh

![column-reverse](/images/blogs/blog/flex&grid/6.png)

行排列时，子元素如 inline 排列；列排列时，子元素如 block 排列。即子元素排列属性与 flex 排列属性相同时，布局顺序不会有改变。

### 交叉轴（Cross Axis）

交叉轴与主轴相互垂直，即主轴方向为水平，则交叉轴为垂直；主轴方向为垂直，则交叉轴为水平。

### flex-wrap

如果子元素过多导致主轴方向宽度不足时，可通过调整 `flex-wrap` 属性来控制子元素换行显示。该属性有以下几个取值：

- nowrap

该值为默认取值，子元素强制不换行，在宽度超出父元素时，将压缩子元素宽度，如果子元素宽度无法被压缩，将产生溢出。

子元素宽度可压缩

![nowrap](/images/blogs/blog/flex&grid/7.png)

子元素宽度不可压缩

![nowrap](/images/blogs/blog/flex&grid/8.png)

- wrap

子元素将根据父元素宽度计算，如果超过该行宽度，则在交叉轴方向创建新的一行。

![wrap](/images/blogs/blog/flex&grid/9.png)

- wrap-reverse

子元素将根据父元素宽度计算，如果超过该行宽度，则在交叉轴的反方向创建新的一行。

![wrap](/images/blogs/blog/flex&grid/10.png)

### flex-flow

该属性为`flex-direction`和`flex-wrap`的简写属性。

## 子元素配置

### flex-basis

该属性为子元素占用空间大小，会在父元素允许的范围内占用规定的宽度。

![flex-basis](/images/blogs/blog/flex&grid/11.png)

### flex-grow

该属性可以为子元素按比例分配剩余可用空间。

![flex-grow](/images/blogs/blog/flex&grid/12.png)

### flex-shrink

当空间不足以放下子元素时，该属性可以为子元素按比例压缩占用空间。

![flex-grow](/images/blogs/blog/flex&grid/13.png)

### flex

该属性为`flex-basis`、`flex-grow`和`flex-shrink`的简写属性

## 子元素对齐与空间分配

### align-items

该属性可以使元素在交叉轴方向对齐，有以下几种取值：

- stretch

该值为默认值，会在子元素没有高度的情况下将子元素拉伸到父元素高度，如果父元素也没有高度，将由最高的子元素决定。

![stretch](/images/blogs/blog/flex&grid/14.png)

- flex-start

该值会使子元素沿交叉轴顶端对齐。

![flex-start](/images/blogs/blog/flex&grid/15.png)

- flex-end

该值会使子元素沿交叉轴末端对齐。

![flex-end](/images/blogs/blog/flex&grid/16.png)

- center

该值会使子元素沿交叉轴居中对齐。

![center](/images/blogs/blog/flex&grid/17.png)

### justify-content

该属性可以使元素在主轴方向对齐，有以下几种取值：

- flex-start

该值为默认值，会使子元素对齐在主轴起点。

![flex-start](/images/blogs/blog/flex&grid/18.png)

- flex-end

该值会使子元素沿主轴末端对齐。

![flex-end](/images/blogs/blog/flex&grid/19.png)

- center

该值会使子元素沿主轴居中对齐。

![center](/images/blogs/blog/flex&grid/20.png)

- space-around

该值会使元素沿主轴均匀分布，且首尾有空余。

![space-around](/images/blogs/blog/flex&grid/21.png)

- space-between

![space-between](/images/blogs/blog/flex&grid/22.png)

## Gridbox

使用 flex-box 布局时，需要在排列元素的父元素上添加属性。

![使用前](/images/blogs/blog/flex&grid/1.png)

```css
#grid {
  display: grid;
  /*或*/
  display: inline-grid;
}
```

![使用后](/images/blogs/blog/flex&grid/23.png)

## 布局配置

### 网格列(grid-template-columns)

通过配置列，可以让元素填充进轨道：

```css
#grid {
  grid-template-columns: 200px 200px 200px;
}
```

![grid-template-columns](/images/blogs/blog/flex&grid/24.png)

### fr 单位

除了可以使用像素规定固定的列宽以外，还可以使用 fr 按比例规定列宽。

```css
#grid {
  grid-template-columns: 1fr 1fr 1fr;
}
```

![fr](/images/blogs/blog/flex&grid/25.png)

### repeat()

如果多次使用相同的宽度，可以使用 repeat()方法来节省代码长度。

```css
#grid {
  grid-template-columns: repeat(3, 1fr);
}
```

### 隐式网格

如果布局的元素超出定义的规则，元素就会被放在隐式网格中，可以通过`grid-auto-rows`属性调整隐式网格行高。

```css
#grid {
  grid-auto-rows: 200px;
}
```

![grid-auto-rows](/images/blogs/blog/flex&grid/26.png)

### minmax()

如果在添加隐式网格行高时，想要可以动态改变的大小，可以使用 minmax()方法规定一个范围。

### 网格线

在有了网格布局以后，想要按位置填充元素，就需要用到网格线来定位。列网格线从左到右，行网格线从上到下，编号都是从 1 开始。

```css
.box1 {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}
```

![网格线](/images/blogs/blog/flex&grid/27.png)

<Valine></Valine>
