import React, { useCallback } from "react";
import Gallery from "../components/ui/Gallery";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import MovieTile from "../components/movies/MovieTile";
import Pagination from "../components/ui/Pagination";

function Suggestions() {
  const { movies } = useLoaderData();
  const navigate = useNavigate(); // Navigating https://stackabuse.com/redirects-in-react-router/

  const handlePageChange = useCallback(
    (page) => {
      navigate(`/suggestions/${page}`);
    },
    [navigate]
  );

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-2 mb-6 text-xl">Suggestions</h1>
      <Gallery>
        {movies.map((movie) => {
          const { id, title, poster_path, vote_average, release_date } = movie;
          return (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <MovieTile
                id={id}
                title={title}
                poster={poster_path}
                rating={vote_average}
                date={release_date}
              />
            </Link>
          );
        })}
      </Gallery>
      <Pagination onPageChange={handlePageChange} />
    </div>
  );
}

export default Suggestions;
