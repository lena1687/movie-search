<template>
  <div>
    <h2>{{ name }}</h2>
  </div>
</template>

<script setup lang="ts">
import { MovieDetails } from '@services/api/MovieService.ts'

const props = defineProps<{ info: MovieDetails }>()
const { id, name, genres, url, type, premiered, weight, img, summary, country } = props.info
</script>
