<template>
  <k-popup 
    ref="popup"
    v-bind="$props"
    :show.sync="show" 
    :hasBottomLine="false"
    @after-cancel="afterCancel"
    @after-ok="afterOk"
  >
  <div class='k-dialog'>
    <k-icon name="k-icon-question" class="k-dialog-icon" />
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <div v-else v-html="content"></div>
  </div>
  </k-popup>
</template>

<script>
import KPopup from 'karma-ui/packages/popup/popup'
import KIcon from 'karma-ui/packages/icon/icon'
export default {
  components: {
    KPopup,KIcon
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
