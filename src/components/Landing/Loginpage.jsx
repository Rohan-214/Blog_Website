import React, { useEffect, useState } from "react";
import Common from "./Common";
import { Link,  useNavigate } from "react-router-dom";
import HomeRootPage from "../Home/HomeRootPage";


function Loginpage({handleLogin}){

  
  // const [User, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const Navigate = useNavigate();

    useEffect(() => {
    if (localStorage.getItem('isAuthh') === 'true') {
      Navigate("/home");
    }
  }, [Navigate]);

  const handleLoginUtil = async (e) => {
    e.preventDefault();
    const usersRes = await fetch(`https://blog-website-nine-gamma.vercel.app/users`);
    const users = await usersRes.json();
    const user = users.find(u => u.email === email && u.password === pass);

    if (user) {
      const userid = user._id;
      console.log(userid);
      localStorage.setItem('userid', userid);
      localStorage.setItem('isAuthh', true);


      alert("Login successful!"); 
      if (handleLogin) handleLogin();
      Navigate ("/home"); // Redirect to Home page after successful login
      // You can redirect or set auth state here
    } else {
      alert("Invalid email or password.");
    }

  };
  
    return(
      <div className="bg-[#F7EFE8] min-h-screen">
            {/* <Dotdesign />    */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly items-center min-h-screen gap-8 px-6 py-24 lg:px-8">
            < Common 
              title1="Login to Your"  
              title2="Account"  
            />    
            <div className="w-full max-w-80">  
              <form onSubmit={handleLoginUtil} className="flex flex-col pt-5 gap-3 w-full ">
                    <input className="bg-white rounded-xl  p-1 focus:outline-none "    type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className="bg-white rounded-xl p-1  focus:outline-none "    type="password" placeholder="password" value={pass} onChange={e => setPass(e.target.value)}  />
                    <button type="submit" className="text-[#f7eee8] bg-[#2F5E64] rounded-full px-12 py-4 mt-5 hover:shadow-2xl hover:font-semibold " >Submit</button>
              </form>
            <div className="pt-3">
              <div className="text-center">Don't have an account<br/>
                <Link to="/signup" className=" bg-gradient-to-tr from-purple-500 to-blue-400 bg-clip-text text-transparent">Signup</Link>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
}
export default Loginpage;