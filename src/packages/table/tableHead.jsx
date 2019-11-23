import { props } from "./_util/props";
import KCell from "./tableCell";
import KCheckbox from "karma-ui/packages/checkbox/checkbox";
import KRadio from "karma-ui/packages/radio/radio";
import mixins from "./_mixins/";
export default {
  name: "KTHead",
  mixins: [mixins],
  components: {
    KCell,
    KCheckbox,
    KRadio
  },
  props: {
    ...props
  },
  data() {
    return {
      isCheckedAll: false,
      presets: 0, //预置列数
      currentSorterField: "", //当前排序中的字段
      currentSort: true //当前排序，0,1，true
    };
  },
  provide() {
    return {
      theadComp: this
    };
  },
  inject: ["__index", "__checkbox", "__radio", "__action"],
  computed: {
    headWrapperClasses() {
      return [
        "k-theadwrapper",
        {
          // "k-theadwrapper-shadow": this.top > 0
        }
      ];
    },
    headClasses() {
      return [
        "k-table",
        {
          "k-table--auto": !this.minContent
        }
      ];
    }
  },
  watch: {
    selectedKeys: {
      immediate: false,
      handler(keys) {
        const sourceData = this.$props.data;
        const sourceDataLength = sourceData.length;
        let cant = 0;
        let checkedKeys = [];
        sourceData.forEach((row, index) => {
          if (this.canCheckRow(row, index)[1]) {
            checkedKeys.push(this.$_format_checked_key(row));
          } else {
            cant += 1;
          }
        });
        const arrAllInAnotherArr = (arr, anotherArr) => {
          let i = 0,
            len = arr.length,
            b = true;
          while (i < len) {
            if (!anotherArr.some(n => n == arr[i])) {
              b = false;
              break;
            }
            i++;
          }
          return b;
        };
        const isAllIn = arrAllInAnotherArr(checkedKeys, keys);

        if (cant === 0) {
          this.onCheckedAll(sourceDataLength > 0 && isAllIn);
        } else {
          const cans = sourceDataLength - cant;
          this.onCheckedAll(sourceDataLength > 0 && cans > 0 && isAllIn);
        }
      }
    }
  },
  methods: {
    canCheckRow(row = {}, index) {
      let can = [false, true];
      if (this.checkable && typeof this.checkable === "function") {
        can = this.checkable(row, index);
      }
      return can;
    },
    //父组件调用，改变复选框状态
    onCheckedAll(b) {
      this.isCheckedAll = b;
    },
    toggleCheckedAll(e) {
      this.$emit("togglechecked", e.target.checked);
    },
    getRowspan(obj, max) {
      if (obj.children && obj.children.length !== 0) {
        return 1;
      }
      return max - obj.__level;
    },
    getColspan(obj) {
      let arr = [],
        fn = obj => {
          if (obj.children && obj.children.length) {
            obj.children.forEach(c => {
              fn(c);
            });
          } else {
            arr.push(obj);
          }
        };
      fn(obj);
      return arr.length || 1;
    },
    renderTableHead() {
      //预置列数
      let presets = 0;
      let columns = this.columns;
      //记录总共行数
      let maxRowLength = 0;
      //记录单元格序列号
      let __index = 0;
      //标记每一行数据
      /**
       * addIndex，给每列添加一个index，对应col的序列
       *
       */
      let addIndex = (col, colChildren) => {
        if (colChildren.children && colChildren.children.length) {
          col.__index = col.__index + colChildren.children.length - 1;
          colChildren.children.forEach(c => {
            addIndex(col, c);
          });
        }
      };
      //addLevel标记层级，方便合并行和列
      let addLevel = (cols, i) => {
        cols.forEach(col => {
          if (this.$_is_built_in_column(col.field)) {
            presets += 1
          }
          //__level代表了第几行tr
          col.__index = __index++;
          col.__level = i;
          if (maxRowLength < i) {
            maxRowLength = i;
          }
          if (col.children && col.children.length) {
            // col.__index = col.__index + col.children.length - 1
            addIndex(col, col);
            __index--;
            addLevel(col.children, col.__level + 1);
          }
        });
      };
      //给数据添加行编号，方便后续循环时将单元格插入对应的行
      addLevel(columns, 0);
      //由于行号时从0开始的，所以要加1
      maxRowLength += 1;
      //预先创建好所有的行
      let trs = Array.apply(null, { length: maxRowLength }).map(() => []);

      let renderTd = columns => {
        columns.forEach((col, i, arr) => {
          const isPreset = this.$_is_built_in_column(col.field)
          let content = null;
          // console.log(col.name , typeof col.name)
          if (typeof col.name === "function") {
            content = col.name();
          } else {
            content = col.name;
          }
          if (this.hasIndex && this.indexText && col.field === this.__index) {
            content = this.indexText;
          }
          // if (this.hasAction && col.field === this.__action) {
          //   content = "操作"
          // }
          if (this.hasCheckbox && col.field === this.__checkbox) {
            content = (
              <k-checkbox
                checked={this.isCheckedAll}
                onChange={this.toggleCheckedAll}
              />
            );
          } else if (this.hasRadio && col.field === this.__radio) {
            content = ""
          }
          const colspan = this.getColspan(col)
          const rowspan = this.getRowspan(col, maxRowLength)

          const cellProps = {
            props: {
              colspan,
              rowspan,
              resizeWidth: this.resizeWidth,
              presets,
              index: i,
              tag: "th",
              sorter: (() => {
                let b = true;
                if (col.field && this.currentSorterField == col.field) {
                  b = this.currentSort
                } else {
                  b = "sorter" in col
                }
                // console.log(b)
                return b
                // col.sorter === undefined ? false : col.sorter
              })()
            },
            class: [
              {
                "k-text-center":
                  colspan > 1 || this.$_is_built_in_column(col.field)
              },
              [
                col.cellClass
                  ? this.$_get_td_class(null, null, col, { thead: true })
                  : ""
              ]
            ],
            style: this.$_get_td_style(null, null, col, { thead: true }),
            on: {
              handleResizeDown: (e, el) => {
                if (col.children && col.children.length) {
                  return;
                }
                this.$emit("handleResizeDown", e, el, col.__index, col);
              },
              sort: type => {
                // console.log(type, col)
                // console.log(type)
                this.currentSort = type;
                this.currentSorterField = col.field;
                this.$emit("sort", type, col);
              },
              drop: ({ type, from, to }) => {
                const obj = {
                  type,
                  from: {
                    index: from,
                    ...col
                  },
                  to: {
                    index: to,
                    ...arr.slice(presets)[to]
                  }
                }
                this.$emit('drop', obj)
              }
            }
          };
          //如果有列拖拽排序且不是预置的列
          if (
            col.__level === 0 &&
            this.draggable &&
            !isPreset
          ) {
            cellProps.props.parent_thead = this;
          }

          //如果有children，说明有列合并
          trs[col.__level].push(<k-cell {...cellProps}>{content}</k-cell>);
          if (col.children && col.children.length) {
            renderTd(col.children);
          }
        })
      }
      renderTd(columns)
      return trs.map(tr => <tr>{tr}</tr>)
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
  }
}
