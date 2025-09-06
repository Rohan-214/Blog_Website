import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faG, faMagnifyingGlass as fam } from "@fortawesome/free-solid-svg-icons";


import React, { useState, useEffect } from "react";

import MainPanal from "../Articles/MainPanal";

import TrendingPanel from "../Articles/TrendingPanel";
import Recommend from "../Articles/Recommend";

import Navbar from "../../Navbar"
import Footer from "../../Footer"
import MainTopicPanal from "./MainTopicPanal";
import MainCommentPanal from "./MainCommentPanel";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../services/articles.service";
import { fetchUser } from "../../services/users.service";



function ArticlesRootPage() {
    console.log("ArticlesRootPage")

    const { id } = useParams();
    // const { userid } = useParams();

    const [user, setuser] = useState({})

    const [article, setArticle] = useState({});

    useEffect(() => {
        if (id == undefined || id == null) return;

        const loadArticle = async () => {
            const articleData = await fetchArticle(id);
            if (articleData?.userid) {
                const userData = await fetchUser(articleData.userid);
                setArticle(articleData);
                setuser(userData);
            }
        };
        loadArticle();
    }, [id]);

    

    if (!article) return <p>Loading...</p>;


    return (
        <>
         
            <div className="flex gap-50 p-20 bg-gray-200">
                <div className="p-10 flex flex-col gap-5 w-100">
                    <MainTopicPanal />

                    {/* <TrendingPanel /> */}
                    {/* <Recommend /> */}

                    <MainCommentPanal id={id} name ={user.name || user.username || "Unknown Author"} email = {user.email}/>
                    

                </div>
                <div className="w-200 py-10">
                    <MainPanal
                        article_id = {id}
                        userphoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                        userName={user.name || user.username || "Unknown Author"}
                        title={article.title}
                        publishedDetails={`PUBLISHED ON ${article.day} ${article.time}`}
                        description=" Neuralink logo displayed on a phone screen, a silhouette of a paper in shape of a human face and a binary code
                            displayed on a screen are seen in this multiple exposure illustration photo taken in Krakow, Poland on December 10, 2021."
                        content={article.content}
                        topicPhoto={article.image}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ArticlesRootPage; 