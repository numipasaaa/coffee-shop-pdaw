import React, {useContext} from 'react'
import './LoginPopup.css'
import {assets} from "../../assets/assets.js";
import {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios";
import {toast} from "react-toastify";

const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState] = React.useState("Sign Up")
    const {url, setToken} = useContext(StoreContext)
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const {name, value} = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if (currState === "Sign Up") {
            newUrl += "/api/user/register";
        }
        else {
            newUrl += "/api/user/login";
        }
        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            toast.success(response.data.message);
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="login-popup">
            <form onSubmit={onSubmitLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
                </div>
                <div className="login-popup-inputs">
                    {currState==="Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Your password" required />
                </div>
                <button type='submit'>{currState==="Sign Up" ? "Create account" : "Login"}</button>
                {currState==="Sign Up"
                    ? <>
                        <div className="login-popup-condition">
                            <input type="checkbox" required />
                            <p>By continuing, I agree to the terms of use & privacy policy.</p>
                        </div>
                    </>
                    : <></>
                }

                {currState==="Login"
                    ? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}


            </form>
        </div>
    )
}
export default LoginPopup
