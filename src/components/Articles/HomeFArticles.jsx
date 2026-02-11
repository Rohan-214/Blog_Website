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
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(null)
    const [filteredId, setfilteredId] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 3;
    const currentuserid = localStorage.getItem("userid");
    useEffect(() => {
        const loadArticle = async () => {
            try {
                setloading(true);
                setError(null);
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
                setloading(false);
            } catch (error) {
                setError("Could not fetch articles. The server might be down or the endpoint is not found.");
                setloading(false);
            }
        };
        loadArticle();
    }, [topic]);
    
    // Reset to page 1 when topic changes
    useEffect(() => {
        setCurrentPage(1);
    }, [topic]);
    
    // Pagination calculations
    const totalPages = Math.ceil(article.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = article.slice(startIndex, endIndex);
    console.log(article.length);
    return (
        <>
            <div className={`flex p-20 px-100  justify-center ${article.length > 2 ? "h-screen" : "h-[90.8vh]"}  gap-10 bg-gray-200`} >
                <div className="">
                    <div className=" text-5xl font-bold text-[#2F5E64]">For you</div>
                    {/* <input className="border mt-5 px-2  rounded-full " type="text" placeholder="0, search Articles" /> */}
                    <div className="flex  gap-5 mt-5 ">
                        <button onClick={() => settopic("")} > <TopicList topic="All" /></button>
                        <button onClick={() => settopic("Technology")} ><TopicList topic="Technology" /></button>
                        <button onClick={() => settopic("Lifestyle")}  ><TopicList topic="Lifestyle" /></button>
                        <button onClick={() => settopic("Business")}  ><TopicList topic="Business" /></button>
                        <button onClick={() => settopic("Health")}   ><TopicList topic="Health" /></button>
                        <button onClick={() => settopic("Education")}   ><TopicList topic="Education" /></button>
                    </div>
                    {loading && <p className="text-[#2F5E64] text-2xl ">Loading articles...</p>}
                    {error && <p className="text-red-300 text-2xl">{error}</p>}
                    {!loading && !error && article.length === 0 && <p className="text-[#2F5E64] text-2xl">No articles found.</p>}
                    {!loading && article.length > 0 && (
                    <div className="mt-5 flex flex-col gap-5">
                        {paginatedArticles.map((art, ind) =>
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
                    )}
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex gap-3 justify-center items-center">
                            <button 
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-[#2F5E64] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1f3a40]"
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 rounded-lg ${currentPage === page ? 'bg-[#2F5E64] text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
                                >
                                    {page}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-[#2F5E64] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1f3a40]"
                            >
                                Next
                            </button>
                        </div>
                    )}
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