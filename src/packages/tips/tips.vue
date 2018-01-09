<template>
  <div class="k-tips"
    v-if="visible"
    :style="styles">
    <div class="k-tips__tag">
      <i :class="[
        'k-tips__icon',
        ['k-tips__icon--'+type]
        ]"></i>
    </div>
    <div v-html="content" class="k-tips__cont"></div>
  </div>
</template>
<script>
  const baseStyle = {
    "min-width":'180px',
    "min-height":'120px',
    "max-width":'300px',
    "max-height":'200px'
  };
  const baseContent = '操作完成';
  import { merge } from 'karma-ui/util/object.js';
  export default {
    data() {
      return {
        visible:true,
        content:baseContent,
        styles: baseStyle,
        type:'success',//'error','warning'
        timer:null
      }
    },
    methods: {
      setType(type) {
        if(type) {
          this.type = type
        }else{
          this.type = 'success'
        }
        return this;
      },
      setStyle(styleObj) {
        this.styles = merge({},baseStyle,styleObj);
        return this;
      },
      setContent(cont) {
        if(cont) {
          this.content = cont
        }else{
          this.content = baseContent
        }
        return this;
      },
      show() {
        clearTimeout(this.timer);
        this.visible = true;
        return this;
      },
      hide(time) {
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.visible = false
        },time);
        return this;
      }
    }
  }
</script>
