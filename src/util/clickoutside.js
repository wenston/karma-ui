import Vue from 'vue';
const clickoutsideContext = '___clickoutside';
export default {
  bind(el, binding) {
    const fn = (e) => {
      if (el.contains(e.target)) {
        return null
      } else {
        el[clickoutsideContext].bindingFn(e)
      }
    };
    el[clickoutsideContext] = {
      documentHandler:fn,
      methodName:binding.expression,
      bindingFn:binding.value
    }
    document.addEventListener('click', el[clickoutsideContext].documentHandler)
  },
  update(el,binding) {
    el[clickoutsideContext].methodName = binding.expression;
    el[clickoutsideContext].bindingFn = binding.value;
  },
  unbind(el) {
    document.removeEventListener('click', el[clickoutsideContext].documentHandler);
    delete el[clickoutsideContext];
  }
}
