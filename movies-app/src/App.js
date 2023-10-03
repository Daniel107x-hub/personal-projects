import { useEffect, useState } from "react";
import { discoverMovies } from "./api/movies";
import { getImage } from "./api/images";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiSolidStar, BiSolidStarHalf, BiStar } from 'react-icons/bi'

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

  const renderedMovies = movies.map((movie) => (
    <Card key={movie.id}>
      <MovieTile movie={movie} onLiked={handleLiked}/>
    </Card>
  ));

  return (
    <div className="bg-gray-800 font-jakarta h-screen flex flex-col justify-between text-zinc-200 overflow-y-scroll p-2">
      <section className="h-10 font-bold">Movies App</section>
      <section className="flex-1 flex flex-col">
        <h1 className="mt-2 mb-6">Suggestions</h1>
        <div className="grid grid-cols-6 gap-5">
          {renderedMovies}
        </div>;
      </section>
    </div>
  );
}


function Card({ children }) {
  return (
    <div className="bg-red-700 p-2 rounded-lg hover:bg-red-800 cursor-pointer">
      {children}
    </div>
  );
}

function MovieTile({ movie, onLiked }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
    onLiked(movie);
  };

  const { poster_path, title, release_date, vote_average } = movie;
  const scoreIcons = getScoreStars(vote_average);

  let icon = <AiOutlineHeart />;
  if (isFavorite || isHovered) icon = <AiFillHeart />;

  return (
    <div className="flex flex-col">
      <section className="rounded-lg overflow-hidden relative">
        <img src={getImage(poster_path)} alt="" />
        <span
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setTimeout(() => setIsHovered(false), 50)}
          onClick={handleFavoriteClick}
          className="circle-icon absolute bg-zinc-100 bottom-2 right-2 rounded-full w-8 h-8 text-red-400 flex items-center justify-center fill-red-800 hover:bg-zinc-300"
        >
          <div className="icon">{icon}</div>
        </span>
      </section>
      <section className="flex flex-col font-medium flex space-y-1 mt-2 px-1">
        <span className="title font-semibold">{title}</span>
        <span className="release-date text-sm">{release_date}</span>
        <span className="vote text-xs flex flex-row">{scoreIcons}</span>
      </section>
    </div>
  );
}

const getScoreStars = (votes) => {
  const score = votes / 2;
  const intPart = Math.floor(score);
  const hasDecimalPart = score * 10 % 10 > 0;
  let scoreIcons = []
  for(let index = 0 ; index < intPart ; index++) scoreIcons.push(<BiSolidStar key={index}/>)
  if(hasDecimalPart)  scoreIcons.push(<BiSolidStarHalf key={intPart}/>);
  return scoreIcons;
}

export default App;
