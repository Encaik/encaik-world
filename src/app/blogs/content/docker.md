# Docker 使用

## 安装

### Ubuntu

#### 卸载旧版本

docker的旧版本被称为docker,docker.io 或docker-engine。如果已安装,请卸载它们:

``` sh
\$ sudo apt-get remove docker docker-engine docker.io containerd runc
```

#### 从存储库安装

##### 设置存储库

1. 更新apt包索引:

    ``` sh
    \$ sudo apt-get update
    ```

2. 安装软件包以允许apt通过HTTPS使用存储库:

    ``` sh
    \$ sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
    ```

3. 添加Docker的官方GPG密钥:

    ``` sh
    \$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    ```

    `9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88`通过搜索指纹的后8个字符,验证您现在是否拥有带有指纹的密钥 。

    ``` sh
    \$ sudo apt-key fingerprint 0EBFCD88

    pub   rsa4096 2017-02-22 [SCEA]
          9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
    uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
    sub   rsa4096 2017-02-22 [S]
    ```

4. 使用以下命令来设置稳定的存储库。要添加 每晚或测试存储库,请在以下命令中的单词后面添加nightly或test（或同时添加）stable。

    ::: tip 注意
    下面的lsb_release -cs子命令返回Ubuntu发行版的名称,例如xenial。有时,在Linux Mint等发行版中,您可能需要更改\$(lsb_release -cs) 为父Ubuntu发行版。例如,如果您使用 Linux Mint Tessa,则可以使用bionic。Docker对未经测试和不受支持的Ubuntu发行版不提供任何保证。
    :::

    ``` sh
    \$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    ```

##### 安装Docker

1. 更新apt包索引。

    ``` sh
    \$ sudo apt-get update
    ```

2. 安装最新版本的Docker Engine-Community和containerd,或者转到下一步安装特定版本:

    ``` sh
    \$ sudo apt-get install docker-ce docker-ce-cli containerd.io
    ```

    ::: tip 注意
    如果启用了多个Docker存储库,则在未在apt-get installor apt-get update命令中指定版本的情况下进行安装或更新将始终安装可能的最高版本,这可能不适合您的稳定性需求。
    :::

3. 要安装特定版本的Docker Engine-Community,请在存储库中列出可用版本,然后选择并安装:

    a. 列出您的仓库中可用的版本:

    ``` sh
    \$ apt-cache madison docker-ce

      docker-ce | 5:18.09.1~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
      docker-ce | 5:18.09.0~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
      docker-ce | 18.06.1~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
      docker-ce | 18.06.0~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
      ...
    ```

    b. 使用第二列中的版本字符串安装特定版本,例如5:18.09.1~3-0~ubuntu-xenial。

    ``` sh
    \$ sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io
    ```

4. 通过运行hello-world 映像来验证是否正确安装了Docker Engine-Community 。

    ``` sh
    \$ sudo docker run hello-world
    ```

    此命令下载测试图像并在容器中运行。容器运行时,它会打印参考消息并退出。

#### 从软件包安装

如果您不能使用Docker的存储库来安装Docker Engine-Community,则可以下载.deb要发布的 文件并手动安装。每次升级Docker时,都需要下载一个新文件。

1. 去<https://download.docker.com/linux/ubuntu/dists/>选择你的Ubuntu版本,浏览pool/stable/,选择amd64,armhf,arm64,ppc64el,或s390x,并下载.deb文件对于docker引擎。

    ::: tip 注意
    要安装夜间 软件包,stable请将URL中的单词更改 为nightly。 了解每晚和测试频道。
    :::

2. 安装Docker Engine-Community,将下面的路径更改为您下载Docker软件包的路径。

    ``` sh
    \$ sudo dpkg -i /path/to/package.deb
    ```

    Docker守护程序会自动启动。

3. 通过运行hello-world 映像来验证是否正确安装了Docker Engine-Community 。

    ``` sh
    \$ sudo docker run hello-world
    ```

    此命令下载测试图像并在容器中运行。容器运行时,它会打印参考消息并退出。

## 概念

### 镜像

#### 介绍

在 Docker 的术语里，一个只读层被称为镜像，一个镜像是永久不会变的。

