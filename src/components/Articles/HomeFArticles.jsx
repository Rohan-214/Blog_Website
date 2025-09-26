import React, { useEffect, useState } from "react";
import TopicList from "./TopicList";
import NewTopicPanel from "./NewTopicPanel";
import RecommendedUser from "./RecommendedUsers";
import Footer from "../../Footer";
import { fetchAllArticles, fetchArticle } from "../../services/articles.service";
import { fetchAllUsers, fetchUser } from "../../services/users.service";
function HomeFArticles() {
    const [article, setArticle] = useState([]);
    const [user, setuser] = useState({})
    const [alluser, setalluser] = useState([])
    const [topic, settopic] = useState("")
    const [filteredId, setfilteredId] = useState([])
    const currentuserid = localStorage.getItem("userid");
    useEffect(() => {
        const loadArticle = async () => {
            const articleData = await fetchAllArticles(topic);
            setArticle(articleData)
            const uData = await fetchAllUsers();
            console.log(uData);
            setalluser(uData)
            const filtered = uData.filter(u => u._id !== currentuserid);
            setfilteredId(filtered);
            const uniqueUserIds = [...new Set
                (articleData
                    .map(a => a.userid)
                    .filter(Boolean)
                )];
            const usersData = {};
            for (let id of uniqueUserIds) {
                usersData[id] = await fetchUser(id);
            }
            setuser(usersData);
        };
        loadArticle();
    }, [topic]);
    console.log(article.length);
    return (
        <>
            <div className={`flex p-30 px-100  justify-center ${article.length > 2 ? "h-screen" : "h-[88.125vh]"}  gap-10 bg-gray-200`} >
                <div className="">
                    <div className=" text-6xl font-bold text-blue-700">For you</div>
                    {/* <input className="border mt-5 px-2  rounded-full " type="text" placeholder="0, search Articles" /> */}
                    <div className="flex  gap-5 mt-5 ">
                        <button onClick={() => settopic("")} > <TopicList topic="All" /></button>
                        <button onClick={() => settopic("Technology")} ><TopicList topic="Technology" /></button>
                        <button onClick={() => settopic("Lifestyle")}  ><TopicList topic="Lifestyle" /></button>
                        <button onClick={() => settopic("Business")}  ><TopicList topic="Business" /></button>
                        <button onClick={() => settopic("Health")}   ><TopicList topic="Health" /></button>
                        <button onClick={() => settopic("Education")}   ><TopicList topic="Education" /></button>
                    </div>
                    <div className={`${article.length == 0 ? "text-2xl font-semibold mt-5 text-center" : "hidden"} `}>Articles not found</div>
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
                                article_id={art._id}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <div className=" rounded-2xl p-5 bg-white  flex flex-col gap-5 mt-32  w-120">
                        <div className=" text-2xl font-semibold">Users</div>
                        {filteredId.map((user, ind) =>
                        (<RecommendedUser
                            key={ind}
                            userid={user._id}
                            username={user.name}
                            userphoto="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg"
                        />)
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default HomeFArticles;