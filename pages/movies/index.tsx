import type { NextPage } from 'next'
import Card from '../../components/Card'
import {fetchApi} from '../../helpers/fetchTMBDdata'
import {useState, useEffect, useCallback, useRef} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

const Movies: NextPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [movieList, setMovieList] = useState(props.movie_list);
    const [hasMore, setHasMore] = useState(true);


    const getMoreMovies = async () => {
        console.log(page)
        fetch(`/api/movie?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                if(parseInt(data.page)>=parseInt(data.total_pages)){
                    setHasMore(false)
                }
                let  movie_list = data.results.map(item=>(
                    {
                        title:item.title,
                        genres:item.genre_ids.map(id=>props.genres[id]),
                        poster_path:item.poster_path,
                }));
               setMovieList([...movieList,...movie_list])
                setPage(page+1)
            }
            );
    };


    return (
        <>
            <InfiniteScroll
                dataLength={movieList.length}
                next={getMoreMovies}
                hasMore={hasMore}
                loader={<div className="center-container verticalMargins"><div className="loading"/></div>}
                endMessage={<h4>Nothing more to show</h4>}
            >
                <div className="sideMargins verticalMargins">
                    <div className={"section"}>
                        <div className={"cardList"}>
                            {movieList.map((movie,key)=>
                                <Card key={key} title={movie.title} genres={movie.genres} poster_url={movie.poster_path}/>
                            )}
                        </div>
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default Movies;


export async function getServerSideProps() {
    let props = {};
    let res = await fetchApi('/genre/movie/list');
    let genres = res.data.genres;
    let movie_genres = {};
    genres.forEach(genre => movie_genres[genre.id] = genre.name)

    res = await fetchApi('/discover/movie');
    props.movie_list = res.data.results.map(item=>(
        {
            title:item.title,
            genres:item.genre_ids.map(id=>movie_genres[id]),
            poster_path:item.poster_path,
        }
    ))
    props.genres = movie_genres;
    return {
        props: props,
    }
};
