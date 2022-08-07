import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./commonPages/Home";
import AdminDashboard from "./adminPages/AdminDashboard";
import Admin from "./adminPages/Admin";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import AddUser from "./adminPages/AddUser";
import AboutUs from "./commonPages/AboutUs";
import AddStreetLight from "./adminPages/AddStreetLight";
import History from "./commonPages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/add-user' element={<AddUser />}></Route>
        <Route path='/add-streetlight' element={<AddStreetLight />}></Route>
        <Route path='/admin-dashboard' element={<AdminDashboard />}></Route>
        <Route path='/about-us' element={<AboutUs />}></Route>
        <Route path='/history' element={<History />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
