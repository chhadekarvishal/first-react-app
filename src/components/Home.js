import React, { useState, useEffect } from "react";
import Article from "./Article";
import { useSearchContext } from "../Context/SearchProvider";
import { response } from "../Utils/data";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12; // Number of articles per page
  const maxPaginationButtons = 10; // Maximum number of pagination buttons to show
  const { searchText, setSearchText } = useSearchContext();

  // Import the environment variable
  // const apiKey = 'c879e8159a1f434a8b91955a0b5ba010';
  const apiKey = "c879e8159a1f434a8b91955a0b5ba010";

  async function fetchData(page, country, category, searchTitle) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${searchTitle}&country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${articlesPerPage}`
      );
      // `https://newsapi.org/v2/everything?q=tesla&country=${country}&category=${category}&from=2023-08-07&sortBy=publishedAt&apiKey=c879e8159a1f434a8b91955a0b5ba010&page=${page}&pageSize=${articlesPerPage}`
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      setData({ articles: json.articles, totalResults: json.totalResults });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(currentPage, "us", "business", searchText);
    return () => {
      console.log("Clean up previous API call");
    };
  }, [currentPage, searchText]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to render the pagination buttons with ellipsis
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(data.totalResults / articlesPerPage);
    const currentPageIndex = currentPage - 1;

    // If total pages are less than or equal to the maximum number of buttons, show all buttons
    if (totalPages <= maxPaginationButtons) {
      return Array.from({ length: totalPages }).map((_, pageIndex) =>
        renderPageButton(pageIndex + 1)
      );
    }

    // Calculate offsets to show a range of pages around the current page
    const buttons = [];
    const leftOffset = Math.floor((maxPaginationButtons - 1) / 2);
    const rightOffset = maxPaginationButtons - leftOffset - 1;
    let startIndex = currentPageIndex - leftOffset;
    let endIndex = currentPageIndex + rightOffset;

    // Handle cases where range goes beyond the last page
    if (startIndex < 0) {
      endIndex += Math.abs(startIndex);
      startIndex = 0;
    }

    // Show "..." and the first page if range starts beyond the first page
    if (endIndex >= totalPages) {
      startIndex -= endIndex - (totalPages - 1);
      endIndex = totalPages - 1;
    }

    // Add buttons within the calculated range
    if (startIndex > 0) {
      buttons.push(renderPageButton(1));
      if (startIndex > 1) {
        buttons.push("...");
      }
    }

    // Show "..." and the last page if range ends before the last page
    for (let i = startIndex; i <= endIndex; i++) {
      buttons.push(renderPageButton(i + 1));
    }

    if (endIndex < totalPages - 1) {
      if (endIndex < totalPages - 2) {
        buttons.push("...");
      }
      buttons.push(renderPageButton(totalPages));
    }

    return buttons;
  };

  // Function to render an individual page button
  const renderPageButton = (pageNumber) => (
    <li
      key={pageNumber}
      className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
    >
      <button className="page-link" onClick={() => paginate(pageNumber)}>
        {pageNumber}
      </button>
    </li>
  );

  return (
    <div className="container mt-4">
      {/* Article rendering */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {loading ? (
          <div className="text-center w-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          data.articles.map((article, index) => (
            <Article
              key={index}
              title={article.title}
              description={article.description}
              url={article.urlToImage}
            />
          ))
        )}
      </div>
      {/* Paginator */}
      <div className="pagination justify-content-center mt-3">
        <ul className="pagination">
          {loading ? (
            ""
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            renderPaginationButtons()
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
