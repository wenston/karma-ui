<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <div>
        <k-input v-model="greeting"
          placeholder="输入问候语"></k-input>
        <div>
          你输入的问候语是：{{greeting}}
        </div>
      </div>
    </div>
    <h3 class="layout__title">输入验证</h3>
    <div>
      <div>
        <k-input v-model="money1"
          :validate="{
            type:'currency>0',
            useOldValue:true,
            max:323,
            min:10
          }"></k-input>
        <div>
          输入的金额：{{money1}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting:'',
      money1:''
    }
  }
}
</script>

<style>

</style>