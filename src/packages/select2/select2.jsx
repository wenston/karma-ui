import KInput from 'karma-ui/packages/input/input.jsx.vue'
export default {
  name: 'KSelect2',
  components: {
    KInput
  },
  props: {
    //数据源
    data: [Array,Object],
    //值，可以是数组、字符串（可以用逗号分隔）、单个数值
    value: [Array,String,Number]
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      
    }
  },
  methods: {
    rInput() {
      const p = {
        props: {
          readonly: true
        },
        on: {
          
        }
      }
      return (
        <k-input {...p}></k-input>
      )
    }
  },
  render() {
    return (
      <div class="k-select2">
        <div>
          {this.rInput()}
        </div>
      </div>
    )
  }
}