import { Dnd } from './Dnd.js';
export default {
  bind(el, binding) {
    const m = binding.modifiers
    el.instance = new Dnd(
      el,
      binding.value && binding.value.handlerClass ?
        el.querySelector('.' + binding.value.handlerClass) : el,
      {
        parent: m && m.parent ? m.parent : document.body,
        limit: m && m.limit
      }
    )
  },
  unbind(el, binding) {
    el.instance.destroy();
    delete el.instance;
  }
}