<template>
<transition name="k-t-fade">
  <div :class="[
    'k-loading',
    isFullScreen?'k-loading--fullscreen':'k-loading--default']"
    v-show="isShow"
    :style="{backgroundColor,position}">
    <div class="k-loading__content">
      <k-icon :name="iconName"
        :size="iconSize"
        :color="iconColor"
        class="k-loading__icon" />
    </div>
    <div v-html="content"
      v-show="content"
      class="k-loading__text"
      :style="{color:color}"></div>
  </div>
</transition>
</template>
<script>
/**
 * 此组件主要用在数据加载时的loading提示，
 * 加载时，调用Vue.Loading().show();
 * 加载完成后，调用Vue.Loading().hide();
 * 不建议用在其他地方！
 */
import KIcon from "karma-ui/packages/icon/icon"
export default {
  name: "Loading",
  components: { KIcon },
  data() {
    return {
      //定位
      position: "",
      //是否铺面父级元素
      isFullScreen: false,
      //内容
      content: "努力加载中...",
      //背景
      backgroundColor: "",
      //字体颜色
      color: "",
      //icon的name
      iconName: 'k-icon-loading',
      //icon的颜色
      iconColor: '',
      //icon的大小
      iconSize: 25,
      //以上参数，都是可以由外部传参设置的。
      isShow: false,
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
    }
  },
  methods: {
    setOptions(opts = {}) {
      for(const k in opts) {
        this[k] = opts[k]
      }
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