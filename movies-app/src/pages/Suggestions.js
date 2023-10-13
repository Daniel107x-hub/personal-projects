import React from "react";
import Gallery from "../components/ui/Gallery";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import MovieTile from "../components/movies/MovieTile";

function Suggestions() {
  const { movies } = useLoaderData();
  return (
    <>
      <h1 className="mt-2 mb-6 text-xl">Suggestions</h1>
      <Gallery>
        {movies.map((movie) => 
          {
            const {id, title, poster_path, vote_average, release_date} = movie;
            return (
              <Link to={`movie/${movie.id}`} key={movie.id}>
                <MovieTile id={id} title={title} poster={poster_path} rating={vote_average} date={release_date}/>
              </Link>
            )
          }
        )}
      </Gallery>
    </>
  );
}

export default Suggestions;
