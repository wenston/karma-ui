<script>
// 有关弹框宽度，可以对插入的body宽度进行设置。
import KButton from "karma-ui/packages/button/button"
import KIcon from "karma-ui/packages/icon/icon"
import dnd from "karma-ui/directives/dnd/bind.js"
export default {
  name: "KPopup",
  components: {
    KButton,
    KIcon,
  },
  props: {
    bind: {
      type: String,
      default: "v-if",
    },
    title: {
      type: String,
      default: "确认",
    },
    okText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    show: {
      type: Boolean,
      default: false,
    },
    //显示出此组件的哪些部分：头部、body、footer，关闭按钮、遮罩
    //默认全显示
    layout: {
      type: String,
      default: "header,body,footer,close,mask",
    },
    buttonSize: {
      type: String,
      default: "medium",
    },
    hasBottomLine: {
      type: Boolean,
      default: true,
    },
    allowBodyScroll: {
      type: Boolean,
      default: false,
    },
    bodyStyle: {
      type: Object,
      default: () => ({}),
    },
    disabledOk: Boolean,
    okType: {
      type: String,
      default: "primary",
    },
    stopPropagation: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOk: false,
    }
  },
  methods: {
    beforeEnter() {
      this.isOk = false
      const container = this.$refs.container
      container.classList.add("k-popup-container--before-enter")
    },
    enter() {
      setTimeout(() => {
        const container = this.$refs.container
        container.classList.add("k-popup-container--enter")
      })
      if (!this.allowBodyScroll) {
        document.body.classList.add("k-overflow-hidden")
      }
      this.$nextTick().then(() => {
        this.$refs.popup.focus()
      })
    },
    afterEnter() {
      const container = this.$refs.container
      container.classList.remove("k-popup-container--before-enter")
      container.classList.remove("k-popup-container--enter")
      this.$emit("after-enter")
    },
    leave() {
      const container = this.$refs.container
      container.classList.add("k-popup-container--before-enter")
    },
    afterLeave() {
      const container = this.$refs.container
      if (container) {
        container.classList.remove("k-popup-container--before-enter")
      }
      if (!this.allowBodyScroll) {
        document.body.classList.remove("k-overflow-hidden")
      }
      if (this.$refs.popup) {
        this.$refs.popup.blur()
      }
      this.$emit("after-leave", this.isOk)
    },
    onOk() {
      if (this.disabledOk) {
        return
      }
      this.isOk = true
      this.$emit("after-ok")
    },
    onCancel() {
      this.isOk = false
      this.$emit("update:show", false)
      this.$emit("after-cancel")
    },
    esc(e) {
      if (e.keyCode == 27) {
        this.show && this.onCancel()
      }
    },
    r_close_icon(has) {
      return has ? (
        <k-icon
          class="k-popup__close"
          name="k-icon-close"
          size="14"
          title="关闭"
          weight
          onMousedown={(e) => {
            e.stopPropagation()
          }}
          onClick={(e) => {
            this.onCancel(e)
            e.stopPropagation()
          }}
        />
      ) : null
    },
    r_header(has) {
      if (has) {
        return (
          this.$slots.header || (
            <div class="k-popup__header">
              <div class="k-popup__header__title">
                <b
                  onMousedown={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {this.title}
                </b>
              </div>
            </div>
          )
        )
      }
    },
    r_body(has) {
      if (has) {
        return (
          <div
            class="k-popup__body"
            onMousedown={(e) => {
              e.stopPropagation()
            }}
          >
            <div class="k-popup__content">
              <div class="k-popup__content__main" style={this.bodyStyle}>
                {this.$slots.body}
                {this.$slots.default}
              </div>
            </div>
          </div>
        )
      }
    },
    r_footer(has) {
      if (has) {
        const p = {
          class: "k-popup__footer",
        }
        return (
          <div {...p}>
            <div
              class={[
                "k-popup__footer__con",
                { "k-popup__footer__con--line": this.hasBottomLine },
              ]}
            >
              <div class="k-popup__footer__between">
                <div
                  onMousedown={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {this.$slots["footer-prepend"]}
                </div>
                <div>
                  {this.$slots.footer || [
                    <k-button
                      onMousedown={(e) => {
                        e.stopPropagation()
                      }}
                      onClick={this.onCancel}
                      size={this.buttonSize}
                    >
                      {this.cancelText}
                    </k-button>,
                    <k-button
                      onMousedown={(e) => {
                        e.stopPropagation()
                      }}
                      disabled={this.disabledOk}
                      type={this.okType}
                      onClick={this.onOk}
                      size={this.buttonSize}
                    >
                      {this.okText}
                    </k-button>,
                  ]}
                </div>
              </div>
            </div>
          </div>
        )
      }
    },
    r_wrapper() {
      const { layout } = this
      const hasHeader = layout.indexOf("header") > -1
      const container_p = {
        class: "k-popup__container",
        ref: "container",
      }
      if (hasHeader) {
        container_p.directives = [
          {
            name: "dnd",
            // value: {
            //   handlerClass: "k-popup__header__title"
            // }
          },
        ]
      }
      return (
        <div class="k-popup__wrapper">
          <div {...container_p}>
            {this.r_close_icon(layout.indexOf("close") > -1)}
            {this.r_header(hasHeader)}
            {this.r_body(layout.indexOf("body") > -1)}
            {this.r_footer(layout.indexOf("footer") > -1)}
          </div>
        </div>
      )
    },
    r_popup() {
      const p = {
        ref: "popup",
        attrs: {
          tabindex: -1,
        },
        class: [
          "k-popup",
          this.layout.indexOf("mask") > -1
            ? "k-popup--mask"
            : "k-popup--transparent",
        ],
        on: {
          click: (e) => {
            if (this.stopPropagation) {
              e.stopPropagation()
            }
          },
        },
      }
      if (this.bind === "v-show") {
        p.directives = [
          {
            name: "show",
            value: this.show,
          },
        ]
        return <div {...p}>{this.r_wrapper()}</div>
      } else if (this.bind === "v-if") {
        if (this.show) {
          return <div {...p}>{this.r_wrapper()}</div>
        }
      }
    },
  },
  render() {
    return (
      <transition
        name="k-t-fade"
        onBefore-enter={this.beforeEnter}
        onEnter={this.enter}
        onAfter-enter={this.afterEnter}
        onLeave={this.leave}
        onAfter-leave={this.afterLeave}
      >
        {this.r_popup()}
      </transition>
    )
  },
  mounted() {
    document.addEventListener("keyup", this.esc)
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.esc)
  },
  directives: {
    dnd,
  },
}
</script>
