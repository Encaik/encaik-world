# docker-compose部署流程

## 初次部署

### 安装docker

[教程](docker.md)

### 安装docker-compose

[教程](docker-compose.md)

### 准备好项目结构文件夹

``` sh
project
  ├─install                 /* 安装包 */
  ├─java                    /* 后端服务 */
  │   ├─img                 /* 后端下载文件存储目录 */
  │   ├─log                 /* 后端服务日志输出 */
  │   └─release.jar         /* 后端服务构建包 */
  ├─mysql                   /* mysql配置 */
  │   ├─data                /* mysql数据库文件 */
  │   ├─log                 /* mysql日志文件 */
  │   └─mysql.cnf           /* mysql配置文件 */
  ├─nginx                   /* 前端服务 */
  │   └─html                /* 前端网站构建包 */
  ├─redis                   /* redis配置 */
  │   ├─data                /* redis数据库文件 */
  │   └─redis.conf          /* redis配置文件 */
  └─docker-compose.yml      /* docker编排配置文件 */
```

### 在当前目录运行docker-compose

``` sh
sudo docker-compose up -d
/* 读取docker-compose.yml启动镜像 */
```

## 更换构建包

### 停止docker-compose

``` sh
sudo docker-compose down
```

### 强制重新构建镜像

```sh
sudo docker-compose up -d --force-create
```

<Valine></Valine>
