import React from 'react'
import './Sidebar.css'

function Sidebar({children, isVisible, onClose}) {
    console.log(isVisible)
    return (
        <>
            <div className={`rounded-xl bg-gray-700 w-[30%] h-screen top-0 z-10 fixed transition-all overflow-y-auto flex flex-col items-center text-zinc-200 p-2 ${isVisible ? 'right-0' : '-right-1/3'}`}>
                {children}
            </div>
            <div className={`overlay fixed top-0 left-0 w-screen h-screen ${isVisible ? 'block' : 'hidden'}`} onClick={onClose}></div>
        </>
    )
}

export default Sidebar