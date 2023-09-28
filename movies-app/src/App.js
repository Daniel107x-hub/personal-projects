import { useEffect, useState } from "react";
import { discoverMovies } from "./api/movies";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    discoverMovies()
    .then(response => {
      setMovies(response.data.results);
    })
  }, []);

  const renderedMovies = movies.map(movie => <MovieTile image={movie.})

  return (
    <div className="App">
      {
        console.log(movies)
      }
    </div>
  );
}

function MovieTile({image}){
  return <img src={image} alt="" />
}

export default App;
