# 学习使用 Tensorflow.js 机器学习

![语法](/images/blogs/blog/tensorflow.png)

## 介绍

### 什么是 Tensorflow.js

TensorFlow.js 是一个开源的基于硬件加速的 JavaScript 库，用于训练和部署机器学习模型。谷歌推出的第一个基于 TensorFlow 的前端深度学习框架 TensorFlow.js 是一个开源的用于开发机器学习项目的 WebGL-accelerated JavaScript 库。TensorFlow.js 可以为你提供高性能的、易于使用的机器学习构建模块，允许你在浏览器上训练模型，或以推断模式运行预训练的模型。TensorFlow.js 不仅可以提供低级的机器学习构建模块，还可以提供高级的类似 Keras 的 API 来构建神经网络。

### Tensorflow.js 的优点

1. 不用安装驱动器和软件，通过链接即可分享程序
2. 网页应用交互性更强
3. 有访问 GPS，Camera，Microphone，Accelerator，Gyroscope 等传感器的标准 api（主要是指手机端）
4. 安全性，因为数据都是保存在客户端的

### TensorFlow.js 的应用方式

1. 在浏览器中开发 ML

   使用简单直观的 API 从头构建模型，然后使用低级别的 JavaScript 线性代数库或高层 API 进行训练。

2. 运行现有模型

   使用 TensorFlow.js 模型转换器在浏览器中运行预训练好的 TensorFlow 模型。

3. 重新训练现有模型

   使用连接到浏览器的传感器数据或其他客户端数据重新训练 ML 模型。

## 安装

### 使用 Script Tag

```html
<html>
  <head>
    <!-- Load TensorFlow.js -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.9.0"></script>

    <!-- Place your code in the script tag below. You can also use an external .js file -->
    <script>
      // Notice there is no 'import' statement. 'tf' is available on the index-page
      // because of the script tag above.

      // Define a model for linear regression.
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

      // Prepare the model for training: Specify the loss and the optimizer.
      model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

      // Generate some synthetic data for training.
      const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
      const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

      // Train the model using the data.
      model.fit(xs, ys).then(() => {
        // Use the model to do inference on a data point the model hasn't seen before:
        // Open the browser devtools to see the output
        model.predict(tf.tensor2d([5], [1, 1])).print();
      });
    </script>
  </head>

  <body></body>
</html>
```

### npm/yarn

```sh
yarn add @tensorflow/tfjs
npm install @tensorflow/tfjs
```

在 js 文件中输入以下代码：

```js
import * as tf from "@tensorflow/tfjs";

// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

// Generate some synthetic data for training.
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data.
model.fit(xs, ys).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  model.predict(tf.tensor2d([5], [1, 1])).print();
});
```

## 概念名词

### 张量

TensorFlow.js 中数据的中心单位是张量：一组数值形成一个或多个维度的数组。 张量实例具有定义数组形状的形状属性。

通俗来说，张量就是一个一维或多维数组常量，维度就是张量的形状 shape。

```js
const shape = [2, 3]; // 2 行, 3 列
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // 打印张量值
// 输出:    [[1 , 2 , 3 ],
//          [10, 20, 30]]
```

利用已有的方法可以更简单的创建张量，如 tf.scalar（零维）, tf.tensor1d（一维）, tf.tensor2d（二维）, tf.tensor3d（三维）、tf.tensor4d（四维）以及 tf.ones（值全是 1）或者 tf.zeros（值全是 0）

### 变量

Variables 变量是通过张量进行初始化得到的。不像 Tensor 的值不可变，变量的值是可变的。你可以使用变量的 assign 方法分配一个新的 tensor 到这个变量上，这是变量就会改变：

```js
const initialValues = tf.zeros([5]);
const biases = tf.variable(initialValues); // 初始化biases
biases.print(); // 输出: [0, 0, 0, 0, 0]

const updatedValues = tf.tensor1d([0, 1, 0, 1, 0]);
biases.assign(updatedValues); // 更新 biases的值
biases.print(); // 输出: [0, 1, 0, 1, 0]
```

变量由 variable 方法初始化，将张量的值赋给变量，也可以由 assign 方法更新，赋值为其他的值。

### 模型

在 Tensorflow.js 中，从概念上来说，一个模型就是一个给定一些输入将会产生特定的输出的函数。

通俗来说，模型相当于是一个方法的封装，定义好参数和返回值，其他都交给模型来完成。模型可以自定义，也可以直接使用已有的模型，正常情况下，使用已有的。

```js
const model = tf.sequential();
model.add(
  tf.layers.simpleRNN({
    units: 20,
    recurrentInitializer: "GlorotNormal",
    inputShape: [80, 4]
  })
);
model.compile({
  optimizer: tf.train.sgd(LEARNING_RATE),
  loss: "categoricalCrossentropy"
});
model.fit({ x: data, y: labels });
```

<Valine></Valine>
