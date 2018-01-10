<template>
  <i :class="[
    'k-loading-icon',
    ['k-loading-icon--'+size],
    ]"></i>
</template>

<script>
export default {
 props: {
   size: {
     type:String,
     default:'huge'//huge,large,big,medium,small,mini
   }
 }
}
</script>
