import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "../Quotes/quote.css";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(
        `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`
      );
      const newQuotes = response.data.data;
      if (newQuotes.length === 0) {
        setHasMore(false);
      } else {
        setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      alert("you are at the end of the quotes");
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h1>QUOTES</h1>
      <InfiniteScroll
        dataLength={quotes.length} 
        next={fetchMoreData}
        hasMore={hasMore} 
        loader={<p className="loading">Loading more quotes...</p>} 
        endMessage={<p className="end-message">You have seen all the quotes!</p>} 
      >
        <div className="main">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {quotes.map((item) => (
              <p key={item.id} style={{ margin: "10px 0" }}>
                {item.quote}
              </p>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Quotes;
