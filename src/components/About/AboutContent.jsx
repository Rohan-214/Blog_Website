import React from "react";

function AboutContent({title, description}) {
    return ( 
        <div className="w-[49%]  px-10 p-20">  
            <div className=" p-10 rounded-2xl  bg-white "> 
                <div className="text-center text-5xl font-bold mt-5   text-[#2F5E64]    ">{title}</div>
                <div className="text-center  text-2xl mt-5 font-semibold text-gray-600">
                    <p> {description}</p>
                </div>       
            </div>
        </div>
    )};

export default AboutContent;