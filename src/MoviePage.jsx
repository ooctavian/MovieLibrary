import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieList from "./components/MovieList";

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


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
        <div className="info" style={{ display: "table" }}>
          <div style={{ display: "table-row" }}>
            <div style={{ display: "table-cell" }}><b>Status:</b></div>
            <div style={{ display: "table-cell" }}>{details.status}</div>
          </div>

          <div style={{ display: "table-row" }}>
            {
              (details.genres !== undefined) ? <>
                <div style={{ display: "table-cell" }}><b>Genres:</b></div>
                <div style={{ display: "table-cell" }}>{details.genres.map(genre => genre.name).join(", ")}</div>
              </> : "Loading"
            }
          </div>

          <div style={{ display: "table-row" }}>
            <div style={{ display: "table-cell" }}><b>Release date:</b></div>
            <div style={{ display: "table-cell" }}>{details.release_date}</div>
          </div>

          <div style={{ display: "table-row" }}>
            <div style={{ display: "table-cell" }}><b>IMDB page:</b></div>
            <div style={{ display: "table-cell" }}><a href={`https://www.imdb.com/title/${details.imdb_id}`}>{details.imdb_id}</a></div>
          </div>

          <div style={{ display: "table-row" }}>
            <div style={{ display: "table-cell" }}><b>Adult:</b></div>
            <div style={{ display: "table-cell" }}>{(details.adult) ? "Yes" : "No"}</div>
          </div>

          <div style={{ display: "table-row" }}>
            <div style={{ display: "table-cell" }}><b>Budget:</b></div>
            <div style={{ display: "table-cell" }}>{(details.budget) ? formatter.format(details.budget) : "-"}</div>
          </div>

          <div style={{ display: "table-row" }}>
            {(details.production_countres !== undefined) ?
              <>
                <div style={{ display: "table-cell" }}><b>Country:</b></div>
                <div style={{ display: "table-cell" }}>{details.production_countries[0].name}</div>
              </> : ""
            }
          </div>
        </div>
      </div>
      <MovieList title="Movies you may like" request_url={`${api.url}/movie/${id}/recommendations?api_key=${api.key}`} />
    </div>
  )

}

export default MoviePage;
