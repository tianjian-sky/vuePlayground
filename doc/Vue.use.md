# Vue.use

> 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
如，element ui 某个组件的注册： 

注册：
```
Vue.use(ElementUI)

```

使用：

```
<template>
  <div class="hello" @click="clickHandler">
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
  </div>
</template>

```

element-ui 源代码： 提供install接口，里面是注册逻辑，调用vue.component进行全局注册

```
/* 55 dialog 组件*/
(function(module, exports, __webpack_require__) {

    "use strict";
    exports.__esModule = true;

    var _component = __webpack_require__(56);

    var _component2 = _interopRequireDefault(_component);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    /* istanbul ignore next */
    _component2.default.install = function (Vue) { // 提供install接口，Vue.use 会调用这个接口
        Vue.component(_component2.default.name, _component2.default);
    };

    exports.default = _component2.default;

/***/ })

```

### 附： Vue.use 源代码：

```
// Vue源码文件路径：src/core/global-api/use.js

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}

```