import MovieGallery from './MovieGallery';
import FindMovies from './components/FindMovies';
import { useState } from 'react';
import MovieList from './components/MovieList';

const MainPage = ({ api }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <FindMovies onSubmit={handleSubmit} name={query} onChange={(e) => setQuery(e.target.value)} />
      {(query === "") ? <MovieGallery api={api} />
        : <MovieList title={`Search results for ${query}`} request_url={`${api.url}search/multi?api_key=${api.key}&query=${query.replaceAll(" ", "%20")}`} />}
    </>
  )
}
export default MainPage;
