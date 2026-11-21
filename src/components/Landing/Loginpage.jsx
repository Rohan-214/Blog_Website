import React, { useEffect, useState } from "react";
import Common from "./Common";
import { Link,  useNavigate } from "react-router-dom";


function Loginpage({handleLogin}){

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Navigate = useNavigate();

    useEffect(() => {
    if (localStorage.getItem('isAuthh') === 'true') {
      Navigate("/home");
    }
  }, [Navigate]);

  const handleLoginUtil = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://blog-website-nine-gamma.vercel.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: pass }),
      });

      if (response.status === 401) {
        setError("Invalid email or password.");
        return;
      }
      if (!response.ok) {
        throw new Error(`Login request failed (${response.status}).`);
      }

      const { userid } = await response.json();
      if (!userid) {
        throw new Error("The login response did not include a user ID.");
      }

      localStorage.setItem("userid", userid);
      localStorage.setItem("isAuthh", "true");
      if (handleLogin) handleLogin();
      Navigate("/home");
    } catch (loginError) {
      console.error("Login failed:", loginError);
      setError("Could not log in right now. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
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
                    <input className="bg-white rounded-xl  p-1 focus:outline-none " name="email" autoComplete="email" required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className="bg-white rounded-xl p-1  focus:outline-none " name="password" autoComplete="current-password" required type="password" placeholder="password" value={pass} onChange={e => setPass(e.target.value)}  />
                    {error && <p role="alert" className="text-red-700">{error}</p>}
                    <button type="submit" disabled={isSubmitting} className="text-[#f7eee8] bg-[#2F5E64] rounded-full px-12 py-4 mt-5 hover:shadow-2xl hover:font-semibold disabled:cursor-not-allowed disabled:opacity-60" >{isSubmitting ? "Logging in..." : "Submit"}</button>
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