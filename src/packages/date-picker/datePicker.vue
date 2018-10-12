<template>
  <div class="k-dp">
    <k-input
      :style="{width}"
      :readonly="readonly"
      :clearable="clearable"
      :size="size">
      <div slot="prepend"
        class="k-dp__icon">
        <i class="k-icon-calendar"></i>
      </div>
    </k-input>
    <div class="k-dp__calendar">
      <div class="k-dp__sidebar"></div>
      <div class="k-dp__panel">
        <div class="k-dp__header">
          <div>
            <span>
              <i class="k-icon-keyboard_arrow_left"></i>
            </span>
            <span>
              <i class="k-icon-keyboard_arrow_left"></i>
            </span>
          </div>
          <div>
            <span>
              <i class="k-icon-keyboard_arrow_right"></i>
            </span>
            <span>
              <i class="k-icon-keyboard_arrow_right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KInput from 'karma-ui/packages/input/input.jsx'
export default {
  props: {
    width: {
      type: String,
      default: '118px'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  name: 'KDatePicker',
  components: {
    KInput
  }
}
</script>
