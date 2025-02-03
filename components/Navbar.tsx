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
        <Link href="/dashboard">
        <FaHome size={24} />
        </Link>
      </div>
      <div
        onClick={() => handleClick('chat')}
        className={`cursor-pointer px-4 py-7 rounded-[2rem] transition-all ${active === 'chat' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}
      >
        <Link href="/chat">
        <IoIosChatboxes size={24} />
        </Link>
      </div>
      <div
        onClick={() => handleClick('video')}
        className={`cursor-pointer px-4 py-7 rounded-[2rem] transition-all ${active === 'video' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}
      >
        <Link href="/videos">
        <FaRegFileVideo size={24} />
        </Link>
      </div>
      <div
        onClick={() => handleClick('profile')}
        className={`cursor-pointer px-4 py-7 rounded-[2rem] transition-all ${active === 'profile' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}
      >
        <Link href="/profile">
        <FaUserAlt size={24} />
        </Link>
      </div>
      <div
        onClick={() => handleClick('settings')}
        className={`cursor-pointer px-4 py-7 rounded-[2rem] transition-all ${active === 'settings' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}
      >
        <Link href="/settings">
        <IoSettingsSharp size={24} />
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;