由于 Docker 使用一个统一文件系统，Docker 进程认为整个文件系统是以读写方式挂载的。 但是所有的变更都发生顶层的可写层，而下层的原始的只读镜像文件并未变化。由于镜像不 可写，所以镜像是无状态的。

##### 父镜像

每一个镜像都可能依赖于由一个或多个下层的组成的另一个镜像。我们有时说，下层那个 镜像是上层镜像的父镜像。

##### 基础镜像

一个没有任何父镜像的镜像，谓之基础镜像。

##### 镜像ID

所有镜像都是通过一个 64 位十六进制字符串 （内部是一个 256 bit 的值）来标识的。 为简化使用，前 12 个字符可以组成一个短ID，可以在命令行中使用。短ID还是有一定的 碰撞机率，所以服务器总是返回长ID。

#### 获取镜像

可以使用 docker pull 命令来从仓库获取所需要的镜像。

下面的例子将从 Docker Hub 仓库下载一个 Ubuntu 12.04 操作系统的镜像。

``` sh
$ sudo docker pull ubuntu:12.04
Pulling repository ubuntu
ab8e2728644c: Pulling dependent layers
511136ea3c5a: Download complete
5f0ffaa9455e: Download complete
a300658979be: Download complete
904483ae0c30: Download complete
ffdaafd1ca50: Download complete
d047ae21eeaf: Download complete
```

下载过程中，会输出获取镜像的每一层信息。

该命令实际上相当于`$ sudo docker pull registry.hub.docker.com/ubuntu:12.04`命令，即从注册服务器registry.hub.docker.com 中的 ubuntu 仓库来下载标记为 12.04 的镜像。

有时候官方仓库注册服务器下载较慢，可以从其他仓库下载。 从其它仓库下载时需要指定完整的仓库注册服务器地址。例如

``` sh
$ sudo docker pull dl.dockerpool.com:5000/ubuntu:12.04
Pulling dl.dockerpool.com:5000/ubuntu
ab8e2728644c: Pulling dependent layers
511136ea3c5a: Download complete
5f0ffaa9455e: Download complete
a300658979be: Download complete
904483ae0c30: Download complete
ffdaafd1ca50: Download complete
d047ae21eeaf: Download complete
```

完成后，即可随时使用该镜像了，例如创建一个容器，让其中运行 bash 应用。

``` sh
$ sudo docker run -t -i ubuntu:12.04 /bin/bash
root@fe7fc4bd8fc9:/#
```

#### 列出本地镜像

使用 docker images 显示本地已有的镜像。

``` sh
$ sudo docker images
REPOSITORY       TAG      IMAGE ID      CREATED      VIRTUAL SIZE
ubuntu           12.04    74fe38d11401  4 weeks ago  209.6 MB
ubuntu           precise  74fe38d11401  4 weeks ago  209.6 MB
ubuntu           14.04    99ec81b80c55  4 weeks ago  266 MB
ubuntu           latest   99ec81b80c55  4 weeks ago  266 MB
ubuntu           trusty   99ec81b80c55  4 weeks ago  266 MB
...
```

在列出信息中，可以看到几个字段信息

- 来自于哪个仓库，比如 ubuntu
- 镜像的标记，比如 14.04
- 它的 ID 号（唯一）
- 创建时间
- 镜像大小

其中镜像的 ID 唯一标识了镜像，注意到 ubuntu:14.04 和 ubuntu:trusty 具有相同的镜像 ID，说明它们实际上是同一镜像。

TAG 信息用来标记来自同一个仓库的不同镜像。例如 ubuntu 仓库中有多个镜像，通过 TAG 信息来区分发行版本，例如 10.04、12.04、12.10、13.04、14.04 等。例如下面的命令指定使用镜像 ubuntu:14.04 来启动一个容器。

``` sh
\$ sudo docker run -t -i ubuntu:14.04 /bin/bash
```

如果不指定具体的标记，则默认使用 latest 标记信息。

#### 创建镜像

创建镜像有很多方法，用户可以从 Docker Hub 获取已有镜像并更新，也可以利用本地文件系统创建一个。

##### 修改已有镜像

先使用下载的镜像启动容器。

