<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <div>
        区域选择
        <k-area v-model="code" @update:area="afterArea"></k-area>
        <div>
          {{area}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code:'621221',
      area:null
    }
  },
  methods: {
    afterArea(area) {
      this.area = area
    }
  }
}
</script>

<style>

</style>
