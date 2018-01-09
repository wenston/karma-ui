<template>
  <div>
    <h1>karma-ui</h1>
    <div class="box">
      <h3>测试</h3>
      <div class="list">
        <k-button type="primary" size="huge">按钮</k-button>
          <k-button type="warning" size="large">按钮</k-button>
          <k-button type="danger" size="big">按钮</k-button>
          <k-button>默认按钮</k-button>
          <k-button type="success">按钮</k-button>
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
    <div>
      <k-select v-model="curCity"
        clearable>
        <k-option v-for="(v,k) in citys"
          :key="k"
          :value="k"
          :label="v"
          :selected="curCity==k">{{v}}</k-option>
      </k-select>
    </div>
    <div>
      <k-radio v-model="b" value=1 >是</k-radio>
      <k-radio v-model="b" value=0 >否</k-radio>
      <k-icon which="success"></k-icon>
      <k-icon which="arrow" type="up"></k-icon>
    </div>
    <div>
      <k-input-number v-model="buy"
        :min="1"
        :max="20"
        :step="5"></k-input-number><span>{{buy}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text:'撒旦法',
      b:"0",
      curCity:1,
      citys:{
        1:'北京',
        2:'上海',
        3:'广州'
      },
      buy:1,
    }
  }
};
</script>
