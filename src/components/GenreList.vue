<template>
  <div v-if="genreList.length > 0">
    <div>
      <div v-for="genre in genreList" :key="genre" :class="genreIconClasses[genre]">
        {{ genre }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MovieService, { Movie } from '@services/api/MovieService.ts'
import { GenreTypes } from '@types/GenreTypes.ts'

const genreList = ref<GenreTypes[]>([])

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
    const fullMovieList = await MovieService.getMovies()
    genreList.value = getUniqueGenres(fullMovieList)
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
