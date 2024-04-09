<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit
      :username="user?.username!"
      :avatar-url="user?.avatarUrl!"
      class="my-10"
      @share="handleShare"
      @navigate-to-profile="handleNavigateToProfile"
    />
  </HeadlineEditLoader>
  <WidgetDefault title="Informações básicas">
    <BasicInfoForm :errors="errors" v-model="user" />
  </WidgetDefault>
  <WidgetDefault title="Endereço" class="mt-5">
    <AddressForm v-model="address" @trigger-address-search="handleZipCodeSearch()" :loading="addressLoading" />
  </WidgetDefault>

  <Button
    @click="handleUpdateProfile()"
    :loading="updateLoading"
    class="mt-5 w-full md:w-auto"
    label="Atualizar"
    icon="pi pi-pencil"
    icon-pos="right"
  />
</template>

<script setup lang="ts">
import HeadlineEdit from '@/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '@/modules/users/components/HeadlineEdit/Loader.vue'
import BasicInfoForm from '@/modules/users/components/BasicInfoForm/BasicInfoForm.vue'
import AddressForm from '@/modules/users/components/AddressForm/AddressForm.vue'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'

import { useUserProfileActions } from '@/modules/users/composables/useUserProfileActions/useUserProfileActions'
import { useAddressUpdate } from '@/modules/users/composables/useAddressUpdate/useAddressUpdate'
import { userUserUpdate } from '@/modules/users/composables/useUserUpdate/useUserUpdate'

const { user, loading } = inject(myselfKey) as MyselfContextProvider

// funcionalidade abstraida num composable/hook
const router = useRouter()
const { share } = useUserProfileActions()

const {
  loading: addressLoading,
  searchZipCode,
  address,
} = useAddressUpdate({
  user,
})

const {
  loading: updateLoading,
  safeParse,
  update,
  errors,
} = userUserUpdate({
  user, //reatividade
})

const handleUpdateProfile = () => {
  const isValid = safeParse().success

  if (!isValid || !user.value) {
    return
  }

  user.value.address = address.value // vinculando os objetos de arquivos diferentes
  update()
}

const handleZipCodeSearch = () => {
  searchZipCode()
}

const handleShare = (username: string) => {
  share(username)
}
const handleNavigateToProfile = (username: string) => {
  router.push(`/${username}`)
}
</script>
