<template>
  <div>
    <div>
      <h2>MoviesList</h2>
      <div v-if="moviesList?.length > 0">
        <div v-for="movie in moviesList" :key="movie.id">
          <MovieItem :info="movie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieItem from 'src/components/MovieItem.vue'
import { ref, onMounted } from 'vue'
import { getMoviesList } from 'src/services/api'

const moviesList = ref([])

onMounted(async () => {
  try {
    const fullMovieList = await getMoviesList()
    const uniqueMovies = getUniqueMoviesSet(fullMovieList)
    moviesList.value = formatMoviesList(uniqueMovies)
  } catch (error) {
    console.error('Error fetching items:', error)
  }

  function getUniqueMoviesSet(fullMovieList) {
    const moviesSet = new Set()
    return fullMovieList.filter((movie) => {
      const { _embedded } = movie
      const details = _embedded.show
      const key = `${details.name}-${details.premiered}`
      if (moviesSet.has(key)) {
        return false
      } else {
        moviesSet.add(key)
        return true
      }
    })
  }

  function formatMoviesList(movies) {
    return movies
      .filter((movie) => {
        const defaultLanguage = 'English'
        const { _embedded } = movie
        const details = _embedded.show
        const { language, genres } = details
        if (language === defaultLanguage && genres.length > 0) return movie
      })
      .map((movie) => {
        const { _embedded } = movie
        const details = _embedded.show
        const img = details.image?.medium || details.image?.original || ''
        const networkDetails = details.network?.country
        const country = networkDetails?.name || ''
        const { id, name, genres, url, type, premiered, weight, summary } = details
        return { id, name, genres, url, type, premiered, weight, img, summary, country }
      })
  }
})
</script>
