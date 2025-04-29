import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import '../../app/css/App.css';
import 'tailwindcss';

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
        <nav className="w-full bg-pink-400 text-white">
            {/* Top utility bar */}
            <div className="flex justify-between items-center px-6 py-2">
                <div className="flex gap-4">
                    <a href="/faqs" className="hover:underline">FAQs</a>
                    <span>|</span>
                    <a href="/help" className="hover:underline">Help</a>
                    <span>|</span>
                    <a href="/support" className="hover:underline">Support</a>
                </div>
                <div className="flex gap-4">
                    <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                    <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                    <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                    <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
                </div>
            </div>

            {/* Main navigation */}
            <div className="bg-white rounded-full mx-6 mb-4 px-8 py-4 flex justify-between items-center">
                <div className="flex gap-8 items-center">
                    <Link to="/" className="hover:text-pink-400">Home</Link>
                    <Link to="/" className="hover:text-pink-400">About</Link>
                    <Link to="/" className="hover:text-pink-400">Product</Link>
                </div>

                <div className="text-4xl font-bold">
                    <span className="text-blue-400">i</span>
                    <span className="text-pink-400">Coffee</span>
                </div>

                <div className="flex gap-8 items-center">
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