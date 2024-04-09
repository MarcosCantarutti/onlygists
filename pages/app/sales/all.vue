<template>
  <Sales />
</template>

<script setup lang="ts">
import Sales from '~/modules/payments/screens/Sales/Sales.vue'

useHead({
  title: 'Minhas vendas | 🤩 onlygists',
})

definePageMeta({
  layout: 'admin', // definir nome do layout desejado
  middleware: ['auth'],
})
</script>
