import {sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Login = () => {

    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef()

    const handelLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value
        const remember = e.target.remember.checked
        setSuccessMessage(false)
        setErrorMessage('')

        if (!remember) {
            setErrorMessage('You forget to set Remember')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);

                if (!result.user.emailVerified) {
                   setErrorMessage('Please Verified Your email, Check your Email') 
                }
                else{
                    setSuccessMessage(true)
                } 

            })
            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message)

            })   
    }

    const handelForgatPass = ()=> {
        const email = emailRef.current.value
        console.log("forgat", emailRef.current.value);
        if (!email) {
            alert('Please Try with a verified email'); 
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(()=> {
                alert('Password reset email sent!');
            })
        }
        
    }
    

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handelLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text my-4">Email</span>
                            </label>
                            <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative ">
                            <label className="label">
                                <span className="label-text my-4">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : "password"} name='password' placeholder="password" className="input input-bordered" required />
                            <button onClick={() => setShowPassword(!showPassword)} type='button' className='text-base absolute right-6 top-16'>
                                {
                                    showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                }
                            </button>
                            <label className="label my-4">
                                <a onClick={handelForgatPass} className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input name='remember' type="checkbox" className="checkbox checkbox-primary" />
                                    <span className="text-base">Remember me</span>
                                </label>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Login</button>
                        </div>
                        <p className='my-3 text-center'>New to This Website? <Link to='/signup'><span className='underline font-medium text-blue-600'>PLEASE SIGN UP</span></Link></p>
                        {
                            successMessage && <p className='text-green-600 text-center'>Log in Successfully</p>
                        }
                        {
                            errorMessage && <p className='text-red-600 text-center'>{errorMessage}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;