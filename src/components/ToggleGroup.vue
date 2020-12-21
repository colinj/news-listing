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
$hover-color: #ccc;
$checked-color: #fff;
$overline-height: 0.25rem;

.toggle-group {
  display: flex;
  flex-wrap: wrap;
}

.toggle {
  display: flex;

  label {
    padding: 0.5rem;
    padding-bottom: 1.5rem;
    border-top: $overline-height solid transparent;
  }

  input[type="checkbox"] {
    appearance: none;

    &:hover + label {
      color: $hover-color;
    }

    &:checked + label {
      border-top-color: $checked-color;
      color: $checked-color;

      &::before {
        z-index: -1;
      }
    }

    &:focus-visible + label {
      background-color: red;
    }
  }
}

.overline {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -$overline-height;
    left: 0;
    height: $overline-height;
    width: 0;
    background-color: $hover-color;
    transition: 0.15s ease all;
  }

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
  padding: 0.25rem 0 1.25rem;
  border-top: $overline-height solid transparent;

  button {
    padding: 0.25rem;
    padding-left: 0.5rem;
    border: 0;
    border-left: 1px solid white;
    background-color: inherit;
    color: inherit;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      background: red;
    }

    &:hover {
      color: white;
    }
  }
}
</style>
