<template>
  <div class="k-area">
    <k-select v-model="curProvince"
      :styles="selectStyle"
      placeholder="省/直辖市">
      <k-option v-for="item in province"
        :key="item.code"
        :value="item.code"
        :label="item.name"
        :selected="item.code==curProvince">{{item.name}}</k-option>
    </k-select>
    <k-select v-model="curCity"
      :styles="selectStyle"
      placeholder="市/区">
      <k-option v-for="item in city[curProvince]"
        :key="item.code"
        :value="item.code"
        :label="item.name"
        :selected="item.code==curCity">{{item.name}}</k-option>
    </k-select>
    <k-select v-model="curCounty"
      :styles="selectStyle"
      placeholder="区/县">
      <k-option v-for="item in county[curCity]"
        :key="item.code"
        :value="item.code"
        :label="item.name"
        :selected="item.code==curCounty">{{item.name}}</k-option>
    </k-select>
  </div>
</template>

<script>
import { province, city, county } from "./areaData.js";
import KSelect from 'karma-ui/packages/select/select.vue';
import KOption from 'karma-ui/packages/option/option.vue';
/**
 * //todo
 * 1. 显式引入select 和 option组件会报错！
 * There are multiple modules with names that only differ in casing.
 * 为什么？
 */
export default {
  name: "KArea",
  components: {
    KSelect,KOption
  },
  data() {
    return {
      province,
      city,
      county,
      curProvince: "",
      curCity: "",
      curCounty: "",
      selectStyle: {
        width:'90px'
      }
    };
  },
  model: {
    prop: "codecode",
    event: "codecodebian"
  },
  props: {
    codecode: [String, Number],
    // code: [String, Number]
  },
  computed: {
    sCode() {
      return this.codecode + "";
    }
  },
  methods: {
    emit(provinceCode, cityCode, countyCode) {
      // console.log(provinceCode, cityCode, countyCode)
      let pname = this.getProvinceNameByCode(provinceCode);
      let cityName = this.getCityNameByCode(provinceCode, cityCode);
      let countyName = this.getCountyNameByCode(cityCode, countyCode);
      this.setCode("curProvince", pname ? provinceCode : "");
      this.setCode("curCity", cityName ? cityCode : "");
      this.setCode("curCounty", countyName ? countyCode : "");
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
      ]);
    },
    getProvinceNameByCode(code) {
      let name = "";
      if (code) {
        let arr = this.province.filter(item => item.code == code);
        if (arr && arr.length) {
          name = arr[0].name;
        }
      }
      return name;
    },
    getCityNameByCode(cityCode, code) {
      let name = "";
      if (cityCode && code && this.city[cityCode]) {
        let arr = this.city[cityCode].filter(item => item.code == code);
        if (arr && arr.length) {
          name = arr[0].name;
        }
      }
      return name;
    },
    getCountyNameByCode(cityCode, code) {
      let name = "";
      if (cityCode && code && this.county[cityCode]) {
        let arr = this.county[cityCode].filter(item => item.code == code);
        if (arr && arr.length) {
          name = arr[0].name;
        }
      }
      return name;
    },
    setCode(type, code) {
      this[type] = code + "";
    },
    splitCode() {
      const code = this.sCode;
      let province = "",
        city = "",
        county = "";
      if (code) {
        province = code.slice(0, 2) + "0000";
        city = code.slice(0, 4) + "00";
        county = code;
      }
      return [province, city, county];
    },

  },
  mounted() {
    this.emit(...this.splitCode());
  },
  watch: {
    sCode(val, oldVal) {
      if (val != oldVal) {
        if (val && val.length === 6) {
          this.emit(...this.splitCode());
        } else {
          // this.curProvince = '';this.curCity = '';this.curCounty = '';
          this.emit('','','')
        }
      }
    },
    curProvince(n, old) {
      if (n == old) return;
      if(n == this.splitCode()[0]) return;
      if (n) {
        this.$emit('codecodebian',n)
        //不需要再调用this.emit，因为给codecode赋值后，会触发watcher:sCode方法
      }
    },
    curCity(n,old) {
      if(n==old) return;
      if(n==this.splitCode()[1]) return;
      if(n) {
        this.$emit('codecodebian',n)
      }
    },
    curCounty(n,old) {
      if(n==old) return;
      if(n===this.splitCode()[2]) return;
      if(n) {
        this.$emit('codecodebian',n)
      }
    }
  }
};
</script>
