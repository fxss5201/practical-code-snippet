---
title: Polyfill
lang: zh-CN
description: 用于积累javascript中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: javascript, 实用代码段
---

主要是自己用已有的一些方法去实现的实验属性方法。

## `Array.flat`的实现方式 ##

`Array.flat()` 方法会递归到指定深度将所有子数组连接，并返回一个新数组。具体可查看[Array.prototype.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 。

那我们先在先来模仿将数组按照 `Infinity` 深度进行展开，先不考虑深度问题，实现方式如下：

```javascript
var flat = function(arr) {
    let res = [],
        flatMap = (arr) => {
            arr.map((element, index, array) => {
                if(Object.prototype.toString.call(element).slice(8, -1) === 'Array'){
                    flatMap(element);
                }else{
                    res.push(element);
                }
            })
        };
    flatMap(arr);
    return res;
};
console.log(flat([1,[8, 5], [6, 4, 8, [8, 3, [5, 9]]]])); // [1, 8, 5, 6, 4, 8, 8, 3, 5, 9]
```

这个时候我们再考虑深度问题，实现方式如下：

```javascript
var flat = function(arr, depth) {
    let res = [],
        depthArg = depth || 1,
        depthNum = 0,
        flatMap = (arr) => {
            arr.map((element, index, array) => {
                if(Object.prototype.toString.call(element).slice(8, -1) === 'Array'){
                    if(depthNum < depthArg){
                        depthNum++;
                        flatMap(element);
                    }else{
                        res.push(element);
                    }
                }else{
                    res.push(element);
                    if(index === array.length -1) depthNum = 0;
                }
            });
        };
    flatMap(arr);
    return res;
};
console.log(flat([1,[8, 5], [6, 4, 8, [8, 3, [5, 9]]]], Infinity)); // [1, 8, 5, 6, 4, 8, 8, 3, 5, 9]
console.log(flat([1,[8, 5], [6, 4, 8, [8, 3, [5, 9]]]])); // [1, 8, 5, 6, 4, 8, [8, 3, [5, 9]]]
console.log(flat([1,[8, 5], [6, 4, 8, [8, 3, [5, 9]]]], 2)); // [1, 8, 5, 6, 4, 8, 8, 3, [5, 9]]
console.log(flat([1,[8, 5], [6, 4, 8, [8, 3, [5, 9]]]], 3)); // [1, 8, 5, 6, 4, 8, 8, 3, 5, 9]
```

这个时候我们再加一些判断，就可以封装成一个简单的 Polyfill ：

```javascript
if (!Array.prototype.flat) {
    Object.defineProperty(Array.prototype, 'flat', {
        value: function(depth) {
            let res = [],
                depthArg = depth || 1,
                depthNum = 0,
                flatMap = (arr) => {
                    arr.map((element, index, array) => {
                        if(Object.prototype.toString.call(element).slice(8, -1) === 'Array'){
                            if(depthNum < depthArg){
                                depthNum++;
                                flatMap(element);
                            }else{
                                res.push(element);
                            }
                        }else{
                            res.push(element);
                            if(index === array.length -1) depthNum = 0;
                        }
                    });
                };
            flatMap(this);
            return res;
        }
    });
}
console.log([1,[8, 5], [6, 4, 8, [8, 3, [5, 9]]]].flat(Infinity)); // [1, 8, 5, 6, 4, 8, 8, 3, 5, 9]
console.log([1,[8, 5], [6, 4, 8, [8, 3, [5, 9]]]].flat()); // [1, 8, 5, 6, 4, 8, [8, 3, [5, 9]]]
console.log([1,[8, 5], [6, 4, 8, [8, 3, [5, 9]]]].flat(2)); // [1, 8, 5, 6, 4, 8, 8, 3, [5, 9]]
console.log([1,[8, 5], [6, 4, 8, [8, 3, [5, 9]]]].flat(3)); // [1, 8, 5, 6, 4, 8, 8, 3, 5, 9]
```
