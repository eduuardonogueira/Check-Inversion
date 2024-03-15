import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_URL
})

export const useApi = () => ({
  validateToken: async (token: string) => {
    /* return {
            user: { id: 3, name: 'Eduardo', email: 'eduardocastroemp@gmail.com' }
        } // usado somente para testes */
    const response = await api.post('/validate', { token })
    return response.data
  },
  signin: async (username: string, password: string) => {
    /*         return {
            user: { id: 3, name: 'Eduardo', email: 'eduardocastroemp@gmail.com' },
            token: '123456789'
        } // usado somente para testes */
    const response = await api.post('/signin', { username, password })
    return response.data
  },
  logout: async () => {
    const response = await api.post('/logout')
    return response.data
  }
})
