# 学习使用Flutter进行移动端开发

## 资源库

修改Flutter\packages\flutter_tools\gradle\flutter.gradle文件

``` groovy
/* 原本 */
buildscript {
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
    }
}
/* 修改后 */
buildscript {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
    }
}
```

## 常用Widget

- 页面
  - StatelessWidget
  - StatefulWidget
- 导航
  - MaterialApp
  - Scaffold
  - AppBar
  - BottomNavigationBar
- 布局
  - Container
  - Row
  - Column
  - Center
  - FittedBox
  - AspectRatio
- 滚动
  - GridView
  - ListView
  - SingleChildScrollview
- 表单
  - TextField
  - RaisedButton
  - FlatButton
  - IconButton
- 通用
  - Text
  - Image
  - Icon
  - Divider
  - ListTile
  - Card

## 常用依赖

### date_format

时间格式化

### dio

网络请求

### provider

状态管理

### flutter_screenutil

屏幕尺寸及适配

### fluttertoast

轻提示

### path_provider

路径获取

### file_picker

文件选择

<Valine></Valine>
