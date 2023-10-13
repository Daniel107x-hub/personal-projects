import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import Gallery from "./Gallery";
import { getMovieById } from "../../api/movies";
import { getMovieCard } from "../../utils/movieUtils";
import loading from "../../loading.gif";
import FavoritesContext from "../../context/favorites";

function Layout() {
  const { favoriteIds, handleLiked } = useContext(FavoritesContext);
  const [favorites, setFavorites] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (favoriteIds.length > 0) {
        setIsLoading(true);
        console.log(favoriteIds);
        try {
          const requests = favoriteIds.map((id) => {
            const params = { movieId: id };
            return getMovieById({ params });
          });
          const responses = await Promise.all(requests);
          const data = responses.map((response) => response.movie);
          console.log(data);
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
    <div
      className={`bg-gray-800 font-jakarta flex flex-col justify-between text-zinc-200 p-2 h-screen ${
        showSidebar ? "overflow-hidden" : "overflow-y-scroll"
      }`}
    >
      <section className="h-10 font-bold flex">
        <h1>Movies App</h1>
      </section>
      <span
        className={`bg-zinc-100 rounded-md text-red-500 p-2 hover:bg-zinc-200 cursor-pointer transition-all fixed z-10 ${
          showSidebar ? "hidden" : "right-[2%]"
        } `}
        onClick={handleSidebar}
      >
        <GiHamburgerMenu />
      </span>
      <Sidebar isVisible={showSidebar} onClose={handleSidebar}>
        <h1 className="font-bold mb-3">Your favorites</h1>
        {favoriteIds.length === 0 && <h1>You have no favorites</h1>}
        {favoriteIds.length > 0 && isLoading && (
          <img src={loading} alt="Loading gif" className="w-20" />
        )}
        {favoriteIds.length > 0 && !isLoading && (
          <Gallery>
            {favorites.map((movie) => getMovieCard(movie, handleLiked, true))}
          </Gallery>
        )}
      </Sidebar>
      <section className="flex-1 flex flex-col relative items-center">
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
