<template>
  <div>
    <div>
      <h1 v-pin:0="{backgroundColor:'#ccc',boxSahdow:'0 3px 5px rgba(0,0,0,.3)'}">karma-ui</h1>
    </div>
    <div class="box" v-dnd="{handlerClass:'handle'}">
      <h3 class="handle">测试</h3>
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
      <k-select v-model="curCity1"
        clearable>
        <k-option v-for="(v,k) in citys"
          :key="k"
          :value="k"
          :label="v"
          :selected="curCity1==k">{{v}}</k-option>
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
        :min="4"
        :max="21"
        :step="5"></k-input-number><span>{{buy}}</span>
    </div>
    <div>
      <k-checkbox v-model="bb"
        text="嗯嗯"></k-checkbox>{{bb}}
    </div>
    <div>
      <k-button @click="show=!show">弹出框</k-button>
      <k-area v-model="areaCode"></k-area>
    </div>
    <k-popup :show.sync="show"></k-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:false,
      text:'撒旦法',
      b:"0",
      bb:true,
      curCity:1,
      curCity1:2,
      areaCode:'410102',
      citys:{
        1:'北京',
        2:'上海',
        3:'广州'
      },
      buy:3,
    }
  },
  mounted () {
    this.$nextTick(()=>{
      this.$tips({
        type:'error'
      }).hide(1500)
    })
  }
};
</script>
