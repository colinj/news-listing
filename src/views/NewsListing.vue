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
          v-for="(article, index) in filteredArticles"
          :key="article.id"
          class="news-item"
        >
          <a :href="article.URL" target="_blank">
            <article-card
              :class="{ 'card-tight': [1, 2].includes(index % 4) }"
              :image="article.ThumbnailImage"
              :alt-text="article.ArticleTitle"
              :layout="chooseLayout(index)"
            >
              <template v-slot:header>{{ article.Subject }}</template>
              <h2>{{ article.ArticleTitle }}</h2>
              <p>{{ article.ShortDescription }}</p>
              <template v-slot:footer>
                {{ formatDate(article.Date) }}
                <br />
                {{ article.Author }}
              </template>
            </article-card>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsArticles } from "@/api"
import ToggleGroup from "@/components/ToggleGroup"
import ArticleCard from "@/components/ArticleCard"

const intersect = (arrayA, arrayB) => arrayA.filter(x => arrayB.includes(x))
const dateFormatter = new Intl.DateTimeFormat("en-AU", { dateStyle: "long" })

export default {
  name: "NewsListing",
  components: {
    ToggleGroup,
    ArticleCard
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
  methods: {
    chooseLayout(index) {
      switch (index % 4) {
        case 0:
          return "right"
        case 1:
        case 2:
          return "left"
        default:
          return null
      }
    },
    formatDate(date) {
      return dateFormatter.format(new Date(date))
    }
  },
  watch: {
    async selectedTags(val) {
      if (this.isLoaded) {
        const tags = val.join(",")
        if (tags !== this.$route.query.tags) {
          await this.$router.push({ query: { tags } })
        }
      }
    }
  },
  async created() {
    this.isLoaded = false
    try {
      this.articles = (await getNewsArticles()).data
      this.selectedTags = (this.$route.query.tags?.split(",") ?? [])
        .map(x => x.trim())
        .filter(x => this.uniqueTags.includes(x))
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
