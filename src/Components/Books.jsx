import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://reactnd-books-api.udacity.com/books", {
      headers: { Authorization: "whatever-you-want" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the data");
        }
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData.books);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = data.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(data)
  return (
    <div>
      {/* nav bar */}
      <nav className="nav">
        <div className="brand">
          <h3 className="kalvium-books">Kalvium Books</h3>
          <div className="nav-1">
            <div className="group">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input
                className="input"
                type="search"
                placeholder="Search in kalvium Books"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Link to={"/register"}>
              <div className="btn-div">
                <button className="register-btn">Register</button>
              </div>
            </Link>
          </div>
        </div>
      </nav>
      {/* main content */}
      <div className="container">
        {/* Display books in rows */}
        {filteredBooks.length === 0 ? (
          <h4 className="no-results">Sorry! no results found</h4>
        ) : (
          chunkArray(filteredBooks, 4).map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((book) => (
                <div key={book.id} className="col-md-3">
                  {/* Display book details here */}
                  <div className="book-box">
                    <img src={book.imageLinks.thumbnail} alt={book.title} />
                    <h5 className="book-name">{book.title}</h5>
                    <h6 className="authors-name">{book.authors}</h6>
                    {book.averageRating && (
                      <div className="price">
                        <p>{book.averageRating}★</p>
                        <p>free</p>
                      </div>
                    )}
                    {!book.averageRating && <p>free</p>}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Books;
