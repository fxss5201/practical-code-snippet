---
title: js代码规范
lang: zh-CN
description: 用于积累javascript代码规范中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: javascript代码规范, 实用代码段
---

# javascript 代码规范 #

1. 命名全部采用驼峰命名（camelCase）。
2. 非打包项目中尽量减少使用 es6~10 的新语法，使用前先看浏览器兼容性（[caniuse](https://caniuse.com/)）。
3. 打包项目尽可能使用 es6~10 的新语法。
4. [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
5. [语法规范](https://guide.aotu.io/docs/js/language.html)，除了下面列出的（列出的也有的是重点的），其余的尽量参考上述链接内容。

## 对象 ##

1. 请使用对象方法的简写方式

    ```javascript
    // bad
    const item = {
      value: 1,

      addValue: function (val) {
        return item.value + val
      }
    }

    // good
    const item = {
      value: 1,

      addValue(val) {
        return item.value + val
      }
    }
    ```

2. 请使用对象属性值的简写方式

    ```javascript
    const job = 'FrontEnd'

    // bad
    const item = {
      job: job
    }

    // good
    const item = {
      job
    }
    ```

## 数组 ##

1. 一维数组使用拓展运算符 `...` 复制数组

    ```javascript
    // bad
    const items = []
    const itemsCopy = []
    const len = items.length
    let i

    // bad
    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i]
    }

    // good
    itemsCopy = [...items]
    ```

2. 使用数组的 `map/reduce/filter` 等方法时，请使用 `return` 声明，如果是单一声明语句的情况，可省略 `return`

    ```javascript
    // good
    [1, 2, 3].map(x => {
      const y = x + 1
      return x * y
    })

    // good
    [1, 2, 3].map(x => x + 1)

    // bad
    const flat = {}
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item)
      flat[index] = flatten
    })

    // good
    const flat = {}
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item)
      flat[index] = flatten
      return flatten
    })

    // bad
    inbox.filter((msg) => {
      const { subject, author } = msg
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee'
      } else {
        return false
      }
    })

    // good
    inbox.filter((msg) => {
      const { subject, author } = msg
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee'
      }

      return false
    })
    ```

## 解构赋值 ##

1. 当需要使用对象的多个属性时，请使用解构赋值

    ```javascript
    // bad
    function getFullName (user) {
      const firstName = user.firstName
      const lastName = user.lastName

      return `${firstName} ${lastName}`
    }

    // good
    function getFullName (user) {
      const { firstName, lastName } = user

      return `${firstName} ${lastName}`
    }

    // better
    function getFullName ({ firstName, lastName }) {
      return `${firstName} ${lastName}`
    }
    ```

2. 当需要使用数组的多个值时，请同样使用解构赋值

    ```javascript
    const arr = [1, 2, 3, 4]

    // bad
    const first = arr[0]
    const second = arr[1]

    // good
    const [first, second] = arr
    ```

3. 函数需要回传多个值时，请使用对象的解构，而不是数组的解构

    ```javascript
    // bad
    function doSomething () {
      return [top, right, bottom, left]
    }

    // 如果是数组解构，那么在调用时就需要考虑数据的顺序
    const [top, xx, xxx, left] = doSomething()

    // good
    function doSomething () {
      return { top, right, bottom, left }
    }

    // 此时不需要考虑数据的顺序
    const { top, left } = doSomething()
    ```

## 字符串 ##

1. 程序化生成字符串时，请使用模板字符串

    ```javascript
    const test = 'test'

    // bad
    const str = ['a', 'b', test].join()

    // bad
    const str = 'a' + 'b' + test

    // good
    const str = `ab${test}`
    ```

## 函数 ##

1. 不要使用 `arguments`，可以选择使用 `...`

    > `arguments` 只是一个类数组，而 `...` 是一个真正的数组

    ```javascript
    // bad
    function test () {
      const args = Array.prototype.slice.call(arguments)
      return args.join('')
    }

    // good
    function test (...args) {
      return args.join('')
    }
    ```

2. 不要更改函数参数的值，或者说使用[函数参数的默认值](http://es6.ruanyifeng.com/#docs/function#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E5%80%BC)

    ```javascript
    // bad
    function test (opts) {
      opts = opts || {}
    }

    // good
    function test (opts = {}) {
      // ...
    }
    ```

## 原型 ##

1. 使用 `class`，避免直接操作 `prototype`

    ```javascript
    // bad
    function Queue (contents = []) {
      this._queue = [..contents]
    }
    Queue.prototype.pop = function () {
      const value = this._queue[0]
      this._queue.splice(0, 1)
      return value
    }

    // good
    class Queue {
      constructor (contents = []) {
        this._queue = [...contents]
      }

      pop () {
        const value = this._queue[0]
        this._queue.splice(0, 1)
        return value
      }
    }
    ```

## 模块 ##

1. 使用标准的 ES6 模块语法 `import` 和 `export`

    ```javascript
    // bad
    const util = require('./util')
    module.exports = util

    // good
    import Util from './util'
    export default Util

    // better
    import { Util } from './util'
    export { Util }
    ```

2. 不要使用 `import` 的通配符 `*`，这样可以确保你只有一个默认的 `export`

    ```javascript
    // bad
    import * as Util from './util'

    // good
    import Util from './util'
    ```

## 迭代器 ##

1. 不要使用 `iterators`

    ```javascript
    const numbers = [1, 2, 3, 4, 5]

    // bad
    let sum = 0
    for (let num of numbers) {
      sum += num
    }

    // good
    let sum = 0
    numbers.forEach(num => sum += num)

    // better
    const sum = numbers.reduce((total, num) => total + num, 0)
    ```

## 对象属性 ##

1. 除非属性是变量，否则一律使用 `.` 来访问对象属性

    ```javascript
    const joke = {
      name: 'haha',
      age: 28
    }

    // bad
    const name = joke['name']

    // good
    const name = joke.name
    ```

## 变量声明 ##

1. 声明变量时，请使用 `const`、`let` 关键字，如果没有写关键字，变量就会暴露在全局上下文中，这样很可能会和现有变量冲突，另外，也很难明确该变量的作用域是什么。这里推荐使用 `const` 来声明变量，我们需要避免全局命名空间的污染。

    ```javascript
    // bad
    demo = new Demo()

    // good
    const demo = new Demo()
    ```

2. 将所有的 `const` 和 `let` 分组，次点仅是为了查看代码顺眼。

    ```javascript
    // bad
    let a
    const b
    let c
    const d
    let e

    // good
    const b
    const d
    let a
    let c
    let e
    ```

## Hoisting ##

1. `var` 存在变量提升的情况，即 `var` 声明会被提升至该作用域的顶部，但是他们的赋值并不会。而 `const` 和 `let` 并不存在这种情况，并且存在[暂时性死区](http://es6.ruanyifeng.com/#docs/let#%E6%9A%82%E6%97%B6%E6%80%A7%E6%AD%BB%E5%8C%BA)

    ```javascript
    function example () {
      console.log(notDefined)   // => throws a ReferenceError
    }

    function example () {
      console.log(declareButNotAssigned)  // => undefined
      var declaredButNotAssigned = true
    }

    function example () {
      let declaredButNotAssigned
      console.log(declaredButNotAssigned)   // => undefined
      declaredButNotAssigned = true
    }

    function example () {
      console.log(declaredButNotAssigned)   // => throws a ReferenceError
      console.log(typeof declaredButNotAssigned)  // => throws a ReferenceError
      const declaredButNotAssigned = true
    }
    ```

## 函数说明 ##

函数说明包含内容：

```javascript
/**
 * 函数说明，主要是用于实现什么功能
 * @param {字段类型} 变量名 变量说明
 * @return {返回值类型} 返回值说明
 */
```

比如：

```javascript
/**
 * 由一个组件，向上找到最近的指定组件
 * @param {Object} context 当前上下文，比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 this
 * @param {String} componentName 要找的组件的 name
 */
function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
```

## 风格统一 ##

使用 vue cli 创建项目的时候， linter 选择 ESLint + Standard config 。

Standard标准，它是一些前端工程师自定的标准。[JavaScript Standard Style](https://standardjs.com/readme-zhcn.html)

[代码规范](https://guide.aotu.io/docs/js/code.html) 。