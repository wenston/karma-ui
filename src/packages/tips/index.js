import Vue from 'vue';
import tipsComponent from './tips.vue';
import {merge} from 'karma-ui/util/object.js';
const TipsConstructor = Vue.extend(tipsComponent);
//单例
let instance = null;
tipsComponent.install = (Vue,opts) => {
  // Vue.component(tipsComponent.name,tipsComponent)
  
  Vue.tips = Vue.prototype.$tips = (settings={}) => {
    if(instance === null) {
      instance = new TipsConstructor().$mount();
      document.body.appendChild(instance.$el);
    }
    let opts = {
      content:'',//显示内容，可以写这里，也可以用setContent方法
      style: {},//样式设置，也可以用setStyle方法
      type: 'success'//成功success,错误error,警告warning
    };
    opts = merge({},opts,settings);
    instance.setContent(opts.content)
      .setStyle(opts.style)
      .setType(opts.type)
      .show();

    return instance;
  }
}

export default tipsComponent;