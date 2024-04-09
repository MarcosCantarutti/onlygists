<template>
  <div class="w-full flex flex-col justify-center items-center gap-2">
    <div class="w-24 md:w-32 rounded-full overflow-hidden">
      <img class="w-full" :src="props.avatarUrl" alt="foto do usuário" />
    </div>

    <h1 class="font-[Inter] text-gray-700 text-center font-bold text-2xl md:text-3xl">{{ props.name }}</h1>
    <p class="font-[Inter] text-gray-700 text-center font-regular md:text-lg" v-if="props.bio">{{ props.bio }}</p>
    <p
      class="font-[Inter] text-gray-500 text-center font-regular text-sm md:text-base"
      v-if="props.city && props.state"
    >
      <i class="pi pi-map-marker"></i>
      {{ props.city }}, {{ props.state }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    avatarUrl: string
    bio?: string // ? parametro opcional
    city?: string
    state: string
  }>(),
  {
    name: 'Marcos Cantarutti',
    avatarUrl: 'https://avatars.githubusercontent.com/u/62340631?v=4',
    bio: 'Developer',
    city: 'São João del rei',
    state: 'MG',
  },
)
</script>
