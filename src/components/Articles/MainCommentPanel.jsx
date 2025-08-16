import React from "react";
import CommentsPanal from "./ComentsPanal";

function MainCommentPanal({ topicPhoto, content, userPhoto, userName, topicName }) {
    return (
        <>
            <div className="flex flex-col bg-white rounded-2xl w-100 p-5" >
                <div className="text-2xl font-semibold">Comments</div>
                <div className=" flex bg-gray-300 rounded-full mt-2  pl-5">
                    <input className=" w-full focus:outline-none " type="text" placeholder="Enter Your Thoughts" />
                    <button className="px-5 py-2 rounded-full ">Submit</button>
                </div>
                <CommentsPanal
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
                    userName="Sam Williumson"
                    emailId="samwilli123@gamil.com"
                    content="The climate crisis and the environment in Central Asia Is there hope?"
                />
            </div>

        </>
    )
};

export default MainCommentPanal;