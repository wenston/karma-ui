<template>
  <div class="home">
    <nav class="home__nav">
      <ul>
        <li v-for="item in nav"
          :key="item.name">
          <router-link
            active-class="home__currentnav"
            :to="{name:item.name}"
            >{{item.title}}</router-link>
        </li>
      </ul>
    </nav>
    <div class="home__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav:[{
        name:'button',
        title:'button 按钮'
      },{
        name:'input',
        title:'input 输入框'
      },{
        name:'input-number',
        title:'input-number 计数器'
      }]
    }
  }
}
</script>

