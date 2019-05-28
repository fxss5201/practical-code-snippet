---
title: css代码规范
lang: zh-CN
description: 用于积累css 及 css预处理器代码规范中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: css 及 css预处理器代码规范, 实用代码段
---

# css 及 css 预处理器代码规范 #

css及预处理器（css预处理less/sass/stylus都可以用，但在一个项目中只能用一种）

## css ##

1. [css2.1](http://www.ayqy.net/doc/css2-1/cover.html)，拓展性阅读，加深对某些知识点的理解
2. [css 规则](https://guide.aotu.io/docs/css/code.html) 重点且需遵守已总结如下：
    1. 禁止过度任意的简写。
    2. 代码格式化：推荐使用展开格式，但不排除有些项目使用的是紧凑格式。

        ```css
        /* 展开格式 */
        .row {
          display: block;
          height: 50px;
        }
        /* 紧凑格式 */
        .row { display: block;height: 50px; }
        ```

    3. 代码大小写: 样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写。
    4. 选择器
        1. 尽量少用通用选择器 `*`
        2. 在所有选择器中，优先使用 class 选择器，不排除已有的项目中使用 id 选择器。
    5. 代码缩进：2个空格或者4个空格都可以，一个项目保持一致即可。
    6. 代码易读性： 左括号与类名之间一个空格，冒号与属性值之间一个空格。

        ```css
        /* 推荐 */
        .row {
          display: block;
          height: 50px;
        }
        /* 不推荐 */
        .row{
          display:block;
          height:50px;
        }
        ```

    7. 属性书写顺序，建议遵循以下顺序：
        1. 布局定位属性：`display / position / float / clear / visibility / overflow`;
        2. 自身属性：`width / height / margin / padding / border / background`;
        3. 文本属性：`color / font / text-decoration / text-align / vertical-align / white- space / break-word`;
        4. 其他属性（CSS3）：`content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …`

        **注意**：这点主要是保证相同的属性样式尽量定义在一起。
    8. CSS3浏览器私有前缀写法：私有前缀在前，标准语法在后

        ```css
        .row {
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          -o-border-radius: 10px;
          -ms-border-radius: 10px;
          border-radius: 10px;
        }
        ```

    其他的暂时不做过多限制，但是要有一套自己遵守的规范，前后代码看起来一致。
3. [移动端常用私有属性](https://guide.aotu.io/docs/css/webkit.html) 移动端的一些优化，常用属性：
    1. `-webkit-touch-callout`: 当你触摸并按住触摸目标时候，禁止或显示系统默认菜单。在iOS上，当你触摸并按住触摸的目标，比如一个链接，Safari浏览器将显示链接有关的系统默认菜单，这个属性可以让你禁用系统默认菜单。
    2. `-webkit-tap-highlight-color`: 在 iOS Safari 上，当用户点击链接或具有 JavaScript 可点击脚本的元素，系统会为这些被点击元素加上一个默认的透明色值，该属性可以覆盖该透明值。
    3. `-webkit-line-clamp`: 限制在一个块元素显示的文本的行数。
    4. `-webkit-appearance`: 改变按钮和其他控件的外观，使其类似于原生控件。
    5. `-webkit-user-select`: 定义用户是否能选中元素内容。
    6. `-webkit-sticky`: 移动端的吸顶效果。

## less ##

1. [less 文档](http://www.bootcss.com/p/lesscss/)

## sass ##

1. [sass 文档](https://www.sass.hk/guide/)
2. vue cli 创建项目的时候 sass 选择 Sass/SCSS(with node-sass)
3. [sass 规范](https://guide.aotu.io/docs/css/sass.html)

## stylus ##

1. [stylus 文档](https://www.zhangxinxu.com/jq/stylus/)

**注意**：避免不必要的嵌套。这是因为虽然你可以使用嵌套，但是并不意味着应该使用嵌套。只有在必须将样式限制在父元素内（也就是后代选择器），并且存在多个需要嵌套的元素时才使用嵌套。
