import React, { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function BestArticlesTopic ({photo, title, description, uploadTime, id }) {

    const [isliked, setisliked] = useState(false);
    const [countLikes, setcountLikes] = useState(0)
    
    const toggle = () => {
        setisliked((isliked) => (isliked == false ? true : false))
        setcountLikes((countLikes) => (isliked == false ? countLikes+1:countLikes-1))
    }
    const comment = 24;
    return (
        <>
            <div>
                <div className="w-64 h-110 bg-white rounded-2xl ">
                    <img className="rounded-t-2xl w-full h-1/3" src={photo} alt="" />
                    <div className="p-2 h-2/3 ">
                        <h1 className="font-bold p-0.5">{title}</h1>
                        <p className="line-clamp-6 p-0.5">{description} </p>
                        <div className="flex justify-between h-20 pb-2 items-end ">
                            <div>
                                <p className="text-gray-500 text-sm ">{uploadTime}</p>
                                <div className="flex gap-2 pl-2 ">
                                    {/* <LikeButton/> */}
                                </div>
                            </div>   
                            <Link to={`/articles/${id}`} className="bg-blue-500 w-25 h-10 flex text-white justify-center items-center rounded-full hover:shadow-2xl hover:font-semibold">Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default BestArticlesTopic;