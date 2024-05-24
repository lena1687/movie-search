<template>
  <div @click="redirectToExternalService()">
    <div>
      <img :src="img" alt="{{name}}" />
    </div>
    <div>
      <h2>{{ name }}</h2>
      <p>{{ formattingAverageRuntime() }}</p>
      <p>{{ genres.join(', ') }}</p>
      <p>{{ country }}</p>
      <p v-html="summary"></p>
      <p>{{ formattingDate() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MovieDetails } from '@services/api/MovieService.ts'

const props = defineProps<{ info: MovieDetails }>()
const { name, genres, officialSite, premiered, img, summary, country, averageRuntime } = props.info

const redirectToExternalService = () => {
  window.location.href = officialSite
}

const formattingDate = () => {
  return premiered.substring(0, 4)
}

const formattingAverageRuntime = () => {
  return `${averageRuntime} min`
}
</script>
