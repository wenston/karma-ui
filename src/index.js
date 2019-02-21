import setProps from 'karma-ui/util/setPropsGlobal.js'
import 'karma-ui/theme/index.css'
import 'karma-ui/theme/font/iconfont.css'
import KButton from 'karma-ui/packages/button/index.js'
import KInput from 'karma-ui/packages/input/index.js'
import KSelect from 'karma-ui/packages/select/index.js'
import KSelect2 from 'karma-ui/packages/select2/index.js'
import KOption from 'karma-ui/packages/option/index.js'
import KRadio from 'karma-ui/packages/radio/index.js'
import KCheckbox from 'karma-ui/packages/checkbox/index.js'
import KInputNumber from 'karma-ui/packages/input-number/index.js'
import KArea from 'karma-ui/packages/area/index.js'
import KPopup from 'karma-ui/packages/popup/index.js'
import Dialog from 'karma-ui/packages/dialog/index.js'
import KCarousel from 'karma-ui/packages/carousel/index.js'
import KCarouselItem from 'karma-ui/packages/carousel-item/index.js'
import Tips from 'karma-ui/packages/tips/index.js'
import Loading from 'karma-ui/packages/loading/index.js'
import KToTop from 'karma-ui/packages/to-top/index.js'
import KPagination from 'karma-ui/packages/pagination/index.js'
import KDatePicker from 'karma-ui/packages/date-picker/index.js'
import KScrollbar from 'karma-ui/packages/scrollbar/index.js'
import KTransition from 'karma-ui/packages/transition/index.js'
import KTable from 'karma-ui/packages/table/index.js'
import KLayer from 'karma-ui/packages/layer/index.js'
import KIcon from 'karma-ui/packages/icon/index.js'
import KAutoComplete from 'karma-ui/packages/auto-complete/index.js'
//指令
import Dnd from 'karma-ui/directives/dnd/index.js'
import Pin from 'karma-ui/directives/pin/index.js'
import Viewable from 'karma-ui/directives/viewable/index.js'

let obj = {
  KButton,
  KInput,
  KSelect,
  KSelect2,
  KOption,
  KRadio,
  KCheckbox,
  KInputNumber,
  KArea,
  KPopup,
  Dialog,
  KToTop,
  KIcon,
  Tips,
  Loading,
  Dnd,
  Pin,
  KCarousel,
  KCarouselItem,
  Viewable,
  KPagination,
  KDatePicker,
  KScrollbar,
  KTransition,
  KTable,
  KLayer,
  KAutoComplete
}

export default {
  install(Vue,opts = {}) {
    for (let comp in obj) {
      setProps(obj[comp],opts[comp])
      Vue.use(obj[comp], opts)
    }
  }
}
