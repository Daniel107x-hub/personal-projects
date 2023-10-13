import Card from "../components/ui/Card";
import MovieTile from "../components/movies/MovieTile";

export function getMovieCard(movie) {
  return (
    <Card key={movie.id}>
      <MovieTile movie={movie}/>
    </Card>
  );
}