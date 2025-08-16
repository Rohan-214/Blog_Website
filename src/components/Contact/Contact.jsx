import React, { useState } from "react";
import Navbar from "../../Navbar";

function Contact(){
    
        const [email, setEmail] = useState("");
        const [name, setName] = useState("");
        const [message, setMessage] = useState("");

        const handleSubmit = async (e) => {
            e.preventDefault();
            const contactData = { email, name, message };

            const res = await fetch("http://localhost:5174/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData),
            });

            if (res.ok) {
                alert("Message sent!");
                setEmail("");
                setName("");
                setMessage("");
            } else {
                alert("Failed to send message.");
            }
        };


    
    
    return(

  

        <>  
            <Navbar/>
            <div className="h-screen flex items-center bg-gray-200 justify-center" >
                <div className="bg-white flex flex-col p-8 rounded-3xl " >
                    <h1 className="text-3xl w-120 font-bold text-center bg-gradient-to-br from-blue-700 to-purple-700 bg-clip-text text-transparent  ">Contact Us</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <input type="email" placeholder="Your email" className="mt-4 block w-full p-2 border border-gray-300 rounded-md" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="text" placeholder="Your Name" className="mt-4 block w-full p-2 border border-gray-300 rounded-md" value={name} onChange={e => setName(e.target.value)} />   
                        <textarea placeholder="Your Message" className="mt-4 block w-full p-2 border border-gray-300 rounded-md" value={message} onChange={e => setMessage(e.target.value)} ></textarea>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Send Message    
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;