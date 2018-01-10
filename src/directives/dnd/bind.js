import {Dnd} from './Dnd.js';
export default {
  bind(el, binding) {
    el.instance = new Dnd(
      el,
      el.querySelector('.'+binding.value.handlerClass)
    )
  },
  unbind(el, binding) {
    el.instance.destroy();
    delete el.instance;
  }
}