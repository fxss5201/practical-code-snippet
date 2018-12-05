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

## Array.of(7), Array(7) 和 Array.from({ length: 7 })的区别 ##

* `Array.of(7)`创建一个具有单个元素 7 的数组。
* `Array(7)`创建一个长度为 7 的空数组，数组中每个元素都为空，是稀疏数组。
* `Array.from({ length: 7 })`创建一个具有 7 个元素且每个元素都是 `undefined` 的密集数组。

```javascript
Array.of(7); // [7]

Array(7); // [empty × 7]

Array.from({ length: 7 }); // [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
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

array3[6][0] = 11;
console.log(array2); // [9, 6, [11, 10]]
console.log(array3); // [1, 2, 3, 4, 5, 6, [11, 10]]
```