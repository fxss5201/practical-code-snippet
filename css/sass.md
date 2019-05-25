---
title: Sass
lang: zh-CN
description: 用于积累Sass中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: Sass, 实用代码段
---

# Sass #

## 清浮动 ##

```scss
@mixin clearfix {
  $selector: &;

  @at-root {
    #{$selector}::before,
    #{$selector}::after {
      display: table;
      content: "";
    }
    #{$selector}::after {
      clear: both;
    }
  }
}

.row {
  @include clearfix;
}
```

## 文字超出一行...显示 ##

```scss
@mixin ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.one-line {
  @include ellipsis;
}
```

## 行内多个相同元素设置间距 ##

```scss
.item {
  & + & {
    margin-left: 10px;
  }
}
```

## 设置`user-select` ##

```scss
@mixin user-select($value) {
  -moz-user-select: $value;
  -webkit-user-select: $value;
  -ms-user-select: $value;
}

.no-user-select {
  @include user-select(none);
}
```