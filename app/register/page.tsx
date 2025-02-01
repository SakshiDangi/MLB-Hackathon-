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
    const [gender, setGender] = useState("");
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
                    gender,
                    email
                })
            );

            setMessage(
                "Congratulations! You are successfully registered. Please check your email for verification."
            );

            // clear form feilds
            setFirstName("");
            setLastName("");
            setGender("");
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
        <div className="bg-gradient-to-b from-gray-600 to-black justify-center items-center h-screen w-screen flex flex-col h-screen relative">
            <h2 className="text-2xl font-bold text-center mb-10">SignUp</h2>
            <div className="p-5 border border-gray-300 rounded">
                <form onSubmit={handleRegister} className="space-y-6 px-6 pb-4">
                    <div className="flex space-x-4">
                        <div>
                        <label
                          htmlFor="firstName"
                          className="text-sm font-medium block mb-2 text-gray-300"
                        >
                            First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                          />
                        </div>

                        <div>
                        <label
                          htmlFor="lastName"
                          className="text-sm font-medium block mb-2 text-gray-300"
                        >
                            Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                          />
                        </div>
                    </div>
                    
                    <div>
                        <label
                          htmlFor="gender"
                          className="text-sm font-medium block mb-2 text-gray-300"
                        >
                            Gender
                        </label>
                        <select
                          id="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label
                          htmlFor="email"
                          className="text-sm font-medium block mb-2 text-gray-300"
                        >
                            Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        />
                    </div>
                    <div className="flex space-x-4">
                      <div>
                        <label
                          htmlFor="password"
                          className="text-sm font-medium block mb-2 text-gray-300"
                        >
                            Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium block mb-2 text-gray-300"
                        >
                            Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        />
                      </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                    <p className="text-sm font-medium text-gray-300 flex justify-center gap-2 pb-4">
                      Already have an account?{" "}
                      <Link href="/login" className="text-blue-700 hover:underline">
                         Login Here
                      </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;