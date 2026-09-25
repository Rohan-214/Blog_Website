import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUser } from "./services/users.service";
function Navbar({ handleLogout, isAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showUserBox, setShowUserBox] = useState(false);
    const [showNavLinks, setShowNavLinks] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
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

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="mx-auto px-4 py-3 flex justify-between items-center fixed right-0 left-0 w-full z-50 backdrop-blur-md">
                <div className="text-4xl font-bold">RISE<span className={`font-semibold transition-colors duration-300 ${isScrolled ? 'text-[#BC7E6C]' : 'text-[#2F5E64]'}`}>BLOG</span></div>
                <button
                    type="button"
                    className="sm:hidden text-2xl"
                    aria-label={showNavLinks ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={showNavLinks}
                    onClick={() => setShowNavLinks((prev) => !prev)}
                >
                    <FontAwesomeIcon icon={showNavLinks ? faClose : faBars} />
                </button>
                <div className={`${showNavLinks ? "flex" : "hidden"} sm:flex absolute sm:static top-full right-0 sm:right-auto bg-transparent p-4 sm:p-0 flex-col sm:flex-row gap-4 items-end sm:items-center text-right text-lg font-semibold shadow-none sm:ml-auto w-max max-w-[calc(100vw-2rem)]`}>
                    <Link onClick={() => setShowNavLinks(false)} className="hover:text-[#BC7E6C]" to="/home">Home</Link>
                    <Link onClick={() => setShowNavLinks(false)} className="hover:text-[#BC7E6C]" to="/articles">Articles</Link>
                    <Link onClick={() => setShowNavLinks(false)} className="hover:text-[#BC7E6C]" to="/about">About</Link>
                    <Link onClick={() => setShowNavLinks(false)} className="hover:text-[#BC7E6C]" to="/contact">Contact</Link>
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