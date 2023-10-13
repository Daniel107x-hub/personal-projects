import { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getImage } from "../../api/images";
import "./MovieTile.css";
import FavoritesContext from "../../context/favorites";
import Card from "../ui/Card";
import { getScoreStars } from "../../utils/movie";

function MovieTile({ id, title, poster, rating, date }) {
  const {handleLiked, isFavorite} = useContext(FavoritesContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(isFavorite(id));

  useEffect(() => {
    setIsLiked(isFavorite(id));
  }, [isFavorite, id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent link action
    e.stopPropagation(); // Prevent bubble phase to parent elements
    handleLiked(id);
  };

  let icon = <AiOutlineHeart />;
  if (isLiked || isHovered) icon = <AiFillHeart />;

  return (
    <Card className="flex flex-col">
      {
        poster &&
        <section className="rounded-lg overflow-hidden relative">
          <img src={getImage(poster)} alt="" />
          <span
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setTimeout(() => setIsHovered(false), 50)}
            onClick={handleFavoriteClick}
            className="circle-icon absolute bg-zinc-100 bottom-2 right-2 rounded-full w-8 h-8 text-red-400 flex items-center justify-center fill-red-800 hover:bg-zinc-300"
          >
            <div className="icon">{icon}</div>
          </span>
        </section>
      }
      <section className="flex flex-col font-medium flex space-y-1 px-1">
        {
          title &&
          <span className="title text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
        }
        {date && <span className="release-date text-sm">{date}</span>}
        {rating && <span className="vote text-xs flex flex-row">{getScoreStars(rating)}</span>}
      </section>
    </Card>
  );
}

export default MovieTile;
