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
            router.push('/Login');
        } catch (error) {
            console.log(error?.response?.data);
            if (error) {
                setAuthError('An error occurred');
            }
        }
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Enter New Password</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                    <div className="relative flex-grow w-full">
                        <label htmlFor="new-password" className="leading-7 text-sm text-gray-600">New Password</label>
                        <input
                            type="password"
                            id="new-password"
                            name="new-password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <input onChange={handleOpenPassword} type='checkbox' className="mt-2" /> Show Password
                    </div>
                    <div className="relative flex-grow w-full pb-7">
                        <label htmlFor="confirm-password" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <button type="submit" className="text-white bg-red-500 border-0 py-3 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Reset Password</button>
                </form>
            </div>
            {authError && (
                <div className="flex justify-center">
                    <p className="text-red-500 text-sm mb-4">{authError}</p>
                </div>
            )}
        </section>
    );
};

export default ResetPasswordConfirmPage;
