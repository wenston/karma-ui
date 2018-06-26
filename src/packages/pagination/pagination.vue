<template>
  <ul class="k-pagi"
    :class="{'k-pagi-disabled-all':disabled}">
    <li class="k-pagi-total" 
      :class="`k-pagi-order-${order('total')}`"
      v-if="showItem('total')">
      共 {{total}} 条
    </li>
    <li 
      v-if="showItem('prev')"
      class="k-pagi-item k-pagi-prev"
      @click="goPrev"
      :class="[`k-pagi-order-${order('prev')}`,{'k-pagi-disabled':currentPage<=1}]">
      <i class="k-icon-keyboard_arrow_left"></i>
    </li>
    <template  v-if="showItem('pager')">
      <template v-for="(page,i) in cTotal">
        <li class="k-pagi-item"
          :class="[
          `k-pagi-order-${order('pager')}`
          ,{
            'k-current-page':page==currentPage,
            'k-pagi-dot':page==dot
          }]"
          :key="i"
          @click="pageChange(page)">{{page}}</li>
      </template>
    </template>
    
    <li 
      v-if="showItem('next')"
      class="k-pagi-item k-pagi-next"
      @click="goNext"
      :class="[`k-pagi-order-${order('next')}`,{'k-pagi-disabled':currentPage>=totalPages}]">
      <i class="k-icon-keyboard_arrow_right"></i>
    </li>
    <li 
      v-if="showItem('sizes')"
      class="k-pagi-sizes"
      :class="`k-pagi-order-${order('sizes')}`">
      <k-select v-model="modelPageSize"
        size="small">
        <k-option
          v-for="s in pageSizes"
          :key="s"
          :label="`${s}条/页`"
          :value="s"
          :selected="modelPageSize==s">{{s}}条/页</k-option>
      </k-select>
    </li>
    <template v-if="showItem('jumper')">
      <li 
        class="k-pagi-go"
        :class="`k-pagi-order-${order('jumper')}`">
        前往 
        <k-input size="small"
          type="number"
          v-model.number="goPage"
          @keyup.enter="goto"
          ref="pageInput"
          ></k-input>
        页
      </li>
      <li :class="`k-pagi-order-${order('jumper')}`">
        <k-button size="small" @click="goto">Go</k-button>
      </li>
    </template>
  </ul>
</template>

<script>
import KSelect from "karma-ui/packages/select/select"
import KOption from "karma-ui/packages/option/option"
import KInput from "karma-ui/packages/input/input.jsx.vue"
import KButton from "karma-ui/packages/button/button"
export default {
  components: {
    KSelect,
    KOption,
    KInput,
    KButton
  },
  name: "KPagination",
  props: {
    total: Number, //数据总条数
    currentPage: Number, //当前页码
    pageSize: {
      type: [Number, String],
      default: 15
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 25]
      }
    },
    layout: {
      type: String,
      default: 'total,prev,pager,next,sizes,jumper'
    },
    disabled: Boolean,
  },
  data() {
    return {
      dot: "...", //省略符号
      size: 10, //超出10时，开始显示...
      max: 5, //出现两个dot时最大连续展示5个页码
      max2: 7, //只出现一个dot时，最大连续展示7个页码
      modelPageSize: this.pageSize,
      goPage: ""
    }
  },
  watch: {
    pageSize(s,os) {
      if(s!=os) {
        this.modelPageSize = s
      }
    },
    modelPageSize(s,os) {
      if(s!=os) {
        this.$emit('update:pageSize', s)
        this.$emit('size-change', s)
      }
    }
  },
  computed: {
    //总页数
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    },
    cTotal() {
      //无论总页数多少，第一页和最后一页总是要展示
      const t = this.totalPages,
        size = this.size,
        max = this.max,
        max2 = this.max2,
        p = this.currentPage, //当前页码
        dot = this.dot
      if (t > size) {
        let arr = []
        if (t - p >= 5 && p > 5) {
          for (let i = p - 2; i <= p + 2; i++) {
            arr.push(i)
          }
          arr.push(dot, t)
          arr.unshift(1, dot)
        } else {
          if (p <= 5) {
            for (let i = 1; i <= 7; i++) {
              arr.push(i)
            }
            arr.push(dot, t)
          } else if (t - p < 5) {
            for (let i = t; i > t - 7; i--) {
              arr.unshift(i)
            }
            arr.unshift(1, dot)
          }
        }
        return arr
      } else {
        return t
      }
    }
  },
  methods: {
    order(item) {
      const i = this.layout.toLowerCase().split(',').indexOf(item.toLowerCase())
      return i
    },
    showItem(item) {
      const i = this.layout.toLowerCase().indexOf(item.toLowerCase())
      return i > -1
    },
    goto() {
      const p = this.goPage
      this.$refs.pageInput.onSelect()
      if (p < 1 || p > this.totalPages) {
        return
      }
      this.pageChange(p)
    },
    goNext() {
      const p = this.currentPage
      const t = this.totalPages
      if (p < t) {
        this.pageChange(p + 1)
      }
    },
    goPrev() {
      const p = this.currentPage
      if (p > 1) {
        this.pageChange(p - 1)
      }
    },
    pageChange(page) {
      if (page == this.dot) {
        return
      } else {
        if (page != this.currentPage && this.total>0) {
          this.$emit("update:currentPage", page)
          //事件，页码变动时
          this.$emit('page-change', page)
        }
      }
    }
  }
}
</script>
