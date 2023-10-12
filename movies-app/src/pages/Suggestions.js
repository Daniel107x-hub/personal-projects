import React, { useState, useEffect, useContext } from "react";
import { getMovieCard } from "../utils/movieUtils";
import { discoverMovies } from "../api/movies";
import Gallery from "../components/ui/Gallery";
import FavoritesContext from "../context/favorites";

function Suggestions() {
  const { favoriteIds, handleLiked } = useContext(FavoritesContext);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    discoverMovies().then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  return (
    <>
      <h1 className="mt-2 mb-6 text-xl">Suggestions</h1>
      <Gallery>
        {movies.map((movie) =>
          getMovieCard(movie, handleLiked, favoriteIds.includes(movie.id))
        )}
      </Gallery>
    </>
  );
}

export default Suggestions;
