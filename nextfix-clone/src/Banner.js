import React, {useState, useEffect} from 'react';
import axios from './axios';
import requests from './request';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results
        [Math.floor(
            Math.random() * request.data.results.length - 1) /* random movie and return one movie */
        ]
       ); 
       return request;
    }
    fetchData();
  }, []);


  function truncate(str, n){
    /* a function to replace the ellipsis property but with number of text */
    return str?.length > n ? str.substr(0, n - 1) + "..." : str; /* substr returns part of the string */
  }
  

  return (
    <header className='banner'
        style={{
            backgroundSize: "cover", /* use up all the size */
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center" /* horizontally and vertically center */
        }}
    >
        <div className='banner__contents'>
            <h1 className='banner__title'>
                {movie?.title || movie?.name || movie?.original_name} {/* if movie.title does not exits then --- */}
            </h1>
            <div className="banner__buttons">
                <button className="banner_button">Play</button>
                <button className="banner_button">My List</button>
            </div>
            <h1 className='banner__description'>
                {truncate(movie?.overview, 150)} {/* if the synopsis of the movie is given from api */}
                                        {/* truncate after 150 characters */}
            </h1>
        </div>
        <div className="banner__fadeBottom"/> {/* this is to make a fade transition between banner and row */}
    </header>
  )
}

export default Banner