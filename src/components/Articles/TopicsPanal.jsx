import React from "react";
import TopicName from "./TopicName"
function TopicsPanel({topicPhoto, content, userPhoto, userName, topicName}){
    return(
        <>
            <div className="flex p-2 bg-white rounded-2xl  gap-5">
                <img className="w-25 rounded-lg" 
                    src={topicPhoto}
                />
                <div>
                    <div>{content}</div>
                    <div className="flex justify-between">
                        <div className="flex">
                            <img className="w-8 h-8 rounded-full" 
                                src={userPhoto} 
                            />
                            <div>{userName}</div>
                        </div>
                        <TopicName topic="Elon musk"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopicsPanel;