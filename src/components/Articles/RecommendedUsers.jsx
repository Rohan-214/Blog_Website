import React, { useState } from "react";

function RecommendedUser({username, userphoto}){

    const [isclicked, setisclicked] = useState(false)

    const toggle = () => {

        setisclicked((isclicked) => isclicked ? false : true )
    }

    
    return(
        <>
            <div className="flex justify-between h-full">
                <div className="flex h-full gap-2 ">
                    <img className="w-10  h-10 border rounded-full " src={userphoto} alt="" />
                    <div className=" flex font-semibold text-lg items-center">{username}</div>
                </div>
                <button onClick={toggle} className={` ${isclicked ? "border-2 border-blue-700 text-blue-700": "bg-blue-700 text-white"}  rounded-full px-8`}>{isclicked ? "Following" : "follow"}</button>
            </div>
        </>

    );
}

export default RecommendedUser;