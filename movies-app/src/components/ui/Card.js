function Card({ children, className }) {
    return (
        <div className={`bg-red-700 p-2 rounded-lg hover:bg-red-800 cursor-pointer ${className}`}>
        {children}
        </div>
    );
}

export default Card;