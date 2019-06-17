import { getStyle, offset } from "karma-ui/util/dom"
import { props } from "./_util/props"
import mixins from "./_mixins/"
import KTableHead from "./tableHead"
import KTableBody from "./tableBody"
import KTableFoot from "./tableFoot"
import KColGroup from "./colGroup"
export default {
  mixins: [mixins],
  components: {
    KColGroup,
    KTableHead,
    KTableBody,
    KTableFoot
  },
  name: "KTable",
  props: {
    ...props
  },
  model: {
    prop: "vvv",
    event: "vvvChange"
  },
  data() {
    return {
      theadTop: 0,
      tfootBottom: 0
    }
  },
  provide() {
    return {
      __index: "@_index",
      __checkbox: "@_checkbox",
      __radio: "@_radio",
      __action: "@_action"
    }
  },
  computed: {
    c_columns() {
      let c = this.columns.map(item => {
        if (item) {
          let col = typeof item === "function" ? item() : item
          return col
        }
      })
      return c
    },
    tableWrapperClasses() {
      return ["k-tablebox"]
    },
    colGroup() {
      return <k-col-group columns={this.c_columns} />
    }
  },
  methods: {
    onTableWrapperScroll() {
      const { thead, tfoot, tableWrapper } = this.$refs
      if (thead && tfoot && tableWrapper) {
        const tar = tableWrapper
        const scrollTop = tar.scrollTop
        const scrollLeft = tar.scrollLeft
        const theadEl = thead.$el
        const tfootEl = tfoot.$el
        const scrollHeight = tar.scrollHeight
        const clientHeight = tar.clientHeight
        this.theadTop = scrollTop
        theadEl.style.top = scrollTop + "px"
        this.tfootBottom = scrollHeight - clientHeight - scrollTop
        tfootEl.style.bottom = this.tfootBottom + "px"
      }
    },
    init() {
      this.$nextTick(() => {
        this.onTableWrapperScroll()
        window.addEventListener("resize", this.onTableWrapperScroll)
      })
    }
  },
  updated() {
    this.onTableWrapperScroll()
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onTableWrapperScroll)
  },
  render() {
    //对columns进行初步处理，剔除null/undefined/false/''等无效的列

    // 2. 整理出来colgroup
    const colgroup = <template slot="colgroup">{this.colGroup}</template>
    const tableWrapperProps = {
      ref: "tableWrapper",
      class: this.tableWrapperClasses,
      style: {
        height: this.height
      },
      on: {
        scroll: this.onTableWrapperScroll
      }
    }
    let baseProps = {
      props: {
        ...this.$props,
        columns: this.c_columns
      }
    }
    return (
      <div class="k-tableouter">
        <div {...tableWrapperProps}>
          <KTableHead {...baseProps} ref="thead" top={this.theadTop}>
            {colgroup}
          </KTableHead>
          <KTableBody {...baseProps} bodyScopedSlots={this.$scopedSlots}>
            {colgroup}
          </KTableBody>
          <KTableFoot {...baseProps} ref="tfoot" bottom={this.tfootBottom}>
            {colgroup}
          </KTableFoot>
        </div>
      </div>
    )
  }
}
