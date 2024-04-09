<template>
  <header class="w-full shadow" v-if="props.loading">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-screen-lg">
        <div class="flex items-center">
          <nuxt-link to="/app/panel">
            <Logo />
          </nuxt-link>
        </div>
        <div class="flex gap-2 items-center">
          <Skeleton width="7rem" height="2rem" />
          <Skeleton shape="circle" size="2rem" />
        </div>
      </div>
    </nav>
  </header>

  <slot v-else />
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  loading: boolean
}>()
</script>
