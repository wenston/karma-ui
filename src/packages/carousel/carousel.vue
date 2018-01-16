<script>
import { setStyle, getStyle } from "karma-ui/util/dom.js";
export default {
  name: "KCarousel",
  data() {
    return {
      timer: null,
      len: 0,
      i: 1
    };
  },
  props: {
    interval: {
      type: Number,
      default: 3500
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    indicatorPosition: {
      type: String,
      default: "center" //其他取值"right"
    },
    trigger: {
      type: String,
      default: "hover"
    }
  },
  render() {
    let container = this.$slots.default;
    let len = container.length;
    this.len = len;
    let btn = null;
    let btns = [];
    for (let i = 0; i < len; i++) {
      btns.push(btn);
    }
    //指示器 -- 按钮
    let indi = btns ? (
      <ul
        ref="btns"
        class={{
          "k-carousel__indicator": true,
          ["k-carousel__indicator--" + this.indicatorPosition]: true
        }}
      >
        {btns.map((btn, index) => (
          <li
            class={{
              "k-carousel__button": true,
              "k-carousel__button--active": this.i - 1 === index
            }}
            onClick={()=>this.handleClick(index)}
            onMouseover={()=>this.handleMouseover(index)}
          />
        ))}
      </ul>
    ) : null;
    return (
      <div class="k-carousel"
        onMouseover={this.pause}
        onMouseout={this.handleOut}>
        <div
          class="k-carousel__container"
          ref="container"
          style={{ width: `${len * 100}%` }}
        >
          {container}
        </div>
        {indi}
      </div>
    );
  },
  methods: {
    handleOut() {
      this.autoPlay && this.play()
    },
    pause() {
      clearInterval(this.timer)
    },
    handleClick(index) {
      if(this.trigger.toLowerCase() !== 'click') return;
      this.i = index;
      this.pause();
      this.anim(this.$refs.container);
      this.autoPlay && this.play();
    },
    handleMouseover(index) {
      if(this.trigger.toLowerCase() !== 'hover') return;
      this.i = index;
      this.pause();
      this.anim(this.$refs.container);
      this.autoPlay && this.play();
    },
    anim(elem) {
      setStyle(elem, {
        marginLeft: `-${this.i++ * 100}%`
      });
    },
    play() {
      this.pause();
      let container = this.$refs.container,
        btns = this.$refs.btns.children;

      this.timer = setInterval(() => {
        if (this.len > 0 && this.i >= this.len) {
          this.i = 0;
        }
        this.anim(container);
      }, this.interval);
    }
  },
  mounted() {
    this.autoPlay && this.$nextTick(this.play);
  }
};
</script>
