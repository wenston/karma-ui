
<script>
// <template>
//   <div class="k-scrollbar"
//     @wheel="onWheel">
//     <scrollbar-y :wrapper-height="wrapperHeight"
//       :content-height="contentHeight"
//       ref="y"
//       @dragging="onDragging"></scrollbar-y>
//     <scrollbar-x :wrapper-width="wrapperWidth"
//       :content-width="contentWidth"
//       ref="x"
//       @dragging="onDraggingX"></scrollbar-x>
//     <div class="k-scrollbar__content"
//       :class="{'k-scrollbar-transition':!dragging}"
//       ref="content"
//       :style="{marginTop:top*-1+'px',marginLeft:left*-1+'px'}">
//       <slot></slot>
//     </div>
//   </div>
// </template>
/* NOTE: 1.（与本组件无关）当prop属性想要sync的时候，必须在组件传入此参数如
  /* <my-comp :allow="allow.sync"></my-comp>，否则不起作用。
   * NOTE: 2.当scrollbar组件内是router-view时，页面变化将不会触发到scrollbar组件
   * 此时需要手动，做法是：页面的updated钩子中写个回调，然后在router-view组件上
   * 监听此自定义函数，然后再调用scrollbar的reset方法。另外：如果页面很多，那
   * 是不是每个页面都要写回调？不用！这种情况下，可以再写一个组件，这个组件里可以只有
   * updated钩子。
   * NOTE: 3.此组件使用时，对于此组件的根节点不要有margin/padding/border。否则会
   * 造成部分内容被隐藏看不到。
   * NOTE: 4.此组件能不用就不用，使用此组件时，
   *         ① 键盘中的上下页、起始、结束、空格键不起作用
   *         ② v-viewable指令不起作用
   * NOTE: 被scrollbar组件包裹的所有元素，调用原生的scrollIntoView方法后会造成
   * 滚动条位置偏移不准，避免使用！应使用本组件的scrollIntoView方法。
   * TODO: 1.scrollx组件和scrolly组件可以合并成一个
   * TODO: 2.scrollBy方法
   * TODO: 3.throttle或者debounce为什么没起作用！？
   * TODO: 4.viewable方法，用以检查组件内包裹的元素是否在可视区内
   *         待完成，带后续看具体需求再写。
   * 
  */
