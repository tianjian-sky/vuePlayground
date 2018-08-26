# 插槽
[参考链接](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)


### 1. 插槽作用域
```javascript
<navigation-link url="/profile">
  Logged in as {{ user.name }}
</navigation-link>
```
> 该插槽可以访问跟这个模板的其它地方相同的实例属性 (也就是说“作用域”是相同的)。但这个插槽不能访问 <navigation-link> 的作用域。例如尝试访问 url 是不会工作的。牢记一条准则：
父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译


### 2.作用域插槽

> 使得定义在父组件中的slot元素可以访问到子组件的数据

#### parent component:
``` javascript
<slotTest>
  <p slot-scope="slotProp"   slot="scopeSlot">
      <span style="color:red;">SCOPED_SLOT:hello from parent</span><br>
      <span>{{ slotProp.text }}</span>
  </p>
</slotTest>
```
#### child component:
```javascript
  <div class="child">
      <slot text="hello from child" name="scopeSlot"></slot>
  </div>
```
