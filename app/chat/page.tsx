"use client"
import SideNavbar from '@/components/Navbar'
import Header from '@/components/Header'


export default function page() {
  return (
    <div className='bg-[url(./../public/bg.png)] bg-cover h-[100vh]'>
      <Header />
      <SideNavbar />
    </div>
  )
}
