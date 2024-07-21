"use client"

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPasswordConfirmPage: React.FC = () => {
    const router = useRouter();
    const Params = useParams<{uidb64: string; token: string}>();
    const uidb64 = Params.uidb64;
    const token = Params.token;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    console.log(uidb64, " ", token);

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleOpenPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = document.getElementById('new-password') as HTMLInputElement;
        if (e.target.checked) {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setAuthError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`${baseurl}/accounts/reset-password/${uidb64}/${token}/`, {
                new_password: newPassword,
            });
            Swal.fire({
                title: "Password Reset",
                text: response.data.detail,
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
            router.push('/login');
        } catch (error) {
            console.log(error?.response?.data);
            if (error) {
                setAuthError('An error occurred');
            }
        }
    };

    return (
        <section className="text-gray-600 body-font bg-gray-800 min-h-screen flex items-center justify-center">
            <div className="container px-5 py-24 mx-auto">
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-black p-8 rounded-lg shadow-md mx-auto">
                    <div className="relative flex-grow w-full mb-4">
                    <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Enter New Password</h1>
                </div>
                        <label htmlFor="new-password" className="leading-7 text-sm text-gray-400">New Password</label>
                        <input
                            type="password"
                            id="new-password"
                            name="new-password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            className="w-full bg-gray-900 bg-opacity-50 rounded border border-gray-700 focus:border-blued-500 focus:bg-transparent focus:ring-2 focus:ring-blued-200 text-base outline-none text-white py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative flex-grow w-full mb-4">
                        <input onChange={handleOpenPassword} type='checkbox' className="mr-2" /> 
                        <label className="text-gray-400">Show Password</label>
                    </div>
                    <div className="relative flex-grow w-full mb-4">
                        <label htmlFor="confirm-password" className="leading-7 text-sm text-gray-400">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="w-full bg-gray-900 bg-opacity-50 rounded border border-gray-700 focus:border-blued-500 focus:bg-transparent focus:ring-2 focus:ring-blued-200 text-base outline-none text-white py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <button type="submit" className="w-full text-white bg-blued border-0 py-3 px-8 focus:outline-none hover:bg-blued-600 rounded text-lg">Reset Password</button>
                </form>
                {authError && (
                    <div className="flex justify-center mt-4">
                        <p className="text-red-500 text-sm">{authError}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ResetPasswordConfirmPage;
