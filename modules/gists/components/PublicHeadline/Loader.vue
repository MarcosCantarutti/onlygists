<template>
  <div class="flex flex-col gap-2 items-center py-8" v-if="props.loading">
    <Skeleton width="18rem" height="2rem" />

    <div class="flex flex-col gap-2">
      <Skeleton width="9rem" height="1rem" />
      <Skeleton width="7rem" height="2rem" />
    </div>

    <div class="flex gap-2 items-center">
      <Skeleton shape="circle" size="1rem" />
      <Skeleton width="7rem" height="1rem" />
    </div>
  </div>

  <slot v-else />
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  loading: boolean
}>()
</script>
