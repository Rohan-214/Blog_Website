import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fah } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchCommentsByLikedId } from "../../services/likes.service";

function LikeButton({ userid, articleid }) {
    const [isliked, setisliked] = useState(false);
    const [count, setcount] = useState(0);
    //new state 

    useEffect(() => {
    fetchCommentsByLikedId(articleid).then(likes => {
        // 1. Filter the likes to only include the ones where isliked is true
        const likedLikes = likes.filter(like => like.isliked);
        // 2. Set the count to the length of the filtered array
        setcount(likedLikes.length);

        // 3. Find the like for the current user to set the button's state
        const userLike = likes.find(like => like.userid === userid);
        if (userLike) {
            setisliked(userLike.isliked);
        } else {
            setisliked(false);
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