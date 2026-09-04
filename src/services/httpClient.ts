import axios from 'axios'
import { getApiBaseUrl } from '../config/apiUrl'
import { TOKEN_KEY } from '../types'
import { clearToken } from './authService'

export const httpClient = axios.create({
  headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl()
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken()          
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401) {
      return 'Usuario o contraseña incorrectos.'
    }
    const status = err.response?.status ?? 'network'
    return `Error HTTP ${status}: ${err.message}`
  }
  return err instanceof Error ? err.message : 'Error desconocido'
}