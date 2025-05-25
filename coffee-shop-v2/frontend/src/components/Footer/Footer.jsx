import React from 'react'
import './Footer.css'
import {assets} from "../../assets/assets.js";

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt=""/>
                    <p>Connect with PinCafe – your daily dose of exceptional coffee and delicious bites. Located at <a href="https://maps.app.goo.gl/hTftdd2zjqCfkHLHA" target="_blank" rel="noopener noreferrer">Lucian Blaga 14</a> in Timisoara, we're brewing happiness from 7 AM to 10 PM. Follow us on social media for updates, specials, and a peek behind the bar.<br/>PinCafe: Crafted with care, enjoyed with passion.</p>
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
                        <li><a href="mailto:contact@pincafe.com">contact@pincafe.com</a></li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                © 2025 PinCafe. All rights reserved. | Design by <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">Petra Simandan</a>
            </p>
        </div>
    )
}
export default Footer
