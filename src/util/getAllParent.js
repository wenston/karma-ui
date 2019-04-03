//树形结构数据中，给定一个数值，和此数值对应的字段名，child字段名，找出此节点以及所有父级节点
export default (source, val, keyField, childField) => {
  let arr = [],
    copyArr = [],
    lastObj = {}
  function findFromArr(arrData, val, keyField) {
    for (let i = 0, len = arrData.length; i < len; i++) {
      const item = arrData[i]
      if (item[keyField] == val) {
        return item
      }
    }
  }
  function findFromArr2(arrData, val, keyField, childField) {
    for (let i = 0, len = arrData.length; i < len; i++) {
      lastObj = arrData[i]

      if (lastObj[keyField] == val) {
        arr.unshift(lastObj)
        break
      } else {
        if (lastObj[childField] && lastObj[childField].length) {
          const b = findFromArr(lastObj[childField], val,keyField)
          if (b) {
            arr.unshift(lastObj, b)
            break
          } else {
            findFromArr2(lastObj[childField], val,keyField,childField)
          }
        }
      }
    }
  }
  function findAllParent(arrData, val, keyField,childField) {
    //找到当前节点和他的直接父级
    findFromArr2(arrData, val,keyField,childField)
    if (arr.length > 1 && arr[0]) {
      copyArr.unshift(...arr)
      const itemV = arr[0][keyField]
      arr = []
      if (itemV) {
        findAllParent(arrData, itemV,keyField,childField)
      }
    } else if (arr.length === 1) {
      copyArr.unshift(arr[0])
    }
  }
  function uniq(source, keyField) {
    let arr = (source && [source[0]]) || []
    if (arr.length === 0) {
      return arr
    }
    source.slice(1).forEach(item => {
      if (arr.every(el => item[keyField] != el[keyField])) {
        arr.push(item)
      }
    })
    return arr
  }
  findAllParent(source, val, keyField, childField)
  return uniq(copyArr, keyField)
}
