"use client";
import React, { useState } from "react";
import {useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            if (user.emailVerified) {
                // Retrieve user data form local storage
                const registerationData = localStorage.getItem("registrationData");
                const {
                    firstName = "",
                    lastName = "",
                    gender = "",
                } = registerationData ? JSON.parse(registerationData) : {};

                //check if user data exists in Firestore
                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if (!userDoc.exists()) {
                    // save user data to firestore after email verification
                    await setDoc(doc(firestore, "users", user.uid),{
                        firstName,
                        lastName,
                        gender,
                        email: user.email,
                    });
                }
                router.push("/dashboard");
            } else {
                setError("Please verify your email before Logging in.");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unknown error occured");
            }
        }
    };

    return (
        <div className="justify-center items-center h-screen w-screen flex flex-col h-screen relative">
        <h2 className="text-6xl font-bold text-center">BASEBALL</h2>
        <h2 className="text-6xl font-bold text-center mb-6">ANALYTICS</h2>
        <div className="bg-white p-5 border border-gray-300 rounded">
            <form onSubmit={handleLogin} className="space-y-6 px-6 pb-4">
                <div className="mb-15">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium block mb-2 text-black"
                    >
                        Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-2 outline-none sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-white border-gray-300 placeholder-gray-400 text-black"
                    />
                </div>

                  <div className="mb-15">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium block mb-2 text-black"
                    >
                        Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-2 outline-none sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-white border-gray-300 placeholder-gray-400 text-black"
                    />
                  </div>                
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Sign In
                </button>
            </form>

            <p className="text-sm font-medium text-gray-400 space-y-6 px-6 pb-4">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-gray-700 hover:underline">
                  Register Here
                </Link>
            </p>
        </div>
    </div>
    );
};

export default LoginPage;