import { useEffect, useState } from "react";
import Card from "./components/ui/Card";
import MovieTile from './components/movies/MovieTile';
import Sidebar from "./components/ui/Sidebar";
import { GiHamburgerMenu } from 'react-icons/gi';
import { discoverMovies } from "./api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    discoverMovies().then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const handleLiked = (movie) => {
    const isFavorite = favorites.includes(movie);
    let updatedFavorites = [...favorites];
    if(isFavorite) updatedFavorites = updatedFavorites.filter(fav => fav.id !== movie.id);
    else updatedFavorites.push(movie);
    setFavorites(updatedFavorites);
  }

  const handleSidebar = () => {
    setShowSidebar(prev => !prev);
  }

  const renderedMovies = movies.map((movie) => (
    <Card key={movie.id}>
      <MovieTile movie={movie} onLiked={handleLiked} isFav={() => favorites.includes(movie)}/>
    </Card>
  ));

  const renderedFavorites = favorites.map((movie) => (
    <Card key={movie.id}>
      <MovieTile movie={movie} onLiked={handleLiked} isFav={() => favorites.includes(movie)}/>
    </Card>
  ));

  return (
    <div className={`bg-gray-800 font-jakarta flex flex-col justify-between text-zinc-200 p-2 h-screen ${showSidebar ? 'overflow-hidden' : 'overflow-y-scroll'}`}>
      <section className="h-10 font-bold">Movies App</section>
      <section className="flex-1 flex flex-col relative items-center">
        <h1 className="mt-2 mb-6 text-xl">Suggestions</h1>
        <span 
          className={`bg-zinc-100 rounded-md text-red-500 p-2 hover:bg-zinc-200 cursor-pointer transition-all fixed z-10 ${showSidebar ? 'hidden' : 'right-[2%]'} `}
          onClick={handleSidebar}>
          <GiHamburgerMenu/>
        </span>
        <div className="grid grid-cols-6 gap-5">
          {renderedMovies}
        </div>
        <Sidebar isVisible={showSidebar} onClose={handleSidebar}>
          <h1 className="font-bold">Your favorites</h1>
          <section className="p-10 grid grid-cols-1 gap-3">
            {
              renderedFavorites
            }
          </section>
        </Sidebar>
      </section>
    </div>
  );
}


export default App;
