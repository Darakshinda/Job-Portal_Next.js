"use client"

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const ResetPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [authError, setAuthError] = useState('');
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseurl}/accounts/reset-password/`, {
                email,
            });
            if(response.data.detail){
                Swal.fire({
                    title: "Password Reset Link",
                    text: response.data.detail,
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    title: "Password Reset Link",
                    text: response.data.email,
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Reset Password</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Please provide your registered email address to reset your password. </p>
                </div>
                <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                    <div className="relative flex-grow w-full">
                        <label className="leading-7 text-sm text-gray-600">Email</label>
                        <input onChange={handleEmailChange} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                    </div>
                    <button onClick={handleSubmit} className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Reset</button>
                </div>
            </div>
            {authError && (
                <p className="text-red-500 text-sm mb-4">{authError}</p>
            )}
        </section>
    );
};

export default ResetPasswordPage;