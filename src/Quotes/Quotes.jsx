import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Quotes/quote.css'


const Quotes = () => {
  const [Quote, setQuote] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchQuotes = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`
      );
      setQuote(response.data.data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      alert("Error fetching quotes")
    } finally {
      setLoading(false)
    }
  };

  const next = () => {
    setPage(prevPage => prevPage + 1);
  };

  const prev = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1))
  };

  useEffect(() => {
    fetchQuotes();
  }, [page]);

  return (
    <>
    <h1>QUOTES</h1>
    {loading ? (<p
     className="loading">Loading more quotes...</p>):
     
     (
      <div className="main">
          <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: 'column',
          justifyContent: "center",
          height:'100vh',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              width: "60%",
            }}
          >
            {Quote.map((item) => (
              <p key={item.id}>
                {item.quote}
              </p>
            ))}
          </div>
        </div>

   
      </div>
     
      <div
      className="btngrp"
        >
          <button
          className="btn"
          onClick={prev} disabled={page === 1}>prev</button>
          <button
          className="btn"
          onClick={next} disabled={page === 10}>next</button>
        </div>
      </div>
     )
     
     }

    
    </>
  );
};

export default Quotes;