import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { GenreType } from '../../types/MovieTypes.ts'

export interface Movie {
  _embedded: Record<'show', fullMovieDetails>
}

export interface fullMovieDetails {
  id: number
  name: string
  genres: GenreType[]
  language: string | null
  url: string
  type: string
  premiered: string
  weight: number
  summary: string
  image: {
    medium: string
    original: string
  }
  network: {
    country: {
      name: string
    }
  }
}

export interface MovieDetails {
  country: string
  genres: GenreType[]
  id: number
  img: string
  name: string
  premiered: string
  summary: string
  type: string
  url: string
  weight: number
}

class MovieService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.tvmaze.com'
    })
  }

  async getMovies(config?: AxiosRequestConfig): Promise<Movie[]> {
    const response: AxiosResponse<Movie[]> = await this.axiosInstance.get<Movie[]>(
      '/schedule/full',
      config
    )
    return response.data
  }
}

export default new MovieService()
