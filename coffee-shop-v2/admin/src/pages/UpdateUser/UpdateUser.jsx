import React, {useEffect, useState} from 'react';
import './UpdateUser.css';
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const UpdateUser = ({url}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const userId = searchParams.get("userId");

    const fetchData = async (itemId) => {
        const response = await axios.post(url + '/api/user/fetch', {userId})
        setData(response.data.data);
    }

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId])

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

        const response = await axios.post(`${url}/api/user/edit`, {data});

        if (response.data.success) {
            toast.success(response.data.message);
            navigate("/users");
        }
        else {
            toast.error(response.data.message);
        }
    }


    return (
        <div className="user-data">
            <h2>Edit Profile</h2>
            <div className="container">
                <form className="user-data-edit" onSubmit={onSubmitHandler}>
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
                        <button className='delete-btn' onClick={() => navigate("/users")}>Cancel</button>
                        <button type="submit" className='save-btn'>Save</button>
                    </>
                </form>
            </div>
        </div>
    )
}
export default UpdateUser
