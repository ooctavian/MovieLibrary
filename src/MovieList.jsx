import { useEffect, useState } from "react";import './MovieList.css';const MovieList = ({ title, request_url }) => {  // console.log(title, request_url);  const [movies, setMovies] = useState([]);  useEffect(() => {    fetch(request_url)      .then(response => response.json())      .then(data => setMovies(data.results))  }, [request_url])  console.log(movies);  return (    <div>      <h3>{title}</h3>      <div className="container">        {movies.filter(movie => movie.media_type !== "person" && movie.poster_path !== null).map(movie =>          <div key={movie.id} className="movie-card">            <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />            <span className="movie-title">{(typeof movie.title === "string") ? movie.title : movie.name}</span>          </div>        )}      </div>    </div>  )}export default MovieList;