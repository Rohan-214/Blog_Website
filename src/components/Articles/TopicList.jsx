import React from "react";

function TopicList({topic}){
    return(
        <>
        <button  className="text-xl px-5 text-gray-500">{topic}</button>
        </>
    );
}
export default TopicList;