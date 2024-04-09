<template>
  <Panel />
</template>

<script setup lang="ts">
import Panel from '@/modules/reports/screens/Panel/Panel.vue'

useHead({
  title: 'Painel | 🤩 onlygists',
})

definePageMeta({
  layout: 'admin', // definir nome do layout desejado
  middleware: ['auth'],
})
</script>
