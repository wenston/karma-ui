<script>
export default {
 props: {
   size: {
     type:String,
     default:'huge'//huge,large,big,medium,small,mini
   }
 },
 render() {
   return (
     <i class="k-icon-spinner2" size={this.size}></i>
   )
 }
}
</script>