``` sh
$ sudo docker run -t -i training/sinatra /bin/bash
root@0b2616b0e5a8:/#
```

::: tip 注意
记住容器的 ID，稍后还会用到。
:::

在容器中添加 json 和 gem 两个应用。

``` sh
root@0b2616b0e5a8:/# gem install json
```

当结束后，我们使用 exit 来退出，现在我们的容器已经被我们改变了，使用 docker commit 命令来提交更新后的副本。

``` sh
$ sudo docker commit -m "Added json gem" -a "Docker Newbee" 0b2616b0e5a8 ouruser/sinatra:v2
4f177bd27a9ff0f6dc2a830403925b5360bfe0b93d476f7fc3231110e7f71b1c
```

其中，-m 来指定提交的说明信息，跟我们使用的版本控制工具一样；-a 可以指定更新的用户信息；之后是用来创建镜像的容器的 ID；最后指定目标镜像的仓库名和 tag 信息。创建成功后会返回这个镜像的 ID 信息。

使用 docker images 来查看新创建的镜像。

``` sh
$ sudo docker images
REPOSITORY          TAG     IMAGE ID       CREATED       VIRTUAL SIZE
training/sinatra    latest  5bc342fa0b91   10 hours ago  446.7 MB
ouruser/sinatra     v2      3c59e02ddd1a   10 hours ago  446.7 MB
ouruser/sinatra     latest  5db5f8471261   10 hours ago  446.7 MB
```

之后，可以使用新的镜像来启动容器

``` sh
$ sudo docker run -t -i ouruser/sinatra:v2 /bin/bash
root@78e82f680994:/#
```

##### 利用 Dockerfile 来创建镜像

使用 docker commit 来扩展一个镜像比较简单，但是不方便在一个团队中分享。我们可以使用 docker build来创建一个新的镜像。为此，首先需要创建一个 Dockerfile，包含一些如何创建镜像的指令。

新建一个目录和一个 Dockerfile

``` sh
\$ mkdir sinatra
\$ cd sinatra
\$ touch Dockerfile
```

Dockerfile 中每一条指令都创建镜像的一层，例如：

``` sh
# This is a comment
FROM ubuntu:14.04
MAINTAINER Docker Newbee <newbee@docker.com>
RUN apt-get -qq update
RUN apt-get -qqy install ruby ruby-dev
RUN gem install sinatra
```

Dockerfile 基本的语法是

- 使用#来注释
- FROM 指令告诉 Docker 使用哪个镜像作为基础
- 接着是维护者的信息
- RUN开头的指令会在创建中运行，比如安装一个软件包，在这里使用 apt-get 来安装了一些软件

编写完成 Dockerfile 后可以使用 docker build 来生成镜像。

``` sh
$ sudo docker build -t="ouruser/sinatra:v2" .
Uploading context  2.56 kB
Uploading context
Step 0 : FROM ubuntu:14.04
---> 99ec81b80c55
Step 1 : MAINTAINER Newbee <newbee@docker.com>
---> Running in 7c5664a8a0c1
---> 2fa8ca4e2a13
Removing intermediate container 7c5664a8a0c1
Step 2 : RUN apt-get -qq update
---> Running in b07cc3fb4256
---> 50d21070ec0c
Removing intermediate container b07cc3fb4256
Step 3 : RUN apt-get -qqy install ruby ruby-dev
---> Running in a5b038dd127e
Selecting previously unselected package libasan0:amd64.
(Reading database ... 11518 files and directories currently installed.)
Preparing to unpack .../libasan0_4.8.2-19ubuntu1_amd64.deb ...
Setting up ruby (1:1.9.3.4) ...
Setting up ruby1.9.1 (1.9.3.484-2ubuntu1) ...
Processing triggers for libc-bin (2.19-0ubuntu6) ...
---> 2acb20f17878
Removing intermediate container a5b038dd127e
Step 4 : RUN gem install sinatra
---> Running in 5e9d0065c1f7
. . .
Successfully installed rack-protection-1.5.3
Successfully installed sinatra-1.4.5
4 gems installed
---> 324104cde6ad
Removing intermediate container 5e9d0065c1f7
Successfully built 324104cde6ad
```

