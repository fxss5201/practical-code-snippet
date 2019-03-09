---
title: Vue配置
lang: zh-CN
description: 用于积累Vue中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: Vue, 实用代码段
---

# Vue配置 #

## 请求代理==>>跨域问题 ##

以下配置仅适用于**vue cli3**。

在前后端分离的项目中，一般在开发过程中，前端应用是在本地`localhost`运行的，但此时 API 接口在其他主机上，这是进行 API 请求的时候就会产生跨域问题。

这个时候你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过`vue.config.js`中的`devServer.proxy`选项来配置。

用法也很方便：

### 第一步 ###

首先需要确定你是否安装过[`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware)，如果已经安装可以跳过此步。

安装`http-proxy-middleware`：

```Shell
npm install --save-dev http-proxy-middleware
```

### 第二步 ###

在`vue.config.js`文件中添加下面配置：

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': { // 请求链接匹配
        target: '<url>', // API 服务器域名
        ws: true, // 是否启用websockets
        changeOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      },
      '/foo': { // 另外一个连接匹配
        target: '<other_url>' // API 服务器域名
      }
    }
  }
}
```

### 第三步 ###

在请求链接的时候可以如下写法（此处以axios请求为例）：

```javascript
axios.get('/user?ID=12345')
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});
```

这样请求的时候请求的是`http://localhost:8080/user?ID=12345`会被代理到 API 服务器即：`http://www.fxss5201.cn/user?ID=12345`（假设上面第二步设置的域名是`http://www.fxss5201.cn/`）。

### 第四步 ###

重启`vue-cli-service serve`，记住每次修改`vue.config.js`文件中的配置都要重启serve才会应用。
