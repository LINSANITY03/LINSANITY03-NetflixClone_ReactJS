import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false); /* default value of show is false */

    useEffect(() => {
        window.addEventListener("scroll", ()=>{
            if (window.scrollY > 100){ /* at each scroll the function check whether it has 
                                        scroll more than 100px from y-axis origin */
                handleShow(true); /* if true nav_black class is added resulting in css change */
            }else handleShow(false); /* else show=false */
        }); 

        return () => {
            window.removeEventListener("scroll", ()=>{
                if (window.scrollY > 100){ /* at each scroll the function check whether it has 
                                            scroll more than 100px from y-axis origin */
                    handleShow(true); /* if true nav_black class is added resulting in css change */
                }else handleShow(false); /* else show=false */
            }); /* we delete previous listener preventing override of multiple listeners */
        };
    }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
        <img 
            className='nav_logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1920px-Logonetflix.png'
            alt='Netflix Logo'
        /> {/* Netfix logo */}

        <img 
            className='nav__avatar'
            src='https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            alt='Netflix Logo'
        /> {/* avatar image */}
    </div>
  )
}

export default Nav