// rfce -> shortcut for react export component
import './Row.css';
import React, { useState, useEffect } from 'react';
import axios from './axios'; /* we aleady have the base url of the imdb */
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";


const base_url = "https://image.tmdb.org/t/p/original/"; /* this is for the appending the image url from 
                                                        the map's object for the complete url */

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]); /* set the initial value to an empty array; for movies collection */
    const [trailerUrl, setTrailerUrl] = useState(""); /* set the initial value to an empty string; for current selected movie */
    const [movieId, setmovieId] = useState("");
    // A snippet of code which runs based on a specific condition
    useEffect(() => {
        // if [], run once the row loads, and dont run again
        async function fetchData(){
            const request = await axios.get(fetchUrl); /* we get base url from axios and requested url 
                                                        from app.js */
            setMovies(request.data.results); /* this doesnot take previous state only set current state value of movies*/
            return request;
        }
        fetchData();
    }
    , [fetchUrl]); /* since we are depending upon fetchUrl which is a outside variable hence we put it as 
                    a condition for useEffect to see if any changes is made */
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1
    }
  }; /* css for youtube player with autoplay on */

  const handleClick = movie =>{
        if (trailerUrl && movie?.id === movieId){
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                /* .search will return everystring after ? from the url */
                /* URLSearchParams will give an object with key,value pairs and can be manipulated */
                setTrailerUrl(urlParams.get('v')); /* if url was v=5 then it will return 5 */
                setmovieId(movie?.id);

            }).catch((error) => console.log(error))
        }
        
  }

  return (
    <div className='row'>
        <h2>{title}</h2> {/* static titles such as NETFIX-ORIGINALS */}

        <div className="row__posters">
            {/* several row__posters */}

            {movies.map(movie => (
                <img 
                key={movie.id} /* this is state whether the changes have been made in a array or list */
                onClick={() => handleClick(movie)} /* when we click the img send the current obj to function */
                className={`row__poster ${isLargeRow ? "row__posterLarge" : ''}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                /* since we want backdrop and isLargeRow is by default true */
            ))}
        </div>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>} {/* when their is trailerUrl show 
                                                                    youtube video player */}
    </div>
  )
}

export default Row