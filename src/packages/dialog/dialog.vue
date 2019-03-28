<template>
  <k-popup ref="popup"
    v-bind="$props"
    :show.sync="show"
    :hasBottomLine="false"
    @after-cancel="afterCancel"
    @after-ok="afterOk">
    <div class='k-dialog'>
      <k-icon :name="iconName"
        class="k-dialog-icon"
        :color="iconColor"
        :size="iconSize"
        v-if="hasIcon" />
      <template v-if="$slots.default">
        <slot></slot>
      </template>
      <div v-else
        v-html="content"></div>
    </div>
  </k-popup>
</template>

<script>
import KPopup from "karma-ui/packages/popup/popup"
import KIcon from "karma-ui/packages/icon/icon"
export default {
  components: {
    KPopup,
    KIcon
  },
  props: {
    ...KPopup.props,
    content: String,
    hasIcon: {
      type: Boolean,
      default: true
    },
    iconName: {
      type: String,
      default: 'k-icon-question'
    },
    iconColor: String,
    iconSize: [String,Number]
  },
  methods: {
    afterCancel() {
      this.$emit("after-cancel")
    },
    afterOk() {
      this.$emit("after-ok")
    }
  }
}
</script>
