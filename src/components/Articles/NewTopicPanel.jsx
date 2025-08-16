import React, { useEffect, useState } from "react";
import LikeButton from "../Buttons/LikeButton";
import CommentButton from "../Buttons/CommentButton";
import { Link, useParams } from "react-router-dom";

function NewTopicPanel({photo, uploaded, title,forclass,  discription, userphoto, username, topicType, topicName, visibility, article_id}){



    return(
        <>
            <div className="flex  bg-white p-5 gap-5  rounded-2xl">
                <img className=" w-1/5 rounded-xl" src={photo} alt="" />
                <div>
                    <div className="flex gap-15 ">
                        <div className="flex flex-col">
                            <div className=" text-sm font-bold">{title}</div>
                            <div className="text-sm  line-clamp-3  pt-1">{discription}</div>
                        </div>
                        <div className="">
                            <div className="text-gray-500  text-xs">{uploaded}</div>
                        </div>
                    </div>
                    <div className={`flex ${forclass} justify-between`}>
                        <div className="flex mt-2 gap-2">
                            <img className="w-5 h-5 rounded-full border  " src={userphoto} alt="" />
                            <div className="font-semibold">{username}</div>
                        </div>
                        <div className="flex justify-between ">
                            <div className="flex gap-2">
                                <div className={` flex items-center  px-4  bg-green-500 text-white rounded-full  ${visibility}`}>{topicType}</div>
                                <div className="  bg-black text-white flex items-center  px-4 rounded-full">{topicName}</div>
                            </div>
                            <div className={`flex gap-3 ${visibility}`}>
                                <div className="flex flex-row-reverse  items-center gap-1 text-xl" >
                                    <LikeButton/>  
                                </div>
                                <Link to={`/articles/${article_id}`} className="border bg-blue-700 text-white px-4 py-1  rounded-full ">Read More</Link>
                            </div>
                        </div>
                    </div>
                    
           
                </div>
            </div>
        </>
    );
}

export default NewTopicPanel;