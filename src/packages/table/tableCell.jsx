import KIcon from "karma-ui/packages/icon/icon"
export default {
  name: "KCell",
  components: {
    KIcon
  },
  props: {
    tag: {
      type: String,
      default: "td"
    },
    rowspan: [String, Number],
    colspan: [String, Number],
    resizeWidth: Boolean,
    sorter: [Boolean, Number] //0是升序，1是降序,true是恢复默认排序
  },
  data() {
    return {
      sort: this.sorter,
      inResizing: false,
      timer: null
    }
  },
  computed: {
    hasSorter() {
      const { sorter } = this
      return sorter === true || sorter === 1 || sorter === 0
    },
    sortText() {
      return {
        "0": "升序",
        "1": "降序",
        true: "排序"
      }
    }
  },
  methods: {
    handleMouseup(e) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.inResizing = false
      }, 100)
      document.removeEventListener("mouseup", this.handleMouseup)
    },
    resizeElem() {
      const p = {
        class: {
          "k-table-resize": true
        },
        on: {
          mousedown: e => {
            clearTimeout(this.timer)
            this.inResizing = true
            document.addEventListener("mouseup", this.handleMouseup)
            this.$emit("handleResizeDown", e, this.$el)
            e.stopPropagation()
          },
          click: e => {
            e.stopPropagation()
          }
        }
      }
      if (this.resizeWidth && this.colspan - 1 <= 0) {
        return <div {...p} />
      }
    },
    sorterElem() {
      const { sorter } = this
      // console.log(sorter)
      const up = (
        <k-icon
          name="k-icon-sort-up"
          class={{
            "k-table-sorter-icon": true,
            "k-table-sorter-icon-active": sorter === 0
          }}
        />
      )
      const down = (
        <k-icon
          name="k-icon-sort-down"
          class={{
            "k-table-sorter-icon": true,
            "k-table-sorter-icon-down": true,
            "k-table-sorter-icon-active": sorter === 1
          }}
        />
      )
      return (
        <div class="k-table-sorter" title={this.sortText[sorter + ""]}>
          {up}
          {down}
        </div>
      )
    }
  },
  render() {
    let p = {
      attrs: {
        rowspan: this.rowspan,
        colspan: this.colspan
      },
      class: {
        "k-table-td-relative": this.resizeWidth || this.hasSorter,
        "k-cursor-pointer": this.hasSorter,
        "k-no-select": this.hasSorter
      }
    }
    if (this.hasSorter && !this.inResizing) {
      p.on = {
        click: e => {
          if (this.sort === 1) {
            this.sort = true
          } else if (this.sort === 0) {
            this.sort = 1
          } else if (this.sort === true) {
            this.sort = 0
          }
          this.$emit("sort", this.sort)
        }
      }
    }
    return (
      <this.tag {...p}>
        {this.$slots.default}
        {this.resizeElem()}
        {this.hasSorter ? this.sorterElem() : null}
      </this.tag>
    )
  },
  watch: {
    sorter(s) {
      this.sort = s
    }
  }
}
