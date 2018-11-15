<template>
  <div class="home">
    <k-scrollbar 
      class="home__nav" 
      tag="nav"
      :track-style="{
        backgroundColor:'rgba(255,255,255,.3)'
      }"
      :thumb-style="{
        backgroundColor: 'rgba(33,153,233,.5)'
      }">
      <ul>
        <template v-for="(v,k) in nav">
          <li :key="k" class="home__subtitle">
            <span>{{k==='components'?'组件':'指令'}}</span>
          </li>
          <li v-for="item in v"
            :key="item.name">
            <router-link
              active-class="home__currentnav"
              :to="{name:item.name}"
              >{{item.title}}</router-link>
          </li>
        </template>
      </ul>
    </k-scrollbar>
    <k-scrollbar class="home__content"
      ref="scrollbar"
      @scroll="onScroll">
        <router-view @view-updated="pageUpdated"
        @scroll-into-view="scrollIntoView($event)"></router-view>
    </k-scrollbar>
    <k-to-top></k-to-top>
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
            title: "button 按钮"
          },
          {
            name: "input",
            title: "input 输入框"
          },
          {
            name: "input-number",
            title: "input-number 计数器"
          },
          {
            name: "radio",
            title: "radio 单选框"
          },
          {
            name: "checkbox",
            title: "checkbox 复选框"
          },
          {
            name: "select",
            title: "select 下拉选择"
          },
          {
            name: "area",
            title: "area 区域选择"
          },
          {
            name: "carousel",
            title: "carousel 轮播图"
          },{
            name:'icon',
            title:'icon 图标'
          },{
            name:'loading',
            title:'loading 加载中'
          },{
            name:'popup',
            title:'popup 弹出框'
          },{
            name:'dialog',
            title:'dialog 对话框'
          },{
            name:'pagination',
            title:'pagination 分页器'
          },{
            name:'date-picker',
            title:'date-picker 日期选择器'
          },{
            name:'scrollbar',
            title:'scrollbar 滚动条'
          },{
            name:'transition',
            title:'transition过渡动画'
          }
        ],
        directives: [
          {
            name: "viewable",
            title: "viewable 可视区判断"
          }
        ]
      }
    };
  },
  methods: {
    onScroll(obj) {
      // console.log(obj)
    },
    pageUpdated() {
      console.log('检测到了')
      this.$refs.scrollbar.reset()
    },
    scrollIntoView(elem) {
      this.$refs.scrollbar.scrollIntoView(elem)
    }
  }
};
</script>