其中 -t 标记来添加 tag，指定新的镜像的用户信息。 “.” 是 Dockerfile 所在的路径（当前目录），也可以替换为一个具体的 Dockerfile 的路径。

可以看到 build 进程在执行操作。它要做的第一件事情就是上传这个 Dockerfile 内容，因为所有的操作都要依据 Dockerfile 来进行。 然后，Dockfile 中的指令被一条一条的执行。每一步都创建了一个新的容器，在容器中执行指令并提交修改（就跟之前介绍过的 docker commit 一样）。当所有的指令都执行完毕之后，返回了最终的镜像 id。所有的中间步骤所产生的容器都被删除和清理了。

::: tip 注意
一个镜像不能超过 127 层
:::

此外，还可以利用 ADD 命令复制本地文件到镜像；用 EXPOSE 命令来向外部开放端口；用 CMD 命令来描述容器启动后运行的程序等。例如

``` sh
# put my local web site in myApp folder to /var/www
ADD myApp /var/www
# expose httpd port
EXPOSE 80
# the command to run
CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]
```

现在可以利用新创建的镜像来启动一个容器。

``` sh
$ sudo docker run -t -i ouruser/sinatra:v2 /bin/bash
root@8196968dac35:/#
```

还可以用 docker tag 命令来修改镜像的标签。

``` sh
\$ sudo docker tag 5db5f8471261 ouruser/sinatra:devel
$ sudo docker images ouruser/sinatra
REPOSITORY          TAG     IMAGE ID      CREATED        VIRTUAL SIZE
ouruser/sinatra     latest  5db5f8471261  11 hours ago   446.7 MB
ouruser/sinatra     devel   5db5f8471261  11 hours ago   446.7 MB
ouruser/sinatra     v2      5db5f8471261  11 hours ago   446.7 MB
```

##### 从本地文件系统导入

要从本地文件系统导入一个镜像，可以使用 openvz（容器虚拟化的先锋技术）的模板来创建： openvz 的模板下载地址为 templates 。

比如，先下载了一个 ubuntu-14.04 的镜像，之后使用以下命令导入：

``` sh
sudo cat ubuntu-14.04-x86_64-minimal.tar.gz  |docker import - ubuntu:14.04
```

然后查看新导入的镜像。

``` sh
docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
ubuntu              14.04               05ac7c0b9383        17 seconds ago      215.5 MB
```

##### 上传镜像

用户可以通过 docker push 命令，把自己创建的镜像上传到仓库中来共享。例如，用户在 Docker Hub 上完成注册后，可以推送自己的镜像到仓库中。

``` sh
\$ sudo docker push ouruser/sinatra
The push refers to a repository [ouruser/sinatra] (len: 1)
Sending image list
Pushing repository ouruser/sinatra (3 tags)
```

#### 存出和载入镜像

##### 存出镜像

如果要导出镜像到本地文件，可以使用 docker save 命令。

``` sh
\$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
ubuntu              14.04               c4ff7513909d        5 weeks ago         225.4 MB
...
\$sudo docker save -o ubuntu_14.04.tar ubuntu:14.04
```

##### 载入镜像

可以使用 docker load 从导出的本地文件中再导入到本地镜像库，例如

``` sh
\$ sudo docker load --input ubuntu_14.04.tar
或
\$ sudo docker load < ubuntu_14.04.tar
```

这将导入镜像以及其相关的元数据信息（包括标签等）。

#### 移除本地镜像

如果要移除本地的镜像，可以使用 docker rmi 命令。注意 docker rm 命令是移除容器。

``` sh
$ sudo docker rmi training/sinatra
Untagged: training/sinatra:latest
Deleted: 5bc342fa0b91cabf65246837015197eecfa24b2213ed6a51a8974ae250fedd8d
Deleted: ed0fffdcdae5eb2c3a55549857a8be7fc8bc4241fb19ad714364cbfd7a56b22f
Deleted: 5c58979d73ae448df5af1d8142436d81116187a7633082650549c52c3a2418f0
```

::: tip 注意
在删除镜像之前要先用 docker rm 删掉依赖于这个镜像的所有容器。
:::

