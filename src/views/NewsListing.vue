<template>
  <div class="section">
    <div class="page-header">
      <div class="container">
        <h1>Filter</h1>
        <toggle-group :tags="uniqueTags" v-model="selectedTags" />
        <hr />
      </div>
    </div>
    <div class="container">
      <div v-if="!isLoaded">
        <div>Loading news articles...</div>
      </div>
      <div v-else class="news-layout">
        <div
          v-for="(article, index) in filteredArticles"
          :key="article.id"
          class="news-item"
        >
          <a :href="article.URL" target="_blank" rel="nofollow noopener">
            <article-card
              :class="{ 'card-large': [0, 3].includes(index % 4) }"
              :image="article.ThumbnailImage"
              :alt-text="article.ArticleTitle"
              :layout="chooseLayout(index)"
            >
              <template v-slot:header>{{ article.Subject }}</template>
              <h2 :title="article.ArticleTitle">{{ article.ArticleTitle }}</h2>
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
const dateFormatter = new Intl.DateTimeFormat("en-AU", { dateStyle: "medium" })

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
.page-header {
  position: sticky;
  top: 0;
  margin-top: -2rem;
  padding: 2rem 0 1rem;
  background-color: #555;
  z-index: 1;
}

h1 {
  margin-bottom: 1rem;
  color: #fff;
  font-size: $font-size-md;
}

hr {
  border: 0;

  @media (min-width: $breakpoint-sm) {
    border: 1px solid;
  }
}

a:link {
  text-decoration: none;
}
</style>
