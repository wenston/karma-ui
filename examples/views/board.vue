<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <span style="display:inline-block" ref="el" @click="handleClick">(点我)可以动态展示一些东西的$board</span>
      <div v-for="n in 18" :key="n">{{n}} </div>
      <div ref="other" @click="handleClickOther">点我展示另外的东西</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    handleClickOther() {
      let b = this.$board(this.$refs.other,{
        body: `
          什么和什么士大夫撒地方的
        `
      })
      b.show()
    },
    handleClick() {
      let b = this.$board(this.$refs.el,{
        header:'展示一个title',
        body:() => {
          return (
            <div class="body">
              <h3>展示什么好呢</h3>
              <k-button>一个小按钮</k-button>
            </div>
          )
        }
      })
      b.show()
    }
  }
}
</script>

<style scoped>
.body {
  padding: 20px;
  width: 400px;
  overflow: auto;
  background-color: white;
}
</style>
