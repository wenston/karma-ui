//身份证号
export const idNumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
//固定电话号码
export const telephone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
//手机号码
export const mobile = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
//只允许数字
export const number = /^[0-9]*$/;
//0到2位小数的正实数，包括0
export const numberFloat = /^[0-9]+(.[0-9]{0,2})?$/;
//非0正整数
export const nonzeroInt = /^\+?[1-9][0-9]*$/;
//非负整数 包括0
export const nonnegativeInt = /^\d+$/;
//非负浮点数 包括0
export const nonnegativeFloat = /^\d+(\.\d+)?$/;
//正浮点数
export const float = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;

//两位小数，金额正则 ，包括0
export const currency = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/;
//0到2位小数，大于0 不等于0
export const nonzeroCurrency = /^-?(?!0+(\.0*)?$)\d+(\.\d{0,2})?$/;

//汉字
export const chinese = /^[\u4e00-\u9fa5],{0,}$/;

//密码 以字母开头，6-18位
export const password = /^[a-zA-Z]\w{5,17}$/;
//邮箱
export const email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
