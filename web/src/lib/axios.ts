import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://200.129.132.211:3333/'
})