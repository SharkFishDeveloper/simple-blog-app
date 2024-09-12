import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../../util/BACKEND_URL";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const handleLogin = async()=>{   
        const resp = await axios.post(`${BACKEND_URL}/user/login`,{
            email,
            password
        },{withCredentials:true});

        if(resp.status !== 200){
           alert(resp.data.message);
        }else{
           alert(resp.data.message)
           navigate("/");
        }
    }


  return (
    <div className="h-[30rem] bg-gray-100 w-[90%] max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
  
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <label htmlFor="email" className="text-gray-700 mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="password" className="text-gray-700 mb-2">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
  
      <button
        onClick={handleLogin} // Your login function here
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
    </div>
  </div>
  
  )
}

export default Login