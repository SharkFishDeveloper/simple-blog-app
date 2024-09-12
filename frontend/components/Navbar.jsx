import { useNavigate } from "react-router-dom"


const Navbar = () => {
    const navigate = useNavigate();

  return (
    <div className="bg-black text-white flex justify-between p-4 ">

        <span className="cursor-pointer" onClick={()=>navigate("/")}>Blog-logo</span>

        <span>Name</span>
        <span>About</span>
    </div>
  )
}

export default Navbar