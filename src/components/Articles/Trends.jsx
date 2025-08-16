import React from "react";

function Trends({photo, title, userphoto, userName, topicName, topicType, uploaded, visibility}){
    return (
        <>
            <div className="flex w-100 pt-3  gap-3 ">
                <img className="w-15 h-15 rounded-md border-2" src={photo}  />
                <div>
                    <div className="font-bold text-md">{title}</div>
                    <div className={`flex justify-evenly  gap-6 pt-2 ${visibility} `}>
                        <div className="flex gap-2">
                            <img className="w-5 h-5 rounded-full border" src={userphoto} />
                            <div className="text-gray-500 text-center text-sm">{userName}</div>
                        </div>
                        <div className="flex gap-2 text-sm">
                            <div className="bg-blue-700 rounded-full px-5 h-6 text-white ">{topicType}</div>
                            <div className="bg-green-700 rounded-full px-5 h-6 text-white ">{topicName}</div>
                        </div>
                        <div className="text-sm">{uploaded}</div>
                    </div>
                </div>
               
            </div>
        </>
    );

}

export default Trends;