import { useEffect, useState } from "react";
import Card from "./components/ui/Card";
import MovieTile from './components/movies/MovieTile';
import Sidebar from "./components/ui/Sidebar";
import { GiHamburgerMenu } from 'react-icons/gi';
import { discoverMovies } from "./api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    discoverMovies().then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const handleLiked = (id) => {
    const movie = movies.find(movie => movie.id === id);
    const isFavorite = movie.isFavorite || false;
    const updatedMovies = movies.map((movie) => {
      if(movie.id !== id) return movie;
      return {...movie, isFavorite: !isFavorite};
    })
    setMovies(updatedMovies);
  }

  const handleSidebar = () => {
    setShowSidebar(prev => !prev);
  }

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
        <Gallery>
          {
            movies
            .map((movie) => getMovieCard(movie, handleLiked))
          }
        </Gallery>
        <Sidebar isVisible={showSidebar} onClose={handleSidebar}>
          <h1 className="font-bold">Your favorites</h1>
          <Gallery>
          {
            movies
            .filter((movie) => movie.isFavorite)
            .map((movie) => getMovieCard(movie, handleLiked))
          }
          </Gallery>
        </Sidebar>
      </section>
    </div>
  );
}

function Gallery({children}){
  return <section className="gallery">
    {
      children
    }
  </section>
}

const getMovieCard = (movie, onLiked) => {
  return <Card key={movie.id}>
  <MovieTile movie={movie} onLiked={onLiked}/>
</Card>
}

export default App;
