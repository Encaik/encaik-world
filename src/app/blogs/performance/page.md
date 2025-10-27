# 学习前端性能监控PerformanceApi

## 使用

Performance 接口可以获取到当前页面中与性能相关的信息。它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。

该类型的对象可以通过调用只读属性 Window.performance 来获得。

```js
let performance = window.performance
```

`window.performance`返回结构为：

- memory:其是 Chrome 添加的一个`非标准扩展`，这个属性提供了一个可以获取到基本内存使用情况的对象。不应该使用这个非标准的 API。

- navigation:PerformanceNavigation 对象提供了在指定的时间段里发生的操作相关信息，包括页面是加载还是刷新、发生了多少次重定向等等。

- onresourcetimingbufferfull:一个回调的 EventTarget，当触发 resourcetimingbufferfull 事件的时候会被调用。

- timeOrigin:返回性能测量开始时的时间的高精度时间戳。

- timing:是一个PerformanceTiming 对象,包含延迟相关的性能信息。

这其中，最常用的是timing对象，其结构为:

- navigationStart:是一个无符号long long 型的毫秒数，表征了从同一个浏览器上下文的上一个文档卸载(unload)结束时的UNIX时间戳。如果没有上一个文档，这个值会和PerformanceTiming.fetchStart相同。

- redirectStart:是一个无符号long long 型的毫秒数，表征了第一个HTTP重定向开始时的UNIX时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0.

- redirectEnd:是一个无符号long long 型的毫秒数，表征了最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的UNIX时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0.

- fetchStart:是一个无符号long long 型的毫秒数，表征了浏览器准备好使用HTTP请求来获取(fetch)文档的UNIX时间戳。这个时间点会在检查任何应用缓存之前。

- domainLookupStart:是一个无符号long long 型的毫秒数，表征了域名查询开始的UNIX时间戳。如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart一致。

- domainLookupEnd:是一个无符号long long 型的毫秒数，表征了域名查询结束的UNIX时间戳。如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart一致。

- connectStart:是一个无符号long long 型的毫秒数，返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。

- secureConnectionStart:是一个无符号long long 型的毫秒数，返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。如果当前网页不要求安全连接，则返回0。

- connectEnd:是一个无符号long long 型的毫秒数，返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。

- requestStart:是一个无符号long long 型的毫秒数，返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。

- responseStart:是一个无符号long long 型的毫秒数，返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳。如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。

- unloadEventStart:一个无符号long long 型的毫秒数，表征了unload事件抛出时的UNIX时间戳。如果没有上个文档，或上个文档非同源重定向, 这个值会返回0.

- unloadEventEnd:是一个无符号long long 型的毫秒数，表征了unload事件处理完成时的UNIX时间戳。如果没有上个文档，或上个文档非同源重定向, 这个值会返回0.

- responseEnd:是一个无符号long long 型的毫秒数，返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的Unix毫秒时间戳。

- domLoading:是一个无符号long long 型的毫秒数，返回当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的Unix毫秒时间戳。

- domInteractive:是一个无符号long long 型的毫秒数，返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

- domContentLoadedEventStart:是一个无符号long long 型的毫秒数，返回当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的Unix毫秒时间戳。

- domContentLoadedEventEnd:是一个无符号long long 型的毫秒数，返回当所有需要立即执行的脚本已经被执行（不论执行顺序）时的Unix毫秒时间戳。

- domComplete:是一个无符号long long 型的毫秒数，返回当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的Unix毫秒时间戳。

- loadEventStart:是一个无符号long long 型的毫秒数，返回该文档下，load事件被发送时的Unix毫秒时间戳。如果这个事件还未被发送，它的值将会是0。

- loadEventEnd:是一个无符号long long 型的毫秒数，返回当load事件结束，即加载事件完成时的Unix毫秒时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.

- entryType:返回"navigation"。

- name:返回文档的地址。

- startTime:返回DOMHighResTimeStamp值为“ 0”的。

- duration:返回与属性timestamp之间的差异的。PerformanceNavigationTiming.loadEventEnd - PerformanceEntry.startTime

- initiatorType:返回"navigation"。

- type:由string表示导航类型。必须为：“navigate”，“reload”，“back_forward”或“prerender”。

- nextHopProtocol:由string表示网络协议用于获取资源，所确定的ALPN协议ID（RFC7301） 。

- workerStart:如果Service Worker线程已经在运行，则DOMHighResTimeStamp在分配之前立即返回；FetchEvent如果尚未运行，则在启动Service Worker线程之前立即返回。如果服务工作者未拦截该资源，则该属性将始终返回0。

- transferSize:由number表示所取出的资源的大小（以字节为单位）。该大小包括响应标头字段以及响应有效载荷主体。

- encodedBodySize:由number表示的大小（以字节）从接收到的（HTTP或高速缓存），则取的有效载荷体，除去任何施加的内容编码之前。

- decodedBodySize:是一个number，它是从消息主体的提取（HTTP或缓存）中接收到的大小（以八位字节为单位），该大小是在删除所有应用的内容编码后得出的。

- serverTiming:PerformanceServerTiming包含服务器计时指标的条目数组。

- redirectCount(不建议使用):旧版PerformanceNavigation.redirectCount只读属性返回一个unsigned short表示到达页面之前完成的REDIRECT数的数字。

通过这些属性，我们常用的计算方式有:

- 重定向时长 = redirectEnd - redirectStart;

- DNS查询时长 = domainLookupEnd - domainLookupStart;

- TCP链接时长 = connectEnd - connectStart;

- HTTP请求时长 = responseEnd - responseStart;

- 解析dom树时长 = domComplete - domInteractive;

- 白屏时长 = responseStart - navigationStart;

- DOMready时长 = domContentLoadedEventEnd - navigationStart;

- onload时长 = loadEventEnd - navigationStart;

最后稍微美化一下用表格输出:

```js
let times = {};
let t = window.performance.timing;
times.redirectTime = t.redirectEnd - t.redirectStart + "ms";
times.DNSTime = t.domainLookupEnd - t.domainLookupStart + "ms";
times.TCPTime = t.connectEnd - t.connectStart + "ms";
times.HTTPTime = t.responseEnd - t.responseStart + "ms";
times.DOMTime = t.domComplete - t.domInteractive + "ms";
times.whiteTime = t.responseStart - t.navigationStart || t.fetchStart + "ms";
times.readyTime = t.domContentLoadedEventEnd - t.navigationStart || t.fetchStart + "ms";
times.loadTime = t.loadEventEnd - t.navigationStart || t.fetchStart + "ms";
console.table(times)
```

::: tip 注意
`t.navigationStart || t.fetchStart`为我所使用的chrome浏览器获取后无navigationStart属性，文档说明无上个文档与fetchStart相同，因为写成了这种形式。
:::

<Valine></Valine>
