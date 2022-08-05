import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MainPage from './MainPage';
import MoviePage from './MoviePage';
import TVSeriesPage from './TVSeriesPage';

import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import MovieGallery from './MovieGallery';
import TVGallery from './TVGallery';

let api = {
  key: process.env.REACT_APP_API_KEY,
  url: process.env.REACT_APP_API_URL,
}

const Redirect = (props) => {
  return <Navigate replace to={`/${props.path}/${useParams().new_id}`} />;
}

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage api={api} />} />
          <Route path="/movies" element={<MovieGallery api={api} />} />
          <Route path="/tvs" element={<TVGallery api={api} />} />
          <Route path="/movie/:id" element={<MoviePage api={api} />} />
          <Route path="/movie/:orignal_id/movie/:new_id" element={<Redirect path="movie" />} />
          <Route path="/movies/movie/:new_id" element={<Redirect path="movie" />} />
          <Route path="/tvs/tv/:new_id" element={<Redirect path="tv" />} />
          <Route path="/tv/:orignal_id/tv/:new_id" element={<Redirect path="tv" />} />
          <Route path="/tv/:id" element={<TVSeriesPage api={api} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
