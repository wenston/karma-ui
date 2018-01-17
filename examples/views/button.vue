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
        <k-button type="primary" size="huge">huge</k-button>
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
  </div>
</template>

<script>
export default {

}
</script>

<style module="css">

</style>
