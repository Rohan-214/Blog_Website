import React from "react";

function AboutContent({title, description}) {
    return ( 
        <div className="w-full px-4 py-6 sm:px-8 lg:w-1/2 lg:px-10 lg:py-20">  
            <div className="rounded-2xl bg-white p-6 sm:p-10"> 
                <div className="mt-2 text-center text-3xl font-bold text-[#2F5E64] sm:text-5xl">{title}</div>
                <div className="mt-5 text-center text-lg font-semibold text-gray-600 sm:text-2xl">
                    <p> {description}</p>
                </div>       
            </div>
        </div>
    )};

export default AboutContent;