import CommentButton from "../Buttons/CommentButton";
function CommentsPanal({ userPhoto, userName, emailId, content }) {
    return (
        <>
            <div className="flex flex-col mt-3 gap-3">
                <div className="w-full overflow-hidden rounded-2xl bg-gray-300 p-2">
                    <div className="flex flex-wrap justify-between gap-2">
                        <div className="flex min-w-0">
                            <img className="w-7 h-7 rounded-full " src={"some text"} />
                            <div className="text-sm  font-semibold " >{userName}</div>
                        </div>
                        <div className="max-w-full break-all text-sm">{emailId}</div>
                    </div>
                    <div>{content}</div>
                    <div className="flex justify-end gap-5">

                        <div className="flex flex-row-reverse items-start">
                            {/* <LikeButton /> */}
                        </div>
                        <div className="flex items-center">
                            {/* <CommentButton /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CommentsPanal;