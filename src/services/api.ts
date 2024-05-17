import axios from 'axios'

const baseURL = 'https://api.tvmaze.com'

const api = axios.create({
  baseURL
})

export async function getMoviesList() {
  try {
    const response = await api.get('/schedule/full')
    return response.data
  } catch (error) {
    console.error('Error fetching items:', error)
    throw error
  }
}
