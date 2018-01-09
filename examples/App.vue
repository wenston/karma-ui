<template>
  <div>
    <h1>karma-ui</h1>
    <div class="box">
      <h3>测试</h3>
      <div class="list">
        <k-button type="primary" size="huge">按钮</k-button>
          <k-button type="warning" size="large">按钮</k-button>
          <k-button type="danger" size="big">按钮</k-button>
      </div>
    </div>
    <div>
      <k-input placeholder="请输入" 
        v-model="text"
        clearable></k-input>
      <k-input size="huge">
      </k-input>
    </div>
    <div>
      <k-input block>
        <div slot="append">x</div>
        <div slot="prepend">y</div>
      </k-input>
    </div>
    <div>
      <k-input tag="textarea"></k-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text:'撒旦法'
    }
  }
};
</script>
