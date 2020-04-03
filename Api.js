import axios from 'axios';

const TMDB_KEY = "ad6bfb5080f21a8ceb222d58fe506815";

const makeRequest = (path, params) => axios.get(`https://api.themoviedb.org/3/${path}`, {
    params : { 
        ...params,
        api_key : TMDB_KEY
    }})

const getAnything = async(path, params) => {
    try {
        const {data: {results}, data} = await makeRequest(path, params);
        return [results || data , null]
    }catch(error){
        console.log("WOW ERROR FOUND")
        return [null, error]
    }
}

export const movieApi = {
    nowPlaying: () => getAnything("movie/now_playing"),
    popular: () => getAnything("movie/popular"),
    upComing: () => getAnything("movie/upcoming", {region: "kr"}),
    search: (query) => getAnything("search/movie", {query}),
    movie: (id) => getAnything(`movie/${id}`),
    discover: () => getAnything("discover/movie")
}

export const tvApi = {
    today: () => getAnything("tv/airing_today"),
    thisWeek: () => getAnything("tv/on_the_air"),
    topRated: () => getAnything("tv/top_rated"),
    popular: () => getAnything("tv/popular"),
    search: (query) => getAnything("/search/tv", {query}),
    show: (id) => getAnything(`tv/${id}`)
}

export const apiImage = (path) => `https://image.tmdb.org/t/p/w500/${path}`
