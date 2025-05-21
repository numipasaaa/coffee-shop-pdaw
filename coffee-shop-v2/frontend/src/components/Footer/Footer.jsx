import React from 'react'
import './Footer.css'
import {assets} from "../../assets/assets.js";

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt=""/>
                    <p>Lorem Ipsum is simply dummy tezt of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt=""/>
                        <img src={assets.twitter_icon} alt=""/>
                        <img src={assets.linkedin_icon} alt=""/>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1 234 567 890</li>
                        <li>contact@icoffee.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                © 2025 iCoffee. All rights reserved. | Design by <a href="https://www.linkedin.com/in/nikhil-kumar-1b0a1b1b4/" target="_blank" rel="noopener noreferrer">Petra Simandan</a>
            </p>
        </div>
    )
}
export default Footer
