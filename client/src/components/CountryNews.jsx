import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function CountryNews() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;

  useEffect(() => {
    console.log("params.iso:", params.iso); // Debugging log
    if (!params.iso) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/country/${params.iso}?page=${page}&pageSize=${pageSize}`
        );
        console.log("Response status:", response.status); // Debugging log
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const myJson = await response.json();
        console.log("API Response:", myJson); // Debugging log
        if (myJson.success && myJson.data) {
          setTotalResults(myJson.data.totalResults || 1);
          setData(myJson.data.articles || []);
        } else {
          setError(myJson.message || "An error occurred while fetching news.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, params.iso]);

  function handlePrev() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setPage((prev) => Math.min(prev + 1, Math.ceil(totalResults / pageSize)));
  }

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="my-10 grid lg:place-content-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10 lg:gap-14 md:px-16 p-3">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            <p class="py-6">No news articles found for this country.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.max(1, Math.ceil(totalResults / pageSize))}
          </p>
          <button
            disabled={page >= Math.max(1, Math.ceil(totalResults / pageSize))}
            className="pagination-btn"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default CountryNews;