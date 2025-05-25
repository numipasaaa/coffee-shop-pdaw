import React from 'react'
import './Users.css'
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Users = ({url}) => {
    const [list, setList] = React.useState([])
    const navigate = useNavigate();

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/user/list`);
        console.log(response.data);

        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error fetching data");
        }
    }

    const removeUser = async (userId) => {
        const response = await axios.post(`${url}/api/user/remove/`, {id : userId});

        await fetchList();

        if (response.data.success) {
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    }

    React.useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className="list add flex-col">
            <p>All Users</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Id</b>
                    <b>Name</b>
                    <b>Email</b>
                    <b>Password</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div className="list-table-format" key={index}>
                            <p>{item._id}</p>
                            <p>{item.name}</p>
                            <p>{item.email}</p>
                            <p>${item.password}</p>
                            <button onClick={()=> navigate(`/update?userId=${item._id}`)} className="edit-btn">Edit</button>
                            <button onClick={()=>removeUser(item._id)} className="delete-btn">Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Users
