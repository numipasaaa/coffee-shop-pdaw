import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // Fixed import
import { toast } from "react-toastify";
import loginValidation from "./LoginValidation";

function LoginPage() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    axios.defaults.withCredentials = true;

    const userAuthenticeted = () => {
        axios.get("http://localhost:8000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            console.log(response);
        }).catch(error => {
            console.error("Auth check failed:", error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = loginValidation(values);
        setErrors(err);
        if (err.email === "" && err.password === "") {
            setIsLoading(true);
            axios.post("http://localhost:8000/login", values)
                .then(res => {
                    if (res.data.auth) {
                        console.log(res.data);
                        localStorage.setItem("token", res.data.token);
                        setLoginStatus(true);
                        toast.success("Login successful");
                        navigate("/");
                    } else {
                        setLoginStatus(false);
                        toast.error(res.data.message || "Login failed");
                    }
                })
                .catch((err) => {
                    console.error("Login error:", err);
                    if (err.response && err.response.status === 401) {
                        toast.error(err.response.data.message || "Invalid username or password");
                    } else if (err.response && err.response.status === 404) {
                        toast.error("User not found");
                    } else {
                        toast.error("Cannot connect to server. Please try again later.");
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center'>Login</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" className='form-control rounded-0' name="email"
                               onChange={handleInput} placeholder='Enter your email' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" className='form-control rounded-0' name="password"
                               onChange={handleInput} placeholder='Enter your password' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0' disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>
                    <p/>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;