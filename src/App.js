import React, { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import FindMovies from './FindMovies';
import Footer from './Footer';
import MovieGallery from './MovieGallery';
import MovieList from './MovieList';

let api = {
  key: process.env.REACT_APP_API_KEY,
  url: process.env.REACT_APP_API_URL,
}

function App() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  console.log(query);

  return (
    <>
      <NavBar />
      <FindMovies onSubmit={handleSubmit} name={query} onChange={(e) => setQuery(e.target.value)} />
      {(query === "") ? <MovieGallery api={api} /> : <MovieList title={`Search results for ${query}`} request_url={`${api.url}search/multi?api_key=${api.key}&query=${query.replaceAll(" ", "%20")}`} />}
      <Footer />
    </>
  );
}

export default App;
