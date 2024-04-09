<template>
  <div class="w-full flex justify-center items-center" v-if="props.loading">
    <span class="animate-pulse text-6xl"> 😄 </span>
  </div>

  <!-- Se não é loading mostra o conteudo -->
  <slot v-else />
</template>
<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>
