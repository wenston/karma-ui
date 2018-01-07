<script>
// import LoadingIcon from '../zLoading/loadingIcon.vue';
export default {
  name:'KButton',
  // components: {
  //   LoadingIcon
  // },
  props: {
    tag: {
      type:String,
      default:'button'
    },
    type: {
      type:String,
      default:'default'//primary,warning,danger,default
    },
    size: {
      type:String,
      default:'medium'//huge,large,big,medium,small,mini
    },
    block:Boolean,
    disabled: Boolean,
    loading: Boolean,
    href:String,
    target:String
  },
  render() {
    let LoadingComp = null;
    let Content = null;
    if(this.loading) {
      LoadingComp = (
        <LoadingIcon size={this.size}
        class={{[this.css.loading]:true}} />
      )
    }
    if(this.$slots.default) {
      Content = <span>{this.$slots.default}</span>
    }
    return (
      <this.tag  
        href={this.href}
        target={this.target}
        class={{
          [this.css.btn]:true,
          [this.css.btnDefault]:this.type==='default',
          [this.css.btnPrimary]:this.type==='primary',
          [this.css.btnWarning]:this.type==='warning',
          [this.css.btnDanger]:this.type==='danger',
          [this.css.btnHuge]:this.size==='huge',
          [this.css.btnLarge]:this.size==='large',
          [this.css.btnBig]:this.size==='big',
          [this.css.btnMedium]:this.size==='medium',
          [this.css.btnSmall]:this.size==='small',
          [this.css.btnMini]:this.size==='mini',
          [this.css.btnBlock]:this.block
        }}
        onClick={this._click}
        disabled={this.disabled}>
        {Content}
        {LoadingComp}
      </this.tag>
    )
  },
  methods: {
    _click(e) {
      this.$emit('click',e)
    }
  }
}
</script>

<style module="css" lang="scss">
@import '../style/var.scss';
// 如果webpack配置中配置了全局scss变量，则var.scss中的变量失效
.btn {
  // position: relative;
  display: inline-block;
  padding: .43em 1em;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  text-align: center;
  white-space: nowrap;
  border:1px solid $z-color-input-border;
  border-radius: 2px;
  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;
  transition:.25s;
  outline: 0;
  &+& {
    margin-left:10px;
  }
  &.btn-default {
    background-color:$z-color-default;
    border-color:$z-color-input-border;
    &:not([disabled]) {
      &:hover,
      &:focus {
        border-color:$z-color-primary;
      }
      &:active {
        border-color:darken($z-color-primary,15%);
        box-shadow:inset 1px 3px 5px rgba(0,0,0,.2);
      }
    }
  }
  @each $type,$color in (
    primary:$z-color-primary,
    warning:$z-color-warning,
    danger:$z-color-danger) {
      &.btn-#{$type} {
        background-color:$color;
        border-color:$color;
        color:#fff;
        &:not([disabled]) {
          &:hover,
          &:focus {
            border-color:lighten($color,8%);
            background-color:lighten($color,8%);
          }
          &:active {
            box-shadow:inset 1px 3px 5px rgba(0,0,0,.2);
          }
        }
      }
  }
  &[disabled] {
    pointer-events: none;
    opacity: .5;
    cursor:not-allowed;
  }
  @each $size,$s in (huge:.78em 1.5em,large:.65em 1.2em,big:.6em 1.5em,medium:.43em 1em,small:.42em 1em,mini:.3em .5em) {
    &.btn-#{$size} {
      padding:$s;
      @if $size==huge {
        font-size:18px;
      }
      @if $size==large {
        font-size:16px;
      }
      @if $size==small {
        font-size:12px;
      }
      @if $size==mini {
        font-size:12px;
      }
    }
  }
  &.btn-block {
    display:block;
    width: 100%;
  }
  >span+.loading {

    position: relative;
    top:-4px;
    margin-left:15px;

  }
}

</style>
