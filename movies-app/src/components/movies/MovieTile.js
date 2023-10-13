import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";
import { getImage } from "../../api/images";
import "./MovieTile.css";

function MovieTile({ movie, onLiked, isFav }) {
  const [isFavorite, setIsFavorite] = useState(isFav || false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsFavorite(isFav || false);
  }, [isFav]);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent link action
    e.stopPropagation(); // Prevent bubble phase to parent elements
    setIsFavorite((prev) => !prev);
    onLiked(movie.id);
  };

  const { poster_path, title, release_date, vote_average } = movie;
  const scoreIcons = getScoreStars(vote_average);

  let icon = <AiOutlineHeart />;
  if (isFavorite || isHovered) icon = <AiFillHeart />;

  return (
    <Link to={`movie/${movie.id}`} className="flex flex-col">
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
        <span className="title text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </span>
        <span className="release-date text-sm">{release_date}</span>
        <span className="vote text-xs flex flex-row">{scoreIcons}</span>
      </section>
    </Link>
  );
}

const getScoreStars = (votes) => {
  const score = votes / 2;
  const intPart = Math.floor(score);
  const hasDecimalPart = (score * 10) % 10 > 0;
  let scoreIcons = [];
  for (let index = 0; index < intPart; index++)
    scoreIcons.push(<BiSolidStar key={index} />);
  if (hasDecimalPart) scoreIcons.push(<BiSolidStarHalf key={intPart} />);
  return scoreIcons;
};

export default MovieTile;
