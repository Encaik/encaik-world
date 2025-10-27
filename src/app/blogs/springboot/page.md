# 学习 Springboot 做后端

## 安装

- Jdk
- Maven

## 创建项目

在 idea 中创建 springboot 项目

## 项目结构

- 主包

只存放启动类，作为整个项目的 main

- controller

控制器，用来处理接收和返回请求，通过调用 service 层实现内容返回

- service

服务层，用来处理逻辑代码和数据处理，通过调用 dao 层获取数据库数据处理

- dao

数据层，用来与数据库连接，获取需要使用的数据，通过调用 model 层创建实例

- model

实例层，用来声明需要用到的实例结构

## 主类

```java
package com.start;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@EnableAutoConfiguration
@ComponentScan(basePackages = {"com.**"})
public class Application {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

}
```

SpringApplication.run()是启动整个项目的代理方法

<Valine></Valine>
