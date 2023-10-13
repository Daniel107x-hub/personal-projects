import { createContext, useState } from "react";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const handleLiked = (id) => {
    const isFavorite = favoriteIds.includes(id);
    let updatedFavorites = [...favoriteIds];
    if (isFavorite)
      updatedFavorites = updatedFavorites.filter((favId) => favId !== id);
    else updatedFavorites.push(id);
    setFavoriteIds(updatedFavorites);
  };

  const isFavorite = (id) => {
    return favoriteIds.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        handleLiked,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
export { FavoritesProvider };
