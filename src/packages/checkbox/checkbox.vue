<template>
  <label class="k-checkbox">
    <input type="checkbox"
      class="k-checkbox__input"
      v-if="type==='arr'"
      v-model="arr"
      :value="value"
      :disabled="disabled"
      @change="_change">
    <input type="checkbox"
      class="k-checkbox__input"
      v-else
      :checked="checked"
      :value="value"
      :disabled="disabled"
      @change="_change">
    <span class="k-checkbox__icon"></span>
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
    event: "checkbox-change"
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
    }
  },
  data() {
    return {
      arr: this.dataArr
    }
  },
  methods: {
    _has() {
      return this.arr.some(item => item === this.value);
    },
    _del() {
      this.arr = this.arr.splice(this.arr.indexOf(this.value), 1);
    },
    _change(e) {
      let isChecked = e.target.checked;
      if (this.type === "arr") {
        if (isChecked) {
          if (this.value !== "") {
            if (!this._has()) {
              this.arr.push(this.value);
            }
          }
        } else {
          if (this._has()) {
            this._del();
          }
        }
        this.$emit("update:dataArr", this.arr);
      }
      this.$emit("checkbox-change", isChecked);
      this.$emit("change", e);
    }
  },
  watch: {
    dataArr() {
      this.arr = this.dataArr;
    }
  }
};
</script>