<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <div>
        区域选择
        <k-area v-model="code"
          :province="province"
          :city="city"
          :county="county"
          @update:area="afterArea"></k-area>
        <div>
          {{area}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { province, city, county } from "./areaData.js"
// console.log(city,county)
export default {
  data() {
    return {
      code: "621221",
      area: null,
      province,
      city,
      county
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
