import React, {useContext, useEffect, useState} from 'react'
import './MyOrders.css'
import {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios";
import {assets} from "../../assets/assets.js";
import {useNavigate} from "react-router-dom";

const MyOrders = () => {
    const [data, setData] = useState([]);
    const {url, token} = useContext(StoreContext);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {token});
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {
                    data.length > 0
                        ?   data.map((order, index) => {
                                return (
                                    <div key={index} className="my-orders-order">
                                        <img src={assets.parcel_icon} alt=""/>
                                        <p>
                                            {
                                                order.items.map((item, index) => {
                                                    if (index === order.items.length - 1) {
                                                        return item.name + " x " + item.quantity;
                                                    }
                                                    else {
                                                        return item.name + " x " + item.quantity + ", ";
                                                    }
                                                })
                                            }
                                        </p>
                                        <p>${order.amount}</p>
                                        <p>Items: {order.items.length}</p>
                                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                        <button onClick={fetchOrders}>Track Order</button>
                                    </div>
                                )
                            })
                        :   <div className="my-orders-no-order">
                                <p>Looks like you don't have any active orders at the moment.</p>
                                <button onClick={()=>navigate('/')}>CONTINUE SHOPPING</button>
                            </div>
                }
            </div>
        </div>
    )
}
export default MyOrders
