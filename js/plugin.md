---
title: 插件/组件
lang: zh-CN
description: 插件/组件
sidebarDepth: 2
meta:
  - name: keywords
    content: js, 插件/组件
---

## axios ##

### 拦截器 ###

```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
```

### 取消令牌 ###

`axios`取消请求有两种方式：

1. 可以使用取消令牌取消请求，使用`CancelToken.source`工厂创建取消令牌，如下所示：

``` javascript
const CancelToken = axios.CancelToken;
const source = CancelToken.source(); //取消令牌

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

2. 还可以通过将执行程序函数传递给`CancelToken`构造函数来创建取消令牌：

``` javascript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

**注意：您可以使用相同的取消令牌取消多个请求。**

## vConsole ##

[vConsole](https://github.com/Tencent/vConsole)：一个轻量、可拓展、针对手机网页的前端开发者调试面板。

```js
<head>
  <script src="path/to/vconsole.min.js"></script>
  <script>
    var vConsole = new VConsole();
  </script>
</head>
```

## js-cookie ##

[js-cookie](https://github.com/js-cookie/js-cookie)：一个简单，轻量级的用于处理浏览器cookie的JavaScript API

```js
// 基本
Cookies.set('name', 'value', { expires: 7, path: '' });

Cookies.get('name'); // => 'value'

Cookies.remove('name');

// JSON
Cookies.set('name', { foo: 'bar' });

Cookies.get('name'); // => '{"foo":"bar"}'

Cookies.getJSON('name'); // => { foo: 'bar' }
```

## html2canvas ##

[html2canvas](http://html2canvas.hertzen.com/)：使用JavaScript截图

使用的时候注意查看 [Features](http://html2canvas.hertzen.com/features) ，了解支持哪些 CSS 属性。在使用的时候遇到**不支持的 CSS 属性**，需要尽可能的使用支持的 CSS 属性去替换达到相同的功能。

## screenfull.js ##

[screenfull.js](https://github.com/sindresorhus/screenfull.js)：用于跨浏览器使用JavaScript Fullscreen API的简单包装器，可让您将页面或任何元素全屏显示。
