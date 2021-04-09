<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <span style="display:inline-block"
        ref="el"
        @mouseenter="onenter"
        @mouseleave="onleave">鼠标滑入</span>
      <div v-for="n in 18"
        :key="n">{{n}} </div>
      <div ref="other"
        @click="handleClickOther">点我展示另外的东西</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      b: null,
    };
  },
  methods: {
    handleClickOther() {
      let b = this.$board(this.$refs.other, {
        body: `
          什么和什么士大夫撒地方的
        `,
      });
      b.show();
    },
    onenter() {
      this.b = this.$board(this.$refs.el, {
        bodyClassName: this.css.body,
        alignment: "left",
        body: () => {
          return (
            <div>
              <h3>展示什么好呢</h3>
              <k-button>一个小按钮</k-button>
            </div>
          );
        },
      });
      this.b.show();
    },
    onleave() {
      if (this.b) {
        this.b.hide();
        this.b = null;
      }
    },
  },
};
</script>

<style module="css" lang="postcss">
.body {
  padding: 20px;
  width: 300px;
  overflow: auto;
  background-color: white;
}
</style>
