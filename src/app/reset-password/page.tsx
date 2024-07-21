"use client";

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
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
        setAuthError(''); // Clear previous errors
        try {
            const response = await axios.post(`${baseurl}/accounts/reset-password/`, {
                email,
            });
    
            if (response.data.detail) {
                Swal.fire({
                    title: "Password Reset Link",
                    text: response.data.detail,
                    icon: "success",
                    toast: true,
                    timer: 1000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "An unexpected error occurred. Please try again.",
                    icon: "error",
                    toast: true,
                    timer: 1000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    setAuthError('User with this email does not exist.');
                } else {
                    setAuthError('User with this email does not exist.');
                }
            } else {
                setAuthError('An unexpected error occurred.');
            }
        }
    };
    
    return (
        <section className="min-h-screen flex items-center justify-center" style={{ background: 'radial-gradient(at 10% 10%, rgb(24, 21, 25) 0%, rgb(32, 22, 41) 50%, rgb(32, 23, 42) 100%)' }}>
    <div className="bg-black bg-opacity-60 border border-gray-600 rounded-lg p-10 m-10 shadow-lg max-w-lg w-full relative" style={{ width: '40%', maxWidth: '900px', minHeight: '500px' }}>
        
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-6">Reset Password</h1>
            <p className="text-gray-300">Enter your registered email ID to receive a link to reset the password</p>
        </div>
        
        <div className="absolute bottom-40 left-0 right-0 px-10">
            <div className="flex flex-col">
                <label className="text-gray-300 mb-2" htmlFor="email">Email ID<font color="#ff0000">*</font></label>
                <input 
                    onChange={handleEmailChange} 
                    placeholder='Enter your email'
                    type="email" 
                    id="email" 
                    name="email" 
                    className="bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 mb-4 w-full"
                />
                
                <button 
                    onClick={handleSubmit} 
                    className="bg-blued text-white py-2 rounded-md w-full hover:bg-blued transition-colors"
                >
                    Send Link
                </button>
                <div className='pt-4'>
                {authError && (
                    <p className="text-red-500 text-sm mb-4">{authError}</p>
                )}
                </div>
            </div>
        </div>

        <div className="absolute bottom-14 left-0 right-0 text-center">
            <div
                className="bubble-element Text cpaKaOaE0"
                style={{
                    whiteSpace: "pre-wrap",
                    overflow: "visible",
                    fontFamily: "Space Grotesk",
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.6)",
                    lineHeight: 1.4,
                    borderRadius: 0,
                    opacity: 1,
                    alignSelf: "center",
                    minWidth: "16px",
                    order: 18,
                    minHeight: "10px",
                    height: "max-content",
                    flexGrow: 0,
                    flexShrink: 0,
                    width: "auto",
                    margin: "0px",
                    zIndex: 203,
                }}
            >
                Already have an account?{" "}
                <font color="#9457CF">
                    <Link href="/login">Login</Link>
                </font>
            </div>
        </div>
    </div>
</section>

    );
};

export default ResetPasswordPage;
