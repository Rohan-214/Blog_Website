import React from "react";
import Dotdesign from "../../Dotdesign";

function SubscribePage () {

    const alertfunction = () => {
        alert("functionality not available yet");
    }

    return (
        <>
            <div className="flex justify-center items-center h-[88vh] bg-[#F0F0F0]">
                <div className="bg-white h-120 rounded-3xl flex overflow-hidden">
                    <div className="w-1/2">
                        <Dotdesign top="   border-22 border-[#2F5E64] bg-white rotate-25  w-45  h-5" />
                        <Dotdesign top="  border-7 border-[#2F5E64] rotate-25 top-5 left-5 w-25  h-15" />
                        <Dotdesign top="  border-30  border-[#2F5E64]  top-10 right-6 w-15  h-15" />
                        <Dotdesign top="  border-17  border-[#2F5E64]  top-65  right-16 w-35  h-35" />
                        <Dotdesign top="  border-17  border-[#2F5E64]  rotate-15 top-20  left-15  w-25  h-4" />
                        <Dotdesign top="  border-10  border-[#BC7E6C]  rotate-35 bottom-20  left-35  w-35  h-9" />
                        <Dotdesign top="  border-10  border-[#BC7E6C]  rotate-145 bottom-60  left-35  w-35  h-9" />
                    
                    </div>                    
                    <div className="flex h-full items-center">
                        <div className="p-10  items-center">
                            <div className="text-6xl [#666666] font-bold">Subscribe</div>
                            <div className="pt-5 text-2xl">Subscribe to our newsletter and get upto 40% off on our exclusive service.</div>
                            <form className="flex border-3 mt-10 rounded-xl border-[#EE7965]">
                                <input className="w-full px-2 focus:outline-none " type="email" placeholder="Email Address" />
                                <button onClick={alertfunction} className="bg-[#EE7965] p-2 py-3 text-white ">Subscribe</button>
                            </form>
                        </div>
                    </div>        
                </div>
            </div>
        </>
    );
}

export default SubscribePage;