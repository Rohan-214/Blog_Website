import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMagnifyingGlass as fam } from "@fortawesome/free-solid-svg-icons";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";


function Navbar({ handleLogout, isAuthenticated  }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showUserBox, setShowUserBox] = useState(false);
    const userid = localStorage.getItem('userid');






    const logoutuser = () => {
     //   if(isAuthenticated) !isAuthenticated 
     console.log("hehehe")
     console.log(isAuthenticated)
        handleLogout();
        console.log(isAuthenticated)
        localStorage.removeItem('userid');
        //isAuthenticated = !isAuthenticated;
         console.log("i am working")
        // console.log(isAuthenticated)
        
        localStorage.removeItem('isAuthh');
        alert("You have been logged out.");
        navigate("/login");
    };





    const hideLogout = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <>
            <div className={` mx-auto px-4 py-3 flex justify-around fixed right-0 left-0 w-full z-50 backdrop-blur-md }`}>
                <div className="text-4xl font-bold">RISE<span className="font-normal bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent ">BLOG</span></div>
                <div className="flex  gap-4 items-center text-lg">
                    <Link to="/home">Home</Link>
                    <Link to="/articles">Articles</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    {!hideLogout && (
                        <div className="relative">
                            <button
                                className="bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl p-1 text-white"
                                onClick={() => setShowUserBox((prev) => !prev)}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                            {showUserBox && (
                                <div className="absolute right-0 mt-2 w-48 flex flex-col bg-white rounded shadow-lg p-4 z-50">
                                    <div className="text-gray-800 font-semibold mb-2">{userid}</div>
                                    <div className="text-gray-600 text-sm">Profile, Settings, etc.</div>

                                    {(<Link to="/login" className="bg-gradient-to-tr mt-2  from-purple-600 to-blue-500 rounded-xl p-1 text-white" >LogIn</Link>)}
                                    <button className="bg-gradient-to-tr mt-2  from-purple-600 to-blue-500 rounded-xl p-1 text-white" onClick={()=>logoutuser()}>Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Navbar;