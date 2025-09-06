import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram as fai} from '@fortawesome/free-brands-svg-icons';
import { faFacebook as faf } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp as faw } from "@fortawesome/free-brands-svg-icons";
import { faTwitter as fat } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn as fal } from "@fortawesome/free-brands-svg-icons";
import LikeButton from "../Buttons/LikeButton";
import ShareButton from "./ShareButton";

function MainPanal({userphoto, userName, title, publishedDetails, description, content, topicPhoto, article_id}){
    const [isclicked, setisclicked] = useState(false)
    console.log("here")
    
    const toggle = () => {
        setisclicked(!isclicked)
    }
    const userID = localStorage.getItem("userid")
    const articleID = article_id;

    return(
        <>
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <div className="flex items-center gap-1">
                        <img className="w-8 h-8 rounded-full " src={userphoto}/>
                        <div className="font-medium" >{userName}</div>
                    </div>
                    <button type="button" onClick={()=>setisclicked(!isclicked)} className={` rounded-2xl ${isclicked ? "border-2 font-medium ":"bg-black  text-white" }  px-7`}>{isclicked?"Following":"Follow"}</button>
                    <div className="flex items-center text-xl gap-1  flex-row-reverse">
                        <LikeButton userid = {userID} articleid={articleID}/>
                    </div>
                    
                </div>
                <div className="flex gap-2 text-xl">
                    <ShareButton link = {<FontAwesomeIcon icon={faf}/>} />
                    {/* <a href="#"><FontAwesomeIcon icon={faf}/></a>
                    <a href="#"><FontAwesomeIcon icon={fai}/></a>
                    <a href="#"><FontAwesomeIcon icon={fal}/></a>
                    <a href="#"><FontAwesomeIcon icon={fat}/></a>
                    <a href="#"><FontAwesomeIcon icon={faw}/></a> */}
                </div>
            </div>
            <div className="mt-5 text-3xl font-bold">{title}</div>
            <div >
                <div className="font-light mt-5 text-sm">{publishedDetails}</div>
                <img  src={topicPhoto}/>
                <div className="font-light mb-5 text-sm">{description}</div>
            </div>   
            <div className="px-10 text-xl">{content}</div>
        </>
    );
}

export default MainPanal;