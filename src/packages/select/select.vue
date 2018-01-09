<template>
  <div v-clickoutside="hideIt"
    v-esc="hideIt"
    :class="css.select"
    @click="toggleList"
    @mouseover="showDeleteBtn"
    @mouseout="hideDeleteBtn">
    <z-input :class="{[css.active]:ifOptionList}"
      :placeholder="placeholder"
      readonly
      :size="size"
      :value="modelValue"
      :disabled="disabled"
      :styles="styles"
      >
      <z-icon v-if="showDelete && clearable"
        slot="append"
        which="delete"
        @click.native.stop="clear"
        ></z-icon>
      <z-icon v-else
        slot="append"
        which="arrow"
        :type="arrowType"
        ></z-icon>
    </z-input>
    <transition :leave-active-class="css.leaveActive"
      :leave-to-class="css.leaveTo">
      <!-- 如果是v-if，则子组件不会被created/mounted，直到显示子组件的时候，才会实例化。所以初始化值时就初始化不上了 -->
      <ul :class="css.optionList" v-show="ifOptionList"
        ref="list">
        <slot></slot>
      </ul>
    </transition>
    
  </div>
</template>

<script>
import ZIcon from "../icon/icon.vue";
import ZInput from "../input/input.jsx.vue";
import clickoutside from "../util/clickoutside.js";
import esc from "../util/esc.js";
import emitter from "../mixins/emitter.js";

export default {
  mixins: [emitter],
  name: "ZSelect",
  componentName: "ZSelect",
  components: {
    ZInput,
    ZIcon
  },
  // provide() {
  //   return {
  //     selectComponent: this
  //   };
  // },
  model: {
    prop: "modelKey",
    event: "bianbianbian"
  },
  props: {
    size: String,
    value: {
      type: [Number, String, Boolean],
      default: void 0
    },
    modelKey: {
      type: [Number, String],
      default: void 0
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    styles:Object,
    disabled: Boolean,
    clearable: Boolean
  },
  data() {
    return {
      modelValue: "",
      showOptionList: false,
      showDelete: false
    };
  },
  computed: {
    ifOptionList() {
      return this.showOptionList && this.$slots.default;
    },
    arrowType() {
      return this.showOptionList ? "up" : "down";
    }
  },
  methods: {
    hideIt(e) {
      if (!this.disabled) {
        this.showOptionList = false;
      }
    },
    clear() {
      this._change({});
      this.showDelete = false;
    },
    showDeleteBtn() {
      if (
        this.clearable &&
        this.modelKey !== "" &&
        this.modelKey !== undefined
      ) {
        this.showDelete = true;
      }
    },
    hideDeleteBtn() {
      if (
        this.clearable &&
        this.modelKey !== "" &&
        this.modelKey !== undefined
      ) {
        this.showDelete = false;
      }
    },
    toggleList() {
      if (!this.disabled) {
        this.showOptionList = !this.showOptionList;
      }
    },
    _change(obj) {
      this.modelValue = obj.v;
      this.$emit("bianbianbian", obj.k);
      this.$emit("change", obj);
      this.hideIt();
    }
  },
  mounted() {},
  created() {
    this.$on("getValue", opt => {
      this._change(opt);
    });
    this.$on("optionReady", () => {
      this.broadcast("ZOption", "iNeedValue", this.modelKey);
    });
  },
  watch: {
    modelKey(n) {
      if (n === undefined || n === "") {
        this._change({});
      } else {
        this.broadcast("ZOption", "iNeedValue", n);
      }
    },
    ifOptionList(val) {
      if (!val) {
        this.$el.querySelector("input").blur();
      }
    }
  },
  directives: {
    clickoutside,
    esc
  }
};
</script>

<style lang="scss" module="css">
@import "../style/var.scss";
.leave-active {
  // transition: .25s ease-out;
}
.leave-to {
  // opacity: 0;
}
.select {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  .option-list {
    position: absolute;
    width: 100%;
    border: 1px solid $z-color-primary;
    border-top: none;
    z-index: 99;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    max-height: 300px;
    overflow-y: auto;
  }
  input {
    cursor: default;
  }
  .active {
    input {
      border-color: $z-color-primary;
    }
  }
}
</style>
