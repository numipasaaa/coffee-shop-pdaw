import React, {useContext, useEffect, useState} from 'react'
import './MyProfile.css'
import {StoreContext} from "../../context/StoreContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const MyProfile = () => {
    const [data, setData] = useState([]);
    const [currState, setCurrState] = React.useState("View")
    const {url, token} = useContext(StoreContext);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const response = await axios.post(url + "/api/user/userdata", {token});
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token])

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const response = await axios.post(`${url}/api/user/update`, {data, token});

        if (response.data.success) {
            toast.success(response.data.message);
            setCurrState("View");
        }
        else {
            toast.error(response.data.message);
        }
    }

    const deleteAccount = async (userId) => {
        const response = await axios.post(`${url}/api/user/remove`, {id: userId});

        if (response.data.success) {
            toast.success(response.data.message);
            localStorage.removeItem("token");
            navigate("/");
        }
        else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="user-data">
            <h2>My profile</h2>
            <div className="container">
                {
                    currState === "View"
                        ?   <div className="user-data-info">
                                <p><b>Current Name:</b> {data.name}</p>
                                <p><b>Current Email:</b> {data.email}</p>
                                <button onClick={() => setCurrState("Edit")}>Edit Profile</button>
                                <button className='delete-btn' onClick={()=>deleteAccount(data._id)}>Delete Account</button>
                            </div>
                        :   <form className="user-data-edit" onSubmit={onSubmitHandler}>
                                <div className="add-name flex-col">
                                    <p>Name</p>
                                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter name' required />
                                </div>
                                <div className="add-email flex-col">
                                    <p>Email</p>
                                    <input onChange={onChangeHandler} value={data.email} type="text" name='email' placeholder='Enter email' required />
                                </div>
                                <div className="add-pass flex-col">
                                    <p>Password</p>
                                    <input onChange={onChangeHandler} value={''} type="password" name='password' placeholder='Enter password' />
                                </div>
                                <>
                                    <button className='delete-btn' onClick={() => setCurrState("View")}>Cancel</button>
                                    <button type="submit" className='save-btn'>Save</button>
                                </>
                            </form>
                }
            </div>
        </div>
    )
}
export default MyProfile
