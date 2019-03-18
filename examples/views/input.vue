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
    <div>
      <k-input placeholder="简易型" simple></k-input>
    </div>
    <h3 class="layout__title">可清除文本的输入框</h3>
    <div>
      <div>
        <k-input v-model="clear" clearable capsule></k-input>
      </div>
    </div>
    <h3 class="layout__title">输入验证</h3>
    <div>
      目前有验证金额(含小数)/身份证/正整数
    </div>
    <h4 class="layout__title">金额验证</h4>
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
      money1:'',
      clear:'可以清除的'
    }
  }
}
</script>

<style>

</style>