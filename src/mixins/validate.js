import * as reg from 'karma-ui/util/reg/index.js';
// import tips from 'karma-ui/packages/tips/index.js';
import {
  merge
} from 'karma-ui/util/object.js';
const baseOpts = {
  type: void 0, //验证类型：如身份证是idnumber
  when: 'change', //验证时机
  message: '', //错误时给出的提示信息
  showTips: true, //是否显示提示
  useOldValue: false, //如果输入的无效，是否用oldValue填充，最好配合input事件
  digits: 2, //小数位数，只有验证小数的时候才有效
  max: void 0, //最大值
  min: void 0, //最小值
};
export const validate = {
  props: {
    validate: Object
  },
  computed: {
    validateOptions() {
      return merge({}, baseOpts, this.validate)
    },
    needValidate() {
      return (
        this.validate &&
        this.validateOptions.type !== undefined &&
        this.validateOptions.type !== ""
      );
    },
    isIntOrCurrency() {
      let t = this.validateOptions.type
      return this.needValidate && /(int|currency)/.test(t)
    }
  },
  methods: {
    validate_number(val) { //验证数字。是数字返回true
      return reg.number.test(val)
    },
    validate_digits(val) { //验证小数位数，返回的是小数位数。如果非数字或者小数有问题，返回 -1
      let v = parseFloat(val);
      let stringV = val + '';
      if (typeof v === "number") {
        let arr = stringV.split('.');
        if (arr.length === 1) {
          return 0 //此时是整数
        } else if (arr.length > 2) {
          return -1 //此时小数有问题
        } else {
          return arr[1].length
        }
      }
      return -1
    },
    validate_max_min(val) {//验证最大值和最小值
      let fail,msg,errorType;
      if (this.isIntOrCurrency) {
        //验证最大最小值是否超出范围
        if (this.validateOptions.max !== '' && this.validateOptions.max !== undefined) {
          if (this.validateOptions.max < val) {
            errorType = {
              value: this.validateOptions.max
            };
            fail = true;
            msg = '不能超出最大值'
          }
        }
        if (this.validateOptions.min !== '' && this.validateOptions.min !== undefined) {
          if (this.validateOptions.min > val) {
            errorType = {
              value: this.validateOptions.min
            };
            fail = true;
            msg = '不能小于最小值'
          }
        }
      }
      return {
        fail,
        msg,
        errorType
      }
    },
    ["currency>0"](val) {
      let fail,msg,errorType; 
      if (reg.nonnegativeFloat.test(val)) { //如果是非负数
        let d = this.validate_digits(val); //获取小数位数
        if (d > this.validateOptions.digits) {
          msg = `请保留0-${this.validateOptions.digits}位小数`;
          errorType = {
            digits: this.validateOptions.digits
          };
          fail = true;
        }
      } else {
        msg = '请输入正数';
        errorType = {
          clear: true
        };
        fail = true;
      }
      return {fail,msg,errorType};
    },
    toValidate(val, successCallback, errorCallback) {
      if (val === '' || typeof val === undefined) return;
      let errorType = null; //保存错误类型，在errorCallback中当做参数返回
      /**
       * 错误类型列表：告诉错误回调做些什么
       * 1.{digits:n} //小数位数应该是n
       * 2.{clear:true} //清空输入框
       * 3.{value:v}//设置为v
       * 其他错误类型待添加
       */
      let type = this.validateOptions.type.toLowerCase();
      let msg = this.validateOptions.message;
      let fail = false;
      if (type === 'idnumber') {
        if (!reg.idNumber.test(val)) {
          msg = msg || '身份证号码不合法';
          fail = true;
        }
      } else if (type === 'currency>=0' || type === 'currency>0') { 
        let vali = this['currency>0'](val);
        fail = vali.fail;
        msg = vali.msg;
        errorType = vali.errorType;
        if(type === 'currency>0') {
          if(parseFloat(val)===0) {
            fail = true;
            msg = '金额不能为0';
            errorType = {clear:true};
          }
        }
      } else if (type === 'int>0') { //大于0 的正整数
        if (!reg.nonzeroInt.test(val)) {
          msg = '请填写大于0的数值'
          fail = true;
          if (!this.validate_number()) {
            msg = '不能包含字母或者特殊字符'
          }
        }

      }
      let _max_min = this.validate_max_min(val);
      if(_max_min.fail!==undefined) {
        fail = _max_min.fail;
        msg = _max_min.msg;
        errorType = _max_min.errorType;
      }

      this.validateOptions.showTips && fail && this.$tips()
        .setContent(msg)
        .setType('error')
        .hide(2500);

      !fail && successCallback && successCallback();
      fail && errorCallback && errorCallback(errorType);
    }
  }
}