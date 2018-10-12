<template>
<div>
  <k-scrollbar class="scrollbar-wrapper">
    <div v-for="n in m"
      :key="n">
      这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容{{n}}
    </div>
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
      m: 3
    }
  },
  methods: {
    onChange() {
      this.m = Math.ceil(Math.random()*50)
    }
  },
}
</script>
<style lang="postcss" scoped>
.scrollbar-wrapper {
  max-height: 500px;
  min-height: 300px;
  border: 1px solid gold;
}
</style>

