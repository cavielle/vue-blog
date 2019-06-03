<template>
  <div>
    <article class="post sticky" v-for="item in ArticleData" :key="item.ArticleID">
      <nuxt-link :to="{name:'article-id',params:{id:`${item.ArticleID}`}}" class="post-cover">
        <img :src="item.ArticleImgUrl" width="700" height="220">
      </nuxt-link>
      <header class="entry-header">
        <h2 class="entry-title">
          <nuxt-link :to="{name:'article-id',params:{id:`${item.ArticleID}`}}">{{item.ArticleTitle}}</nuxt-link>
        </h2>
      </header>
      <div class="entry-meta">
        <span class="tag">
          <!-- {{item.ArticleTag.split(',').join('·')||item.ArticleTag}} -->
          <a href="/" v-for="tag in item.ArticleTag.split(',')" :key="tag">#{{tag}}</a>
        </span>
        <span>/</span>
        <span>更新于 {{getDateTime(item.ArticleUpdate)}}</span>
      </div>
      <div class="entry-summary">
        <p>{{item.ArticleSummary}}</p>
      </div>
    </article>
  </div>
</template>
<style lang="scss" scoped>
.post {
  position: relative;
  width: 700px;
  margin: 50px auto;
  padding-bottom: 50px;
  //   background: #4396;
  .post-cover {
    margin-bottom: 1rem;
    display: block;
  }
  .entry-header {
    clear: both;
  }
  .entry-title {
    font-size: 28px;
    font-weight: 400;
    a {
      transition: color 0.2s;
      color: #000;
    }
    a:hover {
      color: #00796b;
    }
  }
  .entry-meta {
    margin: 0.5rem 0;
    color: #999;
    .tag {
      a {
        color: #3b8070;
        margin-right: 0.5rem;
      }
    }
    span {
    }
  }
  .entry-summary {
    p {
      margin-bottom: 0;
      color: #666;
    }
  }
}
.post::after {
  position: absolute;
  bottom: -1px;
  left: 50%;
  width: 150px;
  margin-left: -75px;
  content: '';
  border-bottom: 2px solid #ddd;
}
.sticky {
  .entry-title {
    position: relative;
    line-height: 1.2;
  }
  .entry-title:before {
    position: absolute;
    top: 0.4em;
    left: -3.5em;
    padding: 0.2em 0.4em;
    font-size: 14px;
    color: #fff;
    content: '置顶';
    background: #00796b;
  }
}
</style>
<script>
export default {
  data() {
    return {
      ArticleData: []
    }
  },
  mounted() {
    this.$axios({
      method: 'get',
      url: '/getArticleInfo'
    })
      .then(response => {
        this.ArticleData = response.data.data
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
  },
  computed: {
    getDateTime() {
      return function(time) {
        return new Date(time)
          .toLocaleDateString()
          .split('/')
          .join('-')
      }
    }
  }
}
</script>
