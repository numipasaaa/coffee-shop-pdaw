import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import '../../app/css/App.css';

import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export function Header() {
    const location = useLocation(); // Get the current location
    const [userData, setUserData] = useState(null);

    const navigate=useNavigate();

    useEffect(() => {
        setTimeout(()=>{
            getData();

        },200)



    }, [location]);

    const getData=async()=>{
        const data =await JSON.parse(sessionStorage.getItem('userData'));
        console.log('useeffct run');

        if (data && data.isLoggedIn) {
            setUserData(data.userData);
        }
    }

    const logout=()=>{
        sessionStorage.clear();
        setUserData('');
        navigate('/');

    }

    return (
        <nav className="icream-nav">
            {/* Top utility bar */}
            <div className="utility-bar">
                <div className="utility-links">
                    <a href="/faqs" className="hover:underline">FAQs</a>
                    <span>|</span>
                    <a href="/help" className="hover:underline">Help</a>
                    <span>|</span>
                    <a href="/support" className="hover:underline">Support</a>
                </div>
                <div className="social-icons">
                    <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                    <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                    <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                    <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
                </div>
            </div>

            {/* Main navigation */}
            <div className="main-nav">
                <div className="left-links">
                    <Link to="/" className="hover:text-pink-400">Home</Link>
                    <Link to="/" className="hover:text-pink-400">About</Link>
                    <Link to="/" className="hover:text-pink-400">Product</Link>
                </div>

                <div className="logo">
                    <span className="logo-i">i</span>
                    <span className="logo-cream">Coffee</span>
                </div>

                <div className="right-links">
                    <Link to="/" className="hover:text-pink-400">Contact</Link>
                    {userData ? (
                        <>
                            <li className="navbar-profile">
                                <Link to="/homeScreen" className="hover:text-pink-400" style={{display:'flex'}}>
                                    <span className="username">{userData.name}</span></Link>

                            </li>
                            <li>
                                <i className="fas fa-sign-out-alt logo-icon" style={{cursor:'pointer'}} onClick={logout}></i>

                            </li>
                        </>


                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="hover:text-pink-400">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup" className="hover:text-pink-400">Sign Up</Link>
                            </li>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}


// export function Header () {
//     const location = useLocation(); // Get the current location
//     const [userData, setUserData] = useState(null);
//
//     const navigate=useNavigate();
//
//     useEffect(() => {
//         setTimeout(()=>{
//             getData();
//
//         },200)
//
//
//
//     }, [location]);
//
//     const getData=async()=>{
//         const data =await JSON.parse(sessionStorage.getItem('userData'));
//         console.log('useeffct run');
//
//         if (data && data.isLoggedIn) {
//             setUserData(data.userData);
//         }
//     }
//
//     const logout=()=>{
//         sessionStorage.clear();
//         setUserData('');
//         navigate('/');
//
//     }
//     return (
//         <nav className="navbar">
//             <div className="navbar-logo">
//                 <i className="fas fa-briefcase logo-icon"></i> {/* Replace with a relevant icon */}
//                 <span className="logo-text">JobPortal</span>
//             </div>
//             <ul className="navbar-links">
//                 <li>
//                     <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
//                 </li>
//
//                 {/* Conditional Rendering based on user login status */}
//                 {userData ? (
//                     <>
//                         <li className="navbar-profile">
//                             <Link to="/homeScreen" className={location.pathname === '/homeScreen' ? 'active' : ''} style={{display:'flex'}}>
//                                 <img
//                                     src={require('./user.png')}
//                                     alt="Profile"
//                                     className="profile-photo-circle"
//                                 />
//                                 <span className="username">{userData.name}</span></Link>
//
//                         </li>
//                         <li>
//                             <i className="fas fa-sign-out-alt logo-icon" style={{cursor:'pointer'}} onClick={logout}></i>
//
//                         </li>
//                     </>
//
//
//                 ) : (
//                     <>
//                         <li>
//                             <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
//                         </li>
//                         <li>
//                             <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</Link>
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     );
// };