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
     <i class={{
       'k-loading__icon': true,
       'k-icon-spinner2': true,
       [`k-loading--${this.size}`]: true
     }}></i>
   )
 }
}
</script>
