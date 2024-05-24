<template>
  <div>
    <div>
      <div v-if="sortedMovies?.length > 0">
        <div v-for="movie in sortedMovies" :key="movie.id">
          <MovieItem :info="movie" />
        </div>
      </div>
      <div v-else>
        <p>There are no matches in this movie category.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieItem from '@components/MovieItem.vue'
import { MovieDetails } from '@services/api/MovieService.ts'
import { computed } from 'vue'

const props = defineProps<{ list: MovieDetails[] }>()
const { list } = props

const sortedMovies = computed(() => list.slice().sort((a, b) => b.weight - a.weight))
</script>
