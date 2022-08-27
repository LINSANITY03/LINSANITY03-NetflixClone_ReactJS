// rfce -> shortcut for react export component
import './Row.css';
import React, { useState, useEffect } from 'react';
import axios from './axios'; /* we aleady have the base url of the imdb */


const base_url = "https://image.tmdb.org/t/p/original/"; /* this is for the appending the image url from 
                                                        the map's object for the complete url */

function Row({ title, fetchUrl }) {
    const [movies, setMovies] = useState([]);

    // A snippet of code which runs based on a specific condition
    useEffect(() => {
        // if [], run once the row loads, and dont run again
        async function fetchData(){
            const request = await axios.get(fetchUrl); /* we get base url from axios and requested url 
                                                        from app.js */
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }
    , [fetchUrl]); /* since we are depending upon fetchUrl which is a outside variable hence we put it as 
                    a condition for useEffect to see if any changes is made */

    console.log(movies);

  return (
    <div className='row'>
        <h2>{title}</h2> {/* static titles such as NETFIX-ORIGINALS */}

        <div className="row__posters">
            {/* several row__posters */}

            {movies.map(movie => (
                <img className='row__poster'
                src={`${base_url}${movie.poster_path}`} alt={movie.name} />
            ))}
        </div>
    </div>
  )
}

export default Row