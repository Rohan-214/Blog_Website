import React from "react";
import TopicName from "./TopicName"

function Recommend () {
    return (
        <>
            <div className="bg-white rounded-2xl w-100 p-5">
                <div className="mb-5 text-2xl font-semibold">Recommended topics</div>
                    <div className="flex flex-wrap gap-5">
                        <TopicName topic="Elon Musk" />
                        <TopicName topic="FTX" />
                        <TopicName topic="Cyrpto" /> 
                        <TopicName topic="Politic" /> 
                        <TopicName topic="Metaverse  " /> 
                    </div>
                
            </div>
        </>
    );
}

export default Recommend;