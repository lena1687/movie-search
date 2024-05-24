<template>
  <div v-if="genreList.length > 0">
    <div>
      <div
        v-for="genre in genreList"
        :key="genre"
        :class="genreIconClasses[genre]"
        @click="filterGenre(genre)"
      >
        {{ genre }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MovieService, { Movie } from '@services/api/MovieService.ts'
import { GenreTypes } from '@types/GenreTypes.ts'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const fullMovieList = ref<Movie[]>([])
const genreList = ref<GenreTypes[]>([])
const router = useRouter()
const store = useStore()

const genreIconClasses: Record<GenreTypes, string> = {
  Action: 'icon-action',
  Adult: 'icon-adult',
  Adventure: 'icon-adventure',
  Anime: 'icon-anime',
  Children: 'icon-children',
  Comedy: 'icon-comedy',
  Crime: 'icon-crime',
  DIY: 'icon-diy',
  Drama: 'icon-drama',
  Espionage: 'icon-espionage',
  Family: 'icon-family',
  Fantasy: 'icon-fantasy',
  Food: 'icon-food',
  History: 'icon-history',
  Horror: 'icon-horror',
  Legal: 'icon-legal',
  Medical: 'icon-medical',
  Music: 'icon-music',
  Mystery: 'icon-mystery',
  Nature: 'icon-nature',
  Romance: 'icon-romance',
  'Science-Fiction': 'icon-science-fiction',
  Sports: 'icon-sports',
  Supernatural: 'icon-supernatural',
  Thriller: 'icon-thriller',
  Travel: 'icon-travel',
  War: 'icon-war',
  Western: 'icon-western'
}

onMounted(async () => {
  try {
    fullMovieList.value = await MovieService.getMovies()
    genreList.value = getUniqueGenres(fullMovieList.value)
  } catch (error) {
    console.error('Error fetching items:', error)
  }
})

function getUniqueGenres(fullMovieList: Movie[]): GenreTypes[] {
  const genresSet = new Set()
  return fullMovieList.reduce((acc: GenreTypes[], movie: Movie) => {
    const { _embedded } = movie
    const details = _embedded.show
    const { genres } = details
    genres.forEach((genre: GenreTypes) => {
      if (genresSet.has(genre)) {
        return
      } else {
        genresSet.add(genre)
        acc.push(genre)
      }
    })
    acc.sort()
    return acc
  }, [])
}

const filterGenre = (genre: GenreTypes) => {
  const movieList = getUniqueMoviesSet(fullMovieList.value)
  const filteredMovieList = filterMoviesList(movieList, genre)
  const formattedMovieList = formattedMoviesList(filteredMovieList)
  store.dispatch('updateFormattedMovieList', { [genre]: formattedMovieList })
  router.push({ name: 'MoviesPage', params: { genre } })
}

function getUniqueMoviesSet(fullMovieList: Movie[]) {
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

function filterMoviesList(movies: Movie[], genre: GenreTypes) {
  return movies.filter((movie) => {
    const defaultLanguage = 'English'
    const { _embedded } = movie
    const details = _embedded.show
    const { language, genres } = details
    if (language === defaultLanguage && genres.includes(genre)) return movie
  })
}

function formattedMoviesList(movies: Movie[]) {
  return movies.map((movie) => {
    const { _embedded } = movie
    const details = _embedded.show
    const img = details.image?.medium || details.image?.original || ''
    const networkDetails = details.network?.country
    const country = networkDetails?.name || ''
    const { id, name, genres, officialSite, premiered, weight, summary, averageRuntime } = details
    return {
      id,
      name,
      genres,
      officialSite,
      premiered,
      weight,
      img,
      summary,
      country,
      averageRuntime
    }
  })
}
</script>

<style scoped>
.icon-action::before {
  content: '💥';
}
.icon-adult::before {
  content: '🔞';
}
.icon-adventure::before {
  content: '🏔️';
}
.icon-anime::before {
  content: '🗾';
}
.icon-children::before {
  content: '🧒';
}
.icon-comedy::before {
  content: '😂';
}
.icon-crime::before {
  content: '🕵️‍♂️';
}
.icon-diy::before {
  content: '🔧';
}
.icon-drama::before {
  content: '🎭';
}
.icon-espionage::before {
  content: '🕵️‍♂️';
}
.icon-family::before {
  content: '👨‍👩‍👧‍👦';
}
.icon-fantasy::before {
  content: '🧙';
}
.icon-food::before {
  content: '🍔';
}
.icon-history::before {
  content: '📜';
}
.icon-horror::before {
  content: '🧟';
}
.icon-legal::before {
  content: '⚖️';
}
.icon-medical::before {
  content: '🏥';
}
.icon-music::before {
  content: '🎵';
}
.icon-mystery::before {
  content: '🕵️‍♀️';
}
.icon-nature::before {
  content: '🌿';
}
.icon-romance::before {
  content: '❤️';
}
.icon-science-fiction::before {
  content: '🚀';
}
.icon-sports::before {
  content: '⚽';
}
.icon-supernatural::before {
  content: '👻';
}
.icon-thriller::before {
  content: '😱';
}
.icon-travel::before {
  content: '✈️';
}
.icon-war::before {
  content: '⚔️';
}
.icon-western::before {
  content: '🤠';
}
</style>
