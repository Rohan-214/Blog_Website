import React, { useEffect, useState } from "react";
import BestArticlesTopic from "./BestArticlesTopics";
import { Link } from "react-router-dom";
import { fetchUser } from "../../services/users.service";
import { fetchFirstFourArticles, fetchLastFourArticles } from "../../services/articles.service";
function BestArticles() {
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
    return (
        <div className="flex justify-center  h-screen items-center bg-[#2F5E64]">
            <div className="flex gap-5">
                <div>
                    <div className="text-8xl text-white font-semibold mb-8">
                        Best <br />Article<br />Today
                    </div>
                    <Link to="/articles" className="bg-[#F7EFE8] text-[#BC7E6C] rounded-full px-12 py-4 mt-5 hover:shadow-2xl hover:font-semibold ">See All Articles</Link>
                </div>
                {loading && <p className="text-white text-2xl">Loading articles...</p>}
                {error && <p className="text-red-300 text-2xl">{error}</p>}
                {!loading && !error && articles.length === 0 && <p className="text-white text-2xl">No articles found.</p>}
                {!loading && !error && articles.map((article) =>
                    <BestArticlesTopic
                        key={article._id}
                        photo={article.image}
                        uploadTime={article.time}
                        title={article.title}
                        description={article.content}
                        id={article._id}
                    />
                )}
            </div>
        </div>
    );
}
export default BestArticles; 