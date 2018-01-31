<template>
  <div v-clickoutside="hideIt"
    v-esc="hideIt"
    class="k-select"
    @click="toggleList"
    @mouseover="showDeleteBtn"
    @mouseout="hideDeleteBtn">
    <z-input :class="{'k-select__active':ifOptionList}"
      :placeholder="placeholder"
      readonly
      :size="size"
      :value="modelValue"
      :disabled="disabled"
      :styles="styles"
      >
      <i class="k-icon-cancel k-select__clear" 
        slot="append"
        @click.stop="clear"
        v-if="showDelete && clearable"></i>
      <i class="k-icon-arrow_drop_down k-select__down"
        :class="{'k-select__down--up':ifOptionList}"
        @click.stop="clear"
        v-else
        slot="append"></i>
    </z-input>
    <!-- 如果是v-if，则子组件不会被created/mounted，直到显示子组件的时候，才会实例化。所以初始化值时就初始化不上了 -->
    <transition name="k-transition-slide-down">
      <ul class="k-select__list"
        v-show="ifOptionList"
        ref="list">
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script>
import ZInput from "karma-ui/packages/input/input.jsx.vue";
import clickoutside from "karma-ui/util/clickoutside.js";
import esc from "karma-ui/util/esc.js";
import emitter from "karma-ui/mixins/emitter.js";

export default {
  mixins: [emitter],
  name: "KSelect",
  componentName: "KSelect",
  components: {
    ZInput
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
    styles: Object,
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
      this.broadcast("KOption", "iNeedValue", this.modelKey);
    });
  },
  watch: {
    modelKey(n) {
      if (n === undefined || n === "") {
        this._change({});
      } else {
        this.broadcast("KOption", "iNeedValue", n);
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
