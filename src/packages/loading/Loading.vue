<template>
  <div :class="[
    'k-loading',
    isFullScreen?'k-loading--fullscreen':'k-loading--default']"
    v-show="isShow"
    :style="{backgroundColor:loadingBgColor,position}">
    <div class="k-loading__content">
      <!-- <loading-icon :style="{color:color}"></loading-icon> -->
      <k-icon name="k-icon-loading" size="20" :style="{color:color}"
        class="k-loading__icon" />
    </div>
    <div v-html="content"
      v-show="content"
      class="k-loading__text"
      :style="{color:color}"></div>
  </div>
</template>
<script>
/**
 * 此组件主要用在数据加载时的loading提示，
 * 加载时，调用Vue.Loading().show();
 * 加载完成后，调用Vue.Loading().hide();
 * 不建议用在其他地方！
 */
import loadingIcon from "./loadingIcon.vue"
import KIcon from 'karma-ui/packages/icon/icon'
export default {
  name: "Loading",
  components: {
    loadingIcon,KIcon
  },
  data() {
    return {
      position: '',
      isShow: false,
      isFullScreen: false,
      content: "",
      //start和end是成对的，
      //show的时候，start加1
      //hide时，end加1，
      //判断start和end是否相等，如果相等就关闭，否则就不关闭
      //为什么这样做？
      //此组件是共用的，属于单例模式。当多个请求同时发送时，
      //数据返回时间不一样，为了让最开始请求开始就出现这个loading状态，
      //并当最后一个请求结束时才最终关闭loading状态，故此设计。
      cp: {
        start: 0,
        end: 0
      },
      loadingBgColor: "",
      color: ""
    }
  },
  methods: {
    setPosition(p) {
      this.position = p
      return this
    },
    setOptions({ text = "", color = "", backgroundColor = "" }) {
      this.setContent(text)
      this.color = color
      this.loadingBgColor = backgroundColor
    },
    setSize(isFull) {
      this.isFullScreen = isFull
      return this
    },
    setContent(con) {
      this.content = con
      return this
    },
    show() {
      this.cp.start = this.cp.start + 1
      this.isShow = true
      return this
    },
    hide(isForce /*是否强制手动关闭*/, delay /*延迟关闭*/) {
      if (isForce) {
        this.cp.start = this.cp.end = 0
        if (delay) {
          setTimeout(() => {
            this.isShow = false
          }, delay)
        } else {
          this.isShow = false
        }
      } else {
        this.cp.end = this.cp.end + 1
        if (this.cp.start <= this.cp.end) {
          if (delay) {
            setTimeout(() => {
              this.isShow = false
            }, delay)
          } else {
            this.isShow = false
          }
        }
      }
      return this
    }
  }
}
</script>