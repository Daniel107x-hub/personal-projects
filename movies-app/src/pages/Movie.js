import React from "react";
import { useLoaderData } from "react-router-dom";
import MovieTile from "../components/movies/MovieTile";
import { getScoreStars } from "../utils/movie";

function Movie() {
  const { movie } = useLoaderData();
  const {id, title, poster_path, vote_average, runtime, genres, overview} = movie;
  console.log(movie);
  return (
    <>
      <h1 className="mt-2 mb-6 text-xl">{movie.title}</h1>
      <section className="flex flex-row">
        <div className="data">
          <h1>{title}</h1>
          <span className="flex flex-row">{getScoreStars(vote_average)}</span>
          <h2>{runtime}</h2>
          <div className="genres flex flex-row space-x-2">
            {
              genres.map(genre => <h3>{genre.name}</h3>)
            }
          </div>
          <p>{overview}</p>
        </div>
        <div className="w-1/4">
          <MovieTile id={id} poster={poster_path} />
        </div>
      </section>
    </>
  );
}

export default Movie;