#### 镜像的实现原理

Docker 镜像是怎么实现增量的修改和维护的？ 每个镜像都由很多层次构成，Docker 使用 Union FS 将这些不同的层结合到一个镜像中去。

通常 Union FS 有两个用途, 一方面可以实现不借助 LVM、RAID 将多个 disk 挂到同一个目录下,另一个更常用的就是将一个只读的分支和一个可写的分支联合在一起，Live CD 正是基于此方法可以允许在镜像不变的基础上允许用户在其上进行一些写操作。 Docker 在 AUFS 上构建的容器也是利用了类似的原理。

### 容器

#### 基本结构

Dockerfile 由一行行命令语句组成，并且支持以 # 开头的注释行。

一般的，Dockerfile 分为四部分：基础镜像信息、维护者信息、镜像操作指令和容器启动时执行指令。

例如

``` sh
# This dockerfile uses the ubuntu image
# VERSION 2 - EDITION 1
# Author: docker_user
# Command format: Instruction [arguments / command] ..

# Base image to use, this must be set as the first line
FROM ubuntu

# Maintainer: docker_user <docker_user at email.com> (@docker_user)
MAINTAINER docker_user docker_user@email.com

# Commands to update the image
RUN echo "deb http://archive.ubuntu.com/ubuntu/ raring main universe" >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y nginx
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf

# Commands when creating a new container
CMD /usr/sbin/nginx
```

其中，一开始必须指明所基于的镜像名称，接下来推荐说明维护者信息。

后面则是镜像操作指令，例如 RUN 指令，RUN 指令将对镜像执行跟随的命令。每运行一条 RUN 指令，镜像添加新的一层，并提交。

最后是 CMD 指令，来指定运行容器时的操作命令。

下面是一个更复杂的例子

``` sh
# Nginx
#
# VERSION               0.0.1

FROM      ubuntu
MAINTAINER Victor Vieux <victor@docker.com>

RUN apt-get update && apt-get install -y inotify-tools nginx apache2 openssh-server

# Firefox over VNC
#
# VERSION               0.3

FROM ubuntu

# Install vnc, xvfb in order to create a 'fake' display and firefox
RUN apt-get update && apt-get install -y x11vnc xvfb firefox
RUN mkdir /.vnc
# Setup a password
RUN x11vnc -storepasswd 1234 ~/.vnc/passwd
# Autostart firefox (might not be the best way, but it does the trick)
RUN bash -c 'echo "firefox" >> /.bashrc'

EXPOSE 5900
CMD    ["x11vnc", "-forever", "-usepw", "-create"]

# Multiple images example
#
# VERSION               0.1

FROM ubuntu
RUN echo foo > bar
# Will output something like ===> 907ad6c2736f

FROM ubuntu
RUN echo moo > oink
# Will output something like ===> 695d7793cbe4

# You᾿ll now have two images, 907ad6c2736f with /bar, and 695d7793cbe4 with
# /oink.
```

#### 指令

指令的一般格式为 INSTRUCTION arguments，指令包括 FROM、MAINTAINER、RUN 等。

##### FROM

格式为 FROM \<image>或FROM \<image>:\<tag>。

第一条指令必须为 FROM 指令。并且，如果在同一个Dockerfile中创建多个镜像时，可以使用多个 FROM 指令（每个镜像一次）。

##### MAINTAINER

格式为 MAINTAINER \<name>，指定维护者信息。

##### RUN

格式为 RUN \<command> 或 RUN ["executable", "param1", "param2"]。

前者将在 shell 终端中运行命令，即 /bin/sh -c；后者则使用 exec 执行。指定使用其它终端可以通过第二种方式实现，例如 RUN ["/bin/bash", "-c", "echo hello"]。

每条 RUN 指令将在当前镜像基础上执行指定命令，并提交为新的镜像。当命令较长时可以使用 \ 来换行。

##### CMD

支持三种格式

``` text
CMD ["executable","param1","param2"] 使用 exec 执行，推荐方式；
CMD command param1 param2 在 /bin/sh 中执行，提供给需要交互的应用；
CMD ["param1","param2"] 提供给 ENTRYPOINT 的默认参数；
```

