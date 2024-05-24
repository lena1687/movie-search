<template>
  <main>
    <h1>{{ genre }} Page</h1>
    <MoviesList :list="formattedMovieList" />
  </main>
</template>

<script setup lang="ts">
import MoviesList from '../components/MoviesList.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { MovieDetails } from '@services/api/MovieService.ts'

const route = useRoute()
const store = useStore()
const genre = route.params.genre as string

const formattedMovieList = computed<MovieDetails[]>(
  () => store.state.formattedMovieList[genre] || []
)
</script>
