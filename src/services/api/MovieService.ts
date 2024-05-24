import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { GenreTypes } from '@types/GenreTypes.ts'

export interface Movie {
  _embedded: Record<'show', fullMovieDetails>
}

export interface fullMovieDetails {
  id: number
  name: string
  genres: GenreTypes[]
  language: string | null
  officialSite: string
  premiered: string
  averageRuntime: number
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
  genres: GenreTypes[]
  id: number
  img: string
  name: string
  premiered: string
  summary: string
  officialSite: string
  weight: number
  averageRuntime: number
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