指定启动容器时执行的命令，每个 Dockerfile 只能有一条 CMD 命令。如果指定了多条命令，只有最后一条会被执行。

如果用户启动容器时候指定了运行的命令，则会覆盖掉 CMD 指定的命令。

##### EXPOSE

格式为 EXPOSE \<port> [\<port>...]。

告诉 Docker 服务端容器暴露的端口号，供互联系统使用。在启动容器时需要通过 -P，Docker 主机会自动分配一个端口转发到指定的端口。

##### ENV

格式为 ENV \<key> \<value>。 指定一个环境变量，会被后续 RUN 指令使用，并在容器运行时保持。

例如

``` sh
ENV PG_MAJOR 9.3
ENV PG_VERSION 9.3.4
RUN curl -SL http://example.com/postgres-$PG_VERSION.tar.xz | tar -xJC /usr/src/postgress && …
ENV PATH /usr/local/postgres-$PG_MAJOR/bin:$PATH
```

##### ADD

格式为 ADD \<src> \<dest>。

该命令将复制指定的 \<src> 到容器中的 \<dest>。 其中 \<src> 可以是Dockerfile所在目录的一个相对路径；也可以是一个 URL；还可以是一个 tar 文件（自动解压为目录）。

##### COPY

格式为 COPY \<src> \<dest>。

复制本地主机的 \<src>（为 Dockerfile 所在目录的相对路径）到容器中的 \<dest>。

当使用本地目录为源目录时，推荐使用 COPY。
ENTRYPOINT

两种格式：

``` text
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2（shell中执行）。
```

配置容器启动后执行的命令，并且不可被 docker run 提供的参数覆盖。

每个 Dockerfile 中只能有一个 ENTRYPOINT，当指定多个时，只有最后一个起效。

##### VOLUME

格式为 VOLUME ["/data"]。

创建一个可以从本地主机或其他容器挂载的挂载点，一般用来存放数据库和需要保持的数据等。

##### USER

格式为 USER daemon。

指定运行容器时的用户名或 UID，后续的 RUN 也会使用指定用户。

当服务不需要管理员权限时，可以通过该命令指定运行用户。并且可以在之前创建所需要的用户，例如：RUN groupadd -r postgres && useradd -r -g postgres postgres。要临时获取管理员权限可以使用 gosu，而不推荐 sudo。

##### WORKDIR

格式为 WORKDIR /path/to/workdir。

为后续的 RUN、CMD、ENTRYPOINT 指令配置工作目录。

可以使用多个 WORKDIR 指令，后续命令如果参数是相对路径，则会基于之前命令指定的路径。例如

``` yaml
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

则最终路径为 /a/b/c。

##### ONBUILD

格式为 ONBUILD [INSTRUCTION]。

配置当所创建的镜像作为其它新创建镜像的基础镜像时，所执行的操作指令。

例如，Dockerfile 使用如下的内容创建了镜像 image-A。

``` yaml
[...]
ONBUILD ADD . /app/src
ONBUILD RUN /usr/local/bin/python-build --dir /app/src
[...]
```

如果基于 image-A 创建新的镜像时，新的Dockerfile中使用 FROM image-A指定基础镜像时，会自动执行ONBUILD 指令内容，等价于在后面添加了两条指令。

``` yaml
FROM image-A

#Automatically run the following
ADD . /app/src
RUN /usr/local/bin/python-build --dir /app/src
```

使用 ONBUILD 指令的镜像，推荐在标签中注明，例如 ruby:1.9-onbuild。

#### 构建镜像

编写完成 Dockerfile 之后，可以通过 docker build 命令来构建镜像。

基本的格式为 docker build [选项] 路径，该命令将读取指定路径下（包括子目录）的 Dockerfile，并将该路径下所有内容发送给 Docker 服务端，由服务端来构建镜像。因此一般建议放置 Dockerfile 的目录为空目录。也可以通过 .dockerignore 文件（每一行添加一条匹配模式）来让 Docker 忽略路径下的目录和文件。

要指定镜像的标签信息，可以通过 -t 选项，例如

``` sh
\$ sudo docker build -t myrepo/myapp /tmp/test1/
```

<Valine></Valine>
