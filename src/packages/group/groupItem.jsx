// export default {
//   functional: true,
//   name: 'KGroupItem',
//   render(h,ctx) {
//     return <div class="k-group-item">{ctx.slots().default}</div>
//   }
// }

export default {
  name: 'KGroupItem',
  render() {
    return <div class="k-group-item">{this.$slots.default}</div>
  }
}