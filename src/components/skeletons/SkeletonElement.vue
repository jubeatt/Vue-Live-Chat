<template>
  <div :class="`skeleton ${type}`"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'title' | 'text' | 'avatar' | 'thumbnail'>,
      required: true
    }
  }
})
</script>
