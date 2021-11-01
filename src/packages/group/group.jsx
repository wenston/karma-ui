// export default {
//   functional: true,
//   name: 'KGroup',
//   render(h,ctx) {
//     return <div class="k-group">{ctx.slots().default}</div>
//   }
// }

export default {
  name: 'KGroup',
  render() {
    return <div class="k-group">{this.$slots.default}</div>
  }
}