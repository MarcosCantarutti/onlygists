<template>
  <OAuthRedirect />
</template>
<script setup lang="ts">
import OAuthRedirect from '@/modules/auth/screens/OAuthRedirect/OAuthRedirect.vue'

useHead({
  title: 'Redirecionamento | 🤩 onlygists',
})


definePageMeta({
  layout: 'default',
})
</script>
