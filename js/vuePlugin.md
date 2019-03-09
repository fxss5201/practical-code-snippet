---
title: Vue插件 
lang: zh-CN
description: 用于积累Vue中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: Vue, 实用代码段
---

# Vue插件 #

## axios ##

### 取消请求 ###

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
