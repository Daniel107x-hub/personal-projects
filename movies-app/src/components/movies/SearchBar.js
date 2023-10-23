import React, {useState, useRef, useEffect} from 'react'

function SearchBar() {
    const [showResultBox, setShowResultBox] = useState(false);
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

    return (
        <div className='font-normal w-full relative' ref={resultsRef}>
            <input type="text" name="" id="" placeholder='Search a movie!' className='rounded-md p-1 outline-none ring-2 ring-red-400 focus:bg-slate-50 text-slate-800 w-full' onClick={handleClick}/>
            {
                showResultBox &&
                <span className='absolute -bottom-[110%] left-0 bg-red-200 w-full bg-white rounded-md p-1'>
                    Result box
                </span>
            }   
        </div>
    )
}

export default SearchBar