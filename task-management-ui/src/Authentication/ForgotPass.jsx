import React, { useContext, useState } from 'react';
import auth from '../../firebase.config';
import { AuthContext } from './AuthProvider/AuthProvider';


const ForgotPass = () => {
    const {passReset} = useContext(AuthContext)

    const handleForgot = (e) =>{
        e.preventDefault()
        const mail = e.target.mail.value
        console.log(mail)
        passReset(mail)
        .then(res =>console.log(res))
        .catch((error) => {
            console.log(error)
          });
    }
    return (
        <div className={"text-black light-home max-w-xl rounded-3xl mx-auto my-20 py-10 px-5 lg:p-20 border-2 border-black"}>
            <h1 className="text-3xl text-center mb-10 lg:text-5xl font-bold ">Your Email </h1>
            <form onSubmit={(e)=>handleForgot(e)} className="bg-white">
                        <div className="form-control">
                        <label className="label">
                            <span className=" label-text text-black">Email</span>
                        </label>
                        <input name='mail'  type="email"  placeholder="email" className="input input-bordered border-[#0d3454] text-[#0d3454]" required />
                        </div>

                        <div className="form-control mt-4">
                        <button className="btn  bg-white text-black font-bold border-black hover:shadow-white hover:bg-[#000000] hover:text-white   ">Send password reset mail</button>
                        </div>
            </form>
        </div>
    );
};

export default ForgotPass;