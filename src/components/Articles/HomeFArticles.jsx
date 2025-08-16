import React, { useEffect, useState } from "react";
import TopicsPanel from "./TopicsPanal";
import TopicList from "./TopicList";
import NewTopicPanel from "./NewTopicPanel";
import Trends from "./Trends";
import RecommendedUser from "./RecommendedUsers";
import Navbar from "../../Navbar"
import Footer from "../../Footer";
import { useParams } from "react-router-dom";
import { fetchAllArticles, fetchArticle } from "../../services/articles.service";
import { fetchAllUsers, fetchUser } from "../../services/users.service";


function HomeFArticles() {


    const [article, setArticle] = useState([]);
    // const [filteredarticle, setFilteredarticle] = useState([]);
    const [user, setuser] = useState({})
    const [alluser, setalluser] = useState([])


    // const filterByTopic = (topic) => {
    //     const result = article.filter(article =>
    //         article.topic.toLowerCase().includes(topic.toLowerCase())
    //     );
    //     setFilteredarticle(result);
    // };



    useEffect(() => {

        const loadArticle = async () => {
            const articleData = await fetchAllArticles();
            setArticle(articleData)

            const uData = await fetchAllUsers();
            setalluser(uData)
            
            // const exceptAllUser = [ ...new Set (uData.map(a => a.id).filter())]

            const uniqueUserIds = [...new Set(articleData.map(a => a.userid).filter(Boolean))];

            const usersData = {};
            for (let id of uniqueUserIds) {
                usersData[id] = await fetchUser(id);
            }
            setuser(usersData);
        };

        loadArticle();

    }, []);


    return (
        <>
            <Navbar />
            <div className="flex p-30 px-100  justify-center h-full gap-10 bg-gray-200 ">
                <div className="">
                    <div className=" text-6xl font-bold text-blue-700">For you</div>
                    <input className="border mt-5 px-2  rounded-full " type="text" placeholder="0, search Articles" />
                    <div className="flex  gap-5 mt-5 ">
                        <TopicList topic="All" />
                        <TopicList topic="Technology" />
                        <TopicList topic="Environment" />
                        <TopicList topic="Business" />
                        <TopicList topic="Health" />
                    </div>
                    <div className="mt-5 flex flex-col gap-5 ">
                        {article.map((art, ind) =>
                            <NewTopicPanel key={ind}
                                photo={art.image}
                                uploaded={art.time}
                                title={art.title}
                                discription={art.content}
                                userphoto="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Mdhm4fdNeFg8XQmb6a6v5ffyuG_c4jEyFw&s"
                                username={user[String(art.userid)]?.name || "Unknown"}
                                topicType={art.topic}
                                topicName={art.specificTopic}
                                visibility="block"
                                forclass="flex-col"
                                article_id={art.id}

                            />
                        )}
                    </div>
                </div>
                <div>

                    <div className=" rounded-2xl p-5 bg-white  flex flex-col gap-5  w-120 " >
                        <div className=" text-2xl font-semibold">Trending</div>
                        <Trends
                            photo="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg"
                            title="How Will AI Image Generators Affect Artists?"
                            userphoto="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg"
                            userName="Ray"
                            topicName="environment"
                            topicType="ntf"
                            uploaded="12 hours"
                        />
                        <Trends
                            photo="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg"
                            title="How Will AI Image Generators Affect Artists?"
                            userphoto="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg"
                            userName="Ray"
                            topicName="environment"
                            topicType="ntf"
                            uploaded="12 hours"
                        />
                        <Trends
                            photo="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg"
                            title="How Will AI Image Generators Affect Artists?"
                            userphoto="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg"
                            userName="Ray"
                            topicName="environment"
                            topicType="ntf"
                            uploaded="12 hours"
                        />
                    </div>
                    <div className=" rounded-2xl p-5 bg-white  flex flex-col gap-5 mt-5  w-120">
                        <div className=" text-2xl font-semibold">Recommended Users</div>
                        {alluser.map((user, ind) =>
                            <RecommendedUser key={ind}
                                username={user.name}
                                userphoto="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg"
                            />
                        )}



                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomeFArticles;