import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { getScoreStars } from '../../utils/movie';
import { searchMovieByTitle } from '../../api/movies';
import { getImage } from '../../api/images';

const movies = [
    {
        title: 'Movie 1',
        id: 299054,
        image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 5.5
    },
    {
        title: 'Movie 1',
        id: 299054,
        image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 5.5
    },
    {
        title: 'Movie 1',
        id: 299054,
        image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 5.5
    },
    {
        title: 'Movie 1',
        id: 299054,
        image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 5.5
    },
    {
        title: 'Movie 1',
        id: 299054,
        image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 5.5
    },
    {
        title: 'Movie 1',
        id: 299054,
        image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 5.5
    },
    {
        title: 'Movie 1',
        id: 299054,
        image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 5.5
    },
    {
        title: 'Movie 1',
        id: 299054,
        image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 5.5
    },
]

function SearchBar() {
    const [showResultBox, setShowResultBox] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [timer, setTimer] = useState(null);
    const resultsRef = useRef(null);

    useEffect(() => {
        if(!showResultBox) return;
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showResultBox]);

    const handleClickOutside = (e) => {
        if(resultsRef.current && !resultsRef.current.contains(e.target)) setShowResultBox(false);
    }

    const handleClick = () => {
        setShowResultBox(true);
    }

    const handleUserStops = () => {
        clearTimeout(timer);
        if(searchTerm === ""){
            setSearchResults([]);
            return;
        } //Behavior when search is deleted
        const timeout = setTimeout(() => {
            executeSearch(searchTerm);
        }, 1000);
        setTimer(timeout);
    }

    const executeSearch = async (term) => {
        const result = await searchMovieByTitle(term);
        setSearchResults(result);
    }

    return (
        <div className='font-normal relative ml-10 w-[20%]' ref={resultsRef}>
            <input type="text" name="" id=""  
                className='rounded-md p-1 outline-none ring-2 ring-red-400 focus:bg-slate-50 text-slate-800 w-full' 
                placeholder='Search a movie!'
                value={searchTerm}
                onClick={handleClick} 
                onKeyUp={handleUserStops} 
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {
                showResultBox &&
                <span className='absolute top-10 left-0 bg-white flex flex-col rounded-md p-1 w-full z-10 space-y-2 p-2 max-h-[50vh] overflow-y-auto'>
                    {
                        searchResults.length === 0 &&
                        <div>No results :(</div>
                    }
                    {
                        searchResults.length > 0 &&
                        searchResults.map((movie) => {
                            return <Link to={`/movie/${movie.id}`} key={movie.id}>
                                <Movie key={movie.id} title={movie.title} image={getImage(movie.poster_path)} rate={movie.vote_average}/>
                            </Link>
                        })
                    }
                </span>
            }   
        </div>
    )
}

function Movie({title, image, rate}){
    return(
        <div className='flex flex-row text-slate-700 p-2 bg-slate-100 hover:bg-blue-100 cursor-pointer rounded-md'>
            <section className="rounded-md overflow-hidden text-xs w-10">
                <img src={image} alt="Poster" className='w-full'/>
            </section>
            <section className="data flex flex-col ml-2">
                <h1>{title}</h1>
                <h2 className='flex flex-row text-yellow-600'>{getScoreStars(rate)}</h2>
            </section>
        </div>
    )
}

export default SearchBar