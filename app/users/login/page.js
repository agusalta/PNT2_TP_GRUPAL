"use client";
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/context/UserContext';

function SignInForm() {
    const { handleLogin } = useContext(UserContext);
    const [errorMessage, seterrorMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await handleLogin(formData.email, formData.password);

            if (res) {
                router.push('/');
            }

        } catch (error) {
            seterrorMessage(error.message);

            console.error('Error during login:', error);
        }
    };

    return (
        <section className="bg-customWhite">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl ">
                        Sign In
                    </h1>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Email address"
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Password"
                        />
                    </div>

                    {errorMessage && (
                        <div className="p-4 my-5 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                            {errorMessage}
                        </div>
                    )}

                    <div className="mt-6">
                        <button
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Sign in
                        </button>

                        <div className="flex items-center justify-around gap-2 mt-6 text-center">
                            <Link href={"/users/register"} className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                Don’t have an account yet? Sign up
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

export default SignInForm;
