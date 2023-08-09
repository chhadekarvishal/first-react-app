import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useFavoriteArticlesContext } from "../Context/FavoriteProvider";

function Article({ title, description, url }) {
  const { favoriteArticles, setFavoriteArticles } =
    useFavoriteArticlesContext();

  // Truncate text to a certain number of characters
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const addToFavorites = () => {
    const newFavorite = { title, description, url };
    setFavoriteArticles([...favoriteArticles, newFavorite]);
  };

  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">
            {title ? truncateText(title, 50) : title}
          </h5>
          <p className="card-text">
            {description ? truncateText(description, 100) : description}
          </p>
          <Card.Img variant="top" src={url} />
        </div>
        <div className="d-flex justify-content-center mb-2">
          {" "}
          {/* Center align only the button */}
          <Button
            onClick={addToFavorites}
            variant="secondary"
            size="sm"
            style={{ width: "100px" }}
          >
            Read Later
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Article;
