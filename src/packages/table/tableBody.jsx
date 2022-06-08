import { props } from "./_util/props";
import mixins from "./_mixins/";
import KColGroup from "./colGroup";
import KCell from "./tableCell";
import KCheckbox from "karma-ui/packages/checkbox/checkbox";
import KRadio from "karma-ui/packages/radio/radio";
import KIcon from "karma-ui/packages/icon/icon";
export default {
  name: "KTBody",
  mixins: [mixins],
  components: {
    KColGroup,
    KCell,
    KCheckbox,
    KRadio,
    KIcon,
  },
  props: {
    ...props,
    bodyScopedSlots: Object, //接收来自KTable的插槽内容$scopedSlots
    //主体表格main、左固定表格left、右固定表格right
    //根据不同表格，有选择的渲染某些数据：复选和单选
    who: {
      type: String,
      default: "main",
    },
  },
  inject: ["__index", "__checkbox", "__radio", "__action"],
  data() {
    return {
      checkedKeys: this.selectedKeys || [], //保存复选的所有key
      checkedRows: this.selectedRows || [], //保存复选的所有行数据
      currentRadioValue: "",
      currentHighlightKey: "",
    };
  },
  computed: {
    bodyWrapperClasses() {
      return ["k-tbodywrapper"];
    },
    tableClasses() {
      return ["k-table", "k-tbody", { "k-table--auto": !this.minContent }];
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.currentRadioValue = v;
      },
    },
    selectedKeys: {
      immediate: false,
      handler(keys) {
        this.checkedKeys = keys;
        // this.emitSelectChange()
      },
    },
    selectedRows: {
      immediate: true,
      handler(rows) {
        this.checkedRows = rows;
        //收集keys
        let keys = [];
        this.checkedRows.forEach((r) => {
          const k = this.$_format_checked_key(r);
          keys.push(k);
        });
        this.checkedKeys = keys;
        // if (rows.length === 0) {
        //   this.$emit("select-change", {
        //     checked: undefined,
        //     index: undefined,
        //     row: undefined,
        //     keys: this.checkedKeys,
        //     rows: this.checkedRows
        //   })
        // } else {
        // this.emitSelectChange()
        // }
      },
    },
  },
  methods: {
    //传入row,index，或者只传index都行，或者只传key
    setHighlightRow({ row, index, key }) {
      if (row) {
        this.currentHighlightKey = this.getRowKey(
          row,
          index,
          this.highlightKey
        );
      } else if (typeof index === "number") {
        const i = +index;
        if (typeof i === "number") {
          this.currentHighlightKey = this.getRowKey(
            this.data[i],
            i,
            this.highlightKey
          );
        }
      } else {
        this.currentHighlightKey = key;
      }
    },

    //父级调用。只在主动点击全选时调用
    onCheckedAll(checked) {
      //当不选择时，不可以将checkedKeys直接清空，因为可能存在跨页选择的数据
      //checkedRows同上
      let set = new Set(this.checkedKeys);
      if (checked) {
        this.data.forEach((row, index) => {
          if (this.canCheckRow(row, index)[1]) {
            const k = this.$_format_checked_key(row);
            set.add(k);
            let has = false;
            for (let i = 0, len = this.checkedRows.length; i < len; i++) {
              if (k === this.$_format_checked_key(this.checkedRows[i])) {
                has = true;
                break;
              }
            }
            if (!has) {
              // this.checkedRows.push(JSON.parse(JSON.stringify(row)))
              this.checkedRows.push(row);
            }
          }
        });
      } else {
        this.data.forEach((row, index) => {
          if (this.canCheckRow(row, index)[1]) {
            const k = this.$_format_checked_key(row);
            set.delete(k);
            let j = -1;
            for (let i = 0, len = this.checkedRows.length; i < len; i++) {
              if (k === this.$_format_checked_key(this.checkedRows[i])) {
                j = i;
                break;
              }
            }
            if (j > -1) {
              this.checkedRows.splice(j, 1);
            }
          }
        });
      }
      this.checkedKeys = [...set];
      // this.$emit("select-change", {
      //   checked: undefined,
      //   index: undefined,
      //   row: undefined,
      //   keys: this.checkedKeys,
      //   rows: this.checkedRows
      // })
      this.emitSelectChange();
      //NOTE: 如果出现选不中的情况，需检查传入的checkboxKey是否有问题
    },
    emitSelectChange(checked, row, index) {
      let rows = this.checkedRows,
        para = { checked, index, row, rows, keys: this.checkedKeys };
      if (!checked && !row && !index) {
        // 以下可用在全选，返回的checked/row/index都是undefined,
        this.$emit("select-change", para);
      } else if (this.canCheckRow(row, index)[1]) {
        this.$emit("select-change", para);
      }
    },
    //格式化checkboxKey/radioKey
    $_format_checked_key(row) {
      let keys = [];
      let result = [];
      if (this.checkboxKey && this.hasCheckbox) {
        keys = this.checkboxKey.trim().split(",");
      } else if (this.radioKey && this.hasRadio) {
        keys = this.radioKey.trim().split(",");
      }
      keys.forEach((key) => {
        result.push(row[key]);
      });
      return result.join(",");
    },
    canCheckRow(row = {}, index) {
      let can = [false, true];
      if (this.checkable && typeof this.checkable === "function") {
        can = this.checkable(row, index);
      }
      return can;
    },
    //tbody渲染
    renderTBody() {
      let tbody = [];
      if (this.data.length) {
        this.data.forEach((row, index) => {
          tbody.push(this.renderTr(row, index));
        });
        return tbody;
      } else {
        const colspan = this.columns.length || 1;
        let text =
          typeof this.emptyText === "function"
            ? this.emptyText()
            : this.emptyText;
        if (text) {
          return (
            <tr>
              <k-cell class="k-text-center k-table-empty" colspan={colspan}>
                {text}
              </k-cell>
            </tr>
          );
        }
      }
    },

    //处理序号列、操作列、多选或者单选的情况
    addFields(row, col, index, cell) {
      let [ck, canCk] = this.canCheckRow(row, index);
      //如果有序号列
      if (this.hasIndex && col.field === this.__index) {
        let idx = index + 1;
        if (this.pageSize && this.pageIndex) {
          idx = this.pageSize * (this.pageIndex - 1) + idx;
        }
        cell = [<div class="k-table-td--index">{idx}</div>];
        if (this.hasAction) {
          let actions =
            typeof this.actions === "function"
              ? this.actions(row, index)
              : this.actions;
          const add = (
            <k-icon
              title="新增行"
              class="k-table-icon-action"
              name="k-icon-add"
              onClick={(e) => {
                e.stopPropagation();
                this.$emit("add-row", { row, index });
              }}
            />
          );
          const del = (
            <k-icon
              title="删除行"
              class="k-table-icon-action"
              name="k-icon-close-circle"
              onClick={(e) => {
                e.stopPropagation();
                this.$emit("delete-row", { row, index });
              }}
            />
          );
          cell.push(
            <div class="k-table-td--actions">
              {actions.indexOf("add") > -1 ? add : null}
              {actions.indexOf("delete") > -1 ? del : null}
            </div>
          );
        } else {
          cell.push(
            <div class="k-table-td--actions k-table-td--index">{idx}</div>
          );
        }
      }
      // if (this.hasAction && col.field === this.__action) {
      //   cell = (
      //     <div>
      //       <k-icon
      //         title="新增行"
      //         class="k-table-icon-action"
      //         name="k-icon-add"
      //         onClick={e => {
      //           e.stopPropagation()
      //           this.$emit("add-row", { row, index })
      //         }}
      //       />
      //       <k-icon
      //         title="删除行"
      //         class="k-table-icon-action"
      //         name="k-icon-close-circle"
      //         onClick={e => {
      //           e.stopPropagation()
      //           this.$emit("delete-row", { row, index })
      //         }}
      //       />
      //     </div>
      //   )
      // }
      //如果有复选框
      if (this.hasCheckbox && col.field === this.__checkbox) {
        let checked = false;
        const k = this.$_format_checked_key(row);
        let set = new Set(this.checkedKeys);
        if (set.has(k)) {
          checked = true;
        }
        //如果可以操作选中

        if (canCk) {
          cell = (
            <k-checkbox
              noInput
              value={this.$_format_checked_key(row)}
              checked={checked}
            />
          );
        } else {
          cell = (
            <k-checkbox
              noInput
              value={this.$_format_checked_key(row)}
              checked={ck}
              disabled={!canCk}
            />
          );
        }
        //如果有单选框
      } else if (this.hasRadio && col.field === this.__radio) {
        const radioProps = {
          props: {
            vvv: this.currentRadioValue,
            value: this.$_format_checked_key(row),
            disabled: !canCk,
          },
          on: {
            vvvChange: (value) => {
              this.currentRadioValue = value;
              this.$emit("toggle-radio-row", { value, row, index });
            },
          },
        };
        cell = <k-radio {...radioProps} />;
      }
      return cell;
    },
    //单元格渲染
    renderTd(row, index, col) {
      let cont = null;
      if (col.customRender) {
        if (typeof col.customRender === "function") {
          cont = col.customRender(row, index);
        } else {
          cont = col.customRender;
        }
      } else if (col.scopedSlots) {
        cont = this.bodyScopedSlots[col.scopedSlots]({
          row,
          index,
        });
      } else if (col.field) {
        cont = row[col.field];
        cont = this.addFields(row, col, index, cont);
      }
      let cellProps = {
        class: [
          { "k-text-center": this.$_is_built_in_column(col.field) },
          [
            col.cellClass
              ? this.$_get_td_class(row, index, col, { thead: true })
              : "",
          ],
        ],
        style: this.$_get_td_style(row, index, col),
      };

      return <k-cell {...cellProps}>{cont}</k-cell>;
    },

    getRowKey(row, index, keys) {
      let k = [];
      let arr = [];
      if (keys) {
        arr = (keys + "").trim().split(/\s?\,\s?/);
      }
      arr.forEach((el) => {
        if (el.toLowerCase() === "index") {
          k.push(index + "");
        } else if (row[el]) {
          k.push(row[el]);
        }
      });
      return k.join(",");
    },
    //渲染数据的一行
    renderTr(row, index) {
      let [ck, canCk] = this.canCheckRow(row, index);
      let k = this.getRowKey(row, index, this.loopKey);
      const checkboxKey = this.$_format_checked_key(row);
      const curHighlightRowKey = this.getRowKey(row, index, this.highlightKey);
      let tds = [];
      this.columns.forEach((col) => {
        tds.push(this.renderTd(row, index, col));
      });
      // this.columns.forEach(col => {
      //   let colspan = col.colspan || 1
      //   while(colspan>0) {

      //     colspan-=1
      //   }
      //   tds.push(this.renderTd(row, index, col));
      // });
      let trClass = {};

      if (Array.isArray(this.trClass)) {
        this.trClass.forEach((c) => {
          trClass[c] = true;
        });
      } else if (typeof this.trClass === "string") {
        trClass[this.trClass] = true;
      } else {
        trClass = this.trClass;
      }
      let trProps = {
        attrs: {
          "data-key": k,
          "data-highlight": curHighlightRowKey,
        },
        key: k,
        class: {
          "k-table-tr-checked":
            ck || this.selectedKeys.some((k) => k == checkboxKey),
          "k-table-tr-highlight":
            curHighlightRowKey == this.currentHighlightKey,
          ...trClass,
        },
        on: {
          dblclick: () => {
            this.$emit("dblclick-row", { row, index });
          },
          click: () => {
            if (this.canHighlightRow) {
              this.currentHighlightKey = this.getRowKey(
                row,
                index,
                this.highlightKey
              );
              this.$emit("toggle-highlight", {
                row,
                index,
                value: curHighlightRowKey,
              });
            }
            //可以在此处理复选单选
            const k = this.$_format_checked_key(row);
            if (this.canCheckRow(row, index)[1]) {
              if (this.hasCheckbox) {
                let checked = false;
                let set = new Set(this.checkedKeys);
                if (set.has(k)) {
                  set.delete(k);
                  let j = -1;
                  for (let i = 0, len = this.checkedRows.length; i < len; i++) {
                    if (k === this.$_format_checked_key(this.checkedRows[i])) {
                      j = i;
                      break;
                    }
                  }
                  if (j > -1) {
                    this.checkedRows.splice(j, 1);
                  }
                } else {
                  set.add(k);
                  checked = true;
                  let has = false;
                  for (let i = 0, len = this.checkedRows.length; i < len; i++) {
                    if (k === this.$_format_checked_key(this.checkedRows[i])) {
                      has = true;
                      break;
                    }
                  }
                  if (!has) {
                    // this.checkedRows.push(JSON.parse(JSON.stringify(row)))
                    this.checkedRows.push(row);
                  }
                }
                this.checkedKeys = [...set];
                this.emitSelectChange(checked, row, index);
              } else if (this.hasRadio) {
                this.currentRadioValue = k;
                this.$emit("toggle-radio-row", { value: k, row, index });
              }
            }
            this.$emit("click-row", { row, index });
          },
        },
      };
      if (this.hover) {
        trProps.on.mouseover = (e) => {
          this.$emit("mouseover-tr", e);
        };
        trProps.on.mouseout = (e) => {
          this.$emit("mouseout-tr", e);
        };
      }
      return <tr {...trProps}>{tds}</tr>;
    },
  },
  render() {
    const { bodyWrapperClasses, tableClasses } = this;
    return (
      <div class={bodyWrapperClasses}>
        <table class={tableClasses}>
          {this.$slots.colgroup}
          <tbody>{this.renderTBody()}</tbody>
        </table>
      </div>
    );
  },
};
