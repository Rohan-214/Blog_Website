import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart as farheart} from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasheart} from '@fortawesome/free-solid-svg-icons';

import { faMessage as farmessage} from '@fortawesome/free-regular-svg-icons';
import LikeButton from "../Buttons/LikeButton";
import { Link, useParams } from "react-router-dom";

function BestArticlesTopic ({photo, title, description, uploadTime, }) {

    const [isliked, setisliked] = useState(false);
    const [countLikes, setcountLikes] = useState(0)
    
    const toggle = () => {
        setisliked((isliked) => (isliked == false ? true : false))
        setcountLikes((countLikes) => (isliked == false ? countLikes+1:countLikes-1))
    }
    
    const comment = 24;




    
    const {id} = useParams();


    const [article, setArticle] = useState('');

    useEffect(() => {
        setArticle(id)
    }, [id]);

    if (!article) return <p>Loading...</p>;



    return (
        <>
            <div>
                <div className="w-64 h-110 bg-white rounded-2xl ">
                    <img className="rounded-t-2xl" src={photo} alt="" />
                    <div className="p-2">
                        <h1 className="font-bold ">{title}</h1>
                        <p>{description} </p>
                        <div className="flex justify-between h-20 items-end ">
                            <div>
                                <p className="text-gray-500 text-sm ">{uploadTime}</p>
                                <div className="flex gap-2 pl-2 ">
                                    <LikeButton/>
                                </div>
                            </div>   
                             
                            <Link to={`/articles/${id}`} className="bg-blue-500 px-5 h-10 flex items-center rounded-full hover:shadow-2xl hover:font-semibold">Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default BestArticlesTopic;