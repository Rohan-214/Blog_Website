import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright as fac } from "@fortawesome/free-regular-svg-icons";

function Footer(){
    return(
        <>
            <div className="text-center w-full text-white py-10 text-lg bg-gradient-to-br from-blue-500 to-purple-500">
                <FontAwesomeIcon icon={fac} /> 2022 RiseBlog. All rights reserved
            </div>
        </>
    );
}

export default Footer;