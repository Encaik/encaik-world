# 经验总结

## 原理

### mvvm

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input id="model1" type="text" oninput="change(this)" />
    <div id="model2"></div>
    <script src="./script.js"></script>
  </body>
</html>
```

```js
//初始化实例
let app = {
  data() {
    return {
      model: "123"
    };
  }
};
//解析实例数据
test = new Proxy(app.data(), {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    document.getElementById(`${key}1`).value = value;
    document.getElementById(`${key}2`).innerText = value;
    return Reflect.set(target, key, value);
  }
});
//挂载数据
Object.keys(app.data()).map(item => {
  document.getElementById(`${item}1`).value = test[item];
  document.getElementById(`${item}2`).innerText = test[item];
});
//监听变更
function change(e) {
  test.model = e.value;
}
```

## 框架

### Vuepress 中使用 emoji

可以通过 Shortcodes 直接写在文档中，Shortcodes 可在[emojipedia](https://emojipedia.org)查找

```markdown
    :heart:
```

显示效果：:heart:

### vue.$set及vue.$delete

[官网示例](https://cn.vuejs.org/v2/api/#Vue-set)

在我们使用 vue 进行开发的过程中，可能会遇到一种情况：当生成 vue 实例后，当再次给数据赋值时，有时候并不会自动更新到视图上去；
当我们去看 vue 文档的时候，会发现有这么一句话：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。

如下代码，给 student 对象新增 age 属性

```js
data () {
    return {
        student: {
            name: '',
            sex: ''
        }
    }
},
mounted () {
    this.student.age = 24
}
```

原因是：受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。

要处理这种情况，我们可以使用\$set()方法，既可以新增属性,又可以触发视图更新。

this.\$set(this.data,”key”,value’)

```js
mounted () {
    this.$set(this.student,"age", 24)
}
```

### Flutter 中 TextField 光标和 hintText 底边不对齐

原因是：不同文本的 baselines 不一样，中文 hinttext 比光标要大，所以 baselines 更低

解决方法：在 TextField 中添加 style 配置 baselines

```dart
style: TextStyle(
  textBaseline: TextBaseline.alphabetic
)
```

### ElementUI 无法覆盖样式

可以在样式前面加`/deep/`即可覆盖

## 工具

### Navicat 导出 Excel 格式表结构

```sql
SELECT
COLUMN_NAME 字段名称,
COLUMN_TYPE 数据类型,
IF(IS_NULLABLE='NO','是','否') AS '必填',
COLUMN_COMMENT 注释
FROM
INFORMATION_SCHEMA.COLUMNS
where
-- db_name为数据库名称，到时候只需要修改成你要导出表结构的数据库即可
table_schema ='db_name'
AND
-- table_name为表名，到时候换成你要导出的表的名称
-- 如果不写的话，默认会查询出所有表中的数据，这样可能就分不清到底哪些字段是哪张表中的了
table_name = 'table_name'
```

## 破解 office

将下面的代码保存成 bat 文件，管理员运行，即可破解

```bat
@echo off
title Activate Office 365 ProPlus for FREE - MSGuides.com&cls&echo ============================================================================&echo #Project: Activating Microsoft software products for FREE without software&echo ============================================================================&echo.&echo #Supported products: Office 365 ProPlus (x86-x64)&echo.&echo.&(if exist "%ProgramFiles%\Microsoft Office\Office16\ospp.vbs" cd /d "%ProgramFiles%\Microsoft Office\Office16")&(if exist "%ProgramFiles(x86)%\Microsoft Office\Office16\ospp.vbs" cd /d "%ProgramFiles(x86)%\Microsoft Office\Office16")&(for /f %%x in ('dir /b ..\root\Licenses16\proplusvl_kms*.xrm-ms') do cscript ospp.vbs /inslic:"..\root\Licenses16\%%x" >nul)&(for /f %%x in ('dir /b ..\root\Licenses16\proplusvl_mak*.xrm-ms') do cscript ospp.vbs /inslic:"..\root\Licenses16\%%x" >nul)&echo.&echo ============================================================================&echo Activating your Office...&cscript //nologo ospp.vbs /unpkey:WFG99 >nul&cscript //nologo ospp.vbs /unpkey:DRTFM >nul&cscript //nologo ospp.vbs /unpkey:BTDRB >nul&cscript //nologo ospp.vbs /inpkey:XQNVK-8JYDB-WJ9W3-YJ8YR-WFG99 >nul&set i=1
:server
if %i%==1 set KMS_Sev=kms7.MSGuides.com
if %i%==2 set KMS_Sev=kms8.MSGuides.com
if %i%==3 set KMS_Sev=kms9.MSGuides.com
if %i%==4 goto notsupported
cscript //nologo ospp.vbs /sethst:%KMS_Sev% >nul&echo ============================================================================&echo.&echo.
cscript //nologo ospp.vbs /act | find /i "successful" && (echo.&echo ============================================================================&echo.&echo #My official blog: MSGuides.com&echo.&echo #How it works: bit.ly/kms-server&echo.&echo #Please feel free to contact me at msguides.com@gmail.com if you have any questions or concerns.&echo.&echo #Please consider supporting this project: donate.msguides.com&echo #Your support is helping me keep my servers running everyday!&echo.&echo ============================================================================&choice /n /c YN /m "Would you like to visit my blog [Y,N]?" & if errorlevel 2 exit) || (echo The connection to my KMS server failed! Trying to connect to another one... & echo Please wait... & echo. & echo. & set /a i+=1 & goto server)
explorer "http://MSGuides.com"&goto halt
:notsupported
echo.&echo ============================================================================&echo Sorry! Your version is not supported.&echo Please try installing the latest version here: bit.ly/odt2k16
:halt
pause
```

<Valine></Valine>
