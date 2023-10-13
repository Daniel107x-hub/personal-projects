import axios from "axios";

const discoverMovies = async () => {
  const movies = await axios.get(
    "https://api.themoviedb.org/3/discover/movie",
    {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    }
  );
  return { movies: movies.data.results };
};

const getMovieById = async ({ params }) => {
  const movie = await axios.get(
    `https://api.themoviedb.org/3/movie/${params.movieId}`,
    {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    }
  );
  return { movie: movie.data };
};

export { discoverMovies, getMovieById };
