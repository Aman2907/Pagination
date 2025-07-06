import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchProd = async () => {
    const fetching = await fetch("https://dummyjson.com/products?limit=100");
    const data = await fetching.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProd();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="app">
      <h1>Products List</h1>
      <ul>
        {currentItems.map((prod) => (
          <li key={prod.id}>
            <h3>{prod.title}</h3>
            <p>{prod.description}</p>
            <img src={prod.thumbnail} alt={prod.title} width="100" />
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          ⬅ Prev
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default App;
