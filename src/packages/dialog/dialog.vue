

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
      default: false
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
        "after-leave": e=>{
          if(e) {
            this.afterOk()
          }else{
            this.afterCancel()
          }
        },
        "after-ok": () => {
          this.show = false
        }
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
