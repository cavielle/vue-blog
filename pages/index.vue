<template>
  <div class="content">
    <div class="Header">
      <div class="site-branding">
        <h1>Ivan's Blog</h1>
        <p>练练手</p>
        <!-- <li><nuxt-link :to="{name:'about'}">about</nuxt-link></li> -->
      </div>
      <navbar :navclass="navclass"/>
    </div>
    <div id="main">
      <div class="list">
        <articles/>
      </div>
    </div>

    <!-- ,
  "config": {
    "nuxt": {
      "host": "0.0.0.0",
      "port": "8011"
    }
    }-->
  </div>
</template>

<script>
// import "../assets/dist/canvas-nest.js";
import vueCanvasNest from 'vue-canvas-nest'
import articles from '~/components/index/Article.vue'
import navbar from '~/components/index/Navbar.vue'
export default {
  components: {
    vueCanvasNest,
    articles,
    navbar
  },
  data() {
    return {
      navclass: true,
      srcoll: 0
    }
  },
  mounted() {
    var scrollY = () => {
      this.srcoll = window.scrollY
      console.log(this.srcoll)
    }
    window.addEventListener('scroll', scrollY, false)
  },
  watch: {
    srcoll(newVal, oldVa) {
      // newVal>=489?!this.navclass:''
      if (newVal >= 489) {
        this.navclass = false
      } else {
        this.navclass = true
      }

      console.log(this.navclass)
    }
  }
}
</script>

<style lang="scss">
$MainColor: #009688;
$SubColor: #00796b;
$SubColor2: #b2dfdb;
.content {
  height: 100%;
  canvas {
    position: fixed !important;
  }
}
.Header {
  // background-image: url(~static/image/1014821.png);
  background: #00BCD4;
  background-image: url('https://i.loli.net/2019/07/29/5d3eadb65997973032.png');
  height: auto;
  background-size: cover;
  .site-branding {
    width: 100%;
    padding: 100px 0;
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif !important;
    font-size: 45px;
    color: white;
    text-align: center;
  }
}

#main {
  min-height: 500px;
  .list {
    margin: 0;
  }
}
</style>

