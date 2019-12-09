export default {
  functional: true,
  name: 'KGroupItem',
  render(h,ctx) {
    return <div class="k-group-item">{ctx.slots().default}</div>
  }
}