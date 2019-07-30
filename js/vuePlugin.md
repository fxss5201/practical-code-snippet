---
title: Vue插件/组件
lang: zh-CN
description: Vue插件/组件
sidebarDepth: 2
meta:
  - name: keywords
    content: Vue, Vue插件/组件
---

## element-ui ##

### 完整引入 ###

```js
// main.js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

`Vue.use(plugin, {})` 用于安装 Vue.js 插件。如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

其中 `Vue.use(ElementUI)` 用于安装 element-ui 组件库，再看 element-ui 的源码

```js
const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  // 循环安装所有组件
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(Loading.directive);

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;

};

export default {
  ...
  install,
  ...
}
```

`Vue.use(ElementUI)` 的时候，会去执行 `install` 方法，并且会在 `Vue.prototype` 上添加 `$loading` /  `$msgbox` / `$alert` / `$confirm` / `$prompt` / `$notify` / `$message`，所以在 Vue 实例中可以直接使用 `this.$loading` / `this.$msgbox` / `this.$alert` / `this.$confirm` / `this.$prompt` / `this.$notify` / `this.$message` 。

`Vue.use(Element, { size: 'small', zIndex: 3000 })` 会在执行  `install` 方法的时候传入 `{ size: 'small', zIndex: 3000 }` 对象，用于配置组件的默认尺寸和弹框的初始 z-index 。

### 按需引入 ###

```js
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

先来看 button 中的 index.js ：

```js
import ElButton from './src/button';

/* istanbul ignore next */
ElButton.install = function(Vue) {
  Vue.component(ElButton.name, ElButton);
};

export default ElButton;
```

按需引入的时候需要自己去安装每个组件，使用 `Vue.use(Button)` 会去执行 button 组件中的 `install` 方法，实际上还是执行 `Vue.component(ElButton.name, ElButton)` 去注册全局组件。

### 自定义主题 ###

Element 的 theme-chalk 使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 Element 的样式变量。新建一个样式文件，例如 `element-variables.scss`，写入以下内容：

```scss
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```

之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 Element 编译好的 CSS 文件）：

```js
import Vue from 'vue'
import Element from 'element-ui'
import './element-variables.scss'

Vue.use(Element)
```

这里主要使用的是 SCSS 的默认变量值 `!default` ，如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。

可以参照 <https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/common/var.scss> 内自定义需要的变量值对应的值， 之后 `@import "~element-ui/packages/theme-chalk/src/index"` ，如果变量被声明赋值了，那就用它声明的值，否则就用 element-ui 中定义的原始值。

### 内置过渡动画 ###

Element 内应用在部分组件的过渡动画，可以直接使用这些动画，可用的有 `el-fade-in-linear` / `el-fade-in` / `el-zoom-in-center` / `el-zoom-in-top` / `el-zoom-in-bottom` ，使用如下：

```html
<!-- 在 transition 的 name 指定不同的动画 -->
<transition name="el-fade-in-linear">
  <div v-show="show" class="transition-box">.el-fade-in-linear</div>
</transition>
```

动画定义源码： <https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/common/transition.scss> 。
