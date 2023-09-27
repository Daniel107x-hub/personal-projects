import {useState, useEffect} from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch("http://www.omdbapi.com/?apikey=d29d78b5&t=bat&plot=full");
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <section className="top-bar">
        <input type="text" name="search" id="search" placeholder="Start typing!"/>
      </section>
      <section className="main">
        <h1>Screen title</h1>
        <div className="vertical-visualizer">
          <MovieTile image="asdfsef" title="Title 1" year="2039" genre="Gore"/>
        </div>
      </section>
    </div>
  );
}

function MovieTile({image, title, year, genre}){
  return <div>
    <div className="poster">
      <img src={image} alt="" />
    </div>
    <div className="information">
      <h1>{title}</h1>
      <h2>{year}</h2>
      <h3>{genre}</h3>
    </div>
  </div>
}

export default App;
