import React from 'react';
import Image from 'next/image';

interface NavbarProps {
  userName?: string;
  userStatus?: string;
  notificationCount?: number;
  profileImage?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  userName = "Sai Karthik",
  userStatus = "Team",
  notificationCount = 5,
  profileImage = "/pfp.png"
}) => {
  return (
    <nav className="w-full px-6 py-4">
      <div className="bg-zinc-800 rounded-3xl flex items-center justify-between overflow-hidden">
        {/* Profile Section */}
        <div className="flex items-center">
          <div className="relative">
            <Image
              src={profileImage}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-3xl object-cover"
            />
          </div>
          <div className="flex flex-col px-4">
            <h2 className="text-[#FDFEFF] font-medium text-lg leading-tight">
              {userName}
            </h2>
            <p className="text-[#9CA3AF] text-sm">
              {userStatus}
            </p>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="flex items-center pr-6">
          <div className="relative">
            <button className="p-2 text-[#9CA3AF] hover:text-[#FDFEFF] transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-[#C9F56A] text-[#12121B] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                {notificationCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
