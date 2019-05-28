---
title: vue代码规范
lang: zh-CN
description: 用于积累vue代码规范中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: vue代码规范, 实用代码段
---

# vue 代码规范 #

## [vue 风格指南](https://cn.vuejs.org/v2/style-guide/) ##

vue 代码的书写习惯请严格遵守风格指南。

## vue cli ##

vue cli 创建的项目，选择代码检测时选择 ESLint + Standard config ，减少通过工具生成的代码还需要修改的问题，已有项目暂时不做修改。

Standard标准，它是一些前端工程师自定的标准。[JavaScript Standard Style](https://standardjs.com/readme-zhcn.html)

## vue router ##

1. 无特殊情况时， router 一般采用 `hash` 。
2. `<router-link>` 和 `<a>` 比较：
    1. 无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。
    2. 在 HTML5 history 模式下，`router-link` 会守卫点击事件，让浏览器不再重新加载页面。
    3. 当你在 HTML5 history 模式下使用 `base` 选项之后，所有的 `to` 属性都不需要写 (基路径) 了。
    4. 最新版 `<router-link>` 也支持设置 `target="_blank"`。

3. 导航守卫

    可以使用导航守卫做一些路由切换时的触发事件。

4. 路由元信息

    下面例子展示在全局导航守卫中检查元字段：

    ```javascript
    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next() // 确保一定要调用 next()
      }
    })
    ```

    也可用路由元信息来指定页面 `title` 。

5. 数据获取

    关于数据获取的时间点：暂定全部采用 **导航完成之后获取** ，先完成导航，然后在接下来的组件生命周期钩子中获取数据。

6. 滚动行为

    在 `new VueRouter` 中增加如下配置：

    ```javascript
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    ```

    第三个参数 `savedPositio`n 当且仅当 `popstate` 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

7. [路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD)

    为了提高首页的加载速度，[把组件按组分块](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97) 。

    路由懒加载的时候可以结合 vue 的 [异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6) 处理加载状态。

## vuex ##

1. 考虑到项目中可能会有一些公共变量，这个时候需要 vuex 来维护这些全局的公共变量。
2. 获取 vuex 的 State 变量全部采用 `mapState` 辅助函数

    ```javascript
    // 在单独构建的版本中辅助函数为 Vuex.mapState
    import { mapState } from 'vuex'

    export default {
      // ...
      computed: {
        ...mapState({
          // ...
        })
      }
    }
    ```

    虽然也可以通过 `this.$store.state.name` 获取，但这样获取的一般页面中不清楚是否有使用 vuex 的 State 变量，导致后期代码比较难维护。

    获取 Getter 时也请使用 `mapGetters` 辅助函数

    ```javascript
    import { mapGetters } from 'vuex'

    export default {
      // ...
      computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
          'doneTodosCount',
          'anotherGetter',
          // ...
        ])
      }
    }
    ```

3. Mutation
    1. 提交载荷（Payload）：
        1. 可以向 `store.commit` 传入额外的参数，即 mutation 的 载荷（payload）
            1. 如果参数是原始值（即：Undefined、Null、Boolean、Number 和 String 类型）

                ```javascript
                // ...
                mutations: {
                  increment (state, val) {
                    state.count += val
                  }
                }
                ```

                ```javascript
                store.commit('increment', 10)
                ```

            2. 如果参数是引用类型（即：Object 类型）

                ```javascript
                // ...
                mutations: {
                  increment (state, obj) {
                    state.count += obj.amount
                  }
                }
                ```

                ```javascript
                store.commit('increment', {
                  amount: 10
                })
                ```

        2. 推荐使用上述的方法提交载荷（不推荐对象风格的提交方式）。
    2. 需遵守 Vue 的响应规则
        1. 提前在你的 store 中初始化好所有所需属性
        2. 非大型项目**不**[使用常量替代 Mutation 事件类型](https://vuex.vuejs.org/zh/guide/mutations.html#%E4%BD%BF%E7%94%A8%E5%B8%B8%E9%87%8F%E6%9B%BF%E4%BB%A3-mutation-%E4%BA%8B%E4%BB%B6%E7%B1%BB%E5%9E%8B)
    3. 必须是同步函数
    4. 在组件中提交 Mutation
        尽可能的使用 `mapMutations` 辅助函数，有助于别人一眼看出组件中是否有修改 vuex 的 State 变量。

        ```javascript
        import { mapMutations } from 'vuex'

        export default {
          // ...
          methods: {
            ...mapMutations([
              'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

              // `mapMutations` 也支持载荷：
              'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
            ]),
            ...mapMutations({
              add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
            })
          }
        }
        ```

4. Action

    Action 类似于 mutation，不同在于：
    * Action 提交的是 mutation，而不是直接变更状态。
    * Action 可以包含任意异步操作。

    1. 使用ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码

        ```javascript
        actions: {
          increment ({ commit, state }, obj) {
            commit('increment')
          }
        }
        ```

    2. Actions 推荐使用载荷方式进行分发。
    3. 在组件中分发 Action
        尽可能的使用 `mapActions` 辅助函数，有助于别人一眼看出组件中是否有使用 Action。

        ```javascript
        import { mapActions } from 'vuex'

        export default {
          // ...
          methods: {
            ...mapActions([
              'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

              // `mapActions` 也支持载荷：
              'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
            ]),
            ...mapActions({
              add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
            })
          }
        }
        ```

    4. 组合 Action
        `action` 的处理函数返回的 Promise ，所以我们可以使用 `.then/.catch/.finally` 等Promise的方法。

        也可以利用 `async / await`:

        ```javascript
        // 假设 getData() 和 getOtherData() 返回的是 Promise

        actions: {
          async actionA ({ commit }) {
            commit('gotData', await getData())
          },
          async actionB ({ dispatch, commit }) {
            await dispatch('actionA') // 等待 actionA 完成
            commit('gotOtherData', await getOtherData())
          }
        }
        ```

5. Module

    非大型项目不推荐使用。

## 数据请求 ##

数据请求方面暂定全部使用 [axios](https://github.com/axios/axios) ，尽可能使用[interceptors](https://github.com/axios/axios#interceptors) 。

## Storage存储操作 ##

1. 操作本地存储，如果数据量比较多的时候，推荐使用 [localforage](https://localforage.docschina.org/) ,localforage 使用本地存储方式的优先级：IndexedDB / WebSQL / localStorage 。

## 其他 ##

1. css预处理 与项目开发选择的 **主UI库** 的 css预处理器 保持一致，可以方便自定义一些样式。
2. 除了已有项目，禁止在 **生产环境中** 采用 `<script>` 引入 vue 的开发模式。
3. 尽可能封装组件，防止代码复制。
4. 代码格式化。