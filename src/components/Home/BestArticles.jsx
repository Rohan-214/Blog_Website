import React from "react";
import Dotdesign from "../../Dotdesign";
import BestArticlesTopic from "./BestArticlesTopics";
import { Link } from "react-router-dom";


const likes = 32;
const comment = 12;

function BestArticles(){
    return(
        <div className="flex justify-center  h-screen items-center bg-gradient-to-br from-blue-700 to-purple-500">
            {/* <Dotdesign top="top-[-40%] left-[20%] w-15 border-12 bg-none border-white  h-15 -rotate-20" />
            <Dotdesign top="top-[-30%] left-[80%] w-70 border-12 bg-none border-white  h-15 -rotate-145" />
            <Dotdesign top="top-[40%] left-[5%] w-45  border-12 bg-none border-white  h-15 -rotate-95" />
            <Dotdesign top="top-[10%] left-[-6%] w-45 border-12 bg-none border-white  h-15 -rotate-25" />
            <Dotdesign top="top-[30%] left-[70%] w-45 border-12 bg-none border-white  h-15 -rotate-45" />
            <Dotdesign top="top-[40%] left-[40%] w-45 border-12 bg-none border-white  h-15 -rotate-45" /> */}
            <div className="flex gap-5">    
                <div>
                    <div className="text-8xl font-semibold mb-8">
                        Best <span className="text-white"><br/>Article<br/></span>Today
                    </div>
                    <Link to="/articles" className="bg-white text-blue-500 rounded-full px-12 py-4 mt-5 hover:shadow-2xl hover:font-semibold ">See All Articles</Link>
                
                </div> 
                
                <BestArticlesTopic 
                    photo="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTFCiOti_YR4FJv2Ahx7m9S3bFpbEjgC07LjhIxicmNInZ6SlmR"
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    description="when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                    uploadTime="10 hour ago"
                />
                <BestArticlesTopic 
                    photo="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTFCiOti_YR4FJv2Ahx7m9S3bFpbEjgC07LjhIxicmNInZ6SlmR"
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    description="when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                    uploadTime="10 hour ago"
                />
                <BestArticlesTopic 
                    photo="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTFCiOti_YR4FJv2Ahx7m9S3bFpbEjgC07LjhIxicmNInZ6SlmR"
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    description="when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                    uploadTime="10 hour ago"
                />
                <BestArticlesTopic 
                    photo="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTFCiOti_YR4FJv2Ahx7m9S3bFpbEjgC07LjhIxicmNInZ6SlmR"
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    description="when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                    uploadTime="10 hour ago"
                />
                
            </div>     
        </div>
    );
}
export default BestArticles; 