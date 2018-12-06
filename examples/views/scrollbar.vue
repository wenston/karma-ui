<template>
  <div style="padding: 20px;">
    <!-- <k-button @click="scroll('r1')">滚动到1</k-button>
    <k-button @click="scroll('r2')">滚动到2</k-button> -->
    <div class="boxbox">
      <div class="box"
        v-for="n in m"
        :key="n">{{n}}</div>
    </div>
    <k-scrollbar class="scrollbar-wrapper">
      <div class="bb"
        :style="{background:'#ccc',width:w+'px',height: h+'px',border:'5px solid red'}"></div>
    </k-scrollbar>
    <div>
      <k-button @click="onChange">内容变化</k-button>{{m}}
    </div>
    <!-- <div ref="r1">
      滚动到此1
    </div> -->
    <div class="box"
      v-for="n in m"
      :key="n">
      {{n}}
    </div>
    <!-- <div ref="r2">
      滚动到此2
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      m: 3,
      w: 100,
      h: 100
    };
  },
  methods: {
    onChange() {
      this.m = Math.ceil(Math.random() * 90);
      this.w = Math.ceil(Math.random() * 2500);
      this.h = Math.ceil(Math.random() * 2500);
    },
    scroll(ref) {
      this.$emit("scroll-into-view", this.$refs[ref]);
    }
  },
  updated() {
    // this.$nextTick(() => {
    //   this.$emit("view-updated");
    // });
  }
};
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
  display: flex;
  /* width: 1000px; */
  /* flex-direction: column; */
  flex-wrap: wrap;
}
.box {
  flex: none;
  width: 80px;
  height: 80px;
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #f1fd1f;
}
</style>

