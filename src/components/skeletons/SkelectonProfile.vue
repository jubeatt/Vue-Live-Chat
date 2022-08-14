<template>
  <div className="skeleton-wrapper">
    <div className="skeleton-header">
      <div>
        <SkeletonElement type="avatar" />
      </div>
      <div>
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <SkelectonShim />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SkeletonElement from './SkeletonElement.vue'
import SkelectonShim from './SkelectonShim.vue'

export default defineComponent({
  components: { SkeletonElement, SkelectonShim }
})
</script>
