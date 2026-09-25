import React from "react";
import Dotdesign from "../../Dotdesign";


    function Common({photo, title1,title2, button, question, linkname, link,  login}){

        return(
            <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
                {/* <Dotdesign />    */}
                <img className="size-[clamp(10rem,45vw,20rem)] rounded-full object-cover sm:size-64 lg:h-60 lg:w-80" src="https://img.freepik.com/free-photo/smiley-woman-with-headphones-working-laptop_23-2148764530.jpg?t=st=1751754978~exp=1751758578~hmac=19ec2661a5f56da11ab229bf6626dfedd7a557b4cbfe8e2a1b8160aa4505a61f" alt="" />
                <div className="flex flex-col justify-center ">
                    <div className="text-3xl sm:text-6xl font-semibold text-center">{title1}
                        <span className=" text-[#2F5E64]"> <br/>{title2}</span>
                    </div>
                </div>
            </div>    
        );
    }

export default  Common;