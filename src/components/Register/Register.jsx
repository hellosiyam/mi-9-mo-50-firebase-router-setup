import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';


const Register = () => {

    const [errorMassage, setErrorMassage] = useState('')
    const [successMassage, setSuccessMassage] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handelRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email, password);
        setErrorMassage('')
        setSuccessMassage(false)

        if (!terms) {
            setErrorMassage('Pleas Accept Our Terms & Conditions')
            return;
        }

        if (password.length <6) {
            setErrorMassage('Password Should be more then 6 character')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user.email);
                setSuccessMassage(true)

            })
            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMassage('Email-already-in-use')
            })
    }
    return (
        <div className='max-w-lg mx-auto'>
            <h2 className='text-4xl my-8 text-center'>Register Page</h2>
            <form onSubmit={handelRegister} className='flex flex-col gap-4'>
                <div>
                    <label
                        className="input validator w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                        <input type="email" name='email' placeholder="mail@site.com" required />
                    </label>
                </div>
                <div className='relative'>
                    <label
                        className="input validator w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                        <input type={showPassword ? "text" : "password"}
                            name='password' required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                    </label>
                    <button className='text-lg absolute right-4 top-2.5 cursor-pointer'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {
                            showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                        }
                    </button>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" name='terms' className="checkbox" />
                        <span className="label-text">Accept Our Terms And Condition.</span>
                    </label>
                </div>
                <button className="btn w-full btn-accent">Register</button>
            </form>
            {
                errorMassage && <p className='text-center text-lg text-red-600 my-2'>{errorMassage}</p>
            }
            {
                successMassage && <p className='text-center text-lg text-green-600 my-2'>Register Successfully</p>
            }
        </div>
    );
};

export default Register;