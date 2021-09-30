import axios from 'axios';

//URL FILMES EM CARTAZ:
//https://api.themoviedb.org/3
//CHAVE: 093f5abc0dbcaab9d2762dcf04beb1bc

export const key = '093f5abc0dbcaab9d2762dcf04beb1bc'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;
