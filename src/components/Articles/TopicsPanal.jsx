import React from "react";
import { Link } from "react-router-dom";
import TopicName from "./TopicName"
function TopicsPanel({topicPhoto, content, userPhoto, userName, topicName, id}){
    return(
        <>
            <div className="flex p-2 bg-white rounded-2xl  gap-5">
                <Link to={`/articles/${id}`} className="block hover:opacity-90 flex-shrink-0">
                    <img className="w-24 h-24 object-cover rounded-lg cursor-pointer" 
                        src={topicPhoto}
                        alt={content}
                    />
                </Link>
                <div className="flex flex-col justify-between gap-3 flex-1">
                    <Link to={`/articles/${id}`} className="text-inherit hover:opacity-90">
                        <div className="cursor-pointer">{content}</div>
                    </Link>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <img className="w-8 h-8 rounded-full" 
                                src={userPhoto} 
                            />
                            <div className="text-gray-500">{userName}</div>
                        </div>
                        <div className="border-2 border-gray-300 rounded-lg px-2 py-1">{topicName}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopicsPanel;