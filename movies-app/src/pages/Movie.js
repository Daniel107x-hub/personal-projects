import React from "react";
import { useLoaderData } from "react-router-dom";
import MovieTile from "../components/movies/MovieTile";

function Movie() {
  const { movie } = useLoaderData();
  return (
    <>
      <h1 className="mt-2 mb-6 text-xl">{movie.title}</h1>
      <div className="w-1/6">
        <MovieTile movie={movie}/>
      </div>
    </>
  );
}

export default Movie;
