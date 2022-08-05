import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieList from "./components/MovieList";

const TVSeriesPage = ({ api }) => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  useEffect(
    () => {
      fetch(`${api.url}tv/${id}?api_key=${api.key}`)
        .then(response => response.json())
        .then(data => setDetails(data))
    }, [api, id])
  return (
    <div className="details-page">
      <div className="backdrop">
        <img alt={details.name} src={`http://image.tmdb.org/t/p/original${details.backdrop_path}`} />
      </div>
      <br />
      <br />
      <div className="row">
        <div className="card">
          <img alt={details.name} src={`http://image.tmdb.org/t/p/original${details.poster_path}`} />
          <div>
            <h3>{details.name}</h3>
            <p>
              <span class="rating">🌟{details.vote_average}</span>
            </p>
            <p>
              <span class="runtime">{details.number_of_seasons} seasons</span>
            </p>
            <p>{details.overview}</p>
          </div>
        </div>
      </div>
      <MovieList title="Movies you may like" request_url={`${api.url}/tv/${id}/recommendations?api_key=${api.key}`} />
    </div>
  )

}

export default TVSeriesPage;
