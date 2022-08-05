import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieList from "./components/MovieList";

const MoviePage = ({ api }) => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  useEffect(
    () => {
      fetch(`${api.url}movie/${id}?api_key=${api.key}`)
        .then(response => response.json())
        .then(data => setDetails(data))
    }, [api, id])
  return (
    <div className="details-page">
      <div className="backdrop">
        <img alt={details.title} src={`http://image.tmdb.org/t/p/original${details.backdrop_path}`} />
      </div>
      <br />
      <br />
      <div className="row">
        <div className="card">
          <img alt={details.title} src={`http://image.tmdb.org/t/p/original${details.poster_path}`} />
          <div>
            <h3>{details.title}</h3>
            <p>
              <span class="rating">🌟{details.vote_average}</span>
            </p>
            <p>
              <span class="runtime">{details.runtime} minutes</span>
            </p>
            <p>{details.overview}</p>
          </div>
        </div>
      </div>
      <MovieList title="Movies you may like" request_url={`${api.url}/movie/${id}/recommendations?api_key=${api.key}`} />
    </div>
  )

}

export default MoviePage;
