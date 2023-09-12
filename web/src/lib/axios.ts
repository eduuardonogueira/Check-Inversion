import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://ingress.pop-pa.rnp.br:3333/'
})