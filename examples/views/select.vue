<template>
  <div class="layout">
    <h3 class="layout__title">下拉单选</h3>
    <div>
      <div style="height:50px;">
        <k-select v-model="curCity"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          clearable>
          <k-option v-for="(v,k) in cits"
            :value="k"
            :key="k"
            :label="v"
            :selected="k==curCity">{{v}}</k-option>
        </k-select>
        {{curCity}}
      </div>
      <div>
        <k-select v-model="curCity1"
          @change="onChangeC1"
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
      curCity1: '',
      curCity: '',
      cits: {},
      cities: {
        1: '北京',
        2: '上海',
        3: '广州',
        4: '郑州'
      }
    }
  },
  methods: {
    onChange(obj) {
      console.log(obj)
    },
    onChangeC1(obj) {
      console.log('emit:', obj)
    },
    onFocus(e) {
      setTimeout(() => {

        this.cits = { ...this.cities }
      }, 1000)
    },
    onBlur(e) {
      console.log(e)
    }
  },
  mounted() {
    setTimeout(() => {
      this.curCity1 = 1
    }, 1000)
  }
}
</script>

<style>
</style>
