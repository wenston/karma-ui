import { getStyle } from "karma-ui/util/dom"
import { props } from "./_util/props"
import KColGroup from "./colGroup"
import KCell from "./tableCell"
import KCheckbox from "karma-ui/packages/checkbox/checkbox"
import KRadio from "karma-ui/packages/radio/radio"
import mixins from "./_mixins/"
export default {
  mixins: [mixins],
  components: {
    KColGroup,
    KCell,
    KCheckbox,
    KRadio
  },
  props: {
    ...props,
    top: Number
  },
  data() {
    return {
      isCheckedAll: false
    }
  },
  inject: ["__index", "__checkbox", "__radio", "__action"],
  computed: {
    headWrapperClasses() {
      return [
        "k-theadwrapper",
        {
          "k-theadwrapper-shadow": this.top > 0
        }
      ]
    },
    headClasses() {
      return [
        "k-table",
        {
          "k-table--auto": !this.minContent
        }
      ]
    }
  },
  methods: {
    renderTableHead() {
      let ths = this.columns.map(col => {
        let cont = typeof col.name === "function" ? col.name() : col.name
        return <k-cell tag="th">{cont}</k-cell>
      })
      return <tr>{ths}</tr>
    }
  },
  render() {
    return (
      <div class={this.headWrapperClasses}>
        <table class={this.headClasses}>
          {this.$slots.colgroup}
          <thead>{this.renderTableHead()}</thead>
        </table>
      </div>
    )
  },
  mounted() {}
}
