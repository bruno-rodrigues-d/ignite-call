import axios from 'axios'

export const api = axios.create({
  baseURL: '/api', // Foi utilizado assim pois está no mesmo projetodo front-end, senão o correto seria https://localhost:300/api
})
