<template>
  <div class="layout">
    <h3 class="layout__title">图标</h3>
    <div>
      <p>图标分两种：①font图标,②css图标
      </p>
    </div>
    <h4 class="layout__title">font图标</h4>
    <ul :class="css.flex">
      <li>
        <i class="k-icon-add"></i>
        <div :class="css.clsname">
          .k-icon-add
        </div>
      </li>
      <li>
        <i class="k-icon-minus"></i>
        <div :class="css.clsname">
          .k-icon-minus
        </div>
      </li>
      <li>
        <i class="k-icon-plus-square"></i>
        <div :class="css.clsname">
          .k-icon-plus-square
        </div>
      </li>
      <li>
        <i class="k-icon-minus-square"></i>
        <div :class="css.clsname">
          .k-icon-minus-square
        </div>
      </li>
      <li>
        <i class="k-icon-check"></i>
        <div :class="css.clsname">
          .k-icon-check
        </div>
      </li>
      <li>
        <i class="k-icon-x"></i>
        <div :class="css.clsname">
          .k-icon-x
        </div>
      </li>
      <li>
        <i class="k-icon-cached"></i>
        <div :class="css.clsname">
          .k-icon-cached
        </div>
      </li>
      <li>
        <i class="k-icon-arrow_drop_down"></i>
        <div :class="css.clsname">.k-icon-arrow_drop_down</div>
      </li>
      <li>
        <i class="k-icon-arrow_drop_up"></i>
        <div :class="css.clsname">.k-icon-arrow_drop_up</div>
      </li>
      <li>
        <i class="k-icon-phone"></i>
        <div :class="css.clsname">.k-icon-phone</div>
      </li>
      <li>
        <i class="k-icon-cancel"></i>
        <div :class="css.clsname">.k-icon-cancel</div>
      </li>
      <li>
        <i class="k-icon-check_circle"></i>
        <div :class="css.clsname">.k-icon-check_circle</div>
      </li>
      <li>
        <i class="k-icon-error"></i>
        <div :class="css.clsname">.k-icon-error</div>
      </li>
      <li>
        <i class="k-icon-keyboard_arrow_down"></i>
        <div :class="css.clsname">.k-icon-keyboard_arrow_down</div>
      </li>
      <li>
        <i class="k-icon-keyboard_arrow_left"></i>
        <div :class="css.clsname">.k-icon-keyboard_arrow_left</div>
      </li>
      <li>
        <i class="k-icon-keyboard_arrow_right"></i>
        <div :class="css.clsname">.k-icon-keyboard_arrow_right</div>
      </li>
      <li>
        <i class="k-icon-keyboard_arrow_up"></i>
        <div :class="css.clsname">.k-icon-keyboard_arrow_up</div>
      </li>
      <li>
        <i class="k-icon-notifications"></i>
        <div :class="css.clsname">.k-icon-notifications</div>
      </li>
      <li>
        <i class="k-icon-person"></i>
        <div :class="css.clsname">.k-icon-person</div>
      </li>
      <li>
        <i class="k-icon-visibility"></i>
        <div :class="css.clsname">.k-icon-visibility</div>
      </li>
      <li>
        <i class="k-icon-unfold_more"></i>
        <div :class="css.clsname">.k-icon-unfold_more</div>
      </li>
      <li>
        <i class="k-icon-cloud"></i>
        <div :class="css.clsname">.k-icon-cloud</div>
      </li>
      <li>
        <i class="k-icon-star"></i>
        <div :class="css.clsname">.k-icon-star</div>
      </li>
      <li>
        <i class="k-icon-settings"></i>
        <div :class="css.clsname">.k-icon-settings</div>
      </li>
      <li>
        <i class="k-icon-pen"></i>
        <div :class="css.clsname">.k-icon-pen</div>
      </li>
      <li>
        <i class="k-icon-like"></i>
        <div :class="css.clsname">.k-icon-like</div>
      </li>
      <li>
        <i class="k-icon-calendar"></i>
        <div :class="css.clsname">.k-icon-calendar</div>
      </li>
      <li>
        <i class="k-icon-dots-three-horizontal"></i>
        <div :class="css.clsname">.k-icon-dots-three-horizontal</div>
      </li>
      <li>
        <i class="k-icon-circle-with-minus"></i>
        <div :class="css.clsname">.k-icon-circle-with-minus</div>
      </li>
      <li>
        <i class="k-icon-circle-with-plus"></i>
        <div :class="css.clsname">.k-icon-circle-with-plus</div>
      </li>
      <li>
        <i class="k-icon-lock-open"></i>
        <div :class="css.clsname">.k-icon-lock-open</div>
      </li>
      <li>
        <i class="k-icon-lock"></i>
        <div :class="css.clsname">.k-icon-lock</div>
      </li>
      <li>
        <i class="k-icon-search"></i>
        <div :class="css.clsname">.k-icon-search</div>
      </li>
      <li>
        <i class="k-icon-share"></i>
        <div :class="css.clsname">.k-icon-share</div>
      </li>
      <li>
        <i class="k-icon-signal"></i>
        <div :class="css.clsname">.k-icon-signal</div>
      </li>
      <li>
        <i class="k-icon-home"></i>
        <div :class="css.clsname">.k-icon-home</div>
      </li>
      <li>
        <i class="k-icon-profile"></i>
        <div :class="css.clsname">.k-icon-profile</div>
      </li>
      <li>
        <i class="k-icon-qrcode"></i>
        <div :class="css.clsname">.k-icon-qrcode</div>
      </li>
      <li>
        <i class="k-icon-location"></i>
        <div :class="css.clsname">.k-icon-location</div>
      </li>
      <li>
        <i class="k-icon-alarm"></i>
        <div :class="css.clsname">.k-icon-alarm</div>
      </li>
      <li>
        <i class="k-icon-bubbles4"></i>
        <div :class="css.clsname">.k-icon-bubbles4</div>
      </li>
      <li>
        <i class="k-icon-user"></i>
        <div :class="css.clsname">.k-icon-user</div>
      </li>
      <li>
        <i class="k-icon-spinner"></i>
        <div :class="css.clsname">.k-icon-spinner</div>
      </li>
      <li>
        <i class="k-icon-stats-bars"></i>
        <div :class="css.clsname">.k-icon-stats-bars</div>
      </li>
      <li>
        <i class="k-icon-list"></i>
        <div :class="css.clsname">.k-icon-list</div>
      </li>
      <li>
        <i class="k-icon-switch"></i>
        <div :class="css.clsname">.k-icon-switch</div>
      </li>
      <li>
        <i class="k-icon-bin"></i>
        <div :class="css.clsname">.k-icon-bin</div>
      </li>
      <li>
        <i class="k-icon-flag"></i>
        <div :class="css.clsname">.k-icon-flag</div>
      </li>
      <li>
        <i class="k-icon-spinner2"></i>
        <div :class="css.clsname">.k-icon-spinner2</div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {

}
</script>

<style module="css">
ul.flex {
  display:flex;
  flex-wrap:wrap;
  li {
    list-style-type: none;
    padding:15px;
    text-align:center;
    
    width:8em;
    .clsname {
      font-size: 12px;
    }
    i[class^=k-icon] {
      font-size: 20px;
      transition:.3s;
    }
    &:hover {
      i[class^=k-icon] {
        transform:scale(2,2);
        /* font-size: 30px; */
      }
    }
  }
}
</style>
