import React from "react";
import Dotdesign from "../../Dotdesign";


    function Common({photo, title1,title2, button, question, linkname, link,  login}){

        return(
            <div className="bg-gray-100 flex">
                {/* <Dotdesign />    */}
                <img className="rounded-full " src="https://img.freepik.com/free-photo/smiley-woman-with-headphones-working-laptop_23-2148764530.jpg?t=st=1751754978~exp=1751758578~hmac=19ec2661a5f56da11ab229bf6626dfedd7a557b4cbfe8e2a1b8160aa4505a61f" alt="" />
                    <div className="flex flex-col justify-center ">
                        <div className="text-6xl font-semibold text-center">{title1}
                            <span className=" bg-gradient-to-tr from-purple-500 to-blue-400 bg-clip-text text-transparent"> <br/>{title2}</span>
                        </div>
                    </div>
                
            </div>    
        );
    }

export default  Common;