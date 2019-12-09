export default {
  functional: true,
  name: 'KGroup',
  render(h,ctx) {
    return <div class="k-group">{ctx.slots().default}</div>
  }
}