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
            <div className="flex min-w-0 items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                    <img className="size-10 shrink-0 rounded-full border object-cover" src={userphoto} alt="" />
                    <div className="min-w-0 truncate text-base font-semibold">{username}</div>
                </div>
                <button onClick={toggle} className={`shrink-0 rounded-full px-3 py-2 text-sm ${isclicked ? "border-2 border-[#2F5E64] text-[#2F5E64]" : "bg-[#2F5E64] text-white"}`}>{isclicked ? "Following" : "Follow"}</button>
            </div>
        </>

    );
}

export default RecommendedUser;