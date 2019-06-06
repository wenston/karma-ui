<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <div>
        <k-select v-model="AuditCode"
          placeholder="全部"
          clearable>
          <k-option label="全部"
            value=""
            :selected="AuditCode===''">全部</k-option>
          <k-option label="待审核"
            :value="0"
            :selected="AuditCode===0">待审核</k-option>
          <k-option label="已审核"
            :value="1"
            :selected="AuditCode===1">已审核</k-option>
        </k-select>
      </div>
      <div>
        区域选择
        <k-area v-model="code"
          :province="province"
          :city="city"
          :county="county"
          :level="2"
          clearable
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
      county,
      AuditCode: ''
    }
  },
  methods: {
    afterArea(area) {
      console.table(area)
    }
  },
  watch: {
    code(c) {
      console.log(c)
    }
  }
}
</script>

<style>
</style>
