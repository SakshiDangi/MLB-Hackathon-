"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import Features from "@/components/Features";

const HomePage = () => {
  return (
    <div>
      <Features />
    </div>
  )
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState<User | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if(user) {
  //       if (user.emailVerified) {
  //         const userDoc = await getDoc(doc(firestore, "user", user.uid));
  //         if(!userDoc.exists()) {
  //           // Retrieve user data from local storage
  //           const registerationData = localStorage.getItem("registrationData");
  //           const {
  //             firstName = "",
  //             lastName = "",
  //             gender = "",
  //           } = registerationData ? JSON.parse(registerationData) : {};

  //           await setDoc(doc(firestore, "users", user.uid), {
  //             firstName,
  //             lastName,
  //             gender,
  //             email: user.email,
  //           });

  //           // clear registaration data from local storage
  //           localStorage.removeItem("registrationData");
  //         }
  //         setUser(user);
  //         router.push("/dashboard");
  //       } else {
  //         setUser(null);
  //         router.push("/login");
  //       }
  //     } else {
  //       setUser(null);
  //       router.push("/");
  //     }
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, [router]);

  // if(loading) {
  //   return <p>Loading....</p>
  // }
  // return(
  //   <div>
  //     <Features />
  //     {/* {user ? "Redirecting to dashboard..." : "Redirecting to Login..."} */}
  //   </div>
  // );
};

export default HomePage;