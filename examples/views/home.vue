<template>
  <div class="home">
    <k-scrollbar class="home__nav"
      tag="nav"
      :track-style="{
        backgroundColor:'rgba(0,0,0,.1)'
      }"
      :thumb-style="{
        backgroundColor: 'rgba(0,0,0,.2)'
      }">
      <ul>
        <template v-for="(v,k) in nav">
          <li :key="k"
            class="home__subtitle">
            <span>{{k==='components'?'组件':'指令'}}</span>
          </li>
          <li v-for="item in v"
            :key="item.name">
            <router-link active-class="home__currentnav"
              :to="{name:item.name}">{{item.title}}</router-link>
          </li>
        </template>
      </ul>
    </k-scrollbar>
    <!-- <k-scrollbar class="home__content"
      ref="scrollbar"
      @scroll="onScroll"> -->
    <div class="home__content">
      <router-view @view-updated="pageUpdated"
        @scroll-into-view="scrollIntoView($event)"></router-view>
    </div>
    <!-- </k-scrollbar> -->
    <!-- <k-to-top></k-to-top> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: {
        components: [
          {
            name: "button",
            title: "button 按钮",
          },
          {
            name: "input",
            title: "input 输入框",
          },
          {
            name: "input-number",
            title: "input-number 计数器",
          },
          {
            name: "radio",
            title: "radio 单选框",
          },
          {
            name: "checkbox",
            title: "checkbox 复选框",
          },
          {
            name: "switch",
            title: "switch 开关",
          },
          {
            name: "select",
            title: "select 下拉单选",
          },
          {
            name: "select2",
            title: "select2 下拉多选",
          },
          {
            name: "auto-complete",
            title: "auto-complete 自动完成",
          },
          {
            name: "area",
            title: "area 区域选择",
          },
          {
            name: "carousel",
            title: "carousel 轮播图",
          },
          {
            name: "icon",
            title: "icon 图标",
          },
          {
            name: "loading",
            title: "loading 加载中",
          },
          {
            name: "popup",
            title: "popup 弹出框",
          },
          {
            name: "dialog",
            title: "dialog 对话框",
          },
          {
            name: "pagination",
            title: "pagination 分页器",
          },
          {
            name: "date-picker",
            title: "date-picker 日期选择器",
          },
          {
            name: "scrollbar",
            title: "scrollbar 滚动条",
          },
          {
            name: "transition",
            title: "transition 过渡动画",
          },
          {
            name: "table",
            title: "table 表格",
          },
          {
            name: "table2",
            title: "table2 增强型表格",
          },
          {
            name: "tips",
            title: "tips 提示",
          },
          {
            name: "tree",
            title: "tree 树",
          },
          {
            name: "dropdown",
            title: "dropdown 下拉展示板",
          },
          {
            name: "board",
            title: "board 动态展板",
          },
          {
            name: "selectTree",
            title: "selectTree 下拉树形选择器",
          },
          {
            name: "drawer",
            title: "drawer 抽屉式弹出层",
          },
          {
            name: "group",
            title: "group 控件组",
          },
        ],
        directives: [
          {
            name: "viewable",
            title: "viewable 可视区判断",
          },
        ],
      },
    };
  },
  methods: {
    onScroll(obj) {
      // console.log(obj)
    },
    pageUpdated() {
      console.log("检测到了");
      this.$refs.scrollbar.reset();
    },
    scrollIntoView(elem) {
      this.$refs.scrollbar.scrollIntoView(elem);
    },
  },
};
</script>

