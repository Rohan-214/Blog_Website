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
        <div className="flex min-h-screen items-center bg-[#2F5E64] px-5 py-16 sm:px-8 lg:px-12">
            <div className="mx-auto flex w-full max-w-360 flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
                <div className="shrink-0 lg:w-[22%]">
                    <div className="mb-8 text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                        Best <br />Article<br />Today
                    </div>
                </div>
                <div className="flex w-full max-w-6xl flex-col gap-8 lg:w-[78%]">
                    <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {loading && <p className="text-white text-2xl sm:col-span-2">Loading articles...</p>}
                        {error && <p className="text-red-300 text-2xl sm:col-span-2">{error}</p>}
                        {!loading && !error && articles.length === 0 && <p className="text-white text-2xl sm:col-span-2">No articles found.</p>}
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
                    <Link to="/articles" className="self-center rounded-full bg-[#F7EFE8] px-12 py-4 text-[#BC7E6C] hover:font-semibold hover:shadow-2xl lg:self-end">See All Articles</Link>
                </div>
            </div>
        </div>
    );
}
export default BestArticles; 