function Card({ children, className }) {
    return (
        <div className={`bg-neutral-700 p-2 rounded-lg hover:bg-neutral-600 cursor-pointer ${className}`}>
        {children}
        </div>
    );
}

export default Card;