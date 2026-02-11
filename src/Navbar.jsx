import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMagnifyingGlass as fam } from "@fortawesome/free-solid-svg-icons";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { fetchUser } from "./services/users.service";
function Navbar({ handleLogout, isAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showUserBox, setShowUserBox] = useState(false);
    
    const userid = localStorage.getItem('userid');
    const logoutuser = () => {
        handleLogout();
        localStorage.removeItem('userid');
        localStorage.removeItem('isAuthh');
        alert("You have been logged out.");
        navigate("/login");
    };
    const hideLogout = location.pathname === "/login" || location.pathname === "/signup";
    
    const [user, setuser] = useState({})
    useEffect(() => {
        const loadUser = async () => {  
            if (userid) {
                const userData = await fetchUser(userid);
                setuser(userData);
            }
        };
        loadUser();
    }, [userid]);

    return (
        <>
            <div className={` mx-auto px-4 py-3 flex justify-around fixed right-0 left-0 w-full z-50 backdrop-blur-md }`}>
                <div className="text-4xl font-bold">RISE<span className="font-semibold text-[#2F5E64]">BLOG</span></div>
                <div className="flex  gap-4 items-center text-lg font-semibold">
                    <Link className="hover:text-[#BC7E6C]" to="/home">Home</Link>
                    <Link className="hover:text-[#BC7E6C]" to="/articles">Articles</Link>
                    <Link className="hover:text-[#BC7E6C]" to="/about">About</Link>
                    <Link className="hover:text-[#BC7E6C]" to="/contact">Contact</Link>
                    {!hideLogout && (
                        <div className="relative">
                            <button
                                className="hover:text-[#BC7E6C]"
                                onClick={() => setShowUserBox((prev) => !prev)}
                            >Profile
                            </button>
                            {showUserBox && (
                                <div className="absolute right-0 mt-2  flex flex-col bg-white rounded-lg shadow-lg p-4 z-50">
                                    {/* <div className="text-gray-800 font-semibold mb-2"> ID : {userid}</div> */}
                                    <div className="text-gray-600 text-sm">{user.name}</div>
                                    <div className="text-gray-600 text-sm">{user.email}</div>

                                    {!isAuthenticated && (<Link to="/login" className="bg-gradient-to-tr mt-2  text-center from-purple-600 to-blue-500 rounded-xl p-1 text-white" >LogIn</Link>)}
                                    <button className="bg-[#2F5E64] mt-2 rounded-xl p-1 text-white" onClick={() => logoutuser()}>Logout</button>
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