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
    const usersRes = await fetch("http://localhost:5174/users");
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
      <div className="bg-gray-100">
            {/* <Dotdesign />    */}
        <div class="flex justify-evenly items-center h-screen ">
            < Common 
              title1="Login to Your"  
              title2="Acount"  
            />    
            <div className="">  
              <form onSubmit={handleLoginUtil} className="flex flex-col pt-5 gap-3 w-80 ">
                    <input className="bg-white rounded-xl  p-1 focus:outline-none "    type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className="bg-white rounded-xl p-1  focus:outline-none "    type="password" placeholder="password" value={pass} onChange={e => setPass(e.target.value)}  />
                    <button type="submit" className="bg-gradient-to-tr from-purple-600 to-blue-500 t rounded-xl p-1 text-white" >Submit</button>
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