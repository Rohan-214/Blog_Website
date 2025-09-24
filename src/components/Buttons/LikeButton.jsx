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
                const likeData = res.data.find(item => item.userid === userid && item.articleid === articleid);
                const totalLikes = res.data.length; // Assuming res.data is an array of all likes for the article

                setcount(totalLikes);

                if (likeData) {
                    setisliked(likeData.isliked);

                }
            });
    }, [userid, articleid]);

    const toggle = async () => {
        console.log("Like button clicked!");
        console.log("Current state:", isliked, count);
        const newIsLiked = !isliked;
        console.log("New state:", newIsLiked, count);
        const newCount = newIsLiked ? count + 1 : count - 1;
        console.log("New count:", newCount);
        const likeData = { userid, articleid, isliked: newIsLiked, count: newCount };
        console.log("Like data:", likeData);


        axios.post('http://localhost:5174/postLike', likeData)
        .then(res => {
            console.log("Response from server:", res.data);
            setisliked(newIsLiked);
            setcount(newCount);
        })
        .catch(err => {
            console.error("Error posting like data:", err);
        });
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