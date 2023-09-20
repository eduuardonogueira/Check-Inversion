import axios from 'axios'

const url: string | undefined = import.meta.env.VITE_AXIOS_URL

export const api = axios.create({
    baseURL: url
})

