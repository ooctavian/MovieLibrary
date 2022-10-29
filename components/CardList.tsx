import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

const List:Next = ({ title, request_url }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios(request_url)
        .then(response => setMoviees(response.data))
  }, [request_url])

  return (
    <div className="card-list">
      <h3>{title}</h3>
      <div className="container">
        {movies.filter(movie => movie.media_type !== "person" && movie.poster_path !== null).map(movie =>
            <Link key={movie.id} to={'/' + ((typeof movie.title === "string") ? "movie" : "tv") + '/' + movie.id}>
            <div key={movie.id} className="movie-card">
                <Image key={movie.id} alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              <span className="movie-title">{(typeof movie.title === "string") ? movie.title : movie.name}</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
export default List;
