import React from 'react'
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import {Route, Routes} from "react-router-dom";
import List from "./pages/List/List.jsx";
import Add from "./pages/Add/Add.jsx";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Users from "./pages/Users/Users.jsx";
import Edit from "./pages/Edit/Edit.jsx";
import UpdateUser from "./pages/UpdateUser/UpdateUser.jsx";

const App = () => {
    const url = "http://localhost:4000";

    return (
        <div>
            <ToastContainer />
            <Navbar />
            <hr/>
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path="/list" element={<List url={url} />} />
                    <Route path="/add" element={<Add url={url} />} />
                    <Route path="/orders" element={<Orders url={url} />} />
                    <Route path="/users" element={<Users url={url} />} />
                    <Route path='/edit' element={<Edit url={url} />} />
                    <Route path='/update' element={<UpdateUser url={url} />} />
                </Routes>
            </div>
        </div>
    )
}
export default App
