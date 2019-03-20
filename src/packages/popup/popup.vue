<template>
  <transition name="k-t-fade">
    <div ref="popup" tabindex="-1" :class="[
        'k-popup',
        layout.indexOf('mask')>-1?'k-popup--mask':'k-popup--transparent'
      ]"
      v-if="show">
      <div v-if="show"
        class="k-popup__wrapper">
        <div class="k-popup__container"
          v-dnd="{handlerClass:'k-popup__header__title'}">
          <k-icon class="k-popup__close"
            name="k-icon-close"
            size="16"
            v-if="layout.indexOf('close')>-1"
            @click.stop="onCancel"
            title="关闭"
            weight></k-icon>
          <slot name="header">
            <div class="k-popup__header"
              v-show="layout.indexOf('header')>-1">
              <div class="k-popup__header__title">
                <b>{{title}}</b>
              </div>
            </div>
          </slot>
          <div class="k-popup__body"
            v-if="layout.indexOf('body')>-1">
            <div class="k-popup__content">
              <slot name="body">
              </slot>
              <slot>
              </slot>
            </div>
          </div>
          <div class="k-popup__footer"
            v-if="layout.indexOf('footer')>-1">
            <div :class="['k-popup__footer__con',{'k-popup__footer__con--line':hasBottomLine}]">
              <slot name="footer">
                <k-button @click="onCancel"
                  :size="buttonSize">{{cancelText}}</k-button>
                <k-button type="primary"
                  @click="onOk"
                  :size="buttonSize">{{okText}}</k-button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
// 有关弹框宽度，可以对插入的body宽度进行设置。
import KButton from "karma-ui/packages/button/button"
import KIcon from "karma-ui/packages/icon/icon"
import dnd from "karma-ui/directives/dnd/bind.js"
export default {
  name: "KPopup",
  components: {
    KButton,
    KIcon
  },
  props: {
    title: {
      type: String,
      default: "确认"
    },
    okText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    show: {
      type: Boolean,
      default: false
    },
    //显示出此组件的哪些部分：头部、body、footer，关闭按钮、遮罩
    //默认全显示
    layout: {
      type: String,
      default: "header,body,footer,close,mask"
    },
    buttonSize: {
      type: String,
      default: "medium"
    },
    hasBottomLine: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onOk() {
      this.$emit("after-ok")
    },
    onCancel() {
      this.$emit("update:show", false)
      this.$emit("after-cancel")
    },
    esc(e) {
      if (e.keyCode == 27) {
        this.show && this.onCancel()
      }
    }
  },
  mounted() {
    document.addEventListener("keyup", this.esc)
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.esc)
  },
  directives: {
    dnd
  },
  watch: {
    show(v) {
      if(v) {
        this.$nextTick().then(()=>{
          this.$refs.popup.focus()
        })
      }else{
        if(this.$refs.popup) {
          this.$refs.popup.blur()
        }
      }
    }
  }
}
</script>
