# vue-test-utils学习-用nightwatch进行e2e测试

## 目录结构

## 测试样例

``` js
module.exports = {
  "@disabled": true,
  "default e2e tests": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent(".hello")
      .assert.containsText("h1", "Welcome to Your Vue.js App")
      .assert.elementCount("img", 1)
      .end();
  },
  "Demo test baidu": browser => {
    browser
      .url("https://www.baidu.com/")
      .waitForElementVisible("body")
      .assert.titleContains("百度一下，你就知道")
      .assert.visible("#kw")
      .setValue("#kw", "vue")
      .assert.visible("input[type=submit]")
      .click("input[type=submit]")
      .assert.containsText("#content_left", "Vue.js")
      .end();
  }
}
```

### .waitForElementVisible()

在执行任何其他命令或声明之前，等待给定时间（以毫秒为单位）（默认为5000ms）以使元素在页面中可见。

如果元素在指定的时间内未能显示并可见，则测试将失败。您可以通过设置abortOnFailure为来更改此设置false。

您可以通过waitForConditionPollInterval在您nightwatch.json或您的外部全局文件中将属性定义为全局属性来更改轮询间隔（以毫秒为单位）。

同样，可以将默认超时指定为全局waitForConditionTimeout属性（以毫秒为单位）。

### .assert.elementPresent()

检查给定元素在DOM中是否存在。

### .assert.containsText()

检查给定元素是否包含指定的文本。

### .assert.elementCount()

检查给定元素的个数。

<Valine></Valine>
