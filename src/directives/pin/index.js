import {getStyle,scroll,offset,setStyle} from 'karma-ui/util/dom.js';
export default {
  install(Vue,opts) {
    Vue.directive('pin', {
      bind() {
        // console.log('bind pin')
      },
      inserted(el, binding) {
        // console.log('insert pin')
        //参数
        const arg = parseFloat(binding.arg)||0;
        //吸顶后的样式：binding.value
        const style = binding.value;
        //注意：不一定会插入到dom中！
        const parentNode = el.parentNode;
        let elWidth = -1;
        const position = getStyle(el,'position');
        let elTop = -1;
        el.___zPinFn = (e) => {

          // debugger;
          let scrollTop = scroll().top;
          //为什么要用parentNode，因为当页面初始就滚动到了底下时，此时el已经是固定住了，所以计算出的el的offsetTop会不准确。但parentNode不会受影响！
  
          //el本身最好不要有margin-top，因为没有考虑！
  
          //el本身可以有class，但不能有行间样式，因为会被清除！
          let top = offset(parentNode).top;
          // console.log(top)
          let height = getStyle(parentNode,'height');
          // if(top>elTop) {
            elTop = top
          // }
  
          if (scrollTop >= elTop-arg) {
            // if(elWidth<0) 
            elWidth = getStyle(el,'width');
            //修复因吸顶导致的页面高度塌陷进而造成页面的抖动问题
            setStyle(parentNode,{height})
            //
            setStyle(el, {
              position: 'fixed',
              top: arg+'px',
              width: elWidth
            })
            if(style) setStyle(el,style)
          }else{
            el.removeAttribute('style');
          }

          //单独对resize时做处理，由于resize时，el的宽度可能会变化
          if(e.type === 'resize') {
            setStyle(el, {
              width:getStyle(parentNode,'width')
            })
          }
  
        };
        el.___zPinEvent = (type)=>{
          window[type+'EventListener']('scroll', el.___zPinFn);
          window[type+'EventListener']('resize', el.___zPinFn);
        };

        el.___zPinEvent('add');
      },
      componentUpdated(el) {
        
      },
      unbind(el) {
        el.___zPinEvent('remove');
        delete el.___zPinFn;
        delete el.___zPinEvent;
      }
    })
  }
}