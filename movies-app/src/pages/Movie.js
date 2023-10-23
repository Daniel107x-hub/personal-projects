import React from "react";
import { useLoaderData } from "react-router-dom";
import MovieTile from "../components/movies/MovieTile";
import { getScoreStars } from "../utils/movie";
import Card from "../components/ui/Card";

function Movie() {
  const { movie } = useLoaderData();
  const { id, title, poster_path, vote_average, runtime, genres, overview } =
    movie;
  return (
    <div className="flex flex-row justify-between md:justify-evenly p-10">
      <section className="data w-1/2">
        <h1 className="text-5xl">{title}</h1>
        <span className="flex flex-row my-4 text-3xl">
          {getScoreStars(vote_average)}
        </span>
        <h2>{runtime} minutes</h2>
        <div className="genres flex flex-row space-x-2 my-2">
          {genres.map((genre) => (
            <Card key={genre.name}>{genre.name}</Card>
          ))}
        </div>
        <p className="text-lg">{overview}</p>
      </section>
      <section className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <MovieTile id={id} poster={poster_path} />
      </section>
    </div>
  );
}

export default Movie;
