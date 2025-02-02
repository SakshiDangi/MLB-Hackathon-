"use client"
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (password !== confirmPassword) {
            setError("Password is incorrect");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await sendEmailVerification(user);

            //local storage: storing data in local storage temporarily
            localStorage.setItem(
                "registerationData",
                JSON.stringify({
                    firstName,
                    lastName,
                    email
                })
            );

            setMessage(
                "Congratulations! You are successfully registered. Please check your email for verification."
            );

            // clear form feilds
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="justify-center items-center h-screen w-screen flex flex-col h-screen relative">
            <h2 className="text-6xl font-bold text-center pb-6">BASEBALL ANALYTICS</h2>
            <div className="bg-white p-5 border border-gray-300 rounded-xl">
                <form onSubmit={handleRegister} className="space-y-6 px-6 pb-3">
                    <div className="flex space-x-4">
                        <div>
                        <label
                          htmlFor="firstName"
                          className="text-sm font-medium block mb-2 text-black"
                        >
                            First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-white border-gray-300 placeholder-gray-400 text-black"
                          />
                        </div>

                        <div>
                        <label
                          htmlFor="lastName"
                          className="text-sm font-medium block mb-2 text-black"
                        >
                            Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-white border-gray-300 placeholder-gray-400 text-black"
                          />
                        </div>
                    </div>
                    <div>
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
                    <div className="flex space-x-4">
                      <div>
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
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium block mb-2 text-black"
                        >
                            Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 bg-white border-gray-300 placeholder-gray-400 text-black"
                        />
                      </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Sign Up
                    </button>
                    <p className="text-sm font-medium flex justify-center gap-1 text-gray-400 space-y-6 px-6 pb-4">
                      Already have an account?{" "}
                      <Link href="/login" className="text-gray-700 hover:underline">
                         Login Here
                      </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;