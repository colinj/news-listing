<template>
  <div class="section">
    <div class="container">
      <div v-if="!isLoaded">
        <div>Loading news articles...</div>
      </div>
      <div v-else class="news-layout">
        <div
          v-for="(article, index) in articles"
          :key="article.id"
          class="news-item"
        >
          <a :href="article.URL" target="_blank">
            {{ index }} - {{ article.ArticleTitle }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsArticles } from "@/api"

export default {
  name: "NewsListing",
  data() {
    return {
      isLoaded: false,
      articles: [],
      selectedTags: []
    }
  },
  async created() {
    this.isLoaded = false
    try {
      this.articles = (await getNewsArticles()).data
      this.isLoaded = true
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
a:link {
  text-decoration: none;
}
</style>
