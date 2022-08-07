import FindMovies from './components/FindMovies';
import { useState } from 'react';
import MovieList from './components/MovieList';

const homepage_list = {
  "Popular": "popular",
  "Top rated": "top_rated"
}

const MainPage = ({ api }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <FindMovies onSubmit={handleSubmit} name={query} onChange={(e) => setQuery(e.target.value)} />
      {(query === "") ?
        ["movie", "tv"].map(key =>
          <>
            <h1>{(key === "movie") ? "Movies" : "TV series"}</h1>
            {Object.keys(homepage_list).map((title) => {
              return <MovieList key={title} title={title} request_url={`${api.url}${key}/${homepage_list[title]}?api_key=${api.key}`} />;
            }
            )}
          </>
        )
        : <MovieList title={`Search results for ${query}`} request_url={`${api.url}search/multi?api_key=${api.key}&query=${query.replaceAll(" ", " % 20")}`} />}
    </>
  )
}
export default MainPage;
