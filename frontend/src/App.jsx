import Navbar from "../components/Navbar"
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ReadBlog from "./screens/ReadBlog";


function App() {

  return (
    <Router>
    <div>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/blog" element={<ReadBlog/>} />
      </Routes>

    </div>
  </Router>
  )
}

export default App
