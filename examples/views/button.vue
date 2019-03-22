<template>
  <div class="layout">
    <h3 class="layout__title">基础用法</h3>
    <div>
      <k-button>默认</k-button>
    </div>
    <div class="javascript" v-pre>
      <pre>&lt;k-button&gt;默认&lt;/k-button&gt;</pre>
    </div>
    <h3 class="layout__title">尺寸、类型</h3>
    <div>
      <div>
        <k-button type="primary" size="huge" capsule>huge</k-button>
        <k-button type="danger" size="large">large</k-button>
        <k-button type="warning" size="big">big</k-button>
        <k-button type="default" size="medium">默认</k-button>
        <k-button type="warning" size="small">small</k-button>
        <k-button type="success" size="mini">mini</k-button>
      </div>
      <div class="javascript" v-pre>
        <pre>&lt;k-button type="primary" size="huge"&gt;huge&lt;/k-button&gt;
&lt;k-button type="danger" size="large"&gt;large&lt;/k-button&gt;
&lt;k-button type="warning" size="big"&gt;big&lt;/k-button&gt;
&lt;k-button type="default" size="medium"&gt;默认&lt;/k-button&gt;
&lt;k-button type="warning" size="small"&gt;small&lt;/k-button&gt;
&lt;k-button type="success" size="mini"&gt;mini&lt;/k-button&gt;</pre>
      </div>
    </div>
    <h3 class="layout__title">改变标签类型</h3>
    <div>
      <p>
      默认的标签类型是<code>button</code>，可以根据需要随意改变，比如改变为具有<code>href</code>的<code>a</code>标签：
      </p>
      <div>
        <k-button tag="a" href="#/input" type="primary">去input组件看看</k-button>
        <div class="javascript" v-pre>
          <pre>&lt;k-button tag="a" href="#/input" type="primary"&gt;去input组件看看&lt;/k-button&gt;</pre>
        </div>
        <div>
          提示：只需要加上<code>tag="a"</code>来改变其元素类型即可。如果想要其他类型的标签，就写元素名<code>tag="你想要的元素类型"</code>
        </div>
      </div>
    </div>
    <h3 class="layout__title">有loading图标的按钮</h3>
    <div>
      <p><code>k-button</code>组件提供了一种loading样式，loading时，默认不可点击</p>
      <k-button type="primary" loading>加载中... </k-button>
      <div class="javascript" v-pre>
        <pre>&lt;k-button type="primary" loading&gt;加载中... &lt;/k-button&gt;</pre>
      </div>
      <div>
        <k-button type="warning" size="huge" loading>加载中... </k-button>
        <k-button type="danger" size="large" loading>加载中... </k-button>
        <k-button size="big" loading>加载中... </k-button>
        <k-button type="success" size="small" loading>加载中... </k-button>
        <k-button type="primary" size="mini" loading>加载中... </k-button>
      </div>
    </div>
    <h3 class="layout__title">disabled 不可用</h3>
    <div>
      <p><code>disabled</code>时，按钮组件上绑定事件将不可用</p>
      <k-button disabled>默认样式的不可用</k-button>
      <k-button type="primary" disabled>不可用</k-button>
      <k-button type="warning" disabled>不可用</k-button>
      <div class="javascript" v-pre>
        <pre>&lt;k-button disabled&gt;默认样式的不可用&lt;/k-button&gt;</pre>
      </div>
    </div>
    <h3 class="layout__title">其他用法？</h3>
    <div>
      <div>
        <code>k-button</code>提供了一个默认slot，使用时，可以根据需要插入内容。
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style module="css">

</style>
