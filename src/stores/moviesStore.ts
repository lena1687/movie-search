import { createStore } from 'vuex'
import { MovieDetails } from '@services/api/MovieService.ts'
import createPersistedState from 'vuex-persistedstate'

interface State {
  formattedMovieList: Record<string, MovieDetails[]>
}

const store = createStore<State>({
  state: {
    formattedMovieList: {}
  },
  mutations: {
    setFormattedMovieList(state, payload: Record<string, MovieDetails[]>) {
      state.formattedMovieList = payload
    }
  },
  actions: {
    updateFormattedMovieList({ commit }, payload: Record<string, MovieDetails[]>) {
      commit('setFormattedMovieList', payload)
    }
  },
  plugins: [
    createPersistedState({
      key: 'movies-store',
      paths: ['formattedMovieList']
    })
  ]
})

export default store
