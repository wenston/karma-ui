<template>
  <div class="layout">
    <h3 class="layout__title">过渡、动画</h3>
    <div>
      <div>
        <k-button @click="onTransition">测试一下</k-button>
      </div>
      <k-transition>
        <div class="p" 
          v-show="show">
          <p>萨嘎撒旦法</p>
          <p>好减肥药金龟换酒快高考</p>
          <p>考虑和困了就睡给付对价</p>
          <p>俄日欧特瑞见好就收</p>
          <p>公是大法官婆好好干</p>
        </div>
      </k-transition>
      <div>
        内容inroadi
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onTransition() {
      this.show = !this.show
    }
  },
  data() {
    return {
      show: false,
    }
  }
}
</script>
<style lang="postcss" scoped>
.p {
  border:1px solid #ddd;
  overflow: hidden;
  padding:20px;
  margin-top: 50px;
  
}
</style>

