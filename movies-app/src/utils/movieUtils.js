import Card from "../components/ui/Card";
import MovieTile from "../components/movies/MovieTile";

export function getMovieCard(movie, onLiked, isFavorite) {
  return (
    <Card key={movie.id}>
      <MovieTile movie={movie} onLiked={onLiked} isFav={isFavorite} />
    </Card>
  );
}
