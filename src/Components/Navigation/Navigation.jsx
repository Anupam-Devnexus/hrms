import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoHomeOutline, IoAnalyticsSharp, IoNotificationsCircle } from "react-icons/io5";
import { HiOutlineInboxIn } from "react-icons/hi";
import { BsWallet2 } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FaHandsHelping } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();

   const navItems = [
  { icon: <IoHomeOutline className="text-2xl" />, label: "Dashboard", path: "/" },
  { icon: <LuLayoutDashboard className="text-2xl" />, label: "Employee Management", path: "/employee-management" },
  { icon: <HiOutlineInboxIn className="text-2xl" />, label: "Attendance", path: "/attendance" },
  { icon: <BsWallet2 className="text-2xl" />, label: "Leave Management", path: "/leave-management" },
  { icon: <IoAnalyticsSharp className="text-2xl" />, label: "Payroll Management", path: "/payroll" },
  { icon: <IoNotificationsCircle className="text-2xl" />, label: "Recruitment", path: "/recruitment" },
  { icon: <CiSettings className="text-2xl" />, label: "Settings", path: "/settings" },
];


    const supportAndLogout = [
        { icon: <FaHandsHelping className="text-2xl" />, label: "Support", path: "/support" },
        { icon: <RiLogoutCircleLine className="text-2xl" />, label: "Logout", action: () => console.log("Logout clicked") },
    ];

    const handleItemClick = (item) => {
        if (item.path) {
            navigate(item.path);
        } else if (item.action) {
            item.action();
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="w-[20vw] h-[96vh] rounded-2xl bg-white shadow-lg flex flex-col justify-between p-2">

            {/* User Profile */}
            <div className="flex items-center gap-5">
                <img
                    src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
                    alt="Profile"
                    className="rounded-full sm:w-32 sm:h-28"
                />
                <div className="flex flex-col gap-2">

                <span className="font-bold text-gray-500 text-base sm:text-lg">Hello</span>
                <span className="text-sm text-gray-500">Admin</span>
                </div>
            </div>

            {/* Navigation Items */}
            <ul className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleItemClick(item)}
                        className={`group relative flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer px-2 py-1 rounded-md transition ${
                            isActive(item.path) ? "bg-blue-100 text-blue-600 font-medium" : ""
                        }`}
                    >
                        {item.icon}
                        <span className="hidden sm:block">{item.label}</span>

                        {/* Tooltip for small screens */}
                        <span className="sm:hidden absolute left-full ml-2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition z-10">
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Support & Logout */}
            <ul className="flex flex-col gap-4">
                {supportAndLogout.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleItemClick(item)}
                        className={`group relative flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer px-2 py-1 rounded-md transition ${
                            isActive(item.path) ? "bg-blue-100 text-blue-600 font-medium" : ""
                        }`}
                    >
                        {item.icon}
                        <span className="hidden sm:block">{item.label}</span>

                        {/* Tooltip for small screens */}
                        <span className="sm:hidden absolute left-full ml-2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition z-10">
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
