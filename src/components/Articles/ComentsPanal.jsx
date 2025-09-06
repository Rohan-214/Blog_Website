
import LikeButton from "../Buttons/LikeButton";  
import CommentButton from "../Buttons/CommentButton";

function CommentsPanal({userPhoto, userName, emailId, content}){



    return(
        <>
            
            <div className="flex flex-col mt-3 gap-3">
                <div className="bg-gray-300 rounded-2xl w-90 p-2">
                    <div className="flex justify-between ">
                        <div className="flex">
                            <img className="w-7 h-7 rounded-full " src={"some text"}  />
                            <div className="text-sm  font-semibold " >{"username"}</div>
                        </div>
                        <div className="text-sm">{emailId}</div>
                    </div>
                    <div>{content}</div>
                    <div className="flex justify-end gap-5"> 

                        <div className="flex flex-row-reverse items-start">
                            {/* <LikeButton /> */}
                        </div>
                        <div className="flex items-center">
                            <CommentButton />
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
}

export default CommentsPanal;