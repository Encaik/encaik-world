# CSS 预处理器-Sass，Less，Stylus 对比

![banner](/images/blogs/blog/csspre.png)

## 基本使用

- Sass

```css
body {
  color: #fff;
}
```

- Less

```css
body {
  color: #fff;
}
```

- Stylus

```css
body
  color #fff
```

## 变量

- Sass

```css
$base: #fff;
body {
  color: $base;
}
```

- Less

```css
@base: #fff;
body {
  color: @base;
}
```

- Stylus

```css
base = #fff;
body
  color base
```

## 嵌套选择器

- Sass

```css
body {
  p {
    color: #fff;
  }
  &:hover {
    color: #000;
  }
}
```

- Less

```css
body {
  p {
    color: #fff;
  }
  &:hover {
    color: #000;
  }
}
```

- Stylus

```css
body
  p
    color: #fff;
  &:hover
    color: #000;
```

## 混合

- Sass

```css
@mixin fontSize {
  font-size: 20px;
}
body {
  @include fontSize;
}
```

- Less

```css
.fontSize {
  font-size: 20px;
}
body {
  .fontSize();
}
```

- Stylus

```css
fontSize =
  font-size: 20px;
body {
  {fontSize};
}
```

## 继承

- Sass

```css
.fontSize {
  font-size: 20px;
}
body {
  @extend .fontSize;
}
```

- Less

```css
.fontSize {
  font-size: 20px;
}
body {
  &:extend(.fontSize);
}
```

- Stylus

```css
.fontsize
  font-size 20px
body
  @extend .fontSize
```

## 函数

- Sass

```css
@function get-size($n) {
  @return $n * 10;
}
body {
  font-size: get-size(2);
}
```

- Less

```css
body {
  font-size: max(10, 20);
}
```

- Stylus

```css
get-size(n)
  n * 10
body
  font-size get-size(2)
```

## 总结

| 预处理器 | 优点                                                   | 缺点                                     |
| -------- | ------------------------------------------------------ | ---------------------------------------- |
| Sass     | 1.功能齐全<br>2.可定制程度高<br>3.可适用于所有场景<br> | 1.体积臃肿，语法复杂<br>2.学习成本高<br> |
| Less     | 1.语法简单，易于使用<br>2.对于基础使用可快速开发<br>   | 1.功能略少<br>                           |
| Stylus   | 1.代码量极少，节省时间<br>2.贴合 css 语法<br>          | 1.功能少<br>                             |

<Valine></Valine>
