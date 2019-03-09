---
title: html
lang: zh-CN
description: 用于积累html中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: html, 实用代码段
---

# html #

用于积累html中的一些实用代码段。按照实现的功能进行划分，不区分先后。

## 复选框的3种状态 ##

checkbox复选框一共提供了3种状态值：

* 选中，可通过在`input`上设置`checked`属性来选中。
* 未选中，默认为未选中状态。
* 模糊状态（一般用于全选之类的）：通过js设置其属性`indeterminate = true`就会显示模糊状态，不过需要注意的是：
  * 只能通过js来设置；
  * 优先级高于选中和未选中的状态，就比如说复选框处于选中状态，如果`indeterminate`值为`true`，会优先以模糊状态显示，所有以js修改选中值的时候，需要先将`indeterminate`置为`false`；
  * 用户点击的时候只会在选中和未选中之间切换，不会切换到模糊状态，并且会将`indeterminate`置为`false`。

例子查看：[Open in CodePen](https://codepen.io/fxss5201/pen/ebYpXJ)