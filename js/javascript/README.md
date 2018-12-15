---
title: javascript 实用代码段
lang: zh-CN
description: 用于积累javascript中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: javascript, 实用代码段
sidebar: auto
---

# javascript 实用代码段 #

用于积累javascript中的实用代码段。按照实现的功能进行划分，不区分先后。

## 检测对象类型 ##

### 检测对象类型-->>`toString()` 检测对象类型 ###

```javascript
var toString = Object.prototype.toString;
toString.call(undefined); // "[object Undefined]"
toString.call(null); // "[object Null]"

toString.call(new String); // "[object String]"
toString.call("abc"); // "[object String]"

toString.call(new Number); // "[object Number]"
toString.call(123); // "[object Number]"

toString.call(new Array); // "[object Array]"
toString.call([1,2,3]); // "[object Array]"

toString.call(new Boolean); // "[object Boolean]"
toString.call(true); // "[object Boolean]"

toString.call(new Object); // "[object Object]"
toString.call({a: 1, b: 2});  // "[object Object]"

toString.call(new Function);  // "[object Function]"
toString.call(function(x){ return x * x; });   // "[object Function]"

toString.call(Math); // "[object Math]"
toString.call(new Date); // "[object Date]"
```

下面提供一个获取所有类型的方法：

```javascript
function getType(obj){
    return Object.prototype.toString.call(obj).slice(8, -1);
}

getType(undefined); // "Undefined"
getType(null); // "Null"
getType("abc"); // "String"
getType(123); // "Number"
getType([1,2,3]); // "Array"
getType(true); // "Boolean"
getType({a: 1, b: 2}); // "Object"
getType(function(x){ return x * x; }); // "Function"
getType(Math); // "Math"
getType(new Date); // "Date"
```

## `Array`方法总结 ##

::: tip 阅读提示
每个方法都有相应的描述、语法、参数、注意项（可选）。

语法中的`[]`里面中的内容表示参数为可选参数。
:::

### `Array.from()` ###

描述：从一个类似数组或可迭代对象中创建一个新的数组实例。

语法：

```javascript
new_array = Array.from(arrayLike[, mapFn[, thisArg]]);
```

参数：

1. `new_array`：返回的新数组。
2. `arrayLike`：类似数组或可迭代对象。
3. `mapFn`：新数组中的每个元素都执行的回调函数，效果等同于：`Array.from(arrayLike).map(mapFn, thisArg)`。
4. `thisArg`：执行回调函数`mapFn`时的`this`对象。

## 多维数组变一维数组 ##

原理是先把多维数组转字符串，再把字符串转为一维数组。

### 多维数组变一维数组-->>`join()` ###

```javascript
[[1,2,3],[2,[2,3]]].join().split(',').map(x => x * 1); // [1, 2, 3, 2, 2, 3]
```

### 多维数组变一维数组-->>`toString()` ###

```javascript
[[1,2,3],[2,[2,3]]].toString().split(',').map(x => x * 1); // [1, 2, 3, 2, 2, 3]
```

### 多维数组变一维数组-->>空字符串 ###

```javascript
([[1,2,3],[2,[2,3]]] + '').split(',').map(x => x * 1); // [1, 2, 3, 2, 2, 3]
```

### 多维数组变一维数组-->>`concat.apply`（仅适用于二维数组） ###

```javascript
[].concat.apply([], [[1,2,3],[2,2,3]]); // [1, 2, 3, 2, 2, 3]
```

## 数组去重 ##

```javascript
Array.from(new Set([1, 2, 3, 2, 2, 3])); // [1, 2, 3]
```

## 生成从0到99的数组 ##

```javascript
Array.from({length: 100}, (v, i) => i); // [0, 1, 2, ....99]

Array.from(Array(100), (v, i) => i); // [0, 1, 2, ....99]

Array.from(Array(100).keys()); // [0, 1, 2, ....99]

Array.apply(null,{length: 100}).map((v, i) => i); // [0, 1, 2, ....99]

Array(100).join().split(',').map((v, i) => i); // [0, 1, 2, ....99]

'1'.repeat(100).split('').map((v, i) => i); // [0, 1, 2, ....99]

[...Array(100)].map((v, i) => i); // [0, 1, 2, ....99]

[...Array(100).keys()]; // [0, 1, 2, ....99]

Object.keys(Array.apply(null,{length: 100})); // ['0', '1', '2', ....'99']

Object.keys(Array.apply(null,{length: 100})); // ['0', '1', '2', ....'99']
```

## 转化为整数 ##

```javascript
var toInteger = function (value) {
    var number = Number(value);
    if (isNaN(number)) { return 0; }
    if (number === 0 || !isFinite(number)) { return number; }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
};

toInteger(11.1); // 11
toInteger('11.1'); // 11
toInteger(NaN); // 0
toInteger(true); // 1
toInteger('w'); // 0
toInteger(Infinity); // Infinity
```

## `Array.of(7)`, `Array(7)`, `Array.from({ length: 7 })` 和 `[...Array(7)]`的区别 ##

* `Array.of(7)`创建一个具有单个元素 7 的数组。
* `Array(7)`创建一个长度为 7 的空数组，数组中每个元素都为空，是稀疏数组。
* `Array.from({ length: 7 })`创建一个具有 7 个元素且每个元素都是 `undefined` 的密集数组。
* `[...Array(7)]`创建一个具有 7 个元素且每个元素都是 `undefined` 的密集数组。

