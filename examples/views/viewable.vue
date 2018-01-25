<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div v-viewable="visible">
      判断一个元素是否在可视区
    </div>
    <div :class="css.h">

    </div>
    <div :class="css.h1" v-viewable="{viewable:v1,unviewable:v2}">
      <div v-pin.top.bottom v-html="text">
        
      </div>
    </div>
    <div :class="css.h3">

    </div>
    <h3 class="layout__title">高级用法</h3>
    <div>
      <p>用在<strong>懒加载组件</strong>，比如：当组件（可以给组件一个<code>div</code>，判断这个<code>div</code>是否位于可视区）不在可视区的时候，不加载资源，当页面滚动到可视区的时候，才加载。</p>
    </div>
    <div v-viewable.once="{viewable:loadsomething,delay:1000}" :class="css.lazyload">
      <div v-if="comp===null">loading...</div>
      <component v-else :is="comp"></component>
    </div>

  </div>
</template>

<script>
export default {
  components: {
    mycomp:()=>import('./area.vue')
  },
  data() {
    return {
      text:'',
      comp:null
    }
  },
  methods: {
    loadsomething() {
      this.comp = 'mycomp'
    },
    visible() {
      console.log('可视')
    },
    unvisible() {
      // console.warn('不可视')
    },
    v1() {
      this.text = `
        <span style="color:green">我的父级元素在可视区了</span>
      `
    },
    v2() {
      this.text = `
        <span style="color:red">--我的父级元素没有在可视区！--</span>
      `
    }
  }
}
</script>

<style module="css">
.h {
  height:1000px;
  background-color:#fff
}
.h1 {
  height:500px;
  background-color:gold;
}
.h3 {
  height:1000px;
  background-color: beige;
}
.lazyload {
  min-height:200px;
  background-color:white;
}
</style>
