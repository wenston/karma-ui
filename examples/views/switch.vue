<template>
  <div class="layout">
    <h3 class="layout__title">开关</h3>
    <h4 class="layout__title">用法</h4>
    <div>
      <div style="height: 50px">

      <k-switch :size="size" v-model="value" @change="change" />
      </div>
      <div>
        <k-button @click="handleClick">大小变化</k-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      size: "mini",
      i: 0,
      value: false,
    }
  },
  computed: {
    dic() {
      return ["mini", "small", "medium", "big", "large", "huge"]
    }
  },
  methods: {
    change(e) {
      console.log('change:',e)
    },
    handleClick() {
      this.i += 1
      if(this.i>5) {
        this.i = 0
      }
      this.size = this.dic[this.i]
    }
  },
  watch: {
    value(v) {
      console.log(v)
    }
  },
  mounted() {
    
  }
}
</script>
