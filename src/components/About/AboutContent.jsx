import React from "react";

function AboutContent({title, description}) {
    return ( 
        <div className="w-[49%]  px-10 p-20">  
            <div className=" p-10 rounded-2xl  bg-white "> 
                <div className="text-center text-5xl font-bold mt-5   bg-gradient-to-tr from-blue-700 to-purple-700 bg-clip-text text-transparent     ">{title}</div>
                <div className="text-center  text-2xl mt-5 font-semibold text-gray-600">
                    <p> {description}</p>
                </div>       
            </div>
        </div>
    )};

export default AboutContent;