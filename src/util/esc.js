const esc = '___esc';
const escCode = 27;
export default {
  bind(el, binding) {
    const fn = (e) => {
      if (e.keyCode == escCode) {
        el[esc].bindingFn(e)
      } else {
        return null
      }
    };
    el[esc] = {
      documentFn:fn,
      methodName:binding.expression,
      bindingFn:binding.value
    }
    document.addEventListener('keyup', el[esc].documentFn)
  },
  update(el,binding) {
    el[esc].methodName = binding.expression;
    el[esc].bindingFn = binding.value;
  },
  unbind(el) {
    document.removeEventListener('keyup', el[esc].documentFn);
    delete el[esc];
  }
}