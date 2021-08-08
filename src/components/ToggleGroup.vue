<template>
  <div class="toggle-group">
    <div class="toggle">
      <input
        v-model="allCategories"
        id="all-categories"
        type="checkbox"
        :disabled="allCategories"
        @click="resetTags"
      />
      <label class="overline" for="all-categories">All Categories</label>
    </div>
    <div class="toggle" v-for="tag in tags" :key="tag">
      <input :id="tag" type="checkbox" :value="tag" v-model="selectedTags" />
      <label class="overline" :for="tag">{{ tag }}</label>
    </div>
    <div class="reset-section">
      <div class="btn-reset overline">
        <button @click="resetTags">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToggleGroup",
  props: {
    tags: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      allCategories: true,
      selectedTags: []
    }
  },
  methods: {
    resetTags() {
      this.selectedTags = []
    }
  },
  watch: {
    value(val) {
      this.selectedTags = val
    },
    selectedTags(tags) {
      this.allCategories = tags.length === 0
      this.$emit("input", this.selectedTags)
    }
  }
}
</script>

<style lang="scss" scoped>
$hover-color: #dedede;
$checked-color: #fff;
$overline-height: 0.125rem;

.toggle-group {
  display: flex;
  flex-wrap: wrap;
}

.toggle {
  display: flex;
  margin-right: 1rem;

  input[type="checkbox"] {
    appearance: none;
    margin: 0;

    &:hover + label {
      color: $hover-color;
    }

    &:checked + label {
      border-bottom-color: $checked-color;
      color: $checked-color;

      // @media (min-width: $breakpoint-sm) {
      //   border-top-color: $checked-color;
      //   border-bottom-color: transparent;
      // }

      &::before {
        z-index: -1;
      }
    }

    &:focus-visible + label {
      outline: 2px solid white;
      outline-offset: 4px;
    }
  }
  &:nth-last-of-type(2) {
    margin-right: 0.5rem;
  }
}

.overline {
  position: relative;
  margin: 0.5rem 0;
  padding: 0.125rem 0;
  border-top: $overline-height solid transparent;
  border-bottom: $overline-height solid transparent;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -$overline-height;
    height: $overline-height;
    width: 0;
    background-color: $hover-color;
    transition: 0.15s ease all;
  }

  // @media (min-width: $breakpoint-sm) {
  //   padding: 0.5rem 0 1rem;

  //   &::before {
  //     top: -$overline-height;
  //     bottom: auto;
  //   }
  // }

  &:hover::before {
    width: 100%;
    transition: 0.3s ease all;
  }
}

.reset-section {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  text-align: right;
}

.btn-reset {
  button {
    padding: 0;
    padding-left: 0.5rem;
    border: 0;
    border-left: 1px solid white;
    background-color: inherit;
    color: inherit;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 4px;
    }

    &:hover {
      color: white;
    }
  }
}
</style>
