
import getAllParent from "karma-ui/util/getAllParent"
export function selectChilds(
  item, //当前数据
  checkedKeys, //已选的数组
  checked, //是否选中
  keyField,
  childField,
  selectedRule //选中规则
) {
  let set = new Set(checkedKeys.map(t => t + ""))
  if (selectedRule === "some" || selectedRule === "every") {
    function selectChildren(data, set, type = "add") {
      data.forEach(el => {
        set[type](el[keyField] + "")
        if (el[childField] && el[childField].length) {
          selectChildren(el[childField], set, type)
        }
      })
    }
    if (item[childField] && item[childField].length) {
      if (checked) {
        selectChildren(item[childField], set)
      } else {
        selectChildren(item[childField], set, "delete")
      }
    }
  } else {
    if (checked) {
      set.add(item[keyField])
    } else {
      set.delete(item[keyField])
    }
  }
  checkedKeys = [...set]
  return checkedKeys
}

export function selectParent(
  sourceData, //数据源
  item, //当前数据
  checkedKeys, //已选的关键字数组
  checked, //是否选中
  keyField,
  childField,
  selectedRule //选中规则
) {
  let set = new Set(checkedKeys.map(k => k + ""))

  if (selectedRule === "some" || selectedRule === "every") {
    //将此节点及父级相关的节点push到selectedData
    let arr = getAllParent(
      sourceData,
      item[keyField],
      keyField,
      childField
    )
    // console.log(arr)
    let vals = []
    arr.forEach(el => {
      vals.push(el[keyField] + "")
    })

    if (checked) {
      //只要有一个子级被选中，则父级就被选中
      if (selectedRule === "some") {
        vals.forEach(k => {
          set.add(k)
        })
        //只有所有的子级都被选中，父级才会被选中
      } else if (selectedRule === "every") {
        //arr长度是1时代表只选择了一个根节点数据，此时不用向上找父级了
        if (arr.length === 1) {
          set.add(vals[0])
        } else {
          function everySelect(arr, set) {
            let len = arr.length,
              i = len - 1
            do {
              if (i === len - 1) {
                set.add(arr[i][keyField] + "")
              } else {
                const childs = arr[i][childField]
                if (childs && childs.length) {
                  let has = true
                  for (let j = 0; j < childs.length; j++) {
                    const item = childs[j]
                    if (!set.has(item[keyField] + "")) {
                      has = false
                      break
                    }
                  }
                  if (has) {
                    everySelect(arr.slice(0, -1), set)
                  } else {
                    break
                  }
                }
              }
              i = i - 1
            } while (i >= 0)
          }
          everySelect(arr, set)
        }
      }
    } else {
      if (selectedRule === "some") {
        //取消选中此项，
        //并判断同级有没有被选中，如果所有同级都没有被选中，则父级取消选中
        set = cancelChecked(keyField,childField,arr, set)
      } else if (selectedRule === "every") {
        //如果有一个没有被选中，则父级取消选中
        set = cancelChecked(keyField,childField,arr, set, "every")
      }
    }
    checkedKeys = [...set]
  } else {
    if (checked) {
      set.add(item[keyField])
    } else {
      set.delete(item[keyField])
    }
    checkedKeys = [...set]
  }
  return checkedKeys
}

export function cancelChecked(keyField,childField,data, set, rule = "some") {
  //data是当前数据及其所有父级，set是selectedKeys
  //如果data只有1，则代表只选择了顶级一层的数据
  if (data.length === 1) {
    const v = data[0][keyField] + ""
    set.delete(v)
  } else {
    function deleteFromSet(data, set) {
      let len = data.length,
        i = len - 1
      do {
        if (i === len - 1) {
          set.delete(data[i][keyField] + "")
        } else {
          //搜集所有同级，判断是否有一个被选中
          let has = false
          if (rule === "every") {
            has = true
          }
          for (
            let j = 0, jlen = data[i][childField].length;
            j < jlen;
            j++
          ) {
            const c = data[i][childField][j]
            if (rule === "some") {
              if (set.has(c[keyField] + "")) {
                has = true
                break
              }
            } else if (rule === "every") {
              if (!set.has(c[keyField] + "")) {
                has = false
                break
              }
            }
          }
          if (has) {
            break
          } else {
            deleteFromSet(data.slice(0, -1), set)
          }
        }
        i = i - 1
      } while (i >= 0)
    }
    deleteFromSet(data, set)
  }
  return set
}

