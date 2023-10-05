function Card({ children }) {
    return (
        <div className="bg-red-700 p-2 rounded-lg hover:bg-red-800 cursor-pointer">
        {children}
        </div>
    );
}

export default Card;