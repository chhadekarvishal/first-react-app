import { createContext, useContext, useState } from "react";

const FavoriteArticlesContext = createContext();

export function useFavoriteArticlesContext() {
  return useContext(FavoriteArticlesContext);
}

export function FavoriteProvider({ children }) {
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  return (
    <FavoriteArticlesContext.Provider
      value={{ favoriteArticles, setFavoriteArticles }}
    >
      {children}
    </FavoriteArticlesContext.Provider>
  );
}
