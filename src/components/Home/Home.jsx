import React, { useState } from "react";
import Navbar from "../../Navbar";
import Dotdesign from "../../Dotdesign";
import { Link } from "react-router-dom";

function Home() {

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



    return (
        <>

            <div className="bg-[#F7EFE8]">
                <div className="flex justify-center items-center h-screen ">
                    <img className=" rounded-br-2xl rounded-l-full rounded-tr-full border-5 border-[#2F5E64] "
                        src="https://img.freepik.com/free-photo/smiley-woman-with-headphones-working-laptop_23-2148764530.jpg?t=st=1751754978~exp=1751758578~hmac=19ec2661a5f56da11ab229bf6626dfedd7a557b4cbfe8e2a1b8160aa4505a61f%22"
                        alt=""
                    />
                    <div className="text-end" >
                        <div className="text-8xl font-semibold mb-5 items-start text-[#2F5E64]">Write your
                            <span className="text-[#BC7E6C]"><br />Article<br /></span>
                            <Link to="/addArticles" className="text-[#BC7E6C] text-8xl font-semibold underline-offset-10 underline hover:text-[#2F5E64]">here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;