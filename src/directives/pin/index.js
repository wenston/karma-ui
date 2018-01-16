import {
  getStyle,
  scroll,
  offset,
  setStyle
} from 'karma-ui/util/dom.js';
export default {
  //指令 - 吸顶或吸底
  install(Vue, opts) {
    Vue.directive('pin', {
      bind() {
        // console.log('bind pin')
      },
      inserted(el, binding) {
        // console.log('insert pin')
        //参数
        const arg = parseFloat(binding.arg) || 0;
        //修饰符
        const modi = binding.modifiers; //{top:true}//{bottom:true}//默认top
        let isTop = false;
        let isBottom = false;
        if (!('top' in modi) && !('bottom' in modi)) {
          isTop = true
        } else {
          isTop = !!modi.top;
          isBottom = !!modi.bottom;
        }
        const style = binding.value; //吸顶后的样式：binding.value
        const parentNode = el.parentNode; //注意：不一定会插入到dom中！
        let elWidth = -1;
        const position = getStyle(el, 'position');
        let elTop = -1;
        let isTopPining = false;
        let isBottomPining = false;
        el.___zPinFn = (e) => {

          let scrollTop = scroll().top;
          //为什么要用parentNode，因为当页面初始就滚动到了底下时，此时el已经是固定住了，所以计算出的el的offsetTop会不准确。但parentNode不会受影响！

          //el本身最好不要有margin-top，因为没有考虑！

          //el本身可以有class，但不能有行间样式，因为会被清除！
          let top = offset(parentNode).top;
          // console.log(top)
          let height = getStyle(parentNode, 'height');
          elTop = top;

          if (isTop) {
            if (scrollTop >= elTop - arg) {
              isTopPining = true;
              // if(elWidth<0) 
              elWidth = getStyle(el, 'width');
              //修复因吸顶导致的页面高度塌陷进而造成页面的抖动问题
              setStyle(parentNode, {
                height
              })
              //
              setStyle(el, {
                position: 'fixed',
                top: arg + 'px',
                bottom: 'auto',
                width: elWidth
              })
              if (style) setStyle(el, style)
            } else {
              isTopPining = false;
              !isBottomPining && el.removeAttribute('style');
            }
          }
          if (isBottom) {
            if (scrollTop + window.innerHeight - parseFloat(height) - arg <= elTop) {
              isBottomPining = true;
              elWidth = getStyle(el, 'width');
              setStyle(parentNode, {
                height
              });
              setStyle(el, {
                position: 'fixed',
                bottom: arg + 'px',
                top: 'auto',
                width: elWidth
              })
              if (style) setStyle(el, style)
            } else {
              isBottomPining = false;
              !isTopPining && el.removeAttribute('style')
            }
          }

          //单独对resize时做处理，由于resize时，el的宽度可能会变化
          if (e.type === 'resize') {
            setStyle(el, {
              width: getStyle(parentNode, 'width')
            })
          }

        };
        el.___zPinEvent = (type) => {
          window[type + 'EventListener']('scroll', el.___zPinFn);
          window[type + 'EventListener']('resize', el.___zPinFn);
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