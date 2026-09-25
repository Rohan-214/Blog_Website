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
            <div className="w-full max-w-[18rem] min-w-0">
                <div className="flex h-full min-h-96 flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
                    <img className="aspect-4/3 w-full shrink-0 object-cover" src={photo} alt="" />
                    <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                        <h1 className="line-clamp-2 text-lg font-bold leading-tight">{title}</h1>
                        <p className="line-clamp-4 text-sm leading-6 text-gray-700">{description}</p>
                        <div className="mt-auto flex min-h-14 items-end justify-between gap-3">
                            <div>
                                <p className="text-sm text-gray-500">{uploadTime}</p>
                                <div className="flex gap-2 pl-2">
                                    {/* <LikeButton/> */}
                                </div>
                            </div>   
                            <Link to={`/articles/${id}`} className="flex h-10 shrink-0 items-center justify-center rounded-full bg-[#2F5E64] px-4 text-sm text-white hover:font-semibold hover:shadow-2xl">Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default BestArticlesTopic;