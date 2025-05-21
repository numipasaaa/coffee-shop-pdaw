import React from 'react'
import './Navbar.css'
import {assets} from "../../assets/assets.js";
import {Link} from "react-router-dom";
import {StoreContext} from "../../context/StoreContext.jsx";

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = React.useState("home");

    const {getTotalCartAmount} = React.useContext(StoreContext);

    return (
        <div className="navbar">
            <Link to='/'><img src={assets.logo} className="logo" alt="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
                <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
                <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
                <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} className="search" alt="search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} className="basket" alt="basket" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                <button onClick={()=>setShowLogin(true)}>Sign in</button>
            </div>
        </div>
    )
}
export default Navbar
