import { getStyle, scrollIntoViewIfNeed } from 'karma-ui/util/dom'
import { debounce } from 'karma-ui/util/throttle_debounce'
import { layer } from 'karma-ui/packages/layer/index'
import KInput from 'karma-ui/packages/input/input.jsx.vue'
import KIcon from 'karma-ui/packages/icon/icon.jsx'
import KOption from 'karma-ui/packages/option/option'
import esc from 'karma-ui/util/esc.js'
import loading from 'karma-ui/directives/loading/index'
export default {
  name: 'KAutoComplete',
  components: {
    KInput,
    KOption,
    KIcon,
  },
  props: {
    ...KInput.props,
    data: {
      type: Array,
      default: () => [],
    },
    //弹层的宽度，有值的话，就用那个设置的值，如果设置了空字符串或者false，表示和
    //输入框等宽
    layerWidth: {
      type: [String, Boolean],
      default: 'auto',
    },
    //弹层的高度
    layerHeight: {
      type: String,
      default: 'auto',
    },
    //keyfield用来向后台提交的字段名(对应的数据)
    keyField: {
      type: String,
      default: 'Id',
    },
    //展示的那个字段名(对应的数据)
    valueField: {
      type: String,
      default: 'Name',
    },
    //模糊匹配需要搜索的字段
    searchField: {
      type: [String, Array],
      default: 'Name',
    },
    //只有展示列表的时候，再初始化layer
    //此参数同时具有收起列表后销毁layer的功能控制
    lazy: {
      type: Boolean,
      default: true,
    },
    //TODO：有时候layer没有被销毁，待检查
    destroyWhenHide: {
      type: Boolean,
      default: true,
    },
    //前端分页，有值就代表有分页，没有值就没有分页
    pageSize: {
      type: [Number, String],
      default: void 0,
    },
    debounceTime: {
      type: Number,
      default: 350,
    },
    scrollElement: {
      type: Element,
      default: null,
    },
    //是否就近插入dom，即在输入框下插入layer弹层
    nearby: {
      type: Boolean,
      default: false,
    },
    //如果是延迟获取数据，则从外部绑定数据后，名字出不来，所以给个与keyField对应的text
    //注意：text仅仅是在没有数据的时候在输入框展示出绑定的数据
    //仅此而已
    text: {
      type: [String, Number],
      default: '',
    },
    layerMinWidthEqual: {
      type: Boolean,
      default: false,
    },
    clearWhenNoMatch: {
      type: Boolean,
      default: true,
    },
    loading: Boolean,
    empty: [Function, Object, Array, String],
    matchFromDatabase: Boolean,
  },
  model: {
    prop: 'value',
    event: 'valueChange',
  },
  data() {
    return {
      //layer实例
      ins: null,
      //提交数据用的，可能是id或者proid等等
      // val: this.value,
      //展示在输入框的那个文本
      inputText: this.text,
      optionCompName: '',
      isMouseDownOption: false,
      //选中的那个数据的index
      currentIndex: -1,
      currentHoverIndex: -1,
      //filterData
      filterData: JSON.parse(JSON.stringify(this.data)),
      options: [], //收集本组件下属的所有option组件
      optionCompName: '',
      //控制延迟加载的转圈图形显示
      ld: this.loading,
      pageIndex: 1,
      timer: null,
      keyupTimer: null,
      visible: false, //是否展示出了下拉列表
      //输入文本时，如果没在下拉列表中选择而直接离开了，
      //noMatch记录有没有匹配到，
      //如果没有匹配到
      noMatch: false,
    }
  },
  computed: {
    totalPages() {
      if (this.pageSize && this.filterData.length) {
        return Math.ceil(this.filterData.length / this.pageSize)
      }
      return 1
    },
  },
  watch: {
    // val(v) {
    //   this.$emit("valueChange", v)
    // },
    data(d) {
      if (d && d.length) {
        this.getInputTextByKeyField()
        this.filterData = JSON.parse(JSON.stringify(d))
        const i = this.currentHoverIndex

        //如果v-model有数据，且有分页、当前数据不在第一页
        //
        if (
          this.pageSize &&
          this.pageIndex == 1 &&
          i > this.pageSize * this.pageIndex - 1
        ) {
          const half = Math.ceil(this.pageSize / 2)
          this.filterData = this.filterData.slice(i - half, i + half)
          this.currentHoverIndex = this.currentIndex = half
        }

        if (document.activeElement == this.$refs.input.getInputElement())
          this.showList()
      } else {
        this.filterData = []
        if (this.pageSize) this.currentHoverIndex = this.currentIndex = 1
      }
    },
    value: {
      immediate: true,
      handler(v) {
        this.getInputTextByKeyField()
        if (v === undefined || v === null || v === '') {
          if (!this.disabled) {
            this.pageIndex = 1
            // this.inputText = "";
            this.currentHoverIndex = this.currentIndex = -1
            if (this.visible) {
              this.$refs.input.focus()
            }
            this.getFilterData()
          }
        }
      },
    },
    text(t) {
      this.inputText = t
      this.getInputTextByKeyField()
    },
    loading(v) {
      this.ld = v
      // this.ins && this.init();
    },
    ld(v) {
      this.$emit('update:loading', v)
    },
  },
  methods: {
    handleKeyup(e) {
      const code = e.keyCode
      if (code != 40 && code != 38 && code != 13) {
        return
      }
      if (this.visible) {
        this.$emit('keyup', e)

        let i = this.currentHoverIndex
        let len = this.filterData.length
        if (this.pageSize) {
          const l = this.pageSize * this.pageIndex
          if (l < len) {
            len = l
          }
        }
        if (code == 40) {
          //下
          i += 1
          if (i >= len) {
            i = 0
          }
        } else if (code == 38) {
          i -= 1
          if (i < 0) {
            i = len - 1
          }
        } else if (code == 13) {
          if (this.filterData.length) {
            this.currentIndex =
              this.currentHoverIndex == -1 ? 0 : this.currentHoverIndex
            this.$emit(
              'input',
              this.filterData[this.currentIndex][this.keyField][this.valueField]
            )
            this.$emit(
              'valueChange',
              this.filterData[this.currentIndex][this.keyField]
            )
            this.$emit(
              'toggle',
              {
                row: this.filterData[this.currentIndex],
                index: this.currentIndex,
              },
              e
            )
            this.noMatch = false
            this.hideList(this.destroyLayer)
          }
          return
        }
        this.currentHoverIndex = i
        // console.log(i)
        this.scrollIntoViewIfNeed(i)
        this.$forceUpdate()
      } else {
        if (code == 40) {
          this.showAndScrollIntoView(true)
        }
      }
    },
    matchValueByInputText() {
      if (this.matchFromDatabase) {
        return
      }
      const inputText = this.inputText.trim()
      const keyField = this.keyField
      const valueField = this.valueField
      let v = ''
      let i = 0
      let row
      const l = this.data.length
      while (i < l) {
        if (this.data[i][valueField] === inputText && inputText) {
          v = this.data[i][keyField]
          row = this.data[i]
          break
        }
        i++
      }
      // console.log(inputText,'v::',v)
      if (!v) {
        this.noMatch = true
        // this.$emit('valueChange','')//不能加，加了会清空已输入的文本

        // this.inputText = inputText
        // this.$emit('toggle',{row,index:undefined})
        // console.log(v, '没有匹配！！')
      } else {
        this.noMatch = false
        this.$emit('valueChange', v)
        this.$emit('toggle', { row, index: i })
      }
    },
    //
    getInputTextByKeyField() {
      let text = ''
      if (
        this.value !== undefined &&
        this.value !== null &&
        this.value !== '' &&
        this.data &&
        this.data.length &&
        this.keyField
      ) {
        for (let i = 0, len = this.data.length; i < len; i++) {
          let item = this.data[i]
          if (item[this.keyField] == this.value) {
            text = item[this.valueField]
            this.currentIndex = i
            this.currentHoverIndex = i
            break
          }
        }
      } else {
        if (this.inputText) {
          text = this.inputText
        } else if (this.text) {
          text = this.text
        }
      }
      if (text) {
        this.inputText = text
      }
      if (text === '') {
        this.currentHoverIndex = -1
        this.currentIndex = -1
        this.getFilterData()
      }
      return text
      // this.$emit('toggle',{row,index})
      // return {row,index}
    },
    //外部调用，获取valueField对应的值
    getName() {
      return this.getInputTextByKeyField()
    },
    //外部调用,获取输入框里的文本
    getInputValue() {
      return this.inputText
    },
    //可外部调用
    clear() {
      if (!this.disabled) {
        this.pageIndex = 1
        this.inputText = ''
        this.currentHoverIndex = this.currentIndex = -1
        if (this.visible) {
          this.$refs.input.focus()
        }
        this.inputText = ''
        this.$emit('input', '')
        this.$emit('valueChange', '')
        this.$emit('toggle', { row: undefined, index: undefined })
        this.getFilterData()
      }
    },
    //根据inputText获取keyField对应的值
    getValueByInputText() {
      let v = ''
      //将用户输入，转化成关键字数组，以逐个匹配
      const arrText = this.inputText.toLowerCase().split(/\s+/)
      if (
        this.data &&
        this.data.length &&
        this.inputText !== '' &&
        this.inputText !== undefined &&
        this.keyField
      ) {
        if (Array.isArray(this.searchField)) {
        } else if (typeof this.searchField === 'string') {
        }
      }
    },
    getFilterData() {
      if (this.inputText.trim() !== '' && !this.matchFromDatabase) {
        //将用户输入，转化成关键字数组，以逐个匹配
        const arrText = this.inputText
          .toLowerCase()
          .split(/\s+/)
          .filter((el) => el.length > 0)
        const arrField =
          typeof this.searchField === 'string'
            ? [this.searchField]
            : Array.isArray(this.searchField)
            ? this.searchField
            : []
        if (arrField.length === 0) {
          console.warn(`${this.$options.name}是否没有传入searchField参数？`)
        }
        //搜索出来
        let arr = []
        this.data.forEach((item) => {
          let has = false
          arrField.forEach((field) => {
            const fieldText = (item[field] + '').toLowerCase()
            arrText.forEach((text) => {
              text = (text + '').trim()
              if (fieldText.indexOf(text) > -1) {
                has = true
              }
            })
          })
          if (has) {
            arr.push({ ...item })
          }
        })
        this.filterData = arr
        if (arr.length === 0) {
          if (this.ins) {
            this.ins.hide()
          }
        } else {
          if (this.value) this.showList(this.scrollIntoViewIfNeed)
        }
        this.$forceUpdate()
      } else {
        this.filterData = this.data
        if (
          this.$refs.input &&
          document.activeElement == this.$refs.input.getInputElement()
        ) {
          this.showList(this.scrollIntoViewIfNeed)
        }
      }
    },
    handleLayerBodyScroll: debounce(100, function() {
      const body = this.ins.$refs.body
      let bodyHeight = parseFloat(getStyle(body, 'height'))
      let scrollTop = body.scrollTop
      let scrollHeight = Math.ceil(body.scrollHeight)
      // console.log(bodyHeight,scrollTop,scrollHeight,this.totalPages)
      // 使用了Math.ceil和 -2，处理临界点高度
      if (bodyHeight + scrollTop >= scrollHeight - 2) {
        if (this.totalPages > 1) {
          if (this.pageIndex < this.totalPages) {
            this.pageIndex += 1
            this.$forceUpdate()
          }
        }
      }
    }),
    //TODO:showList时，需判断下拉有没有被实例化，如果没有，则先实例化
    showList(fn = () => {}) {
      this.$nextTick().then(() => {
        this.ins &&
          this.ins.show(() => {
            fn()
          })
      })
    },
    hideList(cb = () => {}) {
      if (!this.disabled) {
        if (this.ins) {
          //remove事件
          this.ins.$refs.body.removeEventListener(
            'scroll',
            this.handleLayerBodyScroll
          )
          this.ins.hide(() => {
            cb()
          })
        }
      }
    },
    scrollIntoViewIfNeed(index) {
      let i = 0
      if (typeof index === 'number') {
        i = index
      } else {
        if (this.filterData && index !== undefined) {
          this.filterData.forEach((el, index) => {
            if (el[this.keyField] == this.value) {
              i = index
            }
          })
        }
      }
      this.getAllOptionsComponent()
      if (this.options.length && this.options[i] && this.options[i].$el) {
        scrollIntoViewIfNeed(this.options[i].$el, this.ins.$refs.body)
      }
    },
    getAllOptionsComponent() {
      let arr = []
      const fn = (Comp) => {
        Comp.$children.forEach((child) => {
          if (child.$options.name === this.optionCompName) {
            arr.push(child)
          } else {
            fn(child)
          }
        })
      }
      fn(this.ins)
      this.options = arr
    },
    //可供外部调用
    focus() {
      this.$refs.input.focus()
    },
    inputProps() {
      return {
        directives: [
          {
            name: 'esc',
            value: () => {
              this.hideList(this.destroyLayer)
            },
          },
        ],
        ref: 'input',
        props: {
          ...this.$props,
          value: this.inputText,
        },
        on: {
          ...this.$listeners,
          focus: (e) => {
            this.$refs.input.onSelect()
            // this.showAndScrollIntoView()
            this.$emit('focus', e)
          },
          blur: () => {
            // if (!this.isMouseDownOption) {
            //   this.hideList(this.destroyLayer)
            // }
            // this.matchValueByInputText();
            if (!this.isMouseDownOption) {
              if (this.noMatch && this.clearWhenNoMatch) {
                this.$emit('valueChange', '')
                this.$emit('toggle', { row: undefined, index: undefined })
              }
            }
          },
          input: () => {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
              //让直接输入的文本，也可以匹配到对应的keyField的值
              this.matchValueByInputText()
              this.$emit('input', this.inputText)
            }, this.debounceTime)
            this.showAndScrollIntoView()
          },
          keyup: (e) => {
            this.handleKeyup(e)
            const keyCode = e.keyCode
            //简单的写一写
            if(keyCode!=37 && keyCode!=38 && keyCode!=39 && keyCode!=40
              && keyCode!=27
              && keyCode!=91
              && keyCode!=17 && keyCode!=18 && keyCode!=16
              && keyCode!=33 && keyCode!=34) {
                clearTimeout(this.keyupTimer)
                this.keyupTimer = setTimeout(() => {
                  //专门写个search，为了输入之后手动去控制是否发请求拿数据
                  this.$emit('search', this.inputText)
                }, this.debounceTime)
            }
          },
          keydown: (e) => {
            //阻止光标乱跑。在keyup中阻止不了
            // e.preventDefault()
          },
          valueChange: (v) => {
            this.pageIndex = 1
            this.inputText = v
            this.currentIndex = this.currentHoverIndex = -1
            if (v.trim() === '') {
              this.$emit('valueChange', '')
              this.$emit('toggle', { row: undefined, index: undefined })
            }
            this.getFilterData()
          },
        },
      }
    },
    instanceAndOn() {
      if (this.nearby) {
        this.ins = layer(this.$el.parentNode)
      } else {
        this.ins = layer()
      }
      this.$emit('getLayerElement', this.ins.$el)
      this.ins.$on('layer-inited', () => {
        this.$nextTick().then(() => {
          this.ins.$refs.body.addEventListener(
            'scroll',
            this.handleLayerBodyScroll
          )
        })
      })
      this.ins.$on('after-show', () => {
        this.visible = true
        this.$refs.input.focus()
        this.$emit('after-show')
      })
      this.ins.$on('after-hide', () => {
        this.visible = false
        this.$emit('after-hide')
      })

      this.ins.$on('mousedown', () => {
        this.isMouseDownOption = true
      })
      this.ins.$on('mouseout', () => {
        this.isMouseDownOption = false
      })
    },
    init() {
      this.$nextTick(() => {
        // console.log('初始化时的pageIndex',this.pageIndex)
        if (this.ins) {
          const {
            layerWidth,
            layerHeight,
            filterData,
            $slots,
            $scopedSlots,
          } = this
          // if (this.filterData.length === 0) {
          //   //提示加载中
          //   this.ld = true;
          // } else {
          //   this.ld = false;
          // }
          const loadingProps = {
            style: {
              minHeight: '180px',
              display: this.ld ? 'block' : 'none',
            },
            directives: [
              {
                name: 'loading',
                value: {
                  loading: this.ld,
                },
              },
            ],
          }
          // console.log(this.ld)
          const empty = this.empty || (
            <div class="k-auto-complete-empty">暂无相关数据</div>
          )
          const slotsDefault = $slots.default ||
            (filterData.length &&
              filterData
                .slice(0, this.pageIndex * (this.pageSize || filterData.length))
                .map((item, index) => {
                  const optionProps = {
                    class: {
                      'k-option--hover': index == this.currentHoverIndex,
                    },
                    props: {
                      tag: 'div',
                      selected: item[this.keyField] === this.value,
                    },
                    on: {
                      click: (e) => {
                        this.$refs.input.focus()
                        this.currentIndex = index
                        this.$emit(
                          'input',
                          item[this.keyField][this.valueField]
                        )
                        this.$emit('valueChange', item[this.keyField])
                        this.$emit('toggle', { row: item, index })
                        this.noMatch = false
                        this.hideList(this.destroyLayer)
                      },
                    },
                  }
                  if ($scopedSlots.default) {
                    return (
                      <k-option {...optionProps}>
                        {$scopedSlots.default({
                          row: item,
                          index,
                        })}
                      </k-option>
                    )
                  }
                  return (
                    <k-option {...optionProps}>
                      {item[this.valueField]}
                    </k-option>
                  )
                })) || [<div {...loadingProps} />, !this.ld && empty]
          const slotsHeader = $slots.header
          const slotsFooter = $slots.footer
          this.ins.init(
            this,
            {
              //列表的插槽内容
              default: slotsDefault,
              //列表头部的内容
              header: slotsHeader,
              //列表底部的内容
              footer: slotsFooter,
            },
            {
              //弹框标签类型
              tag: 'div',
              //弹框列表头部标签类型
              headerTag: 'div',
              //弹框列表底部标签类型
              footerTag: 'div',
              //弹框宽。如果不指定宽，则宽度和输入框一致
              width: layerWidth,
              layerMinWidthEqual: this.layerMinWidthEqual,
              //高度暂时没有设置。TODO
              height: layerHeight,
              canCloseByClickoutside: true,
              scrollElement: this.scrollElement,
              nearby: this.nearby,
            }
          )
        }
      })
    },
    destroyLayer() {
      if (this.destroyWhenHide) {
        if (this.ins) {
          this.ins.destroy()
          this.ins = null
        }
      }
    },
    renderIcon() {
      if (this.disabled) {
        return null
      }
      const inputText = this.inputText.trim()
      if (inputText !== '') {
        return (
          <span
            class="k-auto-complete-icon-wrapper"
            onClick={(e) => {
              this.clear()
            }}>
            <k-icon class="k-auto-complete-icon" name="k-icon-close-circle" />
          </span>
        )
      }
      return (
        <span
          class="k-auto-complete-icon-wrapper"
          onClick={(e) => {
            if (!this.disabled) {
              if (this.visible) {
                this.hideList(this.destroyLayer)
                this.$refs.input.focus()
              } else {
                this.showAndScrollIntoView(true)
              }
            }
          }}>
          <k-icon
            class="k-auto-complete-icon"
            name="k-icon-arrow-down"
            transform={this.visible && 'rotateX(180deg)'}
          />
        </span>
      )
    },
    showAndScrollIntoView(force) {
      const inputText = this.inputText.trim()
      if (inputText !== '' || force) {
        //如果还没有实例化，则先实例化
        if (!this.ins) {
          this.instanceAndOn()
          this.init()
        }
        //如果没有筛选出来的数据，就不显示列表
        if (force || this.filterData.length !== 0) {
          this.showList(() => {
            this.scrollIntoViewIfNeed()
            this.currentHoverIndex = this.currentIndex
            this.$forceUpdate()
          })
        }
      }
    },
  },
  directives: {
    esc,
    loading,
  },
  render() {
    const inputProps = this.inputProps()
    return (
      <k-input {...inputProps}>
        {this.renderIcon()}
        {this.$slots.append}
      </k-input>
    )
  },
  beforeDestroy() {
    this.destroyLayer()
  },
  mounted() {
    if (!this.lazy) {
      if (!this.ins) {
        this.instanceAndOn()
        this.init()
      }
    }
  },
  updated() {
    this.ins && this.init()
  },
  created() {
    this.$on('getOptionComponentName', (name) => {
      this.optionCompName = name
    })

    this.$on('inovering', (isMouseDownOption) => {
      this.isMouseDownOption = isMouseDownOption
      //如果鼠标离开列表，且当前焦点不是此组件的input，则隐藏列表
      if (!isMouseDownOption) {
        if (document.activeElement != this.$refs.input.getInputElement()) {
          this.hideList(this.destroyLayer)
        }
      }
    })
  },
}
