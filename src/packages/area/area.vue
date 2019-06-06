<template>
  <div class="k-area">
    <template v-if="sheng&&sheng.length&&numLevel>=1">
      <k-select v-model="curProvince"
        :styles="selectStyle"
        :clearable="clearable"
        @change="handleChange($event,1)"
        placeholder="省/直辖市">
        <k-option v-for="item in sheng"
          :key="item.code"
          :value="item.code"
          :label="item.name"
          :selected="item.code==curProvince">{{item.name}}</k-option>
      </k-select>
    </template>
    <template v-if="shi && numLevel>=2">
      <k-select v-model="curCity"
        :styles="selectStyle"
        :clearable="clearable"
        @change="handleChange($event,2)"
        placeholder="市/区">
        <k-option v-for="item in shi[curProvince]"
          :key="item.code"
          :value="item.code"
          :label="item.name"
          :selected="item.code==curCity">{{item.name}}</k-option>
      </k-select>
    </template>
    <template v-if="qu && numLevel>=3">
      <k-select v-model="curCounty"
        :styles="lastStyle"
        @change="handleChange($event,2)"
        :clearable="clearable"
        placeholder="区/县">
        <k-option v-for="item in qu[curCity]"
          :key="item.code"
          :value="item.code"
          :label="item.name"
          :selected="item.code==curCounty">{{item.name}}</k-option>
      </k-select>
    </template>
  </div>
</template>

<script>
// import { province, city, county } from "./areaData.js"
import KSelect from "karma-ui/packages/select/select.vue"
import KOption from "karma-ui/packages/option/option.vue"
export default {
  name: "KArea",
  inheritAttrs: false,
  components: {
    KSelect,
    KOption
  },
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    level: {
      type:[Number,String],
      default: 3
    },
    province: {
      type: Array,
      default: () => [{}]
    },
    city: {
      type: Object,
      default: () => ({})
    },
    county: {
      type: Object,
      default: () => ({})
    },
    code: [String, Number],
    selectStyle: {
      type: Object,
      default: () => ({
        width: '90px'
      })
    },
    lastSelectStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      sheng: this.province,
      shi: this.city,
      qu: this.county,
      curProvince: "",
      curCity: "",
      curCounty: ""
    }
  },
  model: {
    prop: "code",
    event: "codeChange"
  },
  computed: {
    numLevel() {
      return +this.level
    },
    lastStyle() {
      return {...this.selectStyle,...this.lastSelectStyle}
    },
    sCode() {
      return this.code + ""
    }
  },
  methods: {
    handleChange(e,n) {
      if(e.k === undefined) {
        if(n === 1) {

          this.$emit('codeChange','')
          this.emit('','','')
        }else if(n===2) {
          this.$emit('codeChange',this.curProvince)
          this.emit(this.curProvince,'','')
        }else{
          this.$emit('codeChange',this.curCity)
          this.emit(this.curProvince,this.curCity,'')
        }
      }
    },
    emit(provinceCode, cityCode, countyCode) {
      // console.log(provinceCode, cityCode, countyCode)
      let pname = this.getProvinceNameByCode(provinceCode)
      let cityName = this.getCityNameByCode(provinceCode, cityCode)
      let countyName = this.getCountyNameByCode(cityCode, countyCode)
      this.setCode("curProvince", pname ? provinceCode : "")
      this.setCode("curCity", cityName ? cityCode : "")
      this.setCode("curCounty", countyName ? countyCode : "")
      this.$emit("update:area", [
        {
          name: pname,
          code: provinceCode
        },
        {
          name: cityName,
          code: cityCode
        },
        {
          name: countyName,
          code: countyCode
        }
      ])
    },
    getProvinceNameByCode(code) {
      let name = ""
      if (code) {
        let arr = (this.sheng||[]).filter(item => item.code == code)
        if (arr && arr.length) {
          name = arr[0].name
        }
      }
      return name
    },
    getCityNameByCode(cityCode, code) {
      let name = ""
      if (cityCode && code && this.shi && this.shi[cityCode]) {
        let arr = this.shi[cityCode].filter(item => item.code == code)
        if (arr && arr.length) {
          name = arr[0].name
        }
      }
      return name
    },
    getCountyNameByCode(cityCode, code) {
      let name = ""
      if (cityCode && code && this.qu &&  this.qu[cityCode]) {
        let arr = this.qu[cityCode].filter(item => item.code == code)
        if (arr && arr.length) {
          name = arr[0].name
        }
      }
      return name
    },
    setCode(type, code) {
      this[type] = code + ""
    },
    splitCode() {
      const code = this.sCode
      let province = "",
        city = "",
        county = ""
      if (code) {
        province = code.slice(0, 2) + "0000"
        city = code.slice(0, 4) + "00"
        county = code
      }
      return [province, city, county]
    }
  },
  mounted() {
    this.emit(...this.splitCode())
  },
  watch: {
    province(v) {
      this.sheng = v
      // this.$nextTick(() => {
      //   this.emit(...this.splitCode())
      // })
    },
    city(v) {
      this.shi = v
      // this.$nextTick(() => {
      //   this.emit(...this.splitCode())
      // })
    },
    county(v) {
      this.qu = v
      // this.$nextTick(() => {
      //   this.emit(...this.splitCode())
      // })
    },
    sCode(val, oldVal) {
      // console.log(val,oldVal)
      if (val != oldVal) {
        if (val && val.length === 6) {
          this.emit(...this.splitCode())
        } else {
          // this.curProvince = '';this.curCity = '';this.curCounty = '';
          this.emit("", "", "")
        }
      }
    },
    curProvince(n, old) {
      if (n == old) return
      if (n == this.splitCode()[0]) return
      if (n) {
        this.$emit("codeChange", n)
        //不需要再调用this.emit，因为给code赋值后，会触发watcher:sCode方法
      }
    },
    curCity(n, old) {
      if (n == old) return
      if (n == this.splitCode()[1]) return
      if (n) {
        this.$emit("codeChange", n)
      }
    },
    curCounty(n, old) {
      if (n == old) return
      if (n === this.splitCode()[2]) return
      if (n) {
        this.$emit("codeChange", n)
      }
    }
  }
}
</script>
