import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright as fac } from "@fortawesome/free-regular-svg-icons";

function Footer(){
    return(
        <>
            <div className="text-center w-full text-white py-7 text-lg bg-gradient-to-r from-[#2F5E64] to-[#BC7E6C]">
                <FontAwesomeIcon icon={fac} /> 2022 RiseBlog. All rights reserved
            </div>
        </>
    );
}

export default Footer;