<template>
  <div class="layout">
    <h3 class="layout__title">下拉单选</h3>
    <div>
      <div>
        <k-select v-model="curCity"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          clearable>
          <k-option v-for="(v,k) in cities"
            :value="k"
            :key="k"
            :label="v"
            :selected="k==curCity">{{v}}</k-option>
        </k-select>
        {{curCity}}
      </div>
      <div>
        <k-select v-model="curCity1"
          simple
          clearable>
          <k-option v-for="(v,k) in cities"
            :value="k"
            :key="k"
            :label="v"
            :selected="k==curCity1">{{v}}</k-option>
        </k-select>
        {{curCity1}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curCity1: 3,
      curCity:4,
      cities: {
        1:'北京',
        2:'上海',
        3:'广州',
        4:'郑州'
      }
    }
  },
  methods: {
    onChange(obj) {
      console.log(obj)
    },
    onFocus(e) {
      console.log(e)
    },
    onBlur(e) {
      console.log(e)
    }
  },
  mounted() {
    setTimeout(()=>{
      this.curCity = 1
    },1000)
  }
}
</script>

<style>

</style>
