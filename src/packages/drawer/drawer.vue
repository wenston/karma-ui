<template>
  <transition :duration="{enter:300,leave:300}"
    name="k-transition-drawer"
    @before-leave="beforeLeave"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div v-show="visible"
      v-esc="close"
      :class="[
        'k-drawer',
        {
          'k-drawer-center':direction.toLowerCase()==='center',
          'k-drawer-no-mask': !hasMask
        }]"
      @click="close">
      <div ref="cont"
        @click.stop>
        <k-icon class="k-drawer-close"
          name="k-icon-close"
          @click.stop="close"
          v-if="hasCloseBtn"></k-icon>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import esc from "karma-ui/util/esc.js"
export default {
  name: "KDrawer",
  props: {
    show: Boolean,
    hasCloseBtn: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: "bottom"
    },
    allowBodyScroll: {
      type: Boolean,
      default: true
    },
    hasMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: this.show
    }
  },
  methods: {
    beforeEnter() {
      if (this.allowBodyScroll) {
        document.body.classList.add("k-overflow-hidden")
      }
      this.$refs.cont.classList.add("k-drawer-" + this.direction)
    },
    beforeLeave() {
      this.$refs.cont.classList.add("k-drawer-" + this.direction + "r")
    },
    afterEnter() {},
    afterLeave() {
      setTimeout(() => {
        if (this.allowBodyScroll) {
          document.body.classList.remove("k-overflow-hidden")
        }

        this.$refs.cont.classList.remove("k-drawer-" + this.direction + "r")
      })
    },
    close() {
      this.visible = false
      this.$emit("after-close")
    }
  },
  watch: {
    show(v, oldV) {
      this.visible = v
    },
    visible(v, oldV) {
      this.$emit("update:show", v)
    }
  },
  directives: {
    esc
  }
}
</script>