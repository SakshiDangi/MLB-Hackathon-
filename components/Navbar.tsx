import { useState } from 'react';
import { FaHome, FaRegFileVideo, FaUserAlt } from 'react-icons/fa';
import { IoIosChatboxes } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import Link from 'next/link';



const SideNavbar = () => {
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (icon: string) => {
    if (active === icon) {
      setActive(null);
    } else {
      setActive(icon);
    }
  };

  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 bg-opacity-60 bg-gray-300 backdrop-blur-xl ml-6 rounded-full shadow-lg space-y-2">
      <div
        onClick={() => handleClick('home')}
        className={`cursor-pointer px-4 py-7 rounded-[2rem] transition-all ${active === 'home' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}
      >  
        <Link href="/dashboard" className="text-gray-700 hover:underline">
        <FaHome size={24} />
        </Link>
      </div>
      <div
        onClick={() => handleClick('phone')}
        className={`cursor-pointer px-4 py-7 rounded-[2rem] transition-all ${active === 'phone' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}
      >
        <Link href="/chat" className="text-gray-700 hover:underline">
        <IoIosChatboxes size={24} />
        </Link>
      </div>
      <div
        onClick={() => handleClick('about')}
        className={`cursor-pointer px-4 py-7 rounded-[2rem] transition-all ${active === 'about' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}
      >
        <Link href="/videos" className="text-gray-700 hover:underline">
        <FaRegFileVideo size={24} />
        </Link>
      </div>
      <div
        onClick={() => handleClick('settings')}
        className={`cursor-pointer px-4 py-7 rounded-[2rem] transition-all ${active === 'settings' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}
      >
        <Link href="/profile" className="text-gray-700 hover:underline">
        <FaUserAlt size={24} />
        </Link>
      </div>
      <div
        onClick={() => handleClick('work')}
        className={`cursor-pointer px-4 py-7 rounded-[2rem] transition-all ${active === 'work' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}
      >
        <Link href="/settings" className="text-gray-700 hover:underline">
        <IoSettingsSharp size={24} />
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;