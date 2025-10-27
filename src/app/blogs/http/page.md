# 前端请求发展及使用

## XMLHttpRequest

该对象XMLHttpRequest是由Microsoft设计的JavaScript对象。用于使用HTTP协议检索数据。与名称相反，它可以用于处理多种格式的文档，不仅是XML，还可以是JSON。

```js
var req = new XMLHttpRequest();
req.open('GET', 'http://www.mozilla.org/', true);
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {
     if(req.status == 200)
      dump(req.responseText);
     else
      dump("Błąd podczas ładowania strony\n");
  }
};
req.send(null);
```

## Ajax

AJAX（异步JavaScript和XML）是Web浏览器的两个强大功能的最新称呼，借助这些功能，您可以：

- 将查询发送到服务器而无需重新加载页面，
- 解析并使用XML文档。

术语AJAX是缩写。它来自“异步”，这意味着您可以将HTTP查询发送到服务器并在等待响应时执行其他操作。JA来自“ JavaScript”，X来自“ XML”。

```js
var http_request = false;

function makeRequest(url) {

  http_request = false;

  if (window.XMLHttpRequest) { // Mozilla, Safari,...
    http_request = new XMLHttpRequest();
    if (http_request.overrideMimeType) {
        http_request.overrideMimeType('text/xml');
        // Przeczytaj o tym wierszu poniżej
    }
  } else if (window.ActiveXObject) { // IE
    try {
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
  }

  if (!http_request) {
    alert('Poddaję się :( Nie mogę stworzyć instancji obiektu XMLHTTP');
    return false;
  }
  http_request.onreadystatechange = function() { alertContents(http_request); };
  http_request.open('GET', url, true);
  http_request.send(null);

}

function alertContents(http_request) {

if (http_request.readyState == 4) {
  if (http_request.status == 200) {
    alert(http_request.responseText);
  } else {
    alert('Wystąpił problem z zapytaniem.');
  }
}
```

## Fetch

Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。它还提供了一个全局 fetch() 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

这种功能以前是使用 XMLHttpRequest 实现的。Fetch 提供了一个更理想的替代方案，可以很容易地被其他技术使用，例如  Service Workers。Fetch 还提供了专门的逻辑空间来定义其他与 HTTP 相关的概念，例如 CORS 和 HTTP 的扩展。

请注意，fetch 规范与 jQuery.ajax() 主要有三种方式的不同：

- 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject， 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
- fetch() 不会接受跨域 cookies；你也不能使用 fetch() 建立起跨域会话。其他网站的 Set-Cookie 头部字段将会被无视。
- fetch 不会发送 cookies。除非你使用了credentials 的初始化选项。（自 2017 年 8 月 25 日以后，默认的 credentials 政策变更为 same-origin。Firefox 也在 61.0b13 版本中进行了修改）

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

## Axios

axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP client。

```js
axios.get('/user?ID=12345')
  .then(function (response) {
    // 响应 success
    console.log(response);
  })
  .catch(function (error) {
    // 响应 error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
```

<Valine></Valine>
