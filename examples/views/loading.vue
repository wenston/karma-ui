<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      
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
    
  },
  mounted () {
    this.$nextTick(()=>{
      this.$loading({
        content:'努力加载加载',
      }).show()
    })
  }
}
</script>
