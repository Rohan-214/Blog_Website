import React, { useState } from "react";
import Home from "./Home";
import HomeSlider from "./HomeSlider";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import BestArticles from "./BestArticles";
import SubscribePage from "./SubscribePage";

function HomeRootPage(){

    const [enable, setEnable] = useState(true);

    const toggleView = () => {setEnable(prev => !prev);};

    const btn = enable ? <Home /> : <HomeSlider />;

    
    return(
        
        <>  

            {btn}
            <div className="flex justify-center" ><button onClick={toggleView} className="text-4xl hover:font-bold ">{enable ?">" : "<" }</button></div>
            <BestArticles />
                <SubscribePage/>
                <Footer/>
            
        </>
    );
}

export default HomeRootPage;