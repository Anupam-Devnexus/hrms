import React from "react";

export default function Dashcard({ title, value, icon,onClick }) {
  return (
    <div
    onClick={onClick}
    role="button"
    className="bg-white shadow-xl rounded-2xl p-5 flex items-center gap-4 transition hover:scale-[1.02] duration-200 group w-full max-w-sm">
      <div className="bg-gradient-to-tr from-blue-100 to-blue-300 text-blue-600 p-4 rounded-xl text-3xl group-hover:rotate-12 transition-transform duration-200">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
