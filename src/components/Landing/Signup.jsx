import {useState} from "react";
import Common from "./Common";
import { Link , useNavigate } from "react-router-dom";


function Signup(){

  const [user, setUser] = useState({})
  const Navigate = useNavigate();

 
  const updateUser=(k, v)=>{
    console.log(k, v)
    setUser({...user, [k]: v})
  }
  const handleSingnup = async (e) => {
        e.preventDefault();

        const userObj = {
          "name": user.uname,
          "email": user.email,
          "phone_number": user.tel,
          "password": user.pass
        };
        
          const usersRes = await fetch("http://localhost:5174/users");
          const users = await usersRes.json();
          const emailExists = users.some(u => u.email === user.email);

          if (emailExists) {
            alert('User already registered with this email.');
            return;
          }

          const res = await fetch("http://localhost:5174/users", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userObj)
          });

          if (res.ok) {
            alert('User registered!');
            Navigate("/login"); // Redirect to Login page after successful signup
          } else {
            alert('Signup failed.');
          }
  }

    return(
        <div className="bg-gray-100">
            {/* <Dotdesign />    */}
          <div class="flex justify-evenly items-center h-screen ">
            < Common 
              title1="Signup to Your"  
              title2="Acount"  
            />    
            <div className="">  
              <form onSubmit={handleSingnup} className="flex flex-col pt-5 gap-3 w-80 ">
                    <input className="bg-white rounded-xl  p-1 focus:outline-none " name="uname" type="text" placeholder="Name" value={user.uname} onChange={(e)=>updateUser("uname", e.target.value)}/>
                    <input className="bg-white rounded-xl  p-1 focus:outline-none " name="email" type="email" placeholder="Email" value={user.email} onChange={(e)=>updateUser("email", e.target.value)}/>
                    <input className="bg-white rounded-xl  p-1 focus:outline-none " name="tel" type="tel" placeholder="Phone Number" value={user.tel} onChange={(e)=>updateUser("tel", e.target.value)}/>
                    <input className="bg-white rounded-xl p-1  focus:outline-none " name="pass" type="password" placeholder="password" value={user.pass} onChange={(e)=>updateUser("pass", e.target.value)}/>
                    <button type="submit" className="bg-gradient-to-tr from-purple-600 to-blue-500 t rounded-xl p-1 text-white">Submit</button>
              </form>
            <div className="pt-3">
              <div className="text-center">Have an account<br/>
                <Link to="/login" className=" bg-gradient-to-tr from-purple-500 to-blue-400 bg-clip-text text-transparent">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );

}

export default Signup;