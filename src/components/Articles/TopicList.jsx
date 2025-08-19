import React, { useEffect, useState } from "react";

 function TopicList({topic,onclick}){

//     const [filtertopic, setfiltertopic] = useState([])

//     useEffect(() => {
    
//             const loadArticle = async () => {
//                 const articleData = await fetchArticlesByTopic(onclick);
//                 setfiltertopic(articleData)
//                 console.log(articleData)
//             };
//             loadArticle();
//         }, []);
    return(
        <>
        <div  className="text-xl px-5 text-gray-500">{topic}</div>
        </>
    );
}
export default TopicList;