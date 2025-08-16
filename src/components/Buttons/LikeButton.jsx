import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fah } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function LikeButton(){

    
    const [isliked, setisliked] = useState(true)
    const [count, setcount] = useState(0)

    const toggle = () => {
        setisliked((isliked) => isliked ? false : true ) 
        setcount((count) => isliked ? count+1 : count-1)
    }
    

    return(
        <>
            <div className="">{count}</div>
            <button className=""onClick={toggle}> {isliked ? <FontAwesomeIcon icon={fah}/> : <FontAwesomeIcon icon={fash}/> }</button>
        </>
    );
}
export default LikeButton;