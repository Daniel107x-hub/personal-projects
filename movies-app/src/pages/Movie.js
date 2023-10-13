import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { getMovieCard } from "../utils/movieUtils";
import FavoritesContext from "../context/favorites";

function Movie() {
  const { handleLiked, isFavorite } = useContext(FavoritesContext);
  const { movie } = useLoaderData();
  return (
    <>
      <h1 className="mt-2 mb-6 text-xl">{movie.title}</h1>
      <div className="w-1/6">
        {getMovieCard(movie)}
      </div>
    </>
  );
}

export default Movie;
