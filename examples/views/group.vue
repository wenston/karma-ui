<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <k-group>
      <k-group-item>
        <k-select></k-select>
      </k-group-item>
      <k-group-item>
        <k-button type="default">按钮</k-button>
      </k-group-item>
      <k-group-item>
        <k-date-picker range />
      </k-group-item>
      <k-group-item>
        <k-input />
      </k-group-item>
      <k-group-item>
        <k-date-picker />
      </k-group-item>
    </k-group>
    <k-group>
      <k-group-item>
        <k-select></k-select>
      </k-group-item>
      <k-group-item>
        <k-button type="default">按钮</k-button>
      </k-group-item>
      <k-group-item>
        <k-date-picker range />
      </k-group-item>
      <k-group-item>
        <k-input />
      </k-group-item>
      <k-group-item>
        <k-date-picker />
      </k-group-item>
    </k-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    toShow() {
      this.show = true
    }
  },
  watch: {}
}
</script>

<style lang="postcss" module="css">
.cont {
  width: 30vw;
  height: 1000px;
  background-color: #ccc;
  overflow-y: auto;
}
</style>
