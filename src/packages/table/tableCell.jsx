import { getStyle, setStyle } from 'karma-ui/util/dom'
import KIcon from 'karma-ui/packages/icon/icon'
export default {
  name: 'KCell',
  components: {
    KIcon,
  },
  props: {
    tag: {
      type: String,
      default: 'td',
    },
    rowspan: [String, Number],
    colspan: [String, Number],
    resizeWidth: Boolean,
    parent_thead: Object,
    index: Number, //单元格在当前行的序列号
    presets: Number, //预置列数，（index,checkbox,actions,radio）
    sorter: [Boolean, Number], //0是升序，1是降序,true是恢复默认排序
  },
  data() {
    return {
      sort: this.sorter,
      inResizing: false,
      timer: null,
      ths: [],
      dragElem: null,
      dropElem: null,
      startX: 0,
      startY: 0,
      toIndex: -1, //
      type: '', //move和exchange
    }
  },
  computed: {
    hasSorter() {
      const { sorter } = this
      return sorter === true || sorter === 1 || sorter === 0
    },
    sortText() {
      return {
        '0': '升序',
        '1': '降序',
        true: '排序',
      }
    },
  },
  methods: {
    beforeDrag(e) {
      this.startX = e.clientX
      this.startY = e.clientY
      const wrapper = this.parent_thead.$el
      const tr = wrapper.querySelector('tr')
      //排除了预置列
      const ths = [...tr.querySelectorAll('th')].slice(this.presets)
      ths.forEach(th => {
        th.__offsetLeft = th.offsetLeft
        th.__rect = th.getBoundingClientRect()
      })
      this.ths = ths
      //创建拖拽的节点
      this.dragElem = document.createElement('div')
      this.dragElem.classList.add('k-table-drag-elem')
      setStyle(this.dragElem, {
        top: this.$el.__rect.top + 'px',
        left: this.$el.__rect.left + 'px',
        height: getStyle(this.$el, 'height'),
        width: getStyle(this.$el, 'width'),
        paddingLeft: getStyle(this.$el, 'paddingLeft'),
        fontSize: getStyle(this.$el, 'fontSize'),
      })
      this.dragElem.textContent = this.$el.textContent
      //创建插入或交换标记
      this.dropElem = document.createElement('div')
      this.dropElem.classList.add('k-table-drop-elem')
      setStyle(this.dropElem, {
        display: 'none',
      })
      this.$el.classList.add('k-table-th-dragging')
      document.body.appendChild(this.dragElem)
      document.body.appendChild(this.dropElem)
      document.addEventListener('mousemove', this.handleMousemove_drag)
      document.addEventListener('mouseup', this.handleMouseup_drag)
      document.body.classList.add('k-no-select')
    },
    handleMousemove_drag(e) {
      const left = this.$el.__rect.left + e.clientX - this.startX
      setStyle(this.dragElem, {
        left: left + 'px',
      })
      this.type = ''
      this.toIndex = -1
      let r_left = -9999
      let r_top = -9999
      let ex_left = -9999
      let ex_top = -9999
      this.ths.forEach((th, i) => {
        let rect_left = th.__rect.left
        //插入列
        if (e.clientX > rect_left - 25 && e.clientX < rect_left + 25) {
          r_left = th.__rect.left - 4
          r_top = th.__rect.top - 15
          this.type = 'move'
          this.toIndex = i
        } else {
          //列交换
          rect_left += th.__rect.width / 2
          if (e.clientX > rect_left - 25 && e.clientX < rect_left + 25) {
            ex_left = th.__rect.left + th.__rect.width / 2 - 4
            ex_top = th.__rect.top - 15
            this.type = 'exchange'
            this.toIndex = i
          }
        }
      })
      if (r_left !== -9999) {
        setStyle(this.dropElem, {
          left: r_left + 'px',
          top: r_top + 'px',
          display: 'block',
        })
      } else {
        setStyle(this.dropElem, {
          display: 'none',
        })
        if (ex_left !== -9999) {
          setStyle(this.dropElem, {
            display: 'block',
            top: ex_top + 'px',
            left: ex_left + 'px',
          })
        } else {
          setStyle(this.dropElem, {
            display: 'none',
          })
        }
      }
    },
    handleMouseup_drag(e) {
      const from = this.index - this.presets
      if (this.type && this.toIndex > -1 && this.toIndex !== from) {
        if (!(this.type === 'move' && from - this.toIndex === -1)) {
          this.$emit('drop', { type: this.type, from, to: this.toIndex })
        }
      }
      this.$el.classList.remove('k-table-th-dragging')
      document.body.removeChild(this.dragElem)
      document.body.removeChild(this.dropElem)
      document.body.classList.remove('k-no-select')
      this.dropElem = null
      this.dragElem = null
      document.removeEventListener('mousemove', this.handleMousemove_drag)
      document.removeEventListener('mouseup', this.handleMouseup_drag)
    },
    handleMouseup(e) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.inResizing = false
      }, 100)
      document.removeEventListener('mouseup', this.handleMouseup)
    },
    resizeElem() {
      const p = {
        class: {
          'k-table-resize': true,
        },
        on: {
          mousedown: e => {
            clearTimeout(this.timer)
            this.inResizing = true
            document.addEventListener('mouseup', this.handleMouseup)
            this.$emit('handleResizeDown', e, this.$el)
            e.stopPropagation()
          },
          click: e => {
            e.stopPropagation()
          },
        },
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
            'k-table-sorter-icon': true,
            'k-table-sorter-icon-active': sorter === 0,
          }}
        />
      )
      const down = (
        <k-icon
          name="k-icon-sort-down"
          class={{
            'k-table-sorter-icon': true,
            'k-table-sorter-icon-down': true,
            'k-table-sorter-icon-active': sorter === 1,
          }}
        />
      )
      const p = {
        class: 'k-table-sorter',
        attrs: {
          title: this.sortText[sorter + ''],
        },
      }
      if (this.parent_thead) {
        p.on = {
          mousedown: e => {
            e.stopPropagation()
          },
        }
      }
      return (
        <div {...p}>
          {up}
          {down}
        </div>
      )
    },
  },
  render() {
    let p = {
      attrs: {
        rowspan: this.rowspan,
        colspan: this.colspan,
      },
      class: {
        'k-table-td-relative': this.resizeWidth || this.hasSorter,
        'k-cursor-pointer': this.hasSorter,
        'k-no-select': this.hasSorter,
      },
      on: {},
    }
    if (this.hasSorter && !this.inResizing) {
      p.on.click = e => {
        if (this.sort === 1) {
          this.sort = true
        } else if (this.sort === 0) {
          this.sort = 1
        } else if (this.sort === true) {
          this.sort = 0
        }
        this.$emit('sort', this.sort)
      }
    }
    if (this.parent_thead) {
      p.on.mousedown = this.beforeDrag
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
    },
  },
}
