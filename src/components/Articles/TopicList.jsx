import React, { useEffect, useState } from "react";

 function TopicList({topic,onclick}){
    return(
        <>
        <div  className="text-xl px-5 font-semibold hover:text-[#BC7E6C] cursor-pointer">{topic}</div>
        </>
    );
}
export default TopicList;