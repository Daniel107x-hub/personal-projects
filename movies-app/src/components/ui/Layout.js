import React, { useContext, useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import Gallery from "./Gallery";
import { getMovieById } from "../../api/movies";
import loading from "../../loading.gif";
import FavoritesContext from "../../context/favorites";
import { Link } from "react-router-dom";
import MovieTile from "../movies/MovieTile";
import SearchBar from "../movies/SearchBar";

function Layout() {
  const { favoriteIds } = useContext(FavoritesContext);
  const [favorites, setFavorites] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const topRef = useRef(null);

  const executeScroll = () => {
    topRef.current.scrollIntoView(false);
  }

  useEffect(() => {
    executeScroll();
  }, [pathname])

  useEffect(() => {
    const fetchMovies = async () => {
      if (favoriteIds.length > 0) {
        setIsLoading(true);
        try {
          const requests = favoriteIds.map((id) => {
            const params = { movieId: id };
            return getMovieById({ params });
          });
          const responses = await Promise.all(requests);
          const data = responses.map((response) => response.movie);
          setFavorites(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchMovies();
  }, [favoriteIds]);

  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div className="bg-gray-800 font-jakarta flex flex-col text-zinc-200 p-2 h-screen overflow-y-auto">
      <section className="h-10 font-bold flex flex-row" ref={topRef}>
        <Link to={"/"}>
          <h1>Movies App</h1>
        </Link>
        <SearchBar/>
      </section>
      <span
        className={`bg-zinc-100 rounded-md text-red-500 p-2 hover:bg-zinc-200 cursor-pointer fixed z-10 top-5 ${
          showSidebar ? "hidden" : "right-[8%] sm:right-[4%] lg:right-[2%]"
        } `}
        onClick={handleSidebar}
      >
        <GiHamburgerMenu />
      </span>
      <section className="flex flex-col items-center">
        <Outlet />
      </section>
      <Sidebar isVisible={showSidebar} onClose={handleSidebar}>
        <h1 className="font-bold mb-3">Your favorites</h1>
        {favoriteIds.length === 0 && <h1>You have no favorites</h1>}
        {favoriteIds.length > 0 && isLoading && (
          <img src={loading} alt="Loading gif" className="w-20" />
        )}
        {favoriteIds.length > 0 && !isLoading && (
          <Gallery>
            {favorites.map((movie) => {
              const { id, title, poster_path, vote_average, release_date } =
                movie;
              return (
                <Link to={`movie/${movie.id}`} key={movie.id}>
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
        )}
      </Sidebar>
    </div>
  );
}

export default Layout;
