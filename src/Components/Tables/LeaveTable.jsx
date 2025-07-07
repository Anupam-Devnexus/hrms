import React from "react";
import LeaveData from "../../DataStore/leave.json";
import EmployeeData from "../../DataStore/employees.json";

export default function LeaveTable() {
  const getEmployeeName = (id) => {
    const employee = EmployeeData.find((emp) => emp.id === id);
    return employee ? employee.name : "Unknown";
  };

  return (
    <div className="p-4 w-full text-black">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Leave Requests</h2>
      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="border px-4 py-2 text-left">Leave ID</th>
              <th className="border px-4 py-2 text-left">Employee</th>
              <th className="border px-4 py-2 text-left">Type</th>
              <th className="border px-4 py-2 text-left">From</th>
              <th className="border px-4 py-2 text-left">To</th>
              <th className="border px-4 py-2 text-left">Reason</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {LeaveData.map((leave, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{leave.leaveId}</td>
                <td className="border px-4 py-2">{getEmployeeName(leave.employeeId)}</td>
                <td className="border px-4 py-2">{leave.type}</td>
                <td className="border px-4 py-2">{leave.fromDate}</td>
                <td className="border px-4 py-2">{leave.toDate}</td>
                <td className="border px-4 py-2">{leave.reason}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-medium ${
                      leave.status === "Pending"
                        ? "bg-yellow-500"
                        : leave.status === "Approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
            {LeaveData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
