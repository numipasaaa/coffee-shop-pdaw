import React from 'react'
import './Cart.css'
import {StoreContext} from "../../context/StoreContext.jsx";
import {assets} from "../../assets/assets.js";
import {Link, useNavigate} from "react-router-dom";

const Cart = () => {
    const { cartItems, food_list, removeFromCart, addToCart, clearCart, getTotalCartAmount, url } = React.useContext(StoreContext);

    const navigate = useNavigate();

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt=""/>
                                    <p>{item.name}</p>
                                    <p>${item.price.toFixed(2)}</p>
                                    <div className="counter">
                                        <img src={assets.remove_icon_red} alt="" onClick={()=>removeFromCart(item._id)} />
                                        <p>{cartItems[item._id]}</p>
                                        <img src={assets.add_icon_green} alt="" onClick={()=>addToCart(item._id)} />
                                    </div>
                                    <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                                    <p className='remove' onClick={()=>clearCart(item._id)}>x</p>
                                </div>
                                <hr/>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                {
                    getTotalCartAmount() > 0
                        ?  <div className="cart-total">
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
                                <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
                            </div>

                        :   <div className="cart-total">
                                    <h2>Your cart is empty</h2>
                                    <p>Looks like you haven't added anything to your cart yet.</p>
                                    <button onClick={()=>navigate('/')}>CONTINUE SHOPPING</button>
                            </div>
                }
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="Promo code"/>
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart
