---
title: javascript Array方法总结
lang: zh-CN
description: 用于积累javascript中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: javascript, 实用代码段
---

# javascript `Array`方法总结 #

::: tip 阅读提示
每个方法都有相应的描述、语法、参数、返回值、注意项（可选）。

语法中的`[]`里面中的内容表示参数为可选参数。
:::

## `Array.from()` ##

描述：从一个类似数组或可迭代对象中创建一个新的数组实例。

语法：

```javascript
new_array = Array.from(arrayLike[, mapFn[, thisArg]]);
```

参数：

1. `arrayLike`：类似数组或可迭代对象。
2. `mapFn`：新数组中的每个元素都执行的回调函数，效果等同于：`Array.from(arrayLike).map(mapFn, thisArg)`。
3. `thisArg`：执行回调函数`mapFn`时的`this`对象。

返回值：

1. `new_array`：返回的新数组。

## `Array.isArray()` ##

描述：用于确定传递的值是否是一个数组。

语法：

```javascript
new_boolean = Array.isArray(obj);
```

参数：

1. `obj`：需要检测的值。

返回值：

1. `new_boolean`：如果检测的值是数组，则返回`true`，否则返回`false`。

## `Array.of()` ##

描述：传入可变数量的参数，生成相应的数组。

语法：

```javascript
new_array = Array.of(element0[, element1[, ...[, elementN]]]);
```

参数：

1. `element0~elementN`：任意个参数，将按顺序成为返回数组中的元素。

返回值：

1. `new_array`：返回的新数组。

## `Array.prototype.concat()` ##

描述：用于合并两个或多个数组。

语法：

```javascript
new_array = old_array.concat(value1[, value2[, ...[, valueN]]]);
```

参数：

1. `old_array/value1~valueN`：将数组或者值合并为新的数组。

返回值：

1. `new_array`：返回的新数组。

## `Array.prototype.copyWithin()` ##

描述：复制数组中的一部分值到某个位置，数组长度不变，并返回，会修改原数组。

语法：

```javascript
array = old_array.copyWithin(target[, start[, end]]);
```

参数：

1. `old_array`：原数组。
2. `target`：将复制的值安放的位置，索引以0开始，如果指定负数，将从数组的末尾开始算。
3. `start`：复制元素的起始位置，索引以0开始，如果指定负数，将从数组的末尾开始算。默认值为：0。
4. `end`：复制元素的起始位置，索引以0开始，如果指定负数，将从数组的末尾开始算。默认值为：`old_array.length`。

返回值：

1. `array`：在原数组上复制粘贴，然后将其返回。
