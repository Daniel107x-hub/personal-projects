import { useEffect, useState } from "react";
import { discoverMovies } from "./api/movies";
import { getImage } from "./api/images";
function App() {
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    discoverMovies()
    .then(response => {
      setMovies(response.data.results);
    })
  }, []);

  const renderedMovies = movies.map(movie => <Card key={movie.id}><MovieTile movie={movie}/></Card>)

  return (
    <div className="bg-gray-800 font-jakarta h-screen flex flex-col justify-between text-zinc-200 overflow-y-scroll p-2">
      <section className="h-10 font-bold">
        Movies App
      </section>
      <section className="flex-1 flex flex-col">
        <h1 className="mt-2 mb-6">Suggestions</h1>
        <MovieGallery movies={renderedMovies}/>
      </section>
    </div>
  );
}

function MovieGallery({movies}){
  return <div className="grid grid-cols-7 gap-5">
    {movies}
  </div> 
}

function Card({children}){
  return <div className="bg-red-700 p-2 rounded-lg hover:bg-red-800 cursor-pointer">
    {children}
  </div>
}

function MovieTile({movie}){
  const {poster_path, title, release_date, vote_average} = movie;
  return <div className="flex flex-col">
    <section className="rounded-lg overflow-hidden">
      <img src={getImage(poster_path)} alt=""/>
    </section>
    <section className="flex flex-col font-medium flex space-y-1 mt-2 px-1">
      <span className="title font-semibold">{title}</span>
      <span className="release-date text-sm">{release_date}</span>
      <span className="vote text-xs">{vote_average}</span>
    </section>
  </div>
}

export default App;