```javascript
Array.of(7); // [7]

Array(7); // [empty × 7]

Array.from({ length: 7 }); // [undefined, undefined, undefined, undefined, undefined, undefined, undefined]

[...Array(7)]; // [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
```

## `Array.prototype.concat()`合并返回的数组是浅拷贝 ##

`Array.prototype.concat()`方法创建一个新的数组，它由被调用的对象中的元素组成，每个参数的顺序依次是该参数的元素（如果参数是数组）或参数本身（如果参数不是数组），返回一个浅拷贝，其中包含从原始数组组合的相同元素的副本。原始数组的元素将复制到新数组中，如下所示：

* 数据类型，如字符串、数字和布尔值（不是`String`，`Number`和`Boolean`对象）：`concat()`将字符串和数字的值复制到新数组中。后面值的变更不会影响其他数组的值。

* 引用对象：`concat()`将对象引用复制到新数组中。原始数组和新数组都引用相同的对象。引用对象值的更改会影响原始数组和新数组。

```javascript
var array1 = [1, 2, 3, 4],
    array2 = [5, 6, [7, 8]],
    array3 = array1.concat(array2); // [1, 2, 3, 4, 5, 6, [7, 8]]
// 基本数据类型
array2[0] = 9;
console.log(array2); // [9, 6, [7, 8]]
console.log(array3); // [1, 2, 3, 4, 5, 6, [7, 8]]
// 引用类型
array2[2][1] = 10;
console.log(array2); // [9, 6, [7, 10]]
console.log(array3); // [1, 2, 3, 4, 5, 6, [7, 10]]

array3[0] = 11;
console.log(array1); // [1, 2, 3, 4]
console.log(array3); // [11, 2, 3, 4, 5, 6, [7, 10]]

array3[6][0] = 12;
console.log(array2); // [9, 6, [12, 10]]
console.log(array3); // [1, 2, 3, 4, 5, 6, [12, 10]]
```

## `Array.prototype.every()` ##

`every()`方法为数组中的每个元素执行一次`callback`函数，直到它找到一个使`callback`返回`false`（或可转换为布尔值`false`的值）的元素。如果发现了一个这样的元素，`every()`方法将会立即返回 `false`，否则返回`true`。但是有几点需要注意的：

* `every()`不会改变原数组。
* `every()`遍历的元素范围在第一次调用`callback`之前就已确定了。在调用`every()`之后添加到数组中的元素不会被`callback`访问到。
* 如果数组中存在的元素被更改，则他们传入`callback`的值是`every()`访问到他们那一刻的值。
* 被删除的元素或从来未被赋值的元素将不会被访问到。
* 空数组也是返回`true`。

```javascript
// `every()`不会改变原数组。
var a = [1,2,3];
a.every((v,i) => v < 10); // true
console.log(a); // [1,2,3]

// `every()`遍历的元素范围在第一次调用`callback`之前就已确定了。在调用`every()`之后添加到数组中的元素不会被`callback`访问到。
a.every((v, i, arr) => {
    if(i == 1){
        arr.push(12);
    }
    return v < 10;
}); // true
console.log(a); // [1, 2, 3, 12]

// 如果数组中存在的元素被更改，则他们传入`callback`的值是`every()`访问到他们那一刻的值。
a.every((v, i, arr) => {
    if(i == 1){
        arr[3] = 4;
    }
    if(i == 3){
        console.log(v); // 4
    }
    return v < 10;
}); // true
console.log(a); // [1, 2, 3, 4]

// 被删除的元素或从来未被赋值的元素将不会被访问到。
delete(a[3]);
console.log(a); // [1, 2, 3, empty]
a.every((v, i, arr) => {
    console.log(v); // 1, 2, 3  a[3]未执行`callback`
    return v < 10;
}); // true

a.every((v, i, arr) => {
    if(i == 0){
        delete(a[1]);
    }
    console.log(v); // 1, 3  a[1]未执行`callback`
    return v < 10;
}); // true

// 空数组也是返回`true`。
[].every((v, i) => v > 10); // true
```

## 筛选（搜索）`Array.prototype.filter()` ##

`filter()`方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

```javascript
var allOptionList = ['apple', 'banana', 'grapes', 'mango', 'orange'],
    filterItems = (query) => {
        return allOptionList.filter((value) => value.toLowerCase().indexOf(query.toLowerCase()) > -1);
    };

filterItems('b'); // ["banana"]
filterItems('ap'); // ["apple", "grapes"]
```

例子查看：[Open in CodePen](https://codepen.io/fxss5201/pen/VqwpdV)

## 查找数组中的首个质数及其索引 ##

```javascript
function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) {
            return false;
        }
    }
    return element > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); // undefined
console.log([4, 5, 6, 8].find(isPrime)); // 5

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1
console.log([4, 5, 6, 8].findIndex(isPrime)); // 1
```

## 从数组中找出指定元素出现的所有位置 ##

```javascript
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
function getIndexOfList(array, element){
    var indexOfList = [];
    var index = array.indexOf(element);
    while (index != -1) {
        indexOfList.push(index);
        index = array.indexOf(element, index + 1);
    }
    return indexOfList;
}

getIndexOfList(array, 'a'); // [0, 2, 4]
getIndexOfList(array, 'e'); // []
```