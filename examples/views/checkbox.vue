<template>
  <div class="layout">
    <h3 class="layout__title">绑定单个布尔值</h3>
    <div>
      <div>
        买衣服送袜子
        <k-checkbox v-model="b"></k-checkbox>
        {{b}}
        <div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      b:true
    }
  }
}
</script>

<style>

</style>
