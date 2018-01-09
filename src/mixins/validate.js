
import * as reg from 'karma-ui/util/reg/index.js';
// import tips from 'karma-ui/packages/tips/index.js';
import {merge} from 'karma-ui/util/object.js';
const baseOpts = {
  type:void 0,//验证类型：如身份证是idnumber
  when:'change',//验证时机
  message:'',//错误时给出的提示信息
  showTips:true,//是否显示提示
  useOldValue: false,//如果输入的无效，是否用oldValue填充，最好配合input事件
  digits:2,//小数位数，只有验证小数的时候才有效
};
export const validate = {
  props: {
    validate: Object
  },
  computed: {
    validateOptions() {
      return merge({},baseOpts,this.validate)
    }
  },
  methods: {
    validate_number(val) {//验证数字。是数字返回true
      return reg.number.test(val)
    },
    validate_digits(val) {//验证小数位数，返回的是小数位数。如果非数字或者小数有问题，返回 -1
      let v = parseFloat(val);
      let stringV = val + '';
      if(typeof v === "number") {
        let arr = stringV.split('.');
        if(arr.length===1) {
          return 0//此时是整数
        }else if(arr.length>2) {
          return -1//此时小数有问题
        }else{
          return arr[1].length
        }
      }
      return -1
    },
    toValidate(val,successCallback,errorCallback) {
      if(val==='' || typeof val === undefined) return;
      let errorType = null;//保存错误类型，在errorCallback中当做参数返回
      /**
       * 错误类型列表：
       * 1.{digits:n} //小数位数应该是n
       * 2.{clear:true} //告诉回调清空输入框
       * 其他错误类型待添加
       */
      let type = this.validateOptions.type.toLowerCase();
      let msg = this.validateOptions.message;
      let fail = false;
      if(type==='idnumber') {
        if(!reg.idNumber.test(val)) {
          msg = msg || '身份证号码不合法';
          fail = true;
        }
      }else if(type==='currency>0') {//不为0的金额，保留两位小数
        if(!reg.nonzeroCurrency.test(val)) {
          msg = msg || '金额不符合规则';
          if(!this.validate_number()) {
            msg = '不能包含字母或者特殊字符'
          }else{
            val = val+'';
            let len = val.split('.')[1];
            if(len && len.length>2) {
              msg = '请保留两位小数'
            }
          }
          fail = true;
        }
      }else if(type === 'currency>=0') {//可以为0的金额，默认保留两位小数
        if(reg.nonnegativeFloat.test(val)) {//如果是非负数
          let d = this.validate_digits(val);//获取小数位数
          if(d>this.validateOptions.digits) {
            msg = `请保留0-${this.validateOptions.digits}位小数`;
            errorType = {digits:this.validateOptions.digits};
            fail = true;
          }
        }else{
          msg = '请输入正数';
          errorType = {clear:true};
          fail = true;
        }
      }else if(type === 'int>0') {//大于0 的正整数
        if(!reg.nonzeroInt.test(val)) {
          msg = '请填写大于0的数值'
          fail = true;
          if(!this.validate_number()) {
            msg = '不能包含字母或者特殊字符'
          }
        }
      }

      // this.validateOptions.showTips && fail && this.$tips()
      //   .setContent(msg)
      //   .setType('error')
      //   .hide(2500);

      !fail && successCallback && successCallback();
      fail && errorCallback && errorCallback(errorType);
    }
  }
}