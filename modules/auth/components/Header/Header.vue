<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-screen-xl">
        <div class="flex items-center">
          <nuxt-link to="/app/panel">
            <Logo />
          </nuxt-link>
        </div>
        <div class="flex items-center">
          <button class="flex gap-2 items-center" aria-haspopup="true" aria-controls="header-auth-menu" @click="toogle">
            <span class="font-[Inter] font-regular text-lg text-gray-700">Olá, {{ props.nickname }}!</span>
            <div class="w-9 h-9 rounded-full overflow-hidden" v-if="props.profilePic">
              <img :src="props.profilePic" alt="foto de perfil do usuário" />
            </div>
          </button>
        </div>

        <!-- menu popup do prime view -->
        <Menu ref="menu" :model="items" :popup="true"></Menu>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'navigate-to-new-gist'): void
  (e: 'navigate-to-reports'): void
  (e: 'navigate-to-profile-edit'): void
  (e: 'navigate-to-sales'): void
  (e: 'logout'): void
}>()

const props = defineProps<{
  profilePic?: string
  nickname: string
}>()

// utilizamos menu e itens no componente Menu do vueprime
const menu = ref()
const items = [
  {
    label: 'Painel',
    icon: 'pi pi-chart-line',
    command: () => emit('navigate-to-reports'),
  },
  {
    label: 'Novo gist',
    icon: 'pi pi-plus',
    command: () => emit('navigate-to-new-gist'),
  },
  {
    label: 'Editar perfil',
    icon: 'pi pi-user',
    command: () => emit('navigate-to-profile-edit'),
  },
  {
    label: 'Vendas',
    icon: 'pi pi-money-bill',
    command: () => emit('navigate-to-sales'),
  },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    command: () => emit('logout'),
  },
  {
    separator: true,
  },
]

const toogle = (event: Event) => {
  menu.value?.toggle(event)
}
</script>
