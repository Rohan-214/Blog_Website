import { useEffect, useState } from "react";
import TopicsPanel from "../Articles/TopicsPanal"; 
import { fetchFirstFourArticles } from "../../services/articles.service";
import { fetchUser } from "../../services/users.service";
function MainTopicPanal({ topicPhoto, content, userPhoto, userName, topicName }) {
    const [articles, setarticles] = useState([]);
        const [user, setuser] = useState({});
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        useEffect(() => {
            const loadArticle = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    const articleData = await fetchFirstFourArticles();
                    //console.log(fetchFirstFourArticles())
                    if (articleData) {
                        setarticles(articleData);
                        if (articleData.length > 0) {
                            const uniqueUserIds = [...new Set(articleData.map(a => a.userid).filter(Boolean))];
                            const usersData = {};
                            for (let id of uniqueUserIds) {
                                usersData[id] = await fetchUser(id);
                            }
                            setuser(usersData);
                        }
                    } else {
                        // This case handles when the service returns null (e.g., on a 404 or network error)
                        setError("Could not fetch articles. The server might be down or the endpoint is not found.");
                    }
                } catch (error) {
                    console.error("Failed to load articles:", error);
                    setError("An unexpected error occurred while loading articles.");
                } finally {
                    setLoading(false);
                }
            };
            loadArticle();
        }, []);
    
    return(
        <>
        <div className="text-5xl font-bold  py-2 text-[#2F5E64]" >For you</div>
            {/* <input className="bg-gray-300 rounded-full focus:outline-none  pl-5 py-2 " type="text"  placeholder="Search Articles..."  /> */}
                <div className="flex flex-col gap-3  w-100">
                    {/* <TopicsPanel 
                        topicPhoto="https://image.cnbcfm.com/api/v1/image/107159087-1669826392218-gettyimages-1237155972-porzycki-neuralin211210_npAXF.jpeg?v=1685061729&w=1920&h=1080"
                        content="The climate crisis and the environment in Central Asia Is there hope?"
                        userPhoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                        userName="Joana"
                        topicName="Elon Musk"
                    />
                    <TopicsPanel 
                        topicPhoto="https://image.cnbcfm.com/api/v1/image/107159087-1669826392218-gettyimages-1237155972-porzycki-neuralin211210_npAXF.jpeg?v=1685061729&w=1920&h=1080"
                        content="The climate crisis and the environment in Central Asia Is there hope?"
                        userPhoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                        userName="Joana"
                        topicName="Elon Musk"
                    />
                    <TopicsPanel 
                        topicPhoto="https://image.cnbcfm.com/api/v1/image/107159087-1669826392218-gettyimages-1237155972-porzycki-neuralin211210_npAXF.jpeg?v=1685061729&w=1920&h=1080"
                        content="The climate crisis and the environment in Central Asia Is there hope?"
                        userPhoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                        userName="Joana"
                        topicName="Elon Musk"
                    /> */}
                    {loading && <p className="text-white text-2xl">Loading articles...</p>}
                {error && <p className="text-red-300 text-2xl">{error}</p>}
                {!loading && !error && articles.length === 0 && <p className="text-white text-2xl">No articles found.</p>}
                {!loading && !error && articles.map((article) =>
                    <TopicsPanel
                        key={article._id}
                        topicPhoto={article.image}
                        uploadTime={article.time}
                        content={article.title}
                        userName={article.userid ? user[article.userid]?.name || user[article.userid]?.username || "Unknown Author" : "Unknown Author"}
                        topicName={article.specificTopic || article.topic || "General"}
                        description={article.content}
                        id={article._id}
                    />
                )}
            </div>
        </>
    )
};
export default MainTopicPanal;

