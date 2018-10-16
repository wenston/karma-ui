<template>
<div>
  <k-scrollbar class="scrollbar-wrapper">
    <!-- <div class="boxbox">
      <div class="box" v-for="n in m"
      :key="n"
      >{{n}}</div>
    </div> -->
    <div class="bb" :style="{background:'#ccc',width:w+'px',height: h+'px',border:'5px solid red'}"></div>
  </k-scrollbar>
  <div>
    <k-button @click="onChange">内容变化</k-button>{{m}}
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      m: 3,
      w: 100,
      h: 100,
    }
  },
  methods: {
    onChange() {
      this.m = Math.ceil(Math.random()*30)
      this.w = Math.ceil(Math.random()*2500)
      this.h = Math.ceil(Math.random()*2500)
    }
  },
}
</script>
<style lang="postcss" scoped>
.bb {
  margin: 20px;
}
.scrollbar-wrapper {
  /* max-height: 500px; */
  /* min-height: 300px; */
  height: 50vh;
  border: 1px solid gold;
  width: 50%;
}
.boxbox {
  /* display: flex; */
  width: 1000px;
  /* flex-direction: column; */
}
.box {
    flex: none;
    width: 80px;
    height: 80px;
    margin-top: 20px;
    margin-right: 20px;
    background-color: #f1fd1f;
  
}
</style>

