<template>
  <k-popup 
    v-bind="$props"
    :show.sync="show" 
    @after-cancel="afterCancel"
    @after-ok="afterOk"
  >
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <div v-else v-html="content"></div>
  </k-popup>
</template>

<script>
import KPopup from 'karma-ui/packages/popup/popup'
export default {
  components: {
    KPopup
  },
  props: {...KPopup.props, content: String},
  methods: {
    afterCancel(){
      this.$emit('after-cancel')
    },
    afterOk() {
      this.$emit('after-ok')
    }
  }
}
</script>
