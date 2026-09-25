import React, { useEffect, useState } from "react";
import LikeButton from "../Buttons/LikeButton";
import CommentButton from "../Buttons/CommentButton";
import { Link, useParams } from "react-router-dom";

function NewTopicPanel({photo, uploaded, title,forclass,  discription, userphoto, username, topicType, topicName, visibility, article_id}){



    return(
        <>
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 sm:flex-row sm:gap-5 sm:p-5">
                <img className="h-40 w-full rounded-xl object-cover sm:h-auto sm:w-1/5" src={photo} alt="" />
                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between ">
                        <div className="flex flex-col">
                            <div className=" text-sm font-bold">{title}</div>
                            <div className="text-sm  line-clamp-3  pt-1">{discription}</div>
                        </div>
                        <div className="">
                            <div className="text-gray-500  text-xs">{uploaded}</div>
                        </div>
                    </div>
                    <div className={`flex ${forclass} flex-wrap justify-between gap-3`}>
                        <div className="mt-2 flex min-w-0 gap-2">
                            <img className="w-5 h-5 rounded-full border  " src={userphoto} alt="" />
                            <div className="font-semibold">{username}</div>
                        </div>
                        <div className="flex justify-between ">
                            <div className="flex flex-wrap gap-2">
                                <div className={` flex items-center  px-4  bg-green-500 text-white rounded-full  ${visibility}`}>{topicType}</div>
                                <div className="  bg-black text-white flex items-center  px-4 rounded-full">{topicName}</div>
                            </div>
                            <div className={`flex gap-3 ${visibility}`}>
                                <div className="flex flex-row-reverse  items-center gap-1 text-xl" >
                                    {/* <LikeButton/>   */}
                                </div>
                                <Link to={`/articles/${article_id}`} className="border bg-[#2F5E64] text-white px-4 py-1  rounded-full ">Read More</Link>
                            </div>
                        </div>
                    </div>
                    
           
                </div>
            </div>
        </>
    );
}

export default NewTopicPanel;