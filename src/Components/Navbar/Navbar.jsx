import React, { useState } from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { AppName } from '../../apiList';
const LogoSection = () => (
    <div className="flex items-center space-x-3">
        <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            {AppName[0]}
        </div>
        <span className="text-lg font-bold text-blue-900">{AppName}</span>
    </div>
);
const NavLink = ({ icon, text, color, dropdown }) => (
    <div className="flex items-center space-x-1">
        {icon}
        <span className={`text-${color}-600 hover:text-${color}-800 cursor-pointer`}>
            {text}
        </span>
        {dropdown && <FaChevronDown className="text-xs" />}
    </div>
);
const NavigationLinks = () => (
    <div className="flex space-x-8">
        {/* <NavLink
            icon={<FaChevronDown className="text-red-600" />}
            text="General Feedback"
            color="red"
            dropdown
        />
        <NavLink
            icon={<FaBook className="text-gray-600" />}
            text="Roadmap"
            color="gray"
        />
        <NavLink
            icon={<FaSyncAlt className="text-gray-600" />}
            text="Changelog"
            color="gray"
        /> */}
    </div>
);
const SearchAndProfile = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const userName=localStorage.getItem('name')
    return (
        <div className="flex items-center space-x-6 relative">
            <FaSearch className="text-gray-600 cursor-pointer" />
            <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {userName&&(  <div className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:shadow-md">
                    {userName[0]}
                </div>)}
                {/* <FaChevronDown className="text-xs" />
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                        <ul>
                            <li className="px-4 py-2 hover:bg-gray-100">Profile</li>
                            <li className="px-4 py-2 hover:bg-gray-100">Settings</li>
                            <li className="px-4 py-2 hover:bg-gray-100">Logout</li>
                        </ul>
                    </div>
                )} */}
            </div>
        </div>
    );
};
const NavBar = () => {
    return (
        <>
            <div className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                    <LogoSection />
                    <NavigationLinks />
                    <SearchAndProfile />
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default NavBar