import { getStyle, offset } from "karma-ui/util/dom";
import { isFF, isChrome } from "karma-ui/util/brower";
import ScrollbarY from "./ScrollbarY";
import ScrollbarX from "./ScrollbarX";
// import {debounce} from 'karma-ui/util/throttle_debounce'
// import {throttle, debounce} from 'throttle-debounce'
export default {
  name: "KScrollbar",
  components: {
    ScrollbarY,
    ScrollbarX,
  },
  props: {
    trackStyle: {
      type: Object,
      default: () => ({}),
    },
    thumbStyle: {
      type: Object,
      default: () => ({}),
    },
    containerStyle: {
      type: Object,
      default: () => ({}),
    },
    allowBodyScroll: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: Number,
      default: 53,
    },
    tag: {
      type: String,
      default: "div",
    },
  },
  data() {
    return {
      //allow应该在内容高度小于等于容器高度的时候，自动设置成true
      //否则，将会出现：当鼠标在某个区域内滚动的时候，外部滚动条也滚动不了
      allow: this.allowBodyScroll,
      top: 0,
      left: 0,
      maxScrollTop: 0,
      maxScrollLeft: 0,
      contentHeight: 0, //内容高度
      wrapperHeight: 0, //scrollbar组件最外部容器的高度
      contentWidth: 0,
      wrapperWidth: 0,
      dragging: false,
      timer: null,
    };
  },
  render() {
    return (
      <this.tag class="k-scrollbar" onWheel={this.onWheel}>
        <ScrollbarY
          ref="y"
          content-height={this.contentHeight}
          wrapper-height={this.wrapperHeight}
          track-style={this.trackStyle}
          thumb-style={this.thumbStyle}
          onDragging={this.onDragging}
        />
        <ScrollbarX
          ref="x"
          content-width={this.contentWidth}
          wrapper-width={this.wrapperWidth}
          track-style={this.trackStyle}
          thumb-style={this.thumbStyle}
          onDragging={this.onDraggingX}
        />
        <div
          class={{
            "k-scrollbar__content": true,
            "k-scrollbar-transition": !this.dragging,
          }}
          ref="content"
          style={{
            ...this.containerStyle,
            marginTop: this.top * -1 + "px",
            marginLeft: this.left * -1 + "px",
          }}
        >
          {this.$slots.default}
        </div>
      </this.tag>
    );
  },
  watch: {
    left: "emitScroll",
    top: "emitScroll",
  },
  methods: {
    emitScroll() {
      this.$emit("scroll", {
        scrollTop: this.top,
        scrollLeft: this.left,
        wrapper: {
          width: this.wrapperWidth,
          height: this.wrapperHeight,
        },
        content: {
          width: this.contentWidth,
          height: this.contentHeight,
        },
      });
    },
    onDragging(thumbTop, h, isDragging) {
      let top = (thumbTop * this.maxScrollTop) / (100 - h);
      this.top = top;
      this.dragging = isDragging;
    },
    onDraggingX(thumbLeft, w, isDragging) {
      let left = (thumbLeft * this.maxScrollLeft) / (100 - w);
      this.left = left;
      this.dragging = isDragging;
    },
    onWheel(e) {
      // console.log(e.deltaY, e.wheelDeltaY)

      this.scrollY(e.deltaY);
      this.dragging = false;
      if (!this.allow) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    scrollY(y) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let s = this.speed;
        const _y = Math.abs(y);
        if (isChrome) {
          if (_y < 3) {
            return;
          }
          if (_y % 100 != 0) {
            //笔记本触摸板
            s = Math.floor(_y);
          } else {
            // console.log(_y, s)
          }
        } else if (isFF) {
          if (_y % 3 != 0) {
            //笔记本触摸板
            s = Math.floor(_y);
            if (s < 3) {
              return;
            }
            console.log(s);
          }
        } else {
          if (_y < 3) {
            return;
          }
          s = _y;
          console.log(s);
          console.log(y);
        }
        const max = this.maxScrollTop;
        let top = 0;
        if (y > 0) {
          top = s + this.top;
        } else if (y < 0) {
          top = this.top - s;
        }
        if (top < 0) {
          top = 0;
        } else if (top > max) {
          top = max;
        }
        this.top = top;
      }, 10);
      //滚动条thumb位置
      //由于dom的margin变化会反映到updated钩子，所以不需要再次调用scroll
      // this.$refs.y.scroll(top)
    },
    getSize() {
      //content只计算clientWidth和clientHeight不行，需加上margin和border
      const el = this.$el,
        content = this.$refs.content.children[0];
      if (this.$refs.content.children.length > 1) {
        console.warn("scrollbar组件的slot只能有一个根节点");
      }
      // console.log(el.clientHeight)
      if (!content) {
        return {
          elClientHeight: el.clientHeight,
          elClientWidth: el.clientWidth,
          contentWholeHeight: el.clientHeight,
          contentWholeWidth: el.clientWidth,
        };
      }
      return {
        elClientHeight: el.clientHeight,
        elClientWidth: el.clientWidth,
        contentWholeHeight:
          content.clientHeight +
          parseInt(getStyle(content, "margin-top")) +
          parseInt(getStyle(content, "margin-bottom")) +
          parseInt(getStyle(content, "border-top-width")) +
          parseInt(getStyle(content, "border-bottom-width")),
        // +parseInt(getStyle(el,'padding-top'))
        // +parseInt(getStyle(el,'padding-bottom'))
        // +parseInt(getStyle(el,'border-top-width'))
        // +parseInt(getStyle(el,'border-bottom-width')),
        contentWholeWidth:
          content.clientWidth +
          parseInt(getStyle(content, "margin-left")) +
          parseInt(getStyle(content, "margin-right")) +
          parseInt(getStyle(content, "border-left-width")) +
          parseInt(getStyle(content, "border-right-width")),
        // +parseInt(getStyle(el,'padding-left'))
        // +parseInt(getStyle(el,'padding-right'))
        // +parseInt(getStyle(el,'border-left-width'))
        // +parseInt(getStyle(el,'border-right-width'))
      };
    },
    init() {
      const size = this.getSize();
      this.contentHeight = size.contentWholeHeight;
      this.wrapperHeight = size.elClientHeight;
      this.contentWidth = size.contentWholeWidth;
      this.wrapperWidth = size.elClientWidth;
      // console.log(size)
      const maxScrollTop = this.contentHeight - this.wrapperHeight,
        maxScrollLeft = this.contentWidth - this.wrapperWidth;
      this.maxScrollTop = maxScrollTop < 0 ? 0 : maxScrollTop;
      this.maxScrollLeft = maxScrollLeft < 0 ? 0 : maxScrollLeft;
      let allow = this.allowBodyScroll;
      if (this.contentHeight < this.wrapperHeight) {
        allow = true;
      }
      this.allow = allow;
    },
    resetContentPosition() {
      //调整content内容区域的marginTop/marginLeft
      const maxScrollTop = this.maxScrollTop;
      const maxScrollLeft = this.maxScrollLeft;
      const top = this.top;
      const left = this.left;
      if (top > maxScrollTop) {
        this.top = maxScrollTop;
      }
      if (left > maxScrollLeft) {
        this.left = maxScrollLeft;
      }
      if (this.$refs.y) {
        this.$refs.y.scroll(this.top);
      }
      if (this.$refs.x) {
        this.$refs.x.scroll(this.left);
      }
    },
    //组件外部调用
    reset() {
      this.$nextTick(() => {
        this.init();
        this.$nextTick(() => {
          this.resetContentPosition();
        });
      });
    },
    //组件外部调用
    scrollIntoView(elem) {
      if (!elem) {
        console.warn(`所选元素为${elem}，请检查`);
        return;
      }
      if (!this.$el.contains(elem)) {
        console.warn(`scrollbar组件中不包含${elem}`);
        return;
      }
      let s = offset(elem, this.$el);
      this.scrollTo(s.left, s.top);
    },
    //组件外部调用
    scrollTo(x, y) {
      //x,的单位需是px
      x = parseFloat(x);
      y = parseFloat(y);
      if (typeof x === "number") {
        this.left = x;
        this.$refs.x.scroll(x);
      }
      if (typeof y === "number") {
        this.top = y;
        this.$refs.y.scroll(y);
      }
    },
    //组件外部调用
    scrollToTop() {
      this.scrollTo(0, 0);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
    window.addEventListener("resize", this.reset);
  },
  updated() {
    this.reset();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.reset);
  },
};
</script>