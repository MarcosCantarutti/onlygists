<template>
  <PublicHeadlineLoader :loading="loading">
    <PublicHeadline
      v-if="gist"
      :title="gist.title"
      :description="gist.description"
      :author="gist.profiles.username"
      :lang="gist.lang"
    />
    <PublicHeadlineEmpty v-else />
  </PublicHeadlineLoader>

  <GistCodeSnippet v-if="gist" :is-paid="gist.isPaid" :loading="loadingContent" :code="gistContent" :lang="gist.lang" />

  <div class="flex flex-col md:flex-row gap-2" v-if="gist">
    <Button :label="`Comprar por 10`" class="mt-5 w-full md:w-auto" icon="pi pi-shopping-bag" icon-pos="right" />
    <Button
      v-if="session.isLogged() && user?.username === route.params.username"
      label="Editar este gist"
      class="mt-5 w-full md:w-auto"
      @click="handleNavigateToGistEdit()"
      icon="pi pi-pencil"
      icon-pos="right"
    />
  </div>

  <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
  <LazyDialogPaymentError v-model:visible="isPaymentFail" />
</template>

<script setup lang="ts">
import PublicHeadline from '@/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineLoader from '@/modules/gists/components/PublicHeadline/Loader.vue'
import PublicHeadlineEmpty from '@/modules/gists/components/PublicHeadline/Empty.vue'
import GistCodeSnippet from '@/modules/gists/components/CodeSnippet/CodeSnippet.vue'
import LazyDialogPaymentSuccess from '@/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue'
import LazyDialogPaymentError from '@/modules/payments/components/DialogPaymentError/DialogPaymentError.vue'

import { useGistContent } from '@/modules/gists/composables/useGistContent/useGistContent'

import { useSession } from '@/modules/auth/composables/useSession/useSession'

import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'

const { user } = inject(myselfKey) as MyselfContextProvider
const session = useSession()

const route = useRoute()
const router = useRouter()
const services = useServices()

const isPaymentSuccessfully = ref<boolean>(false)
const isPaymentFail = ref<boolean>(false)

// use useAsyncData e useLazyAsyncData (mostra carregando)
const { data: gist, pending: loading } = await useLazyAsyncData('gist-detail', () => {
  const gistId = route.params.id as string
  return services.gists.readOne(gistId)
})

const handleNavigateToGistEdit = () => {
  router.push(`/app/gist/${route.params.id}/edit`)
}

const { gistContent, loading: loadingContent } = useGistContent({
  gist,
})

onMounted(() => {
  const { success_payment, fail_payment } = route.query

  if (success_payment) {
    isPaymentSuccessfully.value = true
  }

  if (fail_payment) {
    isPaymentFail.value = true
  }
})

defineOgImage({
  component: 'GistDetail',
  props: {
    title: `${gist.value?.title} by @${gist.value?.profiles.username}`,
    description: `Veja o gist de ${gist.value?.profiles.name} no onlygists`,
  },
})

useSeoMeta({
  title: `${gist.value?.title} by @${gist.value?.profiles.name}`,
  ogTitle: `${gist.value?.title} by @${gist.value?.profiles.name}`,
  description: `Veja o gist de ${gist.value?.profiles.name} no onlygists`,
  ogDescription: `Veja o gist de ${gist.value?.profiles.name} no onlygists`,
})
</script>
