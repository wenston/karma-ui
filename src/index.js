import 'karma-ui/theme/index.css';
import KButton from 'karma-ui/packages/button/index.js';
import KInput from 'karma-ui/packages/input/index.js';
import KSelect from 'karma-ui/packages/select/index.js';
import KOption from 'karma-ui/packages/option/index.js';
import KRadio from 'karma-ui/packages/radio/index.js';
import KCheckbox from 'karma-ui/packages/checkbox/index.js';
import KInputNumber from 'karma-ui/packages/input-number/index.js';
import KArea from 'karma-ui/packages/area/index.js';
import KPopup from 'karma-ui/packages/popup/index.js';
import KCarousel from 'karma-ui/packages/carousel/index.js';
import KCarouselItem from 'karma-ui/packages/carousel-item/index.js';
import Tips from 'karma-ui/packages/tips/index.js';
import Loading from 'karma-ui/packages/loading/index.js';
//css图标
import KIcon from 'karma-ui/icon/css/index.js';
//指令
import Dnd from 'karma-ui/directives/dnd/index.js';
import Pin from 'karma-ui/directives/pin/index.js';

let obj = {
  KButton,
  KInput,
  KSelect,
  KOption,
  KRadio,
  KCheckbox,
  KInputNumber,
  KArea,
  KPopup,
  KIcon,
  Tips,
  Loading,
  Dnd,
  Pin,
  KCarousel,
  KCarouselItem,
};

export default {
  install(Vue,opts) {
    for (let comp in obj) {
      Vue.use(obj[comp])
    }
  }
}
