---
title: Array方法总结
lang: zh-CN
description: 用于积累javascript中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: javascript, 实用代码段
---

# `Array`方法总结 #

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

## `Array.prototype.forEach()` ##

**描述**：对数组的每个元素执行一次提供的函数。

**语法**：

```javascript
old_array.forEach(callback(element[, index[, array]])[, thisArg]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：为数组中每个元素执行的函数。
   1. `element`：当前在数组中处理的元素。
   2. `index`：当前在数组中处理的元素的索引。
   3. `array`：当前数组。

**返回值**：`undefined`。

**注意项**：

1. `forEach`遍历的元素范围在第一次调用`callback`之前就已经确定了。在调用`forEach`之后新添加到数组中的元素不会被`callback`访问到。如果数组中存在的元素被更改，则他们传入`callback`的值是`forEach`访问到他们那一刻的值。被删除的元素将不会被访问到。
2. 没有办法中止或者跳出`forEach`循环，除了抛出一个异常。

**例子**：

```javascript
var a = [1, 2, 3, 4].forEach(x => console.log(x * 2));
// 2
// 4
// 6
// 8

console.log(a); // undefined

/** 如果数组在迭代时被修改了，则其他元素会被跳过。
 * 数组到two的时候移除第一个元素，所以每个位置上的元素都会往前移动一位，并且当前index为2，所以就得到对应值为four
 */
var words = ["one", "two", "three", "four"];
words.forEach(function(word, index) {
  console.log('No' + index + '. ' + word);
  if (word === "two") {
    words.shift();
  }
});
// No0. one
// No1. two
// No2. four
```

## `Array.prototype.includes()` ##

**描述**：用来判断一个数组是否包含一个指定的值，如果包含则返回`true`，否则返回`false`。

**语法**：

```javascript
boolean = old_array.includes(searchElement[, fromIndex]);
```

**参数**：

1. `old_array`：原数组。
2. `searchElement`：需要查找的元素值。
3. `fromIndex`：从该索引处开始查找`searchElement`。如果为负值，则按升序从`array.length - fromIndex`的索引开始搜索。默认为 0。

**返回值**：

1. `boolean`：如果包含则返回`true`，否则返回`false`。

**例子**：

```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

## `Array.prototype.indexOf()` ##

**描述**：返回在数组中找到给定元素的第一个索引，如果不存在，则返回-1。

**语法**：

```javascript
number = old_array.indexOf(searchElement[, fromIndex]);
```

**参数**：

1. `old_array`：原数组。
2. `searchElement`：需要查找的元素值。
3. `fromIndex`：从该索引处开始查找`searchElement`。如果为负值，则按升序从`array.length - fromIndex`的索引开始搜索。默认为 0。

**返回值**：

1. `number`：返回在数组中找到给定元素的第一个索引，如果不存在，则返回-1。

**注意项**：

1. `indexOf`使用严格等于进行判断（仅当两个操作数的类型相同且值相等才为`true`）。

**例子**：

```javascript
[2, 5, 9].indexOf(2); // 0
[2, 5, 9].indexOf('2'); // -1
```

## `Array.prototype.join()` ##

**描述**：将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。

**语法**：

```javascript
string = old_array.join([separator]);
```

**参数**：

1. `old_array`：原数组。
2. `separator`：数组元素组合成字符串时之间的分隔符，默认为`,`，如不希望使用分隔符，则指定`''`。

**返回值**：

1. `string`：所有元素连接成的字符串。

**注意项**：

1. 如果元素是`undefined`或者`null`，则会转化成空字符串`''`。

**例子**：

```javascript
['a', 'b', 'c'].join();        // "a,b,c"
['a', 'b', 'c'].join('');      // "abc"
['a', 'b', 'c'].join('-');     // "a-b-c"

['a', undefined, null].join(); // "a,,"
```

## `Array.prototype.keys()` ##

**描述**：返回一个包含数组中每个索引键的`Array Iterator`对象。

**语法**：

