import { useEffect } from "react";
function App() {
  useEffect(()=>{
    console.log(process.env.REACT_APP_TMDB_API_KEY);
  }, [])
  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
