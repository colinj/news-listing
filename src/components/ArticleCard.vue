<template>
  <div class="card" :class="layoutClass">
    <figure v-lazyload class="card__image">
      <img :data-src="image" :alt="altText" />
    </figure>
    <div class="card__content">
      <div class="card__header">
        <slot name="header" />
      </div>
      <div class="card__body">
        <slot />
      </div>
      <div class="card__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    image: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      required: true
    },
    layout: {
      type: String,
      default: null
    }
  },
  computed: {
    layoutClass() {
      switch (this.layout) {
        case "left":
        case "right":
          return [`card-${this.layout}`]

        default:
          return []
      }
    }
  }
}
</script>
