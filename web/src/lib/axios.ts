import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://ingress.pop-pa.nrp.br:3333/'
})