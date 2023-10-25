function getImage(posterPath){ // TODO: Add default image if not found
    return `https://image.tmdb.org/t/p/original${posterPath}`;
}

export {getImage}