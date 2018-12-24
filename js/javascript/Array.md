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
每个方法都有相应的描述、语法、参数、返回值、注意项（可选）、例子（可选）。

语法中的`[]`里面中的内容表示参数为可选参数。
:::

## `Array.from()` ##

**描述**：从一个类似数组或可迭代对象中创建一个新的数组实例。

**语法**：

```javascript
new_array = Array.from(arrayLike[, callback(element[, index[, array]])[, thisArg]]);
```

**参数**：

1. `arrayLike`：类似数组或可迭代对象。
2. `callback`：新数组中的每个元素都执行的回调函数，效果等同于：`Array.from(arrayLike).map(callback(element[, index[, array]])[, thisArg])`。
   1. `element`：当前在数组中处理的元素。
   2. `index`：当前在数组中处理的元素的索引。
   3. `array`：当前数组。
3. `thisArg`：执行回调函数`mapFn`时的`this`对象。

**返回值**：

1. `new_array`：返回的新数组。

**例子**：

```javascript
Array.from('foo'); // ["f", "o", "o"]
Array.from({length: 5}, (v, i) => i); // [0, 1, 2, 3, 4]
```

## `Array.isArray()` ##

**描述**：用于确定传递的值是否是一个数组。

**语法**：

```javascript
new_boolean = Array.isArray(obj);
```

**参数**：

1. `obj`：需要检测的值。

**返回值**：

1. `new_boolean`：如果检测的值是数组，则返回`true`，否则返回`false`。

## `Array.of()` ##

**描述**：传入可变数量的参数，生成相应的数组。

**语法**：

```javascript
new_array = Array.of(element0[, element1[, ...[, elementN]]]);
```

**参数**：

1. `element0~elementN`：任意个参数，将按顺序成为返回数组中的元素。

**返回值**：

1. `new_array`：返回的新数组。

**例子**：

```javascript
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
```

## `Array.prototype.concat()` ##

**描述**：用于合并两个或多个数组。

**语法**：

```javascript
new_array = old_array.concat(value1[, value2[, ...[, valueN]]]);
```

**参数**：

1. `old_array/value1~valueN`：将数组或者值合并为新的数组。

**返回值**：

1. `new_array`：返回的新数组。

## `Array.prototype.copyWithin()` ##

**描述**：复制数组中的一部分值到某个位置，数组长度不变，并返回，会修改原数组。

**语法**：

```javascript
array = old_array.copyWithin(target[, start[, end]]);
```

**参数**：

1. `old_array`：原数组。
2. `target`：将复制的值安放的位置，索引以0开始，如果指定负数，将从数组的末尾开始往回算。
3. `start`：复制元素的起始位置，索引以0开始，如果指定负数，将从数组的末尾开始往回算。默认值为：0。
4. `end`：复制元素的起始位置，索引以0开始，如果指定负数，将从数组的末尾开始往回算。默认值为：`old_array.length`。

**返回值**：

1. `array`：在原数组上复制粘贴，然后将其返回。

**例子**：

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]
```

## `Array.prototype.entries()` ##

**描述**：返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。

**语法**：

```javascript
new_array_iterator = old_array.entries();
```

**参数**：

1. `old_array`：原数组。

**返回值**：

1. `new_array_iterator`：一个新的`Array`迭代器对象。可以通过`new_array_iterator.next().value`遍历迭代器取得原数组的`[key,value]`。

**例子**：

```javascript
var iterator = ['a', 'b', 'c'].entries();
iterator.next().value; // [0, "a"]
iterator.next().value; // [1, "b"]

