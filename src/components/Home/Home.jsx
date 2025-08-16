import React, { useState } from "react";
import Navbar from "../../Navbar";
import Dotdesign from "../../Dotdesign";
import { Link } from "react-router-dom";

function Home(){

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setTitle("");
        setContent("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the article submission here (e.g., send to backend)
        alert(`Article Submitted!\nTitle: ${title}\nContent: ${content}`);
        handleCloseModal();
    };



    return(
        <>

        <div className=" ">
            <div className="flex justify-center items-center h-[95vh] ">
                <img className=" rounded-br-2xl rounded-l-full rounded-tr-full  " 
                    src="https://img.freepik.com/free-photo/smiley-woman-with-headphones-working-laptop_23-2148764530.jpg?t=st=1751754978~exp=1751758578~hmac=19ec2661a5f56da11ab229bf6626dfedd7a557b4cbfe8e2a1b8160aa4505a61f%22" 
                    alt="" 
                />
                <div className="text-end" >
                    <div className="text-8xl font-semibold mb-5 items-start">Write your 
                        <span className="bg-gradient-to-tr from-purple-500 to-blue-400 bg-clip-text text-transparent"><br/>Article<br/></span>  
                    </div>
                    <Link to="/addArticles" className="bg-gradient-to-tr from-purple-500 to-blue-400 px-10 rounded-3xl text-5xl font-semibold hover:shadow-2xl hover:font-semibold ">here</Link>
                </div>
            </div>
        </div>

        {/* {showModal && (
                <div className="fixed inset-0 flex items-center justify-center  z-50">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-4 text-center">Write Article</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Title"
                                className="border p-2 rounded"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Content"
                                className="border p-2 rounded h-32"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}
        


      
        </>
    );
}

export default Home;