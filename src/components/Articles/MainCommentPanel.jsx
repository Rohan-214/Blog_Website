import React, { useEffect, useState } from "react";
import CommentsPanal from "./ComentsPanal";

function MainCommentPanal({ topicPhoto,id,name,email, userPhoto, userName, topicName }) {

    const username = name;
    const [userphoto, setuserphoto] = useState("");
    const [comments, setComments] = useState([]);
    const emailid = email;
    
        const [content, setcontent] = useState("");
        const articleid = id;


      useEffect(() => {
        async function fetchComments() {
            try {
                const res = await fetch(`http://localhost:5174/comments`);
                if (!res.ok) throw new Error("Failed to fetch comments");
                const data = await res.json();
                // Filter comments for this article
                const filtered = data.filter(c => String(c.articleid) === String(articleid));
                setComments(filtered);
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        }
        fetchComments();
    }, [articleid]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentData = {
            username,
            userphoto,
            emailid,
            content,
            articleid,
        };
        try {
            const res = await fetch(`http://localhost:5174/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentData),
            });
            if (res.ok) {
                alert("Comment submitted!");
                setcontent("");
            } else {
                alert("Failed to submit comment.");
            }
        } catch (err) {
            alert("Network error.");
        }
    };






    return (
        <>
            <div className="flex flex-col bg-white rounded-2xl w-100 p-5" >
                <div className="text-2xl font-semibold">Comments</div>
                <form onSubmit={(e)=>handleSubmit(e)} className=" flex bg-gray-300 rounded-full mt-2  pl-5">
                    <input className=" w-full focus:outline-none " type="text" placeholder="Enter Your Thoughts" onChange={(e) => setcontent(e.target.value)} value={content} />
                    <button type="submit" className="px-5 py-2 rounded-full ">Submit</button>
                </form>
                 {/* <CommentsPanal
                    userPhoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                    userName="Sam Williumson"
                    emailId="samwilli123@gamil.com"
                    content="The climate crisis and the environment in Central Asia Is there hope?"
                />
                <CommentsPanal
                    userPhoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                    userName="Sam Williumson"
                    emailId="samwilli123@gamil.com"
                    content="The climate crisis and the environment in Central Asia Is there hope?"
                />
                <CommentsPanal
                    userPhoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                    userName="Rohan Srivastava"
                    emailId="srivastavaroh@gamil.com"
                    content="The climate crisis and the environment in Central Asia Is there hope?"
                />  */}
                {comments.map((comment, idx) => (
                <CommentsPanal
                    key={comment.id || idx}
                    userPhoto={comment.userphoto}
                    userName={comment.username}
                    emailId={comment.emailid}
                    content={comment.content}
                />
            ))}
            </div>

        </>
    )
};

export default MainCommentPanal;