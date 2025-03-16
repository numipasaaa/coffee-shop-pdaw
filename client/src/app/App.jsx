import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import {Header} from "../components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import UserHomeScreen from "./UserHomeScreen.jsx";

import HomePage from "./HomePage.jsx";
const Login = lazy(() => import("./LoginPage.jsx"));
const Signup = lazy(() => import("./SignupPage.jsx"));
const NotFound = lazy(() => import("./NotFound.jsx"));

const App = () => {
    return (
        <Router>
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/homeScreen" element={<UserHomeScreen />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={true}
                closeOnClick
                // pauseOnHover
                theme="colored"
            />
        </Router>
    );
};

export default App;