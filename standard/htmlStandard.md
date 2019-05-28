---
title: html代码规范
lang: zh-CN
description: 用于积累html代码规范中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: html代码规范, 实用代码段
---

# html 代码规范 #

[HTML 规范](https://guide.aotu.io/docs/html/code.html) 拓展性阅读，重点且需遵守已总结如下：

1. 文档声明: `<!DOCTYPE html>`;
2. lang: `<html lang="zh-CN">`;
3. 编码格式: `<meta charset="utf-8">`;
4. 所有具有开始标签和结束标签的元素都要写上起止标签，某些允许省略开始标签或和束标签的元素亦都要写上。
5. 代码大小写:
    1. HTML标签名、类名、标签属性和大部分属性值统一用小写。

        ```html
        <!-- 推荐： -->
        <div class="demo-item"></div>
        <!-- 不推荐： -->
        <div class="DEMOItem"></div>
        <DIV CLASS="DEMOItem"></DIV>
        ```

    2. HTML文本、javascript、meta标签某些属性等内容可大小写混合。

        ```html
        <!-- 优先使用 IE 最新版本和 Chrome Frame -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

        <!-- HTML文本内容 -->
        <h1>I AM WHAT I AM </h1>

        <!-- javascript 内容 -->
        <script type="text/javascript">
          var demoName = 'demoName';
          ...
        </script>
        ```

6. 元素属性值使用双引号语法。
7. [className 推荐命名法](https://guide.aotu.io/docs/name/classname.html) ，除了下面列出的，其余的尽量参考上述链接内容。
    1. 单词之间使用破折号 `-` 或下划线 `_` 连接。
    2. 严禁使用 `ad、banner、gg、guanggao` 等有机会和广告挂勾的字眼，因为有些浏览器插件（Chrome的广告拦截插件等）会直接过滤这些类名。
    3. 敏感不和谐字眼也不应该出现。