var iterator1 = ['a', 'b', 'c'].entries();
for (let e of iterator1) {
    console.log(e);
}
// [0, "a"]
// [1, "b"]
// [2, "c"]
```

## `Array.prototype.every()` ##

**描述**：测试数组的所有元素是否都通过了指定函数的测试。

**语法**：

```javascript
boolean = old_array.every(callback[, thisArg]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：用来测试每个元素的函数。
3. `thisArg`：执行`callback`时使用的`this`值。

**返回值**：

1. `boolean`：返回一个`Boolean`值，`every`方法为数组中的每个元素执行一次`callback`函数，直到找到一个使`callback`返回`false`或[`Falsy`](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)的元素。如果发现了一个这样的元素，`every`方法将会立即返回`false`。否则，`callback`为每一个元素返回`true`，`every`方法才会返回`true`。

**注意项**：

1. `callback`只会为已经被赋值的索引调用，不会被删除或从来没被赋值的索引调用。
2. `every`不会改变原数组。
3. `every`遍历的元素范围在第一次调用`callback`之前就已经确定了。在调用`every`之后新添加到数组中的元素不会被`callback`访问到。如果数组中存在的元素被更改，则他们传入`callback`的值是 `every`访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。
4. 空数组返回`true`。

**例子**：

```javascript
[1, 2, 3, 4, 5].every(x => x > 0); // true
[1, 2, 3, 4, 5].every(x => x > 2); // false
```

## `Array.prototype.fill()` ##

**描述**：用一个固定值填充数组中从起始索引到终止索引之间的全部元素，不包括终止索引。

**语法**：

```javascript
array = old_array.fill(value[, start[, end]]);
```

**参数**：

1. `old_array`：原数组。
2. `value`：用来填充数组元素的值。
3. `start`：起始索引，索引以0开始，如果指定负数，将从数组的末尾开始往回算。默认值为：0。
4. `end`：终止索引，索引以0开始，如果指定负数，将从数组的末尾开始往回算。默认值为：`old_array.length`。

**返回值**：

1. `array`：修改后的数组。

**例子**：

```javascript
[1, 2, 3, 4, 5].fill(0, 2, 4); // [1, 2, 0, 0, 5]
[1, 2, 3, 4, 5].fill(0, -3, 4); // [1, 2, 0, 0, 5]
```

## `Array.prototype.filter()` ##

**描述**：创建一个新数组, 其包含通过所提供函数测试的所有元素。

**语法**：

```javascript
new_array = old_array.filter(callback(element[, index[, array]])[, thisArg]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：用来测试数组的每个元素的函数，返回`true`或[`Truthy`](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)则测试元素会被添加到返回的新数组，`false`或[`Falsy`](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)则不会。
   1. `element`：当前在数组中处理的元素。
   2. `index`：当前在数组中处理的元素的索引。
   3. `array`：当前数组。
3. `thisArg`：执行`callback`时使用的`this`值。

**返回值**：

1. `new_array`：所有通过测试的元素组成的新数组，如果没有通过测试的元素则返回空数组。

**注意项**：

1. `filter`遍历的元素范围在第一次调用`callback`之前就已经确定了。在调用`filter`之后新添加到数组中的元素不会被`callback`访问到。如果数组中存在的元素被更改，则他们传入`callback`的值是`filter`访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。

**例子**：

```javascript
[1, 2, 3, 4, 5].filter(x => x > 2); // [3, 4, 5]
```

## `Array.prototype.find()` ##

**描述**：返回通过测试的函数的第一个元素的值，否则返回`undefined`。

**语法**：

```javascript
elementN = old_array.find(callback(element[, index[, array]])[, thisArg]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：用来测试数组的每个元素的函数，直至`callback`返回`true`。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回`undefined`。
   1. `element`：当前在数组中处理的元素。
   2. `index`：当前在数组中处理的元素的索引。
   3. `array`：当前数组。
3. `thisArg`：执行`callback`时使用的`this`值。

**返回值**：

1. `elementN`：通过测试的函数的第一个元素的值，否则返回`undefined`。

**注意项**：

1. 空数组返回`undefined`。
2. `callback`函数会为数组中的每个索引调用即从 0 到 length - 1，而不仅仅是那些被赋值的索引（稀疏数组也会全部调用）。
3. `find`遍历的元素范围在第一次调用`callback`之前就已经确定了。在调用`find`之后新添加到数组中的元素不会被`callback`访问到。如果数组中存在的元素被更改，则他们传入`callback`的值是`find`访问到他们那一刻的值。被删除的元素仍旧会被访问到。

**例子**：

```javascript
[1, 2, 3, 4, 5].find(x => x > 2); // 3
```

## `Array.prototype.findIndex()` ##

**描述**：返回通过测试的函数的第一个元素的索引，否则返回-1。

**语法**：

```javascript
number = old_array.findIndex(callback(element[, index[, array]])[, thisArg]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：用来测试数组的每个元素的函数，直至`callback`返回`true`。当找到了这样一个元素后，该方法会立即返回这个元素的索引，否则返回-1。
   1. `element`：当前在数组中处理的元素。
   2. `index`：当前在数组中处理的元素的索引。
   3. `array`：当前数组。
3. `thisArg`：执行`callback`时使用的`this`值。

**返回值**：

1. `number`：通过测试的函数的第一个元素的索引，否则返回-1。

**注意项**：

1. 空数组返回-1。
2. `callback`函数会为数组中的每个索引调用即从 0 到 length - 1，而不仅仅是那些被赋值的索引（稀疏数组也会全部调用）。
3. `findIndex`遍历的元素范围在第一次调用`callback`之前就已经确定了。在调用`findIndex`之后新添加到数组中的元素不会被`callback`访问到。如果数组中存在的元素被更改，则他们传入`callback`的值是`findIndex`访问到他们那一刻的值。被删除的元素仍旧会被访问到。

**例子**：

```javascript
[1, 2, 3, 4, 5].findIndex(x => x > 2); // 2
```

## `Array.prototype.flat()` ##

**描述**：会递归到指定深度将所有子数组连接，并返回一个新数组。

**语法**：

```javascript
new_array = old_array.flat(depth);
```

**参数**：

1. `old_array`：原数组。
2. `depth`：指定嵌套数组中的结构深度，默认值为1。

**返回值**：

1. `new_array`：将子数组连接起来的新数组。

**例子**：
一般可用于将多维数组转化为一维数组，例如：

```javascript
[[1,2,3],[2,[2,3]]].flat(); // [1, 2, 3, 2, [2, 3]]
[[1,2,3],[2,[2,3]]].flat(2); // [1, 2, 3, 2, 2, 3]
[1, 2, , 4, 5].flat(); // [1, 2, 4, 5]
```

## `Array.prototype.flatMap()` ##

**描述**：首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与先执行相应的`map`函数在执行`flat()`效果相同，除了效率略微高一些。

**语法**：

```javascript
new_array = old_array.flatMap(callback(element[, index[, array]])[, thisArg]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：可以生成一个新数组中的元素的函数。
   1. `element`：当前在数组中处理的元素。
   2. `index`：当前在数组中处理的元素的索引。
   3. `array`：当前数组。

**返回值**：

1. `new_array`：一个新的数组，其中每个元素都是回调函数的结果。

**例子**：

```javascript
var arr1 = [1, 2, 3, 4];
arr1.flatMap(x => [x * 2]); // [2, 4, 6, 8]
arr1.map(x => [x * 2]).flat(); // [2, 4, 6, 8]
```