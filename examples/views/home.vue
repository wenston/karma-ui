<template>
  <div class="home">
    <nav class="home__nav">
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
    </nav>
    <div class="home__content">
      <router-view></router-view>
    </div>
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
  }
};
</script>

