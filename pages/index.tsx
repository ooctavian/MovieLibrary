import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Search from '../components/Search'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from '../styles/Home.module.css'
import {fetchApi} from '../helpers/fetchTMBDdata'
import Card from '../components/Card'

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}


const Home: NextPage = ({CarouselTrendingData, trendingMovies, trendingTVSeries}) => {

  return (
    <div className="sideMargins">
      <Carousel className={styles.carousel}
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                showThumbs={false}
      >
        {CarouselTrendingData.map(item=>
          <>
            <div className={styles.carouselslide}>
              <div className={styles.legend}>
                <h3 className={styles.carouselHeading}>{item.title || item.name}</h3>
                <div className={styles.descriptionContainer}>
                  <p className={styles.description}>{truncateString(item.overview,200)}</p>
                </div>
                <a href="#" className={`blue-button ${styles.blueButton}`}>Watch now</a>
              </div>
              <img className={styles.backdrop} src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={item.title} layout='fill' key={item.id} />
            </div>
          </>
        )}
      </Carousel>

      <h2 className={styles.sectionHeading}>Trending movies</h2>
      <div className={"section"}>
        <div className={"cardList"}>
          {trendingMovies.map((movie,key)=>
            <Card key={key} title={movie.title} genres={movie.genres} poster_url={movie.poster_path}/>
          )}
        </div>
        <div>
          <a href="#" className={`blue-button ${styles.blueButton}`}>See more</a>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>Trending TV series</h2>
      <div className={"section"}>
        <div className={"cardList"}>
          {trendingTVSeries.map((movie,key)=>
            <Card key={key} title={movie.title} genres={movie.genres} poster_url={movie.poster_path}/>
          )}
        </div>
        <div>
          <a href="#" className={`blue-button ${styles.blueButton}`}>See more</a>
        </div>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  let props = {};
  let res = await fetchApi('/movie/upcoming');
  props.CarouselTrendingData = res.data.results.filter(item => item.media_type !='person' && !item.adult);
  res = await fetchApi('/genre/movie/list');
  let genres = res.data.genres;
  let movie_genres = {};
  genres.forEach(genre => movie_genres[genre.id] = genre.name)

  res = await fetchApi('/genre/tv/list');
  genres = res.data.genres;
  let tv_genres = {};
  genres.forEach(genre => tv_genres[genre.id] = genre.name)

  res = await fetchApi('/trending/movie/week');
  props.trendingMovies = res.data.results.map(item=>(
    {
      title:item.title,
      genres:item.genre_ids.map(id=>movie_genres[id]),
      poster_path:item.poster_path,
    }
  ))

  res = await fetchApi('/trending/tv/week');
  props.trendingTVSeries = res.data.results.map(item=>(
    {
      title:item.name,
      genres:item.genre_ids.map(id=>tv_genres[id]),
      poster_path:item.poster_path,
    }
  ))

  return {
    props: props,
  }
};
