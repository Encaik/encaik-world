# React Native学习-创建项目

## 环境搭建

### Node,Python2,JDK

Node.js>=10

Pyhton必须为2.X

JDK必须是1.8

### Yarn,React Native Cli

``` sh
npm install -g yarn react-native-cli
```

### Android Studio,Android SDK

SDK 需要 Android9(pie)

### Android 虚拟机

## 创建应用

### 命令行初始化项目

``` sh
react-native init [项目名称]
```

::: tip 注意
1.项目名称不支持短横线-，应使用下划线或驼峰命名法
2.项目默认使用yarn，创建后勿混用npm
3.项目路径不能包含中文
4.项目启动后无需再安装依赖包,初始化已安装
:::

### 目录结构

``` sh
project
  ├─__tests__/
  ├─android/
  ├─ios/
  ├─node_modules/
  ├─.buckconfig
  ├─.eslintrc.js
  ├─.flowconfig
  ├─.gitattributes
  ├─.gitignore
  ├─.prettierrc.js
  ├─.watchmanconfig
  ├─App.js
  ├─app.json
  ├─bable.config.js
  ├─index.js
  ├─metro.config.js
  ├─package.json
  └─yarn.lock
```

### 运行命令

#### android

#### ios

#### start

#### test

#### lint

### 最终

始终无法运行应用，查询了很多资料后得知需要回退node版本为12.10，权衡下暂停学习RN

<Valine></Valine>