```javascript
new_iterator = old_array.keys();
```

**参数**：

1. `old_array`：原数组。

**返回值**：

1. `new_iterator`：返回一个包含数组中每个索引键的`Array Iterator`对象。

**注意项**：

1. 索引迭代器会包含那些没有对应元素的索引。

**例子**：

```javascript
var iterator = ['a', 'b', 'c'].keys();
iterator.next();   // {value: 0,done: false}
iterator.next();   // {value: 1,done: false}
iterator.next();   // {value: 2,done: false}
iterator.next();   // {value: undefined,done: true}

var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr); // ["0", "2"]
var denseKeys = [...arr.keys()];   // [0, 1, 2]
```

## `Array.prototype.lastIndexOf()` ##

**描述**：返回从数组中**逆向**找到给定元素的第一个索引，如果不存在，则返回-1。

**语法**：

```javascript
number = old_array.lastIndexOf(searchElement[, fromIndex]);
```

**参数**：

1. `old_array`：原数组。
2. `searchElement`：需要查找的元素值。
3. `fromIndex`：从该索引处开始**逆向**查找`searchElement`。默认值从`array.length - 1`，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，则从`array.length + fromIndex`索引出开始**逆向**查找。如果负值的绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

**返回值**：

1. `number`：返回从数组中**逆向**找到给定元素的第一个索引，如果不存在，则返回-1。

**注意项**：

1. `lastIndexOf`使用严格等于进行判断（仅当两个操作数的类型相同且值相等才为`true`）。

**例子**：

```javascript
[2, 5, 9].lastIndexOf(2); // 0
[2, 5, 9].lastIndexOf('2'); // -1
```

## `Array.prototype.map()` ##

**描述**：创建一个新数组，其结果是该数组中的每个元素都调用提供函数后返回的结果。

**语法**：

```javascript
new_array = old_array.map(callback(element[, index[, array]])[, thisArg]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：原数组中的每个元素都执行的回调函数，然后返回新数组中对应索引处的元素。
   1. `element`：当前在数组中处理的元素。
   2. `index`：当前在数组中处理的元素的索引。
   3. `array`：当前数组。
3. `thisArg`：执行回调函数时的`this`对象。

**返回值**：

1. `new_array`：`callback`每次执行后的返回值（包括`undefined`）组合起来形成一个新数组。

**注意项**：

1. `map`遍历的元素范围在第一次调用`callback`之前就已经确定了。在调用`map`之后新添加到数组中的元素不会被`callback`访问到。如果数组中存在的元素被更改，则他们传入`callback`的值是`map`访问到他们那一刻的值。从来没被赋过值或被删除的元素将不会被访问到。

**例子**：

```javascript
[2, 5, 9].map(x => x * x); // [4, 25, 81]

["1", "2", "3"].map(parseInt); // [1, NaN, NaN]
["1", "2", "3"].map(x => parseInt(x)); // [1, 2, 3]
```

## `Array.prototype.pop()` ##

**描述**：从数组中删除最后一个元素，并返回该元素的值。

**语法**：

```javascript
last_element = old_array.pop();
```

**参数**：

1. `old_array`：原数组。

**返回值**：

1. `last_element`：数组的最后一个元素。

**注意项**：

1. 在空数组上调用`pop()`，返回`undefined`。
2. `Array(7)`等稀疏数组上调用`pop()`，返回`undefined`。
3. 此方法会改变原数组。

**例子**：

```javascript
[2, 5, 9].pop(); // 9
[2, 5, [9, 10]].pop(); // [9, 10]

