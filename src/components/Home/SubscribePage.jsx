import React from "react";
import Dotdesign from "../../Dotdesign";

function SubscribePage () {

    const alertfunction = () => {
        alert("functionality not available yet");
    }

    return (
        <>
            <div className="flex justify-center items-center h-[88vh] bg-gray-200">
                <div className="bg-white h-120 rounded-3xl flex overflow-hidden">
                    <div className="w-1/2">
                        <Dotdesign top="   border-10 border-gradient-to-tr from-purple-500 to-blue-400  rotate-45  w-45  h-15" />
                        <Dotdesign top="  border-4  w-45  h-15" />
                        <Dotdesign top="  border-4  w-45  h-15" />
                        <Dotdesign top="  border-4  w-45  h-15" />
                    
                    </div>                    
                    <div className="flex h-full items-center">
                        <div className="p-10  items-center">
                            <div className="text-6xl font-bold">Subscribe</div>
                            <div className="pt-5 text-2xl">Subscribe to our newsletter and get upto 40% off on our exclusive service.</div>
                            <form className="flex border-3 mt-10 rounded-xl border-purple-500">
                                <input className="w-full px-2 focus:outline-none " type="email" placeholder="Email Address" />
                                <button onClick={alertfunction} className="bg-purple-500 p-2 py-3 text-white ">Subscribe</button>
                            </form>
                        </div>
                    </div>        
                </div>
            </div>
        </>
    );
}

export default SubscribePage;