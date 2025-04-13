import axios from "axios";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router";
import { toast } from "react-toastify";
import UserModel from "../model/userModel";
import signupValidation from "./SignupValidation";
import loginValidation from "./LoginValidation";

function SignupPage() {
    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmpass: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const err = signupValidation(values);
        setErrors(err);
        if (err.name === "" && err.username === "" && err.email === "" && err.password === "" && err.confirmpass === "") {
            axios.post("http://localhost:8000/signup", values)
                .then( res => {
                    navigate("/login");
                    }
                )
                .catch((err) => console.log(err));
        }
    };
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center'>Sign Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Full Name</strong></label>
                        <input type="text" className='form-control rounded-0' name="name"
                               onChange={handleInput} placeholder='Enter your full name' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input type="text" className='form-control rounded-0' name="username"
                               onChange={handleInput} placeholder='Enter your username' />
                        {errors.username && <span className='text-danger'>{errors.username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" className='form-control rounded-0' name="email"
                               onChange={handleInput} placeholder='Enter your email' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" className='form-control rounded-0' name="password"
                               onChange={handleInput} placeholder='Enter your password' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="confirmpass"><strong>Confirm Password</strong></label>
                        <input type="password" className='form-control rounded-0' name="confirmpass"
                               onChange={handleInput} placeholder='Confirm your password' />
                        {errors.confirmpass && <span className='text-danger'>{errors.confirmpass}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0'>Sign Up</button>
                    <p>By creating an account, you agree to our Terms and Conditions.</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Already have an account?</Link>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;


// const SignUp = () => {
//     const [formValues, setFormValues] = useState(new UserModel({}));
//
//     const [formErrors, setFormErrors] = useState({});
//
//     const validateForm = () => {
//         const errors = {};
//
//         if (!formValues.username) {
//             errors.username = "Username is required";
//         } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
//             errors.username =
//                 "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.';";
//         }
//
//         if(!formValues.email){
//             errors.email="Email is required"
//         }else if(!/\S+@\S+\.\S+/.test(formValues.email)){
//             errors.email="Please enter a valid email address"
//         }
//         if (!formValues.full_name) {
//             errors.full_name = 'Full name is required';
//         } else if (!/^[A-Za-z ]+$/.test(formValues.full_name)) {
//             errors.full_name = 'Please enter a valid full name';
//         }
//
//         if (!formValues.password) {
//             errors.password = 'Password is required';
//         }
//         return errors;
//
//     };
//
//
//     const handleSubmit=async (e)=>{
//         e.preventDefault();
//         console.log(formValues);
//
//         const errors=validateForm();
//         console.log(errors);
//         if(Object.keys(errors).length===0){
//             // alert("Form submitted")
//         }else{
//             // alert("Form Submission Failed");
//             setFormErrors(errors);
//         }
//         try {
//             const response = await axios.post("http://localhost:8000/api/auth/register-user", formValues);
//             console.log(response, 'res');
//
//             if (response.data.success) {
//                 toast.success(response.data.message || 'Registration successful!');
//                 setFormValues({username:"",email:"",full_name:"",password:""});
//                 setFormErrors("");
//             } else {
//                 toast.error(response.data.message || 'Registration failed!');
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//             toast.error("Something went wrong. Please try again later.");
//         }
//     }
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({ ...formValues, [name]: value });
//
//     };
//     return (
//         <div className="login-container">
//             <h2>Sign Up</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         placeholder="Enter your username"
//                         name="username"
//                         value={formValues.username}
//                         onChange={handleInputChange}
//
//                     />
//                     {formErrors.username ? <span className="error-message">{formErrors.username}</span> : ''}
//                 </div>
//                 <div className="form-group">
//                     <label>Full Name</label>
//                     <input
//                         type="text"
//                         name="full_name"
//                         placeholder="Enter your full name"
//                         value={formValues.full_name}
//                         onChange={handleInputChange}
//                     />
//                     {formErrors.full_name ? <span className="error-message">{formErrors.full_name}</span> : ''}
//                 </div>
//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter your email"
//                         value={formValues.email}
//                         onChange={handleInputChange}
//                     />
//                     {formErrors.email ? <span className="error-message">{formErrors.email}</span> : ''}
//                 </div>
//                 <div className="form-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Enter your password"
//                         value={formValues.password}
//                         onChange={handleInputChange}
//                     />
//                     {formErrors.password ? <span className="error-message">{formErrors.password}</span> : ''}
//                 </div>
//                 <button type="submit" className="login-btn">
//                     Sign Up
//                 </button>
//             </form>
//             <p style={{textAlign: "center"}}>
//                 Already have an account?{" "}
//                 <Link
//                     to="/login"
//                     className="toggle-link"
//                     style={{color: "#007BFF", textDecoration: "underline"}}
//                 >
//                     Login
//                 </Link>
//             </p>
//         </div>
//     );
// };
//
// export default SignUp;