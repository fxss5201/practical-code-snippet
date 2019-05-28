---
title: 接口规范
lang: zh-CN
description: 接口规范。
meta:
  - name: keywords
    content: 接口规范, 实用代码段
---

# 接口规范 #

前端：

1. 所有的请求链接放在单独文件，方便日后链接的修改。

后端：

1. 接口返回的数据应该是严格的 json 格式，不应该是使用 `JSON.parse()` 方法将数据转换为 JavaScript 对象。
2. 接口返回的数据中的 key 都应该是首字母小写的 驼峰（camelCase）格式。