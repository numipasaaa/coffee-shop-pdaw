import React from 'react'
import './Navbar.css'
import {assets} from "../../assets/assets.js";
import {Link, useNavigate} from "react-router-dom";
import {StoreContext} from "../../context/StoreContext.jsx";

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = React.useState("home");
    const navigate = useNavigate();

    const {getTotalCartAmount, token, setToken} = React.useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

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
                {
                    !token
                    ?   <button onClick={()=>setShowLogin(true)}>Sign in</button>
                    :   <div className="navbar-profile">
                            <img src={assets.profile_icon} className="profile" alt="profile" />
                            <ul className="nav-profile-dropdown">
                                <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon} alt=""/>Orders</li>
                                <hr/>
                                <li onClick={() => navigate("/myprofile")}><img src={assets.bag_icon} alt=""/>Profile</li>
                                <hr/>
                                <li onClick={logout}><img src={assets.logout_icon} alt=""/>Logout</li>
                            </ul>
                        </div>
                }

            </div>
        </div>
    )
}
export default Navbar
