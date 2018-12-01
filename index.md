# javascript 实用代码段 #
用于积累javascript中实用的一些代码段。按照实现的功能进行划分，不区分先后。

[id_00000]: #detectionType
## [检测对象类型][id_00000] ##

1. `toString()` 检测对象类型

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

[id_00001]: #multidimensionalArrayVariableOneDimensionalArray
## [多维数组变一维数组][id_00001] ##

原理是先把多维数组转字符串，再把字符串转为一维数组。

[id_00002]: #multidimensionalArrayVariableOneDimensionalArray_join
### [`join()`][id_00002] ###

```javascript
[[1,2,3],[2,[2,3]]].join().split(',').map(x => x * 1); // [1, 2, 3, 2, 2, 3]
```
