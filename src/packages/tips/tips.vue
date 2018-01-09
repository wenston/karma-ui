<template>
<transition
  :enter-to-class="css.enterTo"
  :leave-to-class="css.enter">
  <div :class="css.tips"
    v-if="visible"
    :style="styles">
    <div :class="css.tag">
      <i :class="[
        css.icon,
        css[type]
        ]"></i>
    </div>
    <div v-html="content" :class="css.cont"></div>
  </div>
</transition>
</template>
<script>
  const baseStyle = {
    "min-width":'180px',
    "min-height":'120px',
    "max-width":'300px',
    "max-height":'200px'
  };
  const baseContent = '操作完成';
  import { merge } from '../util/object.js';
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
<style module="css" lang="scss">
@import '../style/var.scss';
//如果定义了全局scss变量，则全局变量起作用，且var.scss中所有的变量会失效
.enter {
  transform:scale(1.05,1.05);
  opacity:0;
}
.enter-to {
  opacity:1;
}

.tips {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  margin: auto;
  background-color: rgba(60,70,80, 0.8);
  box-shadow: 0 3px 10px rgba(0,0,0,.2);
  z-index: 100000000;
  border-radius: 4px;
  transition: 0.2s ease-out;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  transform: translate(-50%,-50%);
  .tag {
    text-align:center;
    .icon {
      display:inline-block;
      position: relative;
      width: 44px;
      height: 44px;
      border: {
        radius:100%;
        width:4px;
        style:solid;
      }
      transition:.25s;
    }
    .success {
      border-color: $z-color-primary;
      &:after {
        content:'';
        position: absolute;
        border: {
          style: solid;
          color: transparent transparent $z-color-primary $z-color-primary;
          width: 0 0 4px 4px;
        };
        border-radius: 4px;
        width: 20px;
        height: 12px;
        transform: rotate(-50deg);
        top:0;
        bottom:0;
        right: 0;
        left: 0;
        margin: auto;
      }
    }
    .error {
      border-color:$z-color-danger;
      &:after,
      &:before {
        content:'';
        position: absolute;
        height: 4px;
        width: 20px;
        background-color:$color-danger;
        border-radius: 4px;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        margin:auto;
      }
      &:after {
        transform: rotate(45deg);
      }
      &:before {
        transform: rotate(-45deg);
      }
    }
    .warning {
      border-color:$z-color-warning;
      &:after,
      &:before {
        content:'';
        position: absolute;
        background-color:$z-color-warning;
      }
      &:after {
        width: 6px;
        height: 6px;
        border-radius: 100%;
        left: 0;
        right: 0;
        margin:auto;
        top:18%;
      }
      &:before {
        width: 4px;
        height: 15px;
        border-top-left-radius: 4px;
        border-bottom-right-radius: 4px;
        left: 0;
        right: 0;
        margin:auto;
        top:60%;
        bottom:12px;
      }
    }
  }
  .cont {
    color:#fcfcfc;
    font-size: 14px;
    text-align: center;
  }
}
</style>