<template>
<div 
  :class="['k-loading',isFullScreen?'k-loading--fullscreen':'k-loading--default']" 
  v-if="isShow">
  <div class="k-loading__content">
    <div class="k-loading__content__con">
      <div class="k-loading__content__con__roll">
        <!-- <loading-icon></loading-icon> -->
        <i class="k-icon-spinner k-loading__icon"></i>
      </div>
      <div v-html="content" class="k-loading__text"></div>
    </div>
  </div>
</div>
</template>
<script>
/**
 * 此组件主要用在数据加载时的loading提示，
 * 加载时，调用Vue.zLoading().show();
 * 加载完成后，调用Vue.zLoading().hide();
 * 不建议用在其他地方！
 */
import loadingIcon from './loadingIcon.vue';
export default {
  name: "Loading",
  components: {
    loadingIcon
  },
  data() {
    return {
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
        start:0,
        end:0
      }
    };
  },
  methods: {
    setSize(isFull) {
      this.isFullScreen = isFull;
      return this;
    },
    setContent(con) {
      this.content = con;
      return this;
    },
    show() {
      this.cp.start = this.cp.start + 1;
      this.isShow = true;
      return this;
    },
    hide(isForce/*是否强制手动关闭*/,delay/*延迟关闭*/) {
      if(isForce) {
        this.cp.start = this.cp.end = 0;
        if(delay) {
          setTimeout(() => {
            this.isShow = false
          }, delay)
        }else{
          this.isShow = false
        }
      }else{
        this.cp.end = this.cp.end + 1;
        if(this.cp.start <= this.cp.end) {
          if(delay) {
            setTimeout(() => {
              this.isShow = false
            }, delay)
          }else{
            this.isShow = false
          }
        }
      }
      return this;
    }
  }
};
</script>