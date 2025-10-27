# ECMAScript

## 常识

ECMA 为标准制定组织，负责制定 JavaScript 的工作组是 TC39，ECMAscript 的标准被命名为 ECMA-262。

[TC39 主页](https://www.ecma-international.org/memento/tc39-m.htm)

[ECMA-262 主页](https://www.ecma-international.org/publications/standards/Ecma-262.htm)

从 2015 年起，ECMA 规定每年六月发布一版更新，因此该版本被称为 ECMAscript2015，简称 ES2015，又因为这是第六次发布的版本，也称 es6。

| 时间          | 版本         | 事件                                                                                                                                                                                                                                                                                                               |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1997 年 6 月  | 第一版       | ECMAscript 诞生。                                                                                                                                                                                                                                                                                                  |
| 1998 年 6 月  | 第二版       | 修改格式，使其与 ISO/IEC16262 国际标准一样。                                                                                                                                                                                                                                                                       |
| 1999 年 12 月 | 第三版       | 强大的正则表达式，更好的词法作用域链处理，新的控制指令，异常处理，错误定义更加明确，数据输出的格式化及其它改变。                                                                                                                                                                                                   |
| 2009 年 12 月 | 第四版       | 添加严格模式(`use strict`)。修改了前面版本模糊不清的概念。增加了 getters，setters，JSON 以及在对象属性上更完整的反射。                                                                                                                                                                                             |
| 2011 年 6 月  | 第五版       | ECMAScript 标 5.1 版形式上完全一致于国际标准 ISO/IEC 16262:2011。                                                                                                                                                                                                                                                  |
| 2015 年 6 月  | 第六版(es6)  | ECMAScript 2015（ES2015），第 6 版，最早被称作是 ECMAScript 6（ES6），添加了类和模块的语法，其他特性包括迭代器，Python 风格的生成器和生成器表达式，箭头函数，二进制数据，静态类型数组，集合（maps，sets 和 weak maps），promise，reflection 和 proxies。作为最早的 ECMAScript Harmony 版本，也被叫做 ES6 Harmony。 |
| 2016 年 6 月  | 第七版(es7)  | ECMAScript 2016（ES2016），第 7 版，多个新的概念和语言特性。                                                                                                                                                                                                                                                       |
| 2017 年 6 月  | 第八版(es8)  | ECMAScript 2017（ES2017），第 8 版，多个新的概念和语言特性。                                                                                                                                                                                                                                                       |
| 2018 年 6 月  | 第九版(es9)  | ECMAScript 2018 （ES2018），第 9 版，包含了异步循环，生成器，新的正则表达式特性和 rest/spread 语法。                                                                                                                                                                                                               |
| 2019 年 6 月  | 第十版(es10) | ECMAScript 2019 （ES2019），第 10 版。                                                                                                                                                                                                                                                                             |

## 特性

### es6

#### Let 和 Const

|                | var | let | const |
| -------------- | --- | --- | ----- |
| 变量提升       | √   | ×   | ×     |
| 全局变量       | √   | ×   | ×     |
| 重复声明       | √   | ×   | ×     |
| 重新赋值       | √   | √   | ×     |
| 暂时死区       | ×   | √   | √     |
| 块作用域       | ×   | √   | √     |
| 只声明不初始化 | √   | √   | ×     |

#### 类（Class）

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.information = function() {
  return "My name is " + this.name + ", I am " + this.age;
};
```

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  information() {
    return "My name is " + this.name + ", I am " + this.age;
  }
}
```

#### 箭头函数（Arrow function）

```js
var list = [1, 2, 3, 4, 5, 6, 7];
var newList = list.map(function(item) {
  return item * item;
});
```

```js
const list = [1, 2, 3, 4, 5, 6, 7];
const newList = list.map(item => item * item);
```

#### 函数参数默认值（Function parameter defaults）

```js
function config(data) {
  var data = data || "data is empty";
}
```

```js
const config = (data = "data is empty") => {};
```

#### 模板字符串（Template string）

```js
var name = "kris";
var age = 24;
var info = "My name is " + this.name + ", I am " + this.age;
```

```js
const name = "kris";
const age = 24;
const info = `My name is ${name}, I am ${age}`;
```

#### 解构赋值（Destructuring assignment）

```js
var a = 10;
var b = 20;
var temp = a;
a = b;
b = temp;
```

```js
let a = 10;
let b = ((20)[(a, b)] = [b, a]);
```

#### 模块化（Module）

```js
// circle.js
// 输出
const { PI } = Math;
exports.area = r => PI * r ** 2;
exports.circumference = r => 2 * PI * r;

// index.js
// 输入
const circle = require("./circle.js");
console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);
```

#### 扩展操作符（Spread operator）

```js
function sum(x, y, z) {
  return x + y + z;
}
var list = [5, 6, 7];
var total = sum.apply(null, list);
```

```js
const sum = (x, y, z) => x + y + z;
const list = [5, 6, 7];
const total = sum(...list);
```

#### 对象属性简写（Object attribute shorthand）

```js
var cat = "Miaow";
var dog = "Woof";
var bird = "Peet peet";

var someObject = {
  cat: cat,
  dog: dog,
  bird: bird
};
```

```js
let cat = "Miaow";
let dog = "Woof";
let bird = "Peet peet";

let someObject = {
  cat,
  dog,
  bird
};

console.log(someObject);

//{
//  cat: "Miaow",
//  dog: "Woof",
//  bird: "Peet peet"
//}
```

#### Promise

```js
new Promise((resolve, reject) => {
  resolve("success");
  reject("reject");
});
```

#### for...of

```js
const array1 = ["a", "b", "c"];

for (const element of array1) {
  console.log(element);
}

// "a"
// "b"
// "c"
```

#### Symbol

```js
const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol("foo");

console.log(typeof symbol1); // "symbol"
console.log(symbol3.toString()); // "Symbol(foo)"
console.log(Symbol("foo") === Symbol("foo")); // false
```

#### 迭代器（Iterator）/ 生成器（Generator）

```js
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}
var a = makeRangeIterator(1, 10, 2);
a.next(); // {value: 1, done: false}
a.next(); // {value: 3, done: false}
a.next(); // {value: 5, done: false}
a.next(); // {value: 7, done: false}
a.next(); // {value: 9, done: false}
a.next(); // {value: undefined, done: true}
```

#### Set/WeakSet

#### Map/WeakMap

#### Proxy/Reflect

#### Regex 对象的扩展

#### Math 对象的扩展

#### Array 对象的扩展

### es7

#### Array.prototype.includes()

#### 幂运算符\*\*

#### 模板字符串（Template string）

### es8

#### async/await

#### Object.values()

#### Object.entries()

#### padStart()

#### padEnd()

#### ShareArrayBuffer（因安全问题，暂时在 Chrome 跟 FireFox 中被禁用）

#### Atomics 对象

#### Object.getOwnPropertyDescriptors()

### es9

#### for await...of

#### 模板字符串（Template string）

#### 正则表达式反向(lookbehind)断言

#### 正则表达式 Unicode 转义

#### 正则表达式 s/dotAll 模式

#### 正则表达式命名捕获组

#### 对象扩展操作符

#### Promise.prototype.finally()

### es10

#### Array.prototype.flat() / flatMap()

#### String.prototype.trimStart() / trimLeft() / trimEnd() / trimRight()

#### Object.fromEntries()

#### Symbol.prototype.description

#### String.prototype.matchAll

#### Function.prototype.toString() 返回注释与空格

#### try-catch

#### BigInt

#### globalThis

#### import()

#### 私有元素与方法

<Valine></Valine>
