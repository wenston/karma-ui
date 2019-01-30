import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component(res) {
        import("../views/home.vue").then(comp => res(comp))
      },
      children: [
        {
          path: "/button",
          name: "button",
          component(res) {
            import("../views/button.vue").then(comp => res(comp))
          }
        },
        {
          path: "/input",
          name: "input",
          component(res) {
            import("../views/input.vue").then(comp => res(comp))
          }
        },
        {
          path: "/input-number",
          name: "input-number",
          component(res) {
            import("../views/input-number.vue").then(comp => res(comp))
          }
        },
        {
          path: "/radio",
          name: "radio",
          component(res) {
            import("../views/radio.vue").then(comp => res(comp))
          }
        },
        {
          path: "/checkbox",
          name: "checkbox",
          component(res) {
            import("../views/checkbox.vue").then(comp => res(comp))
          }
        },
        {
          path: "/select",
          name: "select",
          component(res) {
            import("../views/select.vue").then(comp => res(comp))
          }
        },
        {
          path: "/select2",
          name: "select2",
          component(res) {
            import("../views/select2.vue").then(comp => res(comp))
          }
        },
        {
          path: "/area",
          name: "area",
          component(res) {
            import("../views/area.vue").then(comp => res(comp))
          }
        },
        {
          path: "/carousel",
          name: "carousel",
          component(res) {
            import("../views/carousel.vue").then(comp => res(comp))
          }
        },
        {
          path: "/viewable",
          name: "viewable",
          component(res) {
            import("../views/viewable.vue").then(comp => res(comp))
          }
        },
        {
          path: "/icon",
          name: "icon",
          component(res) {
            import("../views/icon.vue").then(comp => res(comp))
          }
        },
        {
          path: "/loading",
          name: "loading",
          component(res) {
            import("../views/loading.vue").then(comp => res(comp))
          }
        },
        {
          path: "/popup",
          name: "popup",
          component(res) {
            import("../views/popup.vue").then(comp => res(comp))
          }
        },
        {
          path: "/dialog",
          name: "dialog",
          component(res) {
            import("../views/dialog.vue").then(comp => res(comp))
          }
        },
        {
          path: "/pagination",
          name: "pagination",
          component(res) {
            import("../views/pagination.vue").then(comp => res(comp))
          }
        },
        {
          path: "/date-picker",
          name: "date-picker",
          component(res) {
            import("../views/date-picker.vue").then(comp => res(comp))
          }
        },
        {
          path: "/scrollbar",
          name: "scrollbar",
          component(res) {
            import("../views/scrollbar.vue").then(comp => res(comp))
          }
        },
        {
          path: "/transition",
          name: "transition",
          component(res) {
            import("../views/transition.vue").then(comp => res(comp))
          }
        },
        {
          path: "/table",
          name: "table",
          component(res) {
            import("../views/table.vue").then(comp => res(comp))
          }
        }
      ]
    }
  ]
})
