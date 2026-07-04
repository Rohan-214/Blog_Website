import React, { useEffect, useState } from "react";
import CommentsPanal from "./ComentsPanal";

function MainCommentPanal({ topicPhoto, id, name, email, onReady }) {
    const username = name;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const emailid = email;
    const articleid = id;

    useEffect(() => {
        async function fetchComments() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`https://blog-website-nine-gamma.vercel.app/comments`);
                if (!res.ok) throw new Error("Failed to fetch comments");
                const data = await res.json();
                const filtered = data.filter(c => String(c.articleid) === String(articleid));
                setComments(filtered);
            } catch (err) {
                console.error("Error fetching comments:", err);
                setError("Failed to load comments.");
            } finally {
                setLoading(false);
                onReady?.();
            }
        }
        fetchComments();
    }, [articleid, onReady]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentobj = {
            username,
            email: emailid,
            content,
            articleid,
        };
        try {
            const res = await fetch(`https://blog-website-nine-gamma.vercel.app/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentobj),
            });
            if (res.ok) {
                alert("Comment submitted!");
                setComments(prevComments => [...prevComments, commentobj]);
                setcontent("");
            } else {
                alert("Failed to submit comment.");
            }
        } catch (err) {
            alert("Network error.");
        }
    };

    const [content, setcontent] = useState("");

    return (
        <>
            <div className="flex flex-col bg-white rounded-2xl w-100 p-5">
                <div className="text-2xl font-semibold">Comments</div>
                <form onSubmit={handleSubmit} className="flex bg-gray-300 rounded-full mt-2 pl-5">
                    <input className="w-full focus:outline-none" type="text" placeholder="Enter Your Thoughts" onChange={(e) => setcontent(e.target.value)} value={content} />
                    <button type="submit" className="px-5 py-2 rounded-full">Submit</button>
                </form>
                {loading && <p className="text-[#2F5E64] mt-4">Loading comments...</p>}
                {error && <p className="text-red-300 mt-4">{error}</p>}
                {!loading && !error && comments.map((comment, idx) => (
                    <CommentsPanal
                        key={comment.id || idx}
                        userPhoto={comment.userphoto}
                        userName={comment.username}
                        emailId={comment.email}
                        content={comment.content}
                    />
                ))}
            </div>
        </>
    );
}
export default MainCommentPanal;