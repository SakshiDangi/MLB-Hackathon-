"use client"
import SideNavbar from '@/components/Navbar'
import Header from '@/components/Header'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, firestore } from '@/firebase/firebase'
import type { User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [user, setUser] = useState<User |null>(null);
  const [userName, setUserName] = useState<String | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "user", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(`${userData.firstName} ${userData.lastName}`);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });
    // subscription on unmount cleanup
    return () => unsubscribe(); 
  }, [router]);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleChangePassword = () => {
    router.push("/passwordchange");
  };

  if(loading) {
    return <p>Loading...</p>
  }
  return (
    <div className='bg-[url(./../public/bg.png)] bg-cover h-[100vh]'>
      <Header />
      <SideNavbar />
      <main className='flex flex-col items-center justify-center flex-grow ml-[20vw] mt-16 w-[40vw] h-[30vh] bg-gray-400 rounded-xl'>
        {userName && (
          <h1 className='text-4xl font-bold mb-6 ml-10'>
            Welcome, {userName}!
          </h1>
        )}
        <div className='space-x-6'>
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-red-600 font-bold text-white rounded-xl hover:bg-red-700'
          >
            Logout
          </button>
          <button
            onClick={handleChangePassword}
            className='px-4 py-2 bg-blue-600 font-bold text-white rounded-xl hover:bg-blue-700'
          >
            Change Password
          </button>
        </div>
      </main>
    </div>
  )
}

export default Page;
