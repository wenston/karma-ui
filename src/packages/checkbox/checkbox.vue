<template>
  <label class="k-checkbox" v-cloak>
    <input type="checkbox"
      class="k-checkbox__input"
      v-if="type==='arr' && !noInput"
      v-model="arr"
      :value="value"
      :disabled="disabled"
      @change="_change">
    <template v-else>
      <input type="checkbox"
        class="k-checkbox__input"
        v-if="!noInput"
        :checked="checked"
        :value="value"
        :disabled="disabled"
        @change="_change"></template>
    <span class="k-checkbox__icon"
      :class="icon"></span>
    <span v-if="text!==''"
      class="k-checkbox__text">{{text}}</span>
  </label>
</template>

<script>
/**
 *  //绑定单一布尔值
 *  <z-checkbox
      text="北京"
      value="北京"
      v-model="isChecked"
      disabled
      @change="onChange"></z-checkbox>
    //绑定一个数组
    <z-checkbox
      disabled
      type="arr"
      value="北京"
      text="北京"
      :data-arr.sync="cityArr"
      @change="onChange"></z-checkbox>
    <z-checkbox
      type="arr"
      value="上海"
      text="上海"
      :data-arr.sync="cityArr"
      @change="onChange"></z-checkbox>
    <z-checkbox
      type="arr"
      value="深圳"
      text="深圳"
      :data-arr.sync="cityArr"
      @change="onChange"></z-checkbox>
 */
export default {
  name: "KCheckbox",
  model: {
    prop: "checked",
    event: "checkedChange"
  },
  props: {
    text: {
      type: [String, Number],
      default: ""
    },
    checked: Boolean,
    value: {
      type: [Number, String],
      default: ""
    },
    dataArr: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,
    type: {
      type: String,
      default: ""
    },
    noInput: Boolean
  },
  data() {
    return {
      arr: this.dataArr
    }
  },
  computed: {
    icon() {
      return {
        'k-checkbox__icon--checked':this.checked,
        'k-checkbox__icon--disabled':this.disabled,
        'k-checkbox__icon--2':this.disabled && this.checked,
      }
    }
  },
  methods: {
    _has() {
      return this.arr.some(item => item == this.value)
    },
    _del() {
      this.arr = this.arr.splice(this.arr.indexOf(this.value), 1)
    },
    _change(e) {
      let isChecked = e.target.checked
      if (this.type === "arr") {
        if (isChecked) {
          if (this.value !== "") {
            if (!this._has()) {
              this.arr.push(this.value)
            }
          }
        } else {
          if (this._has()) {
            this._del()
          }
        }
        this.$emit("update:dataArr", this.arr)
      }
      this.$emit("checkedChange", isChecked)
      this.$emit("change", e)
    }
  },
  watch: {
    dataArr() {
      this.arr = this.dataArr
    }
  }
}
</script>