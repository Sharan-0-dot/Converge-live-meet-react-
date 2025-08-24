import { Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import VideoRoom from "./Components/VideoRoom";

function App() {
  return (<>
  <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/sign-up" element={<Register/>}></Route>
    <Route path="/home" element={<Dashboard/>}></Route>
    <Route path="/call" element={<VideoRoom/>}></Route>
  </Routes>
  </>);
}

export default App;