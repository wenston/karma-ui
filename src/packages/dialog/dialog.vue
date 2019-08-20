

<script>
// <template>
//   <k-popup ref="popup"
//     v-bind="$props"
//     :show.sync="show"
//     @after-cancel="afterCancel"
//     @after-ok="afterOk">
//     <div class='k-dialog'>
//       <k-icon :name="iconName"
//         class="k-dialog-icon"
//         :color="iconColor"
//         :size="iconSize"
//         v-if="hasIcon" />
//       <template v-if="$slots.default">
//         <slot></slot>
//       </template>
//       <div v-else>{{content}}</div>
//     </div>
//   </k-popup>
// </template>
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
      default: "k-icon-question"
    },
    iconColor: String,
    iconSize: [String, Number]
  },
  methods: {
    afterCancel() {
      this.$emit("after-cancel")
    },
    afterOk() {
      this.$emit("after-ok")
    }
  },
  render() {
    const popupProps = {
      ref: "popup",
      props: {
        ...this.$props,
        show: this.show
      },
      on: {
        "update:show": v => {
          this.show = v
        },
        "after-cancel": this.afterCancel,
        "after-ok": this.afterOk
      }
    }
    return (
      <k-popup {...popupProps}>
        <div class="k-dialog">
          {this.hasIcon ? (
            <k-icon
              name={this.iconName}
              class="k-dialog-icon"
              color={this.iconColor}
              size={this.iconSize}
            />
          ) : null}
          {this.$slots.default || this.content}
        </div>
      </k-popup>
    )
  }
}
</script>