[].pop(); // undefined
Array(7).pop(); // undefined
```

## `Array.prototype.push()` ##

**描述**：将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

**语法**：

```javascript
new_array_length = old_array.push(element1, ..., elementN);
```

**参数**：

1. `old_array`：原数组。
2. `elementN`：被添加到数组末尾的元素。

**返回值**：

1. `new_array_length`：返回数组添加元素之后的新长度。

**例子**：

```javascript
var arr = [1, 2, 3];
arr.push(4, 5); // 5
console.log(arr); // [1, 2, 3, 4, 5]
```

## `Array.prototype.reduce()` ##

**描述**：对数组中的每个元素执行提供的`reducer`函数(升序执行)，将其结果汇总为单个返回值。

**语法**：

```javascript
number = old_array.reduce(callback(accumulator, element[[, index], array])[, initialValue]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：原数组中的每个元素都执行的回调函数。
   1. `accumulator`：上一次调用回调的返回值，或提供的`initialValue`。
   2. `element`：当前在数组中处理的元素。
   3. `index`：当前在数组中处理的元素的索引。
   4. `array`：当前数组。
3. `initialValue`：用作第一次调用`callback`的参数值。如果未提供初始值，则将使用数组中的第一个元素。空数组在没有初始值时调用`reduce()`抛出`TypeError`。

**返回值**：

1. `number`：对数组中的每个元素执行提供的`reducer`函数(升序执行)，将其结果汇总为单个返回值。

**注意项**：

1. `reduce`为数组中的每一个元素依次执行`callback`函数，不包括数组中被删除或从未被赋值的元素。
2. 如果调用`reduce`时提供了`initialValue`，`accumulator`取值为`initialValue`，`element`取数组中的第一个值；如果没有提供`initialValue`，那么`accumulator`取数组中的第一个值，`element`取数组中的第二个值。
3. 如果没有提供`initialValue`，`reduce`会从索引 1 的地方开始执行`callback`方法，跳过第一个索引。如果提供`initialValue`，从索引 0 开始。
4. 如果数组仅有一个元素（无论位置如何）并且没有提供`initialValue`，或者有提供`initialValue`但是数组为空，那么此唯一值将被返回并且`callback`不会被执行。

**例子**：（代码注释中的`->`表示执行一次的结果）

```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, element, index, array){
  console.log(accumulator); // 0 -> 1 -> 3 -> 6
  return accumulator + element;
}); // 10
[0, 1, 2, 3, 4].reduce(function(accumulator, element, index, array){
  console.log(accumulator); // 10 -> 10 -> 11 -> 13 -> 16
  return accumulator + element;
}, 10); // 20
```

## `Array.prototype.reduceRight()` ##

**描述**：从右到左对数组中的每个元素执行提供的`reduceRight`函数，将其结果汇总为单个返回值。

**语法**：

```javascript
number = old_array.reduceRight(callback(previousValue, element[[, index], array])[, initialValue]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：原数组中的每个元素都执行的回调函数。
   1. `previousValue`：上一次调用回调的返回值，或提供的`initialValue`。
   2. `element`：当前在数组中处理的元素。
   3. `index`：当前在数组中处理的元素的索引。
   4. `array`：当前数组。
3. `initialValue`：用作第一次调用`reduceRight`的参数值。如果未提供初始值，则将使用数组中的最后一个元素。空数组在没有初始值时调用`reduceRight()`抛出`TypeError`。

**返回值**：

1. `number`：从右到左对数组中的每个元素执行提供的`reduceRight`函数，将其结果汇总为单个返回值。

**注意项**：

1. `reduceRight`为数组中的每一个元素依次执行`callback`函数，不包括数组中被删除或从未被赋值的元素。
2. 如果调用`reduceRight`时提供了`initialValue`，`previousValue`取值为`initialValue`，`element`取数组中的最后一个值；如果没有提供`initialValue`，那么`previousValue`取数组中的最后一个值，`element`取数组中的倒数第二个值。
3. 如果数组仅有一个元素（无论位置如何）并且没有提供`initialValue`，或者有提供`initialValue`但是数组为空，那么此唯一值将被返回并且`callback`不会被执行。

**例子**：

```javascript
[0, 1, 2, 3, 4].reduceRight(function(accumulator, element, index, array){
  console.log(accumulator); // 4 -> 7 -> 9 -> 10
  return accumulator + element;
}); // 10
[0, 1, 2, 3, 4].reduceRight(function(accumulator, element, index, array){
  console.log(accumulator); // 10 -> 14 -> 17 -> 19 -> 20
  return accumulator + element;
}, 10); // 20
```

## `Array.prototype.reverse()` ##

**描述**：将数组中元素的位置颠倒。

**语法**：

```javascript
new_array = old_array.reverse();
```

**参数**：

1. `old_array`：原数组。

**返回值**：

1. `new_array`：颠倒数组中元素的位置，并返回该数组的引用。

**例子**：

```javascript
var arr = ['one', 'two', 'three'];
var reversed = arr.reverse();
console.log('reversed: ', reversed); // ["three", "two", "one"]
console.log('arr: ', arr); // ["three", "two", "one"]
```

## `Array.prototype.shift()` ##

**描述**：从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

**语法**：

```javascript
first_element = old_array.shift();
```

**参数**：

1. `old_array`：原数组。

**返回值**：

1. `first_element`：数组中的第一个元素。

**注意项**：

1. 如果数组的`length`属性的值为 0 (长度为 0)，则返回`undefined`。

**例子**：

```javascript
var arr = ['one', 'two', 'three'];
var shift = arr.shift();
console.log('shift: ', shift); // one
console.log('arr: ', arr); // ['two', 'three']

[].shift(); // undefined
```

## `Array.prototype.slice()` ##

**描述**：`slice`不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。

**语法**：

```javascript
new_array = old_array.slice([start[, end]);
```

**参数**：

1. `old_array`：原数组。
2. `start`：从该索引处开始复制原数组中的元素（包含该索引处的值），索引以0开始，如果指定负数，将从数组的末尾开始往回算。默认值为：0。
3. `end`：在该索引处结束复制原数组元素（不包含该索引处的值），索引以0开始，如果指定负数，将从数组的末尾开始往回算。默认值为：`old_array.length`。

**返回值**：

1. `new_array`：返回浅复制的新数组。

**注意项**：

1. 如果原数组中当前复制元素是对象引用 （不是实际的对象），`slice`会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素都会发生改变。
2. 对于字符串、数字及布尔值来说（不是`String`、`Number`或者`Boolean`对象），`slice`会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响其他数组。

**例子**：

```javascript
var arr1 = [1, 2, 3],
    arr2 = [arr1, 4, 5, 6], // [[1, 2, 3], 4, 5, 6]
    arr3 = arr2.slice(0, 2), // [[1, 2, 3], 4]
    arr4 = arr2.slice(1, 3); // [4, 5]
arr1[0] = 7;
arr2[1] = 8;
console.log(arr2); // [[7, 2, 3], 8, 5, 6]
console.log(arr3); // [[7, 2, 3], 4]
console.log(arr4); // [4, 5]
```

## `Array.prototype.some()` ##

**描述**：测试是否至少有一个元素通过提供的函数的测试。

**语法**：

```javascript
boolean = old_array.some(callback(element[, index[, array]])[, thisArg]);
```

**参数**：

1. `old_array`：原数组。
2. `callback`：用来测试数组的每个元素的函数，符合条件则返回`true`，否则返回`false`。
   1. `element`：当前在数组中处理的元素。
   2. `index`：当前在数组中处理的元素的索引。
   3. `array`：当前数组。
3. `thisArg`：执行`callback`时使用的`this`值。

**返回值**：

1. `boolean`：如果至少有一个元素符合条件则返回`true`，否则返回`false`。

**注意项**：

1. 空数组调用`some`方法返回`false`。
2. `some`为数组中的每一个元素执行一次`callback`函数，直到找到一个使得`callback`返回一个`true`或[`Truthy`](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)。如果找到了这样一个值，`some()`将会立即返回 `true`，否则返回`false`。`callback`只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
3. `some`遍历的元素范围在第一次调用`callback`之前就已经确定了。在调用`some`之后新添加到数组中的元素不会被`callback`访问到。如果数组中存在的元素被更改，则他们传入`callback`的值是`some`访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。

**例子**：

```javascript
[].some(x => x > 0); // false

[1, 2, 3].some(x => x > 2); // true
```

## `Array.prototype.sort()` ##

**描述**：对数组的元素进行排序，并返回数组。默认排序顺序是根据字符串Unicode排序。

**语法**：

```javascript
new_array = old_array.sort([compareFunction]);
```

**参数**：

1. `old_array`：原数组。
2. `compareFunction`：用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode进行排序。

**返回值**：

1. `new_array`：排序后的数组。

**例子**：

```javascript
[1, 20, 8, 16].sort(); // [1, 16, 20, 8]

[1, 20, 8, 16].sort((a,b) => a - b); // [1, 8, 16, 20]
```

## `Array.prototype.splice()` ##

**描述**：通过删除现有元素和 / 或添加新元素来修改数组，并以数组返回原数组中被删除的内容。

**语法**：

```javascript
new_array = old_array.splice(start[, deleteCount[, item1[, item2[, ...]]]]);
```

**参数**：

1. `old_array`：原数组。
2. `start`：从该索引处开始删除现有元素和 / 或添加新元素来修改数组，索引以0开始，如果指定负数，将从数组的末尾开始往回算。默认值为：0。
3. `deleteCount`：整数，表示要移除的数组元素的个数。
   1. 如果`deleteCount`是 0或者负数，则不移除元素。这种情况下，至少应添加一个新元素。
   2. 如果`deleteCount`大于`start`之后的元素的总数，则从`start`后面的元素都将被删除（含第`start`位）。
   3. 如果`deleteCount`被省略，则其相当于`old_array.length - start`。
4. `itemN`：从`start`索引开始添加进数组的元素。如果不指定，则`splice`将只删除数组元素。

**返回值**：

1. `new_array`：由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

**例子**：

```javascript
[1, 20, 8, 16].splice(1); // [20, 8, 16]
[1, 20, 8, 16].splice(1, 2); // [20, 8]

var arr1 = [1, 20, 8, 16],
    arr2 = arr1.splice(1, 2, 2, 3, 4);
console.log(arr1); // [1, 2, 3, 4, 16]
console.log(arr2); // [20, 8]
```

## `Array.prototype.toString()` ##

**描述**：返回一个字符串，表示指定的数组及其元素。

**语法**：

```javascript
str = old_array.toString();
```

**参数**：

1. `old_array`：原数组。

**返回值**：

1. `str`：返回一个字符串，表示指定的数组及其元素。

**例子**：

```javascript
[1, 20, 8, 16].toString(); // "1,20,8,16"

[1, [20, [10, 15], 8], 16].toString(); // "1,20,10,15,8,16"
```

## `Array.prototype.unshift()` ##

**描述**：将一个或多个元素添加到数组的开头，并返回该数组的新长度。

**语法**：

```javascript
new_array_length = old_array.unshift(element1, ..., elementN);
```

**参数**：

1. `old_array`：原数组。
2. `elementN`：要添加到数组开头的元素。

**返回值**：

1. `new_array_length`：将一个或多个元素添加到数组的开头，并返回该数组的新长度。

**例子**：

```javascript
var arr1 = [1, 20, 8, 16],
    len = arr1.unshift(-1, 0);
console.log(arr1); // [-1, 0, 1, 20, 8, 16]
console.log(len); // 6
```

## `Array.prototype.values()` ##

**描述**：返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值。

**语法**：

```javascript
new_iterator = old_array.values();
```

**参数**：

1. `old_array`：原数组。
2. `elementN`：要添加到数组开头的元素。

**返回值**：

1. `new_iterator`：返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值。

**例子**：

```javascript
var iterator = ['a', 'b', 'c'].values();
iterator.next();   // {value: "a",done: false}
iterator.next();   // {value: "b",done: false}
iterator.next();   // {value: "c",done: false}
iterator.next();   // {value: undefined,done: true}
```