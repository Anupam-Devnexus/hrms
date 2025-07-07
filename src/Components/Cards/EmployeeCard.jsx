import React from "react";

export default function EmployeeCard({ employee }) {
  return (
    <div
      className="bg-white shadow-md rounded-xl p-5 flex items-center gap-5 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      role="button"
      tabIndex={0}
      aria-label={`View profile of ${employee.name}`}
      onClick={() => alert(`Clicked on ${employee.name}`)} // Optional click handler
      onKeyDown={e => e.key === "Enter" && alert(`Clicked on ${employee.name}`)} // keyboard accessible
    >
      <img
        src={"https://www.pexels.com/photo/man-cross-legs-seating-on-white-wooden-chair-1270076/"}
        alt={`${employee.name}  's profile`}
        className="w-16 h-16 rounded-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-col">
        <h3 className="text-xs font-semibold text-gray-800">Employee ID: {employee.employeeId}</h3>
        <h3 className="text-lg font-semibold text-gray-800">{employee.name}</h3>
        <p className="text-sm text-gray-600">{employee.position}</p>
      </div>
    </div>
  );
}
