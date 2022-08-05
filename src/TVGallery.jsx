import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";

const TVGallery = ({ api }) => {

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(`${api.url}/genre/tv/list?api_key=${api.key}`)
      .then(response => response.json())
      .then(data => setGenres(data.genres))
  }, [api])
  return (<div>
    {genres.map(genre =>
      <MovieList key={genre.name} title={genre.name} request_url={`${api.url}discover/tv?api_key=${api.key}&with_genres=${genre.id}`} />
    )}
  </div>);
}

export default TVGallery;
