
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';

const Signup = () => {

    const [errorMassage, setErrorMassage] = useState('')
    const [successMassage, setSuccessMassage] = useState(false)
    const handelSignup = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setErrorMassage('');
        setSuccessMassage(false)

        if (password.length < 6) {
            setErrorMassage('Password Should be more then 6 character')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setSuccessMassage(true)
            })
            .catch(error => {
                console.log('ERROR', error);
                setErrorMassage(error.message)
            })

    }

    return (
        <div className='max-w-5xl mx-auto text-center'>
            <h2 className='text-3xl font-medium mx-4'>Sign in Form</h2>
            <div className='max-w-5xl mx-auto my-5'>
                <div className="card w-full max-w-sm shrink-0 shadow-2xl mx-auto">
                    <form onSubmit={handelSignup} className="card-body">
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" required/>
                            <label className="fieldset-label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" required/>
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                        {
                            errorMassage && <p className='text-red-600'>{errorMassage}</p>
                        }
                        {
                            successMassage && <p className='text-green-600'>Sign Up Successfully</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;