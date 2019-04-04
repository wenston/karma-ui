import KDropdown from "karma-ui/packages/dropdown/dropdown"
import KTree from "karma-ui/packages/tree/tree"
import loading from "karma-ui/directives/loading/index"
export default {
  name: "KSelectTree",
  components: {
    KDropdown,
    KTree
  },
  props: {
    ...KTree.props
  },
  data() {
    return {
      visible: this.show,
    }
  },
  methods: {
    title() {
      return (
        <div class="k-select2">
          <k-input readonly clearable placeholder="商品分类" />
          <div class="k-select2-checked-list" />
        </div>
      )
    },
    body() {
      const p = {
        props: { ...this.$props },
        on: {
          ...this.$listeners
        }
      }
      return <KTree {...p} />
    }
  },
  render() {
    const title = this.title()
    const body = this.body()
    const p = {
      props: {
        show: this.visible,
        title,
        body,
        bodyClassName: "k-select-tree-body"
      },
      on: {
        'update:show':v=>{
          this.visible = v
        }
      }
    }
    return <KDropdown {...p} />
  },
  watch: {
    visible(v) {
      this.$emit('update:show',v)
    },
    show(v) {
      this.visible = v
    }
  },
  directives: {
    loading
  }
}
