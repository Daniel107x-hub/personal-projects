import React, {useEffect} from 'react'
import ReactDOM from 'react-dom';

function Modal({children, onClose, actionBar}){
    useEffect(()=>{
        document.body.classList.add('overflow-hidden')
        return () => document.body.classList.remove('overflow-hidden')
    },[])
    return ReactDOM.createPortal(
        <div>
            <div onClick={onClose} className='fixed inset-0 bg-gray-300 opacity-80 flex'></div>
            <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-10 bg-yellow-300 rounded-lg">
                <div className='flex flex-col justify-between h-full'>
                    {children}
                    <div>
                        {actionBar}
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    )
}

export default Modal;