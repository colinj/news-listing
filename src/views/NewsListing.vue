<template>
  <div class="section">
    <div class="container">
      <div class="filters">
        <toggle-group :tags="uniqueTags" v-model="selectedTags" />
      </div>
      {{ selectedTags }}
      <div v-if="!isLoaded">
        <div>Loading news articles...</div>
      </div>
      <div v-else class="news-layout">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="news-item"
        >
          <a :href="article.URL" target="_blank">
            {{ article.id }} - {{ article.ArticleTitle }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsArticles } from "@/api"
import ToggleGroup from "@/components/ToggleGroup.vue"

const intersect = (arrayA, arrayB) => arrayA.filter(x => arrayB.includes(x))

export default {
  name: "NewsListing",
  components: {
    ToggleGroup
  },
  data() {
    return {
      isLoaded: false,
      articles: [],
      selectedTags: []
    }
  },
  computed: {
    uniqueTags() {
      return [...new Set(this.articles.flatMap(item => item.Tags))]
    },
    filteredArticles() {
      return this.articles.filter(
        x =>
          this.selectedTags.length === 0 ||
          intersect(x.Tags, this.selectedTags).length > 0
      )
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
.filters {
  border-bottom: 1px solid white;
  margin-bottom: 1rem;
}
</style>
