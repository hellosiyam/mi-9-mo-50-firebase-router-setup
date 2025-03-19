
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const Signup = () => {

    const [errorMassage, setErrorMassage] = useState('')
    const [successMassage, setSuccessMassage] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handelSignup = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked
        console.log(email, password, terms);
        setErrorMassage('');
        setSuccessMassage(false)

        if (!terms) {
            setErrorMassage('Pleas Accept Our Terms & Conditions');
            return;
        }

        if (password.length < 6) {
            setErrorMassage('Password Should be more then 6 character');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password,)
            .then((result) => {
                console.log(result.user);
                setSuccessMassage(true)
            })
            .catch(error => {
                console.log('ERROR', error);
                setErrorMassage('This Email Already Use')
            })

    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
            <h2 className='text-3xl font-medium mx-4 text-center'>Sign up Form</h2>
            <form className="card-body" onSubmit={handelSignup}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text my-2">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text my-2">Password</span>
                    </label>
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />
                    <button onClick={() => setShowPassword(!showPassword)} className='absolute right-6 top-12 text-lg'>
                        {
                            showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover mt-4">Forgot password?</a>
                    </label>
                    <div className="form-control mt-4">
                        <label className="label cursor-pointer">
                            <input type="checkbox" name='terms' className="checkbox" />
                            <span className="label-text">Accept Our Terms And Condition.</span>
                        </label>
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary w-full">Login</button>
                </div>
                {
                    errorMassage && <p className='text-red-600 text-center'>{errorMassage}</p>
                }
                {
                    successMassage && <p className='text-green-600 text-center'>Sign Up Successfully</p>
                }
            </form>
        </div>
    );
};

export default Signup;