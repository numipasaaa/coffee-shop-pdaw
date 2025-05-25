import React, {useEffect} from 'react'
import './PlaceOrder.css'
import {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PlaceOrder = () => {
    const { cartItems, food_list, removeFromCart, addToCart, clearCart, getTotalCartAmount, url, token } = React.useContext(StoreContext);

    const [data, setData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        county: "",
        zipCode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItems = [];

        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        }
        let response = await axios.post(url + "/api/order/place", {orderData, token})

        if (response.data.success) {
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Error");
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/cart");
        }
        else if (getTotalCartAmount() === 0) {
            navigate("/cart");
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" required />
                    <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" required />
                </div>
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" required />
                <input name='address' onChange={onChangeHandler} value={data.address} type="text" placeholder="Address" required />
                <div className="multi-fields">
                    <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
                    <input name='county' onChange={onChangeHandler} value={data.county} type="text" placeholder="County/Region" />
                </div>
                <div className="multi-fields">
                    <input name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder="Zip code" />
                    <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
                </div>
                <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone number"  required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount().toFixed(2)}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${(2).toFixed(2)}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>${(getTotalCartAmount() + 2).toFixed(2)}</p>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}
export default PlaceOrder
