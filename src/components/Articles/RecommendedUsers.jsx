import React, { useEffect, useState } from "react";
import axios from "axios";

function RecommendedUser({ username, userphoto, userid }) {
    const myid = localStorage.getItem("userid");
    const [isclicked, setisclicked] = useState(false)


    useEffect(() => {
        axios.get(`https://blog-website-nine-gamma.vercel.app/userfollow?myid=${myid}&userid=${userid}`)
            .then(res => {
                const newres = res.data;
                if (newres?.length > 0) {
                    setisclicked(newres[0]?.isfollowing);
                }
                else{
                    setisclicked(false);
                }
            }).catch(err => {
                console.error("Error fetching follow data:", err);
                setisclicked(false);
            });
    }, []);

    const toggle = () => {
        const followData = { myid, userid, isfollowing: !isclicked };

        axios.post(`https://blog-website-nine-gamma.vercel.app/userfollow`, followData)
            .then(res => {
                console.log("Response from server:", res.data);
            })
            .catch(err => {
                console.error("Error posting follow data:", err);
            });

        setisclicked(!isclicked)
    }




    return (
        <>
            <div className="flex justify-between h-full">
                <div className="flex h-full gap-2 ">
                    <img className="w-10  h-10 border rounded-full " src={userphoto} alt="" />
                    <div className=" flex font-semibold text-lg items-center">{username}</div>
                </div>
                <button onClick={toggle} className={` ${isclicked ? "border-2 border-[#2F5E64] text-[#2F5E64]" : "bg-[#2F5E64] text-white"}  rounded-full px-8`}>{isclicked ? "Following" : "follow"}</button>
            </div>
        </>

    );
}

export default RecommendedUser;