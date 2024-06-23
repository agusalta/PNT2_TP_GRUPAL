"use client"
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { UserContext } from '@/app/context/UserContext';

function SignUpForm() {
    const { handleRegister } = useContext(UserContext);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        profilePhoto: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};

        if (!formData.username || formData.username.length < 3) {
            errors.username = "Username must be at least 3 characters long.";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!formData.password || formData.password.length < 6 || !/\d/.test(formData.password)) {
            errors.password = "Password must be at least 6 characters long and include at least one number.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try{
                await handleRegister(formData);
                setSuccessMessage('Sign up successful!');
            }
            catch(error){
                seterrorMessage(error.message);
            }
            console.log("Form submitted", formData);
        }
    };

    return (
        <section className="bg-customWhite">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center mt-6">
                        <a href="#" className="w-1/3 pb-4 text-2xl text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400">
                            Sign Up
                        </a>
                    </div>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Username"
                        />
                    </div>
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                    <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>

                        <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                        <input type="file" id="dropzone-file" className="hidden" onChange={handleChange}
                            name="profilePhoto" />
                    </label>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Email address"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input
                            type="password"
                            name="password"
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                    {successMessage && (
                        <div className="p-4 my-5 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="p-4 my-5 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                        {errorMessage}
                    </div>
                    )}

                    <div className="mt-6">
                        <button
                            type='submit'
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Sign Up
                        </button>

                        <div className="flex items-center justify-around gap-2 mt-6 text-center">
                            <Link href={"/users/login"} className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                Already have an account?
                            </Link>
                            <Link href={"/"} className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                Go Back
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SignUpForm;
