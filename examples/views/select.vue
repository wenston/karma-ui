<template>
  <div class="layout">
    <h3 class="layout__title">绑定单个布尔值</h3>
    <div>
      <div>
        <k-select v-model="curCity"
          clearable>
          <k-option v-for="(v,k) in cities"
            :value="k"
            :key="k"
            :label="v"
            :selected="k==curCity">{{v}}</k-option>
        </k-select>
        {{curCity}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curCity:4,
      cities: {
        1:'北京',
        2:'上海',
        3:'广州',
        4:'郑州'
      }
    }
  }
}
</script>

<style>

</style>
