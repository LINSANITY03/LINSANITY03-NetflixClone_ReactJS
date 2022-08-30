// rfce -> shortcut for react export component
import './Row.css';
import React, { useState, useEffect } from 'react';
import axios from './axios'; /* we aleady have the base url of the imdb */


const base_url = "https://image.tmdb.org/t/p/original/"; /* this is for the appending the image url from 
                                                        the map's object for the complete url */

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]); /* set the initial value to an empty array */

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

  return (
    <div className='row'>
        <h2>{title}</h2> {/* static titles such as NETFIX-ORIGINALS */}

        <div className="row__posters">
            {/* several row__posters */}

            {movies.map(movie => (
                <img 
                key={movie.id} /* this is state whether the changes have been made in a array or list */
                className={`row__poster ${isLargeRow ? "row__posterLarge" : ''}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                /* since we want backdrop and isLargeRow is by default true */
            ))}
        </div>
    </div>
  )
}

export default Row