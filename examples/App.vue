<template>
  <div>
    <div>
      <h1>karma-ui</h1>
    </div>
    <div>
      <k-carousel indicator-position="center">
        <k-carousel-item v-for="n in 6"
          class="carouseltest"
          :key="n">
          <h3>{{n}}</h3>
        </k-carousel-item>
      </k-carousel>
    </div>
    <div class="box" v-dnd="{handlerClass:'handle'}">
      <h3 class="handle">测试</h3>
      <div class="list">
        <k-button type="primary" size="huge" loading>按钮</k-button>
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
      <k-icon which="exclamation"
        ></k-icon>
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
    <div>
      <div v-pin.bottom="{backgroundColor:'#ccc',boxSahdow:'0 3px 5px rgba(0,0,0,.3)'}">
        这是要吸顶的
      </div>
    </div>
    <div>
      <div v-for="n in 70"
        :key="n">{{Math.floor(Math.random()*n*100)}}</div>
    </div>
    <k-popup :show.sync="show"></k-popup>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      text: "撒旦法",
      b: "0",
      bb: true,
      curCity: 1,
      curCity1: 2,
      areaCode: "410102",
      citys: {
        1: "北京",
        2: "上海",
        3: "广州"
      },
      buy: 3
    };
  },
  mounted() {
    this.$loading().show();
  }
};
</script>
<style>
* {
  padding:0;
  margin: 0;
}
h3 {
  margin:0;
}
.carouseltest {
  height: 300px;
  line-height: 300px;
  font-size: 50px;

}
  .carouseltest:nth-child(2n-1) {
    background-color: #444;
  }
  .carouseltest:nth-child(2n) {
    background-color: #eee;
  }
</style>

