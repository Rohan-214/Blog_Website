import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots as fac } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function CommentButton(){

    const [visible, setvisible] = useState("hidden")
        
    const commentDown = () => {
        setvisible((visible) =>  "block" )
    }
        
    const cut = () => {
        setvisible((visible => "hidden"))
    }
        

    return (
        <div className="">
            <button onClick={commentDown}><FontAwesomeIcon icon={fac} /></button>
            <div className={`float-right flex justify-end ${visible} `}>
                <textarea  className= " border " ></textarea>
                <FontAwesomeIcon onClick={cut} icon={faClose}/>                
            </div>
        </div>
    );
}

export default CommentButton;