<template>
  <div>
    <header
      class="entry-header"
      style="background-image:url('https://images7.alphacoders.com/101/1010054.jpg')"
    >
      <div class="inner">
        <div class="title">
          <h1 class="entry-title">{{this.Article.ArticleTitle}}</h1>
          <div class="entry-meta">
            <span class="tag" v-for="item in getTag" :key="item">{{item}}</span>
            <span>/</span>
            <span>更新于 {{getDateTime(this.Article.ArticleUpdate)}}</span>
          </div>
        </div>
      </div>
    </header>
    <div class="entry-content">
      <div class="entry-post title">
        <img src="~/static/image/post-cover.jpg" alt width="700" height="220">
        <!-- <img src="//img.c7sky.com/2016/05/28/wordpress_theme_c7v5_banner.jpg" itemprop="image" width="700" height="220" alt="" loading="lazy"> -->
        <p>{{ this.Article.ArticleSummary }}</p>
      </div>
      <mavon-editor
        class="md"
        :value="hand()"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :ishljs="true"
      ></mavon-editor>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Article: [],
      id: this.$route.params.id
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'news', content: 'This is article page' }
      ]
    }
  },
  mounted() {
    this.$axios({
      method: 'get',
      url: '/getArticle',
      params: {
        id: this.id
      }
    })
      .then(response => {
        this.Article = response.data.data[0]
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
  },
  computed: {
    getDateTime() {
      return function() {
        return new Date(this.Article.ArticleUpdate)
          .toLocaleDateString()
          .split('/')
          .join('-')
      }
    },
    getTag() {
      // console.log(`${this.Article.ArticleTag}`.split(','))
      return `${this.Article.ArticleTag}`.split(',')
    },
    hand() {
      return function() {
        return `${this.Article.ArticleContent}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 820px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.entry-header {
  color: #fff;
  background: 50% #00796b;
  background-size: cover;
  overflow: hidden;
  margin-bottom: -110px;
  .inner {
    transition: background-color 0.5s;
    background-color: rgba(61, 47, 89, 0.97);
    overflow: hidden;
    .title {
      margin: 150px auto 260px;
      width: 700px;
    }
  }
}
.title {
  margin: 0 auto;
  width: 700px;
  .entry-title {
    margin: 0;
    font-size: 56px;
    font-weight: 700;
    line-height: 1.2;
  }
  .entry-meta {
    margin: 0.5rem 0;
    .tag {
      padding-right: 0.3rem;
    }
    .tag:hover {
      opacity: 1;
    }
    span {
      opacity: 0.7;
    }
  }
}
.entry-content {
  .entry-post {
    box-shadow: 0 0 0 7px #fff;
    img {
      margin-bottom: 30px;
    }
  }
}
</style>

