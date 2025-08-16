import React from "react";



function HomeSliderImages({photo, link,title}){
    return (
        <>
            <a className="overflow-hidden" href={link}><img className="rounded-full h-90 w-65 " 
                src={photo} 
                />
            <div className="text-center">{title}</div></a>
            
        </>
    );
}

export default HomeSliderImages;