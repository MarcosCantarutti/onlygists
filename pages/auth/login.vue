<template>
  <Login />
</template>

<script setup lang="ts">
import Login from '@/modules/auth/screens/Login/Login.vue'

useHead({
  title: 'Entrar | 🤩 onlygists',
})

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})
</script>
