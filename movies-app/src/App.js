import { useEffect, useState } from "react";
import Card from "./components/ui/Card";
import MovieTile from "./components/movies/MovieTile";
import Sidebar from "./components/ui/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { discoverMovies, getMovieById } from "./api/movies";
import loading from "./loading.gif";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    discoverMovies().then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (favoriteIds.length > 0) {
        setIsLoading(true);
        try {
          const requests = favoriteIds.map((id) => getMovieById(id));
          const responses = await Promise.all(requests);
          const data = responses.map((response) => response.data);
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

  const handleLiked = (id) => {
    const isFavorite = favoriteIds.includes(id);
    let updatedFavorites = [...favoriteIds];
    if (isFavorite)
      updatedFavorites = updatedFavorites.filter((favId) => favId !== id);
    else updatedFavorites.push(id);
    setFavoriteIds(updatedFavorites);
  };

  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div
      className={`bg-gray-800 font-jakarta flex flex-col justify-between text-zinc-200 p-2 h-screen ${
        showSidebar ? "overflow-hidden" : "overflow-y-scroll"
      }`}
    >
      <section className="h-10 font-bold">Movies App</section>
      <section className="flex-1 flex flex-col relative items-center">
        <h1 className="mt-2 mb-6 text-xl">Suggestions</h1>
        <span
          className={`bg-zinc-100 rounded-md text-red-500 p-2 hover:bg-zinc-200 cursor-pointer transition-all fixed z-10 ${
            showSidebar ? "hidden" : "right-[2%]"
          } `}
          onClick={handleSidebar}
        >
          <GiHamburgerMenu />
        </span>
        <Gallery>
          {movies.map((movie) =>
            getMovieCard(movie, handleLiked, favoriteIds.includes(movie.id))
          )}
        </Gallery>
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
      </section>
    </div>
  );
}

function Gallery({ children }) {
  return (
    <section className="gallery flex items-center justify-center content-center">
      {children}
    </section>
  );
}

const getMovieCard = (movie, onLiked, isFavorite) => {
  return (
    <Card key={movie.id}>
      <MovieTile movie={movie} onLiked={onLiked} isFav={isFavorite} />
    </Card>
  );
};

export default App;
