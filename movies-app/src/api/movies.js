import axios from "axios";

const discoverMovies = () => {
    return axios.get('https://api.themoviedb.org/3/discover/movie',{
        params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY
        }
    });
}

const getMovieById = async (id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}`,{
        params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY
        }
    });
}

export {discoverMovies, getMovieById}