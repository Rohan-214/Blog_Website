import React from "react";
import Trends from "./Trends";

function TrendingPanel(){
    return(
        <>
            <div className="w-100 bg-white rounded-2xl p-5">
                <div className="text-2xl font-semibold"> Trending</div>
                <div className="flex flex-col gap-2">
                    <Trends 
                        photo="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg" 
                        title="How Will AI Image Generators Affect Artists?"
                        visibility="hidden"
                    />
                    <Trends 
                        photo="https://t4.ftcdn.net/jpg/05/31/27/67/360_F_531276723_WVWlANKtDQmwSxwW5P2Yn4hngudDeCSg.jpg" 
                        title="How Will AI Image Generators Affect Artists?"
                        visibility="hidden"
                    />
                    
                </div>
            </div>
        </>
    );
}

export default TrendingPanel;