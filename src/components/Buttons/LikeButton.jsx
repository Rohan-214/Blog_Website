import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fah } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

function LikeButton({ userid, articleid }) {
    const [isliked, setisliked] = useState(false);
    const [count, setcount] = useState(0);
    //new state 

    useEffect(() => {
        axios.get(`http://localhost:5174/postLike?userid=${userid}&articleid=${articleid}`)
            .then(res => {
                const newres = res.data.filteredLikes;
                const totalLikes = res.data.totalLikes;
                if (newres.length > 0) {
                    setisliked(newres[0].isliked || false);
                    setcount(totalLikes);
                }
            });
    }, [userid, articleid]);

    const toggle = async () => {
        console.log("Like button clicked!");
        console.log("Current state:", isliked, count);
        const newIsLiked = !isliked;
        const newCount = newIsLiked ? count + 1 : count - 1;
        const likeData = { userid, articleid, isliked: newIsLiked, count: newCount };
        console.log(likeData);
        axios.post('http://localhost:5174/postLike', likeData)
        .then(res => {
            console.log("Response from server:", res.data);
        })
        .catch(err => {
            console.error("Error posting like data:", err);
        });
        setisliked(newIsLiked);
        setcount(newCount);
    };

    return (
        <>
            <div>{count}</div>
            <button type="button" onClick={()=>toggle()}>
                {isliked ? <FontAwesomeIcon icon={fash} /> : <FontAwesomeIcon icon={fah} />}
            </button>
        </>
    );
};

export default LikeButton;