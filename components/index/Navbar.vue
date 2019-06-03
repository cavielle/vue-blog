<template>
  <div :class="{'uppinned':navclass,'pinned':!navclass}">
    <div id="navbar">
      <div class="nav">
        <ul class="nav-menu">
          <li>
            <a href="/">首页{{navclass}}</a>
          </li>
          <li>
            <a href="/">文章</a>
          </li>
          <li>
            <a href="/">前端开发</a>
          </li>
          <li>
            <a href="/">网站简介</a>
          </li>
          <li>
            <a href="/">更多</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="navs"></div>
  </div>
</template>
<script>
export default {
  props: ['navclass'],
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.uppinned {
  & > div:nth-child(1) {
    position: relative !important;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
  }
}
.pinned {
  & > div:nth-child(1) {
    background-color: #009688;
    opacity: 0;
    a {
      border-color: white !important;
    }
  }
  & > div:nth-child(1):hover {
    transition: all 0.5s;
    opacity: 1;
  }
  .navs {
    display: block;
  }
}
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  font-size: 16px;
  z-index: 1;
  .nav {
    margin-right: auto;
    margin-left: auto;
    color: white;
    width: 700px;
    .nav-menu {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      justify-content: center;
      li {
        display: inline-block;
        height: 60px;
        flex: auto;
        overflow: hidden;
        &:hover > a {
          height: 56px;
        }
        a {
          display: block;
          height: 60px;
          line-height: 62px;
          padding: 0 1rem;
          text-decoration: none;
          color: white;
          border-bottom: 4px solid #009688;
          box-sizing: content-box;
          -webkit-transition: 0.15s ease-in-out;
          transition: 0.15s ease-in-out;
        }
      }
    }
  }
}
.navs {
  height: 60px;
  display: none;
}
</style>
