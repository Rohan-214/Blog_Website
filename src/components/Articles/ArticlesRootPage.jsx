import React, { useState, useEffect } from "react";
import MainPanal from "../Articles/MainPanal";
import Footer from "../../Footer"
import MainTopicPanal from "./MainTopicPanal";
import MainCommentPanal from "./MainCommentPanel";
import PageLoader from "../PageLoader";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../services/articles.service";
import { fetchUser } from "../../services/users.service";
function ArticlesRootPage() {
    const { id } = useParams();
    const userid = localStorage.getItem("userid");
    const [commenteduser, setcommenteduser] = useState(null);
    const [user, setuser] = useState(null);
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topicsReady, setTopicsReady] = useState(false);
    const [commentsReady, setCommentsReady] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (id == undefined || id == null) return;

        const loadPageData = async () => {
            setLoading(true);
            setArticle(null);
            setuser(null);
            setcommenteduser(null);
            setTopicsReady(false);
            setCommentsReady(false);
            setPageLoading(true);

            try {
                const articlePromise = fetchArticle(id);
                const commentedUserPromise = userid ? fetchUser(userid) : Promise.resolve(null);
                const articleData = await articlePromise;

                if (!articleData) {
                    setError("Article not found.");
                    return;
                }

                const authorData = articleData.userid ? await fetchUser(articleData.userid) : null;
                setArticle(articleData);
                setuser(authorData);

                const commenteduserData = await commentedUserPromise;
                setcommenteduser(commenteduserData);
            } catch (error) {
                console.error("Failed to load article page data:", error);
                setError("Failed to load article page.");
            } finally {
                setLoading(false);
            }
        };

        loadPageData();
    }, [id, userid]);

    useEffect(() => {
        if (!loading && (error || (article && topicsReady && commentsReady))) {
            setPageLoading(false);
        }
    }, [loading, article, error, topicsReady, commentsReady]);

    const handleTopicsReady = () => setTopicsReady(true);
    const handleCommentsReady = () => setCommentsReady(true);

    return (
        <>
            <div className="relative">
                {pageLoading && <PageLoader />}
                <div className={`${pageLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    {loading && !article && <div className="min-h-screen" />}
                    {!loading && !article && error && <p className="text-center text-xl text-[#2F5E64]">{error}</p>}
                    {article && (
                        <>
                            <div className="flex gap-50 p-20 bg-gray-200">
                                <div className="p-10 flex flex-col gap-5 w-100">
                                    <MainTopicPanal onReady={handleTopicsReady} />
                                    <MainCommentPanal
                                        id={id}
                                        name={commenteduser?.name || commenteduser?.username || "Unknown Author"}
                                        email={commenteduser?.email || "userid"}
                                        onReady={handleCommentsReady}
                                    />
                                </div>
                                <div className="w-200 py-10">
                                    <MainPanal
                                        article_id={id}
                                        userphoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                                        userName={user?.name || user?.username || "Unknown Author"}
                                        title={article.title}
                                        publishedDetails={`PUBLISHED ON ${article.day} ${article.time}`}
                                        content={article.content}
                                        topicPhoto={article.image}
                                    />
                                </div>
                            </div>
                            <Footer />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
export default ArticlesRootPage;
